import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { t, formatPercent } from "../lib/i18n";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { ArrowBackIcon, SpeakerIcon, CheckIcon, XIcon, MicIcon } from "../ui/icons";
import { EmptyCard } from "../social/common";
import { useBackConfirm } from "../lib/useBackConfirm";
import { MIN_ASSESS_WORDS } from "../lib/learningRules";
import { speakAndWaitVoiced } from "../lib/tts";
import { voicesFor } from "../lib/voices";
import { ensureMicPermission, listenOnce, sttAvailable, stopListening } from "../lib/stt";
import { currentCourseId, currentTargetLocale } from "../lib/courses";
import {
  isOpenTask,
  mockBoolLabels,
  mockPaperById,
  mockSkillLabel,
  MOCK_PASS_PCT,
  taskSeconds,
  type MockCourse,
  type MockItem,
  type MockPart,
  type MockStimulus,
  type MockTask,
} from "../data/exams";
import {
  assessOpen,
  blankCount,
  failReason,
  finishAttempt,
  isItemCorrect,
  offlineScore,
  saveAttempt,
  startAttempt,
  type Attempt,
  type MockFeedback,
  type FailReason,
  type MockScore,
  type OpenScore,
} from "../game/mockExam";
import { clearLocalRun, loadLocalRun, pushLocalResult, saveLocalRun } from "../game/mockExamLocal";
import { notePremiumGate } from "../lib/premium";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, type Palette } from "../theme";

/**
 * Deneme sınavı oynatıcısı — TEK BÖLÜM, dijital oturum kurallarıyla.
 *
 * NEDEN BÖLÜM BÖLÜM. Bir A1 kâğıdı 80, bir C1 kâğıdı 205 dakika sürüyor.
 * Telefonda tek oturumda çözülecek bir şey değil ve gerçek sınavlar da
 * modüler: bölümler ayrı ayrı alınabiliyor.
 *
 * DİJİTAL OTURUM KURALLARI. Gerçek dijital sınavlarda saat BÖLÜM değil GÖREV
 * başına işler, süre dolunca bir sonraki göreve otomatik geçilir ve bitmiş
 * bir göreve GERİ DÖNÜLMEZ. Üçü de burada uygulanıyor. Bu bir kısıtlama
 * değil ölçümün parçası: geri dönebilen öğrenci zaman baskısını hiç
 * yaşamıyor ve deneme sınavı asıl işini yapmıyor.
 *
 * SESLİ YÖNERGE. Bölüm başında bölümün yönergesi, her görevin başında
 * görevin yönergesi Almanca okunuyor. Gerçek oturumda yönergeler kayıttan
 * gelir; okumadan geçen öğrenci sınavda da okumadan geçer.
 *
 * KONUŞMA. Fazlı: önce hazırlık sayacı, sonra konuşma. Karşılıklı görevlerde
 * karşı tarafın replikleri sesle okunuyor (TTS) ve cevap cihazın
 * tanıyıcısıyla yazıya çevriliyor (STT). SES SUNUCUYA GİTMİYOR, yalnız döküm
 * gidiyor ve değerlendirme onun üzerinden yapılıyor.
 *
 * ANLIK KAYIT, İKİ KATMANLI. Her cevap ÖNCE cihaza (`mockExamLocal`), sonra
 * sunucuya (`/api/mock-exam` save) yazılıyor. Uygulama kapansa, telefon
 * kilitlense, sunucuya ulaşılamasa bile sınav kaybolmuyor: yeniden girişte
 * kaldığı görevden ve kalan süreden devam ediliyor. Sunucu yetkili olmayı
 * sürdürüyor; cihazdaki kayıt bir yedek, ikinci bir doğruluk kaynağı değil.
 *
 * PUAN SUNUCUDA. İstemci cevapları gönderiyor, puanı sunucu kâğıdın
 * kendisiyle hesaplıyor. Sunucuya ulaşılamazsa cihazda hesaplanan bir sonuç
 * gösteriliyor; o sonuç da saklanıyor ama sunucu istatistiğine girmediği hem
 * ekranda hem listedeki rozette yazıyor.
 */

type Answers = Record<string, string>;

/** Boşluk işaretlerini okunur yer tutucuya çevirir: "{{3}}" → " (3) ______ ". */
function withBlanks(body: string): string {
  return body.replace(/\{\{(\d+)\}\}/g, (_m, n) => ` (${n}) ______ `);
}

/*
  Doğru/yanlış düğmelerinin etiketi ARAYÜZ SÖZLÜĞÜNDEN gelmiyor, kâğıttan
  geliyor. Sözlükteki `mockexam.richtig` anahtarı üç dilde de Almanca
  sabitlenmişti: İngilizce kâğıt "Richtig / Falsch" düğmeleriyle açılırdı.
  Bunlar arayüz metni değil sınav metni ve sınavın dilinde yazılmalı.
*/

