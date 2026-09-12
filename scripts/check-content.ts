/**
 * İçerik doğrulayıcı — `npm run test:content` (WP-70)
 *
 *   npm run test:content                 # hepsi
 *   npm run test:content -- lessons      # tek tür: skills | lessons | cheatsheet
 *   npm run test:content -- --baseline   # uyarı sayısını baseline'a yaz
 *
 * Kurallar `data/content/SPEC.md`'de; burası onların kodu. İki liste:
 *   HATA   — yapıyı bozan (eksik alan, aralık dışı indeks, kopuk `next`,
 *            yinelenen kimlik). Bir tane bile varsa çıkış 1.
 *   UYARI  — kalite (havuz dışı kelime, çok anlamlı karşılık, uzun metin,
 *            `en` eksik). Etiket başına sayılır; `data/content/baseline.json`
 *            etiket başına tavan tutar — aşan ya da yeni kategori hata:
 *            mevcut borç bilinir, yeni borç alınmaz.
 *
 * Veritabanı yok: içerik koddan (`bundled`, `LESSONS`, `CHEATSHEETS`),
 * kelime havuzu `data/app/words.json`'dan.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { LESSONS } from "../src/lib/lessons";
import { moduleExamPlan } from "../src/lib/lessons/module-exam";
import { LESSON_ICONS } from "../src/lib/lessons/types";
import type { DialogueTurn } from "../src/lib/dialogue";
import type { Lesson } from "../src/lib/lessons/types";
import type { SkillExercise } from "../src/lib/skills/types";
import { isCandoId } from "../src/lib/cando";
import { candoForExercise, candoForLesson } from "../src/lib/cando-map";
// contains.mjs: kelimenin metinde çekimli hâliyle geçip geçmediği (kelime hattıyla ortak).
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — .mjs, tip bildirimi yok
import { contains } from "../data/meanings/contains.mjs";

const ROOT = path.resolve(__dirname, "..");
const BASELINE = path.join(ROOT, "data/content/baseline.json");
const args = process.argv.slice(2);
const only = args.find((a) => !a.startsWith("--"));
const writeBaseline = args.includes("--baseline");

const LEVELS = new Set(["A1", "A2", "B1", "B2", "C1"]);
const TR_LETTER = /[ıİğĞşŞ]/;
/** Türkçe olduğunun ikinci işareti — Almancada karşılığı olmayan sözcük ve ekler. */
const TR_HINT = /[ıİğĞşŞçÇ]|\b(ve|bir|bu|şu|için|ile|ne|nasıl|hangi|yaz|anlat|kur|seç)\b|\w+(yor|mek|mak|leri|ları)\b/i;
/**
 * Almanca metinde Türkçe harf var mı — ÖZEL ADLAR HARİÇ. Metinlerde Türk
 * karakterler var ("Frau Yıldız", "Herr Aydın") ve bu bilinçli: öğrenci
 * kendini metinde görüyor. Büyük harfle başlayan kelimeler (özel ad ya da
 * Almanca isim) sınavdan çıkarılıyor; kalanında Türkçe harf hata.
 */
const trLetters = (text: string) => TR_LETTER.test(text.replace(/(^|[\s„"(])[A-ZÄÖÜİ][^\s.,;:!?„"()]*/g, "$1"));
const READING_WORDS: Record<string, [number, number]> = { A1: [60, 120], A2: [100, 180], B1: [150, 260], B2: [200, 350], C1: [250, 450] };

const errors: string[] = [];
const warnings: string[] = [];
const E = (where: string, msg: string) => errors.push(`${where} — ${msg}`);
const W = (where: string, msg: string) => warnings.push(`${where} — ${msg}`);

/*
  KELİME HAVUZU KURS BAŞINA.

  Havuz denetimi yalnız Almanca havuzu tanıyordu ve İngilizce dersler
  `l.course === "de"` koşuluyla tamamen ATLANIYORDU - yani İngilizce bir ders
  kursun kelime havuzunda hiç olmayan kelimeler öğretebilirdi ve hiçbir kapı
  bunu söylemezdi. İngilizce havuz `data/app/words-en.json` olarak zaten var
  (JSONL, 7175 kelime, `de` alanı hedef kelimeyi taşıyor - şema ortak).

  Artikel soyma da kursa bağlı: Almancada der/die/das, İngilizcede the/a/an.
*/
const readPool = (file: string, jsonl: boolean): string[] => {
  const raw = readFileSync(path.join(ROOT, file), "utf8");
  const rows: { de: string }[] = jsonl
    ? raw.split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l) as { de: string })
    : (JSON.parse(raw) as { de: string }[]);
  return rows.map((w) => w.de);
};
const POOLS: Record<string, { set: Set<string>; locale: string; article: RegExp }> = {
  de: {
    set: new Set(readPool("data/app/words.json", false).map((w) => w.toLocaleLowerCase("de-DE"))),
    locale: "de-DE",
    article: /^(der|die|das|de|d|s|en|e)\s+/i,
  },
  en: {
    set: new Set(readPool("data/app/words-en.json", true).map((w) => w.toLocaleLowerCase("en-US"))),
    locale: "en-US",
    article: /^(the|a|an)\s+/i,
  },
};
const inPool = (de: string, course = "de") => {
  const p = POOLS[course] ?? POOLS.de;
  const bare = de.replace(p.article, "").replace(/\s*\(.*\)\s*/g, "").replace(/…|\.\.\./g, "").trim();
  if (!bare || /\s/.test(bare)) return true; // kalıp/çok kelimeli: havuz karşılaştırması anlamsız
  return p.set.has(bare.toLocaleLowerCase(p.locale));
};
/*
  ÇEKİMLİ SÖZLÜKÇE: HAVUZ DENETİMİNİN GERÇEK YANLIŞ POZİTİFİ.

  Havuz sözlük biçimlerini (mastar, yalın ad) tutuyor. Geçmiş biçim öğreten
  dersler ise sözlükçesine BİLEREK çekimli biçimi yazıyor — öğrettiği şey o:
  `gemacht`, `gegangen`, `aufgestanden`, `worked`. Havuzda mastarı var,
  çekimlisi yok ve olması da gerekmiyor: oyun kartına `machen` ile `gemacht`
  ayrı iki kelime diye girmek havuzu bozardı.

  Ölçüldü: eşiği aşan beş ders de bu sınıftan ve hepsinin dışarıda kalan
  kelimesi bir çekim. Liste ders KİMLİĞİNE bağlı, odağa değil — aynı odaktaki
  öteki dersler (de-a1-perfekt-uebung gibi) sözlükçesini mastarla kuruyor ve
  denetimden geçiyor; onları da muaf tutmak kapıyı gereksiz kör ederdi.

  Liste bayatlamasın diye kendini denetliyor: muaf bir ders artık eşiği
  aşmıyorsa satır fazlalıktır ve uyarı verir.
*/
const INFLECTED_VOCAB = new Set([
  "de-a1-perfekt-haben",
  "de-a1-perfekt-sein",
  "de-a1-gestern",
  "de-a1-wochenende-bericht",
  "en-a1-past-ed",
]);
const usedInflectedExempt = new Set<string>();

