/**
 * MOBİL PAKET KAYNAKLA AYNI İÇERİĞİ TAŞIYOR MU.
 *
 * Üç içerik köprüsü web kaynağından mobil pakete dökülüyor (`dump-conversations-
 * mobile`, `dump-skills-mobile`, `dump-mock-exams-mobile`). Döküm ELLE
 * çalıştırılıyor: kaynağa yeni bir ders/egzersiz/kâğıt eklenip döküm
 * yenilenmezse mobil paket o içeriği sessizce taşımaz. Sonuç ekranda görünür -
 * Patika'da açılamayan bir ünite, listede olmayan bir kâğıt - ama hiçbir kapı
 * söylemez.
 *
 * İKİ ÖLÇÜT VAR ve ikisi ayrı şeyi yakalıyor.
 *
 * KİMLİK KÜMESİ eksik/fazla kaydı ADIYLA söylüyor: "dokumde EKSIK: en-c1-u07".
 * Tek ölçüt uzun süre buydu, gerekçesi de yazılıydı — içerik metni sürekli
 * değişiyor ve tam eşitlik isteyen bir kapı yarım kalmış her işte kırmızı
 * yanardı.
 *
 * O gerekçe 2026-09-12'de ÖLÇÜLDÜ ve tutmadı: kimlikler aynı kalırken METİN
 * ayrışıyor ve bu kapı "DOKUMLER KAYNAKLA AYNI" diyordu.
 *   · `papers-en.json` bir gerekçede hâlâ «Ayşe» taşıyordu; kaynak c2f714b8'de
 *     «Ayse»ye çekilmişti. Yani düzeltme web'de yaşıyor, mobilde yok.
 *   · Aynı gün 122 anlatım adımındaki övgü açılışı silindi; kimlik kümesi
 *     kılını kıpırdatmadı.
 * Dökümün YENİDEN ÜRETİLMESİ tek komut (`npm run dump:conversations` …), yani
 * kırmızı yanmanın bedeli düşük; sessiz sapmanın bedeli ekranda görünmeyen
 * eski içerik. Ana dil dökümünde bayt eşitliği zaten böyle kurulmuştu.
 *
 * İkinci ölçüt dökümün KENDİ işlevini çağırıyor (`buildConversationDump` vb.),
 * projeksiyonu kopyalamıyor: kopya olsaydı kapı dökümden ayrı düşer ve
 * yanlış yeri gösterirdi.
 *
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/check-dumps.ts
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { CONVERSATIONS } from "../src/lib/conversations/source";
import { buildNativeDump, NATIVE_DUMP_FILES } from "./dump-native-mobile";
import { buildConversationDump } from "./dump-conversations-mobile";

const ROOT = path.join(__dirname, "..");
const read = (p: string) => JSON.parse(readFileSync(path.join(ROOT, p), "utf8")) as unknown;
const rows = (v: unknown): { id?: string }[] => (Array.isArray(v) ? (v as { id?: string }[]) : [v as { id?: string }]);

/** Bir dosya kümesindeki `id` alanlarını toplar; dosya yoksa atlar. */
function ids(files: string[]): Set<string> {
  const out = new Set<string>();
  for (const f of files) {
    let parsed: unknown;
    try {
      parsed = read(f);
    } catch {
      continue; // kurs paketi henüz yoksa (ör. yeni kurs) kümeye katkısı olmaz
    }
    for (const r of rows(parsed)) if (r?.id) out.add(r.id);
  }
  return out;
}

let fails = 0;

function compare(label: string, web: Set<string>, mob: Set<string>) {
  const onlyWeb = [...web].filter((x) => !mob.has(x)).sort();
  const onlyMob = [...mob].filter((x) => !web.has(x)).sort();
  if (!web.size || !mob.size) {
    fails++;
    console.error(`✗ ${label}: kume okunamadi (web ${web.size}, mobil ${mob.size})`);
    return;
  }
  if (!onlyWeb.length && !onlyMob.length) {
    console.log(`✓ ${label}: ${web.size} kimlik, iki tarafta ayni`);
    return;
  }
  fails++;
  console.error(`✗ ${label}: web ${web.size}, mobil ${mob.size}`);
  if (onlyWeb.length) console.error(`   dokumde EKSIK (${onlyWeb.length}): ${onlyWeb.slice(0, 8).join(", ")}${onlyWeb.length > 8 ? " …" : ""}`);
  if (onlyMob.length) console.error(`   dokumde FAZLA (${onlyMob.length}): ${onlyMob.slice(0, 8).join(", ")}${onlyMob.length > 8 ? " …" : ""}`);
  console.error("   dokumu yenile: npm run dump:conversations / dump:skills / dump:mock-exams (ve :en surumleri)");
}

/* TOHUM KİMLİKLERİ: ikilide yalnız A1 var, gerisi yayına gidiyor. Ölçüt de
   bu yüzden A1 ile sınırlı — üst seviyelerin doğrulayıcısı `check:conversations`. */
