import React, { useEffect, useRef, useState } from "react";
import { t, formatNumber } from "../lib/i18n";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, FlameIcon, BoltIcon, ShareIcon, PodiumIcon, LockIcon, ClockIcon } from "../ui/icons";
import { RoundView } from "../game/rounds";
import { FlowScreen, FlowTopBar, FlowActions, ResultHero, StatRow, DetailCard, StateBody, CoverBody } from "../ui/flow";
import { fetchDaily, submitDaily, scoreAnswer, type DailyBoardRow } from "../game/daily";
import type { Round } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { useTheme, spacing, radii, TIER_COLOR, fillOf, type Palette } from "../theme";
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

/**
 * Günün sıralaması — `DetailCard`ın içinde çiziliyor (kapakta önizleme,
 * sonuçta tablo). Satırın parçaları aynı: madalya/numara, baş harf, ad +
 * doğru sayısı, puan. Her satır ayrı bir kart değil artık — kartın içinde
 * kart olurdu; kendi satırı marka zeminiyle vurgulu.
 */
function Board({ rows, colors }: { rows: DailyBoardRow[]; colors: Palette }) {
  if (!rows.length) return <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", paddingVertical: spacing.sm }}>{t("daily.be_first_to_play_today")}</Text>;
  return (
    <View style={{ gap: spacing.xs }}>
      {/* TEK SATIR: tabloda yalnız kendisi olan kullanıcı "kimse oynamamış"
          sanıyordu. Sebebini söylemek gerekiyor - tablo gün ilerledikçe
          doluyor. Web aynı notu aynı koşulda gösteriyor (`daily-player`). */}
      {rows.length === 1 ? (
        <Text variant="micro" color={colors.textMuted}>{t("daily.first_today")}</Text>
      ) : null}
      {rows.map((r) => {
        const mc = medalColor(r.rank);
        const initial = ((r.name ?? "?").trim()[0] ?? "?").toUpperCase();
        return (
          <View key={`${r.rank}-${r.name}`} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.md, paddingHorizontal: spacing.sm, paddingVertical: 8, backgroundColor: r.isMe ? colors.primarySoft : "transparent", borderWidth: 1, borderColor: r.isMe ? colors.primary : "transparent" }}>
            {/*
              İLK ÜÇ DOLU DAİRE, GERİSİ DÜZ NUMARA.
              Numara madalya rengiyle YAZILIYORDU ve açık temada üçü de
              okunmuyordu - ölçüm beyaz kart üstünde altın 2.88, gümüş 2.56,
              bronz 3.09; normal yazı eşiği 4.5. Uygulamanın kendi dili dolu
              zemin + beyaz içerik ve o ölçekte üçü de eşiği geçiyor.
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
              {/* AD TEK SATIRDA: kırk karakterlik ad ikinci satıra düşüp
                  madalyaları ve puanları hizadan çıkarıyordu. */}
              <Text numberOfLines={1} variant="bodyStrong" color={r.isMe ? colors.primaryText : colors.text}>{r.name ?? t("social.student")}{r.isMe ? t("social.you_paren") : ""}</Text>
              <Text variant="micro" color={colors.textMuted}>{t("common.n_correct", { correct: r.correct, total: r.total })}</Text>
            </View>
            {/* Sayi BICIMLEYICIDEN (web karsiligi `formatNumber`). */}
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
  /* Sonuç BU OTURUMDA mı bitti, yoksa bugün oynanmış tur yeniden mi
     açıldı. Konfeti yalnız ilkinde: aynı sonucu her açışta kutlamak
     kutlamayı değersizleştirir. */
  const justFinished = useRef(false);

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
    justFinished.current = true;
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

  /* DURUM ŞABLONU (`ui/flow` `StateBody`): giriş = el sallayan maskot,
     hata = üzgün, boş = düşünen; tek birincil çıkış + metin bağlantısı. */
  if (phase === "auth") {
    return (
      <FlowScreen center actions={<FlowActions primary={{ label: t("daily.sign_in_sign_up"), onPress: () => { nav.goBack(); nav.navigate("Auth"); } }} tertiary={{ label: t("common.close"), onPress: () => nav.goBack() }} />}>
        <StateBody mood="wave" title={t("daily.sign_in_for_daily_round")} body={t("daily.play_same_round_as_everyone_and")} />
      </FlowScreen>
    );
  }

  if (phase === "ready") {
    /*
     * KAPAK ŞABLONU: ikon karosu · başlık · tek cümle · kural satırları.
     * Eski tanıtım tek cümlede "·" ile üç kuralı sıralıyordu; kurallar artık
     * ayrı ve ikonlu. "Hız puana eklenir" `scoreAnswer`dan: doğru cevaba
     * 2-8 sn arasında azalan hız bonusu biniyor, yanlış cevap sıfır.
     */
    return (
      <FlowScreen
        actions={
          <FlowActions
            primary={{ label: t("common.start"), onPress: () => { startedAt.current = Date.now(); roundStart.current = Date.now(); track("session_start", 0, "daily"); setPhase("playing"); } }}
            tertiary={{ label: t("common.later"), onPress: () => nav.goBack() }}
          />
        }
      >
        <CoverBody
          icon={PodiumIcon}
          tint={fillOf("info")}
          eyebrow={t("daily.daily_round")}
          title={t("daily.same_words")}
          pitch={t("daily.cover_pitch", { n: rounds.length })}
          rules={[
            { icon: LockIcon, text: t("daily.rule_once") },
            { icon: ClockIcon, text: t("daily.rule_speed") },
            { icon: PodiumIcon, text: t("daily.rule_board", { level: levelRef.current }), tone: "ok" },
          ]}
        />
        {/* Bugünün tablosu turdan ÖNCE de duruyor: "kime yetişiyorum" sorusu
            oynamaya iten şeyin kendisi. Tek satırsa (yalnız kendisi) çizilmiyor. */}
        {board.length > 1 ? (
          <DetailCard title={`${t("daily.today_s_ranking")} · ${levelRef.current}`}>
            <Text variant="caption" color={colors.textMuted}>{t("daily.players_at_your_level")}</Text>
            <Board rows={board} colors={colors} />
          </DetailCard>
        ) : null}
      </FlowScreen>
    );
  }

  if (phase === "empty") {
    return (
      <FlowScreen center actions={<FlowActions primary={{ label: t("common.back_to_learn"), onPress: () => nav.goBack() }} />}>
        <StateBody mood="think" title={t("daily.none_title")} body={t("daily.none_sub")} />
      </FlowScreen>
    );
  }

  if (phase === "error") {
    return (
      <FlowScreen center actions={<FlowActions primary={{ label: t("daily.try_again"), onPress: () => void load() }} tertiary={{ label: t("common.close"), onPress: () => nav.goBack() }} />}>
        <StateBody mood="sad" title={t("daily.couldn_t_load_daily_round")} />
      </FlowScreen>
    );
  }

  if (phase === "done") {
    const total = totalRef.current;
    const correct = correctRef.current;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const me = board.find((r) => r.isMe);
    /* Günün turunda geçme/kalma yok; maskot ve kutlama doğruluktan çıkıyor
       (kelime turunun eşiği: %80 kutlama, %60 mutlu). Konfeti yalnız bu
       oturumda biten hak edilmiş turda. Mobil sonuçta maskot hiç yoktu. */
    const deserved = total >= 4 && pct >= 80;
    /*
      SONUÇ ŞABLONU: band (puan · doğru + XP · sıra hapı) → üç sayı → günün
      sıralaması → Bitir / Paylaş. Sıra bantta hap olarak, tablo altta.
    */
    return (
      <FlowScreen
        celebrate={deserved && justFinished.current}
        top={<FlowTopBar onClose={() => nav.goBack()} />}
        actions={
          <View style={{ gap: spacing.xs }}>
            <FlowActions
              primary={{ label: t("common.finish"), onPress: () => nav.goBack() }}
              /* PAYLASIM: gunun turu tam olarak paylasilmaya deger olan tur,
                 cunku sorular o seviyedeki HERKESE ayni geliyor. */
              secondary={total > 0 ? {
                label: t("common.share"),
                icon: <ShareIcon color={colors.text} size={18} />,
                onPress: () => void shareRoundResult({
                  marks: marksRef.current,
                  total,
                  accuracy: pct,
                  streak: 0,
                  level: levelRef.current,
                  kind: "daily",
                  score: scoreRef.current,
                }),
              } : null}
            />
            {/* Neden tekrar oynanamadığı: web aynı yerde söylüyor. */}
            <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center" }}>{t("daily.once_a_day")}</Text>
          </View>
        }
      >
        {/* TURUN SONUCU DUYURULUYOR - bant canlı bölge (web `daily-player` ile ayni). */}
        <ResultHero
          eyebrow={t("daily.daily_round")}
          title={t("daily.your_score")}
          figure={formatNumber(scoreRef.current)}
          /* KAZANILAN XP yalnız kazanç varsa: tekrar açılan sonuçta sunucu 0
             döndürüyor ve "+0 XP" yazmak yanlış olurdu. */
          sub={xpGained > 0 ? `${t("common.n_correct", { correct, total })} · +${xpGained} XP` : t("common.n_correct", { correct, total })}
          mood={deserved ? "celebrate" : pct >= 60 ? "happy" : "sad"}
          /* SIRAN kaç: "kaçıncıyım" sorusunun cevabı tabloda satır satır aranmamalı. */
          pill={me ? { text: t("daily.rank_pill", { rank: me.rank }) } : null}
        />
        <StatRow items={[
          { value: `${correct}/${total}`, label: t("daily.correct") },
          { value: String(bestComboRef.current), label: t("daily.best_streak"), tone: "streak" },
          { value: me ? t("daily.rank_value", { rank: me.rank }) : "—", label: t("daily.rank") },
        ]} />
        <DetailCard title={`${t("daily.today_s_ranking")} · ${levelRef.current}`}>
          <Text variant="caption" color={colors.textMuted}>{t("daily.players_at_your_level")}</Text>
          <Board rows={board} colors={colors} />
        </DetailCard>
      </FlowScreen>
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
