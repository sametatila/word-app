"use client";

import { useState } from "react";
import { errorText, social } from "@/lib/social/client";
import { REACTION_KINDS, REACTION_LABEL_KEYS, type ReactionKind, type ReactionSummary } from "@/lib/social/types";
import { ReactionGlyph, REACTION_TONE, REACTION_FILL } from "./reaction-icons";
import { useT } from "@/lib/i18n/client";
import { ErrorText } from "./error-text";
import { vibrate } from "@/lib/fx";

/**
 * Tepki çubuğu: mevcut tepkiler sayılarıyla, "+" ile altı seçenek. Kendi
 * tepkim vurgulu; aynı ikona ikinci dokunuş geri alır. Sohbetin yerine geçen
 * TEK ifade biçimi bu olduğu için altı tür de her zaman erişilebilir.
 */
export function ReactionBar({
  eventId,
  summary,
  disabled = false,
  onChange,
}: {
  eventId: number;
  summary: ReactionSummary;
  /** Kendi olayım ya da arkadaş değil — bakılır, dokunulmaz. */
  disabled?: boolean;
  onChange?: (next: ReactionSummary) => void;
}) {
  const t = useT();
  const [s, setS] = useState<ReactionSummary>(summary);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pick(kind: ReactionKind) {
    if (busy || disabled) return;
    setBusy(true);
    setErr(null);
    try {
      /* Dokunus geri bildirimi — Android ayni yerde veriyor
         (`social/ReactionBar`). */
      vibrate("tap");
      const next = s.mine === kind ? await social.unreact(eventId) : await social.react(eventId, kind);
      setS(next);
      onChange?.(next);
      setOpen(false);
    } catch (e) {
      setErr(errorText(e));
    } finally {
      setBusy(false);
    }
  }

  const present = REACTION_KINDS.filter((k) => (s.counts[k] ?? 0) > 0);
  const who = s.names.length ? `${s.names.map((n) => n ?? t("social.unnamed")).join(", ")}${s.total > s.names.length ? t("social.and_others", { n: s.total - s.names.length }) : ""}` : "";

  return (
    /* Blok, satır değil: `who` Android'de hapların ALTINDA kendi satırında
       duruyor (`social/ReactionBar`), webde aynı satıra karışıyordu ve ancak
       yer kalmayınca alta düşüyordu. Üst boşluk da 8'den 12'ye (spacing.md). */
    <div className="mt-3">
      {/* TEK SEÇİMLİK TEPKİ ŞERİDİ RADYO GRUBUDUR. Aynı dosyanın SEÇİCİ
          şeridi (aşağıda) zaten öyleydi; okunan şerit `aria-pressed` ile
          kalmıştı. Android ikisini de `accessibilityRole="radio"` ile veriyor
          (`social/ReactionBar`). */}
      <div role="radiogroup" aria-label={t("reactionbar.react")} className="flex flex-wrap items-center gap-1.5">
      {present.map((k) => (
        <button
          key={k}
          type="button"
          disabled={disabled || busy}
          onClick={() => void pick(k)}
          className="chip flex h-7 items-center gap-1 px-2 text-caption"
          /*
           * HER TEPKİ KENDİ RENGİNDE. Haplar yalnız SEÇİLİ olan renkliydi,
           * geri kalanı nötr çipti: akışta hangi tepkinin verildiği renkten
           * okunmuyordu, oysa Android hepsini kendi tintinde çiziyor.
           *
           * Seçili hâl Android'de DOLU zemin + `onFill` yazı; webde daha
           * güçlü tint olarak kalıyor çünkü ölçüm dolu zemini kaldırmıyor:
           * açık temada beyaz yazı marka-600 üstünde 3.72 (küçük yazı eşiği
           * 4.5). Tint üstünde tonun kendisi ikisinde de yüksek kontrast.
           */
          style={
            s.mine === k
              /* SEÇİLİ HÂL DOLU. Android aynı çipi seçilince tonun kendisiyle
                 dolduruyor ve yazıyı `onFill` yapıyor (`social/ReactionBar`:
                 `mine ? tone : soft(tone)`); web %22'lik bir tintle
                 yetiniyordu, yani "benim tepkim" ile "boş" arasındaki fark
                 bir ton koyuluktan ibaretti. Seçilmemiş hâl de ortak orana
                 çekildi (%13 → %14, zemin ailenin 500'ü). */
              ? { background: REACTION_TONE[k], color: "var(--on-fill)", borderColor: REACTION_TONE[k] }
              : { background: `color-mix(in srgb, ${REACTION_FILL[k]} 14%, transparent)`, color: REACTION_TONE[k], borderColor: "transparent" }
          }
          role="radio"
          aria-checked={s.mine === k}
          aria-label={`${t(REACTION_LABEL_KEYS[k])} ${s.counts[k]}`}
        >
          <ReactionGlyph kind={k} size={14} />
          <span className="tabular-nums">{s.counts[k]}</span>
        </button>
      ))}
      {!disabled ? (
        <button
          type="button"
          className="chip h-7 px-2.5 text-caption"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          data-panel="reactions"
          aria-label={t("reactionbar.react")}
          disabled={busy}
        >
          {t(s.mine ? "social.reaction_change" : "social.reaction_add")}
        </button>
      ) : null}
      </div>
      {/*
        SEÇİCİ ARTIK ÖRTÜ DEĞİL, SATIR — Android'deki gibi.

        Web panelini `absolute z-10 shadow-lg` ile içeriğin ÜSTÜNE açıyor ve
        `onMouseLeave` ile kapatıyordu. Üç sorun birden:

          - `onMouseLeave` FARE-ÖZEL. Dokunmatikte panel içeriği örtüyor ve
            kendiliğinden kapanmıyor; klavyede de kapanmıyor (Escape yok).
          - `role="menu"` AT'ye "burada ok tuşlarıyla gezinilir" diyor ve ok
            tuşları çalışmıyordu — tutulmayan bir söz.
          - Odak paneline taşınmıyor, dönüşü de yönetilmiyordu.

        Android'in çözümü daha basit ve bu üç sorunun hiçbirini taşımıyor:
        panel çubuğun ALTINDA normal bir satır olarak açılıyor, içeriği
        örtmüyor, tetiğe ikinci dokunuş kapatıyor (`ReactionBar`). Web de
        öyle yapıyor; örtü kalktığı için Escape ve odak dönüşü sorusu da
        kendiliğinden ortadan kalkıyor.

        Anlambilim de buna göre: satır bir menü değil, tek seçimli bir grup —
        `radiogroup` + `radio`, Android'in `accessibilityRole="radio"`su ile
        aynı.
      */}
      {open && !disabled ? (
        <div className="mt-2 flex justify-between gap-1" role="radiogroup" aria-label={t("reactionbar.react")}>
          {REACTION_KINDS.map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={s.mine === k}
              aria-label={t(REACTION_LABEL_KEYS[k])}
              onClick={() => void pick(k)}
              /* Seçili karo DOLU ve glifi `on-fill` — Android'in aynı seçici
                 karosu öyle (`social/ReactionBar`: `mine ? tone : soft(tone)`
                 + `onFill`). Web %18'lik bir tintle yetiniyordu. Seçilmemiş
                 karo Android'de yumuşak tint taşıyor; web'de zeminsizdi. */
              className="flex h-11 w-11 items-center justify-center rounded-tile transition-transform hover:scale-110"
              style={
                s.mine === k
                  ? { background: REACTION_TONE[k], color: "var(--on-fill)" }
                  : { background: `color-mix(in srgb, ${REACTION_FILL[k]} 14%, transparent)` }
              }
            >
              <ReactionGlyph kind={k} size={22} color={s.mine === k ? "var(--on-fill)" : undefined} />
            </button>
          ))}
        </div>
      ) : null}
      {who ? <p className="mt-1.5 text-micro" style={{ color: "var(--text-faint)" }}>{who}</p> : null}
      <ErrorText text={err} className="mt-1.5 text-micro" />
    </div>
  );
}