const wc = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const multi = (s: string) => /,/.test(s) && !/[…/]/.test(s);
const need = (where: string, obj: Record<string, unknown>, keys: string[]) => {
  for (const k of keys) {
    const v = obj[k];
    if (v === undefined || v === null || (typeof v === "string" && !v.trim()) || (Array.isArray(v) && !v.length)) E(where, `zorunlu alan boş: ${k}`);
  }
};

/* ───────────── senaryo / diyalog turları (ortak) ───────────── */
function checkTurns(where: string, turns: DialogueTurn[], opts: { minTurns?: number; opening?: string } = {}) {
  const ids = new Set<string>();
  for (const t of turns) {
    if (ids.has(t.id)) E(where, `yinelenen tur kimliği ${t.id}`);
    ids.add(t.id);
  }
  turns.forEach((t, i) => {
    const w = `${where} tur ${t.id}`;
    need(w, t as unknown as Record<string, unknown>, ["ask", "askTr", "cue", "replies", "fallback"]);
    if (trLetters(t.ask)) E(w, `ask içinde Türkçe harf: "${t.ask}"`);
    if (!t.fallback?.example?.trim()) E(w, "fallback.example boş");
    if (!t.fallback?.say?.trim() || !t.fallback?.sayTr?.trim()) E(w, "fallback.say/sayTr boş");
    for (const r of t.replies ?? []) {
      if (!r.match?.length) E(w, "reply.match boş");
      if (r.match?.length === 1) W(w, `tek köklü dal: ${r.match[0]}`);
      if (!r.say?.trim()) E(w, "reply.say boş");
      if (r.next && !ids.has(r.next)) E(w, `kopuk next: ${r.next}`);
    }
    if (i === 0 && opts.opening !== undefined && t.ask !== opts.opening) E(w, "ilk turun ask'i açılış repliğiyle aynı değil");
  });
  if (opts.minTurns !== undefined && turns.length < opts.minTurns) E(where, `senaryo ${turns.length} tur, minTurns ${opts.minTurns}`);
}

/* ───────────── beceri egzersizleri ───────────── */
/**
 * Tür etiketleri KAPALI bir sözlükten gelir.
 *
 * `genre` eskiden serbest Türkçe metindi ve doğrudan ekrana basılıyordu: 984
 * egzersizde 384 ayrı değer birikmişti ve İngilizce/Almanca arayüzde hepsi
 * Türkçe görünüyordu. Değerler 2026-09-09'da bu 26 anahtara indirildi ve
 * anahtarlar `genre.*` çeviri anahtarlarıyla eşleşiyor.
 *
 * Kapı burada çünkü tek koruma bu: yeni bir egzersiz serbest metin yazarsa
 * `t("genre.Diyalog")` çeviriyi bulamaz ve ekrana ANAHTARIN KENDİSİ basılır —
 * çirkin ama sessiz. Liste değişecekse üç sözlüğe de `genre.<yeni>` eklenmeli.
 */
const GENRES = new Set([
  "ad", "article", "blog", "build", "dialogue", "email", "essay", "formal", "forum",
  "grammar", "guide", "info", "interview", "letter", "meeting", "message", "monologue",
  "opinion", "personal", "phone", "profile", "pronounce", "report", "review", "story", "text",
]);

