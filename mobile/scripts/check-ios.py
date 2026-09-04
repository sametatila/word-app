#!/usr/bin/env python3
"""
iOS paketinin ELLE tutulan yerlerini denetler. Linux'ta saniyeler sürer.

Neden: bu sınıfın tamamı macOS derlemesinden de kaçıyor. `ios-build.yml`
simülatöre imzasız derliyor; eksik ikon ölçüsü, beyan edilip içeriği olmayan dil
ya da kaymış sürüm numarası ancak App Store'a yüklerken patlıyor. Buradaki
denetimler elle koşulmuş ve iş görmüştü — betiğe geçince temiz KALIYORLAR.

  python3 scripts/check-ios.py

Denetimler:
  1. pbxproj bütünlüğü — tekrar eden UUID, tanımsız başvuru, diskte olmayan
     dosya, kırık PBXBuildFile; ve TERS yön: diskteki kaynak hedefe bağlı mı
     (ikinci geçişte unutulan mp3/strings tam olarak bu).
  2. Sürüm üçlüsü — build.gradle / version.ts / pbxproj. Üç yerde elle tutulan
     bir sayı er geç kayar; bugün onu koruyan tek şey version.ts'teki yorumdu.
  3. AppIcon — her Contents.json girişinin dosyası var mı, PNG'nin gerçek ölçüsü
     size×scale ile tutuyor mu, sette artık dosya kalmış mı.
  4. .strings — biçim, yinelenen anahtar, diller arası anahtar kümesi eşitliği.
     Bozuk bir .strings sessizce ham anahtarı gösterir; derleme uyarmaz.
  5. CFBundleLocalizations ↔ *.lproj — beyan edilip içeriği olmayan dil App
     Store'da "destekleniyor" görünür.
  6. Swift/ObjC kaba sözdizimi — blok yorumu erken kapatan `*/` ve dengesiz
     parantez. swiftc burada yok; bu, elle yapılan denge sayımının betiğe geçmiş
     hâli. Yorum içindeki `res/values-*/strings.xml` böyle yakalandı: Swift'te
     `*/` yorumu erken kapatıyor ve gerisi kod sayılıyordu.
"""
import collections
import json
import os
import plistlib
import re
import struct
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IOS = os.path.join(ROOT, "ios")
APP = os.path.join(IOS, "Lernomi")
PBXPROJ = os.path.join(IOS, "Lernomi.xcodeproj", "project.pbxproj")
INFO_PLIST = os.path.join(APP, "Info.plist")
APPICON = os.path.join(APP, "Images.xcassets", "AppIcon.appiconset")
GRADLE = os.path.join(ROOT, "android", "app", "build.gradle")
VERSION_TS = os.path.join(ROOT, "src", "version.ts")

DILLER = ("tr", "en", "de")


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def rel(path):
    return os.path.relpath(path, ROOT)


# --- 1. pbxproj ---------------------------------------------------------------

OBJECT = re.compile(r"^\t\t([0-9A-F]{24}) (?:/\* .*? \*/ )?= \{", re.M)
FILE_REF = re.compile(r"^\t\t([0-9A-F]{24}) /\* .*? \*/ = \{isa = PBXFileReference;(.*?)\};", re.M)
BUILD_FILE = re.compile(r"^\t\t([0-9A-F]{24}) /\* .*? \*/ = \{isa = PBXBuildFile; fileRef = ([0-9A-F]{24})", re.M)
VARIANT_GROUP = re.compile(r"^\t\t([0-9A-F]{24}) /\* (.*?) \*/ = \{\n\t\t\tisa = PBXVariantGroup;", re.M)

