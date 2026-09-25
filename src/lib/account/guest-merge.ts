import "server-only";
import { sql, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { shiftDay } from "@/lib/award";
import { purgeUserData } from "@/lib/account/purge";
import { recordDeletion } from "@/lib/account/deletion-log";
import { GUEST_EMAIL_DOMAIN } from "@/lib/auth/guest-email";

/**
 * MİSAFİRİN İLERLEMESİ HESABA — mağaza ön inceleme B24.
 *
 * Mobil uygulama hesapsız kullanılabiliyor: misafir sunucuda e-postasız bir
 * kimlikle (better-auth `anonymous`) kelime turu, konuşma, beceri ve sınav
 * çözüyor. Hesap oluşturduğunda ya da var olan hesabına girdiğinde uygulama
 * misafirin oturum jetonunu `/api/account/guest/claim`e veriyor; bu dosya o
 * misafirin HER satırını hesaba birleştirip misafiri siliyor.
 *
 * YENİ HESAP da VAR OLAN HESAP da AYNI YOLDAN geçiyor. Yeni hesapta çakışma
 * olmadığı için birleştirme düz taşımaya dönüşüyor; var olan hesapta her tablo
 * aşağıdaki kuralla birleşiyor. Kurallar iki ilke üstüne kurulu:
 *
 *   1. ÖĞRENME KAYBOLMAZ. Aynı kelimenin, konuşmanın, alıştırmanın iki kaydı varsa
 *      en ileri durum ve toplam emek kalıyor: en iyi skor, toplam deneme,
 *      en taze tekrar planı.
 *   2. HESABIN KİMLİĞİ VE AYARLARI KAZANIR. Görünen ad, kullanıcı adı, kurs,
 *      seviye, hatırlatmalar, Premium hakkı hesabınki; misafirinki ancak
 *      hesapta hiç yoksa (hesap kurs seçmemişse) geçiyor.
 *
 * MİSAFİRDE OLMAYAN TABLOLAR DA LİSTEDE. Sosyal katman, rıza defteri, cihaz
 * jetonu, Premium ve davet misafire kapalı (bkz. lib/auth/guest); yine de her
 * kullanıcı tablosu burada bir kural taşıyor: kapı bir gün delinirse satır
 * sahipsiz kalmasın. `check:guest-merge` şemadaki her kullanıcı tablosunun bu
 * dosyada geçtiğini ölçüyor — `check:purge`ün kardeşi.
 *
 * TEK TRANSACTION. Yarım birleşmiş bir hesap (kelimeler taşınmış, günlük
 * istatistik taşınmamış) iki kimlikten de kötü. İki kimlik danışma kilidiyle
 * sabit sırada kilitleniyor: aynı misafir için iki eşzamanlı istek sırayla
 * işliyor, ikincisi misafiri artık bulamıyor.
 */

export type StreakSide = { lastActiveDay: string | null; currentStreak: number; longestStreak: number };

/**
 * İki serinin birleşimi. Saf fonksiyon.
 *
 * Seri "son etkin güne kadar kesintisiz gün sayısı" ve iki kimliğin etkin
 * günleri birleşince seri İKİSİNİN DE ÜSTÜNE çıkabiliyor: misafir pazartesi-
 * çarşamba, hesap perşembe-cumartesi çalıştıysa birleşik seri altı gün. Etkin
 * günler `daily_stats`tan okunabilirdi ama o tablo seri ONARIMINI görmüyor
 * (onarılan gün çalışılmamış gün, satırı yok); bu yüzden her tarafın serisi
 * kendi aralığı olarak alınıyor: [son gün − seri + 1, son gün]. Aralıklar
 * değiyor ya da örtüşüyorsa birleşiyor. Onarım varsa aralık bir gün kısa
 * kalıyor, yani sonuç gerçek birleşimin ALTINDA, hiçbir zaman üstünde değil.
 */
export function mergeStreaks(a: StreakSide, b: StreakSide): { currentStreak: number; longestStreak: number; lastActiveDay: string | null } {
  const days = [a.lastActiveDay, b.lastActiveDay].filter((d): d is string => Boolean(d));
  const longest = Math.max(a.longestStreak, b.longestStreak);
  if (!days.length) return { currentStreak: Math.max(a.currentStreak, b.currentStreak), longestStreak: longest, lastActiveDay: null };
  const last = days.sort().at(-1)!;

  type Span = { start: string; end: string };
  const span = (s: StreakSide): Span | null =>
    s.lastActiveDay && s.currentStreak > 0 ? { start: shiftDay(s.lastActiveDay, -(s.currentStreak - 1)), end: s.lastActiveDay } : null;
  const spans = [span(a), span(b)].filter((s): s is Span => s !== null);

  const live = spans.filter((s) => s.end === last);
  if (!live.length) return { currentStreak: 0, longestStreak: longest, lastActiveDay: last };
  let start = live.map((s) => s.start).sort()[0];
  for (const other of spans) {
    if (other.end === last) continue;
    // Değen (bitişik) ya da örtüşen aralık seriyi geriye uzatıyor.
    if (other.end >= shiftDay(start, -1) && other.start < start) start = other.start;
  }
  const current = Math.round((Date.parse(`${last}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000) + 1;
  return { currentStreak: current, longestStreak: Math.max(longest, current), lastActiveDay: last };
}

/**
 * Misafirin oturum jetonu doğru mu: jeton bu misafirin bir oturumuna ait ve
 * kullanıcı hâlâ misafir. Süresi dolmuş oturum da kabul: jeton sahipliği
 * kanıtlıyor ve misafir, oturumu düştükten sonra hesap açarak ilerlemesini
 * kurtarabilmeli. Haftalık temizlik misafiri sildiyse satır bulunmaz.
 *
 * GÜVENLİK DENETİMİ F3 — BİLİNÇLİ KABUL. "Süresi geçmiş jeton hâlâ geçerli"
 * bir açık gibi görünüyor ama jeton misafirin TEK kimlik kanıtı (başka giriş
 * yolu yok); süre denetimi eklemek ilerleme-kurtarmayı kırar ve veri
 * kaybettirir. Jeton cihaz-yerel bir sır, ona sahip olan zaten misafir. Terk
 * edilen misafir purgeStaleGuests ile siliniyor. `guest-resume` de aynı gerekçe.
 */
export async function verifyGuestToken(guestId: string, token: string): Promise<boolean> {
  const res = await db.execute(sql`
    select 1 as ok
      from session s
      join "user" u on u.id = s."userId"
     where s.token = ${token} and s."userId" = ${guestId} and u."isAnonymous"
     limit 1
  `);
  return rowsOf(res).length > 0;
}

export type MergeOutcome =
  | { merged: true; targetHadProgress: boolean }
  | { merged: false; reason: "guest_not_found" | "target_not_account" | "same_user" };

/** Birleştirmenin tablo tablo adımları — sıra önemli değil (tablolar arası FK yok), okunurluk için gruplu. */
function mergeSteps(G: string, T: string): { table: string; statements: SQL[] }[] {
  return [
    {
      /*
        KELİME TEKRAR PLANI. Aynı kelimenin iki kaydında en son tekrarlanan
        kazanıyor (durum, kolaylık, aralık, vade, doğru serisi): en taze bilgi
        o. Tekrar ve unutma sayıları TOPLANIYOR — ikisi de gerçekten yaşandı.
        Takılma işareti biri takıldıysa kalıyor.
      */
      table: "user_words",
      statements: [
        sql`update user_words t set
              state = case when w.g_wins then w.state else t.state end,
              ease = case when w.g_wins then w.ease else t.ease end,
              interval_days = case when w.g_wins then w.interval_days else t.interval_days end,
              due_at = case when w.g_wins then w.due_at else t.due_at end,
              correct_streak = case when w.g_wins then w.correct_streak else t.correct_streak end,
              last_reviewed_at = case when w.g_wins then w.last_reviewed_at else t.last_reviewed_at end,
              reps = t.reps + w.reps,
              lapses = t.lapses + w.lapses,
              leech = t.leech or w.leech
            from (
              select g.*, (
                coalesce(g.last_reviewed_at, 'epoch'::timestamptz) > coalesce(t2.last_reviewed_at, 'epoch'::timestamptz)
                or (g.last_reviewed_at is not distinct from t2.last_reviewed_at and g.reps > t2.reps)
              ) as g_wins
              from user_words g join user_words t2 on t2.word_id = g.word_id and t2.user_id = ${T}
              where g.user_id = ${G}
            ) w
            where t.user_id = ${T} and t.word_id = w.word_id`,
        sql`delete from user_words g using user_words t where g.user_id = ${G} and t.user_id = ${T} and t.word_id = g.word_id`,
        sql`update user_words set user_id = ${T} where user_id = ${G}`,
      ],
    },
    { table: "reviews", statements: [sql`update reviews set user_id = ${T} where user_id = ${G}`] },
    {
      /* Aynı günün istatistikleri TOPLANIYOR: iki kimlikte de o gün çalışıldı. */
      table: "daily_stats",
      statements: [
        sql`update daily_stats t set reviews = t.reviews + g.reviews, correct = t.correct + g.correct,
              new_words = t.new_words + g.new_words, xp = t.xp + g.xp, seconds = t.seconds + g.seconds
            from daily_stats g where t.user_id = ${T} and g.user_id = ${G} and g.day = t.day`,
        sql`delete from daily_stats g using daily_stats t where g.user_id = ${G} and t.user_id = ${T} and t.day = g.day`,
        sql`update daily_stats set user_id = ${T} where user_id = ${G}`,
      ],
    },
    {
      /* Beceri alıştırması: en iyi skor (ve onun toplamı), toplam deneme, son skor en son denemeden. */
      table: "user_skills",
      statements: [
        sql`update user_skills t set
              total = case when g.correct > t.correct then g.total else t.total end,
              correct = greatest(t.correct, g.correct),
              attempts = t.attempts + g.attempts,
              last_score = case when g.last_at > t.last_at then g.last_score else t.last_score end,
              last_at = greatest(t.last_at, g.last_at),
              first_at = least(t.first_at, g.first_at),
              skill = coalesce(t.skill, g.skill),
              level = coalesce(t.level, g.level)
            from user_skills g where t.user_id = ${T} and g.user_id = ${G} and g.exercise_id = t.exercise_id`,
        sql`delete from user_skills g using user_skills t where g.user_id = ${G} and t.user_id = ${T} and t.exercise_id = g.exercise_id`,
        sql`update user_skills set user_id = ${T} where user_id = ${G}`,
      ],
    },
    {
      table: "user_path_items",
      statements: [
        sql`update user_path_items t set
              last_pct = case when g.last_at > t.last_at then g.last_pct else t.last_pct end,
              best_pct = greatest(t.best_pct, g.best_pct),
              attempts = t.attempts + g.attempts,
              passed_at = case when t.passed_at is null then g.passed_at when g.passed_at is null then t.passed_at else least(t.passed_at, g.passed_at) end,
              last_at = greatest(t.last_at, g.last_at)
            from user_path_items g where t.user_id = ${T} and g.user_id = ${G} and g.item_id = t.item_id`,
        sql`delete from user_path_items g using user_path_items t where g.user_id = ${G} and t.user_id = ${T} and t.item_id = g.item_id`,
        sql`update user_path_items set user_id = ${T} where user_id = ${G}`,
      ],
    },
    {
      /* Günün tur kuyruğu tek satır: en son dokunulan kalıyor. */
      table: "session_state",
      statements: [
        sql`delete from session_state t using session_state g where t.user_id = ${T} and g.user_id = ${G} and g.updated_at > t.updated_at`,
        sql`delete from session_state g using session_state t where g.user_id = ${G} and t.user_id = ${T}`,
        sql`update session_state set user_id = ${T} where user_id = ${G}`,
      ],
    },
    {
      /* Aynı gün aynı görev iki kez alındıysa hesabınki kalıyor (XP zaten günlük istatistiğe yazıldı). */
      table: "quest_claims",
      statements: [
        sql`delete from quest_claims g using quest_claims t where g.user_id = ${G} and t.user_id = ${T} and t.day = g.day and t.quest_id = g.quest_id`,
        sql`update quest_claims set user_id = ${T} where user_id = ${G}`,
      ],
    },
    {
      /* Rozet bir kez: en erken açılış tarihi, görüldüyse görüldü. */
      table: "achievements",
      statements: [
        sql`update achievements t set unlocked_at = least(t.unlocked_at, g.unlocked_at), seen = t.seen or g.seen
            from achievements g where t.user_id = ${T} and g.user_id = ${G} and g.achievement_id = t.achievement_id`,
        sql`delete from achievements g using achievements t where g.user_id = ${G} and t.user_id = ${T} and t.achievement_id = g.achievement_id`,
        sql`update achievements set user_id = ${T} where user_id = ${G}`,
      ],
    },
    { table: "events", statements: [sql`update events set user_id = ${T} where user_id = ${G}`] },
    {
      table: "module_clears",
      statements: [
        sql`update module_clears t set best_left = greatest(t.best_left, g.best_left), attempts = t.attempts + g.attempts, cleared_at = least(t.cleared_at, g.cleared_at)
            from module_clears g where t.user_id = ${T} and g.user_id = ${G} and g.course = t.course and g.level = t.level and g.module_index = t.module_index`,
        sql`delete from module_clears g using module_clears t where g.user_id = ${G} and t.user_id = ${T} and t.course = g.course and t.level = g.level and t.module_index = g.module_index`,
        sql`update module_clears set user_id = ${T} where user_id = ${G}`,
      ],
    },
    { table: "ai_usage", statements: [sql`update ai_usage set user_id = ${T} where user_id = ${G}`] },
    {
      /* Konuşma: en iyi doğru, konuşma biri bitirdiyse bitti, deneme toplamı; tekrar planı en son çalışılandan. */
      table: "user_conversations",
      statements: [
        sql`update user_conversations t set
              correct = greatest(t.correct, g.correct),
              total = greatest(t.total, g.total),
              chat_done = t.chat_done or g.chat_done,
              attempts = t.attempts + g.attempts,
              rule_id = case when g.last_at > t.last_at then g.rule_id else t.rule_id end,
              due_at = case when g.last_at > t.last_at then g.due_at else t.due_at end,
              interval_days = case when g.last_at > t.last_at then g.interval_days else t.interval_days end,
              last_at = greatest(t.last_at, g.last_at)
            from user_conversations g where t.user_id = ${T} and g.user_id = ${G} and g.conversation_id = t.conversation_id`,
        sql`delete from user_conversations g using user_conversations t where g.user_id = ${G} and t.user_id = ${T} and t.conversation_id = g.conversation_id`,
        sql`update user_conversations set user_id = ${T} where user_id = ${G}`,
      ],
    },
    { table: "chat_logs", statements: [sql`update chat_logs set user_id = ${T} where user_id = ${G}`] },
    { table: "assessments", statements: [sql`update assessments set user_id = ${T} where user_id = ${G}`] },
    { table: "placements", statements: [sql`update placements set user_id = ${T} where user_id = ${G}`] },
    {
      /* Haftalık ve seviye sınavı haftada bir kayıt: İLK yazılan kalıyor (uç da öyle sayıyor). */
      table: "exams",
      statements: [
        sql`delete from exams t using exams g where t.user_id = ${T} and g.user_id = ${G} and g.kind = t.kind and g.week = t.week and g.created_at < t.created_at`,
        sql`delete from exams g using exams t where g.user_id = ${G} and t.user_id = ${T} and t.kind = g.kind and t.week = g.week`,
        sql`update exams set user_id = ${T} where user_id = ${G}`,
      ],
    },
    { table: "content_reports", statements: [sql`update content_reports set user_id = ${T} where user_id = ${G}`] },
    { table: "mock_exam_attempts", statements: [sql`update mock_exam_attempts set user_id = ${T} where user_id = ${G}`] },
    {
      /* Haftalık quiz: (kullanıcı, hafta) benzersiz. Hesabın o haftada denemesi
         yoksa misafirinki taşınıyor; varsa hesabınki kalıyor. */
      table: "weekly_quiz_attempts",
      statements: [
        sql`update weekly_quiz_attempts g set user_id = ${T}
             where g.user_id = ${G} and not exists (select 1 from weekly_quiz_attempts t where t.user_id = ${T} and t.week = g.week)`,
        sql`delete from weekly_quiz_attempts where user_id = ${G}`,
      ],
    },
    {
      /* Kota sayaçları TOPLANIYOR: birleşme bugünün tavanını sıfırlamanın yolu olmasın. */
      table: "usage_counters",
      statements: [
        sql`update usage_counters t set count = t.count + g.count, updated_at = greatest(t.updated_at, g.updated_at)
            from usage_counters g where t.user_id = ${T} and g.user_id = ${G} and g.key = t.key and g.period = t.period`,
        sql`delete from usage_counters g using usage_counters t where g.user_id = ${G} and t.user_id = ${T} and t.key = g.key and t.period = g.period`,
        sql`update usage_counters set user_id = ${T} where user_id = ${G}`,
      ],
    },
    /* Hız sınırı pencereleri kısa ömürlü; misafirinkiler taşınmıyor. */
    { table: "rate_limits", statements: [sql`delete from rate_limits where key like ${`%:${G}`}`] },

    /* ── Misafire KAPALI alanlar: satır beklenmiyor, gelirse sahipsiz kalmasın ── */
    { table: "league_members", statements: [sql`delete from league_members where user_id = ${G}`] },
    { table: "device_tokens", statements: [sql`update device_tokens set user_id = ${T} where user_id = ${G}`] },
    { table: "push_subscriptions", statements: [sql`update push_subscriptions set user_id = ${T} where user_id = ${G}`] },
    {
      /* Uygulama sürümü: hesabın o platformda kaydı yoksa misafirinki taşınıyor
         (aynı telefon), varsa hesabınki daha yeni sayılıyor. */
      table: "user_clients",
      statements: [
        sql`update user_clients g set user_id = ${T}
             where g.user_id = ${G} and not exists (select 1 from user_clients t where t.user_id = ${T} and t.platform = g.platform)`,
        sql`delete from user_clients where user_id = ${G}`,
      ],
    },
    /* Askıya alma hesaba verilen bir karar; misafirde beklenmiyor, varsa taşınmaz. */
    { table: "account_suspensions", statements: [sql`delete from account_suspensions where user_id = ${G}`] },
    {
      /* Rıza hesabın kararı: hesapta o amaç için karar varsa misafirinki taşınmıyor. */
      table: "user_consents",
      statements: [
        sql`update user_consents g set user_id = ${T}
             where g.user_id = ${G} and not exists (select 1 from user_consents t where t.user_id = ${T} and t.purpose = g.purpose)`,
        sql`delete from user_consents where user_id = ${G}`,
      ],
    },
    {
      table: "entitlements",
      statements: [
        sql`update entitlements set user_id = ${T} where user_id = ${G} and not exists (select 1 from entitlements where user_id = ${T})`,
        sql`delete from entitlements where user_id = ${G}`,
      ],
    },
    {
      table: "promo_redemptions",
      statements: [
        sql`delete from promo_redemptions g using promo_redemptions t where g.user_id = ${G} and t.user_id = ${T} and t.code_id = g.code_id`,
        sql`update promo_redemptions set user_id = ${T} where user_id = ${G}`,
      ],
    },
    /* Grup kodu talebi: misafir talep EDEMİYOR (uç ve `claimStoreTrial` hesap
       istiyor), yani bugün satır olmaz. Kural yine de promo kullanımıyla aynı:
       hesapta aynı kodun talebi varsa misafirinki düşer, yoksa taşınır. */
    {
      table: "store_trial_claims",
      statements: [
        sql`delete from store_trial_claims g using store_trial_claims t where g.user_id = ${G} and t.user_id = ${T} and t.code_id = g.code_id`,
        sql`update store_trial_claims set user_id = ${T} where user_id = ${G}`,
      ],
    },
    /* Misafir açılışının cihaz doğrulaması: kimliğin nasıl doğduğunun kaydı,
       hesaba taşınıyor (aynı kişi, aynı cihaz). */
    { table: "guest_attestations", statements: [sql`update guest_attestations set user_id = ${T} where user_id = ${G}`] },
    { table: "premium_grants", statements: [sql`update premium_grants set user_id = ${T} where user_id = ${G}`] },
    /* Mağaza olay defteri: misafir satın alamıyor ama RevenueCat misafir kimliğiyle
       olay yollayabilir; olay hesaba taşınıyor. */
    { table: "store_events", statements: [sql`update store_events set user_id = ${T} where user_id = ${G}`] },
    {
      table: "referrals",
      statements: [
        sql`update referrals set invitee_user_id = ${T}
             where invitee_user_id = ${G} and not exists (select 1 from referrals where invitee_user_id = ${T})`,
        sql`delete from referrals where invitee_user_id = ${G}`,
        sql`update referrals set inviter_user_id = ${T} where inviter_user_id = ${G}`,
      ],
    },
    { table: "friendships", statements: [sql`delete from friendships where requester_id = ${G} or addressee_id = ${G}`] },
    { table: "user_blocks", statements: [sql`delete from user_blocks where blocker_id = ${G} or blocked_id = ${G}`] },
    { table: "user_reports", statements: [sql`delete from user_reports where reporter_id = ${G} or reported_id = ${G}`] },
    { table: "event_reactions", statements: [sql`delete from event_reactions where from_user_id = ${G}`] },
    { table: "activity_events", statements: [sql`delete from activity_events where user_id = ${G}`] },
    { table: "nudges", statements: [sql`delete from nudges where from_user_id = ${G} or to_user_id = ${G}`] },
    { table: "friend_quests", statements: [sql`delete from friend_quests where user_a_id = ${G} or user_b_id = ${G}`] },
    { table: "social_notifications", statements: [sql`delete from social_notifications where user_id = ${G} or actor_id = ${G}`] },
  ];
}

type ProfileRow = {
  user_id: string;
  course_chosen_at: string | null;
  current_streak: number;
  longest_streak: number;
  last_active_day: string | null;
  total_xp: number;
  challenge_best: number;
  streak_repair_at: string | null;
};

/**
 * Kimliğin öğrenme ilerlemesi var mı — birleştirmenin cümlesini ("taşındı" /
 * "birleştirildi") ve istemcinin "hesabına eklensin mi?" sorusunu belirliyor.
 */
export async function hasProgress(exec: { execute: typeof db.execute }, userId: string): Promise<boolean> {
  const row = rowsOf(await exec.execute(sql`
    select (
      exists (select 1 from user_words where user_id = ${userId})
      or exists (select 1 from daily_stats where user_id = ${userId})
      or exists (select 1 from user_conversations where user_id = ${userId})
      or exists (select 1 from user_skills where user_id = ${userId})
      or exists (select 1 from mock_exam_attempts where user_id = ${userId})
      or exists (select 1 from placements where user_id = ${userId})
    ) as had
  `))[0] as { had?: boolean } | undefined;
  return Boolean(row?.had);
}

/**
 * Misafiri hesaba birleştirir ve misafiri siler. Hedef gerçek bir hesap
 * olmalı; misafir de hâlâ misafir.
 */
export async function mergeGuestInto(guestId: string, targetId: string): Promise<MergeOutcome> {
  if (guestId === targetId) return { merged: false, reason: "same_user" };
  const G = guestId;
  const T = targetId;

  return db.transaction(async (tx) => {
    for (const id of [G, T].sort()) {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${`guest-merge:${id}`}))`);
    }
    const users = rowsOf(await tx.execute(sql`select id, "isAnonymous" as guest from "user" where id in (${G}, ${T}) for update`)) as { id: string; guest: boolean }[];
    const guest = users.find((u) => u.id === G);
    const target = users.find((u) => u.id === T);
    if (!guest || !guest.guest) return { merged: false, reason: "guest_not_found" } as const;
    if (!target || target.guest) return { merged: false, reason: "target_not_account" } as const;

    const had = { had: await hasProgress(tx, T) };

    for (const step of mergeSteps(G, T)) {
      for (const statement of step.statements) await tx.execute(statement);
    }

    /*
      PROFİL. Kimlik ve ayarlar hesabın; misafirin öğrenme ayarları (kurs,
      seviye, anadil, hedef) ancak hesap kurs SEÇMEMİŞSE geçiyor — yeni açılan
      hesabın profili boş, misafirin seçimleri gerçek seçim. Toplam XP
      toplanıyor, rekorlar ve seri birleşiyor (bkz. mergeStreaks).
    */
    const profiles = rowsOf(await tx.execute(sql`
      select user_id, course_chosen_at, current_streak, longest_streak, last_active_day::text as last_active_day,
             total_xp, challenge_best, streak_repair_at::text as streak_repair_at
        from profiles where user_id in (${G}, ${T}) for update
    `)) as ProfileRow[];
    const gp = profiles.find((p) => p.user_id === G);
    const tp = profiles.find((p) => p.user_id === T);
    if (gp && !tp) {
      await tx.execute(sql`update profiles set user_id = ${T} where user_id = ${G}`);
    } else if (gp && tp) {
      const streak = mergeStreaks(
        { lastActiveDay: tp.last_active_day, currentStreak: tp.current_streak, longestStreak: tp.longest_streak },
        { lastActiveDay: gp.last_active_day, currentStreak: gp.current_streak, longestStreak: gp.longest_streak },
      );
      const repairAt = [tp.streak_repair_at, gp.streak_repair_at].filter(Boolean).sort().at(-1) ?? null;
      const takeLearning = !tp.course_chosen_at && Boolean(gp.course_chosen_at);
      await tx.execute(sql`
        update profiles t set
          total_xp = t.total_xp + g.total_xp,
          challenge_best = greatest(t.challenge_best, g.challenge_best),
          current_streak = ${streak.currentStreak},
          longest_streak = ${streak.longestStreak},
          last_active_day = ${streak.lastActiveDay}::date,
          streak_repair_at = ${repairAt}::date,
          avatar = coalesce(t.avatar, g.avatar),
          course = case when ${takeLearning}::boolean then g.course else t.course end,
          level = case when ${takeLearning}::boolean then g.level else t.level end,
          native_lang = case when ${takeLearning}::boolean then coalesce(g.native_lang, t.native_lang) else t.native_lang end,
          goal = case when ${takeLearning}::boolean then coalesce(g.goal, t.goal) else t.goal end,
          daily_goal = case when ${takeLearning}::boolean then g.daily_goal else t.daily_goal end,
          new_per_day = case when ${takeLearning}::boolean then g.new_per_day else t.new_per_day end,
          voice = case when ${takeLearning}::boolean then coalesce(g.voice, t.voice) else t.voice end,
          course_chosen_at = case when ${takeLearning}::boolean then g.course_chosen_at else t.course_chosen_at end
        from profiles g
        where t.user_id = ${T} and g.user_id = ${G}
      `);
      await tx.execute(sql`delete from profiles where user_id = ${G}`);
    }

    // Misafirin kimliği: oturumları ve (varsa) hesap satırları FK ile gidiyor.
    await tx.execute(sql`delete from "user" where id = ${G} and "isAnonymous"`);
    return { merged: true, targetHadProgress: Boolean(had?.had) } as const;
  });
}

