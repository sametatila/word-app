import React, { useState } from "react";
import { t as tx, targetLangName } from "../lib/i18n";
import { View, TextInput } from "react-native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, XIcon, SpeakerIcon } from "../ui/icons";
import { speakTarget } from "../lib/tts";
import { currentTargetLang, currentTargetLocale } from "../lib/courses";
import { foldCompare } from "../lib/textFold";
import { ensureMicPermission, listenOnce } from "../lib/stt";
import { spokenMatches } from "../lib/voiceMatch";
import { haptic } from "../lib/haptics";
import { spacing, radii, type Palette } from "../theme";
import type { Gloss, SkillQuestion } from "../data/skills";

/**
 * Beceri soruları — web'in quiz.tsx'inin mobil karşılığı. sınav kâğıdı gibi
 * hepsi alt alta; şık seçilince kilitlenir, doğru/yanlış boyanır, Türkçe
 * açıklama açılır. Yazılı türlerde toleranslı eşleşme (umlaut/büyük-küçük/tek
 * harf sapma). Hepsi cevaplanınca toplam doğru üst bileşene bildirilir.
 */

/**
 * Sabit `de-DE` küçültme + koşulsuz umlaut katlaması yazılıydı, yani İngilizce
 * beceri egzersizlerinde de Almanca kuralı işliyordu. Ortak katlama hedef dile
 * bakıyor ve sayıları da indiriyor ("two" ↔ "2").
 */
function fold(s: string): string {
  return foldCompare(s, currentTargetLang());
}
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}
export function written(typed: string, accept: string[]): boolean {
  const t = fold(typed);
  if (!t) return false;
  return accept.some((a) => {
    const f = fold(a);
    if (f === t) return true;
    return f.length >= 5 && levenshtein(f, t) <= 1;
  });
}

export function QuestionList({ questions, onAllAnswered, colors }: {
  questions: SkillQuestion[]; onAllAnswered: (correct: number) => void; colors: Palette;
}) {
  const [results, setResults] = useState<(boolean | null)[]>(() => questions.map(() => null));

  function settle(qi: number, ok: boolean) {
    if (results[qi] !== null) return;
    haptic(ok ? "correct" : "wrong");
    const next = [...results];
    next[qi] = ok;
    setResults(next);
    if (next.every((r) => r !== null)) onAllAnswered(next.filter(Boolean).length);
  }

  return (
    <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
      <Text variant="h3">{tx("skillquiz.questions")}</Text>
      {questions.map((q, qi) => {
        const kind = q.kind ?? "mcq";
        const done = results[qi] !== null;
        const ok = results[qi] === true;
        return (
          <Card key={qi} padded>
            <Text variant="bodyStrong" style={{ lineHeight: 22 }}>
              <Text variant="bodyStrong" color={colors.textMuted}>{qi + 1}. </Text>{q.text}
            </Text>
            {kind === "order" ? (
              <OrderInput q={q} done={done} onSettle={(o) => settle(qi, o)} colors={colors} />
            ) : kind === "gapfill" || kind === "short_answer" || kind === "dictation" ? (
              <WrittenInput q={q} kind={kind} done={done} onSettle={(o) => settle(qi, o)} colors={colors} />
            ) : (
              <ChoiceInput q={q} done={done} onSettle={(o) => settle(qi, o)} colors={colors} />
            )}
            {done ? (
              <View style={{ marginTop: spacing.md, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 10, backgroundColor: ok ? colors.successSoft : colors.surface2 }}>
                <Text variant="caption" color={colors.text} style={{ lineHeight: 19 }}>{q.explain}</Text>
              </View>
            ) : null}
          </Card>
        );
      })}
    </View>
  );
}

function ChoiceInput({ q, done, onSettle, colors }: { q: SkillQuestion; done: boolean; onSettle: (ok: boolean) => void; colors: Palette }) {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
      {q.options.map((opt, oi) => {
        const isAnswer = oi === q.answer;
        const bg = !done ? colors.surface : isAnswer ? colors.successSoft : pick === oi ? colors.dangerSoft ?? colors.surface2 : colors.surface;
        const bc = !done ? colors.border : isAnswer ? colors.success : pick === oi ? colors.danger : colors.hairline;
        return (
          <PressableScale key={oi} onPress={() => { if (done) return; setPick(oi); onSettle(isAnswer); }}
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: 12, borderRadius: radii.md, borderWidth: 1.5, borderColor: bc, backgroundColor: bg, opacity: done && !isAnswer && pick !== oi ? 0.55 : 1 }}>
            <Text variant="body" color={colors.text} style={{ flex: 1 }}>{opt}</Text>
            {done && isAnswer ? <CheckIcon color={colors.success} size={18} /> : done && pick === oi ? <XIcon color={colors.danger} size={18} /> : null}
          </PressableScale>
        );
      })}
    </View>
  );
}

