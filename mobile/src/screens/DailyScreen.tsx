import React, { useEffect, useRef, useState } from "react";
import { t, formatNumber } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, FlameIcon, BoltIcon, ShareIcon } from "../ui/icons";
import { RoundView } from "../game/rounds";
import { Celebrate } from "../ui/Celebrate";
import { fetchDaily, submitDaily, scoreAnswer, type DailyBoardRow } from "../game/daily";
import type { Round } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { useTheme, spacing, radii, softShadow, TIER_COLOR, type Palette } from "../theme";
import { sfx } from "../lib/sfx";
import { bumpStats } from "../lib/statsSignal";
import { shareRoundResult } from "../lib/share";

/* AYNI DURUMUN TEK ADI. Bu ekran "play" yazıyordu, web karşılığı ve mobilin
   kendi öteki oynatıcıları (`BossScreen`, `ChallengeScreen`) "playing" —
   aynı durumun iki adı, aynı uygulamanın içinde. Sürtünme görünmezdi ama
   maliyeti gerçek: platformlar arası ölçüler aşama adını okuyor ve bu turda
   biri tam bu yüzden kırıldı (§106). */
type Phase = "loading" | "auth" | "error" | "ready" | "playing" | "submitting" | "done" | "empty";

/**
 * İlk üçün madalya rengi — ortak kademe ölçeğinden (`TIER_COLOR`).
 *
 * Üç değer burada elle yazılıydı ve rozet ekranındakilerle AYRIŞMIŞTI: gümüş
 * #9aa3ad (mavi-gri, sıcak paletin içinde tek başına soğuk duruyordu) ve
 * bronz #b08d57. Aynı çakışma rozet ekranında düzeltilmişti ama burası
 * gözden kaçmıştı - tek uygulamada iki ayrı bronz/gümüş/altın ölçeği vardı.
 *
 * Dördüncü ve sonrası madalyasız: rengi `null` dönüyor, çizim düz soluk
 * numaraya düşüyor.
 */
function medalColor(rank: number): string | null {
  return rank === 1 ? TIER_COLOR.gold : rank === 2 ? TIER_COLOR.silver : rank === 3 ? TIER_COLOR.bronze : null;
}

function Board({ rows, colors }: { rows: DailyBoardRow[]; colors: Palette }) {
  if (!rows.length) return <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.lg }}>{t("daily.be_first_to_play_today")}</Text>;
  return (
    <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
      {/* TEK SATIR: tabloda yalnız kendisi olan kullanıcı "kimse oynamamış"
          sanıyordu. Sebebini söylemek gerekiyor - tablo gün ilerledikçe
          doluyor. Web aynı notu aynı koşulda gösteriyor (`daily-player`). */}
      {rows.length === 1 ? (
        <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center" }}>{t("daily.first_today")}</Text>
      ) : null}
      {rows.map((r) => {
        const mc = medalColor(r.rank);
        const initial = ((r.name ?? "?").trim()[0] ?? "?").toUpperCase();
        return (
          <View key={`${r.rank}-${r.name}`} style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: 11, backgroundColor: r.isMe ? colors.primarySoft : colors.surface, borderWidth: 1, borderColor: r.isMe ? colors.primary : colors.hairline }, mc ? softShadow(mc, 4) : {}]}>
            {/*
              İLK ÜÇ DOLU DAİRE, GERİSİ DÜZ NUMARA.
              Numara madalya rengiyle YAZILIYORDU ve açık temada üçü de
              okunmuyordu - ölçüm beyaz kart üstünde altın 2.88, gümüş 2.56,
              bronz 3.09; normal yazı eşiği 4.5. Hue'yu koruyup koyulaştırmak
              çözmüyor: okunabilir bir gümüş (#7b746a) madalyasız sıralamanın
              soluk tonundan (#7c6c5d) ayırt edilemiyor, yani ikinci sıra
              dördüncüyle aynı görünürdü.
              Uygulamanın kendi dili dolu zemin + beyaz içerik (seviye rozeti,
              başarı rozeti) ve o ölçekte üçü de eşiği geçiyor (4.44 / 3.79 /
              3.62; büyük-kalın yazı ve grafik eşiği 3.0).
            */}
            <View style={{ width: 26, alignItems: "center" }}>
              {mc ? (
                <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: mc }}>
                  <Text variant="bodyStrong" color="#fff">{r.rank}</Text>
                </View>
              ) : (
                <Text variant="h3" color={colors.textMuted}>{r.rank}</Text>
              )}
            </View>
            <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: r.isMe ? colors.primary : colors.surface2 }}>
              <Text variant="bodyStrong" color={r.isMe ? colors.onPrimary : colors.textMuted}>{initial}</Text>
            </View>
            <View style={{ flex: 1 }}>
              {/* AD TEK SATIRDA. Görünen ad kırk karaktere kadar olabiliyor ve
                  sıralama satırında ikinci satıra düşüp satırı büyütüyordu:
                  madalyalar ve puanlar hizadan çıkıyor, liste dalgalanıyordu.
                  Web aynı satırda kırpıyor (`daily-player` `min-w-0 truncate`). */}
              <Text numberOfLines={1} variant="bodyStrong" color={r.isMe ? colors.primaryText : colors.text}>{r.name ?? t("social.student")}{r.isMe ? t("social.you_paren") : ""}</Text>
              <Text variant="micro" color={colors.textMuted}>{t("common.n_correct", { correct: r.correct, total: r.total })}</Text>
            </View>
            {/* Sayi BICIMLEYICIDEN: burada `toLocaleString` dogrudan cagriliyordu,
                yani ortak `formatNumber`in yuvarlamasini atliyordu. Uygulamada
                sayi bicimleyen tek yer o (web karsiligi `formatNumber`). */}
            <Text variant="h3" color={r.isMe ? colors.primaryText : colors.text}>{formatNumber(r.score)}</Text>
          </View>
        );
      })}
    </View>
  );
}