# Uzantı başına KAÇ PBXBuildFile olmalı. 0 = derleme ayarından geçiyor
# (INFOPLIST_FILE, CODE_SIGN_ENTITLEMENTS) ya da varyant grubundan (.strings).
# 1 = pakete/derlemeye tek seferde girmeli. Sıfır olması "dosya var ama pakete
# hiç girmiyor", iki olması "başka bir dosyanın yerini almış" demektir.
BUILD_FILE_SAYISI = {
    ".swift": 1, ".m": 1, ".mp3": 1, ".xcassets": 1, ".storyboard": 1, ".xcprivacy": 1,
    ".plist": 0, ".entitlements": 0, ".strings": 0,
}
# Hangi uzantı hangi fazda olmalı. Kaynak kod derlenir, gerisi pakete kopyalanır.
BEKLENEN_FAZ = {
    ".swift": "Sources", ".m": "Sources",
    ".mp3": "Resources", ".xcassets": "Resources",
    ".storyboard": "Resources", ".xcprivacy": "Resources",
}
PHASE = r"isa = PBX{}BuildPhase;.*?files = \((.*?)\);"


def check_pbxproj():
    hatalar = []
    src = read(PBXPROJ)

    tanimli = OBJECT.findall(src)
    for uuid in {u for u in tanimli if tanimli.count(u) > 1}:
        hatalar.append(f"tekrar eden UUID: {uuid}")
    tanimli_set = set(tanimli)

    kok = re.search(r"rootObject = ([0-9A-F]{24})", src)
    kok = kok.group(1) if kok else None
    for uuid in sorted(set(re.findall(r"\b[0-9A-F]{24}\b", src)) - tanimli_set - {kok}):
        hatalar.append(f"tanımsız UUID'ye başvuru: {uuid}")

    # fileRef → diskteki yol
    yollar = {}
    for uuid, govde in FILE_REF.findall(src):
        if "BUILT_PRODUCTS_DIR" in govde or "SDKROOT" in govde:
            continue  # türetilen ürün / sistem çerçevesi
        m = re.search(r" path = ([^;]+);", govde)
        if not m:
            hatalar.append(f"path'i olmayan PBXFileReference: {uuid}")
            continue
        yol = m.group(1).strip().strip('"')
        if yol.startswith("Target Support Files"):
            continue  # `pod install` üretiyor, depoda yok
        yollar[uuid] = yol
        if not os.path.exists(os.path.join(IOS, yol)):
            hatalar.append(f"diskte olmayan dosya başvurusu: {yol}")

    for uuid, ref in BUILD_FILE.findall(src):
        if ref not in tanimli_set:
            hatalar.append(f"kırık PBXBuildFile {uuid}: fileRef {ref} tanımsız")

    fazlar = {}
    for tur in ("Sources", "Resources", "Frameworks"):
        m = re.search(PHASE.format(tur), src, re.S)
        fazlar[tur] = set(re.findall(r"[0-9A-F]{24}", m.group(1))) if m else set()
    fazdaki = set().union(*fazlar.values())

    # Her dosyanın beklenen sayıda PBXBuildFile'ı var mı. `PrivacyInfo.xcprivacy`
    # tam olarak burada yakalandı: grupta duruyordu, Resources fazında değildi,
    # yani gizlilik manifesti pakete hiç girmiyordu.
    # DİKKAT: yalnız TANIMLI PBXBuildFile'ları saymak yetmiyor — fazdan düşmüş bir
    # kayıt nesne olarak durmaya devam ediyor ve dosya yine pakete girmiyor. Sayım
    # bu yüzden "bir fazda GEÇEN" kayıtlar üzerinden yapılıyor.
    sayac = collections.Counter(ref for uuid, ref in BUILD_FILE.findall(src) if uuid in fazdaki)
    for uuid, yol in sorted(yollar.items(), key=lambda kv: kv[1]):
        bekleniyor = BUILD_FILE_SAYISI.get(os.path.splitext(yol)[1])
        if bekleniyor is None:
            continue
        var = sayac.get(uuid, 0)
        if var != bekleniyor:
            hatalar.append(f"{yol}: {var} PBXBuildFile, {bekleniyor} olmalı"
                           + (" (pakete hiç girmiyor)" if var == 0 else ""))
    for uuid, ad in VARIANT_GROUP.findall(src):
        var = sayac.get(uuid, 0)
        if var != 1:
            hatalar.append(f"{ad} varyant grubu: {var} PBXBuildFile, 1 olmalı")

    # TERS yön: diskteki kaynak hedefe bağlı mı. Varyant grubu üyeleri doğrudan
    # fazda görünmez, grubun kendisi görünür — bu yüzden fazın metnine değil
    # "pbxproj'da geçiyor mu" sorusuna bakılıyor.
    baglanmis = set(yollar.values())
    beklenen = []
    for ad in sorted(os.listdir(APP)):
        if ad.endswith((".swift", ".m")):
            beklenen.append(f"Lernomi/{ad}")
    sfx = os.path.join(APP, "sfx")
    if os.path.isdir(sfx):
        beklenen += [f"Lernomi/sfx/{a}" for a in sorted(os.listdir(sfx)) if a.endswith(".mp3")]
    for dil in DILLER:
        lproj = os.path.join(APP, f"{dil}.lproj")
        if os.path.isdir(lproj):
            beklenen += [f"Lernomi/{dil}.lproj/{a}" for a in sorted(os.listdir(lproj)) if a.endswith(".strings")]
    for yol in beklenen:
        if yol not in baglanmis:
            hatalar.append(f"diskte var ama pbxproj'a bağlı değil: {yol}")

    # Kaynak dosyalar derlemeye, kaynaklar Resources fazına girmeli.
    for uuid, ref in BUILD_FILE.findall(src):
        yol = yollar.get(ref, "")
        beklenen_faz = BEKLENEN_FAZ.get(os.path.splitext(yol)[1])
        if beklenen_faz and uuid not in fazlar[beklenen_faz]:
            hatalar.append(f"{yol}: {beklenen_faz} fazında değil")

    return hatalar, f"{len(tanimli)} nesne, {len(yollar)} dosya başvurusu"


