import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  CLOUDFLARE,
  GROQ,
  RESEND,
  cloudflareDayUsd,
  cloudflareNeurons,
  deepgramUsd,
  groqChatUsd,
  groqSttUsd,
  monthlyBudgetUsd,
  projectMonth,
  type Plan,
} from "@/lib/ai-budget-limits";

/**
 * KULLANIMA GÖRE ÜCRETLENEN SERVİSLER — bugünkü kota ve bu ayın tahmini maliyeti.
 *
 * `ai_usage` her çağrıyı jeton/saniye/karakterle yazıyor ama panel ve uyarılar
 * yalnız hata oranına bakıyordu: Cloudflare'in günlük 10.000 neuron'u, Groq'un
 * günlük 200.000 jetonu ve Resend'in günde 100 postası dolarken kimse
 * görmüyordu (Groq 2026-09-29'da 7 kullanıcıyla doldu). Burası o sayıları
 * çıkarıyor; tarifeler `lib/ai-budget-limits`, uyarılar `lib/alerts` `budget`,
 * panel Sistem › Sunucu › Yapay zekâ bütçesi.
 *
 * GÜN VE AY UTC: Cloudflare ve Groq günlük kotayı UTC 00:00'da sıfırlıyor,
 * `ai_usage.day` de UTC yazılıyor. Resend'in günlük sınırı için son 24 saat.
 *
 * TAHMİN: neuron sayısı jetondan hesaplanıyor (Cloudflare'in kendi sayacını
 * mevcut jetonla okuyamıyoruz). 2026-10-01'den önceki akışlı sohbet satırları
 * jetonsuz; jetonsuz başarılı çağrı sayısı `missingTokens`da. Sayım yalnız bu
 * uygulamanın çağrıları: aynı hesabı başka işler de kullanıyorsa gerçek sayı
 * daha yüksek. Bu yüzden sayılar ALT SINIR; sağlayıcının kendi reddi ayrıca
 * izleniyor (`quotaRejections`).
 */

export type AiBudget = {
  today: string;
  cloudflare: {
    plan: Plan;
    neuronsToday: number;
    freePerDay: number;
    monthNeurons: number;
    monthUsd: number;
    /** Tarifede olmayan modeller: neuron ve maliyet hesaplanamıyor. */
    unknownModels: string[];
    /** Bu ay jeton sayısı yazılmamış başarılı çağrı (tahmin bunlar kadar eksik). */
    missingTokens: number;
  };
  groq: {
    plan: Plan;
    models: { model: string; tokensToday: number; limit: number | null }[];
    sttRequestsToday: number;
    sttSecondsToday: number;
    sttRequestsLimit: number;
    sttSecondsLimit: number;
    monthUsd: number;
  };
  deepgram: { monthMinutes: number; monthUsd: number };
  resend: { plan: Plan; last24h: number; month: number; perDay: number; perMonth: number };
  /** Bu ay bugüne kadar ve ay sonu tahmini (sabit plan ücretleri hariç). */
  monthUsd: number;
  projectedUsd: number;
  budgetUsd: number | null;
};

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  const r = (await db.execute(q)) as unknown;
  if (Array.isArray(r)) return r as Row[];
  return ((r as { rows?: Row[] }).rows ?? []) as Row[];
}
const num = (v: unknown) => Number(v) || 0;

