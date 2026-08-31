import React, { useEffect, useRef, useState } from "react";
import { View, TextInput } from "react-native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, XIcon, SpeakerIcon } from "../ui/icons";
import { Mascot, type Mood } from "../ui/Mascot";
import { haptic } from "../lib/haptics";
import { whyMeaning, whyArticle, whyPlural } from "./why";
import { speakGerman, ttsAvailable } from "../lib/tts";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import type { Round, RoundWord, Option } from "./session";

const withArtikel = (w: RoundWord) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/^(der|die|das)\s+/, "").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ");
}

/** Anlam satırı: Türkçe + (varsa) İngilizce ayırt edici. en her zaman gösterilir
    (web kuralı: en yalnız süs değil, "o"nun he/she/it ayrımı gibi ayırt edici). */
function meaningLine(w: { tr: string; en: string | null }): string {
  return w.en ? `${w.tr} · ${w.en}` : w.tr;
}

/** İlk örnek cümle — numaralı liste / bölmeler sadeleştirilir (web firstExample). */
function firstExample(s: string | null | undefined): string | null {
  if (!s) return null;
  const t = (s.split(/\n|\s+\/\s+/)[0] ?? "").replace(/^\s*\d+[.)]\s*/, "").trim();
  return t || null;
}

/** Örnek cümle bloğu — Almanca (italik) + Türkçe + (varsa) İngilizce. */
function ExampleBlock({ de, tr, en, colors }: { de: string | null; tr: string | null; en: string | null; colors: Palette }) {
  const d = firstExample(de), t = firstExample(tr), e = firstExample(en);
  if (!d && !t && !e) return null;
  return (
    <View style={{ marginTop: spacing.sm }}>
      {d ? <Text variant="body" color={colors.text} style={{ fontStyle: "italic" }}>{d}</Text> : null}
      {t ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 3 }}>{t}</Text> : null}
      {e ? <Text variant="micro" color={colors.textFaint} style={{ marginTop: 1 }}>{e}</Text> : null}
    </View>
  );
}

/** der/die/das renk tonu — web ile aynı dil (gök / gül / nane). */
const ARTIKEL_TONE: Record<string, string> = { der: "#0284c7", die: "#e11d48", das: "#0d9488" };

/** Tur bitince çağrılır. `batch`: çok kelimeli turlar (match) kelime başına
    sonuç verir; verilmezse çağıran tek cevabı (round.word) yazar. */
type Done = (correct: boolean, batch?: { wordId: number; correct: boolean }[]) => void;

/** Tur düzeni: soru/örnek ÜSTTE, şık ve girişler ALTTA (başparmak bölgesi) —
    tek elle kullanım için. `marginTop:auto` etkileşimi ekranın altına yaslar. */
/** Ortadaki maskot — soru ile şıklar arasındaki boşluğu doldurur, alta yaslar. */
function MascotMid({ mood }: { mood?: Mood }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", minHeight: 90 }}>
      <Mascot mood={mood ?? "idle"} size={84} />
    </View>
  );
}

function RoundShell({ top, children, mood }: { top: React.ReactNode; children: React.ReactNode; mood?: Mood }) {
  return (
    <View style={{ flex: 1 }}>
      {top}
      <MascotMid mood={mood} />
      {children}
    </View>
  );
}

/** Almanca istemli turlarda bir kez otomatik okuma (web choice-game gibi). */
function useAutoSpeak(text: string | null | undefined, key: string | number) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(() => speakGerman(text), 260);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

/** Soru kartı — ortak üst blok. */
function Prompt({ label, big, sub, speakText, colors }: { label: string; big: string; sub?: string | null; speakText?: string | null; colors: Palette }) {
  return (
    <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }, softShadow("#5a3418", 10)]}>
      <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{label}</Text>
      <Text variant="display" style={{ marginTop: spacing.sm, textAlign: "center" }}>{big}</Text>
      {speakText ? <View style={{ marginTop: spacing.sm }}><SpeakButton text={speakText} colors={colors} size={22} /></View> : null}
      {sub ? <Text variant="body" color={colors.textMuted} style={{ marginTop: 4 }}>{sub}</Text> : null}
    </View>
  );
}

