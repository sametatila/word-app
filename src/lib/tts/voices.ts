import type { NativeLang } from "@/lib/courses";
/**
 * Ses kataloğu — hem sunucu hem arayüz kullanıyor, o yüzden `server-only` değil.
 *
 * Sesler Microsoft'un nöral sesleri; tarayıcının kendi `speechSynthesis`'i
 * yerine bunları kullanmamızın sebebi kalitenin cihazdan cihaza değişmemesi.
 * Eskiden aynı hesap Android'de kabul edilebilir, masaüstünde robotik
 * duyuyordu; Zürih kursunda ise çoğu cihazda de-CH sesi hiç bulunmadığı için
 * Dieth yazımı Alman aksanıyla okunuyordu.
 *
 * Kurs başına iki ses var ve seçim kullanıcıya bırakılıyor: ses tercihi
 * gerçekten kişisel: aynı sesi her gün dinleyecek olan o.
 */

export type VoiceId =
  | "de-DE-KatjaNeural"
  | "de-DE-ConradNeural"
  | "de-CH-LeniNeural"
  | "de-CH-JanNeural"
  | "en-US-JennyNeural"
  | "en-US-GuyNeural"
  | "tr-TR-EmelNeural";

/**
 * Ders anlatım sesi — Türkçe.
 *
 * Kullanıcının seçtiği ses hedef dilin sesi; anlatım sesi ise dersin
 * öğretmeni ve Türkçe konuşuyor. İkisi ayrı işler: ders içinde "İlk
 * kelimemiz…" cümlesi Türkçe sesle, içindeki Almanca kelime Almanca sesle
 * okunuyor (bkz. speak-button, speakSegments). Bu yüzden `VOICES` listesinde
 * değil — seçim ekranında görünmesi anlamsız olurdu, tercih edilecek bir
 * alternatifi yok.
 */
export const TURKISH_VOICE: VoiceId = "tr-TR-EmelNeural";

/**
 * ANLATIM sesi — öğretmenin konuştuğu dil, yani kullanıcının ANADİLİ.
 *
 * Hedef dille karışmaz: anlatım dili tanım gereği hedef dilden farklıdır
 * (Türk kullanıcı Almanca öğrenirken anlatım Türkçe; İngiliz kullanıcı Almanca
 * öğrenirken anlatım İngilizce). Yürüyüş modu doğrudan `TURKISH_VOICE`
 * kullanıyordu — anadili Türkçe olmayan kullanıcıya anlatım yine Türkçe
 * okunurdu. Mobil (`M/src/lib/voices.ts`) bu haritanın aynısını taşıyor.
 */
const NARRATION: Record<NativeLang, VoiceId> = {
  tr: "tr-TR-EmelNeural",
  en: "en-US-JennyNeural",
  de: "de-DE-KatjaNeural",
};

export function narrationVoice(lang: NativeLang): VoiceId {
  return NARRATION[lang] ?? TURKISH_VOICE;
}

/**
 * Ders anlatımının Almanca sesi — kullanıcının profil tercihi DEĞİL, bilerek.
 *
 * Derste öncelik gecikme: akış "öğretmen söyler → öğrenci tekrarlar" ritmiyle
 * ilerliyor ve her cümle öncesi beklemek ritmi öldürüyor. Ses sabit olunca
 * dersin bütün cümleleri kullanıcıdan bağımsız TEK önbellek girdisi oluyor —
 * dersi ilk açan kişi CDN'i herkes için ısıtıyor ve sonraki her öğrencide ses
 * ağa hiç çıkmadan geliyor. Profil sesine saygı bu kazanımı ikiye bölerdi.
 * Katja zaten ölçülmüş en hızlı ses; Zürih kursunda lehçeyi doğru okuyan Leni.
 */
export function lessonVoice(course: string): VoiceId {
  // Katalogdan: ikili ternary yazılıyken tanınmayan her kurs Almanca sese
  // düşüyordu, yani İngilizce dersler Almanca sesle anlatılırdı. Kursun ilk
  // sesi zaten sabit olduğu için önbellek davranışı değişmiyor.
  return defaultVoice(course);
}

export type Voice = {
  id: VoiceId;
  /** Arayüzde görünen ad. */
  label: string;
  /**
   * Sesin cinsiyeti — KİMLİK, gösterilecek metin değil.
   *
   * Değerler Türkçe sözcüklerdi ("kadın" | "erkek") ve doğrudan ekrana
   * basılıyordu: tip sistemi bir dili dayatıyor, arayüz İngilizce olduğunda
   * ses seçicide yine Türkçe çıkıyordu. `Band` ile aynı hata, aynı çözüm.
   */
  gender: "female" | "male";
  /** Kullanıcıya bu sesin farkını anlatan tek cümle. */
  /** Sesi anlatan tek satırın SÖZLÜK ANAHTARI (metnin kendisi değil). */
  noteKey: string;
  course: "de" | "gsw-zh" | "en";
};

