/**
 * Kendi seslerimizin (Defne/Aras) KAPSAM HESABI — `tts-own-coverage.ts` (elle, döküm dosyasından) ve
 * `tts-own-watch.ts` (sunucuda, canlı veritabanından) aynı hesabı kullansın diye burada.
 *
 * Kaynakların listesi ve neden öyle kurulduğu `tts-own-coverage.ts` başında.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { withArtikel, glossFor } from "../src/lib/option-label";
import { firstExample } from "../src/lib/example";
import { buildCloze, buildOrder } from "../src/lib/session";
import { pluralChoices } from "../src/lib/german";
import { splitForSpeech, tileSpeech } from "../src/lib/tts/text";
import { courseOrDefault, NATIVE_LANGS, PAIR_READY } from "../src/lib/courses";
import { OWN_CHARACTERS } from "../src/lib/tts/voices";
import { skipWord } from "../src/lib/voice-intent";
import { firstWordsFor } from "../src/lib/first-words";
import { walkLines } from "./tts-walk-jobs";

/** `words` tablosunun sese giden sütunları (veritabanı adlarıyla). */
export type WordRow = {
  id: number; de: string; artikel: string | null; tr: string; en: string | null; formen: string | null;
  typ: string; niveau: string; beispiel: string | null; de_gloss: string | null; rank: number | null; course: string;
};

/** Kursun sese gönderdiği bir (dil, metin, kaynak) üçlüsü. */
export type Need = { lang: string; text: string; field: string; w: WordRow };

/** Kursu hangi anadiller öğreniyor — yürüyüş modunun anlam sesi bu dillerde. */
const nativesFor = (course: string) => NATIVE_LANGS.filter((l) => PAIR_READY[l]?.includes(course as never));

/** Uygulamanın sese gönderebildiği bütün metinler. */
export function ownNeeds(rows: WordRow[]): Need[] {
  const needs: Need[] = [];
  const push = (w: WordRow, field: string, lang: string, text: string | null | undefined) => {
    if (!text?.trim()) return;
    // İstemci böyle bölüyor ve temizliyor (speak-button `speakGerman`, mobil `speakTarget`).
    for (const part of splitForSpeech(text)) needs.push({ lang, text: part, field, w });
  };

  for (const course of ["de", "en"] as const) {
    const pool = rows.filter((r) => r.course === course);
    const target = courseOrDefault(course).targetLang;
    // Oturum `words` satırını `RoundWord`e çeviriyor; buradaki işlevler yalnız bu alanları okuyor.
    const asRound = (r: WordRow) => ({ ...r, deGloss: r.de_gloss, beispielTr: null, beispielEn: null }) as never;
    for (const w of pool) {
      push(w, "word", target, withArtikel(w));
      if (w.artikel) {
        const pl = pluralChoices(w.de, w.formen, 3);
        if (pl) push(w, "plural", target, `die ${pl.answer}`);
      }
      push(w, "example", target, firstExample(w.beispiel)?.trim());

      const cloze = buildCloze(asRound(w), pool as never);
      if (cloze) {
        push(w, "cloze", target, cloze.sentence.replace(/_{2,}/, cloze.answer).replace(/\s+/g, " ").trim());
      }
      const order = buildOrder(asRound(w));
      if (order) {
        push(w, "order", target, `${order.answer.join(" ")}${order.tail}`);
        for (const t of order.answer) push(w, "token", target, tileSpeech(t));
      }
      for (const native of nativesFor(course)) {
        push(w, `gloss_${native}`, native, glossFor({ tr: w.tr, en: w.en, deGloss: w.de_gloss }, native)?.text);
      }
    }
  }

  /* Kelime tablosunun dışındaki iki küçük kaynak — sahte bir satırla aynı yoldan geçiyorlar. */
  const extra = (course: string, field: string, lang: string, text: string) =>
    push({ id: 0, de: text, artikel: null, tr: "", en: null, formen: null, typ: "", niveau: "A1", beispiel: null, de_gloss: null, rank: null, course }, field, lang, text);
  for (const course of ["de", "en"] as const) {
    const target = courseOrDefault(course).targetLang;
    extra(course, "walk_skip", target, skipWord(course));
    for (const native of NATIVE_LANGS) {
      for (const level of ["A1", "A2", "B1", "B2", "C1"]) {
        for (const fw of firstWordsFor(native, course, level)) extra(course, "first_word", target, withArtikel(fw));
      }
    }
  }

  for (const l of walkLines()) extra("de", l.field.replace(/[^\w]/g, "_"), l.lang, l.text);

  // Önizleme cümlesi bileşenden okunuyor (bileşeni içe aktarmak istemci kodunu da çekerdi).
  const picker = readFileSync(path.join(__dirname, "../src/components/voice-picker.tsx"), "utf8");
  for (const course of ["de", "en"] as const) {
    const m = picker.match(new RegExp(`^\\s+${course}: "(.+)",$`, "m"));
    if (!m) throw new Error(`voice-picker SAMPLE.${course} okunamadı`);
    extra(course, "voice_sample", courseOrDefault(course).targetLang, m[1]);
  }
  return needs;
}

