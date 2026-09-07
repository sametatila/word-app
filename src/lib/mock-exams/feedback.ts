import "server-only";
import { completeChat, chatConfigured, type CallReport } from "@/lib/chat-providers";
import type { MockScore } from "./scoring";

/**
 * Deneme sınavından sonra yapılacaklar listesi.
 *
 * NEDEN PUANDAN SONRA BİR LİSTE. Bir deneme sınavının öğretici değeri puanda
 * değil, puandan çıkan işte. "%54" öğrenciye ne yapacağını söylemiyor;
 * "görüş metinlerinde sonuç cümlesini ara" söylüyor.
 *
 * İKİ KAYNAK, TEK SÖZLEŞME. Sağlayıcı varsa liste modelden geliyor ve
 * öğrencinin GERÇEK hatalarına bakıyor. Sağlayıcı yoksa ya da çıktı şemaya
 * uymuyorsa kural tabanlı liste devreye giriyor: en zayıf ölçüm hedefleri
 * seçiliyor ve o hedefin bilinen çalışma yolu veriliyor. Ekranda hata
 * gösterilmiyor — `source` alanı hangisinin çalıştığını söylüyor, öğrenciye
 * "servis yok" demek onun işine yaramaz.
 */

export type MockTodo = {
  /** Kısa başlık — yapılacak işin adı. */
  title: string;
  /** Neden bu iş: hangi hata örüntüsünden çıktı. */
  why: string;
  /** Nasıl çalışılır — somut, tek oturumda yapılabilir. */
  how: string;
};

export type MockFeedback = {
  /** İki-üç cümlelik durum özeti, Türkçe. */
  summary: string;
  /** Gerçekten iyi giden yanlar; yoksa boş kalır, uydurulmaz. */
  strengths: string[];
  todo: MockTodo[];
  source: "ai" | "rules";
};

/** Ölçüm hedeflerinin Türkçe adı — hem istemde hem kural tabanlı listede. */
export const GOAL_TR: Record<string, string> = {
  gist: "ana fikri yakalama",
  detail: "tek bir bilgiyi bulma",
  opinion: "tutum ve görüş ayırt etme",
  orientation: "hangi ilan kime uyar",
  instruction: "kural ve yönerge okuma",
  structure: "metnin bağdaşıklığı",
  production: "kendi metnini/konuşmanı kurma",
  interaction: "karşılıklı iletişim",
};

/** Hedefe bağlı çalışma yolu — kural tabanlı listenin gövdesi. */
const GOAL_HOW: Record<string, string> = {
  gist:
    "Metni iki turda oku. Birinci turda yalnız ilk ve son paragrafı oku ve metnin ne savunduğunu tek cümleyle kendine söyle; ayrıntıya hiç bakma. İkinci turda soruları oku ve o cümleyi sına.",
  detail:
    "Soruları metinden ÖNCE oku ve her sorudaki sayıyı, saati ya da özel adı işaretle. Sonra metni tararken yalnız o işaretleri ara. Bu maddelerde tuzak çoğu zaman metindeki ikinci bir sayıdır.",
  opinion:
    "Her yorumun SON cümlesini ayrıca oku: taraf çoğu zaman orada belli olur. `aber`, `trotzdem`, `deshalb`, `nur` sözcüklerinin ardından gelen kısım yazarın vardığı sonuçtur; öncesi çoğu zaman karşı tarafa verilen paydır.",
  orientation:
    "Kişinin metnindeki ölçütleri önce bir kenara yaz (kaç kişi, hangi gün, ne kadar para). Sonra ilanları elemeye çalış: bir ilan tek bir ölçütte düşüyorsa gerisini okumana gerek yok.",
  instruction:
    "Yönergelerde istisnayı ara. `nur`, `außer`, `jedoch`, `ab`, `bis` sözcüklerinin geçtiği cümleleri iki kez oku — maddelerin çoğu kuralın kendisini değil sınırını sorar.",
  structure:
    "Boşluğun ÖNCEKİ cümlesine bak ve gönderme öğelerini izle: `sie`, `dieses Muster`, `in der Zwischenzeit`, `deshalb`. Doğru cümle çoğu zaman anlamdan değil, bu bağlardan bulunur.",
  production:
    "Metni yazdıktan sonra içerik noktalarını tek tek işaretle: her noktaya karşılık gelen cümleyi bulamıyorsan o nokta işlenmemiştir. Sınavda en sık kaybedilen puan burada.",
  interaction:
    "Karşı tarafın söylediğine açıkça gönderme yapmayı çalış: `Das stimmt, aber …`, `Daran habe ich nicht gedacht …`. Yalnız kendi önerini sıralamak bu görevlerde yeterli sayılmaz.",
};

const SKILL_TR: Record<string, string> = {
  reading: "Okuma",
  listening: "Dinleme",
  writing: "Yazma",
  speaking: "Konuşma",
};

/**
 * Kural tabanlı liste: en zayıf iki-üç hedef.
 *
 * Eşik %70 — altındaki hedef "çalışılacak" sayılıyor. Hiçbiri eşiğin altında
 * değilse tek bir madde veriliyor (en düşük hedef), çünkü boş bir liste de
 * öğrenciye bir şey söylemez.
 */
