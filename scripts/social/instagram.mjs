#!/usr/bin/env node
/*
  INSTAGRAM İŞÇİSİ (sunucu, 2026-10-10; Samet: "Instagram tam otomatik: metrik + saatinde yayın"). systemd
  zamanlayıcısı dakikada bir çalıştırır (`--once`, /opt/lernomi/social-ig.sh). Video üretim işçisinden AYRI: 5 dakikalık
  bir üretim saatinde yayını geciktirmesin. Instagram API with Instagram Login (graph.instagram.com), uygulama
  "Lernomi" (Meta, geliştirme modu yeterli: yalnız kendi hesabımız), hesap lernomi_app.

    1. BELİRTEÇ: SOCIAL_DIR/instagram/token.json (600, depoda ve .env'de değil; 60 gün geçerli). 7 günde bir
       yenilenir (refresh_access_token, süre yeniden 60 gün). Yenilenemezse ve 10 günden az kaldıysa Telegram.
    2. EŞİTLEME (15 dakikada bir; yayın penceresinde her koşuda): hesabın gönderileri bölümlerle saatinden eşleşir
       (her saatte tek bölüm; gönderi saatten 30 dk önce – 3 sa sonra). Eşleşen satır "published" olur (bağlantı,
       kimlik). Metrikler: ilk 3 gün saatlik, 30 güne kadar 6 saatte bir, 90 güne kadar günde bir.
    3. YAYIN: Instagram durumu "auto" olan bölüm saatinde yayınlanır. Şart: bölümün GÜNCEL sürümü onaylı ve o sürümün
       videosu sunucuda hazır (social_renders done). Saatten 20 dk önce kap (container) açılır: Instagram
       MP4'ü ve kapağı imzalı, 3 saatlik bir adresten (`/api/studio/file/<üretim>?sig=…`) baytı baytına kendisi çeker
       (bu API dosya yüklemeyi kabul etmiyor: resumable upload "video_url is required" der). İşleyince saatinde
       media_publish. Saatten 3 sa sonra
       hâlâ yayınlanamadıysa "failed" + Telegram. İki kez yayın YOK: yayın adımı satırı önce "publishing"e kilitler;
       yarıda kalırsa kabın kendi durumu (PUBLISHED / FINISHED) neyin olduğunu söyler, kör tekrar yapılmaz.
       "scheduled" (Samet platformun zamanlayıcısına koydu) satırlara dokunulmaz.

  node scripts/social/instagram.mjs --once         (sunucuda: /opt/lernomi/social-ig.sh)
  node scripts/social/instagram.mjs --check        hesap + belirteç durumu (belirteç yazdırılmaz)
  node scripts/social/instagram.mjs --dry <bölüm>  o bölümün videosunu yükleyip Instagram'ın işlemesini bekler,
                                                   YAYINLAMAZ (deneme; kap 24 saatte kendiliğinden düşer)

  Ortam: DATABASE_URL, SOCIAL_DIR (varsayılan /opt/lernomi/social), BETTER_AUTH_SECRET + BETTER_AUTH_URL (imzalı
  dosya adresi), TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID (uyarı).
  Durum: SOCIAL_DIR/instagram/status.json (stüdyo takvimi okur; belirteç içermez). Tek işçi: SOCIAL_DIR/ig.lock.
*/
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import pg from "pg";

const SOCIAL_DIR = process.env.SOCIAL_DIR || "/opt/lernomi/social";
const IG_DIR = path.join(SOCIAL_DIR, "instagram");
const TOKEN_FILE = path.join(IG_DIR, "token.json");
const STATUS_FILE = path.join(IG_DIR, "status.json");
const API = "https://graph.instagram.com/v23.0";
const SITE = (process.env.BETTER_AUTH_URL || "https://www.lernomi.app").replace(/\/$/, "");
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const PREPARE_BEFORE = 20 * MIN;
const GIVE_UP_AFTER = 3 * HOUR;
const MAX_ATTEMPTS = 3;
const log = (...a) => console.log(new Date().toISOString(), "[ig]", ...a);
const args = process.argv.slice(2);