# --- 2. Sürüm üçlüsü ----------------------------------------------------------

def check_versions():
    hatalar = []
    gradle = read(GRADLE)
    ts = read(VERSION_TS)
    pbx = read(PBXPROJ)

    def tek(ad, degerler, kaynak):
        benzersiz = set(degerler)
        if not benzersiz:
            hatalar.append(f"{kaynak}: {ad} bulunamadı")
            return None
        if len(benzersiz) > 1:
            hatalar.append(f"{kaynak}: {ad} kendi içinde tutarsız → {sorted(benzersiz)}")
            return None
        return benzersiz.pop()

    ad_kod = [
        ("build.gradle", tek("versionName", re.findall(r'versionName\s+"([^"]+)"', gradle), "build.gradle"),
         tek("versionCode", re.findall(r"versionCode\s+(\d+)", gradle), "build.gradle")),
        ("version.ts", tek("APP_VERSION", re.findall(r'APP_VERSION\s*=\s*"([^"]+)"', ts), "version.ts"),
         tek("APP_VERSION_CODE", re.findall(r"APP_VERSION_CODE\s*=\s*(\d+)", ts), "version.ts")),
        ("project.pbxproj", tek("MARKETING_VERSION", re.findall(r"MARKETING_VERSION = ([^;]+);", pbx), "pbxproj"),
         tek("CURRENT_PROJECT_VERSION", re.findall(r"CURRENT_PROJECT_VERSION = ([^;]+);", pbx), "pbxproj")),
    ]

    adlar = {a for _, a, _ in ad_kod if a is not None}
    kodlar = {k for _, _, k in ad_kod if k is not None}
    if len(adlar) > 1:
        hatalar.append("sürüm adı üç kaynakta AYNI DEĞİL: "
                       + ", ".join(f"{k}={a}" for k, a, _ in ad_kod))
    if len(kodlar) > 1:
        hatalar.append("sürüm kodu üç kaynakta AYNI DEĞİL: "
                       + ", ".join(f"{k}={c}" for k, _, c in ad_kod))

    ad = adlar.pop() if len(adlar) == 1 else "?"
    kod = kodlar.pop() if len(kodlar) == 1 else "?"
    return hatalar, f"{ad} / {kod} — build.gradle, version.ts, pbxproj"


