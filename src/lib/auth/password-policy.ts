/**
 * Parola ölçütü — uzunluk, yaygın parola ve kimlik içerme.
 *
 * NEDEN KARMAŞIKLIK KURALI YOK. "Büyük harf + rakam + sembol zorunlu" kuralı
 * sezgiye rağmen parolaları KÖTÜLEŞTİRİYOR: insanlar `Parola1!` gibi tahmin
 * edilebilir kalıplara kaçıyor, entropi artmıyor, hatırlanabilirlik düşüyor.
 * NIST SP 800-63B 2017'den beri bu kuralı açıkça önermiyor. Bunun yerine
 * uzunluk ve BİLİNEN parolaların elenmesi isteniyor — burada yapılan da o.
 *
 * NEDEN AĞ ÜZERİNDEN SIZINTI SORGUSU YOK. Have I Been Pwned'in k-anonimlik
 * ucu teknik olarak iyi (parola gitmiyor, karmanın ilk beş hanesi gidiyor) ama
 * bize YENİ BİR ÜÇÜNCÜ TARAF İŞLEYİCİ ekler; gizlilik politikası, App Store
 * gizlilik etiketleri ve Play Veri Güvenliği formu üçü birden yeniden açılır.
 * Yerel liste bu bedeli ödemeden saldırıların büyük kısmını karşılıyor:
 * gerçek saldırı "her kombinasyonu dene" değil, "sızmış listenin ilk on binini
 * dene" oluyor.
 *
 * NEDEN SADECE LİSTE DEĞİL. Sabit bir liste `qwerty`yi yakalar, `qwertzuiop`u
 * kaçırır. Bu yüzden listenin yanında DESEN kuralları var: tek karakterin
 * tekrarı, artan/azalan diziler, klavye sıraları, salt rakam. Bir de kimlik
 * kuralı: e-posta adının ya da kullanıcı adının parolanın içinde geçmesi.
 *
 * TÜRKÇE KÜÇÜK HARF TUZAĞI: `"İSTANBUL".toLowerCase()` JavaScript'te
 * `"i̇stanbul"` veriyor (birleşen nokta) ve liste eşleşmesi kaçıyor. Bu yüzden
 * normalleştirme önce `İ→i`, `I→ı` çevirisini elle yapıyor.
 */

/** Asgari uzunluk. 8'den 10'a çıkarıldı; NIST'in tabanı 8 ve 10 yaygın uygulama. */
export const MIN_PASSWORD_LENGTH = 10;

export type PasswordProblem = "too_short" | "too_common" | "contains_identity";

/**
 * Yaygın parolalar — küçük harfe indirilmiş hâlleriyle.
 *
 * Küresel sızıntı listelerinin çekirdeği ve TÜRKÇE'ye özgü olanlar bir arada.
 * İkincisi önemli: dünya listeleri `parola123`, `sifre123`, `galatasaray`
 * içermiyor ama Türkiye'deki bir saldırgan önce onları dener.
 *
 * DIŞA AÇIK olmasının tek sebebi `check:parity`: kapı yalnız `export const`
 * biçimindeki sabitleri okuyabiliyor ve iki kopyanın aynı listeyi taşıdığı
 * ancak böyle ölçülüyor. Başka çağıranı yok.
 */
export const COMMON = [
  // salt rakam ve klasikler
  "123456", "1234567", "12345678", "123456789", "1234567890", "12345", "111111",
  "000000", "123123", "121212", "654321", "112233", "123321", "159753", "789456",
  "987654321", "1q2w3e4r", "1qaz2wsx", "qazwsx", "qwe123", "qwerty123",
  // klavye
  "qwerty", "qwertyuiop", "qwertz", "qwertzuiop", "asdfgh", "asdfghjkl",
  "zxcvbn", "zxcvbnm", "poiuyt", "lkjhgf",
  // İngilizce klasikler
  "password", "passw0rd", "password1", "password123", "abc123", "iloveyou",
  "admin", "administrator", "welcome", "monkey", "dragon", "sunshine",
  "princess", "letmein", "football", "baseball", "master", "shadow",
  "superman", "trustno1", "michael", "jordan", "harley", "ranger", "hunter",
  "buster", "soccer", "hockey", "killer", "george", "andrew", "charlie",
  "thomas", "robert", "access", "pepper", "daniel", "batman", "starwars",
  "whatever", "freedom", "computer", "matrix", "secret", "summer", "ashley",
  "bailey", "jessica", "nicole", "hannah", "chocolate", "internet",
  // Türkçe — yerel saldırganın ilk denediği küme
  "sifre", "şifre", "sifre123", "şifre123", "sifrem", "parola", "parola123",
  "parolam", "merhaba", "selam", "deneme", "deneme123", "benim", "seninle",
  "askim", "aşkım", "canim", "canım", "bebegim", "bebeğim", "hayat", "ailem",
  "annem", "babam", "kizim", "kızım", "oglum", "oğlum", "sevgi", "mutluluk",
  "turkiye", "türkiye", "istanbul", "ankara", "izmir", "antalya", "bursa",
  "galatasaray", "fenerbahce", "fenerbahçe", "besiktas", "beşiktaş",
  "trabzonspor", "gs1905", "fb1907", "bjk1903", "ataturk", "atatürk",
  "futbol", "muhammed", "mehmet", "ahmet", "mustafa", "fatma", "ayse", "ayşe",
  "emine", "hatice", "zeynep", "elif", "kerem", "murat", "hasan", "huseyin",
  "hüseyin", "ibrahim", "ismail", "osman", "yusuf", "omer", "ömer",
  // uygulamaya özgü — en bariz tahminler
  "lernomi", "lernomi123", "almanca", "deutsch", "german", "almanca123",
];

