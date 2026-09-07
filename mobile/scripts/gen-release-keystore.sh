#!/usr/bin/env bash
# Lernomi Android yayın (upload) imza anahtarını üretir. Anahtar ve parolalar
# repoda TUTULMAZ: hem release.keystore hem keystore.properties gitignore'da.
#
# ANAHTAR İKİ İŞ YAPIYOR ve ikisinin kayıp sonucu farklı:
#
#   Play (AAB)          Play App Signing devrede: bu anahtar YÜKLEME anahtarıdır.
#                       Kaybolursa Google'dan sıfırlama istenebilir — can sıkıcı,
#                       ama kurtarılabilir.
#   Yan dağıtım (APK)   GitHub sürümünden inen APK'yı imzalayan da bu. Orada
#                       kurtarma YOK: anahtar değişirse o kullanıcılar bir daha
#                       güncelleme alamaz, uygulamayı silip yeniden kurmaları
#                       gerekir (ve verileri gider).
#
# Yani asıl yedekleme sebebi ikincisi. Anahtarı ve parolasını, birbirinden ayrı
# iki yerde sakla.
#
# Kullanım: bash mobile/scripts/gen-release-keystore.sh
set -euo pipefail
cd "$(dirname "$0")/../android/app"

OUT=release.keystore
PROPS=../keystore.properties
ALIAS=lernomi

# İkisinden biri varsa dokunmuyoruz: üzerine yazmak, çalışan bir imzayı sessizce
# değiştirmek demek.
if [ -f "$OUT" ]; then
  echo "$OUT zaten var — üzerine yazılmayacak." >&2
  echo "Anahtar duruyor ama keystore.properties eksikse onu elle doldurun (bkz. keystore.properties.example)." >&2
  exit 1
fi
if [ -f "$PROPS" ]; then
  echo "keystore.properties zaten var — üzerine yazılmayacak. Önce onu inceleyin." >&2
  exit 1
fi

# Parola iki kez soruluyor: yanlış yazılan parola anahtarı kurtarılamaz yapıyor,
# ve hata ancak aylar sonra, yeni sürüm imzalanırken ortaya çıkıyor.
read -rsp "Keystore parolası (en az 12 karakter): " STOREPW; echo
read -rsp "Parolayı yeniden yazın: " STOREPW2; echo
if [ "$STOREPW" != "$STOREPW2" ]; then
  echo "Parolalar aynı değil; hiçbir şey üretilmedi." >&2
  exit 1
fi
if [ "${#STOREPW}" -lt 12 ]; then
  echo "Parola çok kısa (en az 12 karakter); hiçbir şey üretilmedi." >&2
  exit 1
fi

# 10000 gün ≈ 27 yıl: Play, anahtarın 2033'ten sonrasına kadar geçerli olmasını
# istiyor ve süresi dolan bir anahtarla yeni sürüm yüklenemiyor.
keytool -genkeypair -v -keystore "$OUT" -alias "$ALIAS" \
  -keyalg RSA -keysize 4096 -validity 10000 \
  -storepass "$STOREPW" -keypass "$STOREPW" \
  -dname "CN=Lernomi, O=Lernomi, C=DE"

cat > "$PROPS" <<PROP
storeFile=$OUT
storePassword=$STOREPW
keyAlias=$ALIAS
keyPassword=$STOREPW
PROP
chmod 600 "$PROPS"

echo
echo "Oluşturuldu: android/app/$OUT + android/keystore.properties (ikisi de gitignore)."
echo

# Parmak izleri: Google ile Giriş'in Android OAuth istemcisi paket adı + SHA-1
# eşleşmesiyle çalışıyor. Bu anahtarın SHA-1'i kaydedilmezse Play dışı APK'da
# giriş DEVELOPER_ERROR ile kapanır. (Play'den inen sürüm Google'ın kendi imza
# anahtarını taşır; onun SHA-1'i Console › Setup › App signing'den alınır ve
# AYRI bir istemci olarak kaydedilir — bkz. docs/play/console.md §2.)
echo "== Parmak izleri (Google Cloud › OAuth istemcisi için) =="
keytool -list -v -keystore "$OUT" -alias "$ALIAS" -storepass "$STOREPW" \
  | grep -E "SHA1:|SHA256:" || true

cat <<'SON'

Şimdi, sırayla:
  1. YEDEKLE: android/app/release.keystore dosyasını ve parolasını birbirinden
     AYRI iki yerde sakla. Yan dağıtımda kaybı geri alınamaz.
  2. SHA-1'i Google Cloud › APIs & Services › Credentials'ta paket adı
     com.lernomi.learn ile bir Android OAuth istemcisine kaydet.
  3. Yayın yapısını üret: npm run release:android
SON
