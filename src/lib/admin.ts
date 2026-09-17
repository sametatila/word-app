import "server-only";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getAdminSessionInfo, getUserEmail } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { db } from "@/lib/db";
import { computeFunnel, type Funnel } from "@/lib/funnel";
import { queryRunner, type QueryIssue } from "@/lib/admin-query";

/**
 * Admin panosu veri katmanı (lernomi.app/admin). Sahibin sistemi yönetmesi + tüm
 * istatistik/telemetriyi en ince detayına kadar görmesi için. Erişim yalnız
 * ADMIN_EMAILS ortam değişkenindeki e-postalara açık (virgülle ayrılmış).
 */
// Yetki listesi yalnız ADMIN_EMAILS'ten okunur; koda gömülü varsayılan yok.
// Repo herkese açık: koddaki bir e-posta hem hedef gösterir hem de sunucudaki
// .env'den bağımsız, geri alınamaz bir yetki olurdu. Liste boşsa kimse admin
// değildir (kapalı varsayılan).
const ADMINS = Array.from(new Set(
  (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean),
));

/**
 * YEREL TASARIM ÖNİZLEMESİ — yalnız `next dev` + `ADMIN_PREVIEW=1`.
 *
 * Panelin görünüşünü ekran görüntüsüyle doğrulamak için giriş (2FA'lı admin
 * hesabı) olmadan OKUMA sayfalarını açar. Üretimde imkânsız: `next build` /
 * `next start` NODE_ENV'i her zaman "production" yapıyor. YAZMA kapısı
 * (`adminWriteGate`) bundan etkilenmez; önizlemede hiçbir işlem yapılamaz.
 */
export function adminPreview(): boolean {
  return process.env.NODE_ENV === "development" && process.env.ADMIN_PREVIEW === "1";
}

/**
 * Admin kapısı — hem yetki hem de tanılama için giriş e-postasını da döndürür.
 *
 * E-posta listede olmakla yetmiyor, DOĞRULANMIŞ olmalı. Doğrulama zorunluluğu
 * SMTP'nin yapılandırılmış olmasına bağlı (`requireEmailVerification:
 * emailConfigured`): SMTP kapalı bir ortamda kayıt, yazılan adresle anında
 * oturum veriyor. Gerçek sahip henüz kaydolmamışsa bir ADMIN_EMAILS adresine
 * kaydolan herkes panoya girer: kullanıcı verisi, premium ver/al, canlı
 * hukuki metinler (güvenlik denetimi 2026-09-14, #5). Kapı artık SMTP
 * yapılandırmasına değil, adresin gerçekten doğrulanmış olmasına bakıyor.
 */
export async function adminGate(): Promise<{ ok: boolean; email: string | null }> {
  if (adminPreview()) return { ok: true, email: "onizleme@yerel" };
  const { email, verified } = await getUserEmail();
  return { ok: !!email && verified && ADMINS.includes(email.toLowerCase()), email };
}

/**
 * ADMIN YAZMA KAPISI — okumadan daha sıkı.
 *
 * Panel artık hesap siliyor, askıya alıyor, herkese bildirim gönderiyor, bakım
 * açıyor ve premium veriyor; tek bir çalınmış oturum çerezi bunların hepsine
 * yetiyordu (eleştirel denetim 2026-09-17). İki katman:
 *
 *   HER YAZMA   aynı-köken + ADMIN_EMAILS + doğrulanmış e-posta + hesapta İKİ
 *               ADIMLI DOĞRULAMA açık. 2FA'sız admin paneli OKUYABİLİR ama
 *               hiçbir şey değiştiremez; panel bunu üstte yazıyor.
 *   HASSAS      ayrıca oturum son 12 saatte AÇILMIŞ olmalı (tazelenmiş değil).
 *               Uzun ömürlü bir çerezle geri alınamaz işlem yapılamasın.
 *
 * Her geçen yazma `admin_audit`e düşüyor (`logAdminAction`).
 */
export const ADMIN_FRESH_HOURS = 12;
export type AdminWriter = { email: string; userId: string; ip: string | null };

