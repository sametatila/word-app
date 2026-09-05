#!/usr/bin/env bash
# Onboarding akışının karelerini alır: XCUITest dokunur, simctl çeker.
#
# İş bölümü bilinçli. Dokunmayı XCUITest yapıyor çünkü simctl dokunamıyor; kareyi
# simctl çekiyor çünkü xcresult'tan ek çıkarmanın komutu Xcode sürümüne göre
# değişiyor ve burada denenemiyor, simctl'in çalıştığı ise kanıtlı. Test her
# ekranda bilerek bekliyor (LernomiUITests.swift `dwell`), buradaki döngü de o
# aralıkta kareyi yakalıyor.
#
# Kullanım: bash mobile/scripts/ios-flow-screenshots.sh
set -euo pipefail

cd "$(dirname "$0")/.."

BUNDLE_ID=app.lernomi.ios
OUT=${OUT_DIR:-ios/build/screenshots}
DERIVED=${DERIVED:-ios/build}
DEVICE_NAME=${FLOW_DEVICE:-iPhone SE (3rd generation)}
DEVICE_TYPE=${FLOW_DEVICE_TYPE:-com.apple.CoreSimulator.SimDeviceType.iPhone-SE-3rd-generation}
# Akış tek dilde koşuyor: matris zaten üç dilin İLK ekranını veriyor, buradaki
# değer akışın KENDİSİ. Üç dile çıkarmak bu listeye bir satır.
FLOW_LANGS=${FLOW_LANGS:-tr}
INTERVAL=${INTERVAL:-2}
# Tema AÇIKÇA ayarlanıyor. İlk koşuda ayarlanmamıştı ve akış koyu temada çıktı —
# çünkü matris betiği simülatörü en son koyuda bırakmıştı. Sessizce miras alınan
# durum, karelerin neden öyle göründüğünü açıklamayan bir kayıt üretir.
FLOW_APPEARANCE=${FLOW_APPEARANCE:-light}

# Geri dönülemez eylemlerin metinleri. ELLE YAZILMIYOR: tek kaynak
# src/i18n/<dil>.ts, buradan okunup teste geçiriliyor — çeviri değişirse liste
# kendiliğinden güncel kalır. Test bu metinleri taşıyan düğmelere hiç dokunmuyor.
# Satın alma listede yok çünkü zaten atıl (RevenueCat anahtarı boş, paywall
# "satışta değil" diyor); listeye yalnız geri alınamayanlar giriyor.
BLOCK_KEYS=${BLOCK_KEYS:-deleteaccount.yes_delete deleteaccount.permanently_delete_my_account profile.log_out profile.signout}

block_list() {
  python3 scripts/i18n-values.py "src/i18n/$1.ts" $BLOCK_KEYS
}

# Giriş adımının aradığı düğme etiketleri. Bunlar da elle yazılmıyor: form iki
# modlu (giriş / kayıt) ve konumla gidilirse hangi modda olunduğu bilinemiyor —
# kayıt formunun üç alanından ilkine (ADIN) e-posta yazılırdı. Bu üç düğmenin
# uygulamada açık accessibilityLabel'ı var, o yüzden etiketle bulunabiliyorlar.
i18n_value() {
  python3 scripts/i18n-values.py "src/i18n/$1.ts" "$2"
}

[ "$(uname -s)" = "Darwin" ] || { echo "Bu betik yalnız macOS'ta çalışır."; exit 1; }
mkdir -p "$OUT"

