#!/usr/bin/env node
/*
  STÜDYO İŞÇİSİ (sunucu, 2026-10-09). systemd zamanlayıcısı ~20 sn'de bir çalıştırır (`--once`), her koşu kısa:

    1. AKTARIM: depodaki bölümler (data/social/episodes) değiştiyse çözülmüş veriyi social_episodes'a yazar.
       Stüdyoda düzenlenmiş bölümün verisine dokunmaz: yalnız origin'i günceller, origin_changed der.
       Saati stüdyoda değiştirilmiş bölümün saatine dokunmaz. Depodan kalkan bölüm silinmez, arşivlenir.
    2. KURTARMA: 3 dakikadır ses vermeyen "running" üretim "failed" olur (işçi öldü, sunucu yeniden başladı).
    3. ÜRETİM: kuyruktaki en eski onaylı sürümü alır, Defne seslerini ve yerleşimi bir kez daha denetler, MP4 +
       kapaklar + açıklama üretir (lib/render.mjs, yerel üretimle birebir aynı ayarlar). Aynı bölümün eski
       videosunun dosyaları silinir (satır iz olarak kalır).
       YATAY bölüm (data/social/yatay, format "yatay"; 2026-10-13): yatay/uret.mjs (1920×1080, dört karakterin
       kayıtları, kapak 1280×720, bölüm listeli YouTube açıklaması). 12 dakikalık video sunucuda ~1 saat.
  Yatay üretim AYRI birimde: `--uzun` (sunucuda lernomi-social-render.timer → /opt/lernomi/social-render.sh, zaman
  aşımı 4 sa, kilit SOCIAL_DIR/render.lock, üretim her saniye tazeler). `--once` yalnız dikey üretir: uzun bir yatay
  üretim sürerken aktarım, ses talepleri ve kısa videolar beklemez.

  node scripts/social/worker.mjs --once            (sunucuda: /opt/lernomi/social-worker.sh)
  node scripts/social/worker.mjs --once --import   yalnız aktarım
  node scripts/social/worker.mjs --uzun            yalnız sıradaki yatay üretim (sunucuda: /opt/lernomi/social-render.sh)
  MAC'TE ÜRETİM (2026-10-14, stüdyoda "Mac'te üret"; Mac `scripts/social/yatay/mac.mjs` ssh ile çağırır,
  sunucuda /opt/lernomi/social-mac.sh <komut>; kilit almaz):
    --mac-claim                 Mac görüldü (mac-status.json); sıradaki "mac" işini al → JSON (iş, veri, motor kaynağı)
    --mac-beat <iş> <0–1>       ilerleme ve kalp atışı
    --mac-done <iş> <b64 json>  dosyalar SOCIAL_DIR/out/<bölüm>/r<sürüm>-<iş>/ altına yüklendi → "done"
    --mac-fail <iş> <b64 metin> üretim düştü

  Ortam: DATABASE_URL, TTS_OWN_DIR (Defne kayıtları), SOCIAL_DIR (çıktı; varsayılan /opt/lernomi/social),
  PLAYWRIGHT_BROWSERS_PATH (sunucuda Chromium). Aynı anda tek işçi: SOCIAL_DIR/worker.lock.
*/
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import pg from "pg";
import { loadEpisodes, EP_DIR } from "./lib/episodes.mjs";
import { buildPage, localDoc, launchBrowser } from "./lib/page.mjs";
import { renderDoc } from "./lib/audio.mjs";
import { renderVideo } from "./lib/render.mjs";
import { resolveClips } from "./lib/clips.mjs";
import { ROOT, TTS } from "./lib/content.mjs";
import { DIR as LONG_DIR, loadLong } from "./yatay/icerik.mjs";
import { renderLong } from "./yatay/uret.mjs";
import { engineSource } from "./yatay/sayfa.mjs";
import { generateNarration, isNarration } from "./yatay/anlatici.mjs";

