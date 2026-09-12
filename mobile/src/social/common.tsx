import React from "react";
import { t as tx, dateLocale } from "../lib/i18n";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, HeartIcon, StarIcon, PartyIcon, SparkIcon, FlameIcon, BoltIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow, onTint, soft as softOf } from "../theme";
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
      <PressableScale hitSlop={4} onPress={() => (nav.canGoBack() ? nav.goBack() : nav.navigate("Tabs"))} accessibilityLabel={tx("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <ArrowBackIcon color={colors.text} size={24} />
      </PressableScale>
      <View style={{ flex: 1 }}>
        {/* BAŞLIK BAŞLIK OLARAK OKUNUYOR (bkz. parity 259). */}
        <Text accessibilityRole="header" variant="h2">{title}</Text>
        {subtitle ? <Text variant="caption" color={colors.textMuted}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

/**
 * Sekme ekranının başlığı — geri düğmesi YOK.
 *
 * `ScreenHeader` bir yığın ekranı içindir ve solunda geri düğmesi taşır.
 * Arkadaşlar artık bir sekme: geri gidilecek yer yok, altta sekme çubuğu var.
 * Yükseklik ikisinde de aynı ki sekmeler arası geçişte başlık zıplamasın.
 */
export function TabHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm, minHeight: 44 + spacing.sm * 2 }}>
      <View style={{ flex: 1 }}>
        <Text accessibilityRole="header" variant="h2">{title}</Text>
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
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: spacing.sm, marginLeft: spacing.xs, marginTop: spacing.lg }}>
      {/* Bölüm başlığı da bir başlık: web karşılığı `<h2>`. */}
      {/* BÜYÜK HARFLİ ETİKETİN ARALIĞI TEK SAYI. Uygulamadaki on sekiz üst
          etiket `letterSpacing: 1` diyor; bu bölüm başlığı 0.5'te kalmıştı ve
          aynı dilin iki farklı tonu gibi duruyordu. Web karşılığı
          `--tracking-eyebrow` (bkz. parity 268). */}
      <Text accessibilityRole="header" variant="caption" color={colors.textMuted} style={{ letterSpacing: 1 }}>{title.toLocaleUpperCase(dateLocale())}</Text>
      {right ? <Text variant="caption" color={colors.textMuted}>{right}</Text> : null}
    </View>
  );
}

/** Renkli ikon karosu — solid (beyaz ikon + gölge) ya da yumuşak (tint+22). */
export function IconTile({ icon: Icon, tint, size = 42, solid = false, iconSize }: { icon: IconCmp; tint: string; size?: number; solid?: boolean; iconSize?: number }) {
  const { colors } = useTheme();
  return (
    <View style={[{ width: size, height: size, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: solid ? tint : softOf(tint) }, solid ? softShadow(tint, 6) : {}]}>
      {/* Dolu karonun ikonu `onFill`: sabit beyaz koyu temada okunmuyordu
          (1.76-2.76, grafik eşiği 3.0). Bkz. `theme/colors.ts`. */}
      <Icon color={solid ? colors.onFill : onTint(tint, colors)} size={iconSize ?? Math.round(size * 0.5)} />
    </View>
  );
}

/** Pill rozet: seri / XP / ortak seri gibi küçük sayılar (Profil'deki gibi). */
export function StatPill({ icon: Icon, label, tint, soft }: { icon?: IconCmp; label: string; tint: string; soft?: string }) {
  const { colors } = useTheme();
  /* Yazı ve ikon dolgu renginin METİN varyantında: kendi tinti üstünde dolgu
     rengi açık temada 2.42-3.58 veriyor (bkz. `theme/colors.ts` `onTint`). */
  const ink = onTint(tint, colors);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: soft ?? softOf(tint), borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 }}>
      {Icon ? <Icon color={ink} size={14} /> : null}
      <Text variant="caption" color={ink}>{label}</Text>
    </View>
  );
}

