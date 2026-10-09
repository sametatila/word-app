"use client";

import { ReportLink } from "@/components/report-flag";
import Link from "next/link";
import { apiFetch } from "@/lib/api-fetch";
import { CardGrid } from "@/components/layout";
import { useEffect, useState } from "react";
import { MyWritingsIcon } from "@/components/icons";
import { scoreBand } from "@/lib/score-bands";
import { EmptyCard } from "@/components/empty-card";
import { SkeletonLine, TextBox, type TextVariant } from "@/components/skeleton";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { AiNotice } from "@/components/ai-notice";
import type { Assessment } from "@/lib/assess-prompts";
import { useLang, useT } from "@/lib/i18n/client";
import { formatDay } from "@/lib/i18n/dict";
import { useCourse } from "@/components/app-shell";
import { ReportDialog } from "@/components/report-dialog";
import { ConfirmDialog } from "@/components/confirm-dialog";

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
  chat: "writ.kind_chat",
};

/**
 * "Yazılarım" (WP-30/64): profilde değerlendirme arşivi. Metin kullanıcının;
 * silme buradan. Bekleyen (kuyruktaki) kayıtlar "puanlanacak" diye görünür.
 * Açınca aynı değerlendirme kartı — geri bildirim dili her yerde aynı.
 */
/* `hideHeader`: kendi sayfasında başlık ve alt satır zaten `PageBack`te; kart
   aynısını ikinci kez yazmasın. */