function OptionButton({ text, sub, state, onPress, colors, idleTint }: { text: string; sub?: string | null; state: "idle" | "correct" | "wrong"; onPress: () => void; colors: Palette; idleTint?: string }) {
  const bg = state === "correct" ? colors.successSoft : state === "wrong" ? colors.dangerSoft : colors.surface;
  const border = state === "correct" ? colors.success : state === "wrong" ? colors.danger : idleTint ?? colors.border;
  const fg = state === "correct" ? colors.success : state === "wrong" ? colors.danger : idleTint ?? colors.text;
  return (
    <PressableScale onPress={onPress} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: bg, borderColor: border, borderWidth: 1.5, borderRadius: radii.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg }}>
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong" color={fg}>{text}</Text>
        {sub ? <Text variant="caption" color={colors.textMuted}>{sub}</Text> : null}
      </View>
      {state === "correct" && <CheckIcon color={colors.success} size={22} />}
      {state === "wrong" && <XIcon color={colors.danger} size={22} />}
    </PressableScale>
  );
}

/** Yanlış cevapta neden yanlış olduğunu gösteren kısa ipucu satırı. */
function WhyLine({ text, colors }: { text: string; colors: Palette }) {
  return (
    <View style={{ marginTop: spacing.md, backgroundColor: colors.dangerSoft, borderRadius: radii.md, paddingVertical: spacing.sm, paddingHorizontal: spacing.md }}>
      <Text variant="caption" color={colors.text}>{text}</Text>
    </View>
  );
}

function ChoiceRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const deSide = round.direction === "de-tr";
  const question = deSide ? withArtikel(word) : word.tr;
  const answer = deSide ? word.tr : withArtikel(word);
  const [picked, setPicked] = useState<string | null>(null);
  useAutoSpeak(deSide ? question : null, round.id);
  return (
    <RoundShell mood={picked ? (picked === answer ? "thumbsup" : "sad") : "idle"} top={<Prompt label={deSide ? "Türkçesi?" : "Almancası?"} big={question} speakText={deSide ? question : null} sub={!deSide ? word.en : null} colors={colors} />}>
      <View style={{ gap: spacing.md }}>
        {(round.options ?? []).map((o) => {
          const st = picked ? (o.text === answer ? "correct" : o.text === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o.text} text={o.text} sub={o.sub} state={st} onPress={() => { if (!picked) { setPicked(o.text); haptic(o.text === answer ? "correct" : "wrong"); setTimeout(() => onDone(o.text === answer), o.text === answer ? 650 : 1100); } }} colors={colors} />;
        })}
      </View>
      {picked ? <View style={{ alignItems: "center", marginTop: spacing.md }}><SpeakButton text={withArtikel(word)} colors={colors} size={22} /></View> : null}
      {picked && picked !== answer ? <WhyLine text={whyMeaning(word, picked)} colors={colors} /> : null}
    </RoundShell>
  );
}

function ArtikelRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <RoundShell mood={picked ? (picked === word.artikel ? "thumbsup" : "sad") : "idle"} top={<Prompt label="Hangi artikel?" big={word.de} speakText={withArtikel(word)} sub={meaningLine(word)} colors={colors} />}>
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {["der", "die", "das"].map((a) => {
          const st = picked ? (a === word.artikel ? "correct" : a === picked ? "wrong" : "idle") : "idle";
          return <View key={a} style={{ flex: 1 }}><OptionButton text={a} state={st} idleTint={ARTIKEL_TONE[a]} onPress={() => { if (!picked) { setPicked(a); haptic(a === word.artikel ? "correct" : "wrong"); setTimeout(() => onDone(a === word.artikel), a === word.artikel ? 650 : 1100); } }} colors={colors} /></View>;
        })}
      </View>
      {picked && picked !== word.artikel ? <WhyLine text={whyArticle(word)} colors={colors} /> : null}
    </RoundShell>
  );
}

function TrueFalseRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [ans, setAns] = useState<boolean | null>(null);
  const correctOf = (said: boolean) => said === round.isTrue;
  return (
    <RoundShell mood={ans !== null ? (correctOf(ans) ? "thumbsup" : "sad") : "idle"} top={<Prompt label="Doğru mu?" big={withArtikel(word)} speakText={withArtikel(word)} sub={round.claim ? meaningLine({ tr: round.claim.text, en: round.claim.sub }) : meaningLine(word)} colors={colors} />}>
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {[{ v: true, l: "Doğru" }, { v: false, l: "Yanlış" }].map(({ v, l }) => {
          const st = ans !== null ? (v === round.isTrue ? "correct" : v === ans ? "wrong" : "idle") : "idle";
          return <View key={l} style={{ flex: 1 }}><OptionButton text={l} state={st} onPress={() => { if (ans === null) { setAns(v); haptic(correctOf(v) ? "correct" : "wrong"); setTimeout(() => onDone(correctOf(v)), correctOf(v) ? 650 : 1100); } }} colors={colors} /></View>;
        })}
      </View>
      {ans !== null && !correctOf(ans) ? <WhyLine text={whyMeaning(word, null)} colors={colors} /> : null}
    </RoundShell>
  );
}

function TypingRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [val, setVal] = useState("");
  const [checked, setChecked] = useState<null | boolean>(null);
  function check() {
    if (checked !== null) return;
    const ok = norm(val) === norm(word.de) || norm(val) === norm(withArtikel(word));
    setChecked(ok);
    haptic(ok ? "correct" : "wrong"); setTimeout(() => onDone(ok), ok ? 700 : 1400);
  }
  return (
    <View style={{ flex: 1 }}>
      <Prompt label="Almancasını yaz" big={word.tr} sub={word.en} colors={colors} />
      <MascotMid mood={checked === null ? "idle" : checked ? "thumbsup" : "sad"} />
      <View>
        <TextInput
          value={val}
          onChangeText={setVal}
          editable={checked === null}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Yaz..."
          placeholderTextColor={colors.textFaint}
          onSubmitEditing={check}
          style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: checked === null ? colors.border : checked ? colors.success : colors.danger, paddingHorizontal: spacing.lg, paddingVertical: 16, color: colors.text, fontSize: 18 }}
        />
        {checked !== null && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md }}>
            <Text variant="bodyStrong" color={colors.success}>{checked ? withArtikel(word) : `Doğrusu: ${withArtikel(word)}`}</Text>
            <SpeakButton text={withArtikel(word)} colors={colors} size={22} />
          </View>
        )}
        {checked === null && (
          <PressableScale onPress={check} style={[{ marginTop: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="h3" color="#fff">Kontrol et</Text>
          </PressableScale>
        )}
      </View>
    </View>
  );
}

function ClozeRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const opts = (round.options as unknown as string[] | undefined) ?? [];
  const answer = round.answer ?? "";
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.xl, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }, softShadow("#5a3418", 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.md }}>Boşluğu doldur</Text>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm }}>
          <Text variant="h2" style={{ flex: 1, lineHeight: 32 }}>{round.sentence}</Text>
          <SpeakButton text={round.sentence ?? ""} colors={colors} size={22} />
        </View>
        {round.sentenceTr ? <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{round.sentenceTr}</Text> : null}
        {round.sentenceEn ? <Text variant="micro" color={colors.textFaint} style={{ marginTop: 2 }}>{round.sentenceEn}</Text> : null}
      </View>
      <MascotMid mood={picked ? (picked === answer ? "thumbsup" : "sad") : "idle"} />
      <View style={{ gap: spacing.md }}>
        {opts.map((o) => {
          const st = picked ? (o === answer ? "correct" : o === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o} text={o} state={st} onPress={() => { if (!picked) { setPicked(o); haptic(o === answer ? "correct" : "wrong"); setTimeout(() => onDone(o === answer), o === answer ? 650 : 1100); } }} colors={colors} />;
        })}
      </View>
    </View>
  );
}

/** Diğer türler (translate/listen/order/plural/match/scramble/free_sentence/intro/speak):
    öz-değerlendirme — gerçek kelime + örnek gösterilir, kullanıcı kendini notlar.
    Gerçek kelime, gerçek SRS; yalnız mekanik basitleştirildi. */