const seedFiles = ["de-a1", "en-a1"].map((n) => `mobile/src/data/conversations/${n}.json`);
compare("ders tohumu", new Set(CONVERSATIONS.filter((l) => l.level === "A1").map((l) => l.id)), ids(seedFiles));

/*
  BECERİ EGZERSİZLERİ ARTIK DÖKÜLMÜYOR: iki JSON mobil paketten çıkarıldı ve
  içerik hattından seviye paketi hâlinde iniyor. Karşılaştırılacak dosya yok;
  egzersizlerin doğrulayıcısı `npm run skills:check`.
*/

/*
  DENEME KÂĞITLARI ARTIK DÖKÜLMÜYOR.

  `papers.json` ve `papers-en.json` mobil paketten çıkarıldı: premium kapılı
  kâğıtlar ücretsiz ikilinin içinde, cevap anahtarlarıyla birlikte duruyordu.
  Kâğıt artık sunucudan, yetki kontrolünden geçtikten sonra iniyor
  (`src/lib/mock-exams/deliver`), künyeler de içerik hattından
  (`mockindex/<kurs>-<seviye>`). Karşılaştırılacak bir dosya kalmadı; kâğıdın
  doğrulayıcısı `npm run test:mock-exams`.
*/

/*
  ANA DİL DÖKÜMÜ — burada ölçüt KİMLİK DEĞİL, BAYT EŞİTLİĞİ.

  Ötekilerde gevşek ölçüt doğruydu: içerik metni sürekli değişiyor ve tam
  eşitlik yarım kalmış her işte kırmızı yanardı. Burada iki dosya da tümüyle
  TÜRETİLMİŞ (çözücünün kopyası + sözlük), yani kaynakla aynı olmamaları
  ancak dökümün unutulması demek. Unutulursa mobil eski çözücüyle çalışır ve
  hata ekranda görünmez: yeni yazılmış bir çeviri sessizce Türkçe kalır.
*/
{
  const want = buildNativeDump();
  for (const [label, file, body] of [
    /* SÖZLÜKLER ARTIK DÖKÜLMÜYOR: 10,5 MB'lık iki JSON mobil paketten
       çıkarıldı ve içerik hattından iniyor (`native/en`, `native/de`).
       Çözücüler KOD ve pakette kalıyor — onların dökümü hâlâ bayt bayt
       karşılaştırılıyor, çünkü kaynaktan türetiliyorlar. */
    ["ana dil çözücüsü", NATIVE_DUMP_FILES.ts, want.ts],
    ["Almanca çözücü", NATIVE_DUMP_FILES.tsDe, want.tsDe],
  ] as const) {
    let have: string | null = null;
    try {
      have = readFileSync(path.join(ROOT, file), "utf8");
    } catch {
      have = null;
    }
    if (have === body) {
      console.log(`✓ ${label}`);
      continue;
    }
    fails++;
    console.error(`✗ ${label}: ${have === null ? "dosya yok" : "kaynakla ayrışmış"} (${file})`);
    console.error("   dokumu yenile: npm run dump:native");
  }
}

/*
  METİN ÖLÇÜTÜ — kimlikler aynıyken içerik ayrışmış olabilir (gerekçe başta).
  Karşılaştırma dökümün kendi çıktısıyla, bayt bayt.
*/
{
  const built: { label: string; file: string; json: string; cmd: string }[] = [];
  for (const course of ["de", "en"]) {
    /* YALNIZ A1: üst seviyeler mobil paketten çıkarıldı ve yayına gidiyor,
       karşılaştırılacak dosyaları yok. Tohumun kaynakla birebir kalması ise
       hâlâ önemli — ikilinin ağsız açılışı ona bağlı. */
    for (const pack of buildConversationDump(course)) {
      if (pack.level !== "A1") continue;
      built.push({
        label: `ders tohumu ${course}-${pack.level}`,
        file: pack.file,
        json: pack.json,
        cmd: `npm run dump:conversations -- ${course}`,
      });
    }
  }
  let drift = 0;
  for (const b of built) {
    let have: string | null = null;
    try {
      have = readFileSync(path.join(ROOT, b.file), "utf8");
    } catch {
      have = null;
    }
    if (have === b.json) continue;
    drift++;
    fails++;
    console.error(`✗ ${b.label}: ${have === null ? "dosya yok" : "kaynakla ayrışmış"} (${b.file})`);
    console.error(`   dokumu yenile: ${b.cmd}`);
  }
  if (!drift) console.log(`✓ paket metni: ${built.length} dosya, kaynakla bayt bayt ayni`);
}

console.log(fails === 0 ? "\nDOKUMLER KAYNAKLA AYNI\n" : `\n${fails} DOKUM AYRISMASI\n`);
process.exit(fails === 0 ? 0 : 1);
