import "server-only";
import { chatProviders, type ChatMessage } from "@/lib/chat-providers";
import { CORRECTION_MARK, SUGGESTION_MARK } from "@/lib/chat-format";
import type { Lesson } from "./types";

/**
 * Rol yapma — dersin son ve asıl parçası.
 *
 * Serbest sohbetin yerine geçiyor. Aradaki fark tek bir kelimede toplanabilir:
 * **amaç**. Sohbette model her şeye cevap veriyordu ve konuşmanın nereye
 * gideceği belirsizdi; burada model dersin kuralını biliyor ve konuşmayı o
 * kuralın kullanılacağı yere doğru sürüyor.
 *
 * Bunun pratik sonucu şu: öğrenci "ne diyeceğim?" sorusuyla baş başa
 * kalmıyor. Sahne belli, muhatabın kim olduğu belli, hangi yapıyı kurması
 * gerektiği belli. Serbest sohbetin en pahalı sorunu boş sayfaydı.
 *
 * Biçim sohbetten devralındı (✏️ düzeltme, 💬 öneri) çünkü ölçülerek
 * oturmuştu: küçük modeller JSON şemasını düşürüyor ama tek karakterlik
 * işaretleri koruyor.
 */

export type RoleplayTurn = ChatMessage;

/**
 * Dersin rol yapma istemi.
 *
 * Kural metni olduğu gibi veriliyor: model öğrenciye ne öğretildiğini bilmeli
 * ki düzeltmeyi o çerçevede yapabilsin. Genel bir dilbilgisi düzeltmesi yerine
 * "bu dersin kuralına göre" düzeltme almak, dersin bütünlüğünü koruyan şey.
 */
export function roleplayPrompt(lesson: Lesson): string {
  const dialect =
    lesson.course === "gsw-zh"
      ? "Züritüütsch (Zürih Almancası) konuşuyorsun. Öğrenci Hochdeutsch cevap verirse düzeltme, konuşmayı sürdür — amaç lehçeye alıştırmak, konuşmayı kesmek değil."
      : "Standart Almanca (Hochdeutsch) konuşuyorsun.";

  return `Sen bir Almanca dersinin rol yapma bölümündesin. Öğrencinin ana dili Türkçe, seviyesi ${lesson.level}. ${dialect}

ROLÜN
${lesson.roleplay.partner} rolündesin.

SAHNE
${lesson.roleplay.scene}

BU DERSİN KURALI — öğrenci bunu kullanmayı öğreniyor
${lesson.rule}

NASIL KONUŞURSUN
- Rolünde kal. Kısa konuş: en fazla 3 cümle, sonunda bir soru.
- ${lesson.level} seviyesinde kal; bu seviyenin üstünde yapı ve kelime kullanma.
- Konuşmayı, öğrencinin YUKARIDAKİ KURALI kullanmak zorunda kalacağı yöne sür.
  Sorularını buna göre seç. Ama kuralı ona anlatma — ders bitti, şimdi kullanma vakti.
- Öğrenci Türkçe yazarsa ya da tıkanırsa, cevabına MUTLAKA Türkçe bir
  açıklamayla başla, sonra Almancaya dön.
- Yıldız, tire, madde işareti gibi biçimlendirme kullanma; düz metin yaz.

HATA DÜZELTME — her cevap için sırayla uygula
1) Öğrencinin cümlesinde GERÇEK BİR DİLBİLGİSİ HATASI var mı? (artikel, hâl,
   çekim, sözcük sırası, edat) Varsa düzelt. Hata dersin kuralıyla ilgili
   olmasa da düzeltilir — ders bir konuya odaklanıyor olabilir, hata
   odaklanmıyor. Birden fazla hata varsa her biri için ayrı satır yaz.
   ÜSLUP FARKI HATA DEĞİLDİR. Daha doğal ya da daha kısa bir söyleyiş varsa
   bile, öğrencinin cümlesi dilbilgisel olarak doğruysa düzeltme yazma.
   Örnek: "und ich habe zwei Kinder" doğrudur; "und habe zwei Kinder" daha
   akıcı olabilir ama bu bir düzeltme sebebi değildir.
2) Cümle doğru ama dersin kuralını KULLANMAMIŞ mı? Bu hata DEĞİLDİR.
   Düzeltme yazma. Onu kuralı kullanmaya sorularınla yönlendir.
   Örnek: "Ich wohne in Istanbul." doğrudur; başına zaman ifadesi koymadı diye
   düzeltilmez.
3) Cümle tamamen doğru mu? Hiç düzeltme satırı yazma.

Düzeltme yazarken:
- Öğrencinin söylemediği kelimeleri ekleme, anlamını değiştirme. Düzeltme onun
  cümlesinin doğru hâli olmalı, başka bir cümle değil.
- Tek satırda ver: ${CORRECTION_MARK} ile başla, yanlışı ve doğrusunu yaz, sonuna
  Türkçe KURALIN ADINI ekle — açıklama cümlesi değil, etiket.
  Örnek: "Am Wochenende ich gehe → Am Wochenende gehe ich (V2-Regel)".
  Kuralın adından emin değilsen hiç yazma; yanlış gerekçe düzeltmeden kötüdür.
- Düzeltmeden sonra rolüne dönüp konuşmayı sürdür.

CEVABIN EN SONUNDA ÜÇ ÖNERİ (her seferinde yaz)
- Bu başlığı cevabına YAZMA. Yalnızca öneri satırlarını yaz.
- Öğrencinin sana verebileceği 3 cevap öner, her biri ayrı satırda ${SUGGESTION_MARK} ile.
- Öneriler Almanca, ${lesson.level} seviyesinde, en fazla 8 kelime.
- En az ikisi BU DERSİN KURALINI kullanan cümleler olsun.
- Öneri satırlarına açıklama, tırnak, numara ekleme.

Karakter bütünlüğüne dikkat et: Almanca (ä ö ü ß) ve Türkçe (ç ğ ı ö ş ü) harfleri doğru yaz.`;
}

/**
 * Rol yapma cevabını akıtır; birincil sağlayıcı düşerse yedeğe geçer.
 *
 * Yedeğe yalnızca tek bir parça bile gönderilmeden önce geçiliyor: akış
 * başladıktan sonra sağlayıcı değiştirmek yarım cümlenin üstüne başka bir
 * modelin cevabını eklemek olurdu.
 */
export async function* streamRoleplay(
  lesson: Lesson,
  messages: RoleplayTurn[],
): AsyncGenerator<string> {
  const providers = chatProviders();
  if (!providers.length) throw new Error("Sağlayıcı tanımlı değil");

  const system = roleplayPrompt(lesson);
  const failures: string[] = [];

  for (const provider of providers) {
    let started = false;
    try {
      for await (const delta of provider.stream(system, messages)) {
        started = true;
        yield delta;
      }
      // Hiç parça gelmemesi de başarısızlık: bazı sağlayıcılar kapasite
      // hatasını HTTP 200 ile, akışın içinde bildiriyor.
      if (!started) throw new Error("boş akış");
      return;
    } catch (err) {
      if (started) throw err;
      failures.push(`${provider.name}: ${(err as Error).message}`);
    }
  }
  throw new Error(`Tüm sağlayıcılar başarısız — ${failures.join(" | ")}`);
}
