/**
 * Yönetim panelinin ve Telegram uyarılarının Türkçe etiketleri — içerik geri bildirimi.
 *
 * Panel yalnız Türkçe (`app/admin`); bu dosya `lib/moderation-admin.ts` ile aynı sınıf ve
 * `scripts/i18n-hardcoded.mjs` muafiyet listesinde. Kullanıcıya gösterilen etiketler burada
 * değil: istemciler sözlükteki `report.*` anahtarlarını kullanıyor.
 */
/** Admin arayüzü yalnız Türkçe. */
export const REASON_LABEL: Record<string, string> = {
  inappropriate: "Uygunsuz",
  offensive: "Saldırgan",
  wrong: "Yanlış",
  impersonation: "Taklit",
  other: "Diğer",
  wrong_answer: "Cevap anahtarı yanlış",
  typo: "Yazım / dil bilgisi",
  translation: "Çeviri / anlam",
  audio: "Ses sorunu",
  unclear: "Anlaşılmıyor",
  technical: "Teknik",
};
export const SURFACE_LABEL: Record<string, string> = {
  round: "Günlük tur",
  practice: "Pratik",
  walk: "Yürüyüş",
  path: "Patika",
  skill: "Beceri",
  conversation: "Konuşma adımı",
  scored: "Puanlı kısım",
  exam: "Modül/seviye sınavı",
  mock: "Deneme sınavı",
  quiz: "Haftalık quiz",
  placement: "Yerleştirme",
  words: "Kelime listesi",
  writings: "Yazdıklarım",
};
export const TARGET_LABEL: Record<string, string> = {
  word: "Kelime",
  exercise: "Alıştırma",
  conversation: "Konuşma",
  exam_item: "Sınav maddesi",
  mock_task: "Deneme görevi",
  quiz_item: "Quiz maddesi",
  placement_item: "Yerleştirme maddesi",
  assessment: "Değerlendirme",
  chat_turn: "Sohbet yanıtı",
};
export const KIND_LABEL: Record<string, string> = { chat: "Sohbet yanıtı", assessment: "Değerlendirme", content: "İçerik", user: "Kullanıcı" };
