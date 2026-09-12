"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SkeletonBar, SkeletonCard, SkeletonLine, SkeletonTile } from "@/components/skeleton";
import { EmptyCard } from "@/components/empty-card";
import { AlertIcon, CheckIcon } from "@/components/icons";
import { CANDO_LEVELS, CANDO_SKILL_LABEL_KEYS, type Cando, type CandoSkill } from "@/lib/cando";
import { CardGrid } from "@/components/layout";
import type { CefrLevel } from "@/lib/skills/types";
import { useT } from "@/lib/i18n/client";

type Item = { cando: Cando; state: "proven" | "progressing" | "none"; done: number; total: number };
type Data = { level: string; items: Item[]; byLevel: Record<CefrLevel, { proven: number; total: number }> };

/**
 * "Yapabildiklerim" (WP-43) — Android'in `CandoScreen`i ile aynı yerleşim.
 *
 * ÖNCEKİ WEB TASARIMI AYRI BİR ÜRÜNDÜ. Beş seviye çipi vardı ve liste
 * YALNIZ SEÇİLİ SEVİYEYİ gösteriyordu, ifadeler de beceri başlıklarına
 * (okuma/dinleme/…) bölünüyordu. Android ise hepsini birden gösteriyor:
 * üstte seviye başına ilerleme çubuklu bir özet kartı, altında her seviye
 * kendi kartında, ifadenin altında becerinin adı. Yani aynı hesap iki
 * platformda iki farklı sayfa açıyordu: webde "B1'i görmek için B1'e bas",
 * Android'de "hepsi burada".
 *
 * Kanıt ölçütü ve kanıtlı sayısı tek satırda, listenin üstünde
 * (`cando.rule` + `cando.n_proven`) — Android'deki cümlenin aynısı.
 *
 * Durum dairesi EKRAN OKUYUCUYA da konuşuyor. Eski sürüm daireye
 * `aria-hidden` veriyor, durumu yalnız `title` ile söylüyordu: `aria-hidden`
 * `title`ı da susturur, yani "kanıtlı/gelişiyor/henüz yok" ekran okuyucu
 * kullanıcısına HİÇ ulaşmıyordu. Android karşılığı `accessibilityLabel`.
 */
