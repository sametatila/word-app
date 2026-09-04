#!/usr/bin/env python3
"""
iOS uygulama ikonunu ve açılış ekranı ikonunu marka kaynağından üretir.

  python3 scripts/render-app-icon.py

Kaynak: depo kökündeki `scripts/logo-source.png` (1024x1024, saydamsız) — web
ikonlarının da tek kaynağı (`scripts/icons.mjs` aynı dosyadan üretiyor). Android'in
`mipmap-*/ic_launcher_foreground.png` dosyası AYNI görselin uyarlanabilir ikon (adaptive
icon) kadrajıdır: 432 piksellik katmanın ortasındaki 354 piksellik yuvarlak kare, yani
launcher maskesi için taşma payı bırakılmış hâli. iOS'ta maske yok ve App Store 1024
piksel istiyor; o dosyadan üretmek 354 -> 1024 büyütmesi (bulanık kenar) demek olurdu.
Bu yüzden kaynak logo-source.png: aynı çizim, doğru çözünürlükte, doğru kadrajda.

Üretilenler (hepsi `ios/Lernomi/Images.xcassets` altında):
  AppIcon.appiconset/    — Xcode'un klasik iPhone + iPad + ios-marketing kümesi.
  LaunchIcon.imageset/   — açılış ekranındaki (LaunchScreen.storyboard) yuvarlak köşeli
                           ikon; 1x/2x/3x.

iOS kuralları burada karşılanıyor:
  - Uygulama ikonunda SAYDAMLIK YASAK: çıktı RGB, alfa kanalı hiç yazılmıyor.
  - Köşeleri sistem yuvarlıyor: ikon tam kare (full-bleed) yazılır, biz yuvarlamayız.
  - Kaynağın sol/sağ üst köşesinde marka görselinden kalma koyu bir kırıntı var
    (yuvarlak köşe artığı, ~11 piksel). Sistem maskesi zaten oraya kadar kesiyor ama
    ham 1024 dosyası App Store Connect'te maskesiz de görülebiliyor: temizleniyor.

Neden 18 giriş / 13 dosya, tek 1024'lük "universal" giriş değil: Xcode 14+ tek boyutlu
ikonu kabul ediyor ve daha az bakım ister; ama bu makinede Xcode yok, hiçbir şey
derlenemiyor (bkz. docs/plan/ios-parity.md §0). Klasik küme her Xcode sürümünde
çalışıyor, dosyaların hepsi burada ölçülüp doğrulanabiliyor ve Contents.json'ın bugünkü
beyanını bozmuyor. iPad @1x girişleri iOS 15.1 tabanında hiçbir cihazda görünmüyor
(1x iPad'ler iOS 15 almıyor) ama Xcode şablonunun kanonik kümesi bu; Mac'te
doğrulayamadığımız bir bilinmezi ucuza kapatmak için duruyorlar.

Gerekli: Pillow.
"""
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))          # mobile/
REPO = os.path.dirname(ROOT)                                                 # depo kökü
SRC = os.path.join(REPO, "scripts", "logo-source.png")
ASSETS = os.path.join(ROOT, "ios", "Lernomi", "Images.xcassets")

INFO = {"author": "xcode", "version": 1}

# Marka turuncusu — android/app/src/main/res/values/colors.xml `ic_launcher_background`
# ve Theme.Lernomi.Splash'in zemini ile aynı.
BRAND = (0xFA, 0x7C, 0x13)

# (idiom, "WxH" nokta, ölçek) — Xcode'un iPhone + iPad + App Store kümesi.
APPICON = [
    ("iphone", "20x20", 2), ("iphone", "20x20", 3),
    ("iphone", "29x29", 2), ("iphone", "29x29", 3),
    ("iphone", "40x40", 2), ("iphone", "40x40", 3),
    ("iphone", "60x60", 2), ("iphone", "60x60", 3),
    ("ipad", "20x20", 1), ("ipad", "20x20", 2),
    ("ipad", "29x29", 1), ("ipad", "29x29", 2),
    ("ipad", "40x40", 1), ("ipad", "40x40", 2),
    ("ipad", "76x76", 1), ("ipad", "76x76", 2),
    ("ipad", "83.5x83.5", 2),
    ("ios-marketing", "1024x1024", 1),
]

