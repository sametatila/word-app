import "server-only";
import { randomInt } from "node:crypto";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles, referrals } from "@/lib/db/schema";
import type { ReferralStats } from "./referral-types";
import { isGuestUser } from "@/lib/auth/guest-user";

/**
 * Davet zinciri — kim kimi getirdi.
 *
 * ÖDÜL ARTIK PREMIUM SÜRESİ DEĞİL (karar: 2026-09-17). Önceki kurgu davet
 * edilenin ilk ödemesinde davetçiye 7 gün yazıyordu ve iki ayrı yerden
 * kırılıyordu:
 *
 *  1. TESLİM EDİLEMİYORDU. Süre bakiyeye yazılıyor, davetçi o sırada abone ise
 *     bakiye bekliyordu — yani ödül ancak kullanıcı ABONELİĞİNİ BIRAKIRSA
 *     nakde dönüyordu. Ödeyen biri için hiçbir zaman görünmeyen bir vaat.
 *     Mağaza tarafında gerçekten teslim etmenin yolu var (Apple "extend
 *     renewal date", Google "defer") ama Apple müşteri başına YILDA 2 çağrıyla
 *     sınırlı ve amaç olarak iyi niyet/kesinti telafisi diye tarif edilmiş.
 *  2. TEŞVİK GÜCÜ YOKTU. Davetçinin 7 gün kazanması için getirdiği kişinin hem
 *     kurması hem ÖDEMESİ gerekiyordu; beklenen değer birkaç saatlik premium
 *     ve ~1 ay gecikmeli. Kimsenin arkadaşını ikna etmesini sağlamaz.
 *
 * YERİNE GEÇEN: davet bir TAHSİSAT değil bir BAĞLANTI. Bağ kurulunca davet
 * edilenden davetçiye arkadaşlık isteği gidiyor; kabul edilince ortak seri
 * (`lib/social/streaks`) aynı gün başlıyor. Karşılığı ilk günden geliyor,
 * mağaza yüzeyi sıfır, ve en önemlisi FARM EDİLEMİYOR: ödülün değeri karşı
 * tarafın gerçek ve aktif olmasından geliyor.
 *
 * `grantBonus` kaldırılmadı — promo kodu, elle telafi ve destek jesti hâlâ
 * onu kullanıyor. Kaldırılan şey davetin OTOMATİK olarak ona bağlanmasıydı:
 * herkese vaat edilen bir mekanizmada teslim edilemeyen bir söz taşınamaz.
 */

// Karışan karakter yok; kod ağızdan söyleniyor ve elle yazılıyor.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomCode(length = 6): string {
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

export const normalizeReferral = (s: string): string => s.toUpperCase().replace(/[^A-Z0-9]/g, "");

/**
 * Kullanıcının davet kodu; yoksa üretir.
 *
 * Kod bir kez üretilip profilde SABİT kalıyor: dağıtılmış bir bağlantının bir
 * gün ölmesi, kullanıcının paylaştığı her yerin ölmesi demek.
 */
