"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import { ChevronNextIcon, WarningIcon } from "@/components/icons";
import { SocialSettings } from "@/components/social/social-settings";
import type { SocialMeView } from "@/lib/social/client";
import { VoicePicker } from "@/components/voice-picker";
import { InstallGuide } from "@/components/install-guide";
import { AnalyticsSettings } from "@/components/analytics-settings";
import { AiConsentSettings } from "@/components/ai-consent-settings";
import { SoundSettings } from "@/components/sound-settings";
import { Disclosure } from "@/components/disclosure";
import { SettingRow } from "@/components/setting-row";
import { hasMicConsent, revokeMicConsent } from "@/lib/mic-consent";
import { ThemeSetting } from "@/components/theme-toggle";
import { useT, useLang } from "@/lib/i18n/client";
import { Group, Row, SETTINGS_TITLE, SettingsPanelTitle } from "@/components/settings-section";
import { Field, InsetList } from "@/components/field";
import { LinkedAccounts } from "@/components/account/linked-accounts";
import { courseName, courseSub, selectableCourses } from "@/lib/courses";
import { LangSetting } from "@/components/lang-setting";
import { resolveVoice, type VoiceId } from "@/lib/tts/voices";
import { track } from "@/lib/track";
import { legalPath } from "@/lib/legal";
import { PROFILE_LIMITS } from "@/lib/profile-limits";

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
  kursları öneriliyordu. Mobil bunu baştan beri `coursesForNative` ile yapıyor;
  bugün iki taraf da `selectableCourses`a bakıyor (duraklatılmış kurs yalnız
  mevcut öğrencisine).
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
export type SettingsSection = "learning" | "app" | "account" | "security" | "privacy" | "about";

/**
 * AYARLAR GRUP GRUP (2026-09-28, Samet'in kararı; `docs/plan/profil-ayarlar-topluluk.md`).
 * `/profile/settings` kısa bir liste, her grup kendi adresinde
 * (`/profile/settings/<bölüm>`); masaüstünde liste solda, grup sağda. Bu form
 * yalnız istenen grubu çiziyor. Sosyal ayarlar (kullanıcı adı, görünürlük,
 * izinler, engellenenler) Hesap ve Gizlilik'e taşındı; `/friends/settings`
 * Gizlilik'e yönleniyor.
 */
