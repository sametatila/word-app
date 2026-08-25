import type { CefrLevel } from "@/lib/skills/types";
import type { CheatSheet } from "./types";
import { DE_A1 } from "./de-a1";
import { DE_A2 } from "./de-a2";
import { DE_B1 } from "./de-b1";
import { DE_B2 } from "./de-b2";
import { DE_C1 } from "./de-c1";

/**
 * Cheatsheet kataloğu.
 *
 * Ders kataloğu gibi bu da tamamen kod — veritabanına girmiyor. Sebebi ders
 * kataloğuyla aynı değil ama ondan daha basit: burada kullanıcıya ait hiçbir
 * durum yok. Ne ilerleme tutuluyor ne puan; sayfa açıldığında gösterilecek
 * şey her kullanıcı için birebir aynı. Veritabanına koymak, hiç değişmeyen
 * bir metni her istekte ağdan çekmek olurdu.
 */
export const CHEATSHEETS: CheatSheet[] = [...DE_A1, ...DE_A2, ...DE_B1, ...DE_B2, ...DE_C1];

export const CHEAT_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

export type { CheatSheet, CheatBlock } from "./types";
export { maskableCount } from "./types";
