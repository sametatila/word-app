import type { CefrLevel, Gloss } from "@/lib/skills/types";

/**
 * Modül sınavı kâğıdının elle yazılan yarısı.
 *
 * Sınavın maddeleri iki kaynaktan geliyor. Bir yarısı modülün derslerinden
 * TÜRETİLİYOR (kelimeler, üretim adımları, hüküm cümleleri, dilbilgisi
 * odakları) — bkz. `module-content.ts`. Bu dosya öbür yarısı: derste
 * bulunmayan ama sınavın olmazsa olmazı olan parçalar.
 *
 * Neden elle yazılıyor? Çünkü türetilemezler:
 *
 *   - **Dinleme ve okuma.** Ders bir öğretmen anlatımı; sınav bir metin
 *     ister. Beceri bankasındaki metinler ise SEVİYE düzeyinde seçili, modül
 *     düzeyinde değil: "A1 Modül 3 · Yeme-içme" sınavında tren garı metni
 *     çıkıyordu. Modülün kendi sahnesinde geçen kısa bir diyalog ve kısa bir
 *     yazılı metin, modülü bitirenin gerçekten karşılaşacağı dildir.
 *   - **Yazma ve konuşma görevi.** Aynı sebep: görev modülün durumunda
 *     geçmeli ("Kafede sipariş ver", "Ev sahibine arıza bildir").
 *   - **Yapabilirlik listesi.** Sınavın asıl ödülü puan değil, geçince
 *     okunan "artık şunları yapabiliyorum" satırları. Kural tabanlı bir
 *     eşleme (`cando-map.ts`) seviye başına genel ifadeler üretiyor; modülü
 *     bitiren biri ise ÇOK DAHA SOMUT bir şey kazanıyor.
 *
 * Üç dil aynı yerde: Almanca biçim, Türkçe karşılık, ayırt edici olarak
 * İngilizce (`Gloss`). Kelime tablosundaki ilkeyle aynı — Türkçede birbirine
 * çöken şeyler İngilizcede ayrışıyor.
 */

/** Sınav sorusu — kökü Almanca, altında Türkçesi; şıklar Almanca. */
export type ExamQuestion = {
  /** Soru kökü, Almanca. */
  de: string;
  /** Aynı sorunun Türkçesi — A1'de soru kökü tek başına anlaşılmaz. */
  tr: string;
  options: string[];
  /** Doğru şıkkın dizini. */
  answer: number;
};

/** Dinleme diyaloğunun bir repliği. */
export type ExamTurn = {
  /** Konuşan, Almanca rol adı ("Kellner", "Gast"). */
  speaker: string;
  de: string;
  /** Replik çevirisi — yalnız sınav bitince, gözden geçirmede gösterilir. */
  tr: string;
};

/** Geçince açılan yapabilirlik satırı. */
export type ExamCando = {
  /** Almanca "Ich kann …" — sertifikanın dili. */
  de: string;
  /** Türkçe "… yapabiliyorum". */
  tr: string;
  en: string;
};

export type ModuleExamPlan = {
  level: CefrLevel;
  /** Modülün sıfır tabanlı sırası. */
  index: number;
  /** Kâğıdın kodu — "A1.3". */
  code: string;
  /** Modülün Almanca adı; sınav başlığı bu. */
  titleDe: string;
  titleTr: string;
  /**
   * Sınavın ölçtüğü yapılar — kapak sayfasında liste hâlinde.
   *
   * Modülün `focusId`'leri Almanca dilbilgisi terimleri ama öğrenciye
   * "Perfekt-unregelmäßig" demek bir şey anlatmıyor; burada terimin yanında
   * ne işe yaradığı Türkçe duruyor.
   */
  focus: { de: string; tr: string }[];
  canDo: ExamCando[];
  /** Dinleme bölümü: modülün sahnesinde geçen kısa diyalog. */
  listening: {
    title: string;
    titleTr: string;
    /** Durum, Türkçe: kim, nerede, ne için. Ses çalmadan önce okunur. */
    situation: string;
    turns: ExamTurn[];
    questions: ExamQuestion[];
  };
  /** Okuma bölümü: modülün dünyasından kısa bir yazılı metin. */
  reading: {
    title: string;
    titleTr: string;
    /** Metin türü, Türkçe: "İlan", "E-posta", "Duyuru". */
    genre: string;
    text: string;
    questions: ExamQuestion[];
  };
  /** Konuşma bölümü: durumu verilen cümleler; puan telaffuzdan. */
  speaking: { situation: string; de: string; tr: string }[];
  /** Yazma bölümü: modül temalı tek görev, AI rubriğiyle puanlanır. */
  writing: {
    prompt: string;
    /** Varsa cevap yazılacak Almanca uyaran. */
    stimulus?: string;
    checklist: string[];
    minWords: number;
    phrases: Gloss[];
    sample: string;
  };
};
