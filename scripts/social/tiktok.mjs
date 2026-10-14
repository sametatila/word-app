#!/usr/bin/env node
/*
  TIKTOK İŞÇİSİ (sunucu, 2026-10-12; Samet: "tiktok api'yi de senin ve benim metrikleri incelemem için yapmalıyız").
  TikTok'ta yayın elle ya da TikTok'un zamanlayıcısıyla (yayın API'si denetimden geçmez, docs/social/README.md
  "Platform API'leri"); Samet bölümü "Zamanlandı" yapıp videonun bağlantısını yazıyor. systemd 5 dakikada bir.

  API (Login Kit + `video.list`, `user.info.stats`; uygulama "Lernomi", sandbox, hesap Lernomi App):
    1. BELİRTEÇ: SOCIAL_DIR/tiktok/token.json (600; erişim 24 sa, yenileme 365 gün; uygulama anahtarları da içinde çünkü
       yenileme onları ister). Erişim belirtecinin 2 saatten azı kalınca yenilenir. Yenileme belirtecine 14 günden az
       kaldıysa ya da bağlantı 1 saattir kopuksa Telegram.
    2. EŞİTLEME: hesabın videoları (yalnız yayındakiler; zamanlanmış video listede yok) önce Samet'in yazdığı bağlantıdaki
       kimlikle, yoksa saatinden bölüme eşlenir (saatten 30 dk önce – 3 sa sonra; her saatte tek bölüm). Eşleşen satır
       "published" olur. METRİKLER (views, likes, comments, shares): tek istekte bütün videolar geldiği için 90 güne kadar
       her koşuda (5 dk; stüdyodaki "Eşitleme N dk" metriklerin yaşı da olsun, 2026-10-14). Geçmiş tablosu yine en çok
       saatte bir (lib/stats.mjs). Hesap: takipçi ve video sayısı status.json'a (stüdyo takvimi "TikTok API" etiketi).
  YEDEK (belirteç yoksa ya da API hata verirse): herkese açık oEmbed (`/oembed?url=`): zamanlanmış/gizli video 400,
  yayındaki 200 (2026-10-12 denendi). Metrik vermez.
  İkisinde de: "scheduled" satır saatten 20 dk sonra hâlâ yayında değilse bir kez Telegram; bağlantısı ve API'si yoksa
  saatinde bir kez Telegram. Uyarı `job`ta (elle değişiklik siler).

  node scripts/social/tiktok.mjs --once              (sunucuda: /opt/lernomi/social-tt.sh, lernomi-social-tt.timer)
  node scripts/social/tiktok.mjs --check [bağlantı]  hesap + belirteç durumu; bağlantı verilirse oEmbed (yazmaz)

  Ortam: DATABASE_URL, SOCIAL_DIR, TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID. Tek işçi: SOCIAL_DIR/tt.lock.
*/
import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import { recordStats } from "./lib/stats.mjs";

const SOCIAL_DIR = process.env.SOCIAL_DIR || "/opt/lernomi/social";
const TT_DIR = path.join(SOCIAL_DIR, "tiktok");
const TOKEN_FILE = path.join(TT_DIR, "token.json");
const STATUS_FILE = path.join(TT_DIR, "status.json");
const API = "https://open.tiktokapis.com/v2";
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const LOOK_BEFORE = HOUR;
const LOOK_AFTER = 3 * DAY;
const WARN_AFTER = 20 * MIN;
const METRICS_FOR = 90 * DAY;
const log = (...a) => console.log(new Date().toISOString(), "[tt]", ...a);
const args = process.argv.slice(2);

