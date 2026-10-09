import { claimLine, exampleOf, glossOf, meaningLine, translateSource } from "./gloss";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { seededShuffle } from "../lib/shuffle";
import { grammarLine, typLabel } from "./wordGrammar";
import { firstExample } from "../data/example";
import { t as tx, nativeLangName, targetLangName } from "../lib/i18n";
import { foldCase, foldCompare, foldTight } from "../lib/textFold";
import { matchSentence, type SentenceMatch } from "../lib/sentenceMatch";
import { markKnown, optionCards, optionTexts, todayStr } from "./session";
import { CharMarked, MarkTag, DiffLines, MarkedSentence, type MarkedToken } from "../ui/TokenDiff";
import { classifyOrder, classifyTyping, miss, typoNear } from "../lib/errors";
import { api, ASSESS_TIMEOUT_MS } from "../api/client";
import { accountRequiredError } from "../lib/guest";
import { useAuth } from "../lib/AuthContext";
import type { DoneExtra } from "./session";
import { currentTargetLang } from "../lib/courses";
import { Animated, Easing, Keyboard, PanResponder, Platform, ScrollView, TextInput, useWindowDimensions, View } from "react-native";
import { Text } from "../ui/Text";
import { promptFit, promptSize } from "../ui/fontFit";
import { PressableScale } from "../ui/PressableScale";
import { CheckIcon, CloseIcon, CorrectIcon, WrongIcon, SpeakerIcon } from "../ui/icons";
import { haptic } from "../lib/haptics";
import { MIN_FREE_WORDS, RUBRIC_PASS_PCT } from "../lib/learningRules";
import { sfx, sfxDurationMs } from "../lib/sfx";
import { reduceMotion } from "../lib/reduceMotion";
import { EnterView } from "../ui/EnterView";
import { useKeyboardInset, useKeyboardLift } from "../lib/useKeyboardHeight";
import { useLayout } from "../lib/useLayout";
import { whyFor, whyLabel, type Why } from "./why";
import { fallbackAssessment, type FallbackResult } from "../lib/assessFallback";
import { assessFailKey, fallbackNoteKey } from "../lib/assessFail";
import { AssessmentCard, type AssessmentResult } from "../ui/AssessmentCard";
import { assessmentRef } from "../ui/ReportLink";
import { ReportFlag } from "../ui/ReportFlag";
import { roundReport } from "./roundReport";
import type { ContentReport, ReportSurface } from "../lib/report";
import { useBlindAnswers, useNoHints } from "./noHints";
import { speakTarget, stopSpeaking, ttsAvailable } from "../lib/tts";
import { tileSpeech } from "../lib/ttsText";
import { arrangedRescuable } from "../lib/typedAnswer";
import { rescueSentence } from "../lib/sentenceRescue";
import { useTheme, spacing, radii, softShadow, cardShadow, motion, type Palette } from "../theme";
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

/**
 * Sonuç katmanındaki dil bilgisi satırı — yalnız bir NOT varsa (çoğul, çekim).
 * Tek başına tür ("fiil") soru kartında zaten yazıyor; katmanda tekrar etmesi
 * bilgi değil gürültü.
 */