export const VOICES: Voice[] = [
  // Almanca sesler çok dilli olanlardan (Seraphina, Florian) bunlara geçirildi.
  // Sebep hız: çok dilli modeller daha büyük ve ilk ses belirgin biçimde geç
  // geliyordu (ölçümde 1.2-1.6 saniyeye karşı 0.4 saniye). Karşılığında
  // kaybedilen şey Türkçe okuyabilmeleriydi ama uygulama Türkçeyi hiç sesli
  // okumuyor — kullanılmayan bir yetenek için gecikme ödeniyordu.
  {
    id: "de-DE-KatjaNeural",
    label: "Katja",
    gender: "female",
    noteKey: "voice.de_de_katjaneural.note",
    course: "de",
  },
  {
    id: "de-DE-ConradNeural",
    label: "Conrad",
    gender: "male",
    noteKey: "voice.de_de_conradneural.note",
    course: "de",
  },
  {
    id: "de-CH-LeniNeural",
    label: "Leni",
    gender: "female",
    // Zürih kursunun asıl kazancı bu ses: Dieth yazımı fonetik olduğu için
    // gerçekten İsviçre Almancası konuşan bir ses lehçe metnini doğru okuyor.
    noteKey: "voice.de_ch_lenineural.note",
    course: "gsw-zh",
  },
  {
    id: "de-CH-JanNeural",
    label: "Jan",
    gender: "male",
    // Dürüst olmak gerekiyor: Jan İsviçre aksanlı Hochdeutsch konuşuyor,
    // Leni kadar lehçeye yakın değil. Erkek sesi isteyen için var.
    noteKey: "voice.de_ch_janneural.note",
    course: "gsw-zh",
  },
  {
    id: "en-US-JennyNeural",
    label: "Jenny",
    gender: "female",
    noteKey: "voice.en_us_jennyneural.note",
    course: "en",
  },
  {
    id: "en-US-GuyNeural",
    label: "Guy",
    gender: "male",
    noteKey: "voice.en_us_guyneural.note",
    course: "en",
  },
];

/**
 * Kursun sesleri — seçim ekranı bunu listeliyor.
 *
 * Eskiden `course === "gsw-zh" ? gsw : de` yazılıydı: tanınmayan her kurs
 * Almanca sesleri alırdı. Artık katalogdan eşleşiyor; eşleşme yoksa Almancaya
 * düşmek yalnızca son çare (de/gsw-zh davranışı birebir aynı).
 */
export function voicesFor(course: string): Voice[] {
  const own = VOICES.filter((v) => v.course === course);
  return own.length ? own : VOICES.filter((v) => v.course === "de");
}

/** Kursun varsayılanı: katalogdaki ilk sesi (her kursta kadın ses başta). */
export function defaultVoice(course: string): VoiceId {
  return voicesFor(course)[0]?.id ?? "de-DE-KatjaNeural";
}

/**
 * Seçilen sesi doğrular ve kursa uygun hâle getirir.
 *
 * Kurs değiştiğinde eski kursun sesi profilde kalabiliyor (Almanca'dan
 * Zürih'e geçen birinde Katja). Onu olduğu gibi kullanmak Dieth metnini
 * Alman aksanıyla okumak olurdu — tam da kaçındığımız şey.
 */
export function resolveVoice(course: string, voice: string | null | undefined): VoiceId {
  const allowed = new Set(voicesFor(course).map((v) => v.id));
  const found = VOICES.find((v) => v.id === voice);
  if (found && allowed.has(found.id)) return found.id;
  return defaultVoice(course);
}

/**
 * Okuma hızı. Lehçe daha yavaş okunuyor: Züritüütsch öğrenen kişi
 * standart Almanca'dakinden daha az tanıdık bir ses örüntüsü çözüyor.
 *
 * `slow` telaffuz çalışması için: shadowing'in yöntemi önce yavaş duyup
 * heceleri ayırt etmek, sonra normal hızda tekrarlamak. Bu yüzden iki
 * seçenek var, sürekli bir hız ayarı değil — ikisi de ayrı birer önbellek
 * girdisi ve seçenek sayısı arttıkça önbellek isabeti düşerdi.
 */
export function rateFor(voice: VoiceId, slow = false): string {
  if (slow) return voice.startsWith("de-CH") ? "-40%" : "-35%";
  // Türkçe anlatım yavaşlatılmıyor: öğrencinin ana dili, anlaşılırlık sorunu yok.
  if (voice.startsWith("tr-")) return "+0%";
  return voice.startsWith("de-CH") ? "-12%" : "-8%";
}