# --- 3. AppIcon ---------------------------------------------------------------

def png_boyut(path):
    with open(path, "rb") as f:
        bas = f.read(24)
    if len(bas) < 24 or bas[:8] != b"\x89PNG\r\n\x1a\n" or bas[12:16] != b"IHDR":
        return None
    return struct.unpack(">II", bas[16:24])


def check_appicon():
    hatalar = []
    contents = os.path.join(APPICON, "Contents.json")
    if not os.path.exists(contents):
        return [f"{rel(contents)} yok"], ""
    girisler = json.loads(read(contents)).get("images", [])
    kullanilan = set()

    for giris in girisler:
        etiket = f"{giris.get('idiom','?')} {giris.get('size','?')}@{giris.get('scale','?')}"
        ad = giris.get("filename")
        if not ad:
            hatalar.append(f"dosyasız giriş: {etiket}")
            continue
        kullanilan.add(ad)
        yol = os.path.join(APPICON, ad)
        if not os.path.exists(yol):
            hatalar.append(f"eksik dosya: {ad} ({etiket})")
            continue
        boyut = png_boyut(yol)
        if boyut is None:
            hatalar.append(f"PNG olarak okunamadı: {ad}")
            continue
        try:
            kenar = float(giris["size"].split("x")[0])
            olcek = float(giris["scale"].rstrip("x"))
        except (KeyError, ValueError):
            hatalar.append(f"size/scale okunamadı: {etiket}")
            continue
        bekleniyor = int(round(kenar * olcek))
        if boyut != (bekleniyor, bekleniyor):
            hatalar.append(f"{ad}: {boyut[0]}x{boyut[1]} piksel, {etiket} için {bekleniyor}x{bekleniyor} bekleniyor")

    for ad in sorted(os.listdir(APPICON)):
        if ad.endswith(".png") and ad not in kullanilan:
            hatalar.append(f"Contents.json'da geçmeyen artık dosya: {ad}")

    return hatalar, f"{len(girisler)} giriş, {len(kullanilan)} PNG"


# --- 4. .strings --------------------------------------------------------------

SATIR = re.compile(r'^\s*"((?:[^"\\]|\\.)*)"\s*=\s*"((?:[^"\\]|\\.)*)"\s*;\s*$')


def yorumsuz(metin):
    """Yorumları atar ama satır numaraları kaysın diye satır sonlarını korur."""
    out, i, n = [], 0, len(metin)
    while i < n:
        if metin.startswith("/*", i):
            j = metin.find("*/", i + 2)
            j = n if j < 0 else j + 2
            out.append("\n" * metin.count("\n", i, j))
            i = j
            continue
        if metin.startswith("//", i):
            j = metin.find("\n", i)
            i = n if j < 0 else j
            continue
        out.append(metin[i])
        i += 1
    return "".join(out)