const SOCIAL_DIR = process.env.SOCIAL_DIR || "/opt/lernomi/social";
const STALE_MS = 3 * 60_000;
const log = (...a) => console.log(new Date().toISOString(), ...a);

fs.mkdirSync(SOCIAL_DIR, { recursive: true });
const LOCK = path.join(SOCIAL_DIR, "worker.lock");
const RENDER_LOCK = path.join(SOCIAL_DIR, "render.lock");
/** Kilit al; 30 dakikadır tazelenmemişse öncekinin kalıntısı (öldürülmüş işçi): kaldır, bu turu atla. */
function takeLock(dir) {
  try {
    fs.mkdirSync(dir);
    return true;
  } catch {
    try {
      if (Date.now() - fs.statSync(dir).mtimeMs > 30 * 60_000) fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* bu arada kalktı */
    }
    return false;
  }
}
const LONG = process.argv.includes("--uzun");
const MAC = process.argv.find((a) => a.startsWith("--mac-"));
if (!MAC && !takeLock(LONG ? RENDER_LOCK : LOCK)) process.exit(0);
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
const q = (text, params) => pool.query(text, params);

/** Aktarımın tetikleyicisi: bölüm dosyaları + kelime havuzu + Defne tablosu değiştiyse. */
function sourceHash() {
  const h = crypto.createHash("sha1");
  for (const f of fs.readdirSync(EP_DIR).filter((x) => x.endsWith(".mjs")).sort()) h.update(f).update(fs.readFileSync(path.join(EP_DIR, f)));
  if (fs.existsSync(LONG_DIR)) for (const f of fs.readdirSync(LONG_DIR).filter((x) => x.endsWith(".mjs")).sort()) h.update(`yatay/${f}`).update(fs.readFileSync(path.join(LONG_DIR, f)));
  h.update(fs.readFileSync(path.join(ROOT, "data/app/words.json")));
  for (const f of ["tts-map.json", "tts-hold.json"]) {
    const p = path.join(TTS, f);
    if (fs.existsSync(p)) h.update(String(fs.statSync(p).mtimeMs));
  }
  return h.digest("hex");
}

const STATE = path.join(SOCIAL_DIR, "import-state.json");
const hashOf = (template, data) => crypto.createHash("sha1").update(JSON.stringify({ template, data })).digest("hex");

