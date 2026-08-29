import React, { useEffect, useRef, useState } from "react";
import { View, TextInput } from "react-native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, XIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import type { Round, RoundWord, Option } from "./session";

const withArtikel = (w: RoundWord) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/^(der|die|das)\s+/, "").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ");
}

type Done = (correct: boolean) => void;

/** Soru kartı — ortak üst blok. */
function Prompt({ label, big, sub, colors }: { label: string; big: string; sub?: string | null; colors: Palette }) {
  return (
    <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }, softShadow("#5a3418", 10)]}>
      <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{label}</Text>
      <Text variant="display" style={{ marginTop: spacing.sm, textAlign: "center" }}>{big}</Text>
      {sub ? <Text variant="body" color={colors.textMuted} style={{ marginTop: 4 }}>{sub}</Text> : null}
    </View>
  );
}

function OptionButton({ text, sub, state, onPress, colors }: { text: string; sub?: string | null; state: "idle" | "correct" | "wrong"; onPress: () => void; colors: Palette }) {
  const bg = state === "correct" ? colors.successSoft : state === "wrong" ? colors.dangerSoft : colors.surface;
  const border = state === "correct" ? colors.success : state === "wrong" ? colors.danger : colors.border;
  const fg = state === "correct" ? colors.success : state === "wrong" ? colors.danger : colors.text;
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

function ChoiceRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const deSide = round.direction === "de-tr";
  const question = deSide ? withArtikel(word) : word.tr;
  const answer = deSide ? word.tr : withArtikel(word);
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <View>
      <Prompt label={deSide ? "Türkçesi?" : "Almancası?"} big={question} sub={deSide ? word.en : null} colors={colors} />
      <View style={{ gap: spacing.md }}>
        {(round.options ?? []).map((o) => {
          const st = picked ? (o.text === answer ? "correct" : o.text === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o.text} text={o.text} sub={deSide ? o.sub : null} state={st} onPress={() => { if (!picked) { setPicked(o.text); setTimeout(() => onDone(o.text === answer), o.text === answer ? 650 : 1100); } }} colors={colors} />;
        })}
      </View>
    </View>
  );
}

function ArtikelRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <View>
      <Prompt label="Hangi artikel?" big={word.de} sub={word.tr} colors={colors} />
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {["der", "die", "das"].map((a) => {
          const st = picked ? (a === word.artikel ? "correct" : a === picked ? "wrong" : "idle") : "idle";
          return <View key={a} style={{ flex: 1 }}><OptionButton text={a} state={st} onPress={() => { if (!picked) { setPicked(a); setTimeout(() => onDone(a === word.artikel), a === word.artikel ? 650 : 1100); } }} colors={colors} /></View>;
        })}
      </View>
    </View>
  );
}

function TrueFalseRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [ans, setAns] = useState<boolean | null>(null);
  const correctOf = (said: boolean) => said === round.isTrue;
  return (
    <View>
      <Prompt label="Doğru mu?" big={withArtikel(word)} sub={round.claim?.text ?? word.tr} colors={colors} />
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {[{ v: true, l: "Doğru" }, { v: false, l: "Yanlış" }].map(({ v, l }) => {
          const st = ans !== null ? (v === round.isTrue ? "correct" : v === ans ? "wrong" : "idle") : "idle";
          return <View key={l} style={{ flex: 1 }}><OptionButton text={l} state={st} onPress={() => { if (ans === null) { setAns(v); setTimeout(() => onDone(correctOf(v)), correctOf(v) ? 650 : 1100); } }} colors={colors} /></View>;
        })}
      </View>
    </View>
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
    setTimeout(() => onDone(ok), ok ? 700 : 1400);
  }
  return (
    <View>
      <Prompt label="Almancasını yaz" big={word.tr} sub={word.en} colors={colors} />
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
      {checked === false && <Text variant="bodyStrong" color={colors.success} style={{ marginTop: spacing.md }}>Doğrusu: {withArtikel(word)}</Text>}
      {checked === null && (
        <PressableScale onPress={check} style={[{ marginTop: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
          <Text variant="h3" color="#fff">Kontrol et</Text>
        </PressableScale>
      )}
    </View>
  );
}

function ClozeRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const opts = (round.options as unknown as string[] | undefined) ?? [];
  const answer = round.answer ?? "";
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <View>
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.xl, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }, softShadow("#5a3418", 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.md }}>Boşluğu doldur</Text>
        <Text variant="h2" style={{ lineHeight: 32 }}>{round.sentence}</Text>
        {round.sentenceTr ? <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{round.sentenceTr}</Text> : null}
      </View>
      <View style={{ gap: spacing.md }}>
        {opts.map((o) => {
          const st = picked ? (o === answer ? "correct" : o === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o} text={o} state={st} onPress={() => { if (!picked) { setPicked(o); setTimeout(() => onDone(o === answer), o === answer ? 650 : 1100); } }} colors={colors} />;
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
  if (!word) { onDone(true); return null; }
  return (
    <View>
      <Prompt label={round.game === "intro" ? "Yeni kelime" : "Hatırla"} big={withArtikel(word)} sub={round.sentence ?? null} colors={colors} />
      {!reveal ? (
        <PressableScale onPress={() => setReveal(true)} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 8)]}>
          <Text variant="h3" color="#fff">Cevabı göster</Text>
        </PressableScale>
      ) : (
        <>
          <View style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg, marginBottom: spacing.lg }}>
            <Text variant="h3">{word.tr}{word.en ? ` · ${word.en}` : ""}</Text>
            {word.beispiel ? <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{word.beispiel}</Text> : null}
            {word.beispielTr ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{word.beispielTr}</Text> : null}
          </View>
          <View style={{ flexDirection: "row", gap: spacing.md }}>
            <View style={{ flex: 1 }}><OptionButton text="Zorlandım" state="idle" onPress={() => onDone(false)} colors={colors} /></View>
            <View style={{ flex: 1 }}><OptionButton text="Bildim" state="idle" onPress={() => onDone(true)} colors={colors} /></View>
          </View>
        </>
      )}
    </View>
  );
}

const INTERACTIVE = new Set(["choice", "artikel", "truefalse", "typing"]);

/** Tur türüne göre doğru oynatıcıyı seçer. */
export function RoundView({ round, onDone }: { round: Round; onDone: Done }) {
  const { colors } = useTheme();
  if (round.game === "choice" && round.options?.length) return <ChoiceRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "artikel" && round.word?.artikel) return <ArtikelRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "truefalse") return <TrueFalseRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "typing") return <TypingRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "cloze" && (round.options as unknown as string[])?.length) return <ClozeRound round={round} onDone={onDone} colors={colors} />;
  return <SelfAssess round={round} onDone={onDone} colors={colors} />;
}

export { INTERACTIVE };
