import "server-only";
import os from "node:os";
import { promises as fs } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * Sunucu & ops metrikleri (admin panosu "Sunucu" sekmesi).
 *
 * Uygulama kendi VPS'inde (Netcup) systemd instance'ı olarak root çalışıyor;
 * bu yüzden /proc'u okuyabilir ve systemctl/journalctl/git/df çalıştırabilir.
 * HER ölçüm hataya karşı korumalı (dosya yoksa / komut yoksa güvenli sıfır):
 * yerel geliştirmede ya da farklı bir ortamda pano yine açılır, sunucu bloğu
 * boş/sıfır görünür. Yalnız admin kapısından SONRA çağrılır (owner-only).
 */
const exec = promisify(execFile);
async function run(cmd: string, args: string[], timeout = 3000): Promise<string> {
  try {
    const { stdout } = await exec(cmd, args, { timeout, maxBuffer: 4 * 1024 * 1024 });
    return stdout;
  } catch {
    return "";
  }
}
async function readProc(path: string): Promise<string> {
  try { return await fs.readFile(path, "utf8"); } catch { return ""; }
}

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  try {
    const r = (await db.execute(q)) as unknown;
    if (Array.isArray(r)) return r as Row[];
    return ((r as { rows?: Row[] }).rows ?? []) as Row[];
  } catch { return []; }
}
const num = (v: unknown) => Number(v) || 0;

export type ServerMetrics = {
  host: { cpuCount: number; cpuPct: number; load1: number; load5: number; load15: number; uptimeSec: number };
  mem: { totalMB: number; availMB: number; usedPct: number };
  disk: { totalGB: number; freeGB: number; usedPct: number };
  pg: { total: number; active: number; idle: number; maxConn: number; dbSizeMB: number; cacheHitPct: number; topTables: { name: string; mb: number }[] };
  app: { activeColor: string; liveCommit: string; instances: { name: string; up: boolean }[] };
  deploys: { time: string; status: "ok" | "fail" | "start"; detail: string }[];
  /**
   * Git dışı işletim işleri — sunucuda kurulu ama panoda görünmüyordu.
   *
   * Yedek: gecelik `pg_dump` (`/opt/lernomi/backup.sh`). Başarısız olursa tek iz
   * `systemctl --failed` idi. `lastAt` boşsa ya da bir günden eskiyse panoda kırmızı.
   * TTS önbelleği: nginx'in paylaşımlı ses önbelleği (1 GB tavan).
   * Sertifika: certbot otomatik yeniliyor; yenileme susarsa ilk görünen yer burası.
   */
  ops: {
    backup: { lastAt: string | null; ageH: number | null; sizeMB: number; files: number; result: string };
    failedUnits: string[];
    ttsCacheMB: number;
    certDaysLeft: number | null;
  };
  /**
   * UÇTAN UCA İSTEK SAĞLIĞI — nginx'in bugünkü erişim logu.
   *
   * Panodaki her şey uygulamanın KENDİ yazdığı kayıttan okunuyordu; uygulama
   * hiç cevap veremiyorsa (502) ya da uç hata fırlatıyorsa (500) iz yalnız
   * nginx'te kalıyordu. 10–13 Eylül'de hatırlatma ucu dört gece 500 döndü ve
   * bu yalnız log elle taranınca görüldü.
   */
  http: {
    since: string | null;
    total: number;
    api: number;
    s4xx: number;
    s5xx: number;
    /** Uygulamanın rotaları: 5xx veren uçlar (yol normalleştirilmiş). */
    errors: { route: string; status: number; count: number }[];
    /** En yoğun API uçları — polling patlamasını yakalamak için. */
    topApi: { route: string; count: number }[];
    /** Var olmayan yollara gelen tarama istekleri (wp-admin, .env, phpunit…). */
    probes: number;
  };
  generatedAt: string;
};

/** /proc/stat iki anlık ölçüm arası CPU kullanımı (%). */
function parseStat(s: string): { idle: number; total: number } {
  const line = s.split("\n")[0] || "";
  const p = line.trim().split(/\s+/).slice(1).map(Number);
  const idle = (p[3] || 0) + (p[4] || 0);
  const total = p.reduce((a, b) => a + (b || 0), 0);
  return { idle, total };
}
async function cpuPct(): Promise<number> {
  const a = parseStat(await readProc("/proc/stat"));
  if (!a.total) return 0;
  await new Promise((r) => setTimeout(r, 140));
  const b = parseStat(await readProc("/proc/stat"));
  const idle = b.idle - a.idle, total = b.total - a.total;
  return total > 0 ? Math.max(0, Math.min(100, Math.round((1 - idle / total) * 100))) : 0;
}

function parseMem(meminfo: string): { totalMB: number; availMB: number } {
  const get = (k: string) => {
    const m = meminfo.match(new RegExp(`^${k}:\\s+(\\d+)`, "m"));
    return m ? Number(m[1]) / 1024 : 0; // kB → MB
  };
  return { totalMB: Math.round(get("MemTotal")), availMB: Math.round(get("MemAvailable")) };
}

