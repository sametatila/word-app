import { castFor, type Pitch, type VoiceId } from "./voices";

/**
 * Konuşmacı etiketinden ses dağıtımı — web `src/lib/tts/speakers.ts` ile AYNI.
 *
 * İki kopya, tek kural: ayrışmaları `npm run check:tts` (3. bölüm) kapıda
 * tutuyor. Değiştiren, İKİSİNİ birden değiştirir.
 *
 * NEDEN VAR. Dinleme içeriğinin modeli en baştan konuşmacıyı taşıyordu
 * (`segments: { speaker?, text }[]` — deneme sınavı, haftalık quiz, beceri
 * dinlemesi, modül sınavı, seviye tespiti, hepsinde aynı alan) ama bu alan
 * yalnızca EKRANA basılıyordu: ses tarafında hiç kullanılmıyordu ve bütün
 * diyalog tek sesle okunuyordu. Ölçüm: 709 diyalog bloğunun 598'i iki ya da
 * daha çok konuşmacılı. Yani dinleme alıştırmalarının %84'ünde öğrenci, iki
 * ayrı insanın konuşmasını tek bir ağızdan dinliyordu — sınavın ölçtüğü şey
 * tam da kimin ne dediğini ayırabilmekken.
 *
 * TEK SESLİ METİNLER DE KADRODAN OKUNUYOR. Dinleme içeriğinin 1 330 bloğu
 * (742'ye karşı) tek konuşmacılı: haber bülteni, anons, ders anlatımı. Bunlar
 * artık kullanıcının SEÇTİĞİ sesle değil kadronun ilk sesiyle okunuyor —
 * beceri dinlemesinde davranış değişikliği bu. Bilinçli: deneme sınavı zaten
 * `lessonVoice`u kullanıyordu, yani profil sesine saygı gösteren tek yüzey
 * beceri dinlemesiydi ve aynı alıştırma setinde iki kişilik bir diyalog
 * kadroyla, tek kişilik bir kayıt profil sesiyle okunurdu. Kayıt dediğimiz şey
 * "senin öğretmenin" değil, başka birinin sesi; ses seçici her gün duyulan
 * kelime turu ve ders için var. Yan kazanç: 1 330 blok kullanıcı başına iki
 * kopya yerine TEK önbellek girdisi.
 *
 * CİNSİYET TAHMİN EDİLİYOR, ROTASYON DEĞİL. Sırayla kadın/erkek dağıtmak
 * kolay olurdu ama "Kundin"i erkek, "Herr Demir"i kadın sesiyle okutmak
 * anlaşılırlığı düzeltirken inandırıcılığı bozardı — öğrenci sınavda rolün
 * kim olduğunu da anlamak zorunda. Bu yüzden etiket önce cinsiyete çözülüyor,
 * ses ondan sonra seçiliyor.
 *
 * ÇÖZÜM SIRASI (ilk tutan kazanır):
 *   1. Hitap: "Frau/Fr./Mrs./Ms. X" → kadın, "Herr/Hr./Mr. X" → erkek.
 *      En güvenilir işaret ve içerikteki etiketlerin büyük bölümü böyle.
 *   2. Rol adı: Verkäuferin/Verkäufer, Ärztin/Arzt, Mutter/Vater, Waitress…
 *      Almanca dişil biçimler TÜRETİLİYOR, elle yazılmıyor: liste yalnız
 *      eril kökü (`ROLE_REGULAR`) ve düzensizleri (`ROLE_IRREGULAR`) taşıyor.
 *   3. İlk ad sözlüğü (`FIRST_F`, `FIRST_M`).
 *   4. Kurum/rol-üstü etiket (`NEUTRAL`): "Rezeption", "Praxis", "Office",
 *      "Support" — telefonu açan bir kurum, cinsiyeti yok.
 *
 * Hiçbiri tutmazsa cinsiyet `null` kalıyor ve ses sıradan veriliyor. Bu bir
 * arıza değil: "Dr. Weber" ya da "Prof. Rehm" gerçekten cinsiyetsiz bir
 * etiket ve içeriğin bunu söylemek zorunda olmaması doğru. `check:tts`
 * kapısı bu etiketleri SAYIYOR, böylece liste sessizce büyümüyor.
 *
 * `-in` KURALI YOK, bilerek. "Sona `-in` gelirse dişildir" kuralı Martin,
 * Robin, Kevin, Armin ve Benjamin'i kadın yapardı. Bunun yerine dişil biçim
 * yalnızca eril kökü TANINAN sözcüklerden türetiliyor: "Verkäufer" listede
 * olduğu için "Verkäuferin" tanınıyor, "Martin" listede olmadığı için
 * "Martin"den bir şey türetilmiyor.
 */

