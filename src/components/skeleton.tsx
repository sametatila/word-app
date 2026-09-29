/**
 * Sayfa iskeleti.
 *
 * Ana ekrana eklenmiş uygulamada tarayıcının kendi yükleme göstergesi yok;
 * sunucudan veri gelene kadar ekran boş kalırsa uygulama donmuş gibi
 * görünüyor. Bu iskelet, gelecek içeriğin şeklini hemen çizerek o boşluğu
 * doldurur.
 */
/*
 * YARIÇAP ÖLÇEKTEN. İskelet, yerini tuttuğu şeyin şeklini almalı: burası
 * Tailwind'in kendi `rounded-xl`ini (12) kullanıyordu, oysa yerini tuttuğu
 * satır ve kutular ölçeğin 14 ve 20'sinde. İçerik gelince yarıçap zıplıyordu.
 * Mobil karşılıkları da öyle: `Skeleton` md (14), `SkeletonRows` lg (20).
 */
/*
 * OPAKLIK RAMPASI KALDIRILDI (`opacity={1 - i * 0.13}`).
 *
 * İki sebep birlikte: (1) Android'de böyle bir şey yok - bütün iskelet
 * satırları AYNI nabızla nefes alıyor (`ui/Skeleton` tek paylaşılan
 * `usePulse`); (2) rampa burada ve `RowSkeleton`da zaten ÇALIŞMIYORDU:
 * `animate-pulse` opaklığı canlandırıyor ve CSS animasyonu satır içi stili
 * ezdiği için verilen değer hiç görünmüyordu. `PersonRowSkeleton`da rampa
 * KABA veriliyordu, yani orada çalışıyordu - o da kaldırıldı, çünkü ölçü
 * Android.
 */
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-tile ${className}`} style={{ background: "var(--surface-2)" }} />;
}

export function PageSkeleton({ rows = 5, header = true }: { rows?: number; header?: boolean }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-2xl space-y-3">
      {header ? (
        <>
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
          <div className="h-3" />
        </>
      ) : null}
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}

/*
 * `CardSkeleton` KALDIRILDI.
 *
 * Kendi verisini çeken kartların yerini ayırmak için yazılmıştı ve yüksekliği
 * elle veriliyordu ("bu kart aşağı yukarı 220 piksel"). Tuttuğu sürece işini
 * görüyordu ama tutmadığında iskeletin çözdüğü sarsıntıyı iskeletin kendisi
 * üretiyordu — beş çağrı yerinin hiçbirinde ölçü gerçek kartla aynı değildi.
 *
 * Yerine aşağıdaki ölçülü parçalar geçti; beş kart da kendi düzenini çiziyor.
 * Bileşen bilerek geri konmadı: kalırsa göz kararı yükseklik yazma yolu açık
 * kalır ve sessizce geri gelir.
 */

/**
 * KİŞİ satırı iskeleti — arma, iki metin satırı, eylem düğmesi.
 *
 * Arkadaş listesi, arama sonuçları ve öneriler `RowSkeleton` ile yer
 * ayırıyordu: göz kararı yükseklikte düz bloklar. İskeletin işi yükseklik
 * doldurmak değil, gelecek şeyin ŞEKLİNİ göstermek — akış, gelen kutusu ve
 * ortak görev bu kuralı uyguluyor, kişi listeleri uygulamıyordu. Android'in
 * karşılıkları da şekilli (`FriendCardSkeleton`, `SearchResultSkeleton`).
 */
export function PersonRowSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <ol aria-hidden className="card divide-y divide-[color:var(--border)] overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 px-4 py-3">
          <SkeletonTile size={40} className="rounded-full" />
          <span className="min-w-0 flex-1">
            <SkeletonLine variant="body" width={`${64 - i * 8}%`} />
            <SkeletonLine variant="micro" width={72} />
          </span>
          <SkeletonPill width={78} height={32} />
        </li>
      ))}
    </ol>
  );
}

/** Satır iskeleti — menü ve liste satırlarının yeri. */
export function RowSkeleton({ rows = 3, height = 56 }: { rows?: number; height?: number }) {
  return (
    <div aria-hidden className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-panel"
          style={{ height, background: "var(--surface-2)" }}
        />
      ))}
    </div>
  );
}

/*
 * ── ÖLÇÜYE OTURAN İSKELET ─────────────────────────────────────────────────
 *
 * Mobilde iskelet gerçek düzenin ölçüleriyle çiziliyor (`M/src/ui/Skeleton.tsx`):
 * bir başlık satırının yeri o başlığın satır yüksekliği kadar, bir kartın yeri
 * kartın kendi dolgusu kadar. Sonuç, veri gelince hiçbir şeyin yerinden
 * oynamaması.
 *
 * Web'de tek bir `CardSkeleton height={…}` vardı ve yükseklik göz kararı
 * yazılıyordu; tutmadığında iskeletin çözdüğü sarsıntıyı iskeletin kendisi
 * üretiyordu. Aşağıdakiler tipografi ölçeğinden TÜRÜYOR, o yüzden ölçek
 * değişirse iskelet de değişiyor.
 */

/**
 * Tipografi ölçeğinin punto ve satır yükseklikleri — globals.css `@theme` ile aynı.
 *
 * `Record<string, …>` YAZILMIYOR ve sebebi somut: öyleyken `keyof typeof TEXT`
 * `string`e çöküyordu, yani derleyici hem ölçekte OLMAYAN bir ad kabul ediyor
 * (`variant="bodyStrong"` — mobilin adı, webde karşılığı `strong`) hem de
 * `TEXT[variant]`i asla undefined olamaz sayıyordu. İki koruma birden
 * kapanmıştı; üretimde on çağrı yerinde iskelet çizilirken sayfa
 * "undefined is not iterable" ile düşüyordu (2026-09-10).
 *
 * `satisfies` ile tablo hem denetleniyor hem anahtarlar SABİT kalıyor:
 * ölçekte olmayan bir ad artık derlenmiyor.
 */
const TEXT = {
  display: [32, 1.15],
  h1: [26, 1.2],
  h2: [20, 1.3],
  h3: [16, 1.35],
  body: [15, 1.5],
  strong: [15, 1.5],
  caption: [12.5, 1.6],
  micro: [11, 1.65],
} satisfies Record<string, [size: number, lineHeight: number]>;
export type TextVariant = keyof typeof TEXT;

/** Bir metin satırının gerçek yüksekliği (px) — iskelet ölçüsü buradan. */
export function textHeight(variant: TextVariant): number {
  /*
    YEDEK DAVRANIŞ. Tip artık ölçek dışı bir adı derlemiyor, ama bu değer
    başka bir yerden (eski bir yapı, dinamik bir dizgi) gelirse iskelet
    SAYFAYI DÜŞÜRMEMELİ: yerini tuttuğu içerik yüklenirken çizilen bir şeyin
    bütün ekranı hata sınırına atması, çözdüğü sorundan büyük.
  */
  const pair = TEXT[variant] ?? TEXT.body;
  const [size, lh] = pair;
  return Math.round(size * lh);
}

/**
 * Ölçeğin sınıf adları — Tailwind sınıfları derlemede metinden toplandığı için
 * `text-${variant}` diye kurulamıyor, her ad burada düz yazılı.
 */
const TEXT_CLASS: Record<TextVariant, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  body: "text-body",
  strong: "text-strong",
  caption: "text-caption",
  micro: "text-micro",
};

/**
 * Tek bir metin satırının yeri.
 *
 * YÜKSEKLİK GERÇEK YAZI SINIFINDAN, PİKSELDEN DEĞİL (2026-09-29). Kap, gerçek
 * metnin `text-*` sınıfını taşıyor ve içinde görünmez tek bir karakter var:
 * satır kutusu tarayıcının gerçek metne verdiğiyle aynı. Eskiden yükseklik
 * `textHeight` ile sabit pikseldi; 390 px'ten dar ekranda ölçek akışkan
 * küçülüyor (`globals.css` `--fluid-t`) ve her iskelet satırı gerçeğinden
 * uzun kalıyordu. Çubuk yine satırdan 4 px kısa ve ortada — mobil
 * `ui/Skeleton.tsx` ile aynı kural: boşluksuz dizilen satırlar tek blok gibi
 * görünmesin.
 */
export function SkeletonLine({
  variant = "body",
  width = "100%",
  className = "",
  tone = "var(--surface-2)",
}: {
  variant?: TextVariant;
  width?: number | string;
  className?: string;
  /** Çubuğun rengi; surface-2 zemin üstünde bir ton koyu (`var(--border)`). */
  tone?: string;
}) {
  const radius = Math.min(10, Math.max(6, textHeight(variant) - 4) / 2);
  return (
    <div aria-hidden className={`relative ${TEXT_CLASS[variant] ?? TEXT_CLASS.body} ${className}`} style={{ width }}>
      <span className="invisible">{"\u00a0"}</span>
      <div
        className="absolute inset-x-0 top-0.5 bottom-0.5 animate-pulse"
        style={{ borderRadius: radius, background: tone }}
      />
    </div>
  );
}

/**
 * Gerçek yazı sınıfıyla ölçülen boş satır — içi olmayan yer tutucu.
 *
 * Kahraman kartı ya da hap gibi TEK blok çizen iskeletler yüksekliği
 * "20 + satır" diye piksel topluyordu; hem dolgu (`--spacing`) hem punto 390
 * px altında küçülüyor, toplam gerçeğini tutmuyordu. Bunun yerine gerçek
 * öğenin sınıflarıyla (dolgu dahil) görünmez bir satır çizilir.
 */
export function TextBox({ variant = "body", className = "", style }: { variant?: TextVariant; className?: string; style?: React.CSSProperties }) {
  return (
    <div aria-hidden className={`${TEXT_CLASS[variant] ?? TEXT_CLASS.body} ${className}`} style={style}>
      <span className="invisible">{"\u00a0"}</span>
    </div>
  );
}

/** Yatay çubuk — ilerleme çizgisi, ayraç. */
export function SkeletonBar({ height = 8, className = "" }: { height?: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-full ${className}`}
      style={{ height, background: "var(--surface-2)" }}
    />
  );
}

