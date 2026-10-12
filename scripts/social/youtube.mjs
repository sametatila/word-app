#!/usr/bin/env node
/*
  YOUTUBE İŞÇİSİ (sunucu, 2026-10-12; Samet: "biz her şeyi düşünürken youtube shorts'u düşünmedik"). systemd 10 dakikada
  bir. Google Cloud projesi nomi-507213, OAuth istemcisi "lernomi-youtube" (Desktop), izin ekranı yayında (yenileme
  belirteci süresiz; 7 gün sınırı yalnız "Testing"te). Kanal Lernomi (@lernomiapp). İzinler youtube.readonly,
  yt-analytics.readonly, youtube.upload (yükleme henüz kullanılmıyor: doğrulanmamış projeden yüklenen video "gizli"ye
  kilitlenir, YouTube denetimi gerekir).

    1. BELİRTEÇ: SOCIAL_DIR/youtube/token.json (600; istemci kimliği + gizli + yenileme belirteci). Erişim belirteci
       her koşuda yenilenir (1 sa). Bağlantı 1 saattir kopuksa Telegram (6 saatte bir).
    2. EŞİTLEME: kanalın yüklemeleri (sahibi olarak zamanlanmış/gizli olanlar da görünür). Video önce kimliğiyle (satırdaki
       external_id ya da bağlantı), yoksa saatinden bölüme eşlenir: zamanlanmışta `publishAt`, yayındakinde `publishedAt`
       (saatten 30 dk önce – 3 sa sonra; her saatte tek bölüm). Zamanlanmış (private + publishAt) → "scheduled" + bağlantı;
       herkese açık → "published". "Atlandı" ve başka videoya bağlı satırlara dokunulmaz.
    3. METRİKLER (90 güne kadar): videos.list istatistikleri saatte bir (views, likes, comments; anlık) + Analytics API
       6 saatte bir (watchMin, avgWatchSec, avgViewPct, shares, subsGained; 1–2 gün gecikmeli). Kanal: abone sayısı.
    4. DENETİM: "scheduled" satır saatten 20 dk sonra hâlâ herkese açık değilse bir kez Telegram.

  node scripts/social/youtube.mjs --once     (sunucuda: /opt/lernomi/social-yt.sh, lernomi-social-yt.timer)
  node scripts/social/youtube.mjs --check    kanal + son yüklemeler (yazmaz)

  Ortam: DATABASE_URL, SOCIAL_DIR, TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID. Tek işçi: SOCIAL_DIR/yt.lock.
  Kota: koşu başına ~4 birim (günlük 10.000).
*/
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const SOCIAL_DIR = process.env.SOCIAL_DIR || "/opt/lernomi/social";
const YT_DIR = path.join(SOCIAL_DIR, "youtube");
const TOKEN_FILE = path.join(YT_DIR, "token.json");
const STATUS_FILE = path.join(YT_DIR, "status.json");
const API = "https://www.googleapis.com/youtube/v3";
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const WARN_AFTER = 20 * MIN;
const METRICS_FOR = 90 * DAY;
const log = (...a) => console.log(new Date().toISOString(), "[yt]", ...a);
const args = process.argv.slice(2);

// ---------- yardımcılar ----------
const readJson = (f, d) => {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return d;
  }
};
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
/** youtube.com/shorts/<id>, watch?v=<id>, youtu.be/<id> */
const videoIdOf = (url) => /(?:shorts\/|[?&]v=|youtu\.be\/)([\w-]{11})/.exec(url || "")?.[1] ?? null;
const shortUrl = (id) => `https://www.youtube.com/shorts/${id}`;

