"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mascot, type Mood } from "@/components/mascot";
import { defaultVoice } from "@/lib/tts/voices";
import { AlertIcon, LogoMark } from "@/components/icons";
import { track } from "@/lib/track";
import { saveOnboardingPrefs } from "@/lib/onboarding-prefs";
import { hasFirstWords } from "@/lib/first-words";
import { hasDemoPlacement } from "@/lib/placement-demo";
import { useT, useLang } from "@/lib/i18n/client";
import { LANG_LABEL, NATIVE_LANGS, type NativeLang } from "@/lib/i18n/dict";
import { writeLangCookie } from "@/lib/i18n/set-lang";
import { useSetLang } from "@/lib/i18n/client";
import { courseName, courseSub, offeredNativeLangs, onboardingCoursesFor } from "@/lib/courses";

/*
  İLK AÇILIŞ AKIŞI — MOBİLLE AYNI BEŞ EKRAN.

  Bu dosya webin kendi akışını taşıyordu ve mobilinkiyle örtüşmüyordu: ilk
  ekranda dört soru üst üste duruyor (anlatım dili + ad + kurs + ses), sonra
  webde olup mobilde olmayan bir "neden öğreniyorsun" adımı geliyor, en sonda
  da yalnız webde olan bir özet ekranı. Aynı kullanıcı telefonda ve tarayıcıda
  farklı sorular görüyordu.

  Sıra artık `M/src/screens/OnboardingScreen.tsx` ile BİREBİR aynı ve her
  ekranda TEK karar var:

      welcome → lang → course → level → goal

  Üç soru bilerek düştü:

  • AD. Kayıt formu zaten soruyor (`auth-form`, `auth.your_name_optional`) ve
    sağlayıcıyla girişte addan geliyor. Burada ikinci kez sormak aynı bilgiyi
    iki yerden toplamaktı; mobil hiç sormuyor.
  • SES. Kursun varsayılan sesi zaten doğru (`defaultVoice`) ve ayarlardan
    değiştirilebiliyor. Mobil onboarding'de ses seçici YOK.
  • GÜDÜ ("neden Almanca?"). `profiles.goal`e yazılıyordu ama HİÇBİR YERDE
    okunmuyordu — ne görev seçiminde ne içerik önerisinde. Dört seçenekli bir
    ekran, hiçbir şeyi değiştirmeyen bir cevap için. Sütun duruyor (eski
    kayıtlar), yazan kalmadı.

  Adım adları (`STEP_KEYS`) telemetride mobille aynı kovaya düşüyor: yönetim
  panosundaki huni iki platformu `kind`e göre birlikte topluyor. Eskiden web
  günlük hedef adımına `pace`, güdü adımına `goal` diyordu; Android'de `goal`
  günlük hedef demek. Yani panoda iki ayrı soru tek kovada toplanıyordu.
*/

/** Adım adları — telemetri kovası da bu (mobil `steps()` ile aynı sıra). */
const STEP_KEYS = ["welcome", "lang", "course", "level", "goal"] as const;
type StepKey = (typeof STEP_KEYS)[number];

type Option = { key: string; label: string; sub?: string };
type Step = { key: StepKey; mood: Mood; title: string; subtitle: string; options?: Option[] };

/**
 * Günlük hedef — mobil onboarding'in son adımıyla AYNI üç seçenek ve aynı
 * değerler.
 *
 * HEDEFİN BİRİMİ TEKRAR, DAKİKA DEĞİL. Buradaki sayı doğrudan
 * `profiles.daily_goal`e yazılıyor ve uygulamanın her yerinde "gün başına
 * tekrar" olarak okunuyor (ayarlar, günlük tur, seri). Değerler ayarlardaki
 * ölçekle aynı (10/20/30/50); varsayılan 20 ortadaki.
 */
const PACES = [
  { goal: 10, title: "onboarding.easy" },
  { goal: 20, title: "onboarding.steady" },
  { goal: 50, title: "onboarding.serious" },
];