export async function aiBudget(now: Date = new Date()): Promise<AiBudget> {
  const today = now.toISOString().slice(0, 10);
  const monthStart = `${today.slice(0, 8)}01`;
  const monthStartTs = `${monthStart}T00:00:00Z`;

  const [cf, groqChat, groqStt, groqSttMonth, groqChatMonth, dg, mail] = await Promise.all([
    rows(sql`select day::text as day, model, coalesce(sum(prompt_tokens),0)::bigint pin, coalesce(sum(completion_tokens),0)::bigint pout,
        count(*) filter (where ok and prompt_tokens is null)::int missing
      from ai_usage where provider = 'cloudflare' and kind in ('chat','assess','coach') and day >= ${monthStart}::date group by 1, 2`),
    rows(sql`select model, coalesce(sum(prompt_tokens),0)::bigint + coalesce(sum(completion_tokens),0)::bigint tokens
      from ai_usage where provider = 'groq' and kind <> 'stt' and day = ${today}::date group by 1`),
    rows(sql`select count(*)::int n, coalesce(sum(audio_seconds),0)::int s
      from ai_usage where provider = 'groq' and kind = 'stt' and day = ${today}::date`),
    rows(sql`select coalesce(sum(greatest(coalesce(audio_seconds,0), ${GROQ.sttMinSeconds})),0)::int billed
      from ai_usage where provider = 'groq' and kind = 'stt' and ok and day >= ${monthStart}::date`),
    rows(sql`select model, coalesce(sum(prompt_tokens),0)::bigint pin, coalesce(sum(completion_tokens),0)::bigint pout
      from ai_usage where provider = 'groq' and kind <> 'stt' and day >= ${monthStart}::date group by 1`),
    rows(sql`select model, coalesce(sum(audio_seconds),0)::int s
      from ai_usage where provider = 'deepgram' and ok and day >= ${monthStart}::date group by 1`),
    rows(sql`select count(*) filter (where created_at >= now() - interval '24 hours')::int d,
        count(*) filter (where created_at >= ${monthStartTs}::timestamptz)::int m
      from events where name = 'mail_sent' and kind like '%:ok' and created_at >= least(now() - interval '24 hours', ${monthStartTs}::timestamptz)`),
  ]);

  /* Cloudflare: neuron gün gün (ücretsiz pay günlük), maliyet günlerin toplamı. */
  const byDay = new Map<string, number>();
  const unknown = new Set<string>();
  let missing = 0;
  for (const r of cf) {
    missing += num(r.missing);
    const n = cloudflareNeurons(String(r.model), num(r.pin), num(r.pout));
    if (n == null) {
      if (num(r.pin) + num(r.pout) > 0 || num(r.missing) > 0) unknown.add(String(r.model));
      continue;
    }
    byDay.set(String(r.day), (byDay.get(String(r.day)) ?? 0) + n);
  }
  const cfMonthNeurons = [...byDay.values()].reduce((a, b) => a + b, 0);
  const cfMonthUsd = [...byDay.values()].reduce((a, n) => a + cloudflareDayUsd(n), 0);

  const groqMonthUsd =
    groqChatMonth.reduce((a, r) => a + groqChatUsd(String(r.model), num(r.pin), num(r.pout)), 0) + groqSttUsd(num(groqSttMonth[0]?.billed));
  const dgSeconds = dg.reduce((a, r) => a + num(r.s), 0);
  const dgUsd = dg.reduce((a, r) => a + deepgramUsd(String(r.model), num(r.s)), 0);

  /* Bugün hiç çağrı almamış ama kotası olan modeller de görünsün (sıfırla). */
  const groqModels = new Map<string, number>(Object.keys(GROQ.tokensPerDay).map((m) => [m, 0]));
  for (const r of groqChat) groqModels.set(String(r.model), num(r.tokens));

  const monthUsd = cfMonthUsd + groqMonthUsd + dgUsd;
  return {
    today,
    cloudflare: {
      plan: CLOUDFLARE.plan,
      neuronsToday: Math.round(byDay.get(today) ?? 0),
      freePerDay: CLOUDFLARE.freeNeuronsPerDay,
      monthNeurons: Math.round(cfMonthNeurons),
      monthUsd: cfMonthUsd,
      unknownModels: [...unknown],
      missingTokens: missing,
    },
    groq: {
      plan: GROQ.plan,
      models: [...groqModels].map(([model, tokensToday]) => ({ model, tokensToday, limit: GROQ.plan === "free" ? GROQ.tokensPerDay[model] ?? null : null })),
      sttRequestsToday: num(groqStt[0]?.n),
      sttSecondsToday: num(groqStt[0]?.s),
      sttRequestsLimit: GROQ.sttRequestsPerDay,
      sttSecondsLimit: GROQ.sttSecondsPerDay,
      monthUsd: groqMonthUsd,
    },
    deepgram: { monthMinutes: Math.round(dgSeconds / 60), monthUsd: dgUsd },
    resend: { plan: RESEND.plan, last24h: num(mail[0]?.d), month: num(mail[0]?.m), perDay: RESEND.perDay, perMonth: RESEND.perMonth },
    monthUsd,
    projectedUsd: projectMonth(monthUsd, now),
    budgetUsd: monthlyBudgetUsd(),
  };
}

/**
 * Son `hours` saatte sağlayıcının KENDİ sayacıyla verdiği kota/ödeme retleri, sağlayıcı başına:
 * "ödeme gerekli" (402), Cloudflare'in günlük ücretsiz pay reddi (4006) ve Groq'un günlük jeton
 * (TPD) reddi. Tahminden güvenilir: bizim sayımımız aynı hesabı kullanan başka işleri (yerel
 * testler) ve jetonsuz eski satırları görmüyor; 2026-09-29'da Groq 199.047 jeton saydı, `ai_usage` 32.387.
 */
export async function quotaRejections(hours = 24): Promise<{ provider: string; payment: number; cfDaily: number; groqDaily: number; sample: string }[]> {
  const cfDaily = sql`(provider = 'cloudflare' and (error ilike '%4006%' or error ilike '%daily free allocation%'))`;
  const groqDaily = sql`(provider = 'groq' and status = 429 and error ilike '%tokens per day%')`;
  const rs = await rows(sql`
    select provider,
      count(*) filter (where status = 402)::int payment,
      count(*) filter (where ${cfDaily})::int cf_daily,
      count(*) filter (where ${groqDaily})::int groq_daily,
      max(left(error, 200)) sample
    from ai_usage
    where not ok and created_at >= now() - make_interval(hours => ${hours})
      and (status = 402 or ${cfDaily} or ${groqDaily})
    group by 1`);
  return rs.map((r) => ({ provider: String(r.provider), payment: num(r.payment), cfDaily: num(r.cf_daily), groqDaily: num(r.groq_daily), sample: String(r.sample ?? "") }));
}
