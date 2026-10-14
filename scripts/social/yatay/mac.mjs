#!/usr/bin/env node
/*
  MAC'TE ÜRETİM (2026-10-14; Samet: "Mac'te üret butonu makul olur"). Stüdyoda "Mac'te üret" ile onaylanan yatay
  bölümü Samet'in Mac'i üretir: sunucuda ~1 saat süren 11 dakikalık video Mac'te ~15 dakika.

  Akış (launchd app.lernomi.yatay-uret, dakikada bir `--once`):
    1. ssh lernomi social-mac.sh --mac-claim  → Mac görüldü yazılır; sıradaki "mac" işi (veri + sunucunun motor kaynağı)
    2. gereken kayıtlar sunucudan çekilir (.shots/social/yatay/tts), video yatay/uret.mjs ile üretilir (motor sunucudan:
       Mac'teki kopya geride kalsa da kare sunucununkiyle aynı); ilerleme 20 sn'de bir --mac-beat
    3. dosyalar rsync ile SOCIAL_DIR/out/<bölüm>/r<sürüm>-<iş>/'e, sahibi lernomi; --mac-done → iş "done"
    Hata → --mac-fail (stüdyoda görünür; yeniden onaylanabilir ya da sunucuya alınabilir).
  Aynı anda tek üretim: /tmp/lernomi-yatay-uret.lock. Mac uyurken çalışmaz: caffeinate ile çağrılır.

  node scripts/social/yatay/mac.mjs --once
*/
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync, spawn } from "node:child_process";
import { pullFromServer, OUT } from "./sayfa.mjs";
import { spokenOf } from "./icerik.mjs";
import { renderLong } from "./uret.mjs";
import { launchBrowser } from "../lib/page.mjs";

const HOST = "lernomi";
const REMOTE = "/opt/lernomi/social-mac.sh";
const SOCIAL = "/opt/lernomi/social";
const log = (...a) => console.log(new Date().toISOString(), ...a);
const b64 = (x) =>
  Buffer.from(typeof x === "string" ? x : JSON.stringify(x)).toString("base64");

/** Sunucuda işçi komutu; çıktının son satırı JSON. */
function remote(args) {
  const r = spawnSync(
    "ssh",
    ["-o", "ConnectTimeout=15", HOST, REMOTE, ...args],
    { encoding: "utf8", maxBuffer: 1 << 28 },
  );
  if (r.status !== 0)
    throw new Error(
      `ssh ${args[0]}: ${(r.stderr || r.stdout || "").trim().slice(-500)}`,
    );
  const last = r.stdout.trim().split("\n").filter(Boolean).pop() || "{}";
  return JSON.parse(last);
}
/** Kalp atışı arka planda (üretimi bekletmesin). */
const beat = (id, f) =>
  spawn(
    "ssh",
    [
      "-o",
      "ConnectTimeout=10",
      HOST,
      REMOTE,
      "--mac-beat",
      String(id),
      f.toFixed(3),
    ],
    { stdio: "ignore" },
  ).unref();

const LOCK = path.join(os.tmpdir(), "lernomi-yatay-uret.lock");
try {
  fs.mkdirSync(LOCK);
} catch {
  if (Date.now() - fs.statSync(LOCK).mtimeMs < 3 * 3600_000) process.exit(0);
  fs.rmSync(LOCK, { recursive: true, force: true });
  fs.mkdirSync(LOCK);
}
let job = null;
// iş yoksa sessizce çık; process.exit finally'yi atlıyordu, kilit kalıyor ve alıcı 3 saat susuyordu (2026-10-14)
const IDLE = Symbol("iş yok");
try {
  job = remote(["--mac-claim"]);
  if (!job.id) throw IDLE;
  log(`iş #${job.id} ${job.episodeId} r${job.revision}`);
  pullFromServer(spokenOf(job.data));
  const dir = path.join(OUT, "mac", `${job.id}`);
  fs.rmSync(dir, { recursive: true, force: true });
  const browser = await launchBrowser();
  let last = 0;
  let r;
  try {
    r = await renderLong(
      browser,
      {
        id: job.episodeId,
        template: job.template,
        data: job.data,
        engine: job.engine,
      },
      {
        dir: path.join(dir, "out"),
        tmp: path.join(dir, "tmp"),
        check: true,
        onProgress: async (f) => {
          fs.utimesSync(LOCK, new Date(), new Date());
          if (Date.now() - last > 20_000) {
            last = Date.now();
            beat(job.id, f);
          }
        },
      },
    );
  } finally {
    await browser.close();
  }
  const target = `${SOCIAL}/${job.dir}/`;
  const mk = spawnSync(
    "ssh",
    [
      HOST,
      `mkdir -p ${target} && chown -R lernomi:lernomi ${SOCIAL}/out/${job.episodeId}`,
    ],
    { encoding: "utf8" },
  );
  if (mk.status !== 0) throw new Error(`hedef klasör: ${mk.stderr}`);
  const rs = spawnSync(
    "rsync",
    [
      "-a",
      "--chmod=D755,F644",
      `${path.join(dir, "out")}/`,
      `${HOST}:${target}`,
    ],
    { encoding: "utf8" },
  );
  if (rs.status !== 0) throw new Error(`yükleme: ${rs.stderr}`);
  spawnSync("ssh", [HOST, `chown -R lernomi:lernomi ${target}`]);
  remote([
    "--mac-done",
    String(job.id),
    b64({ duration: r.duration, lufs: r.lufs, truePeak: r.truePeak }),
  ]);
  fs.rmSync(dir, { recursive: true, force: true });
  log(
    `✓ #${job.id} ${job.episodeId}: ${r.duration.toFixed(1)} sn, ${(r.bytes / 1e6).toFixed(1)} MB, ${r.lufs} LUFS`,
  );
} catch (e) {
  if (e === IDLE) {
    /* sırada iş yok */
  } else {
    log("✗", e.message);
    if (job?.id) {
      try {
        remote([
          "--mac-fail",
          String(job.id),
          b64(String(e.message).slice(0, 1500)),
        ]);
      } catch (e2) {
        log("hata bildirilemedi:", e2.message);
      }
    }
    process.exitCode = 1;
  }
} finally {
  fs.rmSync(LOCK, { recursive: true, force: true });
}