fs.mkdirSync(IG_DIR, { recursive: true, mode: 0o700 });
const LOCK = path.join(SOCIAL_DIR, "ig.lock");
try {
  fs.mkdirSync(LOCK);
} catch {
  if (Date.now() - fs.statSync(LOCK).mtimeMs > 30 * MIN) fs.rmSync(LOCK, { recursive: true, force: true });
  process.exit(0);
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
const q = (text, params) => pool.query(text, params);

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
/** "2026-10-12 07:30" (Berlin) → UTC ms. */
function slotMs(slot) {
  const [d, t] = slot.split(" ");
  const guess = new Date(`${d}T${t}:00Z`);
  const off = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", timeZoneName: "longOffset" }).formatToParts(guess).find((p) => p.type === "timeZoneName").value;
  const m = /GMT([+-])(\d\d):(\d\d)/.exec(off);
  return guess.getTime() - (m ? (m[1] === "+" ? 1 : -1) * (Number(m[2]) * 60 + Number(m[3])) * MIN : 0);
}

class IgError extends Error {
  constructor(message, { status, code, subcode, transient } = {}) {
    super(message);
    Object.assign(this, { status, code, subcode, transient });
  }
}
let TOKEN = null;
/** Graph çağrısı; belirteç yalnız istek gövdesinde/adresinde, hata metnine girmez. */
async function ig(method, pathOrUrl, params = {}) {
  const url = new URL(pathOrUrl.startsWith("http") ? pathOrUrl : `${API}${pathOrUrl}`);
  const all = { ...params, access_token: TOKEN };
  let res;
  try {
    if (method === "GET") {
      for (const [k, v] of Object.entries(all)) url.searchParams.set(k, v); // sayfalama adresi belirteci zaten taşıyor: üstüne yaz
      res = await fetch(url, { signal: AbortSignal.timeout(60_000) });
    } else res = await fetch(url, { method, body: new URLSearchParams(all), signal: AbortSignal.timeout(60_000) });
  } catch (e) {
    throw new IgError(`ağ: ${e.message}`, { transient: true });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) {
    const e = data.error || {};
    throw new IgError(`${e.message || `HTTP ${res.status}`}${e.error_user_msg ? ` (${e.error_user_msg})` : ""}`, { status: res.status, code: e.code, subcode: e.error_subcode, transient: res.status >= 500 || e.is_transient === true || e.code === 2 || e.code === 4 });
  }
  return data;
}

// ---------- belirteç ----------
function loadToken() {
  const t = readJson(TOKEN_FILE, null);
  if (!t?.token) throw new Error(`belirteç yok: ${TOKEN_FILE}`);
  TOKEN = t.token;
  return t;
}
async function refreshToken(t, status) {
  const age = Date.now() - Date.parse(t.refreshedAt || 0);
  if (age < 7 * DAY) return;
  try {
    const r = await ig("GET", "https://graph.instagram.com/refresh_access_token", { grant_type: "ig_refresh_token" });
    const next = { token: r.access_token, refreshedAt: new Date().toISOString(), expiresAt: new Date(Date.now() + Number(r.expires_in || 60 * 86400) * 1000).toISOString() };
    writeJson(TOKEN_FILE, next, 0o600);
    TOKEN = next.token;
    Object.assign(t, next);
    delete status.tokenError;
    log("belirteç yenilendi, bitiş", next.expiresAt);
  } catch (e) {
    status.tokenError = e.message;
    const left = (Date.parse(t.expiresAt || 0) - Date.now()) / DAY;
    log("belirteç yenilenemedi:", e.message, `(${left.toFixed(1)} gün kaldı)`);
    if (left < 10 && Date.now() - Date.parse(status.tokenWarnedAt || 0) > DAY) {
      status.tokenWarnedAt = new Date().toISOString();
      await telegram(`<b>[UYARI] Instagram belirteci yenilenemiyor</b>\n${Math.max(0, left).toFixed(0)} gün kaldı. Hata: ${esc(e.message)}\nYeni belirteç: Meta › Lernomi › Instagram › API setup → <code>${esc(TOKEN_FILE)}</code> (docs/social/README.md "Platform API'leri")`);
    }
  }
}

// ---------- eşitleme ----------
/** Planlı bölümler: saat → bölüm. */
async function episodesBySlot() {
  const rows = (await q("select id, slot from social_episodes where archived_at is null and slot is not null")).rows;
  return rows.map((r) => ({ id: r.id, slot: r.slot, at: slotMs(r.slot) }));
}

async function listMedia(sinceMs) {
  const out = [];
  let next = `${API}/me/media?fields=id,caption,media_product_type,timestamp,permalink&limit=50`;
  for (let page = 0; next && page < 6; page++) {
    const r = await ig("GET", next);
    for (const m of r.data || []) out.push(m);
    const last = r.data?.[r.data.length - 1];
    if (!last || Date.parse(last.timestamp) < sinceMs) break;
    next = r.paging?.next || null;
  }
  return out.filter((m) => m.media_product_type === "REELS" && Date.parse(m.timestamp) >= sinceMs); // fotoğraf/karusel bölüm değil
}

/** Hesaptaki gönderileri bölümlerle eşleştir; eşleşen satır "published". */
async function syncMedia(status) {
  const eps = await episodesBySlot();
  if (!eps.length) return;
  const since = Math.min(...eps.map((e) => e.at)) - DAY;
  const media = await listMedia(since);
  const known = new Map((await q("select external_id, episode_id from social_posts where platform = 'instagram' and external_id is not null")).rows.map((r) => [r.external_id, r.episode_id]));
  let matched = 0;
  for (const m of media) {
    if (known.has(m.id)) continue;
    const ts = Date.parse(m.timestamp);
    const cand = eps.filter((e) => ts >= e.at - 30 * MIN && ts <= e.at + GIVE_UP_AFTER).sort((a, b) => Math.abs(ts - a.at) - Math.abs(ts - b.at))[0];
    if (!cand) {
      log("planda olmayan gönderi (eşleşmedi):", m.permalink, m.timestamp);
      continue;
    }
    const cur = (await q("select status, external_id from social_posts where episode_id = $1 and platform = 'instagram'", [cand.id])).rows[0];
    if (cur?.external_id && cur.external_id !== m.id) continue; // bölüm başka bir gönderiyle eşleşmiş
    if (cur?.status === "publishing") continue; // yayın adımı kendi sonucunu yazacak
    await q(
      `insert into social_posts (episode_id, platform, status, external_id, url, published_at, updated_by, updated_at)
       values ($1, 'instagram', 'published', $2, $3, $4, 'instagram', now())
       on conflict (episode_id, platform) do update set status = 'published', external_id = $2, url = $3, published_at = $4, updated_by = 'instagram', updated_at = now()`,
      [cand.id, m.id, m.permalink, new Date(ts)],
    );
    matched++;
    log(`eşleşti: ${cand.id} ← ${m.permalink}`);
  }
  status.lastSyncAt = new Date().toISOString();
  if (matched) status.lastMatched = matched;
}

const METRICS = "views,reach,likes,comments,shares,saved,total_interactions,ig_reels_avg_watch_time";
async function syncMetrics() {
  const rows = (
    await q(
      `select id, external_id, published_at, metrics_at from social_posts
       where platform = 'instagram' and status = 'published' and external_id is not null and published_at > now() - interval '90 days'`,
    )
  ).rows;
  let n = 0;
  for (const r of rows) {
    const age = Date.now() - r.published_at.getTime();
    const every = age < 3 * DAY ? HOUR : age < 30 * DAY ? 6 * HOUR : DAY;
    if (r.metrics_at && Date.now() - r.metrics_at.getTime() < every - 2 * MIN) continue;
    try {
      const d = await ig("GET", `/${r.external_id}/insights`, { metric: METRICS });
      const v = Object.fromEntries((d.data || []).map((m) => [m.name, m.values?.[0]?.value ?? m.total_value?.value ?? 0]));
      const metrics = { views: v.views, reach: v.reach, likes: v.likes, comments: v.comments, shares: v.shares, saves: v.saved, interactions: v.total_interactions };
      if (v.ig_reels_avg_watch_time != null) metrics.avgWatchSec = Math.round(v.ig_reels_avg_watch_time / 100) / 10;
      for (const k of Object.keys(metrics)) if (metrics[k] == null) delete metrics[k];
      await q("update social_posts set metrics = $2, metrics_at = now() where id = $1", [r.id, metrics]);
      n++;
    } catch (e) {
      log(`metrik okunamadı (${r.external_id}):`, e.message);
      if (!e.transient) await q("update social_posts set metrics_at = now() where id = $1", [r.id]); // silinmiş gönderi: her koşuda yeniden sorma
    }
  }
  if (n) log("metrik güncellendi:", n);
}

// ---------- yayın ----------
async function candidates() {
  return (
    await q(
      `select p.id, p.episode_id, p.status, p.job, e.slot, e.revision, e.approved_revision, r.id as render_id, r.dir
       from social_posts p
       join social_episodes e on e.id = p.episode_id and e.archived_at is null
       left join lateral (
         select id, dir from social_renders
         where episode_id = e.id and revision = e.approved_revision and status = 'done' and dir is not null
         order by id desc limit 1
       ) r on e.approved_revision = e.revision
       where p.platform = 'instagram' and p.status in ('auto', 'publishing')`,
    )
  ).rows;
}

function videoOf(c) {
  const dir = path.join(SOCIAL_DIR, c.dir);
  const mp4 = path.join(dir, `${c.episode_id}.mp4`);
  if (!fs.existsSync(mp4)) return null;
  const caption = fs.existsSync(path.join(dir, "aciklama.txt")) ? fs.readFileSync(path.join(dir, "aciklama.txt"), "utf8").trim() : "";
  return { renderId: c.render_id, caption, bytes: fs.statSync(mp4).size, cover: fs.existsSync(path.join(dir, "kapak.jpg")) };
}

/** Instagram'ın çekeceği imzalı adres (dosya route'u doğrular; 3 saat). */
function mediaUrl(renderId, k) {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error("BETTER_AUTH_SECRET yok (imzalı dosya adresi)");
  const exp = Math.floor(Date.now() / 1000) + 3 * 3600;
  const sig = crypto.createHmac("sha256", secret).update(`social-media:${renderId}.${k}.${exp}`).digest("hex");
  return `${SITE}/api/studio/file/${renderId}?k=${k}&exp=${exp}&sig=${sig}`;
}

/** Kap aç; Instagram MP4'ü (ve kapağı) imzalı adresten olduğu gibi çeker (yeniden kodlama bizde yok). */
async function createContainer(userId, v) {
  // Ses Defne (yapay sentez): elle yüklemedeki "AI info" etiketinin karşılığı; yalnız kap açılırken verilebiliyor
  const params = { media_type: "REELS", video_url: mediaUrl(v.renderId, "mp4"), caption: v.caption, share_to_feed: "true", is_ai_generated: "true" };
  if (v.cover) params.cover_url = mediaUrl(v.renderId, "kapak");
  const c = await ig("POST", `/${userId}/media`, params);
  return c.id;
}
const containerState = (id) => ig("GET", `/${id}`, { fields: "status_code,status" });

async function setJob(id, job, extra = "") {
  await q(`update social_posts set job = $2, updated_at = now()${extra} where id = $1`, [id, job]);
}
async function fail(c, job, reason) {
  await setJob(c.id, { ...job, error: reason, failedAt: new Date().toISOString() }, ", status = 'failed', updated_by = 'instagram'");
  log(`✗ ${c.episode_id}: ${reason}`);
  await telegram(`<b>[UYARI] Instagram'da yayınlanamadı</b>\n${esc(c.episode_id)} (${esc(c.slot)} Berlin)\n${esc(reason)}\nStüdyo: https://www.lernomi.app/studio/${esc(c.episode_id)} (durumu yeniden "Otomatik" yapınca tekrar dener)`);
}

/** Yayınlanmış bir kabın gönderisini bul (media_publish cevabı kaybolduysa): yayın denemesinden sonraki ilk gönderi. */
async function findPublished(after, caption) {
  const media = await listMedia(after - 5 * MIN);
  return media.find((m) => (m.caption || "").trim() === caption.trim()) || (media.length === 1 ? media[0] : null);
}
async function markPublished(c, job, mediaId) {
  const m = await ig("GET", `/${mediaId}`, { fields: "id,permalink,timestamp" });
  await q(
    "update social_posts set status = 'published', external_id = $2, url = $3, published_at = $4, job = $5, updated_by = 'instagram', updated_at = now() where id = $1",
    [c.id, m.id, m.permalink, new Date(m.timestamp), { ...job, error: null, publishedAt: new Date().toISOString() }],
  );
  log(`✓ ${c.episode_id} yayında: ${m.permalink}`);
  await telegram(`<b>[BİLGİ] Instagram'da yayınlandı</b>\n${esc(c.episode_id)} (${esc(c.slot)} Berlin)\n${esc(m.permalink)}`);
}

async function publishOne(c, userId) {
  const job = c.job || {};
  const now = Date.now();
  if (!c.slot) return;
  const at = slotMs(c.slot);

  // yarıda kalmış yayın: kabın durumu karar verir
  if (c.status === "publishing") {
    const s = job.containerId ? await containerState(job.containerId).catch(() => null) : null;
    if (s?.status_code === "PUBLISHED") {
      const m = await findPublished(Date.parse(job.publishAttemptAt || job.preparedAt || 0), videoOf(c)?.caption || "");
      if (m) return markPublished(c, job, m.id);
      return; // gönderi listede henüz görünmüyor: sonraki koşu
    }
    if (s?.status_code === "FINISHED" || !s) {
      await setJob(c.id, job, ", status = 'auto'"); // yayın çağrısı gitmemiş: yeniden "auto", aşağıda normal akış
      c.status = "auto";
    } else return;
  }

  if (now < at - PREPARE_BEFORE) {
    if (job.containerId && job.renderId !== c.render_id) await setJob(c.id, { ...job, containerId: null, renderId: null }); // video değişti
    return;
  }
  if (now > at + GIVE_UP_AFTER) return fail(c, job, job.error ? `Saatten 3 saat sonra hâlâ yayınlanamadı. Son hata: ${job.error}` : "Saatten 3 saat sonra hâlâ yayınlanamadı (video onaylı ve hazır değildi).");

  const v = c.render_id ? videoOf(c) : null;
  if (!v) {
    if (now >= at && !job.warnedAt) {
      await setJob(c.id, { ...job, warnedAt: new Date().toISOString(), error: "video hazır değil" });
      await telegram(`<b>[UYARI] Instagram: yayın saati geldi, video hazır değil</b>\n${esc(c.episode_id)} (${esc(c.slot)} Berlin)\nGüncel sürüm onaylı ve videosu üretilmiş olmalı. 3 saat içinde hazır olursa yayınlanır.\nhttps://www.lernomi.app/studio/${esc(c.episode_id)}`);
    }
    return;
  }

  // kap: yoksa ya da video değiştiyse yenisi
  if (!job.containerId || job.renderId !== c.render_id) {
    const attempts = (job.attempts || 0) + 1;
    try {
      const containerId = await createContainer(userId, v);
      Object.assign(job, { containerId, renderId: c.render_id, preparedAt: new Date().toISOString(), attempts, error: null });
      await setJob(c.id, job);
      log(`kap hazırlandı: ${c.episode_id} (${(v.bytes / 1e6).toFixed(1)} MB)`);
    } catch (e) {
      Object.assign(job, { containerId: null, attempts, error: e.message });
      if (attempts >= MAX_ATTEMPTS && !e.transient) return fail(c, job, `Yüklenemedi (${attempts} deneme): ${e.message}`);
      await setJob(c.id, job);
      log(`kap açılamadı (${attempts}): ${c.episode_id}: ${e.message}`);
    }
    return; // Instagram işlesin; sonraki koşuda durum
  }

  const s = await containerState(job.containerId);
  if (s.status_code === "IN_PROGRESS") return;
  if (s.status_code === "ERROR" || s.status_code === "EXPIRED") {
    Object.assign(job, { containerId: null, error: `Instagram videoyu işleyemedi: ${s.status || s.status_code}` });
    if ((job.attempts || 0) >= MAX_ATTEMPTS) return fail(c, job, job.error);
    return setJob(c.id, job);
  }
  if (s.status_code === "PUBLISHED") {
    const m = await findPublished(Date.parse(job.preparedAt || 0), v.caption);
    if (m) return markPublished(c, job, m.id);
    return;
  }
  if (s.status_code !== "FINISHED" || now < at) return;

  // saat geldi: önce kilitle (iki kez yayın yok), sonra yayınla
  job.publishAttemptAt = new Date().toISOString();
  const claim = await q("update social_posts set status = 'publishing', job = $2, updated_at = now() where id = $1 and status = 'auto' returning id", [c.id, job]);
  if (!claim.rowCount) return; // bu arada biri durumu değiştirdi
  try {
    const r = await ig("POST", `/${userId}/media_publish`, { creation_id: job.containerId });
    await markPublished(c, job, r.id);
  } catch (e) {
    const after = await containerState(job.containerId).catch(() => null);
    if (after?.status_code === "PUBLISHED") {
      const m = await findPublished(Date.parse(job.publishAttemptAt), v.caption);
      if (m) return markPublished(c, job, m.id);
      return; // "publishing" kalır, sonraki koşu bulur
    }
    Object.assign(job, { error: `yayın: ${e.message}`, attempts: (job.attempts || 0) + 1 });
    if (job.attempts >= MAX_ATTEMPTS + 2 && !e.transient) return fail(c, job, job.error);
    await setJob(c.id, job, ", status = 'auto'");
    log(`yayın denemesi başarısız: ${c.episode_id}: ${e.message}`);
  }
}

async function publishDue(userId, status) {
  const list = await candidates();
  const now = Date.now();
  const hot = list.filter((c) => c.slot && slotMs(c.slot) - PREPARE_BEFORE <= now);
  // yayın penceresinde önce eşitle: platformda elle yayınlanmışsa "published" olur ve ikinci kez gönderilmez
  if (hot.length) {
    await syncMedia(status);
    const still = new Set((await q("select id from social_posts where id = any($1) and status in ('auto', 'publishing')", [hot.map((c) => c.id)])).rows.map((r) => r.id));
    for (const c of hot) {
      if (!still.has(c.id)) continue;
      try {
        await publishOne(c, userId);
      } catch (e) {
        log(`yayın adımı hatası (${c.episode_id}):`, e.message);
        await setJob(c.id, { ...(c.job || {}), error: e.message }).catch(() => {});
      }
    }
  }
  // video değiştiyse eski kabı unut (uzak saatler)
  for (const c of list) if (!hot.includes(c)) await publishOne(c, userId).catch((e) => log(`(${c.episode_id})`, e.message));
}

// ---------- komutlar ----------
async function account() {
  return ig("GET", "/me", { fields: "user_id,username,account_type,followers_count" });
}

async function dry(episodeId) {
  const c = (await candidates()).find((x) => x.episode_id === episodeId) || (await q(
    `select p.id, e.id as episode_id, e.slot, r.id as render_id, r.dir from social_episodes e
     left join social_posts p on p.episode_id = e.id and p.platform = 'instagram'
     left join lateral (select id, dir from social_renders where episode_id = e.id and revision = e.approved_revision and status = 'done' and dir is not null order by id desc limit 1) r on e.approved_revision = e.revision
     where e.id = $1`,
    [episodeId],
  )).rows[0];
  if (!c) throw new Error("bölüm yok");
  const v = c.render_id ? videoOf(c) : null;
  if (!v) throw new Error("onaylı güncel sürümün videosu sunucuda yok");
  const me = await account();
  log(`deneme: ${episodeId} → @${me.username} (${(v.bytes / 1e6).toFixed(1)} MB, açıklama ${v.caption.length} karakter, kapak ${v.cover ? "var" : "yok"})`);
  const t0 = Date.now();
  const id = await createContainer(me.user_id, v);
  log("yüklendi, Instagram işliyor…");
  for (;;) {
    const s = await containerState(id);
    if (s.status_code !== "IN_PROGRESS") {
      log(`kap durumu: ${s.status_code}${s.status ? ` (${s.status})` : ""}, ${((Date.now() - t0) / 1000).toFixed(0)} sn. YAYINLANMADI (deneme).`);
      if (s.status_code !== "FINISHED") process.exitCode = 1;
      return;
    }
    if (Date.now() - t0 > 10 * MIN) throw new Error("10 dakikada işlenmedi");
    await new Promise((r) => setTimeout(r, 5000));
  }
}

const status = readJson(STATUS_FILE, {});
try {
  const t = loadToken();
  if (args.includes("--check")) {
    const me = await account();
    const left = (Date.parse(t.expiresAt || 0) - Date.now()) / DAY;
    log(`@${me.username} (${me.account_type}), ${me.followers_count} takipçi; belirteç ${left.toFixed(1)} gün, son yenileme ${t.refreshedAt}`);
  } else if (args.includes("--dry")) {
    await dry(args[args.indexOf("--dry") + 1]);
  } else {
    await refreshToken(t, status);
    const me = await account();
    Object.assign(status, { ok: true, username: me.username, followers: me.followers_count, tokenExpiresAt: t.expiresAt, error: null });
    await publishDue(me.user_id, status);
    if (Date.now() - Date.parse(status.lastSyncAt || 0) > 15 * MIN - 10_000) await syncMedia(status);
    await syncMetrics();
  }
} catch (e) {
  log("hata:", e.message);
  status.ok = false;
  status.error = e.message;
  process.exitCode = 1;
  // bağlantı 1 saattir kopuksa bir kez Telegram (belirteç iptal, hesap şifresi değişti)
  if (!args.includes("--dry") && !args.includes("--check")) {
    status.failingSince ||= new Date().toISOString();
    if (Date.now() - Date.parse(status.failingSince) > HOUR && Date.now() - Date.parse(status.errorWarnedAt || 0) > 6 * HOUR) {
      status.errorWarnedAt = new Date().toISOString();
      await telegram(`<b>[UYARI] Instagram bağlantısı 1 saattir çalışmıyor</b>\n${esc(e.message)}\nOtomatik yayın ve metrikler durdu. docs/social/README.md "Platform API'leri"`);
    }
  }
} finally {
  if (!args.includes("--dry") && !args.includes("--check")) {
    if (status.ok) delete status.failingSince;
    status.lastRunAt = new Date().toISOString();
    writeJson(STATUS_FILE, status);
  }
  await pool.end();
  fs.rmSync(LOCK, { recursive: true, force: true });
}
