import React, { useEffect, useRef, useState } from "react";
import { t } from "../lib/i18n";
import { View, TextInput, ScrollView, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Chip } from "../ui/Chip";
import { Card } from "../ui/Card";
import { LinkedAccounts } from "../ui/LinkedAccounts";
import { ChangePassword } from "../ui/ChangePassword";
import { TwoFactor } from "../ui/TwoFactor";
import { ActiveSessions } from "../ui/ActiveSessions";
import { listAccounts, type LinkedAccount } from "../lib/accountLinks";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { useMe } from "../lib/useMe";
import { updateProfile } from "../lib/updateProfile";
import { VoicePicker } from "../ui/VoicePicker";
import { SkeletonLine } from "../ui/Skeleton";
import { loadVoicePref, setVoicePref } from "../lib/tts";
import { defaultVoice, type VoiceId } from "../lib/voices";
import { coursesForNative, offeredNativeLangs, NATIVE_LANGS, type NativeLang } from "../lib/courses";
import { currentLang, setLang } from "../lib/i18n";
import { useTheme, spacing, radii, cardShadow, type Palette, type ThemeMode } from "../theme";
import { analyticsEnabled, setAnalyticsEnabled, track } from "../lib/track";
import { soundEnabled, setSoundEnabled } from "../lib/sfx";
import { hasMicConsent, setMicConsent } from "../lib/micConsent";
import { openLegal } from "../lib/legal";
import { APP_VERSION } from "../version";

/**
 * Günlük hedef seçenekleri — uç 5-120 arasını kabul ediyor
 * (`/api/profile` `clampInt(body.dailyGoal, 5, 120)`) ve web kaydırıcısı da
 * o aralığı veriyor. Liste [10, 20, 30, 50] idi: Android kullanıcısı 5'i de
 * 120'yi de SEÇEMİYORDU, yani sunucunun ve öteki platformun kabul ettiği
 * hedeflerin çoğu telefonda yoktu. `NEW_PER_DAY` aynı kuralı zaten tutuyor
 * (bkz. parity §50).
 *
 * Merdiven altta sık, üstte seyrek: günlük hedefini 5'ten 20'ye çeken kullanıcı
 * ince ayar istiyor, 100'den 120'ye çeken kullanıcı istemiyor. Yirmi dört çip
 * (5'ten 120'ye beşer beşer) telefonda bir çip duvarı olurdu.
 */
const GOALS = [5, 10, 15, 20, 30, 40, 60, 80, 100, 120];
/**
 * Günde yeni kelime seçenekleri — uç 0-40 arasını kabul ediyor
 * (`/api/profile` `clampInt(body.newPerDay, 0, 40)`), web kaydırıcısı da aynı
 * aralıkta. Sıfır meşru bir seçim: "yeni kelime istemiyorum, yalnız tekrar".
 */
const NEW_PER_DAY = [0, 5, 10, 15, 20, 30, 40];
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
 */
function courseOptions(lang: NativeLang): { key: string; label: string; sub: string }[] {
  return coursesForNative(lang).map((c) => ({ key: c.id, label: c.label[lang], sub: c.sub[lang] }));
}


/** Ayar bölümü — başlık + kart. Görsel gruplama için tutarlı çerçeve. */
/**
 * Grup başlığı — dokuz düz bölüm dört mantıksal gruba alındı.
 *
 * Eskiden hepsi aynı düzlemdeydi: kurs/seviye/hedef (öğrenme) ile arayüz
 * dili/görünüm (uygulama) ve hesap/gizlilik iç içeydi. Kullanıcı aradığı ayarı
 * grubun adından değil, satır satır okuyarak buluyordu.
 */
function Group({ title, colors }: { title: string; colors: Palette }) {
  return (
    <Text
      variant="h3"
      color={colors.text}
      style={{ marginTop: spacing.xxl, marginBottom: -spacing.sm, marginLeft: 4 }}
    >
      {title}
    </Text>
  );
}

