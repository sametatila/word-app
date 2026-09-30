#!/usr/bin/env bash
# React Native'in hazır framework'lerinin (React, ReactNativeDependencies, hermesvm)
# release dSYM'lerini arşivin dSYMs/ klasörüne koyar. ios-archive.sh arşivden SONRA,
# yüklemeden ÖNCE çağırır; elle çalıştırmak gerekmez.
#
# NEDEN BU YOL (2026-09-30):
#  - Yükleme "Upload Symbols Failed … React.framework / ReactNativeDependencies /
#    hermesvm" uyarısı veriyordu: bu üç framework hazır geliyor ve sembolleri arşivde
#    yok, o kütüphanelerdeki çökmeler Xcode Organizer'da okunmuyordu.
#  - RN'in kendi bayrağı (RCT_SYMBOLICATE_PREBUILT_FRAMEWORKS=1) dSYM'i
#    React.framework'ün İÇİNE koyuyor; framework gömülünce App Store yüklemesi
#    "Invalid bundle structure" ile reddediyor (build 12'nin ilk iki denemesi).
#  - Burada semboller uygulama paketine hiç girmiyor: yalnız arşivin dSYMs/
#    klasörüne gidiyor (Xcode'un kendi dSYM'lerinin durduğu yer). Paket ve imza
#    değişmiyor.
#
# GÜVENCE: Maven'daki .sha1 ile doğrulanıyor ve yalnız arşivdeki ikili dosyayla
# UUID'si birebir eşleşen dSYM ekleniyor. Eşleşme yoksa (ör. RN sürümü değişti,
# paket biçimi farklı) uyarı basıp devam ediyor: sembol eksikliği ret sebebi değil,
# yanlış sembol ise yanlış çökme izi demek.
#
# Kullanım: bash mobile/scripts/rn-dsyms.sh <Lernomi.xcarchive>
set -euo pipefail

ARCHIVE="${1:?arşiv yolu gerekli}"
cd "$(dirname "$0")/.."

APP="$ARCHIVE/Products/Applications/Lernomi.app"
[ -d "$APP" ] || { echo "rn-dsyms: $APP yok"; exit 1; }
mkdir -p "$ARCHIVE/dSYMs"

RN_VER=$(node -p "require('react-native/package.json').version")
HERMES_VER=$(sed -n 's/^HERMES_VERSION_NAME=//p' node_modules/react-native/sdks/hermes-engine/version.properties)
MAVEN="https://repo1.maven.org/maven2/com/facebook"
CACHE="${HOME}/Library/Caches/Lernomi/rn-dsyms"

# ad|adres — framework adı arşivdeki Frameworks/<ad>.framework/<ad> ikilisi.
LIST="React|$MAVEN/react/react-native-artifacts/$RN_VER/react-native-artifacts-$RN_VER-reactnative-core-dSYM-release.tar.gz
ReactNativeDependencies|$MAVEN/react/react-native-artifacts/$RN_VER/react-native-artifacts-$RN_VER-reactnative-dependencies-dSYM-release.tar.gz
hermesvm|$MAVEN/hermes/hermes-ios/$HERMES_VER/hermes-ios-$HERMES_VER-hermes-framework-dSYM-release.tar.gz"

uuids() { xcrun dwarfdump --uuid "$1" 2>/dev/null | awk '{print $2}' | sort; }

added=0
missing=0
while IFS='|' read -r NAME URL; do
  BIN="$APP/Frameworks/$NAME.framework/$NAME"
  if [ ! -f "$BIN" ]; then
    echo "rn-dsyms: $NAME.framework arşivde yok, atlandı"
    continue
  fi
  WANT=$(uuids "$BIN")

  FILE="$CACHE/$(basename "$URL")"
  DIR="${FILE%.tar.gz}"
  mkdir -p "$CACHE"
  if [ ! -d "$DIR" ]; then
    if ! curl -fsSL --retry 2 -o "$FILE.part" "$URL"; then
      echo "rn-dsyms: UYARI $NAME dSYM indirilemedi ($URL)"; missing=$((missing + 1)); continue
    fi
    SHA=$(curl -fsSL --retry 2 "$URL.sha1" | awk '{print $1}' || true)
    if [ -z "$SHA" ] || [ "$(shasum -a 1 "$FILE.part" | awk '{print $1}')" != "$SHA" ]; then
      echo "rn-dsyms: UYARI $NAME dSYM SHA-1 tutmadı, kullanılmadı"; rm -f "$FILE.part"; missing=$((missing + 1)); continue
    fi
    mkdir -p "$DIR.tmp" && tar -xzf "$FILE.part" -C "$DIR.tmp" && mv "$DIR.tmp" "$DIR" && rm -f "$FILE.part"
  fi

  FOUND=""
  while IFS= read -r DSYM; do
    DWARF=$(find "$DSYM/Contents/Resources/DWARF" -type f | head -1)
    [ -n "$DWARF" ] || continue
    HAVE=$(uuids "$DWARF")
    # Arşivdeki ikilinin (arm64) UUID'si bu dSYM'de varsa doğru dSYM.
    if [ -n "$WANT" ] && echo "$HAVE" | grep -qx "$WANT"; then FOUND="$DSYM"; break; fi
  done < <(find "$DIR" -type d -name "$NAME.framework.dSYM")

  if [ -n "$FOUND" ]; then
    rm -rf "$ARCHIVE/dSYMs/$NAME.framework.dSYM"
    cp -R "$FOUND" "$ARCHIVE/dSYMs/"
    echo "rn-dsyms: $NAME.framework.dSYM eklendi (UUID $WANT)"
    added=$((added + 1))
  else
    echo "rn-dsyms: UYARI $NAME için UUID'si ($WANT) eşleşen dSYM yok; eklenmedi"
    missing=$((missing + 1))
  fi
done <<< "$LIST"

echo "rn-dsyms: $added eklendi, $missing eksik"
