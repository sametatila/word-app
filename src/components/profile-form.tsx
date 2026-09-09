"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authApi } from "@/lib/auth/api";
import { AlertIcon, CheckIcon } from "@/components/icons";
import { VoicePicker } from "@/components/voice-picker";
import { InstallGuide } from "@/components/install-guide";
import { PushSettings } from "@/components/push-settings";
import { SoundSettings } from "@/components/sound-settings";
import { AnalyticsSettings } from "@/components/analytics-settings";
import { PageBack } from "@/components/page-back";
import { Disclosure } from "@/components/disclosure";
import { SettingRow } from "@/components/setting-row";
import { ThemeSetting } from "@/components/theme-toggle";
import { useT, useLang } from "@/lib/i18n/client";
import { courseName, courseSub } from "@/lib/courses";
import { LangSetting } from "@/components/lang-setting";
import { defaultVoice, type VoiceId } from "@/lib/tts/voices";
import { track } from "@/lib/track";
import { legalPath } from "@/lib/legal";

type Initial = {
  displayName: string;
  dailyGoal: number;
  newPerDay: number;
  level: string;
  course: string;
  voice: string | null;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
};

/**
 * Ayarlarda seçilebilen kurslar.
 *
 * Ad ve alt satır artık BURADA yazılı değil: kurs kayıt defterinden
 * (`lib/courses`) arayüz diline göre okunuyor. Sabit yazılıyken arayüz
 * İngilizceye alındığında bile "Almanca / Hochdeutsch" diyordu.
 */
const COURSES = [{ id: "de" }, { id: "gsw-zh" }];

/** Seviyeler — açıklama sözlükten, kod (A1…C1) dilden bağımsız. */
const LEVELS = [
  { id: "A1", label: "A1", descKey: "onboarding.i_m_just_starting_out" },
  { id: "A2", label: "A2", descKey: "level.a2_desc" },
  { id: "B1", label: "B1", descKey: "level.b1_desc" },
  { id: "B2", label: "B2", descKey: "level.b2_desc" },
  { id: "C1", label: "C1", descKey: "level.c1_desc" },
];

/**
 * Ayarlar ekranı.
 *
 * Eskiden profilin kendisiydi: kimlik başlığı, araya giren ilerleme kartları
 * ve en altta ayarlar. Sesi kapatmak isteyen biri her seferinde bütün profili
 * geçmek zorundaydı. Artık ayrı bir sayfa (/profile/settings) ve profilden tek
 * dokunuşla açılıyor — kimlik orada kalıyor, buraya yalnızca değiştirilen
 * şeyler geliyor.
 */
