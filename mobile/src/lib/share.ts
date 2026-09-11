import { Share } from "react-native";
import { track } from "./track";
import { t, targetLangName, formatNumber, formatPercent } from "./i18n";

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
 * `?code=` biçimi web'deki promo/davet açılış sayfasıyla aynı
 * (`/premium?code=…`): tek bağlantı hem kodu tanıtıyor hem paywall'ı açıyor.
 */
const APP_URL = "https://www.lernomi.app";

export async function shareInvite(referralCode?: string | null): Promise<void> {
  try {
    track("share", 0, "invite");
    const link = referralCode ? `${APP_URL}/premium?code=${referralCode}` : APP_URL;
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
  /** Gunun turu farkli bir metin uretir. */
  kind?: "session" | "daily";
  /** Gunun turunun puani — yalniz `kind: "daily"` icin anlamli. */
  score?: number;
};

/** Paylasim metni — web `buildShareText` ile satir satir ayni. */
export function buildShareText(input: ShareInput): string {
  const daily = input.kind === "daily";
  const head = daily
    ? t("share.head_daily", { level: input.level })
    : t("share.head", { level: input.level });
  const lines = [head, marksToGrid(input.marks)];

  const pct = formatPercent(input.accuracy);
  const stats = daily
    ? [t("share.points", { n: formatNumber(input.score ?? 0) }), t("share.of_questions", { n: input.total, pct })]
    : [t("share.n_words", { n: input.total }), t("share.pct_correct", { pct })];
  if (input.streak > 0) {
    stats.push(daily ? t("share.streak_short", { n: input.streak }) : t("social.days_streak", { n: input.streak }));
  }
  lines.push(stats.join(" · "));

  if (daily) lines.push("", t("share.daily_cta", { level: input.level }));
  else lines.push("");
  lines.push(`${APP_URL}?ref=sonuc`);
  return lines.join("\n");
}

/**
 * TUR sonucu (oturum ve gunun turu) — DESENLI metin.
 *
 * Yuruyus kipi bunu KULLANMIYOR ve bu bilincli: orada tur basina dogru/yanlis
 * dizisi tutulmuyor (ne webde ne Androidde), yani cizilecek desen yok. O kip
 * iki platformda da duz cumleyi (`share.result`) paylasiyor - yani ayrim
 * platformlar arasinda degil, TURUN TURU arasinda ve iki tarafta ayni.
 */
export async function shareRoundResult(input: ShareInput): Promise<void> {
  try {
    track("share", input.marks.filter(Boolean).length, input.kind === "daily" ? "daily" : "result");
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
