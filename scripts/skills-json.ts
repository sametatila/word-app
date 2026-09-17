/**
 * Beceri egzersizlerini STDOUT'a JSON olarak basar — tek tüketicisi
 * `check:parity`.
 *
 * NEDEN VAR: parite denetleyicisi düz JS ve TypeScript kaynağını içe
 * alamıyor; eskiden mobil paketteki `exercises.json`u okuyordu. Paket
 * kaldırıldı (egzersizler seviye paketi hâlinde sunucudan iniyor), ama
 * denetim değerli — "oynatıcının çizemediği görev türü" hatası bir kez 190
 * yazma egzersizini bitirilemez yapmıştı. Denetim artık KAYNAĞA bakıyor,
 * yani sapmayı dökümden önce görüyor.
 */
import { buildSkillDump } from "./dump-skills-mobile";

const out = ["de", "en"].flatMap((course) => JSON.parse(buildSkillDump(course).json) as unknown[]);
process.stdout.write(JSON.stringify(out));
