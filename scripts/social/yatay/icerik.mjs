/*
  YATAY BÖLÜMLER (YouTube uzun video, 2026-10-13): bölüm kaydı ve içerik yardımcıları.

  Bölüm dosyası data/social/yatay/<şablon>-<NNN>.mjs; stüdyodaki kimliği "yatay-<şablon>-<NNN>":
    export default { template, status: "taslak" | "hazır" | "yayında", created, slot?: "YYYY-AA-GG SS:DD",
                     ytTitle, content: (H) => ({ ...şablonun verisi }) }
  İçerik yalnız depodaki veriden (kelime havuzu, sınavlar, Patika konuşmaları, okuma metinleri) ya da elle yazılmış
  Türkçe anlatımdan; seslendirilen her metin bir SATIR: H.L(ses, dil, metin). Kaydı olmayan satır uydurulmaz:
  stüdyoda "Seslendirmeye gönder" ile Samet'e gider (Mac, dört ses), kayıt gelince önizleme ve onay açılır.

  Tekrar engeli: aynı şablonda bir kelime iki bölümde kullanılamaz (dikey videolarla ortak kelime serbest: uzun
  video pekiştirir).
*/
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
export const DIR = path.join(ROOT, "data/social/yatay");
export const TPL = path.join(ROOT, "scripts/social/yatay/sablonlar");
export const ID_PREFIX = "yatay-";
/** Saat serbest (dikeydeki üç saat değil); Berlin yerel saati. Önerilen 19:00 (Samet, 2026-10-13: 16 Ekim başlangıç). */
const SLOT_RE = /^(\d{4}-\d{2}-\d{2}) ([01]\d|2[0-3]):([0-5]\d)$/;

/** YouTube uzun video başlığı: en çok 100 karakter, < > yok, #shorts YOK (Shorts rafına düşmesin). */
export function ytTitleError(t) {
  if (typeof t !== "string" || !t.trim()) return "boş";
  if (t !== t.trim() || /\s{2,}|\n/.test(t)) return "baştaki/sondaki ya da çift boşluk, satır sonu olamaz";
  if (t.length > 100) return `en çok 100 karakter (${t.length})`;
  if (/[<>]/.test(t)) return "< ve > olamaz";
  if (/#shorts/i.test(t)) return "uzun videoda #shorts olmaz";
  return null;
}

let words = null;
const W = () => (words ||= JSON.parse(fs.readFileSync(path.join(ROOT, "data/app/words.json"), "utf8")));
let conf = null;
const confusables = () => (conf ||= JSON.parse(fs.readFileSync(path.join(ROOT, "data/content/confusables.json"), "utf8")).pairs);

/** İçerik yardımcıları; `used`: kullanılan kelime kayıtları ("w:<id>"). */
export function helpers() {
  const used = new Set();
  /** Satır: seslendirilen metin. x: kaydın türü ("listen" sınav dinlemesi, "listenSlow" yavaş okuma). */
  const L = (v, l, t, x) => (x ? { v, l, t, x } : { v, l, t });
  /** Kelime kaydı: "der Arzt" ya da "verschreiben". */
  function word(full) {
    const m = full.match(/^(der|die|das) (.+)$/);
    const w = W().find((x) => x.de === (m ? m[2] : full) && (x.artikel || "") === (m ? m[1] : ""));
    if (!w) throw new Error(`words.json'da yok: ${full}`);
    used.add(`w:${w.id}`);
    return w;
  }
  const label = (w) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);
  /**
   * Yürürken kelimesi: Türkçesi (Defne), kelime ve örnek cümle (de: Almanca ses, varsayılan Aras). Türkçe ve örnek
   * cümle kelime kaydının kendisinden (uygulamanın söylediği metnin aynısı: ses tablosunda aynı anahtar).
   */
  const walk = (full, { de = "aras" } = {}) => {
    const w = word(full);
    return { de: L(de, "de", label(w)), tr: L("defne", "tr", w.tr), ex: L(de, "de", w.beispiel), exTr: w.beispielTr, lv: w.niveau };
  };
  /**
   * "Hangisini duydun?" çifti: confusables.json'da olmalı, iki kelime aynı türde ve aynı artikelle (sesteki artikel
   * cevabı ele vermesin). play: çalınan (0 = a, 1 = b). Ses Defne'nin kelime kaydı.
   */
  const pair = (la, lb, play) => {
    const a = word(la);
    const b = word(lb);
    if (a.typ !== b.typ || (a.artikel || "") !== (b.artikel || "")) throw new Error(`çift aynı tür/artikel değil: ${la} / ${lb}`);
    if (!confusables().some((p) => (p.a === a.de && p.b === b.de) || (p.a === b.de && p.b === a.de))) throw new Error(`confusables'ta yok: ${la} / ${lb}`);
    return { a: { w: L("defne", "de", label(a)), tr: a.tr }, b: { w: L("defne", "de", label(b)), tr: b.tr }, play };
  };
  /**
   * Artikel kuralı sayımı (uygulamanın sözlüğünden): sufs ile biten isimler (en az suf + 2 harf), en sık artikel ve
   * istisnalar. expect { hit, all }: anlatımdaki sayı sözlükle tutmuyorsa durur (sözlük değişince seslendirme bayatlamasın).
   */
  const stats = (sufs, expect) => {
    const xs = W().filter((w) => w.typ === "Nomen" && w.artikel && sufs.some((sf) => w.de.toLowerCase().endsWith(sf) && w.de.length >= sf.length + 2));
    const by = {};
    for (const w of xs) by[w.artikel] = (by[w.artikel] || 0) + 1;
    const art = Object.keys(by).sort((p, q) => by[q] - by[p])[0];
    const out = { art, hit: by[art] || 0, all: xs.length, exceptions: xs.filter((w) => w.artikel !== art).map(label) };
    if (expect && (expect.hit !== out.hit || expect.all !== out.all)) throw new Error(`artikel sayımı değişti (${sufs.join("/")}): ${out.hit}/${out.all}, beklenen ${expect.hit}/${expect.all}`);
    return out;
  };
  /** Artikel örneği: kelimenin kaydı (Defne, artikelle) ve Türkçesi. */
  const art = (full) => {
    const w = word(full);
    return { w: L("defne", "de", label(w)), tr: w.tr };
  };
  return { H: { L, word, label, walk, pair, stats, art }, used };
}

