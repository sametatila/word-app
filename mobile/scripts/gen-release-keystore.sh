#!/usr/bin/env bash
# Lernomi Android release imza anahtarı üretir. Anahtar ve parolalar repoda TUTULMAZ.
# Kullanım: bash mobile/scripts/gen-release-keystore.sh
set -euo pipefail
cd "$(dirname "$0")/../android/app"
OUT=release.keystore
if [ -f "$OUT" ]; then echo "$OUT zaten var — üzerine yazma; kaybolursa mağaza güncellemesi imzalanamaz."; exit 1; fi
read -rsp "Keystore parolası: " STOREPW; echo
keytool -genkeypair -v -keystore "$OUT" -alias lernomi \
  -keyalg RSA -keysize 4096 -validity 10000 \
  -storepass "$STOREPW" -keypass "$STOREPW" \
  -dname "CN=Lernomi, O=Lernomi, C=DE"
cat > ../keystore.properties <<PROP
storeFile=release.keystore
storePassword=$STOREPW
keyAlias=lernomi
keyPassword=$STOREPW
PROP
echo "Oluşturuldu: android/app/$OUT + android/keystore.properties (ikisi de gitignore)."
echo "YEDEKLE: bu anahtar kaybolursa Play Store'da uygulama GÜNCELLENEMEZ."
