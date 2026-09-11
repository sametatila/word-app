import React, { useEffect, useRef, useState } from "react";
import { grammarLine } from "./wordGrammar";
import { firstExample } from "../data/example";
import { t as tx, nativeLangName, targetLangName } from "../lib/i18n";
import { foldCase, foldCompare, foldTight } from "../lib/textFold";
import { matchSentence, VERDICT_KEYS, type SentenceMatch } from "../lib/sentenceMatch";
import { markKnown, optionCards, optionTexts, todayStr } from "./session";
import { SentenceFeedback, type MarkedToken } from "../ui/TokenDiff";
import { classifyOrder, classifyTyping, miss } from "../lib/errors";
import { api } from "../api/client";
import type { DoneExtra } from "./session";
import { currentTargetLang } from "../lib/courses";
import { View, TextInput, ScrollView, Keyboard, Platform, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, XIcon, SpeakerIcon } from "../ui/icons";
import { Mascot, type Mood } from "../ui/Mascot";
import { haptic } from "../lib/haptics";
import { sfx } from "../lib/sfx";
import { reduceMotion } from "../lib/reduceMotion";
import { useKeyboardHeight } from "../lib/useKeyboardHeight";
import { whyMeaning, whyArticle, whyPlural } from "./why";
import { speakTarget, ttsAvailable } from "../lib/tts";
import { useTheme, spacing, radii, softShadow, cardShadow, type Palette } from "../theme";
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
  // Baştaki tanımlık burada atılıyor (ortak katlamada değil), çünkü sözlük
  // başlığı "die Tür" ama kullanıcının "Tür" yazması doğru sayılmalı.
  // Küçültme ÖNCE gelmeli: LEAD_ARTICLE küçük harf arıyor, "Die Tür" aksi
  // halde eşleşmiyor.
  const base = foldCase(s.trim(), lang).replace(LEAD_ARTICLE[lang] ?? LEAD_ARTICLE.de, "");
  return foldCompare(base, lang);
}

/** Anlam satırı: Türkçe + (varsa) İngilizce ayırt edici. */
function meaningLine(w: { tr: string; en: string | null }): string {
  return w.en ? `${w.tr} · ${w.en}` : w.tr;
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
      {e ? <Text variant="caption" color={colors.textFaint} style={{ marginTop: 1 }}>{e}</Text> : null}
    </View>
  );
}

/**
 * der / die / das renk tonu — PALETTEN, sabit değerden değil.
 *
 * Üç değer elle yazılı Tailwind varsayılanıydı (#0284c7 / #e11d48 / #0d9488)
 * ve üç ayrı sorun çıkarıyordu:
 *
 *   1. Uygulamanın paletinde yoklardı. Web aynı üç rolü palet basamağından
 *      alıyor (`intro-game`: sky-600 / rose-600 / mint-600), yani aynı artikel
 *      iki uygulamada iki ayrı renkti - "das" mobilde teal, webde mint yeşili.
 *   2. Tema duyarlı değillerdi. Tek değer hem açık hem koyu temada
 *      çiziliyordu; web koyu temada 300 basamağına geçiyor.
 *   3. Kontrast eşiğini geçmiyorlardı. Ton burada SEÇENEK METNİ olarak
 *      kullanılıyor (bkz. `OptionButton` `fg`), yani okunabilirlik eşiği 4.5.
 *      Ölçüm: der açık kartta 4.10, das açık kartta 3.74, die koyu kartta
 *      3.66 - altısının üçü sınırın altında. Paletin değerleriyle altısı da
 *      geçiyor (5.30 - 9.74).
 *
 * Renk burada TEK taşıyıcı (seçeneğin yanında rengi açıklayan etiket yok), o
 * yüzden webin `palette-check` betiğindeki KATI eşiğin konusu; palet
 * basamakları o eşikle birlikte ölçülüyor.
 */
function artikelTone(a: string, colors: Palette): string {
  return a === "der" ? colors.infoText : a === "die" ? colors.dangerText : a === "das" ? colors.successText : colors.primaryText;
}

/**
 * Turun sonucu. `extra` HATA TİPİNİ ve SRS kalitesini taşıyor.
 *
 * Eskiden yalnız `correct` ve çok kelimeli turların yığını vardı: sunucuya
 * giden cevapta `errorType` HİÇ YOKTU ve `quality` hiç atanmıyordu. Web her
 * oyunda ikisini de gönderiyor (`lib/errors` `miss`), yani yalnız Androidde
 * çalışan bir kullanıcının hata tipi dökümü boş kalıyor ve SRS'i cevabı
 * yalnız doğru/yanlış görüyordu (bkz. web-parity §11.19).
 */
type Done = (correct: boolean, extra?: DoneExtra) => void;

