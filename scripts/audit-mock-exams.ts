/**
 * Deneme sınavı kâğıtlarının PEDAGOJİK denetimi — `npm run audit:mock-exams`.
 *
 * `check-mock-exams.ts` kâğıdın BÜTÜNLÜĞÜNE bakıyor: numaralar, referanslar,
 * plana uygunluk, cevap anahtarının kabaca dağılımı. Buradaki denetim başka
 * bir soruya cevap veriyor — kâğıt gerçekten ölçmek istediği şeyi mi ölçüyor?
 *
 * Sınav yazımında en sık yapılan hatalar ölçülebilir izler bırakır ve altı
 * tanesi burada aranıyor:
 *
 *  1. BİREBİR ALINTI. Doğru şık metinden kesilip yapıştırılmışsa ve
 *     çeldiriciler değilse, madde okuduğunu anlamayı değil sözcük eşleştirmeyi
 *     ölçer: öğrenci metni taramadan doğru şıkkı bulur.
 *  2. DEMİRLENMEMİŞ ÇELDİRİCİ. Metinle hiçbir içerik sözcüğü paylaşmayan şık
 *     bakar bakmaz elenir; üç şıklı bir madde fiilen iki şıklı olur.
 *  3. ANAHTAR YIĞILMASI. Bölüm boyunca doğru şıkkın konumu dengesizse, hiç
 *     okumadan tek harf işaretleyen öğrenci beklenenin üstünde puan alır.
 *  4. SEVİYE İMZASI. Bir A2 metninde Perfekt, bir B1 metninde Konjunktiv II
 *     ya da ilgi cümlesi hiç geçmiyorsa metin o seviyeyi temsil etmiyordur.
 *  5. KELİME ERİŞİMİ. Metnin sözcükleri uygulamanın o seviyeye kadar
 *     öğrettiği havuzun ne kadar dışında? Sınav metninde bilinmeyen sözcük
 *     BULUNMALIDIR (baş etme becerisi de ölçülür), ama oran belli bir yeri
 *     aşarsa metin seviyenin üstündedir.
 *  6. AÇIKLAMANIN BAĞI. Her maddenin açıklaması metne demirlenmeli: alıntı ya
 *     da metnin sözcükleriyle. "Metinde öyle yazıyor" tipi genel bir açıklama
 *     öğrenciye hatasının nereden geldiğini göstermez.
 *
 * Ayrıca okuma hızı: görevin süresine düşen kelime, o seviyede makul mü.
 *
 * Çıkış kodu: ağır bulgu (1, 2, 4) varsa 1, yoksa 0.
 */
import { createRequire } from "node:module";
import { MOCK_PAPERS, taskSeconds } from "../src/lib/mock-exams";
import { isOpenTask } from "../src/lib/mock-exams/scoring";
import type { MockItem, MockPaper, MockPart, MockStimulus, MockTask } from "../src/lib/mock-exams/types";

const require = createRequire(import.meta.url);
const { olc, SERBEST } = require("./lib/vocab-gate.cjs") as {
  olc: (ham: string, unit: number, ek?: string[], seviye?: string) => { tok: string[]; disi: string[] };
  SERBEST: Set<string>;
};
/* İngilizce kapı ayrı bir dosya: her kuralı başka bir dilin kuralı. */
const { olc: olcEn, SERBEST: SERBEST_GATE_EN } = require("./lib/vocab-gate-en.cjs") as {
  olc: (ham: string, seviye?: string, ek?: string[]) => { tok: string[]; disi: string[] };
  SERBEST: Set<string>;
};

let hard = 0;
let soft = 0;
const bad = (w: string, m: string) => { hard++; console.error(`✗ ${w}: ${m}`); };
const warn = (w: string, m: string) => { soft++; console.warn(`! ${w}: ${m}`); };

const norm = (s: string) =>
  s.toLocaleLowerCase("de-DE").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
const wordsOf = (s: string) => norm(s).split(" ").filter(Boolean);

