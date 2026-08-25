"use client";

import type { DiffSeg } from "@/lib/why";
import type { TokenMark } from "@/lib/sentence-match";

/**
 * Fark vurgusu (plan WP-61) — iki düzey, tek dil:
 *
 *   CharDiff  — kelime içinde harf farkı (yazım): yazılanda fazla harf üstü
 *               çizili, doğrusunda eksik harf altı çizili kalın.
 *   TokenDiff — cümlede kelime farkı: eksik altı çizili, yer değiştirmiş ↔
 *               ile gölgeli, yazım hatalı noktalı altı çizili; öğrencinin
 *               satırında fazla kelime üstü çizili.
 *
 * Her ikisi de ekran okuyucu için düz metin açıklaması taşır (aria-label):
 * vurgu yalnız renkle değil, biçimle de ayrışır (hareket azaltma ve renk
 * körlüğü için). Şerit, çeviri turu, drill (WP-11) ve yazma değerlendirmesi
 * (WP-30) aynı bileşeni kullanır — fark her yerde aynı okunur.
 */

export function CharDiff({ diff }: { diff: { typed: DiffSeg[]; target: DiffSeg[] } }) {
  const plain = `Yazılan: ${diff.typed.map((s) => s.text).join("")}. Doğrusu: ${diff.target.map((s) => s.text).join("")}.`;
  return (
    <span aria-label={plain}>
      <span aria-hidden lang="de">
        {diff.typed.map((s, i) =>
          s.kind === "extra" ? (
            <s key={i} className="opacity-70">
              {s.text}
            </s>
          ) : (
            <span key={i}>{s.text}</span>
          ),
        )}
        {" → "}
        {diff.target.map((s, i) =>
          s.kind === "missing" ? (
            <strong key={i} className="underline decoration-2 underline-offset-2">
              {s.text}
            </strong>
          ) : (
            <span key={i}>{s.text}</span>
          ),
        )}
      </span>
    </span>
  );
}

export type MarkedToken = { text: string; mark: TokenMark };

const TITLE: Record<TokenMark, string | undefined> = {
  same: undefined,
  missing: "eksik",
  extra: "fazla",
  moved: "yeri yanlış",
  typo: "yazım",
};

/** Doğru cümle, farkla işaretli. */
export function TokenDiff({ tokens, lang = "de" }: { tokens: MarkedToken[]; lang?: string }) {
  const plain = tokens
    .map((t) => (t.mark === "same" ? t.text : `${t.text} (${TITLE[t.mark]})`))
    .join(" ");
  return (
    <strong lang={lang} aria-label={plain}>
      {tokens.map((t, i) => (
        <span
          key={i}
          aria-hidden
          title={TITLE[t.mark]}
          className={
            t.mark === "missing"
              ? "underline decoration-2 underline-offset-2"
              : t.mark === "moved"
                ? "rounded px-0.5"
                : t.mark === "typo"
                  ? "underline decoration-dotted underline-offset-2"
                  : ""
          }
          style={t.mark === "moved" ? { background: "color-mix(in srgb, currentColor 16%, transparent)" } : undefined}
        >
          {t.mark === "moved" ? "↔" : ""}
          {t.text}
          {i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </strong>
  );
}

/** Öğrencinin cümlesi: fazla kelime üstü çizili, yer değiştirmiş/yazım işaretli. */
export function TypedTokens({ tokens, lang = "de" }: { tokens: MarkedToken[]; lang?: string }) {
  const plain = tokens.map((t) => (t.mark === "same" ? t.text : `${t.text} (${TITLE[t.mark]})`)).join(" ");
  return (
    <span lang={lang} aria-label={plain}>
      {tokens.map((t, i) => (
        <span
          key={i}
          aria-hidden
          className={t.mark === "extra" ? "line-through opacity-70" : t.mark === "typo" ? "underline decoration-dotted" : t.mark === "moved" ? "opacity-80" : ""}
        >
          {t.text}
          {i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/** İşaretlerin ne anlama geldiği — hikâye sayfası ve yardım metinleri için. */
export function DiffLegend() {
  return (
    <ul className="muted flex flex-wrap gap-x-4 gap-y-1 text-xs">
      <li>
        <span className="underline decoration-2 underline-offset-2">eksik</span>
      </li>
      <li>
        <span className="rounded px-0.5" style={{ background: "color-mix(in srgb, currentColor 16%, transparent)" }}>
          ↔yeri yanlış
        </span>
      </li>
      <li>
        <span className="underline decoration-dotted underline-offset-2">yazım</span>
      </li>
      <li>
        <s className="opacity-70">fazla</s>
      </li>
    </ul>
  );
}