function SelfAssess({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word ?? round.words?.[0];
  const [reveal, setReveal] = useState(false);
  useEffect(() => { if (round.game === "intro" && word) speakGerman(withArtikel(word)); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [round.id]);
  if (!word) { onDone(true); return null; }
  return (
    <View style={{ flex: 1 }}>
      <Prompt label={round.game === "intro" ? "Yeni kelime" : "Hatırla"} big={withArtikel(word)} sub={round.sentence ?? null} colors={colors} />
      <View style={{ alignItems: "center", marginTop: -spacing.md, marginBottom: spacing.md }}><SpeakButton text={withArtikel(word)} colors={colors} size={24} /></View>
      {reveal ? (
        <View style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg }}>
          <Text variant="h3">{meaningLine(word)}</Text>
          <ExampleBlock de={word.beispiel} tr={word.beispielTr} en={word.beispielEn ?? null} colors={colors} />
        </View>
      ) : null}
      <MascotMid mood={reveal ? "happy" : "idle"} />
      <View>
        {!reveal ? (
          <PressableScale onPress={() => setReveal(true)} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="h3" color="#fff">Cevabı göster</Text>
          </PressableScale>
        ) : (
          <View style={{ flexDirection: "row", gap: spacing.md }}>
            <View style={{ flex: 1 }}><OptionButton text="Zorlandım" state="idle" onPress={() => onDone(false)} colors={colors} /></View>
            <View style={{ flex: 1 }}><OptionButton text="Bildim" state="idle" onPress={() => onDone(true)} colors={colors} /></View>
          </View>
        )}
      </View>
    </View>
  );
}

/** Küçük harf/kelime karosu — scramble ve order için. */
function Tile({ label, onPress, dim, colors }: { label: string; onPress?: () => void; dim?: boolean; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} disabled={dim} style={{ paddingHorizontal: 14, paddingVertical: 12, borderRadius: radii.md, backgroundColor: dim ? colors.surface2 : colors.surface, borderWidth: 1.5, borderColor: colors.border, opacity: dim ? 0.4 : 1 }}>
      <Text variant="bodyStrong" color={colors.text}>{label}</Text>
    </PressableScale>
  );
}

/** Çoğul (plural): tekil verilir, doğru çoğul biçim seçilir. */
function PluralRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const answer = round.answer ?? "";
  const opts = (round.options as unknown as string[] | undefined) ?? [];
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <RoundShell mood={picked ? (picked === answer ? "thumbsup" : "sad") : "idle"} top={<Prompt label="Çoğulu?" big={withArtikel(word)} speakText={withArtikel(word)} sub={meaningLine(word)} colors={colors} />}>
      <View style={{ gap: spacing.md }}>
        {opts.map((o) => {
          const st = picked ? (o === answer ? "correct" : o === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o} text={`die ${o}`} state={st} onPress={() => { if (!picked) { setPicked(o); haptic(o === answer ? "correct" : "wrong"); setTimeout(() => onDone(o === answer), o === answer ? 650 : 1100); } }} colors={colors} />;
        })}
      </View>
      {picked ? <View style={{ alignItems: "center", marginTop: spacing.md }}><SpeakButton text={`die ${answer}`} colors={colors} size={22} /></View> : null}
    </RoundShell>
  );
}

/** Dinle (listen): sesli mod (TTS) henüz yok — kelime okunur, anlamı seçilir. */
/** Almanca metnin yanında küçük hoparlör — dokununca seslendirir (web SpeakButton). */
function SpeakButton({ text, colors, size = 20 }: { text: string; colors: Palette; size?: number }) {
  return (
    <PressableScale onPress={() => speakGerman(text)} hitSlop={8} style={{ padding: 4 }}>
      <SpeakerIcon color={colors.primary} size={size} />
    </PressableScale>
  );
}

function ListenRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [picked, setPicked] = useState<string | null>(null);
  const [audible, setAudible] = useState<boolean | null>(null);
  useEffect(() => { ttsAvailable().then(setAudible); }, []);
  useEffect(() => { if (audible) speakGerman(withArtikel(word)); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [audible, round.id]);
  const hideWord = audible === true && !picked;
  return (
    <View style={{ flex: 1 }}>
      {/* Duyulabiliyorsa kelime gizli (gerçek dinleme testi); değilse görünür. */}
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }, softShadow("#5a3418", 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>Dinle · anlamını seç</Text>
        {hideWord ? (
          <PressableScale onPress={() => speakGerman(withArtikel(word))} style={[{ width: 84, height: 84, borderRadius: 42, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginTop: spacing.lg }, softShadow(colors.primary, 12)]}>
            <SpeakerIcon color="#fff" size={38} />
          </PressableScale>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.sm }}>
            <Text variant="display" style={{ textAlign: "center" }}>{withArtikel(word)}</Text>
            <SpeakButton text={withArtikel(word)} colors={colors} size={24} />
          </View>
        )}
      </View>
      {picked && (word.beispiel || word.beispielTr) ? (
        <View style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg }}>
          <ExampleBlock de={word.beispiel} tr={word.beispielTr} en={word.beispielEn ?? null} colors={colors} />
        </View>
      ) : null}
      <MascotMid mood={picked ? (picked === word.tr ? "thumbsup" : "sad") : "idle"} />
      <View style={{ gap: spacing.md }}>
        {(round.options ?? []).map((o) => {
          const st = picked ? (o.text === word.tr ? "correct" : o.text === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o.text} text={o.text} sub={o.sub} state={st} onPress={() => { if (!picked) { setPicked(o.text); haptic(o.text === word.tr ? "correct" : "wrong"); setTimeout(() => onDone(o.text === word.tr), o.text === word.tr ? 650 : 1100); } }} colors={colors} />;
        })}
      </View>
    </View>
  );
}