export function CandoCard() {
  const t = useT();
  const [data, setData] = useState<Data | null | undefined>(undefined);
  /* Tekrar deneme sayaci: artinca istek yeniden kosuyor. */
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/cando", { cache: "no-store" });
        if (!res.ok) return setData(null);
        const d = (await res.json()) as Data;
        if (!alive) return;
        setData(d);
      } catch {
        setData(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [attempt]);

  /* İskelet İÇERİĞİN ŞEKLİNDE: kural satırı, iki çubuklu özet kartı, iki
     grup × dört satır. Android'in yükleme dalı birebir bu. */
  if (data === undefined)
    return (
      <div>
        <SkeletonLine variant="micro" width="80%" />
        <SkeletonCard label={t("cando.loading")} className="mt-3">
          {[0, 1].map((i) => (
            <div key={i} className="mb-2">
              <div className="mb-1 flex items-baseline justify-between">
                <SkeletonLine variant="strong" width={28} />
                <SkeletonLine variant="caption" width={78} />
              </div>
              <SkeletonBar height={7} />
            </div>
          ))}
        </SkeletonCard>
        <CardGrid min={440} className="mt-4">
          {[0, 1].map((g) => (
            <div key={g}>
              <SkeletonLine variant="caption" width={26} className="mb-1 ml-1" />
              <div className="card p-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5">
                    <SkeletonTile size={26} />
                    <div className="flex-1">
                      <SkeletonLine variant="body" width="80%" />
                      <SkeletonLine variant="micro" width="30%" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardGrid>
      </div>
    );

  /* İSTEK HATASI ile BOŞ LİSTE AYRI İKİ ŞEY ve tek kartla karşılanıyordu:
     ağı kopan kullanıcıya "giriş yapıp dersleri bitir" yazıyordu — yanlış
     sebep, üstelik tekrar deneme yolu da yoktu. Aynı kusur Android'de de
     vardı (`CandoScreen` hata dalı) ve ikisi birlikte düzeltildi.

     Hata dalı ayrıca DUYURULUYOR: ekranı kaplayan bir hata metni canlı bölge
     değilse ekran okuyucu kullanan biri hiçbir şey duymuyor. */
  if (!data)
    return (
      <EmptyCard
        role="alert"
        icon={AlertIcon}
        tint="var(--color-rose)"
        title={t("cando.couldn_t_load")}
        text={t("cando.rule")}
        action={
          <button type="button" onClick={() => setAttempt((n) => n + 1)} className="btn btn-primary px-4 py-2 text-body">
            {t("common.try_again")}
          </button>
        }
      />
    );
  const items = data.items;
  if (!items.length)
    return (
      /* Boş hâl bir ÇIKIŞ YOLU veriyor (bkz. Android `CandoScreen`): metin
         "konuşma ve alıştırmaları bitirdikçe" diyor ama gidilecek yeri
         göstermiyordu. Hedefin adı `nav.path`, yeni anahtar yok. */
      <EmptyCard
        icon={CheckIcon}
        tint="var(--color-mint)"
        title={t("cando.what_i_can_do")}
        text={t("cando.sign_in_and_finish_lessons_and")}
        action={
          <Link href="/immersion" className="btn btn-primary px-4 py-2 text-body">
            {t("nav.path")}
          </Link>
        }
      />
    );

  const provenTotal = items.filter((i) => i.state === "proven").length;
  const byLevel = new Map<string, Item[]>();
  for (const it of items) {
    const liste = byLevel.get(it.cando.level) ?? [];
    liste.push(it);
    byLevel.set(it.cando.level, liste);
  }

  return (
    <section id="cando">
      <p className="muted text-micro">
        {t("cando.rule")} {t("cando.n_proven", { n: provenTotal })}.
      </p>

      {/* Seviye özeti: ilerleme çubuklu. Eski web bu sayıları ÇİPLERİN
          İÇİNE sıkıştırıyordu; orada beş sayı yan yana okunmuyordu. */}
      <div className="card mt-3 p-4">
        {CANDO_LEVELS.filter((lv) => data.byLevel[lv]?.total).map((lv) => {
          const b = data.byLevel[lv];
          const pct = b.total ? Math.round((b.proven / b.total) * 100) : 0;
          return (
            <div key={lv} className="mb-2 last:mb-0">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-strong">{lv}</span>
                <span className="muted text-caption">
                  {t("cando.proven_of_total", { proven: b.proven, total: b.total })}
                </span>
              </div>
              <div className="h-[7px] overflow-hidden rounded-[4px]" style={{ background: "var(--surface-2)" }}>
                <div
                  className="h-full rounded-[4px]"
                  style={{ width: `${Math.max(2, pct)}%`, background: "var(--color-mint)" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <CardGrid min={440} className="mt-4">
        {CANDO_LEVELS.filter((lv) => byLevel.get(lv)?.length).map((lv) => (
          <div key={lv}>
            <p className="muted mb-1 ml-1 text-caption">{lv}</p>
            <div className="card p-4">
              {(byLevel.get(lv) ?? []).map((it, i) => (
                <div key={it.cando.id}>
                  {i > 0 ? <div className="h-px" style={{ background: "var(--hairline)" }} /> : null}
                  <Row it={it} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardGrid>
    </section>
  );
}

function Row({ it }: { it: Item }) {
  const t = useT();
  const tint =
    it.state === "proven" ? "var(--color-mint)" : it.state === "progressing" ? "var(--color-brand)" : "var(--text-faint)";
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span
        aria-label={t(it.state === "proven" ? "cando.proven" : it.state === "progressing" ? "cando.progressing" : "cando.not_yet")}
        className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-micro"
        style={{
          background: it.state === "proven" ? "color-mix(in srgb, var(--color-mint) 20%, transparent)" : "var(--surface-2)",
          color: tint,
        }}
      >
        {it.state === "proven" ? <CheckIcon size={15} /> : it.total ? `${it.done}/${it.total}` : ""}
      </span>
      <span className="flex-1">
        <span className={`block text-body ${it.state === "none" ? "muted" : ""}`}>{it.cando.tr}</span>
        <span className="block text-micro" style={{ color: "var(--text-faint)" }}>
          {t(CANDO_SKILL_LABEL_KEYS[it.cando.skill as CandoSkill] ?? "") || it.cando.skill}
        </span>
      </span>
    </div>
  );
}
