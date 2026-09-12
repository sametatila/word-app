/**
 * Odağı YALNIZ ince işaretçide (fare/klavye) veren yardımcı.
 *
 * Web'de beş oyun alanı tur açılır açılmaz kendine odak alıyordu; Android'in
 * karşılıklarında (`game/rounds`, `skillQuiz`) böyle bir şey YOK ve sebebi
 * telefonda görünüyor: odak klavyeyi açıyor, klavye de ekranın yarısını —
 * yani sorulan kelimeyi, cümleyi ya da ipucunu — örtüyor. Kullanıcı önce
 * klavyeyi kapatıp soruyu okumak zorunda kalıyordu, üstelik HER turda.
 *
 * Masaüstünde tam tersi doğru: alan odaklı gelmezse kullanıcı önce tıklamak
 * zorunda kalır ve hızlı bir turun ritmi bozulur. O yüzden ayrım işaretçide,
 * platformda değil: `(pointer: fine)` fare ve kalem demek.
 *
 * KULLANICININ KENDİ DOKUNUŞUYLA gelen odak bunun dışında ve öyle kalmalı —
 * özel karakter düğmesine basınca alanın odağı geri alınıyor, orada klavye
 * zaten açık (bkz. `cloze-game`, `translate-game` harf düğmeleri).
 */
export function focusOnFine(el: HTMLElement | null): void {
  if (!el) return;
  /* Sunucuda `matchMedia` yok; orada zaten odak diye bir şey de yok. */
  if (typeof window === "undefined") return;
  if (!window.matchMedia?.("(pointer: fine)").matches) return;
  el.focus();
}
