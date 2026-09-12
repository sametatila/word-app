import React, { useEffect, useState } from "react";
import { t, formatNumber, dateLocale } from "../lib/i18n";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, tierName, type LeagueRow, type LeagueView } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { ReportSheet } from "../ui/ReportSheet";
import { SkeletonLine, SkeletonRows } from "../ui/Skeleton";
import { Avatar } from "../ui/Avatar";
import { PressableScale } from "../ui/PressableScale";
import { FlameIcon, PodiumIcon, TrophyIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { EmptyCard, IconTile, Pill, SectionTitle } from "./common";

/**
 * Haftalık lig — Sıralama ekranının asıl tablosu.
 *
 * Satır biçimi FriendsBoard ile birebir; ayıran tek şey KUŞAK. Üstteki birkaç
 * kişi yeşil (bir üst lige çıkar), alttaki birkaç kişi kırmızı (bir alta iner)
 * ve aralarına çizgi çekiliyor. Sıra numarası tek başına bir yargı; kuşak onu
 * kapatılabilir bir mesafeye çeviriyor.
 */
export function LeagueBoard() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [view, setView] = useState<LeagueView | null>(null);
  const [err, setErr] = useState(false);
  const [result, setResult] = useState<LeagueView["result"]>(null);
  // Ligdeki kişiler arkadaş DEĞİL: uygunsuz ad/arma bildirimi (Play UGC) burada
  // basılı tutmayla açılıyor — eski genel tablodaki davranışın aynısı.
  const [report, setReport] = useState<LeagueRow | null>(null);

  useEffect(() => {
    let alive = true;
    social
      .league()
      .then((v) => { if (alive) { setView(v); setResult(v.result); } })
      .catch(() => { if (alive) setErr(true); });
    return () => { alive = false; };
  }, []);

  function dismiss() {
    setResult(null);
    // İşaretlenemezse gelecek açılışta yine çıkar; kaybolan bir şey yok.
    void social.leagueSeen().catch(() => {});
  }

  if (err) return <EmptyCard live="assertive" icon={PodiumIcon} tint={colors.info} title={t("leaderboard.couldn_t_load_leaderboard")} text={t("social.err_offline")} />;
  if (!view) {
    return (
      <View>
        <SkeletonLine variant="caption" width={160} style={{ marginBottom: spacing.sm, marginLeft: spacing.xs, marginTop: spacing.lg }} />
        <SkeletonRows count={6} height={64} />
      </View>
    );
  }

  const zoneOf = (rank: number): "up" | "down" | null =>
    view.promote > 0 && rank <= view.promote ? "up" : view.demote > 0 && rank > view.rows.length - view.demote ? "down" : null;

  return (
    <View>
      {result ? <ResultCard result={result} onDismiss={dismiss} /> : null}
      <SectionTitle title={tierName(view.tier)} right={view.daysLeft === 1 ? t("social.last_day") : t("social.days_left", { n: view.daysLeft })} />
      {view.rows.length < 2 ? (
        <EmptyCard icon={PodiumIcon} tint={colors.info} title={t("league.alone")} text={t("league.alone_sub")} />
      ) : (
        <View style={{ gap: spacing.sm }}>
          {view.rows.map((r, i) => (
            <React.Fragment key={r.userId}>
              <LeagueRowCard row={r} zone={zoneOf(r.rank)} onOpen={() => r.username && nav.navigate("User", { username: r.username })} onReport={() => setReport(r)} />
              {view.promote > 0 && i + 1 === view.promote ? <ZoneEdge label={t("league.promote_zone")} tint={colors.success} /> : null}
              {view.demote > 0 && i + 1 === view.rows.length - view.demote ? <ZoneEdge label={t("league.demote_zone")} tint={colors.danger} /> : null}
            </React.Fragment>
          ))}
        </View>
      )}
      <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>
        {view.promote > 0
          ? t("league.explain_up", { n: view.promote })
          : view.rows.length >= 2 && view.demote === 0
            ? t("league.explain_top")
            : t("league.explain_none")}
        {view.demote > 0 ? ` · ${t("league.explain_down", { n: view.demote })}` : ""}
      </Text>
      <ReportSheet visible={!!report} kind="user" refId={report?.userId ?? ""} content={report?.name ?? ""} onClose={() => setReport(null)} />
    </View>
  );
}

function ZoneEdge({ label, tint }: { label: string; tint: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingHorizontal: spacing.sm }}>
      <View style={{ flex: 1, height: 1, backgroundColor: tint }} />
      <Text variant="micro" color={tint}>{label.toLocaleUpperCase(dateLocale())}</Text>
      <View style={{ flex: 1, height: 1, backgroundColor: tint }} />
    </View>
  );
}

function LeagueRowCard({ row, zone, onOpen, onReport }: { row: LeagueRow; zone: "up" | "down" | null; onOpen: () => void; onReport: () => void }) {
  const { colors } = useTheme();
  const tint = zone === "up" ? colors.success : zone === "down" ? colors.danger : null;
  return (
    <PressableScale
      disabled={row.isMe || !row.username}
      onPress={onOpen}
      onLongPress={row.isMe ? undefined : onReport}
      delayLongPress={400}
      accessibilityHint={row.isMe ? undefined : t("leaderboard.report_hint", { name: row.name ?? t("social.student") })}
      style={[
        { flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.md, backgroundColor: row.isMe ? colors.primarySoft : colors.surface, borderWidth: 1, borderColor: row.isMe ? colors.primary : colors.hairline },
        tint ? softShadow(tint, 4) : {},
      ]}
    >
      <View style={{ width: 30, alignItems: "center" }}>
        <Text variant="h3" color={tint ?? colors.textMuted}>{row.rank}</Text>
      </View>
      <Avatar userId={row.userId} name={row.name} avatar={row.avatar} size={40} ring={tint} />
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong" color={row.isMe ? colors.primaryText : colors.text} numberOfLines={1}>
          {row.name ?? t("social.student")}{row.isMe ? t("social.you_paren") : ""}
        </Text>
        {row.streak > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs }}>
            <FlameIcon color={colors.streakText} size={12} />
            <Text variant="micro" color={colors.textMuted}>{t("social.days_streak", { n: row.streak })}</Text>
          </View>
        ) : null}
      </View>
      <Text variant="h3" color={row.isMe ? colors.primaryText : colors.text}>{formatNumber(row.xp)}</Text>
      <Text variant="micro" color={colors.textMuted}>XP</Text>
    </PressableScale>
  );
}

/** Geçen haftanın sonucu — bir kez gösterilir, "Devam" ile kapanır. */
function ResultCard({ result, onDismiss }: { result: NonNullable<LeagueView["result"]>; onDismiss: () => void }) {
  const { colors } = useTheme();
  const up = result.outcome === "promoted";
  const down = result.outcome === "demoted";
  const tint = up ? colors.success : down ? colors.danger : colors.info;
  return (
    <Card padded style={{ marginTop: spacing.sm, borderColor: tint, borderWidth: 1.5, gap: spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <IconTile icon={TrophyIcon} tint={tint} />
        <View style={{ flex: 1 }}>
          <Text variant="h3">{t(up ? "league.result_promoted" : down ? "league.result_demoted" : "league.result_stayed", { league: tierName(result.nextTier) })}</Text>
          <Text variant="caption" color={colors.textMuted}>{t("league.result_rank", { rank: result.rank, xp: formatNumber(result.xp) })}</Text>
        </View>
      </View>
      <Pill label={t("league.result_go")} onPress={onDismiss} tone="primary" block />
    </Card>
  );
}
