/**
 * Almanca takas tablosunu denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/conversations/swap/check.ts`
 *
 * KARDEŞ HATLARDAN FARKI: burada çeviri yok. `en.json` bir KARAR TABLOSU —
 * öğrenciye kendisi hakkında yanlış bir şey söyleten Almanca cümleleri
 * İngilizce konuşan öğrenci için değiştiriyor. On bir satır, beş konuşma.
 *
 * Kapının tek işi tablonun kaynakla TUTMASI. Bir konuşma düzenlendiğinde
 * takas edilecek dize kayarsa takas sessizce hiçbir şey yapmaz ve öğrenci
 * yine "Ich komme aus der Türkei" der. Sessiz kalmak en kötüsü olduğu için
 * kapı her `from` dizesinin kaynakta GERÇEKTEN durduğunu ölçüyor.
 *
 * İkinci ölçüt: takas yeni bir Türkçe/Türkiye izi bırakmamalı. `to`
 * tarafında Türkiye kalırsa satır yazılmış ama işini yapmamış demektir.
 */
import { readFileSync } from "node:fs";
import { CONVERSATIONS } from "@/lib/conversations/source";
import type { Segment } from "@/lib/conversations/types";
import { resolveConversation, resolveSegments, type NativeDict } from "@/lib/conversations/native";

type Row = { conversation: string; why: string; de: [string, string][]; en: [string, string][] };

const DIR = new URL(".", import.meta.url).pathname;
const rows = JSON.parse(readFileSync(`${DIR}en.json`, "utf8")) as Row[];
const dict = JSON.parse(
  readFileSync("src/lib/conversations/generated/native-en.json", "utf8"),
) as NativeDict;
const SEP = String.fromCharCode(0);

/*
  İKİ SÖZLÜK. `raw` takas UYGULANMADAN çözüyor: `from` dizesinin gerçekten
  var olduğu ancak orada görülebilir. `dict` takaslı: iz kalıp kalmadığı
  ancak orada görülebilir. Tek sözlükle ölçülseydi kapı ya her `from`u
  "yok" sayardı (takas onları çoktan değiştirmiş olurdu) ya da hiçbir izi
  yakalayamazdı.
*/
const raw: NativeDict = { ...dict, swap: {}, swapEn: {} };

const errors: string[] = [];
const warnings: string[] = [];
const H = (m: string) => errors.push(`  ${m}`);
const U = (m: string) => warnings.push(`  ${m}`);
/**
 * Türkiye izi. `Türk` tek başına yetmiyor: Almancada `Tür` kapı demek ve
 * `die Türklingel` (kapı zili) taramaya takılıyordu. `Türkei`/`Türkisch`
 * ikisi de `Türk`ten sonra `e` ya da `i` ile devam ediyor, bileşik
 * kapı sözcükleri etmiyor.
 */
const LEFTOVER = /Türk(?=[ei])|Turkish|Turkey|Izmir|Istanbul|Ankara/i;

type ScriptTurn = {
  ask: string;
  askTr: string;
  cue: string;
  replies?: { say: string; sayTr: string }[];
  fallback?: { say: string; sayTr: string; example?: string };
};
/** Konuşmanın sohbet senaryosu — yoksa boş. */
const script = (conversation: { chat?: unknown }): ScriptTurn[] =>
  (conversation.chat as { script?: ScriptTurn[] } | undefined)?.script ?? [];

/** Satırın Almanca takasını uygular — senaryo taraması için. */
const sw = (r: Row, x: string): string => r.de.find(([f]) => f === x)?.[1] ?? x;

