/**
 * Erdi'nin koç cümleleri (WP-66).
 *
 * Maskot şimdiye kadar yalnız kutluyordu; burada öğrenme ANLARINDA tek
 * cümlelik Türkçe bir şey söylüyor. Kurallar:
 *   - Cümle tek ve kısa: balon 4 saniye duruyor, okunması gereken bir paragraf
 *     değil bir laf.
 *   - Hata AÇIKLAMASI burada yok — o iş geri bildirim şeridinin (WP-13);
 *     Erdi öğretmen değil, yanında duran arkadaş.
 *   - Tekrar etmeyen seçim: aynı anda söylenen son birkaç cümle bir daha
 *     seçilmiyor (`pickCoachLine`), yoksa üçüncü sabahta ezberlenir.
 *
 * Yer tutucular: `{name}` (yoksa virgülüyle birlikte düşer), `{pct}`, `{level}`.
 */
export type CoachMoment =
  | "plan_morning"
  | "plan_day"
  | "plan_evening"
  | "exam_intro"
  | "exam_pass"
  | "exam_fail"
  | "weak_done"
  | "weekly";

export const COACH_LINES: Record<CoachMoment, readonly string[]> = {
  plan_morning: [
    "Günaydın, {name}! Kahveden önce birkaç kelime, gün böyle başlar.",
    "Sabah sabah buradasın, {name} — en iyi hafıza saati bu.",
    "Günaydın, {name}. Bugünün planı kısa, hadi ilkinden başlayalım.",
    "Erken kalkan kelimeyi kapar, {name}. Plan hazır.",
    "Günaydın! Dün öğrendiklerin bugün ilk kez sorulacak — hazır mısın, {name}?",
  ],
  plan_day: [
    "Hoş geldin, {name}. Kısa bir tur, sonra kaldığın yerden devam.",
    "Ara verdiysen tam zamanı, {name}: bugünün planı on beş dakika bile değil.",
    "Merhaba, {name}! Önce vadesi gelen kelimeler, sonra keyfine göre.",
    "Bugün de geldin, {name} — seri böyle uzar.",
    "Selam, {name}. Planın ilk öğesi en kolayı, oradan ısınalım.",
  ],
  plan_evening: [
    "İyi akşamlar, {name}. Uyumadan önce tekrar, sabah hatırlamanın sırrı.",
    "Günün sonunda birkaç dakika yeter, {name} — plan kısa tutuldu.",
    "Akşam turu, {name}: yorgunsan yalnız kelime tekrarını yap, gerisi yarına.",
    "Hoş geldin, {name}. Bugünü kapatmadan bir tur daha?",
    "İyi akşamlar! Gece öğrenilen kelime sabah daha sağlam kalır, {name}.",
  ],
  exam_intro: [
    "Sınav bu — ipucu yok ama panik de yok. Bildiğini yaz, bilmediğini geç.",
    "Kâğıt beş bölüm; bir bölüm kötü gitse bile diğerleri seni taşır.",
    "Derin nefes. Sınav seviyeni ölçer, değerini değil.",
    "Süre yeterli; hızlı değil, dikkatli ol.",
    "Takıldığın soruda durma, sonrakine geç — geri dönüş yok ama zaman var.",
  ],
  exam_pass: [
    "%{pct} — geçtin! Bu kâğıt artık senin, sertifikayı aç.",
    "Geçtin! %{pct} ile {level} artık kâğıt üstünde de senin.",
    "İşte bu! %{pct}. Zor bölümler bile eşiğin üstünde kaldı.",
    "Tebrikler, {name}! Sınavdan %{pct} çıktı, hak edilmiş.",
    "Geçtin — %{pct}. Şimdi sıradaki seviyenin dersleri seni bekliyor.",
  ],
  exam_fail: [
    "%{pct} — bu sefer olmadı, ama hangi bölümün eksik olduğunu artık biliyorsun.",
    "Olmadı; zayıf bölüm belli, iki hafta oraya yüklenip yeniden dene.",
    "%{pct}. Sınav eşiğin altında kaldı ama bu bir ölçüm, bir yargı değil.",
    "Bu sefer değil. Profilde zayıf noktalar ve sıradaki adım seni bekliyor.",
    "Kâğıt geçmedi ama kâğıt gitmedi: bölümlere bak, en düşüğünden başla.",
  ],
  weak_done: [
    "Zayıf noktanın üstüne gittin — işin en zor kısmı buydu.",
    "Bu hata tipini birkaç gün böyle çalış, listeden düşer.",
    "Hedefli tur bitti. Aynı hata artık daha az şaşırtır.",
    "Kaçınmak yerine üstüne gitmek: doğru olanı yaptın.",
    "Bir tur daha böyle, sonra bu tip için kelimelerin aralığı açılır.",
  ],
  weekly: [
    "Bak ne oldu: geçen haftanın özeti burada.",
    "Yeni hafta! Geçen haftanın sayıları hemen altta.",
    "Geçen hafta ne yaptığını görmek ister misin? Özet aşağıda.",
    "Hafta başı: geçen haftanın toplamına bir bak, sonra devam.",
    "Geçen haftanın özeti hazır — kısa bir bakış, sonra plana.",
  ],
};