/**
 * İngilizce işlev sözcükleri — kapının kendi listesi.
 *
 * "İçerik sözcüğü" tanımı hem birebir alıntı ölçütünde hem çeldirici
 * demirlemesinde kullanılıyor. Liste burada bir kez daha yazılsaydı iki kopya
 * ayrı ayrı eskirdi; kapı zaten aynı ayrımı yapmak zorunda.
 */
const SERBEST_EN = SERBEST_GATE_EN;

/** Kâğıdın diline göre işlev sözcüğü kümesi. */
const freeWords = (course: string) => (course === "en" ? SERBEST_EN : SERBEST);
const content = (ws: string[], course: string) => {
  const free = freeWords(course);
  return ws.filter((w) => w.length > 3 && !free.has(w));
};

/** İki sözcük dizisinin paylaştığı en uzun ardışık parça (kelime sayısı). */
function longestShared(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;
  let best = 0;
  const prev = new Array<number>(b.length + 1).fill(0);
  const cur = new Array<number>(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : 0;
      if (cur[j] > best) best = cur[j];
    }
    prev.fill(0);
    for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
    cur.fill(0);
  }
  return best;
}

const bodyOf = (st: MockStimulus) => (st.kind === "text" ? st.body : st.segments.map((s) => s.text).join(" "));

/** Maddenin baktığı metin: `ref` varsa o, yoksa görevin bütün metinleri. */
function sourceFor(task: MockTask, item: MockItem): string {
  const list = task.texts ?? [];
  if (!list.length) return "";
  const one = item.ref ? list.find((t) => t.id === item.ref) : null;
  return one ? bodyOf(one) : list.map(bodyOf).join("\n");
}

/* ── 1 + 2: alıntı ve çeldirici demirlemesi ───────────────────────────────── */

