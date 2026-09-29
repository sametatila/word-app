import React, { useEffect, useRef, useState } from "react";
import { t } from "../lib/i18n";
import { View, TextInput, Switch } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Chip } from "../ui/Chip";
import { Slider } from "../ui/Slider";
import { Card } from "../ui/Card";
import { LinkedAccounts } from "../ui/LinkedAccounts";
import { ChangePassword } from "../ui/ChangePassword";
import { TwoFactor } from "../ui/TwoFactor";
import { ActiveSessions } from "../ui/ActiveSessions";
import { listAccounts, type LinkedAccount } from "../lib/accountLinks";
import { PressableScale } from "../ui/PressableScale";
import { RadioDot } from "../ui/RadioDot";
import { LogoutIcon, AccountIcon, ChevronNextIcon, InfoIcon, LanguageIcon, LearningSettingsIcon, PremiumIcon, PrivacyIcon, RemindersIcon } from "../ui/icons";
import { MenuRow } from "../ui/MenuRow";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { SocialPrivacy, SocialUsername } from "./SocialSettingsScreen";
import { usePremiumStatus } from "../lib/premium";
import { courseOrDefault } from "../lib/courses";
import { ScreenHeader } from "../social/common";
import { useAuth } from "../lib/AuthContext";
import { PROFILE_DEFAULTS, PROFILE_LIMITS } from "../lib/profileDefaults";
import { useMe } from "../lib/useMe";
import { updateProfile } from "../lib/updateProfile";
import { VoicePicker, VoicePickerSkeleton } from "../ui/VoicePicker";
import { SkeletonBar, SkeletonLine, SkeletonPill, SkeletonTile, textHeight } from "../ui/Skeleton";
import { loadVoicePref, setVoicePref } from "../lib/tts";
import { defaultVoice, resolveVoice, type VoiceId } from "../lib/voices";
import { coursesForNative, offeredNativeLangs, NATIVE_LANGS, type NativeLang } from "../lib/courses";
import { currentLang, setLang } from "../lib/i18n";
import { useTheme, spacing, radii, type Palette, type ThemeMode, ds } from "../theme";
import { analyticsEnabled, setAnalyticsEnabled, track } from "../lib/track";
import { soundEnabled, setSoundEnabled } from "../lib/sfx";
import { hapticsEnabled, setHapticsEnabled, vibrate } from "../lib/haptics";
import { hasMicConsent, revokeMicConsent } from "../lib/micConsent";
import { decideAiConsent, fetchAiConsent, requestAiConsent, type AiConsentState } from "../lib/aiConsent";
import { openLegal } from "../lib/legal";
import { APP_VERSION } from "../version";
import { GuestAccountCard } from "../ui/GuestAccountCard";

// Diller KENDİ adlarıyla yazılır: arayüz yanlış dildeyken bile kullanıcı kendi
// dilini tanıyıp seçebilsin diye (çevrilirse tam da aradığı satırı okuyamaz).
const LANG_LABEL: Record<NativeLang, string> = { tr: "Türkçe", en: "English", de: "Deutsch" };
/** Seviye açıklamaları — web `profile-form` `LEVELS` ile aynı anahtarlar. */
const LEVEL_DESC_KEY: Record<string, string> = {
  A1: "onboarding.i_m_just_starting_out",
  A2: "level.a2_desc",
  B1: "level.b1_desc",
  B2: "level.b2_desc",
  C1: "level.c1_desc",
};
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
/** Tema seçenekleri — etiket ANAHTAR tutar, çeviri render sırasında çözülür. */
const THEME_OPTIONS: { key: ThemeMode; label: string }[] = [
  { key: "system", label: "settings.theme_system" },
  { key: "light", label: "settings.theme_light" },
  { key: "dark", label: "settings.theme_dark" },
];
/**
 * Liste kurs kayıt defterinden türüyor. Sabit dizi DEĞİL fonksiyon: etiketler
 * kullanıcının anadiline bağlı ve dil çalışma sırasında değişebiliyor — modül
 * yüklenirken hesaplansaydı arayüz İngilizceye alındıktan sonra bile kurs
 * adları Türkçe kalırdı. Anadil ayrıca listeden elenir (kimse kendi dilini
 * öğrenmez).
 *
 * Yeni kullanıcıya sunulmayan kurs (`offeredToNewUsers: false`, duraklatılmış
 * Zürih lehçesi) yalnız zaten o kurstaki kullanıcıya görünür. Herkese açık
 * olsaydı buradan seçilebiliyor ve Yol ekranı "henüz konuşma yolu yok" boş
 * durumuna düşüyordu; o kurstaki kullanıcıdan ise seçili satırı saklamak
 * hiçbir seçeneği işaretsiz bırakırdı.
 */
function courseOptions(lang: NativeLang, current: string): { key: string; label: string; sub: string }[] {
  return coursesForNative(lang)
    .filter((c) => c.offeredToNewUsers || c.id === current)
    .map((c) => ({ key: c.id, label: c.label[lang], sub: c.sub[lang] }));
}


/** Ayar bölümü — başlık + kart. Görsel gruplama için tutarlı çerçeve. */
/**
 * Grup başlığı — dokuz düz bölüm dört mantıksal gruba alındı.
 *
 * Eskiden hepsi aynı düzlemdeydi: kurs/seviye/hedef (öğrenme) ile arayüz
 * dili/görünüm (uygulama) ve hesap/gizlilik iç içeydi. Kullanıcı aradığı ayarı
 * grubun adından değil, satır satır okuyarak buluyordu.
 */
