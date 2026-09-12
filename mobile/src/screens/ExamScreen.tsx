import React, { useEffect, useRef, useState, useCallback } from "react";
import { BOSS_SECONDS, MIN_ASSESS_WORDS, MIN_FREE_WORDS, PASS_SECTION, PASS_TOTAL } from "../lib/learningRules";
import { View, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SkeletonCard, SkeletonLine } from "../ui/Skeleton";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { t, formatPercent } from "../lib/i18n";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useBackConfirm } from "../lib/useBackConfirm";
import { PressableScale } from "../ui/PressableScale";
import { Mascot } from "../ui/Mascot";
import { CoachBubble } from "../ui/CoachBubble";
import { AssessmentCard, type AssessmentResult } from "../ui/AssessmentCard";
import { Celebrate } from "../ui/Celebrate";
import { CertificateSheet } from "../ui/CertificateSheet";
import { XIcon, SpeakerIcon, CheckIcon } from "../ui/icons";
import { RoundView } from "../game/rounds";
import { NoHints } from "../game/noHints";
import { written } from "../game/skillQuiz";
import { speakTarget } from "../lib/tts";
import { ensureMicPermission, listenOnce } from "../lib/stt";
import { spokenMatches } from "../lib/voiceMatch";
import { currentTargetLocale } from "../lib/courses";
import { api, ASSESS_TIMEOUT_MS } from "../api/client";
import { isPremiumRefusal, isQuotaRefusal, notePremiumGate } from "../lib/premium";
import { assessFailKey } from "../lib/assessFail";
import { todayStr } from "../game/session";
import type { Round } from "../game/session";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/* ── sunucu sözleşmesi (src/lib/exam-types.ts ile aynı) ────────────────── */

type SectionId = "vocab" | "grammar" | "produce" | "reading" | "listening" | "speaking" | "writing";
const SECTION_ORDER: SectionId[] = ["vocab", "grammar", "produce", "reading", "listening", "speaking", "writing"];
const SECTION_DE: Record<SectionId, string> = {
  vocab: "Wortschatz", grammar: "Grammatik", produce: "Satzbau",
  reading: "Lesen", listening: "Hören", speaking: "Sprechen", writing: "Schreiben",
};
/** Bölümün öğrenciye ne yaptıracağı — bölüm arası kartında okunur. */
const SECTION_BRIEF_KEY: Record<SectionId, string> = {
  vocab: "exam.brief_vocab", grammar: "exam.brief_grammar", produce: "exam.brief_produce",
  reading: "exam.brief_reading", listening: "exam.brief_listening", speaking: "exam.brief_speaking", writing: "exam.brief_writing",
};
const SECTION_KEY: Record<SectionId, string> = {
  vocab: "exam.sec_vocab", grammar: "exam.sec_grammar", produce: "exam.sec_produce",
  reading: "exam.sec_reading", listening: "exam.sec_listening", speaking: "exam.sec_speaking", writing: "exam.sec_writing",
};

type GrammarItem =
  | { kind: "cell"; id: string; sheet: string; key: string; label: string; options: string[]; answer: number }
  | { kind: "judge"; id: string; statement: string; answer: boolean };
type ProduceItem = { id: string; prompt: string; de: string; accept: string[]; mode: "type" | "order"; chunks?: string[] };
type TextItem = {
  id: string; title: string; titleTr?: string; genre?: string; situation?: string;
  text?: string; segments?: { speaker?: string; text: string }[];
  questions: { text: string; textTr?: string; options: string[]; answer: number }[];
};
type SpeakingItem = { id: string; de: string; tr: string; situation?: string; hint?: string; confusions?: { heard: string[]; fix: string }[] };
type WritingItem = { id: string; task: { prompt: string; checklist: string[]; minWords: number; sample: string } };

type Paper = {
  kind: "module" | "level";
  level: string;
  module: number | null;
  trial: boolean;
  seconds: number;
  /* `canDo` SUNUCUDAN GELİYORDU ve burada düşüyordu (bkz. `lib/exam` kapak
     gövdesi): sınavın sonunda "artık şunları yapabiliyorsun" listesi mobilde
     hiç görünmüyordu - oysa sonucun anlamı puan değil, kazanılan iş. */
  cover: { code: string; titleDe: string; titleTr: string; focus: { de: string; tr: string }[]; canDo?: { de: string; tr: string; en: string }[] } | null;
  sections: {
    vocab: Round[]; grammar: GrammarItem[]; produce: ProduceItem[];
    reading: TextItem[]; listening: TextItem[]; speaking: SpeakingItem[]; writing: WritingItem[];
  };
};

/* `id` SUNUCUDAN GELİYORDU ve burada düşüyordu: sertifika ucu sınav kimliğiyle
   adresleniyor (`/api/certificate/<id>`) ve alan olmadan sertifikaya ulaşmanın
   yolu yoktu (bkz. `ExamResult` `id`). */
/**
 * Kaçırılan madde — sonuç ekranındaki kırılım.
 *
 * Sınav yalnız YÜZDE gösteriyordu: öğrenci "%62" görüp neyi kaçırdığını hiç
 * öğrenmiyordu, oysa sınavın öğreten kısmı tam olarak bu. Web `exam-player`
 * her cevap noktasında kaçanı biriktiriyor ve sonuçta doğru cevabıyla
 * birlikte gösteriyor.
 */
type Miss = { section: SectionId; prompt: string; answer: string; given?: string; why?: string };

/** Kapak — `GET /api/exam?level=..&module=..` ya da `&kind=level`. */
type Cover = {
  code: string | null;
  titleDe: string | null;
  titleTr: string | null;
  focus: { de: string; tr: string }[];
  trial?: boolean;
  seconds?: number;
  counts?: Record<string, number>;
};

type Result = { id: number; total: number; passed: boolean; trial: boolean; sections: { id: SectionId; pct: number; weight: number }[] };

/**
 * Sınav ekranı — modül ve seviye sınavı.
 *
 * ŞU AN MOBİLDE ULAŞILAMIYOR (2026-09-07). Tek kapısı Deneme Sınavları'na
 * dönüşen sınav hazırlık ekranıydı; oradaki seviye ve modül kâğıtları
 * kaldırıldı, çünkü ikisi de `lib/exam.ts`in ders içeriğinden ürettiği,
 * yani Patika türevi sınavlardı. Ekran ve sunucu tarafı duruyor: elle
 * yazılan deneme sınavının biçimi belli olunca ya buraya bağlanacak ya da
 * Patika'nın kendi içine bir kapı açılacak — karar verilmedi.
 *
 * Sunucu tarafı (kâğıt üretimi, puanlama, geçme eşiği) aylardır çalışıyor ve
 * web'den girilebiliyor.
 *
 * Kâğıt sunucudan geliyor (`POST /api/exam {action:"start"}`), bölümler
 * sunucudaki SECTION_ORDER ile aynı sırada yürüyor, sonuç yine sunucuda
 * puanlanıyor (`action:"finish"`). Yani puanlama iki uçta iki kez yazılmadı;
 * mobil yalnız cevapları toplayıp gönderiyor.
 *
 * Bölümler mevcut parçalarla kuruldu: kelime turu için oyunun kendi
 * `RoundView`'ı, konuşma için cihazdaki tanıyıcı + `spokenMatches` (ses
 * sunucuya gitmiyor), yazma için `/api/assess` rubriği. Boş gelen bölüm hiç
 * çizilmiyor — sunucu zaten eksik bölümün ağırlığını kalanlara dağıtıyor.
 */
/**
 * Konuşma maddesinde en uzun dinleme.
 *
 * Sekiz saniyeydi, web aynı maddede on iki saniye kaydediyordu: aynı sınav,
 * aynı soru, farklı süre. Cevabı kesilen kullanıcı puan kaybediyordu ve
 * hiçbir kapı bakmıyordu. Ad web'deki sabitle birebir aynı
 * (`components/exam-player` `SPEAK_MAX_MS`), o yüzden ayrışma "ortak sayısal
 * sabitler" kapısına düşüyor.
 */
const SPEAK_MAX_MS = 12000;

