import React from "react";
import { MASTERED_DAYS } from "../lib/learningRules";
import { t, dateLocale, formatDay, formatNumber } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Bar, BAR_HEIGHT } from "../ui/Bar";
import { Card } from "../ui/Card";
import { MenuRow } from "../ui/MenuRow";
import { PressableScale } from "../ui/PressableScale";
import { ChevronNextIcon, CorrectIcon, DurationIcon, LevelIcon, MyWordsIcon, MyWritingsIcon, StreakIcon, XpIcon } from "../ui/icons";
import { WeakSpots } from "../ui/WeakSpots";
import { GrowthTrends, HowAmIDoing, HowAmIDoingHead, useGrowth } from "../ui/GrowthPanel";
import { Skeleton, SkeletonBar, SkeletonCard, SkeletonLine, SkeletonText, SkeletonTile, textHeight } from "../ui/Skeleton";
import { useMe, formatXp, formatDuration } from "../lib/useMe";
import { bumpStats } from "../lib/statsSignal";
import { EmptyCard, ScreenHeader } from "../social/common";
import { useTheme, spacing, radii, softShadow, fillOf, type Palette, ds } from "../theme";
import { todayStr } from "../game/session";
import { useLayout } from "../lib/useLayout";
import { CardGrid } from "../ui/CardGrid";

/** Şeritteki gün sayısı — iki tam hafta, hafta sonu ritmi görünsün diye. */
const STRIP_DAYS = 14;

/**
 * Çalışılan en düşük günün taban yüksekliği (yüzde) — üstüne oran biniyor.
 * Tabansız bırakılırsa bir tekrar yapılan gün sıfır piksel çiziliyor ve
 * "hiç çalışmadım" ile aynı görünüyor.
 */
const STRIP_FLOOR_PCT = 14;

/**
 * Isı basamakları — [eşik, karışım yüzdesi]; son satır eşiksiz tavan.
 *
 * Web `progress-view` ile AYNI tablo (`check:parity` ikisini karşılaştırıyor);
 * ayrılırlarsa aynı çalışma iki platformda farklı yoğunlukta görünür.
 */
const HEAT_RAMP: [number, number][] = [[8, 28], [16, 50], [32, 72], [Infinity, 100]];

/**
 * Gün kısaltmaları — Gelişim'in İKİ satırında (bu hafta, son iki hafta) TEK
 * kaynak (QA F-0058). Üstteki satır yerelin kısa adını ("Pzt, Sal, Çar…"),
 * şerit onun ilk iki harfini ("Pz, Sa, Ça… Cm, Pa") yazıyordu: aynı ekranda
 * aynı gün iki ayrı adla. Şeride üç harf sığmıyor (14 sütun), tek harf de
 * Pazartesi/Perşembe/Pazar'ı aynı harfe düşürüyor — ortak biçim iki harf.
 * Kesmek Türkçede yerleşik kısaltmayı vermiyor (Pazar "Pa", Cumartesi "Cm");
 * liste sözlükte, dil başına elle. Hafta pazartesiyle başlıyor. Web
 * `progress-view` aynı anahtar.
 */
function weekdayNames(): string[] {
  return t("progress.weekdays_short").split(" ");
}

/**
 * Son iki haftanın çalışma ritmi — web `ActivityStrip` ile aynı okuma.
 *
 * Mobilde bu şerit HİÇ YOKTU: "dün çalıştım mı, hafta sonları düşüyor muyum"
 * sorusunun cevabı yalnız webde vardı, oysa günlük alışkanlığı değiştiren
 * soru bu. Sütun yüksekliği o günün tekrar sayısı, pencerenin en yoğun
 * gününe göre ölçekleniyor; çalışılmayan gün ince bir taban çizgisi bırakıyor
 * - boşluk da bir bilgi, ama sütunlar hizasını kaybetmemeli.
 */
