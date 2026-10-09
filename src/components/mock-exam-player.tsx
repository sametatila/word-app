"use client";

import { ReportFlag, ReportLink, snapshot } from "@/components/report-flag";
import { fillStyle } from "@/lib/motion";
import { apiFetch, AI_CONSENT_DECLINED } from "@/lib/api-fetch";
import { askAiConsentUpfront, type AiConsentPurpose } from "@/lib/ai-consent-client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { dialogueSegments, prefetchSegments, speakSegments, stopSpeaking } from "@/components/speak-button";
import { SpeakerIcon, SkillSpeakingIcon, CorrectIcon, WrongIcon, MockExamIcon, DurationIcon, NoGoingBackIcon, ResumeIcon, WarningIcon, OfflineIcon } from "@/components/icons";
import { FlowColumn, FlowActions, FlowNote, CoverBody, StateBody, ResultHero, StatRow, DetailCard } from "@/components/flow";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { ReportDialog } from "@/components/report-dialog";
import { AiNotice } from "@/components/ai-notice";
import { MIN_ASSESS_WORDS } from "@/lib/assess-const";
import { RoundExit } from "@/components/round-exit";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { captureSpeech, recognitionCtor, type SpeechCapture } from "@/components/microphone";
import { localeOf } from "@/components/skills/player-context";
import { taskSeconds, type MockItem, type MockPaper, type MockPart, type MockStimulus, type MockTask } from "@/lib/mock-exams";
import { MOCK_PASS_PCT, mockBoolLabels, mockPartLabel, mockSkillLabel, type MockCourse } from "@/lib/mock-exams/types";
import { isOpenTask } from "@/lib/mock-exams/scoring";
import { castFor, type VoiceId } from "@/lib/tts/voices";
import { useLang, useT } from "@/lib/i18n/client";
import { track } from "@/lib/track";
import { formatPercent } from "@/lib/i18n/dict";
import { play } from "@/lib/sfx";
import { IconLine, lineInset } from "@/components/icon-line";

/**
 * Deneme sınavı oynatıcısı — web.
 *
 * Mobil oynatıcıyla AYNI oturum kuralları: saat görev başına işler, süre
 * dolunca bir sonraki göreve otomatik geçilir, bitmiş bir göreve geri
 * dönülmez. Yönergeler sesle okunur, cevaplar sunucuya anlık kaydedilir ve
 * puan sunucuda hesaplanır (`/api/mock-exam`).
 *
 * Konuşmada iki uç da cihazdaki tanıyıcıyı kullanıyor: mobilde cihazın STT'si,
 * burada tarayıcının kendi tanıyıcısı (`captureSpeech`). Ses sunucuya
 * gitmiyor; tanıyıcısı olmayan tarayıcıda cevap yazılıyor. Değerlendirmeye
 * giden şey iki uçta da aynı: dökümün kendisi.
 */

type Answers = Record<string, string>;
type OpenScore = {
  score: number | null;
  tip?: string;
  praise?: string;
  /**
   * Düzeltmenin adı sunucuda `fix` (değerlendirme şeması); uç eski
   * istemciler için `right` adıyla da gönderiyor (denetim T14). İkisi de
   * okunuyor: biri eksik gelse de doğru biçim boş kalmıyor.
   */
  errors?: { wrong?: string; right?: string; fix?: string; why_tr?: string }[];
  /**
   * Puan yok çünkü yapay zekâya izin verilmedi (metin gönderilmedi) — yalnız
   * istemcide, kaydedilmiyor. "Yapay zekâ kullanılamıyor" cümlesi bu durumda
   * yanlış teşhis olurdu.
   */
  consent?: boolean;
  /** Sunucunun kaydettiği puansız sonucun sebebi (sağlayıcı yok, kota…). */
  reason?: string;
};
type Attempt = { id: number; answers: Answers; open: Record<string, string>; openScores: Record<string, OpenScore>; taskIx: number; secondsLeft: number; plays: Record<string, number> };
type Todo = { title: string; why: string; how: string };
type Feedback = { summary: string; strengths: string[]; todo: Todo[]; source: "ai" | "rules" | "perfect" };
/** `explain` sonuçla geliyor: kâğıt gerekçe taşımadan iniyor (`lib/mock-exams/deliver`). */
type ScoredItem = { id: string; no: number; goal: string; correct: boolean; given: string; expected: string; explain?: string };
type Score = {
  correct: number; total: number; pct: number; passed: boolean;
  byGoal: { goal: string; correct: number; total: number }[];
  items: ScoredItem[];
  /**
   * Yazma/konuşma bölümünde puanın dökümü (sunucu `scoreSection`, denetim
   * T15); okuma ve dinlemede yok. Varsa `correct/total` madde değil yüzde
   * (x/100) ve sonuç "kaç madde" yerine "kaç görev" diyor. Mobil
   * `game/mockExam` `MockScore.open` ile aynı biçim.
   */
  open?: {
    tasks: { taskId: string; taskNo: number; goal: string; format: string; state: "objective" | "scored" | "empty" | "unscored"; pct: number | null }[];
    scored: number;
    empty: number;
    unscored: number;
  };
};

/** Ölçüm hedefleri — mobilin `mockexam.goal_*` anahtarlarıyla aynı küme. */
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

const mmss = (s: number) => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, "0")}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/** Puanı yok ya da yalnız tarayıcıda düşmüş (ağ; izin reddi değil) açık görev — bitirişte değerlendirilecek. */
const needsScore = (sc: OpenScore | undefined) => sc === undefined || (sc.score == null && sc.reason === undefined && !sc.consent);

/**
 * Metni olan ama puanı olmayan açık görevleri birlikte değerlendirir; yeni
 * puanlar görev kimliğiyle döner. Düşen değerlendirme sessizce atlanıyor:
 * bitiş yine yapılıyor, o görev eskisi gibi "puan almadı" görünüyor.
 * Mobil `MockExamScreen` `assessPending` aynı kural.
 */
async function assessPending(attemptId: number, part: MockPart, open: Record<string, string>, scores: Record<string, OpenScore>): Promise<Record<string, OpenScore>> {
  const bekleyen = part.tasks.filter((tk) => isOpenTask(tk) && needsScore(scores[tk.id]) && words(open[tk.id] ?? "") >= MIN_ASSESS_WORDS);
  const sonuc = await Promise.allSettled(bekleyen.map((tk) => post<{ result: OpenScore }>({ action: "assess", id: attemptId, taskId: tk.id, text: (open[tk.id] ?? "").trim() })));
  const yeni: Record<string, OpenScore> = {};
  sonuc.forEach((r, i) => { if (r.status === "fulfilled") yeni[bekleyen[i].id] = r.value.result; });
  return yeni;
}
const withBlanks = (b: string) => b.replace(/\{\{(\d+)\}\}/g, (_m, n) => ` (${n}) ______ `);

/**
 * Kâğıdın dilinde tek bir replik okur.
 *
 * Eskiden `speakGerman` çağrılıyordu ve o, sesi KULLANICININ seçtiği kursa
 * göre seçiyor. Kâğıt ile profil ayrıldığı anda (Almanca kursundaki biri
 * İngilizce kâğıt açtığında) yönerge yanlış dilde okunurdu. Ses artık kâğıda
 * bağlı: sınavda ne yazıyorsa o okunuyor.
 */
function sayIn(course: MockCourse, text: string, onEnd?: () => void, voice?: VoiceId): void {
  speakSegments([{ lang: course, text, voice }], onEnd);
}

/**
 * Konuşma bölümünün KARŞI TARAFI — sınav anonsundan ayrı bir ses.
 *
 * Gerçek sözlü sınavda yönergeyi okuyan görevli ile karşındaki konuşmacı
 * aynı kişi değil; tek sesle okununca öğrenci "bu bana mı söyleniyor yoksa
 * sınavın yönergesi mi" ayrımını kulakla yapamıyor. Kadronun erkek sesi
 * seçiliyor: kullanıcı tercihinden bağımsız, yani bütün kullanıcılarda tek
 * önbellek girdisi (mobil `MockExamScreen` de aynı ayrımı yapıyor).
 */
function partnerVoice(course: MockCourse): VoiceId {
  return castFor(course).male[0];
}

/*
  Yerel kayıt — mobildeki `mockExamLocal` ile aynı düşünce.

  Sınav yalnız sunucuya yazılıyordu ve sunucuya ulaşılamadığı an çözülmüş bir
  bölümün tamamı kayboluyordu. Artık her cevap ÖNCE tarayıcıya, sonra sunucuya
  yazılıyor. Sunucu yetkili olmayı sürdürüyor; yerel kayıt bir yedek.
*/
type LocalRun = { answers: Answers; open: Record<string, string>; taskIx: number; secondsLeft: number; plays?: Record<string, number> };
const runKey = (paperId: string, skill: string) => `lernomi:mock-run:${paperId}:${skill}`;

function readLocalRun(paperId: string, skill: string): LocalRun | null {
  try {
    const raw = localStorage.getItem(runKey(paperId, skill));
    return raw ? (JSON.parse(raw) as LocalRun) : null;
  } catch {
    return null;
  }
}
function writeLocalRun(paperId: string, skill: string, run: LocalRun): void {
  try { localStorage.setItem(runKey(paperId, skill), JSON.stringify(run)); } catch { /* depolama kapalı */ }
}
function dropLocalRun(paperId: string, skill: string): void {
  try { localStorage.removeItem(runKey(paperId, skill)); } catch { /* yut */ }
}

/**
 * Sunucuya neden ulaşılamadı — üçü üç ayrı şey ve üçü ayrı söylenmeli.
 * Hepsine "bağlantı yok" demek yanlış teşhis koyuyordu.
 */
type Fail = "not_deployed" | "unauthorized" | "locked" | "unreachable";
const FAIL_KEYS: Record<Fail, string> = {
  not_deployed: "mockexam.fail_not_deployed",
  unauthorized: "mockexam.fail_unauthorized",
  locked: "mockexam.fail_locked",
  unreachable: "mockexam.fail_unreachable",
};