/** Misafir silme — Profil'deki "Misafir verilerini sil". Temizlik hesap silmeyle aynı. */
export async function deleteGuest(guestId: string): Promise<boolean> {
  const rows = rowsOf(await db.execute(sql`select 1 as ok from "user" where id = ${guestId} and "isAnonymous"`));
  if (!rows.length) return false;
  await purgeUserData(guestId);
  await db.execute(sql`delete from "user" where id = ${guestId} and "isAnonymous"`);
  return true;
}

/**
 * Kullanılmayan misafirlerin temizliği — haftalık cron (bkz. api/cron/summary).
 *
 * Misafir oturumu 30 gün kullanılmayınca düşüyor (oturum süresi, bkz.
 * lib/auth/session-config) ve misafirin giriş yolu yok: çerezi kaybolan
 * misafirin verisine artık kimse ulaşamaz. Ulaşılamayan kişisel veriyi tutmak
 * veri en aza indirme ilkesine aykırı; gizlilik politikası da bunu söylüyor.
 *
 * Etkin oturumu olmayan ve en az bir günlük misafir siliniyor. Bir günlük
 * pay, oturumu henüz yazılmakta olan yeni bir misafiri yarışta silmemek için.
 * Hesap oluşturulmadan önce süresi dolmuş bir jetonla birleştirme hâlâ
 * mümkün (bkz. verifyGuestToken), ta ki bu temizlik misafiri silene dek.
 */
