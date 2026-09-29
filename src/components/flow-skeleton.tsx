"use client";

import type { CSSProperties, ElementType } from "react";
import { SkeletonBar, SkeletonTile } from "@/components/skeleton";
import { useT } from "@/lib/i18n/client";

/*
 * AKIŞ ŞABLONUNUN İSKELETLERİ — kapak (`flow` `CoverBody`) ve tur kabuğu
 * (`session-player` + `games/game-shell`).
 *
 * Yedi bekleme yeri aynı iki ekrana açılıyor: yerleştirme, deneme sınavı
 * bölümü, puanlı konuşma, meydan okuma, patron ve haftalık sınav bir KAPAĞA;
 * günün turu bir TURA. Ölçüler burada gerçek bileşenin sınıflarından: biri
 * değişirse diğeri de burada değişmeli.
 * Mobil karşılığı `M/src/game/RoundSkeleton.tsx` (`RoundSkeleton`,
 * `CoverSkeleton`): orada da metin gerçeğinden ölçülüyor (`SkeletonText`,
 * `onTextLayout`), tahmin yok.
 */

/* Veri metninin dolgusu. Mobil `RoundSkeleton` `FILLER` ile BİREBİR aynı
   kalmalı (parite ortak sabitleri denetliyor). */
const FILLER =
  "Hangi seviyeden başlaman gerektiğini gösterir ve her kural kendi satırında durur; bitince sonuç ve beceri profili gelir, istediğin aşamayı atlayabilirsin. ";

