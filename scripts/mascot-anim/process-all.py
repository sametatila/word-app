#!/usr/bin/env python3
"""Tüm Erdi kliplerini işle: temizlik → dönüşüm → animasyonlu WebP.

Kullanım: python3 process-all.py [klip ...]   (argümansız: hepsi)

Üç tuval türü, üç dönüşüm:
  portrait  512×768 → 360×540, olduğu gibi.
  square    Kare tuval idle'ları (kadraj sorunu olmasın diye bol paylı kare
            üretildi). Karakter, dikey kliplerdeki karakterle AYNI boyda ve
            AYNI ayak çizgisinde olacak şekilde ölçeklenip (≈%31) 360×540
            tuvale oturtulur — idle zinciri klipler arasında zıplamaz.
            Taşan yan pay zaten saydam.
  strip     Alt kenarda yürüyen klipler (walk/push/pull). Ayak altındaki
            saydam pay kırpılır ki ayak WebP'nin alt kenarına bassın —
            arayüz onları doğrudan navigasyonun üstüne oturtur.

Döngü sayısı: idle ve duygu klipleri loop=1 — bir tur oynayıp NÖTR karede
donar. Rastgele idle geçişleri bu sayede sıçramaz: JS zamanlayıcısı WebP
döngüsüyle senkron olamaz; sonsuz döngüde takas klibin ortasına denk gelip
"gidip gelme" yaratıyordu, donmuş nötr kareden takas görünmezdir. Durum
döngüleri (sad, sleep) ve yürüyüş çevrimleri sonsuz (loop=0) kalır.
"""
import subprocess, sys
from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np

REPO = Path(__file__).resolve().parents[2]
RAW = REPO / "data" / "mascot" / "raw"          # ham mp4'ler (depoda)
FRAMES, CLEAN = (Path("/tmp/mascot-work") / d for d in ("frames", "clean"))  # ara ürünler
OUT = REPO / "public" / "anim"                    # doğrudan uygulamaya

# Dikey kliplerde karakter geometrisi (512×768 ölçümü: bbox 437x726+9+21).
P_FEET = 747 / 768   # ayak çizgisi
P_CHAR = 726 / 768   # karakter yüksekliği

# ad -> (mod, loop_start_sn | None, hedef_yükseklik, ayna | None, webp_loop)
CLIPS = {
    "lookaround":   ("portrait", None, 540, None, 1),
    "wave":         ("portrait", None, 540, None, 1),
    "thumbsup":     ("portrait", None, 540, None, 1),
    "happy":        ("portrait", None, 540, None, 1),
    "celebrate":    ("portrait", None, 540, None, 1),
    "think":        ("portrait", None, 540, None, 1),
    "sad":          ("portrait", None, 540, None, 0),
    "sleep":        ("portrait", None, 540, None, 0),
    "idle-dog":     ("portrait", None, 540, None, 1),
    "idle-stretch": ("portrait", None, 540, None, 1),
    "idle-scratch": ("portrait", None, 540, None, 1),
    "idle-tail":    ("portrait", None, 540, None, 1),
    "idle-peekaboo": ("square", None, 540, None, 1),
    "idle-hop":     ("square", None, 540, None, 1),
    "idle-dig":     ("square", None, 540, None, 1),
    "idle-sniff":   ("square", None, 540, None, 1),
    "idle-sit":     ("square", None, 540, None, 1),
    "idle-wink":    ("square", None, 540, None, 1),
    "dance":        ("wide", None, 300, None, 1),
    "idle-heave":   ("wide", None, 540, None, 1),  # geniş idle: repack-wide ile normalize
    "peek":         ("wide", None, 300, "peek-mirror", 1),
    "walk-right":   ("strip", 2.0, 300, None, 0),
    "walk-left":    ("strip", 3.0, 300, None, 0),
    "push-right":   ("strip", 1.5, 300, "push-left", 0),
    "pull-right":   ("strip", 2.0, 300, "pull-left", 0),   # ping-pong (PINGPONG)
    "stroll-right": ("strip", 2.0, 300, "stroll-left", 0),
}
FPS_IN = 16
# İleri + geri sarılarak döngülenen klipler: başlangıçtan sona kadar alınır,
# sonra tersten eklenir. Döngü noktası yapısal olarak dikişsiz; geri sarım
# çekme klibinde "geri geri sürükleme" hissini veriyor.
PINGPONG = {"pull-right"}