/** Bütün yatay bölümler (ya da `only`). */
export async function loadLong(only = null) {
  const out = [];
  if (!fs.existsSync(DIR)) return out;
  for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith(".mjs")).sort()) {
    const stem = f.slice(0, -4);
    const id = ID_PREFIX + stem;
    if (only && !only.includes(id)) continue;
    const ep = (await import(path.join(DIR, f))).default;
    if (!ep?.template || typeof ep.content !== "function") throw new Error(`${f}: template ve content(H) gerekli`);
    if (!stem.startsWith(`${ep.template}-`)) throw new Error(`${f}: dosya adı şablonla başlamalı (${ep.template}-NNN)`);
    if (!fs.existsSync(path.join(TPL, `${ep.template}.js`))) throw new Error(`${f}: yatay şablon yok: ${ep.template}`);
    if (ep.slot !== undefined && !SLOT_RE.test(String(ep.slot))) throw new Error(`${f}: slot "${ep.slot}" geçersiz: "YYYY-AA-GG SS:DD"`);
    const err = ytTitleError(ep.ytTitle);
    if (err) throw new Error(`${f}: ytTitle ${err}`);
    const { H, used } = helpers();
    const data = ep.content(H);
    data.ui = { ...templateUi(ep.template), ...(data.ui || {}) }; // şablonun sabit yazıları veride: stüdyoda hepsi düzenlenir
    out.push({ id, format: "yatay", template: ep.template, status: ep.status || "taslak", created: ep.created, slot: ep.slot, ytTitle: ep.ytTitle, data, used: [...used], spoken: spokenOf(data) });
  }
  if (only) for (const id of only) if (!out.some((e) => e.id === id)) throw new Error(`yatay bölüm yok: ${id}`);
  return out;
}

/** Şablonun sabit yazıları (meta.ui): şablon betiği boş bir Y ile koşturulur, yalnız register yakalanır. */
const uiCache = new Map();
export function templateUi(template) {
  if (!uiCache.has(template)) {
    let meta = null;
    const Y = new Proxy({ register: (id, m) => (meta = m) }, { get: (o, k) => (k in o ? o[k] : () => {}) });
    vm.runInNewContext(fs.readFileSync(path.join(TPL, `${template}.js`), "utf8"), { window: { Y }, Y });
    if (!meta) throw new Error(`${template}: Y.register çağrılmadı`);
    uiCache.set(template, meta.ui || {});
  }
  return uiCache.get(template);
}

/** Satır nesneleri → ses anahtarları (motordaki Y.spoken'ın Node eşi; ikisi aynı kuralı izler). */
export function spokenOf(data) {
  const keys = new Set();
  const walk = (o) => {
    if (Array.isArray(o)) o.forEach(walk);
    else if (o && typeof o === "object") {
      if (typeof o.v === "string" && typeof o.l === "string" && typeof o.t === "string") {
        if (o.t.trim()) keys.add(`${o.v}|${o.l}|${o.t}${o.x ? `#${o.x}` : ""}`);
      } else Object.values(o).forEach(walk);
    }
  };
  walk(data);
  return [...keys];
}

/** Tekrar engeli: aynı şablonda ortak kelime → hata. */
export function longDuplicates(episodes) {
  const errors = [];
  const seen = new Map();
  for (const e of episodes) for (const k of e.used) (seen.get(k) || seen.set(k, []).get(k)).push(e);
  for (const [k, list] of seen) {
    const by = new Map();
    for (const e of list) (by.get(e.template) || by.set(e.template, []).get(e.template)).push(e.id);
    for (const [tpl, ids] of by) if (ids.length > 1) errors.push(`${k} aynı yatay seride (${tpl}) iki kez: ${ids.join(", ")}`);
  }
  return errors;
}

/** Takvim: bir güne tek yatay video; art arda iki bölüm aynı seride değil (uyarı). */
export function longSchedule(episodes) {
  const errors = [];
  const warnings = [];
  const list = episodes.filter((e) => e.slot).sort((a, b) => a.slot.localeCompare(b.slot));
  for (let i = 1; i < list.length; i++) {
    const [a, b] = [list[i - 1], list[i]];
    if (a.slot.slice(0, 10) === b.slot.slice(0, 10)) errors.push(`aynı gün iki yatay video: ${a.id}, ${b.id}`);
    if (a.template === b.template) warnings.push(`art arda aynı seri (${a.template}): ${a.id} → ${b.id}`);
  }
  return { errors, warnings };
}
