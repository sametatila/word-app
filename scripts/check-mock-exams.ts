/**
 * Deneme sınavı doğrulayıcısı — `npm run test:mock-exams`.
 *
 * Bir deneme sınavı kâğıdının bozulma biçimlerinin çoğu tip hatası vermez ve
 * öğrenci sınava girene kadar görünmez: doğru şıkkın dizini kayar, eşleştirme
 * bankasında iki madde aynı şıkkı ister, boşluklu metinde işaret kalır ama
 * maddesi silinmiştir, bir bölümün madde sayısı öteki kâğıttan farklıdır ve
 * iki deneme artık kıyaslanamaz.
 *
 * Ölçülen şey üç başlık altında toplanıyor:
 *
 *   BÜTÜNLÜK   kimlikler tekil mi, referanslar çözülüyor mu, madde numaraları
 *              bölüm boyunca 1..N kesintisiz mi, süreler toplamı tutuyor mu.
 *   KIYASLANABİLİRLİK  her seviyenin kâğıt PLANI sabit (bölüm, görev, madde
 *              sayısı). İki A1 denemesi aynı yapıda değilse puanları aynı şeyi
 *              söylemez; plan bu yüzden kod içinde ve ihlali hata.
 *   MADDE KALİTESİ  şıklar tekrar ediyor mu, cevap anahtarı tek harfe yığılmış
 *              mı, doğru/yanlış maddeleri dengeli mi, doğru şık sistematik
 *              olarak en uzunu mu (klasik ipucu), açıklama yazılmış mı.
 *
 * Ayrıca MARKA TARAMASI: kâğıtlar gerçek sınavların yapısına bakılarak
 * yazıldı, hiçbiri bir kurumun sınavı değil. Hiçbir alanda kurum ya da sınav
 * markası geçmemeli; geçerse bu bir hata.
 */
import { MOCK_PAPERS } from "../src/lib/mock-exams";
import { foldAnswer } from "../src/lib/mock-exams/scoring";
import {
  MOCK_SKILL_ORDER,
  partPoints,
  taskSeconds,
  type MockCourse,
  type MockItem,
  type MockLevel,
  type MockPaper,
  type MockPart,
  type MockSkill,
  type MockTask,
} from "../src/lib/mock-exams/types";

let errors = 0;
let warnings = 0;
const fail = (where: string, msg: string) => { errors++; console.error(`✗ ${where}: ${msg}`); };
const warn = (where: string, msg: string) => { warnings++; console.warn(`! ${where}: ${msg}`); };

/* ── seviye planı ──────────────────────────────────────────────────────────
 * Aynı seviyedeki her kâğıt bu yapıda olmalı. Sayılar gerçek sınavların
 * bölüm/görev dağılımına bakılarak belirlendi; değiştirilirse o seviyedeki
 * TÜM kâğıtlar birlikte değişir, yoksa denemeler kıyaslanamaz hale gelir.
 *
 * KURS BAŞINA AYRI PLAN. Almanca ve İngilizce sınav gelenekleri aynı seviyede
 * farklı kâğıt kuruyor: İngilizce tarafta A2'den itibaren dil sistemi açıkça
 * ölçülüyor (boşluklu metinler), B2'den itibaren kelime türetme ve anahtar
 * sözcükle dönüştürme geliyor; bunların Almanca kâğıtlarda karşılığı yok.
 * Tek bir tablo ikisini birden tarif edemez.
 */
