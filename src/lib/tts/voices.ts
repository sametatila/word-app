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
  | "tr-TR-EmelNeural"
  /* KADRO SESLERİ — aşağıdaki `CAST`in kullandığı, kullanıcının SEÇEMEDİĞİ
     sesler. Diyalogda ikinci ve üçüncü konuşmacıyı ayırmak için varlar;
     `VOICES` listesine girmiyorlar çünkü ses seçme ekranında gösterilecek
     bir tercih değiller (bkz. `CAST`). Hepsi 2026-09-18'de Edge ucunda tek
     tek denendi ve aynı adla Azure'da da var — yedeğe düşmek sesi
     değiştirmiyor. */
  | "de-DE-AmalaNeural"
  | "de-DE-KillianNeural"
  | "de-DE-SeraphinaMultilingualNeural"
  | "de-DE-FlorianMultilingualNeural"
  | "en-US-AriaNeural"
  | "en-US-MichelleNeural"
  | "en-US-AndrewNeural"
  | "en-US-ChristopherNeural";

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
    noteKey: "voices.katja_note",
    course: "de",
  },
  {
    id: "de-DE-ConradNeural",
    label: "Conrad",
    gender: "male",
    noteKey: "voices.conrad_note",
    course: "de",
  },
  {
    id: "de-CH-LeniNeural",
    label: "Leni",
    gender: "female",
    // Zürih kursunun asıl kazancı bu ses: Dieth yazımı fonetik olduğu için
    // gerçekten İsviçre Almancası konuşan bir ses lehçe metnini doğru okuyor.
    noteKey: "voices.leni_note",
    course: "gsw-zh",
  },
  {
    id: "de-CH-JanNeural",
    label: "Jan",
    gender: "male",
    // Dürüst olmak gerekiyor: Jan İsviçre aksanlı Hochdeutsch konuşuyor,
    // Leni kadar lehçeye yakın değil. Erkek sesi isteyen için var.
    noteKey: "voices.jan_note",
    course: "gsw-zh",
  },
  {
    id: "en-US-JennyNeural",
    label: "Jenny",
    gender: "female",
    noteKey: "voices.jenny_note",
    course: "en",
  },
  {
    id: "en-US-GuyNeural",
    label: "Guy",
    gender: "male",
    noteKey: "voices.guy_note",
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
 *
 * DİNLEME METNİ İÇİN İKİ KADEME DAHA (`listen`, `listenSlow`). Dinleme
 * alıştırmasında bir cümle değil bir diyalog dinleniyor ve kelime turunun
 * −%8'i orada "aşırı hızlı" duyuldu; yavaş düğmesi de mobilde hiçbir şey
 * değiştirmiyordu. Önbellek maliyeti sınırlı: bu metinler yalnız dinleme
 * alıştırmasında geçiyor, kelime turunun girdileri bölünmüyor.
 */
export type Pace = "normal" | "slow" | "listen" | "listenSlow";

/** URL'deki `r` değeri ↔ hız. Serbest değer yok: her değer ayrı önbellek girdisi. */
export const PACE_PARAM: Record<Exclude<Pace, "normal">, string> = { slow: "slow", listen: "listen", listenSlow: "listen-slow" };

export function paceFromParam(r: string | null): Pace {
  const hit = (Object.keys(PACE_PARAM) as Exclude<Pace, "normal">[]).find((k) => PACE_PARAM[k] === r);
  return hit ?? "normal";
}

/**
 * Perde kaydırma — konuşmacıyı ayırmanın SON çaresi.
 *
 * Diyalogda her konuşmacıya ayrı bir ses veriliyor (`CAST`), ama katalog
 * sonsuz değil: Zürih kursunda hedef lehçeyi konuşan yalnız iki ses var
 * (Leni, Jan) ve aynı cinsiyetten iki konuşmacı çıktığında ses tükeniyor.
 * O noktada aynı sesi perdesi kaydırılmış hâliyle kullanmak, iki kişiyi
 * BİREBİR aynı sesle okumaktan iyi: kulak konuşmacı değiştiğini duyuyor.
 *
 * Ölçüldü (2026-09-18, Leni, aynı cümle, otokorelasyonla F0 medyanı):
 *   `+0Hz` → 228,6 Hz · `+18Hz` → ~250 Hz · `-18Hz` → ~200 Hz
 * Yani kaydırma gerçekten sesin perdesini değiştiriyor, kabul edilip yok
 * sayılmıyor. ±25Hz de denendi (262 / 190 Hz) ama orada ses gerginleşiyor;
 * ±18 hem duyuluyor hem doğal kalıyor.
 *
 * Değerler KAPALI bir küme, tıpkı `Pace` gibi ve aynı sebeple: perde URL'ye
 * giriyor, URL önbellek anahtarının kendisi. Serbest bir sayı her konuşmacı
 * için ayrı bir önbellek girdisi açardı.
 */
export type Pitch = "mid" | "up" | "down";

/** URL'deki `p` değeri ↔ perde. `mid` varsayılan, URL'ye hiç yazılmıyor. */
export const PITCH_PARAM: Record<Exclude<Pitch, "mid">, string> = { up: "up", down: "down" };

export function pitchFromParam(p: string | null): Pitch {
  const hit = (Object.keys(PITCH_PARAM) as Exclude<Pitch, "mid">[]).find((k) => PITCH_PARAM[k] === p);
  return hit ?? "mid";
}

/** Perde (SSML `pitch`). */
export function pitchFor(pitch: Pitch = "mid"): string {
  if (pitch === "up") return "+18Hz";
  if (pitch === "down") return "-18Hz";
  return "+0Hz";
}

/**
 * DİYALOG KADROSU — konuşmacı başına ses.
 *
 * Sorun ölçüldü: içerikteki 709 diyalog bloğunun 598'i iki ya da daha çok
 * konuşmacılı (üçü altı kişilik), ama hepsi tek sesle okunuyordu. İki kişilik
 * bir alışveriş konuşmasını tek ses okuyunca sınavdaki asıl iş — kimin ne
 * dediğini ayırmak — kulakla yapılamaz hâle geliyor; gerçek dinleme
 * sınavlarında her rolü ayrı bir kişi seslendiriyor, çünkü ölçülen beceri bu.
 *
 * KULLANICININ SES TERCİHİNE BAKILMIYOR, bilerek. Gerekçe `lessonVoice` ile
 * birebir aynı: kadro sabit olunca bir diyaloğun sesi bütün kullanıcılarda
 * TEK önbellek girdisi oluyor ve kâğıdı ilk açan kişi önbelleği herkes için
 * ısıtıyor. Tercihe saygı göstermek her sesi kullanıcı sayısı kadar
 * çoğaltırdı — üstelik "Kundin" rolünü erkek sesi seçmiş bir kullanıcıya
 * erkek sesle okutarak.
 *
 * Sıra ÖNEMLİ: kadro listenin başından dağıtılıyor, yani iki kişilik
 * diyalogların çoğu (en sık hâl) kullanıcının zaten tanıdığı Katja/Conrad
 * ikilisiyle okunuyor; katalogdaki öteki sesler ancak üçüncü konuşmacıda
 * devreye giriyor. Seraphina/Florian en sonda çünkü çok dilli modeller
 * ölçülerek daha yavaş bulundu (bkz. `VOICES`) — nadiren kullanılsınlar.
 */
export const CAST: Record<"de" | "gsw-zh" | "en", Record<"female" | "male", VoiceId[]>> = {
  de: {
    female: ["de-DE-KatjaNeural", "de-DE-AmalaNeural", "de-DE-SeraphinaMultilingualNeural"],
    male: ["de-DE-ConradNeural", "de-DE-KillianNeural", "de-DE-FlorianMultilingualNeural"],
  },
  // Zürih: hedef lehçeyi konuşan başka ses YOK. de-DE sesleri eklemek
  // kursun bütün gerekçesini bozardı (Dieth yazımını Alman aksanıyla okumak);
  // o yüzden burada ayrım perdeyle yapılıyor.
  "gsw-zh": { female: ["de-CH-LeniNeural"], male: ["de-CH-JanNeural"] },
  en: {
    female: ["en-US-JennyNeural", "en-US-AriaNeural", "en-US-MichelleNeural"],
    male: ["en-US-GuyNeural", "en-US-AndrewNeural", "en-US-ChristopherNeural"],
  },
};

/** Kadronun kursu — tanınmayan kurs Almanca kadroya düşer (`voicesFor` ile aynı kural). */
export function castFor(course: string): Record<"female" | "male", VoiceId[]> {
  return CAST[course as keyof typeof CAST] ?? CAST.de;
}

/** Okuma hızı (SSML `rate`). */
export function rateFor(voice: VoiceId, pace: Pace | boolean = "normal"): string {
  const p: Pace = pace === true ? "slow" : pace === false ? "normal" : pace;
  const ch = voice.startsWith("de-CH");
  if (p === "listenSlow") return ch ? "-50%" : "-45%";
  if (p === "listen") return ch ? "-25%" : "-20%";
  if (p === "slow") return ch ? "-40%" : "-35%";
  // Türkçe anlatım yavaşlatılmıyor: öğrencinin ana dili, anlaşılırlık sorunu yok.
  if (voice.startsWith("tr-")) return "+0%";
  return voice.startsWith("de-CH") ? "-12%" : "-8%";
}