# Açılış ekranındaki ikonun nokta cinsinden kenarı — Android 12 splash'inin ikon
# alanıyla (240dp daire, içinde 160dp ikon) aynı ölçü.
LAUNCH_PT = 160
# iOS'un süper elips maskesine yakın oran; açılış ikonunu tek başına yuvarlamak için.
CORNER_RATIO = 0.2237


def clean_corners(im, box=24, thresh=200):
    """Köşelerdeki koyu artığı en yakın temiz turuncuyla doldurur.

    Artık yalnız kaynağın üst köşelerinde ve ~11 piksel içinde; kutu ölçüsü onun iki
    katı. Eşik ışıklılık toplamı (R+G+B) üzerinden: marka turuncusu ~390, artık <10.
    """
    px = im.load()
    w, h = im.size
    for cx, cy in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        # Köşenin en dış pikseli temizse orada artık yok: hiç dokunma. Bu olmadan
        # köşeye taşan bir çizim (maskotun koyu kürkü) turuncuyla boyanabilirdi.
        if sum(px[cx, cy]) >= thresh:
            continue
        sx, sy = (box if cx == 0 else w - 1 - box), (box if cy == 0 else h - 1 - box)
        clean = px[sx, sy]
        for dx in range(box):
            for dy in range(box):
                x, y = (dx if cx == 0 else w - 1 - dx), (dy if cy == 0 else h - 1 - dy)
                if sum(px[x, y]) < thresh:
                    px[x, y] = clean
    return im


def rounded(im, radius):
    """Kareyi yuvarlak köşeli maskeyle keser (yalnız açılış ikonu; app ikonu düz kare)."""
    from PIL import ImageDraw
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, im.size[0] - 1, im.size[1] - 1], radius, fill=255)
    out = im.convert("RGBA")
    out.putalpha(mask)
    return out


def write_appicon(base):
    d = os.path.join(ASSETS, "AppIcon.appiconset")
    os.makedirs(d, exist_ok=True)
    images, written = [], {}
    for idiom, size, scale in APPICON:
        px = round(float(size.split("x")[0]) * scale)
        name = f"AppIcon-{px}.png"
        if name not in written:
            # Alfa yok: App Store saydam ikonu reddediyor.
            base.resize((px, px), Image.LANCZOS).convert("RGB").save(os.path.join(d, name))
            written[name] = px
        images.append({"filename": name, "idiom": idiom, "scale": f"{scale}x", "size": size})
    with open(os.path.join(d, "Contents.json"), "w", encoding="utf-8") as f:
        json.dump({"images": images, "info": INFO}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    return sorted(written.items(), key=lambda kv: kv[1])


def write_launchicon(base):
    d = os.path.join(ASSETS, "LaunchIcon.imageset")
    os.makedirs(d, exist_ok=True)
    images, written = [], []
    for scale in (1, 2, 3):
        px = LAUNCH_PT * scale
        name = f"LaunchIcon@{scale}x.png" if scale > 1 else "LaunchIcon.png"
        rounded(base.resize((px, px), Image.LANCZOS), round(px * CORNER_RATIO)).save(os.path.join(d, name))
        images.append({"filename": name, "idiom": "universal", "scale": f"{scale}x"})
        written.append((name, px))
    with open(os.path.join(d, "Contents.json"), "w", encoding="utf-8") as f:
        json.dump({"images": images, "info": INFO}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    return written


if __name__ == "__main__":
    base = clean_corners(Image.open(SRC).convert("RGB"))
    if base.size != (1024, 1024):
        raise SystemExit(f"{SRC}: 1024x1024 bekleniyordu, {base.size} geldi")
    for name, px in write_appicon(base):
        print(f"AppIcon      {px:5d}px  {name}")
    for name, px in write_launchicon(base):
        print(f"LaunchIcon   {px:5d}px  {name}")
    print(f"\nzemin {BRAND} · kaynak {os.path.relpath(SRC, REPO)}")
