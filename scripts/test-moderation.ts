/**
 * Moderasyon süzgeci testi — güvenlik denetimi #3 (ReDoS) düzeltmesinin
 * regresyon koruması.
 *
 * Çalıştır:  npm run test:moderation  (CI'da "Birim testleri" adımında)
 *
 * İki şeyi kanıtlar:
 *  1) TESPİT PARİTESİ — sınırlı-nicelik regex'i eskisiyle aynı şeyleri yakalıyor
 *     (URL/e-posta/telefon/@handle engelli; gerçek adlar serbest).
 *  2) ReDoS SINIRI — uzunluk emniyet freni patolojik girdiyi regex hiç
 *     çalışmadan, sabit sürede reddediyor.
 */
import { displayNameAllowed, usernameAllowed } from "@/lib/moderation";

let fail = 0;
function check(label: string, cond: boolean): void {
  console.log(`${cond ? "ok  " : "FAIL"} ${label}`);
  if (!cond) fail++;
}

// 1) İletişim/URL/küfür engellenmeli
for (const bad of [
  "schau http://evil.example", "see www.spam.net now", "foo.com/promo",
  "dm @insta_name", "reach a.b+x@mail.co", "+90 555 123 45 67",
]) {
  check(`engeller: "${bad}"`, displayNameAllowed(bad) === false);
}
check('engeller: küfür ("amk")', displayNameAllowed("amk") === false);
check('engeller: görünen adda e-posta', displayNameAllowed("yaz bana test@mail.com") === false);

// 2) Gerçek/temiz adlar serbest
for (const ok of ["Jörg Müller", "李雷", "O'Brien-Smith", "Al", "Ada Lovelace", "Zeynep Çınar"]) {
  check(`serbest: "${ok}"`, displayNameAllowed(ok) === true);
}

// 3) ReDoS sınırı — dev girdi hızlı ve reddedilerek dönmeli
function fastReject(fn: (s: string) => boolean): boolean {
  const huge = "a".repeat(200_000);
  const t0 = performance.now();
  const res = fn(huge);
  const dt = performance.now() - t0;
  console.log(`     (${dt.toFixed(2)} ms, sonuç=${res})`);
  return res === false && dt < 50;
}
check("displayName: dev girdi hızlı+reddedildi (<50ms)", fastReject(displayNameAllowed));
check("username:    dev girdi hızlı+reddedildi (<50ms)", fastReject(usernameAllowed));

// 4) Eski O(n²) tetikleyicisi (uzunluk freninin ALTINDA da makul kalmalı)
{
  const near = "a".repeat(4000); // fren 4096; regex burada gerçekten çalışır
  const t0 = performance.now();
  displayNameAllowed(near);
  const dt = performance.now() - t0;
  console.log(`     (4000 harf, regex çalıştı: ${dt.toFixed(2)} ms)`);
  check("4000 harf regex sınırlı sürede (<25ms)", dt < 25);
}

console.log(fail ? `\n${fail} BAŞARISIZ` : "\nTüm moderasyon testleri geçti.");
process.exit(fail ? 1 : 0);
