#!/usr/bin/env bash
# Lernomi — Android yayın yapısı (Play için AAB + yan dağıtım için APK).
#
# NEDEN VAR: `./gradlew bundleRelease` tek başına mağazaya gidecek bir yapı üretmez.
#
#   1) Yayın anahtarı. Kapının kendisi app/build.gradle'da: keystore.properties yoksa
#      release görevleri düşüyor, `-PallowDebugSigning` ile açılan deneme yapısı da
#      `-devkey` sürüm ekiyle işaretleniyor. Buradaki denetim onun erken ve okunur
#      hâli — gradle'ı hiç başlatmadan aynı şeyi söylüyor.
#   2) Sürüm numarası üç ayrı dosyada elle tutuluyor (bkz. mobile/README.md). Biri
#      geride kalırsa uygulama kendini yanlış sürüm sanar ve güncelleme denetimi bozulur.
#
# Betik ikisini de yapıdan ÖNCE kapatıyor, sonra üretiyor, sonra ürettiğini
# doğruluyor: imzanın debug olmadığı ve 16 KB sayfa boyutu.
#
# NE DOĞRULAR: imza, sürüm tutarlılığı, 16 KB hizalama, dosyaların varlığı.
# NE DOĞRULAMAZ: uygulamanın çalıştığını. R8 kırılmaları yalnız cihazda görünür —
# üretilen APK'yı gerçek bir telefona kurup akışı koşmadan yükleme yapılmamalı.
#
# Kullanım:
#   bash mobile/scripts/release-android.sh
# Yalnız denetim (yapı üretmeden):
#   bash mobile/scripts/release-android.sh --check
set -euo pipefail

cd "$(dirname "$0")/.."

CHECK_ONLY=0
[ "${1:-}" = "--check" ] && CHECK_ONLY=1

SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Android/Sdk}}"
OUT_AAB=android/app/build/outputs/bundle/release/app-release.aab
OUT_APK=android/app/build/outputs/apk/release/app-release.apk
MAPPING=android/app/build/outputs/mapping/release/mapping.txt
SYMBOLS=android/app/build/outputs/native-debug-symbols/release/native-debug-symbols.zip

step() { printf '\n== %s\n' "$1"; }

# --check modunda ilk hatada durmuyoruz: bütün denetimler koşup toplu rapor veriyor.
fail=0

# --- 1. Sürüm tutarlılığı ------------------------------------------------------
step "Sürüm tutarlılığı"
ts_name=$(sed -n 's/.*APP_VERSION *= *"\([^"]*\)".*/\1/p' src/version.ts | head -1)
ts_code=$(sed -n 's/.*APP_VERSION_CODE *= *\([0-9]*\).*/\1/p' src/version.ts | head -1)
gr_name=$(sed -n 's/.*versionName *"\([^"]*\)".*/\1/p' android/app/build.gradle | head -1)
gr_code=$(sed -n 's/.*versionCode *\([0-9]*\).*/\1/p' android/app/build.gradle | head -1)
ios_name=$(sed -n 's/.*MARKETING_VERSION *= *\([^;]*\);.*/\1/p' ios/Lernomi.xcodeproj/project.pbxproj | head -1 | tr -d ' ')
ios_code=$(sed -n 's/.*CURRENT_PROJECT_VERSION *= *\([^;]*\);.*/\1/p' ios/Lernomi.xcodeproj/project.pbxproj | head -1 | tr -d ' ')

printf '  version.ts    %s (%s)\n' "$ts_name" "$ts_code"
printf '  build.gradle  %s (%s)\n' "$gr_name" "$gr_code"
printf '  pbxproj       %s (%s)\n' "$ios_name" "$ios_code"

if [ "$ts_name" != "$gr_name" ] || [ "$ts_code" != "$gr_code" ] \
   || [ "$ts_name" != "$ios_name" ] || [ "$ts_code" != "$ios_code" ]; then
  echo "HATA: üç kaynak aynı sürümü söylemiyor; üçünü birden güncelleyin." >&2
  [ "$CHECK_ONLY" = "1" ] || exit 2
  fail=1
