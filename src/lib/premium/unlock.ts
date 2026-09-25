/**
 * KİLİT AÇMA DURUMU — ücretsiz hakların NASIL kazanıldığının tek hesabı.
 *
 * Kural `docs/premium/README.md` §2'de (2026-09-25): her kotalı yüzeyde bir
 * TABAN hak var; üstüne gelen her dilim ancak İKİ koşul birlikte tutunca açılıyor —
 * açık hakların hepsi BİTİRİLMİŞ olmalı ve seri o dilimin eşiğine varmış olmalı:
 *
 *     izin verilen = taban + bonus × k
 *     k = min(seri kademesi, tam bitirilmiş dilim sayısı[, kademe tavanı])
 *     seri kademesi = floor(en uzun seri / adım)
 *
 * Yani ikinci dilim, ilk dilimdeki hakların hepsi bitirilince VE seri yedi güne
 * varınca açılıyor; üçüncüsü ikinci dilim de bitirilince ve seri on dört güne
 * varınca. Seri tek başına hak açmıyor (açık hakları kullanmayan biri için
 * biriktirilen hak bir vaat olurdu, çalışmanın karşılığı değil); bitirmek de tek
 * başına açmıyor (yoksa taban bir günde tükenip ücretsiz katman premium'un yerine
 * geçerdi).
 *
 * NEDEN SAF VE TEK DOSYA. Aynı hesap üç yerde lazım: kapıyı tutan sunucu
 * (`access.ts`), durumu anlatan uç (`/api/premium/status`) ve webin sunucu
 * bileşenleri. Mobil hesabı YAPMIYOR, sunucunun döndürdüğünü çiziyor — iki
 * platform aynı cümleyi aynı sayıdan kuruyor. Veritabanına dokunmadığı için
 * `scripts/test-premium.ts` onu olduğu gibi sınıyor.
 *
 * ÖLÇÜ EN UZUN SERİ (`profiles.longest_streak`), güncel seri değil: kazanılan
 * hak geri alınmıyor. Bir gün kaçıran kullanıcı açılmış hakkını kaybetseydi kilit
 * ödüllendirmek yerine cezalandırırdı. Güncel seri yalnız "bir sonraki eşiğe kaç
 * gün kaldı" sorusunda kullanılıyor, çünkü en uzun seri ancak güncel seri onu
 * geçince büyüyor.
 */

/** Bir kotalı yüzeyin kuralı — değerler `premiumConfig()`ten. */
export type TierRule = {
  /** Taban hak (seviye başına ya da gün başına). */
  base: number;
  /** Her açılışta gelen ek hak. 0 = kademe kapalı, yalnız taban. */
  bonus: number;
  /** Seri adımı (gün). */
  step: number;
  /** Kademe tavanı. 0 = sınırsız (karar verilmedi; panelden ayarlanabilir). */
  maxTiers: number;
};

/** Bir koşulun ilerlemesi — arayüz "3/7" diye çiziyor. */
export type Progress = { done: number; needed: number };

/** Bir sonraki açılışın koşulları. */
export type UnlockNext = {
  /** Açılınca gelecek hak sayısı. */
  gain: number;
  /** Açık hakların bitirilmesi: bitirilen / gereken. */
  complete: Progress;
  /** Seri: güncel seri / gereken seri. `met` en uzun seriye göre. */
  streak: { current: number; needed: number; met: boolean };
  /**
   * Seri koşulunun dolmasına kalan gün — 0 ise seri koşulu tamam. Bitirme koşulu
   * gün saymıyor (kullanıcının elinde), o yüzden bu sayı "en erken" demek.
   */
  days: number;
};

/** Ücretsiz katmanda bir yüzeyin durumu. */
export type FreeUnlock = {
  premium: false;
  /** Açık (izin verilen) hak sayısı. */
  open: number;
  /** Kullanılmış (sahiplenilmiş) hak. */
  used: number;
  /** Bitirilmiş hak — dilim sayımının girdisi. */
  done: number;
  /** Kalan hak. */
  remaining: number;
  /** Açılmış kademe sayısı (k). */
  tier: number;
  /** Bir sonraki açılış — kademe kapalıysa ya da tavana varıldıysa null. */
  next: UnlockNext | null;
};

/** Premium'da kotalı yüzey: yalnız kötüye kullanım tavanı var, kademe yok. */
export type PremiumUnlock = { premium: true };

export type TieredUnlock = FreeUnlock | PremiumUnlock;

/** Deneme sınavı — premium'da 3'lü paketler, ücretsizde kademe. */
export type MockUnlock =
  | FreeUnlock
  | {
      premium: true;
      /** Açık kâğıt sayısı. */
      open: number;
      /** Açık kâğıtlardan bitirilen. */
      done: number;
      packSize: number;
      /** Sonraki paket: açık son paketteki bitirilen / paket boyu. Hepsi açıksa null. */
      next: { complete: Progress } | null;
    };

