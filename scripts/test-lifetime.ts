/**
 * Ömür boyu Premium kararı — `npm run test:lifetime`. Veritabanı istemez.
 * Asıl risk iki yönlü: kişi hakkını alamaması ya da her saat yeniden verilip
 * tamsayı bakiyenin taşması (`lib/premium/lifetime-policy`).
 */
import { LIFETIME_MINUTES, LIFETIME_THRESHOLD_MINUTES, lifetimeConfigError, lifetimeDone, needsLifetime, parseLifetimeEmails } from "../src/lib/premium/lifetime-policy";

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

console.log("\nListe");
const s = parseLifetimeEmails(" A@Example.com, b@example.com;b@example.com\nbozuk, c@x.io ");
check("küçük harf, tekrarsız, ayraç virgül/boşluk/noktalı virgül", s.size === 3 && s.has("a@example.com") && s.has("b@example.com") && s.has("c@x.io"), [...s].join(","));
check("geçersiz parça atlanıyor", !s.has("bozuk"));
check("boş env boş küme", parseLifetimeEmails(undefined).size === 0 && parseLifetimeEmails("").size === 0);

console.log("\nKarar");
const now = Date.UTC(2026, 9, 3);
const minutes = (m: number) => new Date(now + m * 60_000);
check("yetki satırı yok: verilir", needsLifetime(null, now));
check("bonus yok: verilir", needsLifetime({ bonusMinutes: 0, bonusUntil: null }, now));
check("iade sıfırladı (bakiye 0, pencere geçmiş): yeniden verilir", needsLifetime({ bonusMinutes: 0, bonusUntil: minutes(-10) }, now));
check("çalışan 100 yıllık pencere: verilmez", !needsLifetime({ bonusMinutes: 0, bonusUntil: minutes(LIFETIME_MINUTES) }, now));
check("abonelik sırasında bakiyede bekliyor: verilmez", !needsLifetime({ bonusMinutes: LIFETIME_MINUTES, bonusUntil: null }, now));
check("promo kodundan 2 ay: yine verilir", needsLifetime({ bonusMinutes: 60 * 24 * 60, bonusUntil: minutes(30 * 24 * 60) }, now));
check("bir kez verilince tekrar verilmez (taşma yok)", !needsLifetime({ bonusMinutes: 0, bonusUntil: minutes(LIFETIME_MINUTES) }, now + 3600_000));
check("100 yıl tamsayı sınırının çok altında", LIFETIME_MINUTES * 2 < 2 ** 31 - 1 && LIFETIME_THRESHOLD_MINUTES < LIFETIME_MINUTES);

console.log("\nTurun ömrü");
const at = (d: string, h = 12) => Date.parse(`${d}T${String(h).padStart(2, "0")}:00:00Z`);
check("süre içinde, bekleyen var: sürüyor", lifetimeDone("2026-10-17", 5, at("2026-10-10")).done === false);
check("bitiş günü dahil", lifetimeDone("2026-10-17", 5, at("2026-10-17", 23)).done === false);
check("ertesi gün: süre doldu", lifetimeDone("2026-10-17", 5, at("2026-10-18", 0)).reason === "süre doldu");
check("herkes katıldı: biter", lifetimeDone("2026-10-17", 0, at("2026-10-05")).reason === "listedeki herkes katıldı");
check("tarih tanımsız ya da bozuk: tur BİTMİYOR (kaza timer'ı kapatmasın)", !lifetimeDone(undefined, 5, at("2026-10-05")).done && !lifetimeDone("17.10.2026", 5, at("2026-10-05")).done);
const one = parseLifetimeEmails("a@b.co");
check("yapılandırma hatası: boş liste, bozuk ya da eksik tarih", !!lifetimeConfigError(new Set(), "2026-10-17") && !!lifetimeConfigError(one, "17.10.2026") && !!lifetimeConfigError(one, undefined));
check("geçerli yapılandırma hatasız", lifetimeConfigError(one, "2026-10-17") === null);

console.log(`\n${total - failures}/${total} geçti`);
if (failures) process.exit(1);