/**
 * Grup — başlık ve TEK kart.
 *
 * Eskiden her bölümün kendi kartı vardı ve ekran alt alta on beş kutuya
 * dönüşmüştü: kutu, bölümleri ayırsın diye vardı ama bölüm sayısı artınca
 * ayırmayı bıraktı, yalnız gürültü ekledi. Şimdi kart grubu çiziyor,
 * bölümler kartın içinde ince bir çizgiyle ayrılıyor.
 */
function Group({ title, colors, children }: { title?: string; colors: Palette; children: React.ReactNode }) {
  /*
    ÇİZGİYİ GRUP ÇİZİYOR, satır değil. Satırların bir kısmı koşullu (parolasız
    hesapta PAROLA bölümü hiç yok); ayıracı satırın kendi üstüne koysaydık
    gizlenen ilk satırın çizgisi kartın tepesinde asılı kalırdı.
    `Children.toArray` false/null olanları zaten atıyor, yani "ilk ÇİZİLEN
    satır" burada doğru biliniyor.
  */
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <View style={{ marginTop: title ? spacing.xxl : spacing.sm }}>
      {/* Grup başlığı da bir başlık — web `<h2>` (bkz. parity 259). Bölüm
          ekranında başlık ekranın kendisi; grup ayrıca başlık çizmiyor. */}
      {title ? <Text accessibilityRole="header" variant="h3" color={colors.text} style={{ marginBottom: spacing.sm, marginLeft: spacing.xs }}>{title}</Text> : null}
      <Card padded>
        {items.map((item, i) => (
          <View
            key={i}
            style={i ? { marginTop: spacing.lg, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.hairline } : undefined}
          >
            {item}
          </View>
        ))}
      </Card>
    </View>
  );
}

/** Grup kartının içindeki bir bölüm: küçük etiket ve altında içeriği. */
function Row({ label, colors, children }: { label?: string; colors: Palette; children: React.ReactNode }) {
  return (
    <View>
      {label ? (
        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, letterSpacing: 0.5 }}>{label}</Text>
      ) : null}
      {children}
    </View>
  );
}

/**
 * AYARLAR BİR LİSTE, HER GRUP KENDİ EKRANI (2026-09-28, Samet'in kararı;
 * `docs/plan/profil-ayarlar-topluluk.md`).
 *
 * Tek uzun sayfaydı ve üstüne sosyal ayarlar ayrı bir ekranda, arkadaş
 * kartındaki ikinci bir dişliyle açılıyordu. Şimdi `Settings` kısa bir liste
 * (Öğrenme · Uygulama · Hatırlatmalar · Hesap · Gizlilik · Abonelik · Destek ve
 * hakkında · Çıkış yap); satır `Settings { section }` ile aynı ekranı o grubun
 * içeriğiyle açıyor. Sıra en sık değişenden en seyreğe. Çıkış yap ve Hesabı sil
 * yalnız burada (Profil'den kalktı).
 */
export type SettingsSection = "learning" | "app" | "account" | "security" | "privacy" | "about";
const SECTION_TITLE: Record<SettingsSection, string> = {
  learning: "settings.group_learning",
  app: "settings.group_app",
  account: "settings.group_account",
  security: "settings.group_security",
  privacy: "settings.group_privacy",
  about: "settings.group_about",
};

