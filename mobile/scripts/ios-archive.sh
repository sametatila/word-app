#!/usr/bin/env bash
# Lernomi iOS arşivi üretir ve isteğe bağlı App Store Connect'e yükler.
# Yalnız macOS + Xcode. Sertifika, takım kimliği ve API anahtarı repoda TUTULMAZ.
# Kullanım: bash mobile/scripts/ios-archive.sh [--upload]
set -euo pipefail

cd "$(dirname "$0")/.."

SCHEME=Lernomi
WORKSPACE=ios/Lernomi.xcworkspace
BUILD=ios/build
ARCHIVE="$BUILD/$SCHEME.xcarchive"
EXPORT="$BUILD/export"

[ "$(uname -s)" = "Darwin" ] || { echo "Bu betik yalnız macOS'ta çalışır (xcodebuild gerekiyor)."; exit 1; }
command -v xcodebuild >/dev/null || { echo "xcodebuild yok — Xcode kurulu mu?"; exit 1; }

# Pod'lar depoda değil; workspace ancak pod install'dan sonra var olur.
[ -d "$WORKSPACE" ] || { echo "$WORKSPACE yok. Önce: bundle install && bundle exec pod install --project-directory=ios"; exit 1; }

# Takım kimliği repoya girmiyor: ortamdan gelir. Xcode "Automatic" imzalıyor,
# yalnız hangi hesabın imzalayacağını bilmek zorunda.
: "${DEVELOPMENT_TEAM:?DEVELOPMENT_TEAM tanımlı değil (Apple Developer takım kimliği, 10 karakter). Örn: export DEVELOPMENT_TEAM=ABCDE12345}"

# Paket denetimi — arşivden ÖNCE. Android'de karşılığı release-android.sh'ın
# yapıdan önce koştuğu sürüm + imza kapısı; buradaki kapı check-ios.py.
#
# Kendi iki kaynaklı sürüm karşılaştırmamız vardı (version.ts ↔ pbxproj) ve üçüncüyü
# — android/app/build.gradle — "elle eşitlensin" diye NOT olarak bırakıyordu. Oysa
# check-ios.py üçünü birden karşılaştırıyor, üstüne ikon ölçülerini, .strings
# sözlüklerini, dil beyanını ve pbxproj bütünlüğünü de bakıyor. Hepsi App Store'a
# YÜKLERKEN patlayan, derlemede görünmeyen sınıftan; arşiv alındıktan sonra öğrenmek
# geri alınamayan bir build numarası harcamak demek.
#
# Denetim macOS istemiyor: Mac'e geçmeden `npm run ios:check` ile aynı kapı koşulabilir.
echo "== Paket denetimi (check-ios.py)"
python3 scripts/check-ios.py || {
  echo
  echo "Denetim düştü — arşiv alınmadı. Yukarıdaki maddeler kapanmadan yayın yapılamaz." >&2
  exit 2
}

rm -rf "$ARCHIVE" "$EXPORT"
mkdir -p "$BUILD"

xcodebuild archive \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  -archivePath "$ARCHIVE" \
  DEVELOPMENT_TEAM="$DEVELOPMENT_TEAM" \
  CODE_SIGN_STYLE=Automatic \
  -allowProvisioningUpdates

# ExportOptions repoya yazılmaz: içinde takım kimliği geçiyor. Gitignore'daki
# build dizinine üretilip çıkışta siliniyor.
#
# method=app-store: Xcode 15.3 bunu "app-store-connect" diye yeniden adlandırdı ama
# eski adı kabul etmeye devam ediyor; yeni ad ise eski Xcode'larda hata veriyor.
# Hangi Xcode'da koşacağı belli olmadığı için geniş uyumlu olanı yazılı.
#
# destination: --upload verilirse "upload" — xcodebuild dosyayı doğrudan App Store
# Connect'e yollar. Eski yol (xcrun altool) Apple tarafında kullanımdan kaldırıldı.
OPTS="$BUILD/ExportOptions.plist"
trap 'rm -f "$OPTS"' EXIT

DESTINATION=export
UPLOAD_ARGS=()
if [ "${1:-}" = "--upload" ]; then
  DESTINATION=upload
  # App Store Connect API anahtarı: parola değil, indirdiğin .p8 dosyası.
  # Anahtarın kendisi de kimlikleri de repoya girmez.
  : "${ASC_KEY_PATH:?ASC_KEY_PATH tanımlı değil (App Store Connect .p8 anahtar dosyasının yolu)}"
  : "${ASC_KEY_ID:?ASC_KEY_ID tanımlı değil (anahtar kimliği)}"
  : "${ASC_ISSUER_ID:?ASC_ISSUER_ID tanımlı değil (issuer kimliği)}"
  [ -f "$ASC_KEY_PATH" ] || { echo "ASC_KEY_PATH dosyası yok: $ASC_KEY_PATH"; exit 1; }
  UPLOAD_ARGS=(
    -authenticationKeyPath "$ASC_KEY_PATH"
    -authenticationKeyID "$ASC_KEY_ID"
    -authenticationKeyIssuerID "$ASC_ISSUER_ID"
  )
fi

cat > "$OPTS" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>method</key><string>app-store</string>
	<key>teamID</key><string>$DEVELOPMENT_TEAM</string>
	<key>signingStyle</key><string>automatic</string>
	<key>destination</key><string>$DESTINATION</string>
	<key>uploadSymbols</key><true/>
</dict>
</plist>
PLIST

xcodebuild -exportArchive \
  -archivePath "$ARCHIVE" \
  -exportOptionsPlist "$OPTS" \
  -exportPath "$EXPORT" \
  -allowProvisioningUpdates \
  ${UPLOAD_ARGS[@]+"${UPLOAD_ARGS[@]}"}   # boş diziyi `set -u` altında güvenle aç (macOS bash 3.2)

echo
echo "Arşiv: $ARCHIVE"
if [ "$DESTINATION" = upload ]; then
  echo "App Store Connect'e yollandı. İşleme birkaç dakika sürer; sonra TestFlight'ta görünür."
else
  IPA=$(find "$EXPORT" -name '*.ipa' | head -1)
  echo "IPA  : ${IPA:-(bulunamadı)}"
  echo "Yüklemek için: bash mobile/scripts/ios-archive.sh --upload"
fi

echo
echo "NOT: ios/build gitignore'da (mobile/.gitignore › build/). Sertifikalar Keychain'de,"
echo "takım kimliği ve API anahtarı ortam değişkeninde; hiçbiri repoya yazılmadı."
