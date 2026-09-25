import "server-only";
import { packObject } from "@/lib/content/serve";
import { quizNativePack } from "@/lib/content/packs";
import { resolveQuizWeek, type QuizDict } from "./native";
import type { QuizNative, QuizWeek } from "./types";

/**
 * Haftalık quizi ana dile çevirir; çeviremezse haftayı OLDUĞU GİBİ döner.
 *
 * Sözlük KAPILI pakette (`quiznative/<dil>`, bkz. `content/packs`): yalnız
 * sunucu okuyor, istemci hiçbir zaman görmüyor. Web de mobil de quizi
 * `/api/quiz`ten çözülmüş olarak alıyor — çözücü bu yüzden tek yerde, bu ucun
 * içinde çalışıyor ve iki istemcide ayrı bir kopyası yok.
 *
 * Geri düşüş kardeşleriyle (`localiseMockPaper`) aynı: yarım değil, tümden
 * Türkçe. Kurs ile anadil eşleşmiyorsa (ör. İngilizce kurs, İngilizce anadil
 * — `PAIR_READY`de yok) sözlükte o haftanın dizeleri de yok ve hafta Türkçe
 * kalıyor; kapı (`check:quiz-native`) PAIR_READY'deki her haftanın
 * çözüldüğünü ölçüyor.
 */
/** Eksik paket günlüğe BİR kez yazılsın; nesnenin kendisini `packObject` önbelleğe alıyor. */
const warned = new Set<string>();

async function quizDict(lang: "en" | "de"): Promise<QuizDict | null> {
  const pack = quizNativePack(lang);
  const built = await packObject<QuizDict>(pack);
  if (!built?.quiz) {
    if (!warned.has(pack)) console.error(`[quiz] ${pack} yayında yok — \`content:publish\` çalıştırıldı mı?`);
    warned.add(pack);
    return null;
  }
  return built.quiz;
}

export async function localiseQuizWeek(week: QuizWeek, native: QuizNative): Promise<QuizWeek> {
  if (native === "tr") return week;
  const dict = await quizDict(native);
  if (!dict) return week;
  const out = resolveQuizWeek(dict, week, native);
  if (!out) {
    console.warn(`[quiz] ${week.id} ${native} diline çevrilemedi, Türkçe kalıyor`);
    return week;
  }
  return out;
}
