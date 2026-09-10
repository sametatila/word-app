import React, { useEffect, useMemo, useRef, useState } from "react";
import { t as tx, targetLangName } from "../lib/i18n";
import { View, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { ReportSheet } from "../ui/ReportSheet";
import { AiNotice } from "../ui/AiNotice";
import { Skeleton, SkeletonLine } from "../ui/Skeleton";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ArrowRightIcon, SpeakerIcon, CheckIcon, XIcon, MicIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { findLesson, scoredSteps, type Lesson, type Segment, type Expectation, type LectureStep } from "../data/lessons";
import { foldCompare, foldTight } from "../lib/textFold";
import { sendRoleplay, roleplayConfigured, parseReply, type ChatMsg } from "../game/roleplay";
import { markItemDone, loadLessonResume, saveLessonResume, clearLessonResume } from "../game/lessonProgress";
import { speakTarget } from "../lib/tts";
import { ensureMicPermission, listenOnce, sttAvailable, stopListening } from "../lib/stt";
import { spokenMatches } from "../lib/voiceMatch";
import { currentTargetLang, currentTargetLocale } from "../lib/courses";
import { haptic } from "../lib/haptics";
import { API_BASE, fetchWithTimeout } from "../api/client";
import { bumpStats } from "../lib/statsSignal";
import { todayStr } from "../game/session";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { sfx } from "../lib/sfx";
import { track } from "../lib/track";

/**
 * Konuşma oynatıcısı — anlatım → karşılıklı konuşma → özet. Web'in
 * lesson-player'ının mobil karşılığı ve artık onunla aynı yolu yürüyor:
 * öğrenci KONUŞUYOR (native STT), yazmak yalnızca yedek.
 *
 * Eskiden mobilde tek yol yazmaktı; gerekçe olarak "cihaz STT'si ekran kapanınca
 * susuyor" yazılıydı ama o kısıt yürüyüş moduna ait — burada ekran zaten açık ve
 * aynı tanıyıcı ekran açıkken üç ayrı yüzeyde (beceri, sınav, kelime turu)
 * sorunsuz çalışıyor. Sonuç şuydu: patikanın konuşma yüzeyi mobilde hiç
 * konuşturmuyor, "söyledim" düğmesi öğrencinin beyanına güveniyordu.
 *
 * İçerik pakette (findLesson); sonuç /api/lesson'a kaydediliyor.
 */

type Phase = "lecture" | "roleplay" | "summary";

/** Cevabın hangi yoldan geldiği — `lesson_step` kind'ının ikinci parçası. */
type Via = "mic" | "typed";

/** Anlatım/konuşma akışındaki baloncuk. */
/** Yapay zekâ yanıtı için bildirme bilgisi: ref = "<lessonId>:<tur>", text = gösterilen metin. */
type ReportRef = { ref: string; text: string };
type BubbleData =
  | { role: "teacher"; segments: Segment[]; tone?: "hint" | "why"; fix?: string[]; report?: ReportRef }
  | { role: "student"; text: string; ok?: boolean };
type Bubble = BubbleData & { id: number };

/** Segmentlerin HEDEF dil kısmı (anlatım "tr" dışındakiler) — okunacak/denetlenecek metin. */
const targetText = (segs: Segment[]): string => segs.filter((s) => s.lang !== "tr").map((s) => s.text).join(" ").trim();

/**
 * Cevap karşılaştırması — noktalama, büyük/küçük, (Almancada) umlaut/ß ve sayı
 * toleranslı. Sabit umlaut katlaması yazılıydı; ortak katlama hedef dile bakıyor.
 */
function sn(x: string): string {
  return foldCompare(x, currentTargetLang());
}
function matches(input: string, target: string, accept?: string[]): boolean {
  const cands = [target, ...(accept ?? [])];
  if (new Set(cands.map(sn)).has(sn(input))) return true;
  // Yedek: boşluksuz. Kesme işareti boşluğa döndüğü için "don't" → "don t";
  // kesmesiz yazan ("dont") aksi halde reddedilirdi.
  const lang = currentTargetLang();
  const tight = foldTight(input, lang);
  return !!tight && new Set(cands.map((c) => foldTight(c, lang))).has(tight);
}

/** Adım türü → ilerleme rengi (web STEP_TONE ile aynı dil). */
function stepTone(step: LectureStep, colors: Palette): string {
  switch (step.expect?.kind) {
    case "repeat": return colors.info;
    case "produce": return colors.primary;
    case "truefalse": return colors.accent;
    case "confirm": return colors.textMuted;
    default: return colors.border;
  }
}

export function LessonScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { params } = useRoute<RouteProp<RootStackParams, "Lesson">>();
  const lesson = useMemo<Lesson | undefined>(() => findLesson(params.id), [params.id]);
  const scrollRef = useRef<any>(null);
  const startedAt = useRef(Date.now());

  const [phase, setPhase] = useState<Phase>("lecture");
  const [feed, setFeed] = useState<Bubble[]>([]);
  const bubbleId = useRef(0);
  const [cursor, setCursor] = useState(0);        // anlatımda beklenen adım
  const [correct, setCorrect] = useState(0);
  const [tries, setTries] = useState(0);          // üretim adımında deneme sayısı
  const [answered, setAnswered] = useState(false); // doğru/yanlış cevaplandı mı
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);        // roleplay bekleme
  const [roleTurns, setRoleTurns] = useState(0);
  const [roleMsgs, setRoleMsgs] = useState<ChatMsg[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [resumeOffer, setResumeOffer] = useState<{ cursor: number; correct: number } | null>(null);
  // Yarım kayıt okunana dek boş sohbet kabuğu çizilmez: ya "devam et" ekranı ya
  // da ilk baloncuklar geliyor, ikisi de boş kabuğun yerine geçip ekranı zıplatır.
  const [resumeChecked, setResumeChecked] = useState(false);
  const [report, setReport] = useState<ReportRef | null>(null); // "Bildir" açık olan yapay zekâ yanıtı
  // Konuşma tanıma durumu. `sttOk === false` tek yer: mikrofon yok ya da izin
  // verilmedi — o zaman yazma alanı açılır, yoksa ders tamamlanamaz hâle gelir.
  const [sttOk, setSttOk] = useState<boolean | null>(null);
  const [listening, setListening] = useState(false);
  // "Yazarak cevapla" seçildi mi. Adım başına SIFIRLANMIYOR: bir kez yazmaya
  // geçen öğrenci her adımda o düğmeyi yeniden aramasın.
  const [typing, setTyping] = useState(false);

  const scoreTotal = lesson ? scoredSteps(lesson) : 0;
  const scrollDown = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
  const push = (b: BubbleData) => setFeed((f) => [...f, { ...b, id: bubbleId.current++ }]);

  // Tanıyıcı bu cihazda/dilde var mı — bir kez sorulur, cevabı ekran boyunca geçerli.
  // Ekrandan çıkarken mikrofon bırakılır: açık kalan oturum sonraki ekranda
  // "mikrofon meşgul" hatası veriyor.
  useEffect(() => {
    let alive = true;
    sttAvailable().then((v) => { if (alive) setSttOk(v); }).catch(() => { if (alive) setSttOk(false); });
    /*
     * YAPAY ZEKÂ KAPALIYSA BUNU BAŞTA SÖYLE.
     *
     * Yapılandırma yoksa sunucu 503 dönüyor ve her tur genel `catch`e düşüp
     * "bağlantı sorunu" yazıyordu — yanlış teşhis: bağlantı yerinde, sohbet
     * yapılandırılmamış. Kullanıcı aynı yanlış cümleyi her denemede yeniden
     * görüyordu. Durumu okuyan yardımcı (`roleplayConfigured`) yazılmıştı ama
     * çağıran yoktu.
     *
     * Web bu durumda derse ait SENARYOYA düşüyor (`lib/lessons/offline-roleplay`)
     * ve konuşma çalışmaya devam ediyor; o yolun mobile taşınması ayrı bir iş.
     * Burada yapılan yalnız doğruyu söylemek.
     */
    roleplayConfigured()
      .then((ok) => {
        if (alive && !ok) push({ role: "teacher", segments: [{ lang: "tr", text: tx("lesson.ai_off") }], tone: "hint" });
      })
      .catch(() => {});
    return () => { alive = false; stopListening(); };
  }, []);

  // Anlatımı başlat: yarım kalan kayıt varsa devam teklif et, yoksa baştan.
  useEffect(() => {
    if (!lesson) return;
    loadLessonResume(lesson.id).then((r) => {
      if (r && r.cursor < lesson.lecture.length) setResumeOffer({ cursor: r.cursor, correct: r.correct });
      else beginLecture(0, false);
      setResumeChecked(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  // Anlatım ilerledikçe cihazda sakla (yarım kalırsa "devam et").
  useEffect(() => {
    if (!lesson || phase !== "lecture") return;
    if (cursor > 0 && cursor < lesson.lecture.length) void saveLessonResume(lesson.id, cursor, correct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, phase]);

  /**
   * Ders BAŞLADI - web `lesson-player` ile aynı olay, aynı değer (1 kaldığı
   * yerden, 0 baştan) ve aynı kind (ders kimliği).
   *
   * Üç giriş yolu var (ilk açılış, "kaldığın yerden", "baştan başla") ve üçü
   * de `presentFrom` çağırıyor; olay tek bir yerden ve bir kez yazılıyor,
   * yoksa "baştan başla"ya basan öğrenci iki ders başlangıcı üretirdi.
   */
  const lectureStarted = useRef(false);
  function beginLecture(from: number, resumed: boolean) {
    if (lesson && !lectureStarted.current) {
      lectureStarted.current = true;
      track("lesson_start", resumed ? 1 : 0, lesson.id);
    }
    presentFrom(from);
  }

  /** cursor'dan itibaren: anlatım baloncuklarını aç, ilk `expect`li adımda dur. */
  function presentFrom(from: number) {
    if (!lesson) return;
    let k = from;
    const add: Bubble[] = [];
    while (k < lesson.lecture.length) {
      const step = lesson.lecture[k];
      add.push({ id: bubbleId.current++, role: "teacher", segments: step.say });
      if (step.expect) break; // her beklenti (confirm/repeat/produce/truefalse) burada bekletir
      k++;
    }
    if (add.length) setFeed((f) => [...f, ...add]);
    setCursor(k);
    setTries(0);
    setAnswered(false);
    const spoken = add.map((b) => (b.role === "teacher" ? targetText(b.segments) : "")).filter(Boolean).join(". ");
    if (spoken) speakTarget(spoken);
    if (k >= lesson.lecture.length) enterRoleplay();
    scrollDown();
  }

  const current = lesson && cursor < lesson.lecture.length ? lesson.lecture[cursor] : null;
  const expect = current?.expect;

  function advance() { presentFrom(cursor + 1); }

  function onConfirm() { advance(); }

  /**
   * Mikrofonu bir kez açar. İzin yoksa `sttOk` düşer ve ekran kalıcı olarak
   * yazma yoluna geçer — reddedilen izin her adımda yeniden sorulmaz.
   */
  async function dinle(): Promise<string[] | null> {
    if (listening) return null;
    const izin = await ensureMicPermission();
    if (!izin) { setSttOk(false); return null; }
    setListening(true);
    try {
      return await listenOnce(currentTargetLocale(), 8000);
    } finally {
      setListening(false);
    }
  }

  /** Duyulmadı balonu — sessiz kalan mikrofon öğrenciyi karanlıkta bırakmasın. */
  function duyulmadi() {
    push({ role: "teacher", segments: [{ lang: "tr", text: tx("speak.not_heard") }], tone: "hint" });
    scrollDown();
  }

  /**
   * Tekrar adımının sonucu. PUANLANMIYOR (bkz. scoredSteps): tekrar bir ölçme
   * değil, kelimeyi ağza alma denemesi. Üçüncü denemeden sonra doğrusu
   * duyurulup geçiliyor ki ders takılmasın.
   */
  function gradeRepeat(shown: string, ok: boolean, via: Via) {
    if (expect?.kind !== "repeat") return;
    push({ role: "student", text: shown, ok });
    haptic(ok ? "correct" : "wrong");
    if (ok) {
      track("lesson_step", tries === 0 ? 2 : 1, `repeat:${via}`);
      speakTarget(expect.target);
      setTimeout(advance, 500);
      scrollDown();
      return;
    }
    const t = tries + 1;
    setTries(t);
    if (t >= 3) {
      /* Adım geçilemedi. Web de sıfırı YALNIZ burada yazıyor: her yanlış
         denemeye ayrı bir sıfır yazmak, bir adımı üç başarısız adım gibi
         gösterirdi. */
      track("lesson_step", 0, `repeat:${via}`);
      push({ role: "teacher", segments: [{ lang: "tr", text: tx("common.answer_is") }, { lang: currentTargetLang() as Segment["lang"], text: expect.target }], tone: "hint" });
      speakTarget(expect.target);
      setTimeout(advance, 900);
    }
    scrollDown();
  }

  async function speakRepeat() {
    if (expect?.kind !== "repeat") return;
    const duyulan = await dinle();
    if (!duyulan?.length) { if (sttOk !== false) duyulmadi(); return; }
    gradeRepeat(duyulan[0], spokenMatches(duyulan, [expect.target]), "mic");
  }

  /** Mikrofonsuz yedek: tekrar adımı yazarak da geçilebilir. */
  function submitRepeatTyped() {
    if (expect?.kind !== "repeat") return;
    const text = input.trim();
    if (!text) return;
    setInput("");
    gradeRepeat(text, matches(text, expect.target), "typed");
  }

  async function speakProduce() {
    if (expect?.kind !== "produce") return;
    const duyulan = await dinle();
    if (!duyulan?.length) { if (sttOk !== false) duyulmadi(); return; }
    // Söylenen cevap tanıyıcı çıktısıyla karşılaştırılıyor (sayı/noktalama
    // katlaması dahil); yazılan cevap düz karşılaştırmadan geçiyor.
    gradeProduce(duyulan[0], spokenMatches(duyulan, [expect.target, ...(expect.accept ?? [])]), "mic");
  }

  function submitProduce() {
    if (expect?.kind !== "produce") return;
    const text = input.trim();
    if (!text) return;
    setInput("");
    gradeProduce(text, matches(text, expect.target, expect.accept), "typed");
  }

  /** Konuşma fazında mikrofon — duyulan replik doğrudan gönderilir. */
  async function speakRole() {
    const duyulan = await dinle();
    if (!duyulan?.length) { if (sttOk !== false) duyulmadi(); return; }
    void sendRole(duyulan[0]);
  }

  function gradeProduce(text: string, ok: boolean, via: Via) {
    if (expect?.kind !== "produce") return;
    push({ role: "student", text, ok });
    if (ok) {
      track("lesson_step", tries === 0 ? 2 : 1, `produce:${via}`);
      haptic("correct");
      /*
       * İSABET YALNIZ İLK DENEMEDE SAYILIYOR.
       *
       * Sayaç her doğruda artıyordu, kaçıncı denemede olduğuna bakmadan: aynı
       * adımı üçüncü denemede bilen öğrenci de ilk denemede bilenle aynı
       * yüzdeyi alıyordu. Ekranın kendi ölçümü zaten ayrımı biliyor
       * (`lesson_step` değeri 2 ilk denemede, 1 sonrakinde) - puan onu
       * görmezden geliyordu. Web `lesson-player` iki adım türünde de
       * `ok && isFirstTry` istiyor.
       *
       * Doğru/yanlış adımında fark yok: orada tek deneme var (`answered`
       * kilidi), yani doğru cevap zaten hep ilk denemede geliyor.
       */
      if (tries === 0) setCorrect((c) => c + 1);
      push({ role: "teacher", segments: [{ lang: "tr", text: tx(PRAISE_KEYS[correct % PRAISE_KEYS.length]) }] });
      speakTarget(expect.target);
      setTimeout(advance, 500);
    } else {
      haptic("wrong");
      const t = tries + 1;
      setTries(t);
      if (t >= 3) {
        track("lesson_step", 0, `produce:${via}`);
        // Doğru cevap balonu: dil etiketi KURSTAN gelir. Sabit "de" yazıyordu;
        // çizim `lang !== "tr"` diye baktığı için görünürde bir şey bozulmuyordu
        // ama İngilizce hedefi "Almanca" diye etiketlemek, dile göre dallanan
        // bir okuyucu eklendiği anda sessizce yanlış sonuç verirdi.
        push({ role: "teacher", segments: [{ lang: "tr", text: tx("common.answer_is") }, { lang: currentTargetLang() as Segment["lang"], text: expect.target }], tone: "hint" });
        speakTarget(expect.target);
        setTimeout(advance, 900);
      } else if (expect.hint?.length) {
        push({ role: "teacher", segments: expect.hint, tone: "hint" });
      }
    }
    scrollDown();
  }

  function answerTrueFalse(pick: boolean) {
    if (expect?.kind !== "truefalse" || answered) return;
    setAnswered(true);
    const ok = pick === expect.answer;
    /* Yol "tap": bu adım iki düğmeyle cevaplanıyor, tek deneme var (`answered`
       kilidi) ve o yüzden doğru cevap her zaman ilk denemede geliyor. */
    track("lesson_step", ok ? 2 : 0, "truefalse:tap");
    push({ role: "student", text: tx(pick ? "common.correct" : "common.wrong"), ok });
    haptic(ok ? "correct" : "wrong");
    if (ok) setCorrect((c) => c + 1);
    push({ role: "teacher", segments: expect.why, tone: "why" });
    setTimeout(advance, 1100);
    scrollDown();
  }

  // ---- Konuşma (roleplay) ----
  function enterRoleplay() {
    if (!lesson) return;
    setPhase("roleplay");
    void clearLessonResume(lesson.id);
    const opening = lesson.roleplay.opening;
    setFeed([]);
    push({ role: "teacher", segments: [{ lang: "tr", text: tx("lesson.scene", { scene: lesson.roleplay.scene }) }] });
    if (opening) {
      push({ role: "teacher", segments: [{ lang: "de", text: opening }, ...(lesson.roleplay.openingTr ? [{ lang: "tr" as const, text: lesson.roleplay.openingTr }] : [])] });
      setRoleMsgs([{ role: "assistant", content: opening }]);
      speakTarget(opening);
    }
    scrollDown();
  }

  async function sendRole(textArg?: string) {
    if (!lesson || busy) return;
    const text = (textArg ?? input).trim();
    if (!text) return;
    push({ role: "student", text });
    setInput("");
    setSuggestions([]);
    setBusy(true);
    const next: ChatMsg[] = [...roleMsgs, { role: "user", content: text }];
    setRoleMsgs(next);
    const turn = roleTurns + 1;
    setRoleTurns(turn);
    scrollDown();
    try {
      const reply = await sendRoleplay(lesson.id, next);
      const parsed = parseReply(reply || "…");
      const bodyText = parsed.body || reply || "…";
      setRoleMsgs([...next, { role: "assistant", content: bodyText }]);
      push({ role: "teacher", segments: [{ lang: "de", text: bodyText }], fix: parsed.corrections.length ? parsed.corrections : undefined, report: { ref: `${lesson.id}:${turn}`, text: reply } });
      setSuggestions(parsed.suggestions);
      if (bodyText) speakTarget(bodyText);
    } catch {
      push({ role: "teacher", segments: [{ lang: "tr", text: tx("lesson.connection_problem") }], tone: "hint" });
    } finally {
      setBusy(false);
      scrollDown();
    }
  }

  const minTurns = lesson?.roleplay.minTurns ?? 6;
  const roleplayReady = roleTurns >= minTurns;

  // ---- Özet + kayıt ----
  async function finish(roleDone: boolean) {
    if (!lesson) return;
    setPhase("summary");
    if (saved) return;
    setSaved(true);
    sfx("finish"); // tamamlanma sesi (özet; saved koruması sayesinde bir kez)
    /* Puan yüzdesi web ile aynı formül: puanlanan adımlar içinde doğru oranı
       (`correct` üstten kırpılıyor - konuşma fazı `correct`i artırmıyor ama
       formül yine de tavanı aşmasın). Geçme kaydı sunucuda. */
    track("lesson_finish", scoreTotal ? Math.round((100 * Math.min(correct, scoreTotal)) / scoreTotal) : 0, lesson.id);
    bumpStats(); // ders bitti: XP/seri değişti
    void markItemDone(lesson.id);
    void clearLessonResume(lesson.id);
    const seconds = Math.round((Date.now() - startedAt.current) / 1000);
    try {
      await fetchWithTimeout(`${API_BASE}/api/lesson`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, correct, roleplayDone: roleDone, day: todayStr(), seconds }),
      });
    } catch { /* çevrimdışı: yerel işaret yeterli, sunucu sonra */ }
  }

  const nextLesson = useMemo(() => {
    if (!lesson) return null;
    const list = require("../data/lessons").lessonsForLevel(lesson.level) as Lesson[];
    const i = list.findIndex((l) => l.id === lesson.id);
    return i >= 0 && i + 1 < list.length ? list[i + 1] : null;
  }, [lesson]);

  if (!lesson) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.lg, padding: spacing.xl }}>
        <Mascot mood="sad" size={90} />
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{tx("lesson.this_lesson_wasn_t_found")}</Text>
        <PressableScale onPress={() => nav.goBack()}><Text variant="bodyStrong" color={colors.primaryText}>{tx("lesson.go_back")}</Text></PressableScale>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm }}>
      {/* Başlık + ilerleme */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={tx("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{lesson.title}</Text>
          <Text variant="caption" color={colors.textMuted} numberOfLines={1}>
            {tx(phase === "lecture" ? "lesson.phase_lecture" : phase === "roleplay" ? "lesson.phase_roleplay" : "lesson.phase_summary")} · {lesson.titleTr}
          </Text>
        </View>
      </View>
      {/* Rol yapma boyunca EKRANDA KALIR — akışta kaybolan tek seferlik bir
          baloncuk, konuşmanın ortasına dönen kullanıcıya hiçbir şey söylemez. */}
      {phase === "roleplay" && (
        <AiNotice variant="character" style={{ marginHorizontal: spacing.lg, marginBottom: spacing.xs }} />
      )}
      {phase === "lecture" && (
        <View style={{ flexDirection: "row", gap: 3, paddingHorizontal: spacing.lg, marginBottom: spacing.xs }}>
          {lesson.lecture.map((s, i) => (
            <View key={i} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: i < cursor ? colors.success : i === cursor ? stepTone(s, colors) : colors.surface2 }} />
          ))}
        </View>
      )}

      {!resumeChecked ? (
        // Sohbet kabuğunun iskeleti: öğretmen baloncukları + alt eylem alanı.
        <>
          <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
            {["78%", "62%", "88%"].map((w, i) => (
              <View key={i} style={{ alignSelf: "flex-start", width: w, marginBottom: spacing.md }}>
                <Skeleton height={22 + 2 + 18 * 2} radius={radii.lg} />
                <SkeletonLine variant="micro" width={54} style={{ marginTop: 4, marginLeft: 4 }} />
              </View>
            ))}
          </View>
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.bg }}>
            <Skeleton height={53} radius={radii.lg} />
          </View>
        </>
      ) : phase === "summary" ? (
        <Summary lesson={lesson} correct={correct} total={scoreTotal} next={nextLesson} colors={colors} insets={insets}
          onBack={() => nav.goBack()}
          onNext={nextLesson ? () => nav.replace("Lesson", { id: nextLesson.id }) : undefined} />
      ) : resumeOffer ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <Mascot mood="wave" size={90} />
          <Text variant="h2" style={{ textAlign: "center" }}>{tx("lesson.pick_up_where_you_left_off")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{tx("lesson.you_paused_this_lesson_pick_up")}</Text>
          <View style={{ alignSelf: "stretch", gap: spacing.sm }}>
            <BigButton label={tx("lesson.continue_where_you_left_off")} onPress={() => { const r = resumeOffer; setResumeOffer(null); setCorrect(r.correct); beginLecture(r.cursor, true); }} colors={colors} />
            <PressableScale onPress={() => { setResumeOffer(null); void clearLessonResume(lesson.id); beginLecture(0, false); }}>
              <View style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 15, alignItems: "center" }}>
                <Text variant="h3" color={colors.text}>{tx("lesson.start_over")}</Text>
              </View>
            </PressableScale>
          </View>
        </View>
      ) : (
        <>
          <ScrollView ref={scrollRef} automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.lg }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
            {feed.map((b) => <BubbleView key={b.id} b={b} colors={colors} onReport={setReport} />)}
            {busy && (
              <View style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                <ActivityIndicator color={colors.primaryText} size="small" /><Text variant="caption" color={colors.textMuted}>{tx("lesson.typing")}</Text>
              </View>
            )}
          </ScrollView>

          {/* Alt eylem alanı — tek el için ekranın altında. */}
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.bg }}>
            {phase === "lecture" ? (
              <LectureControls expect={expect} tries={tries} input={input} setInput={setInput}
                onConfirm={onConfirm} onSpeakRepeat={() => void speakRepeat()} onTypedRepeat={submitRepeatTyped}
                onSpeakProduce={() => void speakProduce()} onProduce={submitProduce} onTrueFalse={answerTrueFalse}
                sttOk={sttOk} listening={listening} typing={typing} setTyping={setTyping}
                colors={colors} />
            ) : (
              <RoleplayControls input={input} setInput={setInput} busy={busy} onSend={() => sendRole()}
                onSpeak={() => void speakRole()}
                suggestions={suggestions} onSuggest={(s) => sendRole(s)}
                ready={roleplayReady} turns={roleTurns} minTurns={minTurns} onFinish={() => finish(true)}
                sttOk={sttOk} listening={listening} typing={typing} setTyping={setTyping} colors={colors} />
            )}
          </View>
        </>
      )}
      <ReportSheet visible={!!report} kind="roleplay" refId={report?.ref ?? ""} content={report?.text ?? ""} onClose={() => setReport(null)} />
    </View>
  );
}

