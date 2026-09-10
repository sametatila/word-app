import { api } from "../api/client";
import { supportsGame } from "../lib/courses";
import type { ErrorType } from "../lib/errors";

/**
 * GERÇEK oyun oturumu — web API'siyle aynı sözleşme (sunucudan gerçek kelimeler
 * + SRS). GET /api/session gerçek turları döndürür, POST /api/answers cevapları
 * yazar (SRS'i günceller). Demo YOK: veri kullanıcının kendi hesabından gelir.
 */
export type RoundWord = {
  id: number;
  de: string;
  artikel: string | null;
  tr: string;
  en: string | null;
  typ: string;
  niveau: string;
  beispiel: string | null;
  beispielTr: string | null;
  beispielEn?: string | null;
  formen: string | null;
  isNew: boolean;
};

export type Option = { text: string; sub: string | null };

/** Web Round union'ının pratik hâli — her oyun kendi alanlarını okur. */
export type Round = {
  id: string;
  game: string;
  word?: RoundWord;
  words?: RoundWord[];
  options?: Option[];
  direction?: "de-tr" | "tr-de";
  sentence?: string;
  sentenceTr?: string | null;
  sentenceEn?: string | null;
  answer?: string;
  claim?: Option;
  isTrue?: boolean;
  blank?: string;
  tokens?: string[];
  correctOrder?: string[];
  prompt?: string;
  /** order: cümle sonu noktalaması (son kelimeyi ele vermesin diye ayrı durur). */
  tail?: string;
  /** translate: kabul edilen başka kuruluşlar. */
  alternatives?: string[];
  /**
   * cloze: "type" ise boşluk YAZILARAK dolduruluyor, şıkla değil.
   *
   * Sunucu bunu sağlamlığa göre veriyor (`lib/ladder` `clozeTypeChance`:
   * sağlam kelimede yarı yarıya, oturmuşta dörtte bir) ve web okuyordu; mobil
   * alanı hiç tanımıyordu, yani zorlaştırma Androidde HİÇ olmuyordu - şıklar
   * her seferinde çiziliyor ve tur olduğundan kolay geçiyordu.
   */
  mode?: "type";
  /**
   * typing: sunucu bu turu YENİ kelimenin hemen ardına koydu ve ipucu baştan
   * açık olmalı (`lib/session`: taze kelimeden sonra `assist: true`).
   *
   * Web `typing-game` bunu `hintShown` başlangıç değeri yapıyor ve cevabı
   * `hintUsed` olarak gönderiyor. Mobil alanı hiç tanımıyordu: iskele hiç
   * gösterilmiyor ve ipucu kullanılmamış sayılıyordu.
   */
  assist?: boolean;
};

export type SessionMeta = {
  dueCount: number;
  newToday: number;
  reviewsToday: number;
  dailyGoal: number;
  currentStreak: number;
  totalXp: number;
  displayName: string | null;
  level: string;
  /**
   * Seçilen seviyenin pekişme durumu — yalnızca artan bir ölçü.
   *
   * Sunucu baştan beri gönderiyor ama mobilin tipi alanı tanımıyordu, yani
   * sessizce düşüyordu ve oturum başlığındaki seviye rozeti hiç çizilemiyordu
   * (web `session-player` çiziyor). Bkz. web-parity §11.22.
   */
  coverage?: { mastered: number; total: number };
};

/** Yarım kalan turun sunucudaki durumu — kaldığın yerden devam için. */
export type ResumeState = { index: number; correct: number; total: number; xp: number; missed: unknown[] };

export type SessionPayload = { rounds: Round[]; resume: ResumeState | null; meta: SessionMeta };

/** Oturum ilerlemesi — cevaplarla birlikte gidip `session_state.index`'i ilerletir
    (böylece kapatıp açınca tur baştan tekrar oynanmaz ve çift sayılmaz). */
export type SessionProgress = { index: number; correct: number; total: number; xp: number };

