import { isPushEndpoint } from "../src/lib/push-endpoint";

/**
 * Web Push abonelik adresi izin listesi — `npx tsx scripts/test-push-endpoint.ts`.
 *
 * Güvenlik denetimi 2026-09-14 #7: eski yasak listesi hex-IP ve özel adrese
 * çözülen genel DNS adlarıyla atlatılıyordu. Veritabanı istemez.
 */

let fails = 0;
const check = (name: string, ok: boolean) => {
  if (ok) console.log(`  ✓ ${name}`);
  else {
    fails++;
    console.log(`  ✗ ${name}`);
  }
};

console.log("gerçek tarayıcı servisleri geçer");
for (const ok of [
  "https://fcm.googleapis.com/fcm/send/abc:APA91b",
  "https://updates.push.services.mozilla.com/wpush/v2/gAAAA",
  "https://web.push.apple.com/QOr7abc",
  "https://wns2-par02p.notify.windows.com/w/?token=BQYAAA",
  "https://FCM.googleapis.com/fcm/send/x",
]) check(ok, isPushEndpoint(ok));

console.log("\natlatma denemeleri reddedilir");
for (const bad of [
  "https://0x7f.0x0.0x0.0x1/",
  "https://x.127.0.0.1.nip.io/",
  "https://127.0.0.1/",
  "https://[::1]/",
  "https://localhost/",
  "https://2130706433/",
  "https://169.254.169.254/latest/meta-data",
  "http://fcm.googleapis.com/fcm/send/x",
  "https://fcm.googleapis.com:8443/fcm/send/x",
  "https://user:pass@fcm.googleapis.com/fcm/send/x",
  "https://fcm.googleapis.com.evil.example/x",
  "https://evilfcm.googleapis.com/x",
  "https://notpush.apple.com.evil.example/",
  "https://push.apple.com/",
  "https://evil.example/fcm.googleapis.com",
  "not a url",
  "https://fcm.googleapis.com/" + "a".repeat(2100),
]) check(bad.length > 80 ? bad.slice(0, 60) + "…(uzun)" : bad, !isPushEndpoint(bad));

console.log(fails === 0 ? "\ntamam: hepsi geçti" : `\nKALDI: ${fails}`);
process.exit(fails === 0 ? 0 : 1);
