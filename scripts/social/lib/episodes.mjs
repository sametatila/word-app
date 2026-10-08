/*
  Bölüm kaydı: data/social/episodes/<şablon>-<NNN>.mjs. Bir bölüm = bir şablon (scripts/social/templates/<şablon>.js)
  + o şablonun içeriği. Dosya:
    export default { template, status: "taslak" | "hazır" | "yayında", created, published?, content: (H) => ({...}) }

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
    out.push({ id, template: ep.template, approach: approachOf(ep.template), status: ep.status || "taslak", created: ep.created, published: ep.published, data, used: [...used] });
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