function checkSkills(list: SkillExercise[]) {
  /* Patika kartı başlığı gösteriyor. Aynı seviyede AYRI ÜNİTELERDE aynı
     başlık iki kart üretir ve öğrenci hangisini açtığını ayırt edemez.
     Aynı ünite içinde yineleme kural DIŞI: yazma egzersizi bilerek okuma
     ya da dinlemenin başlığını taşıyor, çünkü onu çalıştırıyor. */
  const baslik = new Map<string, Set<number>>();
  for (const e of list) {
    if (e.unit == null) continue;
    const k = `${e.course ?? "de"} ${e.level} ${e.title}`;
    const u = baslik.get(k) ?? new Set<number>();
    u.add(e.unit); baslik.set(k, u);
  }
  for (const [k, u] of baslik)
    if (u.size > 1) E("[skills]", `başlık iki ünitede birden: "${k}" → ünite ${[...u].sort((a, b) => a - b).join(", ")}`);

  const ids = new Set<string>();
  for (const e of list) {
    const w = `[skills] ${e.id}`;
    if (ids.has(e.id)) E(w, "yinelenen kimlik");
    ids.add(e.id);
    need(w, e as unknown as Record<string, unknown>, ["id", "level", "title", "genre", "intro", "minutes"]);
    if (!LEVELS.has(e.level)) E(w, `geçersiz seviye ${e.level}`);
    if (e.genre && !GENRES.has(e.genre)) E(w, `bilinmeyen tür etiketi "${e.genre}" — kapalı liste: ${[...GENRES].join(", ")}`);
    if (e.minutes < 1 || e.minutes > 20) W(w, `minutes ${e.minutes} aralık dışı (1–20)`);
    for (const id of e.cando ?? []) if (!isCandoId(id)) E(w, `bilinmeyen can-do kimliği ${id}`);
    if (!candoForExercise(e).length) E(w, "can-do etiketi üretilemedi");
    // ö ve ü Türkçede de var: "söylemeyi", "sürüyor". Yalnız ı/ğ/ş aramak,
    // bu harfleri taşımayan tamamen Türkçe cümleleri Almanca sanıyordu.
    // İkinci bir işaret gerekiyor: Türkçe işlev sözcüğü ya da -yor/-mek eki
    // (hiçbiri Almancada geçmez).
    if (!TR_HINT.test(e.intro) && /[ßÄÖÜäöü]/.test(e.intro) && !/„|"/.test(e.intro)) W(w, "intro Türkçe olmalı; Almanca harf var");

    // İngilizce kursta hedef dil zaten İngilizce: `en` alanı ayırt edici değil,
    // gereksiz; aranmaz. Sözlükçe kapsaması da Almanca morfolojisiyle değil
    // düz küçük harf aramasıyla yapılır (İngilizce çekim ekleri kısa: -s, -ed, -ing).
    const english = e.course === "en";
    const text =
      e.skill === "reading"
        ? e.text
        : e.skill === "listening"
          ? e.segments.map((s) => s.text).join(" ")
          : e.skill === "grammar"
            ? [...e.explanation.flatMap((b) => (b.examples ?? []).map((x) => x.de)), ...e.questions.flatMap((q) => [q.text, ...(q.options ?? []), ...(q.accept ?? []), ...(q.items ?? [])])].join(" ")
            : "";
    /* İNGİLİZCE EŞLEŞTİRME ÇEKİME DUYARLI OLMAK ZORUNDA.
       Sözlükçe SÖZLÜK biçimini verir ("get married"), metin çekimli
       biçimi kullanır ("are getting married") — ikisi de doğru. Eski
       ölçüt düz alt-dize arıyordu ve "İngilizce çekim ekleri kısa"
       varsayımına dayanıyordu; ek kısa ama GÖVDE değişiyor:
       close→closing (e düşer), busy→busiest (y→i), get→getting (ünsüz
       ikizleşir). Ölçüldü: 10 uyarının yedisi bu yüzden çıkıyordu.

       Yeni ölçüt sözcük sözcük desen kuruyor ve BİTİŞİKLİĞİ koruyor:
       "book a taxi" → /\bbook\w*\s+a\s+taxi\w*\b/ → "booked a taxi"
       eşleşir, ama "How much is it?" sözcükleri metne dağılmışsa
       eşleşmez. Sondaki `e` seçimli, sondaki `y` [yi] olur.
       Düzensiz fiil (grow→grew) hâlâ eşleşmez ve eşleşmemeli: orada
       sözlükçe metnin kullandığı biçimi vermelidir. */
    const enStem = (w: string) =>
      w.replace(/[^\w'’-]/g, "").replace(/e$/, "e?").replace(/y$/, "[yi]") + "\\w*";
    const inText = (word: string) => {
      if (!english) return contains(text, word);
      const parts = word.toLowerCase().replace(/^(to|the|a|an) /, "").split(/\s+/).filter(Boolean);
      if (!parts.length) return true;
      return new RegExp("\\b" + parts.map(enStem).join("\\s+"), "i").test(text);
    };
    /* Aynı sözlükçede aynı sözcük iki kez: öğrenciye iki özdeş satır
       gösteriliyor ve liste daha uzun görünüyor. 2026-09-12'de iki
       egzersizde bulundu (her kursta bir tane), ikisi de birebir kopya. */
    const gorulen = new Set<string>();
    for (const g of e.gloss ?? []) {
      if (g.de && gorulen.has(g.de)) E(w, `sözlükçede yinelenen madde: "${g.de}"`);
      if (g.de) gorulen.add(g.de);
    }
    for (const g of e.gloss ?? []) {
      if (!g.de?.trim() || !g.tr?.trim()) E(w, `gloss eksik: ${JSON.stringify(g)}`);
      if (multi(g.tr)) W(w, `çok anlamlı tr: ${g.de} → "${g.tr}"`);
      if (!g.en && !english) W(w, `en yok: ${g.de}`);
      if (g.en && TR_LETTER.test(g.en)) E(w, `en alanında Türkçe harf: ${g.de} → "${g.en}"`);
      if (/[()[\]]/.test(g.tr)) W(w, `parantezli tr: ${g.de} → "${g.tr}"`);
      if (text && !/[…/,]/.test(g.de) && !inText(g.de)) W(w, `sözlükçe kelimesi metinde yok: "${g.de}"`);
    }

    if (e.skill === "reading") {
      const n = wc(e.text);
      const [lo, hi] = READING_WORDS[e.level] ?? [0, Infinity];
      if (n < lo * 0.6 || n > hi * 1.4) W(w, `okuma metni ${n} kelime; ${e.level} için ${lo}–${hi}`);
      if (trLetters(e.text)) E(w, "okuma metninde Türkçe harf");
    }
    if (e.skill === "listening") {
      /* „monologue“ tek sesli demek. Etiket ekranda türü söylüyor ve üç
         kişilik bir seminer tartışmasına monolog demek okuru yanıltıyor;
         2026-09-12'de iki egzersizde bulundu (biri her kursta bir tane).
         „dialogue“ için karşılık gelen kural YOK: Almanca kursun 96
         diyaloğu `speaker` alanını hiç yazmıyor, hepsi tek küme olurdu. */
      const sesler = new Set(e.segments.map((s) => s.speaker).filter(Boolean));
      if (e.genre === "monologue" && sesler.size > 1)
        E(w, `monologue ama ${sesler.size} konuşmacı: ${[...sesler].join(", ")}`);
      for (const s of e.segments) {
        if (wc(s.text) > 40) W(w, `dinleme bölümü ${wc(s.text)} kelime (> 40): "${s.text.slice(0, 40)}…"`);
        if (trLetters(s.text)) E(w, `dinleme bölümünde Türkçe harf: "${s.text.slice(0, 40)}"`);
      }
    }
    if (e.skill === "grammar") {
      // Kütüphane dil bilgisi egzersizi (2026-09): önce anlatım, sonra soru.
      if (!e.focus?.trim()) E(w, "grammar: focus boş");
      if (!e.explanation?.length || e.explanation.length > 5) E(w, `grammar: ${e.explanation?.length ?? 0} anlatım bloğu (1–5)`);
      let ornek = 0;
      for (const b of e.explanation ?? []) {
        if (!b.tr?.trim()) E(w, "grammar: anlatım bloğunun tr'si boş");
        if (!TR_HINT.test(b.tr) && /[ßÄÖÜäöü]/.test(b.tr) && !/„|"/.test(b.tr)) W(w, "grammar: anlatım Türkçe olmalı");
        for (const x of b.examples ?? []) {
          ornek++;
          if (!x.de?.trim() || !x.tr?.trim()) E(w, `grammar: örnek eksik ${JSON.stringify(x)}`);
          if (x.de && trLetters(x.de)) E(w, `grammar: örnekte Türkçe harf "${x.de}"`);
        }
      }
      if (ornek < 3) W(w, `grammar: ${ornek} örnek (< 3)`);
      if (e.questions.length < 6 || e.questions.length > 12) W(w, `grammar: ${e.questions.length} soru (6–12)`);
      if (e.unit != null) E(w, "grammar: kütüphane egzersizinde unit olmamalı");
    }
    if (e.skill === "reading" || e.skill === "listening" || e.skill === "grammar") {
      if (e.questions.length < 3) W(w, `${e.questions.length} soru (< 3)`);
      e.questions.forEach((q, i) => {
        const qw = `${w} soru ${i + 1}`;
        const kind = q.kind ?? "mcq";
        if (!q.text?.trim()) E(qw, "soru metni boş");
        // Yazılı türler (WP-31): şık yerine kabul listesi; sıralama: maddeler.
        if (kind === "gapfill" || kind === "short_answer" || kind === "dictation" || kind === "produce") {
          if (!q.accept?.length) E(qw, `${kind}: accept boş`);
          for (const a of q.accept ?? []) if (trLetters(a)) E(qw, `${kind}: accept içinde Türkçe harf "${a}"`);
          /* Kabul listesinde UZUN bir karşılık kusur değil, HOŞGÖRÜDÜR.
             Oynatıcı `accept.some(...)` ile eşleştiriyor (quiz.tsx
             `written`), yani uzun bir seçenek kimseyi zorlamıyor, yalnız
             daha çok cevabı kabul ediyor. Öğrenciyi gerçekten zorlayan
             tek şey GÖSTERİLEN cevabın uzun olması: `accept[0]` hem model
             cevap olarak basılıyor hem de seslendiriliyor.

             ÖLÇÜLDÜ (2026-09-11): 567 short_answer sorusunun 108'i eski
             ölçütle uyarı veriyordu; hiçbirinde ne gösterilen cevap
             (accept[0]) ne de en kısa kabul 5 kelimeyi aşıyor. Yani
             108'inin hepsi yanlış alarmdı ve "düzeltmek" uzun seçeneği
             silmek, yani soruyu öğrenci aleyhine SIKILAŞTIRMAK olurdu. */
          if (kind === "short_answer" && wc(q.accept?.[0] ?? "") > 5)
            W(qw, "short_answer: gösterilen cevap > 5 kelime");
          if (kind === "gapfill" && !/___/.test(q.text)) W(qw, "gapfill: soruda ___ boşluğu yok");
          if (kind === "dictation" && e.skill === "listening" && !e.segments.some((s) => s.text.includes(q.accept![0]))) W(qw, "dictation: cümle bölümlerde geçmiyor");
        } else if (kind === "order") {
          if (!q.items || q.items.length < 3 || q.items.length > 6) E(qw, `order: ${q.items?.length ?? 0} madde (3–6)`);
          /* Soru kökü bir SAYI veriyorsa madde sayısıyla tutmak zorunda.
             "Üç satırın sırası" yazıp dört madde göstermek öğrenciye yanlış
             söylüyor ve hiçbir şema kuralı bunu görmüyordu; 2026-09-12'de
             41 soruda bulundu. Türkçe sözcük sınırı ASCII `\b` ile
             çalışmıyor (ü, ı, ş sözcük karakteri sayılmaz), o yüzden
             harf-dışı ayırıcıyla bölünüyor. */
          const SAYI: Record<string, number> = { bir: 1, iki: 2, üç: 3, dört: 4, beş: 5, altı: 6 };
          const kok = q.text.toLocaleLowerCase("tr").split(/[^\p{L}]+/u).find((w) => SAYI[w] != null);
          if (kok && q.items && SAYI[kok] !== q.items.length)
            E(qw, `order kökü "${kok}" diyor, ${q.items.length} madde var`);
        } else {
          if (!q.options || q.options.length < 2 || q.options.length > 4) E(qw, `şık sayısı ${q.options?.length ?? 0}`);
          if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0)) E(qw, `answer indeksi aralık dışı: ${q.answer}`);
          if (new Set(q.options).size !== q.options?.length) E(qw, "yinelenen şık");
        }
        if (!q.explain?.trim()) E(qw, "explain (neden) boş");
        else if (q.explain.length > 260) W(qw, `explain ${q.explain.length} karakter (> 260)`);
        if (wc(q.text) > 30) W(qw, `soru ${wc(q.text)} kelime (> 30)`);
      });
      // WP-31 kabul ölçütü: üretim/gapfill soruları — henüz pilot; eksikse uyarı.
      const written = e.questions.filter((q) => ["gapfill", "short_answer", "dictation", "order", "produce"].includes(q.kind ?? "mcq")).length;
      if (written < 2) W(w, `çoktan seçmeli olmayan soru ${written} (< 2)`);
    }
    // Kütüphane kimliği: kurs-seviye-lib-becerin. Yanlış önek Patika'ya ya da
    // eski Beceriler kimliklerine karışırdı; kimlik kalıcı olduğu için baştan doğru.
    if (e.id.includes("-lib-")) {
      const m = /^(de|en|gsw-zh)-([abc][12])-lib-([rlwsg])\d+$/.exec(e.id);
      if (!m) E(w, "kütüphane kimliği biçimi: <kurs>-<seviye>-lib-<r|l|w|s|g><n>");
      else {
        if (m[2].toUpperCase() !== e.level) E(w, `kütüphane kimliği seviyesi (${m[2]}) egzersiz seviyesiyle (${e.level}) uyuşmuyor`);
        if ((e.course ?? "de") !== m[1]) E(w, `kütüphane kimliği kursu (${m[1]}) egzersiz kursuyla (${e.course ?? "de"}) uyuşmuyor`);
        const harf: Record<string, string> = { reading: "r", listening: "l", writing: "w", speaking: "s", grammar: "g" };
        if (harf[e.skill] !== m[3]) E(w, `kütüphane kimliği beceri harfi (${m[3]}) ${e.skill} ile uyuşmuyor`);
      }
      if (e.unit != null) E(w, "kütüphane egzersizinde unit olmamalı (Patika'ya sızar)");
    }
    if (e.skill === "writing") {
      if (!e.tasks.length) E(w, "yazma görevi yok");
      e.tasks.forEach((t, i) => {
        const tw = `${w} görev ${i + 1}`;
        if (t.kind === "sentence") {
          if (!t.words || t.words.length < 2 || t.words.length > 3) E(tw, `sentence: ${t.words?.length ?? 0} kelime (2–3)`);
          for (const g of t.words ?? []) if (!g.de?.trim() || !g.tr?.trim()) E(tw, `sentence: kelime eksik ${JSON.stringify(g)}`);
        } else if (t.kind === "build") {
          if (!t.tr?.trim() || !t.answer?.trim()) E(tw, "build: tr/answer boş");
          if (trLetters(t.answer)) E(tw, "build: answer içinde Türkçe harf");
          /* Oynatıcı ipucunu YALNIZ yanlış bir denemeden sonra gösteriyor
             (writing-player.tsx: `fails > 0 && task.hint`). İpucusuz bir
             görev, yanılan öğrenciye hiçbir şey vermiyor. 2026-09-12'de
             1 681 görevin hepsinde ipucu vardı; bu kapı onu kilitliyor. */
          if (!t.hint?.trim()) E(tw, "build: ipucu yok (yanlış denemeden sonra gösterilecek yardım)");
        } else if (t.kind === "form") {
          if (!t.prompt?.trim() || !t.facts?.trim()) E(tw, "form: prompt/facts boş");
          if (!t.fields || t.fields.length < 3 || t.fields.length > 8) E(tw, `form: ${t.fields?.length ?? 0} alan (3–8)`);
          for (const f of t.fields ?? []) if (!f.label?.trim() || !f.answer?.trim()) E(tw, `form: alan eksik ${JSON.stringify(f)}`);
        } else if (t.kind === "rewrite") {
          if (!t.prompt?.trim() || !t.source?.trim() || !t.answer?.trim()) E(tw, "rewrite: prompt/source/answer boş");
          if (trLetters(t.answer)) E(tw, "rewrite: answer içinde Türkçe harf");
          if (t.source.trim() === t.answer.trim()) E(tw, "rewrite: source ile answer aynı");
          if (!t.why?.trim()) E(tw, "rewrite: why yok (düzeltmenin gerekçesi)");
        } else if (t.kind === "summary") {
          if (!t.prompt?.trim() || !t.source?.trim() || !t.sample?.trim()) E(tw, "summary: prompt/source/sample boş");
          if (t.maxSentences < 1 || t.maxSentences > 4) W(tw, `summary: maxSentences ${t.maxSentences}`);
          if (e.level === "A1" || e.level === "A2") W(tw, "summary görevi B1+ için");
        } else if (t.kind === "reply") {
          if (!t.prompt?.trim() || !t.stimulus?.trim()) E(tw, "reply: prompt/stimulus boş");
          if ((t.checklist?.length ?? 0) < 2) W(tw, "reply: checklist < 2");
          if (t.minWords < 15 || t.minWords > 200) W(tw, `reply: minWords ${t.minWords}`);
        } else {
          if (!t.prompt?.trim()) E(tw, "free: prompt boş");
          if ((t.checklist?.length ?? 0) < 2) W(tw, "free: checklist < 2");
          if (t.minWords < 15 || t.minWords > 200) W(tw, `free: minWords ${t.minWords}`);
          if ((t.phrases?.length ?? 0) < 2) W(tw, "free: phrases < 2");
          if (t.sample && wc(t.sample) < t.minWords) W(tw, `free: sample ${wc(t.sample)} kelime, minWords ${t.minWords}`);
        }
      });
    }
    if (e.skill === "speaking") {
      if ("dialogue" in e) {
        checkTurns(w, e.dialogue);
        if ((e.targets?.length ?? 0) < 2) W(w, "diyalog hedefleri < 2");
        // Açık diyalog teması (WP-23): rol Almanca, hedef Türkçe, sahne = intro.
        if (!e.theme) W(w, "diyalog teması yok (yalnız senaryo)");
        else if (!e.theme.role?.trim() || !e.theme.goal?.trim()) E(w, "diyalog teması eksik (role/goal)");
      } else if ("monologue" in e) {
        const m = e.monologue;
        if (!m.promptTr?.trim()) E(w, "monolog: promptTr boş");
        if (!m.bulletsTr || m.bulletsTr.length < 3 || m.bulletsTr.length > 5) E(w, `monolog: ${m.bulletsTr?.length ?? 0} madde (3–5)`);
        if ((m.targets?.length ?? 0) < 2) W(w, "monolog hedefleri < 2");
        if (!(m.minSeconds >= 20 && m.maxSeconds > m.minSeconds && m.maxSeconds <= 120)) E(w, `monolog süre ${m.minSeconds}–${m.maxSeconds}`);
        if (wc(m.sampleDe) < 30) W(w, `monolog örneği ${wc(m.sampleDe)} kelime (< 30)`);
        if (trLetters(m.sampleDe)) E(w, "monolog örneğinde Türkçe harf");
      } else {
        if (e.tasks.length < 4) W(w, `konuşma drill'i ${e.tasks.length} görev (< 4)`);
        for (const t of e.tasks) {
          if (!t.de?.trim() || !t.tr?.trim()) E(w, `konuşma görevi eksik: ${JSON.stringify(t).slice(0, 60)}`);
          if (wc(t.de) > 12) W(w, `konuşma cümlesi ${wc(t.de)} kelime (> 12): "${t.de}"`);
          for (const c of t.confusions ?? []) if (!c.heard?.length || !c.fix?.trim()) E(w, `confusion eksik: ${t.de}`);
        }
      }
    }
  }
}

/* ───────────── dersler ───────────── */
function checkLessons(list: Lesson[]) {
  const ids = new Set<string>();
  const icons = new Set<string>(LESSON_ICONS);
  for (const l of list) {
    const w = `[lessons] ${l.id}`;
    if (ids.has(l.id)) E(w, "yinelenen kimlik");
    ids.add(l.id);
    need(w, l as unknown as Record<string, unknown>, ["id", "level", "course", "icon", "title", "titleTr", "summary", "minutes", "focusId", "vocab", "patterns", "lecture", "roleplay"]);
    if (!LEVELS.has(l.level)) E(w, `geçersiz seviye ${l.level}`);
    if (!icons.has(l.icon)) E(w, `bilinmeyen ikon ${l.icon}`);
    for (const id of l.cando ?? []) if (!isCandoId(id)) E(w, `bilinmeyen can-do kimliği ${id}`);
    if (!candoForLesson(l).length) E(w, "can-do etiketi üretilemedi");
    if (l.minutes < 3 || l.minutes > 20) W(w, `minutes ${l.minutes}`);
    if (l.vocab.length < 4 || l.vocab.length > 10) W(w, `vocab ${l.vocab.length} (4–10)`);
    if (l.patterns.length < 2 || l.patterns.length > 5) W(w, `patterns ${l.patterns.length} (2–5)`);
    let out = 0;
    for (const v of l.vocab) {
      if (!v.de?.trim() || !v.tr?.trim()) E(w, `vocab eksik: ${JSON.stringify(v)}`);
      if (multi(v.tr)) W(w, `çok anlamlı vocab tr: ${v.de} → "${v.tr}"`);
      if (POOLS[l.course] && !inPool(v.de, l.course)) out++;
    }
    if (POOLS[l.course] && l.vocab.length && out / l.vocab.length > 0.34) {
      if (INFLECTED_VOCAB.has(l.id)) usedInflectedExempt.add(l.id);
      else W(w, `havuz dışı kelime ${out}/${l.vocab.length}`);
    }
    for (const p of l.patterns) if (!p.de?.trim() || !p.tr?.trim()) E(w, `pattern eksik: ${JSON.stringify(p)}`);

    const steps = l.lecture;
    /* ÜST SINIR `check-lessons.ts` İLE AYNI. Burada 20 yazılıydı, orada 24:
       iki kapı aynı şey hakkında iki ayrı sayı söylüyordu. Sözlükçe sekize
       çıkınca (kullanıcı kararı 2026-09-11, İngilizce kurs Almanca kursun
       sözleşmesine getirildi) her kelime kendi tekrar adımını da getirdi ve
       İngilizce dersler 21-24 adıma yerleşti — birinci kapıya göre yasal,
       ikincisine göre uyarı. Tek görüş: 8-24. Alt sınır olduğu gibi kaldı;
       sekiz adımdan kısa bir anlatı zaten ders değil. */
    if (steps.length < 8 || steps.length > 24) W(w, `lecture ${steps.length} adım (8–24)`);
    let scored = 0;
    let repeat = 0;
    steps.forEach((s, i) => {
      const sw = `${w} adım ${i + 1}`;
      if (!s.say?.length) E(sw, "say boş");
      for (const seg of s.say ?? []) {
        /* HEDEF DİLDEKİ parçada Türkçe harf. Kural `seg.lang === "de"` diye
           yazılıydı ve İngilizce parçaları hiç denetlemiyordu; oysa sezgisel
           dilden bağımsız - ı/İ/ğ/Ğ/ş/Ş ne Almancada ne İngilizcede var. */
        if (seg.lang !== "tr" && trLetters(seg.text)) E(sw, `hedef dildeki parçada Türkçe harf: "${seg.text}"`);
      }
      const x = s.expect;
      if (!x) return;
      if (x.kind === "repeat") {
        repeat++;
        if (!x.target?.trim()) E(sw, "repeat.target boş");
      } else if (x.kind === "produce") {
        scored++;
        if (!x.target?.trim()) E(sw, "produce.target boş");
        if (!x.hint?.length) E(sw, "produce.hint boş (ilk yanlışın 'neden'i)");
        if (trLetters(x.target)) E(sw, `produce.target içinde Türkçe harf: "${x.target}"`);
      } else if (x.kind === "truefalse") {
        scored++;
        if (!x.statement?.trim()) E(sw, "truefalse.statement boş");
        if (!x.why?.length) E(sw, "truefalse.why boş");
      }
    });
    if (scored < 3) W(w, `puanlanan adım ${scored} (< 3)`);
    if (steps.length && repeat / steps.length > 0.6) W(w, `tekrar adımı payı %${Math.round((100 * repeat) / steps.length)} (> 60)`);

    const r = l.roleplay;
    need(`${w} roleplay`, r as unknown as Record<string, unknown>, ["scene", "partner", "opening", "openingTr", "minTurns"]);
    if (trLetters(r.opening)) E(w, "roleplay.opening içinde Türkçe harf");
    // Aralık check-lessons.ts ile AYNI olmalı: orada 6-9 zorunlu (HATA), burada
    // 2-6 uyarılıyordu. Rol yapma 6-9 tura çıkınca (894ddb0) bu eşik güncellenmedi
    // ve kataloğun 426 dersi, öteki doğrulayıcının dayattığı değer yüzünden burada
    // uyarı üretir oldu. İki doğrulayıcı aynı alan için farklı şey söyleyemez.
    if (r.minTurns < 6 || r.minTurns > 9) W(w, `minTurns ${r.minTurns} (6–9)`);
    if (r.script?.length) checkTurns(`${w} senaryo`, r.script, { minTurns: r.minTurns, opening: r.opening });
  }
}


/* ───────────── çalıştır ───────────── */
const kinds = only ? [only] : ["skills", "lessons"];
if (kinds.includes("skills")) checkSkills(BUNDLED_EXERCISES);
if (kinds.includes("lessons")) checkLessons(LESSONS);

// Muafiyet listesi bayatladıysa söyle: artık eşiği aşmayan bir kimlik listede
// durursa bir sonraki okuyan onu gerçek bir kusur sanır.
if (kinds.includes("lessons"))
  for (const id of INFLECTED_VOCAB)
    if (!usedInflectedExempt.has(id)) W("[lessons]", `çekimli sözlükçe muafiyeti artık gereksiz: ${id}`);

const poolSizes = Object.entries(POOLS).map(([c, p]) => `${c} ${p.set.size}`).join(" · ");
const counts = `${BUNDLED_EXERCISES.length} egzersiz · ${LESSONS.length} ders · havuz ${poolSizes}`;
console.log(`\nİçerik doğrulama — ${kinds.join(", ")} · ${counts}\n`);
if (errors.length) {
  console.log(`HATA (${errors.length})`);
  for (const e of errors) console.log(`  ✗ ${e}`);
}

/* ── şık konumu yanlılığı + modül sınavı kâğıtları ────────────────────────
   2026-09-05'te ölçülen kusur: 1484 çoktan seçmeli sorunun %83'ünde doğru
   cevap İLK şıktaydı — her seviyede, her yazarda (A1 %86, B2 %89, C1 %82).
   Hiçbir şey okumadan hep ilk şıkkı işaretleyen ~%83 alıyordu. Kusur tek bir
   soruya bakınca GÖRÜNMÜYOR, ancak toplamda çıkıyor; bu yüzden buraya bir
   toplam denetimi olarak eklendi.

   Düzeltme `skills/bundled.ts` içindeki `withShuffledOptions`. Buradaki iş
   onun ÇALIŞMAYA DEVAM ETTİĞİNİ doğrulamak: dağılım tekdüzeden (≈%33) uzağa
   kaçarsa ya karıştırma devre dışı kalmıştır ya yeni içerik onu atlıyordur.

   Modül sınavı kâğıtları ayrıca denetlenir; onların şık yanlılığı ZARARSIZ
   (exam.ts kâğıdı kurarken kullanıcı+hafta tohumuyla kendi karıştırmasını
   yapar), o yüzden yalnız bilgi olarak basılır.
*/
const SIKSIZ_TUR = new Set(["gapfill", "short_answer", "dictation", "order"]);
const YANLILIK_ESIK = 45;
{
  const perLevel = new Map<string, number[]>();
  for (const ex of BUNDLED_EXERCISES as SkillExercise[]) {
    for (const q of ((ex as { questions?: { kind?: string; options?: string[]; answer?: number }[] }).questions ?? [])) {
      if (SIKSIZ_TUR.has(q.kind ?? "mcq") || !q.options || q.options.length < 3) continue;
      const d = perLevel.get(ex.level) ?? [];
      d[q.answer ?? 0] = (d[q.answer ?? 0] ?? 0) + 1;
      perLevel.set(ex.level, d);
    }
  }
  console.log("\nŞIK KONUMU (üç ve daha çok şıklı; tekdüze ≈ %33)");
  for (const lv of [...perLevel.keys()].sort()) {
    const d = perLevel.get(lv)!;
    const t = d.reduce((a, n) => a + (n ?? 0), 0);
    const pay = d.map((n) => ((n ?? 0) / t) * 100);
    const enYuksek = Math.max(...pay);
    console.log(`  ${lv}: ${String(t).padStart(4)} soru · ` + pay.map((x, i) => `idx${i} %${x.toFixed(0)}`).join(" · "));
    if (enYuksek > YANLILIK_ESIK)
      E(`[skills] ${lv}`, `şık konumu yanlı: %${enYuksek.toFixed(0)} tek konumda (tekdüze ≈ %33) — bundled.ts withShuffledOptions çalışmıyor olabilir`);
  }

  const kagitDag: number[] = [];
  let kagitT = 0;
  for (const lv of ["A1", "A2", "B1", "B2", "C1"]) {
    for (let m = 0; m < 10; m++) {
      const plan = moduleExamPlan(lv, m) as {
        code: string;
        reading?: { questions: { de: string; tr: string; options: string[]; answer: number }[] };
        listening?: { questions: { de: string; tr: string; options: string[]; answer: number }[] };
        canDo?: unknown[]; speaking?: unknown[]; writing?: { sample?: string };
      } | undefined;
      if (!plan) continue;
      const sorular = [
        ...(plan.reading?.questions ?? []).map((q) => ["Lesen", q] as const),
        ...(plan.listening?.questions ?? []).map((q) => ["Hören", q] as const),
      ];
      for (const [bol, q] of sorular) {
        const yer = `[exam] ${plan.code} ${bol}`;
        if (!q.de || !q.tr) E(yer, "soru metni ya da çevirisi eksik");
        if (!q.options?.length) { E(yer, "şık yok"); continue; }
        // Aynı şık iki kez basılırsa iki doğru cevap olur ve soru kendini ele verir.
        if (new Set(q.options).size !== q.options.length) E(yer, `aynı şık iki kez: ${q.options.join(" / ")}`);
        if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.options.length)
          E(yer, `cevap indeksi aralık dışı (${q.answer})`);
        else { kagitDag[q.answer] = (kagitDag[q.answer] ?? 0) + 1; kagitT++; }
      }
      if (!plan.canDo?.length) E(`[exam] ${plan.code}`, "yapabilirlik listesi boş");
      if (!plan.speaking?.length) E(`[exam] ${plan.code}`, "konuşma bölümü boş");
      if (!plan.writing?.sample) E(`[exam] ${plan.code}`, "yazma örneği yok");
    }
  }
  if (kagitT)
    console.log(`  modül sınavı kâğıtları: ${kagitT} soru · ` +
      kagitDag.map((n, i) => `idx${i} %${(((n ?? 0) / kagitT) * 100).toFixed(0)}`).join(" · ") +
      "  (exam.ts kendi karıştırmasını yapıyor, zararsız)");
}

/** Uyarı etiketi: tür + mesajın sayısız hâli ("dinleme bölümü N kelime"). */
const tagOf = (w: string) => w.replace(/^\[(\w+)\].*? — ([^:"„]+).*$/s, "$1: $2").replace(/\d+/g, "N").trim();
const byTag = new Map<string, number>();
for (const w of warnings) byTag.set(tagOf(w), (byTag.get(tagOf(w)) ?? 0) + 1);
if (warnings.length) {
  console.log(`\nUYARI (${warnings.length})`);
  for (const [tag, n] of [...byTag.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${tag}`);
  if (args.includes("--verbose")) for (const w of warnings) console.log(`  · ${w}`);
}

/*
  Uyarı bütçesi ETİKET başına: toplam sayı tek başına "en yok" borcunu
  azaltırken başka bir yerde "kopuk sözlükçe" borcu almaya izin verirdi.
  Etiket başına tavan: hiçbir kategori büyüyemez, yeni kategori açılamaz.
*/
let baseline: Record<string, number> = {};
if (existsSync(BASELINE)) baseline = JSON.parse(readFileSync(BASELINE, "utf8")) as Record<string, number>;
if (writeBaseline) {
  if (!only) baseline = {};
  for (const [tag, n] of byTag) baseline[tag] = n;
  writeFileSync(BASELINE, JSON.stringify(Object.fromEntries(Object.entries(baseline).sort()), null, 2) + "\n");
  console.log(`\nbaseline yazıldı: ${byTag.size} etiket, ${warnings.length} uyarı.`);
}
const over: string[] = [];
if (Object.keys(baseline).length) {
  for (const [tag, n] of byTag) {
    const cap = baseline[tag] ?? 0;
    if (n > cap) over.push(`${tag}: ${n} > ${cap}`);
  }
}
if (over.length) {
  console.log("\n✗ Uyarı bütçesi aşıldı (yeni içerik borcu). Düzelt ya da bilinçli kabul için --baseline:");
  for (const o of over) console.log(`  · ${o}`);
}
const failed = errors.length > 0 || over.length > 0;
console.log(failed ? "\nİÇERİK DOĞRULAMASI BAŞARISIZ" : `\nİÇERİK DOĞRULAMASI GEÇTİ (${warnings.length} uyarı, bütçe içinde)`);
process.exit(failed ? 1 : 0);