function WrittenInput({ q, kind, done, onSettle, colors }: { q: SkillQuestion; kind: string; done: boolean; onSettle: (ok: boolean) => void; colors: Palette }) {
  const [typed, setTyped] = useState("");
  const accept = q.accept ?? [];
  const ok = done && written(typed, accept);
  return (
    <View style={{ marginTop: spacing.md }}>
      {kind === "dictation" ? (
        <PressableScale onPress={() => speakTarget(accept[0] ?? "")} style={{ flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", marginBottom: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 7 }}>
          <SpeakerIcon color={colors.primary} size={15} /><Text variant="caption" color={colors.primary}>{tx("skillquiz.listen_to_sentence")}</Text>
        </PressableScale>
      ) : null}
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.sm }}>
        <TextInput value={typed} onChangeText={setTyped} editable={!done} autoCapitalize="none" spellCheck={false}
          placeholder={tx(kind === "dictation" ? "skillquiz.ph_dictation" : kind === "gapfill" ? "skillquiz.ph_gapfill" : "skillquiz.ph_short")} placeholderTextColor={colors.textFaint}
          style={{ flex: 1, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: done ? (ok ? colors.success : colors.danger) : colors.border, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15 }} />
        {!done ? (
          <PressableScale onPress={() => { if (typed.trim()) onSettle(written(typed, accept)); }} disabled={!typed.trim()}
            style={{ backgroundColor: typed.trim() ? colors.primary : colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 11 }}>
            <Text variant="bodyStrong" color={typed.trim() ? colors.onPrimary : colors.textFaint}>{tx("skillquiz.check")}</Text>
          </PressableScale>
        ) : null}
      </View>
      {done && !ok ? (
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: 6 }}>{tx("common.answer_is")} <Text variant="caption" color={colors.text}>{accept[0]}</Text></Text>
      ) : null}
    </View>
  );
}

function OrderInput({ q, done, onSettle, colors }: { q: SkillQuestion; done: boolean; onSettle: (ok: boolean) => void; colors: Palette }) {
  const items = q.items ?? [];
  const [order, setOrder] = useState<number[]>(() => {
    const idx = items.map((_, i) => i);
    const rotated = [...idx.slice(1), idx[0]].reverse();
    return rotated.every((v, i) => v === i) ? idx.reverse() : rotated;
  });
  const [picked, setPicked] = useState<number | null>(null);
  const correct = order.every((v, i) => v === i);

  function tap(pos: number) {
    if (done) return;
    if (picked === null) { setPicked(pos); return; }
    const next = [...order];
    [next[picked], next[pos]] = [next[pos], next[picked]];
    setOrder(next); setPicked(null);
  }

  return (
    <View style={{ marginTop: spacing.md }}>
      <Text variant="caption" color={colors.textMuted}>{tx("skillquiz.put_these_in_right_order_tap_two")}</Text>
      <View style={{ marginTop: spacing.sm, gap: 6 }}>
        {order.map((v, pos) => {
          const bc = done ? (v === pos ? colors.success : colors.danger) : picked === pos ? colors.primary : colors.border;
          return (
            <PressableScale key={v} onPress={() => tap(pos)} style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: 11, borderRadius: radii.md, borderWidth: 1.5, borderColor: bc, backgroundColor: colors.surface }}>
              <Text variant="caption" color={colors.textMuted} style={{ width: 18 }}>{pos + 1}.</Text>
              <Text variant="body" color={colors.text} style={{ flex: 1 }}>{items[v]}</Text>
            </PressableScale>
          );
        })}
      </View>
      {!done ? (
        <PressableScale onPress={() => onSettle(correct)} style={{ marginTop: spacing.sm, alignSelf: "flex-start", backgroundColor: colors.primary, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 11 }}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{tx("skillquiz.check")}</Text>
        </PressableScale>
      ) : null}
    </View>
  );
}