function mmss(sec: number): string {
  const s = Math.max(0, sec);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Görev hedefi -> sözlük anahtarı — web `mock-exam-player` `GOAL_KEYS` ile aynı.
 *
 * Anahtar ELLE yazılıyordu (`` t(`mockexam.goal_${g.goal}`) ``) ve hedef
 * İÇERİKTEN geliyor, kapalı bir kümeden değil: sözlükte karşılığı olmayan bir
 * hedef geldiğinde ekran çeviri yerine ANAHTARIN KENDİSİNİ yazıyordu
 * ("mockexam.goal_xyz"). Web tanımadığı hedefte ham adı yazıyor; mobil de
 * artık öyle.
 */
const GOAL_KEYS: Record<string, string> = {
  gist: "mockexam.goal_gist",
  detail: "mockexam.goal_detail",
  opinion: "mockexam.goal_opinion",
  orientation: "mockexam.goal_orientation",
  instruction: "mockexam.goal_instruction",
  structure: "mockexam.goal_structure",
  production: "mockexam.goal_production",
  interaction: "mockexam.goal_interaction",
};

export function MockExamScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParams, "MockExam">>();
  const paper = mockPaperById(route.params.paperId);
  const part = paper?.parts.find((p) => p.skill === route.params.skill) ?? null;
  const budgets = useMemo(() => (part ? taskSeconds(part) : []), [part]);

  const [phase, setPhase] = useState<"kapak" | "gorev" | "sonuc">("kapak");
  const [ix, setIx] = useState(0);
  const [left, setLeft] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [open, setOpen] = useState<Record<string, string>>({});
  const [openScores, setOpenScores] = useState<Record<string, OpenScore>>({});
  const [plays, setPlays] = useState<Record<string, number>>({});
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [resumed, setResumed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ score: MockScore; ai: MockFeedback | null; offline: FailReason | null } | null>(null);
  // Sunucuya neden ulaşılamadığı: sınav başlarken öğreniliyor, sonuçta gösteriliyor.
  const [fail, setFail] = useState<FailReason | null>(null);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [quit, setQuit] = useState(false);
  /*
    DONANIM GERI TUSU DA ONAYA BAGLI. Basliktaki kapatma dugmesi "sinavi
    birak?" diye soruyor ve onaylanirsa cevaplari hem yerele hem sunucuya
    YAZIP cikiyor; geri tusu ise hicbir sey sormadan, hicbir sey yazmadan
    ekrani kapatiyordu. Ayni ekranda iki farkli cikis davranisi vardi ve
    kullanicinin dogal hareketi olan geri tusu, korunmayan olandi. Oteki uc
    sinav/tur ekrani zaten bu kancayi kullaniyor (`GameScreen`, `ExamScreen`,
    `PlacementScreen`, `WalkModeScreen`).

    Kayip iki saniyeyle sinirli (`saveLocalRun` her degisiklikten iki saniye
    sonra calisiyor) ama sorun kayip degil: SURELI bir sinavdan kazara
    cikmak. Web karsiligi `useLeaveGuard` ile ayni yolu kapatiyor.
  */
  const back = useBackConfirm(phase === "gorev");
  const [autoNext, setAutoNext] = useState(false);
  const scroller = useRef<React.ComponentRef<typeof ScrollView> | null>(null);
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; stopListening(); }, []);

  /* ── sesli yönerge ──────────────────────────────────────────────────────
   * YALNIZ dinleme ve konuşmada. Gerçek sınavda okuma ve yazma yönergesi
   * kâğıdın üstünde yazılıdır ve kimse onu yüksek sesle okumaz; dinleme
   * yönergesi ise kayıttan gelir, konuşmada da sınav görevlisi söyler.
   * Okurken sesli yönerge zaman kaybettiriyor ve okumayı bölüyordu.
   *
   * `announced` aynı yönergenin iki kez okunmasını engelliyor.
   */
  const voiced = part?.skill === "listening" || part?.skill === "speaking";
  const announced = useRef<Set<string>>(new Set());
  const announce = useCallback(async (key: string, text: string) => {
    if (!voiced || announced.current.has(key)) return;
    announced.current.add(key);
    const v = voicesFor(currentCourseId())[0];
    try { await speakAndWaitVoiced(text, v.id); } catch { /* ses yoksa sınav durmaz */ }
  }, [voiced]);

  /* ── saat: görev başına ─────────────────────────────────────────────── */
  useEffect(() => {
    if (phase !== "gorev") return;
    const id = setInterval(() => setLeft((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const advance = useCallback((auto: boolean) => {
    if (!part) return;
    setAutoNext(auto);
    if (ix >= part.tasks.length - 1) { setPhase("sonuc"); return; }
    const next = ix + 1;
    setIx(next);
    setLeft(budgets[next] ?? 60);
    scroller.current?.scrollTo({ y: 0, animated: false });
    void saveLocalRun(paper!.id, part.skill, { answers, open, taskIx: next, secondsLeft: budgets[next] ?? 60 });
    if (attempt) void saveAttempt(attempt.id, { answers, open, taskIx: next, secondsLeft: budgets[next] ?? 60 });
  }, [ix, part, paper, budgets, attempt, answers, open]);

  useEffect(() => {
    if (phase === "gorev" && left === 0) advance(true);
    // `left` sıfıra düştüğünde bir kez çalışsın diye bağımlılık dar tutuldu.
  }, [left, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── anlık kayıt ────────────────────────────────────────────────────────
   * Her cevap değişikliğinde iki saniye bekleyip gönderiyor: tuşa her
   * basışta istek atmak gereksiz, hiç atmamak ise sınavı kaybettirir.
   */
  useEffect(() => {
    if (phase !== "gorev" || !part) return;
    const id = setTimeout(() => {
      // Önce cihaz, sonra sunucu. Sunucu yoksa sınav yine kaybolmuyor.
      void saveLocalRun(paper!.id, part.skill, { answers, open, taskIx: ix, secondsLeft: left });
      if (attempt) void saveAttempt(attempt.id, { answers, open, taskIx: ix, secondsLeft: left });
    }, 2000);
    return () => clearTimeout(id);
  }, [answers, open, attempt, phase, ix]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── başlat / devam et ──────────────────────────────────────────────── */
  const begin = useCallback(async () => {
    if (!paper || !part || busy) return;
    setBusy(true);
    try {
      const d = await startAttempt(paper.id, part.skill);
      setAttempt(d.attempt);
      setResumed(d.resumed);
      setAnswers(d.attempt.answers ?? {});
      setOpen(d.attempt.open ?? {});
      setOpenScores(d.attempt.openScores ?? {});
      const startIx = Math.min(d.attempt.taskIx ?? 0, part.tasks.length - 1);
      setIx(startIx);
      setLeft(d.resumed && d.attempt.secondsLeft > 0 ? d.attempt.secondsLeft : budgets[startIx] ?? 60);
    } catch (err) {
      // Sunucuya ulaşılamadı. Sınav durmuyor ve YARIM KALAN cihazdaki kayıttan
      // sürüyor: bir sunucu koşulu yüzünden kırk beş dakika kaybedilmemeli.
      setAttempt(null);
      const why = failReason(err);
      setFail(why);
      // Kilide takılan an ölçülüyor (bkz. lib/premium `notePremiumGate`).
      if (why === "locked") notePremiumGate("mock_exam");
      const local = await loadLocalRun(paper.id, part.skill);
      if (local) {
        setResumed(true);
        setAnswers(local.answers ?? {});
        setOpen(local.open ?? {});
        const startIx = Math.min(local.taskIx ?? 0, part.tasks.length - 1);
        setIx(startIx);
        setLeft(local.secondsLeft > 0 ? local.secondsLeft : budgets[startIx] ?? 60);
      } else {
        setResumed(false);
        setIx(0);
        setLeft(budgets[0] ?? 60);
      }
    }
    setBusy(false);
    setPhase("gorev");
  }, [paper, part, busy, budgets]);

  /* ── bitir ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (phase !== "sonuc" || result || !part || !paper) return;
    let cancelled = false;
    void (async () => {
      setBusy(true);
      let final: { score: MockScore; ai: MockFeedback | null; offline: FailReason | null };
      if (attempt) {
        try {
          const d = await finishAttempt(attempt.id, answers);
          final = { score: d.score, ai: d.ai ?? null, offline: null };
        } catch (err) {
          final = { score: offlineScore(part, answers), ai: null, offline: failReason(err) };
        }
      } else {
        final = { score: offlineScore(part, answers), ai: null, offline: fail ?? "unreachable" };
      }
      // Sonuç her durumda cihaza yazılıyor ve yarım kalan kayıt siliniyor:
      // liste ekranı "bu bölümü çözdüm mü" sorusunu sunucu olmadan da
      // yanıtlayabilsin.
      await pushLocalResult({
        paperId: paper.id, skill: part.skill, level: paper.level,
        correct: final.score.correct, total: final.score.total, pct: final.score.pct,
        passed: final.score.passed, synced: final.offline == null,
      });
      await clearLocalRun(paper.id, part.skill);
      if (!cancelled) { setResult(final); setBusy(false); }
    })();
    return () => { cancelled = true; };
  }, [phase, result, part, paper, attempt, answers, fail]);

  /* ── dinleme ────────────────────────────────────────────────────────── */
  const play = useCallback(
    async (st: Extract<MockStimulus, { kind: "audio" }>) => {
      if (speaking) return;
      const used = plays[st.id] ?? 0;
      if (used >= st.plays) return;
      setPlays((p) => ({ ...p, [st.id]: used + 1 }));
      setSpeaking(st.id);
      const vs = voicesFor(currentCourseId());
      const who: string[] = [];
      for (const seg of st.segments) if (seg.speaker && !who.includes(seg.speaker)) who.push(seg.speaker);
      for (const seg of st.segments) {
        if (!alive.current) break;
        const i = seg.speaker ? who.indexOf(seg.speaker) : 0;
        await speakAndWaitVoiced(seg.text, (vs[i % vs.length] ?? vs[0]).id);
      }
      if (alive.current) setSpeaking(null);
    },
    [plays, speaking],
  );

  /*
    YANLIŞ SEBEP SÖYLENİYORDU. Bağlantıdaki kâğıt ya da bölüm bulunamadığında
    ekran "{level} seviyesi için henüz deneme sınavı yok" yazıyordu — hem
    sebep yanlış (kâğıtlar var, bu bağlantı bozuk), hem `paper` da bulunamadığı
    için seviye BOŞ basılıyordu: "  seviyesi için henüz deneme sınavı yok".
    Üstelik geri dönüş yolu yoktu; tek çıkış cihazın geri hareketiydi.

    Web bu yolda `notFound()` çağırıp 404 sayfasını çiziyor. Android'in kendi
    kalıbı `UserScreen`in "kullanıcı bulunamadı" kartı: X ikonu, tehlike
    tinti, sebep ve bir çıkış. Burada da o kullanılıyor.
  */
  if (!paper || !part) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, padding: spacing.lg, paddingTop: insets.top + spacing.xl }}>
        <EmptyCard
          live="assertive"
          icon={XIcon}
          tint={colors.danger}
          title={t("mockexam.paper_missing")}
          text={t("mockexam.paper_missing_sub")}
          action={t("mockexam.back_to_list")}
          onAction={() => nav.goBack()}
        />
      </View>
    );
  }

  const task = part.tasks[ix];
  const blanks = blankCount(part, answers);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale
          hitSlop={4}
          onPress={() => (phase === "gorev" ? setQuit(true) : nav.goBack())}
          accessibilityLabel={t("common.back")}
          style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}
        >
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="micro" color={colors.textMuted}>
            {paper.level} · {t("mockexams.paper", { n: paper.no })}
          </Text>
          <Text variant="h3">{mockSkillLabel(paper.course, part.skill)}</Text>
        </View>
        {phase === "gorev" ? (
          <View style={{ alignItems: "flex-end" }}>
            <Text variant="micro" color={colors.textMuted}>{t("mockexam.task_time")}</Text>
            <Text variant="bodyStrong" color={left < 30 ? colors.dangerText : colors.text}>{mmss(left)}</Text>
          </View>
        ) : null}
      </View>

      {phase === "gorev" ? <TaskBar part={part} ix={ix} colors={colors} /> : null}

      <ScrollView
        ref={(r) => { scroller.current = r; }}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {phase === "kapak" ? (
          <Cover
            paper={paper}
            part={part}
            colors={colors}
            busy={busy}
            onAnnounce={() => { if (voiced) void announce(`part:${part.skill}`, part.instruction); }}
            onStart={() => void begin()}
          />
        ) : phase === "gorev" ? (
          <>
            {autoNext ? (
              <Card padded style={{ marginBottom: spacing.sm, backgroundColor: colors.dangerSoft }}>
                <Text variant="caption" color={colors.dangerText}>{t("mockexam.auto_next")}</Text>
              </Card>
            ) : null}
            {resumed && ix === (attempt?.taskIx ?? 0) ? (
              <Card padded style={{ marginBottom: spacing.sm }}>
                <Text variant="caption" color={colors.textMuted}>{t("mockexam.resumed")}</Text>
              </Card>
            ) : null}
            <TaskView
              key={task.id}
              course={paper.course}
              task={task}
              index={ix}
              total={part.tasks.length}
              answers={answers}
              open={open}
              openScores={openScores}
              plays={plays}
              speaking={speaking}
              attemptId={attempt?.id ?? null}
              colors={colors}
              onAnnounce={() => { if (voiced) void announce(`task:${task.id}`, task.prompt); }}
              onAnswer={(id, v) => setAnswers((a) => ({ ...a, [id]: v }))}
              onOpen={(id, v) => setOpen((e) => ({ ...e, [id]: v }))}
              onOpenScore={(id, v) => setOpenScores((s) => ({ ...s, [id]: v }))}
              onPlay={play}
            />
          </>
        ) : busy || !result ? (
          /* Kagit puanlanirken sayfanin govdesi bu dala geciyor ve
             sessizdi; webin karsiligi duyuruyor. */
          <View accessibilityLiveRegion="polite" accessibilityRole="progressbar" accessibilityState={{ busy: true }} style={{ paddingTop: spacing.xxl, alignItems: "center" }}>
            <ActivityIndicator color={colors.primaryText} />
            <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("mockexam.scoring")}</Text>
          </View>
        ) : (
          <ResultView
            course={paper.course}
            part={part}
            answers={answers}
            open={open}
            openScores={openScores}
            score={result.score}
            ai={result.ai}
            offline={result.offline}
            reveal={reveal}
            colors={colors}
            onReveal={(id) => setReveal((r) => ({ ...r, [id]: true }))}
          />
        )}
      </ScrollView>

      {phase === "gorev" ? (
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.sm, backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.surface2 }}>
          <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.xs }}>{t("mockexam.no_back")}</Text>
          <Primary
            colors={colors}
            label={ix < part.tasks.length - 1 ? t("mockexam.next_task") : t("mockexam.submit")}
            onPress={() => advance(false)}
          />
        </View>
      ) : phase === "sonuc" && result ? (
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.sm, backgroundColor: colors.bg }}>
          <Primary colors={colors} label={t("mockexam.back_to_list")} onPress={() => nav.goBack()} />
        </View>
      ) : null}

      <ConfirmDialog
        visible={quit || back.visible}
        title={t("mockexam.quit_title")}
        message={`${t("mockexam.quit_body_saved")} ${blanks ? t("mockexam.unanswered", { n: blanks }) : ""}`.trim()}
        confirmLabel={t("mockexam.quit_ok")}
        destructive
        onConfirm={() => {
          setQuit(false);
          back.cancel();
          void saveLocalRun(paper.id, part.skill, { answers, open, taskIx: ix, secondsLeft: left });
          if (attempt) void saveAttempt(attempt.id, { answers, open, taskIx: ix, secondsLeft: left });
          nav.goBack();
        }}
        onCancel={() => { setQuit(false); back.cancel(); }}
      />
    </View>
  );
}

