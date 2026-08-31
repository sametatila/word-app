/**
 * Ses kataloğu — web `src/lib/tts/voices.ts` ile AYNI id ve etiketler.
 *
 * Web Edge/Azure nöral seslerini çalıyor; mobil cihazın kendi TTS motorunu
 * kullanıyor (çevrimdışı çalışsın diye). Bu yüzden mobilde bu id'ler doğrudan
 * cihaz sesine EŞLEŞTİRİLİR (dil + cinsiyet en yakını, bkz. lib/tts.ts
 * deviceVoiceFor); ama kullanıcıya gösterilen seçim ve saklanan tercih web ile
 * birebir aynı — kurs başına iki ses.
 */
export type VoiceId =
  | "de-DE-KatjaNeural"
  | "de-DE-ConradNeural"
  | "de-CH-LeniNeural"
  | "de-CH-JanNeural"
  | "tr-TR-EmelNeural";

/** Ders anlatım sesi (Türkçe) — kullanıcı seçmez, alternatifi yok. */
export const TURKISH_VOICE: VoiceId = "tr-TR-EmelNeural";

export type Voice = {
  id: VoiceId;
  label: string;
  gender: "kadın" | "erkek";
  note: string;
  course: "de" | "gsw-zh";
};

export const VOICES: Voice[] = [
  { id: "de-DE-KatjaNeural", label: "Katja", gender: "kadın", note: "Net ve anlaşılır kadın ses", course: "de" },
  { id: "de-DE-ConradNeural", label: "Conrad", gender: "erkek", note: "Tok ve sakin erkek ses", course: "de" },
  { id: "de-CH-LeniNeural", label: "Leni", gender: "kadın", note: "İsviçre Almancası kadın ses", course: "gsw-zh" },
  { id: "de-CH-JanNeural", label: "Jan", gender: "erkek", note: "İsviçre aksanlı erkek ses", course: "gsw-zh" },
];

/** Kursun sesleri — seçim ekranı bunu listeler. */
export function voicesFor(course: string): Voice[] {
  const key = course === "gsw-zh" ? "gsw-zh" : "de";
  return VOICES.filter((v) => v.course === key);
}

/** Kursun varsayılanı: her ikisinde de kadın ses. */
export function defaultVoice(course: string): VoiceId {
  return course === "gsw-zh" ? "de-CH-LeniNeural" : "de-DE-KatjaNeural";
}

/** Seçilen sesi doğrular ve kursa uygun hâle getirir (web resolveVoice ile aynı). */
export function resolveVoice(course: string, voice: string | null | undefined): VoiceId {
  const found = VOICES.find((v) => v.id === voice);
  if (found && found.course === (course === "gsw-zh" ? "gsw-zh" : "de")) return found.id;
  return defaultVoice(course);
}

/** Ses id'sinden BCP-47 dil etiketi (cihaz sesi eşleştirmesi için). */
export function langOf(voice: VoiceId): string {
  if (voice.startsWith("de-CH")) return "de-CH";
  if (voice.startsWith("tr")) return "tr-TR";
  return "de-DE";
}

/** Cihaz TTS okuma hızı (react-native-tts 0..1). Yavaş = telaffuz çalışması. */
export function deviceRate(slow = false): number {
  return slow ? 0.3 : 0.42;
}