function grammarDetail(w: RoundWord): string | null {
  const line = grammarLine(w, w.tr);
  return line === typLabel(w.typ, w.tr) ? null : line;
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

/**
 * Örnek cümle bloğu — hedef dil (italik) + ANADİLDEKİ karşılık (`exampleOf`).
 * Türkçe ve İngilizce satır her kullanıcıya birlikte çiziliyordu: anadili
 * İngilizce ya da Almanca olan Türkçe çeviriyi görüyordu. `WordsScreen`
 * `ExampleLines` ile aynı okuma.
 */
function ExampleBlock({ de, tr, en, deNative, colors }: { de: string | null; tr: string | null; en: string | null; deNative: string | null; colors: Palette }) {
  const g = exampleOf({ sentenceTr: firstExample(tr), sentenceEn: firstExample(en), sentenceDe: firstExample(deNative) });
  const d = firstExample(de), t = g?.text ?? null, e = g?.sub ?? null;
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

/**
 * Cevap sonrası geri bildirim verisi — web `games/round-sheet` ile AYNI alanlar.
 *
 * Katman satır satır okunuyor: hüküm → doğru cevap → anlamı (→ dil bilgisi) →
 * yanlışsa "Senin", "Farklar", "Neden" → Devam. Eskiden hüküm, cevap ve anlam
 * tek satırda "·" ile birbirine ekleniyordu; satır sarınca "·" yeni satırın
 * başına düşüyor, çeviri turunda "Doğrusu:" iki kez yazıyor ve farklar yalnız
 * "↔" ile anlatılıyordu.
 */
type Feedback = {
  correct: boolean;
  /** Katmanın tonu; verilmezse doğru/yanlıştan. "near" = kabul edildi ama kusurlu. */
  tone?: "ok" | "bad" | "near" | "neutral";
  /** Hüküm metni; verilmezse "Doğru" / "Yanlış". */
  label?: string;
  /** Doğru cevap (düz). */
  answer?: string | null;
  /** Doğru cevap, kelime kelime işaretli (cümle hakemi) — `answer`in yerine çizilir. */
  answerTokens?: MarkedToken[] | null;
  /** İşaretli cevabın cümle sonu noktalaması. */
  answerTail?: string;
  /** Hoparlörün okuyacağı metin; yoksa `answer`. */
  speak?: string | null;
  /** Anlamı (anadilde). */
  meaning?: string | null;
  /** Dil bilgisi satırı (tür, çoğul, çekim) — cevap verildikten sonra pekiştirme. */
  detail?: string | null;
  /** Öğrencinin cevabı (yalnız yanlışta gösterilir). */
  you?: string | null;
  youTokens?: MarkedToken[] | null;
  /** Kelime kelime fark listesi için hedef ve yazılan (cümle hakemi). */
  diffs?: { target: MarkedToken[]; typed: MarkedToken[] } | null;
  /** Neden — hata tipi etiketi + tek cümle (+ yazımda harf farkı). */
  why?: Why | null;
  /** Hüküm bandının altına eklenen serbest satır (eşleştirme özeti gibi). */
  extra?: React.ReactNode;
};

/**
 * Cevap işaretlendiğinde ortak yan etkiler: haptik + ses efekti + (varsa) doğru
 * Almanca cevabı otomatik seslendir. Web'de doğru cevap doğru da yanlış da sesli
 * okunur; Almanca'nın SORU olduğu turlarda (choice de-tr, truefalse, listen)
 * mount'ta okunduğundan burada tekrar okunmaz (speak=null).
 */
/**
 * Bekleyen okuma — efekt bitince başlayacak olan.
 *
 * Tur değişince İPTAL edilmesi şart: kullanıcı "Devam"a hızlı basarsa okuma
 * bir sonraki turun üstünde başlıyordu ve o turun kendi okuması da gelince
 * iki ses üst üste biniyordu.
 */
let bekleyenOkuma: ReturnType<typeof setTimeout> | null = null;

/** Bekleyen okumayı ve çalan sesi keser — tur kapanırken çağrılıyor. */
function sesiKes(): void {
  if (bekleyenOkuma) { clearTimeout(bekleyenOkuma); bekleyenOkuma = null; }
  stopSpeaking();
}

/**
 * `near`: kabul edildi ama kusurlu (yazım sapması, katman "Neredeyse"
 * tonunda). Tam doğrunun parlak sesi değil, ortak ses sözleşmesindeki
 * yumuşak "near" (web `play("near")`).
 */
function markAnswer(ok: boolean, speak?: string | null, near = false): void {
  /* SES `haptic`IN ICINDEN GIDIYOR. Burada ikisi birden yaziliydi ve ses iki
     kez isteniyordu; tek duyulmasini `sfx`in 120 ms yineleme penceresine
     borcluyduk. `lib/haptics` bu ciftlemenin dort yerde temizlendigini
     yaziyordu - en cok gecilen yol olan burasi atlanmis. Webde ayni artik
     `walk-player`da duruyordu (bkz. web-parity 11.435). */
  const kind = ok ? (near ? "near" : "correct") : "wrong";
  haptic(kind);
  if (!speak) return;
  /*
    OKUMA EFEKTTEN SONRA. İkisi aynı anda başlıyordu: doğru/yanlış sesi ile
    Almanca cevap üst üste biniyor, ikisi de anlaşılmıyordu. Bekleme efektin
    KENDİ süresinden okunuyor (`sfxDurationMs`), sabit bir sayı değil — efekt
    tablosu değişirse bu da değişiyor. Kullanıcıdan bir eylem beklenmiyor,
    okuma kendiliğinden geliyor.
  */
  if (bekleyenOkuma) clearTimeout(bekleyenOkuma);
  // Turların hepsi kelime katmanı: yalnız Defne/Aras dosyası (bkz. lib/tts `speakTarget` `word`).
  bekleyenOkuma = setTimeout(() => { bekleyenOkuma = null; speakTarget(speak, { word: true }); }, sfxDurationMs(kind) + 60);
}

/** Almanca metnin yanında küçük hoparlör. */
function SpeakButton({ text, colors, size = 20 }: { text: string; colors: Palette; size?: number }) {
  if (!text?.trim()) return null;
  return (
    <PressableScale accessibilityLabel={tx("item.listen")} onPress={() => speakTarget(text, { word: true })} hitSlop={8} style={{ padding: spacing.xs }}>
      <SpeakerIcon color={colors.primaryText} size={size} />
    </PressableScale>
  );
}

/**
 * Sonuç katmanının kapladığı yükseklik (px) — hüküm başlığı + cevap satırı +
 * ara + "Devam" + gövdenin iç payı.
 * Yer turun BAŞINDAN bu ölçüde ayrılıyor; ölçü katmanın kendisiyle aynı yerden
 * okunuyor ki ikisi ayrı yazılıp sessizce kaymasın.
 */
const SHEET_H = 44 + spacing.md + 30 + spacing.sm + 50 + spacing.md;
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
 * Katman İÇERİĞİN ÜSTÜNE BİNİYOR ve turun başından yer AYRILMIYOR.
 *
 * Ayrılıyordu: dipte katmanın boyu kadar boş bir band duruyordu ve içerik o
 * bandın üstüne sıkışıyordu. Uzun turlarda (cümle kur, sırala, eşleştir)
 * bunun bedeli doğrudan kesilen içerikti — ekranın üçte biri cevaptan önce
 * hiçbir işe yaramayan bir boşluktu. Katman zaten turun BİTTİĞİNİ söylüyor,
 * yani altında kalanın üstüne binmesinde bir sakınca yok.
 *
 * Cevaptan sonra da pay EKLENMİYOR: içerik `flexGrow` ile dağıldığı için
 * sonradan eklenen bir dip payı esneyen boşlukları kısar ve tam cevap anında
 * her şeyi yukarı kaydırırdı — düzeltilmek istenen kaymanın ta kendisi.
 */
/**
 * Klavye açık mı — soru kartı buna bakıp KOMPAKT çiziliyor.
 *
 * Yazma ve çeviri turlarında klavye açılınca cevap alanı yukarı kalkıyor ve
 * kaydırılan alan ~150pt'ye iniyor; tam boy kart (kalın dolgu + tür satırı)
 * orada kesiliyordu, iPhone SE'de çevrilecek cümlenin ikinci satırı ve 320dp
 * Android'de kelimenin kendisi görünmüyordu (2026-09-22 küçük ekran
 * incelemesi). Yazarken gereken tek şey sorunun kendisi; süs geri çekiliyor.
 */
const KeyboardOpen = React.createContext(false);

/**
 * Turun cevabı dışarı — sınav kendi kaçan/SRS kaydı için dinliyor. Sonuç
 * katmanı belirdiğinde bir kez çağrılıyor; turun akışını hiçbir şekilde etkilemiyor.
 */
export type RoundAnswerInfo = { correct: boolean; answer: string | null; you: string | null };
const AnswerSink = React.createContext<((a: RoundAnswerInfo) => void) | null>(null);
/**
 * Sonuç katmanındaki "Bildir"in paketi (`game/roundReport`): verilmişse
 * katman "Devam"ın soluna bağlantıyı koyuyor. Sınavda verilmiyor (sınav
 * sırasında bildirim yok; kaçanlar sonuç listesinde bildiriliyor).
 */
const ReportFor = React.createContext<{ build: (a: RoundAnswerInfo | null) => ContentReport; onOpen?: () => void; onClose?: () => void } | null>(null);
const tokensText = (k?: MarkedToken[] | null) => (k?.length ? k.map((x) => x.text).join(" ") : null);

function RoundShell({ children, footer, sheet, scroll = true }: { children: React.ReactNode; footer?: React.ReactNode; sheet?: React.ReactNode; scroll?: boolean }) {
  /*
    TUR KAPANIRKEN SES SUSUYOR. "Devam"a basıp bir sonraki tura geçildiğinde
    önceki turun okuması sürüyordu; yeni turun kendi okuması da gelince iki
    ses üst üste biniyordu. Temizlik burada çünkü her tur bu iskeletten
    geçiyor — turdan çıkmak da (geri düğmesi, etap kartı) aynı yoldan.
  */
  useEffect(() => () => sesiKes(), []);
  /*
    KLAVYE PAYI ÖLÇÜLÜYOR, TAHMİN EDİLMİYOR. Eskiden `kb - insets.bottom +
    spacing.xxl` idi ve Android'de gezinme çubuğunu iki kez düşüyordu (bkz.
    `useKeyboardInset`): 3 tuşlu gezinmeli telefonda "Kontrol et"in alt
    kısmı klavyenin altında kalıyordu. Artık kabın alt kenarı ölçülüp
    klavyenin üst kenarıyla karşılaştırılıyor — kabı hangi ekranın, ne kadar
    dolguyla taşıdığı hesaba girmiyor.
  */
  const shellRef = useRef<React.ComponentRef<typeof View>>(null);
  const lift = useKeyboardLift(shellRef, spacing.md);
  const kbOpen = useKeyboardInset() > 0;
  /*
    SORU KARTI GİRİŞİ HER TURDA. Yalnız `ChoiceGame` solarak/kayarak
    giriyordu; öteki turlar bir anda beliriyordu. Tur bileşeni her turda
    yeniden kuruluyor (`RoundView` `key`), yani giriş mount'ta bir kez.
    Yalnız içerik kayıyor: dip (girdi + "Kontrol et") klavye payını ölçüyor,
    kayan bir kap o ölçüyü ilk karede şaşırtırdı. Kaydırmalı kapta `flexGrow`
    (esas boy içerikten): `flex: 1` uzun içeriği sıfır esastan ezebilirdi.
    Web: `session-player` ~949.
  */
  const content = <EnterView enterKey={0} style={scroll ? { flexGrow: 1 } : { flex: 1 }}>{children}</EnterView>;
  return (
    <KeyboardOpen.Provider value={kbOpen}>
    <View ref={shellRef} collapsable={false} style={{ flex: 1 }}>
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{content}</View>
      )}
      {/* Sonuç katmanı açıkken dip görünmez ama yerini koruyor: katmanın yuvarlak
          köşelerinin arkasından turuncu "Kontrol et" kenarları taşıyordu. */}
      {footer ? <View pointerEvents={sheet ? "none" : "auto"} style={{ marginBottom: lift, paddingTop: kbOpen ? spacing.sm : spacing.md, opacity: sheet ? 0 : 1 }}>{footer}</View> : null}
      {sheet ? <SheetLayer>{sheet}</SheetLayer> : null}
    </View>
    </KeyboardOpen.Provider>
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
    /* Geri bildirim paneli: `motion.short` + yavaşlayarak oturan eğri (web `T.short`). */
    else Animated.timing(slide, { toValue: 0, duration: motion.short, easing: Easing.bezier(...motion.emphasized), useNativeDriver: true }).start();
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
 * SONUÇ KATMANI — yüzen kart: dolu renkli hüküm başlığı + nötr gövde + Devam.
 *
 * Maskot kalkınca (2026-09-22) eski düzende iç içe iki kutu (beyaz kart +
 * açık tonlu bant) ve 18 pt'lik bir nokta kalmıştı; hüküm küçük, kart boş
 * görünüyordu. Samet'in seçimi (2026-09-28, taslak F): hükmü kartın üstünde
 * sonucun DOLU renginde bir şerit söylüyor, gövde beyaz ve sola hizalı.
 * Dolgu `*Text` tonu, yazı `onFill` (açıkta beyaz, koyuda mürekkep): açık
 * temada beyazın dört dolguda da kontrastı 4,5'in üstünde.
 * Uzun bir yanlışta gövde ekranın yarısını aşmasın diye kendi içinde kayıyor;
 * başlık ve Devam hep görünür. Web `games/round-sheet` aynı düzeni çiziyor.
 */
function FeedbackFooter({ data, onContinue, colors }: { data: Feedback; onContinue: () => void; colors: Palette }) {
  const { isDark } = useTheme();
  const tone = data.tone ?? (data.correct ? "ok" : "bad");
  const headBg = tone === "ok" ? colors.successText : tone === "bad" ? colors.dangerText : tone === "near" ? colors.streakText : colors.surface2;
  const headInk = tone === "neutral" ? colors.text : colors.onFill;
  const label = data.label ?? tx(data.correct ? "sheet.correct" : "sheet.wrong");
  const speakText = data.speak ?? data.answer ?? undefined;
  const wrong = !data.correct;
  /* "Neredeyse" de ne yazıldığını ve nedenini gösteriyor (web `round-sheet` aynı, 2026-10-07). */
  const flawed = wrong || tone === "near";
  const showYou = flawed && (data.youTokens?.length || data.you);
  const showDiffs = !!data.diffs && (data.diffs.target.some((k) => k.mark !== "same") || data.diffs.typed.some((k) => k.mark === "extra"));
  const showWhy = flawed && !!data.why;
  /* Devam: doğruda koyu yeşil (açık temada beyaz yazı #2f9a61 üzerinde 3,4:1
     idi), yanlışta marka rengi. Koyu temada `*Text` dolgu tonuna eşit ve açık;
     yazı orada `onFill`. */
  const okFill = isDark ? colors.success : colors.successText;
  const btnBg = tone === "bad" ? colors.primary : okFill;
  const btnInk = tone === "bad" ? colors.onPrimary : isDark ? colors.onFill : colors.onPrimary;
  const { height } = useWindowDimensions();
  const sink = React.useContext(AnswerSink);
  const reportFor = React.useContext(ReportFor);
  const info = (): RoundAnswerInfo => ({ correct: data.correct, answer: data.answer ?? tokensText(data.answerTokens), you: data.you ?? tokensText(data.youTokens) });
  useEffect(() => {
    sink?.(info());
    // Katman her tur bir kez beliriyor; cevap o anki hâliyle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* SINAVDA KATMAN YOK (`BlindAnswers`): sınavın iki turu (yazma, çeviri)
     hükmü hiç kurmuyor; başka bir tur sınava girerse de cevap burada
     gösterilmeden tur kapanıyor. */
  const blind = useBlindAnswers();
  useEffect(() => {
    if (blind) onContinue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (blind) return null;
  const hasAnswer = !!(data.answerTokens?.length || (data.why?.diff && wrong) || data.answer);
  return (
    /* SONUÇ DUYURULUYOR: renk ve ikon yalnız görene bir şey söylüyor
       (web `round-sheet` `role="status" aria-live="polite"`).
       Gölge dış görünümde, kırpma iç görünümde: iOS'ta `overflow: hidden`
       aynı görünümün gölgesini de kesiyor. Kart nötr yüzey, gölgesi nötr
       (`cardShadow`); renk başlıkta. */
    <View accessibilityLiveRegion="polite" style={[{ borderRadius: radii.xl, backgroundColor: colors.surface }, cardShadow(colors, 16)]}>
      <View style={{ borderRadius: radii.xl, overflow: "hidden", borderWidth: 1, borderColor: colors.hairline }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: headBg, paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.md, minHeight: 44 }}>
          <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: tone === "neutral" ? colors.surface : `${headInk}3D`, alignItems: "center", justifyContent: "center" }}>
            {tone === "bad" ? <CloseIcon color={headInk} size={14} /> : <CheckIcon color={headInk} size={14} />}
          </View>
          <Text variant="h3" color={headInk} style={{ flex: 1 }} numberOfLines={2}>{label}</Text>
        </View>
        <View style={{ padding: spacing.md, gap: spacing.sm }}>
          <ScrollView style={{ maxHeight: height * 0.42 }} contentContainerStyle={{ gap: spacing.sm }} showsVerticalScrollIndicator={false} bounces={false}>
            {hasAnswer || data.meaning || data.detail || data.extra || speakText ? (
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm }}>
                <View style={{ flex: 1, gap: 2 }}>
                  {data.answerTokens?.length ? (
                    <Text variant="h3"><MarkedSentence tokens={data.answerTokens} tail={data.answerTail ?? ""} /></Text>
                  ) : data.why?.diff && wrong ? (
                    <Text variant="h3"><CharMarked segs={data.why.diff.target} side="target" /></Text>
                  ) : data.answer ? (
                    <Text variant="h3" color={colors.text}>{data.answer}</Text>
                  ) : null}
                  {data.meaning ? <Text variant="body" color={colors.textMuted}>{data.meaning}</Text> : null}
                  {data.detail ? <Text variant="caption" color={colors.textMuted}>{data.detail}</Text> : null}
                  {data.extra}
                </View>
                {speakText ? <SpeakButton text={speakText} colors={colors} size={20} /> : null}
              </View>
            ) : null}
            {showYou || showDiffs || showWhy ? (
              <View style={{ gap: 6 }}>
                {showYou ? (
                  <SheetRow label={tx("sheet.you")} colors={colors}>
                    {data.youTokens?.length ? (
                      <Text variant="body"><MarkedSentence tokens={data.youTokens} strong={false} /></Text>
                    ) : data.why?.diff ? (
                      <Text variant="body"><CharMarked segs={data.why.diff.typed} side="typed" /></Text>
                    ) : (
                      <Text variant="body" color={colors.textMuted}>{data.you}</Text>
                    )}
                  </SheetRow>
                ) : null}
                {showDiffs && data.diffs ? (
                  <SheetRow label={tx("sheet.diffs")} colors={colors}>
                    <DiffLines target={data.diffs.target} typed={data.diffs.typed} />
                  </SheetRow>
                ) : null}
                {showWhy && data.why ? (
                  <SheetRow label={tx("sheet.why")} colors={colors}>
                    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 6 }}>
                      <MarkTag label={whyLabel(data.why.type)} fg={colors.text} bg={colors.surface2} />
                      <Text variant="caption" color={colors.text} style={{ flex: 1 }}>{data.why.text}</Text>
                    </View>
                  </SheetRow>
                ) : null}
              </View>
            ) : null}
          </ScrollView>
          {/* "Bildir" Devam'ın SOLUNDA, aynı satırda (Duolingo/Babbel düzeni):
              cevap görüldükten sonra, soru ekranını kalabalıklaştırmadan. Bağlantı
              daralmıyor; dar ekranda Devam daralıyor. */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            {reportFor ? <ReportFlag report={() => reportFor.build(info())} onOpen={reportFor.onOpen} onClose={reportFor.onClose} style={{ paddingHorizontal: spacing.xs }} /> : null}
            <PressableScale onPress={onContinue} style={[{ flex: 1, borderRadius: radii.lg, backgroundColor: btnBg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(btnBg, 8)]}>
              <Text variant="h3" color={btnInk}>{tx("common.continue")}</Text>
            </PressableScale>
          </View>
        </View>
      </View>
    </View>
  );
}

/** Katmanın etiketli satırı: solda küçük büyük harf etiket, sağda içerik. */
function SheetRow({ label, colors, children }: { label: string; colors: Palette; children: React.ReactNode }) {
  const { narrow } = useLayout();
  return (
    /* Etiket sütunu SABİT GENİŞLİK DEĞİL, en az 58: "FARKLAR" 58pt'ye sığmayıp
       "FARKLA / R" diye bölünüyordu (iPhone SE), Almancası "UNTERSCHIEDE" daha
       uzun. Etiket kendi boyunu alıyor ve hiç bölünmüyor; dar ekranda üstte. */
    <View style={{ flexDirection: narrow ? "column" : "row", gap: narrow ? 2 : spacing.sm, alignItems: "flex-start" }}>
      <Text variant="micro" color={colors.textMuted} numberOfLines={1} style={{ minWidth: 58, flexShrink: 0, textTransform: "uppercase", letterSpacing: 1, paddingTop: narrow ? 0 : 3 }}>{label}</Text>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

/** Almanca SORU olan turlarda bir kez otomatik okuma (web: mount + ~320ms). */
function useAutoSpeak(text: string | null | undefined, key: string | number) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(() => speakTarget(text, { word: true }), 320);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}


/** Soru kartı — ortak üst blok. */
/**
 * Sorunun kartı.
 *
 * PUNTO SORUNUN UZUNLUĞUNA GÖRE. Her soru 32 puntoyla çiziliyordu; tek
 * kelimede doğru ama "İlk evliliğinden iki çocuğu var" gibi bir cümlede kart
 * üç satıra çıkıp ekranı yutuyordu. Web de bunu sabit tutmuyor
 * (`game-shell`: `text-h3 sm:text-h2`). Eşikler karakter sayısında çünkü
 * ölçülen şey satır sayısı değil metnin kendisi: kısa (tek kelime) büyük,
 * orta uzunluk bir kademe küçük, cümle boyu iki kademe.
 *
 * `meta`: karta AİT ikincil bilgi (kelime türü gibi). Kartın DIŞINDA duran
 * bir satır, karta ait olduğunu söylemiyordu.
 */

function Prompt({ label, big, sub, meta, speakText, colors }: { label: string; big: string; sub?: string | null; meta?: string | null; speakText?: string | null; colors: Palette }) {
  const kompakt = React.useContext(KeyboardOpen);
  const size = promptSize(big);
  return (
    <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: kompakt ? spacing.md : spacing.xxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: kompakt ? spacing.sm : spacing.md }, cardShadow(colors, 10)]}>
      {kompakt ? null : <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{label}</Text>}
      <Text variant={size.variant} {...promptFit(big)} style={[{ marginTop: kompakt ? 0 : spacing.sm, textAlign: "center" }, size.fontSize ? { fontSize: size.fontSize } : null]}>{big}</Text>
      {speakText && !kompakt ? <View style={{ marginTop: spacing.sm }}><SpeakButton text={speakText} colors={colors} size={22} /></View> : null}
      {sub ? <Text variant={kompakt ? "caption" : "body"} color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: "center" }}>{sub}</Text> : null}
      {meta && !kompakt ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{meta}</Text> : null}
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
/**
 * YANLIŞ CEVABIN SARSINTISI — TEK EĞRİ.
 *
 * İki ayrı dizi vardı: şık düğmesinde beş adım 7 piksel, tur sonucunda altı
 * adım 8 piksel. Aynı hata iki farklı güçle anlatılıyordu. Web'in kendi
 * eğrisi de üçüncü bir şeydi (320 ms, 6 piksel, iki salınım); `globals.css`
 * `@keyframes shake` artık BURADAKİ adımları taşıyor (45 ms × 6 = 270 ms).
 */