export type FieldCount = { total: number; inMap: number; withheld: number; missing: number };

export type Coverage = {
  byField: Record<string, FieldCount>;
  /** Tabloda olmayan ve üretilmemiş anahtarlar (`ses|dil|metin`) ve onları isteyen ilk kaynak. */
  missing: { key: string; field: string }[];
  /** Üretim işi: aynı metin iki sese de gerekiyorsa bir kez. */
  jobs: Need[];
  /** Uygulamanın isteyebildiği bütün anahtarlar — tablodaki artıkları bulmak için. */
  needed: Set<string>;
};

/** Anahtar başına: tabloda mı, üretilmiş ama bekliyor mu, hiç yok mu. */
export function coverage(needs: Need[], map: Record<string, string>, produced: Record<string, "ok" | "warn"> = {}): Coverage {
  /* Aynı anahtar birçok kelimeden gelebilir ("die Hunde", "ich"): iş listesinde bir kez. */
  const byField: Record<string, FieldCount> = {};
  const jobs = new Map<string, Need>();
  const needed = new Set<string>();
  const missing: Coverage["missing"] = [];
  for (const n of needs) {
    for (const voice of OWN_CHARACTERS) {
      const key = `${voice}|${n.lang}|${n.text}`;
      if (needed.has(key)) continue;
      needed.add(key);
      const f = (byField[n.field] ??= { total: 0, inMap: 0, withheld: 0, missing: 0 });
      f.total++;
      if (map[key]) f.inMap++;
      else if (produced[key]) f.withheld++;
      else {
        f.missing++;
        missing.push({ key, field: n.field });
        if (!jobs.has(`${n.lang}|${n.text}`)) jobs.set(`${n.lang}|${n.text}`, n);
      }
    }
  }
  return { byField, missing, jobs: [...jobs.values()], needed };
}

/** tts-test `kelimeler.py` iş biçimi ({id, field, lang, niveau, rank, text, clean}), kolaydan zora. */
export function jobLines(jobs: Need[]): string[] {
  const lv = (x: string) => ["A1", "A2", "B1", "B2", "C1"].indexOf(x);
  return [...jobs]
    .sort((a, b) => lv(a.w.niveau) - lv(b.w.niveau) || (a.w.rank ?? 1e9) - (b.w.rank ?? 1e9) || a.w.id - b.w.id)
    .map((n, i) =>
      // `id` iş listesinde benzersiz olmalı (dosya adı `<id>_<field>`): aynı kelimenin birden çok sözcük
      // kutusu var, o yüzden sıra numarası ekleniyor.
      JSON.stringify({ id: `${n.w.course}${n.w.id}.${i}`, field: n.field, lang: n.lang, niveau: n.w.niveau, rank: n.w.rank, text: n.text, clean: n.text }),
    );
}
