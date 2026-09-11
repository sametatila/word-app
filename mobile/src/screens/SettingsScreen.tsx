import React, { useEffect, useRef, useState } from "react";
import { t } from "../lib/i18n";
import { View, TextInput, ScrollView, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
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
import { ArrowBackIcon, ChevronRightIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { PROFILE_DEFAULTS } from "../lib/profileDefaults";
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
/**
 * Grup — başlık ve TEK kart.
 *
 * Eskiden her bölümün kendi kartı vardı ve ekran alt alta on beş kutuya
 * dönüşmüştü: kutu, bölümleri ayırsın diye vardı ama bölüm sayısı artınca
 * ayırmayı bıraktı, yalnız gürültü ekledi. Şimdi kart grubu çiziyor,
 * bölümler kartın içinde ince bir çizgiyle ayrılıyor.
 */
function Group({ title, colors, children }: { title: string; colors: Palette; children: React.ReactNode }) {
  /*
    ÇİZGİYİ GRUP ÇİZİYOR, satır değil. Satırların bir kısmı koşullu (parolasız
    hesapta PAROLA bölümü hiç yok); ayıracı satırın kendi üstüne koysaydık
    gizlenen ilk satırın çizgisi kartın tepesinde asılı kalırdı.
    `Children.toArray` false/null olanları zaten atıyor, yani "ilk ÇİZİLEN
    satır" burada doğru biliniyor.
  */
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <View style={{ marginTop: spacing.xxl }}>
      <Text variant="h3" color={colors.text} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>{title}</Text>
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

export function SettingsScreen() {
  const { colors, mode, setMode } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user, refresh } = useAuth();
  const { me } = useMe();

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
      setNewPerDay(me.newPerDay ?? PROFILE_DEFAULTS.newPerDay);
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
        <Group title={t("settings.group_learning")} colors={colors}>
          <Row label={t("settings.language_to_learn")} colors={colors}>
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
          </Row>

          <Row label={t("settings.level")} colors={colors}>
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
          </Row>

          <Row label={t("settings.daily_goal_reviews_day")} colors={colors}>
            {/*
              ÇİP IZGARASI YERİNE KAYDIRICI. Günlük hedef on çiple, günde yeni
              kelime yedi çiple seçiliyordu: yirmi kadar dokunma hedefi, tek bir
              sayıyı seçmek için. Webde aynı ayar baştan beri kaydırıcıydı.
            */}
            <Slider
              label={t("settings.daily_goal_short")}
              value={goal}
              min={5}
              max={120}
              step={5}
              suffix={t("settings.reviews_unit")}
              onChange={setGoal}
              onCommit={(v) => { if (v !== (me?.dailyGoal ?? -1)) void patch({ dailyGoal: v }, () => track("setting_change", v, "daily_goal")); }}
            />
            <View style={{ height: spacing.lg }} />
            <Slider
              label={t("settings.new_per_day")}
              value={newPerDay}
              min={0}
              max={40}
              step={1}
              suffix={t("settings.words_unit")}
              onChange={setNewPerDay}
              onCommit={(v) => { if (v !== (me?.newPerDay ?? -1)) void patch({ newPerDay: v }, () => track("setting_change", v, "new_per_day")); }}
            />
            {/* Hedefi ayarlayan kişinin merak ettiği tek şey o sayının neyi
                belirlediği; web de notu kaydırıcıların altına koyuyor. */}
            <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.md }}>{t("settings.srs_note")}</Text>
          </Row>
        </Group>

        <Group title={t("settings.group_app")} colors={colors}>
          <Row label={t("settings.app_language")} colors={colors}>
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
          </Row>

          {/*
            SES TEK YERDE. Oyun sesleri "Görünüm"ün içindeydi (ses, görünüm
            değil) ve okuma sesi "Öğrenme"de, yani sesle ilgili iki ayar birbirini
            hiç görmeyen iki grupta duruyordu. Sesini kısmak isteyen kullanıcı
            ikisini de burada buluyor.
          */}
          <Row label={t("settings.sound")} colors={colors}>
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
          </Row>

          <Row label={t("settings.appearance")} colors={colors}>
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
          </Row>

          {/*
            BİLDİRİMLER PROFİLDEN BURAYA. Ekranın içeriği bir ayar: hatırlatma
            saati, seri koruma, haftalık test. Profil menüsünde durduğu sürece
            kullanıcı onu Ayarlar'da arıyor ve bulamıyordu; ayrıca "Gelen kutusu"
            satırının hemen altında, neredeyse aynı adla duruyordu.
          */}
          <Row label={t("settings.sec_notifications")} colors={colors}>
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
          </Row>

          {/*
            HESAP VE GÜVENLİK EN ALTTA. İkisi de en üstteydi ve ayarların ilk
            ekranı "giriş yöntemlerin" ile başlıyordu — yılda bir dokunulan bir
            şey, her gün açılan hedef/seviye/tema ayarlarının önünde duruyordu.
            Sık kullanılan önce, yönetimsel olan sonra.
          */}
        </Group>

        <Group title={t("settings.group_account")} colors={colors}>
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
          </Row>

          {/* Giriş yöntemleri: parola + sosyal hesaplar. Aynı e-postayla giriş
              yapan kişi tek hesapta buluşsun diye; doğrulanmamış e-postada
              otomatik bağlama bilerek yapılmıyor ve tek çıkış burası. */}
          <Row label={t("links.title")} colors={colors}>
            <LinkedAccounts colors={colors} accounts={accounts} onChanged={yenileHesaplar} />
          </Row>

          {/*
            GÜVENLİK KENDİ GRUBU. Üçü de "Giriş yöntemleri" bölümünün içindeydi
            ve o etiket yalnız ilk satırları anlatıyordu: parola değiştirmek,
            ikinci adım ve etkin oturumlar birer giriş yöntemi değil. Kartların
            kendi başlıkları da kalktı — bölümün etiketi zaten adı söylüyor.
          */}
        </Group>

        <Group title={t("settings.group_security")} colors={colors}>
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

        <Group title={t("settings.group_privacy_about")} colors={colors}>
          <Row label={t("settings.privacy")} colors={colors}>
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
          </Row>

          {/*
            HAKKINDA AYRI BİR BÖLÜM. Politika, şartlar, destek ve sürüm
            "Gizlilik"in içindeydi; grubun adı zaten "Gizlilik ve hakkında"ydı
            ama "hakkında" diye bir yer yoktu. Gizlilik artık yalnız kullanıcının
            AÇIP KAPATABİLDİĞİ iki şeyi taşıyor; okunacak metinler burada.
          */}
          <Row label={t("settings.about")} colors={colors}>
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
          </Row>
        </Group>

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
