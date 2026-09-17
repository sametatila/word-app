import { writeFileSync } from "node:fs";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/db/schema";
import { buildUserExport } from "@/lib/account/export";

/**
 * KVKK m.11 / GDPR m.15-20: bir kullanıcının verisinin MAKİNE OKUNUR kopyası.
 *
 * Gizlilik politikası §10 taşınabilirliği e-posta talebiyle karşılıyor ve
 * "en geç 30 gün içinde ücretsiz" diyor. Talep geldiğinde çıkarılacak veri 35
 * tabloya dağılmış durumda; elle SQL yazmak hem yavaş hem de EKSİK bırakmaya
 * açık — nitekim silme tarafında tam bu oldu (bkz. web-parity §11.306: sekiz
 * tablo arkada kalıyordu ve dosyanın yorumu "silinmeyen tek şey yok" diyordu).
 *
 * Bu betik tablo listesini ŞEMADAN türetiyor: yeni bir kullanıcı tablosu
 * eklendiğinde çıktıya kendiliğinden giriyor. `check:purge` silme tarafında
 * aynı listeyi kolluyor; ikisi aynı kaynağa bakıyor.
 *
 * SALT OKUNUR. Tek bir yazma ifadesi yok ve olmamalı: bu araç bir talebi
 * cevaplamak için var, veriyi değiştirmek için değil (bkz. AGENTS.md — üretim
 * veritabanına yazmak ayrıca sorulur, okuma serbest).
 *
 * `DATABASE_URL` ORTAMDAN bekleniyor, `dotenv` ile okunmuyor. Sebep ölçüldü:
 * sunucuda `dotenv`in ayrıştırdığı değer bağlantıyı kurmuyor ("client password
 * must be a string"), aynı satırı kabuk `set -a; . .env` ile verdiğinde
 * kuruyor. Betik üretimde nasıl çalışacaksa (env hazır) öyle bekliyor;
 * gizli değeri kendi ayrıştırmaya çalışmıyor.
 *
 * Kullanım (sunucuda):
 *   cd /opt/lernomi/$(cat /opt/lernomi/active)
 *   set -a; . /opt/lernomi/.env; set +a
 *   ./node_modules/.bin/tsx --tsconfig scripts/tsconfig.e2e.json \
 *       scripts/export-user.ts <e-posta|userId> cikti.json
 *
 * Yerelde: `npm run export:user -- <e-posta|userId> [cikti.json]`
 *
 * HAVUZU KENDİ KURUYOR, `@/lib/db` PROXY'SİNİ KULLANMIYOR. Ölçüldü: sunucuda
 * tsx altında o yol "client password must be a string" veriyor, aynı ortamda
 * ham `pg` sorgusu çalışıyor — modülün iki kez çözülmesinden kaynaklanan
 * klasik ikili paket tuzağı. Betik kısa ömürlü ve tek sorgu dizisi çalıştırıyor,
 * havuzu kendi kurmasının maliyeti yok.
 */

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL tanımlı değil (sunucuda: set -a; . /opt/lernomi/.env; set +a)");
    process.exit(1);
  }
  const pool = new Pool({ connectionString: url, max: 2 });
  const db = drizzle(pool, { schema });

  const [who, outArg] = process.argv.slice(2);
  if (!who) {
    console.error("Kullanım: npm run export:user -- <e-posta|userId> [cikti.json]");
    process.exit(1);
  }

  // Mantık panelle ORTAK (lib/account/export): iki yol aynı kapsamı üretsin.
  const result = await buildUserExport(db, who);
  if (!result) {
    console.error(`Kullanıcı bulunamadı: ${who}`);
    process.exit(1);
  }
  const userId = (result.data._meta as { userId: string }).userId;
  const path = outArg ?? `user-${userId}.json`;
  writeFileSync(path, JSON.stringify(result.data, null, 2));
  console.log(`${path} yazıldı — ${result.tables} tablo, ${result.rows} satır`);
  await pool.end();
}

void main().catch((e: unknown) => {
  const err = e as { message?: string; cause?: { message?: string } };
  console.error("HATA:", err?.message, "| sebep:", err?.cause?.message);
  process.exit(1);
});
