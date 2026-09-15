"use client";

import type { CSSProperties, ReactNode } from "react";
import type { DiffSeg } from "@/lib/why";
import type { TokenMark } from "@/lib/sentence-match";
import { useT } from "@/lib/i18n/client";

/**
 * Sonuç katmanının fark dili — mobil `ui/TokenDiff` (`markTone`,
 * `MarkedSentence`, `CharMarked`, `Chip`, `DiffLines`) karşılığı.
 *
 * `diff-text`teki `TokenDiff`/`TypedTokens` hâlâ sınav oynatıcısında ve yazma
 * değerlendirmesinde çiziliyor; katman ise artık bu bileşenleri kullanıyor.
 * Oradaki "↔" ve açıklamasız alt çizgi burada yok: her işaretin bir rengi var
 * ve AYNI renk "Farklar" satırındaki etikette tekrar ediyor (eksik = kırmızı,
 * sıra = mavi, yazım = sarı, fazla = üstü çizili soluk). Renk tek taşıyıcı
 * değil — etiketin metni ve alt/üstü çizgi aynı şeyi söylüyor.
 *
 * Mürekkep rol takma adı (açık temada 600, koyuda 300), zemin ailenin 500'ü
 * %14 (`.tint-soft`) — mobil `*Text` + `soft()` çifti.
 */
export type MarkedToken = { text: string; mark: TokenMark; typed?: string };

type Mark = Exclude<TokenMark, "same">;

const TITLE_KEYS: Record<Mark, string> = {
  missing: "diff.missing",
  extra: "diff.extra",
  moved: "diff.moved",
  typo: "diff.typo",
};

const CHIP_KEYS: Record<Mark, string> = {
  missing: "diff.missing",
  moved: "diff.chip_moved",
  typo: "diff.typo",
  extra: "diff.extra",
};

/** İşaretin mürekkebi ve yumuşak zemini. */
export function markTone(mark: TokenMark): { fg: string; soft: string } {
  switch (mark) {
    case "missing":
      return { fg: "var(--color-rose)", soft: "var(--color-rose-500)" };
    case "moved":
      return { fg: "var(--color-sky)", soft: "var(--color-sky-500)" };
    case "typo":
      return { fg: "var(--color-flame)", soft: "var(--color-flame-500)" };
    case "extra":
      return { fg: "var(--text-muted)", soft: "" };
    default:
      return { fg: "var(--text)", soft: "" };
  }
}

function usePlain() {
  const t = useT();
  return (tokens: MarkedToken[]) =>
    tokens.map((k) => (k.mark === "same" ? k.text : `${k.text} (${t(TITLE_KEYS[k.mark])})`)).join(" ");
}

/** Cümle, kelime kelime işaretli; cümle sonu noktalaması (`tail`) son kelimeye yapışık. */
export function MarkedSentence({
  tokens,
  tail = "",
  strong = true,
  lang = "de",
}: {
  tokens: MarkedToken[];
  tail?: string;
  strong?: boolean;
  lang?: string;
}) {
  const plain = usePlain();
  return (
    <span
      lang={lang}
      aria-label={plain(tokens) + tail}
      style={{ color: strong ? "var(--text)" : "var(--text-muted)" }}
    >
      {tokens.map((tk, i) => (
        <span
          key={i}
          aria-hidden
          className={
            tk.mark === "same"
              ? undefined
              : tk.mark === "extra"
                ? "line-through"
                : "underline decoration-2 underline-offset-2"
          }
          style={tk.mark === "same" ? undefined : { color: markTone(tk.mark).fg }}
        >
          {tk.text}
          {i < tokens.length - 1 ? " " : tail}
        </span>
      ))}
    </span>
  );
}

/** Harf düzeyinde fark (yazım): doğrusunda eksik harf, yazılanda fazla harf işaretli. */
export function CharMarked({ segs, side, lang = "de" }: { segs: DiffSeg[]; side: "target" | "typed"; lang?: string }) {
  return (
    <span lang={lang} style={{ color: side === "target" ? "var(--text)" : "var(--text-muted)" }}>
      {segs.map((sg, i) =>
        sg.kind === "same" ? (
          <span key={i}>{sg.text}</span>
        ) : side === "target" && sg.kind === "missing" ? (
          <span key={i} className="underline decoration-2 underline-offset-2" style={{ color: "var(--color-rose)" }}>
            {sg.text}
          </span>
        ) : side === "typed" && sg.kind === "extra" ? (
          <span key={i} className="line-through" style={{ color: "var(--text-faint)" }}>
            {sg.text}
          </span>
        ) : null,
      )}
    </span>
  );
}

/** Küçük etiket — farkın ya da hata tipinin adı. `tone` verilmezse nötr. */
export function Chip({ label, tone }: { label: ReactNode; tone?: TokenMark }) {
  const t = tone ? markTone(tone) : null;
  const tinted = Boolean(t?.soft);
  return (
    <span
      className={`${tinted ? "tint-soft " : ""}inline-block shrink-0 rounded-chip px-1.5 py-px text-micro uppercase tracking-eyebrow`}
      style={
        tinted
          ? ({ "--tint-fill": t!.soft, "--tint-ink": t!.fg } as CSSProperties)
          : { background: "var(--surface-2)", color: t ? t.fg : "var(--text)" }
      }
    >
      {label}
    </span>
  );
}

/**
 * Farklar, düz dille ve satır satır: "herunterfahren yazılmamış", "Kinno →
 * Kino", "fahren fazla". Sıra: eksik, yazım, yanlış yer, fazla — önce cevapta
 * olması gereken, sonra yazılıp gereksiz olan.
 */
export function DiffLines({ target, typed }: { target: MarkedToken[]; typed: MarkedToken[] }) {
  const t = useT();
  const lines: { mark: Mark; text: string }[] = [
    ...target.filter((k) => k.mark === "missing").map((k) => ({ mark: "missing" as const, text: t("diff.line_missing", { word: k.text }) })),
    ...target
      .filter((k) => k.mark === "typo")
      .map((k) => ({ mark: "typo" as const, text: k.typed ? t("diff.line_typo", { typed: k.typed, word: k.text }) : k.text })),
    ...target.filter((k) => k.mark === "moved").map((k) => ({ mark: "moved" as const, text: t("diff.line_moved", { word: k.text }) })),
    ...typed.filter((k) => k.mark === "extra").map((k) => ({ mark: "extra" as const, text: t("diff.line_extra", { word: k.text }) })),
  ];
  if (!lines.length) return null;
  return (
    <ul className="flex flex-col gap-1">
      {lines.map((l, i) => (
        <li key={i} className="flex flex-wrap items-center gap-1.5">
          <Chip label={t(CHIP_KEYS[l.mark])} tone={l.mark} />
          <span className="text-caption" style={{ color: "var(--text)" }}>
            {l.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