/** Cevap sonrası geri bildirim verisi — web VerdictBar'ın taşıdığı bilgi. */
type Feedback = {
  correct: boolean;
  answerDe?: string | null; // doğru Almanca cevap (belirgin gösterilir)
  speakDe?: string | null;  // hoparlör tıklanınca okunacak (yoksa answerDe) — cloze/order tam cümle
  tr?: string | null;       // Türkçe anlam (BELİRGİN gösterilir)
  en?: string | null;
  why?: string | null;      // yalnız yanlışta: neden yanlış
  note?: string | null;     // özet (match gibi tek cevabı olmayan turlar)
  /**
   * Kelime kelime fark (yalnız cümle hakemi olan turlar).
   *
   * Web çeviri turunda hükmü ve farkı birlikte gösteriyor
   * (`components/feedback/diff-text`); mobil hakem sonucunu kullanmaya
   * başladıktan sonra da farkı GÖSTERMİYORDU: öğrenci "yanlış" görüyor, nerede
   * yanlış olduğunu görmüyordu. Verildiğinde `answerDe` satırının yerine bu
   * çiziliyor - ikisi aynı şeyi iki kez söylerdi.
   */
  diff?: { verdictKey: string; target: MarkedToken[]; typed: MarkedToken[]; showTyped: boolean } | null;
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
    <PressableScale accessibilityLabel={tx("item.listen")} onPress={() => speakTarget(text)} hitSlop={8} style={{ padding: 4 }}>
      <SpeakerIcon color={colors.primaryText} size={size} />
    </PressableScale>
  );
}

/**
 * Sonuç katmanının kapladığı yükseklik (px) — şerit + ara + "Devam" + iç pay.
 * Yer turun BAŞINDAN bu ölçüde ayrılıyor; ölçü katmanın kendisiyle aynı yerden
 * okunuyor ki ikisi ayrı yazılıp sessizce kaymasın.
 */
const SHEET_H = 60 + spacing.sm + 50 + spacing.md * 2;
/**
 * Katmanla üstündeki içerik arasındaki pay. `md` denendi ve yetmedi: katmanın
 * yükseltme gölgesi yukarı doğru yayıldığı için şıkların alt kenarı kesilmiş
 * gibi duruyordu (koyu temada belirgin).
 */
const SHEET_GAP = spacing.xl;

/**
 * Tur iskeleti — içerik üstte (kaydırılabilir; kısa ise dikey doldurur), AKSİYON
 * alanı ALTTA.
 *
 * İki ayrı dip var ve karıştırılmamalı:
 *
 *   `footer` — turun KENDİ akışındaki dip: yazma turlarının input+ipucu+buton
 *   bloğu, tanıtım kartının iki düğmesi. Klavye açılınca yukarı kalkıyor.
 *
 *   `sheet` — cevaptan sonra ÜSTE binen katman: doğru/yanlış şeridi ve "Devam".
 *   Akışta değil, bu yüzden belirdiğinde altındaki hiçbir şey kımıldamıyor.
 *
 * Katman neden ayrı: geri bildirim de akıştaydı ve cevap verilince beliriyordu.
 * Kartın boyu değişince esneyen boşluklar küçülüyor ve şıklar YUKARI kayıyordu
 * — hem de tam öğrencinin işaretlediği şıkka baktığı anda, dokunulan şık
 * parmağın altından kaçarak. Web'de de aynı karar (`games/round-sheet`).
 *
 * Katman içeriği örtmüyor: dipte kendi akışı OLMAYAN turlarda (şıklı turlar)
 * katmanın bandı baştan boş tutuluyor. Yazma turlarında zaten input bloğu
 * duruyor; orada katman onun üstüne biniyor — Duolingo'daki "Kontrol et"in
 * yerini geri bildirimin alması gibi.
 */
function RoundShell({ children, footer, sheet, scroll = true }: { children: React.ReactNode; footer?: React.ReactNode; sheet?: React.ReactNode; scroll?: boolean }) {
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
      {footer ? null : <View style={{ height: SHEET_H + SHEET_GAP }} />}
      {sheet ? <SheetLayer>{sheet}</SheetLayer> : null}
    </View>
  );
}

/**
 * Katmanın kendisi — dipten yükselip içeriğin üstünde duran kat.
 *
 * Kenarlara dayanmıyor, host'un yatay payının içinde kalıyor: negatif kenar
 * boşluğuyla ebeveynin dışına taşan bir görünüm Android'de kırpılabiliyor ve
 * o riski her turda tekrar eden bir öğede almaya değmez. Katman hissini
 * gölge ve köşe yarıçapı kuruyor (bkz. FeedbackFooter).
 */
function SheetLayer({ children }: { children: React.ReactNode }) {
  const slide = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    /* "Hareketi azalt": tur yerinde beliriyor. */
    if (reduceMotion()) slide.setValue(0);
    else Animated.timing(slide, { toValue: 0, duration: 200, useNativeDriver: true }).start();
  }, [slide]);
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        transform: [
          { translateY: slide.interpolate({ inputRange: [0, 1], outputRange: [0, SHEET_H + spacing.xxl] }) },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}

/**
 * Geri bildirim (Duolingo mantığı): cevaptan sonra KOMPAKT şerit — maskot +
 * doğru/yanlış, doğru Almanca cevap (hoparlörlü), TÜRKÇE anlam BELİRGİN, yanlışta
 * kısa neden. "Devam" düğmesi şeridin ALTINDA, ekranın en altında (tek el).
 *
 * Kendi YÜZEYİ var: katman içeriğin üstüne bindiği için altındaki şıkların
 * arasından sızmamalı. Zemin nötr (`surface`), rengi şerit taşıyor — zemin de
 * renklense şerit ikinci bir renk katmanı olur ve "cevabın kutusu" olduğu
 * okunmazdı.
 */