/** Övgü satırları — t() çağrı anında (dil modül yüklenirken hazır değil). */
const PRAISE_KEYS = ["lesson.praise_1", "lesson.praise_2", "lesson.praise_3", "lesson.praise_4", "lesson.praise_5"];

function BubbleView({ b, colors, onReport }: { b: Bubble; colors: Palette; onReport?: (r: ReportRef) => void }) {
  if (b.role === "student") {
    return (
      <View style={{ alignSelf: "flex-end", maxWidth: "84%", marginBottom: spacing.md, flexDirection: "row", alignItems: "center", gap: 6 }}>
        <View style={[{ borderRadius: radii.lg, paddingVertical: 11, paddingHorizontal: spacing.md, backgroundColor: b.ok === false ? colors.danger : colors.primary }, softShadow(colors.primary, 6)]}>
          <Text variant="body" color={colors.onPrimary}>{b.text}</Text>
        </View>
      </View>
    );
  }
  const bg = b.tone === "hint" ? colors.surface2 : b.tone === "why" ? colors.primarySoft : colors.surface;
  return (
    <View style={{ alignSelf: "flex-start", maxWidth: "88%", marginBottom: spacing.md }}>
      <View style={{ borderRadius: radii.lg, paddingVertical: 11, paddingHorizontal: spacing.md, backgroundColor: bg, borderWidth: 1, borderColor: colors.hairline }}>
        <Text variant="body">
          {b.segments.map((s, i) => (
            <Text key={i} variant="body" color={s.lang !== "tr" ? colors.text : colors.textMuted} style={s.lang !== "tr" ? { fontWeight: "700" } : undefined}>
              {/* Parçalar arasına boşluk konur — ama sonraki parça noktalama ile
                  başlıyorsa konmaz, yoksa ekranda "then . Sonra demek" gibi
                  noktadan önce boşluk çıkıyor. */}
              {s.text}{i < b.segments.length - 1 && !/^[.,!?;:…]/.test(b.segments[i + 1].text) ? " " : ""}
            </Text>
          ))}
        </Text>
        {b.fix?.length ? (
          <View style={{ marginTop: 8, gap: 2, borderTopWidth: 1, borderTopColor: colors.hairline, paddingTop: 6 }}>
            {b.fix.map((f, i) => <Text key={i} variant="micro" color={colors.textMuted}>{tx("lesson.fix", { text: f })}</Text>)}
          </View>
        ) : null}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: 4, marginLeft: 4 }}>
        {targetText(b.segments) ? (
          <PressableScale onPress={() => speakTarget(targetText(b.segments))} hitSlop={8} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <SpeakerIcon color={colors.textMuted} size={15} /><Text variant="micro" color={colors.textMuted}>{tx("lesson.listen")}</Text>
          </PressableScale>
        ) : null}
        {b.report && onReport ? (
          <PressableScale onPress={() => onReport(b.report!)} hitSlop={8} accessibilityLabel={tx("lesson.report_this_answer")}>
            <Text variant="micro" color={colors.textFaint}>{tx("lesson.report")}</Text>
          </PressableScale>
        ) : null}
      </View>
    </View>
  );
}

