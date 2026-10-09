import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t } from "../lib/i18n";
import { usePremiumStatus } from "../lib/premium";
import { useAuth } from "../lib/AuthContext";
import { useAiDeclined } from "../lib/useAiDeclined";
import { tieredCopy } from "../lib/unlock";
import { FlowNote } from "./flow";
import { UnlockProgress } from "./UnlockProgress";
import { ConversationIcon, SkillWritingIcon } from "./icons";
import { Skeleton, textHeight } from "./Skeleton";
import { useTheme, spacing, radii } from "../theme";

/**
 * Patika'da seviyenin yapay zekâ hakları — Konuşma ve Yazma AYRI sayaç.
 *
 * Kalan hak her zaman görünür (kullanıcı kilide çarpmadan önce bilmeli);
 * Konuşma hakkı bittiyse bir sonrakinin nasıl açılacağı (`UnlockProgress`).
 * Premium'da, misafirde ya da durum okunamazken hiçbir şey çizilmiyor —
 * misafir ve izni reddeden kullanıcı senaryolu konuşmayı kullanıyor, hakları
 * yok ama kilitleri de yok.
 */
export function PathQuota({ level }: { level: string }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const guest = !user || Boolean(user.guest);
  const { status, loading } = usePremiumStatus();
  const declined = useAiDeclined(!guest);
  const lv = status?.unlock?.levels[level];
  /*
   * DURUM YOLDAYKEN YERİ TUTULUYOR. Notlar Premium durumu gelince araya girip
   * öne çıkan üniteyi ve modül listesini aşağı itiyordu (QA F-0070 sınıfı).
   * Durum artık oturum açılınca önceden çekiliyor (`App`); hâlâ yoldaysa
   * ücretsiz hesabın iki notu (Konuşma + Yazma) boyunda iskelet duruyor.
   */
  if (!guest && !status && loading) {
    const h = textHeight("caption") + spacing.sm * 2;
    return (
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
        <Skeleton height={h} radius={radii.md} />
        <Skeleton height={h} radius={radii.md} />
      </View>
    );
  }
  if (guest || !lv) return null;
  const conv = tieredCopy(lv.conversation, "conv");
  const write = tieredCopy(lv.pathWriting, "write");
  if (!conv && !write) return null;
  return (
    <View style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
      {conv && !(conv.spent && !declined) ? (
        <FlowNote icon={<ConversationIcon color={colors.textMuted} size={16} />} text={t(conv.headline.key, conv.headline.params)} />
      ) : null}
      {write ? <FlowNote icon={<SkillWritingIcon color={colors.textMuted} size={16} />} text={t(write.headline.key, write.headline.params)} /> : null}
      {conv && conv.spent && !declined ? <UnlockProgress copy={conv} onPremium={() => nav.navigate("Paywall")} /> : null}
    </View>
  );
}
