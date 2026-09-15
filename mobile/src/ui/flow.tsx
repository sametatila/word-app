import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Text";
import { Card } from "./Card";
import { PressableScale } from "./PressableScale";
import { Mascot, type Mood } from "./Mascot";
import { Celebrate } from "./Celebrate";
import { ArrowBackIcon, XIcon } from "./icons";
import { t } from "../lib/i18n";
import { useTheme, spacing, radii, softShadow, soft, type Palette } from "../theme";

/**
 * AKIŞ ŞABLONLARI — kapak, sonuç, etap kartı ve durum ekranı tek dilde.
 *
 * Otuzdan fazla ekran (tur sonu, günün turu, patron, haftalık sınav, sınav
 * sonuçları, kapaklar, hata ve boş ekranlar) aynı bilgiyi birbirinden farklı
 * çiziyordu: maskot on bir ayrı boyda, kimi sonuçta hiç yok; konfeti dört ayrı
 * eşikle; düğme sırası ekrana göre değişiyor; kurallar kimi yerde "·" ile
 * başlayan metin, kimi yerde renkli nokta. Öğrenci her ekranı ayrı okumak
 * zorundaydı.
 *
 * Beş kalıp, her parçası her yerde aynı yerde ve aynı ölçüde:
 *
 *   Kapak     — ikon karosu · başlık · tek cümle · kural satırları · Başla / Sonra
 *   Sonuç     — başlık bandı (tür · başlık · ana sayı · maskot) → en çok üç sayı →
 *               ayrıntı kartları → tek birincil düğme
 *   Etap      — sonucun küçük hâli: aynı band (etap şeridiyle), aynı sayı satırı
 *   Durum     — maskot · başlık · tek cümle · tek çıkış yolu
 *
 * Web karşılığı `components/flow/*` — alanlar ve sıra birebir.
 */

/** Maskot boyları: üç sabit ölçü (katman 40, bant 80, kapak/durum 96). */
export const MASCOT_BAND = 80;
export const MASCOT_STATE = 96;

export type FlowAction = { label: string; onPress: () => void; disabled?: boolean; busy?: boolean; icon?: React.ReactNode };

/** Düğme sırası her ekranda aynı: birincil (tek) → çerçeveli (en çok bir) → metin bağlantısı. */
export function FlowActions({ primary, secondary, tertiary }: { primary?: FlowAction | null; secondary?: FlowAction | null; tertiary?: FlowAction | null }) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      {primary ? (
        <PressableScale
          onPress={primary.onPress}
          disabled={primary.disabled || primary.busy}
          style={[
            { borderRadius: radii.lg, backgroundColor: primary.disabled ? colors.surface2 : colors.primary, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: spacing.sm },
            primary.disabled ? {} : softShadow(colors.primary, 10),
          ]}
        >
          {primary.busy ? <ActivityIndicator color={colors.onPrimary} /> : primary.icon}
          <Text variant="h3" color={primary.disabled ? colors.textFaint : colors.onPrimary}>{primary.label}</Text>
        </PressableScale>
      ) : null}
      {secondary ? (
        <PressableScale
          onPress={secondary.onPress}
          disabled={secondary.disabled}
          style={{ borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 14, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: spacing.sm, opacity: secondary.disabled ? 0.5 : 1 }}
        >
          {secondary.icon}
          <Text variant="bodyStrong" color={colors.text}>{secondary.label}</Text>
        </PressableScale>
      ) : null}
      {tertiary ? (
        <PressableScale onPress={tertiary.onPress} disabled={tertiary.disabled} hitSlop={6} style={{ alignItems: "center", paddingVertical: spacing.sm }}>
          <Text variant="bodyStrong" color={colors.textMuted}>{tertiary.label}</Text>
        </PressableScale>
      ) : null}
    </View>
  );
}

/** Üst çubuk: kapat (X) ya da geri; sağda isteğe bağlı küçük içerik. */
export function FlowTopBar({ onClose, back = false, title, right }: { onClose?: () => void; back?: boolean; title?: string; right?: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, minHeight: 44 }}>
      {onClose ? (
        <PressableScale
          hitSlop={4}
          onPress={onClose}
          accessibilityLabel={t(back ? "common.back" : "common.close")}
          style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}
        >
          {back ? <ArrowBackIcon color={colors.text} size={24} /> : <XIcon color={colors.textMuted} size={22} />}
        </PressableScale>
      ) : null}
      <View style={{ flex: 1 }}>{title ? <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{title}</Text> : null}</View>
      {right}
    </View>
  );
}

/**
 * Ekran iskeleti: üst çubuk, kayan içerik, altta sabit düğmeler.
 *
 * Düğmeler kaydırılan içeriğin DIŞINDA: uzun bir sonuç ekranında "Devam" en
 * altta kaybolmuyor, başparmağın yerinde duruyor.
 */