function BigButton({ label, onPress, tint, colors, disabled }: { label: string; onPress: () => void; tint?: string; colors: Palette; disabled?: boolean }) {
  const bg = disabled ? colors.surface2 : tint ?? colors.primary;
  return (
    <PressableScale onPress={disabled ? () => {} : onPress}>
      <View style={[{ borderRadius: radii.lg, backgroundColor: bg, paddingVertical: 15, alignItems: "center" }, disabled ? {} : softShadow(bg, 10)]}>
        <Text variant="h3" color={disabled ? colors.textFaint : colors.onPrimary}>{label}</Text>
      </View>
    </PressableScale>
  );
}

/**
 * Mikrofon düğmesi — konuşma yolunun tek girişi. Dinlerken kendini kilitler ki
 * ikinci dokunuş açık oturumu bölmesin.
 */
function MicButton({ listening, onPress, label, colors }: { listening: boolean; onPress: () => void; label: string; colors: Palette }) {
  return (
    <PressableScale onPress={listening ? () => {} : onPress}>
      <View style={[{ borderRadius: radii.lg, backgroundColor: listening ? colors.surface2 : colors.primary, paddingVertical: 15, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, listening ? {} : softShadow(colors.primary, 10)]}>
        <MicIcon color={listening ? colors.primaryText : colors.onPrimary} size={22} />
        <Text variant="h3" color={listening ? colors.primaryText : colors.onPrimary}>
          {listening ? tx("speak.listening") : label}
        </Text>
      </View>
    </PressableScale>
  );
}

/** Yazma satırı — mikrofonun yedeği; üç yerde aynı biçim. */
function TypedRow({ value, onChange, onSubmit, placeholder, colors, disabled }: {
  value: string; onChange: (s: string) => void; onSubmit: () => void; placeholder: string; colors: Palette; disabled?: boolean;
}) {
  const dolu = !!value.trim() && !disabled;
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.sm }}>
      <TextInput value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={colors.textFaint}
        editable={!disabled} multiline autoCapitalize="sentences" onSubmitEditing={onSubmit}
        style={{ flex: 1, maxHeight: 120, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 12, color: colors.text, fontSize: 16 }} />
      <PressableScale accessibilityLabel={tx("common.send")} onPress={onSubmit} disabled={!dolu} style={[{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: dolu ? colors.primary : colors.surface2 }, dolu ? softShadow(colors.primary, 8) : {}]}>
        <ArrowRightIcon color={dolu ? colors.onPrimary : colors.textFaint} size={22} />
      </PressableScale>
    </View>
  );
}

