import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, HeartIcon, StarIcon, PartyIcon, SparkIcon, FlameIcon, BoltIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow } from "../theme";
import type { Palette } from "../theme/colors";
import type { ReactionKind } from "../api/social";

/**
 * Sosyal ekranların mobil tasarım sözlüğü — Profil/Ayarlar/Başarımlar ile aynı:
 * kart (radius xl, hairline, yumuşak gölge), tint+"22" ikon karosu, pill rozet,
 * kenarlıklı Chip, caption büyük-harf bölüm başlığı. Web'in çizgili listeleri YOK.
 */
export type IconCmp = (p: { color: string; size: number }) => React.ReactElement;

export function ScreenHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
      <PressableScale hitSlop={4} onPress={() => (nav.canGoBack() ? nav.goBack() : nav.navigate("Tabs"))} accessibilityLabel="Geri" style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <ArrowBackIcon color={colors.text} size={24} />
      </PressableScale>
      <View style={{ flex: 1 }}>
        <Text variant="h2">{title}</Text>
        {subtitle ? <Text variant="caption" color={colors.textMuted}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

/** Başlık sağındaki kare düğme (Profil'deki dişli gibi). */
export function HeaderButton({ icon: Icon, onPress, label }: { icon: IconCmp; onPress: () => void; label: string }) {
  const { colors } = useTheme();
  return (
    <PressableScale hitSlop={4} onPress={onPress} accessibilityLabel={label} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
      <Icon color={colors.text} size={22} />
    </PressableScale>
  );
}

/** Bölüm başlığı: caption, büyük harf, hafif aralık (Ayarlar/Başarımlar ile aynı). */
export function SectionTitle({ title, right }: { title: string; right?: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: spacing.sm, marginLeft: 4, marginTop: spacing.lg }}>
      <Text variant="caption" color={colors.textMuted} style={{ letterSpacing: 0.5 }}>{title.toLocaleUpperCase("tr-TR")}</Text>
      {right ? <Text variant="caption" color={colors.textMuted}>{right}</Text> : null}
    </View>
  );
}

/** Renkli ikon karosu — solid (beyaz ikon + gölge) ya da yumuşak (tint+22). */
export function IconTile({ icon: Icon, tint, size = 42, solid = false, iconSize }: { icon: IconCmp; tint: string; size?: number; solid?: boolean; iconSize?: number }) {
  return (
    <View style={[{ width: size, height: size, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: solid ? tint : tint + "22" }, solid ? softShadow(tint, 6) : {}]}>
      <Icon color={solid ? "#fff" : tint} size={iconSize ?? Math.round(size * 0.5)} />
    </View>
  );
}

/** Pill rozet: seri / XP / ortak seri gibi küçük sayılar (Profil'deki gibi). */
export function StatPill({ icon: Icon, label, tint, soft }: { icon?: IconCmp; label: string; tint: string; soft?: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: soft ?? tint + "22", borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 }}>
      {Icon ? <Icon color={tint} size={14} /> : null}
      <Text variant="caption" color={tint}>{label}</Text>
    </View>
  );
}

/** Düğme: primary (dolu, gölgeli) · soft (primarySoft) · ghost (surface2) · danger (dangerSoft). Hep pill. */
export function Pill({ label, onPress, tone = "primary", disabled, icon: Icon, block, small }: { label: string; onPress: () => void; tone?: "primary" | "soft" | "ghost" | "danger"; disabled?: boolean; icon?: IconCmp; block?: boolean; small?: boolean }) {
  const { colors } = useTheme();
  const bg = tone === "primary" ? colors.primary : tone === "soft" ? colors.primarySoft : tone === "danger" ? colors.dangerSoft : colors.surface2;
  const fg = tone === "primary" ? colors.onPrimary : tone === "soft" ? colors.primary : tone === "danger" ? colors.danger : colors.text;
  return (
    <PressableScale onPress={onPress} disabled={disabled} accessibilityLabel={label} style={[{ opacity: disabled ? 0.5 : 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: bg, borderRadius: radii.pill, paddingHorizontal: small ? 14 : 20, paddingVertical: small ? 8 : 11, alignSelf: block ? "stretch" : "auto" }, tone === "primary" && !disabled ? softShadow(colors.primary, 6) : {}]}>
      {Icon ? <Icon color={fg} size={small ? 14 : 18} /> : null}
      <Text variant={small ? "caption" : "bodyStrong"} color={fg}>{label}</Text>
    </PressableScale>
  );
}

