/**
 * Yazılan İngilizceyi çalışma anına bağlar: `node data/lessons/apply.mjs`
 *
 * Beş hat (`lecture`, `word`, `vocab`, `patterns`, `meta`) `out/` altında
 * elle yazılmış karşılıkları tutuyor ama HİÇBİRİ uygulamaya girmiyordu.
 * Bu betik onları tek bir üretilen sözlüğe topluyor; çözücü
 * (`src/lib/lessons/native.ts`) o sözlükten okuyor.
 *
 * ANAHTAR `lecture/make.mjs` İLE BİREBİR AYNI OLMAK ZORUNDA. Anlatım hattı
 * 8.788 dizenin 32'sini Almanca kelimeye göre BÖLÜYOR — "Türkçesi 'yüz'
 * demek" hem `hundert` hem `das Gesicht` için kullanılıyor ve İngilizcede
 * 'a hundred' ile 'face' aynı sözcük değil. Çözücü bu bölmeyi aynen
 * yapmazsa 66 satırın yarısı sessizce yanlış kelimeyi söyler:
 *
 *   düz anahtar       tr
 *   bölünmüş anahtar  tr + AYRAÇ + de
 *
 * `de`, adımda dizeden ÖNCE gelen Almanca parça — `make.mjs` de yalnız ona
 * bakıyor. AYRAÇ yazdırılamayan bir karakter: Türkçe metin boşluk da
 * noktalama da taşıyabildiği için ayracın metinde ASLA geçmeyeceğinden
 * emin olmak gerekiyor.
 *
 * Şablon ayrı: `word()` yardımcısı metni çalışma anında kuruyor, yani
 * ekrana çıkan dize `out/`ta yok. Çözücü onu çerçeve deseniyle tanıyıp
 * üç parçadan (kelime karşılığı + not + çerçeve) yeniden kuruyor.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const OUT = new URL("../../src/lib/lessons/generated/", import.meta.url).pathname;

/** Bileşik anahtarların ayracı — çözücüdeki `SEP` ile aynı olmak zorunda. */
const SEP = "\u0000";

const read = (line) => {
  const d = `${DIR}${line}/out/`;
  if (!existsSync(d)) return [];
  return readdirSync(d)
    .filter((x) => x.endsWith(".json"))
    .sort()
    .flatMap((f) => JSON.parse(readFileSync(d + f, "utf8")));
};

/** Anlatım: düz dizeler ve Almancaya göre bölünmüş olanlar ayrı iki sözlük. */
const lecture = {};
const lectureSplit = {};
for (const r of read("lecture")) {
  if (r.de) lectureSplit[r.tr + SEP + r.de] = r.en;
  else lecture[r.tr] = r.en;
}

/** Şablon: çerçeve, sıra sözcüğü ve not. */
const frames = {};
const ordinals = {};
const notes = {};
for (const r of read("word")) {
  if (r.kind === "frame") frames[r.tr] = r.en;
  else if (r.kind === "ordinal") ordinals[r.tr] = r.en;
  else notes[r.tr] = r.en;
}

/** Sözlükçe: `(ders, Almanca)` → İngilizce karşılık. Türetilenler + elle yazılanlar. */
const vocab = {};
const derived = `${DIR}vocab/derived.json`;
if (existsSync(derived))
  for (const r of JSON.parse(readFileSync(derived, "utf8"))) vocab[r.lesson + SEP + r.de] = r.en;
for (const r of read("vocab")) vocab[r.lesson + SEP + r.de] = r.en;

/** Kalıp notu ve ders başlığı/özeti — anahtarları kendi hatlarından geliyor. */
const patterns = {};
for (const r of read("patterns")) patterns[r.lesson + SEP + r.de] = r.en;
const meta = {};
for (const r of read("meta")) meta[r.lesson] = { title: r.titleEn, summary: r.summaryEn };

/*
  Rol yapma dört alan taşıyor ve biri kaymıştır: `openingEn`, Almanca
  `opening` repliğinin ANA DİLDEKİ karşılığı, yani kaynakta `openingTr`
  olan alanın yerini alıyor. Almanca replik olduğu gibi kalıyor — model
  onu konuşuyor.
*/
const roleplay = {};
for (const r of read("roleplay"))
  roleplay[r.lesson] = { scene: r.sceneEn, partner: r.partnerEn, openingTr: r.openingEn, goal: r.goalEn };

/**
 * Rol yapma SENARYOSU — anahtar dizenin kendisi. Alanların adı yok (kaynak
 * konumsal kısayollarla yazılmış), o yüzden metin anahtar oluyor.
 */
const script = {};
for (const r of read("script")) script[r.tr] = r.en;

/** Can-do ifadeleri — anahtar `id` (`A1.SPK.1`), kaynakta zaten var. */
const cando = {};
for (const r of read("cando")) cando[r.id] = r.en;

/**
 * Modül sınavı kâğıtları. Anahtar dizenin kendisi: aynı Türkçe on üç ayrı
 * alanda geçebiliyor (replik, soru kökü, ölçüt, yönerge) ve hepsinde aynı
 * şeyi söylüyor — çıkarıcı da zaten `tr`ye göre tekilleştiriyor.
 *
 * `canDo` BURADA YOK ve olmamalı: `ExamCando` tipinde `en` alanı zaten var
 * ve 290'ın 290'ı dolu. İkinci bir doğruluk kaynağı açmak, ikisi ayrışınca
 * hangisinin doğru olduğunu bilinemez hâle getirirdi.
 */
const exam = {};
for (const r of read("exam")) exam[r.tr] = r.en;

/*
  ALMANCA TAKASI — hat değil KARAR TABLOSU (`swap/en.json`, elle yazılıyor).
  Ders öğrenciye kendisi hakkında bir cümle söyletiyorsa ("Ich bin in Izmir
  geboren") o cümle Türk öğrenciye göre kurulmuş; İngilizce konuşan için
  yanlış. Diyalogdaki bir KİŞİNİN Türkiyeli olması ise içerik ve kalır.
  İngilizce taraf da dönüyor: Almancayı alıntılayan satır, altındaki cümle
  değişince yalan söylemeye başlar.
*/
const swap = {};
const swapEn = {};
const swapFile = `${DIR}swap/en.json`;
if (existsSync(swapFile))
  for (const r of JSON.parse(readFileSync(swapFile, "utf8"))) {
    for (const [from, to] of r.de) swap[r.lesson + SEP + from] = to;
    for (const [from, to] of r.en) swapEn[r.lesson + SEP + from] = to;
  }

const data = { lecture, lectureSplit, frames, ordinals, notes, vocab, patterns, meta, roleplay, cando, script, exam, swap, swapEn };

mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}native-en.json`, `${JSON.stringify(data)}\n`);

const n = (o) => Object.keys(o).length;
console.log(
  "native-en.json yazıldı\n" +
    `  anlatım ${n(lecture)} (+${n(lectureSplit)} bölünmüş) · çerçeve ${n(frames)} · sıra ${n(ordinals)} · not ${n(notes)}\n` +
    `  sözlükçe ${n(vocab)} · kalıp ${n(patterns)} · ders ${n(meta)} · rol yapma ${n(roleplay)} · can-do ${n(cando)} · senaryo ${n(script)} · sınav ${n(exam)}\n` +
    `  takas ${n(swap)} Almanca + ${n(swapEn)} İngilizce`,
);
