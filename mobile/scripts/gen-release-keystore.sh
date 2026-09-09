#!/usr/bin/env bash
# Lernomi Android yayın (upload) imza anahtarını üretir. Anahtar ve parolalar
# repoda TUTULMAZ: hem release.keystore hem keystore.properties gitignore'da.
#
# BU BİR YÜKLEME (upload) ANAHTARI, dağıtım anahtarı DEĞİL. Play App Signing yeni
# uygulamalarda zorunlu: kullanıcının telefonuna inen APK'yı Google kendi
# anahtarıyla imzalıyor, buradaki anahtar yalnız "yüklemeyi yapan benim" demeye
# yarıyor.
#
# Kaybı bu yüzden onarılabilir: Google'dan yükleme anahtarı sıfırlaması istenir.
# Ama süreç günler alıyor ve o günlerde yeni sürüm çıkamıyor. Anahtarı ve
# parolasını yine de birbirinden AYRI iki yerde sakla.
#
# (Burada eskiden bir de "yan dağıtım" gerekçesi vardı — GitHub sürümünden inen
# APK'da imza anahtarı değiştirilemez, orada kurtarma yoktur. O dağıtım kanalı
# 96a8d266 ile bırakıldı; gerekçe de onunla düştü.)
#
# Kullanım: bash mobile/scripts/gen-release-keystore.sh
set -euo pipefail
cd "$(dirname "$0")/../android/app"

# keytool JDK'nın parçası ve bu makinede PATH'te olmayabiliyor: Android derlemesi
# Gradle'ın kendi indirdiği JDK ile koşuyor (~/.gradle/jdks). Sırayla bakılıyor —
# ayrı bir JDK kurmak gerekmesin.
find_keytool() {
  if [ -n "${JAVA_HOME:-}" ] && [ -x "$JAVA_HOME/bin/keytool" ]; then
    echo "$JAVA_HOME/bin/keytool"; return 0
  fi
  if command -v keytool >/dev/null 2>&1; then command -v keytool; return 0; fi
  local c
  for c in "$HOME"/.gradle/jdks/*/bin/keytool \
           /usr/lib/jvm/*/bin/keytool \
           "$HOME"/android-studio/jbr/bin/keytool \
           /opt/android-studio/jbr/bin/keytool; do
    [ -x "$c" ] && { echo "$c"; return 0; }
  done
  return 1
}

KEYTOOL=$(find_keytool) || {
  echo "HATA: keytool bulunamadı (JDK yok)." >&2
  echo "JAVA_HOME verin ya da bir JDK 17 kurun; Android derlemesi zaten JDK istiyor." >&2
  exit 2
}
echo "keytool: $KEYTOOL"

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
#
# -storetype AÇIK yazılıyor. JDK 9'dan beri varsayılan zaten PKCS12, ama
# varsayılana güvenmek anahtarın BİÇİMİNİ derlemeyi yapan JDK'ya bağlar; başka
# bir makinede JKS'e düşerse hem her okumada "proprietary format" uyarısı basar
# hem de anahtar eski biçimde kalır. Biçim, anahtarın kendisi kadar kalıcıdır.
"$KEYTOOL" -genkeypair -v -keystore "$OUT" -alias "$ALIAS" \
  -storetype PKCS12 \
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
"$KEYTOOL" -list -v -keystore "$OUT" -alias "$ALIAS" -storepass "$STOREPW" \
  | grep -E "SHA1:|SHA256:" || true

cat <<'SON'

Şimdi, sırayla:
  1. YEDEKLE: android/app/release.keystore dosyasını ve parolasını birbirinden
     AYRI iki yerde sakla. Yan dağıtımda kaybı geri alınamaz.
  2. SHA-1'i Google Cloud › APIs & Services › Credentials'ta paket adı
     com.lernomi.learn ile bir Android OAuth istemcisine kaydet.
  3. Yayın yapısını üret: npm run release:android
SON
