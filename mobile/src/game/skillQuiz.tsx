import React, { useState } from "react";
import { todayStr } from "./session";
import { t as tx, targetLangName, formatPercent } from "../lib/i18n";
import { View, TextInput } from "react-native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, XIcon, SpeakerIcon } from "../ui/icons";
import { speakTarget } from "../lib/tts";
import { currentTargetLang } from "../lib/courses";
import { foldCompare } from "../lib/textFold";
import { levenshtein } from "../lib/errors";
import { haptic } from "../lib/haptics";
import { api } from "../api/client";
import { isPremiumRefusal, isQuotaRefusal } from "../lib/premium";
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
            {done && isAnswer ? <CheckIcon color={colors.successText} size={18} /> : done && pick === oi ? <XIcon color={colors.dangerText} size={18} /> : null}
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
          <SpeakerIcon color={colors.primaryText} size={15} /><Text variant="caption" color={colors.primaryText}>{tx("skillquiz.listen_to_sentence")}</Text>
        </PressableScale>
      ) : null}
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.sm }}>
        {/* KLAVYENIN RETURN TUSU CEVABI GONDERIYOR. Webde bu alan bir
            `<form onSubmit>` icinde, yani Enter kontrol ediyor; mobilde tus
            hicbir sey yapmiyordu ve kullanici klavyeyi kapatip dugmeye
            basmak zorundaydi. Handler dugmenin ta kendisi. */}
        <TextInput value={typed} onChangeText={setTyped} editable={!done} autoCapitalize="none" spellCheck={false}
          returnKeyType="done" onSubmitEditing={() => { if (typed.trim()) onSettle(written(typed, accept)); }}
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
/** Yeniden yaz: verilen cümleyi başka biçimde (resmî, olumsuz, geçmiş). */
type RewriteTask = { kind: "rewrite"; prompt: string; source: string; answer: string; alternatives?: string[]; why?: string };
/** Form doldur: her alan ayrı bir cevap. */
type FormTask = { kind: "form"; prompt: string; facts?: string; fields: { label: string; answer: string; accept?: string[] }[] };
export type WritingTask = BuildTask | FreeTask | RewriteTask | FormTask;

/** Yazma egzersizi görevleri — de içeriğinde iki tür: build (TR→DE cümle) ve free. */
export function WritingList({ tasks, level, exerciseId, onAllDone, colors }: { tasks: WritingTask[]; level: string; exerciseId: string; onAllDone: (correct: number) => void; colors: Palette }) {
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
      {/*
        DÖRT TÜR AYRI ÇİZİLİYOR.

        Eskiden `build` dışındaki her şey `FreeCard`a gidiyordu ve tip de iki
        türü biliyordu ("içerikte iki tür var" varsayımı). İçerik ölçüldü:
        dumpta `form` (47) ve `rewrite` (189) de var ve ikisinde `minWords`
        YOK. `FreeCard`ın gönder düğmesi `words >= t.minWords` ile açılıyor,
        undefined ile karşılaştırma daima false — düğme hiç açılmıyor, görev
        settle edilemiyor, `onAllDone` hiç çağrılmıyordu. Sonuç: 356 yazma
        egzersizinin 190'ı Android'de BİTİRİLEMİYORDU. Web ikisini de kendi
        yüzeyiyle çiziyor (`skills/writing-player`).
      */}
      {tasks.map((t, i) => {
        const shared = { n: i + 1, done: results[i] !== null, onSettle: (ok: boolean) => settle(i, ok), colors };
        if (t.kind === "build") return <BuildCard key={i} t={t} {...shared} />;
        if (t.kind === "rewrite") return <RewriteCard key={i} t={t} {...shared} />;
        if (t.kind === "form") return <FormCard key={i} t={t} {...shared} />;
        return <FreeCard key={i} t={t} level={level} exerciseId={exerciseId} {...shared} />;
      })}
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

/**
 * Yeniden yaz — yapısı `BuildCard` ile aynı, tek fark KAYNAK cümlenin de
 * gösterilmesi: öğrenci onu dönüştürüyor. Web'in karşılığı
 * `skills/writing-player` içindeki `rewrite` dalı.
 */
function RewriteCard({ t, n, done, onSettle, colors }: { t: RewriteTask; n: number; done: boolean; onSettle: (ok: boolean) => void; colors: Palette }) {
  const [typed, setTyped] = useState("");
  const accept = [t.answer, ...(t.alternatives ?? [])];
  const ok = done && written(typed, accept);
  return (
    <Card padded>
      <Text variant="bodyStrong"><Text variant="bodyStrong" color={colors.textMuted}>{n}. </Text>{t.prompt}</Text>
      <View style={{ marginTop: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}>
        <Text variant="body" color={colors.text} style={{ lineHeight: 22 }}>{t.source}</Text>
      </View>
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
          {t.why ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 4 }}>{t.why}</Text> : null}
        </View>
      ) : null}
    </Card>
  );
}

