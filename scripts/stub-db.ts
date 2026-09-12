/**
 * Sahte veritabanı — sınav kurucusunun kuru provası için.
 *
 * `buildExam` üç sorgu yapıyor (kelime havuzu, bitmiş egzersizler, modül
 * dersleri) ve üçü de kâğıdın ŞEKLİNİ değiştirmiyor: hangi kelimelerin
 * seçileceğini ve ön koşulun sağlanıp sağlanmadığını belirliyorlar. Kâğıdın
 * kendisini yerel Postgres olmadan denemek için sorgu zinciri burada taklit
 * ediliyor; `scripts/exam-dryrun.ts` bunu kullanıyor.
 */
import { userLessons, userSkills, words } from "../src/lib/db/schema";

type Row = Record<string, unknown>;

/** Kelime havuzu — dry-run betiği modül başlıklarından dolduruyor. */
export const FAKE_WORDS: Row[] = [];

function chain(rows: () => Row[]) {
  const self: Record<string, unknown> = {};
  const pass = () => self;
  for (const k of ["where", "orderBy", "limit", "innerJoin", "leftJoin", "groupBy"]) self[k] = pass;
  self.from = (table: unknown) => {
    self.__table = table;
    return self;
  };
  self.then = (res: (v: Row[]) => unknown, rej?: (e: unknown) => unknown) => {
    const table = self.__table;
    const out = table === words ? rows() : table === userSkills || table === userLessons ? [] : [];
    return Promise.resolve(out).then(res, rej);
  };
  return self;
}

/**
 * Yazma zinciri — SONUÇ YOK, yalnız çağrılabilir olsun diye.
 *
 * `buildExam` artık ilk iş olarak profili okuyor (`ensureProfile`, anadili
 * oradan geliyor) ve o yol profil yoksa INSERT ediyor. Sahte veritabanında
 * `insert` hiç yoktu, yani kuru prova `db.insert is not a function` ile
 * düşüyordu — betik CI'da koşmadığı için sessizce bozuk kalmıştı (2026-09-12
 * ölçüldü; kırılma `ensureProfile` çağrısının eklendiği commit'e kadar
 * gidiyor). Boş dizi dönmek doğru taklit: profil bulunamayınca çağıran
 * `undefined` görüyor ve anadil varsayılana düşüyor, kâğıdın şekli
 * değişmiyor.
 */
function writeChain() {
  const self: Record<string, unknown> = {};
  const pass = () => self;
  for (const k of ["values", "set", "where", "onConflictDoNothing", "onConflictDoUpdate", "returning"]) self[k] = pass;
  self.then = (res: (v: Row[]) => unknown, rej?: (e: unknown) => unknown) =>
    Promise.resolve([] as Row[]).then(res, rej);
  return self;
}

export const db = {
  select: () => chain(() => FAKE_WORDS),
  insert: () => writeChain(),
  update: () => writeChain(),
  delete: () => writeChain(),
};
