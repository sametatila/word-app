#!/bin/bash
# iOS simülatöründe ekran görüntüsü çekimi — tek giriş noktası.
# Yöntem ve ekran listesi: docs/store/screenshots.md
#
#   scripts/shots/sim.sh boot                 simülatörü aç, durum çubuğunu 9:41'e sabitle
#   scripts/shots/sim.sh build                Release derle (simülatör), kur
#   scripts/shots/sim.sh launch               uygulamayı başlat
#   scripts/shots/sim.sh tap <x%> <y%>        ekranın yüzdesine dokun (TAM SAYI: Maestro "66.8"i kabul etmiyor)
#   scripts/shots/sim.sh tapText "<metin>"    görünen metne dokun (düzenli ifade; başlıkla çakışabilir)
#   scripts/shots/sim.sh type "<metin>"       odaktaki kutuya yaz + Enter
#   scripts/shots/sim.sh say "<metin>"        alttaki giriş kutusuna dokun, yaz, Enter (sohbet/anlatım)
#   scripts/shots/sim.sh back                 sol üstteki geri/kapat
#   scripts/shots/sim.sh scroll               bir ekran aşağı
#   scripts/shots/sim.sh flow                 stdin'den ham Maestro komutları
#   scripts/shots/sim.sh peek [ad]            önizleme görüntüsü (900 px) → $OUT/peek/<ad>.png
#   scripts/shots/sim.sh cap <set> <ekran>    o anki ekranı AÇIK ve KOYU temada kaydet → $OUT/<set>/{light,dark}/<ekran>.png
#
# Ortam: SIM (varsayılan "iPhone 18 Pro Max"), OUT (varsayılan .shots/, gitignore'da).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SIM_NAME="${SIM:-iPhone 18 Pro Max}"
OUT="${OUT:-$ROOT/.shots}"
APP_ID="app.lernomi.ios"
MAESTRO="${MAESTRO:-$HOME/.maestro/bin/maestro}"
export MAESTRO_CLI_NO_ANALYTICS=1 MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED=true

udid() {
  xcrun simctl list devices available | grep -F "$SIM_NAME (" | head -1 | sed -E 's/.*\(([0-9A-F-]{36})\).*/\1/'
}
D="$(udid)"
[ -n "$D" ] || { echo "simülatör bulunamadı: $SIM_NAME" >&2; exit 1; }

flow() { # stdin: Maestro komutları
  local f; f="$(mktemp -t lernomi-flow).yaml"
  { echo "appId: $APP_ID"; echo "---"; cat; } > "$f"
  "$MAESTRO" --device "$D" test "$f" 2>&1 | grep -E "COMPLETED|FAILED|not found|rror" | grep -v "^\s*at " || true
  rm -f "$f"
}

shot() { # $1 hedef dosya
  mkdir -p "$(dirname "$1")"
  xcrun simctl io "$D" screenshot "$1" >/dev/null 2>&1
}

cmd="${1:-}"; shift || true
case "$cmd" in
  boot)
    xcrun simctl boot "$D" 2>/dev/null || true
    xcrun simctl bootstatus "$D" -b >/dev/null
    xcrun simctl status_bar "$D" override --time "9:41" --batteryState charged --batteryLevel 100 --cellularBars 4 --wifiBars 3 --dataNetwork wifi
    xcrun simctl ui "$D" appearance light
    echo "hazır: $SIM_NAME ($D)";;
  build)
    DD="${DERIVED:-$OUT/ios-dd}"
    (cd "$ROOT/mobile/ios" && xcodebuild -workspace Lernomi.xcworkspace -scheme Lernomi -configuration Release \
      -sdk iphonesimulator -destination "platform=iOS Simulator,id=$D" -derivedDataPath "$DD" build > "$OUT/ios-build.log" 2>&1) \
      || { echo "derleme düştü: $OUT/ios-build.log" >&2; exit 1; }
    xcrun simctl install "$D" "$DD/Build/Products/Release-iphonesimulator/Lernomi.app"
    echo "kuruldu";;
  launch) xcrun simctl launch "$D" "$APP_ID" >/dev/null;;
  tap) printf -- '- tapOn:\n    point: "%s%%,%s%%"\n' "$1" "$2" | flow;;
  tapText) printf -- '- tapOn: "%s"\n' "$1" | flow;;
  type) printf -- '- inputText: "%s"\n- pressKey: Enter\n' "$1" | flow;;
  say) printf -- '- tapOn:\n    point: "40%%,89%%"\n- inputText: "%s"\n- pressKey: Enter\n' "$1" | flow;;
  back) printf -- '- tapOn:\n    point: "8%%,9%%"\n' | flow;;
  scroll) printf -- '- scroll\n' | flow;;
  flow) flow;;
  peek)
    n="${1:-peek}"; shot "$OUT/peek/$n-full.png"
    sips -Z 900 "$OUT/peek/$n-full.png" --out "$OUT/peek/$n.png" >/dev/null
    echo "$OUT/peek/$n.png";;
  cap)
    set_="$1"; screen="$2"
    xcrun simctl ui "$D" appearance light; sleep 1.5; shot "$OUT/$set_/light/$screen.png"
    xcrun simctl ui "$D" appearance dark; sleep 2; shot "$OUT/$set_/dark/$screen.png"
    xcrun simctl ui "$D" appearance light; sleep 1
    echo "$OUT/$set_/{light,dark}/$screen.png";;
  *) sed -n '2,20p' "$0"; exit 1;;
esac
