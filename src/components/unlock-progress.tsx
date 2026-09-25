"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/client";
import { CheckIcon, CrownIcon, FlameIcon, LockIcon } from "@/components/icons";
import { Confetti } from "@/components/celebrate";
import type { Line, UnlockCopy } from "@/lib/premium/unlock-copy";

/**
 * KİLİT AÇMA GÖSTERGESİ — "ne yapacağım" sorusunun cevabı, kilidin yanında.
 *
 * Karar ve sayılar sunucuda (`lib/premium/unlock`), cümle seçimi
 * `lib/premium/unlock-copy`te; bu bileşen yalnız çiziyor: başlık (kalan hak),
 * ✓ işaretli koşullar, seri çubuğu (x/7), "ne zaman" cümlesi ve Premium'la hemen
 * açma bağlantısı. Mobildeki eşi aynı dört parçayı aynı sırayla çiziyor.
 *
 * KUTLAMA. `celebrate` verilirse (yüzey+seviye anahtarı ve açık hak sayısı)
 * sayı öncekinden büyüdüğünde kısa konfeti ve "Yeni hak açıldı!" satırı. Önceki
 * sayı bu tarayıcıda tutuluyor (localStorage, try/catch): İLK görüşte kutlama
 * yok — "açıldı" demek için neyin kapalı olduğunu bilmek gerekiyor. Hareket
 * azaltma açıksa `Confetti` hiç çizmiyor, satır yine görünüyor.
 */
export function UnlockProgress({
  copy,
  title,
  celebrate,
  compact = false,
}: {
  copy: UnlockCopy | null;
  /** Kilitli yüzeyde başlığın üstüne (ör. `unlock.locked_conv`). */
  title?: Line;
  celebrate?: { key: string; open: number; gain?: Line };
  /** Liste satırı içinde: yalnız başlık + tek cümle. */
  compact?: boolean;
}) {
  const t = useT();
  const line = (l: Line) => t(l.key, l.params);
  const fired = useUnlockCelebration(celebrate?.key, celebrate?.open);

  if (!copy && !fired) return null;
  const when = copy?.when ? t(copy.when.key, { ...copy.when.params, gain: line(copy.when.gain) }) : null;

  return (
    <section className="card relative space-y-2 p-4" aria-live={fired ? "polite" : undefined}>
      <Confetti fire={fired} />
      {fired ? (
        <p className="flex items-center gap-2 text-strong" style={{ color: "var(--color-mint)" }}>
          <CheckIcon className="size-4 shrink-0" /> {t("unlock.celebrate")}
          {celebrate?.gain ? <span className="font-normal">{line(celebrate.gain)}</span> : null}
        </p>
      ) : null}
      {title ? (
        <p className="flex items-center gap-2 text-h3">
          <LockIcon className="size-4 shrink-0" /> {line(title)}
        </p>
      ) : null}
      {copy?.headline ? (
        <p className={`text-body ${copy.spent ? "" : "font-semibold"}`}>{line(copy.headline)}</p>
      ) : null}
      {!compact && copy?.conditions.length ? (
        <div className="space-y-2">
          <p className="muted text-micro tracking-wide">{t("unlock.title")}</p>
          <ul className="space-y-2">
            {copy.conditions.map((c) => (
              <li key={c.line.key} className="text-body">
                <span className="flex items-center gap-2">
                  {c.ok ? (
                    <CheckIcon className="size-4 shrink-0" style={{ color: "var(--color-mint)" }} aria-hidden />
                  ) : c.bar ? (
                    <FlameIcon className="size-4 shrink-0" style={{ color: "var(--color-flame)" }} aria-hidden />
                  ) : (
                    <span aria-hidden className="inline-block size-4 shrink-0 rounded-full border-2" style={{ borderColor: "var(--border)" }} />
                  )}
                  <span className={c.ok ? "muted" : undefined}>{line(c.line)}</span>
                </span>
                {c.bar ? (
                  <span
                    className="mt-1.5 ml-6 block h-1.5 rounded-full"
                    style={{ background: "var(--surface-2)" }}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={c.bar.need}
                    aria-valuenow={c.bar.cur}
                  >
                    <span
                      className="block h-1.5 rounded-full"
                      style={{ width: `${Math.min(100, Math.round((100 * c.bar.cur) / Math.max(1, c.bar.need)))}%`, background: "var(--color-flame)" }}
                    />
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {when ? <p className="text-body">{when}</p> : null}
      {copy?.max ? <p className="muted text-caption">{t("unlock.max")}</p> : null}
      {copy?.spent ? (
        <Link href="/premium" prefetch={false} className="btn btn-primary mt-1 flex w-full items-center justify-center gap-2 px-4 py-2.5 text-body">
          <CrownIcon className="size-4" /> {t("unlock.premium_now")}
        </Link>
      ) : null}
    </section>
  );
}

/**
 * Açık hak sayısı bu tarayıcıda görülen son değerden büyüdüyse bir kez ateşler
 * (dönen sayı `Confetti`nin `fire`ı). İlk görüşte yalnız kaydeder.
 */
export function useUnlockCelebration(key: string | undefined, open: number | undefined): number {
  const [fire, setFire] = useState(0);
  useEffect(() => {
    if (!key || open === undefined) return;
    const k = `lernomi.unlock.${key}`;
    let prev: number | null = null;
    try {
      const raw = window.localStorage.getItem(k);
      prev = raw === null ? null : Number(raw);
      window.localStorage.setItem(k, String(open));
    } catch {
      return;
    }
    if (prev !== null && Number.isFinite(prev) && open > prev) setFire(Date.now());
  }, [key, open]);
  return fire;
}
