#!/usr/bin/env bash
# Lernomi — iPhone SE simülatöründe uygulamayı açar ve ekran görüntüsü alır.
#
# Neden var: geliştirme makinesi Linux, iOS Simulator ise Xcode'un parçası ve
# macOS dışında çalışmıyor (Android emülatörünün aksine — o QEMU tabanlı ve her
# yerde koşuyor). CI'daki macos runner bu yüzden tek "Mac"imiz; uygulamayı orada
# açtırıp kareleri artifact olarak indiriyoruz.
#
# NE GÖSTERİR: düzen, renkler, açılış ekranı, koyu tema, yazı taşmaları, tipografi.
# NE GÖSTERMEZ: mikrofon, konuşma tanıma, arka planda ses, kilit ekranı denetimi,
# haptik, satın alma. Simülatör bunları dürüstçe taklit etmiyor — gerçek cihaz
# gerekiyor, sırası docs/plan/ios-device-runbook.md'de.
#
# Kullanım (CI ya da yerel macOS):
#   bash mobile/scripts/ios-screenshots.sh
# Ayarlar ortamdan: APP_PATH, DEVICE_NAME, OUT_DIR.
set -euo pipefail

cd "$(dirname "$0")/.."

APP=${APP_PATH:-ios/build/Build/Products/Release-iphonesimulator/Lernomi.app}
BUNDLE_ID=app.lernomi.ios
DEVICE_NAME=${DEVICE_NAME:-iPhone SE (3rd generation)}
DEVICE_TYPE=${DEVICE_TYPE:-com.apple.CoreSimulator.SimDeviceType.iPhone-SE-3rd-generation}
OUT=${OUT_DIR:-ios/build/screenshots}

# Açılıştan kaç saniye sonra, hangi adla. Yeni kare eklemek bir satır.
# Zaman tabanlı çünkü simctl dokunma yapamıyor: ekranlarda İLERLEMEK için
# XCUITest hedefi gerekiyor (ayrı iş). Bugün görülen, uygulamanın açılışta
# durduğu yer — taze kurulumda onboarding'in ilk adımı.
SHOTS=(
  "3:01-acilis"
  "9:02-ilk-ekran"
  "15:03-yerlesme"
)

[ "$(uname -s)" = "Darwin" ] || { echo "Bu betik yalnız macOS'ta çalışır (simctl gerekiyor)."; exit 1; }
[ -d "$APP" ] || { echo "Uygulama yok: $APP — önce Release yapılandırmasıyla simülatöre derle."; exit 1; }

mkdir -p "$OUT"

# --- Cihazı bul ya da yarat ---------------------------------------------------
# Runner'ın Xcode'unda hangi cihazların hazır geldiği sürümle değişiyor; adıyla
# aranıp bulunamazsa en yeni iOS çalışma zamanıyla yaratılıyor. Bulunamayan bir
# cihaz yüzünden iş sessizce başka bir ekran boyutunda koşmasın diye ad sabit.
echo "Kullanılabilir cihazlar:"
xcrun simctl list devices available | sed -n '1,80p'

UDID=$(xcrun simctl list devices available -j | python3 -c '
import json, sys, os
want = os.environ["DEVICE_NAME"]
d = json.load(sys.stdin)["devices"]
for runtime, devs in sorted(d.items(), reverse=True):
    for dev in devs:
        if dev.get("name") == want and dev.get("isAvailable"):
            print(dev["udid"]); sys.exit(0)
' DEVICE_NAME="$DEVICE_NAME" 2>/dev/null || true)

if [ -z "${UDID:-}" ]; then
  echo "\"$DEVICE_NAME\" hazır gelmemiş — en yeni iOS çalışma zamanıyla yaratılıyor."
  RUNTIME=$(xcrun simctl list runtimes -j | python3 -c '
import json, sys
rs = [r for r in json.load(sys.stdin)["runtimes"] if r.get("isAvailable") and "iOS" in r.get("name", "")]
rs.sort(key=lambda r: [int(x) for x in r["version"].split(".")])
print(rs[-1]["identifier"] if rs else "")
')
  [ -n "$RUNTIME" ] || { echo "iOS çalışma zamanı bulunamadı."; exit 1; }
  UDID=$(xcrun simctl create "$DEVICE_NAME" "$DEVICE_TYPE" "$RUNTIME")
fi
echo "Cihaz: $DEVICE_NAME ($UDID)"

cleanup() { xcrun simctl shutdown "$UDID" >/dev/null 2>&1 || true; }
trap cleanup EXIT

xcrun simctl boot "$UDID" >/dev/null 2>&1 || true
xcrun simctl bootstatus "$UDID" -b

# Durum çubuğu sabitleniyor: saat ve pil her koşuda değişirse kareler
# karşılaştırılamaz hâle gelir (her diff'te üst şerit oynar).
xcrun simctl status_bar "$UDID" override \
  --time "09:41" --batteryState charged --batteryLevel 100 \
  --cellularMode active --cellularBars 4 --wifiMode active --wifiBars 3 >/dev/null 2>&1 || true

xcrun simctl install "$UDID" "$APP"

for APPEARANCE in light dark; do
  echo
  echo "--- $APPEARANCE ---"
  xcrun simctl ui "$UDID" appearance "$APPEARANCE" >/dev/null 2>&1 || true
  # Tema useColorScheme ile canlı güncelleniyor ama yine de yeniden başlatılıyor:
  # kareler her koşuda aynı yoldan geçsin, "değişimi yakaladı mı" belirsizliği olmasın.
  xcrun simctl terminate "$UDID" "$BUNDLE_ID" >/dev/null 2>&1 || true
  sleep 1
  xcrun simctl launch "$UDID" "$BUNDLE_ID" >/dev/null

  PREV=0
  for SHOT in "${SHOTS[@]}"; do
    AT=${SHOT%%:*}
    NAME=${SHOT#*:}
    sleep "$((AT - PREV))"
    PREV=$AT
    FILE="$OUT/${APPEARANCE}-${NAME}.png"
    xcrun simctl io "$UDID" screenshot "$FILE" >/dev/null
    echo "  ${AT}sn  $(basename "$FILE")"
  done
done

# Uygulama çöktüyse kareler boş çıkar ve sebebi görünmez; günlük artifact'a girsin.
LOG="$OUT/simulator.log"
xcrun simctl spawn "$UDID" log show --last 3m --predicate "process == 'Lernomi'" --style compact > "$LOG" 2>/dev/null || true

echo
echo "Kareler: $OUT"
ls -1 "$OUT"
