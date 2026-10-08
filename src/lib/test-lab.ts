import { sql, type SQL, type SQLWrapper } from "drizzle-orm";

/**
 * FIREBASE TEST LAB HESAPLARI ÖLÇÜMDEN DÜŞÜYOR — tek tanım.
 *
 * Play'in yayın öncesi raporu (pre-launch report) her yeni build'i Firebase
 * Test Lab cihazlarında robotlarla çalıştırıyor. Robotlar Google test
 * hesaplarıyla giriyor (ör. `…@gmail.com`, UA `okhttp`, Google IP'leri) ve
 * misafir açıyor: kullanıcı listesi, kayıt, aktif kullanıcı ve huni sayıları
 * gerçek olmayan hesaplarla şişiyordu.
 *
 * TANIMA, iki yol; biri yeter:
 *   - Cihaz: Test Lab cihazında sistem ayarı `firebase.test.lab` "true" (mobil
 *     `lib/integrity` `isTestLabDevice`), mobil her isteğe `x-lernomi-test-lab: 1`
 *     ekliyor. Build 15–22'de hiçbir robotta tetiklenmedi (2026-10-08).
 *   - Ağ: Android isteği Google'ın kendi adreslerinden (`lib/google-networks`).
 * `/api/me` `user_clients.test_lab`i yapışkan olarak true yapıyor
 * (`lib/app-control` recordClient). Hesap, HERHANGİ bir platform satırı
 * işaretliyse Test Lab sayılıyor.
 *
 * BU DOSYA HİÇBİR ŞEY SİLMİYOR. Silme ayrı ve dar: 7 gündür sessiz, ertesi gün
 * hiç dönmemiş, satın alması olmayan işaretli hesap günlük cron'da gidiyor
 * (`lib/account/test-lab-cleanup`, Samet 2026-10-08). Başlığı herkes
 * gönderebilir; gönderen yalnız kendi hesabını etkiler.
 *
 * Yalnız drizzle'a bağlı (veritabanı istemcisi yok): her yerden ve
 * veritabanısız testlerden içe aktarılabilir.
 */

/**
 * Koşul: `userIdColumn`un sahibi Test Lab hesabı DEĞİL. Kullanıcı satırı ya da
 * sürüm kaydı olmayan kimlik (web kullanıcısı, eski sürüm) gerçek sayılıyor.
 *
 * DİKKAT: sütun NİTELİKLİ verilmeli (`e.user_id`, `events.user_id`). Çıplak
 * `user_id` alt sorgunun içinde `user_clients`in kendi sütununa bağlanır ve
 * koşul sessizce "hiç test lab hesabı yok mu" sorusuna döner.
 */
export function notTestLab(userIdColumn: SQLWrapper | string): SQL {
  const col = typeof userIdColumn === "string" ? sql.raw(qualified(userIdColumn)) : userIdColumn;
  return sql`not exists (select 1 from user_clients tl where tl.user_id = ${col} and tl.test_lab)`;
}

/** Tek kullanıcı için seçilecek ifade (panel satırları, rozet). */
export function isTestLabSql(userIdColumn: SQLWrapper | string): SQL {
  const col = typeof userIdColumn === "string" ? sql.raw(qualified(userIdColumn)) : userIdColumn;
  return sql`exists (select 1 from user_clients tl where tl.user_id = ${col} and tl.test_lab)`;
}

/**
 * ÖLÇÜM TABLOSU: Test Lab hesaplarının satırları ayıklanmış tablo, aynı adla
 * ya da verilen takma adla. Panel sorguları `from events` yerine
 * `from ${real("events")}` yazıyor; sorgunun geri kalanı (sütun adları,
 * `events.kind`, takma adlar) olduğu gibi kalıyor. Postgres basit alt sorguyu
 * açıp dizinleri yine kullanıyor.
 */
const USER_COLUMN: Record<MetricTable, string> = {
  events: "user_id",
  profiles: "user_id",
  daily_stats: "user_id",
  user_words: "user_id",
  reviews: "user_id",
  user: "id",
};
export type MetricTable = "events" | "profiles" | "daily_stats" | "user_words" | "reviews" | "user";

export function real(table: MetricTable, alias: string = table): SQL {
  const t = table === "user" ? `"user"` : table;
  const a = alias === "user" ? `"user"` : alias;
  return sql.raw(`(select * from ${t} where not exists (select 1 from user_clients tl where tl.user_id = ${t}.${USER_COLUMN[table]} and tl.test_lab)) ${a}`);
}

function qualified(col: string): string {
  if (!/^[a-z_"]+\.[a-z_"A-Z]+$/.test(col)) throw new Error(`test-lab: nitelikli sütun gerekli (tablo.sütun), gelen: ${col}`);
  return col;
}
