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

/**
 * KENDİ KARAKTERLERİMİZ — Defne ve Aras (web `src/lib/tts/voices.ts` ile AYNI kimlikler, 2026-09-23).
 * Kimlik dil önekli (`de-DE-Defne`, `tr-TR-Aras`): `langOf` ve dili önekten okuyan her yer değişmeden çalışıyor.
 */
export const OWN_CHARACTERS = ["defne", "aras"] as const;
export type OwnCharacter = (typeof OWN_CHARACTERS)[number];

export type VoiceId =
  | "de-DE-Defne"
  | "de-DE-Aras"
  | "en-US-Defne"
  | "en-US-Aras"
  | "tr-TR-Defne"
  | "tr-TR-Aras"
  | "tr-TR-AhmetNeural"
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

/** Konuşma anlatım sesi (Türkçe) — kullanıcı seçmez, alternatifi yok. */
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
export function narrationVoice(lang: NativeLang, selected?: string | null): VoiceId {
  return characterEdge(selected, lang) ?? NARRATION[lang] ?? TURKISH_VOICE;
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
  /* Almanca ve İngilizce kursta seçim Defne ile Aras arasında (web ile aynı). Eski Katja/Conrad/Jenny/Guy
     tercihi cinsiyetine göre çevriliyor (`resolveVoice`); Zürih'te karakterlerimizin lehçesi yok, Leni/Jan kalıyor. */
  { id: "de-DE-Defne", label: "Defne", gender: "female", noteKey: "voices.defne_note", course: "de" },
  { id: "de-DE-Aras", label: "Aras", gender: "male", noteKey: "voices.aras_note", course: "de" },
  { id: "de-CH-LeniNeural", label: "Leni", gender: "female", noteKey: "voices.leni_note", course: "gsw-zh" },
  { id: "de-CH-JanNeural", label: "Jan", gender: "male", noteKey: "voices.jan_note", course: "gsw-zh" },
  // İngilizce kursu. Bunlar yokken voicesFor("en") boş dönüyordu ve
  // defaultVoice yedeği devreye girip İngilizce kelimeleri ALMANCA sesle
  // okutuyordu (web kataloğuna eklenmiş ama buraya eklenmemişti).
  { id: "en-US-Defne", label: "Defne", gender: "female", noteKey: "voices.defne_note", course: "en" },
  { id: "en-US-Aras", label: "Aras", gender: "male", noteKey: "voices.aras_note", course: "en" },
];

/** Karakter sesinin sahibi, dili ve üretilmemiş katmanlardaki Edge karşılığı — web `OWN_VOICES` ile aynı. */
export const OWN_VOICES: Partial<Record<VoiceId, { character: OwnCharacter; lang: "de" | "en" | "tr"; edge: VoiceId }>> = {
  "de-DE-Defne": { character: "defne", lang: "de", edge: "de-DE-KatjaNeural" },
  "de-DE-Aras": { character: "aras", lang: "de", edge: "de-DE-ConradNeural" },
  "en-US-Defne": { character: "defne", lang: "en", edge: "en-US-JennyNeural" },
  "en-US-Aras": { character: "aras", lang: "en", edge: "en-US-GuyNeural" },
  "tr-TR-Defne": { character: "defne", lang: "tr", edge: "tr-TR-EmelNeural" },
  "tr-TR-Aras": { character: "aras", lang: "tr", edge: "tr-TR-AhmetNeural" },
};

export function isOwnVoice(voice: string): boolean {
  return voice in OWN_VOICES;
}

/** Eski Edge seçimlerinin cinsiyeti — kayıtlı tercih cinsiyet yuvası olarak çevriliyor (web `GENDER`). */
const GENDER: Partial<Record<string, "female" | "male">> = {
  "de-DE-KatjaNeural": "female",
  "de-DE-ConradNeural": "male",
  "en-US-JennyNeural": "female",
  "en-US-GuyNeural": "male",
  "de-CH-LeniNeural": "female",
  "de-CH-JanNeural": "male",
};

export function genderOfVoice(voice: string | null | undefined): "female" | "male" | null {
  if (!voice) return null;
  const own = OWN_VOICES[voice as VoiceId];
  if (own) return own.character === "defne" ? "female" : "male";
  return VOICES.find((v) => v.id === voice)?.gender ?? GENDER[voice] ?? null;
}

/** Yürüyüş modunda anadil karşılığının sesi: seçilen karakter, anadilde (web `glossVoice`). */
export function glossVoice(native: NativeLang, selected: VoiceId): VoiceId {
  const own = OWN_VOICES[selected];
  if (!own) return narrationVoice(native);
  const hit = (Object.keys(OWN_VOICES) as VoiceId[]).find(
    (v) => OWN_VOICES[v]!.character === own.character && OWN_VOICES[v]!.lang === native,
  );
  return hit ?? narrationVoice(native);
}

/**
 * Konuşma, dinleme ve okuma parçasının sesi — web `conversationVoice` ile aynı kural. Seçilen karakterin Edge
 * karşılığı (Defne → Katja/Jenny, Aras → Conrad/Guy; Zürih'te Leni/Jan), kendi seslerimiz bu katmanlarda
 * üretilene kadar (2026-09-25). Karakter bilinmiyorsa eski sabit tablo.
 */
const CONVERSATION: Record<"de" | "gsw-zh" | "en", VoiceId> = {
  de: "de-DE-KatjaNeural",
  "gsw-zh": "de-CH-LeniNeural",
  en: "en-US-JennyNeural",
};
export function conversationVoice(course: string, selected?: string | null): VoiceId {
  const id = courseOrDefault(course).id;
  const own = characterEdge(selected, id === "en" ? "en" : "de");
  if (own && id !== "gsw-zh") return own;
  if (id === "gsw-zh" && genderOfVoice(selected) === "male") return "de-CH-JanNeural";
  return CONVERSATION[id as keyof typeof CONVERSATION] ?? CONVERSATION.de;
}

/** Seçilen karakterin (Defne/Aras) verilen dildeki Edge karşılığı; karakter sesi değilse null — web ile aynı. */
function characterEdge(selected: string | null | undefined, lang: "de" | "en" | "tr"): VoiceId | null {
  const own = selected ? OWN_VOICES[selected as VoiceId] : undefined;
  // Karakter sesi değilse (Zürih'te Leni/Jan) cinsiyet yuvası: Jan'ı seçen anlatımı da erkek sesten duyuyor.
  const gender = own ? null : genderOfVoice(selected);
  const character = own?.character ?? (gender === "male" ? "aras" : gender === "female" ? "defne" : null);
  if (!character) return null;
  const hit = (Object.keys(OWN_VOICES) as VoiceId[]).find((v) => OWN_VOICES[v]!.character === character && OWN_VOICES[v]!.lang === lang);
  return hit ? OWN_VOICES[hit]!.edge : null;
}

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
  return voicesFor(course)[0]?.id ?? "de-DE-Defne";
}

/** Seçilen sesi doğrular ve kursa uygun hâle getirir (web resolveVoice ile aynı). */
export function resolveVoice(course: string, voice: string | null | undefined): VoiceId {
  const list = voicesFor(course);
  const found = list.find((v) => v.id === voice);
  if (found) return found.id;
  // Başka kursun sesi ya da eski bir Edge sesi: aynı cinsiyetin bu kurstaki sesi (Aras seçen Aras'ta kalır).
  const gender = genderOfVoice(voice);
  return (gender && list.find((v) => v.gender === gender)?.id) || defaultVoice(course);
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
