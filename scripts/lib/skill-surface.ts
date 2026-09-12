/**
 * Egzersizin ÖLÇÜLECEK YÜZEYİ — üç denetleyicinin ortak parçası.
 *
 * `check-unit-vocab` (Almanca), `check-en-unit-vocab` (İngilizce) ve
 * `check-path-gap` (ikisi birden) aynı soruyu soruyor: bu egzersizde öğrenci
 * HANGİ hedef dil metnini görüyor? Cevap hiç de bariz değil ve her biri
 * ayrı bir hatanın izini taşıyor — Türkçe soru kökü, satır başındaki
 * konuşmacı adı, e-posta adresi, Türkçe brifing bloğu. Üç kopya tutmak
 * bunların birinde düzelip ötekinde kalması demekti; `vocab-gate.cjs`in
 * başında yazan gerekçenin aynısı.
 *
 * İki dilin yüzeyi AYRI fonksiyon, çünkü alan kümeleri de ayrı: Almanca
 * pakette `speaking` görevinin metni `de` alanında, İngilizcede öyle bir
 * görev yok; İngilizce pakette `alternatives` ve `accept` var, Almancada
 * `accept` soru üstünde. Tek gövdede birleştirmek ikisini de okunmaz yapardı.
 */
import { createRequire } from "node:module";
import type { SkillExercise } from "../../src/lib/skills/types";

const require = createRequire(import.meta.url);
const { türkçeMi } = require("./vocab-gate.cjs") as { türkçeMi: (s: string) => boolean };

/**
 * Egzersizin GEVŞEK görünümü — yalnız burada okunan alanlar.
 *
 * `any` yerine bu: paket birden çok egzersiz türü taşıyor (quiz, konuşma,
 * yazma) ve hepsinin alanları farklı, ama bu betik yalnız metin yüzeyini
 * topluyor. Hepsini isteğe bağlı alanlarla tarif etmek, `any`nin verdiği
 * özgürlüğü koruyup yanlış alan adını yakalama yeteneğini geri kazandırıyor:
 * `e.txet` artık derlemede patlıyor.
 */
export type Gloss = { de?: string; tr?: string };
export type LooseTask = {
  de?: string;
  answer?: string;
  source?: string;
  sample?: string;
  stimulus?: string;
  kind?: string;
  /** Yazma görevinde kalıp sözlükçesi; bazı pakette `words` adıyla. */
  phrases?: Gloss[];
  words?: Gloss[];
  fields?: { answer?: string }[];
};
export type LooseExercise = {
  id: string;
  skill?: string;
  text?: string;
  /** Egzersizin kendi sözlükçesi — kapı dışı sayılmaz. */
  gloss?: Gloss[];
  /** Patika ünitesi (varsa): kapı seviyesi buna göre seçiliyor. */
  unit?: number;
  segments?: { text?: string }[];
  questions?: { text?: string; accept?: string[] }[];
  tasks?: LooseTask[];
};


/** Egzersizin ölçülecek Almanca yüzeyi. Türkçe alanlar dışarıda. */
export function germanSurface(e: LooseExercise): string {
  const out: string[] = [];
  if (e.text) out.push(e.text);
  for (const s of e.segments || []) if (s.text) out.push(s.text);
  // Şıklar Türkçe olabiliyor ("samimi (du)"); Almanca ölçümüne sokmuyoruz.
  for (const q of e.questions || []) {
    if (q.text && !türkçeMi(q.text)) out.push(q.text);
    for (const a of q.accept || []) out.push(a);
  }
  for (const t of e.tasks || []) {
    // Konuşma görevinin söylenecek metni `de` alanında; ölçüm dışında kalıyordu.
    if (e.skill === "speaking" && t.de) out.push(t.de);
    if (t.answer) out.push(t.answer);
    if (t.source && !türkçeMi(t.source)) out.push(t.source);
    if (t.sample) out.push(t.sample);
    /* UYARAN ÇOĞUNLUKLA ALMANCA AMA HEPSİ DEĞİL. `stimulus` genelde
       öğrencinin okuyup cevapladığı metin (e-posta, ilan, mesaj) ve Almanca;
       ama 23 görevde Türkçe bir brifing bloğu ("DURUM — … ELİNDEKİ VERİ: …",
       biri A2'de, yirmi ikisi C1'in `-w2` görevlerinde). Almanca ölçümüne
       sokulunca her satırı kapı dışı sayılıyordu: `c1-u09-w2` %12,1 dışı
       görünüyor ve işaretlenen 21 sözcüğün hepsi Türkçeydi (durum, ekip,
       gerginlik, teslim, ertelendi). `source` alanı aynı nedenle zaten
       süzülüyordu; uyaran atlanmıştı. Mobil tarafta ayrımı `isTurkishStem`
       yapıyor, burada `türkçeMi`. */
    if (t.stimulus && !türkçeMi(t.stimulus)) out.push(t.stimulus);
    for (const f of t.fields || []) if (f.answer) out.push(f.answer);
  }
  return out.join(" ");
}