export async function adminWriteGate(req: Request, level: "normal" | "sensitive"): Promise<{ ok: true; admin: AdminWriter } | { ok: false; response: NextResponse }> {
  const deny = (error: string, status = 403) => ({ ok: false as const, response: NextResponse.json({ error }, { status }) });
  if (!sameOrigin(req)) return deny("forbidden");
  const s = await getAdminSessionInfo();
  if (!s || !s.verified || !ADMINS.includes(s.email.toLowerCase())) return deny("forbidden");
  if (!s.twoFactor) return deny("admin_2fa_required");
  if (level === "sensitive" && Date.now() - s.sessionCreatedAt.getTime() > ADMIN_FRESH_HOURS * 3_600_000) return deny("admin_reauth_required");
  return { ok: true, admin: { email: s.email, userId: s.userId, ip: req.headers.get("x-real-ip") } };
}

/** Panel üst satırı için: 2FA açık mı, oturum hassas işlem için taze mi. */
export async function adminSecurityState(): Promise<{ twoFactor: boolean; freshForSensitive: boolean }> {
  const s = await getAdminSessionInfo();
  return {
    twoFactor: s?.twoFactor === true,
    freshForSensitive: !!s && Date.now() - s.sessionCreatedAt.getTime() <= ADMIN_FRESH_HOURS * 3_600_000,
  };
}

/** Admin işlem kaydı. Yazma hatası işlemi durdurmuyor ama loga düşüyor. */
export async function logAdminAction(admin: AdminWriter, action: string, target: string | null, detail?: Record<string, unknown>): Promise<void> {
  try {
    await db.execute(sql`insert into admin_audit (admin_email, action, target, detail, ip)
      values (${admin.email}, ${action}, ${target}, ${detail ? JSON.stringify(detail) : null}::jsonb, ${admin.ip})`);
  } catch (err) {
    console.error("[admin-audit]", (err as Error).message);
  }
}

const num = (v: unknown) => Number(v) || 0;
const str = (v: unknown) => (v == null ? "" : String(v));

export type AdminData = {
  kpi: {
    totalUsers: number; new1d: number; new7d: number; new30d: number;
    /** Toplamın içindeki misafir kimlikleri (hesapsız kullanım, 30 gün kullanılmayınca silinir). */
    guestUsers: number;
    dau: number; wau: number; mau: number; streakUsers: number;
    totalXp: number; totalReviews: number; accuracy: number; avgStreak: number;
    reviews1d: number; seconds30d: number;
  };
  trend: { day: string; active: number; reviews: number; xp: number; newWords: number }[];
  levels: { level: string; count: number }[];
  funnel: Funnel;
  events30: { name: string; count: number; users: number }[];
  recentEvents: { day: string; name: string; kind: string; value: number; userId: string }[];
  /**
   * En çok unutulan kelimeler, KURS BAŞINA. Eskiden `de · tr` yazıyordu: İngilizce
   * kursun kelimesi de Almanca sanılıyordu ve iki kursun aynı yazılan kelimesi
   * tek satırda toplanıyordu. `word` kursun hedef dilindeki biçim (`words.de`
   * sütunu her kursta hedef dili tutuyor), `gloss` Türkçe karşılık.
   */
  hardWords: { course: string; word: string; gloss: string; niveau: string; lapses: number; leeches: number }[];
  errors: { type: string; count: number }[];
  games: { game: string; count: number; accuracy: number }[];
  users: {
    userId: string; name: string; level: string; course: string; streak: number;
    longest: number; xp: number; words: number; lastActive: string; joined: string;
    /** Anadil (boşsa eski hesap, Türkçe sayılır) — kurs ile birlikte çifti kurar. */
    native: string; guest: boolean; premium: boolean;
    /** Destek e-postası geldiğinde hesabı bulmak için; pano yalnız ADMIN_EMAILS'e açık. */
    email: string;
  }[];
  // — UX / platform / öğrenme kalitesi / ops (WP-admin genişletme) —
  platform: { key: string; count: number; users: number }[];
  screens: { screen: string; views: number; avgSec: number }[];
  sessionFunnel: { started: number; done: number; stopped: number };
  onboarding: { step: string; users: number }[];
  walk: { reason: number; count: number }[];
  production: { task: string; count: number; avgScore: number }[];
  clientErrors: { screen: string; count: number }[];
  premium: { views: number; gates: number; starts: number; done: number };
  premiumGates: { feature: string; count: number }[];
  /**
   * Bildirim hunisi ÜÇ basamak: denendi → ulaştı → açıldı.
   *
   * "CTR" eskiden açılan/DENENEN oranıydı; teslim edilmeyen bildirim oranı
   * haksız yere düşürüyordu. Artık açılan/ULAŞAN.
   */
  notifications: { optinYes: number; optinNo: number; sent: number; delivered: number; opened: number };
  /**
   * Giden e-posta (30g). `fail` SMTP reddi, `cap` alıcı başına saatlik tavan.
   *
   * Doğrulama postası zorunlu bir kapı: `verify:fail` sıfırdan büyükse o
   * kadar kişi hesabına HİÇ giremiyor demektir. Panoya bu yüzden kendi
   * bölümü konuldu (bkz. lib/email `mail_sent`).
   */
  mail: { kind: string; ok: number; fail: number; cap: number }[];
  ai: { provider: string; calls: number; okPct: number; avgMs: number; errors: number; tokens: number; chars: number }[];
  generatedAt: string;
  /** Başarısız sorgular — boş değilse panel üstte kırmızı satırla söylüyor. */
  issues: QueryIssue[];
};