function checkItemCraft(where: string, task: MockTask, item: MockItem, visible: boolean, course: string) {
  if (item.kind !== "mcq") return;
  // Şıklı boşluk doldurmada şıklar bağlaç ya da işlev sözcüğü; ne birebir
  // alıntı ne de demirleme ölçütü bu biçimde bir şey söyler.
  if (task.format === "gapMcq") return;
  const src = sourceFor(task, item);
  if (!src.trim()) return;
  const sw = wordsOf(src);
  const shares = item.options.map((o) => longestShared(wordsOf(o), sw));
  const right = shares[item.answer];
  const wrong = shares.filter((_, i) => i !== item.answer);
  const gap = right - Math.max(...wrong);

  /*
    Birebir alıntı iki bölümde farklı ağırlıkta.

    OKUMADA metin öğrencinin önünde: doğru şık metinden kesilmişse ve
    çeldiriciler kesilmemişse madde taramayla çözülür, anlamayı hiç ölçmez.
    Ağır bulgu.

    DİNLEMEDE metin yok, tarama diye bir şey yok. Uzun bir birebir tekrar yine
    de zayıflık — anlamak yerine duyulanı yankılamak yeter — ama sömürülebilir
    bir açık değil. Eşik yüksek ve bulgu uyarı düzeyinde.
  */
  if (visible) {
    if (right >= 3 && gap >= 2) {
      bad(where, `doğru şık metinden ${right} kelimelik parçayı birebir taşıyor (çeldiricilerin en iyisi ${Math.max(...wrong)}) — taramayla çözülür`);
    }
  } else if (right >= 5 && gap >= 3) {
    warn(where, `doğru şık kayıttan ${right} kelimelik parçayı birebir tekrar ediyor — anlamak yerine yankılamak yetiyor`);
  }

  /*
    Çeldirici demirlemesi YALNIZ okumada ölçülüyor.

    Metin ekrandayken, hiçbir sözcüğü metinde geçmeyen bir şık okumadan
    elenebilir. Dinlemede böyle bir imkân yok: öğrenci şıkkı metinle
    karşılaştıramaz, yalnız hatırladığıyla karşılaştırır. Orada "metinde
    geçmeyen" bir şık tamamen meşru bir çeldiricidir.

    Şık bankası olan görevlerde (eşleştirme) şıklar zaten kişi ya da ilan adı;
    ölçüt orada da anlamsız.
  */
  if (!visible || task.options?.length) return;
  /*
    Şıkların ETİKET olduğu görevlerde ölçüt geçersiz.

    "Hangi kişi bunu söylüyor" ve "dafür / dagegen" biçimlerinde şıklar
    metinden türetilmiş ifadeler değil, sabit bir ad ya da konum listesidir:
    aynı şık dizisi görevin bütün maddelerinde tekrarlanır. Böyle bir şıkkın
    metinde geçmemesi bir kusur değil, biçimin kendisidir. Ayırt etme yolu
    basit: görevdeki bütün şıklı maddeler aynı şık dizisini taşıyorsa liste
    etikettir.
  */
  const mcqs = task.items.filter((x) => x.kind === "mcq");
  const first = JSON.stringify(mcqs[0]?.kind === "mcq" ? mcqs[0].options : null);
  const labels = mcqs.length > 1 && mcqs.every((x) => x.kind === "mcq" && JSON.stringify(x.options) === first);
  if (labels) return;

  /*
    Tek bir çeldiricinin metinle sözcük paylaşmaması kusur DEĞİL: iyi bir
    çeldirici çoğu zaman metnin hiç kullanmadığı bir başka olasılıktır ve
    öğrenci onu tarayarak eleyemez.

    Sömürülebilir olan ŞU dizilim: doğru şık metnin sözcüklerini taşıyor ve
    çeldiricilerin HİÇBİRİ taşımıyor. O zaman "metne benzeyen şıkkı işaretle"
    stratejisi maddeyi anlamadan çözer. Ölçülen şey budur, tek tek şıkların
    sözlüğü değil.
  */
  const anchored = item.options.map((o) => {
    const co = content(wordsOf(o), course);
    return co.length ? co.some((w) => sw.includes(w)) : true;
  });
  const distractorsAnchored = anchored.filter((_, i) => i !== item.answer).some(Boolean);
  if (anchored[item.answer] && !distractorsAnchored) {
    warn(where, "yalnız doğru şık metnin sözcüklerini taşıyor, çeldiricilerin hiçbiri taşımıyor — \"metne benzeyeni işaretle\" stratejisi çalışır");
  }
}

/* ── 3: anahtar yığılması (bölüm düzeyinde) ───────────────────────────────── */

/**
 * Şık sayısı başına AYRI torba.
 *
 * Üç ve dört şıklı maddeler aynı torbada sayılamaz: üç şıklıda beklenen pay
 * %33, dört şıklıda %25 ve karıştırıldıklarında ikisi de bulanıklaşır.
 * Önceden yalnız üç şıklılar sayılıyordu, dört şıklılar HİÇ denetlenmiyordu —
 * İngilizce kâğıtların şıklı boşluk ve uzun metin görevleri dört şıklı olduğu
 * için orada denetim baştan kör kalırdı. Almanca C1'in şıklı boşluk görevi de
 * aynı boşluğa düşüyordu.
 */
function checkKeySpread(where: string, part: MockPart) {
  for (const size of [3, 4]) {
    const counts = new Map<number, number>();
    let n = 0;
    for (const task of part.tasks) {
      for (const it of task.items) {
        if (it.kind !== "mcq" || it.options.length !== size) continue;
        counts.set(it.answer, (counts.get(it.answer) ?? 0) + 1);
        n++;
      }
    }
    if (n < 10) continue;
    /*
      Eşik iki torbada da %45. Dört şıklıda beklenen pay %25 olduğu için daha
      sıkı bir sayı (ör. %35) savunulabilir görünüyor ama gerçek kâğıtlarda
      madde sayısı küçük: on beş maddede altı kez "a" çıkması hem doğal
      dalgalanma hem de %40 demek. Sıkı eşik, kâğıdı bozmayan dağılımları
      işaretleyip uyarıyı gürültüye çevirirdi.
    */
    const limit = 45;
    for (const [pos, c] of counts) {
      const pct = Math.round((100 * c) / n);
      if (pct > limit) warn(where, `${size} şıklı maddelerin %${pct}'inde doğru cevap ${"abcd"[pos]} (${n} madde) — tek harf işaretleyen fazla puan alır`);
    }
    // Hiç kullanılmayan konum: öğrenci farkında olmadan o şıkkı elemeyi öğrenir.
    for (let p = 0; p < size; p++) if (!counts.get(p)) warn(where, `${size} şıklı maddelerin hiçbirinde doğru cevap ${"abcd"[p]} değil`);
  }
}

