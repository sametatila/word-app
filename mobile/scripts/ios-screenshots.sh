#!/usr/bin/env bash
# Lernomi — iOS simülatöründe uygulamayı açar ve ekran görüntüsü alır.
#
# Neden var: geliştirme makinesi Linux, iOS Simulator ise Xcode'un parçası ve
# macOS dışında çalışmıyor (Android emülatörünün aksine — o QEMU tabanlı ve her
# yerde koşuyor). CI'daki macos runner bu yüzden tek "Mac"imiz; uygulamayı orada
# açtırıp kareleri artifact olarak indiriyoruz.
#
# NE GÖSTERİR: düzen, renkler, açılış ekranı, koyu tema, üç dilde metin uzunluğu,
# telefon/tablet farkı, yazı taşmaları.
# NE GÖSTERMEZ: mikrofon, konuşma tanıma, arka planda ses, kilit ekranı denetimi,
# haptik, satın alma. Simülatör bunları dürüstçe taklit etmiyor — gerçek cihaz
# gerekiyor, sırası docs/plan/ios-device-runbook.md'de.
#
# SINIR: uygulama açıldığı yerde duruyor. simctl dokunma yapamıyor, dolayısıyla
# ekranlarda İLERLENMİYOR; onun için XCUITest hedefi gerekiyor (ayrı iş).
#
# Kullanım (CI ya da yerel macOS):
#   bash mobile/scripts/ios-screenshots.sh
# Ayarlar ortamdan: APP_PATH, OUT_DIR.
set -euo pipefail

cd "$(dirname "$0")/.."

APP=${APP_PATH:-ios/build/Build/Products/Release-iphonesimulator/Lernomi.app}
BUNDLE_ID=app.lernomi.ios
OUT=${OUT_DIR:-ios/build/screenshots}

# ad|cihaz tipi — ad runner'ın Xcode'unda hazır gelmiyorsa tiple yaratılıyor.
# Telefon tarafında satılan EN DAR iPhone seçildi (375pt): düzen orada kırılır.
# Tablet, TARGETED_DEVICE_FAMILY = "1,2" beyanının karşılığı; lib/useLayout.ts
# geniş ekranda içeriği ortalı bir sütuna sığdırıyor, görülmesi gereken o.
DEVICES=(
  "iPhone SE (3rd generation)|com.apple.CoreSimulator.SimDeviceType.iPhone-SE-3rd-generation"
  "iPad (10th generation)|com.apple.CoreSimulator.SimDeviceType.iPad-10th-generation"
)

# Arayüz dili. Uygulamaya değil SİSTEME veriliyor (AppleLanguages/AppleLocale
# başlatma argümanı, Xcode'un "Application Language" ayarının yaptığı şey).
# lib/i18n.ts cihaz dilini üç kaynaktan okuyor (RN sabiti, Hermes Intl, iOS
# SettingsManager) ve üçü de bu argümanı görüyor — uygulama kodu değişmiyor.
LANGS=("tr|tr_TR" "en|en_US" "de|de_DE")

APPEARANCES=(light dark)

# Açılıştan kaç saniye sonra kare alınacak. Üç ayrı an denendi (3/9/15sn) ve
# kareler bayt bayt aynı çıktı — ekran ilerlemediği için tek an yetiyor.
SETTLE=${SETTLE:-9}

[ "$(uname -s)" = "Darwin" ] || { echo "Bu betik yalnız macOS'ta çalışır (simctl gerekiyor)."; exit 1; }
[ -d "$APP" ] || { echo "Uygulama yok: $APP — önce Release yapılandırmasıyla simülatöre derle."; exit 1; }

mkdir -p "$OUT"

echo "Kullanılabilir cihazlar:"
xcrun simctl list devices available

