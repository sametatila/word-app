#!/usr/bin/env python3
"""Tüm Erdi kliplerini işle: temizlik → kırpma/döngü → ayna → animasyonlu WebP.

Kullanım: python3 process-all.py [klip ...]   (argümansız: hepsi)

Adımlar (klip başına):
  1. mp4 -> kareler (ffmpeg)
  2. Beyaz zemini kenardan taşma doldurmayla sök (tuval boyutu dinamik)
  3. Hedefli silme (lookaround f021-f030: kulak yanı somon leke)
  4. Kopuk adaları sil (yalnız büyük bağlı bileşenler kalır)
  5. Kırpma + dikişsiz döngü: başlangıç karesi verilmişse, ondan sonraki
     en benzer kareyi bulup döngüyü orada kes (kesinti hissettirmeyen loop)
  6. 12fps'e düşür (her 4. kare atlanır), hedef boyuta indir
  7. WebP (alfa, sonsuz döngü); mirror=True ise ayrıca yatay aynalı kopya
"""
import subprocess, sys
from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np

BASE = Path(__file__).parent
RAW, FRAMES, CLEAN, OUT = (BASE / "anim" / d for d in ("raw", "frames", "clean", "out"))

# ad -> (loop_start_sn | None, hedef_yükseklik, ayna_adı | None)
CLIPS = {
    "lookaround": (None, 540, None),
    "wave":       (None, 540, None),
    "thumbsup":   (None, 540, None),
    "happy":      (None, 540, None),
    "celebrate":  (None, 540, None),
    "think":      (None, 540, None),
    "sad":        (None, 540, None),
    "sleep":      (None, 540, None),
    "dance":      (None, 300, None),
    "walk-right": (2.0, 300, None),
    "walk-left":  (3.0, 300, None),
    "push-right": (1.5, 300, "push-left"),
    "pull-right": (1.5, 300, "pull-left"),
    "peek":       (None, 300, "peek-mirror"),
}
FPS_IN = 16

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
    """Kulağa değen somon leke (yalnız f022-f024; kopuk kareleri ada-silme alıyor).

    Genişletme koyu pikselleri (kulak konturu/içi) ASLA silmez: ilk sürüm
    7px genişletmeyle kulak kenarını tırtıklıyor, kulak "kesilip geri
    geliyordu"."""
    if not (22 <= idx <= 24):
        return a
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    roi = np.zeros(r.shape, bool)
    roi[55:180, 395:500] = True
    blob = roi & (r > 200) & (g > 150) & (g < 215) & (b > 110) & (b < 190)
    m = np.array(Image.fromarray((blob * 255).astype("uint8")).filter(ImageFilter.MaxFilter(3))) > 0
    m &= (r + g + b) > 340  # koyu piksel koruması
    a[..., 3][m] = 0
    return a


def clear_pockets(a):
    """Karakterle çevrili KAPALI beyaz arka plan cepleri (bacak-kuyruk,
    parmak arası): kenardan taşma doldurması bunlara ulaşamıyor. Katı beyaz
    (bg tonu) alt %55'te silinir; kuyruk ucu kremleri eşiğin altında kaldığı
    için dokunulmaz. Üst bölge kapalı: göz parlaklıkları katı beyaz.
    Silinen çekirdeğin çevresindeki açık halo da iki adımda kemirilir."""
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
    src = FRAMES / name
    dst = CLEAN / name
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

def pack(name, files, out, height, flip=False):
    tmp = Path("/tmp/pa_seq")
    subprocess.run(["rm", "-rf", str(tmp)])
    tmp.mkdir()
    kept = [f for i, f in enumerate(files) if i % 4 != 3]  # 16 -> 12 fps
    for i, f in enumerate(kept):
        im = Image.open(f).convert("RGBA")
        w = round(im.width * height / im.height / 2) * 2
        im = im.resize((w, height), Image.LANCZOS)
        if flip:
            im = im.transpose(Image.FLIP_LEFT_RIGHT)
        im.save(tmp / f"s{i:03d}.png")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-framerate", "12", "-i", str(tmp / "s%03d.png"),
                    "-c:v", "libwebp_anim", "-lossless", "0", "-q:v", "60",
                    "-compression_level", "6", "-loop", "0", "-pix_fmt", "yuva420p", str(out)], check=True)
    print(f"  {out.name}: {out.stat().st_size // 1024} KB, {len(kept)} kare")

def main():
    names = sys.argv[1:] or list(CLIPS)
    OUT.mkdir(parents=True, exist_ok=True)
    for name in names:
        start_s, height, mirror = CLIPS[name]
        print(f"[{name}]")
        clean(name)
        files = sorted((CLEAN / name).glob("f*.png"))
        if start_s is not None:
            s = round(start_s * FPS_IN)
            e = pick_loop(files, s)
            print(f"  döngü: kare {s}..{e} ({(e - s) / FPS_IN:.2f} sn)")
            files = files[s:e]
        pack(name, files, OUT / f"{name}.webp", height)
        if mirror:
            pack(name, files, OUT / f"{mirror}.webp", height, flip=True)

if __name__ == "__main__":
    main()