/* ── 4: seviye imzaları ───────────────────────────────────────────────────── */

type Signature = { re: RegExp; ad: string };

/**
 * İngilizce seviye imzaları.
 *
 * Almanca imzalar biçimbilime dayanıyor (ge-…-t, Konjunktiv II ekleri);
 * İngilizcede çekim zayıf olduğu için imzalar SÖZDİZİMİNE dayanmak zorunda:
 * yardımcı fiil + ortaç dizilimi, bağlaç seçimi, devrik yapı. Bu yüzden
 * kalıplar daha uzun ve daha bağlam duyarlı — kısa bir ek aramak İngilizcede
 * her metinde tutar ve hiçbir şey ölçmez.
 *
 * A1'in imzası yok, Almancada da yok: A1 metni "hangi yapıyı içeriyor" diye
 * değil "hangi yapıyı İÇERMİYOR" diye ölçülür ve onu `OVER_LEVEL` yapıyor.
 */
const SIGNATURE_EN: Record<string, Signature[]> = {
  A2: [
    { re: /\b(was|were|went|had|did|saw|took|came|made|got|bought|found)\b/i, ad: "past simple" },
    { re: /\b(going to|will)\s+\w+/i, ad: "gelecek (going to / will)" },
    { re: /\b(\w+er than|more \w+ than|the \w+est|the most \w+)\b/i, ad: "karşılaştırma" },
    { re: /\b(because|when|if|but|so)\b/i, ad: "yan cümle bağlacı" },
  ],
  B1: [
    { re: /\b(have|has|haven't|hasn't)\s+(?:\w+\s+){0,2}(been|\w+ed|done|gone|seen|made|taken|found|written|given)\b/i, ad: "present perfect" },
    { re: /,\s*(who|which|where|whose)\s/i, ad: "ilgi cümlesi" },
    { re: /\bif\b[^.!?]{0,60}\b(will|would|could)\b/i, ad: "koşul cümlesi" },
    { re: /\b(used to|although|however|instead of|as soon as)\b/i, ad: "ileri bağlaç / alışkanlık geçmişi" },
  ],
  B2: [
    { re: /\b(is|are|was|were|been|being|be)\s+(?:\w+\s+){0,2}(\w+ed|made|taken|given|held|known|shown|built|sold|written)\b\s+(?:by|in|on|at|to|for|with|from|as|and|,|\.)/i, ad: "edilgen" },
    { re: /\b(whereas|nonetheless|nevertheless|albeit|moreover|furthermore|despite|in contrast)\b/i, ad: "ileri bağlayıcı" },
    { re: /\bif\b[^.!?]{0,60}\bhad\b[^.!?]{0,40}\bwould have\b|\bwould have\b[^.!?]{0,60}\bif\b[^.!?]{0,40}\bhad\b/i, ad: "üçüncü tip koşul" },
    { re: /(^|[.!?]\s|,\s)(?:Having|Given|Faced|Asked|Based|Followed|Seen|Left|Driven|Compared|Encouraged)\s+\w+/, ad: "ortaç öbeği" },
  ],
  C1: [
    { re: /\b(rarely|seldom|hardly|scarcely|no sooner|not only|little did|only then|only when|at no point)\b\s+(?:had|has|have|did|do|does|is|are|was|were|can|could|will|would)\b/i, ad: "devrik yapı" },
    { re: /\b(it (?:is|was|has been) (?:precisely |exactly |largely |partly )?\w[\w\s]{0,30} that\b|what \w[\w\s]{0,30} (?:is|was|does|did) \w)/i, ad: "yarma cümle" },
    { re: /\b(arguably|ostensibly|by no means|to some extent|on balance|in principle|for the most part|not least)\b/i, ad: "çekimserlik belirteci" },
    { re: /\b(the (?:emergence|assumption|implication|distinction|expectation|reluctance|tendency|prevalence|allocation|erosion) of|its (?:emergence|prevalence|distribution))\b/i, ad: "adlaştırma" },
  ],
};

