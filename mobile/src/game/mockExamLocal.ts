import AsyncStorage from "@react-native-async-storage/async-storage";
import type { MockSkill } from "../data/exams";

/**
 * Deneme sınavının YEREL kaydı.
 *
 * NEDEN VAR. Sınav sunucuya yazılıyor (`/api/mock-exam`) ve resmî sayı orada.
 * Ama sunucuya ulaşılamadığı her an — ağ kesildi, uç henüz yayımlanmadı,
 * oturum düştü — çözülmüş bir sınavın tamamı kayboluyordu: ne kaldığı yerden
 * devam edilebiliyordu ne de sonucu bir yerde görünüyordu. Bir öğrencinin
 * kırk beş dakikasını ağ koşullarına bağlamak kabul edilemez.
 *
 * Bu yüzden her cevap ÖNCE yerele yazılıyor, sonra sunucuya. Sunucu geri
 * geldiğinde yetkili olan yine o: yerel kayıt bir yedek, ikinci bir doğruluk
 * kaynağı değil. Bunu ayırt etmek için bitmiş sonuçlar `synced` alanı
 * taşıyor — sunucuda puanlanmış bir sonuç mu, yoksa yalnız cihazda hesaplanmış
 * bir sonuç mu, ekran bunu söyleyebiliyor.
 *
 * Yerel kayıt İSTATİSTİĞE girmez; istatistik sunucudan gelir. Yerel liste
 * yalnız "bu bölümü çözdüm mü, kaç aldım" sorusuna cevap veriyor ve sunucu
 * ulaşılamazken o sorunun tek cevabı bu.
 */

const RUN = "lernomi:mock-run:";
const DONE = "lernomi:mock-done";
/** Bitmiş sonuçların yerel tavanı; eskisi düşer. */
const MAX_DONE = 200;

export type LocalRun = {
  answers: Record<string, string>;
  open: Record<string, string>;
  taskIx: number;
  secondsLeft: number;
  /** Uyaran kimliği → kaç kez oynatıldı (bkz. parity 270). */
  plays?: Record<string, number>;
  updatedAt: string;
};

export type LocalResult = {
  paperId: string;
  skill: MockSkill;
  level: string;
  correct: number;
  total: number;
  pct: number;
  passed: boolean;
  at: string;
  /** Sunucuda puanlandı mı — yalnız cihazda hesaplanan sonuç `false`. */
  synced: boolean;
};

const runKey = (paperId: string, skill: MockSkill) => `${RUN}${paperId}:${skill}`;

export async function loadLocalRun(paperId: string, skill: MockSkill): Promise<LocalRun | null> {
  try {
    const raw = await AsyncStorage.getItem(runKey(paperId, skill));
    return raw ? (JSON.parse(raw) as LocalRun) : null;
  } catch {
    return null;
  }
}

export async function saveLocalRun(paperId: string, skill: MockSkill, run: Omit<LocalRun, "updatedAt">): Promise<void> {
  try {
    await AsyncStorage.setItem(runKey(paperId, skill), JSON.stringify({ ...run, updatedAt: new Date().toISOString() }));
  } catch { /* depolama kapalı */ }
}

export async function clearLocalRun(paperId: string, skill: MockSkill): Promise<void> {
  try { await AsyncStorage.removeItem(runKey(paperId, skill)); } catch { /* yut */ }
}

export async function loadLocalResults(): Promise<LocalResult[]> {
  try {
    const raw = await AsyncStorage.getItem(DONE);
    return raw ? (JSON.parse(raw) as LocalResult[]) : [];
  } catch {
    return [];
  }
}

/**
 * Sonucu yerele yazar.
 *
 * Aynı bölümün eski denemeleri SİLİNMİYOR: gelişim ancak tekrarlar yan yana
 * durursa görülür. Yalnız toplam sayı sınırlanıyor.
 */
export async function pushLocalResult(r: Omit<LocalResult, "at">): Promise<void> {
  try {
    const list = await loadLocalResults();
    list.unshift({ ...r, at: new Date().toISOString() });
    await AsyncStorage.setItem(DONE, JSON.stringify(list.slice(0, MAX_DONE)));
  } catch { /* depolama kapalı */ }
}

export type PartState = { pct: number; passed: boolean; synced: boolean } | "running" | null;

/**
 * Bir kâğıdın bölümlerinin durumu — listede rozet olarak gösteriliyor.
 *
 * En SON deneme esas alınıyor, en iyisi değil: liste "bu bölümü çözdüm mü ve
 * son seferinde ne oldu" sorusuna cevap veriyor. En iyi puan istatistik
 * ekranının işi.
 */
export async function localPartStates(paperId: string, skills: MockSkill[]): Promise<Record<string, PartState>> {
  const out: Record<string, PartState> = {};
  const [results, runs] = await Promise.all([
    loadLocalResults(),
    Promise.all(skills.map((s) => loadLocalRun(paperId, s))),
  ]);
  skills.forEach((skill, i) => {
    if (runs[i]) { out[skill] = "running"; return; }
    const last = results.find((r) => r.paperId === paperId && r.skill === skill);
    out[skill] = last ? { pct: last.pct, passed: last.passed, synced: last.synced } : null;
  });
  return out;
}