/** Harf dizme (scramble): kelimenin karışık harfleri sıraya konur. */
function ScrambleRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const target = React.useMemo(() => Array.from(word.de).filter((c) => c !== " "), [word.de]);
  const compareTarget = React.useMemo(() => norm(word.de.replace(/\s+/g, "")), [word.de]);
  const pool = React.useMemo(() => {
    const chars = Array.from(word.de).filter((c) => c !== " ").map((char, id) => ({ id, char }));
    for (let i = chars.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [chars[i], chars[j]] = [chars[j], chars[i]]; }
    return chars;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);
  const [placed, setPlaced] = useState<{ id: number; char: string }[]>([]);
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const usedIds = new Set(placed.map((t) => t.id));
  function tap(t: { id: number; char: string }) {
    if (status !== "playing" || usedIds.has(t.id)) return;
    const np = [...placed, t];
    setPlaced(np);
    if (np.length === target.length) {
      const ok = norm(np.map((x) => x.char).join("")) === compareTarget;
      setStatus(ok ? "correct" : "wrong");
      haptic(ok ? "correct" : "wrong"); setTimeout(() => onDone(ok), ok ? 800 : 1500);
    }
  }
  const brd = status === "correct" ? colors.success : status === "wrong" ? colors.danger : colors.border;
  return (
    <View style={{ flex: 1 }}>
      <Prompt label="Harfleri sırala" big={word.tr} sub={word.en} colors={colors} />
      <MascotMid mood={status === "playing" ? "idle" : status === "correct" ? "thumbsup" : "sad"} />
      <View>
        <View style={{ minHeight: 56, flexDirection: "row", flexWrap: "wrap", gap: 8, borderWidth: 1.5, borderColor: brd, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.lg, backgroundColor: colors.surface }}>
          {placed.length === 0 ? <Text variant="body" color={colors.textFaint}>Harflere dokun…</Text> : placed.map((t, i) => <Tile key={i} label={t.char} colors={colors} onPress={() => { if (status === "playing") setPlaced((p) => p.slice(0, i)); }} />)}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {pool.map((t) => <Tile key={t.id} label={t.char} dim={usedIds.has(t.id)} onPress={() => tap(t)} colors={colors} />)}
        </View>
        {status !== "playing" && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.lg }}>
            <Text variant="bodyStrong" color={colors.success}>{status === "wrong" ? `Doğrusu: ${word.de}` : word.de}</Text>
            <SpeakButton text={word.de} colors={colors} size={22} />
          </View>
        )}
      </View>
    </View>
  );
}