const SHAKE_STEPS = [-8, 8, -6, 6, -3, 0];
const SHAKE_STEP_MS = 45;

/** Sarsıntı dizisi — "hareketi azalt" açıkken çağıran hiç başlatmıyor. */
function shakeSeq(v: Animated.Value): Animated.CompositeAnimation {
  return Animated.sequence(
    SHAKE_STEPS.map((to) => Animated.timing(v, { toValue: to, duration: SHAKE_STEP_MS, useNativeDriver: true })),
  );
}

const ASSESS_WAIT_MS = 6000;
const ASSESS_ACCEPT = 75;

function OptionButton({ text, sub, state, onPress, colors, idleTint, answered = false, chosen = false }: { text: string; sub?: string | null; state: "idle" | "correct" | "wrong"; onPress: () => void; colors: Palette; idleTint?: string; answered?: boolean; chosen?: boolean }) {
  const bg = state === "correct" ? colors.successSoft : state === "wrong" ? colors.dangerSoft : colors.surface;
  const border = state === "correct" ? colors.success : state === "wrong" ? colors.danger : idleTint ?? colors.border;
  const fg = state === "correct" ? colors.success : state === "wrong" ? colors.danger : idleTint ?? colors.text;
  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (state === "wrong") {
      /* "Hareketi azalt": sarsıntı yok. Yanlış cevabın geri bildirimi renk,
         ikon, ses ve titreşimle zaten veriliyor - hareket dördüncü kanal. */
      if (!reduceMotion()) shakeSeq(shake).start();
    } else if (state === "correct" && !reduceMotion()) {
      /* Doğru cevabın "pop"u da hareket; renk ve ikon zaten söylüyor. */
      Animated.sequence([
        Animated.spring(pop, { toValue: 1.05, useNativeDriver: true, speed: 50, bounciness: 0 }),
        Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  /* Ekran okuyucuya verilen iki durum RENGI degil, TURUN GERCEK halini
     anlatmali ve ikisi de yanlis seyi olcuyordu:

     - `selected: state !== "idle"` cevap verildikten sonra DOGRU sikki
       "secili" diye okutuyordu, kullanici baskasini secmis olsa bile. Yani
       yanlis cevaplayan biri ekrana donup "secili" duydugu sikki kendi
       cevabi saniyordu. `chosen` gercekten dokunulan siktir.
     - `disabled: state !== "idle"` yalnizca dogru sikki ve secilen yanlisi
       kapali sayiyordu; DOKUNULMAYAN diger sikler "acik" diye okunuyordu,
       oysa `choose` cevaptan sonra hepsini yutuyor. `answered` turun kapali
       olup olmadigini soyler.

     Webde ayni bilgi dogal `disabled` (hepsinde) ve `OptionMark`in
     erisilebilir adiyla (dogru/yanlis) veriliyor. */
  return (
    <Animated.View style={{ transform: [{ translateX: shake }, { scale: pop }] }}>
      {/* ROLÜ RADYO: sik listesi tek secimlik ve "dugme, secili" kac sik
          oldugunu soylemiyordu (bkz. parity 257). */}
      <PressableScale onPress={onPress} accessibilityRole="radio" accessibilityLabel={sub ? `${text}, ${sub}` : text} accessibilityState={{ disabled: answered, selected: chosen }} accessibilityHint={state === "correct" ? tx("rounds.a11y_correct") : state === "wrong" ? tx("rounds.a11y_wrong") : undefined}
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: bg, borderColor: border, borderWidth: 1, borderRadius: radii.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg }}>
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong" color={fg}>{text}</Text>
          {sub ? <Text variant="caption" color={colors.textMuted}>{sub}</Text> : null}
        </View>
        {state === "correct" && <CorrectIcon color={colors.successText} size={22} />}
        {state === "wrong" && <WrongIcon color={colors.dangerText} size={22} />}
      </PressableScale>
    </Animated.View>
  );
}

function ChoiceRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
  const deSide = round.direction === "de-tr";
  // Anlam tarafı ANADİLDE: sunucu şıkları anadilde kuruyor, doğru şık da
  // aynı çözücüden (`glossOf`) — `word.tr` ile İngilizce anadilde hiç eşleşmiyordu.
  const question = deSide ? withArtikel(word) : glossOf(word).text;
  const answer = deSide ? glossOf(word).text : withArtikel(word);
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
    setFb({ correct: ok, answer: withArtikel(word), meaning: glossOf(word).text, detail: grammarDetail(word), you: o.text, why: ok ? null : whyFor({ type: "meaning", word, detail: o.text, detailOf: o.of }) });
  }
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, "meaning", picked))} colors={colors} /> : undefined}>
      <Prompt label={deSide ? tx("rounds.ask_native", { nativeLang: nativeLangName() }) : tx("rounds.ask_target", { target: targetLangName() })} big={question} speakText={deSide ? question : null} sub={!deSide ? glossOf(word).sub : null} colors={colors} />
      <View style={{ gap: spacing.md }}>
        {optionCards(round).map((o) => {
          const st = picked ? (o.text === answer ? "correct" : o.text === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o.text} text={o.text} sub={o.sub} state={st} onPress={() => choose(o)} colors={colors} answered={!!picked} chosen={o.text === picked} />;
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
    setFb({ correct: ok, answer: withArtikel(word), meaning: glossOf(word).text, you: `${a} ${word.de}`, why: ok ? null : whyFor({ type: "article", word, detail: a }) });
  }
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, "article", picked))} colors={colors} /> : undefined}>
      {/* HOPARLÖR YOK (2026-10-06, Samet): "der Tisch" okuyan hoparlör cevabı söylüyordu ve ipucu
          sayılmıyordu; 2026-08-31'de her tura toplu hoparlör eklenirken girmişti. Web gibi: kelime
          cevaptan SONRA doğru artikeliyle okunuyor (`markAnswer`). */}
      <Prompt label={tx("rounds.which_article")} big={word.de} sub={meaningLine(word)} colors={colors} />
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {["der", "die", "das"].map((a) => {
          const st = picked ? (a === word.artikel ? "correct" : a === picked ? "wrong" : "idle") : "idle";
          return <View key={a} style={{ flex: 1 }}><OptionButton text={a} state={st} idleTint={artikelTone(a, colors)} onPress={() => choose(a)} colors={colors} answered={!!picked} chosen={a === picked} /></View>;
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
    setFb({ correct: ok, answer: withArtikel(word), meaning: glossOf(word).text, why: ok ? null : whyFor({ type: "meaning", word, detail: round.isTrue ? null : (round.claim?.text ?? null), detailOf: round.isTrue ? null : (round.claim?.of ?? null) }) });
  }
  /* Kayıttaki ayrıntı: karıştırma yalnız YANLIŞ eşleşmeyi kabul edince var
     (QA F-0059); doğru eşleşmeyi reddedenin karıştırdığı bir karşılık yok.
     Web `truefalse-game` aynı. */
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, "meaning", round.isTrue ? null : (round.claim?.text ?? null)))} colors={colors} /> : undefined}>
      {/*
        SORULAN ŞEY İDDİANIN KENDİSİ, o yüzden iddia da soru kadar büyük.

        Almanca kelime `big`, iddia ise `sub` satırındaydı: 32 punto kelimenin
        altında 15 puntoluk soluk bir satır. Oysa tur "bu karşılık doğru mu"
        diye soruyor — okunması gereken şey o satır. Web aynı kartı baştan
        beri böyle çiziyor (`truefalse-game`): kelime, ayraçlı "anlamı"
        etiketi, sonra iddia.
      */}
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, cardShadow(colors, 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{tx("rounds.correct")}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.sm }}>
          <Text variant={promptSize(withArtikel(word)).variant} {...promptFit(withArtikel(word))} style={[{ textAlign: "center" }, promptSize(withArtikel(word)).fontSize ? { fontSize: promptSize(withArtikel(word)).fontSize } : null]}>{withArtikel(word)}</Text>
          <SpeakButton text={withArtikel(word)} colors={colors} size={22} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginVertical: spacing.md }}>
          <View style={{ height: 1, width: 40, backgroundColor: colors.border }} />
          <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{tx("rounds.means")}</Text>
          <View style={{ height: 1, width: 40, backgroundColor: colors.border }} />
        </View>
        {/* İddia sunucudan ANADİLDE geliyor (`Option`): olduğu gibi çizilir, `glossOf`tan yeniden geçirilmez (bkz. `claimLine`). */}
        <Text variant="h2" style={{ textAlign: "center" }}>{claimLine(round, word)}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        {[{ v: true, l: tx("common.correct") }, { v: false, l: tx("common.wrong") }].map(({ v, l }) => {
          const st = ans !== null ? (v === round.isTrue ? "correct" : v === ans ? "wrong" : "idle") : "idle";
          return <View key={l} style={{ flex: 1 }}><OptionButton text={l} state={st} onPress={() => choose(v)} colors={colors} answered={ans !== null} chosen={v === ans} /></View>;
        })}
      </View>
    </RoundShell>
  );
}

/**
 * Çeviri turunun ipucu: KULLANILACAK KELİMELER.
 *
 * Burada da harf iskeleti vardı ("I__ g___ n___ H____") ve o, cümle çevirisi
 * için öğretici bir yardım değil: öğrenciye Almancayı değil bulmacayı
 * çözdürüyor, harf sayısını sayıp boşluk dolduruyor.
 *
 * Kelimeler ALFABETİK veriliyor, cümledeki sırayla değil. Yani malzeme
 * ortada ama iş duruyor: hangi kelimenin nereye gideceği, fiilin ikinci
 * konumu, çekim ve büyük harf hâlâ öğrencinin. Öğretilen şey zaten bu.
 */