const SIGNATURE: Record<string, { re: RegExp; ad: string }[]> = {
  A2: [
    { re: /\b(habe|hat|haben|hast|bin|ist|sind)\b[^.!?]{0,60}\bge[a-zäöüß]+(t|en)\b/i, ad: "Perfekt" },
    { re: /\b(kann|kannst|können|muss|müssen|darf|dürfen|möchte|möchten|will|wollen)\b/i, ad: "Modalverb" },
    { re: /\b(weil|dass|wenn)\b/i, ad: "yan cümle" },
  ],
  B1: [
    { re: /\b(würde[nst]?|könnte[nst]?|hätte[nst]?|wäre[nst]?|müsste[nst]?)\b/i, ad: "Konjunktiv II" },
    { re: /,\s*(der|die|das|den|dem|denen)\s/i, ad: "ilgi cümlesi" },
    { re: /\b(obwohl|damit|seitdem|während|deshalb|trotzdem)\b/i, ad: "ileri bağlaç" },
  ],
  B2: [
    { re: /\b(wird|werden|wurde|wurden)\b[^.!?]{0,60}\b(ge[a-zäöüß]+(t|en)|[a-zäöüß]+iert)\b/i, ad: "edilgen" },
    { re: /\b(allerdings|hingegen|zumal|gleichwohl|indes|dagegen|insofern)\b/i, ad: "ileri bağlayıcı" },
    { re: /\b(die|der|das)\s+(Frage|Folge|Vorstellung|Erklärung|Entscheidung|Beobachtung|Untersuchung|Verteilung|Umstellung)\b/i, ad: "adlaştırma" },
  ],
  C1: [
    { re: /\b(mithin|gleichwohl|indes|insofern|ohnehin|zwangsläufig|weitgehend|vermeintlich)\b/i, ad: "ölçü/derece belirteci" },
    { re: /\b(lässt sich|ließe sich|lassen sich)\b/i, ad: "kişisiz edilgen (lassen)" },
    { re: /\b(zu[a-zäöüß]*ende[nrms]?|[a-zäöüß]+ende[nrms]?)\s+[A-ZÄÖÜ][a-zäöüß]+/, ad: "ortaç niteleyici" },
  ],
};

/** Kâğıdın okuma ve dinleme metinlerinin tamamı — imza ve kelime ölçümleri buna bakıyor. */
function corpusOf(paper: MockPaper): string {
  return paper.parts
    .filter((p) => p.skill === "reading" || p.skill === "listening")
    .flatMap((p) => p.tasks.flatMap((t) => (t.texts ?? []).map(bodyOf)))
    .join("\n");
}

function checkSignature(paper: MockPaper) {
  const sig = (paper.course === "en" ? SIGNATURE_EN : SIGNATURE)[paper.level];
  if (!sig) return;
  const all = corpusOf(paper);
  for (const s of sig) {
    if (!s.re.test(all)) bad(paper.id, `${paper.level} imzası hiç geçmiyor: ${s.ad} — metinler seviyeyi temsil etmiyor`);
  }
}

/* ── 5: kelime erişimi ────────────────────────────────────────────────────── */

