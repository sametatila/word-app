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
import { ChatIcon, WriteIcon } from "./icons";
import { useTheme, spacing } from "../theme";

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
  const { status } = usePremiumStatus();
  const declined = useAiDeclined(!guest);
  const lv = status?.unlock?.levels[level];
  if (guest || !lv) return null;
  const conv = tieredCopy(lv.conversation, "conv");
  const write = tieredCopy(lv.pathWriting, "write");
  if (!conv && !write) return null;
  return (
    <View style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
      {conv && !(conv.spent && !declined) ? (
        <FlowNote icon={<ChatIcon color={colors.textMuted} size={16} />} text={t(conv.headline.key, conv.headline.params)} />
      ) : null}
      {write ? <FlowNote icon={<WriteIcon color={colors.textMuted} size={16} />} text={t(write.headline.key, write.headline.params)} /> : null}
      {conv && conv.spent && !declined ? <UnlockProgress copy={conv} onPremium={() => nav.navigate("Paywall")} /> : null}
    </View>
  );
}
