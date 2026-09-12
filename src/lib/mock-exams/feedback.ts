import "server-only";
import { completeChat, chatConfigured, type CallReport } from "@/lib/chat-providers";
import type { MockScore } from "./scoring";
import type { MockCourse } from "./types";
import { translate, formatPercent, DEFAULT_NATIVE, type NativeLang } from "@/lib/i18n/dict";

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

/**
 * Ölçüm hedeflerinin ADI — anahtar olarak; hem istemde hem kural tabanlı
 * listede kullanıcının dilinde yazılıyor. Anahtarlar mobilin sözlüğünden.
 */
export const GOAL_KEYS: Record<string, string> = {
  gist: "mockexam.goal_gist",
  detail: "mockexam.goal_detail",
  opinion: "mockexam.goal_opinion",
  orientation: "mockexam.goal_orientation",
  instruction: "mockexam.goal_instruction",
  structure: "mockexam.goal_structure",
  production: "mockexam.goal_production",
  interaction: "mockexam.goal_interaction",
};

const goalName = (goal: string, lang: NativeLang) =>
  GOAL_KEYS[goal] ? translate(lang, GOAL_KEYS[goal]).toLocaleLowerCase(lang) : goal;

/**
 * Hedefe bağlı çalışma yolu — kural tabanlı listenin gövdesi.
 *
 * KURSA GÖRE AYRI. Tavsiyeler somut olduğu için dile bağlı: "aber, trotzdem,
 * deshalb sözcüklerinin ardına bak" bir İngilizce sınavında hiçbir işe
 * yaramaz. Genel bir tavsiyeye ("bağlaçlara dikkat et") indirgemek iki
 * öğrenciye birden zarar verirdi — listenin bütün değeri somutluğunda.
 */
const GOAL_HOW_EN_KEYS: Record<string, string> = {
  gist: "mockhow_en.gist",
  detail: "mockhow_en.detail",
  opinion: "mockhow_en.opinion",
  orientation: "mockhow_en.orientation",
  instruction: "mockhow_en.instruction",
  structure: "mockhow_en.structure",
  production: "mockhow_en.production",
  interaction: "mockhow_en.interaction",
};

const GOAL_HOW_KEYS: Record<string, string> = {
  gist: "mockhow_de.gist",
  detail: "mockhow_de.detail",
  opinion: "mockhow_de.opinion",
  orientation: "mockhow_de.orientation",
  instruction: "mockhow_de.instruction",
  structure: "mockhow_de.structure",
  production: "mockhow_de.production",
  interaction: "mockhow_de.interaction",
};

const SKILL_KEYS: Record<string, string> = {
  reading: "exam.sec_reading",
  listening: "exam.sec_listening",
  writing: "exam.sec_writing",
  speaking: "exam.sec_speaking",
};

/**
 * Kural tabanlı liste: en zayıf iki-üç hedef.
 *
 * Eşik %70 — altındaki hedef "çalışılacak" sayılıyor. Hiçbiri eşiğin altında
 * değilse tek bir madde veriliyor (en düşük hedef), çünkü boş bir liste de
 * öğrenciye bir şey söylemez.
 */
export function rulesFeedback(
  score: MockScore,
  course: MockCourse = "de",
  lang: NativeLang = DEFAULT_NATIVE,
): MockFeedback {
  const how = course === "en" ? GOAL_HOW_EN_KEYS : GOAL_HOW_KEYS;
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
        ? `${translate(lang, SKILL_KEYS[score.skill] ?? score.skill)}: ` +
          translate(lang, "mockfb.summary", {
            correct: score.correct,
            total: score.total,
            pct: formatPercent(score.pct, lang),
          }) +
          " " +
          (picked.length
            ? translate(lang, "mockfb.hardest", {
                goal: goalName(picked[0].goal, lang),
                pct: formatPercent(picked[0].pct, lang),
              })
            : translate(lang, "mockfb.balanced"))
        : translate(lang, "mockfb.not_machine_scored"),
    strengths: strong.map(
      (g) => `${goalName(g.goal, lang)} (${formatPercent(g.pct, lang)})`,
    ),
    todo: picked.map((g) => ({
      title: translate(lang, "mockfb.work_on", { goal: goalName(g.goal, lang) }),
      why: translate(lang, "mockfb.wrong_of", {
        wrong: g.total - g.correct,
        total: g.total,
        pct: formatPercent(g.pct, lang),
      }),
      how: how[g.goal] ? translate(lang, how[g.goal]) : translate(lang, "mockfb.how_fallback"),
    })),
    source: "rules",
  };
}

const SYSTEM = (dil: string, cevapDili: string) => `Sen ${dil} sınavlarına hazırlanan bir öğrencinin çalışma koçusun.
Öğrencinin bir deneme sınavı bölümündeki sonucunu ve yanlış maddelerini alacaksın.
Görevin, ölçülebilir ve tek oturumda yapılabilir bir YAPILACAKLAR listesi üretmek.

Kurallar:
- ${cevapDili} yaz. ${dil} örnekler verebilirsin ama açıklama ${cevapDili} olsun.
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
  course: MockCourse = "de",
  report?: CallReport,
  lang: NativeLang = DEFAULT_NATIVE,
): Promise<MockFeedback> {
  if (!chatConfigured() || score.total === 0) return rulesFeedback(score, course, lang);

  const dil = course === "en" ? "İngilizce" : "Almanca";
  // Modelin CEVABI kullanıcının dilinde olmalı: liste doğrudan ekrana çıkıyor
  // ve arayüzün geri kalanı çevrilmişken bu bölüm Türkçe kalıyordu.
  const cevapDili = { tr: "Türkçe", en: "İngilizce", de: "Almanca" }[lang];
  const goals = score.byGoal
    .map((g) => `${goalName(g.goal, lang)}: ${g.correct}/${g.total}`)
    .join(" · ");
  const user =
    `Seviye: ${score.level}\n` +
    `Bölüm: ${translate(lang, SKILL_KEYS[score.skill] ?? score.skill)}\n` +
    `Sonuç: ${score.correct}/${score.total} (%${score.pct})\n` +
    `Ölçüm hedeflerine göre: ${goals}\n\n` +
    `Yanlış maddeler:\n${wrongDigest(score, explains)}`;

  try {
    const raw = await completeChat(SYSTEM(dil, cevapDili), [{ role: "user", content: user }], 900, report);
    return parse(raw) ?? rulesFeedback(score, course);
  } catch {
    // Sağlayıcı hatası öğrencinin sonucunu görmesini engellememeli.
    return rulesFeedback(score, course, lang);
  }
}