function Section({ title, colors, children }: { title: string; colors: Palette; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: spacing.xl }}>
      <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4, letterSpacing: 0.5 }}>{title}</Text>
      <Card padded>{children}</Card>
    </View>
  );
}

export function SettingsScreen() {
  const { colors, mode, setMode } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user, refresh } = useAuth();
  const { me } = useMe();

  const [name, setName] = useState(me?.name ?? user?.name ?? "");
  const [goal, setGoal] = useState<number>(me?.dailyGoal ?? 20);
  /*
   * GÜNDE YENİ KELİME — mobilde HİÇ YOKTU.
   *
   * `updateProfile` alanı baştan beri taşıyor ve `/api/profile` kabul ediyor;
   * eksik olan tek şey hem mevcut değeri gönderen uç alanı hem de onu çizen
   * yüzeydi. Kullanıcı günde kaç yeni kelime göreceğini yalnız webden
   * ayarlayabiliyordu - oysa bu, günlük yükü belirleyen iki ayardan biri.
   */
  const [newPerDay, setNewPerDay] = useState<number>(me?.newPerDay ?? 10);
  const [level, setLevel] = useState<string>(me?.level ?? "A1");
  const [course, setCourse] = useState<string>(me?.course ?? "de");
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
  useEffect(() => { let alive = true; void listAccounts().then((a) => { if (alive) setAccounts(a); }); return () => { alive = false; }; }, []);
  const parolaliHesap = accounts?.some((a) => a.providerId === "credential") ?? false;
  const [analytics, setAnalytics] = useState(analyticsEnabled());
  /* Oyun sesleri: efektler için ayrı anahtar. Telaffuz sesi buna BAĞLI DEĞİL —
     sessiz bir yerde çalışmak isteyen kullanıcı telefonu kısınca konuşmayı da
     kaybediyordu; web ikisini baştan beri ayırıyor (`sound-settings`). */
  const [sounds, setSounds] = useState(soundEnabled());
  const [uiLang, setUiLang] = useState<NativeLang>(currentLang());
  const [micConsent, setMicConsentState] = useState<boolean | null>(null);
  useEffect(() => { void hasMicConsent().then(setMicConsentState); }, []);

  // useMe async gelir: ilk render'da me=null olduğu için state'ler yedeğe
  // (A1 / 20) düşüyordu ve gerçek değer (ör. A2) sonradan gelince useState'in
  // ilk değeri artık güncellenmiyordu — Ayarlar'da seviye A1 görünüyordu.
  // me ilk kez gelince BİR KEZ hidrate et (kullanıcının sonraki düzenini ezme).
  const hydrated = useRef(false);
  useEffect(() => {
    if (me && !hydrated.current) {
      hydrated.current = true;
      setName((n) => n || me.name || user?.name || "");
      setGoal(me.dailyGoal);
      setNewPerDay(me.newPerDay ?? 10);
      setLevel(me.level);
      setCourse(me.course ?? "de");
      void loadVoicePref(me.course ?? "de").then(setVoice);
    }
  }, [me, user]);

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
    const next = list[0]?.id;
    if (next) await pickCourse(next);
  }

  async function pickCourse(c: string) {
    if (c === course) return;
    setCourse(c);
    const v = defaultVoice(c); // kurs değişince o kursun varsayılan sesine dön
    setVoice(v);
    void setVoicePref(c, v);
    await updateProfile({ course: c, voice: v });
    track("setting_change", 0, "course");
    await refresh();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{t("settings.settings")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Group title={t("settings.group_learning")} colors={colors} />
        <Section title={t("settings.language_to_learn")} colors={colors}>
          {courseOptions(uiLang).map((c, i) => {
            const active = course === c.key;
            return (
              <PressableScale key={c.key} onPress={() => pickCourse(c.key)} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                <View style={{ flex: 1 }}>
                  <Text variant="bodyStrong" color={active ? colors.primaryText : colors.text}>{c.label}</Text>
                  <Text variant="caption" color={colors.textMuted}>{c.sub}</Text>
                </View>
                <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: active ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                  {active ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary }} /> : null}
                </View>
              </PressableScale>
            );
          })}
          {/* Kurs değiştirmenin ne yaptığı: kelimeler ve kuyruk taşınıyor, öteki
              kurs SİLİNMİYOR. Web bunu yazıyordu, mobil yazmıyordu - ve bu,
              düğmeye basmadan önce bilinmesi gereken bir şey. */}
          <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.sm }}>{t("settings.course_switch_note")}</Text>
        </Section>

        <Section title={t("settings.level")} colors={colors}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {LEVELS.map((l) => <Chip key={l} label={l} active={level === l} onPress={() => { if (l === level) return; setLevel(l); void patch({ level: l }, () => track("setting_change", 0, "level")); }} />)}
          </View>
          {/* SEÇİLİ SEVİYENİN AÇIKLAMASI + seviyenin kendiliğinden değişmediği.
              Dört açıklama sözlükte duruyordu (`level.*_desc`) ama mobilde
              yalnız onboarding'de okunuyordu: ayarlarda seviye "A1…C1" diye
              görünüyor, hangi seviyenin ne anlama geldiği yazmıyordu. Web
              ikisini AYNI cümlede veriyor ("<açıklama>. Bu düğmeyi senden
              başkası çevirmiyor") ve mobil de artık öyle. */}
          <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.sm, lineHeight: 18 }}>
            {t(LEVEL_DESC_KEY[level] ?? "onboarding.i_m_just_starting_out")}
          </Text>
          <PressableScale onPress={() => nav.navigate("Placement")} style={{ marginTop: spacing.md, alignSelf: "flex-start" }}>
            <Text variant="bodyStrong" color={colors.primaryText}>{t("settings.not_sure_take_placement_test")}</Text>
          </PressableScale>
        </Section>

        <Section title={t("settings.daily_goal_reviews_day")} colors={colors}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {Array.from(new Set([...GOALS, goal])).sort((a, b) => a - b).map((g) => <Chip key={g} label={String(g)} active={goal === g} onPress={() => { if (g === goal) return; setGoal(g); void patch({ dailyGoal: g }, () => track("setting_change", g, "daily_goal")); }} />)}
          </View>
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md, marginBottom: spacing.sm, marginLeft: 4 }}>{t("settings.new_per_day")}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {Array.from(new Set([...NEW_PER_DAY, newPerDay])).sort((a, b) => a - b).map((n) => <Chip key={n} label={String(n)} active={newPerDay === n} onPress={() => { if (n === newPerDay) return; setNewPerDay(n); void patch({ newPerDay: n }, () => track("setting_change", n, "new_per_day")); }} />)}
          </View>
          {/* Hedefi ayarlayan kişinin merak ettiği tek şey o sayının neyi
              belirlediği; web de notu kaydırıcıların altına koyuyor. */}
          <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.md }}>{t("settings.srs_note")}</Text>
        </Section>

        <Group title={t("settings.group_app")} colors={colors} />
        <Section title={t("settings.app_language")} colors={colors}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {offeredNativeLangs().map((l) => (
              <Chip
                key={l}
                label={LANG_LABEL[l]}
                active={uiLang === l}
                onPress={() => { setUiLang(l); void setLang(l); void updateProfile({ nativeLang: l }); track("setting_change", NATIVE_LANGS.indexOf(l), "lang"); void keepCourseValid(l); }}
              />
            ))}
          </View>
        </Section>

        {/*
          SES TEK YERDE. Oyun sesleri "Görünüm"ün içindeydi (ses, görünüm
          değil) ve okuma sesi "Öğrenme"de, yani sesle ilgili iki ayar birbirini
          hiç görmeyen iki grupta duruyordu. Sesini kısmak isteyen kullanıcı
          ikisini de burada buluyor.
        */}
        <Section title={t("settings.sound")} colors={colors}>
          <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t("settings.reading_voice")}</Text>
          <VoicePicker course={course} value={voice} onChange={pickVoice} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: 12, marginTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
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
        </Section>

        <Section title={t("settings.appearance")} colors={colors}>
          <View style={{ flexDirection: "row", backgroundColor: colors.surface2, borderRadius: radii.md, padding: 4 }}>
            {THEME_OPTIONS.map((o) => {
              const active = mode === o.key;
              return (
                <PressableScale key={o.key} accessibilityRole="radio" accessibilityState={{ selected: o.key === mode }} onPress={() => { if (o.key !== mode) track("setting_change", o.key === "dark" ? 1 : o.key === "light" ? 0 : 2, "theme"); setMode(o.key); }} style={{ flex: 1, paddingVertical: 10, borderRadius: radii.sm, alignItems: "center", backgroundColor: active ? colors.surface : "transparent", ...(active ? cardShadow(colors, 4) : {}) }}>
                  <Text variant="bodyStrong" color={active ? colors.primaryText : colors.textMuted}>{t(o.label)}</Text>
                </PressableScale>
              );
            })}
          </View>
        </Section>

        {/*
          BİLDİRİMLER PROFİLDEN BURAYA. Ekranın içeriği bir ayar: hatırlatma
          saati, seri koruma, haftalık test. Profil menüsünde durduğu sürece
          kullanıcı onu Ayarlar'da arıyor ve bulamıyordu; ayrıca "Gelen kutusu"
          satırının hemen altında, neredeyse aynı adla duruyordu.
        */}
        <Section title={t("notifications.notifications")} colors={colors}>
          <PressableScale
            onPress={() => nav.navigate("Notifications")}
            accessibilityRole="button"
            accessibilityLabel={t("notifications.notifications")}
            style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 6 }}
          >
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong">{t("notifications.reminders")}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("settings.notifications_sub")}</Text>
            </View>
            <ChevronRightIcon color={colors.textFaint} size={20} />
          </PressableScale>
        </Section>

        {/*
          HESAP VE GÜVENLİK EN ALTTA. İkisi de en üstteydi ve ayarların ilk
          ekranı "giriş yöntemlerin" ile başlıyordu — yılda bir dokunulan bir
          şey, her gün açılan hedef/seviye/tema ayarlarının önünde duruyordu.
          Sık kullanılan önce, yönetimsel olan sonra.
        */}
        <Group title={t("settings.group_account")} colors={colors} />
        <Section title={t("settings.display_name")} colors={colors}>
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
            placeholderTextColor={colors.textFaint}
            returnKeyType="done"
            autoCapitalize="words"
            // Sınır yoktu: kullanıcı istediği kadar yazabiliyor, uç 40'a
            // kırpıyordu (`/api/profile`) ve ad bir sonraki açılışta kısalmış
            // görünüyordu. Web kutusu da 60 diyordu, o da düzeltildi.
            maxLength={40}
            style={{ backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 13, color: colors.text, fontSize: 16 }}
          />
          {/* Hesap silme buradan PROFİLE taşındı (çıkış yapın altına): yıkıcı
              eylem, ad kutusunun bir dokunuş yanında durmamalı. Gerekçenin
              tamamı ProfileScreen'de. */}
        </Section>

        {/* Giriş yöntemleri: parola + sosyal hesaplar. Aynı e-postayla giriş
            yapan kişi tek hesapta buluşsun diye; doğrulanmamış e-postada
            otomatik bağlama bilerek yapılmıyor ve tek çıkış burası. */}
        <Section title={t("links.title")} colors={colors}>
          <LinkedAccounts colors={colors} accounts={accounts} onChanged={yenileHesaplar} />
        </Section>

        {/*
          GÜVENLİK KENDİ GRUBU. Üçü de "Giriş yöntemleri" bölümünün içindeydi
          ve o etiket yalnız ilk satırları anlatıyordu: parola değiştirmek,
          ikinci adım ve etkin oturumlar birer giriş yöntemi değil. Kartların
          kendi başlıkları da kalktı — bölümün etiketi zaten adı söylüyor.
        */}
        <Group title={t("settings.group_security")} colors={colors} />
        {/* Parola ve ikinci adım YALNIZ parolalı hesapta: yalnız Google/Apple
            ile girmiş birine "şu anki parolan" sormak olmayan bir şeyi
            istemek olurdu. */}
        {parolaliHesap && (
          <Section title={t("settings.sec_password")} colors={colors}>
            <ChangePassword colors={colors} />
          </Section>
        )}
        {parolaliHesap && (
          <Section title={t("settings.sec_two_factor")} colors={colors}>
            <TwoFactor colors={colors} />
          </Section>
        )}
        {/* Etkin oturumlar HER hesapta: yalnız Google ile giren biri de
            telefonunu kaybedebilir. */}
        <Section title={t("settings.sec_sessions")} colors={colors}>
          <ActiveSessions colors={colors} />
        </Section>

        <Group title={t("settings.group_privacy_about")} colors={colors} />
        <Section title={t("settings.privacy")} colors={colors}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 6 }}>
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong">{t("settings.send_usage_data")}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("settings.analytics_sub")}</Text>
            </View>
            <Switch value={analytics} onValueChange={(v) => { setAnalytics(v); void setAnalyticsEnabled(v); }} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" accessibilityLabel={t("settings.send_usage_data")} />
          </View>
          {micConsent === null ? (
            // Onay durumu okunana dek satır yerini tutar: gelince Gizlilik
            // bölümü uzayıp altındaki bağlantıları aşağı itmesin.
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <View style={{ flex: 1 }}>
                <SkeletonLine variant="bodyStrong" width="55%" />
                <SkeletonLine variant="caption" width="85%" />
              </View>
              <SkeletonLine variant="h3" width={20} />
            </View>
          ) : micConsent ? (
            <PressableScale onPress={() => { void setMicConsent(false); setMicConsentState(false); }} accessibilityLabel={t("settings.revoke_microphone_consent")} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t("settings.revoke_microphone_consent")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("settings.you_ll_be_asked_about_voice_data")}</Text>
              </View>
              <ChevronRightIcon color={colors.textFaint} size={20} />
            </PressableScale>
          ) : null}
        </Section>

        {/*
          HAKKINDA AYRI BİR BÖLÜM. Politika, şartlar, destek ve sürüm
          "Gizlilik"in içindeydi; grubun adı zaten "Gizlilik ve hakkında"ydı
          ama "hakkında" diye bir yer yoktu. Gizlilik artık yalnız kullanıcının
          AÇIP KAPATABİLDİĞİ iki şeyi taşıyor; okunacak metinler burada.
        */}
        <Section title={t("settings.about")} colors={colors}>
          <PressableScale onPress={() => openLegal("privacy")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12 }}>
            <Text variant="bodyStrong" style={{ flex: 1 }}>{t("settings.privacy_policy")}</Text>
            <ChevronRightIcon color={colors.textFaint} size={20} />
          </PressableScale>
          <PressableScale onPress={() => openLegal("terms")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.hairline }}>
            <Text variant="bodyStrong" style={{ flex: 1 }}>{t("settings.terms_of_use")}</Text>
            <ChevronRightIcon color={colors.textFaint} size={20} />
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
          <PressableScale onPress={() => openLegal("support")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.hairline }}>
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong">{t("settings.support_contact")}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("settings.support_contact_sub")}</Text>
            </View>
            <ChevronRightIcon color={colors.textFaint} size={20} />
          </PressableScale>
          <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.md }}>Lernomi {APP_VERSION}</Text>
        </Section>

        {!user && (
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xl }}>
            {t("settings.signin_to_save")}
          </Text>
        )}
        {/* YALNIZ HATA. Kayıt anında olduğu için başarı ayrıca söylenmiyor —
            kontrolün kendisi zaten yeni durumu gösteriyor. Duyuruluyor:
            sessiz bir kayıp ekran okuyucu kullanan kişiye hiç ulaşmazdı. */}
        {msg && <Text accessibilityLiveRegion="polite" variant="bodyStrong" color={colors.dangerText} style={{ marginTop: spacing.lg, textAlign: "center" }}>{msg}</Text>}
      </ScrollView>
    </View>
  );
}