// ---------- yardımcılar ----------
const readJson = (f, d) => {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return d;
  }
};
/** Atomik yazma (yarım dosya kalmasın); belirteç dosyası 600. */
function writeJson(f, v, mode = 0o644) {
  const tmp = `${f}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(v, null, 1), { mode });
  fs.renameSync(tmp, f);
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
/** "2026-10-12 07:30" (Berlin) → UTC ms (instagram.mjs ile aynı). */
function slotMs(slot) {
  const [d, t] = slot.split(" ");
  const guess = new Date(`${d}T${t}:00Z`);
  const off = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", timeZoneName: "longOffset" }).formatToParts(guess).find((p) => p.type === "timeZoneName").value;
  const m = /GMT([+-])(\d\d):(\d\d)/.exec(off);
  return guess.getTime() - (m ? (m[1] === "+" ? 1 : -1) * (Number(m[2]) * 60 + Number(m[3])) * MIN : 0);
}
const videoIdOf = (url) => /\/video\/(\d+)/.exec(url || "")?.[1] ?? null;

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

// ---------- API ----------
async function tt(method, pathname, token, body) {
  const r = await fetch(`${API}${pathname}`, {
    method,
    headers: { authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30_000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || (j.error && j.error.code !== "ok")) throw new Error(`${pathname}: ${r.status} ${j.error?.code ?? ""} ${j.error?.message ?? ""}`.trim());
  return j.data;
}

/** Erişim belirtecinin 2 saatten azı kaldıysa yenile; TikTok yeni yenileme belirteci de verebilir. */
async function freshToken(t) {
  if (Date.parse(t.expiresAt || 0) - Date.now() > 2 * HOUR) return t;
  const r = await fetch(`${API}/oauth/token/`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_key: t.clientKey, client_secret: t.clientSecret, grant_type: "refresh_token", refresh_token: t.refreshToken }),
    signal: AbortSignal.timeout(30_000),
  });
  const j = await r.json().catch(() => ({}));
  if (!j.access_token) throw new Error(`belirteç yenilenemedi: ${j.error ?? r.status} ${j.error_description ?? ""}`.trim());
  const now = Date.now();
  const next = {
    ...t,
    accessToken: j.access_token,
    refreshToken: j.refresh_token || t.refreshToken,
    expiresAt: new Date(now + j.expires_in * 1000).toISOString(),
    refreshExpiresAt: j.refresh_expires_in ? new Date(now + j.refresh_expires_in * 1000).toISOString() : t.refreshExpiresAt,
    refreshedAt: new Date(now).toISOString(),
  };
  writeJson(TOKEN_FILE, next, 0o600);
  log("belirteç yenilendi");
  return next;
}

async function listVideos(token) {
  const out = [];
  let cursor;
  for (let page = 0; page < 10; page++) {
    const d = await tt("POST", "/video/list/?fields=id,create_time,share_url,view_count,like_count,comment_count,share_count,duration", token, { max_count: 20, ...(cursor ? { cursor } : {}) });
    out.push(...(d.videos || []));
    if (!d.has_more) break;
    cursor = d.cursor;
  }
  return out;
}

// ---------- komutlar ----------
if (args.includes("--check")) {
  const url = args[args.indexOf("--check") + 1];
  if (url) {
    console.log(url, "→", (await probe(url)) ?? "bilinmiyor (geçici hata)");
  } else {
    const t = await freshToken(readJson(TOKEN_FILE, null) ?? (console.log("belirteç yok:", TOKEN_FILE), process.exit(1)));
    const u = (await tt("GET", "/user/info/?fields=display_name,follower_count,video_count", t.accessToken)).user;
    const v = await listVideos(t.accessToken);
    const days = (s) => ((Date.parse(s || 0) - Date.now()) / DAY).toFixed(1);
    console.log(`${u.display_name}: ${u.follower_count} takipçi, ${u.video_count} video (listede ${v.length}); erişim ${days(t.expiresAt)} gün, yenileme ${days(t.refreshExpiresAt)} gün`);
  }
  process.exit(0);
}

fs.mkdirSync(TT_DIR, { recursive: true, mode: 0o700 });
const LOCK = path.join(SOCIAL_DIR, "tt.lock");
try {
  fs.mkdirSync(LOCK);
} catch {
  if (Date.now() - fs.statSync(LOCK).mtimeMs > 30 * MIN) fs.rmSync(LOCK, { recursive: true, force: true });
  process.exit(0);
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const q = (text, params) => pool.query(text, params);
const status = readJson(STATUS_FILE, {});

async function markPublished(rowId, video, url, why) {
  await q(
    `update social_posts set status = 'published', external_id = coalesce($2, external_id), url = coalesce(url, $3),
       published_at = coalesce($4, now()), job = null, updated_by = 'tiktok', updated_at = now() where id = $1`,
    [rowId, video?.id ?? videoIdOf(url), video?.share_url ?? url, video?.create_time ? new Date(video.create_time * 1000) : null],
  );
  log(`✓ yayında (${why}):`, url ?? video?.share_url);
}

/** API ile: videoları bölümlere eşle, metrikleri yaz. Dönen küme yayında görülen video kimlikleri. */
async function syncApi(t) {
  const u = (await tt("GET", "/user/info/?fields=display_name,follower_count,video_count", t.accessToken)).user;
  const videos = await listVideos(t.accessToken);
  Object.assign(status, { ok: true, username: u.display_name, followers: u.follower_count, videoCount: u.video_count, error: null, lastSyncAt: new Date().toISOString() });

  // 3 dakikadan uzun video (yatay denemesi, 2026-10-13) yalnız yatay bölümle, kısa video yalnız dikeyle eşleşir:
  // 19:00'daki uzun video 18:30 Short'unun penceresine düşüyor
  const eps = (await q("select id, slot, format from social_episodes where archived_at is null and slot is not null")).rows.map((r) => ({ id: r.id, slot: r.slot, at: slotMs(r.slot), long: r.format === "yatay" }));
  const rows = (await q("select id, episode_id, status, url, external_id, metrics_at from social_posts where platform = 'tiktok'")).rows;
  const byExt = new Map(rows.filter((r) => r.external_id).map((r) => [r.external_id, r]));
  const byUrlId = new Map(rows.filter((r) => videoIdOf(r.url)).map((r) => [videoIdOf(r.url), r]));
  const now = Date.now();
  for (const v of videos) {
    const ts = v.create_time * 1000;
    let row = byExt.get(v.id) || byUrlId.get(v.id);
    if (!row) {
      const long = (v.duration ?? 0) > 180;
      const cand = eps.filter((e) => e.long === long && ts >= e.at - 30 * MIN && ts <= e.at + 3 * HOUR).sort((a, b) => Math.abs(ts - a.at) - Math.abs(ts - b.at))[0];
      if (!cand) continue; // planda olmayan video
      const cur = rows.find((r) => r.episode_id === cand.id);
      if (cur?.external_id && cur.external_id !== v.id) continue; // bölüm başka videoyla eşleşmiş
      if (cur && (cur.status === "skipped" || (videoIdOf(cur.url) && videoIdOf(cur.url) !== v.id))) continue; // atlandı ya da başka bağlantı yazılmış
      if (!cur) {
        await q("insert into social_posts (episode_id, platform, status, updated_by) values ($1, 'tiktok', 'scheduled', 'tiktok') on conflict do nothing", [cand.id]);
      }
      row = (await q("select id, episode_id, status, url, external_id, metrics_at from social_posts where episode_id = $1 and platform = 'tiktok'", [cand.id])).rows[0];
      log(`eşleşti: ${cand.id} ← ${v.share_url}`);
    }
    if (row.status !== "published" || row.external_id !== v.id) await markPublished(row.id, v, row.url, "API");
    if (now - ts < METRICS_FOR) {
      const metrics = { views: v.view_count ?? 0, likes: v.like_count ?? 0, comments: v.comment_count ?? 0, shares: v.share_count ?? 0 };
      await q("update social_posts set metrics = $2, metrics_at = now() where id = $1", [row.id, metrics]);
    }
  }
  status.metricsAt = new Date().toISOString();
  return new Set(videos.map((v) => v.id));
}

/** Saatinde yayına çıktı mı: API listesi (varsa) ya da oEmbed. */
async function watchScheduled(live) {
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
    if (!r.url && !live) {
      if (now >= at && !job.warnedAt) {
        await q("update social_posts set job = $2 where id = $1", [r.id, { ...job, warnedAt: new Date().toISOString(), error: "bağlantı yok, yayın kontrol edilemiyor" }]);
        await telegram(`<b>[UYARI] TikTok: "Zamanlandı" ama bağlantı yok</b>\n${esc(r.episode_id)} (${esc(r.slot)} Berlin)\nYayına çıktı mı kontrol edilemiyor; bağlantıyı stüdyoda yaz.\n${studio}`);
      }
      continue;
    }
    // API'de görülen video syncApi'de zaten "published" oldu; burada kalan, API'nin göremedikleri
    const id = videoIdOf(r.url);
    const state = live && (id || !r.url) ? (id && live.has(id) ? "live" : "hidden") : await probe(r.url); // kısa bağlantı: oEmbed
    if (state === "live") {
      await markPublished(r.id, null, r.url, live ? "API" : "oEmbed");
      if (job.warnedAt) await telegram(`<b>[BİLGİ] TikTok: geç de olsa yayında</b>\n${esc(r.episode_id)} (${esc(r.slot)} Berlin)\n${esc(r.url)}`);
    } else if (state === "hidden" && now >= at + WARN_AFTER && !job.warnedAt) {
      await q("update social_posts set job = $2 where id = $1", [r.id, { ...job, warnedAt: new Date().toISOString(), error: "saatinde yayına çıkmadı (TikTok'ta zamanlama, gizlilik ya da silinme)" }]);
      await telegram(`<b>[UYARI] TikTok: zamanlanan video saatinde yayına çıkmadı</b>\n${esc(r.episode_id)} (${esc(r.slot)} Berlin, ${Math.round((now - at) / MIN)} dk geçti)\nTikTok'ta zamanlamaya ve gizlilik ayarına bak. Çıkınca kendiliğinden "Yayında" olur.\n${r.url ? `${esc(r.url)}\n` : ""}${studio}`);
      log(`uyarı: ${r.episode_id} saatinde yayında değil`);
    }
  }
}

