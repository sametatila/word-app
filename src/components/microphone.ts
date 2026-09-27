/**
 * Mikrofon ve tarayıcı konuşma tanıyıcısı — sesle konuşan her ekranın ortak yüzeyi.
 *
 * Telaffuz turu (speaking-player), karşılıklı diyalog (dialogue-player) ve
 * konuşma sohbeti (conversation-player) aynı izin akışını ve aynı tanıyıcıyı kullanıyor;
 * üç kopya er geç ayrışırdı.
 */

/** Tanıyıcının tipleri lib.dom'da güvenilir biçimde yok; asgari yüzey. */
export type RecognitionAlternative = {
  transcript: string;
  /**
   * Tanıyıcının bu adaya güveni (0-1).
   *
   * Her tarayıcı doldurmuyor — Chrome ilk adayda veriyor, sonrakilerde
   * çoğunlukla 0 bırakıyor; Safari hiç vermeyebiliyor. Bu yüzden değerlendirme
   * buna **bağlı olamaz**, yalnızca varsa dikkate alınır (bkz. lib/speech.ts).
   */
  confidence?: number;
};
export type RecognitionResult = { length: number; [i: number]: RecognitionAlternative };
export type RecognitionEvent = {
  results: { length: number; [i: number]: RecognitionResult };
};
export type Recognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

export function recognitionCtor(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/**
 * İzin bu oturumda bir kez doğrulandıysa tekrar sorulmuyor.
 *
 * Sebep gecikme: `getUserMedia` her çağrıda mikrofon DONANIMINI açıp
 * kapatıyor ve bu yarım saniyeye kadar sürebiliyor. Eller serbest akışta bu
 * bekleme, okumanın bitişiyle mikrofonun açılması arasında her turda duyulan
 * bir boşluktu — izin zaten verilmişken ödenen bir bedel.
 */
let confirmed = false;

/**
 * Mikrofon iznini **açıkça** ister.
 *
 * `SpeechRecognition.start()` tarayıcı sekmesinde izni kendiliğinden sorar ama
 * ana ekrana eklenmiş PWA'da bu istem güvenilir biçimde çıkmıyor: tanıma
 * sessizce `not-allowed` ile düşüyor ve kullanıcı hiçbir şey olmadığını
 * görüyor. `getUserMedia` istemi her iki durumda da gösterir.
 *
 * Sıra hızdan yana kurulu: oturumda bir kez doğrulandıysa hiç sorulmaz;
 * tarayıcı izin durumunu söyleyebiliyorsa (`permissions.query`) cihaz hiç
 * açılmaz; ancak ikisi de yoksa `getUserMedia` çalışır. Akış hemen bırakılır;
 * tanıyıcı kendi akışını açar, bizimkini tutmak mikrofonu boşuna meşgul eder
 * (bazı cihazlarda kayıt göstergesi yanık kalır).
 */
export async function requestMicrophone(): Promise<"granted" | "denied" | "unavailable"> {
  if (confirmed) return "granted";
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    return "unavailable";
  }
  try {
    const status = await navigator.permissions?.query?.({
      name: "microphone" as PermissionName,
    });
    if (status?.state === "granted") {
      confirmed = true;
      return "granted";
    }
  } catch {
    /* Firefox/Safari sorgulamayı desteklemeyebilir — istem yoluna düş */
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    for (const track of stream.getTracks()) track.stop();
    confirmed = true;
    return "granted";
  } catch {
    return "denied";
  }
}

/**
 * Tanıyıcının bu oturumda kullanılamaz olduğunu söyleyen hata kodları: izin
 * yok, mikrofon başka yerde, servis ya da dil kapalı. "no-speech" ve
 * "aborted" bu listede değil — onlar geçici, yeniden açmak yeter.
 */
const DEAD_ERRORS = new Set(["not-allowed", "service-not-allowed", "audio-capture", "language-not-supported"]);