export type Gender = "female" | "male";

/** Bir konuşmacıya düşen ses — perdesiyle birlikte. */
export type SpeakerVoice = { voice: VoiceId; pitch: Pitch };

/**
 * Dişili DÜZENSİZ olan rol adları — eril kök → dişil karşılığı.
 *
 * Buradakiler `-in` eklenerek türetilemiyor: ya kök değişiyor (Arzt →
 * Ärztin), ya sözcük bambaşka (Vater → Mutter), ya da sıfattan türediği
 * için başka çekiliyor (Angestellter → Angestellte).
 *
 * `null` "bu sözcüğün dişili yok" demek: Gast, Fahrgast, Azubi ve Kind
 * cinsiyetten bağımsız. Bu kökler erkek de sayılmıyor — `Gast` etiketli bir
 * konuşmacıya erkek sesi vermek uydurmak olurdu.
 */
const ROLE_IRREGULAR: Record<string, string | null> = {
  Arzt: "Ärztin",
  Zahnarzt: "Zahnärztin",
  Tierarzt: "Tierärztin",
  Koch: "Köchin",
  Beamter: "Beamtin",
  Angestellter: "Angestellte",
  Reisender: "Reisende",
  Vorsitzender: "Vorsitzende",
  Kunde: "Kundin",
  Kollege: "Kollegin",
  Neuer: "Neue",
  Vater: "Mutter",
  Sohn: "Tochter",
  Bruder: "Schwester",
  Onkel: "Tante",
  Opa: "Oma",
  Großvater: "Großmutter",
  Mann: "Frau",
  Junge: "Mädchen",
  Herr: "Dame",
  Chef: "Chefin",
  // Umlaut alıyor: `-in` eklemek "Staatsanwaltin" verirdi.
  Staatsanwalt: "Staatsanwältin",
  // Dişili olmayanlar: rol cinsiyetten bağımsız, eril de sayılmıyor.
  Gast: null,
  Fahrgast: null,
  Azubi: null,
  Kind: null,
};

/** Düzenli eril rol kökleri — dişilleri `-in` ile türetiliyor. */
const ROLE_REGULAR = [
  "Verkäufer", "Berater", "Mitarbeiter", "Kellner", "Lehrer", "Schüler", "Student", "Nachbar", "Apotheker",
  "Pfleger", "Helfer", "Fahrer", "Sachbearbeiter", "Teilnehmer", "Interessent", "Bewerber", "Antragsteller",
  "Vermieter", "Mieter", "Hausmeister", "Techniker", "Meister", "Ausbilder", "Trainer", "Betreuer",
  "Moderator", "Reporter", "Journalist", "Redakteur", "Sprecher", "Redner", "Dozent", "Prüfer", "Kursleiter",
  "Leiter", "Personalleiter", "Personaler", "Referent", "Bibliothekar", "Sekretär", "Friseur", "Bäcker",
  "Schaffner", "Kontrolleur", "Postbote", "Bote", "Passant", "Besucher", "Anrufer", "Bürger", "Zeuge",
  "Klient", "Patient", "Schuhmacher", "Händler", "Kassierer", "Gastgeber", "Arzthelfer", "Verteidiger",
  "Zuhörer", "Freund", "Tourist",
];