let de = 0;
let en = 0;
for (const r of rows) {
  const conversation = CONVERSATIONS.find((l) => l.id === r.conversation);
  if (!conversation) {
    H(`[${r.conversation}] konuşma yok`);
    continue;
  }
  if (!r.why?.trim()) H(`[${r.conversation}] gerekçe yazılmamış`);

  /* Kaynaktaki bütün Almanca dizeler: anlatım parçaları, tanıma hedefi,
     sözlükçe maddesi ve sohbet açılışı. Takas hepsine uygulanacağı için
     kapı da hepsine bakıyor. */
  const source = new Set<string>();
  for (const st of conversation.lecture ?? []) {
    const e = st.expect as { hint?: Segment[]; why?: Segment[]; target?: string } | undefined;
    for (const segs of [st.say, e?.hint, e?.why])
      for (const s of segs ?? []) if (s.lang !== "tr") source.add(s.text);
    if (e?.target) source.add(e.target);
  }
  for (const v of conversation.vocab ?? []) source.add(v.de);
  const rp = conversation.chat as { opening?: string } | undefined;
  if (rp?.opening) source.add(rp.opening);
  /* Senaryonun Almancası da takas edilebiliyor — replik, örnek cevap ve
     modelin çalışmadığı anda devreye giren yedek replik. */
  for (const t of script(conversation)) {
    source.add(t.ask);
    for (const x of t.replies ?? []) source.add(x.say);
    if (t.fallback) {
      source.add(t.fallback.say);
      if (t.fallback.example) source.add(t.fallback.example);
    }
  }

  for (const [from, to] of r.de) {
    de++;
    if (!source.has(from)) H(`[${r.conversation}] kaynakta yok: «${from}»`);
    if (LEFTOVER.test(to)) H(`[${r.conversation}] takas iz bırakıyor: «${to}»`);
    if (from === to) H(`[${r.conversation}] takas aynı: «${from}»`);
  }

  /* İngilizce taraf: çözülmüş anlatım parçaları ve sözlükçe karşılıkları.
     Almanca değişince onu ALINTILAYAN İngilizce satır da değişmeli. */
  const english = (d: NativeDict): Set<string> => {
    const set = new Set<string>();
    for (const st of conversation.lecture ?? []) {
      const e = st.expect as { hint?: Segment[]; why?: Segment[] } | undefined;
      for (const segs of [st.say, e?.hint, e?.why])
        for (const s of resolveSegments(d, conversation.id, segs ?? []) ?? [])
          if (s.lang === "en") set.add(s.text);
    }
    for (const v of conversation.vocab ?? []) {
      const g = d.vocab[conversation.id + SEP + v.de];
      if (g) set.add(d.swapEn[conversation.id + SEP + g] ?? g);
    }
    /* Sohbet açılışının ANA DİLDEKİ karşılığı — Almanca replik takas
       edilince bunun da dönmesi gerekiyor, yoksa ikisi birbirini yalanlar. */
    const op = d.chat[conversation.id]?.openingTr;
    if (op) set.add(d.swapEn[conversation.id + SEP + op] ?? op);
    /* Senaryonun İngilizcesi `script` sözlüğünden geliyor ve takas ona da
       uygulanıyor; kapı aynı yoldan geçiyor. */
    const en2 = (x: string | undefined) => {
      if (x === undefined) return;
      const t = d.script[x];
      if (t !== undefined) set.add(d.swapEn[conversation.id + SEP + t] ?? t);
    };
    for (const t of script(conversation)) {
      en2(t.askTr);
      en2(t.cue);
      for (const x of t.replies ?? []) en2(x.sayTr);
      en2(t.fallback?.sayTr);
    }
    return set;
  };
  const before = english(raw);
  const after = english(dict);

  for (const [from, to] of r.en) {
    en++;
    if (!before.has(from)) H(`[${r.conversation}] çözülmüş İngilizcede yok: «${from}»`);
    if (LEFTOVER.test(to)) H(`[${r.conversation}] takas iz bırakıyor: «${to}»`);
  }

  /* Almanca takas edilip İngilizce alıntısı unutulmuş olabilir: takastan
     SONRA kalan her iz bildiriliyor. Bunlar `en` listesine girmeli. */
  for (const t of after) if (LEFTOVER.test(t)) H(`[${r.conversation}] İngilizcede iz kaldı: «${t}»`);

  /*
    SOHBET SENARYOSU UYARI, HATA DEĞİL. `de-a1-sprachen`in senaryosu
    1:1 takasla düzelmiyor: muhatap "ich spreche Spanisch und Englisch.
    Sprichst du auch Englisch?" diyor ve sonra "Sprichst du Türkisch?"
    sorusunu bekliyor. Öğrencinin ana dili İngilizce olunca konuşma
    kendi kendini yiyor — "İngilizce biliyor musun?" sorusuna "o benim
    dilim" cevabı akışı bitirir. Burada gereken takas değil BAŞKA BİR
    SENARYO. Kapı bunu susarak geçmiyor ama iş bitene kadar da
    durdurmuyor: bilinen ve yazılı bir açık.
  */
  for (const t of script(conversation)) {
    for (const x of [t.ask, ...(t.replies ?? []).map((y) => y.say), t.fallback?.say, t.fallback?.example])
      if (x && LEFTOVER.test(sw(r, x))) U(`[${r.conversation}] senaryoda iz kaldı: «${x}»`);
  }
}

