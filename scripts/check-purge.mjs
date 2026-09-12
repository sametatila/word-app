/**
 * HESAP SİLME EKSİKSİZ Mİ?
 *
 * Gizlilik politikası §11 açık bir söz veriyor: "Silme anında hesabın,
 * ilerlemen, yazıların, konuşma kayıtların, kullanım olayların ve sosyal
 * izlerin KALICI OLARAK silinir… Yasal saklama yükümlülüğü olan mali kayıtlar
 * anonimleştirilerek tutulur."
 *
 * Sözü tutan tek yer `lib/account/purge`. Şemaya yeni bir kullanıcı tablosu
 * eklendiğinde oraya satır eklemeyi kimse hatırlatmıyordu: dosyanın kendi
 * yorumu "silinmeyen tek şey yok" derken SEKİZ tablo arkada kalıyordu —
 * deneme sınavı denemeleri, lig üyelikleri, kota sayaçları, cihaz jetonları,
 * premium hakkı, promosyon kullanımı, davet zinciri ve para defteri.
 *
 * ÖLÇÜM KARARLAŞTIRILABİLİR ve bu yüzden bu kapı yazıldı: şemadaki tabloların
 * hangileri kullanıcıya bağlı olduğu metinden okunuyor (`userId` ve akraba
 * sütun adları), `purge.ts` içinde o tablo `delete(...)` ya da `update(...)`
 * ile GEÇİYOR mu diye bakılıyor. "Geçiyor mu" sorusu kasten kaba: silme mi
 * anonimleştirme mi olduğu bir POLİTİKA kararı ve orada yorumda yazılı; kapı
 * yalnız "unutulmuş mu" diye soruyor.
 */
import { readFileSync } from "node:fs";

const schema = readFileSync("src/lib/db/schema.ts", "utf8");
const purge = readFileSync("src/lib/account/purge.ts", "utf8");

/** Kullanıcıya bağlı sütun adları — hepsi bir kişiyi işaret ediyor. */
const USER_COLUMN =
  /userId:|fromUserId|toUserId|actorId|requesterId|addresseeId|blockerId|blockedId|reporterId|reportedId|userAId|userBId|inviterUserId|inviteeUserId/;

const tables = [];
const re = /export const (\w+)\s*=\s*pgTable\(\s*"([^"]+)"/g;
let m;
while ((m = re.exec(schema))) tables.push({ variable: m[1], name: m[2], at: m.index });
for (let i = 0; i < tables.length; i++) {
  const start = tables[i].at;
  const end = i + 1 < tables.length ? tables[i + 1].at : schema.length;
  tables[i].body = schema.slice(start, end);
}

const userTables = tables.filter((t) => USER_COLUMN.test(t.body));
const covered = new Set([...purge.matchAll(/(?:delete|update)\((\w+)\)/g)].map((x) => x[1]));
const missing = userTables.filter((t) => !covered.has(t.variable));

/*
 * Ters yön: `purge` içinde geçen ama şemada kullanıcıya bağlı GÖRÜNMEYEN
 * tablo. Ya sütun adı değişmiştir ya gereksiz bir silme kalmıştır.
 *
 * Bir istisna var ve kapı ilk çalıştığında onu yakaladı: `rate_limits`
 * kullanıcıya bir SÜTUNLA değil, `"<kapsam>:<userId>"` biçimli metin
 * anahtarıyla bağlı (bkz. schema.ts). Bağ gerçek, yalnız sütun taramasının
 * göremeyeceği yerde.
 */
const KEYED_BY_TEXT = new Map([
  [
    "rateLimits",
    {
      sebep: "kullanıcıya `key` içindeki \"<kapsam>:<userId>\" ile bağlı, sütunla değil",
      /* Gerekçenin kendisi: bağ metin anahtarıyla kuruluyorsa silme de öyle
         kurulmak zorunda. `like` kalkarsa istisna bir şeyi değil hiçbir şeyi
         korur. */
      kanit: /like\(\s*rateLimits\.key/,
    },
  ],
]);
const known = new Set(userTables.map((t) => t.variable));

/*
 * İSTİSNANIN KENDİSİ DE ÖLÇÜLÜYOR. Muaf tablo `extra` taramasından çıkarıldığı
 * için hiç sorgulanmıyor; gerekçesi bayatlarsa geriye sessiz bir delik kalır.
 * Üç ölüm biçimi var ve üçü de burada: tablo silinmiş, tabloya gerçek bir
 * kullanıcı sütunu gelmiş (istisna artık gereksiz), ya da purge'deki metin
 * anahtarlı silme kalkmış (istisna artık yanlış).
 */
const oluIstisna = [];
for (const [v, { kanit }] of KEYED_BY_TEXT) {
  if (!tables.some((t) => t.variable === v)) oluIstisna.push(`${v}: şemada böyle bir tablo yok`);
  else if (known.has(v)) oluIstisna.push(`${v}: artık kullanıcı sütunu var, istisna gereksiz`);
  else if (!kanit.test(purge)) oluIstisna.push(`${v}: purge'de metin anahtarlı silme yok, gerekçe geçersiz`);
}
const extra = [...covered].filter(
  (v) => !known.has(v) && !KEYED_BY_TEXT.has(v) && tables.some((t) => t.variable === v),
);

if (missing.length || extra.length || oluIstisna.length) {
  if (missing.length) {
    console.error("\nHESAP SİLMEDE ARKADA KALAN TABLO:\n");
    for (const t of missing) console.error(`  ${t.name}  (${t.variable})`);
    console.error(
      "\nKişisel veri siliniyor, yasal saklama yükümlülüğü olan mali kayıt\n" +
      "anonimleştiriliyor (bkz. gizlilik politikası §11). İkisi de `purge.ts`te.\n",
    );
  }
  if (extra.length) {
    console.error("\nPURGE'DE GEÇEN AMA KULLANICIYA BAĞLI GÖRÜNMEYEN TABLO:\n");
    for (const v of extra) console.error("  " + v);
    console.error("\nSütun adı mı değişti, yoksa silme gereksiz mi?\n");
  }
  if (oluIstisna.length) {
    console.error("\nKARŞILIKSIZ İSTİSNA (tablo muaf tutuluyor ama gerekçesi yok):\n");
    for (const x of oluIstisna) console.error("  " + x);
    console.error("\nİstisnayı `KEYED_BY_TEXT` listesinden kaldırın: muaf tablo hiç ölçülmüyor.\n");
  }
  process.exit(1);
}

console.log(
  `check:purge — kullanıcıya bağlı ${userTables.length} tablonun hepsi hesap silmede geçiyor`,
);