/** Sıraya diz (order): karışık kelimeler cümle sırasına konur. */
function OrderRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const answer = (round.answer as unknown as string[] | undefined) ?? [];
  const tail = round.tail ?? "";
  const pool = React.useMemo(() => (round.tokens ?? []).map((text, id) => ({ id, text })), [round.id]);
  const [placed, setPlaced] = useState<{ id: number; text: string }[]>([]);
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const usedIds = new Set(placed.map((t) => t.id));
  function tap(t: { id: number; text: string }) {
    if (status !== "playing" || usedIds.has(t.id) || placed.length >= answer.length) return;
    const np = [...placed, t];
    setPlaced(np);
    if (np.length === answer.length) {
      const ok = np.map((x) => x.text).join(" ") === answer.join(" ");
      setStatus(ok ? "correct" : "wrong");
      haptic(ok ? "correct" : "wrong"); setTimeout(() => onDone(ok), ok ? 850 : 1600);
    }
  }
  const brd = status === "correct" ? colors.success : status === "wrong" ? colors.danger : colors.border;
  return (
    <View style={{ flex: 1 }}>
      <Prompt label="Cümleyi sıraya diz" big={round.sentenceTr ?? word.tr} sub={round.sentenceEn ?? null} colors={colors} />
      <MascotMid mood={status === "playing" ? "idle" : status === "correct" ? "thumbsup" : "sad"} />
      <View>
        <View style={{ minHeight: 56, flexDirection: "row", flexWrap: "wrap", gap: 8, borderWidth: 1.5, borderColor: brd, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.lg, backgroundColor: colors.surface }}>
          {placed.length === 0 ? <Text variant="body" color={colors.textFaint}>Kelimelere dokun…</Text> : placed.map((t, i) => <Tile key={i} label={t.text} colors={colors} onPress={() => { if (status === "playing") setPlaced((p) => p.slice(0, i)); }} />)}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {pool.map((t) => <Tile key={t.id} label={t.text} dim={usedIds.has(t.id)} onPress={() => tap(t)} colors={colors} />)}
        </View>
        {status !== "playing" && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.lg }}>
            <Text variant="bodyStrong" color={colors.success} style={{ flex: 1 }}>{status === "wrong" ? `Doğrusu: ${[...answer, tail].filter(Boolean).join(" ")}` : [...answer, tail].filter(Boolean).join(" ")}</Text>
            <SpeakButton text={[...answer, tail].filter(Boolean).join(" ")} colors={colors} size={22} />
          </View>
        )}
      </View>
    </View>
  );
}

