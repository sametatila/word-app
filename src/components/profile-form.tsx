"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import { AlertIcon, ChevronRightIcon } from "@/components/icons";
import { VoicePicker } from "@/components/voice-picker";
import { InstallGuide } from "@/components/install-guide";
import { AnalyticsSettings } from "@/components/analytics-settings";
import { SoundSettings } from "@/components/sound-settings";
import { PageBack } from "@/components/page-back";
import { Disclosure } from "@/components/disclosure";
import { SettingRow } from "@/components/setting-row";
import { hasMicConsent, setMicConsent } from "@/lib/mic-consent";
import { ThemeSetting } from "@/components/theme-toggle";
import { useT, useLang } from "@/lib/i18n/client";
import { Group, Row } from "@/components/settings-section";
import { LinkedAccounts } from "@/components/account/linked-accounts";
import { courseName, courseSub, coursesForNative } from "@/lib/courses";
import { LangSetting } from "@/components/lang-setting";
import { defaultVoice, type VoiceId } from "@/lib/tts/voices";
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
  googleEnabled,
}: {
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
      <label className="block">
        <input
        value={displayName}
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
        className="option w-full px-4 py-3 text-body outline-none focus:border-[color:var(--color-brand)]"
        />
      </label>
      {nameError ? (
        <p id="profile-name-error" role="alert" className="text-caption" style={{ color: "var(--color-rose)" }}>{nameError}</p>
      ) : null}
      {/* Hesap silme buradan PROFİLE taşındı (çıkış yapın altına): yıkıcı
        eylem, ad kutusunun bir dokunuş yanında durmamalı. Gerekçenin
        tamamı profile-view.tsx'te. */}
    </Row>
  );

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
      {/* KAYDET DÜĞMESİ KALKTI — gerekçe `patch` üzerinde. Geriye yalnız hata
          satırı kalıyor ve yeri SAYFANIN BAŞI: artık hangi kontrolün kaydı
          düştüyse düşsün aynı satıra yazılıyor, o yüzden tek bir kontrolün
          yanında duramaz. `role="alert"` sayfanın neresinde olunursa olunsun
          duyuruyor. */}
      <div className="mx-auto w-full max-w-3xl empty:hidden">
        {saveError ? (
          <p
            role="alert"
            className="flex items-center gap-2 rounded-panel px-3 py-2 text-body"
            style={{
              background: "color-mix(in srgb, var(--color-rose) 12%, transparent)",
              color: "var(--color-rose)",
            }}
          >
            <AlertIcon size={16} /> {saveError}
          </p>
        ) : null}
      </div>

      <Group title={t("settings.group_learning")}>
        <Row label={t("settings.language_to_learn")}>
          <div>
            {/* Kurslar telefonda da yan yana. `sm:grid-cols-2` dar ekranda tek
                sütuna düşüyordu ve kısa etiketler için tam satır harcıyordu. */}
            {/* TEK SEÇİMLİK LİSTE RADYO GRUBUDUR. `aria-pressed` bir aç/kapa
                düğmesi anlatıyor; Android satırın sağına bir radyo halkası
                ÇİZİYOR ama onu da söylemiyordu. İkisi birlikte kapatıldı
                (bkz. parity 257). */}
            <div role="radiogroup" aria-label={t("settings.language_to_learn")} className="grid grid-cols-2 gap-2">
              {coursesForNative(lang).map((c) => (
                <button
                  key={c.id}
                  role="radio"
                  aria-checked={course === c.id}
                  onClick={() => {
                    if (c.id === course) return;
                    setCourse(c.id);
                    // Ses kursa bağlı: Zürih metnini Almanca sesle okutmak
                    // bu değişikliğin çözdüğü sorunun ta kendisiydi.
                    const v = defaultVoice(c.id);
                    setVoice(v);
                    void patch({ course: c.id, voice: v }, () => track("setting_change", 0, "course"));
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
                className="mt-2 rounded-panel px-3 py-2 text-caption"
                style={{
                  background: "color-mix(in srgb, var(--color-brand) 10%, transparent)",
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
                  className={`option px-1 py-2.5 text-strong ${
                    level === l.id ? "option-correct" : ""
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
            <p className="muted mt-1.5 text-caption">
              {t(LEVELS.find((l) => l.id === level)?.descKey ?? "")}
            </p>
            {/* Yerleştirme testine tek giriş onboarding'di, yani bir kez geçilip
                bir daha ulaşılamıyordu: seviyesinden emin olmayan mevcut kullanıcı
                ancak elle tahmin edebiliyordu. Android aynı yerde, seviye
                çiplerinin hemen altında bu bağlantıyı veriyor. */}
            <Link href="/placement" className="mt-2.5 inline-block text-caption font-bold" style={{ color: "var(--color-brand)" }}>
              {t("settings.not_sure_take_placement_test")}
            </Link>
          </div>
        </Row>

        <Row label={t("settings.daily_goal_reviews_day")}>
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
          {/* Tekrar mantığı eskiden ayrı bir "Tekrar sistemi" kartındaydı: dört
              satır, hiçbir eylem yok. Bilginin ait olduğu yer burası — hedefi
              ayarlayan kişinin merak ettiği tek şey o sayının neyi belirlediği.
              Kaydırıcıların ÜSTÜNDEYDİ ve negatif boşluk yüzünden ilk etiketin
              üstüne biniyordu; notun yeri zaten anlattığı şeyin altı. */}
          <p className="muted -mt-1 text-caption">{t("settings.srs_note")}</p>
        </Row>


        {/* UYGULAMA DİLİ ve GÖRÜNÜM mobilde İKİ AYRI bölüm. Web'de ikisi
            kurulum, ses ve bildirimle birlikte tek "UYGULAMA" kartındaydı;
            etiketi olmayan bir ayar, aranırken görünmüyor.

            Tema seçimi de üst başlıktan buraya indi: orada her ekranda duran
            ama günde bir kez bile dokunulmayan bir düğmeydi. Ayarın evi
            ayarlar. */}
      </Group>

      <Group title={t("settings.group_app")}>
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
              compact
            />
            <div className="mt-3 border-t pt-1" style={{ borderColor: "var(--hairline)" }}>
              <SoundSettings bare />
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
          <div className="p-5">
            <Disclosure panel="install_guide" title={t("settings.add_to_home")} hint={t("settings.add_to_home_hint")}>
              <InstallGuide tone="plain" />
            </Disclosure>
          </div>
        </Row>

        {/* Gizlilik: analitik anahtarı ve hukuki metinler (Play: politika uygulama içinden erişilebilir olmalı). */}
        {/*
          BİLDİRİMLER PROFİLDEN BURAYA. İçeriği zaten ayardı (hatırlatmalar, seri
          koruma, haftalık test) ama profil menüsünde duruyordu ve "Gelen kutusu"
          satırının hemen altında neredeyse aynı adla görünüyordu.
        */}
        <Row label={t("settings.sec_notifications")}>
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
        </Row>

        {/*
          HESAP VE GÜVENLİK EN ALTTA. İkisi de en üstteydi ve ayarlar sayfası
          "giriş yöntemlerin" ile başlıyordu — yılda bir dokunulan bir şey, her
          gün açılan hedef/seviye/tema ayarlarının önünde duruyordu. Sık
          kullanılan önce, yönetimsel olan sonra; mobil ayarlar ekranında da
          sıra aynı.
        */}
      </Group>

      {/* HESAP ve GÜVENLİK grupları: kartı `LinkedAccounts` kuruyor,
          çünkü sağlayıcı listesini okuyan tek yer orası. */}
      <LinkedAccounts googleEnabled={googleEnabled} nameRow={nameRow} />

      <Group title={t("settings.group_privacy_about")}>
        <Row label={t("settings.privacy")}>
          <AnalyticsSettings bare />
          {/* Mikrofon onayı yalnız VERİLMİŞSE görünüyor: verilmemiş bir onayı
              geri alma düğmesi göstermek, hiçbir şey yapmayan bir düğme demek.
              Mobil ayarlarda da aynı satır ve aynı koşul var. */}
          <MicConsentRow />
        </Row>

        {/*
          HAKKINDA AYRI BİR BÖLÜM. Politika, şartlar ve destek "Gizlilik"in
          içindeydi; grubun adı zaten "Gizlilik ve hakkında"ydı ama "hakkında"
          diye bir yer yoktu. Gizlilik artık yalnız kullanıcının AÇIP
          KAPATABİLDİĞİ iki şeyi taşıyor; okunacak metinler burada.
        */}
        <Row label={t("settings.about")}>
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
        </Row>
      </Group>

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
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-strong">
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
        onPointerUp={(e) => onCommit(Number((e.target as HTMLInputElement).value))}
        onKeyUp={(e) => onCommit(Number((e.target as HTMLInputElement).value))}
        onBlur={(e) => onCommit(Number(e.target.value))}
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
        className="btn btn-ghost h-9 px-3 text-caption"
      >
        {t("common.discard")}
      </button>
    </SettingRow>
  );
}
