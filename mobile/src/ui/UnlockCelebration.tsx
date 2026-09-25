import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "../lib/i18n";
import { sfx } from "../lib/sfx";
import { useAuth } from "../lib/AuthContext";
import { useStatsBump } from "../lib/statsSignal";
import { navigationRef } from "../lib/pushRoute";
import { premiumSnapshot, refreshPremium, subscribePremium, type PremiumStatus } from "../lib/premium";
import { newlyOpened, openCounts, type UnlockSurface } from "../lib/unlock";
import { Celebrate } from "./Celebrate";
import { Text } from "./Text";
import { SparkIcon } from "./icons";
import { useTheme, spacing, radii, softShadow, ds } from "../theme";

/**
 * YENİ HAK AÇILDI — kutlama.
 *
 * Ücretsiz haklar "bitir + 7 günlük seri" ile açılıyor (sunucu `lib/premium/unlock`)
 * ve açıldığı AN kullanıcıya söylenmeli: kilidi kendisi açtı, bu bir ödül.
 * Tetikleyici sunucunun kilit açma görünümündeki `open` sayısının ARTMASI;
 * son bilinen sayılar cihazda (kullanıcı başına) tutuluyor. İlk okumada kıyas
 * yok, yani uygulama açılışında "kutlama yağmuru" olmuyor.
 *
 * Rozet kutlamasıyla (`AchievementUnlock`) aynı kurallar: kökte tek yerde,
 * akış ekranının ortasını kesmiyor (ekran kapanınca patlıyor), dokununca
 * kapanıyor. "Hareketi azalt" açıkken konfeti çizilmiyor (`Celebrate`).
 */

const BUSY_ROUTES = new Set([
  "Game", "Lesson", "Quiz", "Item", "Walk", "Boss", "Weekly",
  "Exam", "MockExam", "Placement", "FirstPractice", "RoleplayExam",
]);
const SHOW_MS = 3200;
const REFRESH_DELAY_MS = 1500;
const GAIN_KEY: Record<UnlockSurface, string> = {
  conv: "unlock.gain_conv",
  write: "unlock.gain_write",
  skill_speak: "unlock.gain_skill_speak",
  skill_write: "unlock.gain_skill_write",
  mock: "unlock.gain_mock",
};

type Opened = { surface: UnlockSurface; level: string; gain: number }[];

function busyNow(): boolean {
  try {
    if (!navigationRef.isReady()) return false;
    return BUSY_ROUTES.has(navigationRef.getCurrentRoute()?.name ?? "");
  } catch {
    return false;
  }
}

export function UnlockCelebration() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const bump = useStatsBump();
  const [view, setView] = useState<Opened | null>(null);
  const held = useRef<Opened | null>(null);
  const userId = user && !user.guest ? user.id : null;

  const present = useCallback((opened: Opened) => {
    setView(opened);
    sfx("unlock");
  }, []);

  const compare = useCallback(async (s: PremiumStatus | null) => {
    if (!userId || !s?.unlock) return;
    const key = `lernomi.unlock.open.${userId}`;
    const next = openCounts(s.unlock);
    let prev: Record<string, number> | null = null;
    try {
      const raw = await AsyncStorage.getItem(key);
      prev = raw ? (JSON.parse(raw) as Record<string, number>) : null;
    } catch { /* okunamadı: ilk okuma sayılır */ }
    try { await AsyncStorage.setItem(key, JSON.stringify(next)); } catch { /* yazılamadı: sonraki okumada tekrar */ }
    const opened = newlyOpened(prev, next);
    if (!opened.length) return;
    if (busyNow()) held.current = [...(held.current ?? []), ...opened];
    else present(opened);
  }, [userId, present]);

  /* Durum her tazelendiğinde kıyasla. */
  useEffect(() => {
    if (!userId) return;
    void compare(premiumSnapshot());
    return subscribePremium((s) => void compare(s));
  }, [userId, compare]);

  /* Bir şey bitirilince (XP hareketi) durumu tazele: dilim bitirmek ve seri
     büyümek hakkı açan iki olay, ikisi de XP ile geliyor. */
  useEffect(() => {
    if (!userId || bump === 0) return;
    const id = setTimeout(() => void refreshPremium(), REFRESH_DELAY_MS);
    return () => clearTimeout(id);
  }, [userId, bump]);

  useEffect(() => {
    if (!navigationRef.isReady?.()) return;
    const off = navigationRef.addListener("state", () => {
      if (busyNow() || !held.current?.length) return;
      const pending = held.current;
      held.current = null;
      present(pending);
    });
    return off;
  }, [present]);

  useEffect(() => {
    if (!view) return;
    const id = setTimeout(() => setView(null), SHOW_MS);
    return () => clearTimeout(id);
  }, [view]);

  if (!view) return null;
  const close = () => setView(null);
  return (
    <Modal transparent visible animationType="fade" onRequestClose={close} statusBarTranslucent>
      <Pressable onPress={close} style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, backgroundColor: "rgba(0,0,0,0.55)" }}>
        <Celebrate show />
        <View
          accessibilityViewIsModal
          accessibilityRole="alert"
          accessibilityLabel={t("unlock.celebrate")}
          style={[{ width: "100%", maxWidth: 380, alignItems: "center", backgroundColor: colors.surface, borderRadius: radii.xl, borderWidth: 1, borderColor: colors.hairline, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg }, softShadow(colors.text, 18)]}
        >
          <View style={[{ width: ds(72), height: ds(72), borderRadius: ds(36), alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 10)]}>
            <SparkIcon color={colors.onPrimary} size={36} />
          </View>
          <Text variant="h2" style={{ marginTop: spacing.md, textAlign: "center" }}>{t("unlock.celebrate")}</Text>
          {view.map((o) => (
            <Text key={`${o.surface}:${o.level}`} variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: "center" }}>
              {`${o.level} · ${t(GAIN_KEY[o.surface], { n: o.gain })}`}
            </Text>
          ))}
          <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.lg }}>{t("achu.tap_to_continue")}</Text>
        </View>
      </Pressable>
    </Modal>
  );
}
