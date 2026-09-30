import React from "react";
import { ScrollView, View, type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Text";
import { Card } from "./Card";
import { PressableScale } from "./PressableScale";
import { PrimaryButton } from "./PrimaryButton";
import { SkeletonCard, SkeletonLine, SkeletonPill } from "./Skeleton";
import { Celebrate } from "./Celebrate";
import { ProgressTrack } from "./Bar";
import { BackIcon, CloseIcon } from "./icons";
import { t } from "../lib/i18n";
import { useTheme, spacing, radii, softShadow, soft, onSolid, type Palette, ds } from "../theme";
import { READABLE_TEXT_MAX } from "../lib/useLayout";
import { IconLine, lineInset } from "./IconLine";

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
 *   Kapak     — ikon karosu · başlık · tek cümle · kural satırları · Başla / Kapat (üstte X yok)
 *   Sonuç     — başlık bandı (tür · başlık · ana sayı · maskot) → en çok üç sayı →
 *               ayrıntı kartları → tek birincil düğme
 *   Etap      — sonucun küçük hâli: aynı band (etap şeridiyle), aynı sayı satırı
 *   Durum     — (isteğe bağlı ikon) · başlık · tek cümle · tek çıkış yolu
 *
 * Web karşılığı `src/components/flow.tsx` — alanlar ve sıra birebir.
 */

/** `hint`: düğmenin altında ikinci, küçük satır (ör. "Kendini puanla" · "yardım yok, 5 tur"). */
/** `tone: "destructive"` yalnız birincilde: geri alınamayan eylem (hesap silme). */
export type FlowAction = { label: string; onPress: () => void; disabled?: boolean; busy?: boolean; icon?: React.ReactNode; hint?: string; tone?: "primary" | "destructive"; a11yLabel?: string; a11yHint?: string };

/**
 * Düğme sırası her ekranda aynı: birincil (tek) → çerçeveli (en çok bir) → metin bağlantısı.
 *
 * `close`: bilgi, kapak, izin ve durum ekranlarının çıkışı — metin bağlantısı
 * yuvasında, adı hep "Kapat" (2026-09-30 Samet). Ekranlar "Vazgeç", "Sonra",
 * "Geri dön", "Patikaya dön" diye ayrı adlar veriyordu; kimi üstte X de
 * taşıyordu. Bu ekranlarda üstte X YOK (`FlowTopBar` verilmez), çıkış burada;
 * donanım geri tuşu ve kaydırarak geri dönme yığının kendi işi.
 */
export function FlowActions({ primary, secondary, tertiary, close }: { primary?: FlowAction | null; secondary?: FlowAction | null; tertiary?: FlowAction | null; close?: (() => void) | null }) {
  const { colors } = useTheme();
  const text = (a: FlowAction) => (
    <PressableScale onPress={a.onPress} disabled={a.disabled} accessibilityLabel={a.a11yLabel ?? a.label} accessibilityHint={a.a11yHint} hitSlop={6} style={{ alignItems: "center", paddingVertical: spacing.sm }}>
      <Text variant="bodyStrong" color={colors.textMuted}>{a.label}</Text>
    </PressableScale>
  );
  return (
    <View style={{ gap: spacing.sm }}>
      {primary ? (
        <PrimaryButton label={primary.label} onPress={primary.onPress} disabled={primary.disabled} busy={primary.busy} icon={primary.icon} tone={primary.tone} accessibilityLabel={primary.a11yLabel} accessibilityHint={primary.a11yHint} />
      ) : null}
      {secondary ? (
        <PressableScale
          onPress={secondary.onPress}
          disabled={secondary.disabled}
          style={{ borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: spacing.sm }}
        >
          {secondary.icon}
          {secondary.hint ? (
            <View style={{ alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.text}>{secondary.label}</Text>
              <Text variant="micro" color={colors.textMuted}>{secondary.hint}</Text>
            </View>
          ) : (
            <Text variant="bodyStrong" color={colors.text}>{secondary.label}</Text>
          )}
        </PressableScale>
      ) : null}
      {tertiary ? text(tertiary) : null}
      {close ? text({ label: t("common.close"), onPress: close }) : null}
    </View>
  );
}

/** Üst çubuğun sol düğmesi: kapat (X) ya da geri; ikon ile ad hep birbirini tutuyor. */
function TopBarButton({ onPress, back, label }: { onPress: () => void; back: boolean; label?: string }) {
  const { colors } = useTheme();
  return (
    <PressableScale
      hitSlop={4}
      onPress={onPress}
      accessibilityLabel={label ?? t(back ? "common.back" : "common.close")}
      style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}
    >
      {back ? <BackIcon color={colors.text} size={24} /> : <CloseIcon color={colors.textMuted} size={22} />}
    </PressableScale>
  );
}

/**
 * Üst çubuk: kapat (X) ya da geri; sağda isteğe bağlı küçük içerik.
 * `closeLabel`: X'in okunan adı daha özelse (ör. "Turdan çık").
 */
export function FlowTopBar({ onClose, back = false, title, right, closeLabel }: { onClose?: () => void; back?: boolean; title?: string; right?: React.ReactNode; closeLabel?: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, minHeight: 44 }}>
      {onClose ? <TopBarButton onPress={onClose} back={back} label={closeLabel} /> : null}
      <View style={{ flex: 1 }}>{title ? <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{title}</Text> : null}</View>
      {right}
    </View>
  );
}