async function importEpisodes(force = false) {
  const src = sourceHash();
  let prev = {};
  try {
    prev = JSON.parse(fs.readFileSync(STATE, "utf8"));
  } catch {
    /* ilk koşu */
  }
  if (!force && prev.hash === src) return;
  const errors = [];
  const counts = { new: 0, updated: 0, conflict: 0, archived: 0, same: 0 };
  // bölüm bölüm yükle: biri bozuksa ötekiler aktarılsın (yatay bölümler "yatay-" önekli kimlikle)
  const ids = fs.readdirSync(EP_DIR).filter((x) => x.endsWith(".mjs")).map((x) => x.slice(0, -4)).sort();
  const longIds = fs.existsSync(LONG_DIR) ? fs.readdirSync(LONG_DIR).filter((x) => x.endsWith(".mjs")).map((x) => `yatay-${x.slice(0, -4)}`).sort() : [];
  const seen = [];
  for (const id of [...ids, ...longIds]) {
    let ep;
    try {
      ep = id.startsWith("yatay-") ? (await loadLong([id]))[0] : (await loadEpisodes([id])).episodes[0];
    } catch (e) {
      errors.push(`${id}: ${e.message}`);
      seen.push(id); // yüklenemedi diye arşivlenmesin
      continue;
    }
    seen.push(id);
    const hash = hashOf(ep.template, ep.data);
    const cur = (await q("select revision, origin_hash, edited, slot, origin_slot, yt_title, origin_yt_title from social_episodes where id = $1", [id])).rows[0];
    const client = await pool.connect();
    try {
      await client.query("begin");
      if (!cur) {
        await client.query(
          `insert into social_episodes (id, template, format, slot, data, revision, spoken, origin, origin_hash, origin_slot, origin_spoken, used, yt_title, origin_yt_title, updated_by)
           values ($1, $2, $9, $3, $4, 1, $5, $4, $6, $3, $5, $7, $8, $8, 'claude')`,
          [id, ep.template, ep.slot ?? null, ep.data, JSON.stringify(ep.spoken), hash, JSON.stringify(ep.used), ep.ytTitle, ep.format === "yatay" ? "yatay" : "dikey"],
        );
        await client.query("insert into social_revisions (episode_id, revision, data, spoken, slot, author, note) values ($1, 1, $2, $3, $4, 'claude', 'depodan')", [id, ep.data, JSON.stringify(ep.spoken), ep.slot ?? null]);
        counts.new++;
      } else {
        // saat: stüdyoda değiştirilmediyse depodakini izler
        const slot = cur.slot === cur.origin_slot ? (ep.slot ?? null) : cur.slot;
        // YouTube başlığı da öyle (yayın bilgisi: sürüm açmaz, onaya dokunmaz)
        const yt = cur.yt_title === cur.origin_yt_title ? ep.ytTitle : cur.yt_title;
        await client.query("update social_episodes set yt_title = $2, origin_yt_title = $3 where id = $1", [id, yt, ep.ytTitle]);
        if (cur.origin_hash === hash) {
          await client.query("update social_episodes set slot = $2, origin_slot = $3, used = $4, archived_at = null where id = $1", [id, slot, ep.slot ?? null, JSON.stringify(ep.used)]);
          counts.same++;
        } else if (cur.edited) {
          await client.query(
            "update social_episodes set origin = $2, origin_hash = $3, origin_slot = $4, used = $5, slot = $6, origin_spoken = $7, origin_changed = true, archived_at = null, updated_at = now() where id = $1",
            [id, ep.data, hash, ep.slot ?? null, JSON.stringify(ep.used), slot, JSON.stringify(ep.spoken)],
          );
          counts.conflict++;
        } else {
          const rev = cur.revision + 1;
          await client.query(
            `update social_episodes set template = $2, data = $3, revision = $4, spoken = $5, origin = $3, origin_hash = $6, origin_slot = $7,
               origin_spoken = $5, used = $8, slot = $9, origin_changed = false, archived_at = null, updated_by = 'claude', updated_at = now() where id = $1`,
            [id, ep.template, ep.data, rev, JSON.stringify(ep.spoken), hash, ep.slot ?? null, JSON.stringify(ep.used), slot],
          );
          await client.query("insert into social_revisions (episode_id, revision, data, spoken, slot, author, note) values ($1, $2, $3, $4, $5, 'claude', 'depodan güncellendi')", [id, rev, ep.data, JSON.stringify(ep.spoken), slot]);
          await client.query("update social_renders set status = 'cancelled', finished_at = now() where episode_id = $1 and status = 'queued'", [id]);
          counts.updated++;
        }
      }
      await client.query("commit");
    } catch (e) {
      await client.query("rollback");
      errors.push(`${id}: ${e.message}`);
    } finally {
      client.release();
    }
  }
  const gone = await q("update social_episodes set archived_at = now() where archived_at is null and not (id = any($1)) returning id", [seen]);
  counts.archived = gone.rowCount;
  fs.writeFileSync(STATE, JSON.stringify({ at: new Date().toISOString(), hash: src, counts, errors }, null, 1));
  log("aktarım", JSON.stringify(counts), errors.length ? `HATA ${errors.length}: ${errors.join(" | ")}` : "");
}

/**
 * Samet bir ses talebini işleme aldıysa ses bekçisini HEMEN koştur: metin geceyi beklemeden Mac'in üretim listesine
 * (TTS_OWN_DIR/eksik.jsonl) girer; Mac sabah turunda ya da elle eksik_mac.sh ile üretir.
 */
