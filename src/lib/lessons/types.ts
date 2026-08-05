import type { CefrLevel } from "../skills/types";

/**
 * Ders — uygulamanın yeni öğrenme birimi.
 *
 * Serbest sohbetin yerine geçiyor ve sebebi yapısal. Sohbet ayrı bir sekmeydi:
 * oraya bilerek gitmen gerekiyordu, ne konuşacağın belirsizdi ve öğrendiğin
 * şeyle konuştuğun şey arasında bağ yoktu. Öğrenme açısından en pahalı eksik
 * buydu — yeni bir yapıyı öğrenip **hemen kullanmak** yerine, öğrenmek bir
 * yerde, konuşmak başka bir yerde duruyordu.
 *
 * Ders o boşluğu kapatıyor ve dört parçadan oluşuyor:
 *
 *   1. `rule`     — tek bir kural, Türkçe ve kısa. Ders bir konu anlatmıyor,
 *                   **bir** kural öğretiyor; dağılmanın önüne geçen şey bu.
 *   2. `examples` — kuralı gösteren birkaç Almanca cümle.
 *   3. `checks`   — kuralın anlaşıldığını sınayan hızlı sorular. Rol yapmadan
 *                   önce geliyorlar: kuralı anlamadan konuşmaya girmek
 *                   öğrenciyi konuşmanın ortasında bırakıyor.
 *   4. `roleplay` — kuralın kullanılmak zorunda olduğu bir durum. Asıl
 *                   öğrenme burada oluyor; öncekiler buna hazırlık.
 *
 * Rol yapma serbest sohbetten iki şeyle ayrılıyor: konusu belli (bir durum) ve
 * hedefi belli (bu kuralı kullandırmak). Model kuralı biliyor ve kullanılmadan
 * konuşmayı bitirmiyor.
 */

/** Dersin sınadığı hızlı soru. */
export type LessonCheck = {
  /** Soru metni — Türkçe yönlendirme ya da boşluklu Almanca cümle. */
  prompt: string;
  /** Şıklar; biri doğru. */
  options: string[];
  /** Doğru şık (options içinde geçmeli). */
  answer: string;
  /** Neden doğru olduğu — cevaptan sonra gösteriliyor. */
  why: string;
};

/** Rol yapmanın sahnesi. */
export type LessonRoleplay = {
  /** Durum, Türkçe: öğrenci nerede ve ne yapıyor. */
  scene: string;
  /** Modelin oynadığı kişi (Almanca sıfat + rol). */
  partner: string;
  /** Modelin açılış repliği — konuşma sessiz başlamasın. */
  opening: string;
  openingTr: string;
  /**
   * Öğrencinin kuralı kullanmış sayılması için gereken tur sayısı.
   *
   * Rol yapma "yeterince konuşuldu"da değil, **kural kullanıldığında** bitiyor;
   * bu sayı yalnızca alt sınır. Sohbetin amacı süre doldurmak değil.
   */
  minTurns: number;
};

export type Lesson = {
  id: string;
  level: CefrLevel;
  course: "de" | "gsw-zh";
  /** Ders başlığı — kuralın adı, konu değil. */
  title: string;
  /** Bir cümlede ne öğretiyor. */
  summary: string;
  minutes: number;
  /** Kuralın kendisi, Türkçe. */
  rule: string;
  /** Kuralı gösteren cümleler. */
  examples: { de: string; tr: string }[];
  checks: LessonCheck[];
  roleplay: LessonRoleplay;
  /**
   * Kuralın kimliği — tekrar kuyruğu bunu izliyor.
   *
   * Kelimelerin tekrarı vardı ama dilbilgisinin yoktu; öğrenci aynı kuralı
   * defalarca yanlış yapıp bunu hiç görmüyordu. Sohbet düzeltmelerinin
   * ürettiği etiketlerle (seit + Dativ, V2-Regel, Akkusativ) aynı uzayda
   * olması bilerek: ileride düzeltmeler doğrudan bu kuyruğu besleyebilir.
   */
  ruleId: string;
};