def check_strings():
    hatalar = []
    tablolar = {}
    for dil in DILLER:
        lproj = os.path.join(APP, f"{dil}.lproj")
        if not os.path.isdir(lproj):
            hatalar.append(f"{dil}.lproj klasörü yok")
            continue
        for ad in sorted(os.listdir(lproj)):
            if not ad.endswith(".strings"):
                continue
            yol = os.path.join(lproj, ad)
            anahtarlar = []
            for no, satir in enumerate(yorumsuz(read(yol)).splitlines(), 1):
                if not satir.strip():
                    continue
                m = SATIR.match(satir)
                if not m:
                    hatalar.append(f"{dil}.lproj/{ad}:{no} biçim bozuk: {satir.strip()[:60]}")
                    continue
                if not m.group(2).strip():
                    hatalar.append(f"{dil}.lproj/{ad}:{no} boş değer: {m.group(1)}")
                anahtarlar.append(m.group(1))
            for k in {a for a in anahtarlar if anahtarlar.count(a) > 1}:
                hatalar.append(f"{dil}.lproj/{ad}: yinelenen anahtar {k}")
            tablolar.setdefault(ad, {})[dil] = set(anahtarlar)

    for ad, per_dil in sorted(tablolar.items()):
        eksik_dil = [d for d in DILLER if d not in per_dil]
        for d in eksik_dil:
            hatalar.append(f"{ad}: {d}.lproj'da yok")
        if eksik_dil:
            continue
        birlesim = set().union(*per_dil.values())
        for dil in DILLER:
            for k in sorted(birlesim - per_dil[dil]):
                hatalar.append(f"{ad}: {k} anahtarı {dil}'de yok")

    ozet = ", ".join(f"{ad} {len(next(iter(p.values())))} anahtar" for ad, p in sorted(tablolar.items()) if p)
    return hatalar, ozet


# --- 5. CFBundleLocalizations ↔ *.lproj ---------------------------------------

def check_localizations():
    with open(INFO_PLIST, "rb") as f:
        info = plistlib.load(f)
    beyan = set(info.get("CFBundleLocalizations") or [])
    diskte = {a[:-len(".lproj")] for a in os.listdir(APP) if a.endswith(".lproj")}
    hatalar = []
    for dil in sorted(beyan - diskte):
        hatalar.append(f"CFBundleLocalizations'da var, {dil}.lproj yok: {dil}")
    for dil in sorted(diskte - beyan):
        hatalar.append(f"{dil}.lproj var, CFBundleLocalizations'da yok: {dil}")
    return hatalar, ", ".join(sorted(beyan)) or "beyan yok"


# --- 6. Swift / ObjC kaba sözdizimi -------------------------------------------

def _dize_atla(src, i):
    """Açılış tırnağından sonrasını atlar; Swift `\\( )` ara değerini de sayar."""
    n = len(src)
    i += 1
    while i < n:
        c = src[i]
        if c == "\\":
            if i + 1 < n and src[i + 1] == "(":
                i = _interp_atla(src, i + 1)
            else:
                i += 2
            continue
        if c == '"':
            return i + 1
        if c == "\n":
            return i  # kapanmamış dize; satırda bırak
        i += 1
    return i


def _interp_atla(src, i):
    n, derinlik = len(src), 0
    while i < n:
        c = src[i]
        if c == '"':
            i = _dize_atla(src, i)
            continue
        if c == "(":
            derinlik += 1
        elif c == ")":
            derinlik -= 1
            if derinlik == 0:
                return i + 1
        i += 1
    return i


def _bloklar(src, ic_ice):
    """(baslangic, bitis) blok yorumları. Swift'te `/* */` iç içe geçebilir, C'de geçmez."""
    out, i, n = [], 0, len(src)
    while i < n:
        if src.startswith("//", i):
            j = src.find("\n", i)
            i = n if j < 0 else j
            continue
        if src[i] == '"':
            i = _dize_atla(src, i)
            continue
        if src.startswith("/*", i):
            bas, derinlik, i = i, 1, i + 2
            while i < n and derinlik:
                if ic_ice and src.startswith("/*", i):
                    derinlik += 1
                    i += 2
                elif src.startswith("*/", i):
                    derinlik -= 1
                    i += 2
                else:
                    i += 1
            out.append((bas, i))
            continue
        i += 1
    return out


