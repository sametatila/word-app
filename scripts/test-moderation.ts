/**
 * Moderasyon süzgeci testi.
 *
 * Çalıştır:  npm run test:moderation  (CI'da "Birim testleri" adımında)
 *
 * Dört şeyi kanıtlar:
 *  1) TESPİT PARİTESİ — sınırlı-nicelik regex'i eskisiyle aynı şeyleri yakalıyor
 *     (URL/e-posta/telefon/@handle engelli; gerçek adlar serbest).
 *  2) ReDoS SINIRI — uzunluk emniyet freni patolojik girdiyi regex hiç
 *     çalışmadan, sabit sürede reddediyor (güvenlik denetimi #3).
 *  3) KAÇAMAK GÖVDESİ — rakam, ayraç, tekrar, homoglif ve öbek hakaretler.
 *  4) MASUM GÖVDESİ — Türkçe/Almanca çakışma tuzakları ve gerçek adlar; ayrıca
 *     uygulamanın KENDİ ders içeriğinin tamamı taranır. Süzgeç kendi öğrettiğimiz
 *     sözcüğü reddediyorsa bu bir hatadır ve CI'da kırmızı görünür.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
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

// 5) Kaçamak gövdesi — hepsi ENGELLENMELİ
const KACAMAK: Record<string, string[]> = {
  düz: ["amk", "orospu", "piç", "yarrak", "fuck", "arschloch", "hurensohn", "ibne", "pezevenk", "kahpe"],
  rakam: ["s1kt1r", "0rospu", "b1tch", "n1gger", "y4rr4k", "4mc1k"],
  işaret: ["s!ktir", "a$$hole"],
  ayraç: ["a.m.k", "a-m-k", "o r o s p u", "f.u.c.k", "p i ç", "kral_amk_35", "sikerim_seni"],
  tekrar: ["fuuuck", "amkkk", "orospuuu", "siiiktir"],
  kısaltma: ["amq", "aq", "oç"],
  yazım: ["oruspu", "orspu", "amcik", "amcık", "sikeyim", "sikiyim", "fuk", "phuck", "fck", "wixer"],
  hakaret: ["şerefsiz", "gerizekali", "yavsak", "surtuk", "kaltak", "idiot", "dummkopf", "godoş", "kevaşe", "sürtük", "götlek"],
  homoglif: ["ѕiktir", "fυck", "𝐟𝐮𝐜𝐤", "ｆｕｃｋ", "оrоspu"],
  birleşik: ["supersikici", "sikimsonik", "yarrakkafa", "amcikagzi", "ibnetor", "gavatoglu"],
  öbek: [
    "bacikovalayan", "bacıkovalayan", "bacı kovalayan", "baci_kovalayan", "bacikovalayan35",
    "anaavrat", "ana avrat", "eşşoğlueşşek", "essogluessek",
    "ananı sikeyim", "avradını sikeyim", "amına koyayım", "amina koyayim",
  ],
};
for (const [tür, liste] of Object.entries(KACAMAK)) {
  const kaçan = liste.filter((s) => displayNameAllowed(s) !== false);
  check(`kaçamak/${tür}: ${liste.length - kaçan.length}/${liste.length} engellendi${kaçan.length ? ` — kaçan: ${kaçan.join(", ")}` : ""}`, kaçan.length === 0);
}
// Kullanıcı adı yüzeyi (a-z0-9_) — Türkçe harf yazılamadığı için ayrı ölçülür
const UAD = ["amk", "s1kt1r", "a_m_k", "kral_amk", "oruspu", "fuuuck", "amq", "0rospu", "sikeyim", "fck", "b1tch", "bacikovalayan", "anaavrat", "godos", "kevase", "amcikagzi"];
{
  const kaçan = UAD.filter((u) => usernameAllowed(u) !== false);
  check(`kullanıcı adı: ${UAD.length - kaçan.length}/${UAD.length} engellendi${kaçan.length ? ` — kaçan: ${kaçan.join(", ")}` : ""}`, kaçan.length === 0);
}

// 6) Masum gövdesi — hiçbiri ENGELLENMEMELİ
const MASUM: Record<string, string[]> = {
  // ASCII'ye katlanınca küfür köküne benzeyen Türkçe sözcükler
  türkçeTuzak: ["sıkıntı yok", "sıkıcı film", "sıkış tepiş", "sıkmış", "karmaşıktır", "sikke koleksiyonu", "götürmek", "götürüyor", "akşamına", "anlamına", "bağlayarak", "sayarak", "dikkat", "şık giyinen"],
  // Almanca bileşikler: küfür kökü sözcüğün ortasında kalıyor
  almancaTuzak: ["Aufmerksamkeit", "Achtsamkeit", "Langsamkeit", "Tischlampe", "Broschüre", "Gott", "Götter", "dick", "Minute", "weniger", "einiger", "Stammkunde", "Sg", "Instagram-Konto"],
  ingilizceTuzak: ["viscount", "Scunthorpe", "who reports the past", "massage", "assist", "cocktail", "aqua"],
  gerçekAd: ["Bitchell", "Sikorski", "Amina Yıldız", "Nigar Hanım", "Nigeria", "Dickinson", "Picasso", "Pissarro", "Kussmaul", "Assunta", "Götz", "Jörg Müller", "Ayşe Yılmaz", "Mustafa Kemal", "李雷", "O'Brien-Smith"],
  rakamlıAd: ["ahmet1907", "fener1907", "user1453", "ali4544", "mehmet0655", "elif2005", "kadir34"],
};
for (const [tür, liste] of Object.entries(MASUM)) {
  const yanlış = liste.filter((s) => displayNameAllowed(s) === false);
  check(`masum/${tür}: ${liste.length - yanlış.length}/${liste.length} serbest${yanlış.length ? ` — yanlış engel: ${yanlış.join(", ")}` : ""}`, yanlış.length === 0);
}

// 7) Kendi ders içeriğimizin tamamı — yanlış pozitif için en geniş gövde.
//    Yeni bir isabet çıkarsa ya sözlük hatalıdır ya da girdi gerçekten küfürdür;
//    ikisi de elle bakılmayı hak eder, o yüzden bilinen küme dar tutuluyor.
const BİLİNEN_İSABET = new Set(["am"]); // "am" yalnız girdinin TAMAMI buysa engelleniyor
{
  const kelimeler = new Set<string>();
  const topla = (s: string) => {
    for (const w of s.split(/[^\p{L}\p{N}'-]+/u)) {
      // Uzun rakam dizileri (tarih aralığı, kimlik) telefon numarasına benziyor ve
      // URL_OR_CONTACT'a takılıyor; bu tarama küfür sözlüğünü ölçüyor, onu değil.
      if (w.length < 2 || w.length > 30 || (w.match(/\d/g)?.length ?? 0) >= 7) continue;
      kelimeler.add(w);
    }
  };
  const gez = (o: unknown, d = 0): void => {
    if (d > 8) return;
    if (typeof o === "string") topla(o);
    else if (Array.isArray(o)) for (const x of o) gez(x, d + 1);
    else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) { topla(k); gez(v, d + 1); }
  };
  const yürü = (dir: string): void => {
    let girdiler;
    try { girdiler = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of girdiler) {
      const p = join(dir, e.name);
      if (e.isDirectory()) yürü(p);
      else if (e.name.endsWith(".json")) { try { gez(JSON.parse(readFileSync(p, "utf8"))); } catch { /* üretilmemiş/bozuk dosya: atla */ } }
    }
  };
  for (const dir of ["data", "src/content", "src/lib/lessons"]) yürü(dir);

  const norm = (s: string) => s.toLocaleLowerCase("tr-TR").replace(/[^\p{L}\p{N}]/gu, "");
  const isabet = [...kelimeler].filter((w) => displayNameAllowed(w) === false);
  const beklenmeyen = [...new Set(isabet.map(norm))].filter((w) => !BİLİNEN_İSABET.has(w));
  console.log(`     (${kelimeler.size} ders sözcüğü tarandı, ${isabet.length} isabet)`);
  check(
    `ders içeriği: beklenmeyen isabet yok${beklenmeyen.length ? ` — ${beklenmeyen.slice(0, 20).join(", ")}` : ""}`,
    kelimeler.size > 1000 && beklenmeyen.length === 0,
  );
}

console.log(fail ? `\n${fail} BAŞARISIZ` : "\nTüm moderasyon testleri geçti.");
process.exit(fail ? 1 : 0);
