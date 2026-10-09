"use client";

import { useRef, useState } from "react";
import { QuestionList } from "@/components/skills/quiz";
import { ReportFlag, snapshot } from "@/components/report-flag";
import { KindIconFor, KIND_TINT } from "@/components/immersion/unit-pane";
import { RoundExit } from "@/components/round-exit";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { UnsavedWorkScope } from "@/components/skills/unsaved-work";
import { FlowActions, FlowColumn, ResultHero, StatRow, StateBody } from "@/components/flow";
import type { SkillQuestion } from "@/lib/skills/types";
import { useT, useLang } from "@/lib/i18n/client";
import { formatPercent } from "@/lib/i18n/dict";
import { apiFetch } from "@/lib/api-fetch";
import { PRACTICE_PASS_PCT as PASS_PCT } from "@/lib/score-bands";

/**
 * Immersion quiz/unitQuiz oynatıcısı — ünitenin brief'inden TÜRETİLEN sorular
 * (deriveQuiz) için ince kabuk. Mevcut QuestionList UI'sini aynen kullanır.
 *
 * Bitince sonuç `POST /api/immersion/item` ile kaydediliyor: bu adımların
 * "bitti" kaydı yokken Patika 13 adım gösterip 10 üzerinden sayıyordu. Kayıt
 * sonraki üniteyi açmaz (kapı konuşmalar) — ünitenin kendi ilerlemesini tamamlar.
 */
