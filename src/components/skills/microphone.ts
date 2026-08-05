/**
 * Mikrofon ve tarayıcı konuşma tanıyıcısı — iki konuşma oynatıcısının ortak yüzeyi.
 *
 * Telaffuz turu (speaking-player) ve karşılıklı konuşma (dialogue-player) aynı
 * izin akışını ve aynı tanıyıcıyı kullanıyor; iki kopya er geç ayrışırdı.
 */

/** Tanıyıcının tipleri lib.dom'da güvenilir biçimde yok; asgari yüzey. */
export type RecognitionAlternative = { transcript: string };
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
 * Mikrofon iznini **açıkça** ister.
 *
 * `SpeechRecognition.start()` tarayıcı sekmesinde izni kendiliğinden sorar ama
 * ana ekrana eklenmiş PWA'da bu istem güvenilir biçimde çıkmıyor: tanıma
 * sessizce `not-allowed` ile düşüyor ve kullanıcı hiçbir şey olmadığını
 * görüyor. `getUserMedia` istemi her iki durumda da gösterir.
 *
 * Akış hemen bırakılır; tanıyıcı kendi akışını açar, bizimkini tutmak
 * mikrofonu boşuna meşgul eder (bazı cihazlarda kayıt göstergesi yanılı kalır).
 */
export async function requestMicrophone(): Promise<"granted" | "denied" | "unavailable"> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    return "unavailable";
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    for (const track of stream.getTracks()) track.stop();
    return "granted";
  } catch {
    return "denied";
  }
}