/** Egzersizin öğrencinin gördüğü İNGİLİZCE yüzeyi; Türkçe alanlar dışarıda. */
export function englishSurface(e: SkillExercise): string {
  const out: string[] = [];
  const tr = (s: string) => /[ığşĞİŞ]|iyor|mek\b|mak\b/.test(s);
  if (e.skill === "reading") out.push(...e.text.split("\n"));
  if (e.skill === "listening") for (const s of e.segments) out.push(s.text);
  if (e.skill === "reading" || e.skill === "listening") {
    for (const q of e.questions) {
      if (!tr(q.text)) out.push(q.text);
      for (const o of q.options ?? []) if (!tr(o)) out.push(o);
      for (const a of q.accept ?? []) out.push(a);
      for (const i of q.items ?? []) if (!tr(i)) out.push(i);
    }
  }
  if (e.skill === "writing") {
    for (const t of e.tasks) {
      if ("answer" in t && t.answer) out.push(t.answer);
      if ("alternatives" in t) out.push(...(t.alternatives ?? []));
      if ("sample" in t && t.sample) out.push(t.sample);
      if ("stimulus" in t && t.stimulus) out.push(t.stimulus);
      if ("source" in t && t.source) out.push(t.source);
      if ("fields" in t) for (const f of t.fields) out.push(f.answer, ...(f.accept ?? []));
      if ("phrases" in t) for (const p of t.phrases) out.push(p.de);
      if ("words" in t) for (const p of t.words) out.push(p.de);
    }
  }
  /* KONUŞMACI ETİKETİ DE SÖZCÜK DEĞİL. Dinleme egzersizinde konuşmacı
     kendi alanında duruyor (`segments[].speaker`) ve ölçüme hiç girmiyor;
     okuma diyaloğunda ise tek metin bloğunun içinde, satır başında
     "Mert: " olarak yazılıyor. Ölçüm ikisine aynı gözle bakmalı, yoksa
     yalnızca biçim yüzünden aynı ad bir egzersizde sayılıyor ötekinde
     sayılmıyordu. Üstelik satır başındaki ad, ortak makinenin özel-ad
     kuralının TEK kör noktası: cümle başı sayıldığı için büyük harf onu
     kurtarmıyor. */
  const clean = out.join(" | ").replace(/(^|\| )\s*[A-Z][\w.']*(?: [A-Z][\w.']*)?:\s/g, "$1");
  /* E-POSTA VE AĞ ADRESİ SÖZCÜK DEĞİL. Form egzersizinde
     "deniz.yalin@mail.com" geçiyor; ölçüm onu noktalarından bölüp dört
     ayrı "kelime" sayıyor ve hiçbiri havuzda olmadığı için egzersizi
     %10 dışı gösteriyordu. Adres bir dizedir, öğrencinin öğreneceği bir
     sözcük değil. */
  return clean.replace(/\S+@\S+/g, " ").replace(/https?:\/\/\S+/g, " ");
}

