#!/usr/bin/env bash
# Lernomi — 16 KB sayfa boyutu doğrulaması (Play zorunluluğu).
#
# NEDEN VAR: Play, Android 15+ hedefleyen yeni sürümlerden native kitaplıkların
# 16 KB sayfa boyutlu cihazlarda çalışmasını istiyor. `useLegacyPackaging = false`
# yalnız APK/AAB İÇİNDE hizalı paketlemeyi sağlıyor; asıl koşul her 64-bit .so'nun
# LOAD segment hizasının 16384 (0x4000) olması. İkisi ayrı şey ve ikincisi
# yapılandırmadan okunamaz — üretilen dosyanın kendisine bakmak gerekir.
#
# NE DOĞRULAR:
#   1) Her 64-bit ABI'deki (arm64-v8a, x86_64) .so'nun LOAD hizası >= 16 KB.
#   2) APK verildiyse ayrıca zipalign -P 16 (arşiv içi hizalama).
# NE DOĞRULAMAZ: kitaplığın 16 KB'lik bir cihazda gerçekten çalıştığını. Onun için
# 16 KB sayfa boyutlu bir emülatör görüntüsü ya da cihaz gerekiyor.
#
# 32-bit ABI'ler (armeabi-v7a, x86) kapsam dışı: 16 KB sayfa boyutu yalnız 64-bit
# cihazların meselesi, o ABI'lerde 4 KB hiza doğru olandır.
#
# Kullanım:
#   bash mobile/scripts/check-16kb.sh [dosya.aab|dosya.apk]
# Varsayılan dosya: android/app/build/outputs/bundle/release/app-release.aab
# NDK yolu ortamdan: ANDROID_NDK_HOME ya da ANDROID_HOME/ndk/<sürüm>.
set -euo pipefail

cd "$(dirname "$0")/.."

TARGET=${1:-android/app/build/outputs/bundle/release/app-release.aab}
PAGE=16384

if [ ! -f "$TARGET" ]; then
  echo "HATA: dosya yok: $TARGET" >&2
  echo "Önce yayın yapısını üretin: bash mobile/scripts/release-android.sh" >&2
  exit 2
fi

# --- llvm-readelf: NDK'nın içinde. Sistem readelf'i de işi görür ama NDK'daki
#     her zaman doğru sürüm ve zaten kurulu (derleme onu kullanıyor). ---
find_readelf() {
  local sdk="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Android/Sdk}}"
  local candidates=()
  [ -n "${ANDROID_NDK_HOME:-}" ] && candidates+=("$ANDROID_NDK_HOME"/toolchains/llvm/prebuilt/*/bin/llvm-readelf)
  candidates+=("$sdk"/ndk/*/toolchains/llvm/prebuilt/*/bin/llvm-readelf)
  local c
  for c in "${candidates[@]}"; do
    [ -x "$c" ] && { echo "$c"; return 0; }
  done
  command -v llvm-readelf 2>/dev/null && return 0
  command -v readelf 2>/dev/null && return 0
  return 1
}

READELF=$(find_readelf) || {
  echo "HATA: llvm-readelf bulunamadı (NDK kurulu mu?)." >&2
  exit 2
}

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

case "$TARGET" in
  *.aab) LIB_GLOB="base/lib/*/*.so" ;;
  *.apk) LIB_GLOB="lib/*/*.so" ;;
  *) echo "HATA: .aab ya da .apk bekleniyor, gelen: $TARGET" >&2; exit 2 ;;
esac

# shellcheck disable=SC2086
unzip -qo "$TARGET" $LIB_GLOB -d "$WORK" || true

mapfile -t LIBS < <(find "$WORK" -name "*.so" | sort)
if [ ${#LIBS[@]} -eq 0 ]; then
  echo "HATA: $TARGET içinde native kitaplık yok. Doğru dosya mı?" >&2
  exit 2
fi

echo "16 KB sayfa boyutu denetimi — $TARGET"
echo

fail=0
checked=0
skipped=0

for so in "${LIBS[@]}"; do
  abi=$(basename "$(dirname "$so")")
  name=$(basename "$so")
  case "$abi" in
    arm64-v8a|x86_64) ;;
    *) skipped=$((skipped + 1)); continue ;;
  esac
  # LOAD satırlarının son sütunu hiza (Align). En büyüğü kitaplığın gerçek
  # gereksinimi; onu 16384 ile karşılaştırıyoruz.
  align=$("$READELF" -lW "$so" 2>/dev/null | awk '$1 == "LOAD" { print $NF }' | sort -u | tail -1)
  checked=$((checked + 1))
  if [ -z "$align" ]; then
    printf '  %-12s %-34s %s\n' "$abi" "$name" "LOAD segmenti okunamadı"
    fail=1
    continue
  fi
  dec=$((align))
  if [ "$dec" -ge "$PAGE" ]; then
    printf '  %-12s %-34s hiza %s — uygun\n' "$abi" "$name" "$align"
  else
    printf '  %-12s %-34s hiza %s — 16 KB DEĞİL\n' "$abi" "$name" "$align"
    fail=1
  fi
done

echo
echo "64-bit kitaplık: $checked denetlendi, $skipped atlandı (32-bit, kapsam dışı)."

# --- APK ise arşiv içi hizalama da ölçülür. AAB'de karşılığı yok: Play indirilecek
#     APK'ları bundle'dan kendisi üretiyor ve hizalamayı o sırada yapıyor. ---
if [[ "$TARGET" == *.apk ]]; then
  SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Android/Sdk}}"
  ZIPALIGN=$(ls -d "$SDK"/build-tools/*/zipalign 2>/dev/null | sort -V | tail -1 || true)
  if [ -n "$ZIPALIGN" ] && [ -x "$ZIPALIGN" ]; then
    echo
    if "$ZIPALIGN" -c -P 16 4 "$TARGET" >/dev/null 2>&1; then
      echo "zipalign -P 16: uygun"
    else
      echo "zipalign -P 16: UYGUN DEĞİL"
      fail=1
    fi
  else
    echo
    echo "Not: zipalign bulunamadı, arşiv içi hizalama ölçülmedi."
  fi
fi

echo
if [ "$fail" -eq 0 ]; then
  echo "SONUÇ: geçti."
else
  echo "SONUÇ: KALDI — yukarıdaki kitaplıklar 16 KB sayfa boyutuna hazır değil." >&2
  echo "Genellikle çözüm bağımlılığı güncellemek ya da NDK r27+ ile yeniden derlemek." >&2
fi
exit "$fail"