/** Çevir (translate): Türkçe cümle Almancaya çevrilir (yazarak). */
function TranslateRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const s = round.sentence as unknown as { tr: string; de: string; en: string | null };
  const alts = round.alternatives ?? [];
  const [val, setVal] = useState("");
  const [checked, setChecked] = useState<null | boolean>(null);
  const sn = (x: string) => x.trim().toLowerCase().replace(/[.!?…,;:]/g, "").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ");
  function check() {
    if (checked !== null) return;
    const t = sn(val);
    const ok = !!t && (t === sn(s.de) || alts.some((a) => sn(a) === t));
    setChecked(ok);
    haptic(ok ? "correct" : "wrong"); setTimeout(() => onDone(ok), ok ? 800 : 1600);
  }
  return (
    <View style={{ flex: 1 }}>
      <Prompt label="Almancaya çevir" big={s.tr} sub={s.en} colors={colors} />
      <MascotMid mood={checked === null ? "idle" : checked ? "thumbsup" : "sad"} />
      <View>
        <TextInput
          value={val}
          onChangeText={setVal}
          editable={checked === null}
          multiline
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder="Almanca cümleyi yaz…"
          placeholderTextColor={colors.textFaint}
          style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: checked === null ? colors.border : checked ? colors.success : colors.danger, paddingHorizontal: spacing.lg, paddingVertical: 16, color: colors.text, fontSize: 18, minHeight: 88, textAlignVertical: "top" }}
        />
        {checked !== null && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md }}>
            <Text variant="bodyStrong" color={colors.success} style={{ flex: 1 }}>{checked ? s.de : `Doğrusu: ${s.de}`}</Text>
            <SpeakButton text={s.de} colors={colors} size={22} />
          </View>
        )}
        {checked === null && (
          <PressableScale onPress={check} style={[{ marginTop: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="h3" color="#fff">Kontrol et</Text>
          </PressableScale>
        )}
      </View>
    </View>
  );
}

/** Eşleştirme kartı — match'in iki sütunundaki tek hücre. */
function MatchCard({ text, sub, state, onPress, colors }: { text: string; sub?: string | null; state: "idle" | "sel" | "correct" | "wrong"; onPress: () => void; colors: Palette }) {
  const border = state === "correct" ? colors.success : state === "wrong" ? colors.danger : state === "sel" ? colors.primary : colors.border;
  const bg = state === "correct" ? colors.successSoft : state === "wrong" ? colors.dangerSoft : state === "sel" ? colors.primarySoft : colors.surface;
  return (
    <PressableScale onPress={onPress} disabled={state === "correct"} style={{ borderWidth: 1.5, borderColor: border, backgroundColor: bg, borderRadius: radii.lg, paddingVertical: spacing.md, paddingHorizontal: spacing.md, opacity: state === "correct" ? 0.5 : 1, minHeight: 60, justifyContent: "center" }}>
      <Text variant="bodyStrong" color={colors.text}>{text}</Text>
      {sub ? <Text variant="micro" color={colors.textMuted}>{sub}</Text> : null}
    </PressableScale>
  );
}

/** Eşleştir (match): Almanca ↔ Türkçe çiftleri. Sol Almanca, sağ karışık Türkçe;
    sol seç → sağ seç. Her kelimenin SRS'i ayrı yazılır (batch). */
function MatchRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const words = round.words ?? [];
  const rights = React.useMemo(() => {
    const arr = words.map((w) => ({ wordId: w.id, text: w.tr, sub: w.en }));
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);
  const [selLeft, setSelLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<{ left: number; right: number } | null>(null);
  const wrongBefore = useRef<Set<number>>(new Set());
  const done = useRef(false);

  function pickLeft(id: number) { if (matched.has(id) || done.current) return; setSelLeft(id); setWrong(null); }
  function pickRight(r: { wordId: number; text: string }) {
    if (done.current || selLeft == null || matched.has(r.wordId)) return;
    if (r.wordId === selLeft) {
      const nm = new Set(matched); nm.add(selLeft); setMatched(nm); setSelLeft(null); haptic("correct");
      if (nm.size === words.length) {
        done.current = true;
        const batch = words.map((w) => ({ wordId: w.id, correct: !wrongBefore.current.has(w.id) }));
        setTimeout(() => onDone(batch.every((b) => b.correct), batch), 600);
      }
    } else {
      wrongBefore.current.add(selLeft); haptic("wrong");
      const l = selLeft;
      setWrong({ left: l, right: r.wordId });
      setSelLeft(null);
      setTimeout(() => setWrong((w) => (w && w.left === l ? null : w)), 550);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.lg, marginTop: spacing.md, textAlign: "center" }}>Eşleştir</Text>
      <MascotMid mood={done.current ? "happy" : "idle"} />
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <View style={{ flex: 1, gap: spacing.sm }}>
          {words.map((w) => {
            const st = matched.has(w.id) ? "correct" : wrong?.left === w.id ? "wrong" : selLeft === w.id ? "sel" : "idle";
            return (
              <View key={w.id} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <View style={{ flex: 1 }}><MatchCard text={withArtikel(w)} state={st} onPress={() => pickLeft(w.id)} colors={colors} /></View>
                <SpeakButton text={withArtikel(w)} colors={colors} size={18} />
              </View>
            );
          })}
        </View>
        <View style={{ flex: 1, gap: spacing.sm }}>
          {rights.map((r) => {
            const st = matched.has(r.wordId) ? "correct" : wrong?.right === r.wordId ? "wrong" : "idle";
            return <MatchCard key={r.wordId} text={r.text} sub={r.sub} state={st} onPress={() => pickRight(r)} colors={colors} />;
          })}
        </View>
      </View>
    </View>
  );
}

const INTERACTIVE = new Set(["choice", "artikel", "truefalse", "typing", "cloze", "plural", "listen", "scramble", "order", "translate", "match"]);

/** Tur türüne göre doğru oynatıcıyı seçer. */
export function RoundView({ round, onDone }: { round: Round; onDone: Done }) {
  const { colors } = useTheme();
  if (round.game === "choice" && round.options?.length) return <ChoiceRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "artikel" && round.word?.artikel) return <ArtikelRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "truefalse") return <TrueFalseRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "typing") return <TypingRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "cloze" && (round.options as unknown as string[])?.length) return <ClozeRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "plural" && (round.options as unknown as string[])?.length) return <PluralRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "listen" && round.options?.length) return <ListenRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "scramble" && round.word) return <ScrambleRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "order" && round.tokens?.length && (round.answer as unknown as string[])?.length) return <OrderRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "translate" && round.sentence) return <TranslateRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "match" && (round.words?.length ?? 0) >= 2) return <MatchRound round={round} onDone={onDone} colors={colors} />;
  return <SelfAssess round={round} onDone={onDone} colors={colors} />;
}

export { INTERACTIVE };
