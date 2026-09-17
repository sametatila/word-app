"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RoundExit } from "@/components/round-exit";
import { FlowColumn, FlowActions, FlowNote, ResultHero, StateBody } from "@/components/flow";
import { CheckIcon } from "@/components/icons";
import { OptionMark } from "@/components/games/option-mark";
import { demoPlacementFor, estimateLevel } from "@/lib/placement-demo";
import { courseOrDefault } from "@/lib/courses";
import { readOnboardingPrefs, saveOnboardingPrefs } from "@/lib/onboarding-prefs";
import { track } from "@/lib/track";
import { useT, useLang } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";

/**
 * Giriş öncesi seviye testi — misafir yolu.
 *
 * Web'de "Testle belirle" diyen misafir doğrudan giriş duvarına gidiyordu:
 * seviyesini ölçmeden hesap açmak zorundaydı, oysa testi istemesinin sebebi
 * seviyesini bilmemesi. Android aynı yerde sekiz soruluk örnek turu oynatıyor,
 * sonucu yerel tercihlere yazıyor ve hesap açılınca profile taşıyor.
 *
 * Puanlama İSTEMCİDE: sunucuda kullanıcı yok. Gerçek yerleştirme testi
 * (dört aşama, uyarlanabilir) oturum açıkken çalışıyor ve bu turun yerini
 * almıyor; başlıktaki "örnek" eki de bunu söylüyor.
 */
export function DemoPlacement({ onClose }: { onClose?: () => void }) {
  const course = useCourse();
  const t = useT();
  const lang = useLang();
  const router = useRouter();
  /* Misafirin kursu sunucuda yok: onboarding'de seçilip yerel tercihlere
     yazılmıştı. Seçilmemişse varsayılan kursa düşülüyor. */
  const questions = useMemo(
    () => demoPlacementFor(lang, courseOrDefault(readOnboardingPrefs().course).id),
    [lang],
  );

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  const total = questions.length;
  const level = estimateLevel(correct);

  function leave() {
    if (onClose) onClose();
    else router.push("/");
  }

  function pick(option: string) {
    if (picked !== null) return;
    const q = questions[index];
    const ok = option === q.answer;
    setPicked(option);
    if (ok) setCorrect((c) => c + 1);
    // Kısa bir bekleme: doğru şık yeşile dönerken sayfa değişmesin.
    setTimeout(() => {
      setPicked(null);
      if (index + 1 >= total) setDone(true);
      else setIndex((i) => i + 1);
    }, 520);
  }

  /* Seviye misafir tercihlerine yazılıyor; hesap açılınca profile taşınıyor
     (`adoptAccount` ile aynı yol). Sunucuya yazılacak bir kullanıcı yok. */
  function apply() {
    saveOnboardingPrefs({ level });
    setSaved(true);
    track("placement_finish", total ? Math.round((correct / total) * 100) : 0, `demo:${level.toLowerCase()}`);
    setTimeout(() => router.push("/login?mode=signup"), 700);
  }

  // Bu paritede hazır set yoksa soru üretilemez; sessiz boş ekran yerine
  // sebebi söyleniyor (onboarding bu seçeneği zaten göstermiyor).
  if (!total) {
    return (
      <FlowColumn>
        <StateBody title={t("placement.no_demo")} />
        <FlowActions primary={{ label: t("common.close"), onClick: leave }} />
      </FlowColumn>
    );
  }

  /* SONUÇ ŞABLONU — mobil `PlacementScreen`in misafir dalıyla aynı alanlar:
     band (seviye) → kaydedildi notu → Anladım / Kapat. Beceri kırılımı ve
     seviye seçimi yok: örnek tur tek aşama ve kabul edilecek bir kayıt yok. */
  if (done) {
    return (
      <FlowColumn className="px-4 py-6">
        <ResultHero
          eyebrow={t("placement.title")}
          title={t("placement.your_level", { level })}
          figure={level}
          sub={t("placement.result_sub", { total, correct })}
        />
        {saved ? (
          <div role="status">
            <FlowNote tone="ok" icon={<CheckIcon size={16} />} text={t("placement.saved")} />
          </div>
        ) : null}
        <FlowActions primary={{ label: t("placement.understood"), onClick: apply }} tertiary={{ label: t("common.close"), onClick: leave }} />
      </FlowColumn>
    );
  }

  const q = questions[index];
  return (
    <section className="mx-auto w-full max-w-md px-4 py-4">
      <div className="mb-6 flex items-center gap-3">
        {/* Ölçü ortak bileşenden: 44 px karo, 22 px simge, `surface-2`
            zemin. Burada `btn-ghost` ve 20 px simge vardı — aynı uygulamada
            dördüncü bir kapatma karosu ölçüsü. */}
        <RoundExit onExit={leave} labelKey="common.close" />
        <div className="h-2.5 flex-1 overflow-hidden rounded-full surface-2">
          <motion.div
            className="brand-gradient h-full rounded-full"
            animate={{ width: `${Math.round((index / total) * 100)}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
          />
        </div>
        <span className="muted shrink-0 text-strong tabular-nums">
          {index + 1}/{total}
        </span>
      </div>

      {/* Başlıktaki "örnek" eki Android'de de var: bu tur giriş öncesi kısa
          set, oturum açıkken çalışan dört aşamalı testin yerine geçmiyor. */}
      <p className="muted mb-4 text-center text-micro uppercase tracking-eyebrow">
        {t("placement.title")}
        {t("placement.sample")}
      </p>

      <div className="card p-5">
        <p className="muted mb-2 text-caption">{t(q.promptKey)}</p>
        <p className="mb-4 text-h1" lang={course}>
          {q.question}
        </p>
        {/* TEK SEÇİMLİK ŞIK LİSTESİ RADYO GRUBUDUR — Android karşılığı
            `ChoiceGame` şıkları `accessibilityRole="radio"` ile veriyor. */}
        <div role="radiogroup" aria-label={q.question} className="grid gap-2">
          {q.options.map((o, i) => (
            <motion.button
              key={`${q.id}-${o}`}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              /* Hangisini sectigin ve hukmun kendisi yalnizca ZEMIN
                 RENGINDEN okunuyordu. Android'in ornek yerlestirmesi
                 (`ChoiceGame` `reveal`) simgeyi de ciziyor. */
              role="radio"
              aria-checked={picked === o}
              transition={{ delay: i * 0.05 }}
              disabled={picked !== null}
              onClick={() => pick(o)}
              className={`option flex items-center justify-between gap-2 px-3.5 py-3 text-left text-strong ${
                picked === null ? "" : o === q.answer ? "option-correct" : picked === o ? "option-wrong" : ""
              }`}
            >
              {o}
              <OptionMark state={picked === null ? null : o === q.answer ? "correct" : picked === o ? "wrong" : null} />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
