/**
 * Ses kataloğu — web `src/lib/tts/voices.ts` ile AYNI id ve etiketler.
 *
 * Web Edge/Azure nöral seslerini çalıyor; mobil cihazın kendi TTS motorunu
 * kullanıyor (çevrimdışı çalışsın diye). Bu yüzden mobilde bu id'ler doğrudan
 * cihaz sesine EŞLEŞTİRİLİR (dil + cinsiyet en yakını, bkz. lib/tts.ts
 * deviceVoiceFor); ama kullanıcıya gösterilen seçim ve saklanan tercih web ile
 * birebir aynı — kurs başına iki ses.
 */
import { courseOrDefault, type CourseId, type NativeLang } from "./courses";

export type VoiceId =
  | "de-DE-KatjaNeural"
  | "de-DE-ConradNeural"
  | "de-CH-LeniNeural"
  | "de-CH-JanNeural"
  | "en-US-JennyNeural"
  | "en-US-GuyNeural"
  | "tr-TR-EmelNeural"
  /* KADRO SESLERİ — `CAST`in kullandığı, kullanıcının SEÇEMEDİĞİ sesler.
     Diyalogda ikinci ve üçüncü konuşmacıyı ayırmak için varlar. */
  | "de-DE-AmalaNeural"
  | "de-DE-KillianNeural"
  | "de-DE-SeraphinaMultilingualNeural"
  | "de-DE-FlorianMultilingualNeural"
  | "en-US-AriaNeural"
  | "en-US-MichelleNeural"
  | "en-US-AndrewNeural"
  | "en-US-ChristopherNeural";

/** Ders anlatım sesi (Türkçe) — kullanıcı seçmez, alternatifi yok. */
export const TURKISH_VOICE: VoiceId = "tr-TR-EmelNeural";

/**
 * ANLATIM sesi — öğretmenin konuştuğu dil, yani kullanıcının ANADİLİ.
 *
 * Hedef dille karışmaz: anlatım dili tanım gereği hedef dilden farklıdır
 * (Türk kullanıcı Almanca öğrenirken anlatım Türkçe; İngiliz kullanıcı Almanca
 * öğrenirken anlatım İngilizce). Yürüyüş modu eskiden doğrudan TURKISH_VOICE
 * kullanıyordu — anadili Türkçe olmayan kullanıcıya anlatım yine Türkçe
 * okunurdu.
 */
const NARRATION: Record<NativeLang, VoiceId> = {
  tr: "tr-TR-EmelNeural",
  en: "en-US-JennyNeural",
  de: "de-DE-KatjaNeural",
};
export function narrationVoice(lang: NativeLang): VoiceId {
  return NARRATION[lang] ?? TURKISH_VOICE;
}

export type Voice = {
  id: VoiceId;
  label: string;
  /** Etiket değil ANAHTAR eşleşmesi: gösterim voices.female / voices.male ile çevrilir. */
  gender: "female" | "male";
  /** Sözlük anahtarı (voices.*_note). */
  noteKey: string;
  course: CourseId;
};

export const VOICES: Voice[] = [
  { id: "de-DE-KatjaNeural", label: "Katja", gender: "female", noteKey: "voices.katja_note", course: "de" },
  { id: "de-DE-ConradNeural", label: "Conrad", gender: "male", noteKey: "voices.conrad_note", course: "de" },
  { id: "de-CH-LeniNeural", label: "Leni", gender: "female", noteKey: "voices.leni_note", course: "gsw-zh" },
  { id: "de-CH-JanNeural", label: "Jan", gender: "male", noteKey: "voices.jan_note", course: "gsw-zh" },
  // İngilizce kursu. Bunlar yokken voicesFor("en") boş dönüyordu ve
  // defaultVoice yedeği devreye girip İngilizce kelimeleri ALMANCA sesle
  // okutuyordu (web kataloğuna eklenmiş ama buraya eklenmemişti).
  { id: "en-US-JennyNeural", label: "Jenny", gender: "female", noteKey: "voices.jenny_note", course: "en" },
  { id: "en-US-GuyNeural", label: "Guy", gender: "male", noteKey: "voices.guy_note", course: "en" },
];

/** Kursun sesleri — seçim ekranı bunu listeler. */
export function voicesFor(course: string): Voice[] {
  return VOICES.filter((v) => v.course === courseOrDefault(course).id);
}

/**
 * Kursun varsayılanı: listedeki ilk ses (her kursta kadın ses başta).
 *
 * Eskiden burada `course === "gsw-zh" ? Leni : Katja` yazıyordu; üçüncü bir
 * kurs eklendiğinde sessizce Almanca sese düşerdi. Artık katalogdan
 * türetiliyor, yani yeni kursun sesi eklendiği anda doğru cevabı veriyor.
 */
