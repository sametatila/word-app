/**
 * Egzersiz üstverisinin bu modülün ihtiyaç duyduğu kadarı.
 *
 * `SkillMeta` doğrudan alınmıyor çünkü o `skills/index.ts`'te ve o modül
 * `server-only`; buraya bağlanmak testin ve ileride bir istemci bileşeninin
 * önünü kapatırdı.
 */
export type TopicMeta = {
  id: string;
  skill: string;
  level: string;
  title: string;
};

/**
 * Telaffuzda hangi seslerde zorlanıldığı.
 *
 * Yeni bir tablo gerekmedi ve gerekmemesinin sebebi içeriğin kuruluşu: her
 * telaffuz egzersizi **tek bir ses sorununu** çalıştırıyor (ch sesi, ünlü
 * uzunluğu, z…). Dolayısıyla `user_skills`'teki egzersiz başına kayıt zaten
 * ses başına kayıt demek — eksik olan veri değil, onu bu gözle okumaktı.
 *
 * Ölçü "en iyi skor / toplam" ve deneme sayısı. Zorlanma işareti ikisinin
 * birlikteliğinde: çok denenmiş ama skoru düşük kalmış bir konu, bir kez
 * denenip bırakılmıştan farklı bir şey söylüyor.
 *
 * Bilerek bir "telaffuz puanı" hesaplanmıyor. Elimizdeki veri tanıyıcının
 * anlayıp anlamadığı; ondan akıcılık ya da aksan notu türetmek, uygulamanın
 * baştan beri kaçındığı uydurma ölçüm olurdu (bkz. lib/speech.ts).
 */

export type SpeechTopic = {
  exerciseId: string;
  title: string;
  level: string;
  /** En iyi denemede doğru sayılan görev sayısı. */
  correct: number;
  total: number;
  attempts: number;
};

export type SkillRow = {
  exerciseId: string;
  correct: number;
  total: number;
  attempts: number;
};

/** Bu oranın altında kalan konu "zorlanılan" sayılıyor. */
const WEAK_RATIO = 0.7;

/**
 * Zorlanılan ses konuları, en zayıf önce.
 *
 * Hiç denenmemiş egzersizler listeye girmiyor: onlar "zorlandığın" değil
 * "henüz gelmediğin" konular ve ikisini karıştırmak yanıltıcı olurdu.
 */
export function weakSpeechTopics(
  meta: TopicMeta[],
  rows: SkillRow[],
  limit = 3,
): SpeechTopic[] {
  const byId = new Map(rows.map((r) => [r.exerciseId, r]));

  const topics: SpeechTopic[] = [];
  for (const m of meta) {
    if (m.skill !== "speaking") continue;
    const row = byId.get(m.id);
    if (!row || row.total === 0) continue;
    if (row.correct / row.total >= WEAK_RATIO) continue;
    topics.push({
      exerciseId: m.id,
      title: m.title,
      level: m.level,
      correct: row.correct,
      total: row.total,
      attempts: row.attempts,
    });
  }

  // Önce oranı en düşük olan; eşitlikte çok denenmiş olan öne geçiyor —
  // ısrarla denenip oturmamış bir konu daha acil.
  topics.sort((a, b) => {
    const ratio = a.correct / a.total - b.correct / b.total;
    return ratio !== 0 ? ratio : b.attempts - a.attempts;
  });
  return topics.slice(0, limit);
}