/* ── ortak parçalar ───────────────────────────────────────────────────────── */

function Primary({ colors, label, onPress, disabled }: { colors: Palette; label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      style={{ backgroundColor: disabled ? colors.surface2 : colors.primary, borderRadius: radii.lg, paddingVertical: spacing.md, alignItems: "center" }}
    >
      <Text variant="bodyStrong" color={disabled ? colors.textMuted : colors.onPrimary}>{label}</Text>
    </PressableScale>
  );
}

/** Görev şeridi: kaçıncı görevdeyiz, kaçı bitti. Geri dönüş yok, bu yüzden tıklanmıyor. */
function TaskBar({ part, ix, colors }: { part: MockPart; ix: number; colors: Palette }) {
  return (
    <View style={{ flexDirection: "row", gap: 4, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
      {part.tasks.map((tk, i) => (
        <View
          key={tk.id}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            backgroundColor: i < ix ? colors.success : i === ix ? colors.primary : colors.surface2,
          }}
        />
      ))}
    </View>
  );
}

function Cover({
  paper, part, colors, busy, onStart, onAnnounce,
}: {
  paper: NonNullable<ReturnType<typeof mockPaperById>>;
  part: MockPart;
  colors: Palette;
  busy: boolean;
  onStart: () => void;
  onAnnounce: () => void;
}) {
  // Bölüm yönergesi ekrana gelir gelmez okunuyor — gerçek oturumda da
  // yönerge kayıttan gelir.
  useEffect(() => { onAnnounce(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const points = part.tasks.reduce((a, x) => a + (isOpenTask(x) ? 0 : x.items.length), 0);
  return (
    <>
      <Card padded style={{ marginBottom: spacing.md }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
          <SpeakerIcon color={colors.primaryText} size={18} />
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.instructions")}</Text>
        </View>
        <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{part.instruction}</Text>
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm, lineHeight: 20 }}>{part.instructionTr}</Text>
      </Card>
      <Card padded style={{ marginBottom: spacing.md }}>
        <Text variant="bodyStrong">{paper.theme}</Text>
        <Text variant="caption" color={colors.textMuted}>{paper.themeTr}</Text>
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
          {points ? t("mockexams.part_summary", { minutes: part.minutes, n: points }) : t("mockexams.part_open", { minutes: part.minutes })}
        </Text>
      </Card>
      <Card padded style={{ marginBottom: spacing.lg }}>
        <Text variant="micro" color={colors.textMuted}>{t("mockexam.rules_title")}</Text>
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{t("mockexam.rules_body")}</Text>
      </Card>
      <Primary colors={colors} label={busy ? t("mockexam.starting") : t("mockexam.start")} onPress={onStart} disabled={busy} />
    </>
  );
}

/* ── görev ────────────────────────────────────────────────────────────────── */

function TaskView({
  course, task, index, total, answers, open, openScores, plays, speaking, attemptId, colors,
  onAnnounce, onAnswer, onOpen, onOpenScore, onPlay,
}: {
  course: MockCourse;
  task: MockTask;
  index: number;
  total: number;
  answers: Answers;
  open: Record<string, string>;
  openScores: Record<string, OpenScore>;
  plays: Record<string, number>;
  speaking: string | null;
  attemptId: number | null;
  colors: Palette;
  onAnnounce: () => void;
  onAnswer: (id: string, v: string) => void;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
  onPlay: (st: Extract<MockStimulus, { kind: "audio" }>) => void;
}) {
  useEffect(() => { onAnnounce(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const bools = mockBoolLabels(course, task.format);
  const grouped = (task.texts ?? []).length > 1 && task.items.some((i) => i.ref);
  const itemsOf = (ref?: string) => (grouped ? task.items.filter((i) => i.ref === ref) : task.items);

  return (
    <View>
      <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.xs }}>
        {t("mockexam.task_of", { n: index + 1, total })}
      </Text>
      <Card padded style={{ marginBottom: spacing.md }}>
        <Text variant="body" style={{ lineHeight: 22 }}>{task.prompt}</Text>
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{task.promptTr}</Text>
      </Card>

      {task.options?.length ? (
        <Card padded style={{ marginBottom: spacing.md }}>
          {task.options.map((o) => (
            <View key={o.key} style={{ marginBottom: spacing.sm }}>
              <Text variant="bodyStrong">{o.key}) {o.label}</Text>
              {o.body ? <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 20 }}>{o.body}</Text> : null}
            </View>
          ))}
        </Card>
      ) : null}

      {(task.texts ?? []).map((st) => (
        <View key={st.id}>
          <StimulusView st={st} colors={colors} plays={plays} speaking={speaking} onPlay={onPlay} />
          {grouped
            ? itemsOf(st.id).map((it) => (
                <ItemView key={it.id} item={it} task={task} bools={bools} value={answers[it.id]} answers={answers} colors={colors} onAnswer={onAnswer} />
              ))
            : null}
        </View>
      ))}

      {!grouped
        ? task.items.map((it) => (
            <ItemView key={it.id} item={it} task={task} bools={bools} value={answers[it.id]} answers={answers} colors={colors} onAnswer={onAnswer} />
          ))
        : null}

      {task.format === "writing" ? (
        <WritingTask task={task} value={open[task.id] ?? ""} score={openScores[task.id]} attemptId={attemptId} colors={colors} onOpen={onOpen} onOpenScore={onOpenScore} />
      ) : task.format === "speaking" ? (
        <SpeakingTask task={task} value={open[task.id] ?? ""} score={openScores[task.id]} attemptId={attemptId} colors={colors} onOpen={onOpen} onOpenScore={onOpenScore} />
      ) : null}
    </View>
  );
}

