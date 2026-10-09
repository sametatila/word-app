/*
  Sosyal video içerik yardımcıları (Node). Bölüm dosyaları (data/social/episodes/*.mjs) içeriklerini YALNIZ
  bunlarla kurar: her şey data/app/words.json'dan, ses Defne'nin yayındaki kayıtlarından (tts-test
  yayin/tts-map.json; bekletmedeki kayıt kullanılmaz). Kayıt ya da ses yoksa hata verir: videoya uydurma içerik
  ya da sessiz satır girmesin.

  Her yardımcı kullandığı kelime kaydını `used` kümesine yazar ("w:<id>"); tekrar engeli (check.mjs) bölümler
  arasındaki çakışmayı buradan hesaplar.
*/
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
// Mac: tts-test yayın klasörü; sunucu: TTS_OWN_DIR (/opt/lernomi/tts-own, aynı düzen). TTS_DIR ikisini de ezer.
export const TTS = process.env.TTS_DIR || process.env.TTS_OWN_DIR || path.join(process.env.HOME, "Workspace/tts-test/yayin");

let cache = null;
function load() {
  if (cache) return cache;
  cache = {
    words: JSON.parse(fs.readFileSync(path.join(ROOT, "data/app/words.json"), "utf8")),
    map: JSON.parse(fs.readFileSync(path.join(TTS, "tts-map.json"), "utf8")),
    hold: JSON.parse(fs.readFileSync(path.join(TTS, "tts-hold.json"), "utf8")),
    confusables: JSON.parse(fs.readFileSync(path.join(ROOT, "data/content/confusables.json"), "utf8")),
  };
  return cache;
}

/** Ortak ön ek ve son ek dışında kalan, iki kelimeyi ayıran kısım (büyük/küçük harf duyarsız). */
function diff(a, b) {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  let p = 0;
  while (p < x.length && p < y.length && x[p] === y[p]) p++;
  let s = 0;
  while (s < x.length - p && s < y.length - p && x[x.length - 1 - s] === y[y.length - 1 - s]) s++;
  const cut = (w) => ({ pre: w.slice(0, p), mid: w.slice(p, w.length - s), post: w.slice(w.length - s) });
  return [cut(a), cut(b)];
}

/**
 * Bir bölüm için yardımcılar. clips: sayfaya gömülecek sesler (metin → {dur, b64}), bölümler arasında paylaşılır.
 * Dönen `used`: bu bölümün kullandığı kelime kayıtları.
 */
export function helpers(clips) {
  const { words, map, hold, confusables } = load();
  const used = new Set();
  const spoken = new Set(); // bu bölümün klipleri (clips bölümler arasında paylaşılıyor)

  /** Kelime kaydı: "der Löffel" ya da "frühestens". */
  function word(full) {
    const m = full.match(/^(der|die|das) (.+)$/);
    const w = words.find((x) => x.de === (m ? m[2] : full) && (x.artikel || "") === (m ? m[1] : ""));
    if (!w) throw new Error(`words.json'da yok: ${full}`);
    used.add(`w:${w.id}`);
    return { id: w.id, de: w.de, artikel: w.artikel, tr: w.tr, niveau: w.niveau, formen: w.formen, typ: w.typ, beispiel: w.beispiel, beispielTr: w.beispielTr };
  }
  const label = (w) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

  /** Defne'nin kaydı; yoksa ya da bekletiliyorsa durur. */
  function clip(text) {
    spoken.add(text);
    if (clips[text]) return clips[text];
    const key = `defne|de|${text}`;
    const file = map[key];
    if (!file) throw new Error(`ses yok: ${key}`);
    if (hold[key]) throw new Error(`ses bekletmede: ${key}`);
    const abs = path.join(TTS, "m4a", file);
    const dur = Number(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", abs]).stdout.toString().trim());
    if (!dur) throw new Error(`süre okunamadı: ${abs}`);
    return (clips[text] = { dur: Math.round(dur * 1000) / 1000, b64: fs.readFileSync(abs).toString("base64") });
  }

  /** Diyalog satırı: cümle, sahibi olan kelime kaydının örneği (Türkçe ve anahtar kelime aynı kayıttan). */
  const line = (l) => {
    const w = word(l.key);
    clip(w.beispiel);
    return { ...l, de: w.beispiel, tr: w.beispielTr, keyDe: label(w), keyTr: w.tr };
  };
  /** Artikel turu: yalnız kelimenin sesi. extra: kelimeye göre ek alan (simge, ek vurgusu…). */
  const quiz = (list, extra = {}) =>
    list.map((full) => {
      const w = word(full);
      clip(label(w));
      return { ...w, ...(extra[w.de] || {}) };
    });
  /** Kelime kartı: kelimenin ve örnek cümlenin sesi. */
  const deck = (list) =>
    list.map((full) => {
      const w = word(full);
      clip(label(w));
      clip(w.beispiel);
      return w;
    });
  /** "Hangisini duydun?" çifti: confusables.json'da olmalı; play = sesle çalınan (0 = a, 1 = b). */
  function pair(la, lb, play) {
    const a = word(la);
    const b = word(lb);
    if (!confusables.pairs.some((p) => (p.a === a.de && p.b === b.de) || (p.a === b.de && p.b === a.de))) throw new Error(`confusables'ta yok: ${la} / ${lb}`);
    clip(label(a));
    clip(label(b));
    const [da, db] = diff(a.de, b.de);
    return { a: { ...a, label: label(a), parts: da }, b: { ...b, label: label(b), parts: db }, play };
  }
  /** "Cümleyi kur" cümlesi: sahibi olan kelimenin örnek cümlesi; tip.mark: vurgulanan kelime sıraları, tip.text: kesin dilbilgisi notu. */
  function sentence(key, mark, text) {
    const w = word(key);
    clip(w.beispiel);
    return { de: w.beispiel, tr: w.beispielTr, tip: { mark, text } };
  }

  return { H: { word, label, clip, line, quiz, deck, pair, sentence, confusables }, used, spoken };
}
