/**
 * ÇEVRİMDIŞI BİTİRİLEN DERS — tarayıcıdaki kuyruk.
 *
 * Ders bitince sonuç `/api/lesson`a yazılıyor; ağ yoksa istek düşüyor ve bir
 * daha DENENMİYORDU (`lesson-player` catch bloğu yalnız özeti çiziyordu).
 * Sunucu dersi hiç öğrenmiyor: XP verilmiyor, aralıklı tekrar merdiveni
 * kurulmuyor, kullanıcı başka bir cihaza geçince ders geri geliyor.
 * Android'de aynı boşluk `lessonProgress` kuyruğuyla kapandı; iki taraf da
 * aynı üç kuralı tutuyor:
 *
 *  - kayıt kendi `day`ini taşıyor (seri kullanıcının O gününe ait; ertesi gün
 *    gönderileni bugüne yazmak seriyi yanlış hesaplardı),
 *  - aynı ders yeniden bitirilirse son kayıt kalıyor (uç en iyi denemeyi
 *    zaten tutuyor),
 *  - biri düşerse kalanı kuyrukta kalıyor ve sıradakiler denenmiyor.
 */
import { apiFetch } from "@/lib/api-fetch";

export type PendingLesson = {
  lessonId: string;
  correct: number;
  roleplayDone: boolean;
  day: string;
  seconds: number;
};

const KEY = "lernomi-lessons-pending";

function read(): PendingLesson[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PendingLesson[]) : [];
  } catch {
    return [];
  }
}

export function queueLessonResult(item: PendingLesson): void {
  try {
    const rest = read().filter((x) => x.lessonId !== item.lessonId);
    rest.push(item);
    localStorage.setItem(KEY, JSON.stringify(rest.slice(-20)));
  } catch {
    /* depolama kapalıysa yapacak bir şey yok */
  }
}

/** Bekleyen ders sonuçlarını gönderir; biri düşerse kalanı kuyrukta bırakır. */
export async function flushPendingLessons(): Promise<void> {
  const list = read();
  if (!list.length) return;
  const remaining: PendingLesson[] = [];
  for (const [i, item] of list.entries()) {
    try {
      const res = await apiFetch("/api/lesson", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(item),
      });
      /* 4xx bir daha kabul edilmeyecek demek: kuyrukta tutmak her seferinde
         aynı isteği tekrarlardı. 5xx ve ağ hatası bekletiliyor. */
      if (!res.ok && res.status >= 500) throw new Error(String(res.status));
    } catch {
      remaining.push(...list.slice(i));
      break;
    }
  }
  try {
    if (remaining.length) localStorage.setItem(KEY, JSON.stringify(remaining));
    else localStorage.removeItem(KEY);
  } catch {
    /* yut */
  }
}