/** Kenarlıklı seçim çipi — Ayarlar'daki Chip ile aynı (pill DEĞİL, radius md, 1.5 kenar). */
export function Chip({ label, active, onPress, badge }: { label: string; active: boolean; onPress: () => void; badge?: number }) {
  const { colors } = useTheme();
  return (
    <PressableScale onPress={onPress} accessibilityState={{ selected: active }} style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 9, borderRadius: radii.md, borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface }}>
      <Text variant="bodyStrong" color={active ? colors.primary : colors.textMuted}>{label}</Text>
      {badge ? (
        <View style={{ minWidth: 18, height: 18, borderRadius: 9, backgroundColor: colors.streak, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 }}>
          <Text variant="micro" color="#fff" style={{ fontSize: 10, lineHeight: 12 }}>{badge}</Text>
        </View>
      ) : null}
    </PressableScale>
  );
}

/** Boş durum: ikon karosu + başlık + açıklama + isteğe bağlı düğme (Öğren'deki ActionRow gibi). */
export function EmptyCard({ icon, tint, title, text, action, onAction }: { icon: IconCmp; tint?: string; title: string; text: string; action?: string; onAction?: () => void }) {
  const { colors } = useTheme();
  const t = tint ?? colors.primary;
  return (
    <Card padded style={{ alignItems: "center", gap: spacing.sm }}>
      <IconTile icon={icon} tint={t} size={52} solid />
      <Text variant="h3" style={{ textAlign: "center", marginTop: spacing.xs }}>{title}</Text>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 18 }}>{text}</Text>
      {action && onAction ? <View style={{ marginTop: spacing.sm }}><Pill label={action} onPress={onAction} /></View> : null}
    </Card>
  );
}

export function ErrorText({ text }: { text: string | null }) {
  const { colors } = useTheme();
  if (!text) return null;
  return <Text variant="caption" color={colors.danger} style={{ marginTop: spacing.sm, textAlign: "center" }}>{text}</Text>;
}

export function reactionTone(kind: ReactionKind, colors: Palette): string {
  switch (kind) {
    case "fire": return colors.streak;
    case "heart": return colors.danger;
    case "strong": return colors.accent;
    case "wow": return colors.info;
    case "star": return colors.streak;
    default: return colors.primary;
  }
}

export function ReactionGlyph({ kind, size = 16, colors, color }: { kind: ReactionKind; size?: number; colors: Palette; color?: string }) {
  const c = color ?? reactionTone(kind, colors);
  switch (kind) {
    case "cheer": return <PartyIcon color={c} size={size} />;
    case "fire": return <FlameIcon color={c} size={size} />;
    case "heart": return <HeartIcon color={c} size={size} />;
    case "strong": return <BoltIcon color={c} size={size} />;
    case "star": return <StarIcon color={c} size={size} />;
    default: return <SparkIcon color={c} size={size} />;
  }
}

/** Tek satır ilerleme çubuğu (Günün görevleri ile aynı ölçü). */
export function Bar({ pct, tint, height = 6 }: { pct: number; tint: string; height?: number }) {
  const { colors } = useTheme();
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: colors.surface2, overflow: "hidden" }}>
      <View style={{ height: "100%", width: `${Math.max(3, Math.min(100, pct))}%`, backgroundColor: tint, borderRadius: height / 2 }} />
    </View>
  );
}