function FeedbackFooter({ data, onContinue, colors }: { data: Feedback; onContinue: () => void; colors: Palette }) {
  const ok = data.correct;
  const tone = ok ? colors.success : colors.danger;
  const speakText = data.speakDe ?? data.answerDe ?? undefined;
  return (
    <View style={[{ gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.md }, softShadow(tone, 16)]}>
      {/* Web VerdictBar: kompakt yatay şerit — maskot + tek akan satır (etiket +
          kalın Almanca cevap + · Türkçe), yanlışta ikinci küçük satır (neden). */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: ok ? colors.successSoft : colors.dangerSoft, borderRadius: radii.lg, borderWidth: 1.5, borderColor: tone, paddingVertical: spacing.sm, paddingHorizontal: spacing.sm, minHeight: 60 }}>
        <Mascot mood={ok ? "thumbsup" : "sad"} size={44} />
        <View style={{ flex: 1 }}>
          <Text variant="body" style={{ lineHeight: 21 }}>
            <Text variant="body" color={tone} style={{ fontWeight: "800" }}>{tx(ok ? "rounds.correct_excl" : "rounds.answer_is")}</Text>
            {data.answerDe && !data.diff ? <Text variant="body" color={colors.text} style={{ fontWeight: "800" }}>{data.answerDe}</Text> : null}
            {data.tr ? <Text variant="body" color={colors.textMuted}>{`  ·  ${data.tr}`}</Text> : null}
            {data.note ? <Text variant="body" color={colors.text} style={{ fontWeight: "800" }}>{data.note}</Text> : null}
          </Text>
          {data.diff ? (
            <SentenceFeedback verdictKey={data.diff.verdictKey} target={data.diff.target} typed={data.diff.typed} showTyped={data.diff.showTyped} />
          ) : null}
          {!ok && data.why ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{data.why}</Text> : null}
        </View>
        {speakText ? <SpeakButton text={speakText} colors={colors} size={20} /> : null}
      </View>
      <PressableScale onPress={onContinue} style={[{ borderRadius: radii.lg, backgroundColor: ok ? colors.success : colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(ok ? colors.success : colors.primary, 8)]}>
        <Text variant="h3" color={colors.onPrimary}>{tx("common.continue")}</Text>
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
    <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, cardShadow(colors, 10)]}>
      <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{label}</Text>
      <Text variant="display" style={{ marginTop: spacing.sm, textAlign: "center" }}>{big}</Text>
      {speakText ? <View style={{ marginTop: spacing.sm }}><SpeakButton text={speakText} colors={colors} size={22} /></View> : null}
      {sub ? <Text variant="body" color={colors.textMuted} style={{ marginTop: 4 }}>{sub}</Text> : null}
    </View>
  );
}

/**
 * ÇEVİRİ TURUNDA İKİNCİ ŞANS — web `games/translate-game` ile aynı iki sayı.
 *
 * Yerel hakem (`lib/sentenceMatch`) kural tabanlı: kabul listesinde olmayan
 * ama doğru bir çeviri "yanlış" çıkabiliyor. Web bu durumda MODELE soruyor ve
 * model yeterince yüksek puan verirse cevabı kabul ediyor; mobilde bu yol
 * HİÇ YOKTU, yani aynı cevap webde doğru, Androidde yanlış sayılıyordu -
 * üstelik kelimeyi de geriye atıyordu (SRS kalitesi).
 *
 * Bekleme kısa tutuluyor: tur akışını tutmayacak kadar.
 */
const ASSESS_WAIT_MS = 6000;
const ASSESS_ACCEPT = 75;

function OptionButton({ text, sub, state, onPress, colors, idleTint }: { text: string; sub?: string | null; state: "idle" | "correct" | "wrong"; onPress: () => void; colors: Palette; idleTint?: string }) {
  const bg = state === "correct" ? colors.successSoft : state === "wrong" ? colors.dangerSoft : colors.surface;
  const border = state === "correct" ? colors.success : state === "wrong" ? colors.danger : idleTint ?? colors.border;
  const fg = state === "correct" ? colors.success : state === "wrong" ? colors.danger : idleTint ?? colors.text;
  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (state === "wrong") {
      /* "Hareketi azalt": sarsıntı yok. Yanlış cevabın geri bildirimi renk,
         ikon, ses ve titreşimle zaten veriliyor - hareket dördüncü kanal. */
      if (!reduceMotion())
        Animated.sequence([-8, 8, -6, 6, -3, 0].map((v) => Animated.timing(shake, { toValue: v, duration: 45, useNativeDriver: true }))).start();
    } else if (state === "correct" && !reduceMotion()) {
      /* Doğru cevabın "pop"u da hareket; renk ve ikon zaten söylüyor. */
      Animated.sequence([
        Animated.spring(pop, { toValue: 1.05, useNativeDriver: true, speed: 50, bounciness: 0 }),
        Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <Animated.View style={{ transform: [{ translateX: shake }, { scale: pop }] }}>
      <PressableScale onPress={onPress} accessibilityLabel={sub ? `${text}, ${sub}` : text} accessibilityState={{ disabled: state !== "idle", selected: state !== "idle" }} accessibilityHint={state === "correct" ? tx("rounds.a11y_correct") : state === "wrong" ? tx("rounds.a11y_wrong") : undefined}
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: bg, borderColor: border, borderWidth: 1.5, borderRadius: radii.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg }}>
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong" color={fg}>{text}</Text>
          {sub ? <Text variant="caption" color={colors.textMuted}>{sub}</Text> : null}
        </View>
        {state === "correct" && <CheckIcon color={colors.successText} size={22} />}
        {state === "wrong" && <XIcon color={colors.dangerText} size={22} />}
      </PressableScale>
    </Animated.View>
  );
}

function ChoiceRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
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
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, "meaning", picked))} colors={colors} /> : undefined}>
      <Prompt label={deSide ? tx("rounds.ask_native", { nativeLang: nativeLangName() }) : tx("rounds.ask_target", { target: targetLangName() })} big={question} speakText={deSide ? question : null} sub={!deSide ? word.en : null} colors={colors} />
      <MascotMid mood={picked ? (picked === answer ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      <View style={{ gap: spacing.md }}>
        {optionCards(round).map((o) => {
          const st = picked ? (o.text === answer ? "correct" : o.text === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o.text} text={o.text} sub={o.sub} state={st} onPress={() => choose(o)} colors={colors} />;
        })}
      </View>
    </RoundShell>
  );
}

function ArtikelRound({ word, onDone, colors }: { word: RoundWord; onDone: Done; colors: Palette }) {
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
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, "article", picked))} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.which_article")} big={word.de} speakText={withArtikel(word)} sub={meaningLine(word)} colors={colors} />
      <MascotMid mood={picked ? (picked === word.artikel ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {["der", "die", "das"].map((a) => {
          const st = picked ? (a === word.artikel ? "correct" : a === picked ? "wrong" : "idle") : "idle";
          return <View key={a} style={{ flex: 1 }}><OptionButton text={a} state={st} idleTint={artikelTone(a, colors)} onPress={() => choose(a)} colors={colors} /></View>;
        })}
      </View>
    </RoundShell>
  );
}

function TrueFalseRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
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
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, "meaning", round.claim?.text ?? null))} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.correct")} big={withArtikel(word)} speakText={withArtikel(word)} sub={round.claim ? meaningLine({ tr: round.claim.text, en: round.claim.sub }) : meaningLine(word)} colors={colors} />
      <MascotMid mood={ans !== null ? (ans === round.isTrue ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {[{ v: true, l: tx("common.correct") }, { v: false, l: tx("common.wrong") }].map(({ v, l }) => {
          const st = ans !== null ? (v === round.isTrue ? "correct" : v === ans ? "wrong" : "idle") : "idle";
          return <View key={l} style={{ flex: 1 }}><OptionButton text={l} state={st} onPress={() => choose(v)} colors={colors} /></View>;
        })}
      </View>
    </RoundShell>
  );
}

/** Yaz(arak) turları için: ipucu düğmesi + iskelet. */
/**
 * İpucu satırı — harf iskeleti.
 *
 * DURUM DIŞARIDA: tur bileşeni ipucunun açıldığını bilmek zorunda, çünkü cevap
 * `hintUsed` ile gönderiliyor ve sunucudaki SRS puanı ona bakıyor (`lib/srs`
 * `grade`). Eskiden durum burada kapalıydı ve dışarı hiç çıkmıyordu.
 */
function HintRow({ answer, colors, shown, onShow }: { answer: string; colors: Palette; shown: boolean; onShow: () => void }) {
  const setShown = onShow;
  return (
    <View style={{ marginTop: spacing.md }}>
      {shown ? (
        <Text variant="bodyStrong" color={colors.textMuted} style={{ fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace", letterSpacing: 2, textAlign: "center" }}>{skeleton(answer)}</Text>
      ) : (
        <PressableScale onPress={() => setShown()} style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 8 }}>
          <Text variant="caption" color={colors.textMuted}>{tx("rounds.show_hint")}</Text>
        </PressableScale>
      )}
    </View>
  );
}

function TypingRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
  const [val, setVal] = useState("");
  /* Sunucu bu turu taze kelimenin ardına koyduysa ipucu baştan açık (web
     `typing-game` `hintShown` başlangıcı da `round.assist`). */
  const [hintShown, setHintShown] = useState(Boolean(round.assist));
  const [fb, setFb] = useState<Feedback | null>(null);
  function check() {
    if (fb) return;
    // Boşluksuz yedek: tireli başlıklarda ("t-shirt") tire boşluğa döndüğü için
    // kullanıcının bitişik yazdığı "tshirt" aksi halde reddedilirdi.
    const lang = currentTargetLang();
    const t = norm(val);
    const ok = (!!t && (t === norm(word.de) || t === norm(withArtikel(word))))
      || (!!foldTight(val, lang) && foldTight(val, lang) === foldTight(word.de, lang));
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
        placeholder={tx("rounds.type")}
        placeholderTextColor={colors.textFaint}
        onSubmitEditing={check}
        returnKeyType="done"
        blurOnSubmit={false}
        style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 16, color: colors.text, fontSize: 18 }}
      />
      <HintRow answer={word.de} colors={colors} shown={hintShown} onShow={() => setHintShown(true)} />
      <PressableScale onPress={check} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
        <Text variant="h3" color={colors.onPrimary}>{tx("common.check")}</Text>
      </PressableScale>
    </View>
  );
  return (
    <RoundShell footer={inputBlock} sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, { ...miss(fb.correct, classifyTyping(val, [word.de, withArtikel(word), ...(round.alternatives ?? [])]), val), hintUsed: hintShown })} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.write_equivalent", { lang: targetLangName() })} big={word.tr} sub={word.en} colors={colors} />
      {/* Yazma turunda da tür/çoğul: web `typing-game` aynı satırı çiziyor ve
          artikeli olan bir ismi yazarken çoğulunu bilmek işin parçası. */}
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: -spacing.sm, marginBottom: spacing.md }}>{grammarLine(word, word.tr)}</Text>
      <MascotMid mood={fb === null ? "idle" : fb.correct ? "thumbsup" : "sad"} hidden={!!fb} />
    </RoundShell>
  );
}

function ClozeRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const opts = optionTexts(round);
  const answer = typeof round.answer === "string" ? round.answer : "";
  const sentence = typeof round.sentence === "string" ? round.sentence : "";
  const full = fillBlank(sentence, answer);
  const typeMode = round.mode === "type";
  const [picked, setPicked] = useState<string | null>(null);
  const [val, setVal] = useState("");
  const [fb, setFb] = useState<Feedback | null>(null);
  function choose(o: string) {
    if (picked) return;
    /* Yazarak modda karşılaştırma katlamalı (web `matchesAnswer` ile aynı
       ilke): büyük/küçük, noktalama ve boşluksuz yazım bağışlı. */
    const lang = currentTargetLang();
    const ok = typeMode
      ? (!!foldCompare(o, lang) && foldCompare(o, lang) === foldCompare(answer, lang))
        || (!!foldTight(o, lang) && foldTight(o, lang) === foldTight(answer, lang))
      : o === answer;
    setPicked(o);
    markAnswer(ok, full); // web: cevapta TAM tamamlanmış cümleyi oku
    // Geri bildirimde de sadece kelimeyi değil TAM cümleyi göster (çeviri anlamlı olsun).
    setFb({ correct: ok, answerDe: full, tr: round.sentenceTr ?? null, en: round.sentenceEn ?? null });
  }
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, typeMode ? classifyTyping(picked ?? "", [answer]) : "meaning", picked))} colors={colors} /> : undefined}>
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.xl, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, cardShadow(colors, 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.md }}>{tx(typeMode ? "rounds.cloze_typed" : "rounds.fill_blank")}</Text>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm }}>
          <Text variant="h2" style={{ flex: 1, lineHeight: 32 }}>{sentence}</Text>
          <SpeakButton text={sentence} colors={colors} size={22} />
        </View>
        {round.sentenceTr ? <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{round.sentenceTr}</Text> : null}
      </View>
      <MascotMid mood={picked ? (fb?.correct ? "thumbsup" : "sad") : "idle"} hidden={!!fb} />
      {/* Yazarak modda şıklar ÇİZİLMİYOR: web de öyle yapıyor, şıkları
          göstermek zorlaştırmanın kendisini geri alırdı. Şıklar yine
          sunucudan geliyor çünkü basamak inişi onlara dönüyor. */}
      {typeMode ? (
        <View>
          <TextInput
            value={val}
            onChangeText={setVal}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!picked}
            placeholder={tx("rounds.type")}
            placeholderTextColor={colors.textFaint}
            onSubmitEditing={() => { if (val.trim()) choose(val.trim()); }}
            returnKeyType="done"
            blurOnSubmit={false}
            style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 16, color: colors.text, fontSize: 18 }}
          />
          <PressableScale onPress={() => { if (val.trim()) choose(val.trim()); }} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="h3" color={colors.onPrimary}>{tx("common.check")}</Text>
          </PressableScale>
        </View>
      ) : (
        <View style={{ gap: spacing.md }}>
          {opts.map((o) => {
            const st = picked ? (o === answer ? "correct" : o === picked ? "wrong" : "idle") : "idle";
            return <OptionButton key={o} text={o} state={st} onPress={() => choose(o)} colors={colors} />;
          })}
        </View>
      )}
    </RoundShell>
  );
}

function PluralRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
  const answer = typeof round.answer === "string" ? round.answer : "";
  const opts = optionTexts(round);
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
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, "plural", picked))} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.plural")} big={withArtikel(word)} speakText={withArtikel(word)} sub={meaningLine(word)} colors={colors} />
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
  const [skipping, setSkipping] = useState(false);
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
      <Text variant="h3" color={colors.onPrimary}>{tx("rounds.show_answer")}</Text>
    </PressableScale>
  ) : (
    <View style={{ gap: spacing.md }}>
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <View style={{ flex: 1 }}><OptionButton text={tx("rounds.struggled")} state="idle" onPress={() => onDone(false, { hintUsed: true })} colors={colors} /></View>
        <View style={{ flex: 1 }}><OptionButton text={tx("rounds.got_it")} state="idle" onPress={() => onDone(true, { hintUsed: true })} colors={colors} /></View>
      </View>
      {/*
        "BUNU ZATEN BİLİYORUM" — yalnız YENİ kelime turunda.
        Web `intro-game`de baştan beri var, mobilde hiç yoktu: bildiği bir
        kelimeyi gören kullanıcı onu kuyruktan çıkaramıyor, her tekrarında
        yeniden görüyordu. Kelime pekişmiş sayılıyor ve bu tur için CEVAP
        KAYDEDİLMİYOR (web `onDone([])` ile aynı).
      */}
      {round.game === "intro" ? (
        <PressableScale
          disabled={skipping}
          onPress={async () => {
            setSkipping(true);
            await markKnown(word.id);
            onDone(true, { skip: true });
          }}
          style={{ alignSelf: "center", paddingHorizontal: 18, paddingVertical: 10, opacity: skipping ? 0.5 : 1 }}
        >
          <Text variant="caption" color={colors.textMuted}>{tx(skipping ? "rounds.saving" : "rounds.already_known")}</Text>
        </PressableScale>
      ) : null}
    </View>
  );
  return (
    <RoundShell footer={footer}>
      <Prompt label={tx(round.game === "intro" ? "rounds.new_word" : "rounds.recall")} big={withArtikel(word)} speakText={withArtikel(word)} sub={typeof round.sentence === "string" ? round.sentence : null} colors={colors} />
      {/*
        TÜR VE ÇOĞUL. Sunucu her kelimede `typ` ve `formen` gönderiyor ve web
        bunu yeni kelime turunda baştan beri yazıyor; mobil iki alanı da hiç
        okumuyordu. Öğrenci Android'de bir kelimenin isim mi fiil mi olduğunu
        ve çoğulunun ne olduğunu HİÇ görmüyordu - kelimenin yarısı eksikti.
      */}
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: -spacing.sm, marginBottom: spacing.md }}>{grammarLine(word, word.tr)}</Text>
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

function ListenRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [fb, setFb] = useState<Feedback | null>(null);
  const [audible, setAudible] = useState<boolean | null>(null);
  /* Üçüncü dinleyişten sonra ipucu sayılıyor — web `listen-game` de
     `replays >= 2` diyor. İlk otomatik okuma sayılmıyor. */
  const [replays, setReplays] = useState(0);
  useEffect(() => { ttsAvailable().then(setAudible); }, []);
  // Tur basina bir kez oku: word zaten round.id'den turuyor, bagimliliga
  // eklemek ayni turda tekrar okumaya yol acabilir.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (audible) speakTarget(withArtikel(word)); }, [audible, round.id]);
  const hideWord = audible === true && !picked;
  function choose(o: Option) {
    if (picked) return;
    const ok = o.text === word.tr;
    setPicked(o.text);
    markAnswer(ok, null); // dinleme turu: Almanca zaten çalındı
    setFb({ correct: ok, answerDe: withArtikel(word), tr: word.tr, en: word.en, why: ok ? null : whyMeaning(word, o.text) });
  }
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, { ...miss(fb.correct, "listening", picked), hintUsed: replays >= 2 })} colors={colors} /> : undefined}>
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, cardShadow(colors, 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{tx("rounds.listen_pick_meaning")}</Text>
        {hideWord ? (
          <PressableScale accessibilityLabel={tx("item.listen")} onPress={() => { setReplays((n) => n + 1); speakTarget(withArtikel(word)); }} style={[{ width: 84, height: 84, borderRadius: 42, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginTop: spacing.lg }, softShadow(colors.primary, 12)]}>
            <SpeakerIcon color={colors.onPrimary} size={38} />
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
        {optionCards(round).map((o) => {
          const st = picked ? (o.text === word.tr ? "correct" : o.text === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o.text} text={o.text} sub={o.sub} state={st} onPress={() => choose(o)} colors={colors} />;
        })}
      </View>
    </RoundShell>
  );
}

function ScrambleRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
  const target = React.useMemo(() => Array.from(word.de).filter((c) => c !== " "), [word.de]);
  // Harf döşemeleri boşluksuz diziliyor; karşılaştırma da boşluksuz biçimde.
  const compareTarget = React.useMemo(() => foldTight(word.de, currentTargetLang()), [word.de]);
  const pool = React.useMemo(() => {
    const chars = Array.from(word.de).filter((c) => c !== " ").map((char, id) => ({ id, char }));
    for (let i = chars.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [chars[i], chars[j]] = [chars[j], chars[i]]; }
    return chars;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);
  const [placed, setPlaced] = useState<{ id: number; char: string }[]>([]);
  const [fb, setFb] = useState<Feedback | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const usedIds = new Set(placed.map((t) => t.id));
  // Bir harf yerleştir; tamamlanınca değerlendir (hem dokunuş hem ipucu buradan geçer).
  function place(t: { id: number; char: string }) {
    const np = [...placed, t];
    setPlaced(np);
    if (np.length === target.length) {
      const ok = foldTight(np.map((x) => x.char).join(""), currentTargetLang()) === compareTarget;
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
    setHintUsed(true);
    if (fb || placed.length >= target.length) return;
    const needed = target[placed.length];
    const tile = pool.find((t) => !usedIds.has(t.id) && t.char === needed)
      ?? pool.find((t) => !usedIds.has(t.id) && t.char.toLowerCase() === needed.toLowerCase());
    if (tile) place(tile);
  }
  const brd = fb ? (fb.correct ? colors.success : colors.danger) : colors.border;
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, { ...miss(fb.correct, "spelling", placed.map((x) => x.char).join("")), hintUsed })} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.order_letters")} big={word.tr} sub={word.en} colors={colors} />
      <MascotMid mood={fb === null ? "idle" : fb.correct ? "thumbsup" : "sad"} hidden={!!fb} />
      <View>
        <View style={{ minHeight: 56, flexDirection: "row", flexWrap: "wrap", gap: 8, borderWidth: 1.5, borderColor: brd, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.lg, backgroundColor: colors.surface }}>
          {placed.length === 0 ? <Text variant="body" color={colors.textFaint}>{tx("rounds.tap_letters")}</Text> : placed.map((t, i) => <Tile key={i} label={t.char} colors={colors} onPress={() => { if (!fb) setPlaced((p) => p.slice(0, i)); }} />)}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {pool.map((t) => <Tile key={t.id} label={t.char} dim={usedIds.has(t.id)} onPress={() => tapPool(t)} colors={colors} />)}
        </View>
        {!fb ? (
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
            <PressableScale onPress={backspace} disabled={placed.length === 0} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 9, opacity: placed.length === 0 ? 0.4 : 1 }}>
              <Text variant="caption" color={colors.textMuted}>{tx("common.delete")}</Text>
            </PressableScale>
            <PressableScale onPress={useHint} disabled={placed.length >= target.length} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 9, opacity: placed.length >= target.length ? 0.4 : 1 }}>
              <Text variant="caption" color={colors.textMuted}>{tx("rounds.hint")}</Text>
            </PressableScale>
          </View>
        ) : null}
      </View>
    </RoundShell>
  );
}

function OrderRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
  const answer = Array.isArray(round.answer) ? round.answer : [];
  const tail = round.tail ?? "";
  const full = [...answer, tail].filter(Boolean).join(" ");
  const pool = React.useMemo(() => (round.tokens ?? []).map((text, id) => ({ id, text })), [round.tokens]);
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
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, classifyOrder(placed.map((x) => x.text), answer, tail), placed.map((x) => x.text).join(" ")))} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.put_sentence_in_order")} big={round.sentenceTr ?? word.tr} sub={round.sentenceEn ?? null} colors={colors} />
      <MascotMid mood={fb === null ? "idle" : fb.correct ? "thumbsup" : "sad"} hidden={!!fb} />
      <View>
        <View style={{ minHeight: 56, flexDirection: "row", flexWrap: "wrap", gap: 8, borderWidth: 1.5, borderColor: brd, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.lg, backgroundColor: colors.surface }}>
          {placed.length === 0 ? <Text variant="body" color={colors.textFaint}>{tx("rounds.tap_words")}</Text> : placed.map((t, i) => <Tile key={i} label={t.text} colors={colors} onPress={() => { if (!fb) setPlaced((p) => p.slice(0, i)); }} />)}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {pool.map((t) => <Tile key={t.id} label={t.text} dim={usedIds.has(t.id)} onPress={() => tap(t)} colors={colors} />)}
        </View>
      </View>
    </RoundShell>
  );
}

function TranslateRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const s = typeof round.sentence === "object" && round.sentence ? round.sentence : { tr: "", de: "", en: null };
  const alts = round.alternatives ?? [];
  const [val, setVal] = useState("");
  const [hintShown, setHintShown] = useState(false);
  const [fb, setFb] = useState<Feedback | null>(null);
  /*
   * HÜKÜM ÜÇ KATMANLI HAKEMDEN (`lib/sentenceMatch`), ikili karşılaştırmadan
   * değil.
   *
   * Eskiden `foldCompare(val) === foldCompare(s.de)` idi: TEK HARF yazım
   * hatası cümleyi tam yanlış sayıyor ve kelimeyi lapse ettiriyordu. Web aynı
   * turda baştan beri hakemi kullanıyor ve kabul kuralı şu (bkz.
   * `components/games/translate-game`): kalite 3'ten büyük veya eşit VE hüküm
   * "sıra" değil. Yani yazım hatası kabul (kalite 4), sıra hatası kabul değil
   * ama kelime lapse etmiyor (kalite 3).
   *
   * Kalitenin sunucuya gönderilmesi ve fark vurgusu arayüzü ayrı işler -
   * mobil cevap yükünde `quality` hiç atanmıyor, `errorType` hiç yok
   * (bkz. web-parity §11.19 adım 2 ve 3).
   */
  const judged = useRef<SentenceMatch | null>(null);
  const [checking, setChecking] = useState(false);
  async function check() {
    if (fb || checking) return;
    const typed = val.trim();
    let m = matchSentence(typed, s.de, alts, currentTargetLang());
    let ok = !!typed && m.quality >= 3 && m.verdict !== "order";
    /* İKİNCİ ŞANS: yerel hakem "yanlış" dediyse ve cevap üç sözcükten
       uzunsa modele sorulur. Kabul ederse tur doğru sayılır ve kalite 4
       olur - web `translate-game` ile aynı eşikler. */
    if (!ok && m.verdict === "wrong" && typed.split(/\s+/).length >= 3) {
      setChecking(true);
      try {
        const d = await api<{ result?: { score?: { overall?: number; task?: number } } }>(
          "/api/assess",
          {
            method: "POST",
            timeoutMs: ASSESS_WAIT_MS,
            body: JSON.stringify({
              kind: "sentence",
              level: round.word?.niveau || "A1",
              task: { prompt: `Çevir: ${s.tr}`, target: s.de },
              answer: { text: typed },
              /* `day` bir YAZMA anahtarı: değerlendirme satırı o güne yazılıyor ve günlük
              kota o günün satırları sayılarak bulunuyor (bkz. api/assess `parseBody`).
              Mobil göndermiyordu, yani sunucunun UTC günü işliyordu: gece yarısından
              sonra yapılan değerlendirme dünkü güne düşüyor ve kota da yanlış güne
              sayılıyordu. Web `assess-client` baştan beri gönderiyor. */
              day: todayStr(),
            }),
          },
        );
        const sc = d?.result?.score;
        if ((sc?.overall ?? 0) >= ASSESS_ACCEPT && (sc?.task ?? 0) >= 3) {
          ok = true;
          m = { ...m, verdict: "exact", quality: 4, errorType: undefined };
        }
      } catch {
        /* model yoksa ya da geç kaldıysa yerel hüküm geçerli */
      } finally {
        setChecking(false);
      }
    }
    judged.current = m;
    Keyboard.dismiss();
    markAnswer(ok, s.de); // doğru Almanca cümleyi oku
    setFb({
      correct: ok,
      answerDe: s.de,
      speakDe: s.de,
      tr: s.tr,
      en: s.en,
      diff: {
        verdictKey: VERDICT_KEYS[m.verdict],
        target: m.target,
        typed: m.typed,
        // Yazdığın satırı yalnız YANLIŞTA ve gerçekten fark varken göster.
        showTyped: !ok && m.typed.some((tk) => tk.mark !== "same"),
      },
    });
  }
  /* Yük web `translate-game` ile aynı: kalite hep, hata tipi yalnız yanlışta,
     ipucu kullanıldıysa kalite 3'e kırpılıyor. */
  const payload = (): DoneExtra => {
    const m = judged.current;
    if (!m) return {};
    return {
      quality: hintShown ? Math.min(m.quality, 3) : m.quality,
      hintUsed: hintShown,
      ...(fb?.correct ? {} : { errorType: m.errorType ?? "meaning", detail: val.trim().slice(0, 60) }),
    };
  };
  const inputBlock = (
    <View>
      <TextInput
        value={val}
        onChangeText={setVal}
        multiline
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder={tx("rounds.write_sentence", { lang: targetLangName() })}
        placeholderTextColor={colors.textFaint}
        style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 16, color: colors.text, fontSize: 18, minHeight: 88, textAlignVertical: "top" }}
      />
      <HintRow answer={s.de} colors={colors} shown={hintShown} onShow={() => setHintShown(true)} />
      <PressableScale onPress={() => void check()} disabled={checking} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center", opacity: checking ? 0.6 : 1 }, softShadow(colors.primary, 8)]}>
        <Text variant="h3" color={colors.onPrimary}>{tx(checking ? "rounds.checking" : "common.check")}</Text>
      </PressableScale>
    </View>
  );
  return (
    <RoundShell footer={inputBlock} sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, payload())} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.translate_into", { lang: targetLangName() })} big={s.tr} sub={s.en} colors={colors} />
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
        {sub ? <Text variant="caption" color={colors.textMuted}>{sub}</Text> : null}
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
      const nm = new Set(matched); nm.add(selLeft); setMatched(nm); setSelLeft(null); haptic("correct");
      if (nm.size === words.length) {
        const batch = words.map((w) => ({ wordId: w.id, correct: !wrongBefore.current.has(w.id) }));
        const okCount = batch.filter((b) => b.correct).length;
        setFb({ correct: batch.every((b) => b.correct), note: tx("rounds.match_first_try", { n: okCount, total: words.length }), tr: null, answerDe: null });
      }
    } else {
      wrongBefore.current.add(selLeft); haptic("wrong");
      const l = selLeft;
      setWrong({ left: l, right: r.wordId });
      setSelLeft(null);
      setTimeout(() => setWrong((w) => (w && w.left === l ? null : w)), 550);
    }
  }
  const batch = words.map((w) => ({ wordId: w.id, correct: !wrongBefore.current.has(w.id) }));

  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, { batch })} colors={colors} /> : undefined}>
      <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.md, marginTop: spacing.md, textAlign: "center" }}>{tx("rounds.match")}</Text>
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