class HttpError extends Error {
  constructor(readonly status: number, readonly code: string | null = null) { super(String(status)); }
}
function failOf(err: unknown): Fail {
  const st = err instanceof HttpError ? err.status : 0;
  if (st === 404 || st === 501) return "not_deployed";
  /*
   * 403 İKİ AYRI ŞEY. Uç hem köken denetimi için ("forbidden") hem de kâğıt
   * kilitliyken ("premium_required") 403 dönüyor. İkisini birden "oturumun
   * düşmüş" diye okumak, kilitli kâğıda dokunan kullanıcıyı boş yere giriş
   * ekranına gönderiyordu - hesabında bir sorun yok, kâğıt açık değil.
   */
  if (st === 403 && err instanceof HttpError && err.code === "premium_required") return "locked";
  if (st === 401 || st === 403) return "unauthorized";
  return "unreachable";
}

/**
 * Açık görevin değerlendirmesi yapay zekâ izni olmadığı için mi alınamadı?
 * İzin diyaloğu `apiFetch`in yakalayıcısında açılıyor; "hayır" ya da kapatma
 * `403 ai_consent_declined` olarak buraya geliyor (bkz. `lib/api-fetch`).
 */
function consentRefused(err: unknown): boolean {
  return err instanceof HttpError && err.status === 403 && err.code === AI_CONSENT_DECLINED;
}

async function post<T>(body: Record<string, unknown>): Promise<T> {
  const res = await apiFetch("/api/mock-exam", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    replay: true, // her eylem tekrara dayanıklı: start yarım denemeyi sürdürür, assess/finish kayıtlı sonucu döner
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new HttpError(res.status, body?.error ?? null);
  }
  return (await res.json()) as T;
}

/**
 * Bölümün hangi yapay zekâ izinlerine dayandığı. Yazma metni değerlendirmeye
 * gidiyor; konuşmada ses tarayıcının tanıyıcısında yazıya çevriliyor ve
 * sunucuya yalnız döküm gidiyor (ses rızası gerekmiyor), değerlendirilen de o
 * döküm. Okuma ve dinleme hiçbir sağlayıcıya gitmiyor.
 */
function consentPurposesOf(skill: MockPart["skill"]): AiConsentPurpose[] {
  if (skill === "writing" || skill === "speaking") return ["ai_text"];
  return [];
}

/**
 * Oynatıcının kâğıttan okuduğu künye. Bölüm (`part`) sunucudan `deliverPart`
 * ile cevap anahtarı çıkarılmış geliyor: oynatıcı `answer`/`accept`/`explain`
 * OKUMAZ, doğru cevap ve gerekçe yalnız sunucunun sonucundan çizilir.
 */
type PlayerPaper = Pick<MockPaper, "id" | "no" | "level" | "course" | "theme" | "themeTr">;

