import "dotenv/config";
import { db } from "@/lib/db";
import { appSettings, legalDocuments } from "@/lib/db/schema";
import { LEGAL_LOCALES } from "@/lib/legal";
import { clearLegalConfigCache, legalConfig, saveLegalConfig } from "@/lib/legal/config";
import { defaultLegalConfig, parseLegalConfig } from "@/lib/legal/shape";
import {
  LEGAL_DOC_IDS,
  allLegalDocuments,
  clearLegalDocumentCache,
  defaultDocument,
  legalDocument,
  resetLegalDocument,
  saveLegalDocument,
  validateDocument,
} from "@/lib/legal/documents";

/**
 * Hukuki katmanın VERİTABANI testi.
 *
 * `test-legal.ts` koddaki varsayılanları denetliyor; buradaki soru başka:
 * panelden yazılan bir şey doğru okunuyor mu, bozuk girdi geri çevriliyor mu,
 * "varsayılana dön" gerçekten dönüyor mu. Bu yolun her adımı yayına çıkmış bir
 * sözleşme sayfasını değiştiriyor — sessiz bir hata burada en pahalısı.
 *
 * ÜRETİMDE KOŞMAZ: adres localhost/127.0.0.1 değilse baştan reddediyor.
 */
const url = process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL ?? "";
const host = url ? new URL(url).hostname : "";
if (host !== "localhost" && host !== "127.0.0.1") {
  console.error(`Yalnız yerel veritabanı: ${host || "(adres yok)"} reddedildi`);
  process.exit(2);
}

let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) fails++;
};

