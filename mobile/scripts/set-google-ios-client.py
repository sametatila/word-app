#!/usr/bin/env python3
"""
iOS Google OAuth istemcisini İKİ dosyaya birden yazar — tek komut, tek değer.

Neden betik: aynı istemci kimliği iki ayrı yerde, iki ayrı YAZIMDA duruyor ve
ikisi elle tutulursa er geç ayrışıyor:

  1. src/lib/googleAuth.ts  → IOS_CLIENT_ID = "<num>-<harf>.apps.googleusercontent.com"
  2. ios/Lernomi/Info.plist → CFBundleURLSchemes = "com.googleusercontent.apps.<num>-<harf>"
                              (TERS yazım: alan adı atılır, sırası çevrilir)

Yalnız biri dolarsa giriş ÇALIŞMAZ ve hata yanıltıcıdır: kimlik doluysa ama şema
yoksa Google'ın hesap seçicisi açılır, kullanıcı hesabını seçer ve uygulamaya
geri DÖNEMEZ (geri dönüş şeması yok). Şema doluysa ama kimlik boşsa düğme hiç
çizilmez (`googleSupported()`), yani "yaptım ama olmadı" denen sessiz durum.
Buradan yazınca ikisi tanım gereği tutarlı; kapı ayrıca `check-ios.py`de.

Kullanım:
  python3 scripts/set-google-ios-client.py 658160017552-abc123.apps.googleusercontent.com
  python3 scripts/set-google-ios-client.py --clear     # iOS Google girişini kapat
  npm run google:ios -- <istemci-kimliği>

Kimlik SIR DEĞİL: uygulama paketinde zaten gömülü, depoya girmesi normal
(Android'in paket adı + SHA-1 eşlemesinin iOS'taki karşılığı). Gizli olan
GOOGLE_CLIENT_SECRET'tır ve o yalnız sunucuda durur.

Web istemcisine DOKUNMAZ: idToken'ın `aud`'u web client ID olmaya devam eder
(kütüphane `webClientId`'yi GIDConfiguration'a `serverClientID` olarak veriyor,
Google da ID token'ın audience'ını ondan üretiyor), sunucudaki GOOGLE_CLIENT_ID
de odur. Yani bu betik yalnız "uygulamayı tanıtan" kimliği değiştirir.
"""
import os
import plistlib
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GOOGLE_TS = os.path.join(ROOT, "src", "lib", "googleAuth.ts")
INFO_PLIST = os.path.join(ROOT, "ios", "Lernomi", "Info.plist")
PBXPROJ = os.path.join(ROOT, "ios", "Lernomi.xcodeproj", "project.pbxproj")

# Google'ın iOS istemci kimliği: <proje numarası>-<karma>.apps.googleusercontent.com
CLIENT_ID = re.compile(r"^(\d+)-([a-z0-9]+)\.apps\.googleusercontent\.com$")
YER_TUTUCU = "com.googleusercontent.apps.YER-TUTUCU"
# `: string` ek açıklaması İSTEĞE BAĞLI eşleşiyor ama googleAuth.ts'te ZORUNLU:
# olmadan sabit literal tip sayılıyor ve kimlik dolduğu an `!== ""` TS2367 veriyor.
# Desen ikisini de kabul ediyor ki oradaki açıklama bir gün değişse betik susmasın.
IOS_CLIENT_SATIRI = re.compile(r'^(const IOS_CLIENT_ID(?::\s*string)?\s*=\s*)"(.*)";$', re.M)


def ters(client_id: str) -> str:
    """`<num>-<karma>.apps.googleusercontent.com` → `com.googleusercontent.apps.<num>-<karma>`."""
    return "com.googleusercontent.apps." + client_id[: -len(".apps.googleusercontent.com")]


def bundle_id() -> str:
    """pbxproj'daki PRODUCT_BUNDLE_IDENTIFIER — Google Console'a girilecek değer."""
    m = re.search(r"PRODUCT_BUNDLE_IDENTIFIER = ([^;]+);", open(PBXPROJ, encoding="utf-8").read())
    return m.group(1).strip().strip('"') if m else "(okunamadı)"