try {
  const saved = readJson(TOKEN_FILE, null);
  let live = null;
  if (saved) {
    try {
      const t = await freshToken(saved);
      status.tokenExpiresAt = t.refreshExpiresAt; // stüdyo etiketi: yenileme belirtecinin günü
      // yenileme belirteci de bitiyorsa (365 gün) Samet'in yeniden yetki vermesi gerekir
      if (Date.parse(t.refreshExpiresAt || 0) - Date.now() < 14 * DAY && Date.now() - Date.parse(status.refreshWarnedAt || 0) > 3 * DAY) {
        status.refreshWarnedAt = new Date().toISOString();
        await telegram(`<b>[UYARI] TikTok belirtecinin süresi doluyor</b>\nYenileme belirteci ${esc(t.refreshExpiresAt)} tarihinde bitiyor: yeniden yetki gerekir. docs/social/README.md "TikTok"`);
      }
      live = await syncApi(t);
      await recordStats(q, "tiktok", status.followers, log);
      delete status.failingSince;
    } catch (e) {
      log("API hatası (oEmbed ile devam):", e.message);
      Object.assign(status, { ok: false, error: e.message });
      status.failingSince ||= new Date().toISOString();
      if (Date.now() - Date.parse(status.failingSince) > HOUR && Date.now() - Date.parse(status.errorWarnedAt || 0) > 6 * HOUR) {
        status.errorWarnedAt = new Date().toISOString();
        await telegram(`<b>[UYARI] TikTok API bağlantısı 1 saattir çalışmıyor</b>\n${esc(e.message)}\nMetrikler durdu; yayın denetimi oEmbed ile sürüyor. docs/social/README.md "TikTok"`);
      }
    }
  }
  await watchScheduled(live);
} catch (e) {
  log("hata:", e.message);
  process.exitCode = 1;
} finally {
  if (fs.existsSync(TOKEN_FILE)) {
    status.lastRunAt = new Date().toISOString();
    writeJson(STATUS_FILE, status);
  }
  await pool.end();
  fs.rmSync(LOCK, { recursive: true, force: true });
}
