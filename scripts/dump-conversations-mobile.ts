/**
 * Ders kataloğunu mobil pakete döker (seviye başına bir JSON).
 *
 * Web dersi koddan okuyor (findConversation); mobilin de aynı içeriğe ihtiyacı var
 * çünkü /api/conversation yalnızca SONUCU kaydeder, içeriği sunmaz.
 *
 * ÇEVRİMDIŞI SENARYO ARTIK DÖKÜLÜYOR. Eskiden `script` hariç tutuluyordu
 * ("mobil konuşmayı /api/chat ile yürütür") ve bu, sağlayıcı kapalıyken
 * Android'de hiçbir konuşma dersinin geçilememesi demekti — geçme koşulu
 * konuşmanın yapılmasını istiyor. Web o durumda senaryoya düşüyor; mobil de
 * artık düşüyor (`game/offlineChat`).
 *
 * Paket şişmesi ölçüldü: senaryo 780 dersin yalnız 10'unda var.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { sourceConversationsFor as conversationsFor } from "../src/lib/conversations/source";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
const DIR = "mobile/src/data/conversations";

/**
 * Bir kursun mobil paketleri: dosya yolu + yazılacak JSON, seviye seviye.
 *
 * AYRI BİR İŞLEV, ÇÜNKÜ KAPI DA AYNI PROJEKSİYONU İSTİYOR. `check-dumps`
 * bunu çağırıp dosyayla BAYT BAYT karşılaştırıyor; kimlik kümesi eşitliği
 * metin sapmasını görmüyordu (gerekçe orada). Projeksiyon tek yerde durmalı,
 * yoksa kapı dökümün kendisinden ayrı düşer ve yanlış yeri gösterir.
 *
 * Dersi olmayan seviye için dosya YAZILMIYOR: mobil yükleyici paketleri tek
 * tek import ediyor (`mobile/src/data/conversations/index.ts`) ve boş bir dosyayı
 * hiçbir şey import etmez — yazmak yalnız depoya ölü dosya bırakırdı.
 */
export function buildConversationDump(course: string) {
  const all = conversationsFor(course);
  const packs: { level: string; file: string; json: string; count: number }[] = [];
  for (const level of LEVELS) {
    const conversations = all
      .filter((l) => l.level === level)
      .map((l) => {
        return {
          id: l.id, level: l.level, course: l.course, icon: l.icon,
          title: l.title, titleTr: l.titleTr, summary: l.summary, minutes: l.minutes,
          focusId: l.focusId, vocab: l.vocab, patterns: l.patterns,
          lecture: l.lecture, chat: l.chat,
        };
      });
    if (!conversations.length) continue;
    packs.push({
      level,
      file: `${DIR}/${course}-${level.toLowerCase()}.json`,
      json: JSON.stringify(conversations),
      count: conversations.length,
    });
  }
  return packs;
}

/**
 * Dökülecek kurs: `npm run dump:conversations -- <kurs>` (varsayılan "de").
 *
 * Kurs sabit "de" yazılıydı ve dosya adı da öyle üretiliyordu; ikinci bir dil
 * eklendiğinde bu betik sessizce yine Almanca paketi yazardı. Mobil yükleyici
 * paketleri kurs adına göre ayırıyor (data/conversations/index.ts).
 */
if (process.argv[1]?.endsWith("dump-conversations-mobile.ts")) {
  const course = (process.argv[2] ?? "de").toLowerCase();
  const packs = buildConversationDump(course);
  if (!packs.length) {
    console.error(`"${course}" kursu için ders yok — paket yazılmadı.`);
    process.exit(1);
  }
  /*
    YALNIZ A1 YAZILIYOR — ikilideki TOHUM bu.

    Üst seviyeler mobil paketten çıkarıldı (7,2 MB) ve seviye paketi hâlinde
    sunucudan iniyor. A1 ikilide kalıyor ki uygulama ağsız da açılsın ve ilk
    ders hemen başlasın; ikili hangi kursun seçileceğini bilmediği için iki
    kursun da A1'i gömülü.

    `buildConversationDump` bütün seviyeleri üretmeye DEVAM ediyor:
    `scripts/content-publish` yayını ondan alıyor, yani projeksiyon tek yerde.
  */
  mkdirSync(join(process.cwd(), DIR), { recursive: true });
  const seed = packs.find((p) => p.level === "A1");
  if (!seed) {
    console.error(`"${course}" kursunda A1 yok — tohum yazılamadı.`);
    process.exit(1);
  }
  writeFileSync(join(process.cwd(), seed.file), seed.json);
  console.log(course, "A1 tohumu yazıldı:", seed.count, "ders");
  for (const pack of packs) {
    if (pack.level === "A1") continue;
    console.log(pack.level.padEnd(3), String(pack.count).padStart(4), "ders — yayına gider, pakete değil");
  }
}
