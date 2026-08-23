/**
 * Anlamın iki dilli gösterimi — üstte Türkçe, altta İngilizce.
 *
 * Tek bir yerde durmasının sebebi tutarlılık: anlam on bir ayrı turda ve iki
 * ayrı listede görünüyor ve ikinci satırın boyutu, rengi, boşluğu her yerde
 * aynı olmazsa ikinci dil "ek bilgi" gibi değil "karışıklık" gibi okunuyor.
 *
 * İngilizce ikinci bir çeviri olmaktan fazlası: Türkçede birbirine çöken
 * kelimeleri ayıran şey o. `er`, `sie` ve `es` üçünün de Türkçesi "o"; şıklar
 * yalnızca Türkçe gösterilseydi üç ayrı kelime aynı şıkka dönüşür ve doğru
 * cevap seçilemez hâle gelirdi. Aynı şey isim/fiil çiftlerinde de var:
 * `das Essen` ile `essen` ikisi de "yemek", ama "food" ile "to eat".
 *
 * `en` null olabilir — anlam yenilemesi seviye seviye ilerliyor ve sırası
 * gelmemiş kelimelerde ikinci satır hiç çizilmiyor. Boş bir satır bırakmak
 * hizalamayı korurdu ama ekranda sebepsiz bir boşluk olarak görünürdü.
 */
export function MeaningText({
  tr,
  en,
  size = "md",
  align = "start",
}: {
  tr: string;
  en: string | null;
  /** Ana satırın boyutu; ikinci satır her zaman ondan bir kademe küçük. */
  size?: "sm" | "md" | "lg";
  align?: "start" | "center";
}) {
  const main =
    size === "lg" ? "text-xl sm:text-2xl" : size === "sm" ? "text-sm" : "text-base";
  const sub = size === "lg" ? "text-sm" : size === "sm" ? "text-[11px]" : "text-xs";

  return (
    <span className={`flex flex-col ${align === "center" ? "items-center" : "items-start"}`}>
      <span className={main}>{tr}</span>
      {en ? (
        <span className={`${sub} font-normal opacity-60`} lang="en">
          {en}
        </span>
      ) : null}
    </span>
  );
}

/**
 * Cümle çevirisinin iki dilli gösterimi.
 *
 * Kelime karşılığından ayrı bir bileşen çünkü ölçüsü farklı: karşılık iki
 * kelimedir ve alt alta iyi durur, cümle çevirisi satır kaplar ve ikinci satır
 * ancak gerçekten okunacaksa yer hak eder. Bu yüzden ikisi arasında ince bir
 * ayraç var ve İngilizce satır daha soluk.
 */
export function SentenceTranslation({
  tr,
  en,
  className = "",
}: {
  tr: string | null;
  en: string | null;
  className?: string;
}) {
  if (!tr && !en) return null;
  return (
    <span className={`block ${className}`}>
      {tr ? <span className="block">{tr}</span> : null}
      {en ? (
        <span className="block text-[0.92em] opacity-60" lang="en">
          {en}
        </span>
      ) : null}
    </span>
  );
}