/** Cinsiyeti tek başına belli olan, rol tablolarına sığmayan etiketler. */
const EXTRA_F = [
  "Sprechstundenhilfe", "Kolleginnen", "Nichte", "Hausfrau", "Dame", "Oma", "Tante", "Mutter", "Tochter", "Schwester", "Großmutter", "Mädchen", "Frau",
  // İngilizce
  "Woman", "Mother", "Mum", "Waitress", "Girl", "Lady", "Daughter", "Sister", "Aunt", "Grandma",
];
const EXTRA_M = [
  "Platzwart", "Betriebsrat",
  // İngilizce
  "Man", "Father", "Dad", "Son", "Boy", "Brother", "Uncle", "Grandpa", "Waiter", "Boss", "Barber",
];

/**
 * Cinsiyetsiz etiketler — bir kurum, bir masa, bir hat.
 *
 * "Rezeption" konuşurken konuşan bir insan var ama etiket o insanı değil
 * kurumu adlandırıyor; içerik hangi cinsiyet olduğunu söylemiyor ve
 * uydurmamız da gerekmiyor. Sıradaki boş ses veriliyor.
 */
const NEUTRAL = [
  // Almanca
  "Praxis", "Rezeption", "Empfang", "Verwaltung", "Hausverwaltung", "Technik", "Support", "Vertrieb",
  "Einkauf", "Bank", "Pension", "Station", "Büro", "Zwischenruf", "Kind", "Schule", "Zentrale", "Notruf",
  // Rolün kendisi cinsiyetsiz (`ROLE_IRREGULAR`de dişili `null`): tanınıyor ama cinsiyeti yok.
  "Gast", "Fahrgast", "Azubi", "Ansage", "Durchsage",
  // İngilizce
  "Office", "Shop", "Desk", "Clinic", "Reception", "School", "Press officer", "Subtitler", "Shop assistant",
  "New worker", "Colleague", "Chair", "Host", "Customer", "Clerk", "Caller", "Guest", "Visitor", "Passenger",
  "Announcement", "Voice message", "Voicemail", "Podcast host", "Presenter", "Narrator", "Operator",
  "Neighbour", "Resident", "Staff", "Receptionist", "Cashier", "Assistant", "Agent", "Manager", "Officer",
  "Seller", "Baker", "Chemist", "Owner", "Engineer", "Planner", "Researcher", "Author", "Lecturer", "Tutor",
  "Teacher", "Doctor", "Nurse", "Guide", "Representative", "Supplier", "Editor", "Official", "Critic", "Mediator",
  // Türkçe — bu sözcüklerin hiçbiri cinsiyet taşımıyor.
  "Muhabir", "Sözcü", "Aşçı", "Hasta", "Eczacı", "Öğretmen", "Yardımcı", "Kullanıcı", "Destek", "Aday",
  "Öğrenci", "Görevli", "Danışman", "Satıcı", "Müşteri", "Komşu", "Sunucu", "Anons",
  // Türkçede iki cinsiyette de kullanılan adlar: tanınıyor, cinsiyeti yok.
  "Ilkay", "İlkay", "Yağız", "Umay",
];

/**
 * YALNIZ İNGİLİZCEDE cinsiyetsiz olan etiketler.
 *
 * Bu altı sözcüğün İngilizce ve Almanca yazımı BİREBİR aynı ama cinsiyetleri
 * değil: İngilizce "student" cinsiyet söylemez, Almanca "Student" erildir
 * (dişili "Studentin"). Hepsi `ROLE_REGULAR`da duruyor, yani Almanca tarafı
 * zaten çözülüyordu — ama bu liste `NEUTRAL` içindeyken onu GÖLGELİYORDU:
 * `genderOf` önce `NEUTRAL`a bakıyor ve "Student" cinsiyetsiz dönüyordu.
 * Sonuç asimetrikti — "Studentin" kadın, "Student" cinsiyetsiz — ve cinsiyetsiz
 * konuşmacı boş koltuğa oturduğu için erkek bir öğrenci kadın sesiyle
 * okunabiliyordu ("Herr Wolf" erkek koltuğu aldıktan sonra sıra kadına gelir).
 *
 * Ayrım artık DİLDEN: kâğıdın kursu İngilizceyse cinsiyetsiz, Almancaysa
 * `ROLE_REGULAR`ın verdiği eril. Etiketin dilini bilen tek yer çağıran taraf.
 */