/** Seviyenin son ünitesi — havuz kapısının üst sınırı. */
const LAST_UNIT: Record<string, number> = { A1: 25, A2: 25, B1: 45, B2: 25, C1: 25 };
/** Havuz dışı kelime oranı için üst sınır. B2/C1 ölçülür ama kapı yok. */
const OUT_LIMIT: Record<string, number | null> = { A1: 18, A2: 26, B1: 38, B2: null, C1: null };

/**
 * İngilizce havuz dışı kelime sınırı.
 *
 * Sayılar "bu seviyede metin okunur mu" sorusundan geliyor, kâğıtlarımızın
 * ölçülen oranından değil: anlama için kabaca %95 tanıdık sözcük gerekiyor,
 * yani %5 civarı bilinmeyen normal. Buradaki sınırlar onun iki-üç katı,
 * çünkü işleri bir felaketi yakalamak — seviyenin üstüne kaçmış bir metni —
 * ince ayar yapmak değil. Üst seviyelerde sınır gevşiyor: bir C1 metninde
 * bilinmeyen sözcük BULUNMALI, baş etme becerisi de ölçülüyor.
 */
const OUT_LIMIT_EN: Record<string, number> = { A1: 10, A2: 12, B1: 16, B2: 20, C1: 25 };

function checkVocabEn(paper: MockPaper): { pct: number; top: string[] } {
  const { tok, disi } = olcEn(corpusOf(paper), paper.level.toLowerCase());
  const pct = tok.length ? Math.round((100 * disi.length) / tok.length) : 0;
  const limit = OUT_LIMIT_EN[paper.level];
  if (limit != null && pct > limit) {
    warn(paper.id, `havuz dışı kelime %${pct} (${paper.level} sınırı %${limit}) — metinler seviyenin üstünde olabilir`);
  }
  const freq = new Map<string, number>();
  for (const d of disi) freq.set(d, (freq.get(d) ?? 0) + 1);
  const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w, n]) => `${w}×${n}`);
  return { pct, top };
}

function checkVocab(paper: MockPaper): { pct: number; top: string[] } {
  if (paper.course === "en") return checkVocabEn(paper);
  const texts = corpusOf(paper);
  const { tok, disi } = olc(texts, LAST_UNIT[paper.level] ?? 25, [], paper.level.toLowerCase());
  const pct = tok.length ? Math.round((100 * disi.length) / tok.length) : 0;
  const limit = OUT_LIMIT[paper.level];
  if (limit != null && pct > limit) {
    warn(paper.id, `havuz dışı kelime %${pct} (${paper.level} sınırı %${limit}) — metinler seviyenin üstünde olabilir`);
  }
  const freq = new Map<string, number>();
  for (const d of disi) freq.set(d, (freq.get(d) ?? 0) + 1);
  const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w, n]) => `${w}×${n}`);
  return { pct, top };
}

/* ── 6: açıklamanın metne bağı ────────────────────────────────────────────── */

