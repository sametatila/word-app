import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ScrollView, Animated, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t, formatPercent } from "../lib/i18n";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { Card } from "../ui/Card";
import { FlameIcon, SparkIcon, AlertIcon, XIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { RoundView } from "../game/rounds";
import { submitAnswers, todayStr, type AnswerOut, type DoneExtra, type Round } from "../game/session";
import { api } from "../api/client";
import { sfx } from "../lib/sfx";
import { haptic } from "../lib/haptics";
import { bumpStats } from "../lib/statsSignal";
import { reduceMotion } from "../lib/reduceMotion";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/**
 * HAYATTA KALMA TURU — web `components/challenge-player` karşılığı.
 *
 * Sabit süreli bir "kaç doğru yaparsın" turu değil: süre doğru cevapla
 * kazanılıyor, yanlışta kaybediliyor; üst üste doğrular puan çarpanını
 * büyütüyor ve sorular üç dalgada sertleşiyor.
 *
 * WEBDE VARDI, ANDROİD'DE YOKTU. Uç (`/api/challenge`) ve dalga mantığı
 * sunucuda baştan beri duruyordu; Android'de EKRAN yoktu, yani rekor tablosu
 * yalnız tarayıcıdan oynayanlarla doluyordu. Web bileşeninin kendi başlığı da
 * bunu yazıyordu ("Mobilde bu modun karşılığı YOK") - §11.25 ile aynı sınıf.
 *
 * SAYILAR WEB İLE BİREBİR: başlangıç süresi, bonus/ceza, hızlı cevap sınırı,
 * tavan, tehlike eşiği ve çarpan basamakları. İkisi ayrışırsa aynı rekor
 * tablosunda iki farklı oyun yarışır - kapı `check:parity` "hayatta kalma".
 */

/** Başlangıç süresi kısa: süreyi doğru cevaplarla kazanırsın. */
const START_SECONDS = 40;
const BONUS_MS = 2000; // doğru cevap
const FAST_BONUS_MS = 1500; // 3,5 saniyenin altında cevaplandıysa ek
const PENALTY_MS = 4000; // yanlış cevap
const FAST_LIMIT_MS = 3500;
const MAX_SECONDS = 75; // süre sonsuza uzamasın
/**
 * Sayacın kırmızıya döndüğü ve saniyede bir uyarı tıkının başladığı eşik.
 *
 * BU MOD SÜREYİ KAZANDIRIYOR, o yüzden eşik patron turundan daha dar: orada
 * süre yalnız azalıyor ve son on saniye gerçekten son on saniye.
 */
const DANGER_SECONDS = 8;

/** Üst üste doğrularda puan çarpanı — asıl heyecan burada. */
function multiplier(combo: number): number {
  if (combo >= 10) return 3;
  if (combo >= 7) return 2.5;
  if (combo >= 5) return 2;
  if (combo >= 3) return 1.5;
  return 1;
}

/** Dalga adları anahtar olarak; metin gösterildiği yerde çevriliyor. */
const TIER_KEYS = ["", "challenge.tier_warmup", "challenge.tier_pressure", "challenge.tier_crisis"];

type Phase = "loading" | "ready" | "playing" | "done" | "empty" | "error";
type Payload = { rounds: Round[]; tiers: number[]; pool: number; weak: number; best: number };
/** Sunucunun tur sonunda döndürdüğü rekor durumu: `previous` tur öncesindeki rekor. */
type Outcome = { best: number; previous: number };

export function ChallengeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [phase, setPhase] = useState<Phase>("loading");
  const [data, setData] = useState<Payload | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [left, setLeft] = useState(START_SECONDS);
  const [flash, setFlash] = useState<{ text: string; tone: "flame" | "mint" } | null>(null);
  // Rekor sunucudan gelir: cihaza yazılsaydı tarayıcıda kırılan rekor
  // telefonda 0 görünürdü.
  const [record, setRecord] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const deadline = useRef(0);
  const pending = useRef<AnswerOut[]>([]);
  const finished = useRef(false);
  const mounted = useRef(true);
  /** Bitiş geri sayımdan da tetiklenebildiği için puan ref'ten okunur. */
  const scoreRef = useRef(0);
  /** Cevap süresi TUR BAŞINA: hızlı cevap bonusu buna bakıyor. */
  const roundStart = useRef(0);
  const flashAnim = useRef(new Animated.Value(0)).current;

  const load = useCallback(() => {
    setPhase("loading");
    api<Payload>("/api/challenge")
      .then((payload) => {
        if (!mounted.current) return;
        setData(payload);
        setRecord(payload.best ?? 0);
        setPhase((payload.rounds?.length ?? 0) >= 3 ? "ready" : "empty");
      })
      .catch(() => { if (mounted.current) setPhase("error"); });
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => { mounted.current = false; };
  }, [load]);

  const finish = useCallback(async () => {
    if (finished.current) return;
    finished.current = true;
    setPhase("done");
    const final = scoreRef.current;
    const batch = pending.current;
    pending.current = [];
    bumpStats();
    if (batch.length) {
      const seconds = Math.round(START_SECONDS + batch.length * 2);
      try {
        await submitAnswers(batch, todayStr(), seconds);
      } catch {
        /* Çevrimdışıysa batch cihazdaki kuyruğa alındı (`submitAnswers`);
           bağlantı dönünce kendisi gidiyor. Web burada turu kaybediyor. */
      }
    }
    try {
      const out = await api<Outcome>("/api/challenge", { method: "POST", body: JSON.stringify({ score: final }) });
      if (mounted.current) setOutcome(out);
    } catch {
      /* çevrimdışıysa rekor bir sonraki turda güncellenir */
    }
  }, []);

  // Geri sayım: kalan süre bir zaman damgasından okunur, böylece bonus/ceza
  // eklemeleri sayacı kaydırmaz.
  useEffect(() => {
    if (phase !== "playing") return;
    /* Son saniyelerin sesi. Sayaç ekranın üstünde ama oyun ekranın ortasında
       oynanıyor: süre bittiğini gören değil, DUYAN kullanıcı hızlanıyor. */
    let lastTick = Infinity;
    const timer = setInterval(() => {
      const remaining = (deadline.current - Date.now()) / 1000;
      setLeft(Math.max(0, remaining));
      const whole = Math.ceil(remaining);
      if (remaining > 0 && remaining <= DANGER_SECONDS && whole !== lastTick) {
        lastTick = whole;
        sfx("danger");
      }
      if (remaining > DANGER_SECONDS) lastTick = Infinity;
      if (remaining <= 0) void finish();
    }, 100);
    return () => clearInterval(timer);
  }, [phase, finish]);

  const showFlash = useCallback((text: string, tone: "flame" | "mint") => {
    setFlash({ text, tone });
    haptic("correct"); // web `AchievementFlash` aynı titreşimi veriyor
    if (reduceMotion()) {
      flashAnim.setValue(1);
      setTimeout(() => { flashAnim.setValue(0); setFlash(null); }, 1100);
      return;
    }
    flashAnim.setValue(0);
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 1, duration: 160, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.delay(780),
      Animated.timing(flashAnim, { toValue: 0, duration: 160, useNativeDriver: true }),
    ]).start(() => setFlash(null));
  }, [flashAnim]);

  function start() {
    finished.current = false;
    sfx("start");
    deadline.current = Date.now() + START_SECONDS * 1000;
    setLeft(START_SECONDS);
    // Bir önceki turun rekoru artık "mevcut rekor" olur.
    if (outcome) setRecord(outcome.best);
    setOutcome(null);
    scoreRef.current = 0;
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setTally({ correct: 0, total: 0 });
    setIndex(0);
    pending.current = [];
    roundStart.current = Date.now();
    /* ÖLÇÜM YOK: web `challenge-player` de hiç olay yazmıyor. Yeni bir olay
       adı uydurmak §11.29'da kayıtlı sınıf - ad Sametin kararı. */
    setPhase("playing");
  }

  function onDone(ok: boolean, extra?: DoneExtra) {
    if (finished.current || !data) return;
    const round = data.rounds[index];
    const results = extra?.batch?.length
      ? extra.batch.map((b) => ({ wordId: b.wordId, correct: b.correct }))
      : [{ wordId: round?.word?.id ?? round?.words?.[0]?.id ?? 0, correct: ok }];
    const latencyMs = Math.max(0, Date.now() - roundStart.current);
    for (const x of results) {
      if (!x.wordId || !round) continue;
      pending.current.push({
        wordId: x.wordId,
        game: round.game,
        correct: x.correct,
        latencyMs,
        ...(x.correct ? {} : extra?.errorType ? { errorType: extra.errorType } : {}),
      });
    }

    const tier = data.tiers[index] ?? 1;
    let nextCombo = combo;
    let gained = 0;
    let deltaMs = 0;
    for (const x of results) {
      if (x.correct) {
        nextCombo += 1;
        const fast = latencyMs > 0 && latencyMs < FAST_LIMIT_MS;
        gained += Math.round((10 + tier * 5 + (fast ? 5 : 0)) * multiplier(nextCombo));
        deltaMs += BONUS_MS + (fast ? FAST_BONUS_MS : 0);
      } else {
        nextCombo = 0;
        deltaMs -= PENALTY_MS;
      }
    }

    // Süre kazanılır ya da kaybedilir ama tavanı aşamaz.
    deadline.current = Math.min(Date.now() + MAX_SECONDS * 1000, deadline.current + deltaMs);

    scoreRef.current = score + gained;
    setScore(scoreRef.current);
    setCombo(nextCombo);
    setBestCombo((b) => Math.max(b, nextCombo));
    setTally((v) => ({
      correct: v.correct + results.filter((x) => x.correct).length,
      total: v.total + results.length,
    }));

    // Kombo kilometre taşları ve dalga geçişleri duyurulur.
    if (nextCombo > combo && [3, 5, 7, 10, 15].includes(nextCombo)) {
      showFlash(t("challenge.flash_combo", { n: nextCombo, mult: multiplier(nextCombo) }), "flame");
    } else {
      const nextTier = data.tiers[index + 1];
      if (nextTier && nextTier > tier) {
        showFlash(t("challenge.flash_wave", { wave: t(TIER_KEYS[nextTier] ?? TIER_KEYS[1]) }), "mint");
      }
    }

    if (index >= data.rounds.length - 1) void finish();
    else { roundStart.current = Date.now(); setIndex((i) => i + 1); }
  }

  const exit = () => nav.goBack();
  const page = { flex: 1, backgroundColor: colors.bg } as const;
  const cardPad = { padding: spacing.lg, paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxl };

  if (phase === "loading") {
    /* BEKLEME KENDINI DUYURUYOR. Bu dal ekranin TAMAMINI kaplayip
       "hazirlaniyor" yaziyor ama canli bolge degildi: TalkBack kullanan biri
       dugmeye basip hicbir sey duymuyordu. Webde karsiligi
       `role="status" aria-busy`. */
    return <View accessibilityLiveRegion="polite" accessibilityRole="progressbar" accessibilityState={{ busy: true }} style={[page, { alignItems: "center", justifyContent: "center" }]}><Text variant="body" color={colors.textMuted}>{t("challenge.preparing")}</Text></View>;
  }

  if (phase === "error") {
    return (
      <View style={[page, { alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }]}>
        <AlertIcon color={colors.textMuted} size={56} />
        <Text variant="h2" style={{ textAlign: "center" }}>{t("challenge.load_failed")}</Text>
        <PressableScale onPress={load} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color={colors.onPrimary}>{t("common.try_again")}</Text>
        </PressableScale>
        <PressableScale onPress={exit} style={{ paddingVertical: spacing.sm }}>
          <Text variant="bodyStrong" color={colors.textMuted}>{t("common.go_back")}</Text>
        </PressableScale>
      </View>
    );
  }

  if (phase === "empty") {
    return (
      <View style={[page, { alignItems: "center", justifyContent: "center", gap: spacing.md, paddingHorizontal: spacing.xl }]}>
        <Mascot mood="idle" size={96} />
        <Text variant="h2" style={{ textAlign: "center" }}>{t("challenge.none_title")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 22 }}>{t("challenge.none_sub")}</Text>
        <PressableScale onPress={exit} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center", marginTop: spacing.md }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color={colors.onPrimary}>{t("common.back_to_learn")}</Text>
        </PressableScale>
      </View>
    );
  }

  if (phase === "ready" && data) {
    return (
      <ScrollView style={page} contentContainerStyle={cardPad}>
        <Card padded>
          <View style={[{ width: 56, height: 56, borderRadius: radii.lg, alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 10)]}>
            <FlameIcon color={colors.onFill} size={26} />
          </View>
          <Text variant="h2" style={{ textAlign: "center", marginTop: spacing.md }}>{t("challenge.title")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm, lineHeight: 22 }}>
            {t("challenge.pitch", { n: START_SECONDS })}
          </Text>
          <View style={{ marginTop: spacing.lg, gap: 8 }}>
            <Rule colors={colors} tone={colors.successText} text={t("challenge.rule_correct")} />
            <Rule colors={colors} tone={colors.dangerText} text={t("challenge.rule_wrong")} />
            <Rule colors={colors} tone={colors.streakText} text={data.weak ? t("challenge.rule_waves_weak", { weak: data.weak }) : t("challenge.rule_waves")} />
          </View>
          {record > 0 ? (
            <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.lg }}>
              {t("challenge.your_record")} {record} {t("common.points")}
            </Text>
          ) : null}
          <PressableScale onPress={start} style={[{ marginTop: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="h3" color={colors.onPrimary}>{t("common.start")}</Text>
          </PressableScale>
          <PressableScale onPress={exit} style={{ marginTop: spacing.sm, paddingVertical: 12, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("common.discard")}</Text>
          </PressableScale>
        </Card>
      </ScrollView>
    );
  }

  if (phase === "done") {
    // Rekor kararı sunucunun: `previous` bu tur oynanmadan önceki değerdir.
    const previous = outcome?.previous ?? record;
    const isRecord = score > previous && score > 0;
    const accuracy = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;
    return (
      <ScrollView style={page} contentContainerStyle={cardPad}>
        <Celebrate show={isRecord} />
        <Card padded>
          {/* Rekor kırıldıysa kutluyor, kırılmadıysa gülümsüyor — hayatta
              kalma turu tükenerek bitiyor, üzgün bir yüz burada haksız olurdu. */}
          <View style={{ alignItems: "center" }}><Mascot mood={isRecord ? "celebrate" : "happy"} size={96} /></View>
          {/* TURUN SONUCU DUYURULUYOR - web `challenge-player` ile ayni yer. */}
          <Text accessibilityLiveRegion="polite" variant="display" style={{ textAlign: "center", marginTop: spacing.sm }}>{score} <Text variant="h3" color={colors.textMuted}>{t("common.points")}</Text></Text>
          {isRecord ? (
            <Text variant="bodyStrong" color={colors.successText} style={{ textAlign: "center", marginTop: 4 }}>{t("challenge.new_record", { previous })}</Text>
          ) : (
            <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: 4 }}>{t("challenge.your_record")} {outcome?.best ?? Math.max(record, score)}</Text>
          )}
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
            <Box colors={colors} label={t("daily.correct")} value={`${tally.correct}/${tally.total}`} />
            {/* İşaret KODA GÖMÜLÜ yazılıydı: Türkçe ve Almanca arayüzde de
                "85%" çıkıyordu, oysa tr "%85", de "85 %" ister. Sözlüğün
                biçimleyicisi bunu biliyor (`lib/i18n` `formatPercent`) ve web
                aynı kutuda `common.pct` anahtarını kullanıyor. */}
            <Box colors={colors} label={t("challenge.hit_rate")} value={formatPercent(accuracy)} />
            <Box colors={colors} label={t("challenge.longest_streak")} value={String(bestCombo)} />
          </View>
          <PressableScale onPress={start} style={[{ marginTop: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="h3" color={colors.onPrimary}>{t("common.try_again")}</Text>
          </PressableScale>
          <PressableScale onPress={exit} style={{ marginTop: spacing.sm, paddingVertical: 12, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("common.back_to_learn")}</Text>
          </PressableScale>
        </Card>
      </ScrollView>
    );
  }

  // playing
  const round = data!.rounds[index];
  const tier = data!.tiers[index] ?? 1;
  const pct = Math.min(100, (left / START_SECONDS) * 100);
  const urgent = left <= DANGER_SECONDS;
  const mult = multiplier(combo);
  return (
    <View style={[page, { paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }]}>
      {flash ? (
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute", top: insets.top + 64, left: 0, right: 0, alignItems: "center", zIndex: 10,
            opacity: flashAnim,
            transform: [{ scale: flashAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }],
          }}
        >
          <View style={{ borderRadius: radii.pill, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: flash.tone === "mint" ? colors.success : colors.streak }}>
            <Text accessibilityLiveRegion="polite" variant="bodyStrong" color={colors.onFill}>{flash.text}</Text>
          </View>
        </Animated.View>
      ) : null}

      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={exit} accessibilityLabel={t("common.go_back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 3, backgroundColor: colors.primarySoft }}>
          <Text variant="micro" color={colors.onPrimarySoft} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{t(TIER_KEYS[tier] ?? TIER_KEYS[1])}</Text>
        </View>
        <Text variant="bodyStrong">{score} {t("common.points")}</Text>
        <View style={{ flex: 1 }} />
        <Text variant="bodyStrong" color={urgent ? colors.dangerText : colors.streakText}>{t("challenge.seconds", { n: left.toFixed(1) })}</Text>
      </View>

      <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
        <View style={{ height: "100%", width: `${pct}%`, backgroundColor: urgent ? colors.danger : colors.streak, borderRadius: 3 }} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6, marginBottom: spacing.md }}>
        {combo >= 2 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <SparkIcon color={colors.accentText} size={13} />
            <Text variant="micro" color={colors.accentText}>{t("challenge.combo", { n: combo, mult })}</Text>
          </View>
        ) : (
          <Text variant="micro" color={colors.textMuted}>{t("challenge.build_streak")}</Text>
        )}
        <Text variant="micro" color={colors.textMuted}>{index + 1}/{data!.rounds.length}</Text>
      </View>

      <RoundView key={round?.id ?? index} round={round} onDone={onDone} />
    </View>
  );
}

function Rule({ colors, tone, text }: { colors: Palette; tone: string; text: string }) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Text variant="bodyStrong" color={tone}>·</Text>
      <Text variant="body" color={colors.text} style={{ flex: 1, lineHeight: 21 }}>{text}</Text>
    </View>
  );
}

function Box({ colors, label, value }: { colors: Palette; label: string; value: string }) {
  return (
    <View style={{ flex: 1, borderRadius: radii.md, backgroundColor: colors.surface2, paddingVertical: spacing.md, alignItems: "center" }}>
      <Text variant="h3">{value}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: 2, textAlign: "center" }}>{label}</Text>
    </View>
  );
}
