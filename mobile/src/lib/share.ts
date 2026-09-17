import { Share } from "react-native";
import { track } from "./track";
import { t, targetLangName, formatPercent } from "./i18n";

/**
 * Paylaşım / davet. RN'in yerleşik Share API'siyle (native dep yok) OS paylaşım
 * sayfasını açar.
 *
 * DAVET KODU ARTIK GERÇEK. Bağlantı eskiden sabit `?ref=davet` taşıyordu, yani
 * kimin davet ettiği hiçbir yerde yazmıyordu ve ödül verilemezdi — dosyanın
 * kendi notu "auth gelince kullanıcıya bağlanır" diyordu. Kod çağıranın
 * verdiği: `usePremiumStatus().referral.code` ya da `/api/premium/referral`.
 * Kod yoksa bağlantı yine paylaşılıyor ama ödül üretmiyor; paylaşımı büsbütün
 * engellemek daha kötü olurdu.
 *
 * Adres biçimi web'deki davet bağlantısıyla AYNI (`/r/<KOD>`, bkz. sunucu
 * `app/r/[code]`): iddia edilen bir App Link/Universal Link, yani uygulaması
 * kurulu olanda uygulamada açılıyor ve bağı kuruyor, kurulu olmayanda webde.
 */
const APP_URL = "https://www.lernomi.app";

/**
 * Davet bağlantısı — BİÇİM TEK YERDE.
 *
 * Adres iki yerde kuruluyordu (paylaşım metni ve paywall'daki kutu) ve ikisi
 * ayrışabilirdi; ayrışan bir davet adresi, kimsenin fark etmeyeceği ölü bir
 * bağlantı demek.
 */
export const inviteLink = (referralCode: string): string => `${APP_URL}/r/${referralCode}`;

export async function shareInvite(referralCode?: string | null): Promise<void> {
  try {
    track("share", 0, "invite");
    /*
      PAYLAŞILAN ADRES `/r/<KOD>` — bağı DOKUNUŞLA kuran yol.

      Eskiden `/premium?code=…` paylaşılıyordu: bağlantı paywall'ı açıyor, kodu
      kutuya dolduruyor ve kullanıcının ayrıca "Uygula"ya basmasını bekliyordu.
      Üstelik o kutu iOS'ta hiç çizilmiyor (Guideline 3.1.1, `PaywallScreen`
      `OWN_PROMO_CODES`), yani davet edilen iOS kullanıcısı bağı hiç
      kuramıyordu. `/r/<kod>` iddia edilen bir App Link/Universal Link:
      uygulaması kurulu olanda uygulamada açılıp bağı kuruyor, kurulu
      olmayanda webde. İki yolda da kullanıcı hiçbir şey yazmıyor.
    */
    const link = referralCode ? inviteLink(referralCode) : APP_URL;
    await Share.share({
      message: t("share.invite", { lang: targetLangName(), link }),
    });
  } catch { /* kullanıcı vazgeçti / paylaşım kapalı */ }
}

/**
 * TUR SONUCU PAYLASIMI — web `components/share-result` ile AYNI METIN.
 *
 * Iki platform ayni turu iki farkli bicimde paylasiyordu: web Wordle'in
 * ogrettigi DESENI gonderiyor (kareler + seviye + istatistik satiri),
 * Android ise tek cumlelik duz bir metin. Ayni ozellik iki uygulamada iki
 * ayri sey oluyordu; sozluk anahtarlari da webde `sharew.*` diye yalniz
 * webde duruyordu. Anahtarlar `share.*` olarak ORTAK kumeye tasindi
 * (`i18n-pull` base'i buradan uretiyor) ve metin uretimi buraya kopyalandi.
 *
 * Kareler bakana hangi kelimeler oldugunu SOYLEMIYOR: kimsenin sirasini
 * bozmuyor, yalnizca merak ettiriyor.
 */
const MAX_ROWS = 3;
const PER_ROW = 10;

/** Dogru/yanlis dizisini kare satirlarina cevirir (web `marksToGrid`). */
export function marksToGrid(marks: boolean[]): string {
  /* Uzun turlarda ILK degil SON kareler gosteriliyor: paylasilan sey turun
     nasil bittigi. */
  const shown = marks.slice(-MAX_ROWS * PER_ROW);
  const rows: string[] = [];
  for (let i = 0; i < shown.length; i += PER_ROW) {
    /* Dolu/bos kare, renkli emoji DEGIL: emoji her platformda ayri
       ciziliyor, bazi istemcilerde hic cizilmiyor. */
    rows.push(shown.slice(i, i + PER_ROW).map((ok) => (ok ? "■" : "□")).join(""));
  }
  return rows.join("\n");
}

export type ShareInput = {
  marks: boolean[];
  total: number;
  /** 0-100 arasi dogruluk. */
  accuracy: number;
  streak: number;
  level: string;
};

/** Paylasim metni — web `buildShareText` ile satir satir ayni. */
export function buildShareText(input: ShareInput): string {
  const lines = [t("share.head", { level: input.level }), marksToGrid(input.marks)];

  const pct = formatPercent(input.accuracy);
  const stats = [t("share.n_words", { n: input.total }), t("share.pct_correct", { pct })];
  if (input.streak > 0) stats.push(t("social.days_streak", { n: input.streak }));
  lines.push(stats.join(" · "));
  lines.push("");
  lines.push(`${APP_URL}?ref=sonuc`);
  return lines.join("\n");
}

/**
 * TUR sonucu — DESENLI metin.
 *
 * Yuruyus kipi bunu KULLANMIYOR ve bu bilincli: orada tur basina dogru/yanlis
 * dizisi tutulmuyor (ne webde ne Androidde), yani cizilecek desen yok. O kip
 * iki platformda da duz cumleyi (`share.result`) paylasiyor - yani ayrim
 * platformlar arasinda degil, TURUN TURU arasinda ve iki tarafta ayni.
 */
export async function shareRoundResult(input: ShareInput): Promise<void> {
  try {
    track("share", input.marks.filter(Boolean).length, "result");
    await Share.share({ message: buildShareText(input) });
  } catch { /* kullanıcı vazgeçti */ }
}

/** Yuruyus kipinin duz cumlesi — web `lib/share` `resultText` ile ayni. */
export async function shareResult(correct: number, total: number): Promise<void> {
  try {
    track("share", correct, "result");
    await Share.share({
      message: t("share.result", { total: total, correct: correct, link: `${APP_URL}?ref=sonuc` }),
    });
  } catch { /* kullanıcı vazgeçti */ }
}

export async function shareStreak(days: number): Promise<void> {
  try {
    track("share", days, "streak");
    await Share.share({
      message: t("share.streak", { n: days, lang: targetLangName(), link: `${APP_URL}?ref=seri` }),
    });
  } catch { /* kullanıcı vazgeçti */ }
}
