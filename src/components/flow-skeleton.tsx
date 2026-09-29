import type { CSSProperties, ElementType } from "react";
import { SkeletonBar, SkeletonTile } from "@/components/skeleton";

/*
 * AKIŞ ŞABLONUNUN İSKELETLERİ — kapak (`flow` `CoverBody`) ve tur kabuğu
 * (`session-player` + `games/game-shell`).
 *
 * Yedi bekleme yeri aynı iki ekrana açılıyor: yerleştirme, deneme sınavı
 * bölümü, puanlı konuşma, meydan okuma, patron ve haftalık sınav bir KAPAĞA;
 * günün turu bir TURA. Ölçüler burada gerçek bileşenin sınıflarından: biri
 * değişirse diğeri de burada değişmeli.
 * Mobil karşılığı `M/src/game/RoundSkeleton.tsx` (`RoundSkeleton`,
 * `CoverSkeleton`, `COVERS`).
 */

const FILLER =
  "Hangi seviyeden başlaman gerektiğini gösterir ve her kural kendi satırında durur; bitince sonuç ve beceri profili gelir, istediğin aşamayı atlayabilirsin. ";

function filler(chars: number): string {
  let s = "";
  while (s.length < chars) s += FILLER;
  return s.slice(0, Math.max(1, chars)).trimEnd();
}

const SLOT: CSSProperties = {
  color: "transparent",
  background: "var(--surface-2)",
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
};

/**
 * Metin yeri — GERÇEK yazı sınıfıyla ve `chars` uzunluğunda görünmez bir
 * dolguyla; her satırın çubuğu satır içi zeminin kendisi.
 *
 * NEDEN SABİT ÇUBUK DEĞİL: kapak sütunu telefonda ekran eksi 32 px, 480 px
 * üstünde 448. Aynı kural cümlesi (~45 harf) telefonda iki, genişte tek satır;
 * sabit tek çubuk telefonda kısa kalıyor, kapak gelince her şey aşağı
 * kayıyordu. 390 px altında punto da akışkan (`globals.css` `--fluid-t`),
 * piksel yüksekliği sabit çubuk orada da uzun kalıyordu. Burada sarılma,
 * punto ve satır yüksekliği tarayıcının kendi hesabı: her genişlikte gerçeğiyle
 * aynı satır sayısı.
 */
export function TextSlot({ chars, className = "", as: Tag = "p" }: { chars: number; className?: string; as?: ElementType }) {
  return (
    <Tag aria-hidden className={`select-none ${className}`}>
      <span className="animate-pulse rounded-chip" style={SLOT}>
        {filler(chars)}
      </span>
    </Tag>
  );
}

/** Düğme yeri — gerçek `.btn`in kendisi, görünmez bir harfle: yüksekliği sınıftan çıkıyor. */
export function ButtonSlot({ className }: { className: string }) {
  return (
    <div aria-hidden className={`btn w-full animate-pulse ${className}`} style={{ background: "var(--surface-2)" }}>
      <span className="invisible">.</span>
    </div>
  );
}

/**
 * Kapağın şekli — alanların Türkçe metin uzunluğu (harf). Sarılmayı genişlik
 * belirliyor, uzunluğu içerik: ikisi birlikte her ekranda gerçek satır sayısı.
 * Değişken metinlerde (tema, sahne, yönerge) katalogdaki ortanca.
 * Mobil `COVERS` aynı sayıları taşıyor.
 */
export type CoverShape = {
  /** Kapağın üstündeki koç cümlesi (`CoachLine`); 0 = yok. */
  coach?: number;
  eyebrow?: number;
  title?: number;
  /** Tanıtım cümlesi; 0 = yok. */
  pitch?: number;
  rules?: number[];
  /** Kuralların altındaki soluk not, blok blok. */
  note?: number[];
  /** Notun dibindeki küçük bağımsızlık satırı (`exam.independent_note`). */
  footnote?: number;
  /** Kapağın içindeki `DetailCard` satır sayısı (0 = kart yok). */
  detailRows?: number;
  secondary?: boolean;
  tertiary?: boolean;
};

export const COVERS = {
  placement: { eyebrow: 12, title: 27, pitch: 46, rules: [44, 50, 44, 48, 47] },
  challenge: { eyebrow: 13, title: 18, pitch: 126, rules: [32, 32, 78] },
  boss: { eyebrow: 13, title: 27, rules: [34, 34, 57, 43] },
  weekly: { eyebrow: 13, title: 22, pitch: 57, rules: [20, 20, 37], note: [64], secondary: true, tertiary: false },
  scored: { coach: 56, eyebrow: 40, title: 14, pitch: 162, rules: [46, 53, 88], detailRows: 3 },
  mock: { eyebrow: 22, title: 24, pitch: 97, rules: [16, 80, 60, 24, 75], note: [23, 84], footnote: 109 },
  exam: { coach: 56, eyebrow: 21, title: 24, pitch: 34, rules: [22, 55, 56, 54, 41], detailRows: 5, footnote: 109 },
} satisfies Record<string, CoverShape>;

