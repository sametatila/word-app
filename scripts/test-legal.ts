import { existsSync } from "node:fs";
import { PRIVACY_DEFAULT } from "@/content/legal/defaults/privacy";
import { TERMS_DEFAULT } from "@/content/legal/defaults/terms";
import { SUPPORT_DEFAULT } from "@/content/legal/defaults/support";
import type { LegalDocDefault } from "@/content/legal/defaults/types";
import { unbalancedConditionals, unknownTokens } from "@/lib/legal/markdown";
import {
  LEGAL_CHANGELOG,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_LOCALES,
  LEGAL_PATHS,
  LEGAL_VERSION,
  LEGAL_VOCAB,
  ALL_PROCESSORS,
  processorRow,
  type LegalDoc,
} from "@/lib/legal";

/**
 * HUKUKİ METİNLERİN KAPISI — veritabanı istemez, saniye sürer.
 *
 * Buradaki hata sınıfının ortak yanı SESSİZ olması: yanlış bir sürüm numarası,
 * çevrilmemiş bir kayıt ya da tabloda boş kalan bir hücre derlemeyi kırmaz,
 * testi kırmaz, ancak yayımlanmış metni okuyan biri fark eder — yani en kötü
 * yerde. Bugün üçü birden gerçekten oldu:
 *
 *   - `LEGAL_VERSION` elle iki ayrı yerde artırılıyor (sabit + kaydın kendi
 *     `version` alanı) ve dosyanın kendi yorumu "aynı olmak zorundadır" diyor.
 *     Zorunluluğu yazan bir cümle vardı, kontrol eden bir şey yoktu.
 *   - `llmRouting` amacı OpenRouter satırıyla birlikte ölmüştü ve arkada kaldı.
 *   - `LEGAL_PATHS`e yeni bir yol eklenip sayfası unutulursa bağlantı 404 verir;
 *     üstelik o yollardan biri App Store'un Support URL alanına giriyor.
 */
let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) fails++;
};

console.log("\nSürüm");
const head = LEGAL_CHANGELOG[0];
check("sürüm sabiti en yeni kayıtla aynı", LEGAL_VERSION === head.version, `${LEGAL_VERSION} ≠ ${head.version}`);
check("yürürlük tarihi en yeni kayıtla aynı", LEGAL_EFFECTIVE_DATE === head.date, `${LEGAL_EFFECTIVE_DATE} ≠ ${head.date}`);
check("tarihler ISO biçiminde", LEGAL_CHANGELOG.every((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date)));
check(
  "sürümler yeniden eskiye sıralı",
  LEGAL_CHANGELOG.every((e, i) => i === 0 || LEGAL_CHANGELOG[i - 1].date >= e.date),
);

console.log("\nSürüm geçmişi");
for (const entry of LEGAL_CHANGELOG) {
  for (const locale of LEGAL_LOCALES) {
    const lines = entry.changes[locale];
    check(
      `${entry.version} · ${locale}: kayıt dolu`,
      Array.isArray(lines) && lines.length > 0 && lines.every((l) => l.trim().length > 0),
    );
  }
  // Diller arasında madde sayısı da eşit olmalı: bir dile madde eklenip
  // ötekine eklenmemesi, çeviri eksiğinin en sık görülen biçimi.
  const counts = LEGAL_LOCALES.map((l) => entry.changes[l].length);
  check(`${entry.version}: üç dilde aynı sayıda madde`, new Set(counts).size === 1, counts.join(" / "));
}

console.log("\nYollar");
for (const [doc, path] of Object.entries(LEGAL_PATHS) as [LegalDoc, string][]) {
  // Yolun karşılığı bir sayfa dosyası olmalı. `/account/delete` gibi çok
  // parçalı yollar da doğrudan eşleşiyor; dinamik segment kullanılmıyor.
  check(`${doc} → ${path} sayfası var`, existsSync(`src/app${path}/page.tsx`));
}

console.log("\nAlıcılar tablosu");
for (const p of ALL_PROCESSORS) {
  for (const locale of LEGAL_LOCALES) {
    const row = processorRow(p, locale);
    const empty = Object.entries(row)
      .filter(([, v]) => !v || !v.trim())
      .map(([k]) => k);
    check(`${p.name} · ${locale}: hücreler dolu`, empty.length === 0, empty.join(", "));
  }
}

console.log("\nSözlükte ölü anahtar");
/*
  `Set<string>` OLARAK yazılı: alanların eleman tipleri farklı olduğu için
  `used[group]` bir Set BİRLEŞİMİ oluyor ve `has()`in parametresi `never`e
  daralıyordu (tsc: "Argument of type 'string' is not assignable to 'never'").
*/
const used: Record<string, Set<string>> = {
  purposes: new Set(ALL_PROCESSORS.map((p) => p.purpose)),
  dataKinds: new Set(ALL_PROCESSORS.map((p) => p.data)),
  regions: new Set(ALL_PROCESSORS.map((p) => p.region)),
  safeguards: new Set(ALL_PROCESSORS.map((p) => p.safeguard)),
  // `always` sözlükte varsayılan: `when` yazılmayan her satır onu kullanıyor,
  // dolayısıyla hiçbir satırda adı geçmese bile ölü değil.
  occasions: new Set([...ALL_PROCESSORS.map((p) => p.when ?? "always"), "always"]),
};
for (const [group, keys] of Object.entries(LEGAL_VOCAB) as [keyof typeof used, readonly string[]][]) {
  const dead = keys.filter((k) => !used[group].has(k));
  check(`${group}: kullanılmayan anahtar yok`, dead.length === 0, dead.join(", "));
}

console.log("\nBelgelerin varsayılan metni");
const DOCS: Record<string, Record<string, LegalDocDefault>> = {
  privacy: PRIVACY_DEFAULT,
  terms: TERMS_DEFAULT,
  support: SUPPORT_DEFAULT,
};
for (const [doc, byLocale] of Object.entries(DOCS)) {
  for (const locale of LEGAL_LOCALES) {
    const d = byLocale[locale];
    const where = `${doc} · ${locale}`;
    check(`${where}: başlık ve gövde dolu`, Boolean(d?.title?.trim() && d?.body?.trim()));
    if (!d) continue;
    const unknown = unknownTokens(d.body);
    // Kapalı sözlük: yazım hatası olan bir belirteç sayfada ham {{...}} olarak
    // görünür. Panelde kaydetme bunu reddediyor; varsayılan metin panelden
    // geçmediği için kapı burada.
    check(`${where}: belirteçlerin hepsi tanınıyor`, unknown.length === 0, unknown.join(", "));
    check(`${where}: {{ifIos}} dengeli`, !unbalancedConditionals(d.body));
    check(`${where}: en az bir bölüm başlığı var`, d.body.includes("## "));
    // Blok belirteçleri kendi satırlarında olmalı, yoksa paragrafa düşer ve
    // sayfada ham metin olarak görünür.
    const inlineBlock = d.body
      .split("\n")
      .some((l) => /\{\{(processorsTable|entityBlock:)/.test(l) && l.trim() !== l.trim().match(/^\{\{[^}]+\}\}$/)?.[0]);
    check(`${where}: blok belirteçleri kendi satırında`, !inlineBlock);
  }
}

console.log(fails === 0 ? `\ntamam: hepsi geçti` : `\nKALDI: ${fails}`);
process.exit(fails === 0 ? 0 : 1);
