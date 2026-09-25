import type { ModuleContent } from "./module-content";
import { buildModuleContent } from "./module-content";
import { MODULE_SIZE } from "./modules";
import { sourceConversationsFor } from "./source";

/**
 * MODÜL İÇERİĞİ, KAYNAKTAN — yalnız doğrulama betikleri için.
 *
 * `module-content` içeriği yayın hattından okuyor ve async; betiklerin
 * veritabanı yok ve zaten kaynağı denetliyorlar. İkisi aynı SAF kurucuyu
 * çağırıyor (`buildModuleContent`), yani kural tek yerde — yalnız derslerin
 * nereden geldiği değişiyor.
 *
 * Bu dosya bir rotadan İÇE ALINMAMALI: `source` üzerinden 8,5 MB ders metni
 * sunucu derlemesine girer.
 */

function inLevel(course: string, level: string) {
  return sourceConversationsFor(course).filter((l) => l.level === level);
}

export function sourceModuleCount(course: string, level: string): number {
  return Math.ceil(inLevel(course, level).length / MODULE_SIZE);
}

export function sourceModuleConversations(course: string, level: string, index: number) {
  return inLevel(course, level).slice(index * MODULE_SIZE, (index + 1) * MODULE_SIZE);
}

export function sourceModuleContent(course: string, level: string, index: number): ModuleContent {
  return buildModuleContent(course, level, index, sourceModuleConversations(course, level, index));
}

export function sourceAllModules(course: string): { level: string; index: number }[] {
  const out: { level: string; index: number }[] = [];
  for (const level of ["A1", "A2", "B1", "B2", "C1"]) {
    const n = sourceModuleCount(course, level);
    for (let i = 0; i < n; i++) out.push({ level, index: i });
  }
  return out;
}