function WordBankHint({ answer, colors, shown, onShow }: { answer: string; colors: Palette; shown: boolean; onShow: () => void }) {
  if (useNoHints() && !shown) return null;
  const kelimeler = Array.from(new Set(answer.split(/\s+/).map((w) => w.replace(/[.,!?;:]+$/g, "")).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b, "de"));
  return (
    <View style={{ marginTop: spacing.md }}>
      {shown ? (
        <View style={{ gap: spacing.sm }}>
          <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{tx("rounds.hint_words")}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {kelimeler.map((w) => (
              <View key={w} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 6 }}>
                <Text variant="bodyStrong" color={colors.text}>{w}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <PressableScale onPress={onShow} style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: spacing.sm }}>
          <Text variant="caption" color={colors.textMuted}>{tx("rounds.show_hint")}</Text>
        </PressableScale>
      )}
    </View>
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
  // Sınav kâğıdının kuralı "ipucu yok" (bkz. `game/noHints`).
  if (useNoHints() && !shown) return null;
  return (
    <View style={{ marginTop: spacing.md }}>
      {shown ? (
        <Text variant="bodyStrong" color={colors.textMuted} style={{ fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace", letterSpacing: 2, textAlign: "center" }}>{skeleton(answer)}</Text>
      ) : (
        <PressableScale onPress={() => setShown()} style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: spacing.sm }}>
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
  const [typo, setTypo] = useState(false);
  /* Anadilde aynı anlamlı başka kelime (`round.sameGloss`): ceza yok, ayrım söylenir (web aynı). */
  const [same, setSame] = useState(false);
  /* Sınavda hüküm gösterilmiyor (`BlindAnswers`, QA F-0017). */
  const blind = useBlindAnswers();
  const sent = useRef(false);
  function check() {
    if (fb || sent.current) return;
    // Boşluksuz yedek: tireli başlıklarda ("t-shirt") tire boşluğa döndüğü için
    // kullanıcının bitişik yazdığı "tshirt" aksi halde reddedilirdi.
    const lang = currentTargetLang();
    /*
      EŞANLAMLILAR DA DOĞRU. Sunucu yazma turuna aynı Türkçe anlama sahip
      öteki kelimeleri `alternatives` olarak gönderiyor ("kalkmak" → abfahren
      / aufstehen) ve web onları kabul ediyordu; burada hiç okunmuyordu, yani
      aynı cevap webde doğru, Android'de yanlıştı. 2026-09-12'de ölçüldü:
      Almanca havuzun %22'si (1.899 kelime) bir eşanlamlı taşıyor.
    */
    const cands = [word.de, withArtikel(word), ...(round.alternatives ?? [])];
    const t = norm(val);
    const tight = foldTight(val, lang);
    const exact = (!!t && cands.some((c) => t === norm(c)))
      || (!!tight && cands.some((c) => foldTight(c, lang) === tight));
    /* Tek harflik yazım hatası doğru sayılır, "Neredeyse · yazım" ve doğrusu (`lib/errors`
       `typoNear`; web `typing-game` aynı). Kalite 4: tam doğrudan bir basamak aşağı. */
    const sameHit = !exact
      ? (round.sameGloss ?? []).find((s) => (!!t && t === norm(s.de)) || (!!tight && foldTight(s.de, lang) === tight)) ?? null
      : null;
    const near = !exact && !sameHit && typoNear(val, [word.de, ...(round.alternatives ?? [])]) !== null;
    const ok = exact || near || !!sameHit;
    Keyboard.dismiss();
    if (blind) {
      /* Cevap alındı, hüküm yok: ses, titreşim ve katman olmadan sıradaki madde.
         Yük "Devam"ın verdiğiyle aynı. */
      sent.current = true;
      haptic("tap");
      onDone(ok, { ...miss(ok, classifyTyping(val, [word.de, withArtikel(word), ...(round.alternatives ?? [])]), val), hintUsed: hintShown, ...(near ? { quality: hintShown ? 3 : 4 } : sameHit ? { quality: 3 } : {}) });
      return;
    }
    markAnswer(ok, withArtikel(word), near || !!sameHit); // doğru kelimeyi oku (Almanca = cevap); sapma "near"
    /* Hata tipi yazılandan çıkarılıyor - web `typing-game` de aynı: yazım
       hatası ile anlam hatası farklı gerekçe alıyor. */
    const why = sameHit
      ? whyFor({ type: "meaning", word, detail: val.trim(), sameGloss: { sub: sameHit.sub, wordSub: glossOf(word).sub ?? null }, targetLang: currentTargetLang() })
      : ok ? null : whyFor({ type: classifyTyping(val, [word.de, withArtikel(word), ...(round.alternatives ?? [])]), word, detail: val, targetLang: currentTargetLang() });
    setFb({ correct: ok, ...(near ? { tone: "near" as const, label: tx("sheet.near_spelling") } : sameHit ? { tone: "near" as const, label: tx("sheet.near_same_gloss", { gloss: glossOf(word).text }) } : {}), answer: withArtikel(word), meaning: glossOf(word).text, detail: grammarDetail(word), you: val.trim(), why });
    setTypo(near);
    setSame(!!sameHit);
  }
  const inputBlock = (
    <View>
      <TextInput
        value={val}
        onChangeText={setVal}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={tx("rounds.type")}
        accessibilityLabel={tx("rounds.type")}
        placeholderTextColor={colors.textFaint}
        onSubmitEditing={check}
        returnKeyType="done"
        submitBehavior="submit"
        style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, color: colors.text, fontSize: 18 }}
      />
      <HintRow answer={word.de} colors={colors} shown={hintShown} onShow={() => setHintShown(true)} />
      <PressableScale onPress={check} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}>
        <Text variant="h3" color={colors.onPrimary}>{tx(blind ? "exam.answer_and_next" : "common.check")}</Text>
      </PressableScale>
      {blind ? <BlindNote colors={colors} /> : null}
    </View>
  );
  return (
    <RoundShell footer={inputBlock} sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, { ...miss(fb.correct, classifyTyping(val, [word.de, withArtikel(word), ...(round.alternatives ?? [])]), val), hintUsed: hintShown, ...(typo ? { quality: hintShown ? 3 : 4 } : same ? { quality: 3 } : {}) })} colors={colors} /> : undefined}>
      {/*
        TÜR KARTIN İÇİNDE. Kartın dışında, altında duran bir satırdı ve
        neye ait olduğu belirsizdi.

        YALNIZ TÜR, ÇEKİM DEĞİL — web `typing-game` de yalnız türü yazıyor.
        Burada `grammarLine` vardı ve o satır çoğulu/çekimi de taşıyor:
        "isim · çoğul: die Häuser". Yani Almanca karşılığını YAZMASI istenen
        kelime, sorunun hemen altında yazılı duruyordu. Tür ("isim", "fiil")
        cevabı vermiyor, hangi biçimin beklendiğini söylüyor.
      */}
      <Prompt label={tx("rounds.write_equivalent", { lang: targetLangName() })} big={glossOf(word).text} sub={glossOf(word).sub} meta={typLabel(word.typ, word.tr)} colors={colors} />
    </RoundShell>
  );
}

/**
 * "Cümle Kur" — verilen 2-3 kelimeyle özgün cümle. Web `free-sentence-game`
 * karşılığı; mobilde HİÇ YOKTU ve sunucudan gelen tur `skipGames` ile
 * susturuluyordu (bkz. `game/session` SKIP_GAMES, §11.13).
 *
 * Kelime turunun tek gerçek serbest üretimi: hedef yok, şık yok, yalnız
 * kelimeler. Hakem `/api/assess` rubriği; sağlayıcı yoksa kural tabanlı yedek
 * (`lib/assessFallback`) ve kartın üstünde "AI kapalı" satırı.
 *
 * SRS EŞLEMESİ WEB İLE BİREBİR: overall >= 90 → 5, >= RUBRIC_PASS_PCT (60) → 4 (doğru),
 * 40-59 → 3 (yanlış ama lapse yok), < 40 → 2. Yedekte kalite 3'ü aşmaz,
 * çünkü yedek dilbilgisini ölçemiyor. İki uygulamanın aynı cevaba farklı
 * kalite vermesi, aynı kelimenin telefonda ve tarayıcıda farklı zamanda
 * tekrara düşmesi demek olurdu.
 */
/* Harfler KOD NOKTASINDAN kuruluyor: düz dizgi olarak yazılınca çeviri
   tarayıcısı onları "çevrilmemiş Türkçe metin" sanıyor (ö ve ü iki dilde de
   var) — oysa bunlar Almanca klavye yardımı, arayüz metni değil. */
const SPECIAL_CHARS = ["\u00e4", "\u00f6", "\u00fc", "\u00df"] as const;

function FreeSentenceRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
  const guest = Boolean(useAuth().user?.guest);
  const partners = round.partners ?? [];
  const targets = [word, ...partners];
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AssessmentResult | FallbackResult | null>(null);
  /** Sunucudaki değerlendirme kaydının kimliği — "Bildir" ref'i (bkz. `assessmentRef`). */
  const [assessId, setAssessId] = useState<number | null>(null);
  const [failNote, setFailNote] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<{ correct: boolean; quality: number } | null>(null);
  const started = useRef(Date.now());
  const [details, setDetails] = useState(false);

  useEffect(() => {
    setValue("");
    setResult(null);
    setAssessId(null);
    setFailNote(null);
    setOutcome(null);
    setDetails(false);
    started.current = Date.now();
  }, [round.id]);

  async function evaluate() {
    if (busy || result) return;
    const typed = value.trim();
    if (!typed) return;
    setBusy(true);
    Keyboard.dismiss();
    const req = {
      kind: "sentence" as const,
      level: round.level ?? word.niveau,
      task: {
        prompt: tx("assess.ai_build_sentence", { words: targets.map((x) => withArtikel(x)).join(", ") }),
        targets: targets.map((x) => x.de),
      },
      /* ÜRETİMİN DİLİ — zorunlu. İstemci vermezse sunucu "de"ye
      düşüyor (`api/assess` `parseBody`), yani İngilizce kursta
      yazılan metin ALMANCA rubriğiyle puanlanıyordu ("Perfekt
      arayan" beklentiler). Web dört çağıranın hepsinde gönderiyor
      ve tipi de zorunlu yaptı (`AssessRequest.lang`). */
      lang: currentTargetLang(),
      answer: { text: typed },
    };
    try {
      if (guest) throw accountRequiredError();
      const d = await api<{ result: AssessmentResult; id?: number | null }>("/api/assess", {
        method: "POST",
        replay: true, // aynı metnin tekrarı önbellekten döner (lib/assess hash), yeni kayıt açmaz
        timeoutMs: ASSESS_TIMEOUT_MS,
        body: JSON.stringify({ ...req, day: todayStr() }),
      });
      setAssessId(d.id ?? null);
      const overall = d.result?.score?.overall ?? 0;
      const quality = overall >= 90 ? 5 : overall >= RUBRIC_PASS_PCT ? 4 : overall >= 40 ? 3 : 2;
      setResult(d.result);
      setOutcome({ correct: overall >= RUBRIC_PASS_PCT, quality });
      markAnswer(overall >= RUBRIC_PASS_PCT);
    } catch (e) {
      /* Sebebi SÖYLENİYOR (premium kapısı, kota, kapalı servis, zaman aşımı) ve
         yanına yedeğin yedek olduğu yazılıyor — web `AssessmentCard` `failure`
         satırıyla aynı iş. */
      const fb = fallbackAssessment(req);
      const targetsOk = fb.checks.filter((c) => c.kind === "target").every((c) => c.ok);
      const correct = targetsOk && fb.words >= 3;
      setResult(fb);
      setFailNote(`${tx(assessFailKey(e))} ${tx(fallbackNoteKey(e, "estimate", "assess.fail_offline"))}`);
      setOutcome({ correct, quality: correct ? 3 : 2 });
      markAnswer(correct);
    }
    setBusy(false);
  }

  function finish() {
    if (!outcome || !result) return;
    const typed = value.trim();
    const firstError = result.errors?.length ? result.errors[0] : null;
    onDone(outcome.correct, {
      quality: outcome.quality,
      ...miss(outcome.correct, firstError?.type ?? "meaning", firstError?.wrong || typed),
    });
  }

  function insert(chunk: string) {
    if (result) return;
    setValue((v) => v + chunk);
  }

  const kelime = value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const canCheck = !busy && !result && kelime >= MIN_FREE_WORDS;
  const footer = result && outcome ? null : (
    <View>
      <TextInput
        value={value}
        onChangeText={setValue}
        editable={!result}
        multiline
        /* Enter = Değerlendir (çeviri turuyla aynı gerekçe: tek cümle). */
        submitBehavior="submit"
        returnKeyType="done"
        onSubmitEditing={() => { if (canCheck) void evaluate(); }}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder={tx("rounds.write_a_sentence_ph")}
        accessibilityLabel={tx("rounds.write_a_sentence_ph")}
        placeholderTextColor={colors.textFaint}
        style={{ minHeight: 92, textAlignVertical: "top", backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, color: colors.text, fontSize: 18 }}
      />
      {/* Almanca özel harfler: telefon klavyesinde uzun basmak gerekiyor ve
          bir tur ortasında kimse onu aramıyor. Web de aynı dört harfi
          düğme olarak veriyor. */}
      <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.sm, marginTop: spacing.sm }}>
        {SPECIAL_CHARS.map((ch) => (
          <PressableScale key={ch} onPress={() => insert(ch)} style={{ minWidth: 44, minHeight: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
            <Text variant="bodyStrong">{ch}</Text>
          </PressableScale>
        ))}
      </View>
      {/* SEBEP YAZIYOR: tek kelime yazan kullanici olu bir dugmeye bakiyordu
          ve hicbir sey soylenmiyordu. Web de ayni kusuru tasiyordu
          (`free-sentence-game`, `writing-player`). */}
      {kelime < MIN_FREE_WORDS ? (
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>{tx("assess.gate_min_words", { n: MIN_FREE_WORDS })}</Text>
      ) : null}
      <PressableScale disabled={!canCheck} onPress={() => void evaluate()} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: canCheck ? colors.primary : colors.surface2, paddingVertical: spacing.lg, alignItems: "center" }, canCheck ? softShadow(colors.primary, 8) : {}]}>
        <Text variant="h3" color={canCheck ? colors.onPrimary : colors.textFaint}>{tx(busy ? "mockexam.evaluating" : "mockexam.evaluate")}</Text>
      </PressableScale>
    </View>
  );

  return (
    <RoundShell
      footer={footer}
      /* DEĞERLENDİRME DE SONUÇ KATMANINDA — öteki turlarla aynı yer, aynı düzen.
         Sonuç sayfanın içinde uzun bir kart olarak açılıyor ve "Devam" onun
         altına düşüyordu. Katman kısa hükmü (puan, düzeltilmiş cümle) veriyor,
         dört ölçütlü kart "Ayrıntıları gör" ile katmanın içinde açılıyor. */
      sheet={result && outcome ? (
        <FeedbackFooter
          colors={colors}
          onContinue={finish}
          data={{
            correct: outcome.correct,
            label: tx("sheet.sentence_score", { label: tx(outcome.correct ? "rounds.nice_sentence" : "rounds.look_again"), n: result.score.overall }),
            answer: result.corrected && result.corrected.trim() ? result.corrected.trim() : value.trim(),
            detail: "offline" in result && result.offline ? tx("rounds.basic_check") : null,
            you: result.corrected && result.corrected.trim() !== value.trim() ? value.trim() : null,
            extra: (
              <View style={{ marginTop: spacing.xs }}>
                <PressableScale onPress={() => setDetails((d) => !d)} hitSlop={6} style={{ alignSelf: "flex-start", paddingVertical: 2 }}>
                  <Text variant="caption" color={colors.primaryText} style={{ fontWeight: "800" }}>{tx(details ? "sheet.hide_details" : "sheet.details")}</Text>
                </PressableScale>
                {details ? (
                  <View style={{ marginTop: spacing.sm }}>
                    <AssessmentCard answer={value.trim()} result={result} failNote={failNote} example={firstExample(word.beispiel)} reportRef={"offline" in result && result.offline ? null : assessmentRef(assessId, `word:${word.id}`)} />
                  </View>
                ) : null}
              </View>
            ),
          }}
        />
      ) : undefined}
    >
      <Prompt label={tx("games.free_sentence")} big={tx("rounds.build_sentence")} colors={colors} />
      {/* Hedef kelimeler: dokununca metne ekleniyor — web de öyle. */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginBottom: spacing.md }}>
        {targets.map((x) => (
          <PressableScale key={x.id} onPress={() => insert((value && !value.endsWith(" ") ? " " : "") + x.de + " ")} style={{ borderRadius: radii.pill, backgroundColor: colors.surface2, paddingHorizontal: 14, paddingVertical: 9 }}>
            <Text variant="bodyStrong">{withArtikel(x)}</Text>
            <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center" }}>{glossOf(x).text}</Text>
          </PressableScale>
        ))}
      </View>
    </RoundShell>
  );
}