const NEUTRAL_EN_ONLY = ["Student", "Patient", "Reporter", "Journalist", "Tourist", "Trainer"];

/**
 * İlk adlar.
 *
 * İçerikte geçen bütün adlar burada — liste içerikten ÇIKARILDI, tahminle
 * yazılmadı. Yeni bir ad eklendiğinde `check:tts` onu bilinmeyen diye
 * sayıyor; kapı kırılmıyor (ses yine veriliyor) ama sayı görünür oluyor.
 */
const FIRST_F = [
  "Ada", "Aisha", "Alev", "Alina", "Amal", "Amina", "Ana", "Anneke", "Anouk", "Aslı", "Astrid", "Ava", "Ayça", "Ayla",
  "Ayse", "Ayşe", "Ayşen", "Aylin", "Bade", "Bahar", "Bea", "Beren", "Berna", "Berrak", "Beyza", "Bilge",
  "Britta", "Carla", "Cemre", "Ceren", "Ceyda", "Clara", "Clare", "Dalia", "Defne", "Derya", "Dilek", "Duru", "Ecem",
  "Eda", "Ela", "Elena", "Elif", "Ella", "Emma", "Esin", "Eva", "Eylül", "Farah", "Fatma", "Fenna", "Ferda", "Freja",
  "Gökçe", "Hana", "Hande", "Hanna", "Hanne", "Hedda", "Hedi", "Ida", "Ines", "Ingrid", "Iris", "Ilgın",
  "Ilva", "Ipek", "Işıl", "İdil", "İnci", "İpek", "Jana", "Janne", "Jo", "Jonna", "Karin", "Katri", "Katrin",
  "Lale", "Lea", "Lena", "Leyla", "Lin", "Lina", "Lisa", "Lore", "Maren", "Mareike", "Marie", "Marlene",
  "Marta", "Maya", "Melek", "Melis", "Meral", "Merve", "Meryem", "Mia", "Mina", "Mira", "Miriam", "Mona",
  "Nadia", "Nadja", "Naz", "Nehir", "Nella", "Nergis", "Nesrin", "Neval", "Nihal", "Nil", "Nilay", "Nina",
  "Nora", "Nour", "Nuray", "Ola", "Öykü", "Pelin", "Peri", "Petra", "Pia", "Pınar", "Priya", "Rana",
  "Renate", "Rita", "Ronja", "Rosa", "Ruth", "Sara", "Sarah", "Sedef", "Selin", "Selma", "Sena", "Sevil",
  "Signe", "Silke", "Simge", "Sinem", "Sofia", "Sonja", "Su", "Sunna", "Sıla", "Şule", "Talia", "Teuta",
  "Tine", "Tuana", "Tuğçe", "Tuva", "Uma", "Ute", "Vera", "Vida", "Wanda", "Xenia", "Yağmur", "Yara",
  "Yaprak", "Yaren", "Yasemin", "Zehra", "Zeynep", "Zoe", "Zsofia", "Zümrüt",
];
const FIRST_M = [
  "Ahmet", "Ali", "Alp", "Amir", "Ansgar", "Aras", "Arda", "Ayhan", "Baran", "Barış", "Barkın", "Bekir",
  "Ben", "Berat", "Berk", "Bernd", "Bilal", "Bo", "Bora", "Bruno", "Can", "Cem", "Cenk", "Ceyhun", "Cihan",
  "Dan", "Daniel", "Dario", "Deniz", "Devrim", "Diego", "Dmitri", "Doruk", "Dragan", "Efe", "Ege", "Emir",
  "Emre", "Eren", "Erhan", "Erol", "Falk", "Ferit", "Frank", "Gero", "Gino", "Goran", "Görkem", "Hakan",
  "Halid", "Halil", "Halim", "Iker", "Ilhan", "Ilias", "Ilir", "Ilja", "Ilker", "Ilya", "Ito", "Ivan",
  "Jan", "Jonas", "Joris", "Juno", "Kaan", "Kai", "Karl", "Kaya", "Kemal", "Ken", "Kerem", "Kian", "Koray",
  "Kuzey", "Lars", "Lenn", "Leo", "Leon", "Levi", "Levin", "Ling", "Lior", "Lu", "Ludwig", "Lukas", "Marc",
  "Marco", "Marek", "Mert", "Metin", "Milad", "Milo", "Mirek", "Murat", "Nadir", "Nils", "Nuri", "Ole",
  "Ömer", "Onat", "Onur", "Ozan", "Omar", "Paul", "Pavel", "Pedro", "Pierre", "Poyraz", "Rasmus", "Ravi",
  "Reza", "Rico", "Robert", "Robin", "Rolf", "Ruben", "Rudi", "Rui", "Rüzgar", "Sami", "Sam", "Sander",
  "Sarp", "Sinan", "Sven", "Tam", "Tarek", "Tarik", "Tarık", "Til", "Tim", "Timo", "Timur", "Tobias",
  "Tolga", "Tom", "Tomas", "Tomo", "Toprak", "Tuna", "Tunç", "Ufuk", "Ulaş", "Umut", "Uras", "Urho",
  "Viggo", "Vitali", "Volkan", "Wren", "Yalın", "Yannis", "Yasin", "Yuki", "Yusuf",
];

