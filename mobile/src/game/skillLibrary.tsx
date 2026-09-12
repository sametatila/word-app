import React, { useEffect, useRef, useState } from "react";
import { todayStr } from "./session";
import { View, TextInput } from "react-native";
import { t, formatPercent } from "../lib/i18n";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { SpeakerIcon, MicIcon, CheckIcon, XIcon } from "../ui/icons";
import { speakTarget } from "../lib/tts";
import { ensureMicPermission, listenOnce, sttAvailable, stopListening } from "../lib/stt";
import { SPEAK_CLIP_MS, MONOLOGUE_CHUNK_MS } from "../lib/learningRules";
import { spokenMatches } from "../lib/voiceMatch";
import { currentTargetLang, currentTargetLocale } from "../lib/courses";
import { api } from "../api/client";
import { isPremiumRefusal, isQuotaRefusal, notePremiumGate } from "../lib/premium";
import { assessFailKey } from "../lib/assessFail";
import { haptic } from "../lib/haptics";
import { spacing, radii, softShadow, type Palette } from "../theme";
import type { Gloss } from "../data/skills";
import { RUBRIC_PASS_PCT } from "../lib/learningRules";

/**
 * Beceriler kütüphanesinin (2026-09) mobil oynatıcı parçaları: dil bilgisi
 * anlatımı, söyleyiş drilli ve monolog. Okuma/dinleme/yazma zaten
 * `skillQuiz.tsx`'te; bu üçü ItemScreen'e eklenen yeni dallar.
 *
 * Web karşılıkları: grammar-player, speaking-player, monologue-player. Fark
 * ses hattında: web tarayıcı tanıyıcısı + /api/pronounce kullanıyor, mobil
 * cihazın kendi tanıyıcısını (`listenOnce`) ve yerel eşleştirmeyi
 * (`spokenMatches`) — ses sunucuya gitmiyor, ücretsiz, çevrimdışı da çalışır.
 * Puan burada "anlaşıldı mı"dır, telaffuz notu değil; kart bunu söylemiyor
 * ama uydurma bir yüzde de göstermiyor: tuttu / tutmadı.
 */

/* ── Dil bilgisi anlatımı ────────────────────────────────────────────────── */
export type GrammarBlock = { heading?: string; tr: string; examples?: { de: string; tr: string; note?: string }[] };

