/**
 * Yaş derecelendirmesi kapısı — `npm run check:age-rating`
 *
 * NEDEN VAR. App Store'un yaş anketi 2026-09-10'da dolduruldu ve verilen her
 * cevap bir BEYAN oldu (bkz. `docs/appstore/listing.md` §2.3). Beyan bir kez
 * verilince içerik üretiminin sınırı hâline geliyor: "cinsel içerik yok" diyen
 * bir uygulamaya sonradan öyle bir ders eklenirse beyan yalan olur ve bunu
 * kimse fark etmez — ders yazan kişi o belgeyi okumaz.
 *
 * Bu yüzden cevaplar burada VERİ olarak duruyor ve içerik onlara karşı
 * ölçülüyor. Anketteki cevap değişirse önce buradaki tablo değişir.
 *
 * İKİ TÜR KURAL:
 *   NONE        Beyan "hiç yok" dedi. Tek geçiş bile hata — ama gözden geçirilip
 *               mecaz olduğu görülmüş geçişler `İSTİSNA` listesinde, gerekçesiyle.
 *   INFREQUENT  Beyan "seyrek" dedi. Geçiş sayısının bir TAVANI var; aşarsa
 *               beyan "Frequent"a kayıyor demektir ve anket güncellenmeli.
 *
 * NEDEN TAVAN VAR, NEDEN SIFIR DEĞİL. Alkol atıfları gerçekten var (Bier, Wein,
 * rauchen) ve bunlar A1 kelime listesinin doğal parçası — silmek dil öğretimini
 * sakatlar. Ölçülen şey varlık değil ORAN: on dört kelime "seyrek", yüz kelime
 * değil.
 *
 * SINIRI: bu bir sözcük taraması, bağlam okumuyor. `Gewalt` on dört kez geçiyor
 * ve hepsi bir hırsızlık ünitesinin kelime listesinde; `Waffe` iki kez geçiyor
 * ve ikisi de mecaz ("taviz bir silahtır"). Kapı bunları ayırt edemez, o yüzden
 * gözden geçirilmiş geçişler istisna listesine gerekçesiyle yazılıyor. Liste
 * uzuyorsa bu, kuralın değil beyanın gözden geçirilmesi gerektiğinin işareti.
 */
