"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { VoicePicker } from "@/components/voice-picker";
import { Mascot } from "@/components/mascot";
import { defaultVoice, type VoiceId } from "@/lib/tts/voices";
import { AlertIcon, CheckIcon, LogoMark } from "@/components/icons";
import { track } from "@/lib/track";
import { saveOnboardingPrefs } from "@/lib/onboarding-prefs";
import { hasFirstWords } from "@/lib/first-words";
import { useT, useLang } from "@/lib/i18n/client";
import { LANG_LABEL, NATIVE_LANGS, type NativeLang } from "@/lib/i18n/dict";
import { writeLangCookie } from "@/lib/i18n/set-lang";
import { courseName, courseSub, offeredNativeLangs, onboardingCoursesFor } from "@/lib/courses";

/*
  KURS LİSTESİ ARTIK KAYIT DEFTERİNDEN (`onboardingCoursesFor`).

  Burada iki kurs elle yazılıydı ve iki şey yanlıştı: İngilizce kursu yeni
  kullanıcıya hiç sunulmuyordu, duraklatılmış Züritüütsch ise sunuluyordu —
  mobilde `offeredToNewUsers` bunu baştan beri ayırıyor. Liste ayrıca anadile
  göre süzülmüyordu: arayüzünü Almanca seçen kullanıcıya Almanca öneriliyordu.
*/

const GOALS = [
  { id: "work", title: "onb.goal_work", desc: "onb.goal_work_desc" },
  { id: "daily", title: "onb.goal_daily", desc: "onb.goal_daily_desc" },
  { id: "exam", title: "onb.goal_exam", desc: "onb.goal_exam_desc" },
  { id: "swiss", title: "onb.goal_swiss", desc: "onb.goal_swiss_desc" },
];

/**
 * Günlük hedef — mobil onboarding'in dördüncü adımıyla AYNI üç seçenek ve
 * aynı değerler (`M/src/screens/OnboardingScreen.tsx`).
 *
 * Etiket dakika diyor, değer TEKRAR SAYISI: mobilde de öyle ve iki taraf
 * bilerek aynı bırakıldı — biri "düzeltilirse" aynı seçeneği seçen iki
 * kullanıcı iki farklı hedefe düşerdi. Etiket–değer uyumsuzluğu ayrı bir iş
 * ve iki tarafta birden yapılmalı (bkz. docs/plan/web-parity.md, Şerit O).
 */
const PACES = [
  /*
    HEDEFİN BİRİMİ TEKRAR, DAKİKA DEĞİL. Buradaki sayı doğrudan
    `profiles.daily_goal`e yazılıyor ve uygulamanın her yerinde "gün başına
    tekrar" olarak okunuyor (ayarlar, günlük tur, seri). Eskiden ekran "5 dk /
    gün" diyip 5'i hedef olarak yazıyordu: kullanıcı dakika seçtiğini sanıyor,
    hedef ise tekrar cinsinden ve olduğundan çok küçük kuruluyordu.

    Değerler ayarlardaki ölçekle aynı (10/20/30/50); varsayılan 20 ortadaki.
  */
  { goal: 10, title: "onboarding.easy" },
  { goal: 20, title: "onboarding.steady" },
  { goal: 50, title: "onboarding.serious" },
];

/* Seviye açıklamaları ayar ekranıyla AYNI anahtarlardan: iki yerde iki ayrı
   cümle görmek, aynı seçimi iki farklı şey sanmaya yol açıyordu. */
const LEVELS = [
  { id: "A1", desc: "onboarding.i_m_just_starting_out" },
  { id: "A2", desc: "level.a2_desc" },
  { id: "B1", desc: "level.b1_desc" },
  { id: "B2", desc: "level.b2_desc" },
  { id: "C1", desc: "level.c1_desc" },
];

type Step = 0 | 1 | 2 | 3 | 4;

/**
 * İlk giriş akışı (plan WP-65): dört ekran, her biri tek karar.
 *   1. İsim + kurs (+ ses)   2. Hedef: neden Almanca?
 *   3. Seviye: ölçelim mi, biliyor musun?   4. "Bugünkü planın hazır"
 *
 * Hedef (`profiles.goal`) görev ve içerik önerilerini etkiler; seviye ya
 * yerleştirme testinden (WP-40) ya da kullanıcının kendi seçiminden gelir —
 * iki yolda da karar kullanıcının. Erdi her ekranda rehber; her ekranın
 * ilerleme noktası var ki "daha ne kadar var" belli olsun.
 */
