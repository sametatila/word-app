import "server-only";
import { promises as fs } from "node:fs";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { appSettings } from "@/lib/db/schema";
import { getServerMetrics } from "@/lib/server-metrics";
import { CRON_EXPECTED } from "@/lib/admin-coverage";
import { appControl } from "@/lib/app-control";
import { esc, sendTelegram, telegramConfigured } from "@/lib/telegram";

/**
 * UYARI MOTORU — panelin "bakınca konuşan" hâlini "kendisi haber veren" hâle
 * getiriyor. `/api/cron/alerts` her 10 dakikada çağırıyor (systemd timer).
 *
 * NE ZAMAN YAZIYOR:
 *   - sorun İLK görüldüğünde hemen,
 *   - sürüyorsa 6 saatte bir hatırlatma (sessiz kalmasın, ama spam da olmasın),
 *   - düzeldiğinde bir kez "düzeldi".
 * Durum `app_settings` › `alerts.state`de: instance yeniden başlasa da aynı
 * sorun ikinci kez "yeni" sayılmıyor.
 *
 * NEYE BAKIYOR: her kontrol ayrı bir anahtar üretiyor (ör. `cron:assess`).
 * Uygulama tamamen düşerse bu motor da çalışamaz; o durumu sunucudaki
 * bekçi betiği (`/opt/lernomi/watchdog.sh`, repo dışı) doğrudan Telegram'a
 * yazıyor. İki katman bilerek: kendi çöküşünü haber veremeyen izleme yok.
 */

export type Alert = { key: string; level: "kritik" | "uyari"; text: string };
type State = Record<string, { since: string; lastSent: string; text: string; level: Alert["level"] }>;

const STATE_KEY = "alerts.state";
const REMIND_MS = 6 * 3_600_000;

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  const r = (await db.execute(q)) as unknown;
  if (Array.isArray(r)) return r as Row[];
  return ((r as { rows?: Row[] }).rows ?? []) as Row[];
}
const num = (v: unknown) => Number(v) || 0;

const MONTHS: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
/** `17/Sep/2026:10:49:26 +0200` → ms. */
export function nginxTime(s: string): number {
  const m = /^(\d{2})\/(\w{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+-])(\d{2})(\d{2})$/.exec(s);
  if (!m) return 0;
  const utc = Date.UTC(Number(m[3]), MONTHS[m[2]] ?? 0, Number(m[1]), Number(m[4]), Number(m[5]), Number(m[6]));
  const off = (Number(m[8]) * 60 + Number(m[9])) * 60_000 * (m[7] === "+" ? 1 : -1);
  return utc - off;
}

/** Son `minutes` dakikada API'nin 5xx cevapları, uç başına. */
async function recent5xx(minutes: number): Promise<Map<string, number>> {
  const out = new Map<string, number>();
  let text = "";
  try {
    // Yalnız dosyanın SONU: günlük log büyüyebilir, son 2 MB fazlasıyla yetiyor.
    const fh = await fs.open("/var/log/nginx/access.log", "r");
    try {
      const { size } = await fh.stat();
      const len = Math.min(size, 2_000_000);
      const buf = Buffer.alloc(len);
      await fh.read(buf, 0, len, size - len);
      text = buf.toString("utf8");
    } finally {
      await fh.close();
    }
  } catch (err) {
    /* Okunamayan log "5xx yok" DEĞİL: uygulama kullanıcısı `adm` grubunda
       değilse bu kontrol hiç çalışmıyordu ve sessiz kalıyordu. Fırlatınca
       `guard` bunu uyarı olarak yazıyor. */
    throw new Error(`nginx logu okunamadı (${(err as NodeJS.ErrnoException).code ?? "?"})`);
  }
  const since = Date.now() - minutes * 60_000;
  const LINE = /^\S+ \S+ \S+ \[([^\]]+)\] "\S+ (\/api\/[^\s?]*)[^"]*" (5\d\d) /;
  for (const line of text.split("\n")) {
    const m = LINE.exec(line);
    if (!m || nginxTime(m[1]) < since) continue;
    const route = m[2].split("/").slice(0, 4).join("/");
    out.set(`${route} ${m[3]}`, (out.get(`${route} ${m[3]}`) ?? 0) + 1);
  }
  return out;
}