function ActivityStrip({ rows, today, colors }: { rows: { day: string; reviews: number }[]; today: string; colors: Palette }) {
  const byDay = new Map(rows.map((r) => [r.day, r.reviews]));
  const end = new Date(`${today}T00:00:00Z`);
  const days: { day: string; reviews: number; weekday: number }[] = [];
  for (let i = STRIP_DAYS - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ day: key, reviews: byDay.get(key) ?? 0, weekday: (d.getUTCDay() + 6) % 7 });
  }
  const peak = Math.max(1, ...days.map((d) => d.reviews));
  const active = days.filter((d) => d.reviews > 0).length;
  const total = days.reduce((s, d) => s + d.reviews, 0);
  /* Üstteki "bu hafta" satırıyla aynı ad (`weekdayNames`, QA F-0058). */
  const names = weekdayNames();

  return (
    <Card padded>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.md, marginBottom: spacing.sm }}>
        <Text accessibilityRole="header" variant="h3">{t("progress.last_two_weeks")}</Text>
        <Text variant="caption" color={colors.textMuted}>
          {t("social.days", { n: active })} · {t("progress.n_reviews", { n: formatNumber(total) })}
        </Text>
      </View>

      <View style={{ height: 44, flexDirection: "row", alignItems: "flex-end", gap: 3 }}>
        {days.map((d) => {
          const pct = d.reviews > 0 ? STRIP_FLOOR_PCT + Math.round((d.reviews / peak) * (100 - STRIP_FLOOR_PCT)) : 0;
          const mix = HEAT_RAMP.find(([esik]) => d.reviews < esik)?.[1] ?? 100;
          const label = d.reviews > 0 ? t("progress.n_reviews", { n: d.reviews }) : t("progress.no_study");
          return d.reviews > 0 ? (
            /* Karışımı webdeki `color-mix` gibi kuruyoruz: alttaki `surface2`
               dolgusunun üstüne aynı yüzdede saydam marka rengi. */
            <View key={d.day} accessibilityLabel={`${formatDay(d.day)}: ${label}`} style={{ flex: 1, height: `${pct}%`, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
              {/* BUGÜN TAM MARKA RENGİ (web bugünün sütununu marka gradyanıyla çiziyor). */}
              <View style={{ flex: 1, backgroundColor: colors.primary, opacity: d.day === today ? 1 : mix / 100 }} />
            </View>
          ) : (
            <View key={d.day} accessibilityLabel={`${formatDay(d.day)}: ${label}`} style={{ flex: 1, height: 3, borderRadius: 3, backgroundColor: colors.surface2 }} />
          );
        })}
      </View>

      {/* Gün harfleri hafta sonu düşüşünü görünür kılıyor. Bugün koyu, geri kalanı silik. */}
      <View style={{ flexDirection: "row", gap: 3, marginTop: 6 }}>
        {days.map((d) => (
          <Text
            key={d.day}
            variant="micro"
            color={d.day === today ? colors.text : colors.textMuted}
            style={{ flex: 1, textAlign: "center", opacity: d.day !== today && d.weekday >= 5 ? 0.6 : 1 }}
          >
            {names[d.weekday]}
          </Text>
        ))}
      </View>
    </Card>
  );
}

/** Dört karodan biri — dolu renkli ikon karosu + `h2` değer (web `KpiCard`). */
function Stat({ icon: Icon, value, label, fill, colors }: { icon: (p: { color: string; size: number }) => React.ReactElement; value: string; label: string; fill: string; colors: Palette }) {
  return (
    <Card padded style={{ flex: 1, gap: 2 }}>
      <View style={[{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: fill, marginBottom: spacing.sm }, softShadow(fill, 6)]}>
        <Icon color="#fff" size={20} />
      </View>
      <Text variant="h2" color={colors.text}>{value}</Text>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
    </Card>
  );
}

/**
 * Seviye → renk. Web `progress-view` `LEVEL_COLOR` ile birebir; eşlemenin
 * kendisi paletin yorumunda yazılı (mint=A1, sky=A2, violet=B1, brand=B2,
 * rose=C1) ve iki uygulama aynı beş rengi taşıyor.
 */
function levelTint(niveau: string, colors: Palette): string {
  switch (niveau) {
    case "A1": return colors.success;
    case "A2": return colors.info;
    case "B1": return colors.accent;
    case "C1": return colors.danger;
    default: return colors.primary;
  }
}

/** Turuncu kahramanın üstünde iskelet satırı — beyaz %25 (Öğren'in hedef şeridi gibi). */
function HeroLine({ variant, width }: { variant: "display" | "bodyStrong" | "caption" | "micro"; width: number }) {
  const h = textHeight(variant);
  const bar = Math.max(6, h - 4);
  return (
    <View style={{ width, height: h, justifyContent: "center" }}>
      <Skeleton height={bar} radius={Math.min(radii.sm, bar / 2)} style={{ backgroundColor: "#ffffff40" }} />
    </View>
  );
}