export function ProfileForm({
  initial,
  googleEnabled,
  section,
  social,
  version,
}: {
  section: SettingsSection;
  /** Hesap ve Gizlilik gruplarının sosyal kısmı; okunamadıysa null. */
  social?: SocialMeView | null;
  /** Hakkında grubunun dibindeki sürüm satırı. */
  version?: string;
  initial: Initial;
  /** Armanın türetildiği hesap kimliği — sıralamadakiyle aynı görünsün diye. */
  userId: string;
  /** Google giriş açık mı — sır değil, `/api/config` de aynı bayrağı veriyor. */
  googleEnabled: boolean;
}) {
  const t = useT();
  const lang = useLang();
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [dailyGoal, setDailyGoal] = useState(initial.dailyGoal);
  const [newPerDay, setNewPerDay] = useState(initial.newPerDay);
  const [level, setLevel] = useState(initial.level);
  const [course, setCourse] = useState(initial.course);
  const [voice, setVoice] = useState<string | null>(initial.voice);
  /**
   * Yalnız HATA. Kayıt dokunulduğu anda olduğu için başarı ayrıca
   * söylenmiyor: kontrolün kendisi zaten yeni durumu gösteriyor (çip aktif
   * olur, kaydırıcının sayısı değişir). Her dokunuşa "Kaydedildi" yazmak
   * sayfayı bir bildirim akışına çevirirdi.
   */
  const [saveError, setSaveError] = useState<string | null>(null);
  /**
   * Adın KENDİ hata satırı. Genel hata satırı sayfanın başında duruyor ve
   * "ad iki karakterden kısa" mesajı oraya düşseydi, kullanıcı yazdığı
   * kutudan uzakta bir cümle okuyacaktı. Kaydet düğmesi varken bu sorun
   * yoktu: düğme kapalı kalıyordu ve sebebi yanındaydı.
   */
  const [nameError, setNameError] = useState<string | null>(null);

  // İsim boş bırakılamıyor (bkz. api/profile): sunucu zaten reddediyor, burada
  // kaydet düğmesini kapatmak kullanıcıya sebebini önceden gösteriyor.
  const cleanName = displayName.trim().replace(/\s+/g, " ");
  const nameOk = cleanName.length >= 2;

  /**
   * TEK KAYDETME MODELİ — her ayar dokunulduğu anda yazılıyor.
   *
   * Eskiden sayfada iki model birden vardı: arayüz dili, tema, bildirim ve
   * analitik anında kaydediliyor; ad, seviye, hedef, kurs ve ses ise
   * ortadaki "Kaydet" düğmesini bekliyordu. İkisi arasında hiçbir görsel
   * fark yoktu ve düğme ekranın ortasındaydı — altındaki ayarların ona ait
   * olmadığı hiçbir yerde yazmıyordu. Mobilde ayrım daha da kaymıştı: orada
   * kurs ve ses ANINDA kaydediliyordu, yani aynı kontrol iki platformda
   * farklı davranıyordu. Azınlık çoğunluğa uyduruldu; düğme kalktı.
   */
  async function patch(fields: Record<string, unknown>, onOk?: () => void) {
    setSaveError(null);
    try {
      const res = await apiFetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) { onOk?.(); return; }
      setSaveError(res.status === 401 ? t("prof.session_expired") : t("prof.save_failed"));
    } catch {
      setSaveError(t("autherrorw.network"));
    }
  }

  const nameRow = (
    <Row label={t("settings.sec_name")}>
      {/* Alan bloğu (`components/field.tsx`): hata satırı kutunun 8 altında;
          payı yoktu, kutuya yapışıktı. */}
      <Field error={nameError} errorId="profile-name-error">
        <input
        value={displayName}
        enterKeyHint="done"
        onChange={(e) => setDisplayName(e.target.value)}
        /*
          ODAKTAN ÇIKINCA yazılıyor, her tuşta değil: her harfte bir istek
          atmak sunucuya gereksiz yük, üstelik yarım yazılmış bir adı
          kaydederdi. Boş ad sunucuda da reddediliyor; burada hiç
          gönderilmiyor ki kullanıcı sebepsiz bir hata satırı görmesin.
        */
        onBlur={() => {
          if (!nameOk) { setNameError(t("prof.name_required")); return; }
          setNameError(null);
          if (cleanName !== initial.displayName) void patch({ displayName: cleanName }, () => track("setting_change", 0, "name"));
        }}
        /* UZUNLUK SUNUCUNUN TUTTUĞU KADAR. Kutu 60 karakter kabul
           ediyordu ama uç adı 40'a kırpıyor (`/api/profile`
           `name.slice(0, 40)`): kullanıcı 55 karakterlik adını yazıp
           kaydediyor, ekran "kaydedildi" diyor ve ad bir sonraki açılışta
           kısalmış oluyordu — sessiz bir kayıp. §144'ün kuralının ters
           yönü: yüzey, sunucunun KABUL ETTİĞİNDEN AZ da teklif etmemeli,
           TUTTUĞUNDAN ÇOK da. */
        maxLength={PROFILE_LIMITS.displayNameMax}
        placeholder={t("settings.display_name")}
        /* Ad alanı Android ile aynı: kelime başlarını büyütüyor (bkz.
           `screens/SettingsScreen`). */
        autoCapitalize="words"
        aria-label={t("settings.sec_name")}
        aria-invalid={nameError ? true : undefined}
        aria-describedby={nameError ? "profile-name-error" : undefined}
        /* `.input` (auth-shell'deki gibi): `.option` bir seçim kutusu,
           üzerine gelince kalkıyor ve odak halkası yoktu. Ölçü aynı (12/16). */
        className="input w-full"
        />
      </Field>
      {/* Hesap silme buradan PROFİLE taşındı (çıkış yapın altına): yıkıcı
        eylem, ad kutusunun bir dokunuş yanında durmamalı. Gerekçenin
        tamamı profile-view.tsx'te. */}
    </Row>
  );

  const accountRows = (
    <>
      {social ? (
        <Row label={t("socialsettings.username")}>
          <SocialSettings initial={social} part="username" />
        </Row>
      ) : null}
      {/* GÜVENLİK Hesap'ın alt sayfası: parola, iki adım ve oturumlar yılda
          bir açılan şeyler; listede kendi satırı yok. */}
      <Row>
        <Link href="/profile/settings/security" prefetch={false} className="pressable flex items-center gap-3 py-1.5">
          <span className="min-w-0 flex-1">
            <span className="block text-strong">{t("settings.group_security")}</span>
            <span className="muted block text-caption">{t("settings.security_sub")}</span>
          </span>
          <ChevronNextIcon size={18} style={{ color: "var(--text-faint)" }} />
        </Link>
      </Row>
      {/* HESABI SİL Hesap'ın son satırı — mobil Ayarlar › Hesap ile aynı yer;
          mağaza notlarının anlattığı yol ("Ayarlar › Hesap › Hesabı sil"). */}
      <Row>
        <Link href="/account/delete" prefetch={false} className="pressable flex items-center gap-3 py-1.5">
          <span className="min-w-0 flex-1">
            <span className="block text-strong" style={{ color: "var(--color-rose)" }}>{t("settings.delete_account")}</span>
            <span className="muted block text-caption">{t("deleteaccount.your_account_and_all_your_data")}</span>
          </span>
          <ChevronNextIcon size={18} style={{ color: "var(--text-faint)" }} />
        </Link>
      </Row>
    </>
  );

  const body: Record<SettingsSection, React.ReactNode> = {
    learning: (
      <Group>
        <Row label={t("settings.language_to_learn")}>
          <div>
            {/* Kurslar telefonda da yan yana. `sm:grid-cols-2` dar ekranda tek
                sütuna düşüyordu ve kısa etiketler için tam satır harcıyordu. */}
            {/* TEK SEÇİMLİK LİSTE RADYO GRUBUDUR. `aria-pressed` bir aç/kapa
                düğmesi anlatıyor; Android satırın sağına bir radyo halkası
                ÇİZİYOR ama onu da söylemiyordu. İkisi birlikte kapatıldı
                (bkz. parity 257). */}
            <div role="radiogroup" aria-label={t("settings.language_to_learn")} className="grid grid-cols-2 gap-2">
              {/* Duraklatılmış kurs (Züritüütsch) yalnız zaten o kurstaki
                  kullanıcıya görünür; herkese `coursesForNative` gösteriliyordu
                  ve her Türkçe kullanıcı "Zürih Almancası"nı seçebiliyordu.
                  Mobil `SettingsScreen` `courseOptions` ile aynı kural. */}
              {selectableCourses(lang, course).map((c) => (
                <button
                  key={c.id}
                  role="radio"
                  aria-checked={course === c.id}
                  onClick={() => {
                    if (c.id === course) return;
                    setCourse(c.id);
                    // Ses kursa bağlı: Zürih metnini Almanca sesle okutmak
                    // bu değişikliğin çözdüğü sorunun ta kendisiydi. Seçilen
                    // karakter korunuyor: Aras'ı seçen yeni kursta da Aras'ı
                    // (Zürih'te Jan'ı) duyuyor, kursun varsayılanına dönmüyor.
                    const v = resolveVoice(c.id, voice);
                    setVoice(v);
                    void patch({ course: c.id, voice: v }, () => track("setting_change", 0, "course"));
                  }}
                  className={`option px-3 py-3 text-left ${course === c.id ? "option-picked" : ""}`}
                >
                  <span className="block text-strong">{courseName(c.id, lang)}</span>
                  <span className="muted block text-caption">{courseSub(c.id, lang)}</span>
                </button>
              ))}
            </div>
            {course !== initial.course ? (
              <p
                className="mt-2 rounded-panel px-3 py-2 text-caption"
                style={{
                  background: "var(--brand-tint)",
                  color: "var(--color-brand)",
                }}
              >
                {t("settings.course_switch_note")}
              </p>
            ) : null}
          </div>
        </Row>

        <Row label={t("settings.level")}>
          <div>
            {/* Beş seviye tek satırda. `sm:grid-cols-5` telefonda tek sütuna
                düşüyor ve "A1".."C1" gibi iki karakterlik etiketler için beş tam
                satır, yaklaşık 230 piksel harcıyordu — ayarların tek en uzun
                parçasıydı. */}
            <div role="radiogroup" aria-label={t("settings.level")} className="grid grid-cols-5 gap-1.5">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  role="radio"
                  aria-checked={level === l.id}
                  onClick={() => { if (l.id === level) return; setLevel(l.id); void patch({ level: l.id }, () => track("setting_change", 0, "level")); }}
                  /* Seviye küçük seçim: dolu turuncu çip (2026-09-29 Samet: seçim B; mobil `ui/Chip`). */
                  className={`option px-1 py-2.5 text-strong ${
                    level === l.id ? "chip-active" : ""
                  }`}
                  /* SEVİYE AÇIKLAMASI erişilebilir adda. Beş çip iki
                     karakterlik etiketler ("A1".."C1") ve açıklama yalnız
                     `title=` balonundaydı: dokunmatikte hiç açılmıyor, yani
                     telefondan seviye seçen kullanıcı "B1 ne demek"
                     sorusunun cevabını göremiyordu. Açıklamayı görünür
                     yazmak beş satır ekler (yorumun dediği 230 piksel geri
                     gelir), o yüzden erişilebilir ad. */
                  aria-label={`${l.label} — ${t(l.descKey)}`}
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
            <p className="muted mt-2 text-caption">
              {t(LEVELS.find((l) => l.id === level)?.descKey ?? "")}
            </p>
            {/* Yerleştirme testine tek giriş onboarding'di, yani bir kez geçilip
                bir daha ulaşılamıyordu: seviyesinden emin olmayan mevcut kullanıcı
                ancak elle tahmin edebiliyordu. Android aynı yerde, seviye
                çiplerinin hemen altında bu bağlantıyı veriyor. */}
            <Link href="/placement" className="mt-3 inline-block text-caption font-bold" style={{ color: "var(--color-brand)" }}>
              {t("settings.not_sure_take_placement_test")}
            </Link>
          </div>
        </Row>

        <Row label={t("settings.daily_goal_reviews_day")}>
          {/* İki kaydırıcı art arda iki alan bloğu: arası 12 (`components/field.tsx`);
              aralarında pay yoktu, ikinci etiket ilk çubuğa yapışıktı. */}
          <div className="space-y-3">
          <Slider
            label={t("settings.daily_goal_short")}
            value={dailyGoal}
            min={PROFILE_LIMITS.dailyGoal.min}
            max={PROFILE_LIMITS.dailyGoal.max}
            step={5}
            suffix={t("settings.reviews_unit")}
            onChange={setDailyGoal}
            onCommit={(v) => { if (v !== initial.dailyGoal) void patch({ dailyGoal: v }, () => track("setting_change", v, "daily_goal")); }}
          />
          <Slider
            label={t("settings.new_per_day")}
            value={newPerDay}
            min={PROFILE_LIMITS.newPerDay.min}
            max={PROFILE_LIMITS.newPerDay.max}
            step={1}
            suffix={t("settings.words_unit")}
            onChange={setNewPerDay}
            onCommit={(v) => { if (v !== initial.newPerDay) void patch({ newPerDay: v }, () => track("setting_change", v, "new_per_day")); }}
          />
          </div>
          {/* Tekrar mantığı eskiden ayrı bir "Tekrar sistemi" kartındaydı: dört
              satır, hiçbir eylem yok. Bilginin ait olduğu yer burası — hedefi
              ayarlayan kişinin merak ettiği tek şey o sayının neyi belirlediği.
              Kaydırıcıların ÜSTÜNDEYDİ ve negatif boşluk yüzünden ilk etiketin
              üstüne biniyordu; notun yeri zaten anlattığı şeyin altı. */}
          <p className="muted mt-2 text-caption">{t("settings.srs_note")}</p>
        </Row>


        {/* UYGULAMA DİLİ ve GÖRÜNÜM mobilde İKİ AYRI bölüm. Web'de ikisi
            kurulum, ses ve bildirimle birlikte tek "UYGULAMA" kartındaydı;
            etiketi olmayan bir ayar, aranırken görünmüyor.

            Tema seçimi de üst başlıktan buraya indi: orada her ekranda duran
            ama günde bir kez bile dokunulmayan bir düğmeydi. Ayarın evi
            ayarlar. */}
      </Group>

    ),
    app: (
      <Group>
        <Row label={t("settings.app_language")}>
          <LangSetting bare />
        </Row>

        {/* SES kendi bölümü ve UYGULAMA grubunda. Okuma sesi "Öğrenme"nin
            içindeydi; sesle ilgili ayar arayan kullanıcı onu orada aramıyor.
            OYUN SESLERİ DE BURADA. Bu anahtar bildirim ayarlarındaydı ve
            gerekçesi "oyun sesleri de bir 'ne zaman rahatsız edilirim'
            ayarı" diye yazılıydı — ama Android'de ikisi AYNI bölümde
            (`SettingsScreen`: okuma sesi, ayırıcı, oyun sesleri) ve sesle
            ilgili ayar arayan kullanıcı iki yere bakmak zorunda kalıyordu.
            Picker'ın kendi alt etiketi de eksikti: mobil onun ne olduğunu
            söylüyor (`settings.reading_voice`), webde başlıksız duruyordu. */}
        <Row label={t("settings.sound")}>
          <div>
            <p className="muted mb-2 text-caption">{t("settings.reading_voice")}</p>
            <VoicePicker
              course={course}
              value={voice}
              onChange={(v: VoiceId) => { setVoice(v); void patch({ voice: v }, () => track("setting_change", 0, "voice")); }}
            />
            {/* Ses seçicisinin altında çizgi, iki yanı 12; anahtarlar kutu içi
                liste (satırlar kendi `px-4`ünü taşıyordu, kenarda 32 idi). */}
            <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
              <InsetList>
                <SoundSettings bare />
              </InsetList>
            </div>
          </div>
        </Row>

        <Row label={t("settings.appearance")}>
          <ThemeSetting bare />
        </Row>

        {/* CİHAZ — mobilde karşılığı yok, olamaz da: kurulum tarayıcıya özgü.
            Mobilin sırasını bozmuyor, görünümle gizliliğin arasına kendi
            etiketiyle giriyor.

            BİLDİRİM VE SES BURADA DEĞİL: ikisi de "ne zaman rahatsız
            edilirim" ayarı ve mobilde kendi ekranlarında (`NotificationsScreen`,
            Profil › Bildirimler). Web'de de oraya taşındı; ayarlar ekranında
            durduklarında o ekran mobilde olmayan iki satır taşıyordu. */}
        <Row>
          {/* Kurulum rehberi açılır kutuda. Üç numaralı adım, cihaz seçici ve
              açıklama metni 330 piksel tutuyordu ve bu, hayatta BİR KEZ yapılan
              bir işin yönergesi — zaten kurmuş olan kullanıcı her ayar açılışında
              onu geçmek zorunda kalıyordu. */}
          {/* Kutunun payı yeterli: `p-5` onun üstüne biniyordu (kenarda 36). */}
          <div>
            <Disclosure panel="install_guide" title={t("settings.add_to_home")} hint={t("settings.add_to_home_hint")}>
              <InstallGuide tone="plain" />
            </Disclosure>
          </div>
        </Row>

        {/*
          HESAP VE GÜVENLİK EN ALTTA. İkisi de en üstteydi ve ayarlar sayfası
          "giriş yöntemlerin" ile başlıyordu — yılda bir dokunulan bir şey, her
          gün açılan hedef/seviye/tema ayarlarının önünde duruyordu. Sık
          kullanılan önce, yönetimsel olan sonra; mobil ayarlar ekranında da
          sıra aynı.
        */}
      </Group>

    ),
    account: <LinkedAccounts googleEnabled={googleEnabled} nameRow={nameRow} part="account" accountRows={accountRows} />,
    security: <LinkedAccounts googleEnabled={googleEnabled} part="security" />,
    privacy: (
      <>
        {social ? <SocialSettings initial={social} part="privacy" /> : null}
        <Group title={t("settings.data_consents")}>
        <Row>
          {/* Anahtar satırları kutu içi liste: aralarında çizgi (mobil de öyle),
              kenarda kutunun 16'sı (`components/field.tsx`). */}
          <InsetList>
          <AnalyticsSettings bare />
          {/* Yapay zekâ rızası analitiğin yanında: ikisi de "verim nereye
              gidiyor" sorusunun anahtarı. "Hayır" diyene diyalog bir daha
              kendiliğinden gelmediği için fikrini değiştirmenin yeri burası. */}
          <AiConsentSettings />
          {/* Mikrofon onayı yalnız VERİLMİŞSE görünüyor: verilmemiş bir onayı
              geri alma düğmesi göstermek, hiçbir şey yapmayan bir düğme demek.
              Mobil ayarlarda da aynı satır ve aynı koşul var. */}
          <MicConsentRow />
          </InsetList>
        </Row>

        </Group>
      </>
    ),
    about: (
      <Group>
        {/*
          HAKKINDA AYRI BİR BÖLÜM. Politika, şartlar ve destek "Gizlilik"in
          içindeydi; grubun adı zaten "Gizlilik ve hakkında"ydı ama "hakkında"
          diye bir yer yoktu. Gizlilik artık yalnız kullanıcının AÇIP
          KAPATABİLDİĞİ şeyleri taşıyor; okunacak metinler burada.
        */}
        <Row>
          <InsetList>
          <SettingRow title={t("settings.privacy_and_terms")} sub={t("settings.privacy_and_terms_sub")}>
            <Link href={legalPath("privacy", lang)} prefetch={false} className="btn btn-ghost h-9 px-3 text-caption">{t("settings.privacy_policy")}</Link>
            <Link href={legalPath("terms", lang)} prefetch={false} className="btn btn-ghost h-9 px-3 text-caption">{t("settings.terms_of_use")}</Link>
          </SettingRow>
          {/*
            İLETİŞİM YÜZEYİ. Apple Guidelines 1.2 kullanıcı içeriği taşıyan
            uygulamalardan filtreleme, bildirme ve engellemenin YANINDA
            "yayımlanmış iletişim bilgisi" de istiyor; ilk üçü vardı, bu yoktu.
            Mobil ayarlarda da aynı satır duruyor — iki taraf ayrışmasın.
          */}
          <SettingRow title={t("settings.support_contact")} sub={t("settings.support_contact_sub")}>
            <Link href={legalPath("support", lang)} prefetch={false} className="btn btn-ghost h-9 px-3 text-caption">{t("settings.support_contact")}</Link>
          </SettingRow>
          {/* Künye ve açık kaynak lisansları web'de de burada (mobil Ayarlar ›
              Hakkında ile aynı; DDG §5 tek dokunuşla ulaşılabilirlik). */}
          <SettingRow title={t("settings.impressum")}>
            <Link href="/impressum" prefetch={false} className="btn btn-ghost h-9 px-3 text-caption">{t("settings.impressum")}</Link>
          </SettingRow>
          <SettingRow title={t("settings.oss_licenses")}>
            <Link href="/licenses" prefetch={false} className="btn btn-ghost h-9 px-3 text-caption">{t("settings.oss_licenses")}</Link>
          </SettingRow>
          </InsetList>
        </Row>
      </Group>
    ),
  };

  return (
    <div className="w-full space-y-4">
      <SettingsPanelTitle title={t(SETTINGS_TITLE[section])} />

      <div className="mx-auto w-full max-w-3xl empty:hidden">
        {saveError ? (
          <p
            role="alert"
            className="flex items-center gap-2 rounded-panel px-3 py-2 text-body"
            style={{
              background: "color-mix(in srgb, var(--color-rose-500) 14%, transparent)",
              color: "var(--color-rose)",
            }}
          >
            <WarningIcon size={16} /> {saveError}
          </p>
        ) : null}
      </div>

      {body[section]}
      {section === "about" && version ? <p className="muted pb-2 pt-1 text-center text-caption">Lernomi {version}</p> : null}
    </div>
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
  onCommit,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
  /**
   * BIRAKILDIĞINDA çağrılır. `onChange` sürükleme boyunca her adımda
   * tetikleniyor; kaydı ona bağlamak 5'ten 120'ye giden bir sürüklemede
   * yirmi dört istek demekti.
   */
  onCommit: (v: number) => void;
}) {
  /* Izgara ya da sınır dışı değer (API ızgaraya bakmıyor) tarayıcıda
     tutamacı en yakın adıma oturtuyor; sayı ve dolu kısım da aynı değeri
     göstersin, yoksa ilk sürüklemede tutamaç "yerine atlıyor". */
  const s = step > 0 ? step : 1;
  const shown = Math.min(max, Math.max(min, min + Math.round((value - min) / s) * s));
  const frac = max > min ? (shown - min) / (max - min) : 0;
  const commit = (el: HTMLInputElement) => onCommit(Number(el.value));
  return (
    <label className="block">
      {/* Etiket SÖNÜK DEĞİL: Android aynı satırda iki yanı da `bodyStrong`
          yazıyor (`ui/Slider.tsx`), sağdaki sayı marka renginde. */}
      <span className="mb-1.5 flex items-baseline justify-between text-strong">
        <span>{label}</span>
        <span className="text-[color:var(--color-brand)]">
          {shown} {suffix}
        </span>
      </span>
      {/* DOLU KISIM AYRI KATMAN, çubuğun sözde öğesinde değil (2026-09-30).
          `--pct` girdinin kendisinde değişip `::-webkit-slider-runnable-track`
          zeminini sürüyordu: Safari sözde öğeyi değişkenle birlikte her zaman
          yeniden boyamıyor, dolu kısım tutamacın gerisinde kalıyordu. Ayrıca
          dolu kısım `yüzde × genişlik`te bitiyordu, tutamaç merkezi ise
          `11 px + yüzde × (genişlik - 22 px)`: ikisi uçlara doğru 11 px
          ayrışıyordu. Katman artık tutamaç merkezinde bitiyor (mobil
          `ui/Slider` aynı hesap). */}
      <span className="range-box" style={{ "--frac": frac } as React.CSSProperties}>
        <span aria-hidden className="range-rail">
          <span className="range-fill" />
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={shown}
          onChange={(e) => onChange(Number(e.target.value))}
          /* Bırakma girdinin DIŞINDA da olabiliyor (fare çubuktan kayıp
             bırakılınca `pointerup` başka öğeye düşüyor ve kayıt blur'a
             kalıyordu): bırakma pencereden dinleniyor. */
          onPointerDown={(e) => {
            const el = e.currentTarget;
            const bitir = () => {
              window.removeEventListener("pointerup", bitir);
              window.removeEventListener("pointercancel", bitir);
              commit(el);
            };
            window.addEventListener("pointerup", bitir);
            window.addEventListener("pointercancel", bitir);
          }}
          onKeyUp={(e) => commit(e.currentTarget)}
          onBlur={(e) => commit(e.currentTarget)}
          /* Görünüm `globals.css` `.range`te: çubuk, tutamaç ve dolu kısım
             Android'in ölçüsünde. */
          className="range"
        />
      </span>
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
          /* Tarayıcıdaki bayrakla birlikte sunucudaki ses rızası da geri
             alınıyor: yalnız bayrağı silmek, sesin sağlayıcıya gitme iznini
             sunucuda açık bırakırdı (mobil `revokeMicConsent` ile aynı). */
          void revokeMicConsent();
          setOn(false);
        }}
        className="btn btn-ghost h-9 px-3 text-caption"
      >
        {t("common.discard")}
      </button>
    </SettingRow>
  );
}