function StimulusView({
  st, colors, plays, speaking, onPlay,
}: {
  st: MockStimulus;
  colors: Palette;
  plays: Record<string, number>;
  speaking: string | null;
  onPlay: (st: Extract<MockStimulus, { kind: "audio" }>) => void;
}) {
  if (st.kind === "text") {
    return (
      <Card padded style={{ marginBottom: spacing.md }}>
        <Text variant="micro" color={colors.textMuted}>{st.genre} · {st.genreTr}</Text>
        {st.title ? <Text variant="bodyStrong" style={{ marginTop: spacing.xs }}>{st.title}</Text> : null}
        <Text variant="body" style={{ marginTop: spacing.sm, lineHeight: 24 }}>{withBlanks(st.body)}</Text>
      </Card>
    );
  }
  const used = plays[st.id] ?? 0;
  const rest = st.plays - used;
  const busy = speaking === st.id;
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <Text variant="micro" color={colors.textMuted}>{st.genre} · {st.genreTr}</Text>
      {st.title ? <Text variant="bodyStrong" style={{ marginTop: spacing.xs }}>{st.title}</Text> : null}
      <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{st.situation}</Text>
      <PressableScale
        onPress={() => onPlay(st)}
        disabled={rest <= 0 || busy}
        style={{
          marginTop: spacing.sm, flexDirection: "row", alignItems: "center", gap: spacing.sm, alignSelf: "flex-start",
          paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill,
          backgroundColor: rest > 0 ? colors.primarySoft : colors.surface2, opacity: rest > 0 ? 1 : 0.6,
        }}
      >
        {busy ? <ActivityIndicator color={colors.primaryText} size="small" /> : <SpeakerIcon color={rest > 0 ? colors.primaryText : colors.textMuted} size={20} />}
        <Text variant="bodyStrong" color={rest > 0 ? colors.primaryText : colors.textMuted}>
          {rest <= 0 ? t("mockexam.plays_done") : used === 0 ? t("mockexam.listen") : t("mockexam.listen_again")}
        </Text>
      </PressableScale>
      {rest > 0 ? (
        <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("mockexam.plays_left", { n: rest })}</Text>
      ) : null}
    </Card>
  );
}