async function main() {
  // Temiz başlangıç: bu test kendi satırlarını yazıp siliyor.
  await db.delete(legalDocuments);
  await db.delete(appSettings);
  clearLegalConfigCache();
  clearLegalDocumentCache();

  console.log("\nYapılandırma");
  const d = defaultLegalConfig();
  check("boş veritabanı → kod varsayılanı", (await legalConfig()).version === d.version);

  await saveLegalConfig({ ...d, version: "2.5", effectiveDate: "2027-01-31" }, "test@x");
  clearLegalConfigCache();
  const saved = await legalConfig();
  check("sürüm kaydedildi", saved.version === "2.5", saved.version);
  check("tarih kaydedildi", saved.effectiveDate === "2027-01-31", saved.effectiveDate);

  // Bozuk girdiler: hepsi varsayılana düşmeli, hiçbiri veritabanına girmemeli.
  await saveLegalConfig({ ...d, version: "sürüm yok", effectiveDate: "31/01/2027" }, "test@x");
  clearLegalConfigCache();
  const clamped = await legalConfig();
  check("geçersiz sürüm reddedildi", clamped.version === d.version, clamped.version);
  check("geçersiz tarih reddedildi", clamped.effectiveDate === d.effectiveDate, clamped.effectiveDate);

  const wild = parseLegalConfig({ fairUse: { roleplayTurnsPerDay: 9_999_999 }, platforms: { android: false, ios: "evet" } });
  check("adil kullanım tavanı kırpıldı", wild.fairUse.roleplayTurnsPerDay === 100_000, String(wild.fairUse.roleplayTurnsPerDay));
  check("android kapatılamıyor", wild.platforms.android === true);
  check("bozuk ios değeri varsayılana düştü", wild.platforms.ios === d.platforms.ios);

  const noProcessors = parseLegalConfig({ processors: [{ name: { tr: "", en: "", de: "" } }] });
  check("adsız alıcı satırı düştü, varsayılana dönüldü", noProcessors.processors.length === d.processors.length);

  const halfEntry = parseLegalConfig({ changelog: [{ version: "1.0", date: "yok", changes: { tr: ["x"], en: [], de: [] } }] });
  check("tarihsiz kayıt düştü, varsayılana dönüldü", halfEntry.changelog.length === d.changelog.length);

  console.log("\nBelgeler");
  check("boş veritabanı → kod varsayılanı", (await legalDocument("privacy", "tr")).body === defaultDocument("privacy", "tr").body);
  check("üstyazım yok işareti", (await legalDocument("privacy", "tr")).overridden === false);

  const bad = await saveLegalDocument("privacy", "tr", { title: "x", description: "", summary: [], body: "## A\n\n{{bilinmeyen}}" }, "test@x");
  check("tanınmayan belirteç REDDEDİLDİ", !bad.ok && bad.problems.some((p) => p.kind === "unknown_token"));

  const unbal = await saveLegalDocument("privacy", "tr", { title: "x", description: "", summary: [], body: "## A\n\n{{ifIos}}yarım" }, "test@x");
  check("kapanmamış {{ifIos}} REDDEDİLDİ", !unbal.ok && unbal.problems.some((p) => p.kind === "unbalanced_ifios"));

  const empty = await saveLegalDocument("privacy", "tr", { title: "x", description: "", summary: [], body: "   " }, "test@x");
  check("boş gövde REDDEDİLDİ", !empty.ok && empty.problems.some((p) => p.kind === "empty"));

  const ok = await saveLegalDocument(
    "terms", "de",
    { title: "Neue Bedingungen", description: "d", summary: ["a", " ", "b"], body: "## Eins\n\nMerhaba {{supportEmail}}." },
    "test@x",
  );
  check("geçerli belge kaydedildi", ok.ok);
  check("eksik bölüm UYARI olarak döndü (engel değil)", ok.ok && ok.warnings.some((p) => p.kind === "missing_sections"));

  clearLegalDocumentCache();
  const de = await legalDocument("terms", "de");
  check("kaydedilen gövde okundu", de.body.startsWith("## Eins"), de.body.slice(0, 20));
  check("başlık okundu", de.title === "Neue Bedingungen", de.title);
  check("boş özet maddesi ayıklandı", de.summary.length === 2, JSON.stringify(de.summary));
  check("üstyazım işaretlendi", de.overridden === true);
  check("kim yazdı kaydedildi", de.updatedBy === "test@x", String(de.updatedBy));

  // Öteki diller etkilenmemeli: üstyazım BELGE bazında.
  check("başka dil etkilenmedi", (await legalDocument("terms", "tr")).overridden === false);
  check("başka belge etkilenmedi", (await legalDocument("privacy", "de")).overridden === false);

  const all = await allLegalDocuments();
  check("panel listesi 3×3 dolu", LEGAL_DOC_IDS.every((doc) => LEGAL_LOCALES.every((l) => Boolean(all[doc][l].body))));

  await resetLegalDocument("terms", "de");
  clearLegalDocumentCache();
  const back = await legalDocument("terms", "de");
  check("varsayılana dönüldü", back.body === defaultDocument("terms", "de").body);
  check("üstyazım işareti kalktı", back.overridden === false);

  console.log("\nBoş gövdeye düşme");
  // Satır elle boşaltılırsa (doğrudan SQL, panelden geçmeyen bir yol) sayfa yine
  // dolu basmalı: boş bir gizlilik politikası yayımlamak en kötü sonuç.
  await db.insert(legalDocuments).values({ doc: "privacy", locale: "en", title: "  ", description: "", summary: [], body: "   " });
  clearLegalDocumentCache();
  const rescued = await legalDocument("privacy", "en");
  check("boş gövde varsayılana düştü", rescued.body === defaultDocument("privacy", "en").body);
  check("boş başlık varsayılana düştü", rescued.title === defaultDocument("privacy", "en").title);

  console.log("\nDoğrulayıcı");
  const v = validateDocument("privacy", "tr", defaultDocument("privacy", "tr").body);
  check("varsayılan metin kendi denetiminden geçiyor", v.blocking.length === 0 && v.warnings.length === 0,
    JSON.stringify([...v.blocking, ...v.warnings]));

  await db.delete(legalDocuments);
  await db.delete(appSettings);
  console.log(fails === 0 ? `\ntamam: hepsi geçti` : `\nKALDI: ${fails}`);
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
