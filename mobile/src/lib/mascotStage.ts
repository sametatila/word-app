import { useSyncExternalStore } from "react";

/**
 * Erdi'nin sahnesi — aynı anda tek Erdi kuralı. Web `lib/mascot-stage`
 * karşılığı ve kural birebir aynı.
 *
 * Bir tane mirket var. Ekranın kenarından dikizlerken cevap şeridinde de
 * belirmesi, köşeden kutlarken şeritte de baş parmak göstermesi karakteri
 * ikiye bölüyor. Kural: gezici hareketler (dikizleme, kutlama pop'u) sahneyi
 * belirli bir süre için KİLİTLER; sahne başkasına aitken diğer her Erdi örneği
 * görünmez olur. "Mirket nereye gitti?" sorusunun cevabı hep aynı: şu an başka
 * bir yerde, gözünün önünde.
 *
 * MOBİLDE HİÇ YOKTU: Android'de ortam dikizlemesi, kutlama pop'u ve cevap
 * şeridinin maskotu birbirinden habersiz çiziliyordu, yani aynı ekranda iki
 * (bazen üç) Erdi görünebiliyordu. Webde bu kural bir kusur olarak bulunup
 * kurulmuştu; referans platform bu kez geride kalan taraftı.
 *
 * Tek sahip, süreli kilit: sahibi süresi dolunca ya da bırakınca sahne
 * boşalır. Kilit alınamazsa (sahne dolu) isteyen taraf bekler ya da vazgeçer —
 * kararı isteyen verir, sahne sıraya koymaz.
 *
 * Modül kapsamı bilinçli: şerit, pop ve dikizleme ayrı ağaçlarda yaşıyor ve
 * ekran geçişlerinde yeniden kuruluyor; ortak bir bağlam her oyun yüzeyine
 * dokunmak demekti.
 */
let owner: string | null = null;
let until = 0;
let timer: ReturnType<typeof setTimeout> | null = null;
const subs = new Set<() => void>();

/*
  Bildirim bir sonraki mikro göreve erteleniyor: `claimStage` bir bileşenin
  RENDER'ı sırasında çağrılabiliyor ve aboneler aynı anda setState yapınca
  React "başka bileşen çizilirken güncelleme" uyarısı veriyor. Web tarafında
  aynı not ve aynı çözüm duruyor.
*/
let pending = false;
function emit() {
  if (pending) return;
  pending = true;
  queueMicrotask(() => {
    pending = false;
    subs.forEach((f) => f());
  });
}

function clearTimer() {
  if (timer) clearTimeout(timer);
  timer = null;
}

/** Sahneyi `ms` boyunca al. Başkasınındaysa false; kendinin ise süre uzar. */
export function claimStage(id: string, ms: number): boolean {
  const now = Date.now();
  if (owner && owner !== id && now < until) return false;
  owner = id;
  until = now + ms;
  clearTimer();
  timer = setTimeout(() => {
    if (owner === id) {
      owner = null;
      until = 0;
      emit();
    }
  }, ms);
  emit();
  return true;
}

/** Sahneyi bırak (yalnız sahibiysen). */
export function releaseStage(id: string) {
  if (owner !== id) return;
  owner = null;
  until = 0;
  clearTimer();
  emit();
}

export function stageOwner(): string | null {
  return owner && Date.now() < until ? owner : null;
}

function subscribe(f: () => void) {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
}

/** Sahnenin o anki sahibi — değişince yeniden render. */
export function useStageOwner(): string | null {
  return useSyncExternalStore(subscribe, stageOwner, () => null);
}
