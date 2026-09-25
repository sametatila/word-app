import type { Conversation } from "./types";

/**
 * KONUŞMA KAYNAĞI — elle yazılmış içeriğin kendisi.
 *
 * Bu dosya içeriği STATİK olarak içe alıyor ve yalnız üç yerde kullanılıyor:
 * doğrulama betikleri (`check:conversations`, `check:pairs`, `check:exams` …),
 * mobil tohum dökümü (`dump:conversations`) ve yayın (`content:publish`). Yani
 * kaynağı okuyan her şey KAPININ ÖNÜNDE duruyor.
 *
 * SUNUCU SAYFALARI BURAYI OKUMUYOR: web içeriği yayın hattından alıyor
 * (`lib/conversations/index`, `lib/content/serve`). Ayrım bilinçli — bu dosyayı bir
 * rota içe alsaydı 8,5 MB konuşma metni Next derlemesine girer ve mobil ile web
 * yine iki ayrı kaynaktan beslenirdi.
 */
import { deA1B01 } from "./content/de-a1-b01";
import { deA1B02 } from "./content/de-a1-b02";
import { deA1B03 } from "./content/de-a1-b03";
import { deA1B04 } from "./content/de-a1-b04";
import { deA1B05 } from "./content/de-a1-b05";
import { deA1B06 } from "./content/de-a1-b06";
import { deA1B07 } from "./content/de-a1-b07";
import { deA1B08 } from "./content/de-a1-b08";
import { deA1B09 } from "./content/de-a1-b09";
import { deA1B10 } from "./content/de-a1-b10";
import { deA2B01 } from "./content/de-a2-b01";
import { deA2B02 } from "./content/de-a2-b02";
import { deA2B03 } from "./content/de-a2-b03";
import { deA2B04 } from "./content/de-a2-b04";
import { deA2B05 } from "./content/de-a2-b05";
import { deA2B06 } from "./content/de-a2-b06";
import { deA2B07 } from "./content/de-a2-b07";
import { deA2B08 } from "./content/de-a2-b08";
import { deA2B09 } from "./content/de-a2-b09";
import { deA2B10 } from "./content/de-a2-b10";
import { deB1B01 } from "./content/de-b1-b01";
import { deB1B02 } from "./content/de-b1-b02";
import { deB1B03 } from "./content/de-b1-b03";
import { deB1B04 } from "./content/de-b1-b04";
import { deB1B05 } from "./content/de-b1-b05";
import { deB1B06 } from "./content/de-b1-b06";
import { deB1B07 } from "./content/de-b1-b07";
import { deB1B08 } from "./content/de-b1-b08";
import { deB1B09 } from "./content/de-b1-b09";
import { deB1B10 } from "./content/de-b1-b10";
import { deB1B11 } from "./content/de-b1-b11";
import { deB1B12 } from "./content/de-b1-b12";
import { deB1B13 } from "./content/de-b1-b13";
import { deB1B14 } from "./content/de-b1-b14";
import { deB1B15 } from "./content/de-b1-b15";
import { deB1B16 } from "./content/de-b1-b16";
import { deB1B17 } from "./content/de-b1-b17";
import { deB1B18 } from "./content/de-b1-b18";
import { deB2B01 } from "./content/de-b2-b01";
import { deB2B02 } from "./content/de-b2-b02";
import { deB2B03 } from "./content/de-b2-b03";
import { deB2B04 } from "./content/de-b2-b04";
import { deB2B05 } from "./content/de-b2-b05";
import { deB2B06 } from "./content/de-b2-b06";
import { deB2B07 } from "./content/de-b2-b07";
import { deB2B08 } from "./content/de-b2-b08";
import { deB2B09 } from "./content/de-b2-b09";
import { deB2B10 } from "./content/de-b2-b10";
import { deC1B01 } from "./content/de-c1-b01";
import { deC1B02 } from "./content/de-c1-b02";
import { deC1B03 } from "./content/de-c1-b03";
import { deC1B04 } from "./content/de-c1-b04";
import { deC1B05 } from "./content/de-c1-b05";
import { deC1B06 } from "./content/de-c1-b06";
import { deC1B07 } from "./content/de-c1-b07";
import { deC1B08 } from "./content/de-c1-b08";
import { deC1B09 } from "./content/de-c1-b09";
import { deC1B10 } from "./content/de-c1-b10";
import { A1_SCRIPTS } from "./content/scripts-a1";
import enA1 from "./content/en-a1.json";
import enA2 from "./content/en-a2.json";
import enB1 from "./content/en-b1.json";
import enB2 from "./content/en-b2.json";
import enC1 from "./content/en-c1.json";

/**
 * Konuşma kataloğu.
 *
 * Beceri içeriğinden farklı olarak veritabanına yüklenmiyor: konuşmalar bütünüyle
 * kod, çünkü hem anlatım senaryosu hem sohbet istemi konuşma metninden
 * üretiliyor ve ikisinin ayrı yerlerde durması istemin içeriğe göre değişmesini
 * zorlaştırırdı. İlerleme (hangi konuşma bitti, hangi kural zayıf) veritabanında.
 *
 * İki kurs: Almanca (580 konuşma, TypeScript) ve İngilizce (200 konuşma, JSON —
 * bkz. EN_CONVERSATIONS). Zürih'in kendi konuşmayı yok; hedef dili Almanca olduğu için
 * aynı iskelet doğrulandıktan sonra bu yapıda yeniden yazılacak.
 */