/** Bütün kontroller. Her biri kendi hatasını yutuyor: bir kontrolün düşmesi ötekileri susturmasın. */
export async function collectAlerts(): Promise<Alert[]> {
  const alerts: Alert[] = [];
  const guard = async (name: string, fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (err) {
      alerts.push({ key: `check:${name}`, level: "uyari", text: `Uyarı kontrolü çalışmadı: ${name} (${(err as Error).message?.slice(0, 80)})` });
    }
  };

  await Promise.all([
    guard("cron", async () => {
      const rs = await rows(sql`
        select name, extract(epoch from now() - max(ran_at)) / 3600 age_h,
          (array_agg(ok order by ran_at desc))[1] last_ok,
          (array_agg(detail order by ran_at desc))[1] detail
        from cron_runs group by name`);
      const by = new Map(rs.map((r) => [String(r.name), r]));
      for (const job of CRON_EXPECTED) {
        const r = by.get(job.name);
        if (!r) alerts.push({ key: `cron:${job.name}`, level: "kritik", text: `Zamanlanmış iş hiç koşmamış: ${job.name}` });
        else if (num(r.age_h) > job.maxGapH) alerts.push({ key: `cron:${job.name}`, level: "kritik", text: `Zamanlanmış iş ${Math.round(num(r.age_h))} saattir koşmadı: ${job.name}` });
        else if (r.last_ok !== true) alerts.push({ key: `cronfail:${job.name}`, level: "kritik", text: `Zamanlanmış iş son koşuda başarısız: ${job.name} — ${String(r.detail ?? "").slice(0, 120)}` });
      }
    }),
    guard("server", async () => {
      const s = await getServerMetrics();
      if (s.ops.backup.ageH == null) alerts.push({ key: "backup", level: "kritik", text: "Yedek durumu okunamadı: yedek yok ya da bekçinin özeti (/var/lib/lernomi-status/ops.json) 30 dakikadan eski." });
      else if (s.ops.backup.ageH > 26) alerts.push({ key: "backup", level: "kritik", text: `Son yedek ${Math.round(s.ops.backup.ageH)} saat önce alınmış.` });
      /* Harici kopya: yerel yedek sunucu kaybında işe yaramaz. Bekçi özeti
         okunabiliyorsa (lastAt dolu) R2 kopyasının yaşı da izleniyor. */
      if (s.ops.backup.lastAt && (s.ops.backup.offsiteAgeH == null || s.ops.backup.offsiteAgeH > 26)) {
        alerts.push({ key: "backup:offsite", level: "kritik", text: s.ops.backup.offsiteAgeH == null ? "Harici (R2) yedek kopyası son 8 günde hiç başarılı olmamış." : `Harici (R2) yedek kopyası ${Math.round(s.ops.backup.offsiteAgeH)} saattir alınamadı.` });
      }
      if (s.ops.backup.result && s.ops.backup.result !== "success") alerts.push({ key: "backup:result", level: "kritik", text: `Yedek servisi başarısız: ${s.ops.backup.result}` });
      for (const u of s.ops.failedUnits) alerts.push({ key: `unit:${u}`, level: "kritik", text: `Çökmüş servis: ${u}` });
      if (s.disk.usedPct >= 85) alerts.push({ key: "disk", level: s.disk.usedPct >= 95 ? "kritik" : "uyari", text: `Disk %${s.disk.usedPct} dolu (${s.disk.freeGB} GB boş).` });
      if (s.mem.usedPct >= 92) alerts.push({ key: "mem", level: "uyari", text: `Bellek %${s.mem.usedPct} kullanımda.` });
      if (s.ops.certDaysLeft != null && s.ops.certDaysLeft < 14) alerts.push({ key: "cert", level: "kritik", text: `HTTPS sertifikası ${s.ops.certDaysLeft} gün içinde bitiyor.` });
      const down = s.app.instances.filter((i) => i.name.startsWith(s.app.activeColor) && !i.up);
      if (down.length) alerts.push({ key: "instances", level: "kritik", text: `Aktif renkte duran instance: ${down.map((d) => d.name).join(", ")}` });
      if (s.pg.maxConn && s.pg.total / s.pg.maxConn > 0.8) alerts.push({ key: "pgconn", level: "uyari", text: `PostgreSQL bağlantısı %${Math.round((s.pg.total / s.pg.maxConn) * 100)} dolu.` });
    }),
    guard("5xx", async () => {
      const m = await recent5xx(15);
      const total = [...m.values()].reduce((a, b) => a + b, 0);
      if (total >= 5) {
        const top = [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => `${k} ×${v}`).join(", ");
        alerts.push({ key: "http5xx", level: total >= 25 ? "kritik" : "uyari", text: `Son 15 dakikada API ${total} kez 5xx döndü: ${top}` });
      }
    }),
    guard("ai", async () => {
      const rs = await rows(sql`
        select provider, count(*)::int calls, count(*) filter (where not ok)::int errors, count(*) filter (where status = 429)::int limited
        from ai_usage where created_at >= now() - interval '1 hour' group by 1`);
      for (const r of rs) {
        const calls = num(r.calls), errors = num(r.errors), limited = num(r.limited);
        if (calls >= 10 && errors / calls >= 0.5) {
          alerts.push({ key: `ai:${r.provider}`, level: "uyari", text: `Yapay zekâ sağlayıcısı ${r.provider}: son 1 saatte ${errors}/${calls} çağrı başarısız${limited ? ` (${limited} hız sınırı)` : ""}.` });
        }
      }
      /* SEYREK TRAFİKTE KALICI ARIZA. Saatlik kural 10 çağrı istiyor ve düşük
         trafikte hiç tetiklenmiyordu: Mistral 13 gün boyunca her çağrıda 429
         verdi ve kimse görmedi. 24 saatte en az 5 çağrının neredeyse hepsi
         başarısızsa sağlayıcı fiilen kapalıdır (yedek devralıyor olsa bile). */
      const daily = await rows(sql`
        select provider, count(*)::int calls, count(*) filter (where not ok)::int errors, count(*) filter (where status = 429)::int limited
        from ai_usage where created_at >= now() - interval '24 hours' group by 1`);
      for (const r of daily) {
        const calls = num(r.calls), errors = num(r.errors), limited = num(r.limited);
        if (calls >= 5 && errors / calls >= 0.9) {
          alerts.push({ key: `ai-down:${r.provider}`, level: "uyari", text: `Yapay zekâ sağlayıcısı ${r.provider} fiilen kapalı: son 24 saatte ${errors}/${calls} çağrı başarısız${limited === errors ? " (hepsi hız sınırı - hesap kotası kapalı olabilir)" : ""}. Yedek sağlayıcı devralıyor.` });
        }
      }
    }),
    guard("app", async () => {
      const control = await appControl();
      if (control.maintenance.enabled) {
        const [r] = await db.select({ at: appSettings.updatedAt }).from(appSettings).where(eq(appSettings.key, "app.control")).limit(1);
        const hours = r?.at ? (Date.now() - r.at.getTime()) / 3_600_000 : 0;
        if (hours >= 2) alerts.push({ key: "maintenance", level: "uyari", text: `Bakım modu ${Math.round(hours)} saattir açık.` });
      }
      if ((control.store.ios.live || control.store.android.live) && !process.env.REVENUECAT_WEBHOOK_AUTH) {
        alerts.push({ key: "webhook", level: "kritik", text: "Mağaza yayında ama satın alma webhook'u kapalı (REVENUECAT_WEBHOOK_AUTH boş): satın alınan Premium hiçbir hesaba yazılmıyor." });
      }
    }),
    guard("moderation", async () => {
      const [r] = await rows(sql`
        select
          (select count(*) from user_reports u where u.created_at < now() - interval '24 hours'
             and not exists (select 1 from moderation_actions m where m.target = 'user_report' and m.ref_id = u.id))::int users,
          (select count(*) from content_reports where status = 'open' and created_at < now() - interval '24 hours')::int content`);
      const n = num(r?.users) + num(r?.content);
      if (n > 0) alerts.push({ key: "reports", level: "uyari", text: `${n} şikâyet 24 saatten uzun süredir açık (mağaza kuralı hızlı işlenmesini bekliyor).` });
    }),
    guard("mail", async () => {
      const [r] = await rows(sql`select count(*)::int c from events where name = 'mail_sent' and kind like '%:fail' and created_at >= now() - interval '1 hour'`);
      if (num(r?.c) >= 3) alerts.push({ key: "mail", level: "kritik", text: `Son 1 saatte ${num(r?.c)} e-posta gönderilemedi (doğrulama postası gitmiyorsa yeni kullanıcı hesabına giremez).` });
    }),
    guard("errors", async () => {
      // İstemci hata grupları (lib/client-errors): son 10 dakikada İLK KEZ görülen grup.
      const exists = await rows(sql`select to_regclass('public.client_error_groups') is not null ok`);
      if (exists[0]?.ok !== true) return;
      const rs = await rows(sql`
        select fingerprint, platform, message, count from client_error_groups
        where first_seen >= now() - interval '10 minutes' order by count desc limit 5`);
      for (const r of rs) {
        alerts.push({ key: `err:${r.fingerprint}`, level: "uyari", text: `Yeni hata (${r.platform}): ${String(r.message).slice(0, 160)}` });
      }
      const spikes = await rows(sql`
        select fingerprint, platform, message, count from client_error_groups
        where last_seen >= now() - interval '10 minutes' and count >= 50 order by count desc limit 3`);
      for (const r of spikes) {
        alerts.push({ key: `errspike:${r.fingerprint}`, level: "uyari", text: `Sık tekrar eden hata (${r.platform}, toplam ${num(r.count)}): ${String(r.message).slice(0, 160)}` });
      }
    }),
  ]);
  return alerts;
}