/**
 * TUR İLERLEME SATIRI — çıkış (X) + çubuk + sayaç tek satırda.
 *
 * Oyun turunun satırı (`GameScreen`; `RoundSkeleton` aynı ölçüde). Patron,
 * meydan okuma, seviye testi, haftalık sınav, yürüyüş ve quiz bu satırı elle
 * kuruyordu: çubuk 6, 8 ya da 10 kalınlıkta, sayaç kimi yerde caption kimi
 * yerde bodyStrong. Şimdi hepsi bu.
 *
 * `value`: 0..1. `count`: sağdaki sayaç ("3/10") ya da kendi düğümü (süre).
 * `extra`: çubukla sayaç arasında küçük rozetler (kombo, yeni/tekrar çipi).
 */
export function FlowProgress({ onClose, back = false, closeLabel, value, count, tint, extra, style }: {
  onClose?: () => void;
  back?: boolean;
  closeLabel?: string;
  value: number;
  count?: React.ReactNode;
  tint?: string;
  extra?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <View style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, minHeight: 44 }, style]}>
      {onClose ? <TopBarButton onPress={onClose} back={back} label={closeLabel} /> : null}
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: pct }}
        style={{ flex: 1 }}
      >
        {/* Dolgu değişimde yumuşak kayıyor (`ui/Bar` `ProgressTrack`; web
            `session-player` tur çubuğu yayı). */}
        <ProgressTrack pct={pct} tint={tint ?? colors.primary} height={10} track={colors.surface2} />
      </View>
      {extra}
      {typeof count === "string" ? <Text variant="bodyStrong" color={colors.textMuted} style={{ fontVariant: ["tabular-nums"] }}>{count}</Text> : count}
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
export function ResultHero({ eyebrow, title, figure, sub, aside, pill, quiet = false, segments, live = true }: {
  eyebrow: string;
  title: string;
  figure?: string | null;
  /** Düz metin ya da metin içine yazılan düğüm (ör. sayaçlı XP, `ui/CountUp`). */
  sub?: React.ReactNode;
  /**
   * Bandın sağ ucundaki düğüm. ESKİDEN `mood` ALIRDI ve Nomi'yi kendisi
   * çizerdi; animasyon artık yalnız günlük turda olduğu için bu şablon
   * maskotu tanımıyor (bkz. ui/Mascot dosya başı). Turun sonuç bandı kendi
   * Nomi'sini buraya veriyor, öteki on üç sonuç ekranı boş bırakıyor.
   */
  aside?: React.ReactNode;
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
          {figure ? <Text variant="display" color={ink} style={{ marginTop: spacing.xs, fontVariant: ["tabular-nums"] }}>{figure}</Text> : null}
          {sub ? <Text variant="body" color={muted}>{sub}</Text> : null}
          {pill ? (
            <View style={{ alignSelf: "flex-start", marginTop: spacing.sm, backgroundColor: pillBg, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 2 }}>
              <Text variant="micro" color={pillInk} style={{ fontWeight: "800" }}>{pill.text}</Text>
            </View>
          ) : null}
        </View>
        {aside}
      </View>
      {segments && segments.total > 1 ? (
        <View style={{ flexDirection: "row", gap: spacing.xs, marginTop: spacing.md }}>
          {Array.from({ length: segments.total }).map((_, i) => (
            <View key={i} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: i < segments.done ? ink : quiet ? colors.surface2 : "#ffffff59" }} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

/** En çok üç sayı — aynı bileşen her sonuçta. */
/* `value` metnin içine yazılan bir düğüm de olabilir: tur sonunda sayılar
   sayarak geliyor (`ui/CountUp`, web `StatRow` zaten `ReactNode` alıyor). */
export function StatRow({ items }: { items: { value: React.ReactNode; label: string; tone?: "ok" | "bad" | "streak" | null }[] }) {
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
          <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }} numberOfLines={2}>{it.label}</Text>
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
        <Text variant="micro" color={colors.textMuted} style={{ flex: 1, textTransform: "uppercase", letterSpacing: 1 }}>{title}</Text>
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
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, backgroundColor: bg, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
      {icon ? <IconLine variant="caption">{icon}</IconLine> : null}
      <Text variant="caption" color={ink} style={{ flex: 1 }}>{text}</Text>
    </View>
  );
}

export type CoverRule = { icon: (p: { color: string; size: number }) => React.ReactElement; text: string; tone?: "ok" | "bad" | null };

/**
 * İkonlu tek satır kural/ipucu — kapağın kural listesi ve kapak dışındaki
 * ipucu listeleri (e-posta doğrulama) aynı satırı çiziyor. `small`: ikincil
 * listede yazı caption.
 */
export function RuleRow({ rule: r, small = false }: { rule: CoverRule; small?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
      {/* Karo (28) satırdan yüksek: yazının ilk satırı karonun ortasına iniyor
          (`lineInset`), eski `paddingTop: 2` yaması yerine. */}
      <IconLine variant={small ? "caption" : "body"} box={28}>
        <View style={{ width: 28, height: 28, borderRadius: radii.sm, backgroundColor: r.tone === "ok" ? colors.successSoft : r.tone === "bad" ? colors.dangerSoft : colors.surface2, alignItems: "center", justifyContent: "center" }}>
          <r.icon color={r.tone === "ok" ? colors.successText : r.tone === "bad" ? colors.dangerText : colors.textMuted} size={16} />
        </View>
      </IconLine>
      <Text variant={small ? "caption" : "body"} color={small ? colors.textMuted : undefined} style={{ flex: 1, paddingTop: lineInset(small ? "caption" : "body", 28) }}>{r.text}</Text>
    </View>
  );
}

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
    <View style={{ gap: spacing.md, paddingTop: spacing.md }}>
      <View style={[{ width: ds(56), height: ds(56), borderRadius: radii.lg, backgroundColor: tint, alignItems: "center", justifyContent: "center" }, softShadow(tint, 8)]}>
        <Icon color={onSolid(tint, colors)} size={28} />
      </View>
      <View style={{ gap: spacing.xs }}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{eyebrow}</Text>
        <Text accessibilityRole="header" variant="h1">{title}</Text>
        {pitch ? <Text variant="body" color={colors.textMuted}>{pitch}</Text> : null}
      </View>
      {rules.length ? (
        <Card padded style={{ gap: spacing.md }}>
          {rules.map((r, i) => <RuleRow key={i} rule={r} />)}
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
 *
 * `alert`: hata dalı (yüklenemedi). Bölge "assertive" duyuruyor — web
 * karşılığındaki `alert` (`role="alert"`) ile aynı ad ve aynı ağırlık; hata
 * dalları şablona geçmeden önce de assertive idi.
 */
export function StateBody({ title, body, icon, children, alert = false }: { title: string; body?: string | null; icon?: React.ReactNode; children?: React.ReactNode; alert?: boolean }) {
  const { colors } = useTheme();
  return (
    <View accessibilityLiveRegion={alert ? "assertive" : "polite"} style={{ alignItems: "center", gap: spacing.md, paddingVertical: spacing.xl }}>
      {icon}
      <Text accessibilityRole="header" variant="h2" style={{ textAlign: "center" }}>{title}</Text>
      {body ? <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", maxWidth: READABLE_TEXT_MAX }}>{body}</Text> : null}
      {children}
    </View>
  );
}

/**
 * İÇERİK İNİYOR — "bulunamadı" ile "henüz inmedi" ayrı şeyler.
 *
 * Konuşma, egzersiz ve soru havuzları A1 tohumu dışında ikilide DEĞİL; seviye
 * paketi hâlinde sunucudan iniyor (bkz. `content/store`). Bu ekranlar paketi
 * beklerken elleri boş kalıyor ve boş eli KESİN BİR CÜMLEYLE söylüyorlardı:
 * "Bu konuşma bulunamadı", "Bu egzersiz bulunamadı", "Bu ünitede henüz soru yok"
 * — üzgün maskotla ve tek çıkışı "Geri" olan bir düğmeyle. Paket saniyesinde
 * inip konuşma açılıyordu, ama o arada "Geri"ye basan öğrenci konuşmasından atılmış
 * oluyordu; bildirimden ya da derin bağlantıdan gelen (paketi hiç olmayan)
 * kullanıcı ise konuşmanın silindiğini sanıyordu.
 *
 * Bu gövde o aralığı dolduruyor. Kesin cümleler yerinde duruyor ama artık
 * yalnız paket GERÇEKTEN indikten sonra, madde yine yoksa çiziliyor.
 */
export function ContentLoadingBody() {
  return (
    <View style={{ gap: spacing.md, paddingVertical: spacing.md }}>
      <SkeletonLine variant="h2" width="64%" />
      <SkeletonLine variant="caption" width="42%" />
      <SkeletonCard label={t("common.loading")} style={{ gap: spacing.sm }}>
        <SkeletonLine variant="body" width="94%" />
        <SkeletonLine variant="body" width="88%" />
        <SkeletonLine variant="body" width="66%" />
      </SkeletonCard>
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        <SkeletonPill width="100%" height={44} style={{ flex: 1 }} />
        <SkeletonPill width={96} height={44} />
      </View>
    </View>
  );
}

/** Rengi paletten okunan kural ikonu için yardımcı. */
export function toneOf(colors: Palette, tone: "ok" | "bad" | null | undefined): string {
  return tone === "ok" ? colors.successText : tone === "bad" ? colors.dangerText : colors.textMuted;
}