def ts_yaz(deger: str) -> bool:
    src = open(GOOGLE_TS, encoding="utf-8").read()
    m = IOS_CLIENT_SATIRI.search(src)
    if not m:
        sys.exit(f"HATA: {GOOGLE_TS} içinde `const IOS_CLIENT_ID = \"...\";` satırı bulunamadı.")
    if m.group(2) == deger:
        return False
    # Satırın SOL yanı (tip açıklaması dahil) korunuyor; yalnız dize değişiyor.
    open(GOOGLE_TS, "w", encoding="utf-8").write(
        src[: m.start()] + m.group(1) + f'"{deger}";' + src[m.end():]
    )
    return True


def plist_yaz(sema: str) -> bool:
    """CFBundleURLTypes içindeki google şemasını değiştirir.

    plistlib ile YAZMIYORUZ: dosya elle tutuluyor ve her anahtarın yanında neden
    yorumu var; plistlib yeniden yazsa yorumların hepsi silinirdi. Bu yüzden
    yalnız şema dizgisi metin olarak değiştiriliyor, sonra plistlib ile OKUNUP
    doğrulanıyor (bozuk XML bırakmayalım).
    """
    src = open(INFO_PLIST, encoding="utf-8").read()
    mevcut = re.search(r"<string>(com\.googleusercontent\.apps\.[^<]*)</string>", src)
    if not mevcut:
        sys.exit(f"HATA: {INFO_PLIST} içinde com.googleusercontent.apps.* şeması bulunamadı.")
    if mevcut.group(1) == sema:
        return False
    yeni = src[: mevcut.start(1)] + sema + src[mevcut.end(1):]
    plistlib.loads(yeni.encode("utf-8"))  # bozuksa burada patlar, dosyaya yazılmaz
    open(INFO_PLIST, "w", encoding="utf-8").write(yeni)
    return True


def main() -> int:
    arg = sys.argv[1] if len(sys.argv) > 1 else ""
    if not arg or arg in ("-h", "--help"):
        print(__doc__.strip())
        return 0 if arg else 2

    if arg == "--clear":
        client_id, sema, ne = "", YER_TUTUCU, "KAPATILDI (iOS'ta Google düğmesi çizilmez)"
    else:
        client_id = arg.strip()
        if not CLIENT_ID.match(client_id):
            print(
                "HATA: iOS istemci kimliği beklenen biçimde değil.\n"
                f"  verilen : {client_id}\n"
                "  beklenen: <proje-numarası>-<karma>.apps.googleusercontent.com\n\n"
                "Google Cloud › Kimlik Bilgileri › OAuth 2.0 İstemci Kimlikleri › (iOS satırı)\n"
                "TERS yazımı (com.googleusercontent.apps.…) DEĞİL, düz yazımı verin;\n"
                "tersini bu betik kendisi üretir.",
                file=sys.stderr,
            )
            return 2
        sema, ne = ters(client_id), "AÇILDI"

    degisti = [ad for ad, d in (("googleAuth.ts", ts_yaz(client_id)), ("Info.plist", plist_yaz(sema))) if d]

    print(f"iOS Google girişi: {ne}")
    print(f"  googleAuth.ts  IOS_CLIENT_ID   = {client_id or '(boş)'}")
    print(f"  Info.plist     CFBundleURLScheme = {sema}")
    print(f"  değişen dosya  : {', '.join(degisti) if degisti else '(ikisi de zaten böyleydi)'}")
    if client_id:
        print(f"\nGoogle Console'daki iOS istemcisinin paket kimliği {bundle_id()} OLMALI;")
        print("ayrışırsa giriş 'invalid client' ile düşer ve bunu buradan göremeyiz.")

    print()
    # Alt sürecin çıktısı bizimkinden ÖNCE görünmesin: kendi tamponumuz boşalmadan
    # check-ios.py yazmaya başlıyor ve rapor tersten okunuyordu.
    sys.stdout.flush()
    return subprocess.call([sys.executable, os.path.join(ROOT, "scripts", "check-ios.py")])


if __name__ == "__main__":
    sys.exit(main())
