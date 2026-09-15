/**
 * MİSAFİR BİRLEŞTİRMESİ EKSİKSİZ Mİ? — `npm run check:guest-merge`
 *
 * Misafir hesap oluşturduğunda ya da var olan hesabına girdiğinde misafirin
 * her satırı hesaba birleşiyor ve misafir siliniyor (bkz.
 * `src/lib/account/guest-merge.ts`, mağaza ön inceleme B24). Şemaya yeni bir
 * kullanıcı tablosu eklendiğinde birleştirmeye kural eklemeyi kimse
 * hatırlatmazsa o tablonun misafir satırları sessizce SAHİPSİZ kalır: misafir
 * kullanıcı satırı silinmiş olur ve `purgeUserData` o kimliği bir daha hiç
 * görmez. Kullanıcı ilerlemesinin bir parçasını kaybettiğini de bilmez.
 *
 * `check:purge`ün kardeşi ve aynı ölçüyü kullanıyor: şemadaki tabloların
 * hangileri kullanıcıya bağlı olduğu sütun adlarından okunuyor, birleştirme
 * dosyasında o tablonun bir adımı (`table: "<ad>"`) var mı diye bakılıyor.
 * Kuralın NE olduğu (topla, en iyisini al, sil) bir ürün kararı ve dosyada
 * yorumuyla yazılı; kapı yalnız "unutulmuş mu" diye soruyor.
 */
import { readFileSync } from "node:fs";

const schema = readFileSync("src/lib/db/schema.ts", "utf8");
const merge = readFileSync("src/lib/account/guest-merge.ts", "utf8");

/** Kullanıcıya bağlı sütun adları — `check-purge.mjs` ile aynı liste. */
const USER_COLUMN =
  /userId:|fromUserId|toUserId|actorId|requesterId|addresseeId|blockerId|blockedId|reporterId|reportedId|userAId|userBId|inviterUserId|inviteeUserId/;

const tables = [];
const re = /export const (\w+)\s*=\s*pgTable\(\s*"([^"]+)"/g;
let m;
while ((m = re.exec(schema))) tables.push({ variable: m[1], name: m[2], at: m.index });
for (let i = 0; i < tables.length; i++) {
  const end = i + 1 < tables.length ? tables[i + 1].at : schema.length;
  tables[i].body = schema.slice(tables[i].at, end);
}
const userTables = tables.filter((t) => USER_COLUMN.test(t.body));

const steps = new Set([...merge.matchAll(/table:\s*"([a-z_]+)"/g)].map((x) => x[1]));

/*
 * İKİ İSTİSNA, ikisi de ölçülüyor:
 *   - `profiles` adım listesinde değil, kodda ayrı birleşiyor: kimlik ve
 *     ayarlar hesabın, seri hesaplanıyor (mergeStreaks). Kanıt: dosyada
 *     profil satırını hem güncelleyen hem silen iki cümle.
 *   - `rate_limits` kullanıcıya sütunla değil "<kapsam>:<userId>" anahtarıyla
 *     bağlı; şema taraması onu kullanıcı tablosu saymıyor ama birleştirme
 *     misafirin anahtarlarını silmek zorunda.
 */
const SPECIAL = new Map([
  ["profiles", /update profiles t set[\s\S]*delete from profiles where user_id = \$\{G\}/],
]);
const KEYED_BY_TEXT = new Map([["rate_limits", /delete from rate_limits where key like/]]);

const missing = userTables.filter((t) => !steps.has(t.name) && !(SPECIAL.has(t.name) && SPECIAL.get(t.name).test(merge)));
const known = new Set(userTables.map((t) => t.name));
const extra = [...steps].filter((name) => !known.has(name) && !KEYED_BY_TEXT.has(name));
const deadExceptions = [];
for (const [name, proof] of KEYED_BY_TEXT) {
  if (!tables.some((t) => t.name === name)) deadExceptions.push(`${name}: şemada böyle bir tablo yok`);
  else if (known.has(name)) deadExceptions.push(`${name}: artık kullanıcı sütunu var, istisna gereksiz`);
  else if (!proof.test(merge)) deadExceptions.push(`${name}: birleştirmede metin anahtarlı silme yok`);
}
for (const [name, proof] of SPECIAL) {
  if (!proof.test(merge)) deadExceptions.push(`${name}: özel birleştirme kodu bulunamadı`);
}

if (missing.length || extra.length || deadExceptions.length) {
  if (missing.length) {
    console.error("\nMİSAFİR BİRLEŞTİRMESİNDE KURALI OLMAYAN KULLANICI TABLOSU:\n");
    for (const t of missing) console.error(`  ${t.name}  (${t.variable})`);
    console.error(
      "\nMisafir hesaba birleşince bu tablonun misafir satırları sahipsiz kalır.\n" +
        "`src/lib/account/guest-merge.ts` › mergeSteps'e bir adım ekleyin (taşı, birleştir ya da sil).\n",
    );
  }
  if (extra.length) {
    console.error("\nBİRLEŞTİRMEDE GEÇEN AMA KULLANICIYA BAĞLI GÖRÜNMEYEN TABLO:\n");
    for (const n of extra) console.error("  " + n);
    console.error("\nTablo adı mı değişti, yoksa adım gereksiz mi?\n");
  }
  if (deadExceptions.length) {
    console.error("\nKARŞILIKSIZ İSTİSNA:\n");
    for (const x of deadExceptions) console.error("  " + x);
  }
  process.exit(1);
}

console.log(`check:guest-merge — kullanıcıya bağlı ${userTables.length} tablonun hepsinin birleştirme kuralı var`);