/**
 * Çevrimdışı senaryolar konuşmaya kimliğiyle bağlanıyor (WP-04). Konuşma dosyasına
 * gömülmemesinin sebebi içerik hattı: senaryolar ayrı üretilip ayrı gözden
 * geçiriliyor (WP-71/72) ve konuşma metnine dokunmadan eklenebiliyor. Konuşmada
 * zaten `script` varsa o kazanır.
 */
const SCRIPTS: Record<string, Conversation["chat"]["script"]> = { ...A1_SCRIPTS };

function withScript(conversation: Conversation): Conversation {
  if (conversation.chat.script || !SCRIPTS[conversation.id]) return conversation;
  return { ...conversation, chat: { ...conversation.chat, script: SCRIPTS[conversation.id] } };
}

/**
 * İngilizce kursunun konuşmaları JSON, Almancanınkiler TypeScript.
 *
 * Sebep tarihsel ve kayda geçiyor: bu 200 konuşma (A1 100 + A2 100) doğrudan
 * `mobile/src/data/conversations/en-*.json` olarak yazıldı ve web'e hiç girmedi —
 * yani İngilizce kursta Patika web'de BOŞTU, mobilde doluydu. Dosyalar
 * buraya taşındı, tek kaynak yine web oldu ve mobil paketi `dump:conversations`
 * yeniden üretiyor (yön, Almancadaki ile aynı).
 *
 * JSON'dan TypeScript'e çevrilmediler çünkü kazanç yok: içerik elle yazılmış
 * veri, kod değil; TS'e dökmek 2 MB'lık üretilmiş kaynak dosya demekti.
 * Yeni konuşma eklerken JSON düzenlenir, `npm run dump:conversations -- en` koşulur.
 *
 * Dönüşüm gerekiyor çünkü `resolveJsonModule` alan tiplerini genişletiyor:
 * `lang: "tr" | "de" | "en"` JSON'da `string` görünüyor. Yapının uygunluğunu
 * döküm zinciri koruyor — mobil paket bu dosyalardan üretiliyor ve ayrışma
 * ilk dökümde diff olarak çıkar.
 */
const EN_CONVERSATIONS = [...enA1, ...enA2, ...enB1, ...enB2, ...enC1] as unknown as Conversation[];

export const CONVERSATIONS: Conversation[] = [
  ...[

  ...deA1B01,
  ...deA1B02,
  ...deA1B03,
  ...deA1B04,
  ...deA1B05,
  ...deA1B06,
  ...deA1B07,
  ...deA1B08,
  ...deA1B09,
  ...deA1B10,
  ...deA2B01,
  ...deA2B02,
  ...deA2B03,
  ...deA2B04,
  ...deA2B05,
  ...deA2B06,
  ...deA2B07,
  ...deA2B08,
  ...deA2B09,
  ...deA2B10,
  ...deB1B01,
  ...deB1B02,
  ...deB1B03,
  ...deB1B04,
  ...deB1B05,
  ...deB1B06,
  ...deB1B07,
  ...deB1B08,
  ...deB1B09,
  ...deB1B10,
  ...deB1B11,
  ...deB1B12,
  ...deB1B13,
  ...deB1B14,
  ...deB1B15,
  ...deB1B16,
  ...deB1B17,
  ...deB1B18,
  ...deB2B01,
  ...deB2B02,
  ...deB2B03,
  ...deB2B04,
  ...deB2B05,
  ...deB2B06,
  ...deB2B07,
  ...deB2B08,
  ...deB2B09,
  ...deB2B10,
  ...deC1B01,
  ...deC1B02,
  ...deC1B03,
  ...deC1B04,
  ...deC1B05,
  ...deC1B06,
  ...deC1B07,
  ...deC1B08,
  ...deC1B09,
  ...deC1B10,
  ].map(withScript),
  ...EN_CONVERSATIONS,
];

/**
 * Kaynağın kendi süzgeçleri — SENKRON, çünkü içerik burada zaten bellekte.
 *
 * Doğrulama betikleri ve döküm bunları kullanıyor; sunucu sayfaları
 * `lib/conversations/index`teki async sürümleri. İkisi aynı içeriği veriyor: biri
 * kaynaktan, öteki o kaynaktan üretilmiş yayından.
 */
export function sourceConversationsFor(course: string): Conversation[] {
  const order = ["A1", "A2", "B1", "B2", "C1"];
  return CONVERSATIONS.filter((l) => l.course === course).sort(
    (a, b) => order.indexOf(a.level) - order.indexOf(b.level),
  );
}

export function sourceFindConversation(id: string): Conversation | undefined {
  return CONVERSATIONS.find((l) => l.id === id);
}
