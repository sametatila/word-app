import "server-only";
import { promises as fs } from "node:fs";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { appSettings } from "@/lib/db/schema";
import { getServerMetrics } from "@/lib/server-metrics";
import { CRON_EXPECTED, REAL_RUN } from "@/lib/admin-coverage";
import { appControl } from "@/lib/app-control";
import { esc, sendTelegram, telegramConfigured } from "@/lib/telegram";
import { storeReviews } from "@/lib/store-reviews";
import { androidVitals, ANR_THRESHOLD, CRASH_THRESHOLD } from "@/lib/android-vitals";
import { absolute, alertLinks } from "@/lib/admin-links";
import { SITE_URL } from "@/lib/site";
import { responseQueues } from "@/lib/response-queue";
import { RESPONSE_SLA } from "@/lib/response-sla";
import { claudeQueue } from "@/lib/claude-tasks";
import { staleReleaseHolds } from "@/lib/release-holds";

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

import { suspectItems } from "@/lib/content/analytics";
import { REASON_LABEL } from "@/lib/content-feedback-labels";
import { activeAiProviderNames } from "@/lib/ai-providers";
import { AZURE_STT_MONTHLY_SECONDS, AZURE_TTS_MONTHLY_CHARS, azureKeyHealth, azureMonthUsage } from "@/lib/azure-speech-usage";
import { azureConfigured } from "@/lib/tts/azure";
import { chatConfigured, sttProviders } from "@/lib/chat-providers";
import { aiBudget, quotaRejections } from "@/lib/ai-budget";
import { DEEPGRAM, WARN_AT, deepgramUsd } from "@/lib/ai-budget-limits";

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

/**
 * İstemci hata grubunun uyarı etiketi: platform, hata türü (yalnız
 * `TypeError` gibi kalıba uyuyorsa; alan istemciden geliyor) ve grup kimliği.
 */
export function errorLabel(r: Record<string, unknown>): string {
  const platform = ["web", "android", "ios"].includes(String(r.platform)) ? String(r.platform) : "?";
  const name = /^[A-Z][A-Za-z]{0,39}$/.test(String(r.name ?? "")) ? `${String(r.name)} · ` : "";
  return `${platform} · ${name}${String(r.fingerprint).slice(0, 8)}`;
}
/** 500000 → "500.000" (Telegram metni; yerel ayar kullanmadan). */
const thousands = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const MONTHS: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
/** `17/Sep/2026:10:49:26 +0200` → ms. */
export function nginxTime(s: string): number {
  const m = /^(\d{2})\/(\w{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+-])(\d{2})(\d{2})$/.exec(s);
  if (!m) return 0;
  const utc = Date.UTC(Number(m[3]), MONTHS[m[2]] ?? 0, Number(m[1]), Number(m[4]), Number(m[5]), Number(m[6]));
  const off = (Number(m[8]) * 60 + Number(m[9])) * 60_000 * (m[7] === "+" ? 1 : -1);
  return utc - off;
}

/** Son `minutes` dakikadaki API istekleri (yol sorgusuz, durum), nginx erişim günlüğünden. */
async function recentApi(minutes: number): Promise<(ApiReq & { at: number })[]> {
  let text = "";
  try {
    // Yalnız dosyanın SONU: günlük log büyüyebilir; 8 MB kritik uçların 60 dakikalık penceresine yetiyor.
    const fh = await fs.open("/var/log/nginx/access.log", "r");
    try {
      const { size } = await fh.stat();
      const len = Math.min(size, 8_000_000);
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
  const LINE = /^\S+ \S+ \S+ \[([^\]]+)\] "(\S+) (\/api\/[^\s?]*)[^"]*" (\d{3}) /;
  const out: (ApiReq & { at: number })[] = [];
  for (const line of text.split("\n")) {
    const m = LINE.exec(line);
    const at = m ? nginxTime(m[1]) : 0;
    if (!m || at < since) continue;
    out.push({ at, method: m[2], path: m[3], status: Number(m[4]) });
  }
  return out;
}

export type ApiReq = { method: string; path: string; status: number };

/** Kritik uçlar için pencere (dk): tek seferlik `err-route` anahtarı Telegram'a
    gidemezse sonraki koşular da görsün diye 10 dk'lık koşu aralığından geniş. */
export const CRITICAL_WINDOW_MIN = 60;

/**
 * TEK SEFERDE BİLE ÖNEMLİ UÇLAR. Genel 5xx kuralı 15 dakikada 5 hata istiyor;
 * bu uçlarda tek bir hata bir kullanıcının parasını, hesabını ya da girişini
 * etkiliyor ve genel eşiğin altında kalıyordu:
 *   satın alma webhook'u  yalnız POST: 401/403 = paylaşılan sır uyuşmuyor, 5xx =
 *                         yazılamadı; ikisinde de satın alınan Premium hesaba
 *                         geçmiyor. GET (405), 404 ve 400 sayılmıyor: tarayıcı ya
 *                         da tarayıcı botu her gün yanlış KRİTİK üretirdi.
 *   hesap silme           yasal yükümlülük; 5xx'te silme yarım kalabilir.
 *   sosyal giriş          better-auth web/Android tarayıcı akışındaki hatayı
 *                         (yanlış gizli, geçersiz kod, profil okunamadı) 4xx/5xx
 *                         değil, varsayılan hata sayfasına 302 ile bildiriyor:
 *                         `/api/auth/error` ziyareti sayılıyor. Uygulamanın kendi
 *                         jeton yolu (`sign-in/social`) 401/403/5xx ile. Eşik 3.
 * Anahtarlar `err-route:` ailesinden (tek seferlik, aynı uç+durum günde bir).
 * Saf: `test:admin`.
 */
