"use client";

import Link from "next/link";
import { CardGrid } from "@/components/layout";
import { useEffect, useState } from "react";
import { PenIcon } from "@/components/icons";
import { EmptyCard } from "@/components/empty-card";
import { SkeletonLine } from "@/components/skeleton";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { AiNotice } from "@/components/ai-notice";
import type { Assessment } from "@/lib/assess-prompts";
import { useT } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";
import { ReportDialog } from "@/components/report-dialog";

type Item = {
  id: number;
  kind: string;
  level: string;
  day: string;
  answer: string;
  result: Assessment | null;
  createdAt: string;
};

const KIND_LABEL_KEYS: Record<string, string> = {
  writing: "exam.sec_writing",
  sentence: "writ.kind_sentence",
  speaking: "exam.sec_speaking",
  roleplay: "writ.kind_roleplay",
};

/**
 * "Yazılarım" (WP-30/64): profilde değerlendirme arşivi. Metin kullanıcının;
 * silme buradan. Bekleyen (kuyruktaki) kayıtlar "puanlanacak" diye görünür.
 * Açınca aynı değerlendirme kartı — geri bildirim dili her yerde aynı.
 */
export function WritingsCard({ showEmpty = false }: { showEmpty?: boolean }) {
  const course = useCourse();
  const t = useT();
  const [items, setItems] = useState<Item[] | null | undefined>(undefined);
  const [open, setOpen] = useState<number | null>(null);
  const [reported, setReported] = useState<Item | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setItems(undefined);
    (async () => {
      try {
        const res = await fetch("/api/assessments", { cache: "no-store" });
        if (!res.ok) return setItems(null);
        const data = (await res.json()) as { items: Item[] };
        if (alive) setItems(data.items);
      } catch {
        setItems(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [attempt]);

  async function remove(id: number) {
    if (!confirm(t("writ.delete_confirm"))) return;
    try {
      const res = await fetch(`/api/assessments?id=${id}`, { method: "DELETE" });
      if (res.ok) setItems((list) => (list ?? []).filter((i) => i.id !== id));
    } catch {
      setItems(null);
    }
  }

  /* İskelet kartın gerçek yapısında: başlık, alt satır ve iki kayıt yeri.
     Göz kararı 160 piksel, kayıt sayısına göre tutmuyordu. */
  if (items === undefined)
    return (
      <section role="status" aria-busy="true" aria-label={t("writ.loading")} className="card p-5">
        <SkeletonLine variant="bodyStrong" width={130} />
        <SkeletonLine variant="micro" width="60%" className="mt-1" />
        <div className="mt-3 space-y-2">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-panel p-3 surface-2" style={{ opacity: 1 - i * 0.12 }}>
              <SkeletonLine variant="caption" width={104} />
              <SkeletonLine variant="body" width="88%" className="mt-1.5" />
            </div>
          ))}
        </div>
      </section>
    );
  /*
    Boş durum, kartın nerede durduğuna göre değişiyor.

    Bir listenin içinde (profil gibi) boş kart gürültüdür — gösterilecek bir
    şey yoksa hiç görünmemeli. Ama KENDİ SAYFASINDA aynı davranış ekranı
    bomboş bırakıyor: kullanıcı "Yazılarım"a giriyor ve karşısına başlıktan
    başka hiçbir şey çıkmıyor. Orada boşluğun kendisi bir cevap değil, bir
    soru — "burada ne olacaktı?".
  */
  /*
   * YÜKLENEMEDİ ile BOŞ AYRI ŞEY.
   *
   * `!items` hem "istek başarısız" (null) hem "hiç yazı yok" (boş dizi)
   * demekti ve ikisine de "henüz değerlendirilmiş yazın yok" yazılıyordu:
   * ağı kopan kullanıcıya, yazdığı metinlerin yok olduğu söyleniyordu.
   */
  if (items === null)
    return showEmpty ? (
      <EmptyCard
        icon={PenIcon}
        tint="var(--color-sky)"
        title={t("writings.my_writing")}
        text={t("writings.couldn_t_load_writings")}
        action={
          <button type="button" onClick={() => setAttempt((n) => n + 1)} className="btn btn-ghost px-4 py-2 text-sm">
            {t("common.try_again")}
          </button>
        }
      />
    ) : null;
  if (!items.length) return showEmpty ? <WritingsEmpty /> : null;

  return (
    <section id="writings" className="card p-5">
      <h2 className="font-bold">{t("writings.my_writing")}</h2>
      <p className="muted mt-1 text-xs">{t("writ.sub")}</p>
      <AiNotice variant="output" className="mt-3" />
      {/* Kayıtlar geniş ekranda sütunlara bölünüyor (mobil de öyle yapıyor).
          Sütunlara ayrılan bir listede yatay ayraç çizgisi anlamını yitirdiği
          için her kayıt kendi yüzeyine alındı; dar kapta tek sütun kalıyor. */}
      <CardGrid as="ul" min={380} className="mt-3">
        {items.map((it) => {
          const score = it.result?.score.overall ?? null;
          /*
           * BASAMAK SABİT (600), TEMAYA GÖRE DEĞİŞEN TOKEN DEĞİL.
           *
           * `--color-mint` koyu temada 300'e düşüyor ve beyaz yazı taşıyan
           * dolu bir daire orada okunmuyordu: ölçüm 1.86 / 2.06 / 1.49 - AA'nın
           * 4.5'i bir yana, büyük yazı için istediği 3.0 bile değil. Sabit
           * 600'de iki temada da 5.30 / 5.20 / 6.07.
           */
          const tone = score === null ? "var(--text-muted)" : score >= 70 ? "var(--color-mint-600)" : score >= 40 ? "var(--color-flame-600)" : "var(--color-rose-600)";
          return (
            <li key={it.id} className="rounded-xl px-3 py-2.5 surface-2">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black text-white" style={{ background: tone }}>
                  {score ?? "…"}
                </span>
                <button type="button" onClick={() => setOpen(open === it.id ? null : it.id)} className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-sm font-semibold" lang={course}>
                    {it.answer}
                  </span>
                  <span className="muted block text-xs">
                    {(KIND_LABEL_KEYS[it.kind] ? t(KIND_LABEL_KEYS[it.kind]) : it.kind) ?? it.kind} · {it.level} · {it.day}
                    {score === null ? ` · ${t("writings.to_be_graded")}` : ""}
                  </span>
                </button>
                <button type="button" onClick={() => void remove(it.id)} className="btn btn-ghost shrink-0 px-2 py-1 text-xs">
                  {t("common.delete")}
                </button>
              </div>
              {open === it.id && it.result ? (
                <div className="mt-2">
                  <AssessmentCard answer={it.answer} result={it.result} />
                  {/* Değerlendirmeyi bildir — mobilde de açık kartın altında.
                      Yapay zekâ yanıtı rahatsız edici ya da yanlışsa kullanıcı
                      uygulamadan çıkmadan söyleyebilmeli (Play politikası). */}
                  <button
                    type="button"
                    onClick={() => setReported(it)}
                    /* Bkz. `lesson-player` bildir baglantisi: 11px yazinin
                       kendisi kadar bir hedef 24px asgarisinin altinda. */
                    className="muted mt-2 text-micro underline underline-offset-2 hit-8"
                  >
                    {t("writings.report_this_feedback")}
                  </button>
                </div>
              ) : open === it.id ? (
                <p className="muted mt-2 text-xs" lang={course}>
                  {it.answer}
                </p>
              ) : null}
            </li>
          );
        })}
      </CardGrid>

      <ReportDialog
        open={reported !== null}
        kind="assessment"
        refId={reported ? String(reported.id) : ""}
        content={reported?.answer ?? ""}
        onClose={() => setReported(null)}
      />
    </section>
  );
}

/**
 * Yazılar arşivi boşken.
 *
 * Üç şey söylüyor: burada ne birikecek, nasıl birikecek ve oraya nereden
 * gidilir. "Henüz yazın yok" tek başına bir duvar; yanına bir kapı gerekiyor.
 */
function WritingsEmpty() {
  const t = useT();
  return (
    <section className="card p-6 text-center">
      <span
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{
          background: "color-mix(in srgb, var(--color-sky) 14%, transparent)",
          color: "var(--color-sky)",
        }}
      >
        <PenIcon size={22} />
      </span>
      <h2 className="mt-3 font-bold">{t("writ.empty_title")}</h2>
      <p className="muted mx-auto mt-2 max-w-sm text-sm">
        {t("writ.empty_sub")}
      </p>
      <Link href="/immersion" prefetch={false} className="btn btn-primary mt-4 inline-flex px-5 py-2.5 text-sm">
        {t("writ.go_to_writing")}
      </Link>
    </section>
  );
}
