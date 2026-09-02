import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, ScrollView, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { useMe } from "../lib/useMe";
import { updateProfile } from "../lib/updateProfile";
import { VoicePicker } from "../ui/VoicePicker";
import { loadVoicePref, setVoicePref } from "../lib/tts";
import { defaultVoice, type VoiceId } from "../lib/voices";
import { enabledCourses, DEFAULT_NATIVE } from "../lib/courses";
import { useTheme, spacing, radii, softShadow, type Palette, type ThemeMode } from "../theme";
import { analyticsEnabled, setAnalyticsEnabled } from "../lib/track";
import { hasMicConsent, setMicConsent } from "../lib/micConsent";
import { openLegal } from "../lib/legal";
import { APP_VERSION } from "../version";

const GOALS = [10, 20, 30, 50];
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const THEME_OPTIONS: { key: ThemeMode; label: string }[] = [
  { key: "system", label: "Sistem" },
  { key: "light", label: "Açık" },
  { key: "dark", label: "Koyu" },
];
// Liste kurs kayıt defterinden türüyor: yeni bir dil açıldığında burayı da
// düzenlemek gerekmesin diye. Etiket şimdilik Türkçe; i18n gelince kullanıcının
// anadili seçilecek (bkz. lib/courses.ts, NativeLang).
const COURSE_OPTIONS: { key: string; label: string; sub: string }[] = enabledCourses().map((c) => ({
  key: c.id,
  label: c.label[DEFAULT_NATIVE],
  sub: c.sub[DEFAULT_NATIVE],
}));

function Chip({ label, active, onPress, colors }: { label: string; active: boolean; onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface }}>
      <Text variant="bodyStrong" color={active ? colors.primary : colors.textMuted}>{label}</Text>
    </PressableScale>
  );
}