UDID=$(xcrun simctl list devices available -j | python3 -c '
import json, sys
want = sys.argv[1]
d = json.load(sys.stdin)["devices"]
for runtime, devs in sorted(d.items(), reverse=True):
    for dev in devs:
        if dev.get("name") == want and dev.get("isAvailable"):
            print(dev["udid"]); sys.exit(0)
' "$DEVICE_NAME" || true)

if [ -z "$UDID" ]; then
  RUNTIME=$(xcrun simctl list runtimes -j | python3 -c '
import json, sys
rs = [r for r in json.load(sys.stdin)["runtimes"] if r.get("isAvailable") and "iOS" in r.get("name", "")]
rs.sort(key=lambda r: [int(x) for x in r["version"].split(".")])
print(rs[-1]["identifier"] if rs else "")
')
  [ -n "$RUNTIME" ] || { echo "iOS çalışma zamanı yok."; exit 1; }
  UDID=$(xcrun simctl create "$DEVICE_NAME" "$DEVICE_TYPE" "$RUNTIME")
fi
echo "Cihaz: $DEVICE_NAME ($UDID)"

xcrun simctl boot "$UDID" >/dev/null 2>&1 || true
xcrun simctl bootstatus "$UDID" -b
xcrun simctl status_bar "$UDID" override \
  --time "09:41" --batteryState charged --batteryLevel 100 \
  --cellularMode active --cellularBars 4 --wifiMode active --wifiBars 3 >/dev/null 2>&1 || true
xcrun simctl ui "$UDID" appearance "$FLOW_APPEARANCE" >/dev/null 2>&1 || true
echo "Tema: $FLOW_APPEARANCE"

for LANG_CODE in $FLOW_LANGS; do
  echo
  echo "--- akış: $LANG_CODE ---"
  RAW="$OUT/.raw-$LANG_CODE"
  rm -rf "$RAW"; mkdir -p "$RAW"

  # Arka planda kare döngüsü. Test bitince durduruluyor.
  ( n=0
    while :; do
      n=$((n + 1))
      xcrun simctl io "$UDID" screenshot "$RAW/$(printf '%03d' $n).png" >/dev/null 2>&1 || true
      sleep "$INTERVAL"
    done ) &
  LOOP_PID=$!

  BLOCK=$(block_list "$LANG_CODE")
  echo "Dokunulmayacaklar: ${BLOCK:-(yok)}"
  if [ -n "${UI_TEST_EMAIL:-}" ]; then
    echo "Giris: test hesabiyla (parola gunluge basilmiyor)"
  else
    echo "Giris: kimlik bilgisi yok — tur giris duvarinda duracak"
  fi

  set +e
  # TEST_RUNNER_ önekli değişkenler test koşucusunun ortamına geçiyor (önek
  # soyularak): xcodebuild bunu ORTAM DEĞİŞKENİ olarak bekliyor. Önceki koşuda
  # aynı adlar komut sonunda DERLEME AYARI olarak veriliyordu ve teste hiç
  # ulaşmamış olabilir — giriş adımı ekranı doğru bulduğu hâlde alanları boş
  # bıraktı. İkisi birden veriliyor; hangisinin taşıdığını UITEST: satırları
  # söyleyecek.
  export TEST_RUNNER_UI_TEST_LANG="$LANG_CODE"
  export TEST_RUNNER_UI_TEST_BLOCK="$BLOCK"
  export TEST_RUNNER_UI_TEST_L_EMAIL_CTA="$(i18n_value "$LANG_CODE" auth.continue_with_email)"
  export TEST_RUNNER_UI_TEST_L_SIGNIN="$(i18n_value "$LANG_CODE" auth.sign_in)"
  export TEST_RUNNER_UI_TEST_L_SIGNUP="$(i18n_value "$LANG_CODE" auth.create_account)"
  export TEST_RUNNER_UI_TEST_EMAIL="${UI_TEST_EMAIL:-}"
  export TEST_RUNNER_UI_TEST_PASSWORD="${UI_TEST_PASSWORD:-}"
  xcodebuild test \
    -workspace ios/Lernomi.xcworkspace \
    -scheme Lernomi \
    -configuration Release \
    -sdk iphonesimulator \
    -destination "platform=iOS Simulator,id=$UDID" \
    -derivedDataPath "$DERIVED" \
    -only-testing:LernomiUITests \
    CODE_SIGNING_ALLOWED=NO \
    TEST_RUNNER_UI_TEST_LANG="$LANG_CODE" \
    TEST_RUNNER_UI_TEST_BLOCK="$BLOCK" \
    TEST_RUNNER_UI_TEST_L_EMAIL_CTA="$(i18n_value "$LANG_CODE" auth.continue_with_email)" \
    TEST_RUNNER_UI_TEST_L_SIGNIN="$(i18n_value "$LANG_CODE" auth.sign_in)" \
    TEST_RUNNER_UI_TEST_L_SIGNUP="$(i18n_value "$LANG_CODE" auth.create_account)" \
    TEST_RUNNER_UI_TEST_EMAIL="${UI_TEST_EMAIL:-}" \
    TEST_RUNNER_UI_TEST_PASSWORD="${UI_TEST_PASSWORD:-}" 2>&1 \
    | grep -E "UITEST:|TEST SUCCEEDED|TEST FAILED|error:|Testing failed" 
  TEST_RC=${PIPESTATUS[0]}
  set -e

  kill "$LOOP_PID" 2>/dev/null || true
  wait "$LOOP_PID" 2>/dev/null || true
  echo "xcodebuild test çıkışı: $TEST_RC"

  # Aynı ekranın ardışık kopyalarını at: 2 saniyede bir çekerken çoğu kare
  # öncekiyle birebir aynı. Kalanları sıralı adlandır.
  PREV=""
  i=0
  for f in "$RAW"/*.png; do
    [ -e "$f" ] || continue
    SUM=$(shasum -a 1 "$f" | cut -d' ' -f1)
    [ "$SUM" = "$PREV" ] && continue
    PREV=$SUM
    # Çizilmemiş kareyi de atıyoruz: akışta boş kare bilgi taşımıyor.
    python3 scripts/png-blank.py "$f" >/dev/null 2>&1 || continue
    i=$((i + 1))
    cp "$f" "$OUT/flow-${LANG_CODE}-$(printf '%02d' $i).png"
  done
  rm -rf "$RAW"
  echo "$i benzersiz kare: flow-${LANG_CODE}-*.png"
done

echo
echo "Akış kareleri:"
ls -1 "$OUT" | grep '^flow-' || echo "(kare yok)"