/* Seviye açıklamaları ayar ekranıyla AYNI anahtarlardan: iki yerde iki ayrı
   cümle görmek, aynı seçimi iki farklı şey sanmaya yol açıyordu. Mobil
   seviye satırını açıklamasız basıyor — o taraftaki eksik, buradaki fazlalık
   değil: A1 ile B1 arasındaki farkı bilmeyen kullanıcı seçemez. */
const LEVELS = [
  { id: "A1", desc: "onboarding.i_m_just_starting_out" },
  { id: "A2", desc: "level.a2_desc" },
  { id: "B1", desc: "level.b1_desc" },
  { id: "B2", desc: "level.b2_desc" },
  { id: "C1", desc: "level.c1_desc" },
];

export function CourseOnboarding({
  signedIn = true,
}: {
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
  const setLang = useSetLang();

  const [i, setI] = useState(0);
  /**
   * Seçimler adım adına göre: `{ lang, course, level, goal }` — mobildeki
   * `choices` ile aynı şekil.
   *
   * Anlatım dili SEÇİLİ BAŞLIYOR: sunucu sayfayı zaten tarayıcının diline
   * göre çiziyor (`lib/i18n/server` `fromAcceptLanguage`), yani bu adımda
   * sorulan şey bir onay. Boş başlatmak, cevabı zaten ekranda olan bir soruda
   * kullanıcıyı beklemeye zorlardı.
   */
  const [choices, setChoices] = useState<Record<string, string>>(() => ({ lang }));
  const [pickedLevel, setPickedLevel] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepKey = STEP_KEYS[i];
  // Onboarding hunisi: hangi adıma kadar gelindi (WP-80).
  useEffect(() => {
    track("onboarding_step", i, stepKey);
  }, [i, stepKey]);

  /* Kurs seçilene kadar listenin ilki ölçü alınıyor: seviye adımının "testle
     belirle" seçeneği o paritenin verisine bağlı. Sabit "de" yedeği DEĞİL —
     anadili Almanca olan kullanıcıda Almanca kurs listede yok. */
  const course = choices.course ?? onboardingCoursesFor(lang)[0]?.id ?? "de";

  const steps: Step[] = [
    {
      key: "welcome",
      mood: "wave",
      title: t("onboarding.welcome_to_lernomi"),
      subtitle: t("onboarding.kisa_turlarla_oyun_gibi_ogren_birk"),
    },
    {
      // ANADİL, kurstan ÖNCE: kurs listesi ve sonraki adımların metni buna
      // bağlı. Karşılamadan sonra duruyor çünkü karşılama ekranında seçim yok.
      key: "lang",
      mood: "idle",
      title: t("onboarding.which_language_should_we_teach"),
      subtitle: t("onboarding.lessons_and_hints_will_be_in"),
      options: offeredNativeLangs().map((l) => ({ key: l, label: LANG_LABEL[l] })),
    },
    {
      key: "course",
      mood: "think",
      title: t("onboarding.which_course_shall_we_start_with"),
      subtitle: t("onboarding.languages_available_now"),
      // Kurs kayıt defterinden türüyor (lib/courses). Anadil elenir (kimse
      // kendi dilini "öğrenilecek dil" olarak seçmez) ve duraklatılmış lehçe
      // kursu ilk açılışta sunulmaz — Ayarlar'dan hâlâ seçilebilir.
      options: onboardingCoursesFor(lang).map((c) => ({
        key: c.id,
        label: courseName(c.id, lang),
        sub: courseSub(c.id, lang),
      })),
    },
    {
      key: "level",
      mood: "idle",
      title: t("onboarding.where_shall_we_start"),
      subtitle: t("onboarding.you_can_start_at_level_that"),
      options: [
        { key: "A1", label: t("onboarding.from_scratch"), sub: t("onboarding.i_m_just_starting_out") },
        { key: "pick", label: t("onboarding.pick_your_level"), sub: t("onboarding.pick_level_directly") },
        /*
          "Testle belirle" yalnız gidilecek bir test varsa. Oturum açıkken
          gerçek yerleştirme sunucuda puanlanıyor (`/placement`) ve her kursta
          var; misafirde ise giriş öncesi örnek tur oynatılıyor ve o yalnız
          verisi olan paritede duruyor. Yoksa seçenek hiç görünmüyor —
          seçilip boş bir teste düşmektense hiç sunulmamalı.
        */
        ...(signedIn || hasDemoPlacement(lang, course)
          ? [{ key: "test", label: t("onboarding.find_out_with_test"), sub: t("onboarding.kisa_yerlestirme_sinavi") }]
          : []),
      ],
    },
    {
      key: "goal",
      mood: "cheer",
      title: t("onboarding.what_s_your_daily_goal"),
      subtitle: t("onboarding.istedigin_zaman_degistirebilirsin"),
      options: PACES.map((p) => ({
        key: String(p.goal),
        label: t(p.title),
        sub: t("onboarding.reviews_day", { n: p.goal }),
      })),
    },
  ];

  const step = steps[i];
  const chosen = choices[step.key];
  const last = i === steps.length - 1;
  // Seviye adımında "Seviyeni seç" işaretliyse ayrıca bir seviye seçilmeli.
  const levelPickPending = step.key === "level" && chosen === "pick" && !pickedLevel;
  const canNext = (!step.options || Boolean(chosen)) && !levelPickPending;

  /**
   * Anadil seçimi HEMEN uygulanır: sonraki adımların metni ve kurs listesi
   * ona bağlı, sona bırakılsaydı kullanıcı akışın geri kalanını eski dilde
   * görürdü. Sayfa tazeleniyor çünkü metinlerin bir kısmı sunucuda çözülüyor.
   *
   * Dil değişince seçili kurs geçersiz kalabilir: Almanca kursu seçtikten
   * sonra arayüzünü Almancaya alan kullanıcıda o kurs listeden düşüyor.
   * Sessizce bırakılsaydı hiçbir seçenek işaretli görünmez ve kullanıcı
   * ilerleyemezdi. Mobildeki `pick()` ile aynı davranış: seçimi sil.
   */
  function applyLang(next: NativeLang) {
    setChoices((c) => {
      const out: Record<string, string> = { ...c, lang: next };
      if (out.course && !onboardingCoursesFor(next).some((x) => x.id === out.course)) delete out.course;
      return out;
    });
    if (next === lang) return;
    track("setting_change", NATIVE_LANGS.indexOf(next), "lang");
    writeLangCookie(next);
    // Hesap henüz yoksa karar diğer tercihlerle birlikte saklanıyor ve giriş
    // yapılınca profile taşınıyor (bkz. lib/onboarding-prefs).
    saveOnboardingPrefs({ nativeLang: next });
    /*
      TAZELEME YOK. Burada `router.refresh()` vardı ve tazeleme sihirbazı
      YENİDEN KURUYORDU: kullanıcı ikinci adımda dilini seçiyor, birinci adıma
      geri düşüyordu (üretimde ölçüldü — "Deutsch"a basınca ekran
      "Willkommen bei Lernomi"ye dönüyor). Dil istemcide çevriliyor: metinler
      anında değişiyor, adım yerinde kalıyor. Çerez zaten yazıldı, sunucu bir
      sonraki çiziminde onu okuyacak.
    */
    setLang(next);
  }

  function pick(key: StepKey, value: string) {
    setError(null);
    if (key === "lang") return applyLang(value as NativeLang);
    setChoices((c) => ({ ...c, [key]: value }));
  }

  /**
   * Kararları yazar. Oturum varsa profile, yoksa cihaza.
   *
   * SES SEÇİLMİYOR, KURSTAN TÜRÜYOR. Ses seçici bu akıştan kalktı; kursun
   * varsayılan sesi her zaman o kursun dilinde konuşuyor. Ayrıca yazılıyor ki
   * kurs değişince sunucudaki ses de onunla gitsin (`resolveVoice`).
   */
  async function save(extra: { level: string; dailyGoal?: number }): Promise<boolean> {
    const voice = defaultVoice(course);
    if (!signedIn) {
      saveOnboardingPrefs({
        course,
        voice,
        nativeLang: lang,
        level: extra.level,
        ...(extra.dailyGoal ? { dailyGoal: extra.dailyGoal } : {}),
      });
      return true;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ course, voice, nativeLang: lang, ...extra }),
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
   * Son adımdan sonra yol ayrılıyor — mobildeki `finish()` ile aynı üç yol.
   *
   *   test        → yerleştirme (seviye testin sonunda yazılır)
   *   A1 / pick   → ısınma (misafir) ya da doğrudan öğrenme (oturum var)
   */
  async function finish() {
    const daily = choices.goal ? parseInt(choices.goal, 10) : undefined;
    if (choices.level === "test") {
      // Profil önce kaydedilir (kurs/hedef); seviye testin sonunda yazılır.
      if (!(await save({ level: "A1", dailyGoal: daily }))) return;
      track("nav", 0, "onboarding:placement");
      /* MİSAFİR DE TESTE GİDİYOR. Gerçek yerleştirme sunucuda puanlanıyor ve
         hesap istiyor; `/level-test` mobildeki kısa örnek turu oynatıyor,
         sonucu yerel tercihlere yazıyor ve hesap açılınca profile taşınıyor. */
      router.push(signedIn ? "/placement" : "/level-test");
      return;
    }
    const level = choices.level === "pick" ? (pickedLevel ?? "A1") : "A1";
    if (!(await save({ level, dailyGoal: daily }))) return;
    track("nav", 0, "onboarding:level");
    /*
      MİSAFİR ISINMAYA GİDİYOR. Mobilde "sıfırdan" ve "seviyeni seç"
      yollarının ikisi de giriş duvarından önce beş kelimeden geçiyor; o
      ısınma, hesap açmanın gerekçesi. Isınma seti olmayan paritede adım
      atlanıyor ve doğrudan hesap açılıyor.

      Isınma seti KULLANICININ DİLİNE göre aranıyor. Burada sabit "tr"
      yazıyordu: arayüzü İngilizce olan kullanıcı Türkçe setin varlığına
      bakılarak yönlendiriliyordu.
    */
    if (!signedIn) {
      router.push(hasFirstWords(lang, course) ? "/first-words" : "/login?mode=signup");
      return;
    }
    router.push("/learn");
    router.refresh();
  }

  function next() {
    if (!canNext || saving) return;
    if (last) return void finish();
    setI((n) => n + 1);
  }

  return (
    /*
      Blok DİKEY ORTALI, düğme ekranın dibine yapışık değil: mobilde ekran
      zaten kısa ve fark etmiyor ama masaüstünde içerik ortada, "Devam et"
      görünüm alanının en altında kalıyordu.

      Oturum açıkken üstte daha çok boşluk var: sayfanın kendisi oraya sabit
      bir "Çıkış yap" şeridi çiziyor (app/setup/page.tsx) ve logo satırı onun
      altından geçmeli.
    */
    <main className={`mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-4 pb-10 ${signedIn ? "pt-20" : "pt-10"}`}>
      <div className="mb-7 flex items-center gap-3">
        <LogoMark size={32} />
        {/* İlerleme şeridi: geçilen adımlar dolu, bulunduğun adım geniş —
            "kaçtayım" ve "daha ne kadar var" tek bakışta. */}
        <ol className="flex flex-1 items-center gap-1.5" aria-hidden>
          {steps.map((s, n) => (
            <li
              key={s.key}
              className="h-1.5 rounded-full transition-all duration-200"
              style={{ flex: n === i ? "2 1 0%" : "1 1 0%", background: n <= i ? "var(--color-brand)" : "var(--surface-2)" }}
            />
          ))}
        </ol>
      </div>

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step.key}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start gap-3">
              <Mascot mood={step.mood} size={72} stage="onboarding" />
              <div>
                <h1 className="text-h3">{step.title}</h1>
                <p className="muted mt-1 text-sm leading-relaxed">{step.subtitle}</p>
              </div>
            </div>

            {step.options ? (
              <div className="mt-6 grid gap-3">
                {step.options.map((o) => {
                  const active = chosen === o.key;
                  return (
                    <button
                      key={o.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => pick(step.key, o.key)}
                      className={`option flex items-center gap-3 p-4 text-left ${active ? "option-picked" : ""}`}
                    >
                      {/* Radyo işareti: aynı anda tek cevap olduğunu seçeneğin
                          kendisi söylüyor — mobildeki satırla aynı. */}
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2"
                        style={{ borderColor: active ? "var(--color-brand)" : "var(--border)" }}
                      >
                        {active ? <span className="h-3 w-3 rounded-full" style={{ background: "var(--color-brand)" }} /> : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-bold">{o.label}</span>
                        {o.sub ? <span className="muted block text-xs leading-relaxed">{o.sub}</span> : null}
                      </span>
                    </button>
                  );
                })}

                {/* "Seviyeni seç" için satır içi seviye seçici (A1–C1) */}
                {step.key === "level" && chosen === "pick" ? (
                  <div>
                    <div className="grid grid-cols-5 gap-2">
                      {LEVELS.map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          aria-pressed={pickedLevel === l.id}
                          onClick={() => setPickedLevel(l.id)}
                          className={`option px-2 py-3 text-sm font-bold ${pickedLevel === l.id ? "option-picked" : ""}`}
                        >
                          {l.id}
                        </button>
                      ))}
                    </div>
                    {/* Açıklama YALNIZ seçimden sonra: seçilmemişken buraya
                        "Seviyemi biliyorum" yazıyordu, yani hemen üstteki
                        şıkkın alt satırının aynısı. Düğme zaten seçim
                        yapılana kadar kapalı — söylenecek bir şey yok. */}
                    {pickedLevel ? (
                      <p className="muted mt-2 text-xs leading-relaxed">{t(LEVELS.find((l) => l.id === pickedLevel)!.desc)}.</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}

            {error ? (
              <p
                className="mt-4 flex items-center gap-2 rounded-panel px-3 py-2 text-sm"
                style={{ background: "color-mix(in srgb, var(--color-rose-500) 14%, transparent)", color: "var(--color-rose)" }}
              >
                <AlertIcon size={16} /> {error}
              </p>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex gap-2">
        {i > 0 ? (
          <button type="button" onClick={() => setI((n) => n - 1)} className="btn btn-ghost px-4 py-3 text-sm">
            {t("common.back")}
          </button>
        ) : null}
        <button
          type="button"
          disabled={!canNext || saving}
          onClick={next}
          className="btn btn-primary flex-1 px-6 py-3.5 text-base disabled:opacity-60"
        >
          {saving ? t("rounds.saving") : t("common.continue_2")}
        </button>
      </div>

      {/*
        KAYITLI KULLANICININ ÇIKIŞI — mobildeki "Zaten hesabım var" ile aynı iş.
        Bu ekran yalnızca yeni kullanıcıya soru soruyor; kayıtlı biri (yeni
        cihaz, silip yeniden kurma) bunların hiçbirini yanıtlamak zorunda değil.
        Oturum açıkken görünmüyor: o durumda çıkış kapısı sayfanın kendisinde
        (bkz. app/setup/page.tsx `SignOutLink`).
      */}
      {!signedIn ? (
        <p className="muted mt-5 text-center text-sm">
          {t("auth.already_have_account")}
          {/* ÇIKIŞ ÖLÇÜLÜYOR (value = kaçıncı adım, kind = adım anahtarı).
              Mobil bunu baştan beri yazıyordu (`OnboardingScreen`
              `zatenHesabimVar`), web yazmıyordu: "kayıtlı kullanıcılar akışın
              neresinde kendini buluyor" sorusunun yarısı eksikti ve o çıkışlar
              akışı TERK edenlerle karışıyordu — `onboarding_step` orada susuyor. */}
          <Link
            href="/login"
            onClick={() => track("onboarding_existing_account", i, step.key)}
            className="font-bold"
            style={{ color: "var(--color-brand)" }}
          >
            {t("auth.sign_in")}
          </Link>
        </p>
      ) : null}
    </main>
  );
}
