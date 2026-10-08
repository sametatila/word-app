/**
 * Test Lab ağ tanıması birim testi — `npm run test:test-lab`.
 *
 * Veritabanı ve ağ gerektirmez. NEDEN: kural iki yönde de sessiz bozulur.
 * Fazla geniş tutarsa gerçek kullanıcı ölçümden düşer ve sessiz kalırsa
 * hesabı silinir (`lib/account/test-lab-cleanup`); dar kalırsa Play robotları
 * yine gerçek kullanıcı sayılır. Örnek adresler 2026-10-08'de canlıda görülen
 * robot ve gerçek kullanıcı oturumlarından.
 */
import { isGoogleOwnNetwork, isTestLabNetwork, parseIp } from "../src/lib/google-networks";

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

console.log("adres ayrıştırma");
check("IPv4", parseIp("66.102.8.130")?.n === BigInt(0x42660882));
check("IPv4 geçersiz", parseIp("66.102.8.300") === null && parseIp("1.2.3") === null && parseIp("") === null);
check("IPv6 kısaltmalı", parseIp("2001:db8::1")?.n === (BigInt("0x20010db8") << BigInt(96)) + BigInt(1));
check("IPv6 açık yazım", parseIp("2a00:0020:c36b:0707:0000:0000:0000:0000")?.v6 === true);
check("IPv6 geçersiz", parseIp("1::2::3") === null && parseIp("1:2:3:4:5:6:7:8:9") === null && parseIp("gggg::1") === null);
check("IPv4'e eşlenmiş IPv6 IPv4 sayılır", parseIp("::ffff:66.102.8.130")?.v6 === false && parseIp("::ffff:66.102.8.130")?.n === parseIp("66.102.8.130")?.n);

console.log("Google'ın kendi ağı");
for (const ip of ["66.102.8.130", "66.102.8.132", "66.249.88.72", "66.249.80.205", "74.125.209.67", "74.125.212.37", "192.178.15.100"]) {
  check(`robot adresi ${ip}`, isGoogleOwnNetwork(ip));
}
for (const ip of ["185.249.168.54", "5.229.71.208", "37.154.90.105", "195.174.132.40", "217.251.237.67", "2a00:0020:c36b:0707:0000:0000:0000:0000", "2a02:3035:0e81:e3c7::"]) {
  check(`gerçek kullanıcı ${ip}`, !isGoogleOwnNetwork(ip));
}
/* 34.0.0.0/15 goog.json'da, 34.0.0.0/20 cloud.json'da: bulut müşterisi Google sayılmaz. */
check("Google Cloud müşteri adresi Google sayılmaz", !isGoogleOwnNetwork("34.0.0.10"));
check("boş / bozuk adres", !isGoogleOwnNetwork(null) && !isGoogleOwnNetwork("") && !isGoogleOwnNetwork("yok"));

console.log("Test Lab isteği");
check("Android + Google ağı", isTestLabNetwork("android/1.0.0/22", "66.102.8.130"));
check("iOS + Google ağı değil", !isTestLabNetwork("ios/1.0.0/22", "66.102.8.130"));
check("başlıksız (web) değil", !isTestLabNetwork(null, "66.102.8.130"));
check("Android + ev ağı değil", !isTestLabNetwork("android/1.0.0/22", "185.249.168.54"));

console.log(`\n${total - failures}/${total} geçti`);
if (failures) process.exit(1);