export function ExamScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParams, "Exam">>();
  const level = route.params?.level ?? "A1";
  const moduleIx = route.params?.module ?? null;

  const [paper, setPaper] = useState<Paper | null>(null);
  /**
   * KAPAK KAĞITTAN AYRI GELİYOR.
   *
   * Ekran açılır açılmaz `POST {action:"start"}` atıyordu: kâğıt üretiliyor ve
   * sunucu `exam_start` yazıyordu. Yani kapağı açıp vazgeçen kullanıcı
   * "sınava başlamış" sayılıyordu — başlama/bitirme hunisi Android'de şişik
   * çıkıyordu. Web hiçbir zaman böyle yapmadı: kapağı ayrı uçtan (`GET`)
   * okuyup `start`ı ancak düğmeye basılınca atıyor. Sayılar kâğıt
   * üretilmeden biliniyor, o yüzden kapak hiçbir şey harcamıyor.
   */
  const [cover, setCover] = useState<Cover | null>(null);
  const [starting, setStarting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  /* Yükleme hatası GEÇİCİ olabilir; bkz. hata ekranındaki "tekrar dene". */
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<"yukleniyor" | "kapak" | "bolumGiris" | "bolum" | "sonuc">("yukleniyor");
  /*
   * ÇIKIŞ ONAYA BAĞLI.
   *
   * Başlıktaki çarpı ve donanım geri tuşu kırk beş dakikalık bir sınavı TEK
   * DOKUNUŞTA çöpe atıyordu ve soru sorulmuyordu: cevaplar hiçbir yere
   * kaydedilmiyor, sınav baştan başlıyor. Uygulamanın kendi düzeni bunu zaten
   * biliyor — tur ekranı (`GameScreen` `useBackConfirm`) ve deneme kâğıdı
   * (`MockExamScreen` `ConfirmDialog`) baştan beri soruyor; en pahalı yüzey
   * atlanmıştı. Web sınav SÜRERKEN hiç çıkış düğmesi vermiyor.
   */
  const back = useBackConfirm(phase === "bolum" || phase === "bolumGiris");
  const [secIdx, setSecIdx] = useState(0);
  const [left, setLeft] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  /*
   * SONUÇ GÖNDERİLEMEDİĞİNDE PUAN YİNE GÖSTERİLİYOR.
   *
   * Kayıt düşünce ekran "Sonuç gönderilemedi" diyor ama başlıkta %0 yazıyordu
   * (`result?.total ?? 0`): yirmi dakika sınav çözen öğrenci sıfır görüyordu.
   * Puan zaten istemcide toplanmış durumda (`score.current`), web tam olarak
   * bunu çiziyor (`exam-player` `offline`). Geçti/kaldı YAZILMIYOR - o kararı
   * sunucu veriyor ve bölüm eşiği burada bilinmiyor.
   */
  const [offline, setOffline] = useState<{ pct: number; sections: { id: SectionId; pct: number }[] } | null>(null);
  const [certOpen, setCertOpen] = useState(false);
  const [showMisses, setShowMisses] = useState(false);
  const misses = useRef<Miss[]>([]);
  const score = useRef<Record<SectionId, { correct: number; total: number }>>({
    vocab: { correct: 0, total: 0 }, grammar: { correct: 0, total: 0 }, produce: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 }, listening: { correct: 0, total: 0 }, speaking: { correct: 0, total: 0 }, writing: { correct: 0, total: 0 },
  });
  const speakScores = useRef<number[]>([]);
  const writeScore = useRef<number | null>(null);
  const startedAt = useRef(Date.now());
  /*
   * KELİME CEVAPLARI SUNUCUYA GİDİYOR.
   *
   * `/api/exam` `finish` gövdesinde `vocabAnswers` okuyor ve gelenleri SRS'e
   * yazıyor ("sınav da bir tekrar (hatalar tipleriyle)"). Mobil bu alanı HİÇ
   * göndermiyordu: sınavda yanlış bilinen kelimeler tekrar kuyruğuna
   * girmiyordu, yani sınav öğrenmeye geri beslenmiyordu. Web baştan beri
   * gönderiyor (`exam-player` `vocabAnswers.current`).
   */
  const vocabAnswers = useRef<Record<string, unknown>[]>([]);
  const sent = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setErr(null);
    const adres = moduleIx === null
      ? `/api/exam?level=${level}&kind=level`
      : `/api/exam?level=${level}&module=${moduleIx}`;
    api<{ cover: Cover | null }>(adres)
      .then((d) => {
        if (cancelled) return;
        setCover(d.cover);
        setPhase("kapak");
      })
      .catch((e: Error) => !cancelled && setErr(e.message || t("exam.could_not_load")));
    return () => { cancelled = true; };
  }, [level, moduleIx, attempt]);

  /** Kâğıdı ÜRETİR ve sınavı başlatır — yalnız "Başla"ya basılınca. */
  const startExam = useCallback(() => {
    setStarting(true);
    api<{ paper: Paper }>("/api/exam", {
      method: "POST",
      body: JSON.stringify({ action: "start", level, module: moduleIx, day: todayStr() }),
    })
      .then((d) => {
        // Bölüm TOPLAMLARI kâğıt gelince yazılır, bölüm bitince değil. Yoksa
        // süre dolduğunda ulaşılmamış bölüm total=0 gider, sunucu onu atlar ve
        // ağırlığını kalanlara dağıtır — yani sınavı yarıda bırakmak puanı
        // YÜKSELTİRDİ. Web de kâğıt gelince dolduruyor (exam-player).
        for (const id of SECTION_ORDER) score.current[id] = { correct: 0, total: d.paper.sections[id]?.length ?? 0 };
        score.current.reading.total = d.paper.sections.reading.reduce((a, x) => a + x.questions.length, 0);
        score.current.listening.total = d.paper.sections.listening.reduce((a, x) => a + x.questions.length, 0);
        setPaper(d.paper);
        setLeft(d.paper.seconds);
        startedAt.current = Date.now();
        setStarting(false);
        setPhase("bolumGiris");
      })
      .catch((e: Error) => { setStarting(false); setErr(e.message || t("exam.could_not_load")); });
  }, [level, moduleIx]);

  /**
   * Sınavı kapatır. `sent` koruması yüzünden birden çok kez çağrılması
   * zararsız — süre biterken tetiklenen etki ile "Bitir" düğmesi aynı anda
   * gelebiliyor. useCallback: süre etkisi buna bağımlı, her render'da yeni bir
   * gönderi işlevi üretilseydi etki boşuna yeniden kurulurdu.
   */
  const finishExam = useCallback(async () => {
    if (sent.current || !paper) return;
    sent.current = true;
    const sections = SECTION_ORDER.map((id) => ({ id, ...score.current[id] })).filter((x) => x.total > 0);
    const sp = speakScores.current.length
      ? Math.round(speakScores.current.reduce((a, b) => a + b, 0) / speakScores.current.length)
      : null;
    try {
      const d = await api<{ result: Result }>("/api/exam", {
        method: "POST",
        body: JSON.stringify({
          action: "finish", level, module: moduleIx, day: todayStr(),
          /* `trial` de eksikti: kapak zaten biliyor (`paper.trial`, aşağıda
             uyarı olarak çiziliyor) ama geri gönderilmiyordu, yani DENEME
             sayılması gereken sınav GERÇEK sonuç olarak kaydediliyordu. */
          trial: paper.trial,
          sections, vocabAnswers: vocabAnswers.current,
          speakingScore: sp, writingScore: writeScore.current,
          seconds: Math.round((Date.now() - startedAt.current) / 1000),
        }),
      });
      setResult(d.result);
    } catch {
      setResult(null);
      const total = sections.reduce((a, x) => a + x.total, 0);
      const correct = sections.reduce((a, x) => a + x.correct, 0);
      setOffline({
        pct: total ? Math.round((100 * correct) / total) : 0,
        sections: sections.map((x) => ({ id: x.id, pct: x.total ? Math.round((100 * x.correct) / x.total) : 0 })),
      });
    }
    setPhase("sonuc");
  }, [paper, level, moduleIx]);

  /* Süre yalnız sınav sürerken işler; kapakta ve sonuçta durur. BÖLÜM ARASI
     KARTINDA DA İŞLER: web sayacı orada durdurmuyor (`exam-player` yalnız
     kapak/sonuç/hata fazlarını dışarıda bırakıyor) ve durdurmak Android'de
     sınavı kolaylaştırırdı - bölümler arasında sınırsız okuma süresi. */
  /*
   * SAYAÇ DUVAR SAATİNDEN, SAYICIDAN DEĞİL.
   *
   * Süre her saniye bir sayıcıyı bir azaltarak işliyordu ve `setInterval`
   * uygulama arka plana alınınca duruyor: kullanıcı uygulamadan çıkıp
   * dönünce sayaç bıraktığı yerden devam ediyordu. Yani kırk beş dakikalık
   * sınav istenildiği kadar uzatılabiliyordu — sürenin kendisi sınavın
   * kısıtı ve Android'de o kısıt delinebiliyordu. Web başından beri geçen
   * SÜREYİ hesaplıyor (`exam-player`: `paper.seconds - elapsed`), yani arka
   * planda geçen zaman da sayılıyor. `startedAt` kapaktaki BAŞLA'da
   * damgalanıyor.
   */
  useEffect(() => {
    if (phase !== "bolum" && phase !== "bolumGiris") return;
    const tick = () => setLeft(Math.max(0, (paper?.seconds ?? 0) - Math.floor((Date.now() - startedAt.current) / 1000)));
    tick(); // arka plandan dönüşte ilk saniyeyi beklemeden düzeltilir
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [phase, paper]);

  useEffect(() => {
    if ((phase === "bolum" || phase === "bolumGiris") && left === 0) void finishExam();
  }, [left, phase, finishExam]);

  const filledSections = (): SectionId[] =>
    paper ? SECTION_ORDER.filter((s) => (paper.sections[s]?.length ?? 0) > 0) : [];


  function sectionDone(id: SectionId, correct: number) {
    score.current[id].correct = correct;
    const list = filledSections();
    const i = list.indexOf(id);
    if (i + 1 < list.length) { setSecIdx(i + 1); setPhase("bolumGiris"); }
    else void finishExam();
  }

  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");

  const header = (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
      <PressableScale hitSlop={4} onPress={phase === "bolum" || phase === "bolumGiris" ? back.ask : () => nav.goBack()} accessibilityLabel={t(phase === "bolum" || phase === "bolumGiris" ? "exam.quit_title" : "common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <XIcon color={colors.textMuted} size={22} />
      </PressableScale>
      <View style={{ flex: 1 }}>
        <Text variant="micro" color={colors.textMuted}>
          {paper?.cover ? `${paper.cover.code} · ${paper.cover.titleTr}` : t("exam.level_exam", { level })}
        </Text>
        {/* Son iki dakika KIRMIZI — web sayacı aynı eşikte renklendiriyor
            (`exam-player`: `left < 120`). Androidde sayaç sonuna kadar aynı
            renkteydi, yani "süre bitiyor" uyarısı hiç verilmiyordu. */}
        <Text variant="h3" color={phase === "bolum" && left < 120 ? colors.dangerText : undefined}>{phase === "bolum" ? `${mm}:${ss}` : t("exam.title")}</Text>
      </View>
    </View>
  );

  /* Diyalog iki dalda da çiziliyor (bölüm girişi ve bölümün kendisi): geri
     tuşu ikisinde de yakalanıyor, yalnız birinde göstermek onayı görünmez
     kılardı. */
  const quitDialog = (
    <ConfirmDialog
      visible={back.visible}
      title={t("exam.quit_title")}
      message={t("exam.quit_body")}
      confirmLabel={t("common.exit")}
      cancelLabel={t("common.continue_2")}
      destructive
      onConfirm={() => { back.cancel(); nav.goBack(); }}
      onCancel={back.cancel}
    />
  );

  if (err) {
    return (
      <View accessibilityLiveRegion="assertive" style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.lg, padding: spacing.xl }}>
        <Mascot mood="sad" size={90} />
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{err}</Text>
        {/*
          TEKRAR DENE — ekran yalnız "geri dön" sunuyordu.
          Sınav kâğıdı isteği geçici bir ağ kesintisiyle de düşebilir ve o
          durumda kullanıcının tek çıkışı sınavdan ÇIKMAKTI; haftanın kâğıdı
          böyle harcanabiliyordu. Kalıp `AchievementsScreen`den: sayaç artıyor,
          yükleme etkisi yeniden koşuyor.
        */}
        <PressableScale onPress={() => setAttempt((n) => n + 1)} style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border }}>
          <Text variant="bodyStrong" color={colors.primaryText}>{t("common.try_again")}</Text>
        </PressableScale>
        <PressableScale onPress={() => nav.goBack()}><Text variant="bodyStrong" color={colors.textMuted}>{t("item.go_back")}</Text></PressableScale>
      </View>
    );
  }

  /* Kapak kâğıt OLMADAN çiziliyor; kâğıt yalnız bölümler için gerekli. */
  if (phase === "yukleniyor" || (!paper && phase !== "kapak")) {
    return (
      /*
        SPINNER YERİNE İSKELET — kâğıdın KAPAK yapısında.
        `ui/Skeleton`ın kuralı bu ("düz spinner yerine içeriğin ŞEKLİNİ ve
        YÜKSEKLİĞİNİ gösterir"); ortada dönen bir çark vardı ve kapak gelince
        iki kart birden beliriyordu. Webin karşılığı `exam-player` yükleme
        yer tutucusunu (`animate-pulse`) zaten çiziyor.
      */
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {header}
        <View style={{ padding: spacing.lg, gap: spacing.md }}>
          <SkeletonCard style={{ gap: spacing.sm }}>
            <SkeletonLine variant="h2" width="80%" />
            <SkeletonLine variant="body" width="60%" />
            {[0, 1, 2].map((i) => (
              <SkeletonLine key={i} variant="caption" width={i === 2 ? "55%" : "85%"} />
            ))}
          </SkeletonCard>
          <SkeletonCard style={{ gap: spacing.xs }}>
            <SkeletonLine variant="bodyStrong" width={110} />
            {[0, 1, 2, 3].map((i) => (
              <SkeletonLine key={i} variant="caption" width="70%" />
            ))}
            <SkeletonLine variant="caption" width={90} style={{ marginTop: spacing.xs }} />
          </SkeletonCard>
        </View>
      </View>
    );
  }

  if (phase === "kapak") {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {header}
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md }}>
          {/* Sınav başlarken Erdi tek cümle söylüyor - web `exam-player` de
              aynı yerde. Androidde maskot bu ekranda hiç yoktu. */}
          <CoachBubble moment="exam_intro" mood="idle" size={48} />
          {cover?.titleDe ? (
            <Card padded style={{ gap: spacing.sm }}>
              <Text accessibilityRole="header" variant="h2" style={{ lineHeight: 30 }}>{cover.titleDe}</Text>
              <Text variant="body" color={colors.textMuted}>{cover.titleTr}</Text>
              {/* Odak listesinin BAŞLIĞI yoktu: madde madde Almanca-Türkçe
                  çiftler, ne oldukları söylenmeden duruyordu. */}
              {cover.focus.length ? <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("exam.measures_these")}</Text> : null}
              {cover.focus.map((f, i) => (
                <Text key={i} variant="caption" color={colors.textMuted}>· {f.de} — {f.tr}</Text>
              ))}
            </Card>
          ) : (
            /* Kâğıdın kendi Almancası yoksa başlık SÖZLÜKTEN — web de burada
               sözlüğe düşüyor (`exam-player` `Cover`). */
            <Card padded style={{ gap: spacing.sm }}>
              <Text accessibilityRole="header" variant="h2" style={{ lineHeight: 30 }}>
                {moduleIx === null ? t("exam.level_exam", { level }) : t("exam.module_exam", { level, n: moduleIx + 1 })}
              </Text>
            </Card>
          )}
          {/* BÖLÜMLER VE SÜRE KAĞITTAN DEĞİL KAPAKTAN. Madde sayıları ve süre
              sabit; kâğıdı üretmeden biliniyorlar. Eskiden bu kart kâğıdı
              okuyordu, yani görmek için sınavı başlatmak gerekiyordu. */}
          {cover?.counts ? (
            <Card padded style={{ gap: spacing.xs }}>
              <Text variant="bodyStrong">{t("exam.sections")}</Text>
              {SECTION_ORDER.filter((id) => (cover.counts?.[id === "reading" || id === "listening" ? "text" : id] ?? 0) > 0).map((id) => (
                <Text key={id} variant="caption" color={colors.textMuted}>
                  {SECTION_DE[id]} · {t(SECTION_KEY[id])} ({cover.counts?.[id === "reading" || id === "listening" ? "text" : id]})
                </Text>
              ))}
              {cover.seconds ? (
                <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs }}>
                  {t("exam.minutes", { n: Math.round(cover.seconds / 60) })}
                </Text>
              ) : null}
            </Card>
          ) : null}
          {cover?.trial ? (
            <Card padded><Text variant="caption" color={colors.textMuted}>{t("exam.trial_notice")}</Text></Card>
          ) : null}
          {/*
            KURALLAR. Geri dönüş olmadığı, ipucu bulunmadığı, cevapların sınav
            bitmeden gösterilmediği ve GEÇME EŞİĞİ (toplam %70, her bölüm %50)
            mobilde hiçbir yerde yazmıyordu: öğrenci neyi başarması gerektiğini
            bilmeden sınava giriyordu. Web kapakta söylüyor.
          */}
          <Card padded style={{ gap: spacing.xs, backgroundColor: colors.surface2 }}>
            <Text variant="bodyStrong">{t("exam.rules")}</Text>
            <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 20 }}>
              {t(moduleIx === null ? "exam.rules_level" : "exam.rules_module")} {t("exam.rules_body", { total: PASS_TOTAL, section: PASS_SECTION })}
            </Text>
          </Card>
          {/* Kâğıt BURADA üretiliyor: kapağı açmak sınavı başlatmıyor. */}
          <PressableScale onPress={startExam} disabled={starting} accessibilityState={{ disabled: starting }} style={[{ opacity: starting ? 0.6 : 1, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t(starting ? "common.loading" : "exam.start")}</Text>
          </PressableScale>
        </ScrollView>
      </View>
    );
  }

  if (phase === "sonuc") {
    const pct = result?.total ?? offline?.pct ?? 0;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {header}
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md }}>
          <Card padded style={{ alignItems: "center", gap: spacing.sm }}>
            <Celebrate show={!!result?.passed} />
            <CoachBubble moment={result?.passed ? "exam_pass" : "exam_fail"} mood={result?.passed ? "celebrate" : "sad"} vars={{ pct, level }} size={72} />
            {/* TURUN SONUCU DUYURULUYOR (bkz. web-parity 11.337). */}
            <Text accessibilityRole="header" accessibilityLiveRegion="polite" variant="h1">{formatPercent(pct)}</Text>
            <Text variant="bodyStrong" color={result?.passed ? colors.successText : colors.textMuted}>
              {result ? (result.passed ? t("exam.passed") : t("exam.not_passed")) : t("exam.saved_offline")}
            </Text>
            {result?.trial ? <Text variant="caption" color={colors.textMuted}>{t("exam.trial_notice")}</Text> : null}
          </Card>
          {/*
            SERTİFİKA. Uç aylardır hazırdı ve yorumu "bu ucu mobil de çağırıyor"
            diyordu, ama mobilde onu çağıran hiçbir şey yoktu: sınavı geçen
            Android kullanıcısı ödülünü hiç görmüyordu. Web sonuç kartının
            altında açıyor; geçilmemiş ya da deneme sınavında ise aynı yerde
            ne yapılacağını söylüyor.
          */}
          {/*
            KAÇANLARIN KIRILIMI. Sınav yalnız YÜZDE gösteriyordu: öğrenci
            "%62" görüp neyi kaçırdığını hiç öğrenmiyordu, oysa sınavın
            öğreten kısmı tam olarak bu. Web sonuç kartının altında her kaçan
            maddeyi doğru cevabıyla ve verilen cevapla birlikte açıyor;
            kapalı başlıyor ki puanın önüne geçmesin.
          */}
          {misses.current.length ? (
            <>
              <PressableScale onPress={() => setShowMisses((v) => !v)} style={{ paddingVertical: 12, alignItems: "center", borderRadius: radii.lg, backgroundColor: colors.surface2 }}>
                <Text variant="bodyStrong" color={colors.text}>
                  {showMisses ? t("exam.hide_breakdown") : t("exam.missed_n", { n: misses.current.length })}
                </Text>
              </PressableScale>
              {showMisses ? misses.current.map((m, i) => (
                <Card key={i} padded style={{ gap: 4 }}>
                  <Text variant="micro" color={colors.textMuted}>{SECTION_DE[m.section]} · {t(SECTION_KEY[m.section])}</Text>
                  <Text variant="body" style={{ lineHeight: 21 }}>{m.prompt}</Text>
                  <Text variant="bodyStrong" color={colors.successText}>{m.answer}</Text>
                  {m.given ? <Text variant="caption" color={colors.textMuted}>{t("exam.your_answer")} {m.given}</Text> : null}
                  {m.why ? <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 19 }}>{m.why}</Text> : null}
                </Card>
              )) : null}
              {/* ÖRNEK CEVAP kâğıtta zaten vardı (`task.sample`) ve mobilde hiç
                  gösterilmiyordu: yazma bölümünde öğrencinin karşılaştıracağı
                  tek şey buydu. Web aynı yerde açıyor. */}
              {showMisses && paper?.sections.writing[0]?.task.sample ? (
                <Card padded style={{ gap: 4, backgroundColor: colors.surface2 }}>
                  <Text variant="micro" color={colors.textMuted}>{t("exam.writing_sample")}</Text>
                  <Text variant="caption" style={{ lineHeight: 20 }}>{paper.sections.writing[0].task.sample}</Text>
                </Card>
              ) : null}
            </>
          ) : null}

          {result?.passed && !result.trial ? (
            <PressableScale onPress={() => setCertOpen(true)} style={[{ backgroundColor: colors.success, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.success, 10)]}>
              <Text variant="bodyStrong" color={colors.onFill}>{t("exam.open_certificate")}</Text>
            </PressableScale>
          ) : result ? (
            <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 19 }}>{t("exam.weak_section_hint")}</Text>
          ) : null}
          {result ? <CertificateSheet examId={result.id} visible={certOpen} onClose={() => setCertOpen(false)} /> : null}
          {result?.sections.map((s) => (
            <Card key={s.id} padded style={{ gap: 6 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                {/* AĞIRLIK da yazıyor: geçme kuralı "her bölüm ≥ %50" diyor ama
                    toplamı hangi bölümün taşıdığı ağırlıktan okunuyor ve alan
                    sunucudan zaten geliyordu (`weight`). */}
                <Text variant="body" style={{ flex: 1 }}>
                  {SECTION_DE[s.id]} · {t(SECTION_KEY[s.id])}
                  {/* Yüzde biçimi koda gömülüydü ("%40"): Almanca "40 %", İngilizce "40%"
                      ister ve ortak biçimleyici bunu zaten biliyor. Web aynı satırda
                      sözlükten alıyor. */}
                  <Text variant="micro" color={colors.textMuted}> {t("exam.weight", { pct: formatPercent(s.weight) })}</Text>
                </Text>
                <Text variant="bodyStrong" color={s.pct >= 50 ? colors.successText : colors.dangerText}>{formatPercent(s.pct)}</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
                <View style={{ height: "100%", width: `${s.pct}%`, backgroundColor: s.pct >= 50 ? colors.primary : colors.danger, borderRadius: 3 }} />
              </View>
            </Card>
          ))}
          {/* Çevrimdışı kırılım: ağırlık yok (onu sunucu veriyor), yüzde var. */}
          {!result && offline ? offline.sections.map((s) => (
            <Card key={s.id} padded style={{ gap: 6 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                <Text variant="body" style={{ flex: 1 }}>{SECTION_DE[s.id]} · {t(SECTION_KEY[s.id])}</Text>
                <Text variant="bodyStrong" color={s.pct >= 50 ? colors.successText : colors.dangerText}>{formatPercent(s.pct)}</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
                <View style={{ height: "100%", width: `${s.pct}%`, backgroundColor: s.pct >= 50 ? colors.primary : colors.danger, borderRadius: 3 }} />
              </View>
            </Card>
          )) : null}
          {/*
            YAPABİLİRLİK LİSTESİ. Kâğıdın kapağı bunu taşıyor (`cover.canDo`)
            ve mobil tipi alanı düşürdüğü için liste hiç görünmüyordu. Sonucun
            anlamı puan değil kazanılan iş; sertifikanın gösterilme sebebi de
            bu (bkz. `api/certificate`).
          */}
          {paper?.cover?.canDo?.length ? (
            <Card padded style={{ gap: spacing.sm, backgroundColor: colors.surface2 }}>
              <Text variant="bodyStrong">{t(result?.passed ? "exam.now_you_can" : "exam.this_measured")}</Text>
              {paper.cover.canDo.map((c, i) => (
                <View key={i} style={{ flexDirection: "row", gap: spacing.sm }}>
                  <CheckIcon color={result?.passed ? colors.successText : colors.textMuted} size={14} />
                  <View style={{ flex: 1 }}>
                    <Text variant="caption" style={{ lineHeight: 19 }}>{c.de}</Text>
                    <Text variant="micro" color={colors.textMuted}>{c.tr}</Text>
                    <Text variant="micro" color={colors.textFaint}>{c.en}</Text>
                  </View>
                </View>
              ))}
            </Card>
          ) : null}
          <PressableScale onPress={() => nav.goBack()} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("item.go_back")}</Text>
          </PressableScale>
          {/*
            HIZ TURUNUN TEK GİRİŞİ BURASI — web ile aynı yer ve aynı sebep
            (`components/exam-player`): patron turu yol haritasında modül
            sınavının altındaydı ve orada ikinci bir sınav gibi okunuyordu,
            oysa altmış saniyede on beş kelime bir şey KANITLAMIYOR. Sınavdan
            SONRA yeri doğru: ölçüm bitti, bu bir oyun. Yalnız MODÜL sınavında
            var, seviye sınavında yok.
          */}
          {moduleIx !== null ? (
            <PressableScale onPress={() => nav.navigate("Boss", { level, moduleIndex: moduleIx })} style={{ paddingVertical: 12, alignItems: "center" }}>
              <Text variant="caption" color={colors.textMuted}>{t("exam.speed_round_link", { n: BOSS_SECONDS })}</Text>
            </PressableScale>
          ) : null}
        </ScrollView>
      </View>
    );
  }

  const list = filledSections();
  const active = list[secIdx];

  /*
    BÖLÜM ARASI KARTI. Mobil kapaktan doğrudan ilk soruya, bölüm bitince de
    doğrudan sonrakine geçiyordu: öğrenci hangi bölüme girdiğini yalnız
    başlıktaki tek satırdan ("2/5 · Grammatik · Dilbilgisi") anlıyor, o
    bölümün NE İSTEDİĞİNİ hiç okumuyordu. Web her bölümün önüne bir kart
    koyuyor (`exam-player`): Teil sırası, Almanca ve kendi dilindeki adı,
    bölümün ne yaptıracağı, kaç madde ve kalan süre.
  */
  /* Buradan sonrası kâğıda bağlı: kapak ve sonuç yukarıda döndü. */
  if (!paper) return null;

  if (phase === "bolumGiris" && active) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {header}
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }}>
          <Card padded style={{ gap: spacing.xs }}>
            {/* Büyük harfe çevrilmiyor: Türkçe yerelde "Teil" → "TEİL" oluyor. */}
            <Text variant="micro" color={colors.textMuted}>Teil {secIdx + 1} / {list.length}</Text>
            <Text accessibilityRole="header" variant="h1">{SECTION_DE[active]}</Text>
            <Text variant="bodyStrong" color={colors.primaryText}>{t(SECTION_KEY[active])}</Text>
            <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.sm, lineHeight: 22 }}>{t(SECTION_BRIEF_KEY[active])}</Text>
            <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
              {t("exam.items_and_time", { n: paper.sections[active]?.length ?? 0, time: `${mm}:${ss}` })}
            </Text>
            <PressableScale onPress={() => setPhase("bolum")} style={[{ marginTop: spacing.lg, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
              <Text variant="h3" color={colors.onPrimary}>{t("exam.start_section")}</Text>
            </PressableScale>
          </Card>
        </ScrollView>
        {quitDialog}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {header}
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <Text variant="micro" color={colors.textMuted}>
          {secIdx + 1}/{list.length} · {SECTION_DE[active]} · {t(SECTION_KEY[active])}
        </Text>
      </View>
      <SectionBody
        key={active}
        id={active}
        paper={paper}
        colors={colors}
        insets={insets}
        onSpeakScore={(p) => speakScores.current.push(p)}
        onWriteScore={(p) => { writeScore.current = p; }}
        onMiss={(m) => misses.current.push(m)}
        onTick={(c) => { score.current[active].correct = c; }}
        onVocabAnswer={(a) => vocabAnswers.current.push(a)}
        onDone={(c) => sectionDone(active, c)}
      />
      {quitDialog}
    </View>
  );
}

/* ─────────────────────────── bölümler ─────────────────────────── */

function SectionBody({
  id, paper, colors, insets, onDone, onTick, onSpeakScore, onWriteScore, onVocabAnswer, onMiss,
}: {
  id: SectionId; paper: Paper; colors: Palette; insets: { bottom: number };
  onDone: (correct: number) => void;
  /** Kaçan madde — sonuç ekranındaki kırılım için biriktiriliyor. */
  onMiss: (m: Miss) => void;
  /** Kelime turunun tek tek cevapları — SRS'e gidiyor (bkz. `vocabAnswers`). */
  onVocabAnswer: (a: Record<string, unknown>) => void;
  /** Her maddeden sonra: süre dolarsa yarım bölümün doğruları da sayılsın. */
  onTick: (correct: number) => void;
  onSpeakScore: (p: number) => void;
  onWriteScore: (p: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const correctRef = useRef(0);
  const pad = { paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md };

  function advance(ok: boolean, count: number) {
    if (ok) correctRef.current += 1;
    onTick(correctRef.current);
    if (idx + 1 < count) setIdx(idx + 1);
    else onDone(correctRef.current);
  }

  if (id === "vocab") {
    const r = paper.sections.vocab[idx];
    return (
      <View style={{ flex: 1 }}>
        {/* Kâğıdın kuralı: ipucu yok (bkz. `game/noHints`). Web sınavda ipucu
            düğmesini kaldırıyordu, Android'de duruyordu - aynı kâğıt iki
            platformda iki farklı zorluktaydı. */}
        <NoHints>
        <RoundView
          key={r.id}
          round={r}
          onDone={(ok, extra) => {
            /* Sunucunun süzgeci `wordId`, `game` ve `correct` istiyor; ötekiler
               isteğe bağlı. "Bunu zaten biliyorum" (skip) yolunda cevap
               KAYDEDİLMİYOR - web de öyle. Çok kelimeli tur (eşleştirme)
               `batch` ile her kelimeyi ayrı bildiriyor. */
            if (!extra?.skip) {
              if (extra?.batch?.length) {
                for (const b of extra.batch) onVocabAnswer({ wordId: b.wordId, game: r.game, correct: b.correct });
              } else if (r.word?.id != null) {
                onVocabAnswer({
                  wordId: r.word.id,
                  game: r.game,
                  correct: ok,
                  quality: extra?.quality,
                  errorType: extra?.errorType,
                  detail: extra?.detail,
                });
              }
            }
            if (!ok && !extra?.skip) onMiss({ section: "vocab", prompt: wordPrompt(r), answer: wordAnswer(r) });
            advance(ok, paper.sections.vocab.length);
          }}
        />
        </NoHints>
      </View>
    );
  }

  if (id === "grammar") {
    const it = paper.sections.grammar[idx];
    return (
      <ScrollView contentContainerStyle={pad}>
        {it.kind === "cell" ? (
          <Choice
            key={it.id}
            prompt={`${it.sheet} · ${it.label}`}
            options={it.options}
            answerIdx={it.answer}
            colors={colors}
            onPick={(ok, pick) => {
              if (!ok) onMiss({ section: "grammar", prompt: `${it.sheet} · ${it.label}`, answer: it.options[it.answer], given: it.options[pick] });
              advance(ok, paper.sections.grammar.length);
            }}
          />
        ) : (
          <Choice
            key={it.id}
            prompt={it.statement}
            options={[t("common.true"), t("common.false")]}
            answerIdx={it.answer ? 0 : 1}
            colors={colors}
            onPick={(ok, pick) => {
              if (!ok) onMiss({ section: "grammar", prompt: it.statement, answer: t(it.answer ? "common.true" : "common.false"), given: t(pick === 0 ? "common.true" : "common.false") });
              advance(ok, paper.sections.grammar.length);
            }}
          />
        )}
      </ScrollView>
    );
  }

  if (id === "produce") {
    const it = paper.sections.produce[idx];
    return <Produce key={it.id} it={it} idx={idx} total={paper.sections.produce.length} colors={colors} pad={pad} onDone={(ok, given) => {
      if (!ok) onMiss({ section: "produce", prompt: it.prompt, answer: it.de, given });
      advance(ok, paper.sections.produce.length);
    }} />;
  }

  if (id === "reading" || id === "listening") {
    const items = paper.sections[id];
    return <TextSection key={items[idx].id} it={items[idx]} spoken={id === "listening"} colors={colors} pad={pad}
      onMiss={(q, given) => onMiss({ section: id, prompt: q.textTr ?? q.text, answer: q.options[q.answer], given })}
      onDone={(c) => { correctRef.current += c; onTick(correctRef.current); if (idx + 1 < items.length) setIdx(idx + 1); else onDone(correctRef.current); }} />;
  }

  if (id === "speaking") {
    const it = paper.sections.speaking[idx];
    return <Speak key={it.id} it={it} colors={colors} pad={pad}
      onDone={(ok, score) => {
        if (!ok) onMiss({ section: "speaking", prompt: it.situation ?? t("exam.pronunciation"), answer: it.de });
        onSpeakScore(score);
        advance(ok, paper.sections.speaking.length);
      }} />;
  }

  const w = paper.sections.writing[0];
  return <Write w={w} level={paper.level} colors={colors} pad={pad}
    onDone={(ok, sc) => { onWriteScore(sc); onTick(ok ? 1 : 0); onDone(ok ? 1 : 0); }} />;
}

/**
 * Kaçan kelime turunun sorusu ve doğru cevabı — web `exam-player`
 * `wordPrompt`/`wordAnswer` ile aynı kural.
 *
 * `sentence` iki biçimde gelebiliyor (düz metin ya da üç dilli nesne, bkz.
 * `game/session` `Round`); çeviri turunda sorulan cümlenin kendisi.
 */
function wordPrompt(r: Round): string {
  if (r.game === "translate" && r.sentence) return typeof r.sentence === "string" ? r.sentence : r.sentence.tr;
  return r.word?.tr ?? t("exam.sec_vocab");
}
function wordAnswer(r: Round): string {
  if (r.game === "translate" && r.sentence && typeof r.sentence !== "string") return r.sentence.de;
  if (r.word) return r.word.artikel ? `${r.word.artikel} ${r.word.de}` : r.word.de;
  return "";
}

function Choice({ prompt, options, answerIdx, colors, onPick }: { prompt: string; options: string[]; answerIdx: number; colors: Palette; onPick: (ok: boolean, pick: number) => void }) {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <Card padded style={{ gap: spacing.sm }}>
      <Text variant="bodyStrong" style={{ lineHeight: 24 }}>{prompt}</Text>
      {/*
        SINAV CEVABI AÇILMIYOR — aşağıdaki `Produce` notunun aynı gerekçesi.
        Burada da doğru şık yeşile, yanlış seçim kırmızıya boyanıyordu: aynı
        dilbilgisi yapısı sonraki maddelerde tekrar geçtiği için cevabı açmak
        sınavın kendisini kolaylaştırıyordu. Web yalnız SEÇİMİ işaretliyor
        (`exam-player` `options`) ve ekranda "cevap sınav sonunda gösterilir"
        yazılı. Kilit kalıyor: seçimden 550 ms sonra kendiliğinden ilerliyor.
      */}
      {options.map((o, i) => {
        const secili = pick === i;
        return (
          <PressableScale key={i} disabled={pick !== null} onPress={() => { setPick(i); setTimeout(() => onPick(i === answerIdx, i), 550); }}
            accessibilityRole="radio" accessibilityState={{ selected: secili }}
            style={{ backgroundColor: secili ? colors.primarySoft : colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: secili ? colors.primary : colors.border, paddingVertical: 13, paddingHorizontal: spacing.md }}>
            <Text variant="body" color={secili ? colors.onPrimarySoft : colors.text}>{o}</Text>
          </PressableScale>
        );
      })}
    </Card>
  );
}

/**
 * SINAV CEVABI AÇILMIYOR. Kart iki adımlıydı: "Kontrol et" basılınca kenarlık
 * yeşile/kırmızıya dönüyor, DOĞRU CEVAP yazılıyor, sonra "Sıradaki". Bu bir
 * alıştırma davranışı; sınavda aynı yapılar sonraki maddelerde tekrar geçtiği
 * için cevabı açmak sınavın kendisini kolaylaştırıyor ve Android puanını web
 * puanıyla karşılaştırılamaz kılıyordu. Web tek düğme veriyor ve altına
 * "cevap sınav sonunda gösterilir" yazıyor; kaçırılanlar zaten sonuç
 * ekranında madde madde duruyor.
 */
function Produce({ it, idx, total, colors, pad, onDone }: { it: ProduceItem; idx: number; total: number; colors: Palette; pad: object; onDone: (ok: boolean, given: string) => void }) {
  const [typed, setTyped] = useState("");
  const [parts, setParts] = useState<string[]>([]);
  const answer = it.mode === "order" ? parts.map((p) => p.split(":").slice(1).join(":")).join(" ") : typed;
  const ok = written(answer, [it.de, ...it.accept]);
  /*
    HAZIRLIK KURALI IKI PLATFORMDA AYNI. Burada yalniz `answer.trim()`
    vardi: siralama kipinde bes parcanin biri yerlestirilmis bir "cumle"
    gonderilebiliyor, yazma kipinde tek kelime gecebiliyordu - ve bunlar
    puanlanip sinav sonucuna giriyordu. Web bastan beri siralamada butun
    parcalari, yazmada iki kelimeyi istiyor; sayi artik elle yazili degil
    (`MIN_FREE_WORDS`, weble ayni kaynak).

    Kapali dugmenin SEBEBI de yaziyor: siralama kipinde kalan parcalar
    ekranda goruldugu icin ayri bir cumle gerekmiyor, yazma kipinde
    gerekiyordu.
  */
  const yazilanKelime = typed.trim() ? typed.trim().split(/\s+/).filter(Boolean).length : 0;
  const hazir = it.mode === "order" ? parts.length === (it.chunks?.length ?? 0) : yazilanKelime >= MIN_FREE_WORDS;

  return (
    <ScrollView contentContainerStyle={pad} keyboardShouldPersistTaps="handled">
      <Card padded style={{ gap: spacing.sm }}>
        <Text variant="micro" color={colors.textMuted}>{t(it.mode === "order" ? "exam.order_the_sentence" : "exam.write_in_target")}</Text>
        <Text variant="bodyStrong" style={{ lineHeight: 24 }}>{it.prompt}</Text>
        {it.mode === "order" ? (
          <>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs, minHeight: 44, backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.sm }}>
              {parts.map((p, i) => (
                <PressableScale key={p} onPress={() => setParts(parts.filter((_, j) => j !== i))}
                  style={{ backgroundColor: colors.primarySoft, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 6 }}>
                  <Text variant="body" color={colors.primaryText}>{p.split(":").slice(1).join(":")}</Text>
                </PressableScale>
              ))}
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs }}>
              {(it.chunks ?? []).map((c, i) => {
                const key = `${i}:${c}`;
                if (parts.includes(key)) return null;
                return (
                  <PressableScale key={key} onPress={() => setParts([...parts, key])}
                    style={{ backgroundColor: colors.surface2, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 8 }}>
                    <Text variant="body">{c}</Text>
                  </PressableScale>
                );
              })}
            </View>
          </>
        ) : (
          <TextInput value={typed} onChangeText={setTyped} multiline autoCapitalize="sentences"
            placeholder={t("exam.write_sentence")}
            accessibilityLabel={t("exam.write_sentence")} placeholderTextColor={colors.textFaint}
            style={{ minHeight: 52, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15 }} />
        )}
        {it.mode !== "order" && yazilanKelime < MIN_FREE_WORDS ? (
          <Text variant="caption" color={colors.textMuted}>{t("assess.gate_min_words", { n: MIN_FREE_WORDS })}</Text>
        ) : null}
        <PressableScale
          disabled={!hazir}
          onPress={() => onDone(ok, answer)}
          style={{ backgroundColor: hazir ? colors.primary : colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
          <Text variant="bodyStrong" color={hazir ? colors.onPrimary : colors.textFaint}>
            {t(idx + 1 === total ? "exam.finish_section" : "exam.answer_and_next")}
          </Text>
        </PressableScale>
        <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center" }}>
          {idx + 1} / {total} · {t("exam.answers_at_end")}
        </Text>
      </Card>
    </ScrollView>
  );
}