/** Kare karo — ikon kutusu, avatar, rozet. */
export function SkeletonTile({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={`shrink-0 animate-pulse rounded-tile ${className}`}
      style={{ height: size, width: size, background: "var(--surface-2)" }}
    />
  );
}

/** Hap — seri/XP rozetlerinin yeri. */
export function SkeletonPill({
  width = 96,
  height = 32,
  className = "",
}: {
  width?: number | string;
  height?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-full ${className}`}
      style={{ width, height, background: "var(--surface-2)" }}
    />
  );
}

/**
 * Kart iskeleti — İÇİ olan.
 *
 * Kartın kendi çerçevesini (yarıçap, kenarlık, dolgu) koruyup içine gerçek
 * düzenin parçalarını alıyor. Kartın yüksekliği böylece VARSAYILMIYOR,
 * içeriğinden çıkıyor — kaldırılan `CardSkeleton`ın yapamadığı da buydu.
 */
export function SkeletonCard({
  children,
  className = "",
  label,
}: {
  children?: React.ReactNode;
  className?: string;
  /** Ekran okuyucu etiketi; verilmezse yalnız "meşgul" durumu duyurulur. */
  label?: string;
}) {
  return (
    <div className={`card p-4 ${className}`} role="status" aria-busy="true" aria-label={label}>
      {children}
    </div>
  );
}

/**
 * Sekme başlığının (`AppHeader`) yeri — Öğren, Patika, Beceriler, Arkadaşlar.
 *
 * Tek yerde, çünkü dört `loading.tsx` bunu ayrı ayrı çiziyordu ve biri
 * değişince ötekiler geride kalıyordu (zil üçünde yuvarlak çizilmişti, gerçeği
 * `--radius-tile` kare). Gerçeğiyle aynı: tek satır `h1` başlık (üst künye yok,
 * 2026-09-29), sağda seri hapı (py-2 + strong satırı), 44'lük zil, 44'lük
 * yuvarlak avatar.
 */
export function AppHeaderSkeleton({ titleWidth = 160 }: { titleWidth?: number | string }) {
  return (
    <div aria-hidden className="mb-4 flex items-center justify-between gap-3">
      <div className="min-w-0 flex-1">
        <SkeletonLine variant="h1" width={titleWidth} />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {/* Seri hapı gerçeğinin sınıflarıyla: `px-3 py-2 text-strong`. */}
        <TextBox variant="strong" className="w-14 animate-pulse rounded-full py-2" style={{ background: "var(--surface-2)" }} />
        <SkeletonTile size={44} />
        <SkeletonTile size={44} className="rounded-full" />
      </div>
    </div>
  );
}