async function audioRequests() {
  if (!process.env.TTS_OWN_DIR) return;
  let last = 0;
  const st = path.join(SOCIAL_DIR, "watch-state.json");
  try {
    last = JSON.parse(fs.readFileSync(st, "utf8")).last || 0;
  } catch {
    /* ilk koşu */
  }
  let r;
  try {
    r = (await q("select extract(epoch from max(updated_at)) * 1000 as at from social_requests where status = 'in_progress'")).rows[0];
  } catch {
    return; // tablo yok
  }
  const at = Number(r?.at) || 0;
  if (!at || at <= last) return;
  const out = spawnSync(process.execPath, [path.join(ROOT, "node_modules/tsx/dist/cli.mjs"), path.join(ROOT, "scripts/tts-own-watch.ts")], { encoding: "utf8", env: process.env, cwd: ROOT, timeout: 5 * 60_000 });
  log("ses bekçisi (talep işleme alındı):", out.status, (out.stdout || out.stderr || "").trim().split("\n").slice(0, 3).join(" | "));
  fs.writeFileSync(st, JSON.stringify({ last: at }));
}

/**
 * Yatay anlatıcı (ElevenLabs, yatay/anlatici.mjs): kaydedilmiş metinde kaydı olmayan anlatıcı satırlarını üret (koşu
 * başına en çok 20; kalan sonraki koşuya). Editör metni değiştirince talep gerekmeden birkaç dakikada gelir.
 */
async function narration() {
  if (!process.env.ELEVENLABS_API_KEY) return;
  // Bölüm verisinde narrationPaused=true ise metin taslağı otomatik ses üretmez.
  // Alanı olmayan eski bölümlerde mevcut otomatik anlatım davranışı korunur.
  const { rows } = await q("select spoken from social_episodes where format = 'yatay' and archived_at is null and data->>'narrationPaused' IS DISTINCT FROM 'true' and (slot is null or slot >= to_char(now() - interval '2 days', 'YYYY-MM-DD'))");
  const keys = rows.flatMap((r) => r.spoken).filter(isNarration);
  if (!keys.length) return;
  const r = await generateNarration(keys, { log });
  if (r.errors.length) log(`anlatıcı hata ${r.errors.length}: ${r.errors.slice(0, 3).join(" | ")}`);
}

async function recoverStale() {
  const r = await q(
    `update social_renders set status = 'failed', error = 'işçi yanıt vermedi (sunucu yeniden başlamış olabilir); yeniden onaylayın', finished_at = now()
     where status = 'running' and coalesce(heartbeat_at, started_at) < now() - interval '${STALE_MS / 1000} seconds' returning id`,
  );
  if (r.rowCount) log("takılan üretim kapatıldı:", r.rows.map((x) => x.id).join(", "));
}

/** Bir sürümün seslendirilen metinleri: motorun kendisine sorulur (şablonlar metni veriden türetebilir). */
async function spokenOf(browser, template, data) {
  const { page } = buildPage("audit.html", { data: {}, clips: {}, templates: [template], meta: { EPISODES: {} } });
  const file = path.join(SOCIAL_DIR, "tmp", `spoken-${process.pid}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, localDoc(page));
  const pgx = await browser.newPage();
  try {
    await pgx.goto(`file://${file}`);
    await pgx.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
    return await pgx.evaluate(([t, d]) => E.spoken(t, d), [template, data]);
  } finally {
    await pgx.close();
    fs.rmSync(file, { force: true });
  }
}

