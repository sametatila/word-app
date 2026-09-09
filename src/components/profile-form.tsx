"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertIcon, CheckIcon, ChevronRightIcon } from "@/components/icons";
import { VoicePicker } from "@/components/voice-picker";
import { InstallGuide } from "@/components/install-guide";
import { AnalyticsSettings } from "@/components/analytics-settings";
import { PageBack } from "@/components/page-back";
import { Disclosure } from "@/components/disclosure";
import { SettingRow } from "@/components/setting-row";
import { hasMicConsent, setMicConsent } from "@/lib/mic-consent";
import { ThemeSetting } from "@/components/theme-toggle";
import { useT, useLang } from "@/lib/i18n/client";
import { courseName, courseSub, coursesForNative } from "@/lib/courses";
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
/*
  KURS LİSTESİ ARTIK KAYIT DEFTERİNDEN. Burada `[{ id: "de" }, { id: "gsw-zh" }]`
  diye elle yazılıydı ve iki sonucu vardı: İngilizce kursu `enabled: true`
  olmasına ve içeriği bulunmasına rağmen web'den HİÇ seçilemiyordu, ve liste
  anadile göre süzülmediği için anadili Almanca olan kullanıcıya Almanca
  kursları öneriliyordu. Mobil bunu baştan beri `coursesForNative` ile yapıyor.
*/

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
  initial,
  linkedAccounts,
}: {
  initial: Initial;
  /** Armanın türetildiği hesap kimliği — sıralamadakiyle aynı görünsün diye. */
  userId: string;
  /**
   * Giriş yöntemleri bölümü. Sunucuda çiziliyor (Google yapılandırılmış mı
   * bilgisini istemciye taşımamak için) ama YERİ burası: mobilde HESAP'ın
   * hemen altında.
   */
  linkedAccounts?: ReactNode;
}) {
  const t = useT();
  const lang = useLang();
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [dailyGoal, setDailyGoal] = useState(initial.dailyGoal);
  const [newPerDay, setNewPerDay] = useState(initial.newPerDay);
  const [level, setLevel] = useState(initial.level);
  const [course, setCourse] = useState(initial.course);
  const [voice, setVoice] = useState<string | null>(initial.voice);
  const [saving, setSaving] = useState(false);
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
      <Group title={t("settings.group_account")} />
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
        {/* Hesap silme buradan PROFİLE taşındı (çıkış yapın altına): yıkıcı
            eylem, ad kutusunun bir dokunuş yanında durmamalı. Gerekçenin
            tamamı profile-view.tsx'te. */}
      </Section>

      {/* Giriş yöntemleri HESAP'ın hemen altında — mobildeki sıra. Web'de
          sayfanın dibindeydi, yani "nasıl giriyorum" sorusunun cevabı
          hesabın yanında değil sonundaydı. */}
      {linkedAccounts}

      <Group title={t("settings.group_learning")} />
      <Section title={t("settings.language_to_learn")}>
        <div>
          {/* Kurslar telefonda da yan yana. `sm:grid-cols-2` dar ekranda tek
              sütuna düşüyordu ve kısa etiketler için tam satır harcıyordu. */}
          <div className="grid grid-cols-2 gap-2">
            {coursesForNative(lang).map((c) => (
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
          {/* Yerleştirme testine tek giriş onboarding'di, yani bir kez geçilip
              bir daha ulaşılamıyordu: seviyesinden emin olmayan mevcut kullanıcı
              ancak elle tahmin edebiliyordu. Android aynı yerde, seviye
              çiplerinin hemen altında bu bağlantıyı veriyor. */}
          <Link href="/placement" className="mt-2.5 inline-block text-caption font-bold" style={{ color: "var(--color-brand)" }}>
            {t("settings.not_sure_take_placement_test")}
          </Link>
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

      {/* UYGULAMA DİLİ ve GÖRÜNÜM mobilde İKİ AYRI bölüm. Web'de ikisi
          kurulum, ses ve bildirimle birlikte tek "UYGULAMA" kartındaydı;
          etiketi olmayan bir ayar, aranırken görünmüyor.

          Tema seçimi de üst başlıktan buraya indi: orada her ekranda duran
          ama günde bir kez bile dokunulmayan bir düğmeydi. Ayarın evi
          ayarlar. */}
      <Group title={t("settings.group_app")} />
      <Section title={t("settings.app_language")} bare>
        <LangSetting bare />
      </Section>

      <Section title={t("settings.appearance")} bare>
        <ThemeSetting bare />
      </Section>

      {/* CİHAZ — mobilde karşılığı yok, olamaz da: kurulum tarayıcıya özgü.
          Mobilin sırasını bozmuyor, görünümle gizliliğin arasına kendi
          etiketiyle giriyor.

          BİLDİRİM VE SES BURADA DEĞİL: ikisi de "ne zaman rahatsız
          edilirim" ayarı ve mobilde kendi ekranlarında (`NotificationsScreen`,
          Profil › Bildirimler). Web'de de oraya taşındı; ayarlar ekranında
          durduklarında o ekran mobilde olmayan iki satır taşıyordu. */}
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
      </Section>

      {/* Gizlilik: analitik anahtarı ve hukuki metinler (Play: politika uygulama içinden erişilebilir olmalı). */}
      {/*
        BİLDİRİMLER PROFİLDEN BURAYA. İçeriği zaten ayardı (hatırlatmalar, seri
        koruma, haftalık test) ama profil menüsünde duruyordu ve "Gelen kutusu"
        satırının hemen altında neredeyse aynı adla görünüyordu.
      */}
      <Section title={t("notifications.notifications")} bare>
        <Link
          href="/notifications"
          prefetch={false}
          className="pressable flex items-center gap-3 py-1"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-strong">{t("notifications.reminders")}</span>
            <span className="muted block text-caption">{t("settings.notifications_sub")}</span>
          </span>
          <ChevronRightIcon size={18} style={{ color: "var(--text-faint)" }} />
        </Link>
      </Section>

      <Group title={t("settings.group_privacy_about")} />
      <Section title={t("settings.privacy")} bare>
        <AnalyticsSettings bare />
        {/* Mikrofon onayı yalnız VERİLMİŞSE görünüyor: verilmemiş bir onayı
            geri alma düğmesi göstermek, hiçbir şey yapmayan bir düğme demek.
            Mobil ayarlarda da aynı satır ve aynı koşul var. */}
        <MicConsentRow />
        <SettingRow title={t("settings.privacy_and_terms")} sub={t("settings.privacy_and_terms_sub")}>
          <Link href={legalPath("privacy", lang)} prefetch={false} className="btn btn-ghost h-9 px-3 text-xs">{t("settings.privacy_policy")}</Link>
          <Link href={legalPath("terms", lang)} prefetch={false} className="btn btn-ghost h-9 px-3 text-xs">{t("settings.terms_of_use")}</Link>
        </SettingRow>
        {/*
          İLETİŞİM YÜZEYİ. Apple Guidelines 1.2 kullanıcı içeriği taşıyan
          uygulamalardan filtreleme, bildirme ve engellemenin YANINDA
          "yayımlanmış iletişim bilgisi" de istiyor; ilk üçü vardı, bu yoktu.
          Mobil ayarlarda da aynı satır duruyor — iki taraf ayrışmasın.
        */}
        <SettingRow title={t("settings.support_contact")} sub={t("settings.support_contact_sub")}>
          <Link href={legalPath("support", lang)} prefetch={false} className="btn btn-ghost h-9 px-3 text-xs">{t("settings.support_contact")}</Link>
        </SettingRow>
      </Section>

      {/*
        OTURUM BÖLÜMÜ KALKTI. Çıkış yap Profil ekranının dibinde zaten var ve
        orada onay diyaloğuyla — mobilde de tek yer orası. Hesap silme de
        HESAP bölümüne, adın hemen altına taşındı. Geriye "… olarak girdin,
        ilerlemen senkron" cümlesi kalıyordu; onu söyleyen satır zaten
        Profil'deki kimlik kartı.
      */}
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
/**
 * Grup başlığı — dokuz düz bölüm dört mantıksal gruba alındı (mobil ayarlarla
 * aynı bölünme). Eskiden kurs/seviye/hedef (öğrenme) ile arayüz dili/görünüm
 * (uygulama) ve hesap/gizlilik aynı düzlemdeydi; kullanıcı aradığı ayarı
 * grubun adından değil, satır satır okuyarak buluyordu.
 */
function Group({ title }: { title: string }) {
  return (
    <h2 className="mx-auto mt-8 w-full max-w-3xl text-h3 first:mt-0">{title}</h2>
  );
}

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

/**
 * Yürüyüş modu mikrofon onayının geri alınması.
 *
 * Onay tarayıcıda saklandığı için sunucudan okunamıyor; satır ilk çizimden
 * SONRA beliriyor. Yerinin baştan ayrılmaması bilerek: onayı olmayan
 * kullanıcıda satır hiç yok ve boş bir yer tutucu göstermek yanlış olurdu.
 */
function MicConsentRow() {
  const t = useT();
  const [on, setOn] = useState(false);
  useEffect(() => setOn(hasMicConsent()), []);
  if (!on) return null;
  return (
    <SettingRow title={t("settings.revoke_microphone_consent")} sub={t("settings.you_ll_be_asked_about_voice_data")}>
      <button
        type="button"
        onClick={() => {
          setMicConsent(false);
          setOn(false);
        }}
        className="btn btn-ghost h-9 px-3 text-xs"
      >
        {t("common.discard")}
      </button>
    </SettingRow>
  );
}