export function defaultVoice(course: string): VoiceId {
  return voicesFor(course)[0]?.id ?? "de-DE-KatjaNeural";
}

/** Seçilen sesi doğrular ve kursa uygun hâle getirir (web resolveVoice ile aynı). */
export function resolveVoice(course: string, voice: string | null | undefined): VoiceId {
  const found = VOICES.find((v) => v.id === voice);
  if (found && found.course === courseOrDefault(course).id) return found.id;
  return defaultVoice(course);
}

/** Ses id'sinden BCP-47 dil etiketi (cihaz sesi eşleştirmesi için). */
export function langOf(voice: VoiceId): string {
  // Ses id'leri her zaman `<dil>-<BÖLGE>-<Ad>Neural` biçiminde; yerel kodu
  // doğrudan id'den okumak yeni bir dil eklendiğinde burayı düzenlemeyi
  // gereksiz kılıyor. Eskiden liste elle yazılıydı ve tanınmayan her ses
  // "de-DE" sayılıyordu — İngilizce ses eklenince Almanca okunurdu.
  const m = /^([a-z]{2}-[A-Z]{2})/.exec(voice);
  return m ? m[1] : "de-DE";
}

/**
 * Perde kaydırma — web `src/lib/tts/voices.ts` `Pitch` ile aynı.
 *
 * Konuşmacıyı ayırmanın son çaresi: Zürih kursunda hedef lehçeyi konuşan
 * yalnız iki ses var (Leni, Jan) ve aynı cinsiyetten iki konuşmacı çıkınca
 * ses tükeniyor. Ölçüldü (Leni, aynı cümle): `+0Hz` → 228,6 Hz, `+18Hz` →
 * ~250 Hz, `-18Hz` → ~200 Hz.
 */
export type Pitch = "mid" | "up" | "down";

/** `/api/tts?p=` değeri — web `PITCH_PARAM` ile aynı. `mid` URL'ye yazılmıyor. */
export const PITCH_PARAM: Record<Exclude<Pitch, "mid">, string> = { up: "up", down: "down" };

/**
 * DİYALOG KADROSU — web `src/lib/tts/voices.ts` `CAST` ile AYNI ve AYNI SIRADA.
 *
 * Sıra anlamlı: kadro baştan dağıtılıyor, yani iki kişilik diyalogların çoğu
 * kullanıcının tanıdığı Katja/Conrad ikilisiyle okunuyor. Kullanıcının ses
 * TERCİHİNE bakılmıyor — kadro sabit olunca bir diyaloğun sesi bütün
 * kullanıcılarda tek önbellek girdisi oluyor (bkz. web `CAST`).
 */
export const CAST: Record<"de" | "gsw-zh" | "en", Record<"female" | "male", VoiceId[]>> = {
  de: {
    female: ["de-DE-KatjaNeural", "de-DE-AmalaNeural", "de-DE-SeraphinaMultilingualNeural"],
    male: ["de-DE-ConradNeural", "de-DE-KillianNeural", "de-DE-FlorianMultilingualNeural"],
  },
  "gsw-zh": { female: ["de-CH-LeniNeural"], male: ["de-CH-JanNeural"] },
  en: {
    female: ["en-US-JennyNeural", "en-US-AriaNeural", "en-US-MichelleNeural"],
    male: ["en-US-GuyNeural", "en-US-AndrewNeural", "en-US-ChristopherNeural"],
  },
};

/** Kadronun kursu — tanınmayan kurs Almanca kadroya düşer. */
export function castFor(course: string): Record<"female" | "male", VoiceId[]> {
  return CAST[course as keyof typeof CAST] ?? CAST.de;
}

/**
 * Hız kademesi — web `src/lib/tts/voices.ts` `Pace` ile aynı dört değer.
 * `listen`/`listenSlow` dinleme alıştırmasının: kelime turunun hızı orada
 * "aşırı hızlı" duyuldu (bkz. web `rateFor`).
 */
export type Pace = "normal" | "slow" | "listen" | "listenSlow";

/** `/api/tts?r=` değeri — web `PACE_PARAM` ile aynı. */
export const PACE_PARAM: Record<Exclude<Pace, "normal">, string> = { slow: "slow", listen: "listen", listenSlow: "listen-slow" };

export function paceOf(slow: Pace | boolean | undefined): Pace {
  return slow === true ? "slow" : slow === false || slow === undefined ? "normal" : slow;
}

/** Cihaz TTS okuma hızı (react-native-tts 0..1, 0,5 cihazın doğal hızı). Yavaş = telaffuz çalışması. */
export function deviceRate(slow: Pace | boolean = false): number {
  const pace = paceOf(slow);
  if (pace === "listenSlow") return 0.26;
  if (pace === "slow") return 0.3;
  if (pace === "listen") return 0.36;
  return 0.42;
}