function ItemView({
  item, task, bools, value, answers, colors, onAnswer,
}: {
  item: MockItem;
  task: MockTask;
  bools: [string, string];
  value?: string;
  answers: Record<string, string>;
  colors: Palette;
  onAnswer: (id: string, v: string) => void;
}) {
  /*
   * KULLANILMIŞ ŞIKLAR SOLUK. Eşleştirmede varsayılan kural "her şık en fazla
   * bir kez" ve `reuseOptions` o kuralı kaldırıyor (bkz. data/exams). Bayrak
   * içerikte yüzlerce görevde YAZILI ama iki oynatıcı da onu hiç okumuyordu:
   * bir şıkkı ikinci kez seçen öğrenci hatasını ancak sonuçta görüyordu.
   * Kâğıt sınavda bu bilgi zaten var - öğrenci kendi yazdıklarını aynı
   * sayfada görüyor; ekranda her madde ayrı satır olduğu için kayboluyor.
   *
   * Soluk şık YİNE BASILABİLİR: cevabı taşımak isteyen öğrenci engellenmemeli.
   */
  const usedKeys =
    item.kind === "match" && !task.reuseOptions
      ? new Set(task.items.filter((i) => i.id !== item.id).map((i) => answers[i.id]).filter(Boolean))
      : null;
  const chip = (label: string, active: boolean, onPress: () => void, key?: string, dim?: boolean) => (
    <PressableScale
      key={key ?? label}
      onPress={onPress}
      /* SEÇİLİ DURUMU DUYURULUYOR. Şık seçilince yalnız zemin ve kenarlık
         değişiyordu: ekran okuyucu kullanan öğrenci hangi şıkkı işaretlediğini
         hiçbir şekilde duymuyordu — sınavda cevabını doğrulayamamak demek.
         Aynı eksik iki platformda da vardı, ikisi birlikte kapatıldı.

         ROLÜ DE RADYO: "düğme, seçili" kaç şık olduğunu ve birini seçmenin
         ötekini bıraktığını söylemiyordu. Bu da iki platformda birden
         eksikti (bkz. parity 257). */
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      /* SOLUK OLMAK BİR BİLGİ: bu şık başka bir maddede kullanılmış.
         Opaklık bunu yalnız GÖZE söylüyordu; ekran okuyucu kullanan öğrenci
         aynı şıkkı ikinci kez seçtiğini ancak sonuçta görüyordu. İpucu
         eklendi (şık yine basılabilir — cevabı taşımak isteyen öğrenci
         engellenmemeli, bkz. yukarıdaki not). Web aynı satırı taşıyor. */
      accessibilityHint={dim ? t("mockexam.option_used") : undefined}
      style={{
        paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.md,
        backgroundColor: active ? colors.primarySoft : colors.surface2,
        borderWidth: 1, borderColor: active ? colors.primary : "transparent", marginBottom: spacing.xs,
        opacity: dim ? 0.45 : 1,
      }}
    >
      <Text variant="body" color={active ? colors.primaryText : colors.text}>{label}</Text>
    </PressableScale>
  );

  // React Native `Text` satır sonunu zaten koruyor; dönüştürme maddesinin
  // kaynak ve hedef cümlesi bu yüzden ayrı satırlarda çiziliyor. Anahtar
  // sözcük vurgulu ayrı bir satırda: değiştirilmeden kullanılması gerektiği
  // için gövdeye karışmamalı.
  return (
    <Card padded style={{ marginBottom: spacing.sm }}>
      <Text variant="bodyStrong" style={{ lineHeight: 22 }}>{item.no}. {item.text}</Text>
      {item.kind === "gap" && item.cue ? (
        <Text variant="bodyStrong" color={colors.primaryText} style={{ marginTop: spacing.xs, letterSpacing: 1 }}>{item.cue}</Text>
      ) : null}
      <View style={{ marginTop: spacing.sm }}>
        {item.kind === "mcq"
          ? item.options.map((o, ix) => chip(`${"abcd"[ix] ?? ix + 1}) ${o}`, value === String(ix), () => onAnswer(item.id, String(ix)), String(ix)))
          : item.kind === "bool"
            ? (
              <View style={{ flexDirection: "row", gap: spacing.sm }}>
                {chip(bools[0], value === "true", () => onAnswer(item.id, "true"))}
                {chip(bools[1], value === "false", () => onAnswer(item.id, "false"))}
              </View>
            )
            : item.kind === "match"
              ? (
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
                  {(task.options ?? []).map((o) => chip(o.key, value === o.key, () => onAnswer(item.id, o.key), o.key, usedKeys?.has(o.key) && value !== o.key))}
                </View>
              )
              : (
                <TextInput
                  value={value ?? ""}
                  onChangeText={(v) => onAnswer(item.id, v)}
                  placeholder={task.format === "transform" ? t("mockexam.write_transform") : t("mockexam.write_here")}
                  accessibilityLabel={task.format === "transform" ? t("mockexam.write_transform") : t("mockexam.write_here")}
                  placeholderTextColor={colors.textFaint}
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ borderRadius: radii.md, backgroundColor: colors.surface2, color: colors.text, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
                />
              )}
      </View>
    </Card>
  );
}

/* ── yazma ────────────────────────────────────────────────────────────────── */

