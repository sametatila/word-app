import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { t, formatDay, targetLangName } from "../lib/i18n";
import { track } from "../lib/track";
import { currentTargetLang } from "../lib/courses";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { SpeakerIcon, PlacementIcon, DurationIcon, DontGuessIcon, CorrectIcon, GamePluralIcon, WarningIcon } from "../ui/icons";
import { FlowScreen, FlowProgress, FlowActions, FlowNote, ResultHero, DetailCard, CoverBody, StateBody, type CoverRule } from "../ui/flow";
import { ChoiceGame } from "../game/ChoiceGame";
import { fetchPlacementStatus, recordPlacementV2, type PlacementStatus, type PlacementV2Payload } from "../game/placement";
import { useAuth } from "../lib/AuthContext";
import { updateProfile } from "../lib/updateProfile";
import { saveOnboardingPrefs } from "../lib/onboardingPrefs";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, fillOf } from "../theme";
import { sfx } from "../lib/sfx";
import { speakTarget, stopSpeaking } from "../lib/tts";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useBackConfirm } from "../lib/useBackConfirm";
import { PLACEMENT_BANK, type PlacementItem } from "../data/placementBank";
import { LEVELS, adjustable, newSession, nextItem, result, sampleCards, shouldStop, type Level, type Result, type Session } from "../lib/placementEngine";

/**
 * SEVİYE TESTİ v2 (docs/plan/placement-v2.md) — onboarding'de misafir, uygulama içinde
 * hesaplı kullanıcı AYNI testi çözer.
 *
 * Eskisi 8 sabit soru ve doğru sayısıyla eşikti: şansla seviye atlıyor, C1 hiç çıkmıyordu
 * (kapalı test, 2026-10-03: "B2 çıktı ama değilim", "B1 çıktı ama C1'im"). Şimdi:
 *   1. kendini değerlendirme (başlangıç noktası, sonucu belirlemez),
 *   2. kelime kartları (uydurma kelimelerle tahmin düzeltilir),
 *   3. uyarlanabilir sorular ("Bilmiyorum" her soruda; seviye kesinleşince durur),
 *   4. sonuç: seviye + o seviyede yapabildikleri + ±1 seçim.
 * Ölçüm motoru `lib/placementEngine` (webin birebir kopyası), banka `data/placementBank`.
 * Sonuç sunucuda aynı motorla yeniden hesaplanıp kaydedilir (`recordPlacementV2`); misafirin
 * cevapları onboarding tercihlerinde bekler, hesap açılınca gider (AuthContext.adoptAccount).
 */
type Phase = "cover" | "self" | "cards" | "items" | "result" | "zero";

/* Anahtarlar AÇIK yazılı: çeviri kapısı (i18n:check) dinamik kurulan anahtarı göremez. */
const SELF_KEY: Record<Level, string> = {
  A1: "plc2.self_A1", A2: "plc2.self_A2", B1: "plc2.self_B1", B2: "plc2.self_B2", C1: "plc2.self_C1",
};
const CAN_DO_KEYS: Record<Level, [string, string, string]> = {
  A1: ["plc2.cando_A1_1", "plc2.cando_A1_2", "plc2.cando_A1_3"],
  A2: ["plc2.cando_A2_1", "plc2.cando_A2_2", "plc2.cando_A2_3"],
  B1: ["plc2.cando_B1_1", "plc2.cando_B1_2", "plc2.cando_B1_3"],
  B2: ["plc2.cando_B2_1", "plc2.cando_B2_2", "plc2.cando_B2_3"],
  C1: ["plc2.cando_C1_1", "plc2.cando_C1_2", "plc2.cando_C1_3"],
};

