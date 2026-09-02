import React, { useEffect, useRef, useState } from "react";
import { currentTargetLang } from "../lib/courses";
import { View, TextInput, ScrollView, Keyboard, Platform, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, XIcon, SpeakerIcon } from "../ui/icons";
import { Mascot, type Mood } from "../ui/Mascot";
import { haptic } from "../lib/haptics";
import { sfx } from "../lib/sfx";
import { useKeyboardHeight } from "../lib/useKeyboardHeight";
import { whyMeaning, whyArticle, whyPlural } from "./why";
import { speakTarget, ttsAvailable } from "../lib/tts";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import type { Round, RoundWord, Option } from "./session";

const withArtikel = (w: RoundWord) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

/** Baştaki tanımlık — hedef dile göre. */
const LEAD_ARTICLE: Record<string, RegExp> = {
  de: /^(der|die|das)\s+/,
  en: /^(the|an|a)\s+/,
};

/**
 * Yazılan cevabın karşılaştırma biçimi. Tanımlık ve (Almancada) umlaut
 * katlaması hedef dile göre uygulanıyor; sabit der/die/das + umlaut yazılıydı,
 * yani İngilizce kursta "the door" yazan kullanıcı yanlış sayılırdı.
 */
function norm(s: string): string {
  const lang = currentTargetLang();
  const base = s.trim().toLowerCase().replace(LEAD_ARTICLE[lang] ?? LEAD_ARTICLE.de, "");
  const folded = lang === "de"
    ? base.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    : base;
  return folded.replace(/\s+/g, " ");
}

/** Anlam satırı: Türkçe + (varsa) İngilizce ayırt edici. */
function meaningLine(w: { tr: string; en: string | null }): string {
  return w.en ? `${w.tr} · ${w.en}` : w.tr;
}

/** İlk örnek cümle — numaralı liste / bölmeler sadeleştirilir. */
function firstExample(s: string | null | undefined): string | null {
  if (!s) return null;
  const t = (s.split(/\n|\s+\/\s+/)[0] ?? "").replace(/^\s*\d+[.)]\s*/, "").trim();
  return t || null;
}

/** İpucu iskeleti (web skeleton): her kelimede ilk harf + her 3. harf açık, gerisi "_". */
function skeleton(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => Array.from(w).map((c, i) => (i === 0 || i % 3 === 0 ? c : "_")).join(""))
    .join("   ");
}

/**
 * Cloze: boşluklu cümleye doğru cevabı yerleştirip TAM cümleyi kurar
 * (web: `${before}${answer}${after}`). Boşluk web'de "_____"; güvenli olsun diye
 * 2+ alt çizgi dizisini cevapla değiştiririz, yoksa cevabı sona ekleriz.
 */
function fillBlank(sentence: string | undefined, answer: string): string {
  const s = sentence ?? "";
  if (/_{2,}/.test(s)) return s.replace(/_{2,}/, answer).replace(/\s+/g, " ").trim();
  return `${s} ${answer}`.replace(/\s+/g, " ").trim();
}

/** Örnek cümle bloğu — Almanca (italik) + Türkçe + (varsa) İngilizce. */
function ExampleBlock({ de, tr, en, colors }: { de: string | null; tr: string | null; en: string | null; colors: Palette }) {
  const d = firstExample(de), t = firstExample(tr), e = firstExample(en);
  if (!d && !t && !e) return null;
  return (
    <View style={{ marginTop: spacing.sm }}>
      {d ? <Text variant="body" color={colors.text} style={{ fontStyle: "italic" }}>{d}</Text> : null}
      {t ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 3 }}>{t}</Text> : null}
      {e ? <Text variant="body" color={colors.textFaint} style={{ marginTop: 1, fontSize: 12 }}>{e}</Text> : null}
    </View>
  );
}

/** der/die/das renk tonu. */
const ARTIKEL_TONE: Record<string, string> = { der: "#0284c7", die: "#e11d48", das: "#0d9488" };

type Done = (correct: boolean, batch?: { wordId: number; correct: boolean }[]) => void;

/** Cevap sonrası geri bildirim verisi — web VerdictBar'ın taşıdığı bilgi. */
type Feedback = {
  correct: boolean;
  answerDe?: string | null; // doğru Almanca cevap (belirgin gösterilir)
  speakDe?: string | null;  // hoparlör tıklanınca okunacak (yoksa answerDe) — cloze/order tam cümle
  tr?: string | null;       // Türkçe anlam (BELİRGİN gösterilir)
  en?: string | null;
  why?: string | null;      // yalnız yanlışta: neden yanlış
  note?: string | null;     // özet (match gibi tek cevabı olmayan turlar)
};