function TextSection({ it, spoken, colors, pad, onDone, onMiss }: { it: TextItem; spoken: boolean; colors: Palette; pad: object; onDone: (correct: number, total: number) => void; onMiss: (q: TextItem["questions"][number], given: string) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => it.questions.map(() => null));
  const allAnswered = answers.every((a) => a !== null);
  const correctRef = answers.filter((a, i) => a === it.questions[i].answer).length;
  return (
    <ScrollView contentContainerStyle={pad}>
      <Card padded style={{ gap: spacing.xs }}>
        <Text variant="bodyStrong">{it.title}</Text>
        {it.genre || it.situation ? <Text variant="caption" color={colors.textMuted}>{it.situation ?? it.genre}</Text> : null}
        {it.text ? <Text variant="body" style={{ lineHeight: 23, marginTop: spacing.xs }}>{it.text}</Text> : null}
        {it.segments?.map((s, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, marginTop: spacing.xs }}>
            <PressableScale accessibilityLabel={t("item.listen")} onPress={() => void speakTarget(s.text)} hitSlop={6}><SpeakerIcon color={colors.textMuted} size={18} /></PressableScale>
            <Text variant="body" style={{ flex: 1, lineHeight: 22 }}>{spoken ? (s.speaker ? `${s.speaker}: ` : "") + s.text : s.text}</Text>
          </View>
        ))}
      </Card>
      {it.questions.map((q, qi) => (
        <Card key={qi} padded style={{ gap: spacing.sm }}>
          <Text variant="bodyStrong" style={{ lineHeight: 23 }}>{q.textTr ?? q.text}</Text>
          {/*
            SINAVDA CEVAP AÇIKLANMIYOR.
            Seçilen şık yeşile, yanlış olan kırmızıya boyanıyordu ve şıklar
            kilitleniyordu: yani seviye sınavı ortasında DOĞRU CEVAP
            gösteriliyor, aynı metnin sonraki soruları kolaylaşıyordu.
            Uygulamanın kendi sözü bunun tersi ve aynı ekranda yazılı —
            `exam.answers_at_end`: "cevap sınav sonunda gösterilir". Web de
            yalnız SEÇİMİ işaretliyor (`exam-player` `options`).
            Kilit de kalktı: hemen üstteki yorum "öğrenci son cevabını
            değiştirebiliyor" diyordu, oysa `disabled` buna izin vermiyordu —
            yazılı gerekçenin kodla çelişmesinin bir örneği daha.
          */}
          {q.options.map((o, oi) => {
            const secili = answers[qi] === oi;
            return (
              <PressableScale key={oi} onPress={() => setAnswers(answers.map((a, i) => (i === qi ? oi : a)))}
                accessibilityRole="radio" accessibilityState={{ selected: secili }}
                style={{ backgroundColor: secili ? colors.primarySoft : colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: secili ? colors.primary : colors.border, paddingVertical: 12, paddingHorizontal: spacing.md }}>
                <Text variant="body" color={secili ? colors.onPrimarySoft : colors.text}>{o}</Text>
              </PressableScale>
            );
          })}
        </Card>
      ))}
      {/* Kaçanlar bölüm bitince toplanıyor: her soru tek tek işaretlenmiyor,
          öğrenci son cevabını değiştirebiliyor (`answers` durumu) — şıklar
          artık gerçekten kilitlenmiyor, yukarıdaki nota bak. */}
      {allAnswered ? (
        <PressableScale onPress={() => {
          it.questions.forEach((q, i) => { const a = answers[i]; if (a !== null && a !== q.answer) onMiss(q, q.options[a]); });
          onDone(correctRef, it.questions.length);
        }} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.next")}</Text>
        </PressableScale>
      ) : null}
    </ScrollView>
  );
}

