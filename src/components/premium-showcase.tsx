"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/client";
import { IconLine } from "@/components/icon-line";

/**
 * Premium ekranının ürün vitrini — "yapay zekâyla konuşarak çalış" sözünün
 * kendisi: bir Konuşma adımı, bir yazma geri bildirimi ve bir deneme sınavı
 * sonucu.
 *
 * DİL KURALI (Samet, 2026-09-29): konuşma ve metin ÖĞRENİLEN dilde, düzeltmenin
 * açıklaması ANADİLDE. Uygulamanın kendisi böyle çalışıyor; vitrin başka bir
 * dil çiftini göstermesin. Hedef dildeki cümleler sözlükte üç dilde de aynı
 * değerle duruyor (`paywall.show1_ask.de` gibi), açıklama arayüz dilinde.
 *
 * Anahtarlar DÜZ YAZILI: sözlük denetimi kodda geçen anahtarı arıyor, kurulmuş
 * bir ad (`paywall.show1_ask.${course}`) onu ölü sanardı.
 *
 * Mobil karşılığı `mobile/src/screens/PaywallScreen.tsx` `Showcase`; iki
 * yüzey aynı anahtarları ve aynı sayıları kullanıyor.
 */
const SHOW = {
  de: {
    ask: "paywall.show1_ask.de",
    reply: "paywall.show1_reply.de",
    fix: "paywall.show1_fix.de",
    why: "paywall.show1_why.de",
    text: "paywall.show2_text.de",
    fix2: "paywall.show2_fix.de",
    why2: "paywall.show2_why.de",
  },
  en: {
    ask: "paywall.show1_ask.en",
    reply: "paywall.show1_reply.en",
    fix: "paywall.show1_fix.en",
    why: "paywall.show1_why.en",
    text: "paywall.show2_text.en",
    fix2: "paywall.show2_fix.en",
    why2: "paywall.show2_why.en",
  },
} as const;

/** Deneme sınavı örneği: bölüm ve puan (20 üzerinden). Gösterim, ölçüm değil. */
const EXAM: [string, number][] = [
  ["skills.reading", 18],
  ["skills.listening", 15],
  ["skills.writing", 14],
  ["skills.speaking", 16],
];

export function PremiumShowcase({ course, withExam }: { course: string; withExam: boolean }) {
  const t = useT();
  const k = SHOW[course === "en" ? "en" : "de"];
  const slides = withExam ? 3 : 2;
  const [i, setI] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={t("paywall.show_a11y")}
        className="flex w-full max-w-md flex-col gap-2.5 rounded-card p-4 shadow-soft-lg"
        style={{ background: "var(--surface)", color: "var(--text)" }}
      >
        {i === 0 && (
          <>
            <Label text={t("paywall.show1_label")} />
            <Bubble side="left" text={t(k.ask)} />
            <Bubble side="right" text={t(k.reply)} />
            <Fix fix={t(k.fix)} why={t(k.why)} />
          </>
        )}
        {i === 1 && (
          <>
            <Label text={t("paywall.show2_label")} />
            <p className="rounded-tile px-3 py-2.5 text-body" style={{ background: "var(--surface-2)" }}>
              {t(k.text)}
            </p>
            <Fix fix={t(k.fix2)} why={t(k.why2)} />
          </>
        )}
        {i === 2 && (
          <>
            <Label text={t("paywall.show3_label")} />
            <div className="flex flex-col gap-2">
              {EXAM.map(([key, score]) => (
                <div key={key} className="grid grid-cols-[6rem_minmax(0,1fr)_2.5rem] items-center gap-3 text-caption">
                  <span className="muted">{t(key)}</span>
                  <span className="h-2 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
                    <span className="block h-full rounded-full" style={{ width: `${(score / 20) * 100}%`, background: "var(--color-mint)" }} />
                  </span>
                  <span className="text-right text-strong tabular-nums">{score}/20</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: slides }, (_, n) => (
          <button
            key={n}
            type="button"
            onClick={() => setI(n)}
            aria-label={t("paywall.show_page", { n: n + 1 })}
            aria-pressed={n === i}
            className="hit-8 flex h-6 items-center justify-center"
          >
            <span
              className="block h-1.5 rounded-full transition-all"
              style={{ width: n === i ? 18 : 6, background: "var(--on-brand)", opacity: n === i ? 1 : 0.5 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Label({ text }: { text: string }) {
  return (
    <span className="muted flex items-center gap-2 text-caption font-bold">
      <span className="h-2 w-2 rounded-full" style={{ background: "var(--color-mint)" }} />
      {text}
    </span>
  );
}

function Bubble({ side, text }: { side: "left" | "right"; text: string }) {
  const left = side === "left";
  return (
    <span
      className={`max-w-[85%] px-3.5 py-2 text-body ${left ? "self-start" : "self-end"}`}
      style={{
        background: left ? "var(--surface-2)" : "var(--brand-soft)",
        color: left ? "var(--text)" : "var(--on-brand-soft)",
        borderRadius: left ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
      }}
    >
      {text}
    </span>
  );
}

function Fix({ fix, why }: { fix: string; why: string }) {
  return (
    <span
      className="flex items-start gap-2 rounded-tile px-3 py-2.5 text-caption"
      style={{ background: "color-mix(in srgb, var(--color-mint-500) 12%, transparent)" }}
    >
      <IconLine>
        <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-mint)" }}>
          <path d="M12 3v2M12 19v2M5 12H3M21 12h-2" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </IconLine>
      <span>
        <b>{fix}</b> <span className="muted">{why}</span>
      </span>
    </span>
  );
}
