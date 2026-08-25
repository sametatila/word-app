#!/usr/bin/env python3
"""Geniş klipleri (yürüyüş, itme/çekme, dikizleme, dans) dikey kliplerle AYNI
karakter geometrisine yeniden paketle — kaynak WebP'lerden, upscale yok.

Kullanım: python3 scripts/mascot-anim/repack-wide.py [klip ...]

Hedef, celebrate.webp'ten ölçüldü: karakter yüksekliği tuvalin %95.2'si,
ayak çizgisi %97.6'sı. Her klip için karelerin BİRLEŞİK sınır kutusu alınır
(pencere sabit; kare kare kırpmak titreşim yapar), tuval bu kutuya göre
kırpılır/doldurulur. Arayüz bütün klipleri yüksekliğe göre boyutlandırdığı için
karakter her yerde aynı boyda görünür — dev ya da minik yok.

Ham mp4'ler kaybolduğu için kaynak WebP'ler: yeniden kodlama küçük bir kalite
kaybı daha ekler, bu yüzden q 75 (ilk paketlemedeki 42 değil).
"""
import subprocess, sys
from pathlib import Path
from PIL import Image
import numpy as np

ANIM = Path(__file__).resolve().parents[2] / "public" / "anim"
CH, FEET = 514 / 540, 527 / 540
CLIPS = {  # ad -> webp döngü sayısı
    "walk-right": 0, "walk-left": 0, "push-right": 0, "push-left": 0,
    "pull-right": 0, "pull-left": 0, "stroll-right": 0, "stroll-left": 0, "peek": 1, "peek-mirror": 1, "dance": 1, "idle-heave": 1,
}
# Nötr karede başlayıp biten klipler: dikey ölçek ve ayak çizgisi İLK kareden
# alınır (birleşik kutu, kollar/zıplama yüzünden karakteri küçültüyordu);
# yatay genişlik yine birleşik kutudan — kollar kırpılmasın.
NEUTRAL_FIRST = {"idle-heave", "peek", "peek-mirror", "dance"}

def frames(name):
    tmp = Path("/tmp/rp") / name
    subprocess.run(["rm", "-rf", str(tmp)]); tmp.mkdir(parents=True)
    subprocess.run(["magick", str(ANIM / f"{name}.webp"), "-coalesce", str(tmp / "f%03d.png")], check=True)
    return sorted(tmp.glob("f*.png"))

def repack(name, loop):
    fs = frames(name)
    top = left = 10**9; bottom = right = -1
    for f in fs:
        al = np.array(Image.open(f).convert("RGBA"))[..., 3] > 16
        ys, xs = np.where(al)
        if len(ys):
            top, bottom = min(top, ys.min()), max(bottom, ys.max())
            left, right = min(left, xs.min()), max(right, xs.max())
    if name in NEUTRAL_FIRST:
        al0 = np.array(Image.open(fs[0]).convert("RGBA"))[..., 3] > 16
        ys0 = np.where(al0)[0]
        top, bottom = int(ys0.min()), int(ys0.max())
    ch = bottom - top + 1
    H = round(ch / CH / 2) * 2
    y0 = round((bottom + 1) - FEET * H)
    W = round((right - left + 1) * 1.04 / 2) * 2
    x0 = round((left + right + 1) / 2 - W / 2)
    out = Path("/tmp/rp") / f"{name}-seq"
    subprocess.run(["rm", "-rf", str(out)]); out.mkdir()
    for i, f in enumerate(fs):
        im = Image.open(f).convert("RGBA").crop((x0, y0, x0 + W, y0 + H))
        im.save(out / f"s{i:03d}.png")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-framerate", "12", "-i", str(out / "s%03d.png"),
                    "-c:v", "libwebp_anim", "-lossless", "0", "-q:v", "75", "-compression_level", "6",
                    "-loop", str(loop), "-pix_fmt", "yuva420p", str(ANIM / f"{name}.webp")], check=True)
    print(f"{name}: {W}x{H} (oran {W/H:.3f}), {len(fs)} kare, loop={loop}, "
          f"{(ANIM / f'{name}.webp').stat().st_size // 1024} KB")

for n in (sys.argv[1:] or CLIPS):
    repack(n, CLIPS[n])