/** Veri metninin (katalog adı, sahne, kullanıcı adı) yerine `chars` uzunluğunda dolgu. */
export function filler(chars: number): string {
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
const GHOST: CSSProperties = { color: "transparent" };

type Vars = Record<string, string | number>;

/**
 * Metin yeri — GERÇEK yazı sınıfıyla ve görünmez metinle; her satırın çubuğu
 * satır içi zeminin kendisi.
 *
 * NEDEN SABİT ÇUBUK DEĞİL: kapak sütunu telefonda ekran eksi 32 px, 480 px
 * üstünde 448. Aynı kural cümlesi telefonda iki, genişte tek satır; sabit tek
 * çubuk telefonda kısa kalıyor, kapak gelince her şey aşağı kayıyordu. Burada
 * sarılma, punto ve satır yüksekliği tarayıcının kendi hesabı.
 *
 * METİN GERÇEĞİNİN KENDİSİ (2026-09-29). Arayüz metni yerine duruyorsa `k`
 * (çeviri anahtarı) ya da `text` verilir: tarayıcı onu gerçeğiyle aynı dilde,
 * aynı harflerle sarıyor. Eskiden Türkçe harf sayısı (`chars`) veriliyordu;
 * İngilizce ve Almancada, kırılım kenarlarında satır sayısı tutmuyordu (320
 * px'te patron kapağı 69 px uzundu). `chars` yalnız VERİ metni için kaldı
 * (katalog adı, sahne, kullanıcı adı): değeri bilinmiyor, ortanca uzunluk.
 *
 * `ghost`: çubuk yok, yalnız yer — tek parça nabızlı bloğun (kahraman kartı)
 * içinde yüksekliği gerçek metinden türetmek için.
 */
export function TextSlot({
  chars = 8,
  text,
  k,
  v,
  vk,
  ghost = false,
  className = "",
  as: Tag = "p",
}: {
  chars?: number;
  text?: string;
  k?: string;
  v?: Vars;
  /** Değeri kendisi bir çeviri anahtarı olan parametreler (ör. `{ skill: "skills.writing" }`). */
  vk?: Record<string, string>;
  ghost?: boolean;
  className?: string;
  as?: ElementType;
}) {
  const t = useT();
  const vars = vk ? { ...v, ...Object.fromEntries(Object.entries(vk).map(([n, key]) => [n, t(key)])) } : v;
  const body = k ? t(k, vars) : text ?? filler(chars);
  return (
    <Tag aria-hidden className={`select-none ${className}`}>
      <span className={ghost ? undefined : "animate-pulse rounded-chip"} style={ghost ? GHOST : SLOT}>
        {body}
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
 * Kare yer — ikon karosu, geri düğmesi, taç — gerçeğin BOYUT SINIFIYLA
 * (`h-11 w-11`, `size-10`). Piksel boyutlu `SkeletonTile` 390 px altında
 * gerçeğinden büyük kalıyor: boşluk ölçeği (`--spacing`) orada akışkan,
 * 44'lük karo 375 px'te ~42. Kart başına 2 px, sayfa boyunca birikiyordu.
 * DENETİMLER (geri, çıkış) değil: onlar `globals.css` dokunma tabanıyla 44'te
 * kalıyor, yerleri piksel `SkeletonTile size={44}`.
 */
export function TileSlot({ className, shape = "tile" }: { className: string; shape?: "tile" | "full" | "card" }) {
  const round = shape === "full" ? "rounded-full" : shape === "card" ? "rounded-card" : "rounded-tile";
  return <div aria-hidden className={`shrink-0 animate-pulse ${round} ${className}`} style={{ background: "var(--surface-2)" }} />;
}

type Translate = ReturnType<typeof useT>;
/**
 * Kapak alanının metni: çeviri anahtarından gerçek cümle (`tk`) ya da veri
 * metni için ortanca harf sayısı. Anahtardaki veri parametreleri (süre, soru
 * sayısı, modül adı) örnek değerle dolduruluyor.
 */
export type Slot = number | ((t: Translate) => string);
const tk = (key: string, v?: Vars): Slot => (t) => t(key, v);

export type CoverShape = {
  /** Kapağın üstündeki koç cümlesi (`CoachLine`, rastgele seçiliyor); 0 = yok. */
  coach?: number;
  eyebrow?: Slot;
  title?: Slot;
  /** Tanıtım cümlesi; 0 = yok. */
  pitch?: Slot;
  rules?: Slot[];
  /** Kuralların altındaki soluk not, blok blok. */
  note?: Slot[];
  /** Notun dibindeki küçük bağımsızlık satırı (`exam.independent_note`). */
  footnote?: Slot;
  /** Kapağın içindeki `DetailCard` başlığı ve satır sayısı (0 = kart yok). */
  detailTitle?: Slot;
  detailRows?: number;
  secondary?: boolean;
  /** Alttaki soluk düğmenin etiketi; yoksa düğme yok. */
  tertiary?: Slot;
};

/**
 * Kapakların şekli — hangi alan var ve metni ne. Arayüz metni gerçeğinin
 * anahtarıyla (oynatıcının `CoverBody`sine verdiği aynı anahtar), veri metni
 * katalogdaki ortanca uzunlukla. Oynatıcı değişirse burası da değişmeli.
 */
export const COVERS = {
  placement: {
    eyebrow: tk("placement.title"),
    title: tk("onboarding.kisa_yerlestirme_sinavi"),
    pitch: tk("plc.cover_pitch"),
    rules: ["plc.rule_stages", "plc.rule_time", "plc.rule_dont_know", "plc.rule_result", "plc.rule_choose"].map((k) => tk(k)),
    tertiary: tk("common.later"),
  },
  challenge: {
    eyebrow: tk("learn.survival"),
    title: tk("challenge.title"),
    /* `START_SECONDS` (challenge-player). */
    pitch: tk("challenge.pitch", { n: 40 }),
    rules: [tk("challenge.rule_correct"), tk("challenge.rule_wrong"), tk("challenge.rule_waves")],
    tertiary: tk("common.discard"),
  },
  boss: {
    /* Örnek değerler `lib/conversations/boss` sabitlerinden; modül adı veri. */
    eyebrow: tk("bossw.level_module", { level: "A1", n: 1 }),
    title: (t) => t("bossw.title_exam", { title: filler(18) }),
    rules: [
      tk("bossw.rule_start", { n: 15, sec: 60 }),
      tk("bossw.rule_time", { bonus: 3, penalty: 5 }),
      tk("bossw.rule_crown"),
      tk("bossw.rule_pool", { n: 120 }),
    ],
    tertiary: tk("bossw.back_to_path"),
  },
  weekly: {
    eyebrow: tk("learn.weekly_quiz"),
    title: 22,
    pitch: tk("wquiz.pitch"),
    rules: [tk("wquiz.rule_count", { n: 20 }), tk("wquiz.rule_once"), tk("wquiz.rule_explain")],
    note: [tk("wquiz.no_pass_mark")],
    secondary: true,
  },
  scored: {
    coach: 56,
    /* Konuşmanın adı · anadildeki adı: veri. */
    eyebrow: 40,
    title: tk("scored.title"),
    pitch: 162,
    /* `SCORED_TURNS`, `SCORED_SECONDS / 60` (lib/conversations/chat-const). */
    rules: [tk("scored.rule_time", { turns: 5, minutes: 3 }), tk("scored.rule_partner"), tk("scored.rule_scoring")],
    detailTitle: tk("scored.patterns_title"),
    detailRows: 3,
    tertiary: tk("common.discard"),
  },
  mock: {
    /* Seviye · deneme no · bölümün hedef dildeki adı. */
    eyebrow: (t) => `B1 · ${t("mockexams.mock_n", { n: 1 })} · ${filler(6)}`,
    title: 24,
    pitch: 97,
    rules: [
      tk("mockexams.part_summary", { minutes: 30, n: 15 }),
      tk("mockexam.rule_timed"),
      tk("mockexam.no_back"),
      tk("mockexam.rule_voiced"),
      tk("mockexam.rule_saved"),
    ],
    /* Temanın ve yönergenin anadildeki karşılığı: veri. */
    note: [23, 84],
    footnote: tk("exam.independent_note"),
    tertiary: tk("mockexam.back_to_list"),
  },
} satisfies Record<string, CoverShape>;
export type CoverKind = keyof typeof COVERS;

/** Kapak alanı: anahtar ise gerçek cümle, sayı ise dolgu. */
function SlotText({ slot, t, ...rest }: { slot: Slot; t: Translate; className?: string; as?: ElementType }) {
  return typeof slot === "number" ? <TextSlot chars={slot} {...rest} /> : <TextSlot text={slot(t)} {...rest} />;
}

/**
 * Kapak iskeleti: `FlowColumn` > (koç satırı) > `CoverBody` (ikon karosu,
 * üst satır, başlık, tanıtım, kural kartı, not, ayrıntı kartı) > `FlowActions`.
 * Kaplar ve yazı sınıfları gerçeğinin kendisi; `FlowColumn` kırılımsız
 * (`max-w-md`), ekranlar arası tek fark metnin sarılması — o da `TextSlot`ta.
 *
 * `kind`: sunucu bileşeni (`loading.tsx`) şekli adıyla veriyor — `COVERS`
 * işlev taşıdığı için sunucudan istemciye prop olarak geçemiyor. İstemci
 * oynatıcıları `{...COVERS.x}` yayabiliyor.
 */
export function CoverSkeleton({ kind, ...shape }: CoverShape & { kind?: CoverKind }) {
  const t = useT();
  const {
    coach = 0,
    eyebrow = 14,
    title = 22,
    pitch = 0,
    rules = [],
    note = [],
    footnote = 0,
    detailTitle = 24,
    detailRows = 0,
    secondary = false,
    tertiary = 0,
  }: CoverShape = kind ? { ...COVERS[kind], ...shape } : shape;
  return (
    <div aria-hidden className="relative mx-auto flex w-full max-w-md flex-col gap-3">
      {coach ? <TextSlot chars={coach} className="text-body leading-snug" /> : null}
      <div className="flex flex-col gap-3">
        <div className="h-14 w-14 animate-pulse rounded-panel" style={{ background: "var(--surface-2)" }} />
        <div>
          <SlotText t={t} slot={eyebrow} className="text-micro uppercase tracking-eyebrow" />
          <SlotText t={t} slot={title} className="text-h1" />
          {pitch ? <SlotText t={t} slot={pitch} className="mt-1 text-body" /> : null}
        </div>
        {rules.length ? (
          <ul className="card flex flex-col gap-3 p-4">
            {rules.map((slot, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="block h-7 w-7 shrink-0 animate-pulse rounded-chip" style={{ background: "var(--surface-2)" }} />
                <SlotText t={t} slot={slot} as="span" className="pt-0.5 text-body" />
              </li>
            ))}
          </ul>
        ) : null}
        {note.length || footnote ? (
          <div className="text-caption">
            {note.map((slot, i) => (
              <SlotText key={i} t={t} slot={slot} as="span" className="block" />
            ))}
            {footnote ? <SlotText t={t} slot={footnote} as="span" className="mt-2 block text-micro" /> : null}
          </div>
        ) : null}
        {detailRows ? (
          <section className="card flex flex-col gap-2 p-4">
            <SlotText t={t} slot={detailTitle} className="text-micro uppercase tracking-eyebrow" />
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
            <SlotText t={t} slot={tertiary} as="span" />
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
  const t = useT();
  const pulse = { background: "var(--surface-2)" };
  return (
    <div aria-hidden className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
      <div className="mb-3 flex shrink-0 items-center gap-3 text-caption">
        <SkeletonTile size={44} />
        <SkeletonBar height={8} className="min-w-0 flex-1" />
        <span className="shrink-0 animate-pulse rounded-full px-2 py-0.5 text-micro uppercase tracking-eyebrow" style={pulse}>
          <span className="invisible">{t("session.chip_new")}</span>
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