async function loadState(): Promise<State> {
  const [r] = await db.select({ value: appSettings.value }).from(appSettings).where(eq(appSettings.key, STATE_KEY)).limit(1);
  return ((r?.value as State) ?? {}) as State;
}
async function saveState(state: State): Promise<void> {
  await db
    .insert(appSettings)
    .values({ key: STATE_KEY, value: state, updatedBy: "alerts" })
    .onConflictDoUpdate({ target: appSettings.key, set: { value: state, updatedAt: new Date() } });
}

/**
 * Kontrolleri çalıştırır, yeni/süren/düzelen sorunları Telegram'a yazar.
 * `err:`/`errspike:` anahtarları tek seferlik: "düzeldi" mesajı gönderilmiyor
 * (bir hata grubunun "düzelmesi" anlamlı bir olay değil).
 */
export async function runAlerts(): Promise<{ active: number; sent: number; resolved: number; configured: boolean }> {
  const alerts = await collectAlerts();
  const state = await loadState();
  const now = new Date();
  const lines: string[] = [];
  let sent = 0;
  let resolved = 0;

  const current = new Set(alerts.map((a) => a.key));
  for (const a of alerts) {
    const prev = state[a.key];
    if (!prev) {
      lines.push(`${a.level === "kritik" ? "<b>[KRİTİK]</b>" : "<b>[UYARI]</b>"} ${esc(a.text)}`);
      state[a.key] = { since: now.toISOString(), lastSent: now.toISOString(), text: a.text, level: a.level };
      sent++;
    } else if (now.getTime() - new Date(prev.lastSent).getTime() >= REMIND_MS && !a.key.startsWith("err")) {
      const hours = Math.round((now.getTime() - new Date(prev.since).getTime()) / 3_600_000);
      lines.push(`<b>[SÜRÜYOR ${hours} sa]</b> ${esc(a.text)}`);
      prev.lastSent = now.toISOString();
      prev.text = a.text;
      sent++;
    }
  }
  for (const [key, prev] of Object.entries(state)) {
    if (current.has(key)) continue;
    // Hata grubu anahtarları bir gün tutuluyor ki aynı grup "yeni" diye tekrar gelmesin.
    if (key.startsWith("err")) {
      if (now.getTime() - new Date(prev.since).getTime() > 86_400_000) delete state[key];
      continue;
    }
    lines.push(`<b>[DÜZELDİ]</b> ${esc(prev.text)}`);
    delete state[key];
    resolved++;
  }

  if (lines.length && telegramConfigured()) {
    await sendTelegram(`<b>Lernomi</b>\n${lines.join("\n")}\n\nhttps://www.lernomi.app/admin`);
  }
  await saveState(state);
  return { active: alerts.length, sent, resolved, configured: telegramConfigured() };
}