export function criticalRouteAlerts(reqs: ApiReq[]): Alert[] {
  const out: Alert[] = [];
  const win = `son ${CRITICAL_WINDOW_MIN} dakikada`;
  const count = (pred: (r: ApiReq) => boolean) => {
    const m = new Map<number, number>();
    for (const r of reqs) if (pred(r)) m.set(r.status, (m.get(r.status) ?? 0) + 1);
    return m;
  };
  for (const [status, n] of count((r) => r.method === "POST" && r.path.startsWith("/api/premium/webhook") && (r.status === 401 || r.status === 403 || r.status >= 500))) {
    const why = status >= 500 ? "sunucu olayı yazamadı" : "paylaşılan sır uyuşmuyor (REVENUECAT_WEBHOOK_AUTH ile RevenueCat'teki başlık)";
    out.push({ key: `err-route:webhook:${status}`, level: "kritik", text: `Satın alma webhook'u ${win} ${n} kez HTTP ${status} döndü: ${why}. Satın alınan Premium hesaba geçmiyor olabilir; RevenueCat › Integrations › Webhooks'ta başarısız olayları yeniden gönder.` });
  }
  for (const [status, n] of count((r) => r.path === "/api/auth/delete-user" && r.status >= 500)) {
    out.push({ key: `err-route:delete:${status}`, level: "kritik", text: `Hesap silme ${win} ${n} kez HTTP ${status} döndü: silme yarım kalmış olabilir (yasal yükümlülük). Sunucu günlüğüne ve account_deletions tablosuna bak.` });
  }
  const errorPage = reqs.filter((r) => r.path === "/api/auth/error").length;
  const social = [...count((r) => /^\/api\/auth\/(sign-in\/social|callback\/)/.test(r.path) && (r.status >= 500 || r.status === 401 || r.status === 403)).entries()];
  const socialTotal = social.reduce((a, [, n]) => a + n, 0) + errorPage;
  if (socialTotal >= 3) {
    const parts = [...social.map(([s, n]) => `HTTP ${s} ×${n}`), ...(errorPage ? [`giriş hata sayfası ×${errorPage}`] : [])];
    out.push({ key: "err-route:social", level: "kritik", text: `Google/Apple girişi ${win} ${socialTotal} kez başarısız (${parts.join(", ")}): sağlayıcı yapılandırması (istemci kimliği, anahtar, gizli) bozulmuş olabilir. Sebep sunucu günlüğünde ([Better Auth]).` });
  }
  return out;
}

