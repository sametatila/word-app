import type { NativeLang } from "./courses";
import type { Option } from "./types";

/**
 * Şık etiketi — TEK KAYNAK.
 *
 * Oyun ekranı (choice-game, mobil ChoiceRound) doğru cevabı `withArtikel` ile
 * kuruyor ve seçilen şıkkın METNİYLE karşılaştırıyor. Şık üreticisi aynı biçimi
 * üretmezse doğru şık hiçbir zaman seçilemez.
 *
 * Tam da bu oldu: `lib/session.ts` içindeki `optionsFor` artikeli koyuyordu,
 * `lib/daily.ts` içindeki `seededOptions` koymuyordu. Günlük oyunda tr→de
 * yönündeki her şık turunda kullanıcı "Auto"yu işaretleyip "yanlış, doğrusu
 * das Auto" cevabını alıyordu — hiçbir şık doğru olamıyordu.
 *
 * Kural aynı kaldığı sürece nerede kullanıldığı önemli değil; iki tarafın da
 * BURADAN geçmesi önemli.
 */

/** Almanca kelimeyi artikeliyle gösterir: "das Auto". Artikelsizde sade hâli. */
export function withArtikel(w: { de: string; artikel: string | null }): string {
  return w.artikel ? `${w.artikel} ${w.de}` : w.de;
}

/** Anlam taşıyan alanlar — kelime satırının anadile bakan yüzü. */
export type GlossWord = {
  tr: string;
  en: string | null;
  /**
   * Almanca karşılık. Bugün veritabanında YOK; de→en paritesi için üretilecek
   * (bkz. `docs/plan/native-language.md`). Alan şimdiden burada, çünkü çözücü
   * onsuz yazılırsa her çağıran yerinde ayrıca düşünmek zorunda kalır.
   */
  deGloss?: string | null;
};

/**
 * KELİMENİN ANLAMI, KULLANICININ ANADİLİNE GÖRE — tek kaynak.
 *
 * Bugüne kadar anlam her yerde doğrudan `w.tr` idi: oyunların doğru cevabı,
 * çeldiricileri, "neden yanlış" açıklamaları, yürüyüş modunun okuduğu metin.
 * Arayüzü İngilizce yapan kullanıcı menüleri İngilizce görüyor ama alıştırmanın
 * cevabı hâlâ Türkçe geliyordu — yani anadil ekseni yalnız kabukta vardı.
 *
 * İKİNCİ SATIR BİR SÜS DEĞİL, AYIRT EDİCİ. Türkçede birbirine çöken kelimeler
 * İngilizcede ayrışıyor (er/sie/es üçü de "o", ama he/she/it). Bu yüzden ikinci
 * satır her zaman İngilizce — ana satır zaten İngilizceyken düşüyor.
 *
 * ANADİLDE KARŞILIK YOKSA `null` DÖNER, TÜRKÇEYE DÜŞMEZ. Düşseydi Alman
 * kullanıcıya Türkçe anlam gösterirdik ve bu, eksik çevirinin en kötü biçimi:
 * görünürde çalışan ama yanlış dilde bir alıştırma. Çağıranın işi o kelimeyi
 * turdan çıkarmak (bkz. `hasGloss`).
 */
export function glossFor(w: GlossWord, native: NativeLang): Option | null {
  if (native === "en") return w.en ? { text: w.en, sub: null } : null;
  if (native === "de") return w.deGloss ? { text: w.deGloss, sub: w.en } : null;
  return w.tr ? { text: w.tr, sub: w.en } : null;
}

/** Kelime bu anadil için kullanılabilir mi — havuz süzgeci. */
export function hasGloss(w: GlossWord, native: NativeLang): boolean {
  return glossFor(w, native) !== null;
}

/**
 * Örnek cümlenin anadildeki çevirisi. Yoksa null — cümle çevirisi olmadan da
 * gösterilebilir (örnek hedef dilde anlamlıdır), o yüzden burada eleme yok.
 */
export function exampleGlossFor(
  w: { beispielTr: string | null; beispielEn: string | null; beispielDe?: string | null },
  native: NativeLang,
): string | null {
  if (native === "en") return w.beispielEn;
  if (native === "de") return w.beispielDe ?? null;
  return w.beispielTr;
}

/**
 * Anlam sorulan yönde (de→tr) şık iki dilli: anadil + İngilizce ayırt edici.
 * Hedef dil sorulan yönde (tr→de) ikinci satır yok — orada sorulan şey anlam
 * değil, kelimenin kendisi; ve artikel kelimenin bir parçası.
 *
 * `native` verilmezse Türkçe: çağıranların hepsi geçene kadarki köprü değil,
 * BİLİNÇLİ varsayılan — anadili yazılmamış eski profiller Türkçe sayılıyor
 * (`DEFAULT_NATIVE`).
 */
export function optionLabel(
  p: { de: string; artikel: string | null } & GlossWord,
  direction: "de-tr" | "tr-de",
  native: NativeLang = "tr",
): Option | null {
  if (direction !== "de-tr") return { text: withArtikel(p), sub: null };
  return glossFor(p, native);
}