/** Bu haftanın yedi günü (pazartesi başı); `today` gün dizgisi. Web `weekDays` ile aynı. */
function weekDays(today: string, studied: (day: string) => boolean) {
  const end = new Date(`${today}T00:00:00Z`);
  const offset = (end.getUTCDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - offset + i);
    const key = d.toISOString().slice(0, 10);
    return { day: key, weekday: i, studied: i <= offset && studied(key), future: i > offset };
  });
}

/**
 * SERİ KAHRAMANI — Öğren'in "Günlük tur" kartıyla aynı dolgu (`colors.primary`
 * + `onPrimary`, temadan bağımsız; web `--brand-fill` + `--on-brand`). Beyaz
 * yazı / turuncu 2.77: Öğren kahramanıyla aynı kayıtlı karar (T-KARAR-1).
 *
 * Alev ikonu `streakInk` (web `flame-700`): yarı saydam beyaz karo turuncuyu
 * #f98f3d'ye açıyor ve seri tonlarından yalnız 700 orada grafik eşiğini
 * geçiyor, 3.16. Altta "bu hafta": yedi nokta, çalışılan gün dolu.
 *
 * Veri gelmeden de AYNI kabuk çiziliyor (iskelet çubukları beyaz %25): sıfır
 * seri, yükleniyor demek değil — 40 günlük seriyi bir an "0" göstermek yok.
 */