# Adıyla bulur, yoksa en yeni iOS çalışma zamanıyla yaratır. Ad sabit: bulunamayan
# bir cihaz yüzünden iş sessizce başka bir ekran boyutunda koşmasın.
resolve_device() {
  local name=$1 type=$2 udid
  udid=$(xcrun simctl list devices available -j | python3 -c '
import json, sys
want = sys.argv[1]
d = json.load(sys.stdin)["devices"]
for runtime, devs in sorted(d.items(), reverse=True):
    for dev in devs:
        if dev.get("name") == want and dev.get("isAvailable"):
            print(dev["udid"]); sys.exit(0)
' "$name" || true)
  if [ -z "$udid" ]; then
    local runtime
    runtime=$(xcrun simctl list runtimes -j | python3 -c '
import json, sys
rs = [r for r in json.load(sys.stdin)["runtimes"] if r.get("isAvailable") and "iOS" in r.get("name", "")]
rs.sort(key=lambda r: [int(x) for x in r["version"].split(".")])
print(rs[-1]["identifier"] if rs else "")
')
    [ -n "$runtime" ] || { echo "iOS çalışma zamanı bulunamadı." >&2; return 1; }
    udid=$(xcrun simctl create "$name" "$type" "$runtime")
  fi
  echo "$udid"
}

BOOTED=()
cleanup() { for u in ${BOOTED[@]+"${BOOTED[@]}"}; do xcrun simctl shutdown "$u" >/dev/null 2>&1 || true; done; }
trap cleanup EXIT

for ENTRY in "${DEVICES[@]}"; do
  DEV_NAME=${ENTRY%%|*}
  DEV_TYPE=${ENTRY#*|}
  # Dosya adı için: boşluk ve parantez yerine tire.
  SLUG=$(echo "$DEV_NAME" | tr 'A-Z ' 'a-z-' | tr -cd 'a-z0-9-' | sed 's/--*/-/g; s/-$//')

  echo
  echo "==================== $DEV_NAME ===================="
  if ! UDID=$(resolve_device "$DEV_NAME" "$DEV_TYPE"); then
    echo "ATLANDI: cihaz hazırlanamadı."
    continue
  fi
  echo "UDID: $UDID"
  BOOTED+=("$UDID")

  xcrun simctl boot "$UDID" >/dev/null 2>&1 || true
  xcrun simctl bootstatus "$UDID" -b

  # Durum çubuğu sabitleniyor: saat ve pil her koşuda değişirse kareler
  # karşılaştırılamaz hâle gelir (her diff'te üst şerit oynar).
  xcrun simctl status_bar "$UDID" override \
    --time "09:41" --batteryState charged --batteryLevel 100 \
    --cellularMode active --cellularBars 4 --wifiMode active --wifiBars 3 >/dev/null 2>&1 || true

  xcrun simctl install "$UDID" "$APP"

  for LANG_ENTRY in "${LANGS[@]}"; do
    LANG_CODE=${LANG_ENTRY%%|*}
    LOCALE=${LANG_ENTRY#*|}
    for APPEARANCE in "${APPEARANCES[@]}"; do
      xcrun simctl ui "$UDID" appearance "$APPEARANCE" >/dev/null 2>&1 || true
      xcrun simctl terminate "$UDID" "$BUNDLE_ID" >/dev/null 2>&1 || true
      sleep 1
      xcrun simctl launch "$UDID" "$BUNDLE_ID" \
        -AppleLanguages "($LANG_CODE)" -AppleLocale "$LOCALE" >/dev/null
      sleep "$SETTLE"
      FILE="$OUT/${SLUG}-${LANG_CODE}-${APPEARANCE}.png"
      xcrun simctl io "$UDID" screenshot "$FILE" >/dev/null
      echo "  $(basename "$FILE")"
    done
  done

  # Uygulama çöktüyse kareler boş çıkar ve sebebi görünmez; günlük artifact'a girsin.
  xcrun simctl spawn "$UDID" log show --last 10m --predicate "process == 'Lernomi'" \
    --style compact > "$OUT/${SLUG}-simulator.log" 2>/dev/null || true
done

echo
echo "Kareler: $OUT"
ls -1 "$OUT"