/**
 * `days`: panelin seçili aralığı (7 / 30 / 90). Pencereye bağlı her metrik
 * ona uyuyor; tanımı gereği sabit olanlar (DAU/WAU/MAU, 1/7/30 günde yeni
 * kayıt) ve yapay zekâ sağlığının 7 günü sabit kalıyor.
 */
export async function getAdminData(days = 30): Promise<AdminData> {
  // Hataları yutan ama saklayan çalıştırıcı (lib/admin-query): kırılan bölüm
  // "veri yok" diye görünmesin, sayfa başarısız sorguları listelesin.
  const { rows, issues } = queryRunner("pano");
  const [kpiRows, trend, levels, funnel, events30, recent, hard, errors, games, users] = await Promise.all([
    rows(sql`
      select
        (select count(*) from profiles)::int as total_users,
        (select count(*) from profiles p join "user" u on u.id = p.user_id where u."isAnonymous")::int as guest_users,
        (select count(*) from profiles where created_at >= now() - interval '1 day')::int as new1d,
        (select count(*) from profiles where created_at >= now() - interval '7 days')::int as new7d,
        (select count(*) from profiles where created_at >= now() - interval '30 days')::int as new30d,
        (select count(distinct user_id) from daily_stats where day >= current_date)::int as dau,
        (select count(distinct user_id) from daily_stats where day >= current_date - 6)::int as wau,
        (select count(distinct user_id) from daily_stats where day >= current_date - 29)::int as mau,
        (select count(*) from profiles where current_streak > 0)::int as streak_users,
        (select coalesce(sum(total_xp),0) from profiles)::bigint as total_xp,
        -- Özet tablodan (lib/admin-query refreshRollups): tam tarama yok.
        (select coalesce(sum(n),0) from reviews_daily)::bigint as total_reviews,
        (select coalesce(sum(correct),0)::float / nullif(sum(reviews),0) from daily_stats) as accuracy,
        (select coalesce(avg(current_streak),0) from profiles where current_streak > 0) as avg_streak,
        (select coalesce(sum(reviews),0) from daily_stats where day >= current_date)::int as reviews1d,
        (select coalesce(sum(seconds),0) from daily_stats where day >= current_date - ${days - 1}::int)::bigint as seconds30d
    `),
    rows(sql`
      -- Boş günler de satır (0): grafik gün atlamasın, ortalama doğru bölünsün.
      select to_char(g.day,'YYYY-MM-DD') as day,
             count(distinct d.user_id)::int as active,
             coalesce(sum(d.reviews),0)::int as reviews, coalesce(sum(d.xp),0)::int as xp, coalesce(sum(d.new_words),0)::int as new_words
      from generate_series(current_date - ${days - 1}::int, current_date, interval '1 day') g(day)
      left join daily_stats d on d.day = g.day::date
      group by g.day order by g.day
    `),
    rows(sql`select level, count(*)::int as count from profiles group by level order by level`),
    computeFunnel(),
    rows(sql`
      select name, count(*)::int as count, count(distinct user_id)::int as users
      from events where day >= current_date - ${days - 1}::int group by name order by count desc
    `),
    rows(sql`
      select to_char(day,'YYYY-MM-DD') as day, name, coalesce(kind,'') as kind, value, user_id
      from events order by id desc limit 40
    `),
    rows(sql`
      -- Hedef dildeki biçim her kursta words.de sütununda (İngilizce kursta da).
      select w.course, w.de as word,
             coalesce(w.tr, '') as gloss, w.niveau,
             sum(uw.lapses)::int as lapses,
             count(*) filter (where uw.leech)::int as leeches
      from user_words uw join words w on w.id = uw.word_id
      group by w.course, w.de, w.tr, w.niveau having sum(uw.lapses) > 0
      order by sum(uw.lapses) desc limit 20
    `),
    // Son 30 gün: `reviews_created_idx` ile; tüm geçmiş taranmıyor.
    rows(sql`select coalesce(error_type,'—') as type, count(*)::int as count from reviews where error_type is not null and created_at >= now() - make_interval(days => ${days}::int) group by error_type order by count desc limit 12`),
    rows(sql`
      select game, sum(n)::int as count,
             coalesce(sum(correct)::float / nullif(sum(n), 0), 0) as accuracy
      from reviews_daily group by game order by count desc limit 12
    `),
    rows(sql`
      select p.user_id, coalesce(p.display_name,'') as name, p.level, p.course,
             p.current_streak as streak, p.longest_streak as longest, p.total_xp as xp,
             (select count(*) from user_words w where w.user_id = p.user_id and w.state > 0)::int as words,
             coalesce(to_char(p.last_active_day,'YYYY-MM-DD'),'') as last_active,
             to_char(p.created_at,'YYYY-MM-DD') as joined,
             coalesce(p.native_lang,'tr') as native,
             coalesce(u."isAnonymous", false) as guest,
             coalesce(p.premium_until > now(), false) as premium,
             coalesce(u.email, '') as email
      from profiles p
      left join "user" u on u.id = p.user_id
      order by p.last_active_day desc nulls last, p.total_xp desc
      -- Panoda yalnız son aktif 50 kişi; arama ve sayfalama /admin/users'ta
      -- (lib/admin-users). Eskiden 500 satır + bütün user_words sayımı.
      limit 50
    `),
  ]);

  const [platform, screens, sess, onb, walk, production, clientErrors, prem, premGates, notif, mail, ai] = await Promise.all([
    rows(sql`select coalesce(kind,'?') k, count(*)::int c, count(distinct user_id)::int u from events where name='app_open' and day >= current_date - ${days - 1}::int group by kind order by c desc`),
    rows(sql`select coalesce(kind,'?') screen, count(*) filter (where name='page_view')::int views, coalesce(avg(value) filter (where name='time_spent'),0)::int avg_sec from events where name in ('page_view','time_spent') and day >= current_date - ${days - 1}::int group by kind order by views desc limit 20`),
    /* BAŞLANGIÇ KARTI BASAMAĞI KALKTI. `/learn` hub olunca turun başlangıç
       kartı kaldırıldı ve olay 2026-09-08'den beri hiç akmıyor; huninin ilk
       basamağı kalıcı olarak sıfır görünüyordu — bu, ölçümün bozuk olduğunu
       değil ürünün çöktüğünü düşündürür. Huni artık turun BAŞLATILMASINDAN
       başlıyor. */
    rows(sql`select count(*) filter (where name='session_start')::int started, count(*) filter (where name='session_done')::int done, count(*) filter (where name='session_stop')::int stopped from events where day >= current_date - ${days - 1}::int`),
    rows(sql`select coalesce(kind,'?') step, count(distinct user_id)::int users from events where name='onboarding_step' and day >= current_date - ${days - 1}::int group by kind`),
    rows(sql`select value reason, count(*)::int c from events where name='walk_end' and day >= current_date - ${days - 1}::int group by value order by value`),
    rows(sql`select coalesce(kind,'?') task, count(*)::int c, coalesce(avg(value),0)::int avg_score from events where name='production_attempt' and day >= current_date - ${days - 1}::int group by kind order by c desc`),
    rows(sql`select coalesce(kind,'?') screen, count(*)::int c from events where name='client_error' and day >= current_date - ${days - 1}::int group by kind order by c desc limit 12`),
    rows(sql`select count(*) filter (where name='paywall_view')::int views, count(*) filter (where name='premium_gate')::int gates, count(*) filter (where name='purchase_start')::int starts, count(*) filter (where name='purchase_done')::int done from events where day >= current_date - ${days - 1}::int`),
    rows(sql`select coalesce(kind,'?') feature, count(*)::int c from events where name='premium_gate' and day >= current_date - ${days - 1}::int group by kind order by c desc limit 8`),
    rows(sql`select count(*) filter (where name='push_optin' and value=1)::int optin_yes, count(*) filter (where name='push_optin' and value=0)::int optin_no, count(*) filter (where name='push_sent')::int sent, coalesce(sum(value) filter (where name='push_deliver'),0)::int delivered, count(*) filter (where name='push_open')::int opened from events where day >= current_date - ${days - 1}::int`),
    rows(sql`select split_part(coalesce(kind,'?'),':',1) kind,
        count(*) filter (where kind like '%:ok')::int ok,
        count(*) filter (where kind like '%:fail')::int fail,
        count(*) filter (where kind like '%:cap')::int cap
      from events where name='mail_sent' and day >= current_date - ${days - 1}::int
      group by 1 order by 2 desc`),
    rows(sql`select provider, count(*)::int calls, round(avg(case when ok then 1.0 else 0.0 end)*100,1) ok_pct, coalesce(avg(ms),0)::int avg_ms, count(*) filter (where not ok)::int errors, coalesce(sum(prompt_tokens),0)::bigint tokens, coalesce(sum(chars),0)::bigint chars from ai_usage where day >= current_date - 6 group by provider order by calls desc`),
  ]);

  const k = kpiRows[0] ?? {};
  return {
    kpi: {
      totalUsers: num(k.total_users), guestUsers: num(k.guest_users), new1d: num(k.new1d), new7d: num(k.new7d), new30d: num(k.new30d),
      dau: num(k.dau), wau: num(k.wau), mau: num(k.mau), streakUsers: num(k.streak_users),
      totalXp: num(k.total_xp), totalReviews: num(k.total_reviews), accuracy: num(k.accuracy),
      avgStreak: num(k.avg_streak), reviews1d: num(k.reviews1d), seconds30d: num(k.seconds30d),
    },
    trend: trend.map((r) => ({ day: str(r.day), active: num(r.active), reviews: num(r.reviews), xp: num(r.xp), newWords: num(r.new_words) })),
    levels: levels.map((r) => ({ level: str(r.level), count: num(r.count) })),
    funnel,
    events30: events30.map((r) => ({ name: str(r.name), count: num(r.count), users: num(r.users) })),
    recentEvents: recent.map((r) => ({ day: str(r.day), name: str(r.name), kind: str(r.kind), value: num(r.value), userId: str(r.user_id) })),
    hardWords: hard.map((r) => ({ course: str(r.course), word: str(r.word), gloss: str(r.gloss), niveau: str(r.niveau), lapses: num(r.lapses), leeches: num(r.leeches) })),
    errors: errors.map((r) => ({ type: str(r.type), count: num(r.count) })),
    games: games.map((r) => ({ game: str(r.game), count: num(r.count), accuracy: num(r.accuracy) })),
    users: users.map((r) => ({
      userId: str(r.user_id), name: str(r.name), level: str(r.level), course: str(r.course),
      streak: num(r.streak), longest: num(r.longest), xp: num(r.xp), words: num(r.words),
      lastActive: str(r.last_active), joined: str(r.joined),
      native: str(r.native), guest: r.guest === true, premium: r.premium === true, email: str(r.email),
    })),
    platform: platform.map((r) => ({ key: str(r.k), count: num(r.c), users: num(r.u) })),
    screens: screens.map((r) => ({ screen: str(r.screen), views: num(r.views), avgSec: num(r.avg_sec) })),
    sessionFunnel: { started: num(sess[0]?.started), done: num(sess[0]?.done), stopped: num(sess[0]?.stopped) },
    onboarding: onb.map((r) => ({ step: str(r.step), users: num(r.users) })),
    walk: walk.map((r) => ({ reason: num(r.reason), count: num(r.c) })),
    production: production.map((r) => ({ task: str(r.task), count: num(r.c), avgScore: num(r.avg_score) })),
    clientErrors: clientErrors.map((r) => ({ screen: str(r.screen), count: num(r.c) })),
    premium: { views: num(prem[0]?.views), gates: num(prem[0]?.gates), starts: num(prem[0]?.starts), done: num(prem[0]?.done) },
    premiumGates: premGates.map((r) => ({ feature: str(r.feature), count: num(r.c) })),
    notifications: { optinYes: num(notif[0]?.optin_yes), optinNo: num(notif[0]?.optin_no), sent: num(notif[0]?.sent), delivered: num(notif[0]?.delivered), opened: num(notif[0]?.opened) },
    mail: mail.map((r) => ({ kind: str(r.kind), ok: num(r.ok), fail: num(r.fail), cap: num(r.cap) })),
    ai: ai.map((r) => ({ provider: str(r.provider), calls: num(r.calls), okPct: num(r.ok_pct), avgMs: num(r.avg_ms), errors: num(r.errors), tokens: num(r.tokens), chars: num(r.chars) })),
    generatedAt: new Date().toISOString(),
    issues,
  };
}