/** Üretim bitti: satır "done", aynı bölümün eski videolarının dosyaları silinir (satır iz olarak kalır). */
async function finish(job, r, rel, t0) {
  await q(
    "update social_renders set status = 'done', progress = 1, finished_at = now(), duration = $2, bytes = $3, lufs = $4, true_peak = $5, dir = $6, error = null where id = $1",
    [job.id, r.duration, r.bytes, r.lufs, r.truePeak, rel],
  );
  const old = await q("select id, dir from social_renders where episode_id = $1 and status = 'done' and id <> $2 and dir is not null", [job.episode_id, job.id]);
  for (const o of old.rows) {
    fs.rmSync(path.join(SOCIAL_DIR, o.dir), { recursive: true, force: true });
    await q("update social_renders set dir = null where id = $1", [o.id]);
  }
  log(`✓ #${job.id} ${job.episode_id}: ${r.duration.toFixed(1)} sn, ${(r.bytes / 1e6).toFixed(1)} MB, ${r.lufs} LUFS, tepe ${r.truePeak} dBTP, ${((Date.now() - t0) / 1000).toFixed(0)} sn`);
}

/** Mac komutları (bkz. dosya başı). Çıktı stdout'a JSON. */
async function macCommand(cmd) {
  const arg = (i) => process.argv[process.argv.indexOf(cmd) + i];
  const status = (busy) => fs.writeFileSync(path.join(SOCIAL_DIR, "mac-status.json"), JSON.stringify({ seenAt: new Date().toISOString(), busy }));
  if (cmd === "--mac-claim") {
    const job = (
      await q(
        `update social_renders set status = 'running', started_at = now(), heartbeat_at = now(), progress = 0
         where id = (select id from social_renders where status = 'queued' and target = 'mac' order by created_at limit 1 for update skip locked) returning *`,
      )
    ).rows[0];
    const busy = (await q("select 1 from social_renders where status = 'running' and target = 'mac' limit 1")).rowCount > 0;
    status(busy);
    if (!job) return console.log("{}");
    const ep = (await q("select template, format from social_episodes where id = $1", [job.episode_id])).rows[0];
    const rev = (await q("select data from social_revisions where episode_id = $1 and revision = $2", [job.episode_id, job.revision])).rows[0];
    if (!ep || !rev || ep.format !== "yatay") {
      await q("update social_renders set status = 'failed', error = 'Mac: bölüm, sürüm ya da biçim uygun değil', finished_at = now() where id = $1", [job.id]);
      return console.log("{}");
    }
    console.error(`Mac işi aldı: #${job.id} ${job.episode_id} r${job.revision}`);
    return console.log(JSON.stringify({ id: job.id, episodeId: job.episode_id, revision: job.revision, template: ep.template, data: rev.data, engine: engineSource([ep.template]), dir: path.join("out", job.episode_id, `r${job.revision}-${job.id}`) }));
  }
  const id = Number(arg(1));
  if (!Number.isInteger(id)) throw new Error("iş numarası yok");
  const job = (await q("select * from social_renders where id = $1 and target = 'mac'", [id])).rows[0];
  if (!job) throw new Error(`Mac işi yok: ${id}`);
  if (cmd === "--mac-beat") {
    status(true);
    await q("update social_renders set progress = $2, heartbeat_at = now() where id = $1 and status = 'running'", [id, Math.max(0, Math.min(1, Number(arg(2)) || 0))]);
    return console.log("{}");
  }
  if (cmd === "--mac-fail") {
    status(false);
    const msg = Buffer.from(String(arg(2) || ""), "base64").toString("utf8").slice(0, 1800);
    await q("update social_renders set status = 'failed', error = $2, finished_at = now() where id = $1 and status = 'running'", [id, `Mac: ${msg}`]);
    console.error(`✗ Mac #${id}: ${msg}`);
    return console.log("{}");
  }
  if (cmd === "--mac-done") {
    status(false);
    const r = JSON.parse(Buffer.from(String(arg(2) || ""), "base64").toString("utf8"));
    const rel = path.join("out", job.episode_id, `r${job.revision}-${job.id}`);
    const mp4 = path.join(SOCIAL_DIR, rel, `${job.episode_id}.mp4`);
    if (job.status !== "running") throw new Error(`iş artık çalışmıyor (${job.status}); dosyalar silinmedi: ${rel}`);
    if (!fs.existsSync(mp4) || !fs.existsSync(path.join(SOCIAL_DIR, rel, "kapak.jpg"))) throw new Error(`dosyalar eksik: ${rel}`);
    await finish(job, { duration: Number(r.duration), bytes: fs.statSync(mp4).size, lufs: Number(r.lufs), truePeak: Number(r.truePeak) }, rel, Date.parse(job.started_at));
    return console.log("{}");
  }
  throw new Error(`bilinmeyen komut: ${cmd}`);
}