function WritingTask({
  task, value, score, attemptId, colors, onOpen, onOpenScore,
}: {
  task: MockTask;
  value: string;
  score?: OpenScore;
  attemptId: number | null;
  colors: Palette;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
}) {
  const [busy, setBusy] = useState(false);
  const n = words(value);
  const need = task.rubric?.minWords ?? 0;

  async function evaluate() {
    if (busy || !attemptId || n < MIN_ASSESS_WORDS) return;
    setBusy(true);
    try {
      const d = await assessOpen(attemptId, task.id, value.trim());
      onOpenScore(task.id, d.result);
    } catch {
      onOpenScore(task.id, { score: null, reason: "offline" });
    }
    setBusy(false);
  }

  return (
    <Card padded style={{ marginTop: spacing.sm }}>
      <Text variant="micro" color={colors.textMuted}>{t("mockexam.content_points")}</Text>
      {(task.rubric?.points ?? []).map((p, i) => (
        <View key={i} style={{ marginTop: spacing.xs }}>
          <Text variant="body">• {p.de}</Text>
          <Text variant="caption" color={colors.textMuted}>{p.tr}</Text>
        </View>
      ))}
      <TextInput
        value={value}
        onChangeText={(v) => onOpen(task.id, v)}
        multiline
        /* Hedef dilde CUMLE: cumle basi buyuk, duzeltme kapali. Web ayni
           alanda `sentences` + `autoCorrect="off"` diyor. */
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder={t("mockexam.write_here")}
        accessibilityLabel={t("mockexam.write_here")}
        placeholderTextColor={colors.textFaint}
        style={{ marginTop: spacing.md, minHeight: 180, borderRadius: radii.md, backgroundColor: colors.surface2, color: colors.text, padding: spacing.md, textAlignVertical: "top" }}
      />
      <Text variant="micro" color={need && n < need ? colors.textMuted : colors.successText} style={{ marginTop: spacing.xs }}>
        {need ? `${n} / ${need} ${t("mockexam.words_unit")}` : `${n} ${t("mockexam.words_unit")}`}
      </Text>

      {score ? (
        <OpenResult score={score} colors={colors} />
      ) : (
        <>
          {/* SEBEP YAZIYOR (bkz. `ExamScreen`): ustteki sayac gorevin alt
              sinirini soyluyor, dugmenin uydugu sayi baskaydi. */}
          {n < MIN_ASSESS_WORDS ? (
            <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("assess.gate_min_words", { n: MIN_ASSESS_WORDS })}</Text>
          ) : null}
          <PressableScale
            onPress={() => void evaluate()}
            disabled={busy || !attemptId || n < MIN_ASSESS_WORDS}
            style={{ marginTop: spacing.md, alignSelf: "flex-start", paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.primarySoft, opacity: busy || !attemptId || n < MIN_ASSESS_WORDS ? 0.5 : 1 }}
          >
            <Text variant="bodyStrong" color={colors.primaryText}>{busy ? t("mockexam.evaluating") : t("mockexam.evaluate")}</Text>
          </PressableScale>
        </>
      )}
      {!attemptId ? <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("mockexam.ai_needs_server")}</Text> : null}
    </Card>
  );
}

function OpenResult({ score, colors }: { score: OpenScore; colors: Palette }) {
  if (score.score == null) {
    return <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md, lineHeight: 20 }}>{t("mockexam.ai_off")}</Text>;
  }
  return (
    <View style={{ marginTop: spacing.md }}>
      {/* GEÇME NOTU SABİTTEN. Renk eşiği "60" diye elle yazılıydı ve
          `MOCK_PASS_PCT`in kopyasıydı: geçme notu değişirse (admin panelinden
          değiştirilebiliyor, bkz. `premium/gates` `unlockPct`) renk "geçti"
          demeye devam ederdi. Dört yerde aynı kopya vardı. */}
      <Text variant="h3" color={score.score >= MOCK_PASS_PCT ? colors.successText : colors.dangerText}>{formatPercent(score.score)}</Text>
      {score.praise ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{score.praise}</Text> : null}
      {score.tip ? <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{score.tip}</Text> : null}
      {(score.errors ?? []).slice(0, 5).map((e, i) => (
        <Text key={i} variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>
          {e.wrong} → {e.right}{e.why_tr ? ` · ${e.why_tr}` : ""}
        </Text>
      ))}
    </View>
  );
}

/* ── konuşma ──────────────────────────────────────────────────────────────── */

/**
 * Konuşma görevi — fazlı.
 *
 * Tek kişilik görevde: hazırlık sayacı → konuşma (tanıyıcı açık) → döküm.
 * Karşılıklı görevde: karşı tarafın repliği sesle okunur, sıra sana gelince
 * mikrofon açılır ve söylediklerin yazıya çevrilir. Adımlar kendiliğinden
 * ilerler; gerçek dijital oturumda da fazlar otomatik akar.
 */