export function WritingsCard({ showEmpty = false, hideHeader = false }: { showEmpty?: boolean; hideHeader?: boolean }) {
  const course = useCourse();
  const t = useT();
  const lang = useLang();
  const [items, setItems] = useState<Item[] | null | undefined>(undefined);
  const [open, setOpen] = useState<number | null>(null);
  const [reported, setReported] = useState<Item | null>(null);
  /* Silinmesi SORULAN kayıt. Bkz. aşağıdaki `remove`. */
  const [toDelete, setToDelete] = useState<number | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setItems(undefined);
    (async () => {
      try {
        const res = await apiFetch("/api/assessments", { cache: "no-store" });
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

  /*
   * SİLME, UYGULAMANIN KENDİ KUTUSUYLA SORULUYOR.
   *
   * Burası tarayıcının `confirm()`ünü çağıran son yerdi. `confirm-dialog`ın
   * kendi yorumu neden yanlış olduğunu zaten yazıyor: sistem kutusu ne
   * uygulamanın diline ne tasarımına ait ve iOS'ta "İptal"in yeri bizim
   * düzenimizin tersi. Android bu soruyu `Alert.alert` ile SORUYOR ama iki
   * düğmesini de kendi sözlüğünden adlandırıyor ("Vazgeç" / "Sil") ve silmeyi
   * `destructive` diye işaretliyor (`WritingsScreen.askDelete`); web'de
   * karşılığı `ConfirmDialog destructive`.
   *
   * Silme sırası da Android'inki: satır ÖNCE gidiyor, sunucu sonra. Eskiden
   * web yanıtı bekliyordu ve iki ucu da kaçırıyordu — istek başarısızsa
   * HİÇBİR ŞEY olmuyordu (kullanıcı boşuna bekliyor), istek fırlatırsa bütün
   * liste "yüklenemedi" kartına dönüyordu (silinmeyen yazılar da gözden
   * kayboluyordu). İkisi de silmenin kendisinden büyük bir ceza.
   */
  function remove(id: number) {
    setToDelete(null);
    setItems((list) => (list ?? []).filter((i) => i.id !== id));
    void apiFetch(`/api/assessments?id=${id}`, { method: "DELETE" }).catch(() => {});
  }

  /* İskelet kartın gerçek yapısında: başlık + alt satır (yalnız başlık
     gösterilen yerde), yapay zekâ notu, sonra kayıt ızgarası (puan dairesi,
     "tür · seviye · gün", iki satır önizleme, Sil). Eskisi notu hiç
     çizmiyordu, `hideHeader`da da başlık çiziyordu ve kayıtlar tek sütundu.
     Kayıt zemini zaten surface-2: içindeki parçalar bir ton koyu (`--border`)
     ki görünsün. Göz kararı yükseklik yok; satırlar tipografi ölçeğinden. */
  if (items === undefined)
    return (
      <section role="status" aria-busy="true" aria-label={t("writ.loading")} className="card p-5">
        {hideHeader ? null : (
          <>
            <SkeletonLine variant="strong" width={130} />
            <SkeletonLine variant="caption" width="60%" className="mt-1" />
          </>
        )}
        <TextBox
          variant="micro"
          className={`animate-pulse py-2 surface-2 ${hideHeader ? "" : "mt-3"}`}
          style={{ borderRadius: "var(--radius-tile)" }}
        />
        <CardGrid as="ul" min={380} className="mt-3">
          {[0, 1].map((i) => (
            <li key={i} aria-hidden className="rounded-panel px-3 py-2.5 surface-2">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 shrink-0 animate-pulse rounded-full" style={{ background: "var(--border)" }} />
                <span className="min-w-0 flex-1">
                  <InsetLine variant="strong" width="55%" />
                  <InsetLine variant="caption" width="92%" />
                  <InsetLine variant="caption" width="70%" />
                </span>
                <InsetLine variant="caption" width={40} />
              </div>
            </li>
          ))}
        </CardGrid>
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
        role="alert"
        icon={MyWritingsIcon}
        tint="var(--color-sky)"
        title={t("writings.my_writing")}
        text={t("writings.couldn_t_load_writings")}
        action={
          <button type="button" onClick={() => setAttempt((n) => n + 1)} className="btn btn-primary px-4 py-2 text-body">
            {t("common.try_again")}
          </button>
        }
      />
    ) : null;
  if (!items.length) return showEmpty ? <WritingsEmpty /> : null;

  return (
    <section id="writings" className="card p-5">
      {hideHeader ? null : (
        <>
          <h2 className="text-strong">{t("writings.my_writing")}</h2>
          <p className="muted mt-1 text-caption">{t("writ.sub")}</p>
        </>
      )}
      <AiNotice variant="output" className={hideHeader ? "" : "mt-3"} />
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
          /* Bantlar TEK KAYNAKTAN (`lib/score-bands`): ayni 70/40 ayrimi
             degerlendirme kartinda, egzersiz sonucunda ve mobilde de var,
             dordu ayri ayri elle yaziliydi. */
          const tone = score === null ? "var(--text-muted)"
            : scoreBand(score) === "good" ? "var(--color-mint-600)"
            : scoreBand(score) === "mid" ? "var(--color-flame-600)"
            : "var(--color-rose-600)";
          return (
            <li key={it.id} className="rounded-panel px-3 py-2.5 surface-2">
              <div className="flex items-center gap-3">
                {/* PUANSIZ KAYITTA "…" YOK (QA F-0068): yüklenme sanılıyordu.
                    Dairede yazı simgesi, başlığın altında "Puan bekliyor". */}
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-caption ${score === null ? "" : "text-white"}`}
                  style={{ background: score === null ? "var(--border)" : tone, color: score === null ? "var(--text-muted)" : undefined }}
                >
                  {score ?? <MyWritingsIcon size={16} />}
                </span>
                {/*
                  SIRA VE SATIR BÜTÇESİ ANDROID'DEN (`WritingsScreen`).
                  İki şey ayrışıyordu: web metni ÜSTE koyup vurguluyor ve
                  metadatayı altta soluk yazıyordu, Android tam tersi —
                  "tür · seviye · gün" satırı kimliği taşıyor, metin onun
                  altında bir önizleme. Ve metnin bütçesi webde TEK satırdı,
                  Android'de iki; üstelik Android kart açılınca metni TAMAMEN
                  gösteriyor, web hiç göstermiyordu.
                */}
                {/* GÜN uygulamanın biçiminde ("9 Eki"), ham ISO değil (QA F-0067). */}
                <button
                  type="button"
                  data-panel="writing"
                  aria-expanded={open === it.id}
                  onClick={() => setOpen(open === it.id ? null : it.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <span className="block text-strong">
                    {(KIND_LABEL_KEYS[it.kind] ? t(KIND_LABEL_KEYS[it.kind]) : it.kind) ?? it.kind} · {it.level} · {formatDay(it.day, lang)}
                  </span>
                  {score === null ? <span className="block text-caption" style={{ color: "var(--color-flame)" }}>{t("writ.pending_label")}</span> : null}
                  {/* Açıkken önizleme yok: metnin tamamı aşağıda (puanlıysa
                      hataları işaretli değerlendirme kartında). Aynı metin iki
                      kez yazılıyordu (QA F-0068; mobil aynı). */}
                  {open === it.id ? null : (
                    <span className="muted block text-caption line-clamp-2" lang={course}>
                      {it.answer}
                    </span>
                  )}
                  <span className="mt-1 block text-micro" style={{ color: "var(--color-brand)" }}>
                    {open === it.id ? t("writ.hide") : score === null ? t("writ.see_text") : t("writ.see_feedback")}
                  </span>
                </button>
                <button type="button" onClick={() => setToDelete(it.id)} className="btn btn-ghost hit-8 shrink-0 px-2 py-1 text-caption">
                  {t("common.delete")}
                </button>
              </div>
              {open === it.id && it.result ? (
                <div className="mt-2">
                  <AssessmentCard answer={it.answer} result={it.result} />
                  {/* Değerlendirmeyi bildir — mobilde de açık kartın altında.
                      Yapay zekâ yanıtı rahatsız edici ya da yanlışsa kullanıcı
                      uygulamadan çıkmadan söyleyebilmeli (Play politikası). */}
                  {/* Uygulamanın tek bildirim biçimi (`ReportLink`); hedef ölçüsü orada. */}
                  <ReportLink className="mt-2" onClick={() => setReported(it)} label={t("writings.report_this_feedback")} />
                </div>
              ) : open === it.id ? (
                <div className="mt-2 space-y-1.5">
                  <p className="text-body" lang={course}>{it.answer}</p>
                  <p className="muted text-caption">{t("writ.pending_body")}</p>
                </div>
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

      <ConfirmDialog
        open={toDelete !== null}
        title={t("writ.delete_confirm")}
        confirmLabel={t("common.delete")}
        destructive
        onConfirm={() => toDelete !== null && remove(toDelete)}
        onCancel={() => setToDelete(null)}
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
    /* Kabuk EL YAPIMI DEĞİL: aynı dosyanın hata dalı `EmptyCard` çiziyordu,
       boş dal ise kendi karosunu (48 px, %14 tint) ve kendi başlığını kuruyordu
       — iki boş hâl yan yana iki farklı ölçüde duruyordu. Android'in boş hâl
       kalıbı tek: `social/common.tsx` `EmptyCard` (52 px dolu karo). */
    <EmptyCard
      icon={MyWritingsIcon}
      tint="var(--color-sky)"
      title={t("writ.empty_title")}
      text={t("writ.empty_sub")}
      action={
        <Link href="/immersion" prefetch={false} className="btn btn-primary inline-flex px-5 py-2.5 text-body">
          {t("writ.go_to_writing")}
        </Link>
      }
    />
  );
}

/**
 * surface-2 zeminli kaydın İÇİNDEKİ metin satırı. `SkeletonLine` çubuğunu
 * surface-2 ile çiziyor ve aynı zeminde görünmüyordu; ölçü kuralı aynı
 * (satır yüksekliği, çubuk 4 px kısa), renk bir ton koyu.
 */
function InsetLine({ variant, width }: { variant: TextVariant; width: number | string }) {
  return <SkeletonLine variant={variant} width={width} tone="var(--border)" />;
}
