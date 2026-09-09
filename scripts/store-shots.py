#!/usr/bin/env python3
"""
Mağaza ekran görüntülerini üretir: ham cihaz görüntüsü + vitrin çerçevesi.

NEDEN BİR BETİK. Mağaza görselleri elle düzenlenirse üç şey kayar: altyazı
tipografisi, çerçeve ölçüsü ve altı karenin arasındaki ritim. Üçü de karenin
küçük halinde (arama sonucunda) okunurluğu belirliyor. Betik olunca yeni bir
ekran görüntüsü çekildiğinde tek komutla altısı birden yeniden üretiliyor ve
hiçbiri diğerlerinden ayrışmıyor.

TASARIM KARARLARI
  · Zemin dönüşümlü (koyu / krem). Sebep süs değil: mağaza şeridinde yan yana
    duran iki kare birbirine karışmasın. Küçük halde en çok işe yarayan ayrım.
  · Altyazı Fira Sans Condensed Heavy. Sıkışık kesim uzun Türkçe sözcükleri
    (ör. "hazırlan") tek satırda tutuyor ve 1/6 boyutta hâlâ okunuyor.
  · Üstteki nokta dizisi bir SÜS DEĞİL: kaç kare olduğunu ve kaçıncısında
    olduğunu söylüyor. Şerit soldan sağa kaydıkça dolu nokta ilerliyor.
  · Cihaz alttan taşıyor. Ekranın devamı olduğunu ima ediyor; kareyi
    "bitmiş bir resim" olmaktan çıkarıp uygulamanın bir parçası yapıyor.

KULLANIM
  python3 scripts/store-shots.py --src docs/store/raw --out docs/store/play --store play
"""

from __future__ import annotations

import argparse
import json
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONT_DIR = "/usr/share/fonts/TTF"
F_CAPTION = os.path.join(FONT_DIR, "FiraSansCondensed-Heavy.ttf")
F_LABEL = os.path.join(FONT_DIR, "FiraSans-Medium.ttf")

INK = (36, 26, 18)
INK_TEXT = (245, 239, 229)
INK_MUTED = (150, 128, 108)
CREAM = (245, 239, 229)
CREAM_TEXT = (30, 22, 15)
CREAM_MUTED = (128, 111, 92)
EMBER = (200, 99, 15)

# Mağaza başına ölçüler. Oranlar aynı sistemden türüyor; sayılar mağazanın
# istediği piksel boyutuna göre ölçekleniyor.
SPECS = {
    # Play telefon: 9:16, en az 1080 kenar.
    "play": dict(w=1080, h=1920, margin=84, dev_w=808, dev_top=612, cap_max=96, cap_min=62),
    # App Store 6.9" iPhone.
    "ios": dict(w=1290, h=2796, margin=104, dev_w=980, dev_top=880, cap_max=124, cap_min=80),
}


def wrap(draw, text, font, max_w):
    """Sözcük sözcük sarar; tek başına sığmayan sözcük kendi satırında kalır."""
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=font) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def fit_caption(draw, text, max_w, max_lines, hi, lo):
    """Sığan en büyük punto. Küçükten büyüğe değil, büyükten küçüğe: ilk
    sığan kazanır, böylece altyazı her karede olabildiğince iri kalıyor."""
    for size in range(hi, lo - 1, -2):
        font = ImageFont.truetype(F_CAPTION, size)
        lines = wrap(draw, text, font, max_w)
        if len(lines) <= max_lines:
            return font, lines
    font = ImageFont.truetype(F_CAPTION, lo)
    return font, wrap(draw, text, font, max_w)[:max_lines]


def route(draw, x0, x1, y, total, index, dot, accent):
    """Altı karenin nerede olduğunu gösteren nokta dizisi."""
    step = (x1 - x0) / max(total - 1, 1)
    # kesikli bağlantı çizgisi
    seg, gap, x = 14, 10, x0
    while x < x1:
        draw.line([(x, y), (min(x + seg, x1), y)], fill=dot, width=2)
        x += seg + gap
    for i in range(total):
        cx = x0 + step * i
        if i == index:
            draw.ellipse([cx - 13, y - 13, cx + 13, y + 13], fill=accent)
            draw.ellipse([cx - 22, y - 22, cx + 22, y + 22], outline=accent, width=2)
        else:
            draw.ellipse([cx - 6, y - 6, cx + 6, y + 6], fill=dot)