/** Soyadıyla anılan, cinsiyeti içerikte başka yerde belli olan tekil etiketler. */
const SURNAME_M = ["Brandt", "Vogt", "Sander"];

function derived(): { female: Set<string>; male: Set<string> } {
  const female = new Set<string>(EXTRA_F);
  const male = new Set<string>(EXTRA_M);
  const femOf = (base: string) => (base.endsWith("e") ? `${base.slice(0, -1)}in` : `${base}in`);
  for (const [base, fem] of Object.entries(ROLE_IRREGULAR)) {
    // `null` = cinsiyetsiz rol; kökü de erkek saymıyoruz.
    if (fem === null) continue;
    male.add(base);
    female.add(fem);
  }
  for (const base of ROLE_REGULAR) {
    male.add(base);
    female.add(femOf(base));
  }
  for (const n of FIRST_F) female.add(n);
  for (const n of FIRST_M) male.add(n);
  for (const n of SURNAME_M) male.add(n);
  return { female, male };
}

const TABLE = derived();
const NEUTRAL_SET = new Set(NEUTRAL);
const NEUTRAL_EN_SET = new Set(NEUTRAL_EN_ONLY);

/** Cinsiyet söylemeyen ama geçerli olan hitaplar — bkz. `genderOf`. */
const TITLE_ONLY = /^(Dr\.|Prof\.|Dipl\.|Ing\.|Pfr\.|RA\.)(\s|$)/;

/** Etiketin karşılaştırma biçimi — boşluk ve sondaki iki nokta önemsiz. */
export function speakerKey(label: string | undefined | null): string {
  return (label ?? "").trim().replace(/\s+/g, " ").replace(/:$/, "");
}

/**
 * Etiketin cinsiyeti — bilinmiyorsa `null`.
 *
 * `null` bir hata değil: "Dr. Weber" ya da "Rezeption" gerçekten cinsiyet
 * söylemiyor. Çağıran taraf o konuşmacıya sıradaki boş sesi veriyor.
 */
export function genderOf(label: string | undefined | null, lang: "de" | "en" = "de"): Gender | null {
  const s = speakerKey(label);
  if (!s) return null;
  // 1. Hitap. "Frau Dr. Kern", "Frau Prof. Nolte" de buraya düşüyor.
  if (/^(Frau|Fr\.|Mrs\.?|Ms\.?)(\s|$)/.test(s)) return "female";
  if (/^(Herr|Hr\.|Mr\.?)(\s|$)/.test(s)) return "male";
  /* Hitapsız akademik unvan cinsiyet SÖYLEMİYOR ("Dr. Weber", "Prof. Rehm").
     Uydurmak yerine cinsiyetsiz bırakılıyor; `TITLE_ONLY` bunu "tanınmıyor"
     değil "cinsiyeti yok" diye ayırıyor, yoksa kapı her unvanı eksik sayardı. */
  if (TITLE_ONLY.test(s)) return null;
  // 2-3. Tam etiket, sonra ilk sözcük ("Frau Prof." dışı bileşikler için).
  const head = s.split(" ")[0];
  if (NEUTRAL_SET.has(s) || NEUTRAL_SET.has(head)) return null;
  // Yalnız İngilizce içerikte cinsiyetsiz olanlar; Almancada eril (bkz. üstte).
  if (lang === "en" && (NEUTRAL_EN_SET.has(s) || NEUTRAL_EN_SET.has(head))) return null;
  if (TABLE.female.has(s) || TABLE.female.has(head)) return "female";
  if (TABLE.male.has(s) || TABLE.male.has(head)) return "male";
  return null;
}

