/**
 * Konuşma tanıma kota ölçümü (WP-20): npm run report:stt
 *
 * Gerçek kullanım (ai_usage.kind = "stt": her klibin saniyesi kayıtlı;
 * roleplay_logs; user_skills; events DAU) üstünden günlük/saatlik ses
 * saniyesi ve istek sayısını çıkarır, üç ücretsiz sağlayıcının kotasıyla
 * karşılaştırır ve her birinin kaç günlük aktif kullanıcıya (DAU) yettiğini
 * söyler. İki model:
 *   - GÖZLENEN: son 30 günün STT saniyesi / DAU (bugünkü davranış).
 *   - HEDEF (WP-20 sonrası): telaffuz puanı her söyleyiş turunda, rol yapma
 *     ve monolog kaydı da STT'ye gider — kullanıcı başına gün başına
 *     varsayımlı yük (aşağıda TARGET).
 * Çıktı: docs/plan/stt-capacity.md (tablo) + konsol özeti. Salt okunur.
 */
import "dotenv/config";
import { writeFileSync } from "node:fs";
import { Pool } from "pg";

const sql = new Pool({ connectionString: process.env.DATABASE_URL! });
const q = async <T = Record<string, unknown>>(s: TemplateStringsArray, ...v: unknown[]) => (await sql(s, ...v)) as T[];

/** Kotalar (2026-08, kaynaklar docs/plan/pronunciation-providers.md). */
const QUOTA = {
  groq: { label: "Groq Whisper large-v3-turbo (ücretsiz)", secPerDay: 28_800, secPerHour: 7_200, reqPerDay: 2_000, reqPerMin: 20, renew: "günlük" },
  cloudflare: { label: "Cloudflare Workers AI whisper-large-v3-turbo (ücretsiz)", secPerDay: Math.floor((10_000 / 46.63) * 60), secPerHour: null, reqPerDay: null, reqPerMin: null, renew: "günlük (10 000 neuron)" },
  gladia: { label: "Gladia (50 € tek seferlik kredi)", totalSec: 80 * 3600, renew: "yenilenmez" },
} as const;

/** Hedef model: WP-20 açıkken kullanıcı başına GÜNLÜK yük. */
const TARGET = {
  drillTasks: 10, // söyleyiş görevi / gün
  drillSec: 4,
  roleplayTurns: 5,
  roleplaySec: 7,
  monologPerDay: 0.3,
  monologSec: 45,
  examPerDay: 0.1,
  examSec: 35,
  retryFactor: 1.4, // tekrar denemeler
  peakHourShare: 0.3, // günün en yoğun saatine düşen pay
  peakMinuteShare: 0.05, // en yoğun dakikaya düşen pay
};
const targetSecPerUser = TARGET.retryFactor * (TARGET.drillTasks * TARGET.drillSec + TARGET.roleplayTurns * TARGET.roleplaySec + TARGET.monologPerDay * TARGET.monologSec + TARGET.examPerDay * TARGET.examSec);
const targetReqPerUser = TARGET.retryFactor * (TARGET.drillTasks + TARGET.roleplayTurns + TARGET.monologPerDay + TARGET.examPerDay);

