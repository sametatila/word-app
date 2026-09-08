import type { ImmersionItem } from "@/lib/immersion/types";
import type { HubUnit } from "@/components/immersion/immersion-hub";

/**
 * Patika durumundan arayüzün beklediği ünite listesi.
 *
 * Bu eşleme Patika sayfasının içindeydi; ünitenin kendi sayfası gelince
 * (`/immersion/unit/[index]`) iki yerden çağrılır oldu. Kopyalanmadı: `href`
 * üretimi bir kez yanlış giderse (yeni bir tür eklenip buraya yazılmazsa)
 * kopyalar sessizce ayrışır ve bir yüzey oynanabilir, diğeri değilmiş gibi
 * davranır.
 */
type TrackState = {
  units: {
    unit: { id: string; index: number; group: number; theme: string };
    locked: boolean;
    complete: boolean;
    done: number;
    total: number;
    lessonsDone: number;
    lessonsTotal: number;
    items: { item: ImmersionItem; playable: boolean; done: boolean; attempted: boolean; open: boolean }[];
  }[];
  currentIndex: number;
};

export function buildHubUnits(state: TrackState): HubUnit[] {
  return state.units.map((u) => ({
    id: u.unit.id,
    index: u.unit.index,
    group: u.unit.group,
    theme: u.unit.theme,
    locked: u.locked,
    complete: u.complete,
    done: u.done,
    total: u.total,
    lessonsDone: u.lessonsDone,
    lessonsTotal: u.lessonsTotal,
    items: u.items.map((s) => ({
      id: s.item.id,
      kind: s.item.kind,
      href: hrefFor(s.item),
      title: s.item.title,
      titleTr: s.item.titleTr,
      playable: s.playable,
      done: s.done,
      attempted: s.attempted,
      open: s.open,
    })),
  }));
}

/** Item → oynatıcı rotası. Yer tutucular (ref=null) ve içeriği-olmayan türler null. */
export function hrefFor(item: ImmersionItem): string | null {
  if (item.ref === null) return null;
  if (item.kind === "lesson") return `/lessons/${item.ref}`;
  if (item.kind === "read" || item.kind === "listen" || item.kind === "write") return `/immersion/skill/${item.ref}`;
  if (item.kind === "quiz") return `/immersion/quiz/${item.ref}`;
  if (item.kind === "checkpoint") return `/immersion/quiz/${item.ref}?mode=checkpoint`;
  if (item.kind === "grammar") return `/immersion/grammar/${item.ref}`;
  return null;
}