export function ProfileForm({
  userId,
  initial,
  accountName,
  authEnabled,
}: {
  initial: Initial;
  accountName: string | null;
  /** Armanın türetildiği hesap kimliği — sıralamadakiyle aynı görünsün diye. */
  userId: string;
  authEnabled: boolean;
}) {
  const t = useT();
  const lang = useLang();
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [dailyGoal, setDailyGoal] = useState(initial.dailyGoal);
  const [newPerDay, setNewPerDay] = useState(initial.newPerDay);
  const [level, setLevel] = useState(initial.level);
  const [course, setCourse] = useState(initial.course);
  const [voice, setVoice] = useState<string | null>(initial.voice);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // İsim boş bırakılamıyor (bkz. api/profile): sunucu zaten reddediyor, burada
  // kaydet düğmesini kapatmak kullanıcıya sebebini önceden gösteriyor.
  const cleanName = displayName.trim().replace(/\s+/g, " ");
  const nameOk = cleanName.length >= 2;

  async function save() {
    if (!nameOk) {
      setSaveError(t("prof.name_required"));
      return;
    }
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ displayName: cleanName, dailyGoal, newPerDay, level, course, voice }),
      });
      if (res.ok) {
        // Hangi ayar değişti (WP-80): "seviyeyi kimse değiştirmiyor" ya da
        // "günlük hedef hep düşürülüyor" gibi kararlar buradan okunur.
        if (cleanName !== initial.displayName) track("setting_change", 0, "name");
        if (dailyGoal !== initial.dailyGoal) track("setting_change", dailyGoal, "daily_goal");
        if (newPerDay !== initial.newPerDay) track("setting_change", newPerDay, "new_per_day");
        if (level !== initial.level) track("setting_change", 0, "level");
        if (course !== initial.course) track("setting_change", 0, "course");
        if (voice !== initial.voice) track("setting_change", 0, "voice");
        setSaved(true);
        setTimeout(() => setSaved(false), 2200);
      } else if (res.status === 401) {
        setSaveError(t("prof.session_expired"));
      } else {
        setSaveError(t("prof.save_failed"));
      }
    } catch {
      setSaveError(t("autherrorw.network"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <PageBack fallback="/profile" title={t("settings.settings")} />

      {/*
        AYARLAR İKİYE AYRILDI.

        Önce beş ayrı kart vardı — "Ayarlar", "Uygulama olarak kur", davet, ses
        ve bildirim — ve aralarına ilerleme kartları da karışıyordu. Hepsi aynı
        ağırlıkta beyaz kutulardı, yani sayfa "önce bakılacak şeyler, sonra
        değiştirilecek şeyler" diye okunmuyordu.

        Şimdi iki başlık var: ÖĞRENME (turun nasıl kurulacağı) ve UYGULAMA
        (cihazda nasıl çalışacağı). Aradaki fark kullanıcının aradığı şeyin
        farkı: biri "günde kaç kelime", diğeri "sesi kapat".
      */}
      {/*
        AYARLAR BÖLÜM BÖLÜM — mobil `SettingsScreen` ritmi.

        Önce iki büyük kart vardı: ÖĞRENME (turun nasıl kurulacağı) ve
        UYGULAMA (cihazda nasıl çalışacağı). Ayrım doğruydu ama kart fazla
        büyüktü: kurs, ses, ad, seviye ve iki kaydırıcı aynı beyaz kutunun
        içinde alt alta duruyor ve aralarındaki tek sınır bir boşluktu.
        Aranan ayarı bulmak için kutunun tamamını okumak gerekiyordu.

        Mobilde her kavramın kendi bölümü var: üstte küçük harfli bir
        etiket, altında yalnız o kavramın kartı. Etiket zaten ne olduğunu
        söylediği için kartın içindeki tekrar eden başlıklar da kalktı.
      */}
      <Section title={t("settings.account")}>
        <label className="block">
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={60}
            placeholder={t("settings.display_name")}
            className="option w-full px-4 py-3 text-base outline-none focus:border-[color:var(--color-brand)]"
          />
        </label>
      </Section>

      <Section title={t("settings.language_to_learn")}>
        <div>
          {/* İki kurs telefonda da yan yana. `sm:grid-cols-2` dar ekranda tek
              sütuna düşüyordu ve iki kısa etiket için iki tam satır harcıyordu. */}
          <div className="grid grid-cols-2 gap-2">
            {COURSES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCourse(c.id);
                  // Ses kursa bağlı: Zürih metnini Almanca sesle okutmak
                  // bu değişikliğin çözdüğü sorunun ta kendisiydi.
                  setVoice(defaultVoice(c.id));
                }}
                className={`option px-3 py-3 text-left ${course === c.id ? "option-correct" : ""}`}
              >
                <span className="block text-strong">{courseName(c.id, lang)}</span>
                <span className="muted block text-caption">{courseSub(c.id, lang)}</span>
              </button>
            ))}
          </div>
          {course !== initial.course ? (
            <p
              className="mt-2 rounded-xl px-3 py-2 text-xs"
              style={{
                background: "color-mix(in srgb, var(--color-brand) 10%, transparent)",
                color: "var(--color-brand)",
              }}
            >
              {t("settings.course_switch_note")}
            </p>
          ) : null}
        </div>
      </Section>

      <Section title={t("settings.level")}>
        <div>
          {/* Beş seviye tek satırda. `sm:grid-cols-5` telefonda tek sütuna
              düşüyor ve "A1".."C1" gibi iki karakterlik etiketler için beş tam
              satır, yaklaşık 230 piksel harcıyordu — ayarların tek en uzun
              parçasıydı. */}
          <div className="grid grid-cols-5 gap-1.5">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLevel(l.id)}
                className={`option px-1 py-2.5 text-sm font-bold ${
                  level === l.id ? "option-correct" : ""
                }`}
                title={t(l.descKey)}
              >
                {l.label}
              </button>
            ))}
          </div>
          {/* Havuzun nasıl kurulduğu (çoğu bu seviyeden, bir kısmı alttan,
              bitince üst seviye) bir kez öğrenilen şeydi ve her ayar açılışında
              dört satır yer kaplıyordu. Kalan tek ek bilgi kullanıcıyı
              ilgilendiren tek şey: bu düğmeyi ondan başkası çevirmiyor. */}
          <p className="muted mt-1.5 text-xs">
            {t(LEVELS.find((l) => l.id === level)?.descKey ?? "")}.{" "}
            {t("settings.only_you_change_level")}
          </p>
        </div>
      </Section>

      <Section title={t("settings.reading_voice")}>
        <div>
          <VoicePicker
            course={course}
            value={voice}
            onChange={(v: VoiceId) => setVoice(v)}
            compact
          />
        </div>
      </Section>

      <Section title={t("settings.daily_goal_reviews_day")}>
        <Slider
          label={t("settings.daily_goal_short")}
          value={dailyGoal}
          min={5}
          max={120}
          step={5}
          suffix={t("settings.reviews_unit")}
          onChange={setDailyGoal}
        />
        <Slider
          label={t("settings.new_per_day")}
          value={newPerDay}
          min={0}
          max={40}
          step={1}
          suffix={t("settings.words_unit")}
          onChange={setNewPerDay}
        />
        {/* Tekrar mantığı eskiden ayrı bir "Tekrar sistemi" kartındaydı: dört
            satır, hiçbir eylem yok. Bilginin ait olduğu yer burası — hedefi
            ayarlayan kişinin merak ettiği tek şey o sayının neyi belirlediği.
            Kaydırıcıların ÜSTÜNDEYDİ ve negatif boşluk yüzünden ilk etiketin
            üstüne biniyordu; notun yeri zaten anlattığı şeyin altı. */}
        <p className="muted -mt-1 text-caption">{t("settings.srs_note")}</p>
      </Section>

      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => void save()}
            disabled={saving || !nameOk}
            className="btn btn-primary px-6 py-3 disabled:opacity-60"
          >
            {saving ? t("settings.saving") : t("common.save")}
          </button>
          {saved ? (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 text-sm font-semibold text-[color:var(--color-mint)]"
            >
              <CheckIcon size={16} /> {t("settings.saved")}
            </motion.span>
          ) : null}
        </div>
        {saveError ? (
          <p
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
            style={{
              background: "color-mix(in srgb, var(--color-rose) 12%, transparent)",
              color: "var(--color-rose)",
            }}
          >
            <AlertIcon size={16} /> {saveError}
          </p>
        ) : null}
      </div>

      {/* Uygulama ayarları tek kartta, ayırıcı çizgilerle. Sıra bir kuralı
          izliyor: iPhone'da bildirim ancak uygulama ana ekrana eklenmişken
          çalışıyor, o yüzden kurulum bildirimden önce geliyor. */}
      <Section title={t("settings.app")} bare>
        {/* Kurulum rehberi açılır kutuda. Üç numaralı adım, cihaz seçici ve
            açıklama metni 330 piksel tutuyordu ve bu, hayatta BİR KEZ yapılan
            bir işin yönergesi — zaten kurmuş olan kullanıcı her ayar açılışında
            onu geçmek zorunda kalıyordu. */}
        <div className="p-5">
          <Disclosure title={t("settings.add_to_home")} hint={t("settings.add_to_home_hint")}>
            <InstallGuide tone="plain" />
          </Disclosure>
        </div>
        {/*
          Tema seçimi üst başlıktan buraya indi. Orada her ekranda duran bir
          düğmeydi ama günde bir kez bile dokunulmayan bir tercih; başlıkta
          yer kaplıyor ve avatarla birlikte dar telefonlarda taşıyordu.
          Ayarın evi ayarlar.
        */}
        {/* Dil, görünümün hemen üstünde: mobilde de "uygulama dili" ile
            "görünüm" ardışık ve ikisi de uygulamanın kendisiyle ilgili
            (öğrenilen dil değil, arayüz). */}
        <LangSetting />
        <ThemeSetting />
        <SoundSettings bare />
        <PushSettings bare />
      </Section>

      {/* Gizlilik: analitik anahtarı ve hukuki metinler (Play: politika uygulama içinden erişilebilir olmalı). */}
      <Section title={t("settings.privacy")} bare>
        <AnalyticsSettings bare />
        <SettingRow title={t("settings.privacy_and_terms")} sub={t("settings.privacy_and_terms_sub")}>
          <Link href={legalPath("privacy", lang)} prefetch={false} className="btn btn-ghost h-9 px-3 text-xs">{t("settings.privacy_policy")}</Link>
          <Link href={legalPath("terms", lang)} prefetch={false} className="btn btn-ghost h-9 px-3 text-xs">{t("settings.terms_of_use")}</Link>
        </SettingRow>
      </Section>

      {/* Hesap da satır. "Giriş yaptın, ilerlemen senkron" cümlesi kalıyor
          çünkü çıkış yapmadan önce bilinmesi gereken tek şey o; ama iki satır
          metin ve tam genişlikte bir düğme için 172 piksel gerekmiyordu. */}
      <Section title={t("settings.session")} bare>
        {authEnabled ? (
          <SettingRow
            title={t("settings.account_row")}
            sub={t("settings.account_sub", { name: accountName ?? "" })}
          >
            <button
              onClick={async () => {
                setSigningOut(true);
                try {
                  await authApi("sign-out", {});
                } catch {
                  /* yine de ana sayfaya dön */
                }
                router.push("/");
                router.refresh();
              }}
              disabled={signingOut}
              className="btn btn-ghost h-9 px-3.5 text-xs disabled:opacity-60"
            >
              {signingOut ? t("settings.signing_out") : t("profile.log_out")}
            </button>
          </SettingRow>
        ) : (
          <SettingRow
            title={t("settings.demo_mode")}
            sub={t("settings.demo_mode_sub")}
          />
        )}
        {authEnabled ? (
          <SettingRow title={t("settings.delete_account")} sub={t("settings.with_all_your_data_can_t_be")}>
            <Link href="/account/delete" prefetch={false} className="btn btn-ghost h-9 px-3.5 text-xs" style={{ color: "var(--color-rose-500)" }}>
              {t("common.delete")}
            </Link>
          </SettingRow>
        ) : null}
      </Section>

    </div>
  );
}

/**
 * Ayar bölümü — üstte küçük etiket, altında kart. Mobil `SettingsScreen`in
 * `Section`u ile aynı: etiket kartın İÇİNDE bir başlık değil, kartın DIŞINDA
 * bir ad. Fark küçük görünüyor ama bölümler arasındaki sınırı görünür kılan
 * şey bu — kart içi başlık, kartı bir öncekinin devamı gibi gösteriyordu.
 *
 * `bare`: kartın kendi dolgusu yok (satırlar kendi dolgusunu taşıyor).
 */
function Section({
  title,
  bare,
  children,
}: {
  title: string;
  bare?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-3xl">
      <p className="muted mb-2 ml-1 text-caption tracking-wide">{title}</p>
      <div className={bare ? "card divide-y divide-[color:var(--hairline)] overflow-hidden" : "card space-y-4 p-5"}>
        {children}
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-sm font-semibold">
        <span className="muted">{label}</span>
        <span className="text-[color:var(--color-brand)]">
          {value} {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[color:var(--color-brand)] surface-2"
      />
    </label>
  );
}