export function FlowScreen({ top, children, actions, celebrate = false, center = false }: { top?: React.ReactNode; children: React.ReactNode; actions?: React.ReactNode; celebrate?: boolean; center?: boolean }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm }}>
      <Celebrate show={celebrate} />
      {top ? <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>{top}</View> : null}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: center ? "center" : "flex-start", paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, gap: spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {actions ? <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.md }}>{actions}</View> : null}
    </View>
  );
}

export type PillTone = "brand" | "ok" | "bad";

/**
 * Sonuç bandı — ne bitti, ana sayı, maskot.
 *
 * `quiet`: olumsuz sonuç (geçilmedi, süre bitti). Band marka renginden nötr
 * yüzeye iniyor, sonuç etiketi kırmızı; yerleşim aynı kalıyor ki öğrenci
 * aynı yerde aynı bilgiyi arasın.
 *
 * `segments`: etap kartında hangi etapta olunduğu (bandın dibinde şerit).
 */
export function ResultHero({ eyebrow, title, figure, sub, mood, pill, quiet = false, segments, live = true }: {
  eyebrow: string;
  title: string;
  figure?: string | null;
  sub?: string | null;
  mood?: Mood | null;
  pill?: { text: string; tone?: PillTone } | null;
  quiet?: boolean;
  segments?: { done: number; total: number } | null;
  live?: boolean;
}) {
  const { colors } = useTheme();
  const ink = quiet ? colors.text : colors.onPrimary;
  const muted = quiet ? colors.textMuted : colors.onPrimaryMuted;
  const pillBg = !pill ? undefined : quiet ? (pill.tone === "ok" ? colors.successSoft : pill.tone === "bad" ? colors.dangerSoft : colors.primarySoft) : "#ffffff33";
  const pillInk = !pill ? undefined : quiet ? (pill.tone === "ok" ? colors.successText : pill.tone === "bad" ? colors.dangerText : colors.primaryText) : colors.onPrimary;
  return (
    <View
      accessibilityLiveRegion={live ? "polite" : undefined}
      style={[
        { borderRadius: radii.xl, padding: spacing.lg, backgroundColor: quiet ? colors.surface : colors.primary, borderWidth: quiet ? 1 : 0, borderColor: colors.hairline, overflow: "hidden" },
        quiet ? {} : softShadow(colors.primary, 14),
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.md }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text variant="micro" color={muted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{eyebrow}</Text>
          <Text accessibilityRole="header" variant="h2" color={ink}>{title}</Text>
          {figure ? <Text variant="display" color={ink} style={{ fontSize: 40, lineHeight: 46, marginTop: spacing.xs, fontVariant: ["tabular-nums"] }}>{figure}</Text> : null}
          {sub ? <Text variant="body" color={muted}>{sub}</Text> : null}
          {pill ? (
            <View style={{ alignSelf: "flex-start", marginTop: spacing.sm, backgroundColor: pillBg, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 3 }}>
              <Text variant="micro" color={pillInk} style={{ fontWeight: "800" }}>{pill.text}</Text>
            </View>
          ) : null}
        </View>
        {mood ? <Mascot mood={mood} size={MASCOT_BAND} pinned /> : null}
      </View>
      {segments && segments.total > 1 ? (
        <View style={{ flexDirection: "row", gap: 4, marginTop: spacing.md }}>
          {Array.from({ length: segments.total }).map((_, i) => (
            <View key={i} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: i < segments.done ? ink : quiet ? colors.surface2 : "#ffffff59" }} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

/** En çok üç sayı — aynı bileşen her sonuçta. */
export function StatRow({ items }: { items: { value: string; label: string; tone?: "ok" | "bad" | "streak" | null }[] }) {
  const { colors } = useTheme();
  const shown = items.slice(0, 3);
  return (
    <View style={{ flexDirection: "row", backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline }}>
      {shown.map((it, i) => (
        <View key={i} style={{ flex: 1, paddingVertical: spacing.md, paddingHorizontal: spacing.xs, alignItems: "center", borderLeftWidth: i ? 1 : 0, borderLeftColor: colors.hairline }}>
          <Text
            variant="h2"
            color={it.tone === "ok" ? colors.successText : it.tone === "bad" ? colors.dangerText : it.tone === "streak" ? colors.streakText : colors.text}
            style={{ fontVariant: ["tabular-nums"] }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {it.value}
          </Text>
          <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 0.6, textAlign: "center" }} numberOfLines={2}>{it.label}</Text>
        </View>
      ))}
    </View>
  );
}

/** Ayrıntı kartı — başlık + içerik (zorlandıkların, sıralama, bölümler…). */
export function DetailCard({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Card padded style={{ gap: spacing.sm }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        <Text variant="micro" color={colors.textMuted} style={{ flex: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>{title}</Text>
        {right}
      </View>
      {children}
    </Card>
  );
}

/** Ayrıntı kartında satır: solda hedef dildeki kelime, sağda anlamı. */
export function DetailRow({ left, right, faded = false }: { left: string; right?: string | null; faded?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: spacing.md, opacity: faded ? 0.55 : 1 }}>
      <Text variant="bodyStrong" style={{ flexShrink: 1 }}>{left}</Text>
      {right ? <Text variant="caption" color={colors.textMuted} style={{ flexShrink: 1, textAlign: "right" }}>{right}</Text> : null}
    </View>
  );
}

/** Bandın altında tek satırlık bilgi (seri kurtarıldı, kayıt kuyruğa alındı…). */
export function FlowNote({ icon, text, tone = "neutral" }: { icon?: React.ReactNode; text: string; tone?: "neutral" | "ok" | "warn" | "bad" }) {
  const { colors } = useTheme();
  const bg = tone === "ok" ? colors.successSoft : tone === "warn" ? soft(colors.streak) : tone === "bad" ? colors.dangerSoft : colors.surface2;
  const ink = tone === "ok" ? colors.successText : tone === "warn" ? colors.streakText : tone === "bad" ? colors.dangerText : colors.text;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: bg, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
      {icon}
      <Text variant="caption" color={ink} style={{ flex: 1 }}>{text}</Text>
    </View>
  );
}

export type CoverRule = { icon: (p: { color: string; size: number }) => React.ReactElement; text: string; tone?: "ok" | "bad" | null };

/**
 * Kapak gövdesi — başlamadan önce: ne, ne kadar, hangi kuralla.
 * Kurallar ikonlu tek satırlar; düğmeler `FlowScreen`in dibinde.
 */
export function CoverBody({ icon: Icon, tint, eyebrow, title, pitch, rules = [], note, children }: {
  icon: (p: { color: string; size: number }) => React.ReactElement;
  tint: string;
  eyebrow: string;
  title: string;
  pitch?: string | null;
  rules?: CoverRule[];
  note?: string | null;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: spacing.md }}>
      <View style={[{ width: 56, height: 56, borderRadius: radii.lg, backgroundColor: tint, alignItems: "center", justifyContent: "center" }, softShadow(tint, 8)]}>
        <Icon color="#fff" size={28} />
      </View>
      <View style={{ gap: spacing.xs }}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{eyebrow}</Text>
        <Text accessibilityRole="header" variant="h1">{title}</Text>
        {pitch ? <Text variant="body" color={colors.textMuted}>{pitch}</Text> : null}
      </View>
      {rules.length ? (
        <Card padded style={{ gap: spacing.md }}>
          {rules.map((r, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
              <View style={{ width: 28, height: 28, borderRadius: radii.sm, backgroundColor: r.tone === "ok" ? colors.successSoft : r.tone === "bad" ? colors.dangerSoft : colors.surface2, alignItems: "center", justifyContent: "center" }}>
                <r.icon color={r.tone === "ok" ? colors.successText : r.tone === "bad" ? colors.dangerText : colors.textMuted} size={16} />
              </View>
              <Text variant="body" style={{ flex: 1, paddingTop: 3 }}>{r.text}</Text>
            </View>
          ))}
        </Card>
      ) : null}
      {note ? <Text variant="caption" color={colors.textMuted}>{note}</Text> : null}
      {children}
    </View>
  );
}

/**
 * Durum gövdesi — boş, bitti, açılamadı, giriş gerekli.
 * Maskot durumu söylüyor; tek cümle; tek çıkış yolu `FlowScreen` dibinde.
 */
export function StateBody({ mood, title, body, icon, children }: { mood?: Mood | null; title: string; body?: string | null; icon?: React.ReactNode; children?: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View accessibilityLiveRegion="polite" style={{ alignItems: "center", gap: spacing.md, paddingVertical: spacing.xl }}>
      {mood ? <Mascot mood={mood} size={MASCOT_STATE} /> : icon}
      <Text accessibilityRole="header" variant="h2" style={{ textAlign: "center" }}>{title}</Text>
      {body ? <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", maxWidth: 340 }}>{body}</Text> : null}
      {children}
    </View>
  );
}

/** Rengi paletten okunan kural ikonu için yardımcı. */
export function toneOf(colors: Palette, tone: "ok" | "bad" | null | undefined): string {
  return tone === "ok" ? colors.successText : tone === "bad" ? colors.dangerText : colors.textMuted;
}