/*
  REPO GENELİ TARAMA — bu eksenin "bitti dendikten sonra bulundu" alışkanlığını
  bitiren kısım. Yukarısı tablonun kaynakla tuttuğunu ölçüyor; burası tablonun
  EKSİK olup olmadığını. Bütün Almanca konuşmalar çözülüp takas uygulandıktan
  sonra kalan her iz bildiriliyor.

  Bilinen ve KARARA BAĞLANMIŞ istisnalar aşağıda tek tek yazılı. Yeni bir iz
  çıkarsa listede olmadığı için hata verir — karar ya tabloya ya da buraya
  yazılmak zorunda.
*/
const KEEP: Record<string, string> = {
  /* Artikelli ülke kalıbını ÖĞRETEN yer burası: 'aus der Türkei' artikel
     alıyor, 'aus Istanbul' almıyor ve konuşma tam bu karşıtlığı kuruyor.
     Cümleler "Örnek:" diye sunuluyor, öğrenciye atfedilmiyor. Aynı dize
     de-a1-du-oder-sie'de öğrencinin cevabı olarak geçiyor ve ORADA takas
     ediliyor — anahtarın konuşmaya bağlı olmasının sebebi bu. */
  "de-a1-hallo": "artikelli ülke kalıbını öğreten örnek",
  /* Üçüncü şahıs örneği: 'Sie spricht sowohl Deutsch als auch Türkisch.'
     Öğrenci hakkında bir iddia değil, iki parçalı bağlaç için uydurulmuş
     bir cümle. Almanca cümlenin TÜRKÇE parçanın içine gömülü olduğunu da
     burada öğrendik — alan adına bakan tarama onu göremiyor. */
  "de-b1-entweder-oder": "iki parçalı bağlaç için üçüncü şahıs örneği",
};

for (const conversation of CONVERSATIONS.filter((l) => l.course === "de")) {
  const out = resolveConversation(dict, conversation);
  if (!out) continue;
  const seen: string[] = [];
  for (const st of out.lecture ?? []) {
    const e = st.expect as { hint?: Segment[]; why?: Segment[]; target?: string } | undefined;
    for (const segs of [st.say, e?.hint, e?.why])
      for (const x of segs ?? []) if (LEFTOVER.test(x.text)) seen.push(x.text);
    if (e?.target && LEFTOVER.test(e.target)) seen.push(e.target);
  }
  for (const v of out.vocab ?? []) for (const x of [v.de, v.tr]) if (LEFTOVER.test(x)) seen.push(x);
  const rp = out.chat as
    | { opening?: string; openingTr?: string; script?: ScriptTurn[] }
    | undefined;
  for (const x of [rp?.opening, rp?.openingTr]) if (x && LEFTOVER.test(x)) seen.push(x);
  for (const t of rp?.script ?? [])
    for (const x of [
      t.ask,
      t.askTr,
      t.cue,
      ...(t.replies ?? []).flatMap((y) => [y.say, y.sayTr]),
      t.fallback?.say,
      t.fallback?.sayTr,
      t.fallback?.example,
    ])
      if (x && LEFTOVER.test(x)) seen.push(x);
  if (seen.length && !KEEP[conversation.id])
    for (const x of [...new Set(seen)]) H(`[${conversation.id}] karara bağlanmamış iz: «${x}»`);
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.join("\n"));
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.join("\n"));
}
console.log(
  `\nözet: ${rows.length} konuşma · ${de} Almanca · ${en} İngilizce takas · ` +
    `${Object.keys(KEEP).length} karara bağlı istisna · ${errors.length} hata · ${warnings.length} uyarı`,
);
process.exit(errors.length ? 1 : 0);