else
  echo "Üç kaynak da aynı: $ts_name ($ts_code)."
fi

# --- 2. Yayın anahtarı ---------------------------------------------------------
step "Yayın anahtarı"
if [ ! -f android/keystore.properties ]; then
  cat >&2 <<'EOF'
HATA: android/keystore.properties yok.

Bu dosya olmadan release yapısı üretilmiyor (kapı app/build.gradle'da).
Anahtar üretimi:  bash mobile/scripts/gen-release-keystore.sh
Örnek dosya:      android/keystore.properties.example
Yalnız deneme:    ./gradlew assembleRelease -PallowDebugSigning (mağazaya gidemez)

Anahtar ve parolası YEDEKLENMEDEN ilk yükleme yapılmamalı. Play tarafında bu bir
YÜKLEME anahtarı (kaybı Google'dan sıfırlatılabilir), ama GitHub'dan inen APK'yı
imzalayan da o: orada anahtar değişirse kullanıcılar bir daha güncelleme alamaz.
EOF
  [ "$CHECK_ONLY" = "1" ] || exit 2
  fail=1
else
  echo "keystore.properties var."
fi

if [ "$CHECK_ONLY" = "1" ]; then
  echo
  if [ "$fail" -eq 0 ]; then
    echo "Denetim geçti; yapı üretilmedi (--check)."
  else
    echo "Denetim KALDI; yukarıdaki maddeler kapanmadan yayın yapısı üretilemez." >&2
  fi
  exit "$fail"
fi

# --- 3. Yapı -------------------------------------------------------------------
# AAB Play'e gider; APK yan dağıtıma (GitHub sürümü) ve cihazda duman testine.
step "Gradle"
( cd android && ./gradlew --no-daemon clean bundleRelease assembleRelease )

for f in "$OUT_AAB" "$OUT_APK"; do
  [ -f "$f" ] || { echo "HATA: üretilmedi: $f" >&2; exit 1; }
done

# --- 4. İmza doğrulaması -------------------------------------------------------
step "İmza"
APKSIGNER=$(ls -d "$SDK"/build-tools/*/apksigner 2>/dev/null | sort -V | tail -1 || true)
if [ -n "$APKSIGNER" ] && [ -x "$APKSIGNER" ]; then
  signer=$("$APKSIGNER" verify --print-certs "$OUT_APK" | sed -n 's/^Signer #1 certificate DN: //p')
  echo "  imzalayan: ${signer:-bilinmiyor}"
  if printf '%s' "$signer" | grep -qi "Android Debug"; then
    echo "HATA: APK DEBUG anahtarıyla imzalanmış. Mağazaya gidemez." >&2
    exit 1
  fi
  "$APKSIGNER" verify --min-sdk-version 24 "$OUT_APK" >/dev/null
  echo "  apksigner doğrulaması geçti."
else
  echo "  UYARI: apksigner bulunamadı, imza doğrulanamadı." >&2
fi

# --- 5. 16 KB sayfa boyutu -----------------------------------------------------
step "16 KB sayfa boyutu"
bash scripts/check-16kb.sh "$OUT_AAB" | tail -3
bash scripts/check-16kb.sh "$OUT_APK" | tail -4

# --- 6. Yüklenecekler ----------------------------------------------------------
step "Play Console'a yüklenecekler"
printf '  AAB              %s\n' "$OUT_AAB"
if [ -f "$MAPPING" ]; then printf '  ProGuard eşlemi  %s (çökme izlerinin okunabilmesi için)\n' "$MAPPING"; fi
if [ -f "$SYMBOLS" ]; then printf '  Native semboller %s\n' "$SYMBOLS"; fi
printf '  Yan dağıtım APK  %s\n' "$OUT_APK"
cat <<EOF

Yüklemeden önce, sırayla:
  1. APK'yı gerçek bir telefona kurun ve akışı koşun: giriş, günlük tur, ders
     diyaloğu, yürüyüş modu (ekran kapalı), hesap silme. R8 kırılmaları yalnız
     burada görünür.
  2. Play Console kapılarını geçin: docs/play/console.md ve docs/play/data-safety.md.
EOF