/**
 * Cümledeki BOŞLUK — sırala turlarındaki YUVANIN aynısı.
 *
 * Boşluk önce ham "_____" idi (TTS onu "alt tire" diye okuyordu), sonra
 * `Text` içinde zeminli bir aralık oldu: kutu görünmüyordu ve kelimeler
 * birbirine yapışıyordu, çünkü iç içe `Text`te kenarlık Android'de
 * çizilmiyor ve boşluklar komşu sözcüğe dayanıyor.
 *
 * Bu yüzden cümle artık SÖZCÜK SÖZCÜK diziliyor ve boşluk gerçek bir kutu:
 * `OrderRound`/`ScrambleRound` cevap yuvasıyla aynı dil — kesik kenarlık,
 * `surface2` zemin, aynı köşe yarıçapı. Öğrenci aynı işareti üç oyunda da
 * "buraya bir şey gelecek" diye okuyor.
 */
function BlankSlot({ picked, correct, colors }: { picked: string | null; correct: boolean; colors: Palette }) {
  const tone = picked === null ? colors.border : correct ? colors.success : colors.danger;
  return (
    <View
      style={{
        minWidth: 72,
        minHeight: 34,
        paddingHorizontal: spacing.md,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: radii.md,
        borderWidth: 1.5,
        borderStyle: picked === null ? "dashed" : "solid",
        borderColor: tone,
        backgroundColor: picked === null ? colors.surface2 : correct ? colors.successSoft : colors.dangerSoft,
      }}
    >
      {picked === null ? null : (
        <Text variant="bodyStrong" color={correct ? colors.successText : colors.dangerText}>{picked}</Text>
      )}
    </View>
  );
}

/** Cümleyi sözcüklere böler; boşluk kendi kutusu olarak araya giriyor. */
function ClozeSentence({ before, after, picked, correct, colors }: { before: string; after: string; picked: string | null; correct: boolean; colors: Palette }) {
  const sozcukler = (x: string) => x.split(/\s+/).filter(Boolean);
  /* Boşluğun hemen ardındaki noktalama KUTUYA YAPIŞIK: sözcükler arası
     aralıkla ayrı çizilince "Ich trinke [____] ." gibi noktadan önce boşluk
     görünüyordu. */
  const arka = sozcukler(after);
  const yapisik = arka.length && /^[.,!?;:…]+$/.test(arka[0]) ? arka.shift() : null;
  return (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
      {sozcukler(before).map((w, i) => <Text key={`b${i}`} variant="h2">{w}</Text>)}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <BlankSlot picked={picked} correct={correct} colors={colors} />
        {yapisik ? <Text variant="h2">{yapisik}</Text> : null}
      </View>
      {arka.map((w, i) => <Text key={`a${i}`} variant="h2">{w}</Text>)}
    </View>
  );
}

function ClozeRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const opts = optionTexts(round);
  const answer = typeof round.answer === "string" ? round.answer : "";
  const sentence = typeof round.sentence === "string" ? round.sentence : "";
  const full = fillBlank(sentence, answer);
  /* Cümle boşluktan ikiye bölünüyor; boşluk yoksa (eski içerik) cümle olduğu
     gibi çiziliyor. Ayraç `fillBlank` ile AYNI: iki yer ayrı yazılsaydı biri
     beş alt tire, öteki iki alt tire arardı. */
  const blankParts: [string, string] | null = /_{2,}/.test(sentence)
    ? [sentence.slice(0, sentence.search(/_{2,}/)), sentence.replace(/^[\s\S]*?_{2,}/, "")]
    : null;
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
    setFb({ correct: ok, answer: full, meaning: exampleOf(round)?.text ?? null, you: fillBlank(sentence, o), why: ok ? null : whyFor({ type: typeMode ? classifyTyping(o, [answer]) : "meaning", word: round.word ? { ...round.word, de: answer } : null, detail: o, targetLang: currentTargetLang() }) });
  }
  const submitTyped = () => { if (val.trim()) choose(val.trim()); };
  const typeFooter = typeMode ? (
    <View>
      <TextInput
        value={val}
        onChangeText={setVal}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!picked}
        placeholder={tx("rounds.type")}
        accessibilityLabel={tx("rounds.type")}
        placeholderTextColor={colors.textFaint}
        onSubmitEditing={submitTyped}
        returnKeyType="done"
        submitBehavior="submit"
        style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, color: colors.text, fontSize: 18 }}
      />
      <PressableScale onPress={submitTyped} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}>
        <Text variant="h3" color={colors.onPrimary}>{tx("common.check")}</Text>
      </PressableScale>
    </View>
  ) : undefined;
  return (
    <RoundShell footer={typeFooter} sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, typeMode ? classifyTyping(picked ?? "", [answer]) : "meaning", picked))} colors={colors} /> : undefined}>
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.xl, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, cardShadow(colors, 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1, marginBottom: spacing.md }}>{tx(typeMode ? "rounds.cloze_typed" : "rounds.fill_blank")}</Text>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm }}>
          {blankParts ? (
            <ClozeSentence before={blankParts[0]} after={blankParts[1]} picked={picked} correct={picked === answer} colors={colors} />
          ) : (
            <Text variant="h2" style={{ flex: 1 }}>{sentence}</Text>
          )}
          {/* Boşluklu cümlenin hoparlörü KALDIRILDI (2026-09-23): boşluğu atlayıp bozuk bir cümle okuyordu
              ("Sind der neue Lehrer?") ve webde hiç yoktu. Tam cümle cevaptan sonra okunuyor. */}
        </View>
        {exampleOf(round) ? <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{exampleOf(round)!.text}</Text> : null}
      </View>
      {/* Yazarak modda şıklar ÇİZİLMİYOR: web de öyle yapıyor, şıkları
          göstermek zorlaştırmanın kendisini geri alırdı. Şıklar yine
          sunucudan geliyor çünkü basamak inişi onlara dönüyor. Yazma kutusu
          kaydırılan içerikte değil turun DİBİNDE (`footer`): içerikteyken
          klavye açılınca altında kalıyordu. */}
      {typeMode ? null : (
        <View style={{ gap: spacing.md }}>
          {opts.map((o) => {
            const st = picked ? (o === answer ? "correct" : o === picked ? "wrong" : "idle") : "idle";
            return <OptionButton key={o} text={o} state={st} onPress={() => choose(o)} colors={colors} answered={!!picked} chosen={o === picked} />;
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
    setFb({ correct: ok, answer: `die ${answer}`, meaning: glossOf(word).text, you: `die ${o}`, why: ok ? null : whyFor({ type: "plural", word, detail: o, correct: answer }) });
  }
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, miss(fb.correct, "plural", picked))} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.plural")} big={withArtikel(word)} speakText={withArtikel(word)} sub={meaningLine(word)} colors={colors} />
      <View style={{ gap: spacing.md }}>
        {opts.map((o) => {
          const st = picked ? (o === answer ? "correct" : o === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o} text={`die ${o}`} state={st} onPress={() => choose(o)} colors={colors} answered={!!picked} chosen={o === picked} />;
        })}
      </View>
    </RoundShell>
  );
}

/**
 * Yeni kelime kartı (intro) ve öz değerlendirme ("Hatırla": oynatılamayan
 * turun yedeği).
 *
 * Yeni kelimede sınanan bir şey yok: web `intro-game` gibi anlam baştan
 * açık, "Anladım" doğru + ipucu (SRS 3) kaydediliyor. Eskiden yeni kelime
 * de "Göster → Zorlandım / Bildim" soruyordu ve "Zorlandım" YANLIŞ sayılıyordu
 * (kombo, puan, doğruluk): ilk kez gördüğü kelime için kullanıcı cezalanıyordu.
 *
 * "Hatırla"da "Hatırlamadım" NÖTR (`selfMiss`): yanlış değil, yalnız kelime
 * yakında yeniden gelsin diye "yeniden" kaydediliyor (web `lib/srs`
 * `gradeAnswer`). "Hatırladım" doğru + ipucu: öz beyan, hızlı doğru cevap
 * kadar güçlü kanıt değil.
 */