function SpeakingTask({
  task, value, score, attemptId, colors, onOpen, onOpenScore,
}: {
  task: MockTask;
  value: string;
  score?: OpenScore;
  attemptId: number | null;
  colors: Palette;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
}) {
  const [step, setStep] = useState<"waiting" | "prep" | "speaking" | "done">("waiting");
  const [turn, setTurn] = useState(0);
  const [count, setCount] = useState(0);
  const [heard, setHeard] = useState<string[]>([]);
  const [micOk, setMicOk] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; stopListening(); }, []);

  const exchange = task.exchange ?? [];
  const prep = task.prepSeconds ?? 60;

  // Hazırlık sayacı.
  useEffect(() => {
    if (step !== "prep") return;
    if (count <= 0) { void run(); return; }
    const id = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [step, count]); // eslint-disable-line react-hooks/exhaustive-deps

  async function begin() {
    const ok = await ensureMicPermission();
    setMicOk(ok);
    if (!ok) return;
    if (!(await sttAvailable(currentTargetLocale()))) { setMicOk(false); return; }
    setCount(prep);
    setStep("prep");
  }

  /** Hazırlık bitince: tek kişilikse doğrudan konuş, karşılıklıysa adımları yürüt. */
  async function run() {
    setStep("speaking");
    const said: string[] = [];
    const vs = voicesFor(currentCourseId());
    const partnerVoice = (vs[1] ?? vs[0]).id;

    if (!exchange.length) {
      const secs = task.speakSeconds ?? 120;
      setTurn(0);
      const got = await listenOnce(currentTargetLocale(), secs * 1000);
      if (got?.[0]) said.push(got[0]);
    } else {
      for (const [i, tn] of exchange.entries()) {
        if (!alive.current) return;
        setTurn(i);
        if (tn.who === "partner") {
          try { await speakAndWaitVoiced(tn.de, partnerVoice); } catch { /* ses yoksa yazıdan okunur */ }
        } else {
          const got = await listenOnce(currentTargetLocale(), tn.seconds * 1000);
          said.push(`(${tn.expect}) ${got?.[0] ?? ""}`.trim());
        }
      }
    }
    if (!alive.current) return;
    setHeard(said);
    onOpen(task.id, said.join("\n"));
    setStep("done");
  }

  /* Dokum kac KELIME: kapi karakter saymiyor artik (bkz. dugmenin yanindaki
     not). */
  const dokumSozcuk = (() => {
    const t2 = (value || heard.join("\n")).trim();
    return t2 ? t2.split(/\s+/).filter(Boolean).length : 0;
  })();

  async function evaluate() {
    const text = (value || heard.join("\n")).trim();
    if (busy || !attemptId || dokumSozcuk < MIN_ASSESS_WORDS) return;
    setBusy(true);
    try {
      const d = await assessOpen(attemptId, task.id, text);
      onOpenScore(task.id, d.result);
    } catch {
      onOpenScore(task.id, { score: null, reason: "offline" });
    }
    setBusy(false);
  }

  const current = exchange[turn];
  return (
    <Card padded style={{ marginTop: spacing.sm }}>
      <Text variant="micro" color={colors.textMuted}>{t("mockexam.content_points")}</Text>
      {(task.rubric?.points ?? []).map((p, i) => (
        <View key={i} style={{ marginTop: spacing.xs }}>
          <Text variant="body">• {p.de}</Text>
          <Text variant="caption" color={colors.textMuted}>{p.tr}</Text>
        </View>
      ))}

      {step === "waiting" ? (
        <>
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md, lineHeight: 20 }}>
            {exchange.length
              ? t("mockexam.exchange_intro", { n: exchange.filter((x) => x.who === "you").length, prep })
              : t("mockexam.solo_intro", { prep, speak: task.speakSeconds ?? 120 })}
          </Text>
          <PressableScale
            onPress={() => void begin()}
            style={{ marginTop: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.sm, alignSelf: "flex-start", paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.primarySoft }}
          >
            <MicIcon color={colors.primaryText} size={20} />
            <Text variant="bodyStrong" color={colors.primaryText}>{t("mockexam.speak_start")}</Text>
          </PressableScale>
          {/*
            MİKROFONSUZ YOL. Konuşma görevinin tek girişi mikrofondu: izni
            reddeden ya da cihazında tanıma çalışmayan kullanıcı
            "mikrofon gerekli" uyarısında KALIYORDU - bölümü hiç bitiremiyor,
            oysa yazılı döküm yolu aynı bileşende zaten var (`done` adımı) ve
            değerlendirme metin üzerinden çalışıyor. Web ikinci bir düğmeyle
            o yolu açıyor.
          */}
          <PressableScale
            onPress={() => setStep("done")}
            style={{ marginTop: spacing.sm, alignSelf: "flex-start", paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.surface2 }}
          >
            <Text variant="bodyStrong" color={colors.text}>{t("mockexam.write_without_mic")}</Text>
          </PressableScale>
          {micOk === false ? <Text variant="caption" color={colors.dangerText} style={{ marginTop: spacing.xs }}>{t("mockexam.mic_needed")}</Text> : null}
        </>
      ) : step === "prep" ? (
        <View style={{ marginTop: spacing.md, alignItems: "center" }}>
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.prep")}</Text>
          <Text variant="h1" color={colors.primaryText}>{mmss(count)}</Text>
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: "center", lineHeight: 20 }}>{t("mockexam.prep_hint")}</Text>
        </View>
      ) : step === "speaking" ? (
        <View style={{ marginTop: spacing.md }}>
          {current?.who === "partner" ? (
            <>
              <Text variant="micro" color={colors.textMuted}>{t("mockexam.partner")}</Text>
              <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{current.de}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{current.tr}</Text>
            </>
          ) : (
            <View style={{ alignItems: "center" }}>
              <MicIcon color={colors.dangerText} size={28} />
              <Text variant="bodyStrong" color={colors.dangerText} style={{ marginTop: spacing.xs }}>{t("mockexam.speak_now")}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: "center", lineHeight: 20 }}>
                {current?.who === "you" ? current.hint : t("mockexam.solo_hint")}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <>
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("mockexam.transcript_you")}</Text>
          <TextInput
            value={value}
            onChangeText={(v) => onOpen(task.id, v)}
            multiline
            autoCapitalize="sentences"
            autoCorrect={false}
            placeholder={t("mockexam.transcript_placeholder")}
            accessibilityLabel={t("mockexam.transcript_placeholder")}
            placeholderTextColor={colors.textFaint}
            style={{ marginTop: spacing.xs, minHeight: 120, borderRadius: radii.md, backgroundColor: colors.surface2, color: colors.text, padding: spacing.md, textAlignVertical: "top" }}
          />
          {/* Mikrofon açılamadıysa sebebi ve çıkış yolu ayrı söyleniyor —
              genel döküm notu o durumda yanlış şeyi anlatıyor. Web aynı ayrımı
              yapıyor (`mic_failed` / `transcript_note`). */}
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 18 }}>{t(micOk === false ? "mockexam.mic_failed" : "mockexam.transcript_note")}</Text>
          {score ? (
            <OpenResult score={score} colors={colors} />
          ) : (
            <>
              {/* KONUSMA DOKUMUNUN DE TABANI VAR. Burada hic kapi yoktu: bos
                  ya da tek kelimelik bir dokume puan istenebiliyordu ve
                  donen puan hicbir sey olcmuyordu. Webde kapi vardi ama
                  KARAKTER sayiyordu (`length < 5`): "ja ja" geciyor,
                  "Entschuldigung" gecmiyordu. Iki taraf artik ayni kelime
                  tabanini kullaniyor. */}
              {dokumSozcuk < MIN_ASSESS_WORDS ? (
                <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("assess.gate_min_words", { n: MIN_ASSESS_WORDS })}</Text>
              ) : null}
              <PressableScale
                onPress={() => void evaluate()}
                disabled={busy || !attemptId || dokumSozcuk < MIN_ASSESS_WORDS}
                style={{ marginTop: spacing.md, alignSelf: "flex-start", paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.primarySoft, opacity: busy || !attemptId || dokumSozcuk < MIN_ASSESS_WORDS ? 0.5 : 1 }}
              >
                <Text variant="bodyStrong" color={colors.primaryText}>{busy ? t("mockexam.evaluating") : t("mockexam.evaluate")}</Text>
              </PressableScale>
            </>
          )}
          {!attemptId ? <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("mockexam.ai_needs_server")}</Text> : null}
        </>
      )}
    </Card>
  );
}

/* ── sonuç ────────────────────────────────────────────────────────────────── */