/** Düğme: primary (dolu, gölgeli) · soft (primarySoft) · ghost (surface2) · danger (dangerSoft). Hep pill. */
export function Pill({ label, onPress, tone = "primary", disabled, icon: Icon, block, small }: { label: string; onPress: () => void; tone?: "primary" | "soft" | "ghost" | "danger"; disabled?: boolean; icon?: IconCmp; block?: boolean; small?: boolean }) {
  const { colors } = useTheme();
  const bg = tone === "primary" ? colors.primary : tone === "soft" ? colors.primarySoft : tone === "danger" ? colors.dangerSoft : colors.surface2;
  const fg = tone === "primary" ? colors.onPrimary : tone === "soft" ? colors.primary : tone === "danger" ? colors.danger : colors.text;
  return (
    <PressableScale onPress={onPress} disabled={disabled} accessibilityLabel={label} style={[{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: bg, borderRadius: radii.pill, paddingHorizontal: small ? 14 : 20, paddingVertical: small ? 8 : 11, alignSelf: block ? "stretch" : "auto" }, tone === "primary" && !disabled ? softShadow(colors.primary, 6) : {}]}>
      {Icon ? <Icon color={fg} size={small ? 14 : 18} /> : null}
      <Text variant={small ? "caption" : "bodyStrong"} color={fg}>{label}</Text>
    </PressableScale>
  );
}

/* Seçim çipi `ui/Chip.tsx`e taşındı (dört kopyası vardı); buradan yeniden
   dışa veriliyor ki sosyal ekranların mevcut import'ları kırılmasın. */
export { Chip } from "../ui/Chip";

/**
 * Boş durum: ikon karosu + başlık + açıklama + isteğe bağlı düğme (Öğren'deki
 * ActionRow gibi).
 *
 * `live` HATA HÂLLERİ İÇİN. Bu kart yalnız "liste boş" demekle kalmıyor,
 * arkadaş tablosu ve lig tablosu yüklenemediğinde de aynı kart çiziliyor —
 * o durumda ekran okuyucu kullanan biri hiçbir şey duymuyordu. Boş hâlde
 * duyuru İSTENMİYOR: "henüz arkadaşın yok" bir hata değil, sayfanın normal
 * içeriği; okuyucu sırası gelince okur.
 */
export function EmptyCard({ icon, tint, title, text, action, onAction, live }: { icon: IconCmp; tint?: string; title: string; text: string; action?: string; onAction?: () => void; live?: "polite" | "assertive" }) {
  const { colors } = useTheme();
  const t = tint ?? colors.primary;
  return (
    <Card padded accessibilityLiveRegion={live} style={{ alignItems: "center", gap: spacing.sm }}>
      <IconTile icon={icon} tint={t} size={52} solid />
      <Text variant="h3" style={{ textAlign: "center", marginTop: spacing.xs }}>{title}</Text>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{text}</Text>
      {action && onAction ? <View style={{ marginTop: spacing.sm }}><Pill label={action} onPress={onAction} /></View> : null}
    </Card>
  );
}

/**
 * SOSYAL EYLEMIN HATASI — DUYURULUYOR.
 *
 * Bu satir yalniz gorsel bir isaretti: istek kabul etmek, durtmek, tepki
 * vermek ya da ortak gorev kurmak basarisiz oldugunda sesli okuyucu kullanan
 * biri hicbir sey duymuyordu. Web tarafi da sessizdi (on bir yerde elle
 * yazilmis kirmizi metin, `role` yok), yani IKI TARAF DA YANLISTI ve
 * karsilastirmali bir kapi bunu goremezdi.
 *
 * `polite` seciliyor: uygulamanin kendi kalibi (`ActiveSessions`,
 * `ChangePassword`, `ResetPasswordScreen`). Web karsiligi `role="alert"`.
 */
export function ErrorText({ text }: { text: string | null }) {
  const { colors } = useTheme();
  if (!text) return null;
  return <Text accessibilityLiveRegion="polite" variant="caption" color={colors.dangerText} style={{ marginTop: spacing.sm, textAlign: "center" }}>{text}</Text>;
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
