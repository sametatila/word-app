"use client";

import type { CSSProperties, ReactNode } from "react";
import type { DiffSeg } from "@/lib/why";
import { diffLines, type DiffLine, type DiffLineKind, type TokenMark } from "@/lib/sentence-match";
import type { TargetLang } from "@/lib/courses";
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

/** Satır türünün etiketi ve rengi: biçim yazımın sarısı, başka kelime eksiğin kırmızısı. */
const LINE_CHIP: Record<DiffLineKind, { key: string; tone: Mark }> = {
  missing: { key: "diff.missing", tone: "missing" },
  typo: { key: "diff.typo", tone: "typo" },
  form: { key: "diff.chip_form", tone: "typo" },
  word: { key: "diff.chip_word", tone: "missing" },
  moved: { key: "diff.chip_moved", tone: "moved" },
  extra: { key: "diff.extra", tone: "extra" },
};

/**
 * Farklar, düz dille ve satır satır: "herunterfahren yazılmamış", "Kinno →
 * Kino", "Tag → Tage", "fahren fazla". Satırlar hakemin eşlemesinden
 * (`diffLines`): aynı yerdeki eksik ve fazla kelime tek satır — biçim farkı
 * "biçim", başka kelime "kelime" etiketiyle (QA F-0020). Sıra hedef cümlenin
 * sırası, fazlalar sonda. Konuşmadaki üretim adımı `DiffLineList`i doğrudan
 * çiziyor. Mobil `ui/TokenDiff` aynı iki bileşen.
 */
export function DiffLines({ target, typed, lang = "de" }: { target: MarkedToken[]; typed: MarkedToken[]; lang?: TargetLang }) {
  return <DiffLineList lines={diffLines(target, typed, lang)} />;
}

export function DiffLineList({ lines }: { lines: DiffLine[] }) {
  const t = useT();
  if (!lines.length) return null;
  const text = (l: DiffLine) =>
    l.kind === "missing"
      ? t("diff.line_missing", { word: l.word })
      : l.kind === "moved"
        ? t("diff.line_moved", { word: l.word })
        : l.kind === "extra"
          ? t("diff.line_extra", { word: l.word })
          : l.typed
            ? t("diff.line_typo", { typed: l.typed, word: l.word })
            : l.word;
  return (
    <ul className="flex flex-col gap-1">
      {lines.map((l, i) => (
        <li key={i} className="flex flex-wrap items-center gap-1.5">
          <Chip label={t(LINE_CHIP[l.kind].key)} tone={LINE_CHIP[l.kind].tone} />
          <span className="text-caption" style={{ color: "var(--text)" }}>
            {text(l)}
          </span>
        </li>
      ))}
    </ul>
  );
}