export function GrammarBody({ focus, blocks, colors }: { focus: string; blocks: GrammarBlock[]; colors: Palette }) {
  return (
    <Card padded style={{ marginTop: spacing.md }}>
      <Text variant="micro" color={colors.streakText}>{t("item.grammar_rule")}</Text>
      <Text variant="h3" style={{ marginTop: 4 }}>{focus}</Text>
      {blocks.map((b, i) => (
        <View key={i} style={{ marginTop: spacing.md }}>
          {b.heading ? <Text variant="bodyStrong">{b.heading}</Text> : null}
          <Text variant="body" style={{ marginTop: b.heading ? 4 : 0 }}>{b.tr}</Text>
          {b.examples?.map((x, j) => (
            <PressableScale key={j} onPress={() => speakTarget(x.de)} accessibilityLabel={t("item.listen_example")}
              style={{ marginTop: spacing.sm, flexDirection: "row", gap: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}>
              <SpeakerIcon color={colors.primaryText} size={16} />
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{x.de}</Text>
                <Text variant="caption" color={colors.textMuted}>{x.tr}</Text>
                {x.note ? <Text variant="micro" color={colors.streakText} style={{ marginTop: 2 }}>{x.note}</Text> : null}
              </View>
            </PressableScale>
          ))}
        </View>
      ))}
    </Card>
  );
}

/* ── Söyleyiş drilli ─────────────────────────────────────────────────────── */
export type SpeakingTask = {
  de: string; tr: string; hint?: string;
  confusions?: { heard: string[]; fix: string; expected?: string }[];
};

type Verdict = "idle" | "listening" | "ok" | "near" | "miss" | "unheard";

/**
 * Cümle cümle söyleyiş: dinle → söyle → tanıyıcı ne duydu → tuttu/tutmadı.
 * "near": duyulan metin bilinen bir sapmayla eşleşiyor (`confusions.heard`),
 * o zaman düzeltme cümlesi gösterilir — sayı değil, düzeltme öğretir.
 */
export function SpeakingDrill({ tasks, onAllDone, colors }: { tasks: SpeakingTask[]; onAllDone: (passed: number) => void; colors: Palette }) {
  const [idx, setIdx] = useState(0);
  const [verdict, setVerdict] = useState<Verdict>("idle");
  const [heard, setHeard] = useState<string>("");
  const [passed, setPassed] = useState(0);
  const [sttOk, setSttOk] = useState<boolean | null>(null);
  const task = tasks[idx];
  const last = idx + 1 >= tasks.length;

  useEffect(() => {
    let alive = true;
    sttAvailable().then((v) => { if (alive) setSttOk(v); }).catch(() => { if (alive) setSttOk(false); });
    return () => { alive = false; stopListening(); };
  }, []);

  async function listen() {
    if (verdict === "listening") return;
    const izin = await ensureMicPermission();
    if (!izin) { setSttOk(false); return; }
    setVerdict("listening");
    setHeard("");
    /* Pencere ortak sabitten; satir icinde adsiz bir 9000 yaziliydi. */
    const h = await listenOnce(currentTargetLocale(), SPEAK_CLIP_MS);
    if (!h?.length) { setVerdict("unheard"); return; }
    setHeard(h[0]);
    if (spokenMatches(h, [task.de])) { haptic("correct"); setVerdict("ok"); return; }
    const lower = h.map((s) => s.toLowerCase());
    const hit = task.confusions?.some((c) => c.heard.some((x) => lower.some((s) => s.includes(x.toLowerCase()))));
    haptic("wrong");
    setVerdict(hit ? "near" : "miss");
  }

  function advance() {
    const p = passed + (verdict === "ok" ? 1 : 0);
    setPassed(p);
    setVerdict("idle");
    setHeard("");
    if (last) onAllDone(p);
    else setIdx(idx + 1);
  }

  /*
   * BOŞ LİSTE ÇÖKERTİYORDU. `task` undefined olduğunda çizim `task.de`ye
   * dokunuyor ve ekran kırmızıya dönüyordu. Bugün içerikte görevsiz bir
   * konuşma egzersizi yok (ölçüldü: 50 egzersiz, sıfır boş) ama içerik her
   * turda yeniden üretiliyor; web aynı yerde tek satırlık bir not gösteriyor.
   */
  if (!task) {
    return (
      <Card padded style={{ marginTop: spacing.md }}>
        <Text variant="body" color={colors.textMuted}>{t("speakp.no_sentences")}</Text>
      </Card>
    );
  }

  const fixes = verdict === "near" || verdict === "miss" ? (task.confusions ?? []).map((c) => c.fix) : [];

  return (
    <Card padded style={{ marginTop: spacing.md }}>
      <Text variant="micro" color={colors.textMuted}>{idx + 1}/{tasks.length}</Text>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, marginTop: 6 }}>
        <Text variant="h3" style={{ flex: 1 }}>{task.de}</Text>
        <PressableScale onPress={() => speakTarget(task.de)} hitSlop={8} accessibilityLabel={t("item.read_aloud")}
          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" }}>
          <SpeakerIcon color={colors.primaryText} size={18} />
        </PressableScale>
      </View>
      <Text variant="caption" color={colors.textMuted} style={{ marginTop: 4 }}>{task.tr}</Text>
      {task.hint ? (
        <View style={{ marginTop: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}>
          <Text variant="caption" color={colors.text}>{task.hint}</Text>
        </View>
      ) : null}

      {sttOk === false ? (
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("item.mic_unavailable")}</Text>
      ) : null}

      {verdict === "idle" || verdict === "listening" ? (
        <PressableScale onPress={listen} disabled={verdict === "listening" || sttOk === false}
          style={[{ marginTop: spacing.md, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: spacing.sm, backgroundColor: verdict === "listening" ? colors.danger : colors.primary, borderRadius: radii.lg, paddingVertical: 14 }, softShadow(colors.primary, 8)]}>
          <MicIcon color={colors.onPrimary} size={18} />
          <Text variant="bodyStrong" color={colors.onPrimary}>{t(verdict === "listening" ? "item.speak_listening" : "item.speak_record")}</Text>
        </PressableScale>
      ) : null}

      {verdict !== "idle" && verdict !== "listening" ? (
        <View style={{ marginTop: spacing.md }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            {verdict === "ok" ? <CheckIcon color={colors.successText} size={18} /> : <XIcon color={colors.dangerText} size={18} />}
            <Text variant="bodyStrong" color={verdict === "ok" ? colors.successText : colors.dangerText}>
              {t(verdict === "ok" ? "item.speak_ok" : verdict === "unheard" ? "item.speak_unheard" : "item.speak_miss")}
            </Text>
          </View>
          {heard ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 4 }}>{t("item.heard", { text: heard })}</Text> : null}
          {fixes.map((f, i) => (
            <View key={i} style={{ marginTop: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}>
              <Text variant="caption" color={colors.text}>{f}</Text>
            </View>
          ))}
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
            <PressableScale onPress={listen} style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.lg, paddingVertical: 12, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.text}>{t("item.speak_again")}</Text>
            </PressableScale>
            <PressableScale onPress={advance} style={{ flex: 1, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 12, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.onPrimary}>{t(last ? "item.speak_finish" : "item.speak_next")}</Text>
            </PressableScale>
          </View>
        </View>
      ) : null}

      {sttOk === false && (verdict === "idle") ? (
        <PressableScale onPress={advance} style={{ marginTop: spacing.sm, alignSelf: "center" }}>
          <Text variant="bodyStrong" color={colors.primaryText}>{t(last ? "item.skip_unscored_finish" : "item.skip_unscored")}</Text>
        </PressableScale>
      ) : null}
    </Card>
  );
}