/**
 * Form doldur — her alan AYRI cevap, hepsi doğruysa görev doğru.
 *
 * Alan etiketi hedef dilde ("Name", "Wohnort") ve yer tutucu olarak da o
 * kullanılıyor: ayrıca bir sözlük anahtarı gerekmiyor. `facts` senaryonun
 * bilgileri (Türkçe); öğrenci onlara bakıp alanları hedef dilde yazıyor.
 */
function FormCard({ t, n, done, onSettle, colors }: { t: FormTask; n: number; done: boolean; onSettle: (ok: boolean) => void; colors: Palette }) {
  const [vals, setVals] = useState<string[]>(() => t.fields.map(() => ""));
  const okOf = (i: number) => written(vals[i] ?? "", [t.fields[i].answer, ...(t.fields[i].accept ?? [])]);
  const filled = vals.every((v) => v.trim());
  return (
    <Card padded>
      <Text variant="bodyStrong"><Text variant="bodyStrong" color={colors.textMuted}>{n}. </Text>{t.prompt}</Text>
      {t.facts ? (
        <View style={{ marginTop: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}>
          <Text variant="caption" color={colors.text} style={{ lineHeight: 20 }}>{t.facts}</Text>
        </View>
      ) : null}
      <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
        {t.fields.map((f, i) => {
          const ok = done && okOf(i);
          return (
            <View key={f.label}>
              <Text variant="micro" color={colors.textMuted} style={{ marginBottom: 3 }}>{f.label}</Text>
              <TextInput value={vals[i]} onChangeText={(v) => setVals((p) => p.map((x, k) => (k === i ? v : x)))} editable={!done}
                placeholder={f.label} placeholderTextColor={colors.textFaint}
                style={{ minHeight: 44, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: done ? (ok ? colors.success : colors.danger) : colors.border, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15 }} />
              {done && !ok ? (
                <Text variant="caption" color={colors.textMuted} style={{ marginTop: 3 }}>
                  {tx("common.answer_is")} <Text variant="caption" color={colors.text} style={{ fontWeight: "700" }}>{f.answer}</Text>
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>
      {!done ? (
        <PressableScale onPress={() => { if (filled) onSettle(t.fields.every((_, i) => okOf(i))); }} disabled={!filled}
          style={{ marginTop: spacing.md, alignSelf: "flex-end", backgroundColor: filled ? colors.primary : colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 11 }}>
          <Text variant="bodyStrong" color={filled ? colors.onPrimary : colors.textFaint}>{tx("skillquiz.check")}</Text>
        </PressableScale>
      ) : null}
    </Card>
  );
}

/**
 * SERBEST YAZMA ARTIK PUANLANIYOR.
 *
 * Kart eskiden metni HİÇ okumuyordu: yeterli kelime yazıldığında "gönder"
 * doğru sayıyor, örnek cevabı açıyor ve görevi bitmiş işaretliyordu. Yani
 * Android'de yazma egzersizi bir metin kutusuydu; öğrenci ne yazarsa yazsın
 * (anlamsız bir dizi bile) tam puan alıyordu. Web aynı görevi baştan beri
 * rubrikle puanlıyor (`skills/writing-player` → `/api/assess`), yüzdeyi,
 * övgüyü, ipucunu ve düzeltilmiş metni gösteriyor.
 *
 * Kapılar ağ hatası DEĞİL: premium ve adil kullanım reddi ayrı söyleniyor,
 * uydurma puan verilmiyor (`ExamScreen` yazma bölümüyle aynı ayrım).
 *
 * Sağlayıcı kapalı ya da ağ yoksa metin `/api/assess/queue`e bırakılıyor -
 * sunucu servis dönünce puanlıyor ve bildirim gönderiyor. Web bunu yapıyordu,
 * mobilde metin hiç puanlanmadan kalıyordu (kayıt defteri §11.12).
 */
function FreeCard({ t, n, done, level, exerciseId, onSettle, colors }: { t: FreeTask; n: number; done: boolean; level: string; exerciseId: string; onSettle: (ok: boolean) => void; colors: Palette }) {
  const [typed, setTyped] = useState("");
  const [reveal, setReveal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [score, setScore] = useState<{ overall: number; praise: string; tip: string; corrected: string } | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [queued, setQueued] = useState(false);
  const words = typed.trim() ? typed.trim().split(/\s+/).length : 0;
  const enough = words >= t.minWords;

  function body() {
    return {
      kind: "writing", level,
      task: { prompt: t.prompt, targets: (t.phrases ?? []).map((p) => p.de), constraints: [...(t.checklist ?? []), `en az ${t.minWords} kelime`] },
      answer: { text: typed.trim() }, exerciseId, lang: currentTargetLang(),
      /* `day` YAZMA anahtarı: değerlendirme satırı o güne yazılıyor ve günlük
         kota o günün satırlarından sayılıyor. Kuyruğa giden gövde de aynı günü
         taşıyor - servis üç gün sonra dönse bile metin yazıldığı güne yazılır. */
      day: todayStr(),
    };
  }

  async function evaluate() {
    if (busy || done || !enough) return;
    setBusy(true);
    setNote(null);
    try {
      const d = await api<{ result: { score?: { overall?: number }; praise_tr?: string; next_tip_tr?: string; corrected?: string } }>("/api/assess", {
        method: "POST",
        body: JSON.stringify(body()),
      });
      const overall = d.result?.score?.overall ?? 0;
      setScore({ overall, praise: d.result?.praise_tr ?? "", tip: d.result?.next_tip_tr ?? "", corrected: d.result?.corrected ?? "" });
      setReveal(true);
      onSettle(overall >= 60);
    } catch (e) {
      if (isPremiumRefusal(e) || isQuotaRefusal(e)) {
        setNote(tx(isPremiumRefusal(e) ? "assess.fail_premium" : "assess.fail_quota"));
      } else {
        /* Sağlayıcı/ağ yok: metin kaybolmasın diye sunucu kuyruğuna bırakılıyor
           (uç kendi sınırlarını yine uyguluyor). Kuyruk da tutmazsa kullanıcı
           en azından sebebini görüyor. */
        setNote(tx("assess.fail_unscored"));
        try {
          await api("/api/assess/queue", { method: "POST", body: JSON.stringify(body()) });
          setQueued(true);
        } catch { /* kuyruk da yoksa yapacak bir şey yok */ }
      }
      /* Puan verilemedi ama görev yapıldı: alıştırma durmuyor (webde de
         yedek kural aynı kararı veriyor). */
      setReveal(true);
      onSettle(true);
    }
    setBusy(false);
  }
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
        <Text variant="micro" color={enough ? colors.successText : colors.textMuted}>{tx("skillquiz.n_words", { n: words, min: t.minWords })}</Text>
        {!done ? (
          <PressableScale onPress={evaluate} disabled={!enough || busy}
            style={{ backgroundColor: enough && !busy ? colors.primary : colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 10 }}>
            <Text variant="bodyStrong" color={enough && !busy ? colors.onPrimary : colors.textFaint}>{tx(busy ? "item.mono_scoring" : "common.send")}</Text>
          </PressableScale>
        ) : null}
      </View>
      {score ? (
        <View style={{ marginTop: spacing.md }}>
          <Text variant="h3" color={score.overall >= 60 ? colors.successText : colors.text}>{formatPercent(score.overall)}</Text>
          {score.praise ? <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{score.praise}</Text> : null}
          {score.tip ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{score.tip}</Text> : null}
          {score.corrected ? (
            <View style={{ marginTop: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.md }}>
              <Text variant="micro" color={colors.textMuted} style={{ marginBottom: 4 }}>{tx("item.mono_corrected")}</Text>
              <Text variant="body" style={{ lineHeight: 22 }}>{score.corrected}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
      {note ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm, lineHeight: 20 }}>{note}</Text> : null}
      {queued ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 4, lineHeight: 20 }}>{tx("writp.queued")}</Text> : null}
      {(done || reveal) && t.sample ? (
        <View style={{ marginTop: spacing.md, backgroundColor: colors.successSoft, borderRadius: radii.md, padding: spacing.md }}>
          <Text variant="micro" color={colors.textMuted} style={{ marginBottom: 4 }}>{tx("skillquiz.sample_answer")}</Text>
          <Text variant="body" color={colors.text} style={{ lineHeight: 22 }}>{t.sample}</Text>
        </View>
      ) : null}
    </Card>
  );
}