export async function purgeStaleGuests(limit = 500): Promise<number> {
  const stale = rowsOf(await db.execute(sql`
    select u.id, u."createdAt" created_at from "user" u
     where u."isAnonymous"
       and u."createdAt" < now() - interval '1 day'
       and not exists (select 1 from session s where s."userId" = u.id and s."expiresAt" > now())
     order by u."createdAt"
     limit ${limit}
  `)) as { id: string; created_at: string }[];
  let removed = 0;
  for (const { id, created_at } of stale) {
    try {
      if (await deleteGuest(id)) {
        removed++;
        await recordDeletion({ source: "guest", reason: "expired", wasGuest: true, createdAt: created_at });
      }
    } catch (err) {
      console.error("[guest:purge]", err);
    }
  }
  return removed;
}

/**
 * Doğrulanmamış misafir-upgrade e-posta rezervasyonlarını serbest bırakır —
 * haftalık cron (bkz. api/cron/summary). Güvenlik denetimi F2.
 *
 * `/guest/upgrade` misafirin satırına gerçek bir e-posta yazıp (emailVerified
 * false) `user.email`in benzersiz slotunu HEMEN tutuyor; misafir doğrulama
 * bağını hiç tıklamasa bile o adres rezerve kalıyor. Sahibi olmadığı bir adresi
 * yazan biri gerçek sahibin kaydolmasını engelleyebilir (adres işgali). Zaten
 * KAYITLI bir adresi çalamıyor (unique + findUserByEmail engelliyor), yalnız
 * henüz kayıtsız bir adresi rezerve edebiliyor — normal kayıt akışının da
 * paylaştığı bir özellik, ama misafir oluşturma sürtünmesiz olduğu için burada
 * daha ucuz; misafir resume ile satırı canlı tutarak rezervasyonu süresiz de
 * uzatabiliyor (temizlik canlı oturumlu misafiri silmiyor).
 *
 * Çözüm: 7 gün doğrulanmadan duran rezervasyonu geri al — e-postayı benzersiz
 * yer tutucu misafir adresine çevir, terk edilen parola hesabını sil. İlerleme
 * KORUNUYOR; misafir istemcisi hâlâ resume edebilir ve dilerse yeniden upgrade
 * dener. Satır tx içinde `for update` ile kilitlenip yeniden denetleniyor:
 * aradaki bir doğrulama ya da claim olduysa hiç dokunulmuyor. 7 gün eşiği
 * doğrulamayı geciktiren meşru kullanıcıyı kırpmayacak kadar geniş; kırparsa
 * yalnız yeniden upgrade gerekir, veri kaybı yok.
 */