function parseDf(out: string): { totalGB: number; freeGB: number } {
  const last = out.trim().split("\n").pop() || "";
  const c = last.trim().split(/\s+/);
  // df -B1 /: Filesystem 1B-blocks Used Available ... — total=c[1], avail=c[3]
  const total = num(c[1]) / 1e9, free = num(c[3]) / 1e9;
  return { totalGB: Math.round(total), freeGB: Math.round(free) };
}

/** Webhook journal'ından son deploy olaylarını çıkar. */
function parseDeploys(journal: string): ServerMetrics["deploys"] {
  const out: ServerMetrics["deploys"] = [];
  for (const raw of journal.split("\n")) {
    const time = (raw.match(/^(\S+T\S+|\w{3} \d+ [\d:]+)/) || [])[0] || "";
    if (/deploy done|\[deploy\] OK|deployed certificate/i.test(raw)) out.push({ time, status: "ok", detail: "deploy tamamlandı" });
    else if (/deploy FAILED|\[deploy\] HATA|error occurred/i.test(raw)) out.push({ time, status: "fail", detail: raw.replace(/^\S+\s+\S+\s+\S+\s+/, "").slice(0, 120) });
    else if (/push to main/i.test(raw)) out.push({ time, status: "start", detail: "push → deploy tetiklendi" });
  }
  return out.slice(-14).reverse();
}

const BACKUP_DIR = "/opt/lernomi/backups/daily";

/** En yeni yedek dosyası (sağlama dosyaları hariç). */
async function latestBackup(): Promise<{ lastAt: string | null; ageH: number | null; sizeMB: number; files: number }> {
  try {
    const names = (await fs.readdir(BACKUP_DIR)).filter((n) => n.endsWith(".dump"));
    const stats = await Promise.all(names.map(async (n) => ({ n, st: await fs.stat(`${BACKUP_DIR}/${n}`) })));
    stats.sort((a, b) => b.st.mtimeMs - a.st.mtimeMs);
    const top = stats[0];
    if (!top) return { lastAt: null, ageH: null, sizeMB: 0, files: 0 };
    return {
      lastAt: top.st.mtime.toISOString(),
      ageH: Math.round(((Date.now() - top.st.mtimeMs) / 3_600_000) * 10) / 10,
      sizeMB: Math.round((top.st.size / 1e6) * 10) / 10,
      files: stats.length,
    };
  } catch {
    return { lastAt: null, ageH: null, sizeMB: 0, files: 0 };
  }
}

/** Sertifikanın kalan günü; alan adı dizini değişebildiği için live/ altındaki ilk sertifika. */
async function certDaysLeft(): Promise<number | null> {
  try {
    const dirs = (await fs.readdir("/etc/letsencrypt/live")).filter((d) => d !== "README");
    if (!dirs.length) return null;
    const out = await run("openssl", ["x509", "-enddate", "-noout", "-in", `/etc/letsencrypt/live/${dirs[0]}/cert.pem`]);
    const m = out.match(/notAfter=(.+)/);
    if (!m) return null;
    return Math.floor((new Date(m[1].trim()).getTime() - Date.now()) / 86_400_000);
  } catch {
    return null;
  }
}

/** `/api/social/users/abc123/x?y` → `/api/social/users/:id` (ilk dört parça). */
function routeOf(path: string): string {
  const clean = path.split("?")[0] ?? "";
  return clean
    .split("/")
    .slice(0, 5)
    .map((seg) => (/^[0-9]+$|^[0-9a-f-]{16,}$|^[A-Za-z0-9_-]{20,}$/.test(seg) ? ":id" : seg))
    .join("/");
}

const LINE = /^\S+ \S+ \S+ \[([^\]]+)\] "(\S+) (\S+)[^"]*" (\d{3}) /;

