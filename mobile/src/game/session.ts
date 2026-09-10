import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, ApiError } from "../api/client";
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

/** Nesne şıklar (`choice`, `listen`). Dizge şıklı turlarda boş döner. */
export function optionCards(round: { options?: Option[] | string[] }): Option[] {
  const o = round.options ?? [];
  return typeof o[0] === "object" ? (o as Option[]) : [];
}

/** Dizge şıklar (`cloze`, `plural`). Nesne şıklı turlarda boş döner. */
export function optionTexts(round: { options?: Option[] | string[] }): string[] {
  const o = round.options ?? [];
  return typeof o[0] === "string" ? (o as string[]) : [];
}

/** Web Round union'ının pratik hâli — her oyun kendi alanlarını okur. */
export type Round = {
  id: string;
  game: string;
  word?: RoundWord;
  words?: RoundWord[];
  /**
   * ŞIKLAR İKİ BİÇİMDE GELİYOR ve tip ikisini de söylemek zorunda.
   *
   * `choice`/`listen` turunda şık bir NESNE (`{ text, sub }` — ikinci satır
   * anlam), `cloze`/`plural` turunda ise DÜZ DİZGE: o turlarda şıklar Almanca
   * biçimler, ikinci dil satırı yok (sunucu tarafı `lib/session` içinde
   * yazılı). Web bunu oyun başına ayrı tiplerle söylüyor (`Round` birleşimi);
   * mobil tek gövdeli tip kullandığı için burada birleşim duruyordu — ama tip
   * yalnız `Option[]` diyordu ve iki çağrı yeri `as unknown as string[]` ile
   * kaçıyordu. Kaçış, alan biçimi değişirse hatayı derlemede DEĞİL çalışma
   * anında gösterirdi.
   */
  options?: Option[] | string[];
  direction?: "de-tr" | "tr-de";
  /**
   * Cümle. `translate` turunda NESNE (`{ tr, de, en }`), cloze/scramble/intro
   * turlarında düz dizge — web birleşiminde de öyle. Mobil tek gövdeli bir tip
   * kullandığı için ikisi burada yazılı; eskiden yalnız `string` deniyor ve
   * `translate` turu `as unknown as` ile kaçırılıyordu.
   */
  sentence?: string | { tr: string; de: string; en: string | null };
  sentenceTr?: string | null;
  sentenceEn?: string | null;
  /**
   * Doğru cevap. `order` turunda DİZİ (sunucu kelimeleri sırayla veriyor),
   * öteki turlarda tek dizge — web `Round` birleşiminde ikisi ayrı üye
   * (`order` için `answer: string[]`, cloze/plural için `answer: string`).
   * Mobil tek gövdeli bir tip kullandığı için birleşim burada yazılı.
   *
   * Eskiden yalnız `string` deniyordu ve `order` turu iki yerde
   * `as unknown as string[]` ile kaçırılıyordu: tip sözleşmeyi yanlış
   * anlatıyor, kaçış da yanlışı saklıyordu.
   */
  answer?: string | string[];
  claim?: Option;
  isTrue?: boolean;
  tokens?: string[];
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
/** Tur özetinde gösterilen, o turda yanlış bilinen kelime — web `MissedWord`. */
export type MissedWord = { id: number; de: string; tr: string; en: string | null };

export type ResumeState = {
  index: number; correct: number; total: number; xp: number;
  /* `unknown[]` yazılıydı: alan tanınıyor ama içine bakılamıyordu, yani
     zorlanılan kelimeler mobilde HİÇBİR yerde kullanılamıyordu. */
  missed: MissedWord[];
};

export type SessionPayload = { rounds: Round[]; resume: ResumeState | null; meta: SessionMeta };

/** Oturum ilerlemesi — cevaplarla birlikte gidip `session_state.index`'i ilerletir
    (böylece kapatıp açınca tur baştan tekrar oynanmaz ve çift sayılmaz). */
/**
 * Turun sunucuda tutulan ilerlemesi.
 *
 * `missed` MOBİLDE TİPTEN DÜŞÜYORDU: sunucu bu alanı saklıyor ve web yarım
 * kalan turu sürdürürken zorlanılan kelimeleri oradan geri alıyor. Mobil
 * göndermediği için Androidde başlanan bir tur webde sürdürüldüğünde liste
 * boş geliyordu; mobilde de hiç gösterilmiyordu.
 */
export type SessionProgress = { index: number; correct: number; total: number; xp: number; missed: MissedWord[] };

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

/**
 * CEVAPLAR KAYBOLMUYOR.
 *
 * Yazma başarısız olduğunda çağıranların hepsi hatayı yutuyordu ("sessizce
 * düşer") ve tur boyunca verilen cevaplar — SRS güncellemesi, XP, seri —
 * SUNUCUYA HİÇ ULAŞMIYORDU. Kullanıcıya da bir şey söylenmiyordu: ekranda
 * puan artıyor, sunucuda hiçbir şey değişmiyor. Web aynı yerde batch'i
 * kuyruğa geri koyup bağlantı dönünce yeniden gönderiyor
 * (`session-player` `flush`).
 *
 * Kuyruk CİHAZDA: uygulama kapansa bile duruyor. `day` batch'le birlikte
 * saklanıyor çünkü seri kullanıcının O GÜNÜNE ait; ertesi gün gönderilen
 * cevabın bugüne yazılması seriyi yanlış hesaplardı.
 *
 * KALICI HATA KUYRUĞA GİRMİYOR: sunucunun asla kabul etmeyeceği bir istek
 * (biçim hatası), kuyruktaki her turu da batırırdı — web aynı ayrımı yapıyor
 * (`session-player` 4xx'te `dropped`). Ama 401/403 KALICI DEĞİL: oturum
 * düşmüşken atılan bir tur, kullanıcı yeniden girince gönderilebilir; onu
 * "sunucu reddetti" sayıp silmek, tam da korumaya çalıştığımız veriyi atardı.
 */
export function isPermanentError(e: unknown): boolean {
  if (!(e instanceof ApiError)) return false;
  if (e.status === 401 || e.status === 403 || e.status === 408 || e.status === 429) return false;
  return e.status >= 400 && e.status < 500;
}
const ANSWER_QUEUE_KEY = "lernomi-answer-queue";
type QueuedAnswers = { answers: AnswerOut[]; day: string; seconds: number };

async function queueAnswers(item: QueuedAnswers): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(ANSWER_QUEUE_KEY);
    const list = raw ? (JSON.parse(raw) as QueuedAnswers[]) : [];
    list.push(item);
    /* Kuyruk sınırlı: eski turlar SRS için zaten değerini yitiriyor ve
       sınırsız büyüyen bir kuyruk depolamayı şişirir. */
    await AsyncStorage.setItem(ANSWER_QUEUE_KEY, JSON.stringify(list.slice(-20)));
  } catch { /* depolama yoksa yapacak bir şey yok */ }
}

