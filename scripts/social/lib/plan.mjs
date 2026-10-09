/*
  Yayın takvimi dosyası data/social/plan.json: saati olan bölümlerin özeti. Web admin (Sosyal medya) bunu derleme
  anında içe alır; yayın durumu ve metrikler veritabanında (social_posts). Elle düzenlenmez: npm run social:plan -- --write.
*/
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT } from "./content.mjs";
import { berlinIso } from "./episodes.mjs";
import { OUT } from "./page.mjs";

export const PLAN = path.join(ROOT, "data/social/plan.json");

/** MP4 üretildiyse süresi (sn), yoksa null. */
function duration(id) {
  const mp4 = path.join(OUT, "out", id, `${id}.mp4`);
  if (!fs.existsSync(mp4)) return null;
  const s = Number(spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp4]).stdout.toString().trim());
  return s ? Math.round(s * 10) / 10 : null;
}

/** Takvim girdileri, saat sırasıyla. Süre bilinmiyorsa önceki plan.json'daki değer korunur. */
export function planEntries(episodes) {
  let prev = {};
  try {
    prev = Object.fromEntries(JSON.parse(fs.readFileSync(PLAN, "utf8")).episodes.map((e) => [e.id, e]));
  } catch {
    /* ilk yazım */
  }
  return episodes
    .filter((e) => e.slot)
    .sort((a, b) => a.slot.localeCompare(b.slot))
    .map((e) => {
      const c = e.data.copy || {};
      return {
        id: e.id,
        template: e.template,
        approach: e.approach,
        theme: e.theme,
        title: c.title || e.id,
        hook: (c.hook || []).join(" "),
        caption: c.caption || "",
        slot: e.slot,
        at: berlinIso(e.slot),
        status: e.status,
        published: e.published || null,
        duration: duration(e.id) ?? prev[e.id]?.duration ?? null,
      };
    });
}

export const planJson = (entries) => `${JSON.stringify({ note: "npm run social:plan -- --write ile üretilir, elle düzenlenmez", timezone: "Europe/Berlin", episodes: entries }, null, 2)}\n`;
