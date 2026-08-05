import "server-only";
import { completeChat, type ChatMessage } from "@/lib/chat-providers";

/**
 * Konuşma koçu — çevrimdışı teşhis tükendiğinde devreye giren düzeltme.
 *
 * Speaking tarafı bilerek çevrimdışı kuruldu ve öyle kalıyor: `judgeSpeech`
 * önceden yazılmış sapmaları (schön → schon) anında, bedava ve limitsiz
 * yakalıyor. Model bunun yerine geçmiyor, **kalanını** üstleniyor: öğrenci
 * listede olmayan bir şey söylediğinde çevrimdışı mantığın diyebileceği tek
 * şey "bunlar tanınmadı" oluyordu; asıl öğretici cevap orada eksikti.
 *
 * Sıralamanın pratik bir sonucu da var: model yalnızca boşlukta çağrıldığı
 * için dakikalık limit doğru cevaplara ve zaten teşhis edilmiş hatalara
 * harcanmıyor. Aynı limit, gerçekten yardım gereken ana ayrılıyor.
 *
 * Koç düşerse (limit, kesinti) çağıran taraf mevcut çevrimdışı cevabını
 * gösterir. Yani model bir katman, bağımlılık değil.
 */

/** Tek cümlelik düzeltme istiyoruz; uzun cevap hem yavaş hem konuyu dağıtıyor. */
const MAX_TOKENS = 120;

/** Modelden gelen metnin kullanıcıya gösterilecek hâli. */
export type CoachHint = { text: string };

/**
 * Cevabın tek satıra indirilmesi.
 *
 * Küçük modeller istenmese de sık sık madde işareti, tırnak ya da "Tabii!"
 * gibi bir giriş cümlesi ekliyor. Bunları istemde yasaklamak yetmiyor —
 * çıktıda temizlemek daha güvenilir.
 */
function tidy(raw: string): string {
  const line = raw
    .split("\n")
    .map((l) => l.replace(/^[-*•\d.)\s]+/, "").trim())
    .find((l) => l.length > 0);
  if (!line) return "";
  return line.replace(/^["“”'`]+|["“”'`]+$/g, "").slice(0, 300);
}

const SYSTEM = `Sen Almanca öğrenen bir Türk'ün konuşma koçusun.
Öğrenci sesli konuştu, konuşma tanıyıcı ne duyduğunu yazıya döktü.

Görevin: söylenenle hedef arasındaki farkı TEK CÜMLEDE, Türkçe açıkla.

KURALLAR
- Tek cümle yaz. Giriş cümlesi, selamlama, madde işareti, tırnak kullanma.
- Farkın ne olduğunu somut söyle: hangi ses, hangi ek, hangi kelime.
- Tanıyıcının duyduğu metin gerçekte söylenenin yaklaşık bir yazımıdır;
  yazım hatası gibi değil, telaffuz ipucu gibi yorumla.
- Öğrenci tamamen başka bir şey söylediyse önce bunu belirt, sonra doğrusunu yaz.
- Suçlayıcı olma; ne yapması gerektiğini söyle.`;

/**
 * Telaffuz koçu.
 *
 * Tanıyıcının n-best listesi olduğu gibi veriliyor: birinci aday genelde dil
 * modeliyle "düzeltilmiş" hâl, sonrakiler gerçekte duyulana daha yakın.
 * Farkı asıl açıklayan çoğu zaman ikinci aday oluyor.
 */
export async function coachSpeech(
  target: string,
  heard: string[],
  missing: string[],
): Promise<CoachHint> {
  const candidates = heard.filter(Boolean).slice(0, 3);
  if (!candidates.length) return { text: "" };

  const messages: ChatMessage[] = [
    {
      role: "user",
      content: [
        `Hedef cümle: ${target}`,
        `Tanıyıcının duydukları: ${candidates.map((c) => `"${c}"`).join(", ")}`,
        missing.length ? `Tanınmayan kelimeler: ${missing.join(", ")}` : "",
        "Farkı tek cümlede Türkçe açıkla.",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  ];

  return { text: tidy(await completeChat(SYSTEM, messages, MAX_TOKENS)) };
}

const DIALOGUE_SYSTEM = `Sen Almanca öğrenen bir Türk'ün konuşma koçusun.
Senaryolu bir diyalogda uygulama bir soru sordu, öğrenci sesli cevap verdi,
ama cevap senaryodaki dallardan hiçbirine uymadı.

Görevin: TEK CÜMLEDE, Türkçe olarak öğrenciye ne yapacağını söyle.

KURALLAR
- Tek cümle yaz. Giriş cümlesi, madde işareti, numara kullanma.
- Söylediği şey soruya uyan geçerli bir cevapsa: bunu onayla ve varsa
  dilbilgisi hatasını düzelt.
- Soruya uymuyorsa: neyin sorulduğunu hatırlat ve söyleyebileceği somut bir
  Almanca cümle ver.
- Verdiğin Almanca cümle kısa olsun ve öğrencinin seviyesini aşmasın.`;

/**
 * Diyalog koçu.
 *
 * Çevrimdışı `matchReply` anahtar kök arıyor; yazılmamış ama tamamen geçerli
 * bir cevap (aynı anlamın başka kuruluşu) tutmuyor ve öğrenci sabit bir örnek
 * cümleyle karşılaşıyordu. Burada asıl kazanç, cevabın geçerli olup olmadığını
 * ayırt edebilmek: doğru söyleyip "anlaşılmadı" cevabı almak öğreticinin
 * yapabileceği en can sıkıcı şey.
 */
export async function coachDialogue(
  ask: string,
  cue: string,
  heard: string,
  expected: string[],
): Promise<CoachHint> {
  if (!heard.trim()) return { text: "" };

  const messages: ChatMessage[] = [
    {
      role: "user",
      content: [
        `Uygulamanın sorusu (Almanca): ${ask}`,
        `Öğrenciye verilen yönlendirme: ${cue}`,
        `Öğrencinin söylediği: "${heard}"`,
        expected.length ? `Senaryoda beklenen cevaplar: ${expected.join(" | ")}` : "",
        "Tek cümlede Türkçe olarak ne yapması gerektiğini söyle.",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  ];

  return { text: tidy(await completeChat(DIALOGUE_SYSTEM, messages, MAX_TOKENS)) };
}