/**
 * Cevap işaretlendiğinde ortak yan etkiler: haptik + ses efekti + (varsa) doğru
 * Almanca cevabı otomatik seslendir. Web'de doğru cevap doğru da yanlış da sesli
 * okunur; Almanca'nın SORU olduğu turlarda (choice de-tr, truefalse, listen)
 * mount'ta okunduğundan burada tekrar okunmaz (speak=null).
 */
function markAnswer(ok: boolean, speak?: string | null): void {
  haptic(ok ? "correct" : "wrong");
  sfx(ok ? "correct" : "wrong");
  if (speak) speakTarget(speak);
}

/** Almanca metnin yanında küçük hoparlör. */
function SpeakButton({ text, colors, size = 20 }: { text: string; colors: Palette; size?: number }) {
  if (!text?.trim()) return null;
  return (
    <PressableScale onPress={() => speakTarget(text)} hitSlop={8} style={{ padding: 4 }}>
      <SpeakerIcon color={colors.primary} size={size} />
    </PressableScale>
  );
}

/**
 * Tur iskeleti — içerik üstte (kaydırılabilir; kısa ise dikey doldurur), AKSİYON
 * alanı (geri bildirim + Devam, ya da yazma turlarında input+ipucu+buton) ALTTA
 * sabit ve klavye açılınca yukarı kalkar. Böylece tek elle Devam'a ulaşılır ve
 * yazarken input klavyenin üstünde görünür (edge-to-edge'de adjustResize yetmiyor).
 */
function RoundShell({ children, footer, scroll = true }: { children: React.ReactNode; footer?: React.ReactNode; scroll?: boolean }) {
  const kb = useKeyboardHeight();
  const insets = useSafeAreaInsets();
  // Host (GameScreen/DailyScreen) zaten insets.bottom + spacing.lg alt padding
  // veriyor. Klavye açılınca footer'ı klavyenin üstüne çıkacak kadar kaldır +
  // ekstra pay: öneri/araç şeridi çoğu Android klavyesinde keyboardDidShow
  // yüksekliğine DAHİL değil, o yüzden "Kontrol et" butonunu örtmesin diye tampon.
  const lift = kb > 0 ? Math.max(0, kb - insets.bottom) + spacing.xxl : 0;
  return (
    <View style={{ flex: 1 }}>
      {scroll ? (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{children}</View>
      )}
      {footer ? <View style={{ marginBottom: lift, paddingTop: spacing.md }}>{footer}</View> : null}
    </View>
  );
}

/**
 * Geri bildirim (Duolingo mantığı): cevaptan sonra KOMPAKT şerit — maskot +
 * doğru/yanlış, doğru Almanca cevap (hoparlörlü), TÜRKÇE anlam BELİRGİN, yanlışta
 * kısa neden. "Devam" düğmesi şeridin ALTINDA, ekranın en altında (tek el).
 */
function FeedbackFooter({ data, onContinue, colors }: { data: Feedback; onContinue: () => void; colors: Palette }) {
  const ok = data.correct;
  const tone = ok ? colors.success : colors.danger;
  const speakText = data.speakDe ?? data.answerDe ?? undefined;
  return (
    <View style={{ gap: spacing.sm }}>
      {/* Web VerdictBar: kompakt yatay şerit — maskot + tek akan satır (etiket +
          kalın Almanca cevap + · Türkçe), yanlışta ikinci küçük satır (neden). */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: ok ? colors.successSoft : colors.dangerSoft, borderRadius: radii.lg, borderWidth: 1.5, borderColor: tone, paddingVertical: spacing.sm, paddingHorizontal: spacing.sm, minHeight: 60 }}>
        <Mascot mood={ok ? "thumbsup" : "sad"} size={44} />
        <View style={{ flex: 1 }}>
          <Text variant="body" style={{ lineHeight: 21 }}>
            <Text variant="body" color={tone} style={{ fontWeight: "800" }}>{ok ? "Doğru! " : "Doğrusu: "}</Text>
            {data.answerDe ? <Text variant="body" color={colors.text} style={{ fontWeight: "800" }}>{data.answerDe}</Text> : null}
            {data.tr ? <Text variant="body" color={colors.textMuted}>{`  ·  ${data.tr}`}</Text> : null}
            {data.note ? <Text variant="body" color={colors.text} style={{ fontWeight: "800" }}>{data.note}</Text> : null}
          </Text>
          {!ok && data.why ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{data.why}</Text> : null}
        </View>
        {speakText ? <SpeakButton text={speakText} colors={colors} size={20} /> : null}
      </View>
      <PressableScale onPress={onContinue} style={[{ borderRadius: radii.lg, backgroundColor: ok ? colors.success : colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(ok ? colors.success : colors.primary, 8)]}>
        <Text variant="h3" color="#fff">Devam</Text>
      </PressableScale>
    </View>
  );
}