export function SettingsScreen() {
  const { colors, mode, setMode } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, "Settings">>();
  const section = route.params?.section;
  const { user, refresh, signOut } = useAuth();
  const { status: premiumStatus } = usePremiumStatus();
  const [confirmOut, setConfirmOut] = useState(false);
  async function reallySignOut() { setConfirmOut(false); await signOut(); nav.reset({ index: 0, routes: [{ name: "Auth" }] }); }
  /* MİSAFİR (mağaza ön inceleme B24): giriş yöntemi, parola, oturumlar ve
     yapay zekâ izni yok; hesap bölümünde bunların yerine hesap oluşturma
     çağrısı ve "Misafir verilerini sil" duruyor. Öğrenme ve uygulama ayarları
     misafirde de çalışıyor (profil misafir kimliğine yazılıyor). */
  const guest = Boolean(user?.guest);
  const { me, loading: meLoading } = useMe();

  const [name, setName] = useState(me?.name ?? user?.name ?? "");
  const [goal, setGoal] = useState<number>(me?.dailyGoal ?? PROFILE_DEFAULTS.dailyGoal);
  /*
   * GÜNDE YENİ KELİME — mobilde HİÇ YOKTU.
   *
   * `updateProfile` alanı baştan beri taşıyor ve `/api/profile` kabul ediyor;
   * eksik olan tek şey hem mevcut değeri gönderen uç alanı hem de onu çizen
   * yüzeydi. Kullanıcı günde kaç yeni kelime göreceğini yalnız webden
   * ayarlayabiliyordu - oysa bu, günlük yükü belirleyen iki ayardan biri.
   */
  const [newPerDay, setNewPerDay] = useState<number>(me?.newPerDay ?? PROFILE_DEFAULTS.newPerDay);
  const [level, setLevel] = useState<string>(me?.level ?? PROFILE_DEFAULTS.level);
  const [course, setCourse] = useState<string>(me?.course ?? PROFILE_DEFAULTS.course);
  const [voice, setVoice] = useState<VoiceId>(defaultVoice(me?.course ?? "de"));
  /**
   * Yalnız HATA iletisi. Başarıda susuyoruz: anında kaydeden bir ayarda
   * onay kontrolün kendisi (çip aktif olur, ad kutuda kalır). Her dokunuşa
   * "Kaydedildi" yazmak ekranı bir bildirim akışına çevirirdi.
   */
  const [msg, setMsg] = useState<string | null>(null);
  /**
   * Bağlı giriş yöntemleri. Liste EKRANDA okunuyor çünkü iki yer birden
   * kullanıyor: "Giriş yöntemleri" bölümü ve "parolası var mı" sorusuna
   * bağlı olan PAROLA / İKİ ADIMLI DOĞRULAMA bölümleri.
   */
  const [accounts, setAccounts] = useState<LinkedAccount[] | null>(null);
  const yenileHesaplar = () => listAccounts().then(setAccounts);
  useEffect(() => {
    if (guest) { setAccounts([]); return; }
    let alive = true;
    void listAccounts().then((a) => { if (alive) setAccounts(a); });
    return () => { alive = false; };
  }, [guest]);
  const parolaliHesap = accounts?.some((a) => a.providerId === "credential") ?? false;
  const [analytics, setAnalytics] = useState(analyticsEnabled());
  /* Oyun sesleri: efektler için ayrı anahtar. Telaffuz sesi buna BAĞLI DEĞİL —
     sessiz bir yerde çalışmak isteyen kullanıcı telefonu kısınca konuşmayı da
     kaybediyordu; web ikisini baştan beri ayırıyor (`sound-settings`). */
  const [sounds, setSounds] = useState(soundEnabled());
  const [vibes, setVibes] = useState(hapticsEnabled());
  const [uiLang, setUiLang] = useState<NativeLang>(currentLang());
  const [micConsent, setMicConsentState] = useState<boolean | null>(null);
  useEffect(() => { void hasMicConsent().then(setMicConsentState); }, []);
  /*
    YAPAY ZEKÂ İLE GERİ BİLDİRİM — sunucudaki rıza (`ai_text`). Açmak doğrudan
    yazmıyor, izin ekranını açıyor: alıcılar görülmeden izin verilmiş sayılmaz.
    Kapatmak tek dokunuş, çünkü geri almak vermek kadar kolay olmalı (GDPR
    m.7(3)). Oturum yoksa uç 401 döner ve anahtar kapalı/devre dışı kalır.
  */
  const [aiText, setAiText] = useState<AiConsentState | null>(null);
  /* Ses rızası (`ai_voice`) başka bir cihazda, ör. web'de verilmiş olabilir. O
     zaman bu telefonda mikrofon onayı yoktur ama sunucuda izin vardır; geri
     alma satırı yine görünmeli, yoksa izin buradan geri alınamazdı. */
  const [aiVoice, setAiVoice] = useState<AiConsentState | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const yenileAi = () =>
    fetchAiConsent()
      .then((i) => { setAiText(i.statuses.ai_text.state); setAiVoice(i.statuses.ai_voice.state); })
      .catch(() => {});
  // Yapay zekâ misafire kapalı; rıza defteri de yalnız hesaba tutuluyor (sunucu 403 dönerdi).
  /* Misafir de rıza verebiliyor (tek deneme hakkı, bkz. sunucu lib/auth/guest):
     verdiği rızayı geri almanın yolu da burada olmalı. */
  useEffect(() => { void yenileAi(); }, [guest]);
  async function toggleAiText(on: boolean) {
    if (aiBusy) return;
    setAiBusy(true);
    setMsg(null);
    try {
      if (on) await requestAiConsent("ai_text");
      else await decideAiConsent("ai_text", false);
    } catch {
      setMsg(t("aiconsent.save_failed"));
    }
    await yenileAi();
    setAiBusy(false);
  }

  // useMe async gelir: ilk render'da me=null olduğu için state'ler yedeğe
  // (A1 / 20) düşüyordu ve gerçek değer (ör. A2) sonradan gelince useState'in
  // ilk değeri artık güncellenmiyordu — Ayarlar'da seviye A1 görünüyordu.
  // me ilk kez gelince BİR KEZ hidrate et (kullanıcının sonraki düzenini ezme).
  const hydrated = useRef(false);
  /*
    HİDRASYON RENDER'A DA GÖRÜNÜYOR (referansın yanında bir state).

    Referans tek başına yeterliydi çünkü yalnız EFEKT ona bakıyordu; oysa
    öğrenme ayarlarının çizimi de bu bilgiye muhtaç: `me` inene kadar
    kontroller yedek değerleri gösteriyordu (kurs Almanca, seviye A1, hedef
    20) ve bu iki ayrı hatanın kaynağıydı.

      1. Seviyesi B1 olan biri Ayarlar'ı her açışta bir an "A1" seçili
         görüyordu — `useMe` önbelleksiz, yani her açılışta yeniden okuyor.
      2. O aralıkta A1'e basan biri gerçekten A1 yazdırıyor (`patch` gidiyor),
         ama hemen ardından `me` (eski değerle) inip hidrasyon seviyeyi B1'e
         geri çeviriyordu: sunucuda A1, ekranda B1.

    Değerler inmeden kontroller çizilmiyor. Etiketler ve notlar duruyor:
    onlar zaten sabit metin, iskelete çevirmek yalnız ekranı titretirdi.
  */
  const [learningReady, setLearningReady] = useState(false);
  useEffect(() => {
    if (me && !hydrated.current) {
      hydrated.current = true;
      setLearningReady(true);
      setName((n) => n || me.name || user?.name || "");
      setGoal(me.dailyGoal);
      setNewPerDay(me.newPerDay ?? PROFILE_DEFAULTS.newPerDay);
      setLevel(me.level);
      setCourse(me.course ?? "de");
      void loadVoicePref(me.course ?? "de").then(setVoice);
    }
  }, [me, user]);
  /* Okuma patladıysa (ya da misafirde uç yoksa) ekran sonsuza kadar iskelet
     kalmasın: yükleme bittiyse kontroller yedek değerlerle çiziliyor. En
     kötüsü kullanıcının kendi ayarını yeniden seçmesi; hiç ayar yapamaması
     değil. */
  const learningVisible = learningReady || !meLoading;

  /**
   * TEK KAYDETME MODELİ — her ayar dokunulduğu anda yazılıyor.
   *
   * Eskiden ekranda iki model birden vardı: kurs, ses, dil, tema, oyun sesi
   * ve analitik anında kaydediliyor; ad, seviye, günlük hedef ve yeni/gün ise
   * dipteki "Kaydet" düğmesini bekliyordu. On altı kontrolün dördü bekliyor,
   * on ikisi beklemiyordu ve aralarında hiçbir görsel fark yoktu — seviyeyi
   * değiştirip geri tuşuna basan kullanıcı değişikliğini sessizce
   * kaybediyordu. Azınlık çoğunluğa uyduruldu; düğme kalktı.
   *
   * Aynı desen sosyal ayarlarda zaten vardı (`SocialSettingsScreen.save`).
   */
  async function patch(fields: Record<string, unknown>, onOk?: () => void) {
    if (!user) { nav.navigate("Auth"); return; }
    setMsg(null);
    const ok = await updateProfile(fields);
    if (!ok) { setMsg(t("settings.save_failed")); return; }
    onOk?.();
    await refresh();
  }

  function pickVoice(v: VoiceId) { setVoice(v); void setVoicePref(course, v); void updateProfile({ voice: v }); track("setting_change", 0, "voice"); }
  /**
   * Arayüz dili değişince seçili kurs geçersiz kalabilir: İngilizce kursundaki
   * kullanıcı arayüzü İngilizceye alırsa o kurs listeden düşer. Sessizce
   * bırakılsaydı hiçbir seçenek işaretli görünmez ve kullanıcı kendi dilini
   * öğrenmeye devam ederdi — o yüzden ilk geçerli kursa taşınıyor.
   */
  async function keepCourseValid(lang: NativeLang) {
    const list = coursesForNative(lang);
    if (list.some((c) => c.id === course)) return;
    const next = (list.find((c) => c.offeredToNewUsers) ?? list[0])?.id;
    if (next) await pickCourse(next);
  }

  async function pickCourse(c: string) {
    if (c === course) return;
    setCourse(c);
    // Kurs değişince seçilen karakter korunuyor (Aras → yeni kursta Aras, Zürih'te Jan; web profile-form ile aynı).
    const v = resolveVoice(c, voice);
    setVoice(v);
    void setVoicePref(c, v);
    await updateProfile({ course: c, voice: v });
    track("setting_change", 0, "course");
    await refresh();
  }

  const courseLabel = courseOrDefault(course).label[uiLang] ?? course;
  const body: Record<SettingsSection, React.ReactNode> = {
    learning: (
        <Group colors={colors}>
          <Row label={t("settings.language_to_learn")} colors={colors}>
            {!learningVisible
              ? courseOptions(uiLang, course).map((c, i) => (
                  <View key={c.key} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                    <View style={{ flex: 1 }}>
                      <SkeletonLine variant="bodyStrong" width="42%" />
                      <SkeletonLine variant="caption" width="64%" />
                    </View>
                    <SkeletonTile size={ds(22)} radius={radii.pill} />
                  </View>
                ))
              : courseOptions(uiLang, course).map((c, i) => {
              const active = course === c.key;
              return (
                /* SATIR ZATEN BİR RADYO HALKASI ÇİZİYOR (sağdaki daire) ama
                   ekran okuyucu onu görmüyordu: ne rol ne seçili durum
                   vardı, satır düz bir "düğme" olarak okunuyordu. Kurs
                   seçimi geri alınabilir ama sessizce yanlış kursu seçmek
                   bütün ilerlemeyi öteki dile taşıyor. */
                <PressableScale key={c.key} onPress={() => pickCourse(c.key)} accessibilityRole="radio" accessibilityState={{ selected: active }} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                  <View style={{ flex: 1 }}>
                    <Text variant="bodyStrong" color={active ? colors.primaryText : colors.text}>{c.label}</Text>
                    <Text variant="caption" color={colors.textMuted}>{c.sub}</Text>
                  </View>
                  <RadioDot selected={active} />
                </PressableScale>
              );
            })}
            {/* Kurs değiştirmenin ne yaptığı: kelimeler ve kuyruk taşınıyor, öteki
                kurs SİLİNMİYOR. Web bunu yazıyordu, mobil yazmıyordu - ve bu,
                düğmeye basmadan önce bilinmesi gereken bir şey. */}
            <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.sm }}>{t("settings.course_switch_note")}</Text>
          </Row>

          <Row label={t("settings.level")} colors={colors}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {learningVisible
                ? LEVELS.map((l) => <Chip key={l} role="radio" label={l} active={level === l} onPress={() => { if (l === level) return; setLevel(l); void patch({ level: l }, () => track("setting_change", 0, "level")); }} />)
                : LEVELS.map((l) => <SkeletonPill key={l} width={58} height={textHeight("bodyStrong") + 21} />)}
            </View>
            {/* SEÇİLİ SEVİYENİN AÇIKLAMASI + seviyenin kendiliğinden değişmediği.
                Dört açıklama sözlükte duruyordu (`level.*_desc`) ama mobilde
                yalnız onboarding'de okunuyordu: ayarlarda seviye "A1…C1" diye
                görünüyor, hangi seviyenin ne anlama geldiği yazmıyordu. Web
                ikisini AYNI cümlede veriyor ("<açıklama>. Bu düğmeyi senden
                başkası çevirmiyor") ve mobil de artık öyle. */}
            {learningVisible ? (
              <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.sm }}>
                {t(LEVEL_DESC_KEY[level] ?? "onboarding.i_m_just_starting_out")}
              </Text>
            ) : (
              <SkeletonLine variant="micro" width="72%" style={{ marginTop: spacing.sm }} />
            )}
            <PressableScale onPress={() => nav.navigate("Placement")} style={{ marginTop: spacing.md, alignSelf: "flex-start" }}>
              <Text variant="bodyStrong" color={colors.primaryText}>{t("settings.not_sure_take_placement_test")}</Text>
            </PressableScale>
          </Row>

          <Row label={t("settings.daily_goal_reviews_day")} colors={colors}>
            {/*
              ÇİP IZGARASI YERİNE KAYDIRICI. Günlük hedef on çiple, günde yeni
              kelime yedi çiple seçiliyordu: yirmi kadar dokunma hedefi, tek bir
              sayıyı seçmek için. Webde aynı ayar baştan beri kaydırıcıydı.
            */}
            {learningVisible ? (
              <>
              <Slider
                label={t("settings.daily_goal_short")}
                value={goal}
                min={PROFILE_LIMITS.dailyGoal.min}
                max={PROFILE_LIMITS.dailyGoal.max}
                step={5}
                suffix={t("settings.reviews_unit")}
                onChange={setGoal}
                onCommit={(v) => { if (v !== (me?.dailyGoal ?? -1)) void patch({ dailyGoal: v }, () => track("setting_change", v, "daily_goal")); }}
              />
              <View style={{ height: spacing.lg }} />
              <Slider
                label={t("settings.new_per_day")}
                value={newPerDay}
                min={PROFILE_LIMITS.newPerDay.min}
                max={PROFILE_LIMITS.newPerDay.max}
                step={1}
                suffix={t("settings.words_unit")}
                onChange={setNewPerDay}
                onCommit={(v) => { if (v !== (me?.newPerDay ?? -1)) void patch({ newPerDay: v }, () => track("setting_change", v, "new_per_day")); }}
              />
              </>
            ) : (
              /* Kaydırıcı iskeleti: etiket satırı + 22 piksellik dokunma alanı
                 (bkz. ui/Slider), yani gerçek kaydırıcıyla aynı yükseklik. */
              [0, 1].map((i) => (
                <View key={i} style={{ marginTop: i === 0 ? 0 : spacing.lg }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.sm }}>
                    <SkeletonLine variant="bodyStrong" width="38%" />
                    <SkeletonLine variant="bodyStrong" width={72} />
                  </View>
                  <View style={{ height: 22, justifyContent: "center" }}><SkeletonBar height={6} /></View>
                </View>
              ))
            )}
            {/* Hedefi ayarlayan kişinin merak ettiği tek şey o sayının neyi
                belirlediği; web de notu kaydırıcıların altına koyuyor. */}
            <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.md }}>{t("settings.srs_note")}</Text>
          </Row>
        </Group>

    ),
    app: (
        <Group colors={colors}>
          <Row label={t("settings.app_language")} colors={colors}>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
              {offeredNativeLangs().map((l) => (
                <Chip
                  key={l}
                  role="radio"
                  label={LANG_LABEL[l]}
                  active={uiLang === l}
                  onPress={() => { setUiLang(l); void setLang(l); void updateProfile({ nativeLang: l }); track("setting_change", NATIVE_LANGS.indexOf(l), "lang"); void keepCourseValid(l); }}
                />
              ))}
            </View>
          </Row>

          {/*
            SES TEK YERDE. Oyun sesleri "Görünüm"ün içindeydi (ses, görünüm
            değil) ve okuma sesi "Öğrenme"de, yani sesle ilgili iki ayar birbirini
            hiç görmeyen iki grupta duruyordu. Sesini kısmak isteyen kullanıcı
            ikisini de burada buluyor.
          */}
          <Row label={t("settings.sound")} colors={colors}>
            <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t("settings.reading_voice")}</Text>
            {/* Katalog KURSA bağlı, kurs da `me` ile geliyor (iskeletin
                gerekçesi `VoicePickerSkeleton` başında yazılı). */}
            {learningVisible ? <VoicePicker course={course} value={voice} onChange={pickVoice} /> : <VoicePickerSkeleton />}
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: spacing.md, marginTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t("snd.game_sounds")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("snd.game_sounds_sub")}</Text>
              </View>
              <Switch
                value={sounds}
                onValueChange={(v) => { setSounds(v); void setSoundEnabled(v); track("sound_toggle", v ? 1 : 0); }}
                accessibilityLabel={t("snd.game_sounds")}
                trackColor={{ true: colors.primary, false: colors.surface2 }}
                thumbColor="#fff"
              />
            </View>
            {/* TİTREŞİM AYRI (`lib/haptics`): sesi kapatan titreşimi, titreşimi
                kapatan sesi kaybetmiyor. Açılınca bir kez hafif titreşim - ayarın
                ne yaptığını hissettiriyor. */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: spacing.md, marginTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t("snd.haptics")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("snd.haptics_sub")}</Text>
              </View>
              <Switch
                value={vibes}
                onValueChange={(v) => { setVibes(v); void setHapticsEnabled(v); if (v) vibrate("tap"); }}
                accessibilityLabel={t("snd.haptics")}
                trackColor={{ true: colors.primary, false: colors.surface2 }}
                thumbColor="#fff"
              />
            </View>
          </Row>

          <Row label={t("settings.appearance")} colors={colors}>
            <View style={{ flexDirection: "row", backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.xs }}>
              {THEME_OPTIONS.map((o) => {
                const active = mode === o.key;
                return (
                  <PressableScale key={o.key} accessibilityRole="radio" accessibilityState={{ selected: o.key === mode }} onPress={() => { if (o.key !== mode) track("setting_change", o.key === "dark" ? 1 : o.key === "light" ? 0 : 2, "theme"); setMode(o.key); }} style={{ flex: 1, paddingVertical: 10, borderRadius: radii.sm, alignItems: "center", backgroundColor: active ? colors.primary : "transparent" }}>
                    {/* Üçlü seçicinin seçili parçası DOLU turuncu + beyaz, gölgesiz
                        (2026-09-29 Samet: seçim B, dolu turuncu çip; web
                        `theme-toggle` aynı). */}
                    <Text variant="bodyStrong" color={active ? colors.onPrimary : colors.textMuted}>{t(o.label)}</Text>
                  </PressableScale>
                );
              })}
            </View>
          </Row>

          {/*
            HESAP VE GÜVENLİK EN ALTTA. İkisi de en üstteydi ve ayarların ilk
            ekranı "giriş yöntemlerin" ile başlıyordu — yılda bir dokunulan bir
            şey, her gün açılan hedef/seviye/tema ayarlarının önünde duruyordu.
            Sık kullanılan önce, yönetimsel olan sonra.
          */}
        </Group>

    ),
    account: (
        <Group colors={colors}>
          {guest ? (
            <>
              <Row colors={colors}>
                <GuestAccountCard title={t("guest.profile_title")} text={t("guest.profile_body")} />
              </Row>
              <Row colors={colors}>
                <PressableScale
                  onPress={() => nav.navigate("DeleteAccount")}
                  accessibilityRole="button"
                  accessibilityLabel={t("guest.delete_row")}
                  style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 6 }}
                >
                  <View style={{ flex: 1 }}>
                    <Text variant="bodyStrong" color={colors.dangerText}>{t("guest.delete_row")}</Text>
                    <Text variant="caption" color={colors.textMuted}>{t("guest.delete_row_sub")}</Text>
                  </View>
                  <ChevronNextIcon color={colors.textFaint} size={20} />
                </PressableScale>
              </Row>
            </>
          ) : (
          <>
          <Row label={t("settings.sec_name")} colors={colors}>
            <TextInput
              value={name}
              onChangeText={setName}
              /*
                ODAKTAN ÇIKINCA yazılıyor, her tuşta değil: her harfte bir
                istek atmak sunucuya da pile de gereksiz yük, üstelik yarım
                yazılmış bir adı kaydederdi. Onay ayrı bir satır değil — ad
                kutuda kalıyor, hata olursa altta görünüyor.
              */
              onBlur={() => { const v = name.trim(); if (v !== (me?.name ?? "")) void patch({ displayName: v || undefined }, () => track("setting_change", 0, "name")); }}
              placeholder={t("settings.display_name")}
              accessibilityLabel={t("settings.display_name")}
              placeholderTextColor={colors.textFaint}
              returnKeyType="done"
              autoCapitalize="words"
              // Sınır yoktu: kullanıcı istediği kadar yazabiliyor, uç 40'a
              // kırpıyordu (`/api/profile`) ve ad bir sonraki açılışta kısalmış
              // görünüyordu. Web kutusu da 60 diyordu, o da düzeltildi.
              maxLength={PROFILE_LIMITS.displayNameMax}
              style={{ backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 13, color: colors.text, fontSize: 16 }}
            />
          </Row>

          {/* Giriş yöntemleri: parola + sosyal hesaplar. Aynı e-postayla giriş
              yapan kişi tek hesapta buluşsun diye; doğrulanmamış e-postada
              otomatik bağlama bilerek yapılmıyor ve tek çıkış burası. */}
          <Row label={t("socialsettings.username")} colors={colors}>
            <SocialUsername />
          </Row>

          <Row label={t("links.title")} colors={colors}>
            <LinkedAccounts colors={colors} accounts={accounts} onChanged={yenileHesaplar} />
          </Row>

          {/* GÜVENLİK Hesap'ın alt ekranı: parola, iki adım ve oturumlar yılda bir
              açılan şeyler; listede kendi satırı yok. */}
          <Row colors={colors}>
            <PressableScale
              onPress={() => nav.push("Settings", { section: "security" })}
              accessibilityRole="button"
              accessibilityLabel={t("settings.group_security")}
              style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 6 }}
            >
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t("settings.group_security")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("settings.security_sub")}</Text>
              </View>
              <ChevronNextIcon color={colors.textFaint} size={20} />
            </PressableScale>
          </Row>

          {/*
            HESABI SİL — Ayarlar › Hesap'ın SON satırı.

            2026-09-09'da buradan kaldırılıp yalnız Profil'in dibine taşınmıştı
            (gerekçe: yıkıcı eylem ad kutusunun bir dokunuş yanında duruyordu).
            Ama iki mağaza, gizlilik politikası §11, şartlar §3, destek sayfası,
            web silme sayfası ve inceleme notları üç dilde birden "Profil ›
            Ayarlar › Hesap › Hesabı sil" diyordu; incelemeci notu izleyip
            düğmeyi bulamıyordu. Play'in kendi örneği de "hesap ayarlarının
            içinde". Satır geri geldi ama gerekçe korunarak: ad kutusunun hemen
            altında değil, giriş yöntemlerinin ardında ve grubun sonunda. Profil'in
            dibindeki bağlantı da duruyor; iki kapı, aynı ekran.
          */}
          <Row colors={colors}>
            <PressableScale
              onPress={() => nav.navigate("DeleteAccount")}
              accessibilityRole="button"
              accessibilityLabel={t("settings.delete_account")}
              style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 6 }}
            >
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong" color={colors.dangerText}>{t("settings.delete_account")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("deleteaccount.your_account_and_all_your_data")}</Text>
              </View>
              <ChevronNextIcon color={colors.textFaint} size={20} />
            </PressableScale>
          </Row>
          </>
          )}

          {/*
            GÜVENLİK KENDİ GRUBU. Üçü de "Giriş yöntemleri" bölümünün içindeydi
            ve o etiket yalnız ilk satırları anlatıyordu: parola değiştirmek,
            ikinci adım ve etkin oturumlar birer giriş yöntemi değil. Kartların
            kendi başlıkları da kalktı — bölümün etiketi zaten adı söylüyor.
          */}
        </Group>

    ),
    security: guest ? null : (
        <Group colors={colors}>
          {/* Parola ve ikinci adım YALNIZ parolalı hesapta: yalnız Google/Apple
              ile girmiş birine "şu anki parolan" sormak olmayan bir şeyi
              istemek olurdu. */}
          {parolaliHesap && (
            <Row label={t("settings.sec_password")} colors={colors}>
              <ChangePassword colors={colors} />
            </Row>
          )}
          {parolaliHesap && (
            <Row label={t("settings.sec_two_factor")} colors={colors}>
              <TwoFactor colors={colors} />
            </Row>
          )}
          {/* Etkin oturumlar HER hesapta: yalnız Google ile giren biri de
              telefonunu kaybedebilir. */}
          <Row label={t("settings.sec_sessions")} colors={colors}>
            <ActiveSessions colors={colors} />
          </Row>
        </Group>
    ),
    privacy: (
      <>
        {/* Profilimi kim görür, izinler, engellenenler (eskiden arkadaş
            kartındaki dişlide) + veri ve yapay zekâ onayları: gizlilik tek yer. */}
        <SocialPrivacy />
        <Group title={t("settings.data_consents")} colors={colors}>
          <Row colors={colors}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 6 }}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t("settings.send_usage_data")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("settings.analytics_sub")}</Text>
              </View>
              <Switch value={analytics} onValueChange={(v) => { setAnalytics(v); void setAnalyticsEnabled(v); }} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" accessibilityLabel={t("settings.send_usage_data")} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t("aiconsent.text_title")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t(guest ? "guest.ai_setting_sub" : "aiconsent.settings_text_sub")}</Text>
              </View>
              <Switch value={aiText === "granted"} disabled={aiText === null || aiBusy} onValueChange={(v) => { void toggleAiText(v); }} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" accessibilityLabel={t("aiconsent.text_title")} />
            </View>
            {micConsent === null ? (
              // Onay durumu okunana dek satır yerini tutar: gelince Gizlilik
              // bölümü uzayıp altındaki bağlantıları aşağı itmesin.
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
                <View style={{ flex: 1 }}>
                  <SkeletonLine variant="bodyStrong" width="55%" />
                  <SkeletonLine variant="caption" width="85%" />
                </View>
                <SkeletonLine variant="h3" width={20} />
              </View>
            ) : micConsent || aiVoice === "granted" ? (
              <PressableScale onPress={() => { setMicConsentState(false); setAiVoice(null); void revokeMicConsent().then(yenileAi); }} accessibilityLabel={t("settings.revoke_microphone_consent")} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
                <View style={{ flex: 1 }}>
                  <Text variant="bodyStrong">{t("settings.revoke_microphone_consent")}</Text>
                  <Text variant="caption" color={colors.textMuted}>{t("settings.you_ll_be_asked_about_voice_data")}</Text>
                </View>
                <ChevronNextIcon color={colors.textFaint} size={20} />
              </PressableScale>
            ) : null}
          </Row>

        </Group>
      </>
    ),
    about: (
      <Group colors={colors}>
          {/*
            HAKKINDA AYRI BİR BÖLÜM. Politika, şartlar, destek ve sürüm
            "Gizlilik"in içindeydi; grubun adı zaten "Gizlilik ve hakkında"ydı
            ama "hakkında" diye bir yer yoktu. Gizlilik artık yalnız kullanıcının
            AÇIP KAPATABİLDİĞİ iki şeyi taşıyor; okunacak metinler burada.
          */}
          <Row colors={colors}>
            <PressableScale onPress={() => openLegal("privacy")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md }}>
              <Text variant="bodyStrong" style={{ flex: 1 }}>{t("settings.privacy_policy")}</Text>
              <ChevronNextIcon color={colors.textFaint} size={20} />
            </PressableScale>
            <PressableScale onPress={() => openLegal("terms")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <Text variant="bodyStrong" style={{ flex: 1 }}>{t("settings.terms_of_use")}</Text>
              <ChevronNextIcon color={colors.textFaint} size={20} />
            </PressableScale>
            {/* Künye (Impressum): Almanya'daki kullanıcıya uygulamadan da tek
                dokunuşla ulaşılabilir olmalı (DDG §5). Sayfa webde. */}
            <PressableScale onPress={() => openLegal("impressum")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <Text variant="bodyStrong" style={{ flex: 1 }}>{t("settings.impressum")}</Text>
              <ChevronNextIcon color={colors.textFaint} size={20} />
            </PressableScale>
            {/* Açık kaynak lisansları (denetim İ7): MIT/BSD/Apache bildirimi. Liste webde
                (`/licenses`, `npm run licenses:gen`). */}
            <PressableScale onPress={() => openLegal("licenses")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <Text variant="bodyStrong" style={{ flex: 1 }}>{t("settings.oss_licenses")}</Text>
              <ChevronNextIcon color={colors.textFaint} size={20} />
            </PressableScale>
            {/*
              İLETİŞİM YÜZEYİ — Apple Guidelines 1.2. Kullanıcı içeriği taşıyan
              uygulamalarda filtreleme, bildirme ve engellemenin YANINDA
              "yayımlanmış iletişim bilgisi" de isteniyor. Bildirme ve engelleme
              zaten vardı; ulaşılacak bir adres yoktu ve destek e-postası yalnız
              gizlilik/şartlar metinlerinin içinde geçiyordu.

              Alt metin taşıyan tek satır bu bölümde: ötekiler (politika, şartlar)
              adıyla anlaşılıyor, bu ise ne olduğunu söylemezse "hangi destek"
              sorusunu bırakıyor.
            */}
            <PressableScale onPress={() => openLegal("support")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t("settings.support_contact")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("settings.support_contact_sub")}</Text>
              </View>
              <ChevronNextIcon color={colors.textFaint} size={20} />
            </PressableScale>
            <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.md }}>Lernomi {APP_VERSION}</Text>
          </Row>
      </Group>
    ),
  };

  if (section) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScreenHeader title={t(SECTION_TITLE[section])} />
        <KeyboardAwareScroll automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {body[section]}
        {!user && (
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xl }}>
            {t("settings.signin_to_save")}
          </Text>
        )}
        {/* YALNIZ HATA. Kayıt anında olduğu için başarı ayrıca söylenmiyor —
            kontrolün kendisi zaten yeni durumu gösteriyor. Duyuruluyor:
            sessiz bir kayıp ekran okuyucu kullanan kişiye hiç ulaşmazdı. */}
        {msg && <Text accessibilityLiveRegion="polite" variant="bodyStrong" color={colors.dangerText} style={{ marginTop: spacing.lg, textAlign: "center" }}>{msg}</Text>}
      </KeyboardAwareScroll>
      </View>
    );
  }

  /* LİSTE. Değerler satırın sağında: ne seçili olduğunu görmek için açmak
     gerekmiyor. Misafirde Hesap satırı hesap oluşturmaya, Çıkış yerine
     "Misafir verilerini sil" duruyor (giriş yöntemi yok, geri dönemez). */
  const premium = !!premiumStatus?.premium;
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("settings.settings")} />
      <KeyboardAwareScroll contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <Card padded style={{ paddingVertical: 0, marginTop: spacing.sm }}>
          <MenuRow icon={LearningSettingsIcon} tint={colors.primary} colors={colors} label={t("settings.group_learning")} value={learningVisible ? `${courseLabel} · ${level}` : null} onPress={() => nav.push("Settings", { section: "learning" })} />
          <MenuRow icon={LanguageIcon} tint={colors.info} colors={colors} label={t("settings.group_app")} value={LANG_LABEL[uiLang]} onPress={() => nav.push("Settings", { section: "app" })} />
          <MenuRow icon={RemindersIcon} tint={colors.streak} colors={colors} label={t("notifications.reminders")} onPress={() => nav.navigate("Notifications")} last />
        </Card>
        <Card padded style={{ paddingVertical: 0, marginTop: spacing.lg }}>
          {guest ? (
            <MenuRow icon={AccountIcon} tint={colors.success} colors={colors} label={t("guest.create_account")} onPress={() => nav.navigate("Auth")} />
          ) : (
            <MenuRow icon={AccountIcon} tint={colors.success} colors={colors} label={t("settings.group_account")} value={user?.email ?? null} onPress={() => nav.push("Settings", { section: "account" })} />
          )}
          <MenuRow icon={PrivacyIcon} tint={colors.accent} colors={colors} label={t("settings.group_privacy")} onPress={() => nav.push("Settings", { section: "privacy" })} />
          <MenuRow icon={PremiumIcon} tint={colors.streak} colors={colors} label={t("settings.group_subscription")} value={premiumStatus ? t(premium ? "settings.plan_premium" : "settings.plan_free") : null} onPress={() => nav.navigate("Paywall")} last />
        </Card>
        <Card padded style={{ paddingVertical: 0, marginTop: spacing.lg }}>
          <MenuRow icon={InfoIcon} tint={colors.info} colors={colors} label={t("settings.group_about")} value={APP_VERSION} onPress={() => nav.push("Settings", { section: "about" })} last />
        </Card>
        {guest ? (
          <PressableScale onPress={() => nav.navigate("DeleteAccount")} accessibilityRole="button" accessibilityLabel={t("guest.delete_row")} style={{ alignItems: "center", marginTop: spacing.xl, paddingVertical: spacing.md }}>
            <Text variant="bodyStrong" color={colors.dangerText}>{t("guest.delete_row")}</Text>
          </PressableScale>
        ) : user ? (
          <PressableScale onPress={() => setConfirmOut(true)} accessibilityRole="button" style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm, marginTop: spacing.xl, paddingVertical: spacing.md }}>
            <LogoutIcon color={colors.dangerText} size={20} />
            <Text variant="bodyStrong" color={colors.dangerText}>{t("profile.log_out")}</Text>
          </PressableScale>
        ) : null}
      </KeyboardAwareScroll>
      <ConfirmDialog
        visible={confirmOut}
        title={t("profile.log_out")}
        message={t("profile.signout_confirm")}
        confirmLabel={t("profile.signout")}
        cancelLabel={t("common.discard")}
        destructive
        onConfirm={reallySignOut}
        onCancel={() => setConfirmOut(false)}
      />
    </View>
  );
}
