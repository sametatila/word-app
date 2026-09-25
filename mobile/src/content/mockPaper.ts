import type { MockCourse, MockLevel, MockPart, MockSkill } from "../data/exams";

/**
 * SINAVA GİREN KULLANICININ ALDIĞI KÂĞIT — bellekte, diskte değil.
 *
 * Kâğıtlar ücretsiz ikilinin içinde duruyordu (5,4 MB, 120 kâğıt, cevap
 * anahtarlarıyla) ve premium kapısı yalnız görünürlüğü yönetiyordu. Artık
 * sunucudan, yetki kontrolünden geçtikten sonra ve anahtarı çıkarılmış hâlde
 * iniyor (`src/lib/mock-exams/deliver`).
 *
 * DİSKE YAZILMIYOR ve bu bilinçli bir karar: kâğıt oturum boyunca bellekte
 * duruyor, uygulama kapanınca gidiyor. Böylece ödeyen kullanıcının cihazında
 * bile kalıcı bir kopya birikmiyor. Bedeli şu: sınav ÇEVRİMİÇİ başlıyor.
 * Deneme sınavı zaten oturup çözülen bir iş; konuşma ve alıştırma tarafı
 * çevrimdışı çalışmaya devam ediyor.
 *
 * Bellekteki kopya bir oturum içinde yeniden kullanılıyor: kapaktan sınava
 * geçerken, listeye dönüp aynı bölüme tekrar girerken ya da sınavın ortasında
 * ağ hıçkırdığında ikinci bir istek atılmıyor.
 */

export type DeliveredTask = Omit<MockPart["tasks"][number], "items"> & {
  items: MockPart["tasks"][number]["items"];
};

export type DeliveredPaper = {
  id: string;
  no: number;
  level: MockLevel;
  course: MockCourse;
  theme: string;
  themeTr: string;
  part: MockPart;
};

const held = new Map<string, DeliveredPaper>();

const keyOf = (paperId: string, skill: MockSkill) => `${paperId}:${skill}`;

export function rememberPaper(paper: DeliveredPaper): void {
  /* Tavan yok: bir oturumda açılan bölüm sayısı bir elin parmakları kadar ve
     her biri ~6 KB. Uygulama kapanınca tamamı gidiyor. */
  held.set(keyOf(paper.id, paper.part.skill), paper);
}

export function heldPaper(paperId: string, skill: MockSkill): DeliveredPaper | null {
  return held.get(keyOf(paperId, skill)) ?? null;
}
