/**
 * Seviye hazırlığı — saf puan (`npm run test:level`, docs/plan/level-progress.md).
 * Veritabanı gerektirmez. Kural bozulursa ya hazır olmayan sınava çağrılır ya da hazır olan beklemede kalır.
 */
import { readinessScore, READY_AT } from "../src/lib/level-readiness-score";

let failures = 0;
const check = (name: string, cond: boolean) => { console.log(`  ${cond ? "✓" : "✗"} ${name}`); if (!cond) failures++; };

console.log("\nSeviye hazırlığı");
check("eşik %60", READY_AT === 60);
check("hiçbir şey yokken 0, hazır değil", (() => { const r = readinessScore({ coreTotal: 400, mastered: 0, learning: 0, pathTotal: 20, pathDone: 0 }); return r.total === 0 && !r.ready; })());
check("pekişmiş 1, öğreniliyor 0,5 sayılır", readinessScore({ coreTotal: 100, mastered: 40, learning: 40, pathTotal: 10, pathDone: 0 }).vocab === 60);
check("kelime ve Patika yarı yarıya", readinessScore({ coreTotal: 100, mastered: 100, learning: 0, pathTotal: 10, pathDone: 2 }).total === 60);
check("%60'ta hazır", readinessScore({ coreTotal: 100, mastered: 60, learning: 0, pathTotal: 10, pathDone: 6 }).ready);
check("%59'da hazır değil", !readinessScore({ coreTotal: 100, mastered: 58, learning: 0, pathTotal: 100, pathDone: 60 }).ready);
check("her şeyi bitirmek GEREKMİYOR (kelime %70, Patika %50 → hazır)", readinessScore({ coreTotal: 100, mastered: 70, learning: 0, pathTotal: 10, pathDone: 5 }).ready);
check("Patika yoksa yalnız kelime sayılır", readinessScore({ coreTotal: 100, mastered: 65, learning: 0, pathTotal: 0, pathDone: 0 }).total === 65);
check("%100'ü aşmaz", readinessScore({ coreTotal: 10, mastered: 20, learning: 0, pathTotal: 1, pathDone: 3 }).total === 100);

console.log(`\n${failures ? "✗" : "✓"} ${failures} hata`);
if (failures) process.exit(1);
export {};
