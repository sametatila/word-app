#!/usr/bin/env bash
# Lernomi — Android yayın yapısı (Play için AAB + cihazda deneme için APK).
#
# NEDEN VAR: `./gradlew bundleRelease` tek başına mağazaya gidecek bir yapı üretmez.
#
#   1) Yayın anahtarı. Kapının kendisi app/build.gradle'da: keystore.properties yoksa
#      release görevleri düşüyor, `-PallowDebugSigning` ile açılan deneme yapısı da
#      `-devkey` sürüm ekiyle işaretleniyor. Buradaki denetim onun erken ve okunur
#      hâli — gradle'ı hiç başlatmadan aynı şeyi söylüyor.
#   2) Sürüm dört ayrı dosyada yazılı. Tek kaynak package.json; ötekilere
#      ../scripts/version.mjs basıyor ve aynı betik ayrışmayı denetliyor. Biri
#      geride kalırsa Play'e yanlış sürümle yükleme yapılır.
#
# Betik ikisini de yapıdan ÖNCE kapatıyor, sonra üretiyor, sonra ürettiğini
# doğruluyor: imzanın debug olmadığı ve 16 KB sayfa boyutu.
#
# NE DOĞRULAR: imza, sürüm tutarlılığı, 16 KB hizalama, dosyaların varlığı.
# NE DOĞRULAMAZ: uygulamanın çalıştığını. R8 kırılmaları yalnız cihazda görünür —
# üretilen APK'yı gerçek bir telefona kurup akışı koşmadan Play'e yükleme yapılmamalı.
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
# Karşılaştırmayı BU BETİK YAPMIYOR. Sürümün tek kaynağı ve tek denetleyicisi
# ../scripts/version.mjs; burada ikinci bir uygulama tutmak zaten bir kez
# pahalıya patladı: buradaki denetim üç mobil kaynağa bakıyordu ve web'in
# package.json'ını hiç görmüyordu, dolayısıyla "üç kaynak da aynı" derken
# kullanıcı web'de 1.0.5, mobilde 1.0.0 görüyordu.
step "Sürüm tutarlılığı"
if ! node ../scripts/version.mjs; then
  [ "$CHECK_ONLY" = "1" ] || exit 2
  fail=1
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
YÜKLEME anahtarı: kaybı Google'dan sıfırlatılabilir ama süreç günler alır.
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
# AAB Play'e gider; APK yalnız cihazda duman testine.
step "Gradle"
# Gradle bir JDK istiyor ve bu makinede java PATH'te olmayabiliyor; Gradle'ın kendi
# indirdiği JDK (~/.gradle/jdks) zaten burada duruyor, onu kullanıyoruz.
if [ -z "${JAVA_HOME:-}" ] && ! command -v java >/dev/null 2>&1; then
  for c in "$HOME"/.gradle/jdks/*/bin/java \
           /usr/lib/jvm/*/bin/java \
           "$HOME"/android-studio/jbr/bin/java \
           /opt/android-studio/jbr/bin/java; do
    if [ -x "$c" ]; then JAVA_HOME=$(dirname "$(dirname "$c")"); export JAVA_HOME; break; fi
  done
fi
if [ -z "${JAVA_HOME:-}" ] && ! command -v java >/dev/null 2>&1; then
  echo "HATA: JDK bulunamadı. JAVA_HOME verin ya da JDK 17 kurun." >&2
  exit 2
fi
[ -n "${JAVA_HOME:-}" ] && echo "  JAVA_HOME: $JAVA_HOME"

# PATH'e de koyuyoruz, JAVA_HOME yetmiyor. Adım 4'teki `apksigner` bir sarmalayıcı
# betik ve içinde doğrudan `exec java` var — JAVA_HOME'a hiç bakmıyor. Bu makinede
# java PATH'te olmadığı için imza denetimi "exec: java: not found" ile düşüyordu:
# yani gradle bittikten sonra, mağazaya gidecek yapının DEBUG anahtarıyla
# imzalanmadığını doğrulayan kapı hiç koşmuyordu. Ölçüldü, 2026-09-09.
[ -n "${JAVA_HOME:-}" ] && export PATH="$JAVA_HOME/bin:$PATH"

( cd android && ./gradlew --no-daemon clean bundleRelease assembleRelease )

for f in "$OUT_AAB" "$OUT_APK"; do
  [ -f "$f" ] || { echo "HATA: üretilmedi: $f" >&2; exit 1; }
done

# --- 4. İmza doğrulaması -------------------------------------------------------
step "İmza"
APKSIGNER=$(ls -d "$SDK"/build-tools/*/apksigner 2>/dev/null | sort -V | tail -1 || true)
if [ -n "$APKSIGNER" ] && [ -x "$APKSIGNER" ]; then
  signer=$("$APKSIGNER" verify --print-certs "$OUT_APK" | sed -n 's/^.*certificate DN: //p' | head -1)
  echo "  imzalayan: ${signer:-BULUNAMADI}"
  # Boş gelirse DURUYORUZ. Denetim "Android Debug geçmiyorsa tamam" diye yazılmıştı
  # ve boş dizgede o koşul kendiliğinden sağlanıyordu — yani apksigner'ın çıktısını
  # okuyamadığımız her durumda kapı sessizce AÇILIYORDU. Kapının doğrulayamaması,
  # doğrulamış olması demek değildir.
  if [ -z "$signer" ]; then
    echo "HATA: imzalayan okunamadı; apksigner çıktısı beklenen biçimde değil." >&2
    echo "İmza doğrulanamadan yayın yapısı kabul edilmez." >&2
    exit 1
  fi
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
printf '\n  Play'"'"'e gitmez, cihazda denemek için: %s\n' "$OUT_APK"
cat <<EOF

Yüklemeden önce, sırayla:
  1. APK'yı gerçek bir telefona kurun ve akışı koşun: giriş, günlük tur, ders
     diyaloğu, yürüyüş modu (ekran kapalı), hesap silme. R8 kırılmaları yalnız
     burada görünür.
  2. Play Console kapılarını geçin: docs/play/console.md ve docs/play/data-safety.md.
EOF