export function CourseOnboarding({
  initialName = "",
  signedIn = true,
}: {
  initialName?: string;
  /**
   * Oturum var mı. Yoksa kararlar sunucuya YAZILAMAZ (kullanıcı henüz yok) —
   * cihazda saklanıp giriş sonrası taşınıyorlar. Mobilde de sıra bu:
   * onboarding → ilk kelimeler → hesap → kararların profile geçmesi.
   */
  signedIn?: boolean;
}) {
  const t = useT();
  const lang = useLang();
  const router = useRouter();

  /**
   * Dil değişince sayfa TAZELENİYOR: onboarding metinlerinin yarısı sunucu
   * bileşenlerinden değil ama `getLang()` sunucuda çözüldüğü için üst
   * kabuk eski dilde kalırdı. Seçim çereze yazılıyor; hesap açıldığında
   * profile de geçiyor (bkz. lib/onboarding-prefs).
   */
  function pickLang(next: NativeLang) {
    if (next === lang) return;
    track("setting_change", NATIVE_LANGS.indexOf(next), "lang");
    writeLangCookie(next);
    // Hesap henüz yok: karar diğer onboarding tercihleriyle birlikte
    // saklanıyor ve giriş yapılınca profile taşınıyor.
    saveOnboardingPrefs({ nativeLang: next });
    /*
      SEÇİLİ KURS GEÇERSİZ KALABİLİR. Almanca kursu seçtikten sonra arayüzünü
      Almancaya alan kullanıcıda o kurs listeden düşüyor (kendi dilini
      öğretmiyoruz). Sessizce bırakılsaydı hiçbir seçenek işaretli görünmez ve
      kullanıcı "seç" diyemeden takılırdı. Mobildeki `keepCourseValid` ile aynı
      davranış: ilk geçerli kursa taşı.
    */
    const list = onboardingCoursesFor(next);
    if (!list.some((c) => c.id === course)) {
      const fallback = list[0]?.id;
      if (fallback) {
        setCourse(fallback);
        setVoice(defaultVoice(fallback));
        saveOnboardingPrefs({ course: fallback });
      }
    }
    router.refresh();
  }
  const [step, setStep] = useState<Step>(0);
  // Onboarding hunisi: hangi adıma kadar gelindi (WP-80).
  useEffect(() => {
    track("onboarding_step", step, ["welcome", "goal", "level", "pace", "ready"][step] ?? "other");
  }, [step]);
  const [name, setName] = useState(initialName);
  const [course, setCourse] = useState("de");
  const [voice, setVoice] = useState<VoiceId>(defaultVoice("de"));
  const [goal, setGoal] = useState<string | null>(null);
  const [level, setLevel] = useState("A1");
  const [levelMode, setLevelMode] = useState<"pick" | "measure" | null>(null);
  const [pace, setPace] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanName = name.trim().replace(/\s+/g, " ");
  const nameOk = cleanName.length >= 2;

  async function save(extra: Record<string, unknown>): Promise<boolean> {
    // Misafir: sunucuda yazılacak bir profil yok. Kararlar cihazda duruyor ve
    // giriş yapılır yapılmaz profile taşınıyor (components/onboarding-adopt).
    if (!signedIn) {
      saveOnboardingPrefs({
        displayName: cleanName,
        course,
        voice,
        goal: goal ?? undefined,
        level,
        ...(pace ? { dailyGoal: pace } : {}),
        ...(extra as { level?: string }),
      });
      return true;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ displayName: cleanName, course, voice, goal, level, ...(pace ? { dailyGoal: pace } : {}), ...extra }),
      });
      if (!res.ok) throw new Error(String(res.status));
      return true;
    } catch {
      setError(t("onb.save_failed"));
      return false;
    } finally {
      setSaving(false);
    }
  }

  /**
   * Seviye adımı artık KAYDETMİYOR, günlük hedef adımına geçiyor.
   *
   * Mobilde de sıra böyle: kurs → başlangıç noktası → günlük hedef → bitir.
   * Hedef en sonda çünkü iki seviye yolunun (test / kendin seç) ikisi de
   * ondan geçmeli; seviye adımında kaydedilseydi test yolunu seçen kullanıcı
   * hedefi hiç görmezdi.
   */
  function toPace() {
    track("nav", 0, levelMode === "measure" ? "onboarding:level_measure" : "onboarding:level_pick");
    setStep(3);
  }

  /** Günlük hedef seçildikten sonra: profil yazılır, yol ayrılır. */
  async function finishFromPace() {
    if (levelMode === "measure") {
      // Profil önce kaydedilir (isim/kurs/hedef); seviye testin sonunda yazılır.
      // Misafirde seviye testi hesap ister: yerleştirme sunucuda puanlanıyor.
      if (await save({ level: "A1" })) {
        track("nav", 0, "onboarding:placement");
        router.push(signedIn ? "/placement" : "/login?mode=signup&next=/placement");
      }
      return;
    }
    if (!(await save({ level }))) return;
    track("nav", 0, "onboarding:level");
    /*
      MİSAFİR ISINMAYA GİDİYOR. Mobilde "sıfırdan" ve "seviyeni seç"
      yollarının ikisi de giriş duvarından önce beş kelimeden geçiyor; o
      ısınma, hesap açmanın gerekçesi. Isınma seti olmayan paritede adım
      atlanıyor ve doğrudan hesap açılıyor.
    */
    if (!signedIn) {
      router.push(hasFirstWords("tr", course) ? "/first-words" : "/login?mode=signup");
      return;
    }
    setStep(4);
  }

  const dots = (
    <ol className="mb-5 flex items-center gap-2" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <li key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i <= step ? "var(--color-brand)" : "var(--surface-2)" }} />
      ))}
    </ol>
  );

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-4 py-10">
      <div className="mb-6 flex items-center gap-2.5">
        <LogoMark size={36} />
        <div>
          <h1 className="text-h3">
            {step === 0
              ? t("onb.step0_title")
              : step === 1
                ? t("onb.step1_title", { lang: courseName(course, lang) })
                : step === 2
                  ? t("onb.step2_title")
                  : step === 3
                    ? t("onboarding.what_s_your_daily_goal")
                    : t("onb.step4_title")}
          </h1>
          <p className="muted text-caption">{t("onb.step_of", { n: step + 1 })}</p>
        </div>
      </div>
      {dots}
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
          {step === 0 ? (
            <>
              <div className="flex items-start gap-3">
                <Mascot mood="wave" size={72} stage="onboarding" />
                <p className="muted text-sm leading-relaxed">{t("onb.intro")}</p>
              </div>
              {/*
                ARAYÜZ DİLİ — mobil onboarding'in ikinci adımının karşılığı
                (`OnboardingScreen`, "anlatım ve ipuçları bu dilde olacak").
                Web'de ayrı bir adım değil, bu adımın ilk sorusu: tarayıcının
                dili zaten seçili geliyor (bkz. lib/i18n/server
                `fromAcceptLanguage`), yani burada sorulan şey bir onay.
                Ayrı bir sayfa açmak, cevabı çoğu zaman hazır olan bir soru
                için bir adım daha eklemek olurdu.
              */}
              <h2 className="mb-2 mt-5 font-bold">{t("onboarding.which_language_should_we_teach")}</h2>
              <div className="flex gap-1.5">
                {offeredNativeLangs().map((l) => (
                  <button
                    key={l}
                    type="button"
                    lang={l}
                    aria-pressed={lang === l}
                    onClick={() => pickLang(l)}
                    className={`chip px-3.5 py-2 text-caption ${lang === l ? "chip-active" : ""}`}
                  >
                    {LANG_LABEL[l]}
                  </button>
                ))}
              </div>
              <p className="muted mt-1.5 text-xs">{t("onboarding.lessons_and_hints_will_be_in")}</p>

              <h2 className="mb-2 mt-6 font-bold">{t("onb.what_to_call_you")}</h2>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} autoComplete="given-name" placeholder={t("onb.your_name")} aria-label={t("onb.your_name")} className="option w-full px-4 py-3 text-base" />
              <p className="muted mt-1.5 text-xs">{t("onb.name_note")}</p>
              <h2 className="mb-2 mt-6 font-bold">{t("onboarding.which_course_shall_we_start_with")}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {onboardingCoursesFor(lang).map((c) => {
                  const active = course === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCourse(c.id);
                        setVoice(defaultVoice(c.id));
                      }}
                      className={`option relative p-4 text-left ${active ? "option-picked" : ""}`}
                    >
                      {active ? (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: "var(--color-brand-600)" }}>
                          <CheckIcon size={13} />
                        </span>
                      ) : null}
                      <p className="font-bold">{courseName(c.id, lang)}</p>
                      <p className="text-xs font-semibold text-[color:var(--color-brand)]">{courseSub(c.id, lang)}</p>
                      <p className="muted mt-1.5 text-xs leading-relaxed">{t(c.descKey)}</p>
                    </button>
                  );
                })}
              </div>
              <h2 className="mb-2 mt-6 font-bold">{t("onb.which_voice")}</h2>
              <VoicePicker course={course} value={voice} onChange={setVoice} />
              <button
                type="button"
                onClick={() => {
                  if (!nameOk) return setError(t("onb.name_required"));
                  setError(null);
                  if (course === "gsw-zh" && !goal) setGoal("swiss");
                  setStep(1);
                }}
                className="btn btn-primary mt-7 w-full px-6 py-3.5 text-base"
              >
                {t("common.continue_2")}
              </button>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div className="flex items-start gap-3">
                <Mascot mood="think" size={72} stage="onboarding" />
                <p className="muted text-sm leading-relaxed">{t("onb.goal_intro")}</p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {GOALS.map((g) => {
                  const active = goal === g.id;
                  return (
                    <button key={g.id} type="button" onClick={() => setGoal(g.id)} className={`option relative p-4 text-left ${active ? "option-picked" : ""}`}>
                      {active ? (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: "var(--color-brand-600)" }}>
                          <CheckIcon size={13} />
                        </span>
                      ) : null}
                      <p className="font-bold">{t(g.title)}</p>
                      <p className="muted mt-1.5 text-xs leading-relaxed">{t(g.desc)}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setStep(0)} className="btn btn-ghost px-4 py-3 text-sm">
                  {t("common.back")}
                </button>
                <button type="button" disabled={!goal} onClick={() => setStep(2)} className="btn btn-primary flex-1 px-6 py-3 text-base disabled:opacity-60">
                  {t("common.continue_2")}
                </button>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className="flex items-start gap-3">
                <Mascot mood="idle" size={72} stage="onboarding" />
                <p className="muted text-sm leading-relaxed">{t("onb.level_intro")}</p>
              </div>
              <div className="mt-5 grid gap-3">
                <button type="button" onClick={() => setLevelMode("measure")} className={`option p-4 text-left ${levelMode === "measure" ? "option-picked" : ""}`}>
                  <p className="font-bold">{t("onboarding.kisa_yerlestirme_sinavi")}</p>
                  <p className="muted mt-1 text-xs">{t("onb.measure_desc")}</p>
                </button>
                <button type="button" onClick={() => setLevelMode("pick")} className={`option p-4 text-left ${levelMode === "pick" ? "option-picked" : ""}`}>
                  <p className="font-bold">{t("onboarding.pick_level_directly")}</p>
                  <p className="muted mt-1 text-xs">{t("onb.pick_desc")}</p>
                </button>
              </div>
              {levelMode === "pick" ? (
                <>
                  <div className="mt-4 grid gap-2 sm:grid-cols-5">
                    {LEVELS.map((l) => (
                      <button key={l.id} type="button" onClick={() => setLevel(l.id)} className={`option px-3 py-3 text-sm font-bold ${level === l.id ? "option-correct" : ""}`}>
                        {l.id}
                      </button>
                    ))}
                  </div>
                  <p className="muted mt-1.5 text-xs">{t(LEVELS.find((l) => l.id === level)?.desc ?? "")}.</p>
                </>
              ) : null}
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setStep(1)} className="btn btn-ghost px-4 py-3 text-sm">
                  {t("common.back")}
                </button>
                <button
                  type="button"
                  disabled={!levelMode}
                  onClick={toPace}
                  className="btn btn-primary flex-1 px-6 py-3 disabled:opacity-60"
                >
                  {levelMode === "pick" ? t("onb.continue_with", { level }) : t("common.continue_2")}
                </button>
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <div className="flex items-start gap-3">
                <Mascot mood="think" size={72} stage="onboarding" />
                <p className="muted text-body">
                  {t("onb.pace_intro")}
                </p>
              </div>
              <div className="mt-5 grid gap-3">
                {PACES.map((p) => (
                  <button
                    key={p.goal}
                    type="button"
                    onClick={() => setPace(p.goal)}
                    className={`option p-4 text-left ${pace === p.goal ? "option-picked" : ""}`}
                  >
                    <p className="text-h3">{t(p.title)}</p>
                    <p className="muted mt-0.5 text-caption">{t("onboarding.reviews_day", { n: p.goal })}</p>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setStep(2)} className="btn btn-ghost px-4 py-3">
                  {t("common.back")}
                </button>
                <button
                  type="button"
                  disabled={saving || !pace}
                  onClick={() => void finishFromPace()}
                  className="btn btn-primary flex-1 px-6 py-3 disabled:opacity-60"
                >
                  {saving ? t("rounds.saving") : levelMode === "measure" ? t("onb.start_test") : t("common.start")}
                </button>
              </div>
            </>
          ) : null}

          {step === 4 ? (
            <>
              <div className="flex items-start gap-3">
                <Mascot mood="cheer" size={80} stage="onboarding" />
                <div>
                  <p className="font-bold">{t("onb.plan_ready", { name: cleanName })}</p>
                  <p className="muted mt-1 text-sm leading-relaxed">
                    {courseName(course, lang)} · {LEVELS.find((l) => l.id === level)?.id} ·{" "}
                    {t("onb.summary_goal", { goal: goal ? t(GOALS.find((g) => g.id === goal)!.title) : "—" })}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  router.push("/learn");
                  router.refresh();
                }}
                className="btn btn-primary mt-7 w-full px-6 py-3.5 text-base"
              >
                {t("land.cta_button")}
              </button>
            </>
          ) : null}

          {error ? (
            <p className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm" style={{ background: "color-mix(in srgb, var(--color-rose) 12%, transparent)", color: "var(--color-rose)" }}>
              <AlertIcon size={16} /> {error}
            </p>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