function SelfAssess({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const word = round.word ?? round.words?.[0];
  const intro = round.game === "intro";
  const [revealed, setReveal] = useState(false);
  const reveal = intro || revealed;
  const [skipping, setSkipping] = useState(false);
  const reportFor = React.useContext(ReportFor);
  const spoke = useRef(false);
  useEffect(() => {
    if (intro && word && !spoke.current) { spoke.current = true; speakTarget(withArtikel(word), { word: true }); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);
  // Kelime yoksa turu güvenle atla (render sırasında değil, efektte); web
  // `game-switch` `SkipRound` gibi cevap da sayım da yok.
  useEffect(() => {
    if (!word) onDone(true, { skip: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);
  if (!word) return <View style={{ flex: 1 }} />;
  const primary = (label: string, onPress: () => void) => (
    <PressableScale onPress={onPress} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}>
      <Text variant="h3" color={colors.onPrimary} style={{ textAlign: "center" }}>{label}</Text>
    </PressableScale>
  );
  const footer = intro ? (
    <View style={{ gap: spacing.md }}>
      {primary(tx("rounds.understood", { word: withArtikel(word) }), () => onDone(true, { hintUsed: true }))}
      {/*
        "BUNU ZATEN BİLİYORUM" — yalnız YENİ kelime turunda.
        Kelime pekişmiş sayılıyor ve bu tur için CEVAP KAYDEDİLMİYOR (web
        `onDone([])` ile aynı): sayılmıyor, kombo da değişmiyor.
      */}
      <PressableScale
        disabled={skipping}
        onPress={async () => {
          setSkipping(true);
          await markKnown(word.id);
          onDone(true, { skip: true });
        }}
        style={{ alignSelf: "center", paddingHorizontal: 18, paddingVertical: 10 }}
      >
        <Text variant="caption" color={colors.textMuted}>{tx(skipping ? "rounds.saving" : "rounds.already_known")}</Text>
      </PressableScale>
    </View>
  ) : !reveal ? (
    primary(tx("rounds.show_answer"), () => setReveal(true))
  ) : (
    <View style={{ flexDirection: "row", gap: spacing.md }}>
      <View style={{ flex: 1 }}><OptionButton text={tx("rounds.recall_no")} state="idle" onPress={() => onDone(false, { selfMiss: true })} colors={colors} /></View>
      <View style={{ flex: 1 }}><OptionButton text={tx("rounds.recall_yes")} state="idle" onPress={() => onDone(true, { hintUsed: true })} colors={colors} /></View>
    </View>
  );
  /* "BİLDİR" YENİ KELİME KARTINDA DA (2026-10-06, Samet): kartın sonuç katmanı yok, yani
     öteki turların "Devam" yanındaki bağlantısı burada hiç çıkmıyordu. Kart öğretiyor, cevap
     yok: bildirim cevapsız gidiyor (`roundReport` null kabul ediyor). Sınavda `ReportFor` yok. */
  const report = reportFor && reveal ? (
    <View style={{ alignItems: "center", marginTop: spacing.xs }}>
      <ReportFlag report={() => reportFor.build(null)} onOpen={reportFor.onOpen} onClose={reportFor.onClose} />
    </View>
  ) : null;
  return (
    <RoundShell footer={<>{footer}{report}</>}>
      <Prompt label={tx(intro ? "rounds.new_word" : "rounds.recall")} big={withArtikel(word)} speakText={withArtikel(word)} sub={typeof round.sentence === "string" ? round.sentence : null} colors={colors} />
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
          <ExampleBlock de={word.beispiel} tr={word.beispielTr} en={word.beispielEn ?? null} deNative={word.beispielDe ?? null} colors={colors} />
        </View>
      ) : null}
    </RoundShell>
  );
}

/** Küçük harf/kelime karosu — scramble ve order. */
/**
 * Karo. YERLEŞTİRİLMİŞ karo ekran okuyucuya ne yaptığını da söylüyor:
 * havuzdaki karo "S", yerleştirilmiş karo "S harfini geri al". İkisi de
 * yalnız "S" derken dokunmanın ne yapacağı ayırt edilemiyordu - web ikisini
 * baştan beri ayırıyor (`scramble-game` / `order-game` aria etiketleri).
 */
/**
 * Harf/kelime döşemesi.
 *
 * HARCANMIŞ DÖŞEME BELLİ OLUYOR. Kullanılan döşemenin tek işareti zeminin
 * `surface`ten `surface2`ye geçmesiydi — iki ton arasında bir tık fark var ve
 * yazı tam güçte kalıyordu; öğrenci hangi harfi kullandığını ancak sayarak
 * anlıyordu. Web aynı döşemeyi %25 opaklığa indiriyor (`scramble-game`);
 * mobil de aynı değere geldi, üstüne kesik kenarlıkla "burası boşaldı"
 * deniyor. Döşeme YERİNDEN KALKMIYOR: kalksaydı kalan harfler her dokunuşta
 * yer değiştirir, parmağın altındaki hedef kaçardı.
 *
 * `drag`: döşeme cevap alanına SÜRÜKLENEBİLİR. Dokunma da duruyor — parmağını
 * kaldırmadan taşımak isteyen taşıyor, dokunmak isteyen dokunuyor.
 */
function Tile({ label, undoKey, onPress, dim, colors, drag }: {
  label: string;
  undoKey?: "rounds.undo_letter" | "rounds.undo_word";
  onPress?: () => void;
  dim?: boolean;
  colors: Palette;
  /** Sürükleme desteği: bırakıldığı nokta çağırana bildiriliyor. */
  drag?: { onStart?: () => void; onDrop: (pageX: number, pageY: number) => void };
}) {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [tasiniyor, setTasiniyor] = useState(false);
  const responder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_e, g) => !dim && !!drag && (Math.abs(g.dx) > 6 || Math.abs(g.dy) > 6),
        onPanResponderGrant: () => {
          setTasiniyor(true);
          /* Hedef kutunun ölçümü BURADA: `measureInWindow` eşzamansız ve
             kutunun ekrandaki yeri kaydırmayla değişiyor, bırakma anında
             ölçmek bir kare geç kalırdı. */
          drag?.onStart?.();
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
        onPanResponderRelease: (e) => {
          setTasiniyor(false);
          pan.setValue({ x: 0, y: 0 });
          /* Bırakma noktası EKRAN koordinatı: hedef kutunun yerini çağıran
             biliyor, döşeme bilmiyor. */
          drag?.onDrop(e.nativeEvent.pageX, e.nativeEvent.pageY);
        },
        onPanResponderTerminate: () => { setTasiniyor(false); pan.setValue({ x: 0, y: 0 }); },
      }),
    [dim, drag, pan],
  );
  return (
    <Animated.View
      {...(drag && !dim ? responder.panHandlers : {})}
      style={{ transform: pan.getTranslateTransform(), zIndex: tasiniyor ? 20 : 0, opacity: dim ? 0.25 : 1 }}
    >
      <PressableScale
        onPress={onPress}
        disabled={dim}
        accessibilityLabel={undoKey ? tx(undoKey, undoKey === "rounds.undo_letter" ? { char: label } : { word: label }) : label}
        accessibilityState={{ disabled: !!dim }}
        style={{
          paddingHorizontal: 14,
          paddingVertical: spacing.md,
          borderRadius: radii.md,
          backgroundColor: dim ? colors.surface2 : colors.surface,
          borderWidth: 1,
          borderStyle: dim ? "dashed" : "solid",
          borderColor: dim ? colors.hairline : colors.border,
        }}
      >
        <Text variant="bodyStrong" color={dim ? colors.textFaint : colors.text}>{label}</Text>
      </PressableScale>
    </Animated.View>
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
  useEffect(() => { if (audible) speakTarget(withArtikel(word), { word: true }); }, [audible, round.id]);
  const hideWord = audible === true && !picked;
  function choose(o: Option) {
    if (picked) return;
    const ok = o.text === glossOf(word).text;
    setPicked(o.text);
    markAnswer(ok, null); // dinleme turu: Almanca zaten çalındı
    setFb({ correct: ok, answer: withArtikel(word), meaning: glossOf(word).text, you: o.text, why: ok ? null : whyFor({ type: "listening", word, detail: o.text, detailOf: o.of }) });
  }
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, { ...miss(fb.correct, "listening", picked), hintUsed: replays >= 2 })} colors={colors} /> : undefined}>
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, cardShadow(colors, 10)]}>
        <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{tx("rounds.listen_pick_meaning")}</Text>
        {hideWord ? (
          <PressableScale accessibilityLabel={tx("item.listen")} onPress={() => { setReplays((n) => n + 1); speakTarget(withArtikel(word), { word: true }); }} style={[{ width: 84, height: 84, borderRadius: 42, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginTop: spacing.lg }, softShadow(colors.primary, 12)]}>
            <SpeakerIcon color={colors.onPrimary} size={38} />
          </PressableScale>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.sm }}>
            <Text variant={promptSize(withArtikel(word)).variant} {...promptFit(withArtikel(word))} style={[{ textAlign: "center" }, promptSize(withArtikel(word)).fontSize ? { fontSize: promptSize(withArtikel(word)).fontSize } : null]}>{withArtikel(word)}</Text>
            <SpeakButton text={withArtikel(word)} colors={colors} size={24} />
          </View>
        )}
      </View>
      <View style={{ gap: spacing.md }}>
        {optionCards(round).map((o) => {
          const st = picked ? (o.text === glossOf(word).text ? "correct" : o.text === picked ? "wrong" : "idle") : "idle";
          return <OptionButton key={o.text} text={o.text} sub={o.sub} state={st} onPress={() => choose(o)} colors={colors} answered={!!picked} chosen={o.text === picked} />;
        })}
      </View>
    </RoundShell>
  );
}

/**
 * Cevap kutusu: hem "buraya bırakıldı mı" hem "kaçıncı yuvaya bırakıldı".
 *
 * Kutu kaydırma alanının içinde ve konumu kaydırmayla değişiyor, o yüzden
 * ölçüm bırakma anında tazeleniyor; bir kez ölçüp saklamak yanlış cevap
 * verirdi.
 *
 * Yerleşmiş döşemelerin yerleri `onLayout` ile toplanıyor: sürüklenen döşeme
 * bırakıldığında merkezi en yakın yuva bulunup ondan önceye mi sonraya mı
 * gireceğine bakılıyor. Kutunun DIŞINA bırakmak "geri al" demek.
 */
function useDropZone() {
  const ref = useRef<React.ComponentRef<typeof View>>(null);
  const kutu = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const yuvalar = useRef<Map<number, { x: number; y: number; w: number; h: number }>>(new Map());
  const olc = () => {
    ref.current?.measureInWindow((x: number, y: number, w: number, h: number) => { kutu.current = { x, y, w, h }; });
  };
  const yuvaOlc = (i: number, l: { x: number; y: number; width: number; height: number }) => {
    yuvalar.current.set(i, { x: l.x, y: l.y, w: l.width, h: l.height });
  };
  const icinde = (pageX: number, pageY: number) => {
    const k = kutu.current;
    if (!k) return false;
    return pageX >= k.x - 24 && pageX <= k.x + k.w + 24 && pageY >= k.y - 24 && pageY <= k.y + k.h + 24;
  };
  /** Bırakma noktasına en yakın EKLEME indeksi (0..n). */
  const hedefIndex = (pageX: number, pageY: number, adet: number) => {
    const k = kutu.current;
    if (!k) return adet;
    const rx = pageX - k.x;
    const ry = pageY - k.y;
    let enIyi = adet;
    let enYakin = Number.POSITIVE_INFINITY;
    for (let i = 0; i < adet; i++) {
      const y = yuvalar.current.get(i);
      if (!y) continue;
      const cx = y.x + y.w / 2;
      const cy = y.y + y.h / 2;
      /* Dikey fark AĞIRLIKLI: satırlar sarmalıyor, yani yanlış satırdaki
         yakın bir yuva doğru satırdaki uzak yuvadan önce gelmemeli. */
      const d = Math.abs(rx - cx) + Math.abs(ry - cy) * 3;
      if (d < enYakin) { enYakin = d; enIyi = rx > cx ? i + 1 : i; }
    }
    return enIyi;
  };
  return { ref, olc, yuvaOlc, icinde, hedefIndex };
}

/** Bir döşemeyi listede `from`dan `to` ekleme noktasına taşır. */
function tasi<T>(list: T[], from: number, to: number): T[] {
  const arr = [...list];
  const [item] = arr.splice(from, 1);
  arr.splice(to > from ? to - 1 : to, 0, item);
  return arr;
}

/**
 * ÇOK KELİMELİ CEVAPTA KELİME SINIRI (Samet, 2026-10-07: "sich leisten"de harfler
 * boşluksuz diziliyordu). Boşluksuz harf dizisinde yeni kelimenin başladığı
 * indeksler; yuvalar arasına boşluk ve "Senin" satırına kelime aralığı buradan.
 * Web `games/scramble-game` aynı.
 */
function wordStarts(word: string): Set<number> {
  const out = new Set<number>();
  let n = 0;
  for (const part of word.trim().split(/\s+/)) {
    if (n > 0) out.add(n);
    n += Array.from(part).length;
  }
  return out;
}
const spaced = (chars: string[], starts: Set<number>) => chars.map((c, i) => (starts.has(i) ? ` ${c}` : c)).join("");

function ScrambleRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
  const target = React.useMemo(() => Array.from(word.de).filter((c) => c !== " "), [word.de]);
  const starts = React.useMemo(() => wordStarts(word.de), [word.de]);
  // Harf döşemeleri boşluksuz diziliyor; karşılaştırma da boşluksuz biçimde.
  const compareTarget = React.useMemo(() => foldTight(word.de, currentTargetLang()), [word.de]);
  /* DİZİLİŞ TOHUMDAN, `Math.random()`TAN DEĞİL.
     Web aynı bulmacayı turun kimliğiyle tohumluyor (`games/scramble-game`
     `makePool(word.de, round.id)`) ve dosyanın kendi yorumu "bileşen yeniden
     çizilse bile diziliş sabit kalıyor" diyor. Burada rastgele karıştırma
     vardı: aynı tur iki platformda farklı bulmaca oluyordu ve ekran yeniden
     kurulduğunda (geri dönüş, yeniden çizim) harfler yerinden oynuyordu —
     mobilin KENDİ `lib/shuffle` dosyası da tam bu sebebi yazıyor. */
  const pool = React.useMemo(
    () => seededShuffle(Array.from(word.de).filter((c) => c !== " ").map((char, id) => ({ id, char })), round.id),
    [word.de, round.id],
  );
  const [placed, setPlaced] = useState<{ id: number; char: string }[]>([]);
  const [fb, setFb] = useState<Feedback | null>(null);
  const noHints = useNoHints();
  const [hintUsed, setHintUsed] = useState(false);
  const usedIds = new Set(placed.map((t) => t.id));
  // Bir harf yerleştir; tamamlanınca değerlendir (hem dokunuş hem ipucu buradan geçer).
  function place(t: { id: number; char: string }, at = placed.length) {
    const np = [...placed];
    np.splice(Math.max(0, Math.min(at, np.length)), 0, t);
    setPlaced(np);
    if (np.length === target.length) {
      const ok = foldTight(np.map((x) => x.char).join(""), currentTargetLang()) === compareTarget;
      markAnswer(ok, withArtikel(word)); // tamamlanınca doğru kelimeyi oku
      setFb({ correct: ok, answer: word.de, speak: withArtikel(word), meaning: glossOf(word).text, you: spaced(np.map((x) => x.char), starts), why: ok ? null : whyFor({ type: "spelling", word, detail: np.map((x) => x.char).join(""), targetLang: currentTargetLang() }) });
    } else {
      sfx("tap");
    }
  }
  function tapPool(t: { id: number; char: string }) { if (fb || usedIds.has(t.id)) return; place(t); }
  /** Sürüklenip bırakılan havuz döşemesi — bırakıldığı yuvaya giriyor. */
  function dropPool(t: { id: number; char: string }, at: number) { if (fb || usedIds.has(t.id)) return; place(t, at); }
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
  const drop = useDropZone();
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, { ...miss(fb.correct, "spelling", placed.map((x) => x.char).join("")), hintUsed })} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.order_letters")} big={glossOf(word).text} sub={glossOf(word).sub} colors={colors} />
      <View>
        {/* YUVALAR SABİT, web gibi: yerleştirilen harfin ardından boş yuvalar; çok kelimeli
            cevapta kelimeler arasında boşluk (`wordStarts`). Sürükleme indeksi yalnız dolu yuvalardan. */}
        <View ref={drop.ref} onLayout={drop.olc} collapsable={false} accessibilityLabel={tx("rounds.tap_letters")} style={{ minHeight: 56, flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, borderWidth: 1, borderColor: brd, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.lg, backgroundColor: colors.surface }}>
          {target.map((_slot, i) => {
            const t = placed[i];
            const gap = starts.has(i) ? <View style={{ width: spacing.md }} /> : null;
            if (!t) {
              return (
                <React.Fragment key={`e${i}`}>
                  {gap}
                  <View style={{ paddingHorizontal: 14, paddingVertical: spacing.md, borderRadius: radii.md, borderWidth: 1, borderStyle: "dashed", borderColor: colors.hairline }}>
                    <Text variant="bodyStrong" style={{ opacity: 0 }}>M</Text>
                  </View>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment key={i}>
                {gap}
                <View onLayout={(e) => drop.yuvaOlc(i, e.nativeEvent.layout)}>
                  <Tile label={t.char} undoKey="rounds.undo_letter" colors={colors} onPress={() => { if (!fb) setPlaced((p) => p.slice(0, i)); }} drag={{ onStart: drop.olc, onDrop: (x, y) => { if (fb) return; if (drop.icinde(x, y)) setPlaced((p) => tasi(p, i, drop.hedefIndex(x, y, p.length))); else setPlaced((p) => p.filter((_, j) => j !== i)); } }} />
                </View>
              </React.Fragment>
            );
          })}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {pool.map((t) => <Tile key={t.id} label={t.char} dim={usedIds.has(t.id)} onPress={() => tapPool(t)} colors={colors} drag={{ onStart: drop.olc, onDrop: (x, y) => { if (drop.icinde(x, y)) dropPool(t, drop.hedefIndex(x, y, placed.length)); } }} />)}
        </View>
        {!fb ? (
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
            <PressableScale onPress={backspace} disabled={placed.length === 0} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 9 }}>
              <Text variant="caption" color={colors.textMuted}>{tx("common.delete")}</Text>
            </PressableScale>
            {noHints ? null : (
              <PressableScale onPress={useHint} disabled={placed.length >= target.length} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 9 }}>
                <Text variant="caption" color={colors.textMuted}>{tx("rounds.hint")}</Text>
              </PressableScale>
            )}
          </View>
        ) : null}
      </View>
    </RoundShell>
  );
}

function OrderRound({ round, word, onDone, colors }: { round: Round; word: RoundWord; onDone: Done; colors: Palette }) {
  const answer = Array.isArray(round.answer) ? round.answer : [];
  const tail = round.tail ?? "";
  /* Kuyruk NOKTALAMA ("." "?" — sunucu `[.!?…]+$` ile ayırıyor), sözcük
     değil: araya boşluk girince doğru cevap "Ich gehe ins Kino ." diye
     yazılıyordu. */
  const full = `${answer.join(" ")}${tail}`;
  const pool = React.useMemo(() => (round.tokens ?? []).map((text, id) => ({ id, text })), [round.tokens]);
  const [placed, setPlaced] = useState<{ id: number; text: string }[]>([]);
  const [fb, setFb] = useState<Feedback | null>(null);
  /* İPUCU YOKTU. Web dizme turunda "ipucu" düğmesi veriyor ve bedelini
     kaydediyor (`hintUsed` → SRS kalitesi kırpılıyor); Androidde düğme hiç
     yoktu, yani tıkanan öğrencinin tek çıkışı turu yanlış bitirmekti.
     Sınavda görünmüyor (bkz. `game/noHints`). */
  const [hintUsed, setHintUsed] = useState(false);
  const noHints = useNoHints();
  const guest = Boolean(useAuth().user?.guest);
  const [checking, setChecking] = useState(false);
  /* Geç gelen yapay zekâ cevabı tur değiştiyse düşmesin. */
  const roundNow = useRef(round);
  roundNow.current = round;
  const usedIds = new Set(placed.map((t) => t.id));
  function settleOrder(np: { id: number; text: string }[], ok: boolean, rescued: boolean) {
    const you = `${np.map((x) => x.text).join(" ")}${tail}`;
    markAnswer(ok, rescued ? you : full); // tamamlanınca tam cümleyi oku
    setFb({
      correct: ok, answer: rescued ? you : full, speak: rescued ? you : full, meaning: exampleOf(round)?.text ?? glossOf(word).text, you,
      why: ok ? null : whyFor({ type: classifyOrder(np.map((x) => x.text), answer, tail, currentTargetLang()), word, answer, tail, targetLang: currentTargetLang() }),
      extra: rescued ? <Text variant="caption" color={colors.textMuted}>{tx("rounds.rescue_taught")} <Text variant="caption" color={colors.text} style={{ fontWeight: "700" }}>{full}</Text></Text> : null,
    });
  }
  function tap(t: { id: number; text: string }, at = placed.length) {
    if (fb || checking || usedIds.has(t.id) || placed.length >= answer.length) return;
    const np = [...placed];
    np.splice(Math.max(0, Math.min(at, np.length)), 0, t);
    setPlaced(np);
    if (np.length === answer.length) {
      const arranged = np.map((x) => x.text).join(" ");
      const ok = arranged === answer.join(" ");
      /* GEÇERLİ BAŞKA DİZİLİŞ (QA 2026-10-09, panel #46): web `order-game` ile aynı kural —
         aynı kelimeler başka sırada geldiyse yapay zekâ kontrolü (V2 hatası sunucuda elenir). */
      const source = exampleOf(round)?.text;
      if (!ok && source && arrangedRescuable(arranged, answer.join(" "), round.tokens ?? [])) {
        const at0 = round;
        setChecking(true);
        void rescueSentence({ source, target: full, typed: `${arranged}${tail}`, lang: currentTargetLang(), guest }).then((yes) => {
          setChecking(false);
          if (roundNow.current !== at0) return;
          settleOrder(np, yes, yes);
        });
        return;
      }
      settleOrder(np, ok, false);
    } else {
      sfx("tap");
      speakTarget(tileSpeech(t.text), { word: true }); // web: her yerleştirilen kelimeyi oku (kutunun kendi kaydı, bkz. ttsText `tileSpeech`)
    }
  }
  /** Sürüklenip bırakılan havuz döşemesi — bırakıldığı yuvaya giriyor. */
  function dropPool(t: { id: number; text: string }, at: number) { tap(t, at); }
  /** İpucu sıradaki doğru kelimeyi yerleştirir — cümleyi çözmez, tıkanmayı açar. */
  function useHint() {
    if (fb || placed.length >= answer.length) return;
    const needed = answer[placed.length];
    const token = pool.find((t) => !usedIds.has(t.id) && t.text === needed);
    if (!token) return;
    setPlaced((prev) => [...prev, token]);
    setHintUsed(true);
  }
  const brd = fb ? (fb.correct ? colors.success : colors.danger) : colors.border;
  const drop = useDropZone();
  return (
    <RoundShell sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, { ...miss(fb.correct, classifyOrder(placed.map((x) => x.text), answer, tail, currentTargetLang()), placed.map((x) => x.text).join(" ")), hintUsed })} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.put_sentence_in_order")} big={exampleOf(round)?.text ?? glossOf(word).text} sub={exampleOf(round)?.sub ?? null} colors={colors} />
      <View>
        <View ref={drop.ref} onLayout={drop.olc} collapsable={false} style={{ minHeight: 56, flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, borderWidth: 1, borderColor: brd, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.lg, backgroundColor: colors.surface }}>
          {placed.length === 0 ? <Text variant="body" color={colors.textFaint}>{tx("rounds.tap_words")}</Text> : placed.map((t, i) => (
            <View key={i} onLayout={(e) => drop.yuvaOlc(i, e.nativeEvent.layout)}>
              <Tile label={t.text} undoKey="rounds.undo_word" colors={colors} onPress={() => { if (!fb) setPlaced((p) => p.slice(0, i)); }} drag={{ onStart: drop.olc, onDrop: (x, y) => { if (fb) return; if (drop.icinde(x, y)) setPlaced((p) => tasi(p, i, drop.hedefIndex(x, y, p.length))); else setPlaced((p) => p.filter((_, j) => j !== i)); } }} />
            </View>
          ))}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {pool.map((t) => <Tile key={t.id} label={t.text} dim={usedIds.has(t.id)} onPress={() => tap(t)} colors={colors} drag={{ onStart: drop.olc, onDrop: (x, y) => { if (drop.icinde(x, y)) dropPool(t, drop.hedefIndex(x, y, placed.length)); } }} />)}
        </View>
        {!fb && !noHints ? (
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
            <PressableScale onPress={useHint} disabled={placed.length >= answer.length} style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 9 }}>
              <Text variant="caption" color={colors.textMuted}>{tx("rounds.hint")}</Text>
            </PressableScale>
          </View>
        ) : null}
      </View>
    </RoundShell>
  );
}

/** Sınavda "Kontrol et"in altında: cevabın neden açılmadığı (web `exam-player` aynı satır). */
function BlindNote({ colors }: { colors: Palette }) {
  return <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm }}>{tx("exam.answers_at_end")}</Text>;
}

function TranslateRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  const guest = Boolean(useAuth().user?.guest);
  const s = typeof round.sentence === "object" && round.sentence ? round.sentence : { tr: "", de: "", en: null };
  /* Çevrilecek cümle ANADİLDE (sunucu `native`); eski turda yalnız Türkçe anadilde `tr`ye düşülür (`translateSource`). */
  const { text: source, sub: sourceSub } = translateSource(s);
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
  /* Model cevabı geç gelebilir: o arada süre biter, tur değişir ya da ekran
     kapanırsa eski cümlenin hükmü (titreşim + okuma) sonraki ekranın üstüne
     düşüyordu. Dönüşte tur hâlâ bu mu, bakılıyor. */
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);
  const roundNow = useRef(round);
  roundNow.current = round;
  /* Sınavda hüküm gösterilmiyor (`BlindAnswers`, QA F-0017). */
  const blind = useBlindAnswers();
  const sent = useRef(false);
  async function check() {
    if (fb || checking || sent.current) return;
    const typed = val.trim();
    let m = matchSentence(typed, s.de, alts, currentTargetLang());
    let ok = !!typed && m.quality >= 3 && m.verdict !== "order";
    /* İKİNCİ ŞANS: yerel hakem "yanlış" dediyse ve cevap üç sözcükten
       uzunsa modele sorulur. Kabul ederse tur doğru sayılır ve kalite 4
       olur - web `translate-game` ile aynı eşikler. */
    let rescued = false;
    /* Misafirde model yok (uç 403): istek atılmıyor, yerel hüküm geçerli. */
    /* "Sıra" hükmü de soruluyor: geçerli başka bir diziliş olabilir ("Wir sind
       zusammen sehr glücklich."; web `translate-game` aynı koşul). */
    if (!ok && !guest && (m.verdict === "wrong" || m.verdict === "order") && typed.split(/\s+/).length >= 3) {
      setChecking(true);
      try {
        const d = await api<{ result?: { score?: { overall?: number; task?: number } } }>(
          "/api/assess",
          {
            method: "POST",
            replay: true, // aynı metnin tekrarı önbellekten döner (lib/assess hash), yeni kayıt açmaz
            timeoutMs: ASSESS_WAIT_MS,
            body: JSON.stringify({
              kind: "sentence",
              level: round.word?.niveau || "A1",
              task: { prompt: tx("assess.ai_translate", { source }), target: s.de },
              answer: { text: typed },
              /* `day` bir YAZMA anahtarı: değerlendirme satırı o güne yazılıyor ve günlük
              kota o günün satırları sayılarak bulunuyor (bkz. api/assess `parseBody`).
              Mobil göndermiyordu, yani sunucunun UTC günü işliyordu: gece yarısından
              sonra yapılan değerlendirme dünkü güne düşüyor ve kota da yanlış güne
              sayılıyordu. Web `assess-client` baştan beri gönderiyor. */
              /* ÜRETİMİN DİLİ — zorunlu. İstemci vermezse sunucu "de"ye
              düşüyor (`api/assess` `parseBody`), yani İngilizce kursta
              yazılan metin ALMANCA rubriğiyle puanlanıyordu ("Perfekt
              arayan" beklentiler). Web dört çağıranın hepsinde gönderiyor
              ve tipi de zorunlu yaptı (`AssessRequest.lang`). */
              lang: currentTargetLang(),
              day: todayStr(),
            }),
          },
        );
        const sc = d?.result?.score;
        if ((sc?.overall ?? 0) >= ASSESS_ACCEPT && (sc?.task ?? 0) >= 3) {
          ok = true;
          /* Hüküm "exact"e dönüyor ki kalite 4 olsun, ama BAŞLIK öyle
             demiyor: kullanıcının kuruluşu hedefle aynı değildi, modelin
             anlamı kabul ettiği söyleniyor. "Tam doğru" demek yanıltıcıydı -
             web `translate-game` baştan beri ayrı bir satır yazıyor. */
          rescued = true;
          m = { ...m, verdict: "exact", quality: 4, errorType: undefined };
        }
      } catch {
        /* model yoksa ya da geç kaldıysa yerel hüküm geçerli */
      } finally {
        if (alive.current) setChecking(false);
      }
      if (!alive.current || roundNow.current !== round) return;
    }
    judged.current = m;
    Keyboard.dismiss();
    if (blind) {
      /* Cevap alındı, hüküm yok: ses, titreşim ve katman olmadan sıradaki madde. */
      sent.current = true;
      haptic("tap");
      onDone(ok, payload(ok));
      return;
    }
    markAnswer(ok, s.de, ok && !rescued && m.verdict === "spelling"); // doğru Almanca cümleyi oku; yazım sapması "near"
    /* HÜKÜM TEK İFADE, cevap kendi satırında: "Doğrusu:" iki kez yazılıyordu
       (etiket + `match.wrong` hükmü). Yazım sapmasında katman "neredeyse"
       tonunda; sıra hatası yanlış sayılıyor ama adını söylüyor. */
    const label = rescued ? tx("sheet.ai_accepted")
      : m.verdict === "exact" ? tx("sheet.correct")
      : m.verdict === "spelling" ? tx("sheet.near_spelling")
      : m.verdict === "order" ? tx("sheet.order")
      : tx("sheet.wrong");
    setFb({
      correct: ok,
      tone: ok ? (m.verdict === "spelling" ? "near" : "ok") : "bad",
      label,
      answerTokens: rescued ? null : m.target,
      answer: rescued ? s.de : null,
      answerTail: (m.matched.match(/[.!?…]+$/)?.[0] ?? ""),
      speak: s.de,
      meaning: source,
      youTokens: !ok ? m.typed : null,
      /* NEDEN: sıra ve yazım hatası kendi kuralını söylüyor (fiilin yeri gibi);
         anlam hatasında yazılanın tamamı gerekçeye konmuyor. Web
         `translate-game` aynı girdiyle aynı satırı çiziyor. */
      why: !ok && m.errorType
        ? whyFor({
            type: m.errorType,
            word: round.word ?? null,
            detail: m.errorType === "meaning" ? null : typed.slice(0, 60),
            answer: s.de.replace(/[.!?…]+$/, "").split(/\s+/).filter(Boolean),
            tail: s.de.match(/[.!?…]+$/)?.[0] ?? ".",
            targetLang: currentTargetLang(),
          })
        : null,
      diffs: rescued ? null : { target: m.target, typed: m.typed },
    });
  }
  /* Yük web `translate-game` ile aynı: kalite hep, hata tipi yalnız yanlışta,
     ipucu kullanıldıysa kalite 3'e kırpılıyor. */
  const payload = (correct = fb?.correct ?? false): DoneExtra => {
    const m = judged.current;
    if (!m) return {};
    return {
      quality: hintShown ? Math.min(m.quality, 3) : m.quality,
      hintUsed: hintShown,
      ...(correct ? {} : { errorType: m.errorType ?? "meaning", detail: val.trim().slice(0, 60) }),
    };
  };
  const inputBlock = (
    <View>
      <TextInput
        value={val}
        onChangeText={setVal}
        multiline
        /* ENTER = KONTROL ET. Kutu çok satırlı (uzun cümle sarsın diye) ama
           çeviri tek cümle: Enter alt satıra iniyordu ve yazma turunda
           "Kontrol et" yerine geçiyordu — iki tur iki ayrı davranış.
           `submit` klavyeyi açık tutuyor, sonuç katmanı zaten kapatıyor. */
        submitBehavior="submit"
        returnKeyType="done"
        onSubmitEditing={() => { if (val.trim()) void check(); }}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder={tx("rounds.write_sentence", { lang: targetLangName() })}
        accessibilityLabel={tx("rounds.write_sentence", { lang: targetLangName() })}
        placeholderTextColor={colors.textFaint}
        style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, color: colors.text, fontSize: 18, minHeight: 88, textAlignVertical: "top" }}
      />
      <WordBankHint answer={s.de} colors={colors} shown={hintShown} onShow={() => setHintShown(true)} />
      <PressableScale onPress={() => void check()} disabled={checking} style={[{ marginTop: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}>
        <Text variant="h3" color={colors.onPrimary}>{tx(checking ? "rounds.checking" : blind ? "exam.answer_and_next" : "common.check")}</Text>
      </PressableScale>
      {blind ? <BlindNote colors={colors} /> : null}
    </View>
  );
  return (
    <RoundShell footer={inputBlock} sheet={fb ? <FeedbackFooter data={fb} onContinue={() => onDone(fb.correct, payload())} colors={colors} /> : undefined}>
      <Prompt label={tx("rounds.translate_into", { lang: targetLangName() })} big={source} sub={sourceSub} colors={colors} />
    </RoundShell>
  );
}

function MatchCard({ text, sub, state, onPress, colors }: { text: string; sub?: string | null; state: "idle" | "sel" | "correct" | "wrong"; onPress: () => void; colors: Palette }) {
  const border = state === "correct" ? colors.success : state === "wrong" ? colors.danger : state === "sel" ? colors.primary : colors.border;
  /* Seçili kart dolgusuz: yüzey + turuncu kenar + turuncu yazı (2026-09-29 Samet: seçim B; web `.option-picked`). */
  const bg = state === "correct" ? colors.successSoft : state === "wrong" ? colors.dangerSoft : colors.surface;
  const shake = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    /* "Hareketi azalt" BURADA OKUNMUYORDU: aynı dosyadaki öbür sarsıntı
       tercihi okuyup hiç başlamıyor, bu şık düğmesi ise her yanlış cevapta
       sarsılıyordu. Eğri de ayrıydı (beş adım 7 piksel); ikisi tek dizide. */
    if (state === "wrong" && !reduceMotion()) shakeSeq(shake).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <Animated.View style={{ transform: [{ translateX: shake }] }}>
      <PressableScale onPress={onPress} disabled={state === "correct"} accessibilityLabel={sub ? `${text}, ${sub}` : text} accessibilityState={{ selected: state === "sel", disabled: state === "correct" }} style={{ borderWidth: 1, borderColor: border, backgroundColor: bg, borderRadius: radii.lg, paddingVertical: spacing.md, paddingHorizontal: spacing.md, minHeight: 60, justifyContent: "center" }}>
        <Text variant="bodyStrong" color={state === "sel" ? colors.primaryText : colors.text}>{text}</Text>
        {sub ? <Text variant="caption" color={colors.textMuted}>{sub}</Text> : null}
      </PressableScale>
    </Animated.View>
  );
}

function MatchRound({ round, onDone, colors }: { round: Round; onDone: Done; colors: Palette }) {
  // Aynı anlam/başlık iki kez çıkmasın: sağ sütunda ikiz karşılık kafa karıştırır.
  // Sunucu artık ayrışan beş kelime seçiyor; bu süzgeç eski kayıtlı turlar için.
  const words = React.useMemo(() => {
    const seen = new Set<string>();
    const out: RoundWord[] = [];
    for (const w of round.words ?? []) {
      const tr = glossOf(w).text.trim().toLowerCase();
      const de = w.de.trim().toLowerCase();
      if (seen.has(`tr:${tr}`) || seen.has(`de:${de}`)) continue;
      seen.add(`tr:${tr}`); seen.add(`de:${de}`);
      out.push(w);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round.id]);
  const rights = React.useMemo(() => {
    const arr = words.map((w) => ({ wordId: w.id, text: glossOf(w).text, sub: glossOf(w).sub }));
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
    if (w) speakTarget(withArtikel(w), { word: true }); // web: Almanca kutusuna dokununca oku
    setSelLeft(id); setWrong(null);
  }
  function pickRight(r: { wordId: number; text: string }) {
    if (fb || selLeft == null || matched.has(r.wordId)) return;
    if (r.wordId === selLeft) {
      const nm = new Set(matched); nm.add(selLeft); setMatched(nm); setSelLeft(null); haptic("correct");
      if (nm.size === words.length) {
        const batch = words.map((w) => ({ wordId: w.id, correct: !wrongBefore.current.has(w.id) }));
        const okCount = batch.filter((b) => b.correct).length;
        /* ÖZET + KARIŞTIRILANLAR. Eskiden "Doğrusu: 3/5 kelime ilk denemede"
           yazıyordu — bir sayı "doğrusu" olamaz. Hüküm artık sayının kendisi;
           ilk denemede tutturulamayan kelimeler anlamlarıyla altında. */
        const karisan = words.filter((w) => wrongBefore.current.has(w.id));
        setFb({
          correct: batch.every((b) => b.correct),
          tone: karisan.length ? "neutral" : "ok",
          label: tx("sheet.first_try", { n: okCount, total: words.length }),
          extra: karisan.length ? (
            <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>
              {`${tx("sheet.mixed_up")}: `}
              {karisan.map((w, i) => (
                <Text key={w.id} variant="caption" color={colors.text}>
                  <Text variant="caption" color={colors.text} style={{ fontWeight: "800" }}>{withArtikel(w)}</Text>{` = ${glossOf(w).text}${i < karisan.length - 1 ? " · " : ""}`}
                </Text>
              ))}
            </Text>
          ) : null,
        });
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
  if (round.game === "free_sentence" && word) return <FreeSentenceRound round={round} word={word} onDone={onDone} colors={colors} />;
  if (round.game === "cloze" && optionTexts(round).length) return <ClozeRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "translate" && typeof round.sentence === "object" && round.sentence) return <TranslateRound round={round} onDone={onDone} colors={colors} />;
  if (round.game === "match" && (round.words?.length ?? 0) >= 2) return <MatchRound round={round} onDone={onDone} colors={colors} />;
  return <SelfAssess round={round} onDone={onDone} colors={colors} />;
}

/** Tur türüne göre doğru oynatıcıyı seçer. Klavye + alt-sabit aksiyon alanı her
 *  turun kendi RoundShell'inde yönetilir (edge-to-edge'de manuel klavye kaldırma). */
export function RoundView({ round, onDone, onAnswer, report }: {
  round: Round;
  onDone: Done;
  onAnswer?: (a: RoundAnswerInfo, round: Round) => void;
  /**
   * İçerik bildirimi: sonuç katmanında "Bildir" (yüzey + isteğe bağlı `sub`). Verilmezse bağlantı yok (sınav).
   * `onOpen`/`onClose`: sayfa açık kalırken süreli turun sayacı duruyor (`lib/useTimerPause`).
   */
  report?: { surface: ReportSurface; sub?: string; onOpen?: () => void; onClose?: () => void };
}) {
  const { colors } = useTheme();
  const sink = React.useCallback((a: RoundAnswerInfo) => onAnswer?.(a, round), [onAnswer, round]);
  const surface = report?.surface;
  const sub = report?.sub;
  const onOpen = report?.onOpen;
  const onClose = report?.onClose;
  const reportFor = React.useMemo(
    () => (surface ? { build: (a: RoundAnswerInfo | null) => roundReport(round, surface, a, sub), onOpen, onClose } : null),
    [round, surface, sub, onOpen, onClose],
  );
  return (
    <AnswerSink.Provider value={sink}>
      <ReportFor.Provider value={reportFor}>{pickRound(round, onDone, colors)}</ReportFor.Provider>
    </AnswerSink.Provider>
  );
}

export { INTERACTIVE };
