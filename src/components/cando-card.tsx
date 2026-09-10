"use client";

import { useEffect, useState } from "react";
import { SkeletonLine, SkeletonPill } from "@/components/skeleton";
import { EmptyCard } from "@/components/empty-card";
import { CheckIcon } from "@/components/icons";
import { CANDO_LEVELS, CANDO_SKILL_LABEL_KEYS, type Cando } from "@/lib/cando";
import { CardGrid } from "@/components/layout";
import type { CefrLevel } from "@/lib/skills/types";
import { useT } from "@/lib/i18n/client";

type Item = { cando: Cando; state: "proven" | "progressing" | "none"; done: number; total: number };
type Data = { level: string; items: Item[]; byLevel: Record<CefrLevel, { proven: number; total: number }> };

/**
 * "Yapabildiklerim" (WP-43): seviye sekmesi, beceri başına ifadeler; kanıtlı
 * tik, gelişiyor yarım, henüz yok soluk. Kullanıcının seviyesi açık gelir.
 * İfade dili "…yapabilirim": burası bir ölçek değil, bir ayna.
 */
export function CandoCard({ bare = false }: { bare?: boolean } = {}) {
  const t = useT();
  const [data, setData] = useState<Data | null | undefined>(undefined);
  const [level, setLevel] = useState<CefrLevel | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/cando", { cache: "no-store" });
        if (!res.ok) return setData(null);
        const d = (await res.json()) as Data;
        if (!alive) return;
        setData(d);
        setLevel((CANDO_LEVELS as string[]).includes(d.level) ? (d.level as CefrLevel) : "A1");
      } catch {
        setData(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* İskelet kartın gerçek yapısında: başlık satırı, kural cümlesi, beş
     seviye çipi ve üç ifade satırı. Göz kararı yükseklik (220/180) seviye
     çiplerinin yerini hiç ayırmıyordu. */
  if (data === undefined)
    return (
      <section role="status" aria-busy="true" aria-label={t("cando.loading")} className={bare ? "" : "card p-5"}>
        {bare ? null : (
          <div className="flex items-baseline justify-between gap-3">
            <SkeletonLine variant="bodyStrong" width={150} />
            <SkeletonLine variant="caption" width={72} />
          </div>
        )}
        <SkeletonLine variant="micro" width="80%" className="mt-1" />
        <div className="mt-3 flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonPill key={i} width={44} height={28} />
          ))}
        </div>
        <div className="mt-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <SkeletonLine key={i} variant="body" width={`${88 - i * 10}%`} />
          ))}
        </div>
      </section>
    );
  /* VERİ YOKKEN SESSİZ KALMIYOR. Kart kendi sayfasında da çiziliyor ve orada
     `null` dönmek, başlığın altında boş bir sayfa bırakıyordu: hiç ders
     bitirmemiş kullanıcı ekranın bozuk olduğunu sanıyordu. Android sebebi
     söylüyor. Profilin içine gömülü hâlde (`bare`) eskisi gibi hiç
     çizilmiyor - orada boş bir bölüm sayfayı uzatmaktan başka işe yaramaz. */
  if (!data || !level) {
    if (bare) return null;
    return (
      <EmptyCard
        icon={CheckIcon}
        tint="var(--color-mint)"
        title={t("cando.what_i_can_do")}
        text={t("cando.sign_in_and_finish_lessons_and")}
      />
    );
  }
  const shown = data.items.filter((i) => i.cando.level === level);
  const skills = [...new Set(shown.map((i) => i.cando.skill))];
  const provenTotal = data.items.filter((i) => i.state === "proven").length;

  /* `bare`: kendi kartını ve başlığını bırakıp açılır kutunun içeriği oluyor —
     başlığı zaten kutunun kendisi taşıyor, iki kez yazmak gereksiz. */
  return (
    <section id="cando" className={bare ? "" : "card p-5"}>
      {bare ? null : (
        <div className="flex items-baseline justify-between">
          <h2 className="font-bold">{t("lessonp.i_can").replace(":", "")}</h2>
          <span className="muted text-xs font-semibold">{t("candow.n_proven", { n: provenTotal })}</span>
        </div>
      )}
      <p className="muted text-xs">
        {t("candow.rule")}
        {bare ? ` ${t("candow.n_proven", { n: provenTotal })}.` : ""}
      </p>
      {/* Beş seviye çipi telefonda kartın genişliğini aşıyor ve sonuncusu
          (C1) kesiliyordu: kaydırma olmadığı için ulaşılamaz bir sekmeydi.
          Şerit artık kayıyor, kaydırma çubuğu gizli (bkz. globals). */}
      <div className="no-scrollbar -mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-0.5">
        {CANDO_LEVELS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLevel(l)}
            className={`chip shrink-0 px-3 py-1 text-xs font-bold ${l === level ? "chip-active" : ""}`}
            aria-pressed={l === level}
          >
            {l}
            <span className="muted ml-1 font-semibold">
              {data.byLevel[l].proven}/{data.byLevel[l].total}
            </span>
          </button>
        ))}
      </div>
      {/* Beceri bölümleri geniş ekranda sütunlara bölünüyor: mobil bu ekranı
          tablette `CardGrid` ile üçe kadar ayırıyor, web tek sütunda kalıyordu
          ve C1 listesi kabın altında uzayıp gidiyordu. Dar kapta düzen aynı. */}
      <CardGrid min={320} className="mt-3">
        {skills.map((sk) => (
        <div key={sk}>
          <p className="muted text-[11px] font-bold uppercase tracking-wide">{t(CANDO_SKILL_LABEL_KEYS[sk])}</p>
          <ul className="mt-1 space-y-1">
            {shown
              .filter((i) => i.cando.skill === sk)
              .map((i) => (
                <li key={i.cando.id} className="flex items-start gap-2 text-sm">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      background: i.state === "proven" ? "var(--color-mint)" : i.state === "progressing" ? "color-mix(in srgb, var(--color-flame) 25%, transparent)" : "var(--surface-2)",
                      color: i.state === "proven" ? "white" : "var(--text-muted)",
                    }}
                    title={t(i.state === "proven" ? "cando.proven" : i.state === "progressing" ? "cando.progressing" : "cando.not_yet")}
                    aria-hidden
                  >
                    {i.state === "proven" ? <CheckIcon size={12} /> : i.state === "progressing" ? "½" : ""}
                  </span>
                  <span className={i.state === "none" ? "opacity-60" : ""}>
                    {i.cando.tr}
                    {i.total ? <span className="muted ml-1 text-xs">({i.done}/{i.total})</span> : null}
                  </span>
                </li>
              ))}
          </ul>
        </div>
        ))}
      </CardGrid>
    </section>
  );
}