export function rulesFeedback(score: MockScore): MockFeedback {
  const ranked = score.byGoal
    .filter((g) => g.total > 0)
    .map((g) => ({ ...g, pct: Math.round((100 * g.correct) / g.total) }))
    .sort((a, b) => a.pct - b.pct);

  const weak = ranked.filter((g) => g.pct < 70).slice(0, 3);
  const picked = weak.length ? weak : ranked.slice(0, 1);
  const strong = ranked.filter((g) => g.pct >= 80);

  return {
    summary:
      score.total > 0
        ? `${SKILL_TR[score.skill] ?? score.skill} bölümünde ${score.total} maddenin ${score.correct} tanesi doğru (%${score.pct}). ` +
          (picked.length
            ? `En çok zorlandığın yer: ${GOAL_TR[picked[0].goal] ?? picked[0].goal} (%${picked[0].pct}).`
            : "Hedeflerin tamamında dengeli bir sonuç var.")
        : "Bu bölümde makinece puanlanan madde yok; değerlendirme ölçütler üzerinden yapılır.",
    strengths: strong.map((g) => `${GOAL_TR[g.goal] ?? g.goal} (%${g.pct})`),
    todo: picked.map((g) => ({
      title: `${GOAL_TR[g.goal] ?? g.goal} üzerine çalış`,
      why: `Bu hedefteki ${g.total} maddenin ${g.total - g.correct} tanesi yanlış (%${g.pct}).`,
      how: GOAL_HOW[g.goal] ?? "Yanlış maddelerin açıklamalarını sırayla oku ve her birinde hatanın nereden geldiğini kendi cümlenle yaz.",
    })),
    source: "rules",
  };
}

const SYSTEM = `Sen Almanca sınavlarına hazırlanan bir öğrencinin çalışma koçusun.
Öğrencinin bir deneme sınavı bölümündeki sonucunu ve yanlış maddelerini alacaksın.
Görevin, ölçülebilir ve tek oturumda yapılabilir bir YAPILACAKLAR listesi üretmek.

Kurallar:
- Türkçe yaz. Almanca örnekler verebilirsin ama açıklama Türkçe olsun.
- En fazla 4 madde. Az ve keskin olsun; her madde tek bir davranış değiştirsin.
- Her madde ÖĞRENCİNİN GERÇEK HATASINA dayansın. Genel tavsiye ("daha çok oku") yasak.
- "how" alanı somut bir yöntem olsun: ne yapılacak, hangi sırayla, neye bakılacak.
- Övgüyü şişirme. Gerçekten iyi giden bir şey yoksa "strengths" boş kalsın.
- Yalnız JSON döndür, başka hiçbir şey yazma.

JSON şeması:
{"summary": string, "strengths": string[], "todo": [{"title": string, "why": string, "how": string}]}`;

function parse(raw: string): MockFeedback | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
  const d = data as { summary?: unknown; strengths?: unknown; todo?: unknown };
  if (typeof d.summary !== "string" || !d.summary.trim()) return null;
  if (!Array.isArray(d.todo) || !d.todo.length) return null;
  const todo: MockTodo[] = [];
  for (const raw of d.todo.slice(0, 4)) {
    const t = raw as { title?: unknown; why?: unknown; how?: unknown };
    if (typeof t.title !== "string" || typeof t.why !== "string" || typeof t.how !== "string") return null;
    if (!t.title.trim() || !t.how.trim()) return null;
    todo.push({ title: t.title.trim(), why: t.why.trim(), how: t.how.trim() });
  }
  const strengths = Array.isArray(d.strengths)
    ? d.strengths.filter((x): x is string => typeof x === "string" && !!x.trim()).slice(0, 4)
    : [];
  return { summary: d.summary.trim(), strengths, todo, source: "ai" };
}

/**
 * Yanlış maddelerin özeti — isteme giren kısım.
 *
 * Soru kökü, verilen cevap, doğru cevap ve kâğıdın kendi açıklaması gidiyor.
 * Açıklama önemli: model "neden yanlış" sorusunu yeniden keşfetmek zorunda
 * kalmıyor, örüntüyü aramaya odaklanıyor.
 */
function wrongDigest(score: MockScore, explains: Record<string, string>): string {
  const wrong = score.items.filter((i) => !i.correct).slice(0, 20);
  if (!wrong.length) return "Yanlış madde yok.";
  return wrong
    .map(
      (i) =>
        `- [${i.goal}] Madde ${i.no}: verdi "${i.given || "boş"}", doğrusu "${i.expected}". ` +
        `Kâğıdın açıklaması: ${(explains[i.id] ?? "").slice(0, 220)}`,
    )
    .join("\n");
}

export async function mockFeedback(
  score: MockScore,
  explains: Record<string, string>,
  report?: CallReport,
): Promise<MockFeedback> {
  if (!chatConfigured() || score.total === 0) return rulesFeedback(score);

  const goals = score.byGoal
    .map((g) => `${GOAL_TR[g.goal] ?? g.goal}: ${g.correct}/${g.total}`)
    .join(" · ");
  const user =
    `Seviye: ${score.level}\n` +
    `Bölüm: ${SKILL_TR[score.skill] ?? score.skill}\n` +
    `Sonuç: ${score.correct}/${score.total} (%${score.pct})\n` +
    `Ölçüm hedeflerine göre: ${goals}\n\n` +
    `Yanlış maddeler:\n${wrongDigest(score, explains)}`;

  try {
    const raw = await completeChat(SYSTEM, [{ role: "user", content: user }], 900, report);
    return parse(raw) ?? rulesFeedback(score);
  } catch {
    // Sağlayıcı hatası öğrencinin sonucunu görmesini engellememeli.
    return rulesFeedback(score);
  }
}