def key_bg(fin, fout, w, h):
    pts = [(1, 1), (w - 2, 1), (1, h - 2), (w - 2, h - 2), (w // 2, 1), (1, h // 2), (w - 2, h // 2)]
    draws = []
    for x, y in pts:
        draws += ["-draw", f"alpha {x},{y} floodfill"]
    subprocess.run(["magick", str(fin), "-fuzz", "9%", "-fill", "none", *draws,
                    "-channel", "A", "-morphology", "Erode", "Disk:1", "-blur", "0x0.4", "+channel",
                    str(fout)], check=True)

def islands_mask(fin, fmask):
    subprocess.run(["magick", str(fin), "-alpha", "extract", "-threshold", "40%",
                    "-define", "connected-components:area-threshold=3000",
                    "-define", "connected-components:mean-color=true",
                    "-connected-components", "8", "-threshold", "40%",
                    "-morphology", "Dilate", "Disk:3", str(fmask)], check=True)

def wipe_lookaround(a, idx):
    """Kulağa değen somon leke (yalnız f022-f024; kopuk kareleri ada-silme
    alıyor). Genişletme koyu pikselleri (kulak konturu/içi) silmez."""
    if not (22 <= idx <= 24):
        return a
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    roi = np.zeros(r.shape, bool)
    roi[55:180, 395:500] = True
    blob = roi & (r > 200) & (g > 150) & (g < 215) & (b > 110) & (b < 190)
    m = np.array(Image.fromarray((blob * 255).astype("uint8")).filter(ImageFilter.MaxFilter(3))) > 0
    m &= (r + g + b) > 340
    a[..., 3][m] = 0
    return a

def clear_pockets(a):
    """Karakterle çevrili KAPALI beyaz arka plan cepleri (bacak-kuyruk, parmak
    arası): kenar taşırması ulaşamıyor. Katı beyaz alt %55'te silinir; göz
    parlaklıkları üstte olduğundan korunur, kuyruk kremleri eşiğin altında."""
    h = a.shape[0]
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    mask = (a[..., 3] > 0) & (r > 240) & (g > 240) & (b > 240) & ((mx - mn) < 12)
    mask[: int(h * 0.45)] = False
    for _ in range(2):
        grown = np.array(Image.fromarray((mask * 255).astype("uint8")).filter(ImageFilter.MaxFilter(3))) > 0
        mask = mask | (grown & (mn > 226) & ((mx - mn) < 26))
        mask[: int(h * 0.45)] = False
    a[..., 3][mask] = 0
    return a

def clean(name):
    src, dst = FRAMES / name, CLEAN / name
    if dst.exists() and len(list(dst.glob("*.png"))) == len(list(src.glob("*.png"))) and len(list(src.glob("*.png"))):
        return
    dst.mkdir(parents=True, exist_ok=True)
    if not (src / "f001.png").exists():
        src.mkdir(parents=True, exist_ok=True)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(RAW / f"{name}.mp4"),
                        str(src / "f%03d.png")], check=True)
    for f in sorted(src.glob("f*.png")):
        idx = int(f.stem[1:])
        with Image.open(f) as im:
            w, h = im.size
        tmp, msk = Path("/tmp/pa_key.png"), Path("/tmp/pa_mask.png")
        key_bg(f, tmp, w, h)
        a = np.array(Image.open(tmp).convert("RGBA"))
        if name == "lookaround":
            a = wipe_lookaround(a, idx)
        a = clear_pockets(a)
        Image.fromarray(a).save(tmp)
        islands_mask(tmp, msk)
        a = np.array(Image.open(tmp).convert("RGBA"))
        mask = np.array(Image.open(msk).convert("L")) / 255.0
        a[..., 3] = (a[..., 3] * mask).astype("uint8")
        Image.fromarray(a).save(dst / f.name)

def rgba_small(p, wpx=96):
    im = Image.open(p).convert("RGBA")
    im.thumbnail((wpx, wpx * 4))
    return np.array(im).astype(int)

def pick_loop(files, start_idx):
    """start karesine en benzeyen ileriki kareyi bul; [start, e) döngü olur."""
    ref = rgba_small(files[start_idx])
    best_e, best_d = None, None
    for e in range(start_idx + 12, len(files)):
        d = float(np.mean(np.abs(rgba_small(files[e]) - ref)))
        if best_d is None or d < best_d:
            best_d, best_e = d, e
    return best_e