/** "Yazarak cevapla" — mikrofon çalışıyorken bile açık kalan kaçış yolu. */
function TypeToggle({ onPress, colors }: { onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} style={{ alignItems: "center", paddingVertical: spacing.xs }}>
      <Text variant="caption" color={colors.textMuted}>{tx("lesson.answer_by_typing")}</Text>
    </PressableScale>
  );
}

function LectureControls({ expect, tries, input, setInput, onConfirm, onSpeakRepeat, onTypedRepeat, onSpeakProduce, onProduce, onTrueFalse, sttOk, listening, typing, setTyping, colors }: {
  expect: Expectation | undefined; tries: number; input: string; setInput: (s: string) => void;
  onConfirm: () => void; onSpeakRepeat: () => void; onTypedRepeat: () => void; onSpeakProduce: () => void;
  onProduce: () => void; onTrueFalse: (b: boolean) => void;
  sttOk: boolean | null; listening: boolean; typing: boolean; setTyping: (v: boolean) => void; colors: Palette;
}) {
  // Mikrofon yoksa/izin verilmediyse yazma tek yol — ders tamamlanabilir kalmalı.
  const yaziYolu = sttOk === false || typing;
  if (!expect) return <BigButton label={tx("lesson.continue")} onPress={onConfirm} colors={colors} />;
  if (expect.kind === "confirm") return <BigButton label={tx("lesson.i_m_ready")} onPress={onConfirm} colors={colors} />;
  if (expect.kind === "repeat") {
    return (
      <View style={{ gap: spacing.sm }}>
        {tries > 0 && <Text variant="caption" color={colors.dangerText}>{tx("lesson.try_again", { n: tries })}</Text>}
        <PressableScale onPress={() => speakTarget(expect.target)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 10, borderRadius: radii.lg, backgroundColor: colors.surface2 }}>
          <SpeakerIcon color={colors.primaryText} size={20} /><Text variant="bodyStrong" color={colors.primaryText}>{expect.target}</Text>
        </PressableScale>
        {yaziYolu ? (
          <TypedRow value={input} onChange={setInput} onSubmit={onTypedRepeat} placeholder={tx("lesson.type_in", { lang: targetLangName() })} colors={colors} />
        ) : (
          <>
            <MicButton listening={listening} onPress={onSpeakRepeat} label={tx("lesson.mic_repeat")} colors={colors} />
            <TypeToggle onPress={() => setTyping(true)} colors={colors} />
          </>
        )}
      </View>
    );
  }
  if (expect.kind === "truefalse") {
    return (
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <View style={{ flex: 1 }}>
          <PressableScale onPress={() => onTrueFalse(true)}>
            <View style={[{ borderRadius: radii.lg, backgroundColor: colors.success, paddingVertical: 15, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, softShadow(colors.success, 8)]}>
              <CheckIcon color={colors.onFill} size={22} /><Text variant="h3" color={colors.onFill}>{tx("lesson.correct")}</Text>
            </View>
          </PressableScale>
        </View>
        <View style={{ flex: 1 }}>
          <PressableScale onPress={() => onTrueFalse(false)}>
            <View style={[{ borderRadius: radii.lg, backgroundColor: colors.danger, paddingVertical: 15, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, softShadow(colors.danger, 8)]}>
              <XIcon color={colors.onFill} size={22} /><Text variant="h3" color={colors.onFill}>{tx("lesson.wrong")}</Text>
            </View>
          </PressableScale>
        </View>
      </View>
    );
  }
  // produce — cümleyi kurup SÖYLEMESİ bekleniyor; yazmak yedek yol.
  return (
    <View style={{ gap: spacing.sm }}>
      {tries > 0 && <Text variant="caption" color={colors.dangerText}>{tx("lesson.try_again", { n: tries })}</Text>}
      {yaziYolu ? (
        <TypedRow value={input} onChange={setInput} onSubmit={onProduce} placeholder={tx("lesson.type_your_answer", { lang: targetLangName() })} colors={colors} />
      ) : (
        <>
          <MicButton listening={listening} onPress={onSpeakProduce} label={tx("lesson.mic_produce")} colors={colors} />
          <TypeToggle onPress={() => setTyping(true)} colors={colors} />
        </>
      )}
    </View>
  );
}

function RoleplayControls({ input, setInput, busy, onSend, onSpeak, suggestions, onSuggest, ready, turns, minTurns, onFinish, sttOk, listening, typing, setTyping, colors }: {
  input: string; setInput: (s: string) => void; busy: boolean; onSend: () => void; onSpeak: () => void;
  suggestions: string[]; onSuggest: (s: string) => void;
  ready: boolean; turns: number; minTurns: number; onFinish: () => void;
  sttOk: boolean | null; listening: boolean; typing: boolean; setTyping: (v: boolean) => void; colors: Palette;
}) {
  const yaziYolu = sttOk === false || typing;
  return (
    <View style={{ gap: spacing.sm }}>
      {!busy && suggestions.length > 0 && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs }}>
          {suggestions.map((s, i) => (
            <PressableScale key={i} onPress={() => onSuggest(s)} style={{ backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 8, borderWidth: 1, borderColor: colors.primary }}>
              <Text variant="caption" color={colors.primaryText}>{s}</Text>
            </PressableScale>
          ))}
        </View>
      )}
      {ready ? (
        <BigButton label={tx("lesson.end_conversation_summary")} onPress={onFinish} tint={colors.success} colors={colors} />
      ) : (
        <Text variant="caption" color={colors.textMuted}>{tx("lesson.keep_talking", { n: turns, target: minTurns })}</Text>
      )}
      {yaziYolu ? (
        <TypedRow value={input} onChange={setInput} onSubmit={onSend} placeholder={tx("lesson.type_in", { lang: targetLangName() })} colors={colors} disabled={busy} />
      ) : (
        <>
          <MicButton listening={listening} onPress={busy ? () => {} : onSpeak} label={tx("lesson.mic_talk")} colors={colors} />
          <TypeToggle onPress={() => setTyping(true)} colors={colors} />
        </>
      )}
    </View>
  );
}