/** long: yalnız yatay bölümlerin üretimi (ayrı birim), değilse yalnız dikey. */
async function renderNext(long) {
  const job = (
    await q(
      `update social_renders set status = 'running', started_at = now(), heartbeat_at = now(), progress = 0
       where id = (select r.id from social_renders r join social_episodes e on e.id = r.episode_id
                   where r.status = 'queued' and r.target = 'server' and (e.format = 'yatay') = $1 order by r.created_at limit 1 for update of r skip locked) returning *`,
      [long],
    )
  ).rows[0];
  if (!job) return;
  const t0 = Date.now();
  log(`üretim #${job.id} ${job.episode_id} r${job.revision}`);
  const browser = await launchBrowser();
  const tmp = path.join(SOCIAL_DIR, "tmp", `r${job.id}`);
  try {
    const ep = (await q("select template, format from social_episodes where id = $1", [job.episode_id])).rows[0];
    const rev = (await q("select data from social_revisions where episode_id = $1 and revision = $2", [job.episode_id, job.revision])).rows[0];
    if (!ep || !rev) throw new Error("bölüm ya da sürüm bulunamadı");
    const rel = path.join("out", job.episode_id, `r${job.revision}-${job.id}`);
    let last = 0;
    const onProgress = async (f) => {
      if (Date.now() - last < 1000) return;
      last = Date.now();
      const now = new Date();
      fs.utimesSync(long ? RENDER_LOCK : LOCK, now, now); // kilit tazelemesi: uzun üretimde "kalıntı" sanılmasın
      await q("update social_renders set progress = $2, heartbeat_at = now() where id = $1", [job.id, Math.round(f * 1000) / 1000]);
    };
    if (ep.format === "yatay") {
      const r = await renderLong(browser, { id: job.episode_id, template: ep.template, data: rev.data }, { dir: path.join(SOCIAL_DIR, rel), tmp, check: true, onProgress });
      await finish(job, r, rel, t0);
      return;
    }
    const spoken = await spokenOf(browser, ep.template, rev.data);
    const { clips, missing } = resolveClips(spoken);
    if (missing.length) throw new Error(`Defne sesi yok: ${missing.join(" · ")}`);
    const html = renderDoc({ template: ep.template, data: rev.data }, clips, tmp);
    const r = await renderVideo(browser, html, { name: job.episode_id, dir: path.join(SOCIAL_DIR, rel), tmp, check: true, onProgress });
    await finish(job, r, rel, t0);
  } catch (e) {
    log(`✗ #${job.id} ${job.episode_id}: ${e.message}`);
    await q("update social_renders set status = 'failed', error = $2, finished_at = now() where id = $1", [job.id, String(e.message).slice(0, 2000)]);
  } finally {
    await browser.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

try {
  if (MAC) await macCommand(MAC);
  else if (LONG) await renderNext(true);
  else {
    await importEpisodes(process.argv.includes("--force-import"));
    if (!process.argv.includes("--import")) {
      await audioRequests();
      await narration();
      await recoverStale();
      await renderNext(false);
    }
  }
} catch (e) {
  log("işçi hatası:", e.stack || e.message);
  process.exitCode = 1;
} finally {
  await pool.end();
  if (!MAC) fs.rmSync(LONG ? RENDER_LOCK : LOCK, { recursive: true, force: true });
}
