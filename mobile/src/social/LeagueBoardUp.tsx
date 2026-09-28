import React, { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "../lib/i18n";
import { sfx } from "../lib/sfx";
import { vibrate } from "../lib/haptics";
import { reduceMotion } from "../lib/reduceMotion";
import { LEAGUE_TIERS, tierName } from "../api/social";
import { Text } from "../ui/Text";
import { Celebrate } from "../ui/Celebrate";
import { TrophyIcon } from "../ui/icons";
import { DIALOG_MAX_WIDTH } from "../lib/useLayout";
import { useTheme, spacing, radii, softShadow, TIER_COLOR, fillOf, ds, motion } from "../theme";

/** Kutlamanın ekranda kaldığı süre — rozet açılışıyla aynı (`ui/AchievementUnlock` SOLO_MS; web `league-up` LEAGUE_UP_MS). */
const LEAGUE_UP_MS = 2600;

/**
 * Lig rozetinin rengi — başarım kademelerinin sabit dolguları (beyaz ikon,
 * temayla dönmüyor). Safir turkuazın dolgu tonu (`fillOf("info")`, web
 * `--color-sky-500`), elmas efsane moru. Web `social/league-up` aynı beş değer.
 */
const LEAGUE_COLOR: Record<(typeof LEAGUE_TIERS)[number], string> = {
  bronze: TIER_COLOR.bronze,
  silver: TIER_COLOR.silver,
  gold: TIER_COLOR.gold,
  sapphire: fillOf("info"),
  diamond: TIER_COLOR.legend,
};

/**
 * Bu lig için kutlama gerekiyor mu — ve cihazdaki "son görülen lig"i günceller
 * (kullanıcı başına). Web `league-up` `leagueUpFor` ile aynı kural: ilk okumada
 * (kayıt yok) yalnız sunucu "yükseldin" diyorsa kutlanıyor, yoksa her yeni
 * cihazda bronzdan yukarıdaki herkes bir kez kutlama görürdü. Lig düşerse
 * kayıt da düşüyor: yeniden çıkınca yine kutlanır.
 */
export async function leagueUpFor(userId: string | null | undefined, tier: number, promoted: boolean): Promise<boolean> {
  const key = `lernomi.league.seen.${userId ?? "anon"}`;
  let prev: number | null = null;
  try {
    const raw = await AsyncStorage.getItem(key);
    prev = raw === null ? null : Number(raw);
    if (prev !== null && !Number.isFinite(prev)) prev = null;
  } catch { /* okunamadı: ilk okuma sayılır */ }
  try { await AsyncStorage.setItem(key, String(tier)); } catch { /* yazılamadı: sonraki girişte yine sorulur */ }
  return prev === null ? promoted : tier > prev;
}

/**
 * LİG ATLAMA KUTLAMASI — rozet açılış kartının dilinde (`ui/AchievementUnlock`):
 * yeni ligin rozeti yaylanarak geliyor, "unlock" sesi, başarı titreşimi,
 * konfeti. Dokununca ya da geri tuşuyla kapanıyor, yoksa `LEAGUE_UP_MS` sonra
 * kendiliğinden. "Hareketi azalt"ta konfeti ve yay yok, bilgi aynı.
 *
 * Ses ve titreşim ayrı çağrı: `haptic()` kendi adının sesini de çalıyor,
 * burada ses "unlock" olmalı (web `league-up` aynı ayrımı yapıyor).
 */
export function LeagueUp({ tier, rank, onDone }: { tier: number; rank?: string | null; onDone: () => void }) {
  const { colors } = useTheme();
  const still = reduceMotion();
  const card = useRef(new Animated.Value(still ? 1 : 0)).current;
  const badge = useRef(new Animated.Value(still ? 1 : 0.3)).current;
  const done = useRef(onDone);
  useEffect(() => { done.current = onDone; });
  const color = LEAGUE_COLOR[LEAGUE_TIERS[Math.max(0, Math.min(LEAGUE_TIERS.length - 1, tier))]];

  useEffect(() => {
    sfx("unlock");
    /* Yalnız titreşim (başarı deseni), titreşim ayarına bağlı; `trigger`
       doğrudan çağrılıyordu ve "Titreşim" kapalıyken de titriyordu. */
    vibrate("streak");
    if (!still) {
      /* Kart kutlama yayıyla (`motion.celebrate`; web `league-up` kartı aynı
         değer). Rozet bilerek daha yaylı ve kartın ardından geliyor: web
         `league-up` rozeti stiffness 260 damping 10, 120 ms gecikme -
         koreografi değeri, jeton değil. */
      Animated.spring(card, { toValue: 1, ...motion.celebrate, mass: 1, useNativeDriver: true }).start();
      Animated.sequence([
        Animated.delay(120),
        Animated.spring(badge, { toValue: 1, stiffness: 260, damping: 10, mass: 1, useNativeDriver: true }),
      ]).start();
    }
    const end = setTimeout(() => done.current(), LEAGUE_UP_MS);
    return () => clearTimeout(end);
    // Yalnız açılışta bir kez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = t("league.result_promoted", { league: tierName(tier) });
  return (
    <Modal transparent visible animationType="fade" onRequestClose={() => done.current()} statusBarTranslucent>
      <Pressable onPress={() => done.current()} style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, backgroundColor: "rgba(0,0,0,0.55)" }}>
        <Celebrate show />
        <Animated.View
          accessibilityViewIsModal
          accessibilityRole="alert"
          accessibilityLabel={title}
          style={[
            {
              width: "100%", maxWidth: DIALOG_MAX_WIDTH, alignItems: "center", backgroundColor: colors.surface, borderRadius: radii.xl, borderWidth: 1, borderColor: colors.hairline, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg,
              opacity: card,
              transform: [
                { scale: card.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) },
                { translateY: card.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
                { rotate: card.interpolate({ inputRange: [0, 1], outputRange: ["-4deg", "0deg"] }) },
              ],
            },
            softShadow(color, 18),
          ]}
        >
          <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{t("league.up_eyebrow")}</Text>
          <View style={{ marginTop: spacing.lg, marginBottom: spacing.md }}>
            <Animated.View style={[{ width: ds(92), height: ds(92), borderRadius: ds(46), alignItems: "center", justifyContent: "center", backgroundColor: color, transform: [{ scale: badge }] }, softShadow(color, 8)]}>
              <TrophyIcon color="#fff" size={ds(46)} />
            </Animated.View>
          </View>
          <Text variant="h2" style={{ textAlign: "center" }}>{title}</Text>
          {rank ? <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: "center" }}>{rank}</Text> : null}
          <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.lg }}>{t("achu.tap_to_continue")}</Text>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