type PartPlan = { skill: MockSkill; minutes: number; tasks: number[] };
const PLAN: Record<MockCourse, Record<MockLevel, PartPlan[]>> = {
  de: {
    A1: [
      { skill: "reading", minutes: 25, tasks: [5, 5, 5] },
      { skill: "listening", minutes: 20, tasks: [6, 4, 5] },
      { skill: "writing", minutes: 20, tasks: [5, 0] },
      { skill: "speaking", minutes: 15, tasks: [0, 0, 0] },
    ],
    A2: [
      { skill: "reading", minutes: 30, tasks: [5, 5, 5, 5] },
      { skill: "listening", minutes: 30, tasks: [5, 5, 5, 5] },
      { skill: "writing", minutes: 30, tasks: [0, 0] },
      { skill: "speaking", minutes: 15, tasks: [0, 0, 0] },
    ],
    B1: [
      { skill: "reading", minutes: 65, tasks: [6, 6, 7, 7, 4] },
      { skill: "listening", minutes: 40, tasks: [10, 5, 7, 8] },
      { skill: "writing", minutes: 60, tasks: [0, 0, 0] },
      { skill: "speaking", minutes: 15, tasks: [0, 0, 0] },
    ],
    B2: [
      { skill: "reading", minutes: 65, tasks: [9, 6, 6, 6, 3] },
      { skill: "listening", minutes: 40, tasks: [10, 6, 6, 8] },
      { skill: "writing", minutes: 75, tasks: [0, 0] },
      { skill: "speaking", minutes: 15, tasks: [0, 0] },
    ],
    C1: [
      { skill: "reading", minutes: 70, tasks: [10, 10, 5] },
      { skill: "listening", minutes: 40, tasks: [10, 15] },
      { skill: "writing", minutes: 80, tasks: [0, 10] },
      { skill: "speaking", minutes: 15, tasks: [0, 0] },
    ],
  },
  /*
    İngilizce planı. Okuma bölümü aynı zamanda dil sistemi bölümü — gerçek
    İngilizce sınavlarda da okuma ile dilbilgisi/kelime tek kâğıtta durur.
    Ayrı bir beceri açmak (`MockSkill`e beşinci değer) veritabanındaki `skill`
    kolonunu, istatistik kırılımlarını ve iki oynatıcıyı birden açardı;
    kazancı ise `byTask` kırılımının zaten verdiği teşhis olurdu.
  */
  en: {
    A1: [
      { skill: "reading", minutes: 30, tasks: [5, 5, 4, 4] },
      { skill: "listening", minutes: 20, tasks: [6, 4, 5] },
      { skill: "writing", minutes: 20, tasks: [5, 0] },
      { skill: "speaking", minutes: 15, tasks: [0, 0, 0] },
    ],
    A2: [
      { skill: "reading", minutes: 35, tasks: [5, 5, 4, 5, 5] },
      { skill: "listening", minutes: 30, tasks: [5, 5, 5, 5] },
      { skill: "writing", minutes: 30, tasks: [0, 0] },
      { skill: "speaking", minutes: 15, tasks: [0, 0, 0] },
    ],
    B1: [
      { skill: "reading", minutes: 55, tasks: [5, 5, 5, 5, 5, 5] },
      { skill: "listening", minutes: 35, tasks: [7, 6, 6, 6] },
      { skill: "writing", minutes: 50, tasks: [0, 0] },
      { skill: "speaking", minutes: 15, tasks: [0, 0, 0, 0] },
    ],
    B2: [
      { skill: "reading", minutes: 70, tasks: [6, 6, 6, 4, 5, 4, 5] },
      { skill: "listening", minutes: 40, tasks: [8, 8, 6, 8] },
      { skill: "writing", minutes: 70, tasks: [0, 0] },
      { skill: "speaking", minutes: 15, tasks: [0, 0, 0] },
    ],
    C1: [
      { skill: "reading", minutes: 80, tasks: [6, 6, 6, 4, 4, 4, 4, 6] },
      { skill: "listening", minutes: 40, tasks: [6, 8, 8, 8] },
      { skill: "writing", minutes: 80, tasks: [0, 0] },
      { skill: "speaking", minutes: 15, tasks: [0, 0, 0] },
    ],
  },
};

/**
 * Seviyeye göre en uzun cümlenin kelime sınırı — aşarsa uyarı.
 *
 * İngilizce sınırlar daha yüksek ve bu bir gevşeme değil. Almanca aynı bilgiyi
 * daha az sözcükle taşıyor: bileşik ad tek sözcük ("Anmeldeformular"), İngilizce
 * karşılığı üç ("registration form for"). Aynı sayıyı iki dile uygulamak
 * İngilizce metni haksız yere uzun gösterirdi.
 */
const MAX_SENTENCE: Record<MockCourse, Record<MockLevel, number>> = {
  de: { A1: 16, A2: 22, B1: 30, B2: 42, C1: 58 },
  en: { A1: 18, A2: 24, B1: 32, B2: 45, C1: 60 },
};