export function ImmersionQuizPlayer({
  title,
  subtitle,
  intro,
  kind = "quiz",
  itemId,
  unitNo = null,
  questions,
}: {
  title: string;
  subtitle: string;
  /**
   * Quizin ne yaptığını söyleyen tek cümle — mobil `QuizScreen` sorulardan
   * önce onu gösteriyor, web hiç göstermiyordu. Başlık ("Tekrar") türü
   * söylüyor ama neyin tekrarı olduğunu söylemiyor.
   */
  intro?: string;
  /**
   * Başlıktaki karonun türü — Patika listesindeki aynı ikon/renk haritasından
   * okunuyor. Eskiden yalnız "ünite quizi mı" diye soruluyordu ve dil
   * bilgisi turu da tekrar karosuyla açılıyordu; oysa Patika onu kendi
   * ikonuyla (bulmaca) ve kendi rengiyle gösteriyor.
   */
  kind?: "quiz" | "unitQuiz" | "grammar";
  /** Patika öğesinin kimliği (`de-a1-u03-quiz1`) — sonucun kaydı buna yazılıyor. */
  itemId: string;
  /** Ünite numarası — sonuç bandının başlığı ("Ünite 3 · Tekrar"). */
  unitNo?: number | null;
  /** Boşsa oynatıcı "henüz soru yok" durumunu çiziyor. */
  questions: SkillQuestion[];
}) {
  const t = useT();
  const lang = useLang();
  const [score, setScore] = useState<number | null>(null);
  /** Aynı deneme bir kez kaydedilsin; "Tekrar dene" yeni bir deneme açıyor. */
  const kaydedilenTur = useRef(-1);

  function bitir(correct: number) {
    setScore(correct);
    if (kaydedilenTur.current === round || !questions.length) return;
    kaydedilenTur.current = round;
    /* Ağ yoksa sessizce düşüyor: adım Patika'da bitmemiş görünür ve bir
       sonraki denemede yazılır. Sonuç kartı zaten ekranda. */
    void apiFetch("/api/immersion/item", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ itemId, correct, total: questions.length }),
    }).catch(() => {});
  }
  /** Yeniden denemede soru listesi sıfırdan kurulsun diye taze anahtar. */
  const [round, setRound] = useState(0);

  function retry() {
    setScore(null);
    setRound((r) => r + 1);
  }

  /*
    YARIM TESTTEN ÇIKIŞ ONAYA BAĞLI (QA F-0054, 2026-10-09). "Kapat" ve kenar
    çubuğu bağlantıları sormadan çıkıyordu; verilen cevaplar kaydedilmiyor,
    test baştan açılıyor. Sorular kaydedilmemiş cevabı `useUnsavedWork` ile
    bildiriyor; `skills/player-shell` ve mobil `QuizScreen` aynı diyalog.
  */
  const [dirty, setDirty] = useState(false);
  const ayril = useLeaveGuard(dirty && score === null);

  const tint = KIND_TINT[kind];
  const pct = questions.length ? Math.round(((score ?? 0) / questions.length) * 100) : 0;
  const passed = pct >= PASS_PCT;

  return (
    <div className="mx-auto w-full max-w-2xl py-6">
      <ConfirmDialog
        open={ayril.pending !== null}
        title={t("item.leave_title")}
        message={t("item.leave_body")}
        confirmLabel={t("common.exit")}
        cancelLabel={t("common.continue")}
        destructive
        onConfirm={ayril.leave}
        onCancel={ayril.stay}
      />
      <div className="mb-5 flex items-center gap-3">
        {/* KAPAT, GERİ OKU DEĞİL (2026-09-27): sonuç bu sayfanın dibine
            ekleniyor ve sonuç ekranında çıkış solda çarpı, adı `common.close`
            (ürün kuralı; Android `QuizScreen` başlığı baştan beri çarpı).
            Ölçü ortak bileşenden (`RoundExit`), eylem "Patika'ya dön"le aynı. */}
        <RoundExit href="/immersion" labelKey="common.close" />
        {/* Türün karosu Android'in başlığında var ve Patika listesindeki aynı
            ikon/renk çiftini kullanıyor: ünite quizi kırmızı, tekrar marka
            rengi. Web'de yalnız düz başlık vardı, ekran hangisi olduğunu ancak
            okununca söylüyordu. */}
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile text-white"
          style={{ background: tint }}
        >
          <KindIconFor kind={kind} size={18} />
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-h3">{title}</h1>
          <p className="muted truncate text-caption">{subtitle}</p>
        </div>
      </div>

      {intro && score === null ? <p className="muted mb-4 text-body">{intro}</p> : null}

      {!questions.length ? (
        /* DURUM ŞABLONU: soru yoksa boş durum. Sayfa eskiden `notFound()`
           atıyordu ve öğrenci "Sayfa bulunamadı" görüyordu — oysa bulunamayan
           bir sayfa değil, henüz yazılmamış sorulardı. Mobil `QuizScreen`
           aynı dalda aynı cümleyi ve aynı çıkışı gösteriyor. */
        <FlowColumn>
          <StateBody title={t("quiz.this_unit_has_no_questions_yet")}>
            <FlowActions primary={{ label: t("common.close"), href: "/immersion" }} />
          </StateBody>
        </FlowColumn>
      ) : score === null ? (
        <UnsavedWorkScope onChange={setDirty}>
          <QuestionList key={round} questions={questions} onAllAnswered={bitir} report={{ exerciseId: itemId, surface: "path" }} />
        </UnsavedWorkScope>
      ) : (
        /*
          SONUÇ ŞABLONU (components/flow): band → üç sayı → düğmeler. Geçemeyen
          öğrenci adımın açık kaldığını ve eşiği görmüyordu; band sessizleşiyor,
          etiket "Adım açık kaldı" diyor ve birincil düğme "Tekrar dene".
          Konfeti YOK: sınav Patika'nın sıradan bir adımı, kutlama büyük anlara
          ayrıldı (mobil `QuizScreen` aynı). Sonucu duyuran `role="status"`
          bandın kendisinde.
        */
        <FlowColumn key={`sonuc-${round}`}>
          <ResultHero
            eyebrow={`${unitNo != null ? `${t("common.unit")} ${unitNo} · ` : ""}${t(kind === "grammar" ? "unitkind.grammar" : kind === "unitQuiz" ? "unitkind.unit_quiz" : "unitkind.quiz")}`}
            title={t(passed ? "quiz.result_passed" : "quiz.result_failed")}
            figure={`${score}/${questions.length}`}
            sub={passed ? t("quiz.result_sub_passed", { pct }) : t("quiz.result_sub_failed", { pct, need: PASS_PCT })}
            quiet={!passed}
            pill={passed ? { text: t("quiz.pill_marked"), tone: "ok" } : { text: t("quiz.pill_open"), tone: "bad" }}
          />
          <StatRow
            items={[
              { value: `${score}/${questions.length}`, label: t("common.correct") },
              { value: formatPercent(pct, lang), label: t("quiz.stat_score"), tone: passed ? "ok" : "bad" },
              { value: formatPercent(PASS_PCT, lang), label: t("quiz.stat_pass") },
            ]}
          />
          {passed ? (
            <FlowActions primary={{ label: t("common.close"), href: "/immersion" }} tertiary={{ label: t("quiz.try_again"), onClick: retry }} />
          ) : (
            <FlowActions primary={{ label: t("quiz.try_again"), onClick: retry }} close="/immersion" />
          )}
          {/* İçerik bildirimi, adımın BÜTÜNÜ için: sonucun dibinde. Sorular
              cevaptan sonra kendi açıklamalarının altında ayrıca bildiriliyor
              (`QuestionList`). */}
          <div className="flex justify-center">
            <ReportFlag
              surface="path"
              target={{ type: "exercise", id: itemId }}
              content={() => snapshot({ title, kind, questions: questions.length, correct: score })}
            />
          </div>
        </FlowColumn>
      )}
    </div>
  );
}
