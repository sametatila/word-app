/**
 * Anlatım balonunda parçaların ARASI — yalnız GÖRÜNÜM. Mobil `lib/segmentText`
 * ile birebir (`check:parity` "anlatim parca arasi").
 *
 * Anlatım parçalardan kuruluyor (`say: [tr][de][tr]`) ve her parça ayrı
 * seslendiriliyor; hedef dildeki parça noktasız yazılıyor çünkü ses dosyası o
 * metnin anahtarı ("Jott", "dreiundvierzig"). Ekranda ise parçalar art arda
 * dizilince cümle sonu kayboluyordu: "… Vau, Jott Bir de yalnızca …",
 * "… dreiundvierzig Tekrar dene." (QA F-0009, 2026-10-09).
 *
 * KURAL: hedef dildeki parça noktalamasız bitiyorsa ve ardından gelen anlatım
 * parçası BÜYÜK HARFLE başlıyorsa yeni bir cümle başlıyor — araya nokta
 * konuyor. İstisna dil adları: "das Jahr Türkçede 'yıl' demek" şablonunda
 * büyük harf cümle başı değil, özel ad (içerikte ~2.400 yer). Ses metnine ve
 * TTS anahtarlarına DOKUNULMUYOR; yalnız ekrana basılan ek bu.
 *
 * İkinci kural: noktalamayla başlayan parçanın önüne boşluk konmuyor ("then .
 * Sonra" değil "then. Sonra").
 */
type Seg = { lang: string; text: string };

/** Cümleyi bitiren ya da bağlayan son işaret (kapanan tırnak/parantez atlanarak bakılıyor). */
const ENDS_CLAUSE = /[.!?…:;,]$/u;
const CLOSERS = /["'“”„»«’)\]]+$/u;
/** Büyük harfle başlayan ama cümle başı olmayan dil adları (anlatım şablonu). */
const PROPER_START = /^(?:Türkçe|İngilizce|Almanca)/u;

/** `i`. parçanın arkasına gelen görünür ek: "", " " ya da ". ". */
export function segmentGap(segs: Seg[], i: number): string {
  const next = segs[i + 1];
  if (!next) return "";
  const cur = segs[i].text.trim();
  const head = next.text.trim();
  const dot =
    segs[i].lang !== "tr" &&
    next.lang === "tr" &&
    cur.length > 0 &&
    !ENDS_CLAUSE.test(cur.replace(CLOSERS, "")) &&
    /^\p{Lu}/u.test(head) &&
    !PROPER_START.test(head);
  if (dot) return ". ";
  return /^[.,!?;:…]/u.test(head) ? "" : " ";
}