/**
 * Seviyenin üstünde kalan yapı işaretleri. Tam bir dilbilgisi denetimi değil;
 * kâğıda yanlışlıkla sızan üst seviye kalıbı yakalayan ucuz bir elek.
 *
 * İngilizce A1'de present perfect, edilgen, ilgi cümlesi ve koşul kipleri
 * beklenmez; A2'de üçüncü tip koşul, ortaç öbeği ve devrik yapı beklenmez.
 */
const OVER_LEVEL: Record<MockCourse, Partial<Record<MockLevel, RegExp>>> = {
  de: {
    A1: /\b(würde[nst]?|wäre[nst]?|hätte[nst]?|obwohl|trotzdem|jedoch|dessen|deren|worden|sofern|geworden wäre)\b/i,
    A2: /\b(dessen|deren|worden|sofern|insofern|nichtsdestotrotz|hätte[nst]? gehabt)\b/i,
  },
  en: {
    A1: /\b(although|however|whereas|nevertheless|whose|despite|unless|had been|would have|(?:have|has)\s+(?:been|never|already|just)\b)/i,
    A2: /\b(whereas|nevertheless|albeit|notwithstanding|had been|would have been|having\s+\w+ed\b|no sooner|not only had)\b/i,
  },
};

/**
 * Kâğıtlarda geçmemesi gereken kurum ve sınav adları.
 *
 * Kısaltmalar bilerek yok. `BRAND_RE` sözcük sınırıyla arıyor ve "pet", "key",
 * "first", "ise" gibi kısaltmalar İngilizcede sıradan sözcükler: onları listeye
 * koymak her kâğıtta yanlış alarm üretirdi. Yerine tek anlamlı ÖBEKLER var.
 * Kurum adlarının kendisi ("cambridge", "trinity", "pearson") listede duruyor;
 * bu, kâğıtlarda o sözcükleri şehir ya da kişi adı olarak da kullanmamak
 * demektir ve kasıtlı — bir sınav kâğıdında geçen "Cambridge" okuyucuya her
 * durumda markayı çağrıştırır.
 */
const BRANDS = [
  "goethe", "telc", "ösd", "oesd", "testdaf", "test daf", "dsh", "dtz", "öif", "oeif",
  "start deutsch", "fit in deutsch", "modellsatz", "übungssatz", "uebungssatz",
  "kandidatenblätter", "prüferblätter", "zertifikat b1", "zertifikat b2", "zertifikat a2",
  "deutsch-test für zuwanderer", "g.a.s.t", "zfa", "onset",
  "cambridge", "ielts", "toefl", "toeic", "aptis", "trinity", "languagecert",
  "pearson", "pte", "esol", "ukvi", "ets", "british council", "idp", "linguaskill",
  "key english test", "preliminary english test", "first certificate",
  "certificate in advanced english", "certificate of proficiency", "use of english",
];
const BRAND_RE = new RegExp(`(^|[^\\p{L}])(${BRANDS.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})($|[^\\p{L}])`, "iu");

/** Nesnedeki tüm dizeleri yolu ile birlikte dolaşır. */
function* strings(node: unknown, path: string): Generator<[string, string]> {
  if (typeof node === "string") { yield [path, node]; return; }
  if (Array.isArray(node)) { for (const [i, v] of node.entries()) yield* strings(v, `${path}[${i}]`); return; }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) yield* strings(v, path ? `${path}.${k}` : k);
  }
}

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter(Boolean);
}

