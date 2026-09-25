"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { QuestionList } from "@/components/skills/quiz";
import { KindIconFor, KIND_TINT } from "@/components/immersion/unit-pane";
import { ArrowLeftIcon } from "@/components/icons";
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

  const tint = KIND_TINT[kind];
  const pct = questions.length ? Math.round(((score ?? 0) / questions.length) * 100) : 0;
  const passed = pct >= PASS_PCT;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="mb-5 flex items-center gap-3">
        {/* Geri düğmesi 44 - `PageBack` ve Android'in her ekran başlığındaki
            ölçü. 36 pikselde kalıyordu ve ok da bir bileşen değil düz "←"
            karakteriydi; ikon ailesinden ayrı düşüyordu. */}
        <Link
          href="/immersion"
          aria-label={t("quiz.back_to_path")}
          className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
          style={{ background: "var(--surface-2)", color: "var(--text)" }}
        >
          <ArrowLeftIcon size={24} />
        </Link>
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
          <h1 className="truncate font-bold">{title}</h1>
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
            <FlowActions primary={{ label: t("quiz.back_to_path"), href: "/immersion" }} />
          </StateBody>
        </FlowColumn>
      ) : score === null ? (
        <QuestionList key={round} questions={questions} onAllAnswered={bitir} />
      ) : (
        /*
          SONUÇ ŞABLONU (components/flow): band → üç sayı → düğmeler. Geçemeyen
          öğrenci adımın açık kaldığını ve eşiği görmüyordu; band sessizleşiyor,
          etiket "Adım açık kaldı" diyor ve birincil düğme "Tekrar dene".
          Konfeti yalnız geçince. Sonucu duyuran `role="status"` bandın kendisinde.
        */
        <FlowColumn celebrate={passed} key={`sonuc-${round}`}>
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
            <FlowActions primary={{ label: t("quiz.back_to_path"), href: "/immersion" }} secondary={{ label: t("quiz.try_again"), onClick: retry }} />
          ) : (
            <FlowActions primary={{ label: t("quiz.try_again"), onClick: retry }} secondary={{ label: t("quiz.back_to_path"), href: "/immersion" }} />
          )}
        </FlowColumn>
      )}
    </div>
  );
}