async function accessToken(t) {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({ client_id: t.clientId, client_secret: t.clientSecret, refresh_token: t.refreshToken, grant_type: "refresh_token" }),
    signal: AbortSignal.timeout(30_000),
  });
  const j = await r.json().catch(() => ({}));
  if (!j.access_token) throw new Error(`belirteç alınamadı: ${j.error ?? r.status} ${j.error_description ?? ""}`.trim());
  return j.access_token;
}
function client(token) {
  return async (url) => {
    const r = await fetch(url.startsWith("http") ? url : `${API}${url}`, { headers: { authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30_000) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.error) throw new Error(`${url.split("?")[0]}: ${r.status} ${j.error?.message ?? ""}`.trim());
    return j;
  };
}

/** Kanal + yüklemeler (yeniden eskiye, en çok 150) ve ayrıntıları. */
async function fetchChannel(get) {
  const ch = (await get("/channels?part=snippet,statistics,contentDetails&mine=true")).items?.[0];
  if (!ch) throw new Error("bu hesapta kanal yok");
  const ids = [];
  let page = "";
  for (let i = 0; i < 3; i++) {
    const pl = await get(`/playlistItems?part=contentDetails&maxResults=50&playlistId=${ch.contentDetails.relatedPlaylists.uploads}${page ? `&pageToken=${page}` : ""}`);
    ids.push(...(pl.items || []).map((x) => x.contentDetails.videoId));
    if (!pl.nextPageToken) break;
    page = pl.nextPageToken;
  }
  const videos = [];
  for (let i = 0; i < ids.length; i += 50) {
    const v = await get(`/videos?part=snippet,status,statistics&id=${ids.slice(i, i + 50).join(",")}`);
    videos.push(...(v.items || []));
  }
  return { ch, videos };
}
const isPublic = (v) => v.status.privacyStatus === "public";
const isScheduled = (v) => v.status.privacyStatus === "private" && !!v.status.publishAt;
const timeOf = (v) => Date.parse(isScheduled(v) ? v.status.publishAt : v.snippet.publishedAt);

// ---------- komutlar ----------
if (args.includes("--check")) {
  const t = readJson(TOKEN_FILE, null);
  if (!t) {
    console.log("belirteç yok:", TOKEN_FILE);
    process.exit(1);
  }
  const { ch, videos } = await fetchChannel(client(await accessToken(t)));
  console.log(`${ch.snippet.title} (${ch.snippet.customUrl}): ${ch.statistics.subscriberCount} abone, ${ch.statistics.videoCount} video`);
  for (const v of videos.slice(0, 10)) console.log(` ${v.id} ${v.status.privacyStatus}${v.status.publishAt ? ` → ${v.status.publishAt}` : ""} ${v.snippet.publishedAt} ${v.statistics?.viewCount ?? "-"} izlenme  ${v.snippet.title.slice(0, 50)}`);
  process.exit(0);
}

fs.mkdirSync(YT_DIR, { recursive: true, mode: 0o700 });
const LOCK = path.join(SOCIAL_DIR, "yt.lock");
try {
  fs.mkdirSync(LOCK);
} catch {
  if (Date.now() - fs.statSync(LOCK).mtimeMs > 30 * MIN) fs.rmSync(LOCK, { recursive: true, force: true });
  process.exit(0);
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const q = (text, params) => pool.query(text, params);
const status = readJson(STATUS_FILE, {});
const ROW = "select id, episode_id, status, url, external_id, metrics_at, job from social_posts where platform = 'youtube'";

async function sync(get) {
  const { ch, videos } = await fetchChannel(get);
  Object.assign(status, { ok: true, username: ch.snippet.customUrl || ch.snippet.title, followers: Number(ch.statistics.subscriberCount), videoCount: Number(ch.statistics.videoCount), error: null, lastSyncAt: new Date().toISOString() });

  const eps = (await q("select id, slot from social_episodes where archived_at is null and slot is not null")).rows.map((r) => ({ id: r.id, slot: r.slot, at: slotMs(r.slot) }));
  let rows = (await q(ROW)).rows;
  const now = Date.now();
  for (const v of videos) {
    if (!isPublic(v) && !isScheduled(v)) continue; // liste dışı / taslak / gizli: bölüm değil
    const ts = timeOf(v);
    let row = rows.find((r) => r.external_id === v.id || videoIdOf(r.url) === v.id);
    if (!row) {
      const cand = eps.filter((e) => ts >= e.at - 30 * MIN && ts <= e.at + 3 * HOUR).sort((a, b) => Math.abs(ts - a.at) - Math.abs(ts - b.at))[0];
      if (!cand) continue; // planda olmayan video
      const cur = rows.find((r) => r.episode_id === cand.id);
      if (cur && (cur.status === "skipped" || (cur.external_id && cur.external_id !== v.id) || (videoIdOf(cur.url) && videoIdOf(cur.url) !== v.id))) continue;
      await q("insert into social_posts (episode_id, platform, status, updated_by) values ($1, 'youtube', 'scheduled', 'youtube') on conflict do nothing", [cand.id]);
      rows = (await q(ROW)).rows;
      row = rows.find((r) => r.episode_id === cand.id);
      log(`eşleşti: ${cand.id} ← ${v.id} (${v.status.privacyStatus})`);
    }
    if (isPublic(v) && (row.status !== "published" || row.external_id !== v.id)) {
      await q(
        "update social_posts set status = 'published', external_id = $2, url = coalesce(url, $3), published_at = $4, job = null, updated_by = 'youtube', updated_at = now() where id = $1",
        [row.id, v.id, shortUrl(v.id), new Date(v.snippet.publishedAt)],
      );
      log(`✓ yayında: ${row.episode_id} ${shortUrl(v.id)}`);
      if (row.job?.warnedAt) await telegram(`<b>[BİLGİ] YouTube: geç de olsa yayında</b>\n${esc(row.episode_id)}\n${shortUrl(v.id)}`);
      row.status = "published";
    } else if (isScheduled(v) && row.status !== "scheduled" && row.status !== "published" && row.status !== "skipped") {
      await q("update social_posts set status = 'scheduled', external_id = $2, url = coalesce(url, $3), updated_by = 'youtube', updated_at = now() where id = $1", [row.id, v.id, shortUrl(v.id)]);
      log(`zamanlandı: ${row.episode_id} → ${v.status.publishAt}`);
    } else if (!row.external_id) {
      await q("update social_posts set external_id = $2, url = coalesce(url, $3) where id = $1", [row.id, v.id, shortUrl(v.id)]);
    }
    if (isPublic(v) && now - ts < METRICS_FOR && now - (row.metrics_at ? row.metrics_at.getTime() : 0) > HOUR - MIN) {
      const s = v.statistics || {};
      await q("update social_posts set metrics = coalesce(metrics, '{}'::jsonb) || $2::jsonb, metrics_at = now() where id = $1", [row.id, JSON.stringify({ views: Number(s.viewCount ?? 0), likes: Number(s.likeCount ?? 0), comments: Number(s.commentCount ?? 0) })]);
    }
  }
  return videos;
}

/** Analytics API: izlenme süresi, ortalama izlenme yüzdesi, paylaşım, abone kazanımı (6 saatte bir, tek istek). */
async function analytics(get) {
  if (Date.now() - Date.parse(status.analyticsAt || 0) < 6 * HOUR) return;
  const rows = (await q("select id, external_id, published_at from social_posts where platform = 'youtube' and status = 'published' and external_id is not null and published_at > now() - interval '90 days'")).rows;
  status.analyticsAt = new Date().toISOString();
  if (!rows.length) return;
  const start = new Date(Math.min(...rows.map((r) => r.published_at.getTime())) - DAY).toISOString().slice(0, 10);
  const end = new Date().toISOString().slice(0, 10);
  const r = await get(
    `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&startDate=${start}&endDate=${end}&dimensions=video&metrics=estimatedMinutesWatched,averageViewDuration,averageViewPercentage,shares,subscribersGained&filters=video==${rows.map((x) => x.external_id).join(",")}`,
  );
  const col = Object.fromEntries((r.columnHeaders || []).map((h, i) => [h.name, i]));
  for (const a of r.rows || []) {
    const row = rows.find((x) => x.external_id === a[col.video]);
    if (!row) continue;
    const m = { watchMin: Math.round(a[col.estimatedMinutesWatched]), avgWatchSec: Math.round(a[col.averageViewDuration]), avgViewPct: Math.round(a[col.averageViewPercentage] * 10) / 10, shares: a[col.shares], subsGained: a[col.subscribersGained] };
    await q("update social_posts set metrics = coalesce(metrics, '{}'::jsonb) || $2::jsonb, metrics_at = now() where id = $1", [row.id, JSON.stringify(m)]);
  }
  log("analitik güncellendi:", (r.rows || []).length);
}

/** Zamanlanmış satır saatinden 20 dk sonra hâlâ yayında değilse bir kez Telegram. */
async function watchScheduled() {
  const rows = (await q("select p.id, p.episode_id, p.url, p.job, e.slot from social_posts p join social_episodes e on e.id = p.episode_id and e.archived_at is null where p.platform = 'youtube' and p.status = 'scheduled' and e.slot is not null")).rows;
  const now = Date.now();
  for (const r of rows) {
    const at = slotMs(r.slot);
    if (now < at + WARN_AFTER || now > at + 3 * DAY || r.job?.warnedAt) continue;
    await q("update social_posts set job = $2 where id = $1", [r.id, { ...(r.job || {}), warnedAt: new Date().toISOString(), error: "saatinde yayına çıkmadı (YouTube Studio'da zamanlamaya ve görünürlüğe bak)" }]);
    await telegram(`<b>[UYARI] YouTube: zamanlanan Short saatinde yayına çıkmadı</b>\n${esc(r.episode_id)} (${esc(r.slot)} Berlin, ${Math.round((now - at) / MIN)} dk geçti)\nYouTube Studio'da zamanlamaya ve görünürlüğe bak. Çıkınca kendiliğinden "Yayında" olur.\n${r.url ? `${esc(r.url)}\n` : ""}https://www.lernomi.app/studio/${esc(r.episode_id)}`);
    log(`uyarı: ${r.episode_id} saatinde yayında değil`);
  }
}

try {
  const t = readJson(TOKEN_FILE, null);
  if (t) {
    try {
      const get = client(await accessToken(t));
      await sync(get);
      await analytics(get).catch((e) => log("analitik okunamadı:", e.message));
      await watchScheduled(); // yalnız eşitleme başarılıysa: yoksa yayındaki video "çıkmadı" sanılır
      delete status.failingSince;
    } catch (e) {
      log("API hatası:", e.message);
      Object.assign(status, { ok: false, error: e.message });
      status.failingSince ||= new Date().toISOString();
      if (Date.now() - Date.parse(status.failingSince) > HOUR && Date.now() - Date.parse(status.errorWarnedAt || 0) > 6 * HOUR) {
        status.errorWarnedAt = new Date().toISOString();
        await telegram(`<b>[UYARI] YouTube API bağlantısı 1 saattir çalışmıyor</b>\n${esc(e.message)}\nEşitleme ve metrikler durdu. docs/social/README.md "YouTube"`);
      }
    }
  }
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
