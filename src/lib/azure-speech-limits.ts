/**
 * Azure Speech aylık sınırları — veritabanı bağımlılığı YOK: `lib/stt`
 * veritabanını yalnız gerektiğinde yüklüyor, bu sabit onu bozmasın.
 * Gerekçeler `lib/azure-speech-usage`.
 */

/** Bizim STT tavanımız: F0'ın 5 saatinin altında (Azure'un sayacı bizimkiyle birebir aynı değil). */
export const AZURE_STT_MONTHLY_SECONDS = Number(process.env.AZURE_STT_MONTHLY_SECONDS) || 16_200;
/** F0 nöral seslendirme kotası (karakter/ay). Kodda tavan yok; Azure kendisi reddediyor. */
export const AZURE_TTS_MONTHLY_CHARS = 500_000;
