/**
 * Kursa uygun başarımlar — `npm run test:achievements` (2026-09-29).
 *
 * Veritabanı gerektirmez: katalog kararı (`inCourse`, `catalogFor`,
 * `targetFor`) ve avatar kilitleriyle bağı saf. Tahtanın veritabanıyla
 * davranışı (kurs değişince kazanılmışın kalması, %100) `test:e2e` 17'de.
 *
 * Sabitlenen sözler:
 *   - hiçbir kursun kataloğunda o kursta oynanamayan oyunun rozeti yok
 *   - hiçbir kurs ötekinden az rozetle kalmıyor
 *   - `allGames` kursun oyun sayısını istiyor ve metni sayı yazmıyor
 *   - her karşılık (`insteadOf`) gerçek bir rozetin yerini tutuyor: aynı
 *     grup, kademe, hedef; ikisi aynı kursta birlikte yok
 *   - rozete bağlı her avatar parçası her kursta açılabilir
 */
import {
  ACHIEVEMENTS,
  achievementForCourse,
  catalogFor,
  courseGames,
  inCourse,
  targetFor,
  unlockKeysOf,
  type Metric,
} from "../src/lib/achievements";
import { PART_UNLOCKS, SPECIAL_UNLOCK_KEYS } from "../src/lib/avatar-unlocks";
import { enabledCourses, supportsGame } from "../src/lib/courses";
import { translate } from "../src/lib/i18n/dict";
import { PLAYABLE_GAMES } from "../src/lib/types";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

/* Oyuna bağlı ölçüler: rozeti o oyunda doğru cevap sayarak açılanlar. Liste
   `only.game` taşımayan bir oyun rozetini yakalamak için: ölçü bir oyunu
   sayıyorsa ve oyun her kursta yoksa, rozet `only` ile sınırlanmış olmalı. */
const METRIC_GAME: Partial<Record<Metric, string>> = {
  gameArtikel: "artikel",
  gamePlural: "plural",
  gameListen: "listen",
  gameTyping: "typing",
  gameOrder: "order",
  gameTranslate: "translate",
  gameCloze: "cloze",
  gameScramble: "scramble",
};

const courses = enabledCourses().map((c) => c.id);

console.log("\n1) Kursta oynanamayan oyunun rozeti o kursta yok");
for (const c of courses) {
  const bad = catalogFor(c).filter((d) => {
    const g = METRIC_GAME[d.metric];
    return g !== undefined && !supportsGame(c, g);
  });
  check(`${c}: oyun rozetleri kursun oyunlarında`, bad.length === 0, bad.map((d) => d.id).join(","));
}
check("İngilizcede artikel rozeti yok", !catalogFor("en").some((d) => d.id === "artikel300"));
check("İngilizcede çoğul rozeti yok", !catalogFor("en").some((d) => d.id === "plural150"));
check("Almancada artikel ve çoğul rozeti var", ["artikel300", "plural150"].every((id) => catalogFor("de").some((d) => d.id === id)));
check("Züritüütsch artikel rozetini taşıyor (hasArticles)", catalogFor("gsw-zh").some((d) => d.id === "artikel300"));
check("İngilizcenin kendi iki rozeti var", ["cloze300", "scramble150"].every((id) => catalogFor("en").some((d) => d.id === id)));
check("Almancada İngilizce kursun rozetleri yok", !catalogFor("de").some((d) => d.id === "cloze300" || d.id === "scramble150"));

console.log("\n2) Hiçbir kurs daha az rozetle kalmıyor");
const sizes = courses.map((c) => catalogFor(c).length);
check("katalog boyları eşit", new Set(sizes).size === 1, courses.map((c, i) => `${c}=${sizes[i]}`).join(" "));
for (const c of courses) {
  const groups = new Map<string, number>();
  for (const d of catalogFor(c)) groups.set(d.group, (groups.get(d.group) ?? 0) + 1);
  const de = new Map<string, number>();
  for (const d of catalogFor("de")) de.set(d.group, (de.get(d.group) ?? 0) + 1);
  const off = [...de].filter(([g, n]) => (groups.get(g) ?? 0) !== n);
  check(`${c}: her grupta Almancadaki kadar rozet`, off.length === 0, off.map(([g]) => g).join(","));
}

