import AsyncStorage from "@react-native-async-storage/async-storage";
import { listContentItems, getContentItem } from "../src/content/store";

/**
 * İÇERİK DEPOSU — SIRA KAYBOLMASIN.
 *
 * NEDEN TEST: hata SESSİZ ve pahalı. Paket bir eşleme (madde → gövde) ve
 * eşlemenin sırası taşınmıyor; oysa konuşma ve beceri listelerinde SIRA ANLAM
 * taşıyor — patika üniteleri listeyi sırayla tüketiyor. Sıra karışırsa hiçbir
 * şey hata vermez, yalnız müfredat karışır: kullanıcı A2'nin yedinci konuşmasını
 * birinci ünitede görür.
 *
 * Bu yüzden sıra AÇIKÇA yayınlanıyor (`ORDER_ITEM`, `src/lib/content/ids`) ve
 * bu test onun uygulandığını ölçüyor. Ölçülmüş bir gerçekle yazıldı: kimliğe
 * göre sıralamak YANLIŞ — hiçbir seviyede kaynak sırası kimlik sırasıyla aynı
 * değil (de-a2, de-b1, de-c1, en-a2, en-b2 hepsinde ilk madde bile farklı).
 */

const PACK = "conversations/de-a2";
/* Kaynak sırası kimlik sırasının TERSİ: kimliğe göre sıralayan bir kusur
   burada hemen görünür. */
const SOURCE_ORDER = ["de-a2-zeta", "de-a2-mu", "de-a2-alpha"];

async function seedPack(order: string[] | null) {
  const items: Record<string, string> = {};
  for (const id of SOURCE_ORDER) {
    const hash = `h-${id}`;
    items[id] = hash;
    await AsyncStorage.setItem(`content:body:${hash}`, JSON.stringify({ id }));
  }
  if (order) {
    items.index = "h-index";
    await AsyncStorage.setItem("content:body:h-index", JSON.stringify(order));
  }
  /* Dizin ALFABETİK yazılıyor: gerçek hayatta da delta güncellemesi sırayı
     bozuyor, test o hâli taklit ediyor. */
  const sorted: Record<string, string> = {};
  for (const key of Object.keys(items).sort()) sorted[key] = items[key];
  await AsyncStorage.setItem(`content:pack:${PACK}`, JSON.stringify({ r: 1, items: sorted }));
}

beforeEach(async () => {
  await AsyncStorage.clear();
});

test("madde listesi KAYNAK sırasında dönüyor", async () => {
  await seedPack(SOURCE_ORDER);
  expect(await listContentItems(PACK)).toEqual(SOURCE_ORDER);
});

test("sıra maddesi içerik sayılmıyor", async () => {
  await seedPack(SOURCE_ORDER);
  expect(await listContentItems(PACK)).not.toContain("index");
});

test("sıra maddesi yoksa eldeki sıra korunuyor, madde kaybolmuyor", async () => {
  await seedPack(null);
  const list = await listContentItems(PACK);
  expect([...list].sort()).toEqual([...SOURCE_ORDER].sort());
});

test("sıra listesinde olmayan yeni madde sona geliyor, düşmüyor", async () => {
  await seedPack(SOURCE_ORDER.slice(0, 2));
  const list = await listContentItems(PACK);
  expect(list.slice(0, 2)).toEqual(SOURCE_ORDER.slice(0, 2));
  expect(list).toContain("de-a2-alpha");
});

test("gövde okunup çözülüyor", async () => {
  await seedPack(SOURCE_ORDER);
  expect(await getContentItem<{ id: string }>(PACK, "de-a2-mu")).toEqual({ id: "de-a2-mu" });
});
