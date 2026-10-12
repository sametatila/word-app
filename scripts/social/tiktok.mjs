#!/usr/bin/env node
/*
  TIKTOK YAYIN KONTROLÜ (sunucu, 2026-10-12; Samet: "tiktok tarafı için kontrolü nasıl yapacağız"). TikTok'ta yayın
  elle ya da TikTok'un zamanlayıcısıyla (API yok, docs/social/README.md "Platform API'leri"); Samet bölümü "Zamanlandı"
  yapıp videonun bağlantısını yazıyor. Bu işçi o bağlantıyı TikTok'un herkese açık oEmbed adresiyle yoklar:
  zamanlanmış (henüz yayında olmayan) video 400, yayındaki video 200 döner (2026-10-12 denendi; uygulama ve belirteç
  gerekmez).

    - Saatten 1 sa önce – 3 gün sonra: "scheduled" TikTok satırının bağlantısı yoklanır. 200 → "published"
      (published_at = görüldüğü an, external_id = video kimliği). Erken yayına çıkmışsa da yakalar.
    - Saatten 20 dk sonra hâlâ yayında değilse bir kez Telegram (TikTok zamanlayıcısı yayınlamamış olabilir);
      bağlantı yoksa saatinde bir kez Telegram (kontrol edilemiyor). Uyarı `job`ta (elle değişiklik siler).
    - Metrik yok (oEmbed sayı vermez); TikTok uygulaması kurulunca Display API.

  node scripts/social/tiktok.mjs --once   (sunucuda: /opt/lernomi/social-tt.sh, lernomi-social-tt.timer)
  node scripts/social/tiktok.mjs --check <bağlantı>   tek bağlantının durumu (yazmaz)

  Ortam: DATABASE_URL, TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID. Tek işçi: SOCIAL_DIR/tt.lock.
*/
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const SOCIAL_DIR = process.env.SOCIAL_DIR || "/opt/lernomi/social";
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const LOOK_BEFORE = HOUR;
const LOOK_AFTER = 3 * DAY;
const WARN_AFTER = 20 * MIN;
const log = (...a) => console.log(new Date().toISOString(), "[tt]", ...a);
const args = process.argv.slice(2);

/** "2026-10-12 07:30" (Berlin) → UTC ms (instagram.mjs ile aynı). */
function slotMs(slot) {
  const [d, t] = slot.split(" ");
  const guess = new Date(`${d}T${t}:00Z`);
  const off = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", timeZoneName: "longOffset" }).formatToParts(guess).find((p) => p.type === "timeZoneName").value;
  const m = /GMT([+-])(\d\d):(\d\d)/.exec(off);
  return guess.getTime() - (m ? (m[1] === "+" ? 1 : -1) * (Number(m[2]) * 60 + Number(m[3])) * MIN : 0);
}

/** "live" | "hidden" (henüz yayında değil, gizli ya da silinmiş) | null (geçici hata: sonra yine sorulur). */
async function probe(url) {
  try {
    const r = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(15_000) });
    if (r.status === 200) {
      const j = await r.json().catch(() => null);
      return j?.type === "video" ? "live" : null;
    }
    return r.status === 400 || r.status === 404 ? "hidden" : null;
  } catch {
    return null;
  }
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
async function telegram(text) {
  const { TELEGRAM_BOT_TOKEN: bot, TELEGRAM_CHAT_ID: chat } = process.env;
  if (!bot || !chat) return log("telegram (gönderilmedi):", text);
  try {
    await fetch(`https://api.telegram.org/bot${bot}/sendMessage`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML", disable_web_page_preview: true }) });
  } catch (e) {
    log("telegram gitmedi:", e.message);
  }
}

if (args.includes("--check")) {
  const url = args[args.indexOf("--check") + 1];
  console.log(url, "→", (await probe(url)) ?? "bilinmiyor (geçici hata)");
  process.exit(0);
}

const LOCK = path.join(SOCIAL_DIR, "tt.lock");
try {
  fs.mkdirSync(LOCK);
} catch {
  if (Date.now() - fs.statSync(LOCK).mtimeMs > 30 * MIN) fs.rmSync(LOCK, { recursive: true, force: true });
  process.exit(0);
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const q = (text, params) => pool.query(text, params);

try {
  const rows = (
    await q(
      `select p.id, p.episode_id, p.url, p.job, e.slot from social_posts p
       join social_episodes e on e.id = p.episode_id and e.archived_at is null
       where p.platform = 'tiktok' and p.status = 'scheduled' and e.slot is not null`,
    )
  ).rows;
  const now = Date.now();
  for (const r of rows) {
    const at = slotMs(r.slot);
    if (now < at - LOOK_BEFORE || now > at + LOOK_AFTER) continue;
    const job = r.job || {};
    const studio = `https://www.lernomi.app/studio/${esc(r.episode_id)}`;
    if (!r.url) {
      if (now >= at && !job.warnedAt) {
        await q("update social_posts set job = $2 where id = $1", [r.id, { ...job, warnedAt: new Date().toISOString(), error: "bağlantı yok, yayın kontrol edilemiyor" }]);
        await telegram(`<b>[UYARI] TikTok: "Zamanlandı" ama bağlantı yok</b>\n${esc(r.episode_id)} (${esc(r.slot)} Berlin)\nYayına çıktı mı kontrol edilemiyor; bağlantıyı stüdyoda yaz.\n${studio}`);
      }
      continue;
    }
    const state = await probe(r.url);
    if (state === "live") {
      const id = /\/video\/(\d+)/.exec(r.url)?.[1] ?? null;
      await q("update social_posts set status = 'published', external_id = coalesce($2, external_id), published_at = now(), job = null, updated_by = 'tiktok', updated_at = now() where id = $1 and status = 'scheduled'", [r.id, id]);
      log(`✓ ${r.episode_id} yayında: ${r.url}${job.warnedAt ? " (uyarıdan sonra)" : ""}`);
      if (job.warnedAt) await telegram(`<b>[BİLGİ] TikTok: geç de olsa yayında</b>\n${esc(r.episode_id)} (${esc(r.slot)} Berlin)\n${esc(r.url)}`);
    } else if (state === "hidden" && now >= at + WARN_AFTER && !job.warnedAt) {
      await q("update social_posts set job = $2 where id = $1", [r.id, { ...job, warnedAt: new Date().toISOString(), error: "saatinde yayına çıkmadı (TikTok'ta zamanlama, gizlilik ya da silinme)" }]);
      await telegram(`<b>[UYARI] TikTok: zamanlanan video saatinde yayına çıkmadı</b>\n${esc(r.episode_id)} (${esc(r.slot)} Berlin, ${Math.round((now - at) / MIN)} dk geçti)\nTikTok'ta zamanlamaya ve gizlilik ayarına bak. Çıkınca kendiliğinden "Yayında" olur.\n${esc(r.url)}\n${studio}`);
      log(`uyarı: ${r.episode_id} saatinde yayında değil`);
    }
  }
} catch (e) {
  log("hata:", e.message);
  process.exitCode = 1;
} finally {
  await pool.end();
  fs.rmSync(LOCK, { recursive: true, force: true });
}