/** nginx combined log formatını okur; dosya yoksa (yerel geliştirme) boş döner. */
async function httpHealth(): Promise<ServerMetrics["http"]> {
  const empty: ServerMetrics["http"] = { since: null, total: 0, api: 0, s4xx: 0, s5xx: 0, errors: [], topApi: [], probes: 0 };
  let text = "";
  try {
    text = await fs.readFile("/var/log/nginx/access.log", "utf8");
  } catch {
    return empty;
  }
  const errors = new Map<string, number>();
  const api = new Map<string, number>();
  let since: string | null = null;
  let total = 0, apiCount = 0, s4xx = 0, s5xx = 0, probes = 0;
  for (const line of text.split("\n")) {
    const m = LINE.exec(line);
    if (!m) continue;
    const [, time, , path, statusRaw] = m;
    const status = Number(statusRaw);
    since ??= time;
    total++;
    const isApi = path.startsWith("/api/");
    if (status >= 500) {
      s5xx++;
      const key = `${routeOf(path)} ${status}`;
      errors.set(key, (errors.get(key) ?? 0) + 1);
    } else if (status >= 400) {
      s4xx++;
      if (status === 404 && !isApi && !path.startsWith("/_next/")) probes++;
    }
    if (isApi) {
      apiCount++;
      const r = routeOf(path);
      api.set(r, (api.get(r) ?? 0) + 1);
    }
  }
  return {
    since,
    total,
    api: apiCount,
    s4xx,
    s5xx,
    errors: [...errors.entries()]
      .map(([k, count]) => {
        const i = k.lastIndexOf(" ");
        return { route: k.slice(0, i), status: Number(k.slice(i + 1)), count };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 12),
    topApi: [...api.entries()].map(([route, count]) => ({ route, count })).sort((a, b) => b.count - a.count).slice(0, 12),
    probes,
  };
}

const INSTANCES = ["blue-3001", "blue-3002", "blue-3003", "green-3011", "green-3012", "green-3013"];

export async function getServerMetrics(): Promise<ServerMetrics> {
  const [cpu, meminfo, dfOut, pgConn, pgSize, pgCache, pgTables, activeRaw, journal, instRaw] = await Promise.all([
    cpuPct(),
    readProc("/proc/meminfo"),
    run("df", ["-B1", "/"]),
    rows(sql`select count(*)::int total, count(*) filter (where state='active')::int active, count(*) filter (where state='idle')::int idle, (select setting::int from pg_settings where name='max_connections') maxc from pg_stat_activity where datname = current_database()`),
    rows(sql`select pg_database_size(current_database())::bigint bytes`),
    rows(sql`select round(sum(blks_hit) * 100.0 / nullif(sum(blks_hit) + sum(blks_read), 0), 1) hit from pg_stat_database where datname = current_database()`),
    rows(sql`select relname name, pg_total_relation_size(relid)::bigint bytes from pg_statio_user_tables order by pg_total_relation_size(relid) desc limit 6`),
    fs.readFile("/opt/lernomi/active", "utf8").catch(() => ""),
    run("journalctl", ["-u", "lernomi-webhook", "-n", "500", "--no-pager", "-o", "short-iso"]),
    run("systemctl", ["is-active", ...INSTANCES.map((i) => `lernomi@${i}`)]),
  ]);
  const [backup, backupResult, failedRaw, ttsDu, cert, http] = await Promise.all([
    latestBackup(),
    run("systemctl", ["show", "lernomi-backup.service", "-p", "Result", "--value"]),
    run("systemctl", ["--failed", "--plain", "--no-legend"]),
    run("du", ["-sm", "/var/cache/nginx/lernomi-tts"]),
    certDaysLeft(),
    httpHealth(),
  ]);

  const mem = parseMem(meminfo);
  const disk = parseDf(dfOut);
  const c = pgConn[0] ?? {};
  const activeColor = activeRaw.trim() || "?";
  const liveCommit = activeColor !== "?" ? (await run("git", ["-C", `/opt/lernomi/${activeColor}`, "rev-parse", "--short", "HEAD"])).trim() : "";
  const instStates = instRaw.trim().split("\n");

  return {
    host: {
      cpuCount: os.cpus().length || 0,
      cpuPct: cpu,
      load1: os.loadavg()[0] ?? 0,
      load5: os.loadavg()[1] ?? 0,
      load15: os.loadavg()[2] ?? 0,
      uptimeSec: Math.round(os.uptime()),
    },
    mem: { totalMB: mem.totalMB, availMB: mem.availMB, usedPct: mem.totalMB ? Math.round((1 - mem.availMB / mem.totalMB) * 100) : 0 },
    disk: { totalGB: disk.totalGB, freeGB: disk.freeGB, usedPct: disk.totalGB ? Math.round((1 - disk.freeGB / disk.totalGB) * 100) : 0 },
    pg: {
      total: num(c.total), active: num(c.active), idle: num(c.idle), maxConn: num(c.maxc),
      dbSizeMB: Math.round(num(pgSize[0]?.bytes) / 1e6),
      cacheHitPct: num(pgCache[0]?.hit),
      topTables: pgTables.map((r) => ({ name: String(r.name ?? ""), mb: Math.round(num(r.bytes) / 1e6 * 10) / 10 })),
    },
    app: {
      activeColor, liveCommit,
      instances: INSTANCES.map((name, i) => ({ name, up: (instStates[i] ?? "").trim() === "active" })),
    },
    deploys: parseDeploys(journal),
    ops: {
      backup: { ...backup, result: backupResult.trim() },
      failedUnits: failedRaw.split("\n").map((l) => l.replace(/^[\s●*]+/, "").split(/\s+/)[0] ?? "").filter(Boolean),
      ttsCacheMB: num(ttsDu.trim().split(/\s+/)[0]),
      certDaysLeft: cert,
    },
    http,
    generatedAt: new Date().toISOString(),
  };
}