function Speak({ it, colors, pad, onDone }: { it: SpeakingItem; colors: Palette; pad: object; onDone: (ok: boolean, score: number) => void }) {
  const [phase, setPhase] = useState<"idle" | "rec" | "done" | "err">("idle");
  const [heard, setHeard] = useState("");
  const [tip, setTip] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  /*
   * SES ALINAMAZSA SINAV TIKANIYORDU.
   *
   * Hata dalında ekranda yalnız "Kaydet" düğmesi kalıyordu: mikrofon izni yok
   * ya da tanıyıcı hiçbir şey duymuyorsa kullanıcı o maddede SONSUZA KADAR
   * kalıyordu - ilerlemenin bir yolu yoktu, sınav orada bitiyordu. Web iki
   * denemeden sonra maddeyi atlatıyor ve neden atlandığını da yazıyor
   * (`exam.audio_failed_retry` / `exam.audio_failed_skip`). Atlanan madde
   * puanlanmıyor (0), sınav sürüyor.
   */
  const [tries, setTries] = useState(0);

  async function listen() {
    if (phase === "rec") return;
    setTries((n) => n + 1);
    if (!(await ensureMicPermission())) { setTip(t("speak.mic_needed")); setPhase("err"); return; }
    setPhase("rec"); setTip(null);
    const duyulan = await listenOnce(currentTargetLocale(), SPEAK_MAX_MS);
    if (!duyulan?.length) { setTip(t("speak.not_heard")); setPhase("err"); return; }
    setHeard(duyulan[0]);
    const tutti = spokenMatches(duyulan, [it.de]);
    setOk(tutti);
    if (!tutti) {
      const lowered = duyulan.map((h) => h.toLowerCase());
      setTip((it.confusions ?? []).find((c) => c.heard.some((x) => lowered.some((h) => h.includes(x.toLowerCase()))))?.fix ?? it.hint ?? null);
    }
    setPhase("done");
  }

  return (
    <ScrollView contentContainerStyle={pad}>
      <Card padded style={{ gap: spacing.sm }}>
        {it.situation ? <Text variant="caption" color={colors.textMuted}>{it.situation}</Text> : null}
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm }}>
          <Text variant="h3" style={{ flex: 1 }}>{it.de}</Text>
          <PressableScale accessibilityLabel={t("item.listen")} onPress={() => void speakTarget(it.de)} hitSlop={6}><SpeakerIcon color={colors.textMuted} size={20} /></PressableScale>
        </View>
        <Text variant="body" color={colors.textMuted}>{it.tr}</Text>
        {heard ? <Text variant="caption" color={colors.textMuted}>{t("speak.heard")}: {heard}</Text> : null}
        {phase === "done" ? (
          <>
            <Text variant="bodyStrong" color={ok ? colors.successText : colors.dangerText}>{ok ? t("speak.correct") : t("exam.speak_missed")}</Text>
            {/*
              ÖLÇÜLEN ŞEY SÖYLENİYOR. Bu bölüm cihazdaki tanıyıcının METNİNİ
              eşliyor (`spokenMatches`), yani "doğru kelimeleri söyledin mi";
              webin aynı bölümü klibi sağlayıcıya gönderip SÖYLEYİŞİ puanlıyor.
              İki ölçüm de aynı `speakingScore` alanına yazılıyor ve hangisinin
              yazıldığı kullanıcıya hiçbir yerde söylenmiyordu (web-parity
              §11.139; hangi ölçümün kalacağı ayrı bir karar).
            */}
            <Text variant="micro" color={colors.textFaint} style={{ lineHeight: 17 }}>{t("exam.speak_text_note")}</Text>
          </>
        ) : null}
        {/* İpucu/hata satırı YERİNDE çıkıyor — web `exam-player` ile aynı yer,
            aynı gerekçe: odak mikrofon düğmesinde kalıyor ve satırın geldiğini
            ekran okuyucu söylemiyordu. */}
        {tip ? <Text accessibilityLiveRegion="polite" variant="body" style={{ backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.sm, lineHeight: 20 }}>{tip}</Text> : null}
        {phase === "err" ? (
          <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 19 }}>{t(tries < 2 ? "exam.audio_failed_retry" : "exam.audio_failed_skip")}</Text>
        ) : null}
        {phase === "rec" ? (
          <Text variant="bodyStrong" color={colors.primaryText} style={{ textAlign: "center", paddingVertical: 14 }}>{t("speak.listening")}</Text>
        ) : phase === "done" ? (
          <PressableScale onPress={() => onDone(ok, ok ? 100 : 0)} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.next")}</Text>
          </PressableScale>
        ) : phase === "err" ? (
          <>
            {tries < 2 ? (
              <PressableScale onPress={() => void listen()} style={{ borderRadius: radii.lg, paddingVertical: 14, alignItems: "center", borderWidth: 1.5, borderColor: colors.border }}>
                <Text variant="bodyStrong" color={colors.text}>{t("common.try_again")}</Text>
              </PressableScale>
            ) : null}
            <PressableScale onPress={() => onDone(false, 0)} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.next")}</Text>
            </PressableScale>
          </>
        ) : (
          <PressableScale onPress={() => void listen()} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("speak.record")}</Text>
          </PressableScale>
        )}
      </Card>
    </ScrollView>
  );
}