/** Egzersize özel mini sözlükçe — kapalı başlar, dokununca telaffuz. */
export function GlossPanel({ gloss, colors }: { gloss: Gloss[]; colors: Palette }) {
  const [open, setOpen] = useState(false);
  if (!gloss.length) return null;
  return (
    <Card padded style={{ marginTop: spacing.md }}>
      <PressableScale onPress={() => setOpen((v) => !v)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text variant="bodyStrong">{tx("skillquiz.glossary")} <Text variant="caption" color={colors.textMuted}>{tx("skillquiz.word_count", { n: gloss.length })}</Text></Text>
        <Text variant="caption" color={colors.textMuted}>{tx(open ? "user.hide" : "common.show")}</Text>
      </PressableScale>
      {open ? (
        <View style={{ marginTop: spacing.md, flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {gloss.map((g) => (
            <PressableScale key={g.de} onPress={() => speakTarget(g.de)} style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 7 }}>
              <SpeakerIcon color={colors.textMuted} size={13} />
              <Text variant="caption" color={colors.text}><Text variant="caption" color={colors.text} style={{ fontWeight: "700" }}>{g.de}</Text> · {g.tr}{g.hd ? ` (${g.hd})` : ""}</Text>
            </PressableScale>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

/* ───────────── yazma görevleri ───────────── */

type BuildTask = { kind: "build"; tr: string; answer: string; alternatives?: string[]; hint?: string };
type FreeTask = { kind: "free"; prompt: string; stimulus?: string; checklist: string[]; minWords: number; phrases: Gloss[]; sample: string };
export type WritingTask = BuildTask | FreeTask;

/** Yazma egzersizi görevleri — de içeriğinde iki tür: build (TR→DE cümle) ve free. */
export function WritingList({ tasks, onAllDone, colors }: { tasks: WritingTask[]; onAllDone: (correct: number) => void; colors: Palette }) {
  const [results, setResults] = useState<(boolean | null)[]>(() => tasks.map(() => null));
  function settle(i: number, ok: boolean) {
    if (results[i] !== null) return;
    haptic(ok ? "correct" : "wrong");
    const n = [...results]; n[i] = ok; setResults(n);
    if (n.every((r) => r !== null)) onAllDone(n.filter(Boolean).length);
  }
  return (
    <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
      <Text variant="h3">{tx("skillquiz.tasks")}</Text>
      {tasks.map((t, i) =>
        t.kind === "build"
          ? <BuildCard key={i} t={t} n={i + 1} done={results[i] !== null} onSettle={(ok) => settle(i, ok)} colors={colors} />
          : <FreeCard key={i} t={t} n={i + 1} done={results[i] !== null} onSettle={(ok) => settle(i, ok)} colors={colors} />,
      )}
    </View>
  );
}

function BuildCard({ t, n, done, onSettle, colors }: { t: BuildTask; n: number; done: boolean; onSettle: (ok: boolean) => void; colors: Palette }) {
  const [typed, setTyped] = useState("");
  const accept = [t.answer, ...(t.alternatives ?? [])];
  const ok = done && written(typed, accept);
  return (
    <Card padded>
      <Text variant="bodyStrong"><Text variant="bodyStrong" color={colors.textMuted}>{n}. </Text>{t.tr}</Text>
      <View style={{ marginTop: spacing.md, flexDirection: "row", alignItems: "flex-end", gap: spacing.sm }}>
        <TextInput value={typed} onChangeText={setTyped} editable={!done} multiline autoCapitalize="sentences"
          placeholder={tx("skillquiz.write_sentence", { lang: targetLangName() })} placeholderTextColor={colors.textFaint}
          style={{ flex: 1, minHeight: 44, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: done ? (ok ? colors.success : colors.danger) : colors.border, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15 }} />
        {!done ? (
          <PressableScale onPress={() => { if (typed.trim()) onSettle(written(typed, accept)); }} disabled={!typed.trim()}
            style={{ backgroundColor: typed.trim() ? colors.primary : colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 11 }}>
            <Text variant="bodyStrong" color={typed.trim() ? colors.onPrimary : colors.textFaint}>{tx("skillquiz.check")}</Text>
          </PressableScale>
        ) : null}
      </View>
      {done ? (
        <View style={{ marginTop: spacing.sm }}>
          {!ok ? <Text variant="caption" color={colors.textMuted}>{tx("common.answer_is")} <Text variant="caption" color={colors.text} style={{ fontWeight: "700" }}>{t.answer}</Text></Text> : null}
          {t.hint ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 4 }}>{t.hint}</Text> : null}
        </View>
      ) : null}
    </Card>
  );
}

function FreeCard({ t, n, done, onSettle, colors }: { t: FreeTask; n: number; done: boolean; onSettle: (ok: boolean) => void; colors: Palette }) {
  const [typed, setTyped] = useState("");
  const [reveal, setReveal] = useState(false);
  const words = typed.trim() ? typed.trim().split(/\s+/).length : 0;
  const enough = words >= t.minWords;
  return (
    <Card padded>
      <Text variant="bodyStrong"><Text variant="bodyStrong" color={colors.textMuted}>{n}. </Text>{t.prompt}</Text>
      {t.stimulus ? (
        <View style={{ marginTop: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}>
          <Text variant="caption" color={colors.text} style={{ lineHeight: 20 }}>{t.stimulus}</Text>
        </View>
      ) : null}
      {t.checklist?.length ? (
        <View style={{ marginTop: spacing.sm, gap: 3 }}>
          {t.checklist.map((c, i) => <Text key={i} variant="caption" color={colors.textMuted}>• {c}</Text>)}
        </View>
      ) : null}
      {t.phrases?.length ? (
        <View style={{ marginTop: spacing.sm, flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
          {t.phrases.map((p) => (
            <PressableScale key={p.de} onPress={() => speakTarget(p.de)} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 5 }}>
              <Text variant="micro" color={colors.text}>{p.de} · {p.tr}</Text>
            </PressableScale>
          ))}
        </View>
      ) : null}
      <TextInput value={typed} onChangeText={setTyped} editable={!done} multiline autoCapitalize="sentences"
        placeholder={tx("skillquiz.write_your_answer_in", { lang: targetLangName() })} placeholderTextColor={colors.textFaint}
        style={{ marginTop: spacing.md, minHeight: 100, textAlignVertical: "top", backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, padding: spacing.md, color: colors.text, fontSize: 15, lineHeight: 22 }} />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm }}>
        <Text variant="micro" color={enough ? colors.success : colors.textMuted}>{words}/{t.minWords} kelime</Text>
        {!done ? (
          <PressableScale onPress={() => { if (enough) { setReveal(true); onSettle(true); } }} disabled={!enough}
            style={{ backgroundColor: enough ? colors.primary : colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 10 }}>
            <Text variant="bodyStrong" color={enough ? colors.onPrimary : colors.textFaint}>{tx("common.send")}</Text>
          </PressableScale>
        ) : null}
      </View>
      {(done || reveal) && t.sample ? (
        <View style={{ marginTop: spacing.md, backgroundColor: colors.successSoft, borderRadius: radii.md, padding: spacing.md }}>
          <Text variant="micro" color={colors.textMuted} style={{ marginBottom: 4 }}>{tx("skillquiz.sample_answer")}</Text>
          <Text variant="body" color={colors.text} style={{ lineHeight: 22 }}>{t.sample}</Text>
        </View>
      ) : null}
    </Card>
  );
}

/* ─────────────────────────── KONUŞMA ─────────────────────────── */

export type SpeakingTask = {
  de: string;
  tr: string;
  hint?: string;
  confusions?: { heard: string[]; fix: string; expected?: string }[];
};

/**
 * Ses çalışması listesi — mobil.
 *
 * NEDEN NATIVE STT, SUNUCU PUANLAMASI DEĞİL: cihazda zaten çalışan, ücretsiz
 * ve ekran açıkken kusursuz bir tanıyıcı var (yürüyüş modu onu kullanıyor).
 * Sunucu telaffuz puanlaması paralı ve ağ gerektiriyor; alıştırma yüzeyinde
 * bunu her cümle için ödemek doğru değil. Karar `spokenMatches` ile veriliyor —
 * kelime turlarında ve yürüyüş modunda kullanılan, iki yönde de ölçülmüş
 * eşleştirme (bkz. lib/voiceMatch.ts).
 *
 * `confusions.heard` alanı burada TAM olarak tasarlandığı işi yapıyor:
 * "öğrenci bu hatayı yaparsa tanıyıcı şunu yazar". Tanıyıcının çıktısı o
 * listeyle eşleşirse öğrenciye genel bir "yanlış" değil, hatasının ADI
 * söyleniyor — "z'yi ts diye söyle" gibi.
 */
const t = tx;

export function SpeakingList({
  tasks,
  onAllDone,
  colors,
}: {
  tasks: SpeakingTask[];
  onAllDone: (correct: number) => void;
  colors: Palette;
}) {
  const [idx, setIdx] = useState(0);
  const [durum, setDurum] = useState<"idle" | "rec" | "ok" | "no" | "err">("idle");
  const [duyulan, setDuyulan] = useState<string>("");
  const [ipucu, setIpucu] = useState<string | null>(null);
  const [gecen, setGecen] = useState(0);
  const task = tasks[idx];
  const son = idx + 1 >= tasks.length;

  async function dinle() {
    if (durum === "rec") return;
    const izin = await ensureMicPermission();
    if (!izin) {
      setIpucu(t("speak.mic_needed"));
      setDurum("err");
      return;
    }
    setDurum("rec");
    setIpucu(null);
    setDuyulan("");
    const heard = await listenOnce(currentTargetLocale(), 8000);
    if (!heard || !heard.length) {
      setDurum("err");
      setIpucu(t("speak.not_heard"));
      return;
    }
    setDuyulan(heard[0]);
    if (spokenMatches(heard, [task.de])) {
      setGecen((n) => n + 1);
      setDurum("ok");
      return;
    }
    // Hangi bilinen sapmaya düştüğünü bul: genel "yanlış" yerine adını söyle.
    const düz = heard.map((h) => h.toLowerCase());
    const eşleşen = (task.confusions ?? []).find((c) =>
      c.heard.some((x) => düz.some((h) => h.includes(x.toLowerCase()))),
    );
    setIpucu(eşleşen?.fix ?? task.hint ?? null);
    setDurum("no");
  }

  function ilerle() {
    setDurum("idle");
    setIpucu(null);
    setDuyulan("");
    if (!son) setIdx(idx + 1);
    else onAllDone(gecen);
  }

  if (!task) return null;

  return (
    <Card padded style={{ marginTop: spacing.md, gap: spacing.sm }}>
      <Text variant="micro" color={colors.textMuted}>
        {idx + 1}/{tasks.length}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm }}>
        <Text variant="h3" style={{ flex: 1 }}>{task.de}</Text>
        <PressableScale onPress={() => void speakTarget(task.de)} accessibilityLabel={t("item.listen")} hitSlop={6}>
          <SpeakerIcon color={colors.textMuted} size={20} />
        </PressableScale>
      </View>
      <Text variant="body" color={colors.textMuted}>{task.tr}</Text>

      {task.hint && durum === "idle" ? (
        <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 20 }}>{task.hint}</Text>
      ) : null}

      {durum === "idle" || durum === "err" ? (
        <PressableScale onPress={() => void dinle()} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center", marginTop: spacing.xs }}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("speak.record")}</Text>
        </PressableScale>
      ) : null}
      {durum === "rec" ? (
        <Text variant="bodyStrong" color={colors.primary} style={{ textAlign: "center", paddingVertical: 14 }}>{t("speak.listening")}</Text>
      ) : null}

      {duyulan ? (
        <Text variant="caption" color={colors.textMuted}>{t("speak.heard")}: {duyulan}</Text>
      ) : null}

      {durum === "ok" ? <Text variant="bodyStrong" color={colors.success}>{t("speak.correct")}</Text> : null}
      {(durum === "no" || durum === "err") && ipucu ? (
        <Text variant="body" color={colors.text} style={{ backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.sm, lineHeight: 20 }}>
          {ipucu}
        </Text>
      ) : null}

      {durum === "ok" || durum === "no" ? (
        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs }}>
          <PressableScale onPress={() => void dinle()} style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.lg, paddingVertical: 12, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.text}>{t("speak.again")}</Text>
          </PressableScale>
          <PressableScale onPress={ilerle} style={{ flex: 1, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 12, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{son ? t("item.finish") : t("common.next")}</Text>
          </PressableScale>
        </View>
      ) : null}
    </Card>
  );
}