export type AnswerOut = {
  wordId: number;
  game: string;
  correct: boolean;
  latencyMs: number;
  quality?: number;
  /**
   * Hata tipi — web `Answer` ile aynı alan.
   *
   * Uç (`/api/answers`, `/api/exam`) bunu baştan beri doğruluyor ve
   * `lib/error-analytics` hata dökümünü buradan çıkarıyor; mobil hiç
   * göndermiyordu, yani yalnız Androidde çalışan bir kullanıcının dökümü
   * boştu ve SRS ağırlığı (`srsWeightFor`) hep 1 sayılıyordu.
   */
  errorType?: ErrorType;
  detail?: string;
  /**
   * İpucu kullanıldı mı — SUNUCUDAKİ SRS puanını belirliyor.
   *
   * `lib/srs` `grade(game, correct, latencyMs, hintUsed)`: ipucu kullanıldıysa
   * kalite hızdan bağımsız 3, yoksa 5'e kadar çıkıyor. Mobil bu alanı hiç
   * göndermiyordu, yani cevabı görüp yazan kullanıcı hızlı ve doğru sayılıp
   * 5 alıyordu - ipucu Androidde BEDAVAYDI.
   */
  hintUsed?: boolean;
};

/** Tur bileşeninin sonuca ekleyebildiği alanlar (bkz. `game/rounds` `Done`). */
export type DoneExtra = {
  /** Çok kelimeli tur (eşleştirme): her kelimenin sonucu ayrı. */
  batch?: { wordId: number; correct: boolean }[];
  errorType?: ErrorType;
  detail?: string;
  quality?: number;
  hintUsed?: boolean;
  /**
   * Bu tur için CEVAP KAYDEDİLMESİN.
   *
   * "Bunu zaten biliyorum" yolunun gereği: kelime tekrar kuyruğuna girmeden
   * pekişmiş sayılıyor (`/api/words/known`) ve turun kendisi bir cevap
   * üretmiyor. Web `intro-game` bunu `onDone([])` ile, yani boş cevap
   * dizisiyle söylüyor.
   */
  skip?: boolean;
};

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Günün turu (gerçek). Oturum yoksa ApiError(401) fırlar — çağıran girişe yönlendirir.
    `game`: tek-oyun pratiği (web'deki oyun seçici — ör. yalnız "artikel").
    `fresh`: "yeni tura başla" — önce kayıtlı turu atar, sonra yenisini kurar. */
/**
 * OYNAYAMADIĞIMIZ TUR TÜRLERİ SUNUCUYA SÖYLENİYOR.
 *
 * `free_sentence` (AI hakemli serbest cümle) turunun mobilde oynatıcısı yok:
 * `pickRound` onu tanımıyor ve tur bilinmeyen oyun dalına düşüp kendini
 * anlatmayan bir "cevabı gör" kartı olarak çiziliyordu. Sunucu bu turu sağlam
 * kelimelerde ve AI açıkken karışık oturuma koyuyor, yani gerçekten geliyordu.
 * Haftalık sınav çağrısı aynı süzgeci baştan beri taşıyor (bkz. `game/weekly`).
 */
const SKIP_GAMES = "free_sentence";

export async function fetchSession(day = todayStr(), opts?: { extra?: boolean; walk?: boolean; game?: string; fresh?: boolean; skip?: number[] }): Promise<SessionPayload> {
  if (opts?.fresh) { try { await api("/api/session", { method: "DELETE" }); } catch { /* yut */ } }
  // walk devam turları: sorulan kelimeleri hariç tut (sunucu en fazla 200 alır).
  const skip = opts?.skip && opts.skip.length ? `&skip=${opts.skip.slice(-200).join(",")}` : "";
  const q = `&skipGames=${SKIP_GAMES}${opts?.extra ? "&extra=1" : ""}${opts?.walk ? "&walk=1" : ""}${opts?.game ? `&game=${opts.game}` : ""}${skip}`;
  return api<SessionPayload>(`/api/session?day=${day}${q}`);
}

/**
 * Tek-oyun pratiğinde oynanabilecek türler (web PLAYABLE_GAMES ile aynı).
 * Etiket ANAHTAR tutuyor: sabit dizi modül yüklenirken kurulur ve o an dil tercihi
 * (loadLang) henüz okunmamış olur — t() burada çağrılsaydı adlar Türkçe donardı.
 */
export const PRACTICE_GAMES: { game: string; label: string }[] = [
  { game: "choice", label: "games.choice" },
  { game: "artikel", label: "games.article_race" },
  { game: "cloze", label: "games.cloze" },
  { game: "typing", label: "games.typing" },
  { game: "listen", label: "games.listen" },
  { game: "truefalse", label: "games.truefalse" },
  { game: "match", label: "games.match" },
  { game: "scramble", label: "games.scramble" },
  { game: "order", label: "games.order" },
  { game: "plural", label: "games.plural" },
  { game: "translate", label: "games.translate" },
];

/**
 * Kursta gerçekten oynanabilecek türler.
 *
 * Artikel Yarışı ve Çoğul Bilmece Almancanın cinsiyetli isim sistemine
 * dayanıyor (der/die/das ve "die …" çoğulu); İngilizcede karşılıkları yok.
 * Sunucu böyle bir tur zaten üretmiyor (artikel alanı boşsa tur `null` dönüyor),
 * ama seçim ekranı listeyi sabit gösterdiği için kullanıcı boş bir turu
 * seçebiliyordu. Eleme burada, kurs kayıt defterindeki `hasArticles` bayrağına
 * göre yapılıyor.
 */
export function practiceGamesFor(course: string | null | undefined) {
  return PRACTICE_GAMES.filter((g) => supportsGame(course, g.game));
}

/**
 * Oturum sonucunun ekrana yansıyan kısmı.
 *
 * Uç bundan çok daha fazlasını döndürüyor (XP, ustalaşan kelimeler, yarınki
 * tekrar sayısı); burada yalnız SÖYLENMEZSE anlaşılmayacak olan alan var.
 * Seri onarımı böyle bir alan: kullanıcı bir gün kaçırdığını biliyor ve
 * sayacın sıfırlanmasını bekliyor — sıfırlanmadığını görüp sebebini
 * öğrenemezse rakam açıklanamaz hâle geliyor.
 */
/**
 * `/api/answers` yanıtı — web `AnswerResult` ile aynı alanlar.
 *
 * Mobil tipte yalnız üç alan vardı ve geri kalanı sessizce düşüyordu; oturum
 * özeti bu yüzden kazanılan XP'yi, günlük hedefi, pekişen kelimeyi ve yarına
 * kalan tekrarı HİÇ göstermiyordu (web `session-player` dördünü de gösteriyor).
 * Bkz. web-parity §11.23.
 *
 * `wagerXp` mobilde okunmuyor: bahisli etap mobilde hiç yok.
 */
export type SubmitResult = {
  streakRepaired: boolean;
  currentStreak: number;
  /** Bu turda pekişme eşiğini geçen kelime sayısı — kutlama eşiği buna bakıyor. */
  newlyMastered: number;
  xpGained: number;
  totalXp: number;
  longestStreak: number;
  reviewsToday: number;
  dailyGoal: number;
  goalReached: boolean;
  /** Yarın tekrar zamanı gelen kelime sayısı. */
  dueTomorrow: number;
  /** Bahisli etabın puan farkı — mobilde bahis yok, alan sözleşme için var. */
  wagerXp: number;
};

/** Cevapları sunucuya yazar (SRS + XP + seri güncellenir). `progress` verilirse
    oturum konumu da (index) kaydedilir — kaldığın yerden devam için. */
/**
 * "Bunu zaten biliyorum": kelime tekrar kuyruğuna girmeden pekişmiş sayılır.
 *
 * Web `intro-game`de baştan beri var, mobilde HİÇ YOKTU: bildiği bir kelimeyi
 * gören kullanıcı onu kuyruktan çıkaramıyor, her tekrarında yeniden görüyordu.
 * Hata YUTULUYOR - çevrimdışıysa tur yine ilerliyor (web de öyle yapıyor).
 */
export async function markKnown(wordId: number): Promise<void> {
  try {
    await api("/api/words/known", { method: "POST", body: JSON.stringify({ wordId }) });
  } catch { /* çevrimdışı: tur yine ilerler */ }
}

export function submitAnswers(answers: AnswerOut[], day: string, seconds: number, progress?: SessionProgress): Promise<SubmitResult> {
  return api("/api/answers", { method: "POST", body: JSON.stringify({ answers, day, seconds, ...(progress ? { progress } : {}) }) });
}