/*
  Açıklamanın ölçüsü "kaç ortak sözcük" DEĞİL.

  Açıklamalar Türkçe, metinler Almanca: iki dilin ortak içerik sözcüğü doğal
  olarak sıfıra yakın çıkar ve o sayı hiçbir şey söylemez. Ölçülmesi gereken
  şey açıklamanın SINANABİLİR olması: ya metinden bir parça taşıyor (alıntı,
  ters tırnak ya da metinde geçen bir sözcük) ya da somut bir sayı/oran
  veriyor. İkisi de yoksa açıklama "metinde öyle yazıyor"un uzun hâlidir.
*/
function checkExplain(where: string, task: MockTask, item: MockItem, course: string) {
  const src = sourceFor(task, item);
  if (!src.trim()) return;
  const ex = item.explain;
  if (ex.trim().length < 60) {
    warn(where, `açıklama çok kısa (${ex.trim().length} karakter) — hatanın nereden geldiğini göstermiyor`);
    return;
  }
  const quoted = /[«»"„“`]/.test(ex);
  const numeric = /\d/.test(ex);
  const sw = new Set(wordsOf(src));
  const shared = content(wordsOf(ex), course).some((w) => sw.has(w));
  if (!quoted && !numeric && !shared) {
    warn(where, `açıklama sınanabilir bir dayanak taşımıyor (alıntı yok, sayı yok, metinden sözcük yok): "${ex.slice(0, 60)}…"`);
  }
}

/* ── 7: okuma hızı ────────────────────────────────────────────────────────── */

/**
 * Görev süresine düşen kelime — seviye başına makul üst sınır (kelime/dakika).
 *
 * İngilizce sınırlar yüksek çünkü ölçülen birim SÖZCÜK ve İngilizce sözcükler
 * daha kısa: aynı içeriği okumak daha çok sözcük geçmeyi gerektiriyor. Almanca
 * sayıyı İngilizce metne uygulamak, aslında rahat olan bir görevi "süre yetmez"
 * diye işaretlerdi.
 */
const WPM_LIMIT: Record<string, Record<string, number>> = {
  de: { A1: 55, A2: 75, B1: 100, B2: 130, C1: 160 },
  en: { A1: 70, A2: 95, B1: 130, B2: 165, C1: 200 },
};

function checkPace(where: string, part: MockPart, level: string, course: string) {
  if (part.skill !== "reading") return;
  const secs = taskSeconds(part);
  part.tasks.forEach((task, i) => {
    const n =
      (task.texts ?? []).reduce((a, s) => a + wordsOf(bodyOf(s)).length, 0) +
      (task.options ?? []).reduce((a, o) => a + wordsOf(`${o.label} ${o.body ?? ""}`).length, 0);
    if (!n) return;
    const wpm = Math.round(n / (secs[i] / 60));
    const limit = WPM_LIMIT[course]?.[level] ?? 200;
    if (wpm > limit) {
      warn(`${where} · Teil ${task.no}`, `dakikada ${wpm} kelime okumak gerekiyor (${level} sınırı ${limit}) — süre yetmez`);
    }
  });
}

/* ── 8: bölüm düzeyinde doğru/yanlış dengesi ──────────────────────────────── */

function checkBoolBalance(where: string, part: MockPart) {
  const bools = part.tasks.flatMap((t) => t.items.filter((i) => i.kind === "bool"));
  if (bools.length < 8) return;
  const yes = bools.filter((i) => i.kind === "bool" && i.answer).length;
  const pct = Math.round((100 * yes) / bools.length);
  if (pct < 35 || pct > 65) {
    warn(where, `bölüm boyunca doğru/yanlış dengesi %${pct} doğru (${bools.length} madde) — 40–60 arası olmalı`);
  }
}

/* ── çalıştır ─────────────────────────────────────────────────────────────── */

const rows: string[] = [];
for (const paper of MOCK_PAPERS) {
  checkSignature(paper);
  const v = checkVocab(paper);
  for (const part of paper.parts) {
    const w = `${paper.id} · ${part.skill}`;
    checkKeySpread(w, part);
    checkBoolBalance(w, part);
    checkPace(w, part, paper.level, paper.course);
    for (const task of part.tasks) {
      if (isOpenTask(task)) continue;
      // Metin öğrencinin önünde mi: okumada evet, dinlemede hayır. İki
      // ölçütün (birebir alıntı, çeldirici demirlemesi) anlamı buna bağlı.
      const visible = part.skill === "reading" || part.skill === "writing";
      for (const item of task.items) {
        const iw = `${w} · Teil ${task.no} · madde ${item.no}`;
        checkItemCraft(iw, task, item, visible, paper.course);
        checkExplain(iw, task, item, paper.course);
      }
    }
  }
  rows.push(`  ${paper.id}  havuz dışı %${String(v.pct).padStart(2)}  en sık: ${v.top.join(" ")}`);
}

console.log("\nKelime erişimi (okuma + dinleme metinleri):");
console.log(rows.join("\n"));
console.log(hard ? `\n${hard} ağır bulgu, ${soft} uyarı` : `\n0 ağır bulgu, ${soft} uyarı`);
process.exit(hard ? 1 : 0);