/** Etiket tanınıyor mu — `check:tts` kapısı bunu sayıyor. */
export function speakerKnown(label: string | undefined | null): boolean {
  const s = speakerKey(label);
  if (!s) return true; // tek sesli metinde konuşmacı yok, sorun da yok
  if (genderOf(s)) return true;
  if (TITLE_ONLY.test(s)) return true;
  const head = s.split(" ")[0];
  return NEUTRAL_SET.has(s) || NEUTRAL_SET.has(head) || NEUTRAL_EN_SET.has(s) || NEUTRAL_EN_SET.has(head);
}

/** Kadronun perde sırası: önce düz, ses tükenince yukarı, sonra aşağı. */
const PITCHES: Pitch[] = ["mid", "up", "down"];

/**
 * Diyalogdaki her SEGMENTE düşen sesi verir — dizinler girdiyle hizalı.
 *
 * Dağıtım ilk görünme sırasına göre: aynı konuşmacı diyalog boyunca aynı
 * sesi koruyor. Kadro tükenirse (Zürih'te ikinci aynı-cinsiyet konuşmacıda)
 * aynı sesin perdesi kaydırılmış hâli veriliyor; ikisi de tükenirse baştan
 * dönülüyor — o noktada altı kişilik bir Zürih diyaloğu var demektir ve
 * tekrar etmek susmaktan iyidir.
 *
 * Cinsiyeti bilinmeyen konuşmacılar en SONA bırakılıyor: böylece bilinenler
 * kendi cinsiyetlerinin ilk (ve en tanıdık) sesini alıyor, artan sesler
 * bilinmeyenlere kalıyor.
 */
export function dialogueCast(course: string, segments: { speaker?: string }[]): SpeakerVoice[] {
  const pool = castFor(course);
  const order: string[] = [];
  for (const seg of segments) {
    const k = speakerKey(seg.speaker);
    if (!order.includes(k)) order.push(k);
  }

  const taken: Record<Gender, number> = { female: 0, male: 0 };
  const seat = (g: Gender): SpeakerVoice => {
    const list = pool[g];
    const n = taken[g]++;
    return { voice: list[n % list.length], pitch: PITCHES[Math.floor(n / list.length) % PITCHES.length] };
  };

  // Etiketin dili kâğıdın kursundan: İngilizce kâğıtta "Student" cinsiyetsiz,
  // Almancada eril (bkz. `NEUTRAL_EN_ONLY`).
  const lang = course === "en" ? "en" : "de";
  const chosen = new Map<string, SpeakerVoice>();
  // Önce cinsiyeti bilinenler — sıralarını korusunlar.
  for (const k of order) {
    const g = genderOf(k, lang);
    if (g) chosen.set(k, seat(g));
  }
  // Sonra bilinmeyenler: hangi havuzda daha az koltuk dolduysa oradan.
  for (const k of order) {
    if (chosen.has(k)) continue;
    chosen.set(k, seat(taken.female <= taken.male ? "female" : "male"));
  }

  /* `order` her etiketi topluyor ve iki döngü hepsine koltuk veriyor, yani
     `chosen` eksiksiz — yine de `??` duruyor ki tip daralsın. */
  return segments.map((seg) => chosen.get(speakerKey(seg.speaker)) ?? { voice: pool.female[0], pitch: "mid" });
}