/**
 * Kapak iskeleti: `FlowColumn` > (koç satırı) > `CoverBody` (ikon karosu,
 * üst satır, başlık, tanıtım, kural kartı, not, ayrıntı kartı) > `FlowActions`.
 * Kaplar ve yazı sınıfları gerçeğinin kendisi; `FlowColumn` kırılımsız
 * (`max-w-md`), ekranlar arası tek fark metnin sarılması — o da `TextSlot`ta.
 */
export function CoverSkeleton({
  coach = 0,
  eyebrow = 14,
  title = 22,
  pitch = 0,
  rules = [],
  note = [],
  footnote = 0,
  detailRows = 0,
  secondary = false,
  tertiary = true,
}: CoverShape) {
  return (
    <div aria-hidden className="relative mx-auto flex w-full max-w-md flex-col gap-3">
      {coach ? <TextSlot chars={coach} className="text-body leading-snug" /> : null}
      <div className="flex flex-col gap-3">
        <div className="h-14 w-14 animate-pulse rounded-panel" style={{ background: "var(--surface-2)" }} />
        <div>
          <TextSlot chars={eyebrow} className="text-micro uppercase tracking-eyebrow" />
          <TextSlot chars={title} className="text-h1" />
          {pitch ? <TextSlot chars={pitch} className="mt-1 text-body" /> : null}
        </div>
        {rules.length ? (
          <ul className="card flex flex-col gap-3 p-4">
            {rules.map((chars, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="block h-7 w-7 shrink-0 animate-pulse rounded-chip" style={{ background: "var(--surface-2)" }} />
                <TextSlot as="span" chars={chars} className="pt-0.5 text-body" />
              </li>
            ))}
          </ul>
        ) : null}
        {note.length || footnote ? (
          <div className="text-caption">
            {note.map((chars, i) => (
              <TextSlot key={i} as="span" chars={chars} className="block" />
            ))}
            {footnote ? <TextSlot as="span" chars={footnote} className="mt-2 block text-micro" /> : null}
          </div>
        ) : null}
        {detailRows ? (
          <section className="card flex flex-col gap-2 p-4">
            <TextSlot chars={24} className="text-micro uppercase tracking-eyebrow" />
            {Array.from({ length: detailRows }, (_, i) => (
              <div key={i} className="flex items-baseline justify-between gap-3">
                <TextSlot as="span" chars={14 + (i % 3) * 4} className="min-w-0 text-strong" />
                <TextSlot as="span" chars={12 + (i % 2) * 5} className="min-w-0 text-right text-caption" />
              </div>
            ))}
          </section>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <ButtonSlot className="px-5 py-4" />
        {secondary ? <ButtonSlot className="border px-5 py-4 text-strong" /> : null}
        {tertiary ? (
          <div className="btn w-full px-5 py-2.5 text-strong">
            <TextSlot as="span" chars={8} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Tur iskeleti: çıkış + çubuk + yeni/tekrar çipi + sayaç satırı, (tek oyun
 * etiketi), soru kartı ve dört şık — `session-player` oynama dalının ve
 * `GameShell`in (çoktan seçmeli `choice-game`) kapları ve sınıfları, aynı
 * sırayla ve aynı kırılımlarla: soru `text-h1 sm:text-display`, şıklar tek
 * sütun; `md` altında esneyen iki pay (okuma/dokunma bölgesi), `md`den
 * itibaren kart ortada tek parça (`FitBox` `md:my-auto`).
 */
export function RoundSkeleton({ label = false, options = 4 }: { label?: boolean; options?: number }) {
  const pulse = { background: "var(--surface-2)" };
  return (
    <div aria-hidden className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
      <div className="mb-3 flex shrink-0 items-center gap-3 text-caption">
        <SkeletonTile size={44} />
        <SkeletonBar height={8} className="min-w-0 flex-1" />
        <span className="shrink-0 animate-pulse rounded-full px-2 py-0.5 text-micro uppercase tracking-eyebrow" style={pulse}>
          <span className="invisible">Yeni</span>
        </span>
        <TextSlot as="span" chars={6} className="shrink-0 tabular-nums" />
      </div>
      {label ? <TextSlot chars={24} className="mb-2 shrink-0 text-center text-micro uppercase tracking-eyebrow" /> : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-full shrink-0 flex-col md:my-auto md:min-h-0">
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col md:block">
            <div className="card px-4 py-6 text-center">
              <TextSlot as="span" chars={18} className="text-micro uppercase tracking-eyebrow" />
              <div className="mt-1.5 break-words text-h3 sm:text-h2">
                <TextSlot as="span" chars={7} className="text-h1 sm:text-display" />
              </div>
            </div>
            <div className="min-h-5 grow md:hidden" />
            <div className="md:mt-5">
              <div className="grid gap-3">
                {Array.from({ length: options }, (_, i) => (
                  <div key={i} className="option flex items-center justify-between gap-3 px-4 py-3 text-left font-medium">
                    <TextSlot as="span" chars={[9, 12, 7, 10][i % 4]} className="text-h3" />
                  </div>
                ))}
              </div>
            </div>
            <div className="max-h-8 grow md:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