async function main() {
  const [stt] = await q`select count(*)::int as n, coalesce(sum(audio_seconds),0)::int as sec, coalesce(avg(audio_seconds),0)::float as avg,
      coalesce(percentile_cont(0.95) within group (order by audio_seconds),0)::float as p95,
      count(*) filter (where ok)::int as ok, coalesce(avg(ms),0)::float as ms
      from ai_usage where kind = 'stt' and created_at > now() - interval '30 days'`;
  const byProvider = await q`select provider, model, count(*)::int as n, coalesce(sum(audio_seconds),0)::int as sec, count(*) filter (where ok)::int as ok from ai_usage where kind = 'stt' and created_at > now() - interval '30 days' group by 1,2 order by n desc`;
  const perDay = await q`select day, count(*)::int as n, coalesce(sum(audio_seconds),0)::int as sec from ai_usage where kind = 'stt' and created_at > now() - interval '30 days' group by day order by sec desc`;
  const [peakHour] = await q`select date_trunc('hour', created_at) as h, count(*)::int as n, coalesce(sum(audio_seconds),0)::int as sec from ai_usage where kind = 'stt' and created_at > now() - interval '30 days' group by 1 order by sec desc limit 1`;
  const [peakMin] = await q`select date_trunc('minute', created_at) as m, count(*)::int as n from ai_usage where kind = 'stt' and created_at > now() - interval '30 days' group by 1 order by n desc limit 1`;
  const dau = await q`select date(created_at) as d, count(distinct user_id)::int as u from events where created_at > now() - interval '30 days' group by 1`;
  const [rp] = await q`select count(*)::int as turns from roleplay_logs where created_at > now() - interval '30 days'`;
  const [sp] = await q`select coalesce(sum(attempts),0)::int as attempts from user_skills where skill = 'speaking' and last_at > now() - interval '30 days'`;
  const [mau] = await q`select count(distinct user_id)::int as n from events where created_at > now() - interval '30 days'`;

  const days = Math.max(1, dau.length);
  const dauAvg = dau.reduce((s, r) => s + Number(r.u), 0) / days;
  const dauMax = Math.max(0, ...dau.map((r) => Number(r.u)));
  const sttSecPerDay = Number(stt.sec) / 30;
  const sttReqPerDay = Number(stt.n) / 30;
  const observedSecPerUser = dauAvg > 0 ? sttSecPerDay / dauAvg : 0;
  const observedReqPerUser = dauAvg > 0 ? sttReqPerDay / dauAvg : 0;

  type Row = { dau: number; secDay: number; secHour: number; reqDay: number; reqMin: number };
  const model = (secPerUser: number, reqPerUser: number, dauN: number): Row => ({
    dau: dauN,
    secDay: secPerUser * dauN,
    secHour: secPerUser * dauN * TARGET.peakHourShare,
    reqDay: reqPerUser * dauN,
    reqMin: reqPerUser * dauN * TARGET.peakMinuteShare,
  });
  const scenarios = [1, 5, 10, 25, 50, 100, 250, 500, 1000];

  function groqOk(r: Row) {
    const limits = [r.secDay <= QUOTA.groq.secPerDay, r.secHour <= QUOTA.groq.secPerHour, r.reqDay <= QUOTA.groq.reqPerDay, r.reqMin <= QUOTA.groq.reqPerMin];
    const names = ["gün-sn", "saat-sn", "gün-istek", "dk-istek"];
    const bad = names.filter((_, i) => !limits[i]);
    return bad.length ? `✗ (${bad.join(", ")})` : "✓";
  }
  function cfOk(r: Row) {
    return r.secDay <= QUOTA.cloudflare.secPerDay ? "✓" : "✗ (gün-sn)";
  }
  function gladiaDays(r: Row) {
    return r.secDay > 0 ? Math.floor(QUOTA.gladia.totalSec / r.secDay) : Infinity;
  }
  /** Sağlayıcının yettiği en yüksek DAU (hedef modelde). */
  function maxDau(secPerUser: number, reqPerUser: number, check: (r: Row) => string): number {
    let lo = 0;
    for (let n = 1; n <= 100_000; n = n < 100 ? n + 1 : Math.ceil(n * 1.05)) {
      if (check(model(secPerUser, reqPerUser, n)) === "✓") lo = n;
      else break;
    }
    return lo;
  }

  const fmt = (n: number) => (Number.isFinite(n) ? Math.round(n).toLocaleString("tr-TR") : "∞");
  const lines: string[] = [];
  lines.push("# STT kota ölçümü — Groq · Cloudflare · Gladia (WP-20)", "", `Ölçüm: ${new Date().toISOString().slice(0, 10)} · üretim verisi, son 30 gün · \`npm run report:stt\` ile yenilenir.`, "");
  lines.push("## Gözlenen kullanım (son 30 gün)", "");
  lines.push(`- Aktif kullanıcı: ${mau.n} (30 gün); DAU ortalama ${dauAvg.toFixed(1)}, en yüksek ${dauMax}.`);
  lines.push(`- STT istekleri (pocket-mic → /api/stt): ${stt.n} istek, ${stt.sec} sn ses; klip ortalama ${Number(stt.avg).toFixed(1)} sn, p95 ${Number(stt.p95).toFixed(1)} sn; başarı ${stt.n ? Math.round((100 * Number(stt.ok)) / Number(stt.n)) : 0} %, ilk cevap ortalama ${Math.round(Number(stt.ms))} ms.`);
  lines.push(`- Sağlayıcı dağılımı: ${byProvider.map((p) => `${p.provider}/${p.model} ${p.n} istek (${p.sec} sn, ok ${p.ok})`).join("; ") || "—"}.`);
  lines.push(`- En yoğun gün: ${perDay[0] ? `${String(perDay[0].day).slice(0, 10)} — ${perDay[0].n} istek, ${perDay[0].sec} sn` : "—"}; en yoğun saat: ${peakHour ? `${peakHour.n} istek, ${peakHour.sec} sn` : "—"}; en yoğun dakika: ${peakMin ? `${peakMin.n} istek` : "—"}.`);
  lines.push(`- Rol yapma turu: ${rp.turns} (30 gün); konuşma egzersizi denemesi: ${sp.attempts}.`);
  lines.push(`- Günlük ortalama: ${sttSecPerDay.toFixed(0)} sn ses, ${sttReqPerDay.toFixed(1)} istek → kullanıcı başına gün başına ${observedSecPerUser.toFixed(0)} sn / ${observedReqPerUser.toFixed(1)} istek.`, "");
  lines.push("## Hedef model (WP-20 açıkken, kullanıcı başına gün başına)", "");
  lines.push(`${TARGET.drillTasks} söyleyiş × ${TARGET.drillSec} sn + ${TARGET.roleplayTurns} rol yapma turu × ${TARGET.roleplaySec} sn + ${TARGET.monologPerDay} monolog × ${TARGET.monologSec} sn + ${TARGET.examPerDay} sınav × ${TARGET.examSec} sn, tekrar çarpanı ${TARGET.retryFactor} → **${targetSecPerUser.toFixed(0)} sn ve ${targetReqPerUser.toFixed(1)} istek / kullanıcı / gün**; en yoğun saat günün %${TARGET.peakHourShare * 100}'u, en yoğun dakika %${TARGET.peakMinuteShare * 100}'i.`, "");
  lines.push("## Kotalar", "");
  lines.push(`- Groq: ${fmt(QUOTA.groq.secPerDay)} sn/gün, ${fmt(QUOTA.groq.secPerHour)} sn/saat, ${fmt(QUOTA.groq.reqPerDay)} istek/gün, ${QUOTA.groq.reqPerMin} istek/dk — ${QUOTA.groq.renew}.`);
  lines.push(`- Cloudflare: 10 000 neuron/gün ÷ 46,63 neuron/dk ≈ ${fmt(QUOTA.cloudflare.secPerDay / 60)} dk = ${fmt(QUOTA.cloudflare.secPerDay)} sn/gün — ${QUOTA.cloudflare.renew}; saat/dakika sınırı belirtilmemiş.`);
  lines.push(`- Gladia: 50 € tek seferlik ≈ 80 saat = ${fmt(QUOTA.gladia.totalSec)} sn TOPLAM — ${QUOTA.gladia.renew} (eski "10 saat/ay" bilgisi geçersiz).`, "");

  for (const [name, secU, reqU] of [["Gözlenen davranış", observedSecPerUser, observedReqPerUser], ["Hedef model", targetSecPerUser, targetReqPerUser]] as const) {
    lines.push(`## ${name} — DAU'ya göre`, "");
    lines.push("| DAU | sn/gün | sn/tepe saat | istek/gün | istek/tepe dk | Groq | Cloudflare | Gladia kredisi kaç gün |", "|---|---|---|---|---|---|---|---|");
    for (const n of scenarios) {
      const r = model(secU, reqU, n);
      lines.push(`| ${n} | ${fmt(r.secDay)} | ${fmt(r.secHour)} | ${fmt(r.reqDay)} | ${r.reqMin.toFixed(1)} | ${groqOk(r)} | ${cfOk(r)} | ${fmt(gladiaDays(r))} |`);
    }
    lines.push("", `Eşik: Groq ≤ **${fmt(maxDau(secU, reqU, groqOk))} DAU**, Cloudflare ≤ **${fmt(maxDau(secU, reqU, cfOk))} DAU**${secU > 0 ? "" : " (gözlenen yük sıfır — hedef modele bak)"}.`, "");
  }

  lines.push("## Yorum", "");
  lines.push("- Bugünkü kullanım (≤ 4 DAU) üç sağlayıcının hepsinin çok altında; Groq tek başına yeter.");
  lines.push("- Hedef modelde ilk kırılan sınır Groq'un **dakikada 20 istek** eşiği (tepe dakika), günlük saniye değil: aynı anda konuşan 20+ kişi. Çare: istemci tarafında 1 sn'lik kuyruk/geri çekilme ve 429'da Cloudflare'a düşmek.");
  lines.push("- Cloudflare günlük ~214 dakika verir, saat sınırı yok: Groq'un dakika sınırı aşılınca tepe saatlerde ikinci hat.");
  lines.push("- Gladia kredisi yenilenmediği için ana hat değil; Groq + Cloudflare ikisi de düşerse üçüncü yedek (≈ 80 saat).");
  lines.push("- Ölçüm tekrarlanmalı: DAU 25'i geçince (`report:stt`), tepe dakika sayısı 15'e yaklaşınca kuyruk mantığını devreye al.");
  const md = lines.join("\n") + "\n";
  writeFileSync("docs/plan/stt-capacity.md", md);
  console.log(md);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