/** Yürüyüş modu — gün başına oturum. */
export type WalkUnlock = {
  premium: boolean;
  /** Günlük oturum hakkı (premium'da kötüye kullanım tavanı). */
  perDay: number;
  used: number;
  remaining: number;
  /** Şu an açık bir oturum var mı — varsa yeni istek hak yemiyor. */
  sessionOpen: boolean;
  /** Ekran kapalı (sunucu ses tanıma) yol açık mı — yalnız premium. */
  pocket: boolean;
};

/** Seri kademesi: floor(en uzun seri / adım). */
export function streakTier(longestStreak: number, step: number): number {
  if (step <= 0) return 0;
  return Math.floor(Math.max(longestStreak, 0) / step);
}

/**
 * Tam bitirilmiş dilim sayısı.
 *
 * İlk dilim tabandır; bitirilen sayı tabana varınca bir dilim tamam, sonra her
 * `bonus` bitirişte bir dilim daha. Taban 0 ise bitirecek bir şey yok ve ilk
 * dilim baştan tamam sayılıyor.
 */
export function completedSlices(done: number, base: number, bonus: number): number {
  const d = Math.max(done, 0);
  if (d < base) return 0;
  if (bonus <= 0) return 1;
  return 1 + Math.floor((d - base) / bonus);
}

/** Açılmış kademe sayısı: k = min(seri kademesi, bitirilmiş dilim[, tavan]). */
export function unlockedTier(rule: TierRule, done: number, longestStreak: number): number {
  if (rule.bonus <= 0 || rule.step <= 0) return 0;
  const k = Math.min(streakTier(longestStreak, rule.step), completedSlices(done, rule.base, rule.bonus));
  return rule.maxTiers > 0 ? Math.min(k, rule.maxTiers) : k;
}

/** İzin verilen hak: taban + bonus × k. */
export function allowedCount(rule: TierRule, done: number, longestStreak: number): number {
  return Math.max(rule.base, 0) + Math.max(rule.bonus, 0) * unlockedTier(rule, done, longestStreak);
}

/**
 * Ücretsiz bir yüzeyin tam durumu.
 *
 * `currentStreak` "bugün yaşayan" seri olmalı (kopmuşsa 0) — bkz. `liveStreak`.
 */
export function freeUnlock(
  rule: TierRule,
  input: { used: number; done: number; longestStreak: number; currentStreak: number },
): FreeUnlock {
  const tier = unlockedTier(rule, input.done, input.longestStreak);
  const open = Math.max(rule.base, 0) + Math.max(rule.bonus, 0) * tier;
  const used = Math.max(input.used, 0);
  const done = Math.max(input.done, 0);
  const capped = rule.maxTiers > 0 && tier >= rule.maxTiers;
  let next: UnlockNext | null = null;
  if (rule.bonus > 0 && rule.step > 0 && !capped) {
    const neededStreak = (tier + 1) * rule.step;
    const met = input.longestStreak >= neededStreak;
    const current = Math.max(input.currentStreak, 0);
    next = {
      gain: rule.bonus,
      complete: { done: Math.min(done, open), needed: open },
      streak: { current: Math.min(current, neededStreak), needed: neededStreak, met },
      days: met ? 0 : Math.max(1, neededStreak - current),
    };
  }
  return { premium: false, open, used, done, remaining: Math.max(0, open - used), tier, next };
}

/**
 * Premium deneme sınavı paketleri: ilk paket açık, sonraki paket öncekinin
 * kâğıtlarının HEPSİ bitirilince açılıyor. `finished` kâğıt sırasıyla hizalı.
 */
export function premiumMockUnlock(finished: boolean[], packSize: number): Extract<MockUnlock, { premium: true }> {
  const size = Math.max(1, packSize);
  let open = 0;
  let next: { complete: Progress } | null = null;
  for (let i = 0; i < finished.length; i += size) {
    const pack = finished.slice(i, i + size);
    open += pack.length;
    const done = pack.filter(Boolean).length;
    if (done < pack.length) {
      next = i + size < finished.length ? { complete: { done, needed: pack.length } } : null;
      break;
    }
  }
  const done = finished.slice(0, open).filter(Boolean).length;
  return { premium: true, open, done, packSize: size, next };
}

/**
 * Bugün yaşayan seri — profil satırındaki `current_streak` kopmuş olabilir.
 *
 * Satır ancak kullanıcı çalışınca güncelleniyor; üç gündür gelmeyen birinin
 * satırında hâlâ "5" yazıyor. Son etkin gün dünden eskiyse seri kopmuş sayılıyor
 * (bir günlük onarım hakkı sunucuda ayrıca işliyor, burada iyimser değiliz: "4
 * gün kaldı" deyip ertesi gün "7 gün kaldı" demek, tersinden kötü).
 *
 * Günler "YYYY-AA-GG". Gün sınırı kullanıcının yerel günü olabilir (uçlar öyle
 * yazıyor); `today` sunucunun günüyse ±1 kayma "dün" sayılarak tolere ediliyor.
 */
export function liveStreak(currentStreak: number, lastActiveDay: string | null, today: string): number {
  if (!lastActiveDay || currentStreak <= 0) return 0;
  const yesterday = shiftDay(today, -1);
  return lastActiveDay >= yesterday ? currentStreak : 0;
}

function shiftDay(day: string, delta: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}
