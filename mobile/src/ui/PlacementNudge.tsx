import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { t } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import { bumpStats } from "../lib/statsSignal";
import { answerPlacementNudge, fetchPlacementStatus, type PlacementNudge as Nudge } from "../game/placement";
import { Card } from "./Card";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { useTheme, spacing, radii } from "../theme";

/**
 * İLK HAFTA SEVİYE ÖNERİSİ — seviye testinin emniyet ağı (sunucu `lib/placement-nudge`,
 * docs/plan/placement-v2.md). Sunucu öneriyi yalnız bir kez ve yalnız ilk 10 günde verir;
 * karar (geç / kalsın) profile yazılır, seviye ancak kabulde değişir. Web karşılığı
 * `components/learn/placement-nudge`.
 */
/*
 * SON CEVAP BELLEKTE (kullanıcı başına): kart her Öğren açılışında sunucu
 * cevabından sonra araya giriyor ve altındaki her şeyi itiyordu (QA F-0070
 * sınıfı). İkinci açılıştan itibaren son cevap hemen çiziliyor. İlk açılışta
 * iskelet YOK: öneri kullanıcıların çoğuna hiç gelmiyor, boş yer tutmak
 * herkese ters yönde bir kayma olurdu.
 */
let lastNudge: { uid: string; nudge: Nudge | null } | null = null;

export function PlacementNudge() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [nudge, setNudge] = useState<Nudge | null>(() => (user && lastNudge?.uid === user.id ? lastNudge.nudge : null));
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    fetchPlacementStatus()
      .then((st) => { lastNudge = { uid: user.id, nudge: st.nudge ?? null }; if (alive) setNudge(st.nudge ?? null); })
      .catch(() => { /* öneri opsiyonel */ });
    return () => { alive = false; };
  }, [user]);

  if (!nudge) return null;
  const up = nudge.direction === "up";

  async function decide(accept: boolean) {
    if (!nudge) return;
    setBusy(true);
    try {
      await answerPlacementNudge(nudge.to, accept);
      if (accept) bumpStats(); // seviye değişti: ekranlar profili yeniden çeksin
    } catch { /* kart kapanır; öneri bir sonraki açılışta yeniden gelebilir */ }
    setBusy(false);
    if (user) lastNudge = { uid: user.id, nudge: null };
    setNudge(null);
  }

  return (
    <Card padded style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
      <View accessibilityLiveRegion="polite">
        <Text variant="h3">{t(up ? "plc2.nudge_up_title" : "plc2.nudge_down_title")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs }}>
          {t(up ? "plc2.nudge_up_body" : "plc2.nudge_down_body", { from: nudge.from, to: nudge.to })}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs }}>
        <PressableScale disabled={busy} onPress={() => void decide(false)} style={{ flex: 1, alignItems: "center", paddingVertical: spacing.md, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border }}>
          <Text variant="bodyStrong" color={colors.textMuted}>{t("plc2.nudge_keep", { from: nudge.from })}</Text>
        </PressableScale>
        <PressableScale disabled={busy} onPress={() => void decide(true)} style={{ flex: 1, alignItems: "center", paddingVertical: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary }}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("plc2.nudge_accept", { to: nudge.to })}</Text>
        </PressableScale>
      </View>
    </Card>
  );
}
