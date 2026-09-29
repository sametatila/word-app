import "server-only";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { entitlements, profiles, user } from "@/lib/db/schema";
import { sendToUser } from "@/lib/push";
import { sendEmail, trialEndingEmail } from "@/lib/email";
import { track } from "@/lib/events";
import { DEFAULT_NATIVE, isNativeLang, localeOf, translate, type NativeLang } from "@/lib/i18n/dict";
import { isGuestEmail } from "@/lib/auth/guest-email";

/**
 * DENEME BİTİŞ HATIRLATMASI — paywall'ın sözü: "bitmeden 2 gün önce
 * bildirim ve e-postayla hatırlatırız".
 *
 * Deneme sonu, abonelik uygulamalarında şikâyetin ve iade talebinin en büyük
 * kaynağı: kullanıcı denemeyi başlattığını unutuyor, ilk ücreti görünce
 * aldatıldığını düşünüyor. Hatırlatma dönüşümü biraz düşürse de iadeyi,
 * mağaza yorumunu ve "iptal edemedim" desteğini düşürüyor.
 *
 * ZAMAN: günlük turda (`/api/cron/reminders`, 18:00 UTC) bitişine 12 ile 60
 * saat kalan denemeler seçiliyor. Tur günde bir koştuğu için her deneme
 * bitişine 36–60 saat kala, yani yaklaşık 2 gün önce yakalanıyor; 12 saatlik
 * alt sınır yalnız "çok geç kaldık" durumunu (tur bir gün düştüyse) kurtarıyor.
 *
 * BİR DENEMEYE BİR KEZ: satır ÖNCE işaretleniyor (`trial_reminder_for` =
 * o anki bitiş), sonra gönderiliyor. İki tur aynı anda koşsa bile ikinci tur
 * aynı satırı alamaz. Bitiş değişirse (yeni bir deneme) işaret eşleşmez ve
 * yeniden hatırlatılır.
 *
 * HİZMET İLETİSİ: günlük hatırlatma bütçesini (`last_reminder_day`) ve
 * hatırlatma anahtarlarını kullanmıyor. Kullanıcının parasıyla ilgili bir
 * bildirim; "günde bir bildirim" kuralı motivasyon bildirimleri için.
 * Gizlilik politikası §8a (iletiler) ve §3 (e-posta satırı) bunu abonelik
 * bildirimi olarak sayıyor.
 */

const APPLE_SUBSCRIPTIONS = "https://apps.apple.com/account/subscriptions";
const PLAY_PACKAGE = "com.lernomi.learn";

function manageUrlFor(platform: string | null, product: string | null): string {
  if (platform === "ios") return APPLE_SUBSCRIPTIONS;
  if (platform === "android") {
    const q = product ? `?sku=${encodeURIComponent(product)}&package=${PLAY_PACKAGE}` : "";
    return `https://play.google.com/store/account/subscriptions${q}`;
  }
  return "https://www.lernomi.app/premium";
}

function planOf(product: string | null): "yearly" | "monthly" | null {
  if (!product) return null;
  if (/year|annual/i.test(product)) return "yearly";
  if (/month/i.test(product)) return "monthly";
  return null;
}

export async function runTrialReminders(): Promise<{ targets: number; push: number; mail: number }> {
  /* Önce işaretle, sonra gönder (bkz. dosya başı). `returning` işaretlenen
     satırları ve hatırlatılan bitişi veriyor. */
  const claimed = await db
    .update(entitlements)
    .set({ trialReminderFor: sql`${entitlements.storeUntil}` })
    .where(
      and(
        eq(entitlements.storeState, "trial"),
        sql`${entitlements.storeUntil} > now() + interval '12 hours'`,
        sql`${entitlements.storeUntil} <= now() + interval '60 hours'`,
        sql`${entitlements.trialReminderFor} is distinct from ${entitlements.storeUntil}`,
      ),
    )
    .returning({
      userId: entitlements.userId,
      until: entitlements.storeUntil,
      platform: entitlements.storePlatform,
      product: entitlements.storeProduct,
    });
  if (!claimed.length) return { targets: 0, push: 0, mail: 0 };

  const ids = claimed.map((c) => c.userId);
  const [people, prefs] = await Promise.all([
    db.select({ id: user.id, email: user.email, verified: user.emailVerified }).from(user).where(inArray(user.id, ids)),
    db.select({ userId: profiles.userId, lang: profiles.nativeLang, tz: profiles.timezone }).from(profiles).where(inArray(profiles.userId, ids)),
  ]);
  const personOf = new Map(people.map((p) => [p.id, p]));
  const prefOf = new Map(prefs.map((p) => [p.userId, p]));
  const today = new Date().toISOString().slice(0, 10);

  let push = 0;
  let mail = 0;
  for (const c of claimed) {
    if (!c.until) continue;
    const pref = prefOf.get(c.userId);
    const lang: NativeLang = isNativeLang(pref?.lang ?? "") ? (pref!.lang as NativeLang) : DEFAULT_NATIVE;
    const date = formatDay(c.until, lang, pref?.tz ?? "Europe/Istanbul");
    const plan = planOf(c.product);
    const platform = c.platform === "ios" || c.platform === "android" ? c.platform : null;

    try {
      const n = await sendToUser(c.userId, {
        title: translate(lang, "trial.push_title"),
        body: translate(lang, "trial.push_body", { date }),
        url: "/premium",
        tag: "trial-end",
        lang,
      });
      push += n;
      if (n > 0) await track(c.userId, "push_deliver", today, n, "trial_end");
    } catch (err) {
      console.error("[trial-reminder] push", err);
    }

    const person = personOf.get(c.userId);
    /* Doğrulanmamış adrese de gidiyor: mağaza aboneliği olan hesap gerçek bir
       hesap ve bu posta kullanıcının parasıyla ilgili. Misafirin yer tutucu
       adresine gitmiyor (satın alma zaten hesap istiyor, bu yalnız emniyet). */
    if (person?.email && !isGuestEmail(person.email)) {
      const m = trialEndingEmail({ lang, date, plan, platform, manageUrl: manageUrlFor(c.platform, c.product) });
      await sendEmail(person.email, m.subject, m.html, m.text, { userId: c.userId, kind: "trial_end" });
      mail += 1;
    }
  }
  return { targets: claimed.length, push, mail };
}

/** Bitiş günü kullanıcının saat diliminde ve arayüz dilinde ("3 Kasım"). */
function formatDay(d: Date, lang: NativeLang, tz: string): string {
  try {
    return d.toLocaleDateString(localeOf(lang), { day: "numeric", month: "long", timeZone: tz });
  } catch {
    return d.toLocaleDateString(localeOf(lang), { day: "numeric", month: "long" });
  }
}
