import React from "react";
import { MASTERED_DAYS } from "../lib/learningRules";
import { t, dateLocale, formatNumber } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { MenuRow } from "../ui/MenuRow";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, BoltIcon, CheckIcon, ChevronRightIcon, FlameIcon, LearnIcon, PodiumIcon, TrophyIcon, WriteIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { WeakSpots } from "../ui/WeakSpots";
import { GrowthPanel } from "../ui/GrowthPanel";
import { SkeletonBar, SkeletonCard, SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { useMe, formatXp, formatDuration } from "../lib/useMe";
import { useTheme, spacing, radii, softShadow, onTint, type Palette } from "../theme";
import { todayStr } from "../game/session";
import { useLayout } from "../lib/useLayout";

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
 * Gün kısaltmaları yerelden üretiliyor; hafta pazartesiyle başlıyor
 * (2024-01-01 bir pazartesi). İki harf, tek harf değil: tek harfle şerit
 * "P C C P P S Ç" oluyor ve Pazartesi/Perşembe/Pazar aynı harfe düşüyor.
 */
function weekdayNames(): string[] {
  const fmt = new Intl.DateTimeFormat(dateLocale(), { weekday: "short" });
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2024, 0, 1 + i))));
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
  const names = weekdayNames();

  return (
    <Card padded style={{ marginBottom: spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.md, marginBottom: spacing.sm }}>
        <Text variant="bodyStrong">{t("progress.last_two_weeks")}</Text>
        <Text variant="micro" color={colors.textMuted}>
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
            <View key={d.day} accessibilityLabel={`${d.day}: ${label}`} style={{ flex: 1, height: `${pct}%`, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
              <View style={{ flex: 1, backgroundColor: colors.primary, opacity: mix / 100 }} />
            </View>
          ) : (
            <View key={d.day} accessibilityLabel={`${d.day}: ${label}`} style={{ flex: 1, height: 3, borderRadius: 3, backgroundColor: colors.surface2 }} />
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

function Stat({ icon: Icon, value, label, tint, colors }: { icon: (p: { color: string; size: number }) => React.ReactElement; value: string; label: string; tint: string; colors: Palette }) {
  const { gridItemWidth } = useLayout();
  return (
    <Card padded style={{ width: gridItemWidth, gap: 6 }}>
      <View style={{ width: 38, height: 38, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint + "22" }}>
        <Icon color={onTint(tint, colors)} size={20} />
      </View>
      <Text variant="h1" color={colors.text}>{value}</Text>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
    </Card>
  );
}

/**
 * Gelişim — header'daki seri rozetine dokununca açılır (profil yerine, daha
 * mantıklı). Seri, XP, öğrenilen kelime, süre, seviye ilerlemesi; başarımlara giriş.
 */
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

export function ProgressScreen() {
  const { colors } = useTheme();
  const { gridItemWidth } = useLayout();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { me } = useMe();
  const level = me?.level ?? "A1";
  const mastered = me?.mastered ?? 0;
  const totalWords = me?.totalWords ?? 0;
  const pct = totalWords ? Math.min(100, Math.round((mastered / totalWords) * 100)) : 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{t("progress.progress")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* seri kahramanı */}
        {/* ZEMİN `streakDeep`. Ölçüm: beyaz yazı `streak` üstünde açık temada 2.88,
            koyu temada 1.94 - AA'nın büyük yazı eşiği 3.0'ı bile tutmuyor. Koyu
            kehribarda 5.20. Web'in aynı kartı da 500'den 600'e indi. */}
        <View style={[{ borderRadius: radii.xl, backgroundColor: colors.streakDeep, padding: spacing.xl, flexDirection: "row", alignItems: "center", gap: spacing.lg, marginTop: spacing.sm, marginBottom: spacing.lg }, softShadow(colors.streakDeep, 12)]}>
          <View style={{ width: 64, height: 64, borderRadius: radii.lg, backgroundColor: "#ffffff2e", alignItems: "center", justifyContent: "center" }}>
            <FlameIcon color="#fff" size={34} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="display" color="#fff">{me?.streak ?? 0}</Text>
            <Text variant="bodyStrong" color="#fff">{t("progress.day_streak")}</Text>
            {/*
              EN UZUN SERİ. Sunucu bunu zaten gönderiyor (`/api/me`) ve BAŞKASININ
              profilinde görünüyordu (herkese açık profil satırı), ama kendi
              ekranında hiç yoktu. Bugünkü sayı ancak kendi rekoruyla kıyaslanınca
              bir şey söylüyor.
            */}
            {me?.longestStreak ? (
              <Text variant="caption" color="#ffffffe6">{t("progress.longest_streak", { n: me.longestStreak })}</Text>
            ) : null}
          </View>
          <Mascot mood={(me?.streak ?? 0) > 0 ? "happy" : "idle"} size={58} />
        </View>

        {/* istatistik ızgarası */}
        {me ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            <Stat icon={LearnIcon} value={String(mastered)} label={t("progress.words_learned")} tint={colors.primary} colors={colors} />
            <Stat icon={BoltIcon} value={formatXp(me.xp)} label={t("progress.total_xp")} tint={colors.success} colors={colors} />
            <Stat icon={PodiumIcon} value={formatDuration(me.seconds)} label={t("progress.time_total")} tint={colors.info} colors={colors} />
            <Stat icon={TrophyIcon} value={level} label={t("progress.level")} tint={colors.accent} colors={colors} />
          </View>
        ) : (
          // Izgaranın kendi iskeleti (tek satırlık "yükleniyor" kartı yerine):
          // dört karo gelince ekran iki satır boyu uzamasın.
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} style={{ width: gridItemWidth, gap: 6 }}>
                <SkeletonTile size={38} />
                <SkeletonLine variant="h1" width="55%" />
                <SkeletonLine variant="caption" width="85%" />
              </SkeletonCard>
            ))}
          </View>
        )}

        {/*
          Seviye ilerlemesi. Kart artık DOKUNULABİLİR: "Kelimelerim" profilin
          menüsünde ayrı bir satırdı, oysa bu kartın detayından başka bir şey
          değil. Kart hedefsiz duruyordu, satır da bağlamsızdı; ikisi birleşti.
        */}
        {me ? (
          <PressableScale onPress={() => nav.navigate("Words")} accessibilityLabel={t("profile.my_words")}>
            <Card style={{ marginBottom: spacing.lg }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
                <Text variant="bodyStrong">{t("progress.word_mastery")}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  {/* Sayilar yerelden: bin ayraci Turkcede nokta, Ingilizcede virgul.
                      Ayni dosyada baska alti yerde `formatNumber` geciyor, yalniz
                      bu satir atlanmisti; web karti bastan beri bicimliyor. */}
                  <Text variant="caption" color={colors.textMuted}>{formatNumber(mastered)}/{totalWords ? formatNumber(totalWords) : "—"}</Text>
                  <ChevronRightIcon color={colors.textFaint} size={18} />
                </View>
              </View>
              <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
                <View style={{ height: "100%", width: `${Math.max(3, pct)}%`, backgroundColor: colors.success, borderRadius: 4 }} />
              </View>
            </Card>
          </PressableScale>
        ) : (
          <SkeletonCard style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
              <SkeletonLine variant="bodyStrong" width={130} />
              <SkeletonLine variant="caption" width={62} />
            </View>
            <SkeletonBar height={8} />
          </SkeletonCard>
        )}

        {/*
          KENDİ ÖLÇÜN BURADA. Profilden taşınan iki satır: yeterlik
          (Yapabildiklerim) ve değerlendirilmiş üretimin arşivi (Yazılarım).
          İkisi de yalnız sana ait ölçüler, yani kimlik değil ilerleme.

          Başarımlar buradan KALDIRILDI: rozet sayısı herkese açık profilde
          görünüyor, yani statü işareti — yeri profil. Aynı ekrana iki giriş
          olmasın diye kart değil satır kaldı.
        */}
        {/*
          SEVİYE KIRILIMI VE TEKRAR KUYRUĞU. Üçü de `/api/me` yanıtında
          geliyor (sunucu `getProgress` içinde zaten hesaplıyor, ek sorgu
          yok) ve mobil hiçbirini göstermiyordu: "hangi seviyede kaç kelime",
          "kaçı ileri tarihe planlandı", "kaçında zorlanıyorum" sorularının
          hiçbiri cevaplanmıyordu. Web ilerleme sayfası üçünü de gösteriyor.
        */}
        {me?.levels?.length ? (
          <Card padded style={{ marginBottom: spacing.lg }}>
            <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t("progress.by_level").toLocaleUpperCase(dateLocale())}</Text>
            {me.levels.map((lv) => {
              const seenPct = lv.total ? Math.round((100 * lv.seen) / lv.total) : 0;
              const mastPct = lv.total ? Math.round((100 * lv.mastered) / lv.total) : 0;
              return (
                <View key={lv.niveau} style={{ marginBottom: spacing.sm }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text variant="caption" color={colors.text}>{lv.niveau}</Text>
                    <Text variant="micro" color={colors.textMuted}>{t("progress.seen_of_total", { seen: formatNumber(lv.seen), total: formatNumber(lv.total), mastered: formatNumber(lv.mastered) })}</Text>
                  </View>
                  {/* Koyu bölüm pekişmiş, açık bölüm görülmüş — web ile aynı okuma.
                      RENK SEVİYENİN KENDİSİ: paletin kendi yorumunda yazılı olan
                      eşleme (mint=A1, sky=A2, violet=B1, brand=B2, rose=C1) burada
                      kullanılmıyordu, beş seviye de yeşil çiziliyordu; web her
                      seviyeyi kendi rengiyle çiziyor (`progress-view`). */}
                  <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginTop: 4, flexDirection: "row" }}>
                    <View style={{ width: `${mastPct}%`, backgroundColor: levelTint(lv.niveau, colors) }} />
                    <View style={{ width: `${Math.max(0, seenPct - mastPct)}%`, backgroundColor: levelTint(lv.niveau, colors) + "66" }} />
                  </View>
                </View>
              );
            })}
            {/* Şeridin iki tonu ne demek — web aynı notu taşıyor. */}
            <Text variant="micro" color={colors.textMuted} style={{ marginTop: 4 }}>
              {t("progress.bar_note", {
                seen: formatNumber(me.levels.reduce((a, l) => a + l.seen, 0)),
                total: formatNumber(me.levels.reduce((a, l) => a + l.total, 0)),
                days: MASTERED_DAYS,
              })}
            </Text>
          </Card>
        ) : null}

        {me ? (
          <Card padded style={{ marginBottom: spacing.lg, gap: 4 }}>
            <Text variant="micro" color={colors.textMuted} style={{ marginBottom: 2 }}>{t("progress.review_queue").toLocaleUpperCase(dateLocale())}</Text>
            <Text variant="caption" color={colors.text}>{t("progress.due_now", { n: me.dueCount ?? 0 })}</Text>
            <Text variant="caption" color={colors.textMuted}>{t("progress.upcoming", { n: me.upcoming ?? 0 })}</Text>
            {me.leeches ? <Text variant="caption" color={colors.dangerText}>{t("progress.leeches", { n: me.leeches })}</Text> : null}
          </Card>
        ) : null}

        {me?.days ? <ActivityStrip rows={me.days} today={todayStr()} colors={colors} /> : null}

        {/* ZAYIF NOKTALAR. Uç ve rapor katmanı aylardır duruyordu, web
            profilinde bir kart onu okuyordu, mobilde çağıran hiçbir şey yoktu.
            Yeri web ile aynı: gelişim kutusunun içinde (`progress-panel`). */}
        {/* Ölçüm bloğu web ile aynı sırada: önce "neredeyim + ne yapmalıyım",
            sonra "neyi yanlış yapıyorum" (`progress-panel` içinde de
            `WeakSpotsCard` panelin altında duruyor). */}
        <GrowthPanel />
        <WeakSpots />

        <Card padded style={{ paddingVertical: 0 }}>
          <MenuRow icon={CheckIcon} label={t("profile.what_can_i_do")} tint={colors.success} colors={colors} onPress={() => nav.navigate("Cando")} />
          <MenuRow icon={WriteIcon} label={t("profile.my_posts")} tint={colors.info} colors={colors} onPress={() => nav.navigate("Writings")} last />
        </Card>
      </ScrollView>
    </View>
  );
}