def _kod(src, ic_ice):
    out, i, n = [], 0, len(src)
    while i < n:
        if src.startswith("//", i):
            j = src.find("\n", i)
            i = n if j < 0 else j
            continue
        if src.startswith('"""', i):
            j = src.find('"""', i + 3)
            i = n if j < 0 else j + 3
            continue
        if src[i] == '"':
            i = _dize_atla(src, i)
            continue
        if src.startswith("/*", i):
            derinlik, i = 1, i + 2
            while i < n and derinlik:
                if ic_ice and src.startswith("/*", i):
                    derinlik += 1
                    i += 2
                elif src.startswith("*/", i):
                    derinlik -= 1
                    i += 2
                else:
                    i += 1
            continue
        out.append(src[i])
        i += 1
    return "".join(out)


def check_sources():
    hatalar = []
    # Uygulama kaynakları + UI test kaynakları. Test hedefi pbxproj'a CI'da
    # ekleniyor (bkz. ios-add-uitest-target.rb), yani dosyaları yukarıdaki
    # pbxproj beklentisine GİRMİYOR — ama sözdizimi denetimi onlar için de
    # geçerli: yorumun ortasında kapanan bir blok orada da derlemeyi kırar.
    kaynaklar = []
    for kok in (APP, os.path.join(IOS, "LernomiUITests")):
        if not os.path.isdir(kok):
            continue
        for a in sorted(os.listdir(kok)):
            if a.endswith((".swift", ".m")):
                kaynaklar.append((a, os.path.join(kok, a)))
    dosyalar = [a for a, _ in kaynaklar]
    for ad, yol in kaynaklar:
        src = read(yol)
        ic_ice = ad.endswith(".swift")  # Swift'te blok yorumu iç içe geçer, ObjC'de geçmez

        # Çok satırlı bir blok yorumu satırın ORTASINDA kapanıyorsa gerisi kod
        # sayılır. Tek satırlık `/* yut */` meşru, o yüzden dışarıda.
        for bas, bit in _bloklar(src, ic_ice):
            if src.count("\n", bas, bit) == 0:
                continue
            satir_sonu = src.find("\n", bit)
            kalan = src[bit:satir_sonu if satir_sonu > 0 else len(src)]
            if kalan.strip():
                no = src.count("\n", 0, bit) + 1
                hatalar.append(f"{ad}:{no} blok yorumu satır ortasında kapanıyor, "
                               f"gerisi kod sayılır: {kalan.strip()[:50]}")

        kod = _kod(src, ic_ice)
        for ac, kap, isim in (("{", "}", "süslü"), ("(", ")", "yuvarlak"), ("[", "]", "köşeli")):
            if kod.count(ac) != kod.count(kap):
                hatalar.append(f"{ad}: dengesiz {isim} parantez — "
                               f"{kod.count(ac)} '{ac}' / {kod.count(kap)} '{kap}'")
    return hatalar, f"{len(dosyalar)} dosya: " + ", ".join(dosyalar)


# --- koşum --------------------------------------------------------------------

DENETIMLER = [
    ("pbxproj bütünlüğü", check_pbxproj),
    ("sürüm üçlüsü", check_versions),
    ("AppIcon ölçüleri", check_appicon),
    (".strings sözlükleri", check_strings),
    ("dil beyanı ↔ .lproj", check_localizations),
    ("Swift/ObjC sözdizimi", check_sources),
]


def main():
    kirik = 0
    for ad, fn in DENETIMLER:
        try:
            hatalar, ozet = fn()
        except Exception as e:  # denetimin kendisi patlarsa sessizce geçmesin
            hatalar, ozet = [f"denetim çalışmadı: {type(e).__name__}: {e}"], ""
        if hatalar:
            kirik += 1
            print(f"HATA   {ad}")
            for h in hatalar:
                print(f"       - {h}")
        else:
            print(f"tamam  {ad:22s} {ozet}")
    if kirik:
        print(f"\n{kirik} denetim düştü.")
        return 1
    print(f"\n{len(DENETIMLER)} denetimin hepsi geçti.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