/*
  Arama için küme. Liste DİZİ olarak duruyor çünkü `check:parity` web ve mobil
  kopyaları karşılaştırırken `new Set([...])` biçimini okuyamıyor — iki tarafın
  aynı listeyi taşıdığı ancak böyle ölçülebiliyor.
*/
const COMMON_SET = new Set(COMMON);

/** Klavye sıraları — parça olarak aranıyor, tam eşleşme değil. */
const KEYBOARD_RUNS = [
  "qwertyuiop", "asdfghjkl", "zxcvbnm", "qwertzuiop", "azertyuiop",
  "1234567890", "0987654321",
];

/**
 * Türkçe'ye duyarlı küçük harf.
 *
 * `toLowerCase()` tek başına yetmiyor: `İ` → `i` + birleşen nokta veriyor ve
 * `I` → `i` çevriliyor (Türkçede `ı` olmalı). İkisi de liste eşleşmesini
 * sessizce kaçırıyordu.
 */
function lower(value: string): string {
  return value.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
}

/** Sondaki rakamları atar: `parola2024` → `parola`. Kök listede ise yakalanır. */
function stem(value: string): string {
  return value.replace(/[0-9]+$/, "");
}

/** Tek karakterin tekrarı: `aaaaaaaaaa`, `1111111111`. */
function isRepeated(value: string): boolean {
  return value.length > 0 && new Set(value).size === 1;
}

/** Artan ya da azalan ardışık dizi: `abcdefghij`, `9876543210`. */
function isSequential(value: string): boolean {
  if (value.length < 4) return false;
  let asc = true;
  let desc = true;
  for (let i = 1; i < value.length; i++) {
    const d = value.charCodeAt(i) - value.charCodeAt(i - 1);
    if (d !== 1) asc = false;
    if (d !== -1) desc = false;
  }
  return asc || desc;
}

/** Klavye sırasından kesilmiş bir dilim mi: `qwertyui`, `asdfghjk`. */
function isKeyboardRun(value: string): boolean {
  if (value.length < 6) return false;
  return KEYBOARD_RUNS.some((run) => run.includes(value) || [...run].reverse().join("").includes(value));
}

/**
 * Kimlik parçası parolanın içinde mi.
 *
 * `samet@lernomi.app` + `samet2026` klasik ve tahmin edilebilir: hedefe özel
 * saldırıda ilk denenen şey adın kendisi. Dört karakterin altı aranmıyor —
 * kısa adlar rastgele parolalarda tesadüfen geçebilir.
 */
function containsIdentity(password: string, email?: string, name?: string): boolean {
  const p = lower(password);
  const parts: string[] = [];
  if (email) {
    const local = email.split("@")[0] ?? "";
    parts.push(local, ...local.split(/[._-]+/));
  }
  if (name) parts.push(name, ...name.split(/\s+/));
  return parts.some((raw) => {
    const part = lower(raw.trim());
    return part.length >= 4 && p.includes(part);
  });
}

/**
 * Parolayı sınar. Sorun yoksa `null`.
 *
 * `email` ve `name` isteğe bağlı: parola sıfırlama akışında gövde yalnız yeni
 * parolayı taşıyor, kimlik kuralı orada çalışamıyor. Uzunluk ve yaygınlık her
 * yolda çalışıyor.
 */
export function checkPassword(
  password: string,
  identity?: { email?: string; name?: string },
): PasswordProblem | null {
  if (password.length < MIN_PASSWORD_LENGTH) return "too_short";

  const p = lower(password);
  if (COMMON_SET.has(p) || COMMON_SET.has(stem(p))) return "too_common";
  if (isRepeated(p) || isSequential(p) || isKeyboardRun(p)) return "too_common";
  // Salt rakam: uzunluk kuralını geçse bile aranan alan çok küçük.
  if (/^[0-9]+$/.test(p)) return "too_common";

  if (containsIdentity(password, identity?.email, identity?.name)) return "contains_identity";
  return null;
}

/** Hata kodu — istemcideki `translateAuthError` bunu i18n anahtarına çeviriyor. */
export const PASSWORD_ERROR_CODE: Record<PasswordProblem, string> = {
  too_short: "PASSWORD_TOO_SHORT",
  too_common: "PASSWORD_TOO_COMMON",
  contains_identity: "PASSWORD_CONTAINS_IDENTITY",
};
