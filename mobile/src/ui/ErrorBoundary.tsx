import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { AlertIcon, RefreshIcon } from "./icons";
import { t } from "../lib/i18n";
import { track } from "../lib/track";
import { useTheme, spacing, radii, type Palette } from "../theme";

/**
 * ÇÖKME SINIRI — mobilde hiç yoktu.
 *
 * Bir ekranın çiziminde yakalanmamış bir hata olursa React bütün ağacı
 * söküyor. Geliştirmede kırmızı ekran çıkıyor; ÜRETİMDE geriye bomboş bir
 * pencere kalıyor ve kullanıcının elinde uygulamayı öldürüp yeniden açmaktan
 * başka bir şey yok. Web'de bu baştan beri çözülmüş durumda: `app/error.tsx`
 * ve `app/(app)/error.tsx` bir kart çiziyor ve "tekrar dene" veriyor.
 *
 * Telemetri zaten hatayı SAYIYORDU (`lib/telemetry`, `ErrorUtils` kancası)
 * ama çizim hataları o kancaya HİÇ UĞRAMIYOR: React onları sınıra veriyor,
 * sınır yoksa ağacı söküyor. Yani çöken ekranların bir bölümü hem
 * görünmüyordu hem sayılmıyordu.
 *
 * İKİ DÜZEY, web'deki gibi:
 *   - Gezginin `screenLayout`u her ekranı tek tek sarıyor → sekme çubuğu ve
 *     gezinme ayakta kalıyor, kullanıcı başka bir sekmeye geçebiliyor.
 *     (Web karşılığı `app/(app)/error.tsx`.)
 *   - Kök sınır `App.tsx`te → gezginin kendisi ya da sağlayıcılar patlarsa.
 *     (Web karşılığı `app/error.tsx`.)
 *
 * `componentDidCatch` yerine `getDerivedStateFromError` + `componentDidCatch`
 * ikilisi: ilki çizimi değiştiriyor, ikincisi ölçüyor.
 */
type Props = { children: React.ReactNode; ekran?: string };
type State = { hata: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hata: false };

  static getDerivedStateFromError(): State {
    return { hata: true };
  }

  componentDidCatch(error: unknown): void {
    /* Web ile aynı olay ve aynı değer: `client_error`, 1 = hata sınırı.
       `kind` ekran anahtarı; sınır ekranın adını biliyorsa onu veriyor. */
    track("client_error", 1, this.props.ekran ?? "unknown");
    console.error("[lernomi]", error);
  }

  render(): React.ReactNode {
    if (!this.state.hata) return this.props.children;
    return <CrashCard onRetry={() => this.setState({ hata: false })} />;
  }
}

function CrashCard({ onRetry }: { onRetry: () => void }) {
  const { colors } = useTheme();
  return <CrashCardInner colors={colors} onRetry={onRetry} />;
}

/* Kart AYRI bir bileşen: sınıf bileşeni kanca kullanamıyor ve tema kancadan
   geliyor. */
function CrashCardInner({ colors, onRetry }: { colors: Palette; onRetry: () => void }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, paddingHorizontal: spacing.xl }}>
      <View style={{ width: 48, height: 48, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.dangerSoft }}>
        <AlertIcon color={colors.dangerText} size={24} />
      </View>
      {/* Başlık başlık olarak okunuyor (bkz. parity 259); hata da duyuruluyor. */}
      <Text accessibilityRole="header" accessibilityLiveRegion="assertive" variant="h2" style={{ textAlign: "center" }}>{t("crash.title")}</Text>
      <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("crash.body")}</Text>
      <PressableScale
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel={t("common.try_again")}
        style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.sm, backgroundColor: colors.primary, borderRadius: radii.lg, paddingHorizontal: spacing.xl, paddingVertical: 14 }}
      >
        <RefreshIcon color={colors.onPrimary} size={18} />
        <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.try_again")}</Text>
      </PressableScale>
    </View>
  );
}
