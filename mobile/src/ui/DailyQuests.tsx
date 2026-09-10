import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import type { RootTabParams } from "../navigation/RootTabs";
import { Text } from "./Text";
import { Card } from "./Card";
import { CheckIcon, BoltIcon, GiftIcon } from "./icons";
import { SkeletonBar, SkeletonLine, SkeletonTile } from "./Skeleton";
import { useAuth } from "../lib/AuthContext";
import { PressableScale } from "./PressableScale";
import { fetchQuests, claimQuest, ALL_DONE_ID, ALL_DONE_XP, type Quest, type QuestBoard } from "../game/quests";
import { sfx } from "../lib/sfx";
import { todayStr } from "../game/session";
import { bumpStats } from "../lib/statsSignal";
import { track } from "../lib/track";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { CardGrid } from "./CardGrid";

/**
 * Görevin GÖTÜRDÜĞÜ yer.
 *
 * Web'de tamamlanmamış görevin etiketi bir bağlantı ve kartın yorumu asıl işin
 * bu olduğunu yazıyor: ölçümde beceriler bölümünü yedi kullanıcıdan biri,
 * dersleri üçü açmıştı; görev oraya götürmek için var. Mobilde `href` alanı
 * tipte VARDI ama hiçbir şey bağlamıyordu - satır dokunulamazdı.
 *
 * Eşleme `href` değil KİMLİK üzerinden, çünkü webin `/immersion` sayfası
 * mobilde ikiye ayrılmış (Patika = dersler, Beceriler = beceri kütüphanesi) ve
 * tek bir adres ikisini birden gösteremiyor. Learn'e giden altı görev `null`:
 * bu kutular zaten Learn ekranının içinde, kendi bulunduğu yere götüren bir
 * satır dokunulabilir görünmemeli. Tanınmayan kimlik de `null` - sunucudan
 * yeni bir görev gelirse satır çizilir, yalnız dokunulmaz.
 */
const QUEST_TAB: Record<string, keyof RootTabParams> = {
  skill1: "Skills",
  lesson1: "Path",
};

