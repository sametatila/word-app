"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RoundExit } from "@/components/round-exit";
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
      <section className="card mx-auto w-full max-w-md p-6 text-center">
        <p className="muted text-body">{t("placement.no_demo")}</p>
        <button type="button" onClick={leave} className="btn btn-primary mt-4 px-5 py-3">
          {t("common.close")}
        </button>
      </section>
    );
  }

  if (done) {
    return (
      <section className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-10 text-center">
        <span
          className="flex items-center justify-center rounded-full on-fill"
          style={{ width: 110, height: 110, background: "var(--color-brand)", fontSize: 40, fontWeight: 800 }}
        >
          {level}
        </span>
        <h1 className="mt-6 text-h1">{t("placement.your_level", { level })}</h1>
        <p className="muted mt-1 text-body">{t("placement.result", { total, correct })}</p>
        {saved ? (
          <p role="status" className="mt-4 font-bold" style={{ color: "var(--color-mint)" }}>
            {t("placement.saved")}
          </p>
        ) : null}
        <button type="button" onClick={apply} className="btn btn-primary mt-8 w-full px-5 py-3.5">
          {t("placement.understood")}
        </button>
        <button type="button" onClick={leave} className="muted mt-2 w-full px-5 py-3 font-bold">
          {t("common.close")}
        </button>
      </section>
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
      <p className="muted mb-4 text-center text-micro uppercase tracking-widest">
        {t("placement.title")}
        {t("placement.sample")}
      </p>

      <div className="card p-5">
        <p className="muted mb-2 text-caption">{t(q.promptKey)}</p>
        <p className="mb-4 text-h1" lang={course}>
          {q.question}
        </p>
        <div className="grid gap-2">
          {q.options.map((o, i) => (
            <motion.button
              key={`${q.id}-${o}`}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              /* Hangisini sectigin ve hukmun kendisi yalnizca ZEMIN
                 RENGINDEN okunuyordu. Android'in ornek yerlestirmesi
                 (`ChoiceGame` `reveal`) simgeyi de ciziyor. */
              aria-pressed={picked === o}
              transition={{ delay: i * 0.04 }}
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