import { readFileSync } from "node:fs";
import { readdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

/** Anketteki cevap. Değişirse `docs/appstore/listing.md` §2.3 de değişir. */
type Beyan = "NONE" | "INFREQUENT";

type Kural = {
  /** Anket satırının adı — hata metninde görünüyor. */
  anket: string;
  beyan: Beyan;
  /** Aranan sözcük kökleri (Almanca içerik; küçük harfe indirilmiş metinde `\b<kök>\w*`). */
  kokler: string[];
  /** INFREQUENT için üst sınır. NONE'da kullanılmıyor. */
  tavan?: number;
  /** Tavanın gerekçesi — sayının nereden geldiği. */
  not?: string;
};

const KURALLAR: Kural[] = [
  {
    anket: "Sexual Content or Nudity",
    beyan: "NONE",
    /* `=intim` TAM SÖZCÜK: İngilizce sınav kâğıtlarındaki `intimidating` kökle
       eşleşiyordu. İçerik iki dilli, tarama da öyle davranmak zorunda. */
    kokler: ["Sex", "sexuell", "Erotik", "nackt", "Nacktheit", "=intim", "Intimität", "Porno"],
  },
  {
    anket: "Realistic Violence",
    beyan: "NONE",
    // `gewaltig` = muazzam, şiddet değil: kök eşleşmesinden sonra ayıklanıyor.
    kokler: ["Gewalt", "Mord", "Totschlag", "Prügel", "Schlägerei", "prügeln"],
  },
  {
    anket: "Guns or Other Weapons",
    beyan: "NONE",
    kokler: ["Waffe", "Waffen", "Pistole", "Gewehr", "Revolver", "Munition", "Schwert"],
  },
  {
    anket: "Gambling / Simulated Gambling",
    beyan: "NONE",
    /* `Wette` TAM SÖZCÜK: `Wetter` (hava durumu) ve `Wettbewerb` (yarışma) aynı
       harflerle başlıyor ve ilk ölçümde 123 sahte geçiş üretti. */
    kokler: ["Casino", "Kasino", "=wetten", "=Wette", "=Wetten", "Glücksspiel", "Roulette", "Lotterie", "=Lotto"],
  },
  {
    anket: "Alcohol, Tobacco, or Drug Use or References",
    beyan: "INFREQUENT",
    /*
      HARFE DUYARLI ve bazıları TAM SÖZCÜK (`=` öneki). Almancada isimler büyük
      harfle yazılıyor ve bu ayrımı kullanmazsak tarama yalan söylüyor:
      `wein*` → `weinen` (ağlamak), `sucht*` → `sucht` (arıyor),
      `Sekt*` → `Sektor`. İlk ölçüm bu yüzden 313 gösterdi.
    */
    kokler: [
      "Bier", "Wein", "Weinglas", "Rotwein", "Weißwein", "Alkohol", "Schnaps", "=Sekt",
      "Cocktail", "betrunken", "Kneipe", "Wodka", "Whisky", "Likör", "=Prost",
      "anstoßen", "Brauerei",
      "Zigarette", "rauchen", "Raucher", "Tabak", "Nichtraucher", "Zigarre",
      "Droge", "Kokain", "Cannabis", "Heroin", "=Sucht", "süchtig",
    ],
    tavan: 260,
    not: "2026-09-10 ölçümü ~130 geçiş; tavan iki katı. Aşmak 'Infrequent' beyanını zorlar.",
  },
  {
    anket: "Mature or Suggestive Themes",
    beyan: "INFREQUENT",
    kokler: [
      "arbeitslos", "Arbeitslosigkeit", "Diskriminierung", "Rassismus", "Depression",
      "Einsamkeit", "Armut", "Flüchtling", "=Flucht", "Migration", "Scheidung",
      "sterben", "Mobbing", "Krieg",
    ],
    tavan: 320,
    not: "2026-09-10 ölçümü 107 geçiş; tavan üç katı — B1-C1 içeriği büyüyecek.",
  },
];

/**
 * Gözden geçirilmiş geçişler: kapı sözcüğü görüyor ama anlam beyanı bozmuyor.
 * Anahtar `dosya::sözcük`; değer, NEDEN sayılmadığı.
 */
const ISTISNA: Record<string, string> = {
  // --- Realistic Violence ---
  "b1-u37.ts::gewalt":
    "B1 hırsızlık ünitesi: `die Gewalt` kelime listesi maddesi; metin 'hırsızlıkta neredeyse hiç şiddet kullanılmaz' diyor. Tasvir yok.",
  "de-b1-b15.ts::gewalt":
    "Aynı hırsızlık ünitesinin beceri karşılığı — `einbrechen`, `stehlen`, `Täter`, `Dieb` ile birlikte kelime listesi maddesi.",
  "de-b2-b04.ts::gewalt":
    "YANLIŞ DOST: 'Vierte Gewalt' = basın, yani dördüncü KUVVET (erkler ayrılığı). Almancada `Gewalt` hem şiddet hem erk demek; burada ikincisi. Basın özgürlüğü metni.",
  "b2-u10.ts::gewalt":
    "Aynı yanlış dost: B2 Ünite 10 'Vierte Gewalt' — basın özgürlüğü. Şiddet değil erk.",

  // --- Guns or Other Weapons ---
  "c1-u08.ts::waffe":
    "Mecaz: 'DAS ZUGESTÄNDNIS ALS WAFFE' — tartışmada taviz. Silaha atıf değil.",
  "b2-11.ts::munition":
    "Mecaz: 'liefern wir die Munition gegen uns selbst' — müzakere dili.",

  // --- Gambling ---
  "b2-04.ts::lotterie":
    "Mecaz: 'eine Lotterie mit Beziehungen als Losen' — ev bulmanın piyangoya benzetilmesi. Kumar değil.",
  "c1-03.ts::wette":
    "Mecaz: 'Ein Gutachten ist keine Wette' — bilirkişi raporu ile şans arasındaki ayrım.",
  "c1-08.ts::wette":
    "Mecaz: 'eine Prämie, die das Risiko nicht mitbezahlt, ist keine Prämie, sondern eine Wette' — sigorta primi tartışması.",
  "b2-u21.ts::wetten":
    "Deyim: 'Ich würde nicht darauf wetten' — 'buna bahse girmezdim'. Bahis eylemi yok.",
};

/**
 * Kelime HAVUZUNDAKİ gözden geçirilmiş maddeler. Havuz bir sözlük: bir kavramın
 * karşılığını öğretmek, o kavramı uygulamaya koymak değil.
 *
 * Apple'ın kumar sorusu bir MEKANİK soruyor ("betting or wagering"), sözlük
 * maddesi değil — alkol sorusunun aksine "or References" demiyor. Bahis
 * fiilinin B1 kelimesi olması beyanı bozmuyor; bir rulet oyunu eklenirse
 * `Roulette`, `Glücksspiel` gibi sözcükler İÇERİKTE görünür ve kapı orada öter.
 */
const HAVUZ_ISTISNA: Record<string, string> = {
  wetten: "B1 sözlük maddesi 'bahse girmek'. Uygulamada bahis mekaniği yok.",
  Gewalt: "B1 sözlük maddesi 'şiddet'. Kavramın karşılığını öğretmek, tasvir değil.",
};

/** Şiddet kökünden ayıklanacak yanlış eşleşmeler. */
const YANLIS_ESLESME = [/^[Gg]ewaltig/, /^[Gg]ewaltlos/];

function icerikDosyalari(): string[] {
  const out: string[] = [];
  for (const dir of ["src/lib/mock-exams/de", "src/lib/mock-exams/en", "src/lib/skills/content", "src/lib/lessons/content"]) {
    const p = path.join(ROOT, dir);
    try {
      for (const f of readdirSync(p)) if (f.endsWith(".ts")) out.push(path.join(p, f));
    } catch {
      /* dizin yoksa atla — hat kurulmadan da koşabilmeli */
    }
  }
  return out;
}

type Gecis = { dosya: string; kok: string; ornek: string };

function tara(kural: Kural, dosyalar: string[]): Gecis[] {
  const gecisler: Gecis[] = [];
  /*
    HARFE DUYARLI (`g`, `i` YOK). Almanca isimler büyük harfli ve ayrım anlamı
    taşıyor. `=` önekli kökler TAM SÖZCÜK arıyor: `Sekt` evet, `Sektor` hayır.
  */
  const kalip = kural.kokler
    .map((k) => (k.startsWith("=") ? `${k.slice(1)}\\b` : `${k}\\w*`))
    .join("|");
  const re = new RegExp(`\\b(${kalip})`, "g");
  for (const f of dosyalar) {
    const ad = path.basename(f);
    const metin = readFileSync(f, "utf8");
    for (const m of metin.matchAll(re)) {
      if (YANLIS_ESLESME.some((r) => r.test(m[0]))) continue;
      gecisler.push({ dosya: ad, kok: m[0].toLowerCase(), ornek: m[0] });
    }
  }
  return gecisler;
}

/** Kelime havuzu da sayılıyor: A1 'Bier' orada duruyor, ders dosyalarında değil. */
function havuzGecisleri(kural: Kural): number {
  let n = 0;
  for (const dosya of ["data/app/words.json", "data/app/words-en.json"]) {
    let ham: string;
    try {
      ham = readFileSync(path.join(ROOT, dosya), "utf8");
    } catch {
      continue;
    }
    const satirlar = ham.trimStart().startsWith("[") ? (JSON.parse(ham) as Record<string, unknown>[]) : ham.split("\n").filter(Boolean).map((l) => JSON.parse(l) as Record<string, unknown>);
    for (const w of satirlar) {
      const de = String(w.de ?? "").replace(/^(der|die|das) /, "");
      if (HAVUZ_ISTISNA[de]) continue;
      if (kural.kokler.some((k) => (k.startsWith("=") ? k.slice(1) : k) === de)) n++;
    }
  }
  return n;
}

function main(): void {
  const dosyalar = icerikDosyalari();
  console.log(`\nYaş derecelendirmesi kapısı — ${dosyalar.length} içerik dosyası + kelime havuzu\n`);

  let hata = 0;
  for (const kural of KURALLAR) {
    const gecisler = tara(kural, dosyalar);
    const havuz = havuzGecisleri(kural);
    const toplam = gecisler.length + havuz;

    if (kural.beyan === "NONE") {
      const sayilan = gecisler.filter((g) => !ISTISNA[`${g.dosya}::${g.kok}`]);
      const elenen = gecisler.length - sayilan.length;
      if (sayilan.length === 0 && havuz === 0) {
        console.log(`  tamam  ${kural.anket.padEnd(42)} NONE — geçiş yok${elenen ? ` (${elenen} istisna)` : ""}`);
      } else {
        hata++;
        console.log(`  HATA   ${kural.anket}`);
        console.log(`         Beyan "None" ama ${sayilan.length} içerik + ${havuz} havuz geçişi var.`);
        for (const g of sayilan.slice(0, 8)) console.log(`           ${g.dosya}: ${g.ornek}`);
        console.log(`         Ya içerik geri alınır, ya anket güncellenir (docs/appstore/listing.md §2.3).`);
        console.log(`         Mecazsa scripts/check-age-rating.ts › ISTISNA'ya gerekçesiyle eklenir.`);
      }
      continue;
    }

    const tavan = kural.tavan ?? 0;
    if (toplam <= tavan) {
      console.log(`  tamam  ${kural.anket.padEnd(42)} INFREQUENT — ${toplam}/${tavan}`);
    } else {
      hata++;
      console.log(`  HATA   ${kural.anket}`);
      console.log(`         ${toplam} geçiş, tavan ${tavan}. Beyan "Infrequent" ama içerik "Frequent"a kayıyor.`);
      console.log(`         ${kural.not ?? ""}`);
      console.log(`         Anket güncellenmeli (docs/appstore/listing.md §2.3) ya da içerik seyreltilmeli.`);
    }
  }

  console.log(hata === 0 ? `\n${KURALLAR.length} beyanın hepsi içerikle tutuyor.` : `\n${hata} beyan içerikle tutmuyor.`);
  process.exit(hata === 0 ? 0 : 1);
}

main();