console.log("\n3) Bütün oyunlar = kursun oyunları");
const allGames = ACHIEVEMENTS.find((d) => d.id === "allGames")!;
check("Almancada hedef 11", targetFor(allGames, "de") === 11, String(targetFor(allGames, "de")));
check("İngilizcede hedef 9", targetFor(allGames, "en") === 9, String(targetFor(allGames, "en")));
for (const c of courses) {
  check(`${c}: hedef kursun oyun sayısı`, targetFor(allGames, c) === courseGames(c).length);
  check(`${c}: kursun oyunları PLAYABLE_GAMES içinde`, courseGames(c).every((g) => (PLAYABLE_GAMES as readonly string[]).includes(g)));
}
check("öteki rozetlerin hedefi kursa göre değişmiyor", ACHIEVEMENTS.filter((d) => d.id !== "allGames").every((d) => courses.every((c) => targetFor(d, c) === d.target)));
for (const lang of ["tr", "en", "de"] as const) {
  const hint = translate(lang, allGames.hintKey);
  /* Sayı yazılmıyor: "on bir"/"eleven"/"elf" bir kursta yanlış olurdu, "{n}"
     de avatar kilidinde değişkensiz çevrildiği için çözülmeden kalırdı. */
  check(`${lang}: ipucu sayı yazmıyor`, !/\d|\{|on bir|eleven|nine|elf\b|neun|dokuz/i.test(hint), hint);
}

console.log("\n4) Karşılıklar gerçek bir rozetin yerini tutuyor");
const byId = new Map(ACHIEVEMENTS.map((d) => [d.id, d]));
for (const d of ACHIEVEMENTS.filter((x) => x.only?.insteadOf)) {
  const base = byId.get(d.only!.insteadOf!);
  check(`${d.id} → ${d.only!.insteadOf}: rozet var`, Boolean(base));
  if (!base) continue;
  check(`${d.id}: aynı grup, kademe ve hedef`, base.group === d.group && base.tier === d.tier && base.target === d.target);
  check(`${d.id}: ikisi aynı kursta birlikte değil`, courses.every((c) => !(inCourse(d, c) && inCourse(base, c))));
  check(`${d.id}: kilit anahtarı karşılığı da açıyor`, unlockKeysOf(d.id).includes(base.id));
}
check("karşılığı olmayan rozet yalnız kendini açıyor", unlockKeysOf("streak3").join() === "streak3");
check("kimlikler benzersiz", byId.size === ACHIEVEMENTS.length);

console.log("\n5) Rozete bağlı her avatar parçası her kursta açılabilir");
const special = new Set<string>(SPECIAL_UNLOCK_KEYS);
for (const c of courses) {
  const cat = catalogFor(c);
  const reach = new Set(cat.flatMap((d) => unlockKeysOf(d.id)));
  const dead = Object.entries(PART_UNLOCKS).filter(([, k]) => !special.has(k) && !reach.has(k));
  check(`${c}: kazanılamayan parça yok`, dead.length === 0, dead.map(([p, k]) => `${p}:${k}`).join(","));
}
check("İngilizce öğrenene artikel parçasının ipucu boşluk rozeti", achievementForCourse("artikel300", "en") === "cloze300");
check("İngilizce öğrenene çoğul parçasının ipucu harf bulmacası", achievementForCourse("plural150", "en") === "scramble150");
check("Almanca öğrenene ipucu değişmiyor", achievementForCourse("artikel300", "de") === "artikel300");
check("kursta olan rozetin ipucu kendisi", achievementForCourse("allGames", "en") === "allGames");
check("özel anahtarlar olduğu gibi", achievementForCourse("league_1", "en") === "league_1");

console.log("\n6) Her rozetin üç dilde adı ve ipucu var");
for (const d of ACHIEVEMENTS) {
  for (const lang of ["tr", "en", "de"] as const) {
    const t = translate(lang, d.titleKey);
    const h = translate(lang, d.hintKey);
    if (t === d.titleKey || h === d.hintKey) check(`${d.id} ${lang}`, false, "metin yok");
  }
}
check("metin taraması bitti", true);

console.log(failures === 0 ? "\nTÜM TESTLER GEÇTİ" : `\n${failures} TEST BAŞARISIZ`);
process.exit(failures === 0 ? 0 : 1);
