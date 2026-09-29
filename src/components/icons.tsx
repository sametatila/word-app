import Image from "next/image";

/**
 * Uygulamanın ikon seti — Remix Icon'dan, ANLAM başına bir bileşen.
 *
 * İkonların hepsi `icons.remix.generated.tsx`ten geliyor: `data/icons/picks.json`
 * her anlama (XP, seri, günlük tur, …) bir glif atıyor ve `npm run icons:build`
 * web ile mobil için aynı yol verisini üretiyor. Ad anlamın adı (`XpIcon`,
 * `StreakIcon`, `DailyRoundIcon`); aynı glifi başka bir anlam için kullanmak
 * yerine picks.json'a yeni satır eklenir. Renk `currentColor`, boy `size`.
 *
 * Eski set (2026-09-29'a dek) elle çizilmişti: bir glif birden çok anlam
 * taşıyordu ve aynı ad iki platformda iki ayrı çizimdi. 48 konu ikonu da
 * (ekmek, otobüs, kahve, …) çağıransız duruyordu; setle birlikte silindi.
 *
 * Burada yalnız MARKA işareti kalıyor: `LogoMark` bir ikon değil, portre.
 */
export * from "./icons.remix.generated";

/**
 * Marka işareti — maskotun kafası.
 *
 * Uygulama simgesiyle BİREBİR aynı görsel (`scripts/icons.mjs` ikisini de aynı
 * kaynaktan üretiyor). Önce gradyan bir kutuda geometrik bir "W" ve umlaut
 * noktaları vardı; fikir iyiydi ama maskotla hiçbir bağı yoktu — kullanıcı ana
 * ekranda bir mirket, uygulamanın içinde bir harf görüyordu.
 *
 * Kendi yuvarlak köşeli zeminini getiriyor: PNG'nin köşeleri saydam, o yüzden
 * sarmalayıcı bir kutuya ya da `rounded-*` sınıfına ihtiyacı yok. Bu yüzden
 * `currentColor` de almıyor — marka tek renkli bir simge değil, bir portre.
 */
export const LogoMark = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  // `next/image`: statik bir PNG ve ölçüsü belli, yani optimizasyonun tam
  // uyduğu durum — boyutlandırılmış ve modern formata çevrilmiş sürüm servis
  // ediliyor. Maskot klipleri için AYNI şey doğru DEĞİL (animasyonlu WebP,
  // bkz. mascot.tsx); ayrım kasıtlı.
  <Image
    src="/logo-mark.png"
    alt=""
    width={size}
    height={size}
    className={`shrink-0 select-none ${className}`}
    draggable={false}
    aria-hidden="true"
  />
);