def content_box(shot, aspect, anchor=None):
    """Ekranın DOLU bölgesini bulur ve cihaz oranına genişletir.

    Uygulama ekranları dikeyde ortalı: ham görüntüyü olduğu gibi koyunca
    cihazın ortasında kocaman bir boşluk kalıyor ve kare "boş" görünüyor.
    Sınır kutusu işe yaramıyor, çünkü en üstteki ilerleme çubuğu kutuyu
    ekranın tamamına yayıyor. Bu yüzden satır satır MÜREKKEP YOĞUNLUĞU
    ölçülüyor ve pencere yoğunluğun ağırlık merkezine oturtuluyor: kadraj
    içeriğin olduğu yere kayıyor, boşluk dışarıda kalıyor.
    """
    want = min(shot.height, round(shot.width / aspect))
    if anchor is not None:
        # Elle çıpa: 0 = üstten, 1 = alttan. Ağırlık merkezi bazı ekranlarda
        # başlığı kadrajın dışında bırakıyor; o karelerde çıpa elle verilir.
        top = round((shot.height - want) * max(0.0, min(1.0, anchor)))
        return (0, top, shot.width, top + want)

    small = shot.resize((shot.width // 4, shot.height // 4), Image.BILINEAR)
    px = small.load()
    bg = small.getpixel((2, 2))
    weight = []
    for y in range(small.height):
        n = 0
        for x in range(small.width):
            r, g, b = px[x, y]
            if abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2]) > 24:
                n += 1
        weight.append(n)
    total = sum(weight)
    if not total:
        return (0, 0, shot.width, shot.height)
    acc, centre = 0, small.height // 2
    for y, n in enumerate(weight):
        acc += n
        if acc >= total / 2:
            centre = y
            break
    centre *= 4

    top = max(0, min(shot.height - want, centre - want // 2))
    return (0, top, shot.width, top + want)


def device(canvas, shot_path, spec, border, anchor=None):
    """Cihaz gövdesi: yuvarlatılmış çerçeve, içinde ekran görüntüsü, alttan taşar."""
    dw = spec["dev_w"]
    x = (spec["w"] - dw) // 2
    y = spec["dev_top"]
    dh = spec["h"] - y + 60  # alttan taşsın
    pad, radius = 10, 46

    shot = Image.open(shot_path).convert("RGB")
    iw, ih = dw - pad * 2, dh - pad * 2
    shot = shot.crop(content_box(shot, iw / ih, anchor))
    scale = max(iw / shot.width, ih / shot.height)
    resized = shot.resize((round(shot.width * scale), round(shot.height * scale)), Image.LANCZOS)
    resized = resized.crop((0, 0, iw, min(ih, resized.height)))

    inner = Image.new("RGB", (iw, ih), (255, 255, 255))
    inner.paste(resized, (0, 0))
    mask = Image.new("L", (iw, ih), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, iw - 1, ih - 1], radius=radius - pad, fill=255)

    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        [x + 6, y + 14, x + dw + 6, y + dh + 14], radius=radius, fill=(0, 0, 0, 58)
    )
    canvas.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(26)))

    body = Image.new("RGBA", (dw, dh), (0, 0, 0, 0))
    ImageDraw.Draw(body).rounded_rectangle([0, 0, dw - 1, dh - 1], radius=radius, fill=border)
    body.paste(inner, (pad, pad), mask)
    canvas.alpha_composite(body, (x, y))


def frame(shot_path, caption, index, total, dark, store, out_path, anchor=None):
    spec = SPECS[store]
    bg = INK if dark else CREAM
    fg = INK_TEXT if dark else CREAM_TEXT
    muted = INK_MUTED if dark else CREAM_MUTED
    border = (62, 46, 33, 255) if dark else (196, 178, 156, 255)

    canvas = Image.new("RGBA", (spec["w"], spec["h"]), bg + (255,))
    draw = ImageDraw.Draw(canvas)

    m = spec["margin"]
    content_w = spec["w"] - m * 2
    k = spec["w"] / 1080  # ölçek katsayısı

    route(draw, m + 18, spec["w"] - m - 18, round(126 * k), total, index, muted, EMBER)

    label = ImageFont.truetype(F_LABEL, round(30 * k))
    draw.text((m, round(196 * k)), f"ADIM {index + 1} / {total}", font=label, fill=muted)

    font, lines = fit_caption(draw, caption, content_w, 3, spec["cap_max"], spec["cap_min"])
    y = round(262 * k)
    for line in lines:
        draw.text((m, y), line, font=font, fill=fg)
        y += round(font.size * 1.04)

    draw.rectangle([m, y + round(30 * k), m + round(104 * k), y + round(30 * k) + 4], fill=EMBER)

    device(canvas, shot_path, spec, border, anchor)
    canvas.convert("RGB").save(out_path, "PNG", optimize=True)
    return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--plan", required=True, help="JSON: [{src, caption}] sırasıyla")
    ap.add_argument("--out", required=True)
    ap.add_argument("--store", choices=list(SPECS), default="play")
    args = ap.parse_args()

    plan = json.load(open(args.plan, encoding="utf-8"))
    os.makedirs(args.out, exist_ok=True)
    total = len(plan)
    for i, item in enumerate(plan):
        path = os.path.join(args.out, f"{i + 1:02d}.png")
        frame(item["src"], item["caption"], i, total, dark=(i % 2 == 0), store=args.store,
              out_path=path, anchor=item.get("anchor"))
        print(f"  {path}  {item['caption']}")


if __name__ == "__main__":
    main()