def char_box(path):
    """Karedeki karakterin gerçek sınır kutusu (yükseklik, ayak çizgisi)."""
    al = np.array(Image.open(path).convert("RGBA"))[..., 3]
    ys = np.where(al.max(axis=1) > 16)[0]
    return int(ys.min()), int(ys.max())

def square_normalize(im, out_h, geom):
    """Kare kareyi, karakter dikey kliplerle aynı boy ve ayak çizgisinde
    olacak şekilde 2:3 tuvale oturt. Ölçek ve hiza, klibin İLK karesindeki
    (nötr duruş) gerçek karakter kutusundan hesaplanır — taban görselden
    türetilen sabitler modelin küçük yeniden çizim farklarında yanılıyordu."""
    top0, feet0 = geom
    out_w = round(out_h * 2 / 3 / 2) * 2
    f = (P_CHAR * out_h) / (feet0 - top0)
    scaled = im.resize((round(im.width * f), round(im.height * f)), Image.LANCZOS)
    canvas = Image.new("RGBA", (out_w, out_h), (0, 0, 0, 0))
    left = (out_w - scaled.width) // 2
    top = round(P_FEET * out_h - feet0 * f)
    canvas.paste(scaled, (left, top), scaled)
    return canvas

def strip_bottom(files):
    """Ayak altındaki saydam payı bul: tüm karelerin ortak en alt dolu satırı."""
    bottom = 0
    for f in files:
        al = np.array(Image.open(f).convert("RGBA"))[..., 3]
        ys = np.where(al.max(axis=1) > 16)[0]
        if len(ys):
            bottom = max(bottom, int(ys.max()))
    return bottom + 2

def pack(name, files, out, mode, height, loop, flip=False):
    tmp = Path("/tmp/pa_seq")
    subprocess.run(["rm", "-rf", str(tmp)])
    tmp.mkdir()
    kept = [f for i, f in enumerate(files) if i % 4 != 3]  # 16 -> 12 fps
    crop_bottom = strip_bottom(kept) if mode == "strip" else None
    geom = char_box(kept[0]) if mode == "square" else None
    for i, f in enumerate(kept):
        im = Image.open(f).convert("RGBA")
        if mode == "square":
            im = square_normalize(im, height, geom)
        else:
            if crop_bottom:
                im = im.crop((0, 0, im.width, min(crop_bottom, im.height)))
            w = round(im.width * height / im.height / 2) * 2
            im = im.resize((w, height), Image.LANCZOS)
        if flip:
            im = im.transpose(Image.FLIP_LEFT_RIGHT)
        im.save(tmp / f"s{i:03d}.png")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-framerate", "12", "-i", str(tmp / "s%03d.png"),
                    "-c:v", "libwebp_anim", "-lossless", "0", "-q:v", "42",
                    "-compression_level", "6", "-loop", str(loop), "-pix_fmt", "yuva420p", str(out)],
                   check=True)
    print(f"  {out.name}: {out.stat().st_size // 1024} KB, {len(kept)} kare, loop={loop}")

def main():
    names = sys.argv[1:] or list(CLIPS)
    OUT.mkdir(parents=True, exist_ok=True)
    for name in names:
        mode, start_s, height, mirror, loop = CLIPS[name]
        print(f"[{name}]")
        clean(name)
        files = sorted((CLEAN / name).glob("f*.png"))
        if name in PINGPONG:
            s = round((start_s or 0) * FPS_IN)
            fwd = files[s:]
            files = fwd + fwd[-2:0:-1]
            print(f"  ping-pong: kare {s}.. ({len(files)} kare)")
        elif start_s is not None:
            s = round(start_s * FPS_IN)
            e = pick_loop(files, s)
            print(f"  döngü: kare {s}..{e} ({(e - s) / FPS_IN:.2f} sn)")
            files = files[s:e]
        elif loop == 0:
            # Sonsuz döngü + ilk kare = son kare (last_image ile üretildi):
            # son kare atılır, yoksa döngü noktasında aynı kare iki kez oynar.
            files = files[:-1]
        pack(name, files, OUT / f"{name}.webp", mode, height, loop)
        if mirror:
            pack(name, files, OUT / f"{mirror}.webp", mode, height, loop, flip=True)

if __name__ == "__main__":
    main()
