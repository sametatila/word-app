/**
 * Mikrofon ve tarayıcı konuşma tanıyıcısı — sesle konuşan her ekranın ortak yüzeyi.
 *
 * Telaffuz turu (speaking-player), karşılıklı diyalog (dialogue-player) ve
 * ders rol yapması (lesson-player) aynı izin akışını ve aynı tanıyıcıyı kullanıyor;
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