export type CoachVars = { name?: string | null; pct?: number; level?: string };

/** Yer tutucuları doldur; isim yoksa ", {name}" parçası tamamen düşer. */
export function fillCoachLine(line: string, vars: CoachVars = {}): string {
  let s = line;
  if (vars.name) s = s.replace(/\{name\}/g, vars.name);
  else s = s.replace(/,\s*\{name\}/g, "").replace(/\{name\}[,!.]?\s*/g, "");
  s = s.replace(/\{pct\}/g, String(vars.pct ?? ""));
  s = s.replace(/\{level\}/g, vars.level ?? "");
  // Yer tutucu düşünce cümle küçük harfle başlayabilir ("günaydın" gibi değil, ama garanti).
  return s.replace(/\s{2,}/g, " ").trim();
}

/** Son söylenenleri hesaba katıp tekrar etmeyen bir dizin seç (saf, test edilebilir). */
export function pickIndex(count: number, recent: readonly number[], random: () => number = Math.random): number {
  if (count <= 0) return 0;
  const avoid = new Set(recent.slice(-Math.min(recent.length, count - 1)));
  const options = [];
  for (let i = 0; i < count; i++) if (!avoid.has(i)) options.push(i);
  const pool = options.length ? options : [...Array(count).keys()];
  return pool[Math.floor(random() * pool.length)];
}

const SEEN_KEY = "nomi-coach-seen";

function readSeen(): Partial<Record<CoachMoment, number[]>> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? (JSON.parse(raw) as Partial<Record<CoachMoment, number[]>>) : {};
  } catch {
    return {};
  }
}

/**
 * Bir an için cümle seç. Seçim cihazda hatırlanır: aynı anın son (n-1)
 * cümlesi tekrar seçilmez. Tarayıcı dışında (test) yalnız rastgele seçer.
 */
export function pickCoachLine(moment: CoachMoment, vars: CoachVars = {}): string {
  const lines = COACH_LINES[moment];
  const seen = typeof localStorage === "undefined" ? {} : readSeen();
  const recent = seen[moment] ?? [];
  const i = pickIndex(lines.length, recent);
  try {
    seen[moment] = [...recent, i].slice(-lines.length);
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch {
    /* depolama yoksa tekrar korunmaz, cümle yine söylenir */
  }
  return fillCoachLine(lines[i], vars);
}

/** Günün saatine göre plan selamı. */
export function planMoment(hour: number = new Date().getHours()): CoachMoment {
  if (hour < 12) return "plan_morning";
  if (hour < 18) return "plan_day";
  return "plan_evening";
}
