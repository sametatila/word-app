/*
  Bölüm kaydı: data/social/episodes/<şablon>-<NNN>.mjs. Bir bölüm = bir şablon (scripts/social/templates/<şablon>.js)
  + o şablonun içeriği. Dosya:
    export default { template, status: "taslak" | "hazır" | "yayında", created, slot?, published?, content: (H) => ({...}) }
  slot: yayın saati, Berlin yerel saati "YYYY-AA-GG SS:DD" (yalnız SLOTS saatleri). Takvim kuralları schedule()'da.

  TEKRAR ENGELİ: her bölümün kullandığı kelime kayıtları (H yardımcıları yazar) karşılaştırılır.
    - Aynı YAKLAŞIMDA (artikel, diyalog, kelime, duy, kur) bir kelime iki bölümde kullanılamaz → hata.
    - Farklı yaklaşımlar arasında ortak kelime → uyarı (bilerek pekiştirme olabilir, ama göz önünde olsun).
*/
import fs from "node:fs";
import path from "node:path";
import { ROOT, helpers } from "./content.mjs";

export const EP_DIR = path.join(ROOT, "data/social/episodes");
export const TPL_DIR = path.join(ROOT, "scripts/social/templates");
export const approachOf = (template) => template.split("-")[0];
export const themeOf = (template) => template.split("-")[1];
export const SLOTS = ["07:30", "12:30", "18:30"]; // Berlin; günde 3 video, iki platform (Samet, 2026-10-09)
const SLOT_RE = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})$/;

/** Bütün bölümler (ya da `only` listesindekiler) içerikleriyle; clips bütün bölümlerin sesleri. */
export async function loadEpisodes(only = null) {
  const clips = {};
  const out = [];
  const files = fs.readdirSync(EP_DIR).filter((f) => f.endsWith(".mjs")).sort();
  for (const f of files) {
    const id = f.slice(0, -4);
    if (only && !only.includes(id)) continue;
    const ep = (await import(path.join(EP_DIR, f))).default;
    if (!ep?.template || typeof ep.content !== "function") throw new Error(`${f}: template ve content(H) gerekli`);
    if (!id.startsWith(`${ep.template}-`)) throw new Error(`${f}: dosya adı şablonla başlamalı (${ep.template}-NNN)`);
    if (!fs.existsSync(path.join(TPL_DIR, `${ep.template}.js`))) throw new Error(`${f}: şablon yok: ${ep.template}`);
    const { H, used } = helpers(clips);
    const data = ep.content(H);
    if (ep.slot !== undefined) {
      const m = String(ep.slot).match(SLOT_RE);
      if (!m || !SLOTS.includes(m[2])) throw new Error(`${f}: slot "${ep.slot}" geçersiz: "YYYY-AA-GG SS:DD", saat ${SLOTS.join(" / ")}`);
    }
    out.push({ id, template: ep.template, approach: approachOf(ep.template), theme: themeOf(ep.template), status: ep.status || "taslak", created: ep.created, slot: ep.slot, published: ep.published, data, used: [...used] });
  }
  if (only) for (const id of only) if (!out.some((e) => e.id === id)) throw new Error(`bölüm yok: ${id}`);
  return { episodes: out, clips };
}

/** Tekrar denetimi: { errors, warnings } (metin satırları). */
export function duplicates(episodes) {
  const errors = [];
  const warnings = [];
  const seen = new Map(); // anahtar → [bölüm]
  for (const e of episodes) for (const k of e.used) (seen.get(k) || seen.set(k, []).get(k)).push(e);
  const { words } = { words: JSON.parse(fs.readFileSync(path.join(ROOT, "data/app/words.json"), "utf8")) };
  const name = (k) => {
    const w = words.find((x) => `w:${x.id}` === k);
    return w ? `${w.artikel ? w.artikel + " " : ""}${w.de}` : k;
  };
  for (const [k, list] of seen) {
    if (list.length < 2) continue;
    const byApproach = new Map();
    for (const e of list) (byApproach.get(e.approach) || byApproach.set(e.approach, []).get(e.approach)).push(e.id);
    for (const [ap, ids] of byApproach) if (ids.length > 1) errors.push(`"${name(k)}" aynı yaklaşımda (${ap}) iki kez: ${ids.join(", ")}`);
    if (byApproach.size > 1) warnings.push(`"${name(k)}" farklı yaklaşımlarda: ${list.map((e) => e.id).join(", ")}`);
  }
  return { errors, warnings };
}

/** Berlin yerel saati ("2026-10-12 07:30") → ISO, saat dilimi farkıyla ("2026-10-12T07:30:00+02:00"). */
export function berlinIso(slot) {
  const [d, t] = slot.split(" ");
  const guess = new Date(`${d}T${t}:00Z`);
  const off = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", timeZoneName: "longOffset" }).formatToParts(guess).find((p) => p.type === "timeZoneName").value; // "GMT+02:00"
  return `${d}T${t}:00${off === "GMT" ? "+00:00" : off.slice(3)}`;
}

/**
 * Takvim kuralları (yalnız slot'u olan bölümler): { errors, warnings }.
 *   - bir saate tek bölüm
 *   - aynı gün aynı yaklaşım iki kez yok
 *   - art arda iki bölüm aynı temada değil (izleyici akışta aynı görünümü üst üste görmesin)
 *   - farklı yaklaşımlarda ortak kelime 30 günden yakınsa hata (daha uzaksa duplicates() uyarısı kalır)
 */
export function schedule(episodes) {
  const errors = [];
  const warnings = [];
  const list = episodes.filter((e) => e.slot).sort((a, b) => a.slot.localeCompare(b.slot));
  for (let i = 1; i < list.length; i++) {
    const [a, b] = [list[i - 1], list[i]];
    if (a.slot === b.slot) errors.push(`aynı saat ${a.slot}: ${a.id}, ${b.id}`);
    else if (a.theme === b.theme) errors.push(`art arda aynı tema (${a.theme}): ${a.id} ${a.slot} → ${b.id} ${b.slot}`);
  }
  const days = new Map();
  for (const e of list) (days.get(e.slot.slice(0, 10)) || days.set(e.slot.slice(0, 10), []).get(e.slot.slice(0, 10))).push(e);
  for (const [d, es] of days) {
    const seen = new Map();
    for (const e of es) {
      if (seen.has(e.approach)) errors.push(`${d}: aynı gün iki ${e.approach}: ${seen.get(e.approach)}, ${e.id}`);
      seen.set(e.approach, e.id);
    }
  }
  const DAY = 86400000;
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++) {
      const [a, b] = [list[i], list[j]];
      if (a.approach === b.approach) continue; // aynı yaklaşım: duplicates() her zaman hata verir
      if (new Date(berlinIso(b.slot)) - new Date(berlinIso(a.slot)) >= 30 * DAY) continue;
      const common = a.used.filter((k) => b.used.includes(k));
      if (common.length) errors.push(`30 günden yakın ortak kelime (${common.length}): ${a.id} ${a.slot.slice(0, 10)} ↔ ${b.id} ${b.slot.slice(0, 10)}`);
    }
  const unscheduled = episodes.filter((e) => !e.slot && e.status === "hazır").map((e) => e.id);
  if (unscheduled.length) warnings.push(`saati olmayan hazır bölüm: ${unscheduled.join(", ")}`);
  return { errors, warnings };
}