/* ── Monolog ─────────────────────────────────────────────────────────────── */
export type Monologue = {
  promptTr: string; bulletsTr: string[]; targets: Gloss[];
  minSeconds: number; maxSeconds: number; sampleDe: string; rubricHint?: string;
};

type Phase = "prep" | "record" | "review" | "scoring" | "result";

/**
 * Hazırlık → kayıt → transkript → rubrik. Kayıt cihaz tanıyıcısıyla, art arda
 * kısa pencerelerde (`listenOnce` sessizlikte kapanıyor; döngü onu kullanıcı
 * "Bitir" diyene kadar yeniden açıyor ve metni biriktiriyor). Sunucuya yalnız
 * METİN gider (/api/assess, kind: speaking) — ses gitmez. Tanıyıcı yoksa öz
 * değerlendirme: madde işaretleri işaretlenir, puan kaydedilmez.
 */
export function MonologueBody({ mono, level, exerciseId, onDone, colors }: {
  mono: Monologue; level: string; exerciseId: string;
  onDone: (ok: boolean, score?: number) => void; colors: Palette;
}) {
  const [phase, setPhase] = useState<Phase>("prep");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [sttOk, setSttOk] = useState<boolean | null>(null);
  const [checks, setChecks] = useState<boolean[]>(() => mono.bulletsTr.map(() => false));
  const [result, setResult] = useState<{ overall: number; praise: string; tip: string; corrected: string } | null>(null);
  const [failed, setFailed] = useState(false);
  /**
   * Sunucu bir KAPI yüzünden reddettiyse gösterilecek not.
   *
   * Eskiden `gated: boolean` idi ve yalnız premium kapısını anlatıyordu; adil
   * kullanım kapısı (429) hiç ayrılmıyordu. İki kapı iki ayrı cümle: biri
   * "bu senin katmanında yok", öteki "var ama bugünlük bitti".
   */
  const [gateNote, setGateNote] = useState<string | null>(null);
  const [showSample, setShowSample] = useState(false);
  const recording = useRef(false);
  const textRef = useRef("");

  useEffect(() => {
    let alive = true;
    sttAvailable().then((v) => { if (alive) setSttOk(v); }).catch(() => { if (alive) setSttOk(false); });
    return () => { alive = false; recording.current = false; stopListening(); };
  }, []);

  useEffect(() => {
    if (phase !== "record") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);
  useEffect(() => {
    if (phase === "record" && seconds >= mono.maxSeconds) void stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, phase]);

  async function start() {
    const izin = await ensureMicPermission();
    if (!izin) { setSttOk(false); }
    setSeconds(0);
    textRef.current = "";
    setTranscript("");
    setPhase("record");
    if (!izin || sttOk === false) return;
    recording.current = true;
    // Döngü: tanıyıcı her sessizlikte kapanır, biz yeniden açarız.
    while (recording.current) {
      const h = await listenOnce(currentTargetLocale(), MONOLOGUE_CHUNK_MS);
      if (!recording.current) break;
      if (h?.[0]) {
        textRef.current = `${textRef.current} ${h[0]}`.replace(/\s+/g, " ").trim();
        setTranscript(textRef.current);
      }
    }
  }

  async function stop() {
    recording.current = false;
    stopListening();
    setPhase("review");
  }

  async function evaluate() {
    const text = transcript.trim();
    if (!text) return;
    setPhase("scoring");
    try {
      const d = await api<{ result: { score?: { overall?: number }; praise_tr?: string; next_tip_tr?: string; corrected?: string } }>("/api/assess", {
        method: "POST",
        body: JSON.stringify({
          kind: "speaking", level,
          task: { prompt: mono.promptTr, targets: mono.targets.map((x) => x.de), constraints: [`${mono.minSeconds}–${mono.maxSeconds} saniye`, ...(mono.rubricHint ? [mono.rubricHint] : [])] },
          answer: { text, transcript: [text] }, exerciseId, lang: currentTargetLang(),
          /* `day` YAZMA anahtarı: satır o güne yazılıyor, günlük kota da o günün
             satırlarından sayılıyor. Gönderilmezse sunucunun UTC günü işliyor ve
             gece yarısından sonraki değerlendirme dünkü güne düşüyor. */
          day: todayStr(),
        }),
      });
      const overall = d.result?.score?.overall ?? 0;
      setResult({ overall, praise: d.result?.praise_tr ?? "", tip: d.result?.next_tip_tr ?? "", corrected: d.result?.corrected ?? "" });
      setPhase("result");
      onDone(overall >= RUBRIC_PASS_PCT, overall);
    } catch (e) {
      /*
       * KAPI AĞ HATASI DEĞİL — VE KAPIDA YEDEK PUAN ÜRETİLMİYOR.
       *
       * Önceki hâlde `if (isPremiumRefusal(e)) setGated(true);` süslü ayraçsız
       * ve `return`suz duruyordu: bayrak konuyor, ama akış hemen altındaki
       * yedek puan hesabına DEVAM ediyordu ve `onDone(ok)` uydurma bir sonuç
       * bildiriyordu. Yani kapının önlemek için yazıldığı şey yine oluyordu.
       *
       * Adil kullanım kapısı (429) da hiç ayrılmıyordu; `ExamScreen` ikisini
       * baştan beri ayırıyor ve aynı iki anahtarı kullanıyor.
       */
      if (isPremiumRefusal(e) || isQuotaRefusal(e)) {
        if (isPremiumRefusal(e)) notePremiumGate("speaking");
        setGateNote(isPremiumRefusal(e) ? t("assess.fail_premium") : t("assess.fail_quota"));
        setResult(null);
        setPhase("result");
        return;
      }
      // Sağlayıcı/ağ yoksa alıştırma durmaz: kalıp kullanımı ve süreyle kaba bir karar.
      // Sebebi de söyleniyor (bkz. `lib/assessFail`); "puanlanamadı" tek başına
      // ne olduğunu anlatmıyordu.
      setGateNote(`${t(assessFailKey(e))} ${t("item.mono_unscored")}`);
      setFailed(true);
      const used = mono.targets.filter((x) => text.toLowerCase().includes(x.de.split(/…|\.\.\./)[0].trim().toLowerCase())).length;
      const ok = used >= Math.ceil(mono.targets.length / 2) && seconds >= mono.minSeconds;
      setResult(null);
      setPhase("result");
      onDone(ok);
    }
  }

  function selfFinish() {
    const ok = checks.filter(Boolean).length >= Math.ceil(checks.length * 0.6);
    setPhase("result");
    onDone(ok);
  }

  const mm = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const used = mono.targets.map((x) => ({ ...x, used: transcript.toLowerCase().includes(x.de.split(/…|\.\.\./)[0].replace(/[^\p{L}\p{N}' ]/gu, " ").trim().toLowerCase()) }));

  return (
    <Card padded style={{ marginTop: spacing.md }}>
      {phase === "prep" ? (
        <>
          <Text variant="micro" color={colors.primaryText}>{t("item.mono_prep")}</Text>
          <Text variant="bodyStrong" style={{ marginTop: 6 }}>{mono.promptTr}</Text>
          {mono.bulletsTr.map((b, i) => <Text key={i} variant="body" color={colors.text} style={{ marginTop: 6 }}>• {b}</Text>)}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: spacing.md }}>
            {mono.targets.map((x) => (
              <PressableScale key={x.de} onPress={() => speakTarget(x.de)} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 5 }}>
                <Text variant="micro" color={colors.text}>{x.de} · {x.tr}</Text>
              </PressableScale>
            ))}
          </View>
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>
            {t("item.mono_duration", { min: mono.minSeconds, max: mono.maxSeconds })} {sttOk === false ? t("item.mono_no_stt") : t("item.mono_will_score")}
          </Text>
          <PressableScale onPress={() => void start()} style={[{ marginTop: spacing.md, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: spacing.sm, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14 }, softShadow(colors.primary, 8)]}>
            <MicIcon color={colors.onPrimary} size={18} />
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("item.mono_start")}</Text>
          </PressableScale>
        </>
      ) : null}

      {phase === "record" ? (
        <>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text variant="micro" color={colors.dangerText}>● {t("item.mono_recording")}</Text>
            <Text variant="bodyStrong">{mm(seconds)} / {mm(mono.maxSeconds)}</Text>
          </View>
          {mono.bulletsTr.map((b, i) => <Text key={i} variant="caption" color={colors.textMuted} style={{ marginTop: 4 }}>· {b}</Text>)}
          <View style={{ marginTop: spacing.md, minHeight: 60, backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}>
            <Text variant="body" color={transcript ? colors.text : colors.textMuted}>
              {transcript || t(sttOk === false ? "item.mono_recording" : "item.mono_listening")}
            </Text>
          </View>
          <PressableScale onPress={() => void stop()} disabled={seconds < mono.minSeconds}
            style={{ marginTop: spacing.md, backgroundColor: seconds < mono.minSeconds ? colors.surface2 : colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={seconds < mono.minSeconds ? colors.textFaint : colors.onPrimary}>
              {seconds < mono.minSeconds ? t("item.mono_stop_in", { n: mono.minSeconds - seconds }) : t("item.mono_stop")}
            </Text>
          </PressableScale>
        </>
      ) : null}

      {phase === "review" ? (
        <>
          <Text variant="micro" color={colors.primaryText}>{t("item.mono_review")}</Text>
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: 4 }}>{t("item.mono_spoke", { time: mm(seconds) })}</Text>
          {sttOk !== false ? (
            <>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{t("item.mono_transcript_hint")}</Text>
              {/* Alanin ADI: yertutucu yok, ad hemen ustundeki ipucu
                  satirindan geliyor (web `monologue-player` de ayni ipucunu
                  yaziyor). */}
              <TextInput value={transcript} onChangeText={setTranscript} multiline autoCapitalize="sentences" autoCorrect={false} accessibilityLabel={t("item.mono_transcript_hint")}
                style={{ marginTop: spacing.sm, minHeight: 100, textAlignVertical: "top", backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, padding: spacing.md, color: colors.text, fontSize: 15, lineHeight: 22 }} />
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: spacing.sm }}>
                {used.map((x) => (
                  <View key={x.de} style={{ backgroundColor: x.used ? colors.successSoft : colors.surface2, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 5 }}>
                    <Text variant="micro" color={x.used ? colors.successText : colors.textMuted}>{x.used ? "✓ " : ""}{x.de}</Text>
                  </View>
                ))}
              </View>
              <PressableScale onPress={() => void evaluate()} disabled={!transcript.trim()}
                style={{ marginTop: spacing.md, backgroundColor: transcript.trim() ? colors.primary : colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
                <Text variant="bodyStrong" color={transcript.trim() ? colors.onPrimary : colors.textFaint}>{t("item.mono_score")}</Text>
              </PressableScale>
            </>
          ) : (
            <>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{t("item.mono_self")}</Text>
              {mono.bulletsTr.map((b, i) => (
                <PressableScale key={i} onPress={() => setChecks(checks.map((c, j) => (j === i ? !c : c)))} style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.sm }}>
                  <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: checks[i] ? colors.success : colors.border, backgroundColor: checks[i] ? colors.successSoft : colors.surface, alignItems: "center", justifyContent: "center" }}>
                    {checks[i] ? <CheckIcon color={colors.successText} size={14} /> : null}
                  </View>
                  <Text variant="body" style={{ flex: 1 }}>{b}</Text>
                </PressableScale>
              ))}
              <PressableScale onPress={selfFinish} style={{ marginTop: spacing.md, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
                <Text variant="bodyStrong" color={colors.onPrimary}>{t("item.mono_finish")}</Text>
              </PressableScale>
            </>
          )}
        </>
      ) : null}

      {phase === "scoring" ? (
        <Text variant="bodyStrong" style={{ textAlign: "center", paddingVertical: spacing.lg }}>{t("item.mono_scoring")}</Text>
      ) : null}

      {phase === "result" ? (
        /* SONUÇ DUYURULUYOR — web `monologue-player`/`speaking-player` ile
           aynı yerde. Puan, övgü, ipucu ve düzeltilmiş metin bir eylemin
           cevabı: kayıt bitiyor, odak düğmede kalıyor ve ekran okuyucu hiçbir
           şey söylemiyordu. İki platform da sessizdi (§11.228 sınıfı), yani
           karşılaştırma bunu bulamazdı. */
        <View accessibilityLiveRegion="polite">
          {result ? (
            <>
              <Text variant="h2">{formatPercent(result.overall)}</Text>
              {result.praise ? <Text variant="body" style={{ marginTop: spacing.sm }}>{result.praise}</Text> : null}
              {result.tip ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{result.tip}</Text> : null}
              {result.corrected ? (
                <View style={{ marginTop: spacing.md, backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}>
                  <Text variant="micro" color={colors.textMuted} style={{ marginBottom: 4 }}>{t("item.mono_corrected")}</Text>
                  <Text variant="body">{result.corrected}</Text>
                </View>
              ) : null}
            </>
          ) : (
            <Text variant="body" color={colors.textMuted}>
              {gateNote ? gateNote : failed ? t("item.mono_unscored") : t("item.mono_self_done", { n: checks.filter(Boolean).length, total: checks.length })}
            </Text>
          )}
          <PressableScale onPress={() => setShowSample((v) => !v)} style={{ marginTop: spacing.md, alignSelf: "flex-start" }}>
            <Text variant="bodyStrong" color={colors.primaryText}>{t(showSample ? "item.mono_hide_sample" : "item.mono_sample")}</Text>
          </PressableScale>
          {showSample ? (
            <View style={{ marginTop: spacing.sm, backgroundColor: colors.successSoft, borderRadius: radii.md, padding: spacing.md }}>
              <Text variant="body">{mono.sampleDe}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
