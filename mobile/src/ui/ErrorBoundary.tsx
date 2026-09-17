import React from "react";
import { FlowScreen, FlowActions, StateBody } from "./flow";
import { RefreshIcon } from "./icons";
import { useTheme } from "../theme";
import { t } from "../lib/i18n";
import { track } from "../lib/track";
import { reportError } from "../lib/errorReport";

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
    reportError(error, this.props.ekran ?? "unknown");
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
  /* DURUM ŞABLONU (ui/flow): üzgün maskot · başlık · tek cümle · tek çıkış.
     Eskiden kırmızı ikon karosu vardı; öteki "açılamadı" ekranlarıyla aynı
     dili konuşsun diye maskota geçti. Sınıf bileşeni kanca kullanamadığı için
     (tema ve FlowScreen'in güvenli alanı kancadan) ayrı bir fonksiyon bileşeni. */
  return (
    <FlowScreen center actions={<FlowActions primary={{ label: t("common.try_again"), icon: <RefreshIcon color={colors.onPrimary} size={18} />, onPress: onRetry }} />}>
      {/* Hata duyuruluyor (`alert` = assertive bölge, eskisi gibi); başlık başlık olarak okunuyor (bkz. parity 259). */}
      <StateBody alert title={t("crash.title")} body={t("crash.body")} />
    </FlowScreen>
  );
}