function Summary({ lesson, correct, total, next, colors, insets, onBack, onNext }: {
  lesson: Lesson; correct: number; total: number; next: Lesson | null; colors: Palette;
  insets: { bottom: number }; onBack: () => void; onNext?: () => void;
}) {
  const pct = total ? Math.round((correct / total) * 100) : 100;
  const mood = pct >= 80 ? "celebrate" : pct >= 50 ? "happy" : "idle";
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xl, alignItems: "center" }} showsVerticalScrollIndicator={false}>
      <Celebrate show={pct >= 80} />
      <View style={{ marginTop: spacing.lg }}><Mascot mood={mood as never} size={110} /></View>
      <Text variant="display" style={{ marginTop: spacing.md }}>{tx("lesson.lesson_complete")}</Text>
      <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>{lesson.title} · {lesson.titleTr}</Text>

      <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.xl, alignSelf: "stretch" }}>
        <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg, alignItems: "center" }}>
          <Text variant="display" color={colors.primaryText}>{total ? `${correct}/${total}` : "—"}</Text>
          <Text variant="caption" color={colors.textMuted}>{tx("lesson.correct_production")}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg, alignItems: "center" }}>
          <Text variant="display" color={colors.successText}>%{pct}</Text>
          <Text variant="caption" color={colors.textMuted}>{tx("lesson.accuracy")}</Text>
        </View>
      </View>

      {lesson.patterns?.length ? (
        <View style={{ alignSelf: "stretch", marginTop: spacing.lg, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg }}>
          <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{tx("lesson.patterns_you_learned")}</Text>
          {lesson.patterns.map((p, i) => (
            <View key={i} style={{ flexDirection: "row", gap: spacing.sm, marginBottom: 6, alignItems: "flex-start" }}>
              <Text variant="bodyStrong" color={colors.text}>{p.de}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>{p.tr}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ alignSelf: "stretch", marginTop: spacing.xl, gap: spacing.sm }}>
        {onNext && next ? <BigButton label={tx("lesson.next_speaking", { title: next.title })} onPress={onNext} colors={colors} /> : null}
        <PressableScale onPress={onBack}>
          <View style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 15, alignItems: "center" }}>
            <Text variant="h3" color={colors.text}>{tx("lesson.back_to_path")}</Text>
          </View>
        </PressableScale>
      </View>
    </ScrollView>
  );
}