function words(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/* ── madde denetimi ─────────────────────────────────────────────────────── */

function checkItem(where: string, item: MockItem, task: MockTask) {
  if (!item.id.trim()) fail(where, "madde kimliği boş");
  if (!item.explain || item.explain.trim().length < 20) fail(where, "açıklama yok ya da çok kısa (en az 20 karakter)");
  if (item.kind !== "gap" && !item.text.trim()) fail(where, "soru kökü boş");
  if (item.ref) {
    const ids = (task.texts ?? []).map((t) => t.id);
    if (!ids.includes(item.ref)) fail(where, `ref "${item.ref}" görevin metinlerinde yok (${ids.join(", ") || "hiç metin yok"})`);
  }
  if (item.kind === "mcq") {
    if (item.options.length < 2) fail(where, `şık sayısı ${item.options.length} (en az 2)`);
    if (item.answer < 0 || item.answer >= item.options.length) fail(where, `doğru şık dizini ${item.answer} sınır dışı`);
    if (item.options.some((o) => !o.trim())) fail(where, "boş şık var");
    const norm = item.options.map((o) => o.trim().toLowerCase().replace(/\s+/g, " "));
    if (new Set(norm).size !== norm.length) fail(where, "şıklar tekrar ediyor");
  }
  if (item.kind === "match") {
    const keys = (task.options ?? []).map((o) => o.key);
    if (!keys.includes(item.answer)) fail(where, `cevap "${item.answer}" şık bankasında yok`);
  }
  if (item.kind === "gap") {
    if (!item.accept.length) fail(where, "kabul edilen cevap listesi boş");
    if (item.accept.some((a) => !a.trim())) fail(where, "kabul listesinde boş giriş var");
    /*
      Tekrar denetimi PUANLAMANIN katlamasıyla yapılıyor, ham dizeyle değil.
      Ham karşılaştırma "sixty-one" ile "sixty one"ı ayrı sayıyor, oysa
      `foldAnswer` ikisini de aynı şeye indiriyor: liste iki giriş taşıyor ama
      tek bir yazımı kabul ediyor. Bu, listeyi yazanın kapsadığını sandığı
      biçimlerden daha azını kapsaması demek — sessiz bir eksiklik.
    */
    const norm = item.accept.map(foldAnswer);
    if (new Set(norm).size !== norm.length) {
      fail(where, `kabul listesi katlamadan sonra çakışıyor (aynı yazımı iki kez sayıyor): ${JSON.stringify(item.accept)}`);
    }

    if (task.format === "transform") {
      /*
        Dönüştürme maddesinin iki kuralı var ve ikisi de görevin ne ölçtüğünü
        belirliyor. Anahtar sözcük DEĞİŞTİRİLMEDEN kullanılmalı — değişebilseydi
        madde "aynı anlamı başka türlü söyle"ye dönerdi ve hedef yapı ölçülmezdi.
        Cevap iki ile beş sözcük arası olmalı: tek sözcük dönüştürme değil boşluk
        doldurmadır, beşten uzunu ise cümlenin yarısını yeniden yazdırır ve
        kabul listesi tutulamaz hale gelir.
      */
      if (!item.cue?.trim()) fail(where, "dönüştürme maddesinde anahtar sözcük (cue) yok");
      else {
        const cue = item.cue.trim().toLowerCase();
        for (const a of item.accept) {
          if (!new RegExp(`(^|\\s)${cue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|\\s)`).test(a.toLowerCase())) {
            fail(where, `kabul edilen cevap anahtar sözcüğü aynen taşımıyor: "${a}" içinde "${item.cue}" yok`);
          }
          const n = a.trim().split(/\s+/).filter(Boolean).length;
          if (n < 2 || n > 5) fail(where, `kabul edilen cevap ${n} sözcük ("${a}") — 2 ile 5 arası olmalı`);
        }
      }
      if (!item.text.includes("\n")) fail(where, "dönüştürme maddesinde kaynak ve hedef cümle satır sonuyla ayrılmalı");
    }
    // Kelime türetmede kök büyük harfle yazılır ve cevabın kendisi olamaz:
    // kök ile cevap aynıysa madde bir türetme değil bir kopyalama ister.
    if (task.format === "gap" && item.text.trim() && /^[A-ZÄÖÜ][A-ZÄÖÜ\s-]*$/.test(item.text.trim())) {
      const root = item.text.trim().toLowerCase();
      if (item.accept.some((a) => a.trim().toLowerCase() === root)) {
        fail(where, `kelime türetmede cevap kökün kendisi ("${item.text.trim()}") — madde hiçbir şey ölçmüyor`);
      }
    }
  }
}

/* ── görev denetimi ─────────────────────────────────────────────────────── */

function checkTask(where: string, task: MockTask, level: MockLevel, course: MockCourse) {
  if (!task.prompt.trim() || !task.promptTr.trim()) fail(where, "görev yönergesi eksik (prompt / promptTr)");

  const textIds = (task.texts ?? []).map((t) => t.id);
  if (new Set(textIds).size !== textIds.length) fail(where, "metin kimlikleri tekrar ediyor");

  // Kullanılmayan metin: kâğıtta duruyor ama hiçbir madde ona bakmıyor.
  // Hiçbir maddede `ref` yoksa görev metinlerin TAMAMINA birden soruyor —
  // "bunu hangi kişi söylüyor" biçimi böyledir ve orada bağlama beklenmez.
  if ((task.texts?.length ?? 0) > 1) {
    const used = new Set(task.items.map((i) => i.ref).filter(Boolean));
    if (used.size) {
      for (const t of task.texts ?? []) {
        // Boşluk işareti taşıyan metin bir KAYNAK değil, cevap kâğıdıdır
        // (C1'in not alma görevindeki not sayfası gibi): maddeler kaydı
        // gösterir, bu sayfayı değil.
        const sheet = t.kind === "text" && /\{\{\d+\}\}/.test(t.body);
        if (!sheet && !used.has(t.id)) fail(where, `"${t.id}" metnine bağlı madde yok`);
      }
    }
  }

  if (task.format === "match") {
    const opts = task.options ?? [];
    if (!opts.length) fail(where, "eşleştirme görevinde şık bankası yok");
    const keys = opts.map((o) => o.key);
    if (new Set(keys).size !== keys.length) fail(where, "şık bankasında aynı harf iki kez var");
    const answers = task.items.filter((i) => i.kind === "match").map((i) => i.answer as string);

    if (task.reuseOptions) {
      /*
        Şık tekrarlı eşleştirme (İngilizce çoklu eşleştirme): dört metne altı
        soru sorulur, her metin birkaç kez cevap olur. Çeldirici şık ve
        "her şık bir kez" kuralları burada anlamsız — yerine görevi çürüten
        iki başka dizilim aranıyor.
      */
      const used = new Set(answers);
      for (const o of opts) if (!used.has(o.key)) fail(where, `"${o.key}" şıkkı hiçbir maddenin cevabı değil — ölü şık`);
      const counts = new Map<string, number>();
      for (const a of answers) counts.set(a, (counts.get(a) ?? 0) + 1);
      const cap = Math.ceil(answers.length / 2);
      for (const [k, n] of counts) {
        if (n > cap) fail(where, `"${k}" şıkkı ${answers.length} maddenin ${n} tanesinin cevabı (en çok ${cap}) — görev tek metne yığılmış`);
      }
      if (opts.length < 2) fail(where, `şık bankası ${opts.length} — tekrarlı eşleştirmede en az iki şık olmalı`);
    } else {
      if (opts.length < task.items.length + 1) {
        fail(where, `şık bankası ${opts.length}, madde ${task.items.length} — en az bir çeldirici şık olmalı`);
      }
      if (new Set(answers).size !== answers.length) fail(where, "iki madde aynı şıkkı istiyor (her şık en fazla bir kez)");
    }
  } else if (task.options?.length) {
    fail(where, "şık bankası yalnız eşleştirme görevinde olur");
  }
  if (task.reuseOptions && task.format !== "match") {
    fail(where, "şık tekrarı bayrağı yalnız eşleştirme görevinde anlamlı");
  }

  // Boşluklu metin: işaretler ile maddeler birebir örtüşmeli. Biçimden
  // bağımsız çalışıyor, çünkü B2'nin cümle yerleştirme görevi de boşluklu bir
  // metin ama eşleştirme biçiminde.
  {
    const marks = new Set<number>();
    for (const t of task.texts ?? []) {
      if (t.kind !== "text") continue;
      for (const m of t.body.matchAll(/\{\{(\d+)\}\}/g)) marks.add(Number(m[1]));
    }
    if (marks.size) {
      const nos = new Set(task.items.map((i) => i.no));
      for (const m of marks) if (!nos.has(m)) fail(where, `metinde {{${m}}} işareti var ama maddesi yok`);
      for (const n of nos) if (!marks.has(n)) fail(where, `${n}. maddenin metinde {{${n}}} işareti yok`);
    }
  }

  if (task.format === "writing" || task.format === "speaking") {
    const r = task.rubric;
    if (!r) { fail(where, "yazma/konuşma görevinde ölçüt (rubric) yok"); return; }
    if (r.points.length < 2) fail(where, `içerik noktası ${r.points.length} (en az 2)`);
    for (const p of r.points) if (!p.de.trim() || !p.tr.trim()) fail(where, "içerik noktasında eksik dil");
    if (r.criteria.length < 3) fail(where, `değerlendirme ölçütü ${r.criteria.length} (en az 3)`);
    if (!r.sample.trim()) fail(where, "örnek cevap yok");
    if (r.minWords && words(r.sample) < r.minWords) {
      fail(where, `örnek cevap ${words(r.sample)} kelime, istenen en az ${r.minWords}`);
    }
    if (task.items.length) fail(where, "yazma/konuşma görevinde nesnel madde olmaz");

    // Dijital oturumun konuşma fazları: önce hazırlık, sonra konuşma.
    if (task.format === "speaking") {
      if (!task.prepSeconds) fail(where, "konuşma görevinde hazırlık süresi (prepSeconds) yok");
      const solo = task.goal === "production";
      if (solo && !task.speakSeconds) fail(where, "tek kişilik konuşma görevinde konuşma süresi (speakSeconds) yok");
      if (!solo && !task.exchange?.length) {
        fail(where, "karşılıklı konuşma görevinde adım dizisi (exchange) yok");
      }
      for (const [ix, turn] of (task.exchange ?? []).entries()) {
        const w = `${where} · adım ${ix + 1}`;
        if (turn.who === "partner") {
          if (!turn.de.trim() || !turn.tr.trim()) fail(w, "karşı tarafın repliğinde eksik dil");
        } else {
          if (!turn.hint.trim()) fail(w, "konuşma adımında yönlendirme (hint) yok");
          if (!turn.expect.trim()) fail(w, "konuşma adımında beklenen işlev (expect) yok");
          // 15 saniyenin altı cümle kurmaya yetmez, 120'nin üstü tek adım
          // olmaktan çıkar — ikisi de görevin biçimini bozar.
          if (turn.seconds < 15 || turn.seconds > 120) fail(w, `konuşma süresi ${turn.seconds} sn (15–120 arası olmalı)`);
        }
      }
      const mine = (task.exchange ?? []).filter((x) => x.who === "you").length;
      if (task.exchange?.length && mine < 2) fail(where, `karşılıklı görevde kendi adımın ${mine} (en az 2)`);
      // Karşılıklı görev karşı tarafın repliğiyle başlamalı: konuşmayı açan
      // sınavda hep sınav görevlisidir.
      if (task.exchange?.length && task.exchange[0].who !== "partner") {
        fail(where, "karşılıklı görev karşı tarafın repliğiyle başlamalı");
      }
    }
    if (task.format === "writing" && (task.prepSeconds || task.speakSeconds || task.exchange)) {
      fail(where, "hazırlık/konuşma alanları yalnız konuşma görevinde olur");
    }
    return;
  }
  if (task.rubric) fail(where, "ölçüt yalnız yazma/konuşma görevinde olur");
  if (task.prepSeconds || task.speakSeconds || task.exchange) {
    fail(where, "hazırlık/konuşma alanları yalnız konuşma görevinde olur");
  }

  if (!task.items.length) { fail(where, "görevde madde yok"); return; }

  // Cevap anahtarı dağılımı — tek harfe yığılma ve arka arkaya tekrar.
  const mcq = task.items.filter((i) => i.kind === "mcq");
  if (mcq.length >= 4) {
    const counts = new Map<number, number>();
    for (const i of mcq) counts.set(i.answer, (counts.get(i.answer) ?? 0) + 1);
    const worst = Math.max(...counts.values());
    if (worst / mcq.length > 0.6) {
      warn(where, `doğru şıkların %${Math.round((100 * worst) / mcq.length)}'i aynı konumda (${mcq.length} madde)`);
    }
    // Doğru şık sistematik olarak en uzunuysa öğrenci metni okumadan bulur.
    const longest = mcq.filter((i) => {
      const lens = i.options.map((o) => o.length);
      return lens[i.answer] === Math.max(...lens) && new Set(lens).size > 1;
    }).length;
    if (longest / mcq.length > 0.7) warn(where, `maddelerin %${Math.round((100 * longest) / mcq.length)}'inde doğru şık en uzun şık — ipucu veriyor`);
  }

  const bools = task.items.filter((i) => i.kind === "bool");
  if (bools.length >= 4) {
    const yes = bools.filter((i) => i.answer).length;
    if (yes === 0 || yes === bools.length) fail(where, "doğru/yanlış maddelerinin hepsi aynı cevaba sahip");
    if (Math.abs(yes / bools.length - 0.5) > 0.3) {
      warn(where, `doğru/yanlış dengesi ${yes}/${bools.length - yes} — 50/50'ye yakın olmalı`);
    }
  }

  // Aynı cevap arka arkaya dörtten fazla gelmesin. Yazılı boşluklarda "aynı
  // cevap" diye bir şey yok (her boşluğun kendi kabul listesi var), bu yüzden
  // yalnız şıklı ve doğru/yanlış maddeleri sayılıyor.
  const keyed = task.items.filter((i) => i.kind === "mcq" || i.kind === "bool" || i.kind === "match");
  let run = 1;
  for (let i = 1; i < keyed.length; i++) {
    const a = keyed[i], b = keyed[i - 1];
    const same = a.kind === b.kind && JSON.stringify((a as { answer: unknown }).answer) === JSON.stringify((b as { answer: unknown }).answer);
    run = same ? run + 1 : 1;
    if (run > 3) { warn(where, `${a.no}. maddede aynı cevap arka arkaya ${run} kez`); break; }
  }

  for (const item of task.items) checkItem(`${where} · madde ${item.no}`, item, task);

  // Metin uzunluğu ve seviye elemesi.
  for (const t of task.texts ?? []) {
    const body = t.kind === "text" ? t.body : t.segments.map((s) => s.text).join(" ");
    const maxSentence = MAX_SENTENCE[course][level];
    const long = sentences(body).find((s) => words(s) > maxSentence);
    if (long) warn(`${where} · ${t.id}`, `cümle ${words(long)} kelime (${level} sınırı ${maxSentence}): "${long.slice(0, 70)}…"`);
    const over = OVER_LEVEL[course][level]?.exec(body);
    if (over) warn(`${where} · ${t.id}`, `${level} üstü yapı: "${over[0]}"`);
    for (const g of t.gloss ?? []) if (!g.de.trim() || !g.tr.trim()) fail(`${where} · ${t.id}`, "sözlükçe maddesinde eksik dil");
  }
}

/* ── bölüm ve kâğıt ─────────────────────────────────────────────────────── */

function checkPart(where: string, part: MockPart, level: MockLevel, course: MockCourse, plan: PartPlan) {
  if (part.minutes !== plan.minutes) fail(where, `süre ${part.minutes} dk, plan ${plan.minutes} dk`);

  // Görev süreleri bölümün süresini tam doldurmalı: dijital oturumda saat
  // görev başına işliyor ve toplam kâğıtta yazan süreyle çelişemez.
  const secs = taskSeconds(part);
  if (secs.length !== part.tasks.length) fail(where, "görev süresi dizisi görev sayısıyla uyuşmuyor");
  const sum = secs.reduce((a, x) => a + x, 0);
  if (sum !== part.minutes * 60) fail(where, `görev sürelerinin toplamı ${sum} sn, bölüm ${part.minutes * 60} sn`);
  if (secs.some((x) => x < 60)) fail(where, "bir görevin süresi bir dakikadan az");
  if (!part.instruction.trim() || !part.instructionTr.trim()) fail(where, "bölüm yönergesi eksik");
  if (part.tasks.length !== plan.tasks.length) {
    fail(where, `görev sayısı ${part.tasks.length}, plan ${plan.tasks.length}`);
  }
  part.tasks.forEach((task, ix) => {
    const need = plan.tasks[ix];
    if (need !== undefined && task.items.length !== need) {
      fail(`${where} · Teil ${task.no}`, `madde sayısı ${task.items.length}, plan ${need}`);
    }
    if (task.no !== ix + 1) fail(`${where} · Teil ${task.no}`, `görev numarası ${task.no}, sırası ${ix + 1}`);
    checkTask(`${where} · Teil ${task.no}`, task, level, course);
  });

  // Madde numaraları bölüm boyunca 1..N kesintisiz.
  const nos = part.tasks.flatMap((t) => t.items.map((i) => i.no));
  const expect = Array.from({ length: nos.length }, (_, i) => i + 1);
  if (JSON.stringify(nos) !== JSON.stringify(expect)) {
    fail(where, `madde numaraları 1..${nos.length} kesintisiz değil: ${nos.join(",")}`);
  }
}

function checkPaper(paper: MockPaper) {
  const w = paper.id;
  if (!/^(de|en)-[a-c][12]-\d{2}$/.test(paper.id)) fail(w, "kimlik biçimi \"de-a1-01\" ya da \"en-a1-01\" olmalı");
  if (!paper.id.startsWith(`${paper.course}-${paper.level.toLowerCase()}-`)) fail(w, "kimlik seviye/kurs ile uyuşmuyor");
  if (!paper.theme.trim() || !paper.themeTr.trim()) fail(w, "kâğıdın teması eksik");

  const plan = PLAN[paper.course][paper.level];
  if (paper.parts.length !== plan.length) fail(w, `bölüm sayısı ${paper.parts.length}, plan ${plan.length}`);
  const order = paper.parts.map((p) => p.skill);
  if (JSON.stringify(order) !== JSON.stringify(MOCK_SKILL_ORDER)) fail(w, `bölüm sırası ${order.join(",")} (Lesen, Hören, Schreiben, Sprechen olmalı)`);

  const total = paper.parts.reduce((a, p) => a + p.minutes, 0);
  if (paper.minutes !== total) fail(w, `toplam süre ${paper.minutes} dk, bölümlerin toplamı ${total} dk`);

  paper.parts.forEach((part, ix) => {
    const pp = plan.find((p) => p.skill === part.skill) ?? plan[ix];
    checkPart(`${w} · ${part.skill}`, part, paper.level, paper.course, pp);
  });

  // Marka taraması — kâğıdın her dizesi.
  for (const [path, s] of strings(paper, "")) {
    const hit = BRAND_RE.exec(s);
    if (hit) fail(`${w} · ${path}`, `marka/kurum adı geçiyor: "${hit[2]}"`);
  }
}

/* ── çalıştır ───────────────────────────────────────────────────────────── */

const ids = new Set<string>();
const itemIds = new Set<string>();
const bodies = new Map<string, string>();

for (const paper of MOCK_PAPERS) {
  if (ids.has(paper.id)) fail(paper.id, "kâğıt kimliği tekrar ediyor");
  ids.add(paper.id);
  checkPaper(paper);
  for (const part of paper.parts) {
    for (const task of part.tasks) {
      for (const item of task.items) {
        if (itemIds.has(item.id)) fail(paper.id, `madde kimliği tekrar ediyor: ${item.id}`);
        itemIds.add(item.id);
      }
      for (const t of task.texts ?? []) {
        const body = (t.kind === "text" ? t.body : t.segments.map((s) => s.text).join(" ")).trim();
        const seen = bodies.get(body);
        if (seen) warn(paper.id, `metin başka kâğıtta aynen var (${seen})`);
        else bodies.set(body, `${paper.id}/${task.id}/${t.id}`);
      }
    }
  }
}

/*
  Deneme numaralarının tekilliği KURS İÇİNDE aranıyor.

  `no` alanı "bu seviyenin kaçıncı denemesi" demek ve ekranda kursun kendi
  listesinde görünüyor: İngilizce A1'in birinci denemesi ile Almanca A1'in
  birinci denemesi ayrı listelerde duruyor, çakışmıyorlar. Denetim seviyeye
  göre yapıldığında ikinci kurs eklenir eklenmez her seviye hata veriyordu.
*/
for (const course of ["de", "en"] as MockCourse[]) {
  for (const level of ["A1", "A2", "B1", "B2", "C1"] as MockLevel[]) {
    const ps = MOCK_PAPERS.filter((p) => p.course === course && p.level === level);
    if (!ps.length) continue;
    const nos = ps.map((p) => p.no).sort((a, b) => a - b);
    if (new Set(nos).size !== nos.length) fail(`${course}/${level}`, `deneme numarası tekrar ediyor: ${nos.join(",")}`);
    if (nos[0] !== 1) warn(`${course}/${level}`, `numaralar 1'den başlamıyor: ${nos.join(",")}`);
  }
}

const rows = MOCK_PAPERS.map((p) => {
  const pts = p.parts.map((x) => `${x.skill[0].toUpperCase()}${partPoints(x)}`).join(" ");
  return `  ${p.id}  ${p.level.padEnd(3)} ${String(p.minutes).padStart(3)} dk  ${pts}  ${p.theme}`;
});
console.log(`Deneme sınavı: ${MOCK_PAPERS.length} kâğıt, ${itemIds.size} nesnel madde`);
console.log(rows.join("\n"));
console.log(errors ? `\n${errors} hata, ${warnings} uyarı` : `\n0 hata, ${warnings} uyarı`);
process.exit(errors ? 1 : 0);