function ResultView({
  course, part, answers, open, openScores, score, ai, offline, reveal, colors, onReveal,
}: {
  course: MockCourse;
  part: MockPart;
  answers: Answers;
  open: Record<string, string>;
  openScores: Record<string, OpenScore>;
  score: MockScore;
  ai: MockFeedback | null;
  offline: FailReason | null;
  reveal: Record<string, boolean>;
  colors: Palette;
  onReveal: (id: string) => void;
}) {
  return (
    <View>
      {offline ? (
        <Card padded style={{ marginBottom: spacing.md, backgroundColor: colors.dangerSoft }}>
          <Text variant="caption" color={colors.dangerText} style={{ lineHeight: 20 }}>{t(`mockexam.fail_${offline}`)}</Text>
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 18 }}>{t("mockexam.saved_locally")}</Text>
        </Card>
      ) : null}

      {score.total > 0 ? (
        <Card padded style={{ marginBottom: spacing.md }}>
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.result")}</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: spacing.xs }}>
            <Text variant="h1" color={score.passed ? colors.successText : colors.dangerText}>{formatPercent(score.pct)}</Text>
            <Text variant="bodyStrong">{t("mockexam.score", { correct: score.correct, total: score.total })}</Text>
          </View>
          <Text accessibilityLiveRegion="polite" variant="bodyStrong" color={score.passed ? colors.successText : colors.dangerText} style={{ marginTop: spacing.sm }}>
            {score.passed ? t("mockexam.passed") : t("mockexam.failed")}
          </Text>
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.pass_note", { pct: MOCK_PASS_PCT })}</Text>
        </Card>
      ) : (
        <Card padded style={{ marginBottom: spacing.md }}>
          <Text variant="body" style={{ lineHeight: 22 }}>{t("mockexam.not_scored")}</Text>
        </Card>
      )}

      {score.byGoal.length ? (
        <Card padded style={{ marginBottom: spacing.md }}>
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.by_goal")}</Text>
          {score.byGoal.map((g) => {
            const pct = g.total ? Math.round((100 * g.correct) / g.total) : 0;
            return (
              <View key={g.goal} style={{ marginTop: spacing.sm }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text variant="body">{GOAL_KEYS[g.goal] ? t(GOAL_KEYS[g.goal]) : g.goal}</Text>
                  <Text variant="bodyStrong" color={pct >= 70 ? colors.successText : pct >= 50 ? colors.text : colors.dangerText}>
                    {g.correct}/{g.total}
                  </Text>
                </View>
                <View style={{ height: 4, borderRadius: 2, backgroundColor: colors.surface2, marginTop: 4 }}>
                  <View style={{ height: 4, borderRadius: 2, width: `${pct}%`, backgroundColor: pct >= 70 ? colors.success : pct >= 50 ? colors.primary : colors.danger }} />
                </View>
              </View>
            );
          })}
        </Card>
      ) : null}

      {ai ? (
        <Card padded style={{ marginBottom: spacing.md }}>
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.todo")}</Text>
          <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{ai.summary}</Text>
          {ai.strengths.length ? (
            <Text variant="caption" color={colors.successText} style={{ marginTop: spacing.sm, lineHeight: 20 }}>
              {t("mockexam.strengths")}: {ai.strengths.join(" · ")}
            </Text>
          ) : null}
          {ai.todo.map((td, i) => (
            <View key={i} style={{ marginTop: spacing.md, borderLeftWidth: 2, borderLeftColor: colors.primary, paddingLeft: spacing.md }}>
              <Text variant="bodyStrong">{i + 1}. {td.title}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2, lineHeight: 20 }}>{td.why}</Text>
              <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{td.how}</Text>
            </View>
          ))}
          {ai.source === "rules" ? (
            <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.md, lineHeight: 18 }}>{t("mockexam.source_rules")}</Text>
          ) : null}
        </Card>
      ) : null}

      <Text variant="h3" style={{ marginBottom: spacing.sm }}>{t("mockexam.review")}</Text>

      {part.tasks.map((task) => (
        <View key={task.id} style={{ marginBottom: spacing.md }}>
          <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.xs }}>Teil {task.no}</Text>

          {isOpenTask(task) && task.rubric ? (
            <Card padded>
              {(open[task.id] ?? "").trim() ? (
                <>
                  <Text variant="micro" color={colors.textMuted}>{t("mockexam.your_answer")}</Text>
                  <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{open[task.id]}</Text>
                </>
              ) : null}
              {openScores[task.id] ? <OpenResult score={openScores[task.id]} colors={colors} /> : null}
              <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("mockexam.criteria")}</Text>
              {task.rubric.criteria.map((c, i) => (
                <Text key={i} variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>• {c}</Text>
              ))}
              {reveal[task.id] ? (
                <>
                  <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("mockexam.model_answer")}</Text>
                  <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{task.rubric.sample}</Text>
                </>
              ) : (
                <PressableScale
                  onPress={() => onReveal(task.id)}
                  style={{ marginTop: spacing.md, alignSelf: "flex-start", paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.surface2 }}
                >
                  <Text variant="bodyStrong">{t("mockexam.show_model")}</Text>
                </PressableScale>
              )}
            </Card>
          ) : (
            task.items.map((it) => {
              const ok = isItemCorrect(it, answers[it.id]);
              const scored = score.items.find((s) => s.id === it.id);
              const bools = mockBoolLabels(course, task.format);
              const given = answers[it.id];
              const givenLabel = !given
                ? t("mockexam.blank")
                : it.kind === "mcq"
                  ? it.options[Number(given)] ?? given
                  : it.kind === "bool"
                    ? given === "true" ? bools[0] : bools[1]
                    : given;
              return (
                <Card key={it.id} padded style={{ marginBottom: spacing.sm }}>
                  <View style={{ flexDirection: "row", gap: spacing.sm }}>
                    <View style={{ width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: ok ? colors.successSoft : colors.dangerSoft }}>
                      {ok ? <CheckIcon color={colors.successText} size={16} /> : <XIcon color={colors.dangerText} size={16} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyStrong" style={{ lineHeight: 22 }}>{it.no}. {it.text}</Text>
                      {/* Anahtar sözcük dökümde de görünmeli: açıklama ona gönderme yapıyor. */}
                      {it.kind === "gap" && it.cue ? (
                        <Text variant="bodyStrong" color={colors.primaryText} style={{ marginTop: spacing.xs, letterSpacing: 1 }}>{it.cue}</Text>
                      ) : null}
                      {!ok ? (
                        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs }}>
                          {t("mockexam.your_answer")}: {givenLabel}
                        </Text>
                      ) : null}
                      <Text variant="caption" color={ok ? colors.successText : colors.text} style={{ marginTop: spacing.xs }}>
                        {t("mockexam.correct_answer")}: {scored?.expected ?? ""}
                      </Text>
                      <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{it.explain}</Text>
                    </View>
                  </View>
                </Card>
              );
            })
          )}

          {(task.texts ?? []).map((st) =>
            st.kind === "audio" ? (
              <Card key={st.id} padded style={{ marginBottom: spacing.sm }}>
                <Text variant="micro" color={colors.textMuted}>{t("mockexam.transcript")} · {st.genreTr}</Text>
                {st.segments.map((s, i) => (
                  <Text key={i} variant="caption" style={{ marginTop: spacing.xs, lineHeight: 20 }}>
                    {s.speaker ? `${s.speaker}: ` : ""}{s.text}
                  </Text>
                ))}
                {st.gloss?.length ? <Glossary gloss={st.gloss} colors={colors} /> : null}
              </Card>
            ) : st.gloss?.length ? (
              <Card key={st.id} padded style={{ marginBottom: spacing.sm }}>
                <Glossary gloss={st.gloss} colors={colors} />
              </Card>
            ) : null,
          )}
        </View>
      ))}
    </View>
  );
}

function Glossary({ gloss, colors }: { gloss: { de: string; tr: string }[]; colors: Palette }) {
  return (
    <>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{t("mockexam.glossary")}</Text>
      {gloss.map((g, i) => (
        <Text key={i} variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>
          {g.de} — {g.tr}
        </Text>
      ))}
    </>
  );
}
