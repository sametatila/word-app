import { KIND_LABEL, REASON_LABEL, SURFACE_LABEL, TARGET_LABEL } from "@/lib/content-feedback-labels";

/**
 * Hedefin insan okuyacağı adı — liste, ayrıntı ve Telegram özetinde aynı biçim.
 * Eski satırda hedef yok: tür + ref.
 */
export function targetText(g: { kind: string; targetType: string; targetId: string; targetSub: string; ref: string }): string {
  if (!g.targetType) return `${KIND_LABEL[g.kind] ?? g.kind} · ${g.ref}`;
  const t = TARGET_LABEL[g.targetType] ?? g.targetType;
  const sub = g.targetSub ? ` · ${subText(g.targetType, g.targetSub)}` : "";
  return `${t} ${g.targetType === "word" ? "#" : ""}${g.targetId}${sub}`;
}

function subText(type: string, sub: string): string {
  if (type === "exercise" || type === "mock_task") return `soru ${sub}`;
  if (type === "conversation" || type === "chat_turn") return `tur ${sub}`;
  return sub;
}

export const reasonText = (r: string) => REASON_LABEL[r] ?? r;
export const surfaceText = (s: string) => SURFACE_LABEL[s] ?? s;

/**
 * Hedefin KAYNAĞI — düzeltme nerede yapılır. Panel içerik düzenlemiyor (AGENTS.md
 * "İçerik teslim hattı"): doğruluk kaynağı `data/**` + git; kapatma yalnız geçici önlem.
 */
export function sourceHint(targetType: string, pack: string): string {
  switch (targetType) {
    case "word":
      return "Kelime havuzu (`words.id`): data/app/words*.json → db:seed; anlamlar data/meanings";
    case "exercise":
      return `Beceri alıştırması: data/skills/** (paket ${pack || "türetilemedi"})`;
    case "conversation":
    case "chat_turn":
      return `Konuşma: data/conversations/** (paket ${pack || "türetilemedi"})`;
    case "exam_item":
      return "Modül/seviye sınavı maddesi: konuşma içeriğinden üretiliyor (lib/exam, data/conversations/**)";
    case "mock_task":
      return `Deneme sınavı: src/lib/mock-exams/<kurs>/<seviye>-<no>.ts (paket ${pack || "türetilemedi"}, kapatma kâğıdın tamamını gizler)`;
    case "quiz_item":
      return `Haftalık quiz: src/lib/weekly-quiz/** (paket ${pack || "türetilemedi"})`;
    case "placement_item":
      return "Yerleştirme maddesi: v<kelime> kelime havuzu, r:/l: beceri alıştırması";
    case "assessment":
      return "Yapay zekâ değerlendirmesi: çıktı modelden; istem lib/assess-prompts.ts";
    default:
      return "";
  }
}
