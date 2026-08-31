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
    fs.readFile("/opt/wortspiel/active", "utf8").catch(() => ""),
    run("journalctl", ["-u", "wortspiel-webhook", "-n", "500", "--no-pager", "-o", "short-iso"]),
    run("systemctl", ["is-active", ...INSTANCES.map((i) => `wortspiel@${i}`)]),
  ]);

  const mem = parseMem(meminfo);
  const disk = parseDf(dfOut);
  const c = pgConn[0] ?? {};
  const activeColor = activeRaw.trim() || "?";
  const liveCommit = activeColor !== "?" ? (await run("git", ["-C", `/opt/wortspiel/${activeColor}`, "rev-parse", "--short", "HEAD"])).trim() : "";
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
    generatedAt: new Date().toISOString(),
  };
}