function QuestRow({ q, colors, onClaim, busy, onOpen }: { q: Quest; colors: Palette; onClaim: () => void; busy: boolean; onOpen: (() => void) | null }) {
  const pct = q.target ? Math.min(100, Math.round((q.done / q.target) * 100)) : 0;
  const complete = q.done >= q.target;
  return (
    <Card padded style={{ marginBottom: spacing.md, borderWidth: 1, borderColor: complete ? colors.success : colors.hairline }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={[{ width: 42, height: 42, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: complete ? colors.success : colors.primarySoft }, complete ? softShadow(colors.success, 6) : {}]}>
          {complete ? <CheckIcon color={colors.onFill} size={22} /> : <BoltIcon color={colors.primaryText} size={20} />}
        </View>
        <View style={{ flex: 1 }}>
          {onOpen && !complete ? (
            <PressableScale onPress={onOpen} accessibilityRole="link" hitSlop={4}>
              <Text variant="bodyStrong" color={colors.primaryText}>{q.label}</Text>
            </PressableScale>
          ) : (
            <Text variant="bodyStrong">{q.label}</Text>
          )}
          <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginTop: 6 }}>
            <View style={{ height: "100%", width: `${Math.max(3, pct)}%`, backgroundColor: complete ? colors.success : colors.primary, borderRadius: 3 }} />
          </View>
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: 3 }}>{Math.min(q.done, q.target)}/{q.target}</Text>
        </View>
        {/*
          ÖDÜLÜ AL. Tamamlanmış ve alınmamış görevde düğme; alınmışsa yalnız
          kazanılan XP yazıyor. Web aynı üç durumu çiziyor (`quest-card`):
          alındı → "+N XP", tamam → "al" düğmesi, sürüyor → ilerleme.
        */}
        {complete && !q.claimed ? (
          <PressableScale onPress={onClaim} disabled={busy} accessibilityRole="button" style={{ backgroundColor: colors.primary, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 9, opacity: busy ? 0.6 : 1 }}>
            <Text variant="caption" color={colors.onPrimary}>{busy ? "…" : t("dailyquests.claim_xp", { xp: q.xp })}</Text>
          </PressableScale>
        ) : (
          <View style={{ alignItems: "flex-end" }}>
            <Text variant="bodyStrong" color={complete ? colors.successText : colors.primaryText}>+{q.xp}</Text>
            <Text variant="micro" color={colors.textMuted}>XP</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

/** QuestRow ile birebir aynı kaplar; yalnız içerik iskelet (aynı yükseklik). */
function QuestRowSkeleton({ colors }: { colors: Palette }) {
  return (
    <Card padded style={{ marginBottom: spacing.md, borderWidth: 1, borderColor: colors.hairline }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <SkeletonTile size={42} />
        <View style={{ flex: 1 }}>
          <SkeletonLine variant="bodyStrong" width="65%" />
          <SkeletonBar height={6} style={{ marginTop: 6 }} />
          <SkeletonLine variant="micro" width={38} style={{ marginTop: 3 }} />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <SkeletonLine variant="bodyStrong" width={34} />
          <SkeletonLine variant="micro" width={20} />
        </View>
      </View>
    </Card>
  );
}

/**
 * Günün görevleri — Learn'e GÖMÜLÜ kutular (ayrı ekran yok). Giriş yoksa / görev
 * yoksa hiç render etmez ki Learn kalabalıklaşmasın. Web'deki görev panosunun
 * mobil karşılığı, ana ekranın içinde.
 *
 * Yüklenirken üç görev satırlık iskelet çizilir: veri sonradan gelince Learn'in
 * altındaki bölümler aşağı kaymasın (üç görev günlük olağan sayı).
 */
export function DailyQuests() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [board, setBoard] = useState<QuestBoard | null>(null);
  /** Hangi görevin ödülü alınıyor (çift dokunuşu engeller). */
  const [claiming, setClaiming] = useState<string | null>(null);
  /** Son alınan XP — kısa süre gösterilip kayboluyor (web `flash`). */
  const [flash, setFlash] = useState(0);

  async function claim(questId: string) {
    if (claiming) return;
    setClaiming(questId);
    try {
      const b = await claimQuest(questId, todayStr());
      if (Array.isArray(b.quests)) setBoard({ quests: b.quests, allDone: b.allDone, allClaimed: b.allClaimed });
      if (b.xp > 0) {
        /* XP değişti: başlıktaki toplam ve özet tazelensin (bkz. statsSignal). */
        bumpStats();
        track("quest_claim", b.xp);
        sfx("unlock"); // ödül alındı — web `quest-card` aynı sesi çalıyor
        setFlash(b.xp);
        setTimeout(() => setFlash(0), 2400);
      }
    } catch {
      /* çevrimdışı: pano olduğu gibi kalıyor, kullanıcı yeniden deneyebilir */
    } finally {
      setClaiming(null);
    }
  }

  useEffect(() => {
    if (!user) { setBoard({ quests: [], allDone: false, allClaimed: false }); return; }
    let alive = true;
    fetchQuests()
      .then((b) => { if (alive) setBoard(Array.isArray(b?.quests) ? b : { quests: [], allDone: false, allClaimed: false }); })
      .catch(() => { if (alive) setBoard({ quests: [], allDone: false, allClaimed: false }); });
    return () => { alive = false; };
  }, [user]);

  if (board === null) {
    return (
      <View style={{ marginBottom: spacing.xl }}>
        <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginBottom: spacing.md }}>
          <SkeletonLine variant="h3" width={140} />
          <SkeletonLine variant="caption" width={58} />
        </View>
        <CardGrid minItemWidth={380}>{[0, 1, 2].map((i) => <QuestRowSkeleton key={i} colors={colors} />)}</CardGrid>
      </View>
    );
  }
  const quests = board.quests;
  if (quests.length === 0) return null;
  /*
   * BAŞLIKTA "kaç ödül hazır" YAZIYOR — web ile aynı iki durum. Eskiden burada
   * "{n}/{m} tamam" vardı ve "tamam" sözcüğü koda GÖMÜLÜ Türkçeydi: İngilizce
   * ve Almanca kullanan hesapta da Türkçe çıkıyordu. Yeni hâli hem çeviriden
   * geliyor hem de daha çok şey söylüyor: alınmayı bekleyen ödül varsa sayısı,
   * yoksa panonun gece yarısı yenilendiği.
   */
  const claimable = quests.filter((q) => q.done >= q.target && !q.claimed).length;
  return (
    <View style={{ marginBottom: spacing.xl }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginBottom: spacing.md }}>
        <Text variant="h3" color={colors.textMuted}>{t("dailyquests.daily_quests")}</Text>
        {claimable > 0 ? (
          <View style={{ backgroundColor: colors.successSoft, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 }}>
            <Text variant="micro" color={colors.successText}>{t("dailyquests.rewards_ready", { n: claimable })}</Text>
          </View>
        ) : (
          <Text variant="caption" color={colors.textMuted}>{t("dailyquests.resets_midnight")}</Text>
        )}
      </View>
      <CardGrid minItemWidth={380}>
        {quests.map((q) => {
          const tab = QUEST_TAB[q.id];
          return (
            <QuestRow
              key={q.id}
              q={q}
              colors={colors}
              busy={claiming === q.id}
              onClaim={() => void claim(q.id)}
              onOpen={tab ? () => nav.navigate("Tabs", { screen: tab }) : null}
            />
          );
        })}
      </CardGrid>

      {/*
        ÜÇÜ BİRDEN BİTİRENİN TOPLU ÖDÜLÜ — mobilde HİÇ YOKTU.
        Sunucu bu ödülü `questId: "all"` ile veriyor ve pano `allDone` /
        `allClaimed` alanlarını baştan beri taşıyordu; mobilde iki alanı da
        okuyan bir yüzey olmadığı için günün üçünü de bitiren Android
        kullanıcısı 300 XP'yi HİÇ alamıyordu. Web bu kutuyu baştan beri
        çiziyor (`quest-card`).
      */}
      {board.allDone ? (
        <Card padded style={{ backgroundColor: colors.successSoft, borderWidth: 1, borderColor: colors.success }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <GiftIcon color={colors.successText} size={22} />
            <Text variant="bodyStrong" style={{ flex: 1 }}>
              {board.allClaimed ? t("dailyquests.all_three_done") : t("dailyquests.all_three_done_sub")}
            </Text>
            {board.allClaimed ? (
              <Text variant="caption" color={colors.textMuted}>+{ALL_DONE_XP} XP</Text>
            ) : (
              <PressableScale onPress={() => void claim(ALL_DONE_ID)} disabled={claiming === ALL_DONE_ID} accessibilityRole="button" style={{ backgroundColor: colors.primary, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 9, opacity: claiming === ALL_DONE_ID ? 0.6 : 1 }}>
                <Text variant="caption" color={colors.onPrimary}>{claiming === ALL_DONE_ID ? "…" : t("dailyquests.claim_xp", { xp: ALL_DONE_XP })}</Text>
              </PressableScale>
            )}
          </View>
        </Card>
      ) : null}

      {flash > 0 ? (
        <Text variant="bodyStrong" color={colors.successText} style={{ marginTop: spacing.sm, textAlign: "center" }}>
          {t("dailyquests.xp_earned", { xp: flash })}
        </Text>
      ) : null}
    </View>
  );
}