function Write({ w, level, colors, pad, onDone }: { w: WritingItem; level: string; colors: Palette; pad: object; onDone: (ok: boolean, score: number) => void }) {
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  /** Rubrik, hatalar ve düzeltilmiş metin — kart bunu çiziyor. */
  const [detail, setDetail] = useState<AssessmentResult | null>(null);
  /** Premium kapısı notu — puan yerine bu gösterilir. */
  const [gateNote, setGateNote] = useState<string | null>(null);
  const wordCount = typed.trim() ? typed.trim().split(/\s+/).length : 0;

  async function evaluate() {
    if (busy || wordCount < MIN_ASSESS_WORDS) return;
    setBusy(true);
    try {
      const d = await api<{ result: AssessmentResult }>("/api/assess", {
        method: "POST",
        timeoutMs: ASSESS_TIMEOUT_MS,
        body: JSON.stringify({
          kind: "writing", level,
          task: { prompt: w.task.prompt, constraints: [...w.task.checklist, `en az ${w.task.minWords} kelime`] },
          answer: { text: typed.trim() },
          /* `day` YAZMA anahtarı (satır + günlük kota); gönderilmezse sunucunun
             UTC günü işliyor. Web `assess-client` baştan beri gönderiyor. */
          day: todayStr(),
        }),
      });
      /* SONUCUN TAMAMI SAKLANIYOR. Yalnız `overall` alınıyordu: öğrenci bir
         sayı görüp neyi yanlış yaptığını hiç öğrenmiyordu. Web aynı yerde
         değerlendirme kartını çiziyor (`exam-player` `AssessmentCard`). */
      setDetail(d.result ?? null);
      setScore(d.result?.score?.overall ?? null);
    } catch (e) {
      // Premium kapısı ağ hatası DEĞİL. Uydurma bir yedek puan vermek kapıyı
      // görünmez kılar: kullanıcı yapay zekâ değerlendirmesinin hakkının
      // bittiğini hiç öğrenmez ve aldığı puanın gerçek olduğunu sanır.
      if (isPremiumRefusal(e)) { notePremiumGate("writing"); setGateNote(t("assess.fail_premium")); setScore(null); }
      // Adil kullanım hakkının dolması da bir kapı: 429'u ağ hatası sayıp
      // kelime sayısından puan uydurmak, kullanıcıya gerçek olmayan bir not
      // vermek demekti - üstteki kapıda kaçınılan hatanın aynısı.
      else if (isQuotaRefusal(e)) { setGateNote(t("assess.fail_quota")); setScore(null); }
      // Sağlayıcı yoksa ya da ağ yoksa sınav durmaz: kelime sayısı ölçütüyle
      // geçici puan verilir, sunucu yine kendi sınırlarını uygular.
      //
      // AMA BU PUANIN GEÇİCİ OLDUĞU SÖYLENİYOR. Çıplak bir sayı gerçek bir
      // değerlendirme gibi okunuyordu: kullanıcı metninin okunduğunu sanıp
      // 70'i hak edilmiş sayıyordu. Web aynı yerde kural tabanlı yedeği
      // ÖLÇÜT LİSTESİYLE gösteriyor, yani yedek olduğu görünüyor; mobilde
      // görünmüyordu.
      /* Sebebi SÖYLENİYOR: metin çok uzunsa "kısalt", oturum düştüyse
         "yeniden giriş yap" - hepsi "servis kapalı" değil (bkz.
         `lib/assessFail`). Geçici puanın geçici olduğu satırı da koruyor. */
      else { setGateNote(`${t(assessFailKey(e))} ${t("assess.fail_offline")}`); setScore(wordCount >= w.task.minWords ? 70 : 40); }
    }
    setBusy(false);
  }

  return (
    <ScrollView contentContainerStyle={pad} keyboardShouldPersistTaps="handled">
      <Card padded style={{ gap: spacing.sm }}>
        <Text variant="bodyStrong" style={{ lineHeight: 23 }}>{w.task.prompt}</Text>
        {w.task.checklist.map((c, i) => (
          <Text key={i} variant="caption" color={colors.textMuted}>· {c}</Text>
        ))}
        <TextInput value={typed} onChangeText={setTyped} editable={score === null} multiline autoCapitalize="sentences"
          placeholder={t("exam.write_text")}
          accessibilityLabel={t("exam.write_text")} placeholderTextColor={colors.textFaint}
          style={{ minHeight: 140, textAlignVertical: "top", backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15 }} />
        {/* BİRİMİ YAZILI: sayaç "12 / 40" diyordu ve neyin sayıldığı
            (kelime mi, karakter mi) hiçbir yerde geçmiyordu. */}
        <Text variant="caption" color={colors.textMuted}>{t("exam.word_count", { n: wordCount, min: w.task.minWords })}</Text>
        {gateNote ? (
          // Kapı notu puanın YERİNE geçiyor: sahte bir yüzde göstermek,
          // değerlendirmenin yapıldığını sanmaya yol açardı.
          <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 19 }}>{gateNote}</Text>
        ) : score !== null ? (
          <>
            <Text variant="bodyStrong" color={score >= 60 ? colors.successText : colors.dangerText}>{formatPercent(score)}</Text>
            {detail ? <AssessmentCard answer={typed.trim()} result={detail} /> : null}
            <PressableScale onPress={() => onDone(score >= 60, score)} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.onPrimary}>{t("item.finish")}</Text>
            </PressableScale>
          </>
        ) : (
          <>
          {/* SEBEP YAZIYOR. Ustteki sayac GOREVIN alt sinirini soyluyor
              (40-120 kelime olabiliyor) ama dugmenin uydugu sayi BASKA -
              yapay zeka cagrisinin tabani. Iki sayinin ayni ekranda farkli
              olmasi "yazdim, niye acilmiyor" sorusunu doguruyordu. Sayi da
              artik elle yazili degil (`MIN_ASSESS_WORDS`, weble ayni). */}
          {wordCount < MIN_ASSESS_WORDS ? (
            <Text variant="caption" color={colors.textMuted}>{t("assess.gate_min_words", { n: MIN_ASSESS_WORDS })}</Text>
          ) : null}
          <PressableScale disabled={busy || wordCount < MIN_ASSESS_WORDS} onPress={() => void evaluate()}
            style={{ backgroundColor: wordCount >= MIN_ASSESS_WORDS && !busy ? colors.primary : colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={wordCount >= MIN_ASSESS_WORDS && !busy ? colors.onPrimary : colors.textFaint}>
              {busy ? t("exam.evaluating") : t("skillquiz.check")}
            </Text>
          </PressableScale>
          </>
        )}
      </Card>
    </ScrollView>
  );
}