/**
 * KELİME TİPTEN GELİYOR, ÜNLEMDEN DEĞİL.
 *
 * Sekiz tur bileşeni `round.word!` yazıyordu: tip "olmayabilir" diyor, kod
 * "vardır" diye kestiriyordu. Sunucu bir gün kelimesiz bir tur üretse (ya da
 * bir alan adı değişse) sonuç derleme hatası DEĞİL, çalışma anında boş bir
 * ekran ya da çökme olurdu. Web bunu oyun başına ayrı tiplerle söylüyor
 * (`Round` birleşimi: `choice` turunun `word`ü zorunlu). Mobil tek gövdeli
 * tipi koruyor ama kelimeyi dağıtıcıda BİR KEZ sınayıp bileşene ayrı bir
 * özellik olarak veriyor — bileşenin içinde artık ünlem yok.
 */
function pickRound(round: Round, onDone: Done, colors: Palette) {
  const word = round.word;
  if (word) {
    if (round.game === "choice" && optionCards(round).length) return <ChoiceRound round={round} word={word} onDone={onDone} colors={colors} />;
    if (round.game === "artikel" && word.artikel) return <ArtikelRound word={word} onDone={onDone} colors={colors} />;
    if (round.game === "truefalse") return <TrueFalseRound round={round} word={word} onDone={onDone} colors={colors} />;
    if (round.game === "typing") return <TypingRound round={round} word={word} onDone={onDone} colors={colors} />;
    if (round.game === "plural" && optionTexts(round).length) return <PluralRound round={round} word={word} onDone={onDone} colors={colors} />;
    if (round.game === "listen" && optionCards(round).length) return <ListenRound round={round} word={word} onDone={onDone} colors={colors} />;
    if (round.game === "scramble") return <ScrambleRound round={round} word={word} onDone={onDone} colors={colors} />;
    if (round.game === "order" && round.tokens?.length && Array.isArray(round.answer) && round.answer.length) return <OrderRound round={round} word={word} onDone={onDone} colors={colors} />;
  }
  if (round.game === "cloze" && optionTexts(round).length) return <ClozeRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "translate" && typeof round.sentence === "object" && round.sentence) return <TranslateRound round={round} onDone={onDone} colors={colors} />;
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