/** Bekleyen cevapları gönderir; biri düşerse kalanı kuyrukta bırakır. */
export async function flushPendingAnswers(): Promise<void> {
  let list: QueuedAnswers[] = [];
  try {
    const raw = await AsyncStorage.getItem(ANSWER_QUEUE_KEY);
    list = raw ? (JSON.parse(raw) as QueuedAnswers[]) : [];
  } catch { return; }
  if (!list.length) return;
  const remaining: QueuedAnswers[] = [];
  for (const [i, item] of list.entries()) {
    try {
      await api("/api/answers", { method: "POST", body: JSON.stringify(item) });
    } catch (e) {
      /* Kalıcı hata düşürülüyor; ötekiler kuyrukta kalıyor ve sıradakiler
         denenmiyor (ağ yoksa hepsi düşer, boşuna istek atılmasın). */
      if (!isPermanentError(e)) { remaining.push(...list.slice(i)); break; }
    }
  }
  try {
    if (remaining.length) await AsyncStorage.setItem(ANSWER_QUEUE_KEY, JSON.stringify(remaining));
    else await AsyncStorage.removeItem(ANSWER_QUEUE_KEY);
  } catch { /* yut */ }
}

export async function submitAnswers(answers: AnswerOut[], day: string, seconds: number, progress?: SessionProgress): Promise<SubmitResult> {
  try {
    const r = await api<SubmitResult>("/api/answers", { method: "POST", body: JSON.stringify({ answers, day, seconds, ...(progress ? { progress } : {}) }) });
    void flushPendingAnswers(); // bağlantı var: bekleyenler de gitsin
    return r;
  } catch (e) {
    if (!isPermanentError(e)) await queueAnswers({ answers, day, seconds });
    throw e;
  }
}
