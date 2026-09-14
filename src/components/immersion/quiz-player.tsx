"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { QuestionList } from "@/components/skills/quiz";
import { KindIconFor, KIND_TINT } from "@/components/immersion/unit-pane";
import { Confetti } from "@/components/celebrate";
import { ArrowLeftIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";
import type { SkillQuestion } from "@/lib/skills/types";
import { useT } from "@/lib/i18n/client";
import { apiFetch } from "@/lib/api-fetch";
import { PRACTICE_PASS_PCT as PASS_PCT } from "@/lib/score-bands";

/**
 * Immersion quiz/checkpoint oynatıcısı — ünitenin brief'inden TÜRETİLEN sorular
 * (deriveQuiz) için ince kabuk. Mevcut QuestionList UI'sini aynen kullanır.
 *
 * Bitince sonuç `POST /api/immersion/item` ile kaydediliyor: bu adımların
 * "bitti" kaydı yokken Patika 13 adım gösterip 10 üzerinden sayıyordu. Kayıt
 * sonraki üniteyi açmaz (kapı dersler) — ünitenin kendi ilerlemesini tamamlar.
 */
export function ImmersionQuizPlayer({
  title,
  subtitle,
  intro,
  kind = "quiz",
  itemId,
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
   * okunuyor. Eskiden yalnız "kontrol noktası mı" diye soruluyordu ve dil
   * bilgisi turu da tekrar karosuyla açılıyordu; oysa Patika onu kendi
   * ikonuyla (bulmaca) ve kendi rengiyle gösteriyor.
   */
  kind?: "quiz" | "checkpoint" | "grammar";
  /** Patika öğesinin kimliği (`de-a1-u03-quiz1`) — sonucun kaydı buna yazılıyor. */
  itemId: string;
  questions: SkillQuestion[];
}) {
  const t = useT();
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
            ikon/renk çiftini kullanıyor: kontrol noktası kırmızı, tekrar marka
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

      {score === null ? (
        <QuestionList key={round} questions={questions} onAllAnswered={bitir} />
      ) : (
        /* Kapanış Android'deki kartın aynısı: geçtiyse maskot kutluyor ve
           konfeti atıyor, geçmediyse duruyor. Yüzde tek başına bir sayıydı;
           "geçtin" / "biraz daha çalış" onu bir yargıya çeviriyor. Yeniden
           deneme düğmesi web'de hiç yoktu - tek çıkış Patika'ya dönmekti. */
        <div role="status" className="card relative p-6 text-center">
          <Confetti fire={passed ? round + 1 : 0} />
          <Mascot mood={passed ? "celebrate" : "idle"} size={84} className="mx-auto" />
          <p className="mt-1 text-h2">{t("common.n_correct", { correct: score, total: questions.length })}</p>
          <p className="mt-1 text-caption" style={{ color: passed ? "var(--color-mint)" : "var(--text-muted)" }}>
            {t(passed ? "quiz.passed" : "quiz.try_more", { pct })}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              className="btn btn-ghost flex-1 px-5 py-3"
              onClick={() => {
                setScore(null);
                setRound((r) => r + 1);
              }}
            >
              {t("quiz.try_again")}
            </button>
            <Link href="/immersion" className="btn btn-primary flex-1 px-5 py-3">
              {t("quiz.back_to_path")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