/** Bütün kontroller. Her biri kendi hatasını yutuyor: bir kontrolün düşmesi ötekileri susturmasın. */
/** Bildirim grup anahtarının yalnız tür öneki (`word:…` → `word`); serbest metin taşımaz. */
function reportTargetType(g: unknown): string {
  const head = String(g ?? "").split(":")[0];
  return /^[a-z_]{1,24}$/.test(head) ? head : "?";
}

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
      /* Yalnız gerçek koşular (`REAL_RUN`): sırsız bir istek son koşuyu
         "başarısız" gösterip yanlış KRİTİK uyarı üretiyordu (2026-10-03). */
      const rs = await rows(sql`
        select r.name, extract(epoch from now() - max(r.ran_at)) / 3600 age_h,
          (array_agg(r.ok order by r.ran_at desc))[1] last_ok,
          (array_agg(r.detail order by r.ran_at desc))[1] detail
        from cron_runs r where ${REAL_RUN} group by r.name`);
      const by = new Map(rs.map((r) => [String(r.name), r]));
      for (const job of CRON_EXPECTED) {
        const r = by.get(job.name);
        if (!r) alerts.push({ key: `cron:${job.name}`, level: "kritik", text: `Zamanlanmış iş hiç koşmamış: ${job.name}` });
        else if (num(r.age_h) > job.maxGapH) alerts.push({ key: `cron:${job.name}`, level: "kritik", text: `Zamanlanmış iş ${Math.round(num(r.age_h))} saattir koşmadı: ${job.name}` });
        /* Uyarı motorunun Telegram'a gidemediği koşu (detayda "TELEGRAM'A GİDEMEYEN")
           burada uyarı değil: aynı kanaldan "kanal çalışmıyor" demek iki fazla mesaj
           üretiyordu; gitmeyen satırlar zaten yeniden deneniyor. */
        else if (r.last_ok !== true && !(job.name === "alerts" && String(r.detail ?? "").includes("TELEGRAM'A GİDEMEYEN"))) alerts.push({ key: `cronfail:${job.name}`, level: "kritik", text: `Zamanlanmış iş son koşuda başarısız: ${job.name} — ${String(r.detail ?? "").slice(0, 120)}` });
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
      const wide = await recentApi(CRITICAL_WINDOW_MIN);
      alerts.push(...criticalRouteAlerts(wide));
      const since = Date.now() - 15 * 60_000;
      const reqs = wide.filter((r) => r.at >= since);
      const m = new Map<string, number>();
      for (const r of reqs) {
        if (r.status < 500) continue;
        const k = `${r.path.split("/").slice(0, 4).join("/")} ${r.status}`;
        m.set(k, (m.get(k) ?? 0) + 1);
      }
      const total = [...m.values()].reduce((a, b) => a + b, 0);
      if (total >= 5) {
        const top = [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => `${k} ×${v}`).join(", ");
        alerts.push({ key: "http5xx", level: total >= 25 ? "kritik" : "uyari", text: `Son 15 dakikada API ${total} kez 5xx döndü: ${top}` });
      }
    }),
    guard("ai", async () => {
      /* YALNIZ ETKİN SAĞLAYICILAR (lib/ai-providers). `ai_usage` geçmişi
         zincirden çıkmış sağlayıcıları da içeriyor; onların eski hataları
         uyarı üretmemeli (2026-09-30: Mistral ve Cerebras çıktıktan sonra
         24 saat boyunca "fiilen kapalı" uyarısı geldi). */
      const active = activeAiProviderNames();
      if (!chatConfigured()) {
        alerts.push({ key: "ai:none", level: "kritik", text: "Hiçbir dil modeli sağlayıcısı yapılandırılmamış: sohbet, değerlendirme ve yapay zekâ geri bildirimi kapalı." });
      }
      const rs = await rows(sql`
        select provider, count(*)::int calls, count(*) filter (where not ok)::int errors, count(*) filter (where status = 429)::int limited
        from ai_usage where created_at >= now() - interval '1 hour' group by 1`);
      for (const r of rs) {
        if (!active.has(String(r.provider ?? ""))) continue;
        const calls = num(r.calls), errors = num(r.errors), limited = num(r.limited);
        if (calls >= 10 && errors / calls >= 0.5) {
          alerts.push({ key: `ai:${r.provider}`, level: "uyari", text: `Yapay zekâ sağlayıcısı ${r.provider}: son 1 saatte ${errors}/${calls} çağrı başarısız${limited ? ` (${limited} hız sınırı)` : ""}.` });
        }
      }
      /* SEYREK TRAFİKTE KALICI ARIZA. Saatlik kural 10 çağrı istiyor ve düşük
         trafikte hiç tetiklenmiyordu: eski birincil sağlayıcı 13 gün boyunca
         her çağrıda 429 verdi ve kimse görmedi. 24 saatte en az 5 çağrının neredeyse hepsi
         başarısızsa sağlayıcı fiilen kapalıdır (yedek devralıyor olsa bile). */
      const daily = await rows(sql`
        select provider, count(*)::int calls, count(*) filter (where not ok)::int errors, count(*) filter (where status = 429)::int limited
        from ai_usage where created_at >= now() - interval '24 hours' group by 1`);
      for (const r of daily) {
        if (!active.has(String(r.provider ?? ""))) continue;
        const calls = num(r.calls), errors = num(r.errors), limited = num(r.limited);
        if (calls >= 5 && errors / calls >= 0.9) {
          alerts.push({ key: `ai-down:${r.provider}`, level: "uyari", text: `Yapay zekâ sağlayıcısı ${r.provider} fiilen kapalı: son 24 saatte ${errors}/${calls} çağrı başarısız${limited === errors ? " (hepsi hız sınırı - hesap kotası kapalı olabilir)" : ""}. Yedek sağlayıcı devralıyor.` });
        }
      }
    }),
    guard("azure", async () => {
      /*
        AZURE SPEECH (F0): kota aşımı ücret değil RET getiriyor ve iki yolda da
        sessiz bozuluyor (lib/azure-speech-usage). STT tavanında Azure o ay
        zincirden çıkıyor, Deepgram/Groq devralıyor; TTS kotasında seslendirme
        cihaz sesine düşüyor. Anahtar yoklaması trafik olmasa da geçersiz
        anahtarı yakalıyor (eski kaynağın anahtarı fark edilmeden gitmişti).
      */
      if (!azureConfigured()) return;
      const m = await azureMonthUsage();
      const sttPct = Math.round((m.sttSeconds / AZURE_STT_MONTHLY_SECONDS) * 100);
      if (sttPct >= 100) {
        alerts.push({ key: "azure:stt-cap", level: "uyari", text: `Azure konuşma tanıma bu ayın tavanını doldurdu (${Math.round(m.sttSeconds / 60)} dk / ${Math.round(AZURE_STT_MONTHLY_SECONDS / 60)} dk): ay sonuna kadar zincirde değil, Deepgram (kredisi bitmişse Workers AI) devralıyor.` });
      } else if (sttPct >= 80) {
        alerts.push({ key: "azure:stt-cap", level: "uyari", text: `Azure konuşma tanıma bu ayın tavanının %${sttPct}'inde (${Math.round(m.sttSeconds / 60)} dk / ${Math.round(AZURE_STT_MONTHLY_SECONDS / 60)} dk).` });
      }
      const ttsPct = Math.round((m.ttsChars / AZURE_TTS_MONTHLY_CHARS) * 100);
      if (ttsPct >= 80) {
        alerts.push({ key: "azure:tts-cap", level: ttsPct >= 100 ? "kritik" : "uyari", text: `Azure seslendirme bu ay ${thousands(m.ttsChars)} karakter kullandı (ücretsiz kota ${thousands(AZURE_TTS_MONTHLY_CHARS)}, %${ttsPct}). Azure yalnız Edge düşünce devreye girer: Edge'e bak.` });
      }
      if ((await azureKeyHealth()) === "invalid") {
        alerts.push({ key: "azure:key", level: "kritik", text: "Azure Speech anahtarı reddedildi (401/403): konuşma tanıma Deepgram/Workers AI/Groq'a, seslendirmenin yedeği cihaz sesine kaldı. Anahtarı Azure portalında yenile, .env'e yaz, rolling restart." });
      }
    }),
    guard("deepgram", async () => {
      /*
        DEEPGRAM KREDİSİ (tek seferlik, yenilenmez). Bakiye API'den okunamıyor (anahtarda
        billing:read yok); son okunan bakiyeden (`DEEPGRAM.creditAt`) sonraki kullanım
        tarifeyle düşülüyor. Kredi bitince istekler reddediliyor (402) ve zincir
        KENDİLİĞİNDEN Cloudflare Workers AI'ya (Whisper) geçiyor (Samet, 2026-10-05: "tekrar
        düşünmek zorunda kalmayalım"; lib/stt `deepgramResting`). Uyarı bu yüzden bilgi
        düzeyinde: yapılacak iş yok, kredi yüklenirse Deepgram kendiliğinden döner.
      */
      if (!process.env.DEEPGRAM_API_KEY) return;
      /* Kullanım yalnız başarılı çağrılardan; ret sayısı son 24 saatten (eski bir ret uyarıyı sonsuza dek açık tutmasın). */
      const list = await rows(sql`select model, coalesce(sum(audio_seconds) filter (where ok), 0)::int s,
        count(*) filter (where not ok and status in (401, 402, 403) and created_at > now() - interval '24 hours')::int refused
        from ai_usage where provider = 'deepgram' and created_at >= ${DEEPGRAM.creditAt}::timestamptz group by 1`);
      const spent = list.reduce((a, r) => a + deepgramUsd(String(r.model), num(r.s)), 0);
      const left = DEEPGRAM.creditUsd - spent;
      const refused = list.reduce((a, r) => a + num(r.refused), 0);
      if (refused > 0) {
        const fallback = sttProviders().some((p) => p.name === "cloudflare");
        alerts.push({
          key: "deepgram:credit",
          level: fallback ? "uyari" : "kritik",
          text: fallback
            ? `Deepgram istekleri reddediliyor (${refused} kez 401/402/403): kredi bitmiş ya da anahtar geçersiz. Konuşma tanıma kendiliğinden Cloudflare Workers AI'ya (Whisper) geçti, yapılacak iş yok. Kredi yüklenirse Deepgram bir saat içinde kendiliğinden döner.`
            : `Deepgram istekleri reddediliyor (${refused} kez 401/402/403): kredi bitmiş ya da anahtar geçersiz. Workers AI yedeği yapılandırılmamış (CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_AI_TOKEN): konuşma tanıma yalnız Azure'un aylık hakkı ve Groq'la sürüyor.`,
        });
      } else if (left < 50) {
        alerts.push({ key: "deepgram:credit", level: left < 15 ? "kritik" : "uyari", text: `Deepgram kredisi tahminen ~${Math.round(left)} $ kaldı (son okunan ~${Math.round(DEEPGRAM.creditUsd)} $, sonra harcanan ~${Math.round(spent)} $). Bitince konuşma tanıma kendiliğinden Cloudflare Workers AI'ya geçer, yapılacak iş yok. İstersen konsoldan gerçek bakiyeyi okuyup ai-budget-limits DEEPGRAM'a yaz.` });
      }
    }),
    guard("budget", async () => {
      /*
        KOTA VE BÜTÇE (lib/ai-budget). Devre kesici YOK (Samet, 2026-10-02):
        uygulama hiçbir şeyi kısmıyor; bu uyarılar ödemenin ya da plan
        yükseltmenin ZAMANINI söylüyor. Eşik %80: ücretsiz kotanın dolmasına
        kalan süre kullanıcıyı etkilemeden harekete geçmeye yetsin.
      */
      const b = await aiBudget();
      /* İki basamak, sabit nokta değil (parite: sayaçta `.toFixed` yok). */
      const usd = (n: number) => `${String(Math.round(n * 100) / 100)} $`;
      const active = activeAiProviderNames();

      const cf = b.cloudflare;
      if (active.has("cloudflare") && cf.plan === "free" && cf.neuronsToday >= cf.freePerDay * WARN_AT) {
        const pct = Math.round((cf.neuronsToday / cf.freePerDay) * 100);
        alerts.push({ key: "budget:cloudflare", level: pct >= 100 ? "kritik" : "uyari", text: `Cloudflare Workers AI bugün ~${thousands(cf.neuronsToday)} / ${thousands(cf.freePerDay)} neuron (%${pct}, tahmin). Ücretsiz planda pay dolunca sohbet ve değerlendirme Groq'a, o da dolunca tamamen kapanır: Workers Paid'e geç (ayda 5 $), sonra lib/ai-budget-limits CLOUDFLARE.plan = "paid".` });
      }
      if (cf.unknownModels.length) {
        alerts.push({ key: "budget:tariff", level: "uyari", text: `Cloudflare modeli tarife tablosunda yok, neuron ve maliyet hesaplanamıyor: ${cf.unknownModels.join(", ")} (lib/ai-budget-limits CLOUDFLARE.models).` });
      }
      if (active.has("groq") && b.groq.plan === "free") {
        for (const m of b.groq.models) {
          if (m.limit && m.tokensToday >= m.limit * WARN_AT) {
            alerts.push({ key: `budget:groq:${m.model}`, level: "uyari", text: `Groq ${m.model} bugün ${thousands(m.tokensToday)} / ${thousands(m.limit)} jeton (ücretsiz katman, %${Math.round((m.tokensToday / m.limit) * 100)}). Dolunca sohbetin yedeği kalmaz; sık oluyorsa Groq'ta ücretli katmana geç.` });
          }
        }
        const g = b.groq;
        if (g.sttRequestsToday >= g.sttRequestsLimit * WARN_AT || g.sttSecondsToday >= g.sttSecondsLimit * WARN_AT) {
          alerts.push({ key: "budget:groq-stt", level: "uyari", text: `Groq Whisper bugün ${g.sttRequestsToday}/${g.sttRequestsLimit} istek, ${Math.round(g.sttSecondsToday / 60)}/${Math.round(g.sttSecondsLimit / 60)} dk ses (ücretsiz katman).` });
        }
      }

      for (const r of await quotaRejections(24)) {
        /* Zincirden çıkmış sağlayıcının eski retleri uyarı değil (Cerebras 402'leri gibi). */
        if (!active.has(r.provider)) continue;
        if (r.payment) alerts.push({ key: `budget:payment:${r.provider}`, level: "kritik", text: `${r.provider} son 24 saatte ${r.payment} isteği "ödeme gerekli" (402) diye reddetti: kredi ya da kart bitmiş olabilir, hesabın faturalama sayfasına bak. ${r.sample}`.slice(0, 300) });
        if (r.cfDaily) alerts.push({ key: "budget:cf-rejected", level: "kritik", text: `Cloudflare son 24 saatte ${r.cfDaily} isteği günlük ücretsiz pay bittiği için reddetti: Workers Paid'e geç. ${r.sample}`.slice(0, 300) });
        if (r.groqDaily) alerts.push({ key: "budget:groq-rejected", level: "uyari", text: `Groq son 24 saatte ${r.groqDaily} isteği günlük jeton kotası (TPD) dolduğu için reddetti: o sırada sohbetin yedeği yoktu. Sık oluyorsa Groq'ta ücretli katmana geç. ${r.sample}`.slice(0, 300) });
      }

      const mail = b.resend;
      if (mail.plan === "free") {
        if (mail.last24h >= mail.perDay * 0.7) {
          alerts.push({ key: "budget:resend-day", level: mail.last24h >= mail.perDay * 0.9 ? "kritik" : "uyari", text: `Resend son 24 saatte ${mail.last24h} / ${mail.perDay} posta (ücretsiz plan). Sınırda doğrulama postası gitmez, yeni kullanıcı hesabına giremez: Resend Pro'ya geç (ayda 20 $).` });
        }
        if (mail.month >= mail.perMonth * WARN_AT) {
          alerts.push({ key: "budget:resend-month", level: "uyari", text: `Resend bu ay ${thousands(mail.month)} / ${thousands(mail.perMonth)} posta (ücretsiz plan).` });
        }
      }

      if (b.budgetUsd) {
        if (b.monthUsd >= b.budgetUsd * WARN_AT) {
          alerts.push({ key: "budget:month", level: b.monthUsd >= b.budgetUsd ? "kritik" : "uyari", text: `Kullanıma göre ücretlenen servisler bu ay ${usd(b.monthUsd)} (bütçe ${usd(b.budgetUsd)}, ay sonu tahmini ${usd(b.projectedUsd)}). Uygulama hiçbir şeyi kısmıyor: hesaplara bak, gerekirse bütçeyi (AI_MONTHLY_BUDGET_USD) yükselt.` });
        } else if (b.projectedUsd >= b.budgetUsd && new Date().getUTCDate() >= 4) {
          /* İlk üç gün tahmin birkaç çağrıyla oynuyor; uyarı ancak ondan sonra. */
          alerts.push({ key: "budget:month", level: "uyari", text: `Bu hızla kullanıma göre ücretlenen servisler ay sonunda ~${usd(b.projectedUsd)} tutacak (bütçe ${usd(b.budgetUsd)}, şu an ${usd(b.monthUsd)}).` });
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
    guard("responses", async () => {
      /*
        GERİ DÖNÜŞ SÜRELERİ (`lib/response-sla`, destek sayfasındaki sözle aynı).
        Kuyruk başına iki anahtar: `sla-soon:<kuyruk>` süresinin %75'i dolan iş
        (uyarı), `sla-late:<kuyruk>` süresi geçen iş (kritik). Sürdükçe 6 saatte
        bir hatırlatma, iş kapanınca "düzeldi". Eski `reports` kuralının (24 saat,
        tek eşik) yerini aldı.
      */
      for (const q of await responseQueues()) {
        const def = RESPONSE_SLA[q.queue];
        if (q.late > 0) {
          alerts.push({ key: `sla-late:${q.queue}`, level: "kritik", text: `${def.label}: ${q.late} iş geri dönüş süresini (${def.target}) aştı. Nasıl dönüleceği sayfadaki rehberde.` });
        }
        if (q.soon > 0) {
          alerts.push({ key: `sla-soon:${q.queue}`, level: "uyari", text: `${def.label}: ${q.soon} işin geri dönüş süresi (${def.target}) dolmak üzere.` });
        }
      }
    }),
    guard("claude", async () => {
      /*
        CLAUDE'A BIRAKILAN İŞLER (`lib/claude-tasks`). Claude kendiliğinden
        başlamıyor (Samet "bıraktığım işleri yap" der); süre ise işlemeye devam
        ediyor. Son tarihe 24 saatten az kalan bekleyen iş varsa hatırlat.
      */
      const due = (await claudeQueue("waiting")).filter((t) => t.due != null && t.due - Date.now() < 24 * 3_600_000);
      if (due.length) {
        const first = Math.round((Math.min(...due.map((t) => t.due!)) - Date.now()) / 3_600_000);
        alerts.push({ key: "claude:due", level: "uyari", text: `Claude'a bırakılan ${due.length} işin geri dönüş süresine 24 saatten az kaldı (${first >= 0 ? `en yakını ~${first} sa sonra` : `en eskisi ${-first} sa gecikti`}). Claude oturumunda "bıraktığım işleri yap" de.` });
      }
    }),
    guard("releasehold", async () => {
      /* SÜRÜM BEKLEYEN BİLDİRİM 30. gününde hâlâ güncellememiş bildireni varsa bir kez
         (`lib/release-holds`): build gecikti mi, kalanları elle kapatmak mı gerek. */
      for (const h of await staleReleaseHolds()) {
        alerts.push({ key: `err-releasehold:${h.id}`, level: "uyari", text: `Build ${h.build}'de düzelecek denen bildirim 30 gündür bekliyor (${h.queue} ${h.ref.slice(0, 80)}): bazı bildirenler hâlâ güncellemedi. Build yayında mı bak; gerekirse Gelen işler'den elle kapat.` });
      }
    }),
    guard("feedback", async () => {
      /*
        İÇERİK GERİ BİLDİRİMİ (docs/plan/content-feedback.md). İki tek seferlik
        anahtar (`err` ailesi: hatırlatma ve "düzeldi" yok, bir gün tutuluyor):

        err-reportnew:<son id>  ÖZET — bir önceki özetten bu yana gelen bildirimler.
          Su çizgisi durumun kendisinde: son özetin anahtarındaki kimlik. Durumda
          özet yoksa (ilk koşu ya da bir günden uzun sessizlik) son 24 saat;
          anahtarlar bir gün tutulduğu için bu pencerede özetlenmemiş satır kalmıyor.
          Panel (`collectAlerts` önbellekli) durumu yalnız OKUYOR.
        err-reporthot:<grup>   SICAK HEDEF — bir hedef 24 saatte 3+ bildirim aldı ve
          açık bildirimi var. Aynı grup bir gün içinde ikinci kez yazılmıyor.
      */
      const state = await loadState();
      const seen = Math.max(0, ...Object.keys(state).filter((k) => k.startsWith("err-reportnew:")).map((k) => Number(k.slice(14)) || 0));
      const fresh = await rows(sql`
        select coalesce(r.group_key, 'legacy:' || r.kind || ':' || r.ref) g, count(*)::int n, max(r.id)::int last
        from content_reports r
        where ${seen > 0 ? sql`r.id > ${seen}` : sql`r.created_at >= now() - interval '24 hours'`}
        group by 1 order by n desc, last desc`);
      const total = fresh.reduce((a, r) => a + num(r.n), 0);
      if (total > 0) {
        const last = Math.max(...fresh.map((r) => num(r.last)));
        /* Hedef METNİ değil yalnız TÜRÜ (word, conversation…): grup anahtarı bildirenin
           yazdığı kimlikten kuruluyor (misafir dahil herkes, 120 karakter) ve O3
           kuralı alçak güvenli uçtan gelen metni Telegram'a taşımıyor; ayrıntı panelde
           (güvenlik denetimi 2026-10-07). */
        const top = fresh.slice(0, 3).map((r) => `${reportTargetType(r.g)} ×${num(r.n)}`).join(", ");
        alerts.push({ key: `err-reportnew:${last}`, level: "uyari", text: `${total} yeni içerik bildirimi (${fresh.length} hedef): ${top}${fresh.length > 3 ? " …" : ""}` });
      }
      const hot = await rows(sql`
        select coalesce(r.group_key, 'legacy:' || r.kind || ':' || r.ref) g, count(*)::int n,
          mode() within group (order by r.reason) reason
        from content_reports r
        where r.created_at >= now() - interval '24 hours'
        group by 1
        having count(*) >= 3 and bool_or(r.status = 'open')
        order by n desc limit 5`);
      for (const r of hot) {
        alerts.push({ key: `err-reporthot:${String(r.g)}`, level: "uyari", text: `Aynı hedef 24 saatte ${num(r.n)} kez bildirildi (en sık: ${REASON_LABEL[String(r.reason)] ?? String(r.reason)}): ${reportTargetType(r.g)} (ayrıntı panelde)` });
      }
    }),
    guard("mail", async () => {
      const [r] = await rows(sql`select count(*)::int c from events where name = 'mail_sent' and kind like '%:fail' and created_at >= now() - interval '1 hour'`);
      if (num(r?.c) >= 3) alerts.push({ key: "mail", level: "kritik", text: `Son 1 saatte ${num(r?.c)} e-posta gönderilemedi (doğrulama postası gitmiyorsa yeni kullanıcı hesabına giremez).` });
      /* Tek bir gidemeyen doğrulama postası bir kişinin hesabına hiç girememesi
         demek; üçlük genel eşiğin altında kalıyordu. */
      /* Tek seferlik anahtar (`err-mailverify:<son olay>`): bir saat sonra "düzeldi"
         demek yanlıştı, o kişi hâlâ giremiyor. */
      const [v] = await rows(sql`select count(*)::int c, max(id)::int last from events where name = 'mail_sent' and kind = 'verify:fail' and created_at >= now() - interval '1 hour'`);
      if (num(v?.c) >= 1 && num(r?.c) < 3) alerts.push({ key: `err-mailverify:${num(v?.last)}`, level: "uyari", text: `Son 1 saatte ${num(v?.c)} doğrulama postası gönderilemedi: o kişi hesabına giremiyor. Resend panelinde reddin sebebine bak.` });
      /* Günlük kota eşiğinde düşürülen kritik olmayan postalar (lib/email `shouldShed`):
         ya gerçek kullanım planı aştı ya da biri posta ucunu zorluyor. */
      const [sh] = await rows(sql`select count(*)::int c from events where name = 'mail_sent' and kind like '%:shed' and created_at >= now() - interval '24 hours'`);
      if (num(sh?.c) >= 1) alerts.push({ key: "mail:shed", level: "uyari", text: `Son 24 saatte ${num(sh?.c)} kritik olmayan posta günlük Resend kotası eşiğinde gönderilmedi (doğrulama ve sıfırlama gidiyor). Panel › Sistem › Yapay zekâ bütçesi'nde Resend sayısına bak; gerçek kullanımsa Resend Pro'ya geç.` });
    }),
    guard("vendor-delete", async () => {
      /* HESAP SİLMENİN ÜÇÜNCÜ TARAF AYAĞI. RevenueCat müşteri kaydı silinemezse
         satır `vendor_deletion_retries`e düşüyor ve günlük cron yeniden deniyor;
         bir günü geçen satır kendiliğinden düzelmiyor demek (anahtar yetkisi,
         proje kimliği). Silme sözü (gizlilik §11) yarım kalıyor. */
      const [r] = await rows(sql`select count(*)::int c, max(attempts)::int a, max(last_error) e from vendor_deletion_retries where created_at < now() - interval '1 day'`);
      if (num(r?.c) >= 1) alerts.push({ key: "vendor-delete", level: "uyari", text: `${num(r?.c)} silinmiş hesabın RevenueCat müşteri kaydı bir günden uzun süredir silinemiyor (en çok ${num(r?.a)} deneme, son hata: ${String(r?.e ?? "?").slice(0, 40)}). REVENUECAT_API_KEY yazma yetkisine ve proje kimliğine bak; günlük cron yeniden deniyor.` });
    }),
    guard("push", async () => {
      /* BİLDİRİM TESLİMİ. FCM/APNs/web push kimliği bozulursa (servis hesabı
         anahtarı, VAPID) gönderim sessizce düşüyor; hatırlatma işi yine
         "başarılı" yazıyordu. 24 saatte yeterli deneme var ve HİÇBİRİ ulaşmadıysa
         kanal kopmuştur (normalde denemelerin ~%70'i ulaşıyor). */
      const [p] = await rows(sql`select count(*) filter (where name = 'push_sent')::int sent, coalesce(sum(value) filter (where name = 'push_deliver'), 0)::int delivered from events where name in ('push_sent', 'push_deliver') and created_at >= now() - interval '24 hours'`);
      if (num(p?.sent) >= 8 && num(p?.delivered) === 0) {
        alerts.push({ key: "push", level: "kritik", text: `Son 24 saatte ${num(p?.sent)} bildirim denendi, hiçbiri ulaşmadı: FCM servis hesabı, APNs ya da VAPID anahtarı bozulmuş olabilir (sunucu günlüğünde [fcm:token] / [push:fcm]).` });
      }
    }),
    guard("reviews", async () => {
      // Yeni düşük puanlı mağaza yorumu (son 24 saat, cevapsız): tek seferlik
      // anahtar (`err`le aynı ailede, "düzeldi" mesajı yok). Önbellek 30 dk.
      const { results } = await storeReviews();
      for (const r of results) {
        if (r.error) alerts.push({ key: `reviews-api:${r.store}`, level: "uyari", text: `Mağaza yorumları okunamadı: ${r.error}` });
        for (const rv of r.reviews) {
          if (rv.rating > 0 && rv.rating <= 2 && !rv.answered && rv.at && Date.now() - Date.parse(rv.at) < 86_400_000) {
            alerts.push({ key: `err-review:${r.store}:${rv.id}`, level: "uyari", text: `${rv.rating}★ yeni ${r.store === "ios" ? "App Store" : "Google Play"} yorumu: ${(rv.title ? rv.title + " — " : "") + rv.body}`.slice(0, 300) });
          }
        }
      }
    }),
    guard("vitals", async () => {
      // İki basamak, sabit nokta değil (parite: sayaçta `.toFixed` yok); metin yalnız Telegram'a gidiyor.
      const pct2 = (v: number) => String(Math.round(v * 10000) / 100);
      // Play kötü davranış eşikleri: %80'inde uyarı, aşınca kritik (mağazada geri plana itilme).
      const v = await androidVitals();
      if (v.error) alerts.push({ key: "vitals-api", level: "uyari", text: `Android vitals okunamadı: ${v.error}` });
      for (const [name, series, threshold] of [["çökme", v.crash, CRASH_THRESHOLD], ["donma (ANR)", v.anr, ANR_THRESHOLD]] as const) {
        const rate = series.latest28d;
        if (rate == null) continue;
        if (rate >= threshold) alerts.push({ key: `vitals:${name}`, level: "kritik", text: `Android fark edilen ${name} oranı %${pct2(rate)}: Play eşiği %${pct2(threshold)} aşıldı, uygulama mağazada geri plana itilebilir.` });
        else if (rate >= threshold * 0.8) alerts.push({ key: `vitals:${name}`, level: "uyari", text: `Android fark edilen ${name} oranı %${pct2(rate)}: Play eşiğine (%${pct2(threshold)}) yaklaşıyor.` });
      }
    }),
    guard("errors", async () => {
      /* İstemci hata grupları (lib/client-errors): son 60 dakikada İLK KEZ görülen grup.
         Pencere koşu aralığından (10 dk) geniş: Telegram'a gidemeyen tek seferlik
         `err:` satırı sonraki koşularda da üretilsin; tekrarı durum 24 saat eliyor. */
      const exists = await rows(sql`select to_regclass('public.client_error_groups') is not null ok`);
      if (exists[0]?.ok !== true) return;
      /* METİN YOK, YALNIZ GRUP (güvenlik denetimi 2026-10-03, O3). Mesaj
         kimliksiz uçtan geliyor: Telegram'a olduğu gibi yazılınca saldırgan
         kendi metnini (tıklanabilir bir bağlantı dahil) uyarı kanalına
         taşıyabiliyordu. Satır platformu, kalıba uyan hata türünü ve grup
         kimliğini söylüyor; ayrıntı bağlantıdaki panel sayfasında. */
      const rs = await rows(sql`
        select fingerprint, platform, name, count from client_error_groups
        where first_seen >= now() - interval '60 minutes' order by count desc limit 5`);
      for (const r of rs) {
        alerts.push({ key: `err:${r.fingerprint}`, level: "uyari", text: `Yeni hata (${errorLabel(r)})` });
      }
      const spikes = await rows(sql`
        select fingerprint, platform, name, count from client_error_groups
        where last_seen >= now() - interval '10 minutes' and count >= 50 order by count desc limit 3`);
      for (const r of spikes) {
        alerts.push({ key: `errspike:${r.fingerprint}`, level: "uyari", text: `Sık tekrar eden hata (${errorLabel(r)}, toplam ${num(r.count)})` });
      }
    }),
    guard("content", async () => {
      /*
        ŞÜPHELİ İÇERİK MADDESİ.

        Bozuk bir madde kimseyi uyandırmıyor: uygulama çalışır, öğrenci
        yanlış cevap alır ve sebebini bilmez. Ölçüm zaten var
        (`lib/content/analytics`) ama panele BAKAN biri olmadan bir şey ifade
        etmiyordu; uyarı motoru o boşluğu kapatıyor.

        "Zor" ile "bozuk" ayırt ediliyor: sinyal ayırt etme gücü, doğruluk
        oranı değil (gerekçe analytics dosyasında). Eşik altı veri gürültü
        sayıldığı için uyarı ancak yeterli cevap toplanınca çıkıyor.
      */
      const items = await suspectItems(5);
      const bad = items.filter((i) => i.suspect);
      if (bad.length === 0) return;
      const worst = bad
        .slice(0, 3)
        .map((i) => `${i.label} (ayırt ${i.discrimination}, %${i.pct}, ${i.asked} cevap)`)
        .join(" | ");
      alerts.push({
        key: "content:suspect",
        level: "uyari",
        text: `${bad.length} şüpheli içerik maddesi: ${worst}. Panelden kapatılabilir (/admin/content).`,
      });
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
export async function runAlerts(extra: Alert[] = []): Promise<{ active: number; sent: number; resolved: number; configured: boolean; failed: number }> {
  /* `extra`: uyarı ucunun kendi yan işlerinden (zamanlı içerik yayını, özet
     tablo) gelen hatalar; kontrol listesinde değiller ama aynı yoldan gitmeli. */
  const alerts = [...(await collectAlerts()), ...extra];
  const state = await loadState();
  const now = new Date();
  /*
    GÖNDERİLEMEYEN UYARI KAYBOLMAZ (2026-10-02). Eskiden durum, Telegram'a
    gidip gitmediğine bakılmadan kaydediliyordu: ağ hıçkırığında ya da 4.000
    karakteri aşan mesajın HTML etiketi ortadan kesilip Telegram 400 verdiğinde
    uyarı "gönderildi" sayılıyor ve bir daha gelmiyordu. Artık her satır kendi
    durum değişikliğini taşıyor; satırlar sınırı aşmayan parçalara bölünüyor ve
    değişiklik yalnız parçası GİTTİYSE uygulanıyor. Gitmeyen satır sonraki
    koşuda (10 dk) yeniden deneniyor.
  */
  const ops: { line: string; apply: () => void; kind: "sent" | "resolved" }[] = [];

  /* HER SATIR NEREYE BAKILACAĞINI URL İLE SÖYLÜYOR (`lib/admin-links`): panel
     bölümü ve varsa cevabın verildiği dış konsol. Eskiden mesajın sonunda
     yalnız panelin ana sayfası vardı. */
  const where = (key: string) => {
    const l = alertLinks(key);
    /* Adres AÇIKÇA yazılıyor, bağlantı metninin arkasına gizlenmiyor: kopyalanıp
       başka yere yapıştırılabilsin, nereye gidileceği tıklamadan görülsün. */
    const panel = `→ ${esc(l.panel.label)}: ${esc(absolute(SITE_URL, l.panel.path))}`;
    return l.external ? `${panel}\n→ ${esc(l.external.label)}: ${esc(l.external.url)}` : panel;
  };
  const current = new Set(alerts.map((a) => a.key));
  for (const a of alerts) {
    const prev = state[a.key];
    if (!prev) {
      ops.push({
        kind: "sent",
        line: `${a.level === "kritik" ? "<b>[KRİTİK]</b>" : "<b>[UYARI]</b>"} ${esc(a.text)}\n${where(a.key)}`,
        apply: () => (state[a.key] = { since: now.toISOString(), lastSent: now.toISOString(), text: a.text, level: a.level }),
      });
    } else if (prev.level === "uyari" && a.level === "kritik") {
      /* SEVİYE YÜKSELDİ: aynı anahtar uyarıdan kritiğe çıktıysa (disk %85 → %95,
         bütçe tahmini → aşıldı, kredi azaldı → istekler reddediliyor) 6 saatlik
         hatırlatmayı beklemeden hemen gider. Düşüş sessiz: hatırlatma yeterli. */
      ops.push({
        kind: "sent",
        line: `<b>[KRİTİK, yükseldi]</b> ${esc(a.text)}\n${where(a.key)}`,
        apply: () => {
          prev.level = a.level;
          prev.lastSent = now.toISOString();
          prev.text = a.text;
        },
      });
    } else if (prev.level === "kritik" && a.level === "uyari" && now.getTime() - new Date(prev.lastSent).getTime() < REMIND_MS) {
      /* Sessiz düşüş: seviye kayıtta güncelleniyor ki yeniden kritiğe çıkınca yine haber gelsin. */
      prev.level = a.level;
      prev.text = a.text;
    } else if (now.getTime() - new Date(prev.lastSent).getTime() >= REMIND_MS && !a.key.startsWith("err")) {
      const hours = Math.round((now.getTime() - new Date(prev.since).getTime()) / 3_600_000);
      ops.push({
        kind: "sent",
        line: `<b>[SÜRÜYOR ${hours} sa]</b> ${esc(a.text)}\n${where(a.key)}`,
        apply: () => {
          prev.lastSent = now.toISOString();
          prev.text = a.text;
          prev.level = a.level;
        },
      });
    }
  }
  for (const [key, prev] of Object.entries(state)) {
    if (current.has(key)) continue;
    // Hata grubu anahtarları bir gün tutuluyor ki aynı grup "yeni" diye tekrar gelmesin.
    if (key.startsWith("err")) {
      if (now.getTime() - new Date(prev.since).getTime() > 86_400_000) delete state[key];
      continue;
    }
    /* Zincirden çıkarılan sağlayıcının uyarısı "düzeldi" değil: sağlayıcı
       düzelmedi, artık kullanılmıyor. */
    const aiName = /^ai(?:-down)?:(.+)$/.exec(key)?.[1];
    const line = aiName && aiName !== "none" && !activeAiProviderNames().has(aiName)
      ? `<b>[KAPANDI]</b> Yapay zekâ sağlayıcısı ${esc(aiName)} artık zincirde değil; uyarısı kapatıldı.`
      : `<b>[DÜZELDİ]</b> ${esc(prev.text)}`;
    ops.push({ kind: "resolved", line, apply: () => delete state[key] });
  }

  let sent = 0;
  let resolved = 0;
  let failed = 0;
  const configured = telegramConfigured();
  const footer = `\n\nGelen işler: ${esc(absolute(SITE_URL, "/admin"))}`;
  for (const chunk of chunkLines(ops.map((o) => o.line), TELEGRAM_BUDGET - footer.length)) {
    /* Telegram kapalıysa (yerel geliştirme) durum yine ilerliyor: panel aynı durumu okuyor. */
    const ok = !configured || (await sendTelegram(`<b>Lernomi</b>\n${chunk.lines.join("\n\n")}${footer}`));
    for (const i of chunk.indexes) {
      if (!ok) {
        failed++;
        continue;
      }
      ops[i].apply();
      if (ops[i].kind === "sent") sent++;
      else resolved++;
    }
  }
  await saveState(state);
  return { active: alerts.length, sent, resolved, configured, failed };
}

/** Telegram mesaj sınırı 4.096; başlık ve HTML kaçışları için pay bırakılıyor. */
const TELEGRAM_BUDGET = 3_800;

/**
 * Satırları sınırı aşmayan parçalara böler; satır ortadan kesilmez (HTML etiketi
 * yarım kalırsa Telegram mesajın tamamını 400 ile reddediyor). Tek başına
 * sınırı aşan satır etiketsiz kısaltılır. Saf: `test:admin`.
 */
export function chunkLines(lines: string[], budget: number): { lines: string[]; indexes: number[] }[] {
  const out: { lines: string[]; indexes: number[] }[] = [];
  let cur: { lines: string[]; indexes: number[] } = { lines: [], indexes: [] };
  let len = 0;
  lines.forEach((raw, i) => {
    const line = raw.length > budget ? raw.replace(/<[^>]+>/g, "").slice(0, budget - 1) + "…" : raw;
    if (cur.lines.length && len + 2 + line.length > budget) {
      out.push(cur);
      cur = { lines: [], indexes: [] };
      len = 0;
    }
    cur.lines.push(line);
    cur.indexes.push(i);
    len += (cur.lines.length > 1 ? 2 : 0) + line.length;
  });
  if (cur.lines.length) out.push(cur);
  return out;
}
