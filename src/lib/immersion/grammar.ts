import type { Lesson } from "@/lib/lessons/types";
import type { SkillQuestion } from "@/lib/skills/types";
import { flatten } from "@/lib/lessons/module-content";
import { seededShuffle } from "@/lib/shuffle";

/**
 * Ünitenin gramer adımını DERSLERİNDEN türetir.
 *
 * NEDEN TÜRETİM: gramer yuvası deseninde 145 ünitede var, ama elle yazılmış
 * içerik yalnız birinde vardı (A1 ünite 1). Kalan 144'ünde adım "yakında"
 * olarak duruyordu — yani desende yer kaplayan ama oynanamayan bir öğe.
 * 144 üniteyi elle yazmak ~1150 soru demek; quiz'de olduğu gibi burada da
 * doğru cevap türetme: ders katmanı zaten gerekli malzemeyi taşıyor.
 *
 * İki kaynak, ikisi de dersin KENDİ malzemesi — hiçbir şey uydurulmuyor:
 *
 *   1. HÜKÜM adımları (`expect.kind === "truefalse"`). Ders zaten öğrenciye
 *      bozuk ya da doğru bir cümle gösterip hüküm verdiriyor ve gerekçesini
 *      (`why`) yazıyor. Ünite başına tam dört tane var (ders başına bir).
 *      Bunlar doğrudan dilbilgisi yargısı: gramer adımının çekirdeği.
 *
 *   2. ÜRETİM adımlarının hedef cümleleri (`expect.kind === "produce"`).
 *      Sözcük dizilişi Almancanın çekirdek yapısı (V2 kuralı, cümle kıskacı,
 *      yan cümlede fiilin sona gitmesi) ve kelime bilgisinden bağımsız ölçülür.
 *      Bu yüzden dizme sorusu olarak kullanılıyor, çeviri olarak değil —
 *      çeviriyi quiz zaten yapıyor, gramer adımının YAPIYA bakması gerekiyor.
 *
 * Sıra tohumlu: aynı ünite her açılışta aynı soruları aynı sırada verir.
 * Rastgele olsaydı öğrenci "aynı adımı tekrar ettim mi" diyemezdi.
 *
 * Elle yazılmış içerik varsa oynatıcı ONU tercih eder (`unitQuestions`);
 * bu türetme yalnız boş kalan üniteler için devreye girer.
 */
/**
 * Dizme sorusunun yönergesi — çağırandan gelir.
 *
 * İki cümle burada TÜRKÇE GÖMÜLÜYDÜ: İngilizce ya da Almanca arayüzde de
 * "Cümleyi doğru sıraya diz." çıkıyordu. Sözlük anahtarları (`quiz.order_*`)
 * taban sözlükte zaten duruyor ve mobil onları kullanıyor; web sunucu
 * tarafında `t()` olmadığı için `deriveQuiz`in kalıbı izleniyor - metin
 * dışarıdan veriliyor.
 */
export type GrammarText = {
  orderQuestion: string;
  orderSentence: string;
  /**
   * Hüküm şıkları — KURSUN dilinde. `["Richtig", "Falsch"]` sabitti ve
   * İngilizce kursta da Almanca çıkıyordu; İngilizce derslerde yüz tane hüküm
   * adımı var. Deneme sınavı aynı çifti `MOCK_LABELS[course].bool` ile
   * kursuna göre veriyor, buraya da oradan geliyor.
   */
  bool: [string, string];
};

export function deriveGrammar(unitId: string, lessons: Lesson[], count: number, say: GrammarText): SkillQuestion[] {
  const judges: SkillQuestion[] = [];
  const orders: SkillQuestion[] = [];

  for (const lesson of lessons) {
    for (const step of lesson.lecture) {
      if (step.expect?.kind === "truefalse") {
        judges.push({
          kind: "truefalse",
          text: step.expect.statement,
          options: say.bool,
          answer: step.expect.answer ? 0 : 1,
          explain: flatten(step.expect.why),
        });
      } else if (step.expect?.kind === "produce") {
        const parts = step.expect.target.trim().replace(/\s+/g, " ").split(" ");
        // Üç sözcükten kısa cümlede dizecek bir şey yok; sekizden uzun olan
        // ekranda kaydırma istiyor ve dizme oyunu okunmaz hâle geliyor.
        if (parts.length < 4 || parts.length > 8) continue;
        orders.push({
          kind: "order",
          text: step.expect.target.endsWith("?") ? say.orderQuestion : say.orderSentence,
          options: [],
          answer: 0,
          items: parts,
          explain: `„${step.expect.target}“ — ${lesson.title}`,
        });
      }
    }
  }

  // Hüküm önce: ünitenin kendi dilbilgisi yargıları çekirdek, dizme pekiştirme.
  const yargi = seededShuffle(judges, `${unitId}|judge`).slice(0, Math.min(judges.length, Math.ceil(count / 2)));
  const dizme = seededShuffle(orders, `${unitId}|order`).slice(0, Math.max(0, count - yargi.length));
  return [...yargi, ...dizme];
}