export async function ensureReferralCode(userId: string): Promise<string> {
  const [p] = await db.select({ code: profiles.referralCode }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
  if (p?.code) return p.code;

  for (let attempt = 0; attempt < 6; attempt++) {
    const code = randomCode();
    try {
      /**
       * `.returning()` ŞART. Öncesi yalnız `update` çağırıp kodu döndürüyordu ve
       * güncelleme HİÇBİR satıra dokunmamış olabilirdi: profil satırı henüz
       * yoksa (yeni hesap, `ensureProfile` çağrılmadan premium durumu soruldu)
       * update sessizce 0 satır günceller, hata da vermez. Kullanıcı o kodu
       * paylaşır, kod hiçbir yerde kayıtlı olmadığı için bağlantı kimseyi
       * kimseye bağlamaz ve bunu kimse fark etmez — ödül de hiç düşmez.
       *
       * Satır dönmediyse kod üretilemedi demektir; çağıran (`referralStats`)
       * bunu hatayla öğrenir ve arayüz davet kutusunu hiç çizmez.
       */
      const [row] = await db
        .update(profiles)
        .set({ referralCode: code })
        .where(eq(profiles.userId, userId))
        .returning({ code: profiles.referralCode });
      if (row?.code) return row.code;
      // Profil satırı yok: yeni kod denemenin faydası olmaz, döngüden çık.
      break;
    } catch {
      /* benzersiz indeks çarptı — yeni kod dene */
    }
  }
  throw new Error("referral_code_failed");
}

export async function userIdByReferralCode(code: string): Promise<string | null> {
  const c = normalizeReferral(code);
  if (!c) return null;
  const [row] = await db.select({ userId: profiles.userId }).from(profiles).where(eq(profiles.referralCode, c)).limit(1);
  return row?.userId ?? null;
}

export type AttachResult = "ok" | "self" | "already" | "unknown_code";

/**
 * Davet edenin KARTI — davet karşılama sayfası için (`app/r/[code]`).
 *
 * YALNIZ AD VE AVATAR. Sayfa girişsiz bir ziyaretçiye çiziliyor, yani burada
 * dönen her alan herkese açık demek. Kullanıcının kendi paylaştığı bir
 * bağlantıda adını göstermek beklenen şey; istatistik, kullanıcı adı ya da
 * etkinlik göstermek değil. Sosyal katmanın görünürlük kuralları
 * (`lib/social/profile`) bu yüzden burada geçmiyor — o kurallar "başkasının
 * profiline bakmak" için, bu ise davet edenin kendi davetiyesi.
 *
 * Misafirin daveti yok: `attachReferral` da aynı kuralı uyguluyor, sayfa da
 * boş bir davetiye çizmesin.
 */
export async function inviterCard(code: string): Promise<{ name: string | null; avatar: string | null; userId: string } | null> {
  const c = normalizeReferral(code);
  if (!c) return null;
  const [row] = await db
    .select({ userId: profiles.userId, name: profiles.displayName, avatar: profiles.avatar })
    .from(profiles)
    .where(eq(profiles.referralCode, c))
    .limit(1);
  if (!row || (await isGuestUser(row.userId))) return null;
  return row;
}

/**
 * Hesap davet penceresinin içinde mi açılmış (bkz. `INVITE_WINDOW_DAYS`).
 *
 * KULLANICI SATIRI YOKSA PENCERE UYGULANMIYOR — `lib/auth/guest-user`
 * `isGuestUser` ile aynı kural ve aynı gerekçe. Better-auth oturum açan her
 * hesap için o satırı yazıyor, yani üretimde satırsız bir çağıran olamaz
 * (uçlar zaten oturum istiyor). Satırsız kimlik ancak test verisi ya da
 * silinmiş bir hesap olur; onları "eski hesap" sayıp reddetmek, kuralın
 * korumadığı bir yerde davranış değiştirmek olurdu.
 *
 * Sorgu patlarsa kapı KAPALI tarafa düşüyor: okuma hatası izin gerekçesi değil.
 */
async function isNewAccount(userId: string): Promise<boolean> {
  try {
    const res = await db.execute(
      sql`select "createdAt" > now() - make_interval(days => ${INVITE_WINDOW_DAYS}) as fresh from "user" where id = ${userId} limit 1`,
    );
    const rows = (Array.isArray(res) ? res : (res as { rows?: unknown[] }).rows) ?? [];
    const row = rows[0] as { fresh?: boolean } | undefined;
    return row === undefined || row.fresh === true;
  } catch {
    return false;
  }
}

/**
 * Davet penceresi — hesap bu kadar gün içinde açılmışsa "davet edilmiş" sayılır.
 *
 * Eskiden ölçü "henüz ödeme yapmamış" idi ve gerekçesi ödüldü: iki eski abone
 * birbirinin kodunu girip ödül üretmesin. Ödül kalkınca o gerekçe de kalktı,
 * ama ölçünün kendisi hâlâ gerekli — bu kez BAŞKA bir sebeple.
 *
 * Davet "yeni birini getirmenin" karşılığı. Ölçü ödemeye bağlı kalsaydı,
 * yıllardır uygulamayı kullanan ama hiç ödememiş iki kişi birbirini davet
 * etmiş sayılırdı; davete bağlanacak rozet de (bkz. `lib/achievements`) böyle
 * sıfır emekle kazanılırdı. Hesap yaşına bakmak niyeti doğrudan söylüyor.
 *
 * Mevcut kullanıcılar birbirine bağlansın diye ayrı bir yol zaten var: arkadaş
 * arama ve öneriler (`lib/social/friends`). Davet bağlantısı onun yerine
 * geçmiyor.
 */
const INVITE_WINDOW_DAYS = 7;

/**
 * Yeni kullanıcıyı bir davetçiye bağlar. Kayıt/ilk açılışta çağrılır.
 *
 * YALNIZ BAĞ KURULUYOR, başka hiçbir şey olmuyor. Arkadaşlık isteğini çağıran
 * gönderiyor (`app/r/[code]`, mobil `App.tsx`): bu dosya sosyal katmanı içe
 * aktarsaydı iki katman birbirine düğümlenirdi ve bağın kurulması isteğin
 * gitmesine bağımlı hâle gelirdi — biri patlayınca öteki de kaybolurdu.
 */
export async function attachReferral(inviteeUserId: string, code: string): Promise<AttachResult> {
  const inviter = await userIdByReferralCode(code);
  // Misafirin daveti yok; eskiden üretilmiş bir kod da davetçi yapmıyor.
  if (!inviter || (await isGuestUser(inviter))) return "unknown_code";
  if (inviter === inviteeUserId) return "self";

  /* Hesap yaşı better-auth'un `user` tablosundan ve HAM SQL ile: o tablo
     Drizzle şemamızda tanımlı değil, kütüphaneye ait (aynı yöntem
     `lib/auth/guest-user` içinde de kullanılıyor). Satır okunamazsa davet
     KABUL EDİLMİYOR: bilinmeyen yaşı "yeni" saymak pencereyi anlamsız kılardı. */
  if (!(await isNewAccount(inviteeUserId))) return "already";

  try {
    await db.insert(referrals).values({
      inviterUserId: inviter,
      inviteeUserId,
      code: normalizeReferral(code),
    });
    return "ok";
  } catch {
    // `referrals_invitee_idx` benzersiz: bir kişi yalnız bir kez davet edilir.
    // İlk davetçi kazanır; sonradan gelen kod bağı değiştiremez.
    return "already";
  }
}

export type { ReferralStats } from "./referral-types";

export async function referralStats(userId: string): Promise<ReferralStats> {
  const code = await ensureReferralCode(userId);
  const [row] = await db
    .select({ invited: sql<number>`count(*)::int` })
    .from(referrals)
    .where(eq(referrals.inviterUserId, userId));
  return { code, invited: row?.invited ?? 0 };
}

/** Panel için: en çok davet üreten kullanıcılar. */
export async function topReferrers(limit = 20) {
  return db
    .select({
      userId: referrals.inviterUserId,
      invited: sql<number>`count(*)::int`,
    })
    .from(referrals)
    .groupBy(referrals.inviterUserId)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);
}
