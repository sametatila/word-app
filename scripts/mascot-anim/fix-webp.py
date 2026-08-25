#!/usr/bin/env python3
"""İşlenmiş WebP'lerde kare düzeyinde onarım (ham mp4 olmadan).

Kullanım: python3 scripts/mascot-anim/fix-webp.py <op> <klip> [<klip> ...]
  op = pockets   Üst bölgedeki kapalı beyaz cepleri sil (pati yüze yaklaşınca
                 arada kalan arka plan). Göz parlaklıkları da katı beyaz; ayrım
                 ALANLA: 220 px²'den büyük bileşenler cep sayılır.
  op = tint      Renk kaymasını düzelt: her kare, opak piksellerin kanal
                 ortalamasında ilk kareye eşitlenir (kazanç ±%10 sınırlı).
Kaynak zaten kayıplı olduğundan yeniden kodlama q 75, döngü sayısı korunur.
"""
import subprocess, sys
from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np

ANIM = Path(__file__).resolve().parents[2] / "public" / "anim"
LOOP1 = {"lookaround", "wave", "thumbsup", "happy", "celebrate", "think", "dance", "peek", "peek-mirror"}

def frames(name):
    d = Path("/tmp/fixwebp") / name
    subprocess.run(["rm", "-rf", str(d)]); d.mkdir(parents=True)
    subprocess.run(["magick", str(ANIM / f"{name}.webp"), "-coalesce", str(d / "f%03d.png")], check=True)
    return sorted(d.glob("f*.png"))

def encode(name, fs):
    loop = 1 if (name in LOOP1 or name.startswith("idle-")) else 0
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-framerate", "12", "-i", str(fs[0].parent / "f%03d.png"),
                    "-c:v", "libwebp_anim", "-lossless", "0", "-q:v", "75", "-compression_level", "6",
                    "-loop", str(loop), "-pix_fmt", "yuva420p", str(ANIM / f"{name}.webp")], check=True)
    print(f"{name}: {len(fs)} kare, loop={loop}, {(ANIM / f'{name}.webp').stat().st_size // 1024} KB")

def pockets(name):
    fs = frames(name)
    for f in fs:
        a = np.array(Image.open(f).convert("RGBA")).astype(int)
        r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
        mx = np.maximum(np.maximum(r, g), b); mn = np.minimum(np.minimum(r, g), b)
        white = (al > 0) & (r > 236) & (g > 236) & (b > 236) & ((mx - mn) < 14)
        if not white.any():
            continue
        m = Path("/tmp/fixwebp/m.png"); k = Path("/tmp/fixwebp/k.png")
        Image.fromarray((white * 255).astype("uint8")).save(m)
        subprocess.run(["magick", str(m), "-define", "connected-components:area-threshold=220",
                        "-define", "connected-components:mean-color=true", "-connected-components", "8",
                        "-threshold", "50%", str(k)], check=True)
        big = np.array(Image.open(k).convert("L")) > 0
        mask = white & big
        for _ in range(2):  # kenar halesi
            grown = np.array(Image.fromarray((mask * 255).astype("uint8")).filter(ImageFilter.MaxFilter(3))) > 0
            mask = mask | (grown & (mn > 222) & ((mx - mn) < 28))
        a[..., 3][mask] = 0
        Image.fromarray(a.astype("uint8")).save(f)
    encode(name, fs)

def tint(name):
    fs = frames(name)
    ref = None
    for f in fs:
        a = np.array(Image.open(f).convert("RGBA")).astype(float)
        op = a[..., 3] > 200
        mean = a[..., :3][op].mean(axis=0)
        if ref is None:
            ref = mean; continue
        gain = np.clip(ref / mean, 0.9, 1.1)
        a[..., :3] = np.clip(a[..., :3] * gain, 0, 255)
        Image.fromarray(a.astype("uint8")).save(f)
    encode(name, fs)

op, names = sys.argv[1], sys.argv[2:]
for n in names:
    {"pockets": pockets, "tint": tint}[op](n)