export function DailyScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [phase, setPhase] = useState<Phase>("loading");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [idx, setIdx] = useState(0);
  const doneGuard = useRef(-1);
  const [board, setBoard] = useState<DailyBoardRow[]>([]);
  /*
    KAZANILAN XP. Sunucu her gonderimde `xpGained` donduruyor (yalniz ILK
    kayitta dolu; tekrar gonderilen sonuc puana da yazilmiyor) ve web sonuc
    kartinda "+N XP" diye gosteriyor (`daily-player`). Mobil bu alani hic
    okumuyordu: ayni tur, ayni sunucu cevabi, bir platformda kazanc gorunuyor
    otekinde gorunmuyordu.
  */
  const [xpGained, setXpGained] = useState(0);
  const [scoreView, setScoreView] = useState(0);
  const [comboView, setComboView] = useState(0);

  const day = useRef("");
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const correctRef = useRef(0);
  const totalRef = useRef(0);
  /* Paylasim deseni icin tur basina dogru/yanlis dizisi - web `daily-player`
     `marks` ile ayni. Cizilen sey sayilar degil DESEN. */
  const marksRef = useRef<boolean[]>([]);
  /* Paylasim metninin basligindaki seviye; yukun kendisinden geliyor
     (web `data.level`). */
  const levelRef = useRef("A1");
  const roundStart = useRef(0);
  const startedAt = useRef(0);
  const submitted = useRef(false);

  async function load() {
    setPhase("loading");
    try {
      const p = await fetchDaily();
      day.current = p.day;
      levelRef.current = p.level || "A1";
      setBoard(p.board ?? []);
      if (p.played) {
        // Bugün oynanmış: sonucu + tabloyu göster (günde tek hak).
        scoreRef.current = p.played.score;
        correctRef.current = p.played.correct;
        totalRef.current = p.played.total;
        bestComboRef.current = p.played.bestCombo;
        setPhase("done");
        return;
      }
      const list = p.rounds ?? [];
      /*
       * BOŞ HAVUZ "OYNADIN" DEĞİL. Tur kurulamadığında ekran `done`a düşüyor
       * ve kullanıcıya 0/0 puanla "bugünkü turun bitti" diyordu: oynamadığı
       * bir turdan sıfır aldığını sanıyor. Sebep ayrı ve söylenebilir -
       * seviyedeki kelime havuzu turu kurmaya yetmiyor. Web bunu ayrı bir
       * durum olarak taşıyor (`status === "empty"`).
       */
      if (!list.length) { setPhase("empty"); return; }
      setRounds(list);
      totalRef.current = list.length;
      setIdx(0);
      /*
       * TANITIM EKRANI — web `daily-player` `status === "ready"`.
       *
       * Android turu DOĞRUDAN başlatıyordu: kullanıcı ne oynayacağını, kaç
       * soru olduğunu, tek hak olduğunu ve herkesin aynı turu oynadığını
       * hiçbir yerde okumadan ilk sorunun içinde buluyordu. Haftalık sınavda
       * mobilin kendi düzeni zaten böyle (`WeeklyScreen` `ready`), günlük tur
       * tek istisnaydı. `session_start` de artık BAŞLA'ya basınca yazılıyor:
       * eskiden ekranı açan herkes "başladı" sayılıyordu ve huninin ilk
       * adımı olduğundan büyük görünüyordu.
       */
      setPhase("ready");
    } catch (e) {
      setPhase(e instanceof ApiError && e.status === 401 ? "auth" : "error");
    }
  }
  useEffect(() => { load(); }, []);

  function onDone(ok: boolean) {
    if (doneGuard.current === idx) return; // çift "Devam" koruması
    doneGuard.current = idx;
    const lat = Math.max(0, Date.now() - roundStart.current);
    const running = ok ? comboRef.current + 1 : 0;
    scoreRef.current += scoreAnswer(ok, lat, running);
    comboRef.current = running;
    if (running > bestComboRef.current) bestComboRef.current = running;
    if (ok) correctRef.current += 1;
    marksRef.current.push(ok);
    setScoreView(scoreRef.current);
    setComboView(running);
    roundStart.current = Date.now();
    const next = idx + 1;
    if (next >= rounds.length) void finish();
    else setIdx(next);
  }

  async function finish() {
    if (submitted.current) return;
    submitted.current = true;
    setPhase("submitting");
    track("session_done", correctRef.current, "daily");
    if (rounds.length > 0) sfx("finish"); // tamamlanma sesi
    bumpStats(); // günün turu bitti
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    try {
      const res = await submitDaily({ day: day.current, correct: correctRef.current, score: scoreRef.current, bestCombo: bestComboRef.current, seconds: secs });
      setBoard(res.board ?? []);
      setXpGained(res.xpGained ?? 0);
    } catch { /* tablo eskisiyle kalır */ }
    setPhase("done");
  }

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  if (phase === "loading" || phase === "submitting") return <RoundSkeleton />;

  if (phase === "auth") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="display" style={{ textAlign: "center" }}>{t("daily.sign_in_for_daily_round")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, marginBottom: spacing.xxl }}>{t("daily.play_same_round_as_everyone_and")}</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Auth"); }} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="h3" color={colors.onPrimary}>{t("daily.sign_in_sign_up")}</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "ready") {
    return (
      <View style={pad}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingBottom: spacing.xl }}>
          <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{t("daily.daily_round")}</Text>
          <Text accessibilityRole="header" variant="h1" style={{ textAlign: "center", marginTop: 2 }}>{t("daily.same_words")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>{t("daily.pitch", { n: rounds.length })}</Text>
          <PressableScale
            onPress={() => { startedAt.current = Date.now(); roundStart.current = Date.now(); track("session_start", 0, "daily"); setPhase("playing"); }}
            style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.xxl }, softShadow(colors.primary, 10)]}
          >
            <Text variant="h3" color={colors.onPrimary}>{t("common.start")}</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.later")}</Text></PressableScale>
          {/* Bugünün tablosu turdan ÖNCE de duruyor: web aynı kartın altında
              gösteriyor ve "kime yetişiyorum" sorusu oynamaya iten şeyin
              kendisi. Tek satırsa (yalnız kendisi) çizilmiyor. */}
          {board.length > 1 ? (
            <View style={{ marginTop: spacing.xxl }}>
              <Text variant="h3" style={{ marginBottom: 2 }}>{t("daily.today_s_ranking")}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("daily.players_at_your_level")}</Text>
              <Board rows={board} colors={colors} />
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }

  if (phase === "empty") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>{t("daily.none_title")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm }}>{t("daily.none_sub")}</Text>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.xl }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View accessibilityLiveRegion="assertive" style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>{t("daily.couldn_t_load_daily_round")}</Text>
        <PressableScale onPress={load} style={[{ marginTop: spacing.xl, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, paddingHorizontal: spacing.xxl, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="h3" color={colors.onPrimary}>{t("daily.try_again")}</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "done") {
    const total = totalRef.current;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <Celebrate show />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
          <Text variant="h2">{t("daily.daily_round")}</Text>
          <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          <View style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: spacing.xl, alignItems: "center", marginTop: spacing.sm }, softShadow(colors.primary, 12)]}>
            <Text variant="micro" color={colors.onPrimaryMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{t("daily.your_score")}</Text>
            {/* TURUN SONUCU DUYURULUYOR - web `daily-player` ile ayni yer. */}
            <Text accessibilityLiveRegion="polite" variant="display" color={colors.onPrimary} style={{ fontSize: 52, marginTop: spacing.xs }}>{formatNumber(scoreRef.current)}</Text>
            <View style={{ flexDirection: "row", gap: spacing.xl, marginTop: spacing.md }}>
              <View style={{ alignItems: "center" }}><Text variant="h3" color={colors.onPrimary}>{correctRef.current}/{total}</Text><Text variant="micro" color={colors.onPrimaryMuted}>{t("daily.correct")}</Text></View>
              <View style={{ alignItems: "center" }}><View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs }}><FlameIcon color={colors.onPrimary} size={18} /><Text variant="h3" color={colors.onPrimary}>{bestComboRef.current}</Text></View><Text variant="micro" color={colors.onPrimaryMuted}>{t("daily.best_streak")}</Text></View>
            </View>
            {/* KAZANILAN XP — kahraman kartinin ICINDE, web ile ayni yer
                (`daily-player`: en iyi serinin hemen altinda) ve ayni kosul:
                yalniz kazanc varsa yaziliyor. Tekrar acilan sonucta sunucu 0
                donduruyor ve "+0 XP" yazmak yanlis olurdu. */}
            {xpGained > 0 ? (
              <Text variant="body" color={colors.onPrimaryMuted} style={{ marginTop: spacing.sm }}>+{xpGained} XP</Text>
            ) : null}
          </View>
          {/* SIRAN kaç: tablo zaten altta ama "kaçıncıyım" sorusunun cevabı
              satır satır aranmamalı. Web sonucun hemen altında söylüyor. */}
          {board.find((r) => r.isMe) ? (
            <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>
              {t("daily.your_rank_today", { rank: board.find((r) => r.isMe)!.rank })}
            </Text>
          ) : null}
          {/* Neden tekrar oynanamadığı: web aynı yerde söylüyor. */}
          <Text variant="micro" color={colors.textFaint} style={{ textAlign: "center", marginTop: spacing.sm }}>{t("daily.once_a_day")}</Text>
          <Text variant="h3" style={{ marginTop: spacing.xl, marginBottom: 2 }}>{t("daily.today_s_ranking")}</Text>
          <Text variant="caption" color={colors.textMuted}>{t("daily.players_at_your_level")}</Text>
          <Board rows={board} colors={colors} />
          {/* PAYLASIM. Web'in gunun turu sonucunda paylasim var
              (`daily-player` `ShareResult kind="daily"`), Androidde HIC
              yoktu: ayni tur bir platformda paylasilabilir, otekinde
              paylasilamazdi - ve gunun turu tam olarak paylasilmaya deger
              olan tur, cunku sorular o seviyedeki HERKESE ayni geliyor. */}
          {totalRef.current > 0 && (
            <PressableScale
              onPress={() => void shareRoundResult({
                marks: marksRef.current,
                total: totalRef.current,
                accuracy: totalRef.current ? Math.round((correctRef.current / totalRef.current) * 100) : 0,
                streak: 0,
                level: levelRef.current,
                kind: "daily",
                score: scoreRef.current,
              })}
              style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: spacing.sm, marginTop: spacing.xl, borderWidth: 1.5, borderColor: colors.border }}
            >
              <ShareIcon color={colors.text} size={19} /><Text variant="bodyStrong" color={colors.text}>{t("common.share")}</Text>
            </PressableScale>
          )}
          <PressableScale onPress={() => nav.goBack()} style={[{ marginTop: spacing.md, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="bodyStrong" color={colors.onPrimary}>{t("common.finish")}</Text></PressableScale>
        </ScrollView>
      </View>
    );
  }

  // play
  return (
    <View style={pad}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((idx / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {comboView >= 3 && <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}><FlameIcon color={colors.streakText} size={15} /><Text variant="bodyStrong" color={colors.streakText}>{comboView}</Text></View>}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}><BoltIcon color={colors.primaryText} size={15} /><Text variant="bodyStrong" color={colors.primaryText}>{formatNumber(scoreView)}</Text></View>
        </View>
      </View>
      <RoundView key={rounds[idx]?.id ?? idx} round={rounds[idx]} onDone={onDone} />
    </View>
  );
}
