"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-fetch";
import { useT, useLang } from "@/lib/i18n/client";
import { formatPercent, type NativeLang } from "@/lib/i18n/dict";
import { READY_AT } from "@/lib/level-readiness-score";
import { CheckIcon, ChevronNextIcon } from "@/components/icons";

/* "Şimdilik kalsın" denen geçiş bir daha sorulmaz (aynı hedef seviye için). */
const DISMISS_KEY = "lernomi-level-advance-dismissed";
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

export type LevelProgressData = {
  level: string;
  next: string | null;
  readiness: { vocab: number; path: number; total: number; ready: boolean };
  advance: string | null;
};

/**
 * SEVİYE İLERLEMESİ (docs/plan/level-progress.md) — mobil `M/src/ui/LevelProgress` ile aynı iki yer
 * (Samet, 2026-10-17: Öğren'de içeriği gereksiz yere genişletiyordu):
 *   Gelişim (`place="progress"`)  hazırlık kartı: kelime/Patika kırılımı, %60'ta seviye sınavı
 *             çağrısı, öncesinde "şimdi gir".
 *   Öğren (`place="learn"`)  yalnız yapılacak bir şey varsa: %60'ı geçince tek satır "sınava
 *             hazırsın", sınav geçildiyse "B2'ye geçelim mi?" (seviye yalnız kabulde değişir).
 */
export function LevelProgress({ status, place }: { status: LevelProgressData; place: "learn" | "progress" }) {
  const t = useT();
  const lang = useLang() as NativeLang;
  const router = useRouter();
  const [dismissed, setDismissed] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    try { setDismissed(localStorage.getItem(DISMISS_KEY)); } catch { /* depolama kapalı */ }
  }, []);

  if (place === "learn" && status.advance && status.advance !== dismissed) {
    const to = status.advance;
    const passed = LEVELS[LEVELS.indexOf(to) - 1] ?? status.level;
    const later = () => {
      setDismissed(to);
      try { localStorage.setItem(DISMISS_KEY, to); } catch { /* depolama kapalı */ }
    };
    const yes = async () => {
      setBusy(true);
      try {
        await apiFetch("/api/level", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "advance", to }) });
        router.refresh();
      } catch { /* kart kalır */ }
      setBusy(false);
    };
    return (
      <section role="status" className="card mb-5 grid gap-2 p-5">
        <h2 className="text-h3">{t("lvl.advance_title", { level: passed })}</h2>
        <p className="muted">{t("lvl.advance_body", { to })}</p>
        <div className="mt-1 grid grid-cols-2 gap-2">
          <button type="button" disabled={busy} onClick={later} className="btn btn-ghost px-4 py-2.5">{t("lvl.advance_later")}</button>
          <button type="button" disabled={busy} onClick={() => void yes()} className="btn btn-primary px-4 py-2.5">{t("lvl.advance_yes", { to })}</button>
        </div>
      </section>
    );
  }

  const r = status.readiness;
  if (place === "learn") {
    if (!r.ready) return null;
    return (
      <Link href={`/exam/${status.level}`} prefetch={false} aria-label={`${t("lvl.ready_now", { level: status.level })}. ${t("lvl.take_exam", { level: status.level })}`}
        className="pressable card mb-5 flex items-center gap-3 p-4">
        <CheckIcon aria-hidden className="h-5 w-5 shrink-0 text-success" />
        <span className="text-strong min-w-0 flex-1">{t("lvl.ready_now", { level: status.level })}</span>
        <ChevronNextIcon aria-hidden className="muted h-5 w-5 shrink-0" />
      </Link>
    );
  }
  return (
    <section className="card grid gap-2 p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-h3">{t("lvl.ready_title", { level: status.level })}</h2>
        <span className={`text-strong tabular-nums ${r.ready ? "text-success" : ""}`}>{formatPercent(r.total, lang)}</span>
      </div>
      <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={r.total} aria-label={t("lvl.ready_title", { level: status.level })} className="h-2 overflow-hidden rounded-full surface-2">
        <div className={`h-full rounded-full ${r.ready ? "bg-success" : "brand-gradient"}`} style={{ width: `${Math.max(2, r.total)}%` }} />
      </div>
      <p className="muted text-caption">{t("lvl.ready_parts", { vocab: formatPercent(r.vocab, lang), path: formatPercent(r.path, lang) })}</p>
      {r.ready ? (
        <Link href={`/exam/${status.level}`} prefetch={false} className="btn btn-primary mt-1 px-4 py-2.5 text-center">{t("lvl.ready_now", { level: status.level })}</Link>
      ) : (
        <>
          <p className="muted text-caption">{t("lvl.ready_hint", { pct: formatPercent(READY_AT, lang), level: status.level })}</p>
          <Link href={`/exam/${status.level}`} prefetch={false} className="link text-caption">{t("lvl.skip_ahead")} · {t("lvl.take_exam", { level: status.level })}</Link>
        </>
      )}
    </section>
  );
}