function StreakHero({ streak, longest, days, today, colors }: { streak: number | null; longest: number; days: { day: string; reviews: number }[]; today: string; colors: Palette }) {
  const byDay = new Map(days.map((d) => [d.day, d.reviews]));
  const week = weekDays(today, (d) => (byDay.get(d) ?? 0) > 0);
  const studied = week.filter((d) => d.studied).length;
  const names = weekdayNames();
  const ready = streak !== null;
  return (
    <View style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, overflow: "hidden" }, softShadow(colors.primary, 14)]}>
      <View style={{ padding: spacing.xl, flexDirection: "row", alignItems: "center", gap: spacing.lg }}>
        <View style={{ width: ds(64), height: ds(64), borderRadius: radii.lg, backgroundColor: "#ffffff2e", alignItems: "center", justifyContent: "center" }}>
          <StreakIcon color={colors.streakInk} size={34} />
        </View>
        <View style={{ flex: 1 }}>
          {ready ? (
            <>
              <Text variant="display" color={colors.onPrimary}>{formatNumber(streak)}</Text>
              <Text variant="bodyStrong" color={colors.onPrimary}>{t("progress.day_streak")}</Text>
              {/* EN UZUN SERİ: bugünkü sayı ancak kendi rekoruyla kıyaslanınca bir şey söylüyor. */}
              {longest ? <Text variant="caption" color={colors.onPrimaryMuted}>{t("progress.longest_streak", { n: formatNumber(longest) })}</Text> : null}
            </>
          ) : (
            <>
              <HeroLine variant="display" width={64} />
              <HeroLine variant="bodyStrong" width={112} />
              <HeroLine variant="caption" width={140} />
            </>
          )}
        </View>
      </View>
      <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.lg }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.sm }}>
          {ready ? (
            <>
              <Text variant="micro" color={colors.onPrimaryMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{t("progress.this_week").toLocaleUpperCase(dateLocale())}</Text>
              <Text variant="micro" color={colors.onPrimaryMuted}>{t("progress.week_days", { n: studied })}</Text>
            </>
          ) : (
            <>
              <HeroLine variant="micro" width={70} />
              <HeroLine variant="micro" width={50} />
            </>
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: spacing.xs }}>
          {week.map((d) => (
            <View key={d.day} style={{ flex: 1, alignItems: "center", gap: spacing.xs }}>
              <View
                accessible
                accessibilityLabel={`${formatDay(d.day)}: ${d.studied ? t("progress.studied") : t("progress.no_study")}`}
                style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: ready && d.studied ? "#ffffff" : d.future ? "transparent" : "#ffffff40", borderWidth: d.future ? 1 : 0, borderColor: "#ffffff66" }}
              />
              <Text variant="micro" color={d.day === today ? colors.onPrimary : colors.onPrimaryMuted}>{names[d.weekday]}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

/**
 * Gelişim — header'daki seri rozetine ve Profil'in "Gelişim" bölümüne
 * dokununca açılır. Bölüm sırası web `ActivityProgress` ile birebir: seri
 * kahramanı (bu hafta) → Nasıl gidiyorum → dört karo → kelime ustalığı +
 * seviye → tekrar kuyruğu → son iki hafta → zayıf noktalar → zaman içinde →
 * Neler yapabilirim / Yazılarım.
 */
export function ProgressScreen() {
  const { colors } = useTheme();
  const { gridColumns } = useLayout();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { me, loading } = useMe();
  const growth = useGrowth();
  const level = me?.level ?? "A1";
  const mastered = me?.mastered ?? 0;
  const totalWords = me?.totalWords ?? 0;
  const pct = totalWords ? Math.min(100, Math.round((mastered / totalWords) * 100)) : 0;
  const today = todayStr();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("progress.progress")} />

      {/*
        OKUMA PATLADIYSA İSKELET DEĞİL HATA. `me` null kalınca bütün kartlar
        SONSUZA KADAR iskelet çiziyordu. Web'in aynı sayfası aynı kartı
        çiziyor (§321). Yeniden deneme `bumpStats()` ile: `useMe` o işareti
        dinliyor.
      */}
      {!loading && !me ? (
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
          <EmptyCard
            live="assertive"
            icon={StreakIcon}
            tint={colors.streak}
            title={t("progress.load_failed")}
            text={t("social.err_offline")}
            action={t("common.try_again")}
            onAction={() => bumpStats()}
          />
        </View>
      ) : (
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.xl }} showsVerticalScrollIndicator={false}>
        <StreakHero streak={me ? me.streak : null} longest={me?.longestStreak ?? 0} days={me?.days ?? []} today={today} colors={colors} />

        <View>
          <HowAmIDoingHead data={growth} />
          <HowAmIDoing data={growth} />
        </View>

        {/* Dört karo — web `KpiCard` ile aynı ikonlar ve dolgular (500). */}
        {me ? (
          <CardGrid columns={gridColumns} balance stretch>
            <Stat icon={MyWordsIcon} value={formatNumber(mastered)} label={t("progress.words_learned")} fill={fillOf("primary")} colors={colors} />
            <Stat icon={XpIcon} value={formatXp(me.xp)} label={t("progress.total_xp")} fill={fillOf("success")} colors={colors} />
            <Stat icon={DurationIcon} value={formatDuration(me.seconds)} label={t("progress.time_total")} fill={fillOf("info")} colors={colors} />
            <Stat icon={LevelIcon} value={level} label={t("progress.level")} fill={fillOf("accent")} colors={colors} />
          </CardGrid>
        ) : (
          <CardGrid columns={gridColumns} balance>
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} style={{ gap: 2 }}>
                <SkeletonTile size={40} style={{ marginBottom: spacing.sm }} />
                <SkeletonLine variant="h2" width="55%" />
                <SkeletonLine variant="caption" width="85%" />
              </SkeletonCard>
            ))}
          </CardGrid>
        )}

        {/*
          KELİME USTALIĞI + SEVİYE KIRILIMI tek kart ve kart DOKUNULABİLİR:
          Kelimeler'e götürüyor. Seviye satırları (`/api/me` `levels`) web'de
          de artık aynı kartta.
        */}
        {me ? (
          <PressableScale onPress={() => nav.navigate("Words")} accessibilityLabel={t("profile.my_words")}>
            <Card padded>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
                <Text variant="h3">{t("progress.word_mastery")}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Text variant="caption" color={colors.textMuted}>{formatNumber(mastered)}/{totalWords ? formatNumber(totalWords) : "—"}</Text>
                  <ChevronNextIcon color={colors.textFaint} size={18} />
                </View>
              </View>
              <Bar pct={pct} tint={colors.success} size="hero" />
              {me.levels?.length ? (
                <View style={{ marginTop: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
                  <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.sm, letterSpacing: 1 }}>{t("progress.by_level").toLocaleUpperCase(dateLocale())}</Text>
                  <View style={{ gap: spacing.md }}>
                    {me.levels.map((lv) => {
                      const seenPct = lv.total ? Math.round((100 * lv.seen) / lv.total) : 0;
                      const mastPct = lv.total ? Math.round((100 * lv.mastered) / lv.total) : 0;
                      return (
                        <View key={lv.niveau}>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                            <Text variant="bodyStrong">{lv.niveau}</Text>
                            <Text variant="caption" color={colors.textMuted}>{t("progress.seen_of_total", { seen: formatNumber(lv.seen), total: formatNumber(lv.total), mastered: formatNumber(lv.mastered) })}</Text>
                          </View>
                          {/* Koyu bölüm pekişmiş, açık bölüm görülmüş — web ile aynı okuma; renk seviyenin kendisi. */}
                          <Bar pct={mastPct} tint={levelTint(lv.niveau, colors)} extra={{ pct: Math.max(0, seenPct - mastPct), tint: levelTint(lv.niveau, colors) + "66" }} />
                        </View>
                      );
                    })}
                  </View>
                  <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>
                    {t("progress.bar_note", {
                      seen: formatNumber(me.levels.reduce((a, l) => a + l.seen, 0)),
                      total: formatNumber(me.levels.reduce((a, l) => a + l.total, 0)),
                      days: MASTERED_DAYS,
                    })}
                  </Text>
                </View>
              ) : null}
            </Card>
          </PressableScale>
        ) : (
          <SkeletonCard>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
              <SkeletonLine variant="h3" width={130} />
              <SkeletonLine variant="caption" width={62} />
            </View>
            <SkeletonBar height={BAR_HEIGHT.hero} />
            <View style={{ marginTop: spacing.lg, paddingTop: spacing.md, gap: spacing.md }}>
              <SkeletonLine variant="micro" width={90} />
              {[0, 1, 2, 3, 4].map((i) => (
                <View key={i} style={{ gap: 6 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <SkeletonLine variant="bodyStrong" width={28} />
                    <SkeletonLine variant="caption" width={140} />
                  </View>
                  <SkeletonBar height={BAR_HEIGHT.inline} />
                </View>
              ))}
            </View>
          </SkeletonCard>
        )}

        {/* TEKRAR KUYRUĞU — web aynı kartı çiziyor (üç satır). */}
        {me ? (
          <Card padded style={{ gap: 2 }}>
            <Text accessibilityRole="header" variant="h3" style={{ marginBottom: spacing.xs }}>{t("progress.review_queue")}</Text>
            <Text variant="body" color={colors.text}>{t("progress.due_now", { n: me.dueCount ?? 0 })}</Text>
            <Text variant="body" color={colors.textMuted}>{t("progress.upcoming", { n: me.upcoming ?? 0 })}</Text>
            {me.leeches ? <Text variant="body" color={colors.dangerText}>{t("progress.leeches", { n: me.leeches })}</Text> : null}
          </Card>
        ) : (
          <SkeletonCard style={{ gap: 2 }}>
            <SkeletonLine variant="h3" width={120} style={{ marginBottom: spacing.xs }} />
            <SkeletonLine variant="body" width="45%" />
            <SkeletonLine variant="body" width="55%" />
          </SkeletonCard>
        )}

        {/* Şerit `/api/me` ile geliyor: yüklenirken yeri tutuluyor, yoksa
            sonradan araya girip zayıf noktaları ve gidişatı ~115 dp itiyordu
            (QA F-0070 sınıfı). Kart kalıbı `ActivityStrip`in aynısı. */}
        {me?.days ? <ActivityStrip rows={me.days} today={today} colors={colors} /> : !me && loading ? (
          <SkeletonCard label={t("common.loading")}>
            <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.md, marginBottom: spacing.sm }}>
              <SkeletonText variant="h3" text={t("progress.last_two_weeks")} />
              <SkeletonLine variant="caption" width={110} />
            </View>
            <Skeleton height={44} radius={3} />
            <SkeletonLine variant="micro" style={{ marginTop: 6 }} />
          </SkeletonCard>
        ) : null}

        {/* ZAYIF NOKTALAR kendi kartında (web aynı). */}
        <WeakSpots />

        <GrowthTrends data={growth} />

        {/* KENDİ ÖLÇÜN: yeterlik ve değerlendirilmiş üretimin arşivi. */}
        <Card padded style={{ paddingVertical: 0 }}>
          <MenuRow icon={CorrectIcon} label={t("profile.what_can_i_do")} tint={colors.success} colors={colors} onPress={() => nav.navigate("Cando")} />
          <MenuRow icon={MyWritingsIcon} label={t("profile.my_posts")} tint={colors.info} colors={colors} onPress={() => nav.navigate("Writings")} last />
        </Card>
      </ScrollView>
      )}
    </View>
  );
}