export async function releaseStaleGuestEmailReservations(limit = 500): Promise<number> {
  const stale = rowsOf(await db.execute(sql`
    select u.id from "user" u
     where u."isAnonymous"
       and u."emailVerified" = false
       and u.email not like ${`%@${GUEST_EMAIL_DOMAIN}`}
       and u."updatedAt" < now() - interval '7 days'
     order by u."updatedAt"
     limit ${limit}
  `)) as { id: string }[];
  let released = 0;
  for (const { id } of stale) {
    try {
      const done = await db.transaction(async (tx) => {
        /* Satırı kilitle ve koşulu tx içinde yeniden doğrula: select'ten sonra
           misafir doğrulamış ya da hesabına claim etmiş olabilir — o durumda
           dokunmuyoruz. */
        const still = rowsOf(await tx.execute(sql`
          select 1 as ok from "user"
           where id = ${id} and "isAnonymous" and "emailVerified" = false
             and email not like ${`%@${GUEST_EMAIL_DOMAIN}`}
           for update
        `));
        if (!still.length) return false;
        /* Parola hesabı yalnız bu terk edilen upgrade için açılmıştı; misafir
           yeniden tam anonim duruma dönüyor. */
        await tx.execute(sql`delete from account where "userId" = ${id} and "providerId" = 'credential'`);
        /* E-postayı benzersiz yer tutucuya çevir: id birincil anahtar, çakışmaz. */
        await tx.execute(sql`
          update "user"
             set email = ${`${id}@${GUEST_EMAIL_DOMAIN}`}, name = 'guest', "updatedAt" = now()
           where id = ${id}
        `);
        return true;
      });
      if (done) released++;
    } catch (err) {
      console.error("[guest:release-email]", err);
    }
  }
  return released;
}

function rowsOf(res: unknown): unknown[] {
  return (Array.isArray(res) ? res : (res as { rows?: unknown[] }).rows) ?? [];
}