/** Ayar bölümü — başlık + kart. Görsel gruplama için tutarlı çerçeve. */
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
  const [level, setLevel] = useState<string>(me?.level ?? "A1");
  const [course, setCourse] = useState<string>(me?.course ?? "de");
  const [voice, setVoice] = useState<VoiceId>(defaultVoice(me?.course ?? "de"));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState(analyticsEnabled());
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
      setLevel(me.level);
      setCourse(me.course ?? "de");
      void loadVoicePref(me.course ?? "de").then(setVoice);
    }
  }, [me, user]);

  // Görünüm / ses / dil ANINDA uygulanır (kaydet butonu ad/hedef/seviye için).
  function pickVoice(v: VoiceId) { setVoice(v); void setVoicePref(course, v); void updateProfile({ voice: v }); }
  async function pickCourse(c: string) {
    if (c === course) return;
    setCourse(c);
    const v = defaultVoice(c); // kurs değişince o kursun varsayılan sesine dön
    setVoice(v);
    void setVoicePref(c, v);
    await updateProfile({ course: c, voice: v });
    await refresh();
  }

  async function save() {
    if (busy) return;
    if (!user) { nav.navigate("Auth"); return; }
    setBusy(true);
    setMsg(null);
    const ok = await updateProfile({ displayName: name.trim() || undefined, dailyGoal: goal, level });
    setBusy(false);
    if (ok) { await refresh(); setMsg("Kaydedildi"); setTimeout(() => nav.goBack(), 600); }
    else setMsg("Kaydedilemedi, tekrar dene.");
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Ayarlar</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Section title="HESAP" colors={colors}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Görünen ad"
            placeholderTextColor={colors.textFaint}
            autoCapitalize="words"
            style={{ backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 13, color: colors.text, fontSize: 16 }}
          />
          {/* Hesap silme (Play zorunluluğu): ayrı ekran, iki adımlı onay. */}
          <PressableScale onPress={() => nav.navigate("DeleteAccount")} accessibilityLabel="Hesabı sil" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: spacing.md, marginTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong" color={colors.danger}>Hesabı sil</Text>
              <Text variant="caption" color={colors.textMuted}>Tüm verilerinle birlikte, geri alınamaz</Text>
            </View>
            <ChevronRightIcon color={colors.textFaint} size={20} />
          </PressableScale>
        </Section>

        <Section title="ÖĞRENİLECEK DİL" colors={colors}>
          {COURSE_OPTIONS.map((c, i) => {
            const active = course === c.key;
            return (
              <PressableScale key={c.key} onPress={() => pickCourse(c.key)} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                <View style={{ flex: 1 }}>
                  <Text variant="bodyStrong" color={active ? colors.primary : colors.text}>{c.label}</Text>
                  <Text variant="caption" color={colors.textMuted}>{c.sub}</Text>
                </View>
                <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: active ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                  {active ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary }} /> : null}
                </View>
              </PressableScale>
            );
          })}
        </Section>

        <Section title="SEVİYE" colors={colors}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {LEVELS.map((l) => <Chip key={l} label={l} active={level === l} onPress={() => setLevel(l)} colors={colors} />)}
          </View>
          <PressableScale onPress={() => nav.navigate("Placement")} style={{ marginTop: spacing.md, alignSelf: "flex-start" }}>
            <Text variant="bodyStrong" color={colors.primary}>Emin değil misin? Seviye testini çöz →</Text>
          </PressableScale>
        </Section>

        <Section title="GÜNLÜK HEDEF · tekrar / gün" colors={colors}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {Array.from(new Set([...GOALS, goal])).sort((a, b) => a - b).map((g) => <Chip key={g} label={String(g)} active={goal === g} onPress={() => setGoal(g)} colors={colors} />)}
          </View>
        </Section>

        <Section title="OKUMA SESİ" colors={colors}>
          <VoicePicker course={course} value={voice} onChange={pickVoice} />
        </Section>

        <Section title="GÖRÜNÜM" colors={colors}>
          <View style={{ flexDirection: "row", backgroundColor: colors.surface2, borderRadius: radii.md, padding: 4 }}>
            {THEME_OPTIONS.map((o) => {
              const active = mode === o.key;
              return (
                <PressableScale key={o.key} onPress={() => setMode(o.key)} style={{ flex: 1, paddingVertical: 10, borderRadius: radii.sm, alignItems: "center", backgroundColor: active ? colors.surface : "transparent", ...(active ? softShadow("#5a3418", 4) : {}) }}>
                  <Text variant="bodyStrong" color={active ? colors.primary : colors.textMuted}>{o.label}</Text>
                </PressableScale>
              );
            })}
          </View>
        </Section>

        <Section title="GİZLİLİK" colors={colors}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 6 }}>
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong">Kullanım verisi gönder</Text>
              <Text variant="caption" color={colors.textMuted}>Hangi özelliklerin kullanıldığı; üçüncü tarafa gitmez</Text>
            </View>
            <Switch value={analytics} onValueChange={(v) => { setAnalytics(v); void setAnalyticsEnabled(v); }} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" accessibilityLabel="Kullanım verisi gönder" />
          </View>
          {micConsent ? (
            <PressableScale onPress={() => { void setMicConsent(false); setMicConsentState(false); }} accessibilityLabel="Mikrofon onayını geri al" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">Mikrofon onayını geri al</Text>
                <Text variant="caption" color={colors.textMuted}>Yürüyüş modunda ses verisi açıklaması yeniden sorulur</Text>
              </View>
              <ChevronRightIcon color={colors.textFaint} size={20} />
            </PressableScale>
          ) : null}
          <PressableScale onPress={() => openLegal("privacy")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.hairline }}>
            <Text variant="bodyStrong" style={{ flex: 1 }}>Gizlilik politikası</Text>
            <ChevronRightIcon color={colors.textFaint} size={20} />
          </PressableScale>
          <PressableScale onPress={() => openLegal("terms")} accessibilityRole="link" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.hairline }}>
            <Text variant="bodyStrong" style={{ flex: 1 }}>Kullanım şartları</Text>
            <ChevronRightIcon color={colors.textFaint} size={20} />
          </PressableScale>
          <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.md }}>Nomi {APP_VERSION}</Text>
        </Section>

        {!user && (
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xl }}>
            Ayarların hesabına kaydedilir. Kaydetmek için giriş yap.
          </Text>
        )}
        {msg && <Text variant="bodyStrong" color={msg === "Kaydedildi" ? colors.success : colors.danger} style={{ marginTop: spacing.lg, textAlign: "center" }}>{msg}</Text>}

        <PressableScale onPress={save} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.xl }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color="#fff">{busy ? "..." : user ? "Kaydet" : "Giriş yap ve kaydet"}</Text>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
