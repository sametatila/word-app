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
 * Günün turunun (2026-09-15'te kaldırıldı) `seededOptions`ı koymuyordu. O oyunda tr→de
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
 * Ek ya da dilbilgisi notu: "-in; -den", "-e kadar", "bir; belirsiz tanımlık", "to → -e/-a; mastar eki".
 * Ekranda doğru ve gerekli, ama söylenecek bir şey değil — sesli okunduğunda "in den", "ir mez" çıkıyor.
 */
const GRAMMAR_NOTE = /(^|[\s;,/(])-\p{L}|\b(tanımlık|mastar|ön eki|son eki|(in)?definite article)\b/iu;

/**
 * ANLAMIN SESLİ HÂLİ — yalnız söylenebiliyorsa.
 *
 * Yürüyüş modu anlamı okuyup hedef kelimeyi sözlü istiyor; ekran yok. Yalnız ek ya da dilbilgisi notuyla
 * anlatılan kelimeler (edatlar, tanımlıklar, bağlaçların bir kısmı) orada sorulmuyor: sesli ve ekransız
 * kelime çalışmasında bu kelimeler tek başına değil bağlam içinde öğretilir (Pimsleur, sesli konuşma
 * uygulamaları). Ekranlı oyunlarda kalıyorlar. Kulak kontrolünde bu anlamların kayıtları hep reddedildi
 * (2026-09-24): "-ir -mez" → "İrmesele".
 */
export function spokenGloss(w: GlossWord, native: NativeLang): string | null {
  const g = glossFor(w, native);
  return g && !GRAMMAR_NOTE.test(g.text) ? speechOfGloss(g.text) : null;
}

/**
 * Karşılıktaki parantez SESTE ayırt edicidir, süs değil: "o (erkek)" / "o (kadın)",
 * "tarih (geçmiş)", "hasta (kişi)". Seslendirme parantezi siliyor (`cleanForSpeech`, orada parantez
 * çoğunlukla Hochdeutsch notu) ve yürüyüş he ile she için aynı "o"yu okuyup ikisinden birini bekliyordu.
 * Parantez virgüle dönüyor: "o, erkek". Mobil `game/gloss` `speechOfGloss` ile aynı gövde (parity).
 */
export function speechOfGloss(text: string): string {
  return text.replace(/\s*\(([^()]*)\)/g, ", $1");
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
 * Turun taşıdığı örnek cümle çevirileri arasından ANADİLDEKİ — `glossFor` ile
 * aynı kural: ana satır anadilde, Türkçe ve Almanca anadilde altına İngilizce
 * ayırt edici. Anadilde çeviri yoksa null (Türkçeye düşmez).
 *
 * Cümle turları (dizme, boşluk doldurma) çeviriyi `sentenceTr`/`sentenceEn`
 * olarak taşıyordu ve ekran ikisini birden basıyordu: anadili İngilizce olan
 * öğrenci Türkçe cümle görüyordu.
 */
export function exampleFor(
  s: { sentenceTr: string | null; sentenceEn: string | null; sentenceDe?: string | null },
  native: NativeLang,
): Option | null {
  if (native === "en") return s.sentenceEn ? { text: s.sentenceEn, sub: null } : null;
  if (native === "de") return s.sentenceDe ? { text: s.sentenceDe, sub: s.sentenceEn } : null;
  return s.sentenceTr ? { text: s.sentenceTr, sub: s.sentenceEn } : null;
}

/**
 * Bir karşılığın karşılaştırılabilir anlam parçaları.
 *
 * Tek karşılık kuralından sonra çoğu maddede tek parça; işlev sözcüklerinde
 * "; " ile iki çekirdek anlam, eski maddelerde virgül duruyor. İki kelimenin
 * anlamı ÇAKIŞIYORSA ikisi aynı soruda şık olamaz: tr→de yönünde ikisi de
 * doğru olur (anfangen / beginnen "başlamak").
 */
export function meaningParts(text: string | null | undefined, native: NativeLang): Set<string> {
  const locale = native === "tr" ? "tr-TR" : native === "de" ? "de-DE" : "en-US";
  const out = new Set<string>();
  for (const part of (text ?? "").split(/[,;]/)) {
    const m = part.trim().replace(/\s+/g, " ").toLocaleLowerCase(locale);
    if (m) out.add(m);
  }
  return out;
}

/**
 * İki kelime aynı soruda şık olabilir mi — anlamları ayrışıyor mu.
 *
 * Anadildeki karşılıklar ve İngilizce ayırt edici birlikte bakılıyor: Türkçesi
 * aynı ama İngilizcesi farklı iki kelime ekranda İngilizce satırla ayrışsa da
 * mobil istemcinin bazı ekranları yalnız ana satırı gösteriyor; tek doğru
 * cevap kuralı ekrana bağlı kalmamalı.
 */
export function sharesMeaning(a: GlossWord, b: GlossWord, native: NativeLang): boolean {
  const own = new Set([...meaningParts(glossFor(a, native)?.text, native), ...meaningParts(a.en, "en")]);
  for (const m of [...meaningParts(glossFor(b, native)?.text, native), ...meaningParts(b.en, "en")]) {
    if (own.has(m)) return true;
  }
  return false;
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
