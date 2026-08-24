/**
 * Uzun rol yapma denemesi — `npm run test:loop`
 *
 * Kalite testi sekiz turda bitiyor ve modelin kendini tekrar etmesi orada
 * görünmüyor; gerçek kullanıcı daha uzun konuşuyor ve döngü orada çıkıyor.
 * Bu betik yirmi tur konuşup modelin aynı soruyu tekrar sorup sormadığını
 * ölçüyor.
 *
 * Öğrenci cevapları bilerek sıradan ve kısa: gerçek bir öğrenci gibi
 * "evet/hayır/bilmiyorum" diyerek konuşmayı taşımıyor. Döngü tam bu
 * durumda ortaya çıkıyor — model konuşmayı ilerletemeyince başa dönüyor.
 */
import { completeChat } from "../src/lib/chat-providers";
import { parseReply } from "../src/lib/chat-format";
import { findLesson } from "../src/lib/lessons";
import { roleplayPrompt, type RoleplayTurn } from "../src/lib/lessons/roleplay";

const TURNS = Number(process.env.LOOP_TURNS) || 20;
const LESSON = findLesson(process.env.LOOP_LESSON || "de-a1-hallo")!;

/** Sıradan öğrenci cevapları — konuşmayı taşımayan, kısa. */
const REPLIES = [
  "Ja.", "Heute arbeite ich.", "Nein.", "Ich weiß nicht.",
  "Morgen gehe ich einkaufen.", "Vielleicht.", "Ja, gern.", "Das ist gut.",
  "Am Wochenende bleibe ich zu Hause.", "Okay.",
];

/**
 * Ölçünün sınırı: ders kelimeleri zorunlu olarak tekrar ediyor.
 *
 * Kelime kümesi karşılaştırması, dersin kendi kalıbını (V2 dersinde
 * „heute“, „morgen“, „machen“) tekrar sanıyor — oysa öğrenci o kelimeleri
 * kullanmak zorunda ve model de onları kurduruyor. Bu yüzden sayı mutlak bir
 * ölçü değil, **karşılaştırma** aracı: aynı ders için önce/sonra bakılır.
 * Asıl karar çıktıyı gözle okumakla veriliyor.
 */
function similar(a: string, b: string): boolean {
  const norm = (t: string) =>
    new Set(
      t.toLocaleLowerCase("de-DE").replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter((w) => w.length > 3),
    );
  const x = norm(a);
  const y = norm(b);
  if (x.size < 3 || y.size < 3) return false;
  let shared = 0;
  for (const w of x) if (y.has(w)) shared++;
  return shared / Math.min(x.size, y.size) >= 0.6;
}

async function main() {
  const system = roleplayPrompt(LESSON);
  const history: RoleplayTurn[] = [{ role: "assistant", content: LESSON.roleplay.opening }];
  const bodies: string[] = [LESSON.roleplay.opening];
  const repeats: string[] = [];

  console.log(`${TURNS} tur · ${LESSON.id} (${LESSON.title})\n`);
  console.log(`  0. model   : ${LESSON.roleplay.opening}`);

  for (let i = 0; i < TURNS; i++) {
    const say = REPLIES[i % REPLIES.length];
    history.push({ role: "user", content: say });
    let raw: string;
    try {
      raw = await completeChat(system, history, 400);
    } catch (e) {
      console.log(`  ✗ ${i + 1}. turda düştü: ${(e as Error).message.slice(0, 80)}`);
      break;
    }
    history.push({ role: "assistant", content: raw });
    const { body } = parseReply(raw);
    console.log(`  ${i + 1}. öğrenci: ${say}`);
    console.log(`     model   : ${body.trim().replace(/\n/g, " ")}`);
    // Gövde boşsa ham çıktıyı bas: sorunun modelde mi ayrıştırıcıda mı
    // olduğunu ancak böyle ayırt edebiliyoruz.
    if (!body.trim()) console.log(`     HAM     : ${JSON.stringify(raw).slice(0, 300)}`);

    // Yalnızca bir öncekiyle değil, konuşmanın tamamıyla karşılaştırılıyor:
    // döngü çoğu zaman iki tur atlayıp geri dönme biçiminde oluyor.
    const at = bodies.findIndex((prev) => similar(prev, body));
    if (at >= 0) {
      repeats.push(`${i + 1}↔${at}`);
      console.log(`     ! ${at}. turun tekrarı`);
    }
    bodies.push(body);
    await new Promise((r) => setTimeout(r, Number(process.env.EVAL_DELAY_MS) || 900));
  }

  console.log(
    `\n${"─".repeat(70)}\n${bodies.length - 1} tur · ` +
      (repeats.length ? `${repeats.length} tekrar: ${repeats.join(", ")}` : "tekrar yok"),
  );
}

void main();