/** Almanca SORU olan turlarda bir kez otomatik okuma (web: mount + ~320ms). */
function useAutoSpeak(text: string | null | undefined, key: string | number) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(() => speakTarget(text), 320);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

/** Ortadaki maskot — soru ile şıklar arasını doldurur; cevaba göre mood.
 *  Cevaplanınca gizlenir ama BOŞLUĞU korur ki şıklar yerinden zıplamasın. */
function MascotMid({ mood, hidden }: { mood?: Mood; hidden?: boolean }) {
  if (hidden) return <View style={{ flex: 1, minHeight: spacing.md }} />;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", minHeight: 72 }}>
      <Mascot mood={mood ?? "idle"} size={78} />
    </View>
  );
}

/** Soru kartı — ortak üst blok. */
function Prompt({ label, big, sub, speakText, colors }: { label: string; big: string; sub?: string | null; speakText?: string | null; colors: Palette }) {
  return (
    <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, softShadow("#5a3418", 10)]}>
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
  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (state === "wrong") {
      Animated.sequence([-8, 8, -6, 6, -3, 0].map((v) => Animated.timing(shake, { toValue: v, duration: 45, useNativeDriver: true }))).start();
    } else if (state === "correct") {
      Animated.sequence([
        Animated.spring(pop, { toValue: 1.05, useNativeDriver: true, speed: 50, bounciness: 0 }),
        Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <Animated.View style={{ transform: [{ translateX: shake }, { scale: pop }] }}>
      <PressableScale onPress={onPress} accessibilityLabel={sub ? `${text}, ${sub}` : text} accessibilityState={{ disabled: state !== "idle", selected: state !== "idle" }} accessibilityHint={state === "correct" ? "Doğru cevap" : state === "wrong" ? "Yanlış cevap" : undefined}
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: bg, borderColor: border, borderWidth: 1.5, borderRadius: radii.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg }}>
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong" color={fg}>{text}</Text>
          {sub ? <Text variant="caption" color={colors.textMuted}>{sub}</Text> : null}
        </View>
        {state === "correct" && <CheckIcon color={colors.success} size={22} />}
        {state === "wrong" && <XIcon color={colors.danger} size={22} />}
      </PressableScale>
    </Animated.View>
  );
}

function ChoiceRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const deSide = round.direction === "de-tr";
  const question = deSide ? withArtikel(word) : word.tr;
  const answer = deSide ? word.tr : withArtikel(word);
  const [picked, setPicked] = useState<string | null>(null);
  const [fb, setFb] = useState<Feedback | null>(null);
  useAutoSpeak(deSide ? question : null, round.id);
  function choose(o: Option) {
    if (picked) return;
    const ok = o.text === answer;
    setPicked(o.text);
    // Almanca CEVAP olduğunda (tr-de) doğru Almanca'yı oku; de-tr'de Almanca zaten
    // soru olarak mount'ta okundu → tekrar okuma.
    markAnswer(ok, deSide ? null : withArtikel(word));
    setFb({ correct: ok, answerDe: withArtikel(word), tr: word.tr, en: word.en, why: ok ? null : whyMeaning(word, o.text) });
  }
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : undefined}>
      <Prompt label={deSide ? "Türkçesi?" : "Almancası?"} big={question} speakText={deSide ? question : null} sub={!deSide ? word.en : null} colors={colors} />
      <MascotMid mood={picked ? (picked === answer ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      <View style={{ gap: spacing.md }}>
        {(round.options ?? []).map((o) => {
          const st = picked ? (o.text === answer ? "correct" : o.text === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o.text} text={o.text} sub={o.sub} state={st} onPress={() => choose(o)} colors={colors} />;
        })}
      </View>
    </RoundShell>
  );
}

function ArtikelRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [picked, setPicked] = useState<string | null>(null);
  const [fb, setFb] = useState<Feedback | null>(null);
  function choose(a: string) {
    if (picked) return;
    const ok = a === word.artikel;
    setPicked(a);
    markAnswer(ok, withArtikel(word)); // doğru artikel+kelime (Almanca = cevap)
    setFb({ correct: ok, answerDe: withArtikel(word), tr: word.tr, en: word.en, why: ok ? null : whyArticle(word) });
  }
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : undefined}>
      <Prompt label="Hangi artikel?" big={word.de} speakText={withArtikel(word)} sub={meaningLine(word)} colors={colors} />
      <MascotMid mood={picked ? (picked === word.artikel ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {["der", "die", "das"].map((a) => {
          const st = picked ? (a === word.artikel ? "correct" : a === picked ? "wrong" : "idle") : "idle";
          return <View key={a} style={{ flex: 1 }}><OptionButton text={a} state={st} idleTint={ARTIKEL_TONE[a]} onPress={() => choose(a)} colors={colors} /></View>;
        })}
      </View>
    </RoundShell>
  );
}

function TrueFalseRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [ans, setAns] = useState<boolean | null>(null);
  const [fb, setFb] = useState<Feedback | null>(null);
  useAutoSpeak(withArtikel(word), round.id); // Almanca = soru → mount'ta oku
  function choose(v: boolean) {
    if (ans !== null) return;
    const ok = v === round.isTrue;
    setAns(v);
    markAnswer(ok, null); // Almanca zaten mount'ta okundu
    setFb({ correct: ok, answerDe: withArtikel(word), tr: word.tr, en: word.en, why: ok ? null : whyMeaning(word, null) });
  }
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : undefined}>
      <Prompt label="Doğru mu?" big={withArtikel(word)} speakText={withArtikel(word)} sub={round.claim ? meaningLine({ tr: round.claim.text, en: round.claim.sub }) : meaningLine(word)} colors={colors} />
      <MascotMid mood={ans !== null ? (ans === round.isTrue ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {[{ v: true, l: "Doğru" }, { v: false, l: "Yanlış" }].map(({ v, l }) => {
          const st = ans !== null ? (v === round.isTrue ? "correct" : v === ans ? "wrong" : "idle") : "idle";
          return <View key={l} style={{ flex: 1 }}><OptionButton text={l} state={st} onPress={() => choose(v)} colors={colors} /></View>;
        })}
      </View>
    </RoundShell>
  );
}

/** Yaz(arak) turları için: ipucu düğmesi + iskelet. */
function HintRow({ answer, colors }: { answer: string; colors: Palette }) {
  const [shown, setShown] = useState(false);
  return (
    <View style={{ marginTop: spacing.md }}>
      {shown ? (
        <Text variant="bodyStrong" color={colors.textMuted} style={{ fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace", letterSpacing: 2, textAlign: "center" }}>{skeleton(answer)}</Text>
      ) : (
        <PressableScale onPress={() => setShown(true)} style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 8 }}>
          <Text variant="caption" color={colors.textMuted}>İpucu göster</Text>
        </PressableScale>
      )}
    </View>
  );
}

function TypingRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [val, setVal] = useState("");
  const [fb, setFb] = useState<Feedback | null>(null);
  function check() {
    if (fb) return;
    const ok = norm(val) === norm(word.de) || norm(val) === norm(withArtikel(word));
    Keyboard.dismiss();
    markAnswer(ok, withArtikel(word)); // doğru kelimeyi oku (Almanca = cevap)
    setFb({ correct: ok, answerDe: withArtikel(word), tr: word.tr, en: word.en, why: ok ? null : whyMeaning(word, null) });
  }
  const inputBlock = (
    <View>
      <TextInput
        value={val}
        onChangeText={setVal}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Yaz..."
        placeholderTextColor={colors.textFaint}
        onSubmitEditing={check}
        returnKeyType="done"
        blurOnSubmit={false}
        style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 16, color: colors.text, fontSize: 18 }}
      />
      <HintRow answer={word.de} colors={colors} />
      <PressableScale onPress={check} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
        <Text variant="h3" color="#fff">Kontrol et</Text>
      </PressableScale>
    </View>
  );
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : inputBlock}>
      <Prompt label="Almancasını yaz" big={word.tr} sub={word.en} colors={colors} />
      <MascotMid mood={fb === null ? "idle" : fb.correct ? "thumbsup" : "sad"} hidden={!!fb} />
    </RoundShell>
  );
}

function ClozeRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const opts = (round.options as unknown as string[] | undefined) ?? [];
  const answer = round.answer ?? "";
  const full = fillBlank(round.sentence, answer);
  const [picked, setPicked] = useState<string | null>(null);
  const [fb, setFb] = useState<Feedback | null>(null);
  function choose(o: string) {
    if (picked) return;
    const ok = o === answer;
    setPicked(o);
    markAnswer(ok, full); // web: cevapta TAM tamamlanmış cümleyi oku
    // Geri bildirimde de sadece kelimeyi değil TAM cümleyi göster (çeviri anlamlı olsun).
    setFb({ correct: ok, answerDe: full, tr: round.sentenceTr ?? null, en: round.sentenceEn ?? null });
  }
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : undefined}>
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.xl, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, softShadow("#5a3418", 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.md }}>Boşluğu doldur</Text>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm }}>
          <Text variant="h2" style={{ flex: 1, lineHeight: 32 }}>{round.sentence}</Text>
          <SpeakButton text={round.sentence ?? ""} colors={colors} size={22} />
        </View>
        {round.sentenceTr ? <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{round.sentenceTr}</Text> : null}
      </View>
      <MascotMid mood={picked ? (picked === answer ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      <View style={{ gap: spacing.md }}>
        {opts.map((o) => {
          const st = picked ? (o === answer ? "correct" : o === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o} text={o} state={st} onPress={() => choose(o)} colors={colors} />;
        })}
      </View>
    </RoundShell>
  );
}

function PluralRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const answer = round.answer ?? "";
  const opts = (round.options as unknown as string[] | undefined) ?? [];
  const [picked, setPicked] = useState<string | null>(null);
  const [fb, setFb] = useState<Feedback | null>(null);
  useAutoSpeak(withArtikel(word), round.id); // tekil hâli mount'ta oku
  function choose(o: string) {
    if (picked) return;
    const ok = o === answer;
    setPicked(o);
    markAnswer(ok, `die ${answer}`); // doğru çoğulu oku
    setFb({ correct: ok, answerDe: `die ${answer}`, tr: word.tr, en: word.en, why: ok ? null : whyPlural(answer) });
  }
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : undefined}>
      <Prompt label="Çoğulu?" big={withArtikel(word)} speakText={withArtikel(word)} sub={meaningLine(word)} colors={colors} />
      <MascotMid mood={picked ? (picked === answer ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      <View style={{ gap: spacing.md }}>
        {opts.map((o) => {
          const st = picked ? (o === answer ? "correct" : o === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o} text={`die ${o}`} state={st} onPress={() => choose(o)} colors={colors} />;
        })}
      </View>
    </RoundShell>
  );
}

/** İlk örnek gösterimli öz-değerlendirme (intro + bilinmeyen türler). */
function SelfAssess({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word ?? round.words?.[0];
  const [reveal, setReveal] = useState(false);
  const spoke = useRef(false);
  useEffect(() => {
    if (round.game === "intro" && word && !spoke.current) { spoke.current = true; speakTarget(withArtikel(word)); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);
  // Kelime yoksa turu güvenle atla (render sırasında değil, efektte).
  useEffect(() => {
    if (!word) onDone(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);
  if (!word) return <View style={{ flex: 1 }} />;
  const footer = !reveal ? (
    <PressableScale onPress={() => setReveal(true)} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 8)]}>
      <Text variant="h3" color="#fff">Cevabı göster</Text>
    </PressableScale>
  ) : (
    <View style={{ flexDirection: "row", gap: spacing.md }}>
      <View style={{ flex: 1 }}><OptionButton text="Zorlandım" state="idle" onPress={() => onDone(false)} colors={colors} /></View>
      <View style={{ flex: 1 }}><OptionButton text="Bildim" state="idle" onPress={() => onDone(true)} colors={colors} /></View>
    </View>
  );
  return (
    <RoundShell footer={footer}>
      <Prompt label={round.game === "intro" ? "Yeni kelime" : "Hatırla"} big={withArtikel(word)} speakText={withArtikel(word)} sub={round.sentence ?? null} colors={colors} />
      {reveal ? (
        <View style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg }}>
          <Text variant="h3">{meaningLine(word)}</Text>
          <ExampleBlock de={word.beispiel} tr={word.beispielTr} en={word.beispielEn ?? null} colors={colors} />
        </View>
      ) : null}
      <MascotMid mood={reveal ? "happy" : "idle"} />
    </RoundShell>
  );
}

/** Küçük harf/kelime karosu — scramble ve order. */
function Tile({ label, onPress, dim, colors }: { label: string; onPress?: () => void; dim?: boolean; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} disabled={dim} accessibilityLabel={label} accessibilityState={{ disabled: !!dim }} style={{ paddingHorizontal: 14, paddingVertical: 12, borderRadius: radii.md, backgroundColor: dim ? colors.surface2 : colors.surface, borderWidth: 1.5, borderColor: colors.border, opacity: dim ? 0.4 : 1 }}>
      <Text variant="bodyStrong" color={colors.text}>{label}</Text>
    </PressableScale>
  );
}

function ListenRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const [picked, setPicked] = useState<string | null>(null);
  const [fb, setFb] = useState<Feedback | null>(null);
  const [audible, setAudible] = useState<boolean | null>(null);
  useEffect(() => { ttsAvailable().then(setAudible); }, []);
  useEffect(() => { if (audible) speakTarget(withArtikel(word)); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [audible, round.id]);
  const hideWord = audible === true && !picked;
  function choose(o: Option) {
    if (picked) return;
    const ok = o.text === word.tr;
    setPicked(o.text);
    markAnswer(ok, null); // dinleme turu: Almanca zaten çalındı
    setFb({ correct: ok, answerDe: withArtikel(word), tr: word.tr, en: word.en, why: ok ? null : whyMeaning(word, o.text) });
  }
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : undefined}>
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, softShadow("#5a3418", 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>Dinle · anlamını seç</Text>
        {hideWord ? (
          <PressableScale onPress={() => speakTarget(withArtikel(word))} style={[{ width: 84, height: 84, borderRadius: 42, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginTop: spacing.lg }, softShadow(colors.primary, 12)]}>
            <SpeakerIcon color="#fff" size={38} />
          </PressableScale>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.sm }}>
            <Text variant="display" style={{ textAlign: "center" }}>{withArtikel(word)}</Text>
            <SpeakButton text={withArtikel(word)} colors={colors} size={24} />
          </View>
        )}
      </View>
      <MascotMid mood={picked ? (picked === word.tr ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      <View style={{ gap: spacing.md }}>
        {(round.options ?? []).map((o) => {
          const st = picked ? (o.text === word.tr ? "correct" : o.text === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o.text} text={o.text} sub={o.sub} state={st} onPress={() => choose(o)} colors={colors} />;
        })}
      </View>
    </RoundShell>
  );
}

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
  const [fb, setFb] = useState<Feedback | null>(null);
  const usedIds = new Set(placed.map((t) => t.id));
  // Bir harf yerleştir; tamamlanınca değerlendir (hem dokunuş hem ipucu buradan geçer).
  function place(t: { id: number; char: string }) {
    const np = [...placed, t];
    setPlaced(np);
    if (np.length === target.length) {
      const ok = norm(np.map((x) => x.char).join("")) === compareTarget;
      markAnswer(ok, withArtikel(word)); // tamamlanınca doğru kelimeyi oku
      setFb({ correct: ok, answerDe: word.de, tr: word.tr, en: word.en });
    } else {
      sfx("tap");
    }
  }
  function tapPool(t: { id: number; char: string }) { if (fb || usedIds.has(t.id)) return; place(t); }
  function backspace() { if (fb || placed.length === 0) return; sfx("tap"); setPlaced((p) => p.slice(0, -1)); }
  // İpucu (web): sıradaki DOĞRU harfi havuzdan bulup otomatik yerleştirir.
  function useHint() {
    if (fb || placed.length >= target.length) return;
    const needed = target[placed.length];
    const tile = pool.find((t) => !usedIds.has(t.id) && t.char === needed)
      ?? pool.find((t) => !usedIds.has(t.id) && t.char.toLowerCase() === needed.toLowerCase());
    if (tile) place(tile);
  }
  const brd = fb ? (fb.correct ? colors.success : colors.danger) : colors.border;
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : undefined}>
      <Prompt label="Harfleri sırala" big={word.tr} sub={word.en} colors={colors} />
      <MascotMid mood={fb === null ? "idle" : fb.correct ? "thumbsup" : "sad"} hidden={!!fb} />
      <View>
        <View style={{ minHeight: 56, flexDirection: "row", flexWrap: "wrap", gap: 8, borderWidth: 1.5, borderColor: brd, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.lg, backgroundColor: colors.surface }}>
          {placed.length === 0 ? <Text variant="body" color={colors.textFaint}>Harflere dokun…</Text> : placed.map((t, i) => <Tile key={i} label={t.char} colors={colors} onPress={() => { if (!fb) setPlaced((p) => p.slice(0, i)); }} />)}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {pool.map((t) => <Tile key={t.id} label={t.char} dim={usedIds.has(t.id)} onPress={() => tapPool(t)} colors={colors} />)}
        </View>
        {!fb ? (
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
            <PressableScale onPress={backspace} disabled={placed.length === 0} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 9, opacity: placed.length === 0 ? 0.4 : 1 }}>
              <Text variant="caption" color={colors.textMuted}>Sil</Text>
            </PressableScale>
            <PressableScale onPress={useHint} disabled={placed.length >= target.length} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 9, opacity: placed.length >= target.length ? 0.4 : 1 }}>
              <Text variant="caption" color={colors.textMuted}>İpucu</Text>
            </PressableScale>
          </View>
        ) : null}
      </View>
    </RoundShell>
  );
}

function OrderRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word!;
  const answer = (round.answer as unknown as string[] | undefined) ?? [];
  const tail = round.tail ?? "";
  const full = [...answer, tail].filter(Boolean).join(" ");
  const pool = React.useMemo(() => (round.tokens ?? []).map((text, id) => ({ id, text })), [round.id]);
  const [placed, setPlaced] = useState<{ id: number; text: string }[]>([]);
  const [fb, setFb] = useState<Feedback | null>(null);
  const usedIds = new Set(placed.map((t) => t.id));
  function tap(t: { id: number; text: string }) {
    if (fb || usedIds.has(t.id) || placed.length >= answer.length) return;
    const np = [...placed, t];
    setPlaced(np);
    if (np.length === answer.length) {
      const ok = np.map((x) => x.text).join(" ") === answer.join(" ");
      markAnswer(ok, full); // tamamlanınca tam cümleyi oku
      setFb({ correct: ok, answerDe: full, speakDe: full, tr: round.sentenceTr ?? word.tr, en: round.sentenceEn ?? null });
    } else {
      sfx("tap");
      speakTarget(t.text); // web: her yerleştirilen kelimeyi oku
    }
  }
  const brd = fb ? (fb.correct ? colors.success : colors.danger) : colors.border;
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : undefined}>
      <Prompt label="Cümleyi sıraya diz" big={round.sentenceTr ?? word.tr} sub={round.sentenceEn ?? null} colors={colors} />
      <MascotMid mood={fb === null ? "idle" : fb.correct ? "thumbsup" : "sad"} hidden={!!fb} />
      <View>
        <View style={{ minHeight: 56, flexDirection: "row", flexWrap: "wrap", gap: 8, borderWidth: 1.5, borderColor: brd, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.lg, backgroundColor: colors.surface }}>
          {placed.length === 0 ? <Text variant="body" color={colors.textFaint}>Kelimelere dokun…</Text> : placed.map((t, i) => <Tile key={i} label={t.text} colors={colors} onPress={() => { if (!fb) setPlaced((p) => p.slice(0, i)); }} />)}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {pool.map((t) => <Tile key={t.id} label={t.text} dim={usedIds.has(t.id)} onPress={() => tap(t)} colors={colors} />)}
        </View>
      </View>
    </RoundShell>
  );
}

function TranslateRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const s = round.sentence as unknown as { tr: string; de: string; en: string | null };
  const alts = round.alternatives ?? [];
  const [val, setVal] = useState("");
  const [fb, setFb] = useState<Feedback | null>(null);
  const sn = (x: string) => x.trim().toLowerCase().replace(/[.!?…,;:]/g, "").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ");
  function check() {
    if (fb) return;
    const t = sn(val);
    const ok = !!t && (t === sn(s.de) || alts.some((a) => sn(a) === t));
    Keyboard.dismiss();
    markAnswer(ok, s.de); // doğru Almanca cümleyi oku
    setFb({ correct: ok, answerDe: s.de, speakDe: s.de, tr: s.tr, en: s.en });
  }
  const inputBlock = (
    <View>
      <TextInput
        value={val}
        onChangeText={setVal}
        multiline
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="Almanca cümleyi yaz…"
        placeholderTextColor={colors.textFaint}
        style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 16, color: colors.text, fontSize: 18, minHeight: 88, textAlignVertical: "top" }}
      />
      <HintRow answer={s.de} colors={colors} />
      <PressableScale onPress={check} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
        <Text variant="h3" color="#fff">Kontrol et</Text>
      </PressableScale>
    </View>
  );
  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct)} colors={colors} /> : inputBlock}>
      <Prompt label="Almancaya çevir" big={s.tr} sub={s.en} colors={colors} />
      <MascotMid mood={fb === null ? "idle" : fb.correct ? "thumbsup" : "sad"} hidden={!!fb} />
    </RoundShell>
  );
}

function MatchCard({ text, sub, state, onPress, colors }: { text: string; sub?: string | null; state: "idle" | "sel" | "correct" | "wrong"; onPress: () => void; colors: Palette }) {
  const border = state === "correct" ? colors.success : state === "wrong" ? colors.danger : state === "sel" ? colors.primary : colors.border;
  const bg = state === "correct" ? colors.successSoft : state === "wrong" ? colors.dangerSoft : state === "sel" ? colors.primarySoft : colors.surface;
  const shake = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (state === "wrong") Animated.sequence([-7, 7, -5, 5, 0].map((v) => Animated.timing(shake, { toValue: v, duration: 45, useNativeDriver: true }))).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <Animated.View style={{ transform: [{ translateX: shake }] }}>
      <PressableScale onPress={onPress} disabled={state === "correct"} accessibilityLabel={sub ? `${text}, ${sub}` : text} accessibilityState={{ selected: state === "sel", disabled: state === "correct" }} style={{ borderWidth: 1.5, borderColor: border, backgroundColor: bg, borderRadius: radii.lg, paddingVertical: spacing.md, paddingHorizontal: spacing.md, opacity: state === "correct" ? 0.5 : 1, minHeight: 60, justifyContent: "center" }}>
        <Text variant="bodyStrong" color={colors.text}>{text}</Text>
        {sub ? <Text variant="body" color={colors.textMuted} style={{ fontSize: 12 }}>{sub}</Text> : null}
      </PressableScale>
    </Animated.View>
  );
}

function MatchRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  // Aynı Türkçe/Almanca iki kez çıkmasın: sağ sütunda ikiz karşılık kafa karıştırır.
  const words = React.useMemo(() => {
    const seen = new Set<string>();
    const out: RoundWord[] = [];
    for (const w of round.words ?? []) {
      const tr = w.tr.trim().toLowerCase();
      const de = w.de.trim().toLowerCase();
      if (seen.has(`tr:${tr}`) || seen.has(`de:${de}`)) continue;
      seen.add(`tr:${tr}`); seen.add(`de:${de}`);
      out.push(w);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);
  const rights = React.useMemo(() => {
    const arr = words.map((w) => ({ wordId: w.id, text: w.tr, sub: w.en }));
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id, words.length]);
  const [selLeft, setSelLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<{ left: number; right: number } | null>(null);
  const [fb, setFb] = useState<Feedback | null>(null);
  const wrongBefore = useRef<Set<number>>(new Set());

  function pickLeft(id: number) {
    if (matched.has(id) || fb) return;
    sfx("tap");
    const w = words.find((x) => x.id === id);
    if (w) speakTarget(withArtikel(w)); // web: Almanca kutusuna dokununca oku
    setSelLeft(id); setWrong(null);
  }
  function pickRight(r: { wordId: number; text: string }) {
    if (fb || selLeft == null || matched.has(r.wordId)) return;
    if (r.wordId === selLeft) {
      const nm = new Set(matched); nm.add(selLeft); setMatched(nm); setSelLeft(null); haptic("correct"); sfx("correct");
      if (nm.size === words.length) {
        const batch = words.map((w) => ({ wordId: w.id, correct: !wrongBefore.current.has(w.id) }));
        const okCount = batch.filter((b) => b.correct).length;
        setFb({ correct: batch.every((b) => b.correct), note: `${okCount}/${words.length} kelime ilk denemede`, tr: null, answerDe: null });
      }
    } else {
      wrongBefore.current.add(selLeft); haptic("wrong"); sfx("wrong");
      const l = selLeft;
      setWrong({ left: l, right: r.wordId });
      setSelLeft(null);
      setTimeout(() => setWrong((w) => (w && w.left === l ? null : w)), 550);
    }
  }
  const batch = words.map((w) => ({ wordId: w.id, correct: !wrongBefore.current.has(w.id) }));

  return (
    <RoundShell footer={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, batch)} colors={colors} /> : undefined}>
      <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.md, marginTop: spacing.md, textAlign: "center" }}>Eşleştir</Text>
      <MascotMid mood={fb ? (fb.correct ? "happy" : "idle") : "idle"} hidden={!!fb} />
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <View style={{ flex: 1, gap: spacing.sm }}>
          {words.map((w) => {
            const st = matched.has(w.id) ? "correct" : wrong?.left === w.id ? "wrong" : selLeft === w.id ? "sel" : "idle";
            // Kutuya dokununca zaten sesli okunuyor → ayrı hoparlör ikonu gereksiz.
            return <MatchCard key={w.id} text={withArtikel(w)} state={st} onPress={() => pickLeft(w.id)} colors={colors} />;
          })}
        </View>
        <View style={{ flex: 1, gap: spacing.sm }}>
          {rights.map((r) => {
            const st = matched.has(r.wordId) ? "correct" : wrong?.right === r.wordId ? "wrong" : "idle";
            return <MatchCard key={r.wordId} text={r.text} sub={r.sub} state={st} onPress={() => pickRight(r)} colors={colors} />;
          })}
        </View>
      </View>
    </RoundShell>
  );
}

const INTERACTIVE = new Set(["choice", "artikel", "truefalse", "typing", "cloze", "plural", "listen", "scramble", "order", "translate", "match"]);

function pickRound(round: Round, onDone: Done, colors: Palette) {
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

/** Tur türüne göre doğru oynatıcıyı seçer. Klavye + alt-sabit aksiyon alanı her
 *  turun kendi RoundShell'inde yönetilir (edge-to-edge'de manuel klavye kaldırma). */
export function RoundView({ round, onDone }: { round: Round; onDone: Done }) {
  const { colors } = useTheme();
  return pickRound(round, onDone, colors);
}

export { INTERACTIVE };