export function MockExamPlayer({ paper, part }: { paper: PlayerPaper; part: MockPart }) {
  const t = useT();
  const lang = useLang();
  const budgets = useMemo(() => taskSeconds(part), [part]);
  const router = useRouter();
  const [phase, setPhase] = useState<"cover" | "run" | "result">("cover");
  /** Sınavı bırakma onayı — mobil `MockExamScreen`deki ConfirmDialog ile aynı. */
  const [quit, setQuit] = useState(false);
  /* Ayrilmanin oteki yollari da ayni onaya bagli: SURELI bir sinavin
     ortasinda yenileme ya da kenar cubugundan bir tiklama, kaydi iki saniye
     geriden birakip kagidi terk ediyordu. */
  const ayril = useLeaveGuard(phase === "run");
  const [ix, setIx] = useState(0);
  const [left, setLeft] = useState(0);
  /** Görevin bitiş damgası — bkz. aşağıdaki sayaç notu. */
  const deadline = useRef(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [open, setOpen] = useState<Record<string, string>>({});
  const [openScores, setOpenScores] = useState<Record<string, OpenScore>>({});
  /* Bitirişte okunuyor (aşağıda): efektin bağımlılığı olmasınlar diye ref. */
  const openNow = useRef(open);
  openNow.current = open;
  const scoresNow = useRef(openScores);
  scoresNow.current = openScores;
  /* Görevden çıkılırken (süre doldu ya da "Sonraki görev") konuşma görevi
     o ana kadar duyulanı söküm sırasında teslim ediyor (bkz. `SpeakingTask`
     `run`). Son görevde bitiriş bu teslimi bekliyor, yoksa döküm bitirişten
     sonra gelir ve görev puansız kalırdı. */
  const openPending = useRef<Set<Promise<void>>>(new Set());
  const [plays, setPlays] = useState<Record<string, number>>({});
  /** Şu an çalan dinleme metni — iki kez basmayı ve iki hakkı birden yakmayı engelliyor. */
  const [playing, setPlaying] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [resumed, setResumed] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ score: Score; ai: Feedback | null; offline: Fail | null } | null>(null);
  /** Bitiriş sunucuya ulaşamadı — puan yok, kayıt duruyor, yeniden denenebilir. */
  const [finishFail, setFinishFail] = useState<Fail | null>(null);
  const [finishTry, setFinishTry] = useState(0);
  /* Bitiriş efekti okuyor; bağımlılığı olursa açılan denemeyi yazmak efekti
     kendi ortasında yeniden başlatırdı. */
  const attemptNow = useRef(attempt);
  attemptNow.current = attempt;
  const playsNow = useRef(plays);
  playsNow.current = plays;
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const announced = useRef<Set<string>>(new Set());
  useEffect(() => () => stopSpeaking(), []);

  const announce = useCallback((key: string, text: string) => {
    if (announced.current.has(key)) return;
    announced.current.add(key);
    sayIn(paper.course, text);
  }, [paper.course]);

  /*
   * SAYAÇ DUVAR SAATİNDEN, SAYICIDAN DEĞİL.
   *
   * Görev süresi her saniye bir sayıcıyı bir azaltarak işliyordu ve o sayıcı
   * sekme arka plana alınınca DURUYOR (tarayıcılar arka plandaki
   * `setInterval`i dakikada bire kadar kısıyor; mobil uygulamada tamamen
   * duruyor). Yani her göreve ayrılmış süre istenildiği kadar
   * uzatılabiliyordu - üstelik yarım kalan koşu `secondsLeft` ile
   * kaydedildiği için kazanılan süre kalıcıydı.
   *
   * Süre sınavın KISITI; sınav kâğıdının kendisi kadar kuralın parçası.
   * Aynı kusur `ExamScreen`de bulunup düzeltilmişti ve patron/meydan okuma
   * sayaçları baştan beri bir ZAMAN DAMGASINDAN okuyor - bu üçüncüsü geride
   * kalmıştı, üstelik İKİ PLATFORMDA BİRDEN.
   *
   * `sureVer` hem kalan saniyeyi hem de bitiş damgasını kuruyor; sayaç
   * yalnız damgadan okuyor.
   */
  const sureVer = useCallback((saniye: number) => {
    deadline.current = Date.now() + saniye * 1000;
    setLeft(saniye);
  }, []);

  useEffect(() => {
    if (phase !== "run") return;
    const tick = () => setLeft(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
    tick(); // arka plandan dönüşte ilk saniyeyi beklemeden düzeltilir
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const advance = useCallback((auto: boolean) => {
    stopSpeaking();
    /*
      ÇALMA BAYRAĞI GÖREVLE BİRLİKTE SIFIRLANMALI.

      `speakSegments`in `onEnd`i, okuma başka bir okumayla kesildiğinde HİÇ
      çağrılmıyor (jeton değişiyor, zincir sessizce duruyor) — ve bir sonraki
      görevin yönergesi okunduğu anda tam bu oluyor. Bayrak temizlenmeseydi
      `playing` eski metnin kimliğinde takılı kalır ve sonraki görevde "Dinle"
      düğmesi bir daha hiç açılmazdı: dinleme hakkı duruyor ama basılamıyor.
    */
    setPlaying(null);
    setAutoNext(auto);
    if (ix >= part.tasks.length - 1) { setPhase("result"); return; }
    const next = ix + 1;
    setIx(next);
    sureVer(budgets[next] ?? 60);
    writeLocalRun(paper.id, part.skill, { answers, open, taskIx: next, secondsLeft: budgets[next] ?? 60, plays });
    if (attempt) void post({ action: "save", id: attempt.id, answers, open, taskIx: next, secondsLeft: budgets[next] ?? 60, plays }).catch(() => {});
  }, [ix, part.tasks.length, part.skill, paper.id, budgets, attempt, answers, open, plays, sureVer]);

  useEffect(() => {
    if (phase === "run" && left === 0) advance(true);
  }, [left, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  /*
   * YENİ GÖREV EN BAŞTAN AÇILIYOR.
   *
   * Uygulama kabuğunda kaydıran şey pencere değil `main` (bkz. app-shell) ve
   * görev değişince onun kaydırma konumu olduğu yerde kalıyordu. "Sonraki
   * görev" düğmesi sayfanın DİBİNDE; basınca yeni görev de dibinden açılıyor,
   * öğrenci son maddeleri ve yine bir "Sonraki görev" düğmesi görüyordu.
   * Geri dönüşü olmayan, süreli bir sınavda ikinci bir dokunuş koca bir
   * görevi atlatıyordu. Bölüme başlarken de aynısı: kapaktaki "Bölüme başla"
   * küçük ekranda kaydırılarak bulunuyor ve görev o konumdan, sayaç ve yönerge
   * ekranın üstünde kalmış hâlde açılıyordu. Görev ve evre her değiştiğinde
   * en yakın kaydırılabilir ata başa sarılıyor.
   */
  const kok = useRef<HTMLElement>(null);
  useEffect(() => {
    // Sonuç ve kapak ekranları başka bir kök çiziyor; onlarda kabuğun `main`i.
    let el: HTMLElement | null = kok.current?.parentElement ?? document.querySelector("main");
    while (el && el !== document.body) {
      const oy = getComputedStyle(el).overflowY;
      if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight) break;
      el = el.parentElement;
    }
    if (el && el !== document.body) el.scrollTop = 0;
    else window.scrollTo(0, 0);
  }, [ix, phase]);

  // Anlık kayıt: her değişiklikten iki saniye sonra.
  useEffect(() => {
    if (phase !== "run") return;
    const id = setTimeout(() => {
      writeLocalRun(paper.id, part.skill, { answers, open, taskIx: ix, secondsLeft: left, plays });
      if (attempt) void post({ action: "save", id: attempt.id, answers, open, taskIx: ix, secondsLeft: left, plays }).catch(() => {});
    }, 2000);
    return () => clearTimeout(id);
  }, [answers, open, attempt, phase, ix]); // eslint-disable-line react-hooks/exhaustive-deps

  async function begin() {
    setBusy(true);
    try {
      const d = await post<{ attempt: Attempt; resumed: boolean }>({ action: "start", paper: paper.id, skill: part.skill });
      /* İZİN SÜRE BAŞLAMADAN (`sureVer` aşağıda). Kâğıt açılamadıysa
         (kilit, ağ) sorulmuyor: değerlendirme zaten yapılamayacak. */
      await askAiConsentUpfront(lang, consentPurposesOf(part.skill));
      setAttempt(d.attempt);
      setResumed(d.resumed);
      setAnswers(d.attempt.answers ?? {});
      setOpen(d.attempt.open ?? {});
      setOpenScores(d.attempt.openScores ?? {});
      /* OYNATMA BÜTÇESİ DE GERİ YÜKLENİYOR. Sayaç yalnız ekranın belleğinde
         tutuluyordu: bütçeyi tüketip sekmeyi kapatan öğrenci yeniden açınca
         sıfırdan başlıyordu, yani sınırsız dinleme. Süre (`secondsLeft`) ile
         aynı sebep, aynı yer (bkz. parity 270). */
      setPlays(d.attempt.plays ?? {});
      const start = Math.min(d.attempt.taskIx ?? 0, part.tasks.length - 1);
      setIx(start);
      sureVer(d.resumed && d.attempt.secondsLeft > 0 ? d.attempt.secondsLeft : budgets[start] ?? 60);
    } catch (e) {
      setAttempt(null);
      const why = failOf(e);
      /* Kilide takilan an olculuyor: kagit acilmadi cunku paket kapali.
         Bitis yolundaki `failOf` cagrisinda OLCULMUYOR - orada kullanici zaten
         sinavi cozmus oluyor, kilit degil ag sorunu konusulur. */
      if (why === "locked") {
        track("premium_gate", 0, "mock_exam");
        /* Kilitli kâğıt çözülmüyor: puanı yalnız sunucu hesaplıyor ve
           sunucu bu kâğıdı bitirmeyecek. Kilidi liste anlatıyor. */
        setBusy(false);
        router.replace("/mock-exams");
        return;
      }
      const local = readLocalRun(paper.id, part.skill);
      if (local) {
        setResumed(true);
        setAnswers(local.answers ?? {});
        setOpen(local.open ?? {});
        setPlays(local.plays ?? {});
        const start = Math.min(local.taskIx ?? 0, part.tasks.length - 1);
        setIx(start);
        sureVer(local.secondsLeft > 0 ? local.secondsLeft : budgets[start] ?? 60);
      } else {
        setIx(0);
        sureVer(budgets[0] ?? 60);
      }
    }
    setBusy(false);
    setPhase("run");
  }

  useEffect(() => {
    if (phase !== "result" || result) return;
    let dead = false;
    void (async () => {
      setBusy(true);
      setFinishFail(null);
      if (openPending.current.size) {
        // Tavanlı: teslim takılırsa bitiriş sonsuza dek beklemesin.
        await Promise.race([Promise.allSettled([...openPending.current]), new Promise((r) => setTimeout(r, 3000))]);
        if (dead) return;
      }
      /*
        PUAN YALNIZ SUNUCUDA (güvenlik denetimi 2026-10-03, Y2).

        Eskiden sunucuya ulaşılamayınca tarayıcı kendi puanını hesaplıyordu
        (`localScore`); bunun için kâğıt cevap anahtarıyla iniyordu. Anahtar
        artık inmiyor. Bitiriş düşerse sonuç YOK: yarım kayıt silinmiyor ve
        "Tekrar dene" aynı cevaplarla yeniden bitiriyor. Mobil `MockExamScreen`
        aynı kuralı izliyor.
      */
      try {
        let run = attemptNow.current;
        if (!run) {
          /* Sınav sunucuda hiç açılamamıştı (başlatma ağa takıldı, cevaplar
             yalnız tarayıcıda). Şimdi açılıp cevaplar yazılıyor, sonra
             bitiriliyor; yarım bir sunucu denemesi varsa `start` onu döndürür. */
          const d = await post<{ attempt: Attempt }>({ action: "start", paper: paper.id, skill: part.skill });
          run = d.attempt;
          await post({ action: "save", id: run.id, answers, open: openNow.current, taskIx: part.tasks.length - 1, secondsLeft: 0, plays: playsNow.current });
          if (dead) return;
          attemptNow.current = run;
          setAttempt(run);
        }
        /*
          DEĞERLENDİRİLMEMİŞ AÇIK GÖREV BİTİRMEDEN ÖNCE PUANLANIYOR (2026-10-02).
          Metni yazıp "Sonraki görev"e basılan ya da süresi dolan görev hiç
          puanlanmıyor, ortalamanın dışında kalıyordu; sınavda teslim edilen
          metin puanlanır. Bitiş kayıtlı puanı okuduğu için puan bitişten ÖNCE
          `assess` ile yazılıyor. Mobil `MockExamScreen` aynı.
        */
        const yeni = await assessPending(run.id, part, openNow.current, scoresNow.current);
        if (dead) return;
        if (Object.keys(yeni).length) setOpenScores((sc) => ({ ...sc, ...yeni }));
        const d = await post<{ score: Score; ai: Feedback }>({ action: "finish", id: run.id, answers });
        dropLocalRun(paper.id, part.skill);
        if (!dead) { setResult({ score: d.score, ai: d.ai ?? null, offline: null }); setBusy(false); }
      } catch (e) {
        if (!dead) { setFinishFail(failOf(e)); setBusy(false); }
      }
    })();
    return () => { dead = true; };
  }, [phase, result, answers, part, paper.id, finishTry]);

  const task = part.tasks[ix];
  /* Kapakta ve sonuç bandında aynı üst satır: hangi kâğıt, hangi bölüm. */
  const eyebrow = (
    <>
      {paper.level} · {t("mockexams.mock_n", { n: paper.no })} · <span lang={paper.course}>{mockSkillLabel(paper.course, part.skill)}</span>
    </>
  );

  if (phase === "cover") {
    const points = part.tasks.reduce((a, x) => a + (isOpenTask(x) ? 0 : x.items.length), 0);
    /*
      KAPAK ŞABLONU (components/flow `CoverBody`). Eskiden tek kartta başlık,
      yönerge, süre ve oturum kuralları tek paragraf hâlinde alt alta
      diziliyordu. Bilgi aynı, yeri sabit: başlıkta tema, tek cümlede yönerge,
      kurallar ikonlu tek satırlar. Mobil `MockExamScreen` `Cover` aynı alanları
      aynı sırayla çiziyor.

      "Yönergeler sesli okunur" satırı HER bölümde: web yönergeyi her bölümde
      okuyor (`announce`), mobil yalnız dinleme ve konuşmada — satır iki yerde
      de gerçekte olanı söylüyor.
    */
    return (
      <FlowColumn>
        <CoverBody
          icon={<MockExamIcon size={28} />}
          tint="var(--color-brand)"
          eyebrow={eyebrow}
          title={<span lang={paper.course}>{paper.theme}</span>}
          pitch={<span lang={paper.course}>{part.instruction}</span>}
          rules={[
            {
              icon: <DurationIcon size={16} />,
              /* "puanlanmaz" DEĞİL (denetim T15): görevleri yapay zekâ puanlıyor.
                 Misafir varyantı (`part_open_guest`) yalnız mobilde: web hesap
                 istiyor, misafir bu sayfaya gelmiyor (`getAccountUserId`). */
              text: points
                ? t("mockexams.part_summary", { minutes: part.minutes, n: points })
                : t("mockexams.part_open", { minutes: part.minutes }),
            },
            /* Oturum kuralları eskiden tek paragraftı; her kural artık kendi satırı. */
            { icon: <DurationIcon size={16} />, text: t("mockexam.rule_timed") },
            { icon: <NoGoingBackIcon size={16} />, text: t("mockexam.no_back"), tone: "bad" },
            { icon: <SpeakerIcon size={16} />, text: t("mockexam.rule_voiced") },
            { icon: <CorrectIcon size={16} />, text: t("mockexam.rule_saved"), tone: "ok" },
          ]}
          /* Temanın ve yönergenin öğrencinin dilindeki karşılığı kaybolmuyor. */
          note={
            <>
              <span className="block">{paper.themeTr}</span>
              <span className="block">{part.instructionTr}</span>
              {/* Bağımsızlık notu (denetim İ3): sonuç resmî sertifika izlenimi vermesin. */}
              <span className="mt-2 block text-micro">{t("exam.independent_note")}</span>
            </>
          }
        />
        <FlowActions
          primary={{
            label: t(busy ? "mockexam.starting" : "mockexam.start"),
            disabled: busy,
            onClick: () => { announce(`part:${part.skill}`, part.instruction); void begin(); },
          }}
          close="/mock-exams"
        />
      </FlowColumn>
    );
  }

  if (phase === "result") {
    if (finishFail && !busy && !result) {
      /* Bitiriş düştü: sebep ve iki yol. Cevaplar sunucuda (anlık kayıt) ve
         tarayıcıda duruyor; kilitte yeniden denemek bir şey değiştirmiyor. */
      return (
        <FlowColumn>
          <StateBody alert icon={<OfflineIcon size={28} className="muted" />} title={t(FAIL_KEYS[finishFail])} body={t("mockexam.rule_saved")} />
          <FlowActions
            primary={finishFail === "locked" ? null : { label: t("common.try_again"), onClick: () => setFinishTry((n) => n + 1) }}
            close="/mock-exams"
          />
        </FlowColumn>
      );
    }
    if (busy || !result) {
      /* Puanlanırken DURUM şablonu: düşünen maskot + ilerleme çubuğu. */
      return (
        <FlowColumn>
          <div aria-busy>
            <StateBody title={t("mockexam.scoring")}>
              <div className="h-2 animate-pulse rounded-full surface-2" />
            </StateBody>
          </div>
        </FlowColumn>
      );
    }
    return <Result attemptId={attempt?.id ?? null} paper={paper} part={part} eyebrow={eyebrow} open={open} openScores={openScores} result={result} reveal={reveal} onReveal={(id) => setReveal((r) => ({ ...r, [id]: true }))} />;
  }

  /** Cevaplanmamış kapalı uçlu madde sayısı — bırakma uyarısında geçiyor. */
  const blanks = part.tasks.reduce(
    (n, tk) => (isOpenTask(tk) ? n : n + tk.items.filter((it) => !(answers[it.id] ?? "").trim()).length),
    0,
  );

  return (
    <section ref={kok} className="mx-auto w-full max-w-2xl">
      {/* Sıra tur başlığındaki gibi (`session-player`): çıkış en solda,
          çubuk, sağda görev sayacı. ÇIKIŞ YOLU YOKTU: sınav başlayınca tek
          çıkış tarayıcının geri düğmesiydi; web iki saniyede bir kaydediyor,
          yani "cevapların kaydedildi" sözü tutuluyor. SİMGE Android'den:
          çarpı değil geri oku — bu başlık listeye dönüyor (`MockExamScreen`). */}
      <header className="card flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <RoundExit onExit={() => setQuit(true)} labelKey="mockexam.quit_title" glyph="back" />
          <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full surface-2" aria-hidden>
            <div
              className="brand-gradient bar-fill h-full rounded-full"
              style={fillStyle(Math.round((100 * ix) / Math.max(1, part.tasks.length)))}
            />
          </div>
          {/* Sayaç GÖREV başına; etiketsiz bir geri sayım "sınavın tamamı bu
              kadar" diye okunabiliyordu. Android etiketi yazıyor. */}
          <div className="shrink-0 text-right">
            <p className="muted text-micro uppercase tracking-eyebrow">{t("mockexam.task_time")}</p>
            <p className="text-strong tabular-nums" style={{ color: left < 30 ? "var(--color-danger)" : undefined }}>{mmss(left)}</p>
          </div>
        </div>
        <div>
          <p className="muted text-micro uppercase tracking-eyebrow">{paper.level} · {mockSkillLabel(paper.course, part.skill)}</p>
          <p className="text-strong">{t("mockexam.task_of", { n: ix + 1, total: part.tasks.length })}</p>
        </div>
      </header>

      <ConfirmDialog
        open={quit || ayril.pending !== null}
        title={t("mockexam.quit_title")}
        message={`${t("mockexam.quit_body_saved")} ${blanks ? t("mockexam.unanswered", { n: blanks }) : ""}`.trim()}
        confirmLabel={t("mockexam.quit_ok")}
        destructive
        onConfirm={() => {
          setQuit(false);
          writeLocalRun(paper.id, part.skill, { answers, open, taskIx: ix, secondsLeft: left, plays });
          if (attempt) void post({ action: "save", id: attempt.id, answers, open, taskIx: ix, secondsLeft: left, plays }).catch(() => {});
          if (ayril.pending) ayril.leave();
          else router.push("/mock-exams");
        }}
        onCancel={() => { setQuit(false); ayril.stay(); }}
      />

      {/* Tek satırlık notlar şablonun `FlowNote`u: süre dolup geçilmesi bir
          UYARI (kayıp yok, kural işledi). Mobil aynı iki notu çiziyor. */}
      {autoNext ? (
        <div className="mt-2">
          <FlowNote tone="warn" icon={<DurationIcon size={16} className="shrink-0" />} text={t("mockexam.auto_next")} />
        </div>
      ) : null}
      {resumed && ix === (attempt?.taskIx ?? 0) ? (
        <div className="mt-2">
          <FlowNote icon={<ResumeIcon size={16} className="muted shrink-0" />} text={t("mockexam.resumed")} />
        </div>
      ) : null}

      <TaskView
        key={task.id}
        course={paper.course}
        task={task}
        answers={answers}
        open={open}
        openScores={openScores}
        plays={plays}
        attemptId={attempt?.id ?? null}
        onAnnounce={() => announce(`task:${task.id}`, task.prompt)}
        onAnswer={(id, v) => setAnswers((a) => ({ ...a, [id]: v }))}
        onOpen={(id, v) => {
          // Ref de hemen: bitiriş, teslimden sonraki çizimi beklemeden okuyor.
          openNow.current = { ...openNow.current, [id]: v };
          setOpen((o) => ({ ...o, [id]: v }));
        }}
        onPending={(p) => {
          openPending.current.add(p);
          void p.finally(() => openPending.current.delete(p));
        }}
        onOpenScore={(id, v) => setOpenScores((s) => ({ ...s, [id]: v }))}
        /*
          DİNLEME — üç şey aynı anda düzeldi.

          1. Diyaloğun tamamı tek dizgede birleşiyordu (`speakSegments` aynı
             dildeki bitişik parçaları birleştiriyor) ve uç 600 karakterin
             üstünü 400 ile reddediyor: bu kâğıtlardaki dinleme
             diyaloglarının 171'i HİÇ ÇALMIYORDU. `dialogueSegments` replik
             replik okuyor.
          2. Bütün konuşmacılar tek sesti; artık konuşmacı başına ayrı ses ve
             sıra geçişinde nefes payı var.
          3. Hak, ses ÇALMAYA BAŞLAYINCA yanıyor. Eskiden düğmeye basıldığı
             an düşülüyordu, yani ses gelmeyen her denemede öğrenci iki
             hakkından birini hiçbir şey duymadan kaybediyordu — tam da
             yukarıdaki hata yüzünden sık olan durum.

             iPHONE/iPAD'DE HÂLÂ İYİMSER. Orada boşluksuz WebAudio yolu
             kullanılmıyor (bkz. `speak-button`, `playGapless`) ve ses öğesi
             zincirinin sesin gerçekten başladığını bildiren bir olayı yok:
             `onStart` çalma denemesinden hemen önce çağrılıyor. Platformun
             verdiği bir sinyal olmadığı için düzeltilemiyor; kazanç yine de
             duruyor, çünkü eskisi "basılır basılmaz"dı.
        */
        onPlay={(st) => {
          if ((plays[st.id] ?? 0) >= st.plays || playing) return;
          setPlaying(st.id);
          speakSegments(
            dialogueSegments(paper.course, st.segments),
            () => setPlaying(null),
            () => setPlays((p) => ({ ...p, [st.id]: (p[st.id] ?? 0) + 1 })),
          );
        }}
        playing={playing}
      />

      <div className="card mt-3 p-4">
        <p className="muted text-caption">{t("mockexam.no_back")}</p>
        <button type="button" className="btn btn-primary mt-2 w-full px-5 py-4" onClick={() => advance(false)}>
          {t(ix < part.tasks.length - 1 ? "mockexam.next_task" : "mockexam.submit")}
        </button>
      </div>
    </section>
  );
}

/* ── görev ────────────────────────────────────────────────────────────────── */

function TaskView({
  course, task, answers, open, openScores, plays, playing, attemptId, onAnnounce, onAnswer, onOpen, onOpenScore, onPending, onPlay,
}: {
  course: MockCourse;
  task: MockTask;
  answers: Answers;
  open: Record<string, string>;
  openScores: Record<string, OpenScore>;
  plays: Record<string, number>;
  playing: string | null;
  attemptId: number | null;
  onAnnounce: () => void;
  onAnswer: (id: string, v: string) => void;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
  onPending: (p: Promise<void>) => void;
  onPlay: (st: Extract<MockStimulus, { kind: "audio" }>) => void;
}) {
  useEffect(() => { onAnnounce(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const grouped = (task.texts ?? []).length > 1 && task.items.some((i) => i.ref);
  const itemsOf = (ref?: string) => (grouped ? task.items.filter((i) => i.ref === ref) : task.items);

  return (
    <div className="mt-3 space-y-3">
      <div className="card p-4">
        <p className="text-body leading-relaxed" lang={course}>{task.prompt}</p>
        <p className="muted mt-2 text-body leading-relaxed">{task.promptTr}</p>
      </div>

      {task.options?.length ? (
        <div className="card p-4">
          {task.options.map((o) => (
            <div key={o.key} className="mt-2 first:mt-0">
              <p className="text-strong" lang={course}>{o.key}) {o.label}</p>
              {o.body ? <p className="muted text-body leading-relaxed" lang={course}>{o.body}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      {(task.texts ?? []).map((st) => (
        <div key={st.id} className="space-y-3">
          <Stimulus course={course} st={st} plays={plays} playing={playing} onPlay={onPlay} />
          {grouped ? itemsOf(st.id).map((it) => <Item key={it.id} course={course} item={it} task={task} value={answers[it.id]} answers={answers} onAnswer={onAnswer} />) : null}
        </div>
      ))}

      {!grouped ? task.items.map((it) => <Item key={it.id} course={course} item={it} task={task} value={answers[it.id]} answers={answers} onAnswer={onAnswer} />) : null}

      {task.format === "writing" ? (
        <OpenTask course={course} task={task} value={open[task.id] ?? ""} score={openScores[task.id]} attemptId={attemptId} onOpen={onOpen} onOpenScore={onOpenScore} />
      ) : task.format === "speaking" ? (
        <SpeakingTask course={course} task={task} value={open[task.id] ?? ""} score={openScores[task.id]} attemptId={attemptId} onOpen={onOpen} onOpenScore={onOpenScore} onPending={onPending} />
      ) : null}
    </div>
  );
}

function Stimulus({ course, st, plays, playing, onPlay }: { course: MockCourse; st: MockStimulus; plays: Record<string, number>; playing: string | null; onPlay: (st: Extract<MockStimulus, { kind: "audio" }>) => void }) {
  const t = useT();
  /*
    ÖN İNDİRME — görev açılır açılmaz, basılmadan önce.

    Nöral ses ilk dinlemede bir-iki saniye sürüyor ve sınavda o bekleme
    pahalı: süre işliyor, öğrenci düğmeye bir daha basıyor. Görev ekrana
    geldiği anda indirmek o gecikmeyi tamamen görünmez yapıyor — sıra
    geldiğinde ses zaten tarayıcı önbelleğinde. Çalmayla AYNI parçalardan
    geçiyor, yoksa başka bir adres indirilir ve ısınan şey çalınacak ses
    olmazdı. Hata sessizce yutuluyor: ön indirme bir iyileştirme, garanti değil.
  */
  useEffect(() => {
    if (st.kind === "audio") prefetchSegments(dialogueSegments(course, st.segments));
  }, [course, st]);
  if (st.kind === "text") {
    return (
      <div className="card p-4">
        <p className="muted text-micro uppercase tracking-eyebrow">{st.genre} · {st.genreTr}</p>
        {st.title ? <p className="mt-1 text-strong" lang={course}>{st.title}</p> : null}
        <p className="mt-2 whitespace-pre-line text-body leading-relaxed" lang={course}>{withBlanks(st.body)}</p>
      </div>
    );
  }
  const rest = st.plays - (plays[st.id] ?? 0);
  return (
    <div className="card p-4">
      <p className="muted text-micro uppercase tracking-eyebrow">{st.genre} · {st.genreTr}</p>
      {st.title ? <p className="mt-1 text-strong" lang={course}>{st.title}</p> : null}
      <p className="muted mt-1 text-body leading-relaxed">{st.situation}</p>
      <button
        type="button"
        className="btn btn-ghost mt-3 px-4 py-2 text-body"
        disabled={rest <= 0 || playing === st.id}
        aria-busy={playing === st.id}
        onClick={() => onPlay(st)}
      >
        <SpeakerIcon className="size-4" />{" "}
        {t(rest <= 0 ? "mockexam.plays_done" : rest === st.plays ? "mockexam.listen" : "mockexam.listen_again")}
      </button>
      {rest > 0 ? <p className="muted mt-1 text-caption">{t("mockexam.plays_left", { n: rest })}</p> : null}
    </div>
  );
}

function Item({ course, item, task, value, answers, onAnswer }: { course: MockCourse; item: MockItem; task: MockTask; value?: string; answers: Answers; onAnswer: (id: string, v: string) => void }) {
  const t = useT();
  const [yes, no] = mockBoolLabels(course, task.format);
  /*
   * KULLANILMIŞ ŞIKLAR SOLUK. Eşleştirmede varsayılan kural "her şık en fazla
   * bir kez" ve `reuseOptions` o kuralı kaldırıyor (bkz. lib/mock-exams/types).
   * Bayrak içerikte yüzlerce görevde YAZILI ama iki oynatıcı da onu hiç
   * okumuyordu: bir şıkkı ikinci kez seçen öğrenci hatasını ancak sonuçta
   * görüyordu. Kâğıt sınavda bu bilgi zaten var - öğrenci kendi yazdıklarını
   * aynı sayfada görüyor; ekranda her madde ayrı satır olduğu için kayboluyor.
   *
   * Soluk şık YİNE BASILABİLİR: cevabı taşımak isteyen öğrenci engellenmemeli.
   */
  const usedKeys =
    item.kind === "match" && !task.reuseOptions
      ? new Set(task.items.filter((i) => i.id !== item.id).map((i) => answers[i.id]).filter(Boolean))
      : null;
  const chip = (label: string, active: boolean, onClick: () => void, key: string, hint?: string) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      /* "BU ŞIK BAŞKA MADDEDE KULLANILDI" notu DÜĞMENİN kendi adında.
         Not sarmalayıcı `<span>`in `title=`inde duruyordu: span odaklanamaz,
         yani ekran okuyucu oraya hiç uğramıyor ve dokunmatikte ipucu balonu
         hiç açılmıyor. Android notu doğrudan basılabilir ögeye veriyor
         (`MockExamScreen` `accessibilityHint`). */
      aria-label={hint ? `${label} — ${hint}` : undefined}
      /* SEÇİLİ DURUMU DUYURULUYOR. Şık seçilince yalnız zemin ve kenarlık
         değişiyordu: ekran okuyucu kullanan öğrenci hangi şıkkı işaretlediğini
         hiçbir şekilde duymuyordu — sınavda cevabını doğrulayamamak demek.
         Aynı eksik iki platformda da vardı, ikisi birlikte kapatıldı.

         ROLÜ DE RADYO: "düğme, seçili" kaç şık olduğunu ve birini seçmenin
         ötekini bıraktığını söylemiyordu. Bu da iki platformda birden
         eksikti (bkz. parity 257) ve ikisi yine birlikte kapatıldı. */
      role="radio"
      aria-checked={active}
      className="rounded-panel px-3 py-2 text-left text-body"
      /* Seçili satır yüzeye çıkar + turuncu kenar, dolgu yok (2026-09-29 Samet: seçim B). */
      style={{ background: active ? "var(--surface)" : "var(--surface-2)", border: `1px solid ${active ? "var(--color-brand)" : "transparent"}` }}
    >
      {label}
    </button>
  );
  // Satır sonu korunuyor: dönüştürme maddesinde kaynak cümle ile hedef cümle
  // ayrı satırlarda durmalı, tek paragrafa akarsa hangi cümlenin doldurulacağı
  // okunmuyor. Öteki biçimlerde metin tek satır olduğu için etkisi yok.
  return (
    <div className="card p-4">
      {/* İçerik bildirimi sınav sürerken YOK: dökümde, her maddenin altında. */}
      <p className="whitespace-pre-line text-strong leading-relaxed" lang={course}>{item.no}. {item.text}</p>
      {item.kind === "gap" && item.cue ? (
        <p className="mt-2 text-strong tracking-wide" lang={course} style={{ color: "var(--color-brand)" }}>{item.cue}</p>
      ) : null}
      {/* Maddenin ŞIKLARI tek seçimlik: grup da adıyla duruyor (madde metni). */}
      <div role="radiogroup" aria-label={item.text} className="mt-2 flex flex-col gap-2">
        {item.kind === "mcq"
          ? item.options.map((o, i) => chip(`${"abcd"[i] ?? i + 1}) ${o}`, value === String(i), () => onAnswer(item.id, String(i)), String(i)))
          : item.kind === "bool"
            ? <div className="flex gap-2">{chip(yes, value === "true", () => onAnswer(item.id, "true"), "t")}{chip(no, value === "false", () => onAnswer(item.id, "false"), "f")}</div>
            : item.kind === "match"
              ? (
                <div className="flex flex-wrap gap-2">
                  {/* SOLUK OLMAK BİR BİLGİ: bu şık başka bir maddede
                      kullanılmış. Opaklık bunu yalnız göze söylüyordu; ekran
                      okuyucu kullanan öğrenci aynı şıkkı ikinci kez seçtiğini
                      ancak sonuçta görüyordu. Şık yine basılabilir. Android
                      aynı satırı taşıyor. */}
                  {(task.options ?? []).map((o) => (
                    <span
                      key={o.key}
                      style={{ opacity: usedKeys?.has(o.key) && value !== o.key ? 0.45 : 1 }}
                    >
                      {chip(
                        o.key,
                        value === o.key,
                        () => onAnswer(item.id, o.key),
                        o.key,
                        usedKeys?.has(o.key) && value !== o.key ? t("mockexam.option_used") : undefined,
                      )}
                    </span>
                  ))}
                </div>
              )
              : (
                <input
                  value={value ?? ""}
                  onChange={(e) => onAnswer(item.id, e.target.value)}
                  className="input w-full"
                  placeholder={t(task.format === "transform" ? "mockexam.write_transform" : "mockexam.write_here")}
                  aria-label={t(task.format === "transform" ? "mockexam.write_transform" : "mockexam.write_here")}
                  lang={course}
                  /* KISA CEVAP (boşluk doldurma, dönüştürme): cümle başı
                     büyütme yok, düzeltme kapalı. Enter tuşunun adı da
                     Android'inki (`MockExamScreen` `returnKeyType="done"`);
                     kâğıt tek düğmeyle gönderiliyor, Enter göndermiyor. */
                  enterKeyHint="done"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  autoComplete="off"
                />
              )}
      </div>
    </div>
  );
}

/** Yazma görevi: içerik noktaları, canlı kelime sayacı, rubrik değerlendirmesi. */
function OpenTask({
  course, task, value, score, attemptId, onOpen, onOpenScore,
}: {
  course: MockCourse;
  task: MockTask;
  value: string;
  score?: OpenScore;
  attemptId: number | null;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
}) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const n = words(value);
  const need = task.rubric?.minWords ?? 0;

  async function evaluate() {
    if (busy || !attemptId || n < MIN_ASSESS_WORDS) return;
    setBusy(true);
    try {
      const d = await post<{ result: OpenScore }>({ action: "assess", id: attemptId, taskId: task.id, text: value.trim() });
      onOpenScore(task.id, d.result);
    } catch (e) {
      onOpenScore(task.id, { score: null, consent: consentRefused(e) });
    }
    setBusy(false);
  }

  return (
    <div className="card p-4">
      <p className="muted text-micro uppercase tracking-eyebrow">{t("mockexam.content_points")}</p>
      {(task.rubric?.points ?? []).map((p, i) => (
        <div key={i} className="mt-2">
          <p className="text-body" lang={course}>• {p.de}</p>
          <p className="muted text-body">{p.tr}</p>
        </div>
      ))}

      <textarea
        value={value}
        onChange={(e) => onOpen(task.id, e.target.value)}
        rows={8}
        /* Cümle başı büyük, düzeltme kapalı (bkz. `exam-player`). */
        autoCapitalize="sentences"
        autoCorrect="off"
        spellCheck={false}
        className="input mt-4 w-full"
        placeholder={t("mockexam.write_here")}
        aria-label={t("mockexam.write_here")}
        lang={course}
      />
      <p className="muted mt-1 text-caption">
        {need
          ? t("mockexam.words_of", { done: n, n: need })
          : t("mockexam.words_n", { n })}
      </p>

      {score ? (
        <OpenResult score={score} refId={`mock:${attemptId ?? "local"}:${task.id}`} answer={value} />
      ) : (
        <>
          {/* SEBEP YAZIYOR (bkz. `exam-player`): üstteki sayaç görevin alt
              sınırını söylüyor, düğmenin uyduğu sayı başkaydı. */}
          {n < MIN_ASSESS_WORDS ? (
            <p className="muted mt-2 text-caption">{t("assess.gate_min_words", { n: MIN_ASSESS_WORDS })}</p>
          ) : null}
          <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-body" disabled={busy || !attemptId || n < MIN_ASSESS_WORDS} onClick={() => void evaluate()}>
            {t(busy ? "mockexam.evaluating" : "mockexam.evaluate")}
          </button>
        </>
      )}
      {!attemptId ? <p className="muted mt-2 text-caption">{t("mockexam.ai_needs_server")}</p> : null}
    </div>
  );
}

/**
 * Konuşma görevi — web, fazlı.
 *
 * Mobil oynatıcıyla aynı akış: hazırlık sayacı → karşı tarafın repliği sesle
 * okunur → sıra sana gelince mikrofon açılır → söylenen yazıya çevrilir.
 * Yazıya çeviren tarayıcının kendi tanıyıcısı (`captureSpeech`, sürekli kip):
 * ses kaydedilmiyor ve sunucuya gönderilmiyor (Samet, 2026-09-27). Tanıyıcısı
 * olmayan tarayıcıda (Firefox) mikrofon hiç açılmıyor, bunun sebebi söylenip
 * cevap yazıyla alınıyor.
 *
 * DÖKÜM DÜZENLENEBİLİR. Tanıyıcı yanılabiliyor ve değerlendirilen şey döküm.
 * Bu yüzden metin bir alana yazılıyor ve öğrenci düzeltebiliyor; mikrofon hiç
 * çalışmazsa aynı alana doğrudan yazılabiliyor. Ses hiçbir yerde saklanmıyor.
 */
function SpeakingTask({
  course, task, value, score, attemptId, onOpen, onOpenScore, onPending,
}: {
  course: MockCourse;
  task: MockTask;
  value: string;
  score?: OpenScore;
  attemptId: number | null;
  onOpen: (id: string, v: string) => void;
  onOpenScore: (id: string, v: OpenScore) => void;
  /** Söküm sırasında süren teslim — bitiriş bunu bekliyor. */
  onPending: (p: Promise<void>) => void;
}) {
  const t = useT();
  const [step, setStep] = useState<"waiting" | "prep" | "speaking" | "done">("waiting");
  const [turn, setTurn] = useState(0);
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [micErr, setMicErr] = useState(false);
  /**
   * Mikrofon ya da tanıyıcı kullanılamıyor: kalan turlarda mikrofon açılmıyor,
   * konuşma yazıyla sürüyor. Ref, çünkü karşılıklı konuşma döngüsü (`run`)
   * kapanışta eski durumu görür.
   */
  const micOffRef = useRef(false);
  /** Tarayıcının konuşma tanıyıcısı var mı — ilk çizimden sonra biliniyor. */
  const [asr, setAsr] = useState<boolean | null>(null);
  useEffect(() => setAsr(Boolean(recognitionCtor())), []);
  /** Süren dinleme ve "bitirdim" düğmesinin beklemeyi erken bitiren kolu. */
  const live = useRef<SpeechCapture | null>(null);
  const endTurn = useRef<(() => void) | null>(null);
  const alive = useRef(true);
  useEffect(
    () => () => {
      alive.current = false;
      endTurn.current?.();
      void live.current?.stop();
    },
    [],
  );

  const exchange = task.exchange ?? [];
  const prep = task.prepSeconds ?? 60;

  useEffect(() => {
    if (step !== "prep" && step !== "speaking") return;
    if (count <= 0) return;
    const id = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [step, count]);

  /** Karşı tarafın repliğini okur ve bitince döner. */
  const say = (text: string) =>
    new Promise<void>((resolve) => {
      let done = false;
      const finish = () => { if (!done) { done = true; resolve(); } };
      // Ses hiç çalmazsa görev asılı kalmasın: üst sınır konuşma uzunluğuna göre.
      const guard = setTimeout(finish, Math.min(30_000, 2500 + text.length * 90));
      /* Görevden çıkılınca (söküm `endTurn`ü çağırıyor) beklemeden dönülüyor:
         kesilen okuma `onEnd` vermiyor ve döküm 30 sn'lik tavanı beklerdi. */
      endTurn.current = () => { clearTimeout(guard); endTurn.current = null; finish(); };
      sayIn(course, text, () => { clearTimeout(guard); endTurn.current = null; finish(); }, partnerVoice(course));
    });

  /**
   * Bir turluk dinleme → düz metin. Tarayıcının tanıyıcısı turun süresi
   * boyunca açık kalıyor (sessizlikte kapanırsa yeniden açılıyor, bkz.
   * `captureSpeech`); süre dolunca ya da öğrenci "bitirdim" deyince kapanıyor.
   *
   * Güven eşiği UYGULANMIYOR: metin zaten düzenlenebilir ve eksik bir döküm
   * hiç dökümden iyidir.
   */
  async function listen(seconds: number): Promise<string> {
    const cap = await captureSpeech(localeOf(course), seconds * 1000 + 500);
    if (cap === "unsupported" || cap === "denied") {
      micOffRef.current = true;
      if (cap === "unsupported") setAsr(false);
      else setMicErr(true);
      return "";
    }
    if (!alive.current) {
      void cap.stop();
      return "";
    }
    live.current = cap;
    setCount(seconds);
    await new Promise<void>((resolve) => {
      const id = setTimeout(done, seconds * 1000);
      function done() {
        clearTimeout(id);
        endTurn.current = null;
        resolve();
      }
      endTurn.current = done;
    });
    live.current = null;
    const heard = await cap.stop();
    if (heard.error && !heard.text) {
      micOffRef.current = true;
      setMicErr(true);
    }
    return heard.text;
  }

  async function run() {
    setStep("speaking");
    const said: string[] = [];
    if (!exchange.length) {
      const got = await listen(task.speakSeconds ?? 120);
      if (got) said.push(got);
    } else {
      for (const [i, tn] of exchange.entries()) {
        if (!alive.current) break;
        /* Mikrofon ya da tanıyıcı yoksa kalan turlar için mikrofon açılmıyor:
           dinleyecek bir şey yok. Konuşma yazıyla sürüyor. */
        if (micOffRef.current) break;
        setTurn(i);
        if (tn.who === "partner") {
          setCount(0);
          await say(tn.de);
        } else {
          const got = await listen(tn.seconds);
          said.push(`(${tn.expect}) ${got}`.trim());
        }
      }
    }
    /* GÖREV KONUŞURKEN KAPANDIYSA (görev süresi doldu ya da "Sonraki görev")
       o ana kadar duyulan TESLİM EDİLİYOR. Görev saati görev açılınca
       başlıyor; hazırlık + konuşma onu aşınca kendiliğinden geçiş bileşeni
       söküyor ve döküm atılıyordu: söylenen cevap hiç kaydedilmiyordu.
       Hiçbir şey duyulmadıysa var olan metne dokunulmuyor. */
    if (!alive.current) {
      if (said.length) onOpen(task.id, said.join("\n"));
      return;
    }
    onOpen(task.id, said.join("\n"));
    setStep("done");
  }

  // Hazırlık bitince kendiliğinden konuşmaya geçer — dijital oturumda fazlar
  // otomatik akar.
  useEffect(() => {
    if (step === "prep" && count === 0) onPending(run());
  }, [step, count]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Döküm kaç KELIME: kapı karakter saymiyor artik (bkz. düğmenin yanindaki
     not). */
  const dokumSozcuk = value.trim() ? value.trim().split(/\s+/).length : 0;

  async function evaluate() {
    const text = value.trim();
    if (busy || !attemptId || dokumSozcuk < MIN_ASSESS_WORDS) return;
    setBusy(true);
    try {
      const d = await post<{ result: OpenScore }>({ action: "assess", id: attemptId, taskId: task.id, text });
      onOpenScore(task.id, d.result);
    } catch (e) {
      onOpenScore(task.id, { score: null, consent: consentRefused(e) });
    }
    setBusy(false);
  }

  const current = exchange[turn];
  return (
    <div className="card p-4">
      <p className="muted text-micro uppercase tracking-eyebrow">{t("mockexam.content_points")}</p>
      {(task.rubric?.points ?? []).map((p, i) => (
        <div key={i} className="mt-2">
          <p className="text-body" lang={course}>• {p.de}</p>
          <p className="muted text-body">{p.tr}</p>
        </div>
      ))}

      {step === "waiting" ? (
        <>
          <p className="muted mt-4 text-body leading-relaxed">
            {exchange.length
              ? t("mockexam.exchange_intro", { n: exchange.filter((x) => x.who === "you").length, prep })
              : t("mockexam.solo_intro", { prep, speak: task.speakSeconds ?? 120 })}
          </p>
          {/* Tanıyıcı yoksa mikrofonla başlatma düğmesi hiç çıkmıyor: ses başka
              bir yola gönderilmiyor, cevap yazıyla alınıyor. */}
          {asr === false ? (
            <p className="muted mt-3 text-body leading-relaxed">{t("speechw.unsupported")}</p>
          ) : (
            <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-body" onClick={() => { setCount(prep); setStep("prep"); }}>
              <SkillSpeakingIcon className="size-4" /> {t("mockexam.speak_start")}
            </button>
          )}
          <button type="button" className={`btn btn-ghost mt-3 px-4 py-2 text-body ${asr === false ? "" : "ml-2"}`} onClick={() => setStep("done")}>
            {t("mockexam.write_without_mic")}
          </button>
        </>
      ) : step === "prep" ? (
        <div className="mt-4 text-center">
          <p className="muted text-micro uppercase tracking-eyebrow">{t("mockexam.prep")}</p>
          <p className="text-h1 tabular-nums" style={{ color: "var(--color-brand)" }}>{mmss(count)}</p>
          <p className="muted mt-1 text-body">{t("mockexam.prep_hint")}</p>
        </div>
      ) : step === "speaking" ? (
        <div className="mt-4">
          {current?.who === "partner" ? (
            <>
              <p className="muted text-micro uppercase tracking-eyebrow">{t("mockexam.partner")}</p>
              <p className="mt-1 text-body leading-relaxed" lang={course}>{current.de}</p>
              <p className="muted mt-1 text-body">{current.tr}</p>
            </>
          ) : (
            <div className="text-center">
              <SkillSpeakingIcon className="mx-auto size-6" style={{ color: "var(--color-danger)" }} />
              <p className="mt-1 text-strong" style={{ color: "var(--color-danger)" }}>{t("mockexam.speak_now")} · {mmss(count)}</p>
              <p className="muted mt-1 text-body">{current?.who === "you" ? current.hint : t("mockexam.solo_hint")}</p>
              {/* Erken bitirmek: süre dolmadan söyleyeceğini bitiren öğrenci
                  sessiz saniyeleri beklemiyor. */}
              <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-body" onClick={() => endTurn.current?.()}>
                {t("common.finish")}
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <p className="muted mt-4 text-micro uppercase tracking-eyebrow">{t("mockexam.transcript_you")}</p>
          <textarea
            value={value}
            onChange={(e) => onOpen(task.id, e.target.value)}
            rows={8}
            autoCapitalize="sentences"
            autoCorrect="off"
            spellCheck={false}
            className="input mt-1 w-full"
            placeholder={t("mockexam.transcript_placeholder")}
            aria-label={t("mockexam.transcript_placeholder")}
            lang={course}
          />
          {/*
            Not mobil ile ORTAK cümle (`mockexam.transcript_note`): metin
            cihazdaki tanıyıcıdan geldi, ses Lernomi sunucusuna gitmiyor. Web
            eskiden sesi sunucuda yazıya çevirdiği için ayrı bir cümle
            taşıyordu; artık tarayıcının tanıyıcısı çeviriyor ve söz ikisinde
            de doğru. Tanıyıcı yoksa sebebi söyleniyor.
          */}
          <p className="muted mt-1 text-caption leading-relaxed">
            {t(micErr ? "mockexam.mic_failed" : asr === false ? "speechw.unsupported" : "mockexam.transcript_note")}
          </p>
          {score ? (
            <OpenResult score={score} refId={`mock:${attemptId ?? "local"}:${task.id}`} answer={value} />
          ) : (
            <>
              {/* TABAN KELIME, KARAKTER DEĞİL. Burada `length < 5` yazıyordu:
                  "ja ja" gibi iki kelimelik bir döküm geçiyor, "Entschuldigung"
                  gibi tek kelimelik bir döküm geçmiyordu. Android'de bu kapı
                  hiç yoktu; iki taraf artık aynı kelime tabanını kullanıyor. */}
              {dokumSozcuk < MIN_ASSESS_WORDS ? (
                <p className="muted mt-2 text-caption">{t("assess.gate_min_words", { n: MIN_ASSESS_WORDS })}</p>
              ) : null}
              <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-body" disabled={busy || !attemptId || dokumSozcuk < MIN_ASSESS_WORDS} onClick={() => void evaluate()}>
                {t(busy ? "mockexam.evaluating" : "mockexam.evaluate")}
              </button>
            </>
          )}
          {!attemptId ? <p className="muted mt-2 text-caption">{t("mockexam.ai_needs_server")}</p> : null}
        </>
      )}
    </div>
  );
}

/**
 * Yazma/konuşma görevinin yapay zekâ sonucu. Altında yapay zekâ etiketi ve
 * "Bildir" var (denetim İ2; mobil `MockExamScreen` `OpenResult` ile aynı ref
 * biçimi: "mock:<deneme>:<görev>").
 */
function OpenResult({ score, refId, answer }: { score: OpenScore; refId: string; answer: string }) {
  const t = useT();
  const lang = useLang();
  const [reporting, setReporting] = useState(false);
  if (score.score == null) {
    return <p className="muted mt-3 text-body leading-relaxed">{t(score.consent ? "assess.fail_consent" : "mockexam.ai_off")}</p>;
  }
  return (
    <div className="mt-3">
      <p className="text-h3" style={{ color: score.score >= MOCK_PASS_PCT ? "var(--color-success)" : "var(--color-danger)" }}>{formatPercent(score.score, lang)}</p>
      {score.praise ? <p className="muted mt-1 text-body leading-relaxed">{score.praise}</p> : null}
      {score.tip ? <p className="mt-1 text-body leading-relaxed">{score.tip}</p> : null}
      {/* DOĞRU BİÇİM `right` YA DA `fix` (denetim T14): sunucu ikisini de
          gönderiyor, eski kayıtta yalnız `fix` olabilir. Hatalı parça boşsa
          (eksik sözcük) ok çizilmiyor — `assessment-card` ile aynı kalıp. */}
      {(score.errors ?? []).slice(0, 5).map((e, i) => (
        <p key={i} className="muted mt-1 text-body">{e.wrong ? `${e.wrong} → ` : ""}{e.right || e.fix || ""}{e.why_tr ? ` · ${e.why_tr}` : ""}</p>
      ))}
      <AiNotice variant="output" className="mt-3" />
      <div className="mt-2">
        <ReportLink onClick={() => setReporting(true)} label={t("writings.report_this_feedback")} />
      </div>
      <ReportDialog open={reporting} kind="assessment" refId={refId} content={JSON.stringify({ answer, result: score })} onClose={() => setReporting(false)} />
    </div>
  );
}

/* ── sonuç ────────────────────────────────────────────────────────────────── */

/**
 * Geçmek için kaç doğru daha gerekiyordu — bandın kırmızı etiketi.
 * Eşik yüzde, puan yuvarlanıyor; söylenen şey öğrencinin sayabileceği birim:
 * madde. Mobil `MockExamScreen` `shortBy` ile aynı hesap.
 */
function shortBy(score: Score): number {
  for (let c = score.correct + 1; c <= score.total; c++) {
    if (Math.round((100 * c) / score.total) >= MOCK_PASS_PCT) return c - score.correct;
  }
  return 0;
}

/**
 * Bölüm sonucu — SONUÇ şablonu (components/flow).
 *
 * Band (kâğıt · bölüm · geçtin/geçemedin · yüzde · maskot) → doğru, puan,
 * eşik → sunucu notları → ölçüm hedefleri ve yapılacaklar kartları. Eskiden
 * maskot ve konfeti yoktu; sonuç, notlar ve bütün çözümler tek uzun sütundaydı.
 *
 * ÇÖZÜMLER AYRI GÖRÜNÜMDE. Bir C1 kâğıdında onlarca madde var; sonucun altına
 * dizilince özet kayboluyordu. Birincil düğme çözümleri açıyor, "Sonuca dön"
 * geri getiriyor. Mobil aynı iki görünümü çiziyor.
 */
function Result({
  paper, part, eyebrow, open, openScores, result, reveal, onReveal, attemptId,
}: {
  attemptId: number | null;
  paper: PlayerPaper;
  part: MockPart;
  eyebrow: ReactNode;
  open: Record<string, string>;
  openScores: Record<string, OpenScore>;
  result: { score: Score; ai: Feedback | null; offline: Fail | null };
  reveal: Record<string, boolean>;
  onReveal: (id: string) => void;
}) {
  const t = useT();
  const lang = useLang();
  const { score, ai, offline } = result;
  const [review, setReview] = useState(false);
  /* Konfeti bir kez: çözümlerden sonuca dönüşte yeniden patlamasın. */
  const [celebrated, setCelebrated] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const show = (on: boolean) => {
    setReview(on);
    if (on) setCelebrated(true);
    top.current?.scrollIntoView({ block: "start" });
  };
  const graded = score.total > 0;
  /* SONUÇ SESİ — ekran ilk göründüğünde bir kez (çözümlerden dönüşte değil):
     geçti → `finish`; kaldı ya da puansız bölüm → `stage` (kapanışı söylüyor,
     kutlamıyor). Mobil `MockExamScreen` aynı kural; ref Strict Mode için. */
  const sounded = useRef(false);
  useEffect(() => {
    if (sounded.current) return;
    sounded.current = true;
    play(graded && score.passed ? "finish" : "stage");
  }, [graded, score.passed]);
  /*
   * AÇIK BÖLÜM (yazma/konuşma, denetim T15). Sunucu yüzdeyi görevlerin
   * yapay zekâ puanından kuruyor (`scoreSection`) ve `open` dökümünü
   * gönderiyor. Birim madde değil GÖREV: "78/100 doğru" ve "geçmek için 5
   * doğru daha" cümleleri burada anlamsız, yerine "2 görevin ortalaması" ve
   * puanlanan görev sayısı. `open` yoksa (okuma/dinleme) eski çizim. Mobil
   * `MockExamScreen` `ResultView` aynı kararı veriyor.
   */
  const openPart = score.open;
  const counted = openPart ? openPart.tasks.filter((x) => x.pct !== null).length : 0;
  const need = graded && !score.passed && !openPart ? shortBy(score) : 0;

  if (review) {
    return (
      <div ref={top} className="scroll-mt-4">
        <FlowColumn>
          <h2 className="text-h3">{t("mockexam.review")}</h2>
          {part.tasks.map((task) => (
            <div key={task.id} className="space-y-2">
              {/* Kâğıdın dilinde ("Teil" / "Part"); `lang` büyük harfi o dile göre
                  yaptırıyor, Türkçe arayüzde "TEİL" olmasın. */}
              <p className="muted text-micro uppercase tracking-eyebrow" lang={paper.course}>{mockPartLabel(paper.course, task.no)}</p>
              {isOpenTask(task) && task.rubric ? (
                <div className="card p-4">
                  {(open[task.id] ?? "").trim() ? (
                    <>
                      <p className="muted text-micro uppercase tracking-eyebrow">{t("mockexam.your_answer")}</p>
                      <p className="mt-1 whitespace-pre-line text-body leading-relaxed" lang={paper.course}>{open[task.id]}</p>
                    </>
                  ) : null}
                  {openScores[task.id] ? <OpenResult score={openScores[task.id]} refId={`mock:${attemptId ?? "local"}:${task.id}`} answer={open[task.id] ?? ""} /> : null}
                  <p className="muted mt-3 text-micro uppercase tracking-eyebrow">{t("mockexam.criteria")}</p>
                  {task.rubric.criteria.map((c, i) => <p key={i} className="muted mt-1 text-body leading-relaxed">• {c}</p>)}
                  {reveal[task.id] ? (
                    <>
                      <p className="muted mt-3 text-micro uppercase tracking-eyebrow">{t("mockexam.model_answer")}</p>
                      <p className="mt-1 whitespace-pre-line text-body leading-relaxed" lang={paper.course}>{task.rubric.sample}</p>
                    </>
                  ) : (
                    <button type="button" className="btn btn-ghost mt-3 px-4 py-2 text-body" onClick={() => onReveal(task.id)}>{t("mockexam.show_model")}</button>
                  )}
                </div>
              ) : (
                task.items.map((it) => {
                  const s = score.items.find((x) => x.id === it.id);
                  /* Sonuç sunucudan: madde orada yoksa doğru sayılmıyor. */
                  const ok = s?.correct ?? false;
                  return (
                    <div key={it.id} className="card flex items-start gap-3 p-4">
                      <IconLine className="text-strong leading-relaxed" box="1.5rem">
                        <span
                          className="flex size-6 items-center justify-center rounded-full text-caption"
                          style={{ background: ok ? "var(--color-success-soft)" : "var(--color-danger-soft)", color: ok ? "var(--color-success)" : "var(--color-danger)" }}
                        >
                          {ok ? <CorrectIcon className="size-3.5" /> : <WrongIcon className="size-3.5" />}
                        </span>
                      </IconLine>
                      <div className="min-w-0 flex-1">
                        <p className="whitespace-pre-line text-strong leading-relaxed" lang={paper.course} style={lineInset("1.5rem")}>{it.no}. {it.text}</p>
                        {/* Anahtar sözcük dökümde de görünmeli: açıklama ona gönderme yapıyor. */}
                        {it.kind === "gap" && it.cue ? (
                          <p className="mt-1 text-strong tracking-wide" lang={paper.course} style={{ color: "var(--color-brand)" }}>{it.cue}</p>
                        ) : null}
                        {!ok ? (
                          <p className="muted mt-1 text-body">
                            {t("mockexam.your_answer")}: {s?.given || t("mockexam.blank")}
                          </p>
                        ) : null}
                        <p className="mt-1 text-body" style={{ color: ok ? "var(--color-success)" : undefined }}>
                          {t("mockexam.correct_answer")}: {s?.expected ?? ""}
                        </p>
                        {s?.explain ? <p className="muted mt-1 text-body leading-relaxed">{s.explain}</p> : null}
                        {/* İçerik bildirimi: maddenin açıklamasının altında (görev +
                            madde no). Yanlış anahtar çoğu zaman burada fark ediliyor. */}
                        <ReportFlag
                          className="mt-1"
                          surface="mock"
                          target={{ type: "mock_task", id: task.id, sub: String(it.no) }}
                          content={() => snapshot({ item: it, given: s?.given, expected: s?.expected, review: true })}
                        />
                      </div>
                    </div>
                  );
                })
              )}

              {/* SÖZLÜKÇE SINAVDAN SONRA. Metinlerin kilit kelimeleri içerikte
                  duruyordu (`gloss`) ve tip de bunu "sınavdan sonra, dökümde
                  gösterilir" diye yazıyordu ama web hiçbir yerde çizmiyordu:
                  yazılmış içerik sessizce düşüyordu. Android ikisini de gösteriyor
                  - dinleme dökümünün altında ve okuma metni için ayrı kartta. */}
              {(task.texts ?? []).map((st) =>
                st.kind === "audio" ? (
                  <div key={st.id} className="card p-4">
                    <p className="muted text-micro uppercase tracking-eyebrow">{t("mockexam.transcript")} · {st.genreTr}</p>
                    {st.segments.map((sg, i) => (
                      <p key={i} className="mt-1 text-body leading-relaxed" lang={paper.course}>{sg.speaker ? `${sg.speaker}: ` : ""}{sg.text}</p>
                    ))}
                    <Glossary gloss={st.gloss} course={paper.course} t={t} />
                  </div>
                ) : st.gloss?.length ? (
                  <div key={st.id} className="card p-4">
                    <Glossary gloss={st.gloss} course={paper.course} t={t} />
                  </div>
                ) : null,
              )}
            </div>
          ))}

          <FlowActions
            primary={{ label: t("mockexam.back_to_result"), onClick: () => show(false) }}
            close="/mock-exams"
          />
        </FlowColumn>
      </div>
    );
  }

  return (
    <div ref={top} className="scroll-mt-4">
      {/* Konfeti YALNIZ geçilen bölümde. */}
      <FlowColumn celebrate={graded && score.passed && !celebrated}>
        <ResultHero
          eyebrow={eyebrow}
          title={graded ? t(score.passed ? "mockexam.passed" : "mockexam.failed") : t("mockexam.part_done")}
          figure={graded ? formatPercent(score.pct, lang) : null}
          sub={
            !graded
              ? t("mockexam.not_scored")
              : openPart
                ? t("mockexam.open_result_sub", { n: counted, pct: MOCK_PASS_PCT })
                : t("mockexam.result_sub", { correct: score.correct, total: score.total, pct: MOCK_PASS_PCT })
          }
          quiet={graded && !score.passed}
          pill={need > 0 ? { text: t("mockexam.short_by", { n: need }), tone: "bad" } : null}
        />
        {graded ? (
          <StatRow
            items={[
              openPart
                ? { value: `${counted}/${openPart.tasks.length}`, label: t("mockexam.stat_tasks") }
                : { value: `${score.correct}/${score.total}`, label: t("mockexam.stat_correct") },
              { value: formatPercent(score.pct, lang), label: t("mockexam.stat_score"), tone: score.passed ? "ok" : "bad" },
              { value: formatPercent(MOCK_PASS_PCT, lang), label: t("mockexam.stat_threshold") },
            ]}
          />
        ) : null}

        {/* Metni olup puanı olmayan görev ortalamaya girmiyor; kaç tane olduğu söyleniyor. */}
        {graded && openPart && openPart.unscored > 0 ? (
          <FlowNote icon={<WarningIcon size={16} className="muted shrink-0" />} text={t("mockexam.open_unscored", { n: openPart.unscored })} />
        ) : null}
        {/* Sunucuya ulaşılamadı: sebep kırmızı, sonucun nerede saklandığı ayrı satır. */}
        {offline ? <FlowNote tone="bad" icon={<OfflineIcon size={16} className="shrink-0" />} text={t(FAIL_KEYS[offline])} /> : null}
        {offline ? <FlowNote icon={<CorrectIcon size={16} className="muted shrink-0" />} text={t("mockexam.saved_locally")} /> : null}

        {score.byGoal.length ? (
          <DetailCard title={t("mockexam.by_goal")}>
            {score.byGoal.map((g) => {
              const pct = g.total ? Math.round((100 * g.correct) / g.total) : 0;
              return (
                <div key={g.goal}>
                  <div className="flex justify-between text-body">
                    <span>{GOAL_KEYS[g.goal] ? t(GOAL_KEYS[g.goal]) : g.goal}</span>
                    {/* Açık bölümde hedef de görev ortalaması: sayı değil yüzde. */}
                    <span className="font-semibold">{openPart ? formatPercent(pct, lang) : `${g.correct}/${g.total}`}</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full" style={{ background: "var(--surface-2)" }}>
                    <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: pct >= MOCK_PASS_PCT ? "var(--color-success)" : pct >= 50 ? "var(--color-brand)" : "var(--color-danger)" }} />
                  </div>
                </div>
              );
            })}
          </DetailCard>
        ) : null}

        {/* Hiç hatası olmayan bölümde (`source: "perfect"`) yapılacak iş yok; başlık
            "YAPILACAKLAR" değil "Kusursuz" (QA F-0063). Kural sunucuda, `mockFlawless`;
            Android `MockExamScreen` aynı. */}
        {ai ? (
          <DetailCard title={ai.source === "perfect" ? t("skillp.result_perfect") : t("mockexam.todo")}>
            <p className="text-body leading-relaxed">{ai.summary}</p>
            {ai.strengths.length ? (
              <p className="text-body" style={{ color: "var(--color-success)" }}>
                {t("mockexam.strengths")}: {ai.strengths.join(" · ")}
              </p>
            ) : null}
            {ai.todo.map((td, i) => (
              <div key={i} className="mt-1 border-l-2 pl-3" style={{ borderColor: "var(--color-brand)" }}>
                <p className="text-strong">{i + 1}. {td.title}</p>
                <p className="muted mt-0.5 text-body">{td.why}</p>
                <p className="mt-1 text-body leading-relaxed">{td.how}</p>
              </div>
            ))}
            {ai.source === "rules" ? <p className="muted text-caption">{t("mockexam.source_rules")}</p> : null}
          </DetailCard>
        ) : null}

        <FlowActions
          primary={{ label: t("mockexam.show_review"), onClick: () => show(true) }}
          close="/mock-exams"
        />
      </FlowColumn>
    </div>
  );
}

/**
 * Metnin kilit kelimeleri — yalnız sınav bittikten sonra, dökümün yanında.
 * Sınav sırasında gösterilseydi okuma görevinin yarısını hediye ederdi;
 * Android'de de kapanış ekranında duruyor.
 */
function Glossary({
  gloss,
  course,
  t,
}: {
  gloss?: { de: string; tr: string }[];
  course: string;
  t: ReturnType<typeof useT>;
}) {
  if (!gloss?.length) return null;
  return (
    <>
      <p className="muted mt-3 text-micro uppercase tracking-eyebrow">{t("mockexam.glossary")}</p>
      <dl className="mt-1">
        {gloss.map((g) => (
          <div key={g.de} className="muted flex gap-1.5 text-caption leading-relaxed">
            <dt lang={course}>{g.de}</dt>
            <dd>— {g.tr}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