export type SpeechCapture = {
  /** Dinlemeyi bitirir ve o ana kadar duyulanı verir (hiç duyulmadıysa boş). */
  stop: () => Promise<{ text: string; error?: string }>;
};

/**
 * Serbest konuşmayı YALNIZ tarayıcının kendi tanıyıcısıyla yazıya çevirir.
 *
 * Ekran açıkken sunucuya ses gönderilmiyor (Samet, 2026-09-27): telaffuz
 * turu, sınavın konuşma bölümü ve deneme sınavı kayıt almıyor, bunu
 * çağırıyor; sunucuya giden yalnız metin. Tanıyıcı yoksa (Firefox)
 * `"unsupported"`, mikrofon izni yoksa `"denied"` döner; çağıran taraf bunu
 * ekranda söyler, sesi başka bir yola göndermez.
 *
 * Sürekli kip: Chrome sessizlikte oturumu kendiliğinden kapatıyor. `maxMs`
 * dolana ya da `stop` çağrılana kadar her kapanışta yeni bir oturum açılıyor
 * ve kesinleşen parçalar biriktiriliyor. Kalıcı bir hatada (izin geri
 * alındı, mikrofon yok) yeniden açılmıyor; hata `stop`un sonucunda döner.
 */
export async function captureSpeech(lang: string, maxMs: number): Promise<SpeechCapture | "unsupported" | "denied"> {
  const Ctor = recognitionCtor();
  if (!Ctor) return "unsupported";
  if ((await requestMicrophone()) !== "granted") return "denied";

  let committed = "";
  let sessionFinal = "";
  let interim = "";
  let error: string | undefined;
  let stopped = false;
  let rec: Recognition | null = null;
  let ended: (() => void) | null = null;
  const join = (...parts: string[]) => parts.join(" ").replace(/\s+/g, " ").trim();

  const open = () => {
    const r = new Ctor();
    r.lang = lang;
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 1;
    sessionFinal = "";
    interim = "";
    r.onresult = (e) => {
      let fin = "";
      let tmp = "";
      for (let i = 0; i < e.results.length; i++) {
        const res = e.results[i] as unknown as { isFinal?: boolean; 0?: { transcript: string } };
        const text = res[0]?.transcript ?? "";
        if (res.isFinal) fin += ` ${text}`;
        else tmp += ` ${text}`;
      }
      sessionFinal = fin;
      interim = tmp;
    };
    r.onerror = (e) => {
      if (DEAD_ERRORS.has(e?.error)) error = e.error;
    };
    r.onend = () => {
      // Oturumun duyduğu kalıcı metne geçiyor; yarım kalan ara sonuç da
      // atılmıyor (kapanışta kesinleşmemiş son sözcükler olabiliyor).
      committed = join(committed, sessionFinal, interim);
      sessionFinal = "";
      interim = "";
      if (stopped || error) {
        rec = null;
        ended?.();
        return;
      }
      try {
        open();
      } catch {
        error = "start-failed";
        rec = null;
        ended?.();
      }
    };
    rec = r;
    r.start();
  };

  try {
    open();
  } catch {
    return { stop: async () => ({ text: "", error: "start-failed" }) };
  }

  const finish = () =>
    new Promise<void>((resolve) => {
      stopped = true;
      if (!rec) return resolve();
      // Tanıyıcı `onend` vermeyebiliyor: kısa bir tavanla beklenmeyi bırak.
      const guard = setTimeout(resolve, 1500);
      ended = () => {
        clearTimeout(guard);
        resolve();
      };
      try {
        rec.stop();
      } catch {
        clearTimeout(guard);
        resolve();
      }
    });

  let done: Promise<void> | null = null;
  const guard = setTimeout(() => {
    done ??= finish();
  }, maxMs);

  return {
    stop: async () => {
      clearTimeout(guard);
      done ??= finish();
      await done;
      return { text: join(committed, sessionFinal, interim), error };
    },
  };
}