export function PlacementScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { params } = useRoute<RouteProp<RootStackParams, "Placement">>();
  const onboarding = params?.onboarding === true;
  /* Onboarding'de bu ekran yığının kökü: çıkış = giriş duvarı. Uygulama içinde geri döner. */
  const leave = () => { stopSpeaking(); if (onboarding) nav.reset({ index: 0, routes: [{ name: "Auth" }] }); else nav.goBack(); };
  const { user } = useAuth();

  const lang = currentTargetLang();
  const bank = PLACEMENT_BANK[lang];

  const [phase, setPhase] = useState<Phase>("cover");
  /* Oturum değişebilir bir nesne (motorun sözleşmesi); `tick` yeniden çizdirir. */
  const session = useRef<Session | null>(null);
  const cards = useRef(bank.cards);
  const [cardIdx, setCardIdx] = useState(0);
  const [item, setItem] = useState<PlacementItem | null>(null);
  const [, setTick] = useState(0);
  const [res, setRes] = useState<Result | null>(null);
  const [chosen, setChosen] = useState<Level | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notSaved, setNotSaved] = useState(false);

  /* Bekleme süresi (30 gün): sunucu bildiriyor, kapıyı istemci tutuyor. Onboarding'de sorulmaz. */
  const [status, setStatus] = useState<PlacementStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(!!user && !onboarding);
  useEffect(() => {
    if (!user || onboarding) return;
    let alive = true;
    fetchPlacementStatus()
      .then((st) => { if (alive) setStatus(st); })
      .catch(() => { /* durum yoksa test yine açılır */ })
      .finally(() => { if (alive) setStatusLoading(false); });
    return () => { alive = false; };
  }, [user, onboarding]);

  const inTest = phase === "self" || phase === "cards" || phase === "items";
  const back = useBackConfirm(inTest);
  const startedAt = useRef(Date.now());
  /* Cevaplanmış maddenin kimliği: aynı madde iki yoldan (şık zamanlayıcısı +
     "Bilmiyorum"/"Şu an dinleyemiyorum") iki kez cevaplanıp sonraki atlanmasın. */
  const settled = useRef<string | null>(null);

  function start() {
    track("exam_start", 0, "placement:v2");
    startedAt.current = Date.now();
    setPhase("self");
  }

  function pickSelf(level: Level | null) {
    if (!level) { setChosen("A1"); setPhase("zero"); return; }
    cards.current = sampleCards(bank.cards);
    session.current = newSession(level, cards.current, {}, true);
    settled.current = null;
    setCardIdx(0);
    setPhase("cards");
  }

  function answerCard(know: boolean) {
    const s = session.current;
    const c = cards.current[cardIdx];
    if (!s || !c) return;
    s.known[c.id] = know;
    const next = cardIdx + 1;
    if (next < cards.current.length) { setCardIdx(next); return; }
    setPhase("items");
    advance();
  }

  /** Sıradaki soru ya da sonuç. */
  function advance() {
    const s = session.current;
    if (!s) return;
    const map = new Map(bank.items.map((it) => [it.id, it]));
    const nx = shouldStop(s, map) ? null : (nextItem(s, bank.items) as PlacementItem | null);
    if (!nx) { finish(); return; }
    setItem(nx);
    setTick((n) => n + 1);
    if (nx.kind === "listening" && nx.audio) speakTarget(nx.audio, { slow: "listen" });
  }

  function answerItem(choice: number | "dontknow") {
    const s = session.current;
    if (!s || !item || settled.current === item.id) return;
    settled.current = item.id;
    stopSpeaking();
    s.responses.push({ id: item.id, choice });
    advance();
  }

  /* "Şu an dinleyemiyorum": dinleme maddesi cevapsız atlanır, kalan test sessiz sürer. */
  function cantListen() {
    const s = session.current;
    if (!s || !item || settled.current === item.id) return;
    settled.current = item.id;
    stopSpeaking();
    s.audio = false;
    advance();
  }

  function finish() {
    const s = session.current;
    if (!s) return;
    const r = result(s, bank.items);
    sfx("finish");
    setRes(r);
    setChosen(r.level);
    setItem(null);
    setPhase("result");
  }

  function payload(): PlacementV2Payload | null {
    const s = session.current;
    if (!s) return null;
    return { lang, self: s.self, audio: s.audio, known: s.known, responses: s.responses };
  }

  async function apply() {
    const level = chosen ?? "A1";
    setSaving(true);
    const p = payload();
    /* Misafirde sunucu yok: yalnız misafir turu burada sayılıyor (hesaplıda sunucu sayar). */
    if (!user && res) track("placement_finish", res.items, `v2:${res.level}`);
    if (onboarding) await saveOnboardingPrefs({ level, ...(p ? { placement: p } : {}) });
    if (user) {
      let ok = false;
      if (p) {
        try { await recordPlacementV2({ ...p, accepted: level }); ok = true; } catch { /* aşağıda not */ }
      }
      /* Profil yine yazılır: kayıt düşse de seçilen seviye uygulanmalı; yerel önbellek de tazelenir. */
      await updateProfile({ level });
      if (p && !ok) setNotSaved(true);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(leave, 700);
  }

  /* ---------------------------------------------------------------- çizim */

  if (statusLoading) {
    return (
      <FlowScreen center actions={null}>
        <View accessibilityLiveRegion="polite" accessibilityRole="progressbar" accessibilityState={{ busy: true }} style={{ alignItems: "center" }}>
          <ActivityIndicator color={colors.primaryText} />
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("common.loading")}</Text>
        </View>
      </FlowScreen>
    );
  }

  if (user && !onboarding && status && !status.canRetake) {
    return (
      <FlowScreen center actions={<FlowActions primary={{ label: t("common.close"), onPress: leave }} />}>
        <StateBody title={t("placement.title")} body={t("placement.retake_in", { n: status.retakeDays })}>
          {status.last ? (
            <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>
              {`${t("placement.last_taken", { date: formatDay(status.last.at, { year: true }) })} ${status.last.suggested}${status.last.accepted ? ` ${t("placement.you_chose", { level: status.last.accepted })}` : ""}`}
            </Text>
          ) : null}
        </StateBody>
      </FlowScreen>
    );
  }

  if (phase === "cover") {
    const rules: CoverRule[] = [
      { icon: GamePluralIcon, text: t("plc2.rule_parts") },
      { icon: DurationIcon, text: t("plc2.rule_adapt") },
      { icon: DontGuessIcon, text: t("plc2.rule_dont_know") },
      { icon: CorrectIcon, text: t("plc2.rule_choose"), tone: "ok" },
    ];
    return (
      <FlowScreen actions={<FlowActions primary={{ label: t("common.start"), onPress: start }} close={leave} />}>
        <CoverBody icon={PlacementIcon} tint={fillOf("primary")} eyebrow={t("placement.title")} title={t("plc2.cover_title")} pitch={t("plc2.cover_pitch")} rules={rules} />
      </FlowScreen>
    );
  }

  if (phase === "zero" || phase === "result") {
    const level = chosen ?? "A1";
    const options = res ? adjustable(res.level) : [];
    return (
      <FlowScreen
        actions={<FlowActions primary={{ label: t("plc2.start_with", { level }), onPress: () => void apply(), disabled: saving || saved }} close={leave} />}
      >
        {phase === "zero" ? (
          <ResultHero eyebrow={t("placement.title")} title={t("plc2.zero_title")} figure="A1" sub={t("plc2.zero_body")} />
        ) : (
          <ResultHero
            eyebrow={t("placement.title")}
            title={t("placement.your_level", { level: res!.level })}
            figure={res!.level}
            sub={res!.near ? t("plc2.near", { level: res!.near }) : null}
          />
        )}
        {notSaved ? <FlowNote tone="bad" icon={<WarningIcon color={colors.dangerText} size={16} />} text={t("placement.not_saved")} /> : null}
        {saved ? (
          <View accessibilityLiveRegion="polite">
            <FlowNote tone="ok" icon={<CorrectIcon color={colors.successText} size={16} />} text={t("placement.saved")} />
          </View>
        ) : null}
        {/* "BU BENİM" DEDİRTEN KISIM: seviyenin harfi değil, o seviyede yapabildikleri. */}
        <DetailCard title={`${t("plc2.cando_title")} · ${level}`}>
          {CAN_DO_KEYS[level].map((k) => (
            <View key={k} style={{ flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" }}>
              <CorrectIcon color={colors.successText} size={16} />
              <Text variant="body" style={{ flex: 1 }}>{t(k)}</Text>
            </View>
          ))}
        </DetailCard>
        {/* ±1 SEÇİM: önerilen ve bir altı/üstü; her birinin ne değiştireceği yazılı. */}
        {options.length > 1 ? (
          <DetailCard title={t("plc2.adjust_title")}>
            {options.map((l) => {
              const on = l === level;
              const i = LEVELS.indexOf(l) - LEVELS.indexOf(res!.level);
              const label = i === 0 ? `${l} · ${t("placement.suggested")}` : t(i < 0 ? "plc2.adjust_lower" : "plc2.adjust_higher", { level: l });
              return (
                <PressableScale
                  key={l}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on }}
                  onPress={() => setChosen(l)}
                  style={{ borderRadius: radii.md, borderWidth: 1, borderColor: on ? colors.primary : colors.border, backgroundColor: on ? colors.surface2 : colors.surface, paddingVertical: spacing.md, paddingHorizontal: spacing.md }}
                >
                  <Text variant={on ? "bodyStrong" : "body"}>{label}</Text>
                </PressableScale>
              );
            })}
            <Text variant="caption" color={colors.textMuted}>{t("plc2.adjust_note")}</Text>
          </DetailCard>
        ) : null}
      </FlowScreen>
    );
  }

  /* Test sırasındaki ilerleme: kartlar ~%40, sorular ~%60 (ortalama 13 soru). */
  const s = session.current;
  const progress = phase === "self" ? 0
    : phase === "cards" ? 0.4 * (cardIdx / Math.max(1, cards.current.length))
    : 0.4 + 0.6 * Math.min(1, (s?.responses.length ?? 0) / 13);
  const partLabel = phase === "items" ? t("plc2.part_questions") : phase === "cards" ? t("plc2.part_words") : "";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <FlowProgress onClose={back.ask} closeLabel={t("plc.quit_title")} value={progress} count={partLabel} style={{ marginBottom: spacing.xl }} />

      {phase === "self" ? (
        <View style={{ gap: spacing.sm }}>
          <Text accessibilityRole="header" variant="h1">{t("plc2.self_title")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginBottom: spacing.md }}>{t("plc2.self_sub", { lang: targetLangName() })}</Text>
          {LEVELS.map((l) => (
            <PressableScale key={l} accessibilityRole="button" onPress={() => pickSelf(l)} style={{ borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg }}>
              <Text variant="body">{t(SELF_KEY[l])}</Text>
            </PressableScale>
          ))}
          <PressableScale accessibilityRole="button" onPress={() => pickSelf(null)} style={{ paddingVertical: spacing.md, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.primaryText}>{t("plc2.self_none")}</Text>
          </PressableScale>
        </View>
      ) : null}

      {phase === "cards" && cards.current[cardIdx] ? (
        <View style={{ flex: 1 }}>
          <Text accessibilityRole="header" variant="h2" style={{ textAlign: "center" }}>{t("plc2.cards_title")}</Text>
          <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.xs }}>{t("plc2.cards_hint")}</Text>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text variant="display" style={{ textAlign: "center" }}>{cards.current[cardIdx].word}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: spacing.md }}>
            <PressableScale accessibilityRole="button" onPress={() => answerCard(false)} style={{ flex: 1, paddingVertical: spacing.lg, alignItems: "center", borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface }}>
              <Text variant="bodyStrong" color={colors.textMuted}>{t("plc.dont_know")}</Text>
            </PressableScale>
            <PressableScale accessibilityRole="button" onPress={() => answerCard(true)} style={{ flex: 1, paddingVertical: spacing.lg, alignItems: "center", borderRadius: radii.lg, backgroundColor: colors.primary }}>
              <Text variant="bodyStrong" color={colors.onPrimary}>{t("plc2.know")}</Text>
            </PressableScale>
          </View>
        </View>
      ) : null}

      {phase === "items" && item ? (
        <View style={{ flex: 1 }}>
          <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>
            {t(item.kind === "cloze" ? "plc2.q_cloze" : item.kind === "reading" ? "plc2.q_reading" : "plc2.q_listening")}
          </Text>
          {item.kind === "reading" && item.text ? (
            <View style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg, marginBottom: spacing.lg }}>
              <Text variant="body">{item.text}</Text>
            </View>
          ) : null}
          {item.kind === "listening" && item.audio ? (
            <View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.lg, flexWrap: "wrap" }}>
              <PressableScale onPress={() => speakTarget(item.audio!, { slow: "listen" })} accessibilityLabel={t("plc2.listen_again")} style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 9 }}>
                <SpeakerIcon color={colors.primaryText} size={20} />
                <Text variant="bodyStrong" color={colors.primaryText}>{t("plc2.listen_again")}</Text>
              </PressableScale>
              <PressableScale onPress={cantListen} style={{ justifyContent: "center", paddingHorizontal: spacing.sm }} hitSlop={6}>
                <Text variant="caption" color={colors.primaryText}>{t("plc2.cant_listen")}</Text>
              </PressableScale>
            </View>
          ) : null}
          {/* ÖLÇÜM KİPİ (reveal=false): doğruluk gösterilmez; test öğretmez, ölçer. */}
          <ChoiceGame
            key={item.id}
            round={{ wordId: 0, question: item.kind === "cloze" ? item.text ?? "" : item.question ?? "", answer: item.options[item.answer], options: item.options, prompt: "" }}
            onDone={(ok) => answerItem(ok ? item.answer : -1)}
            reveal={false}
          />
          <PressableScale onPress={() => answerItem("dontknow")} style={{ marginTop: spacing.md, paddingVertical: spacing.md, alignItems: "center", borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("plc.dont_know")}</Text>
          </PressableScale>
        </View>
      ) : null}

      <ConfirmDialog
        visible={back.visible}
        title={t("plc.quit_title")}
        message={t("plc.quit_body")}
        confirmLabel={t("common.exit")}
        cancelLabel={t("common.continue")}
        destructive
        onConfirm={() => { back.cancel(); leave(); }}
        onCancel={back.cancel}
      />
    </View>
  );
}
