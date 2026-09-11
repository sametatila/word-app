import { writeFileSync } from "node:fs";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, getTableName, is, like, or } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import * as schema from "@/lib/db/schema";

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

/** Kullanıcıya bağlı sütun adları — `check:purge` ile aynı küme. */
const USER_COLUMNS = [
  "userId", "fromUserId", "toUserId", "actorId", "requesterId", "addresseeId",
  "blockerId", "blockedId", "reporterId", "reportedId", "userAId", "userBId",
  "inviterUserId", "inviteeUserId",
] as const;

/* Tablo tanıma drizzle'ın KENDİ API'siyle: ilk yazımda `"_" in value` diye
   bakıyordum ve HİÇBİR tablo eşleşmedi (çıktı tek tablo çıktı, fark oradan
   anlaşıldı) — drizzle tabloyu sembolle işaretliyor, `_` alanıyla değil. */
function isTable(v: unknown): v is Record<string, unknown> {
  return is(v, PgTable);
}

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

  /* Kimliği e-postadan çöz: talep hesabın e-postasından geliyor (politika §10),
     yani elimizde çoğu zaman userId değil e-posta var. */
  const [row] = await db
    .select({ id: schema.user.id, email: schema.user.email, name: schema.user.name })
    .from(schema.user)
    .where(or(eq(schema.user.id, who), eq(schema.user.email, who)))
    .limit(1);
  if (!row) {
    console.error(`Kullanıcı bulunamadı: ${who}`);
    process.exit(1);
  }
  const userId = row.id;

  const out: Record<string, unknown> = {
    _meta: {
      /* Üretim tarihi ve kapsam çıktının İÇİNDE: talebi cevaplayan kişi neyi
         gönderdiğini, alıcı da neyi aldığını belgeleyebilsin. */
      generatedAt: new Date().toISOString(),
      userId,
      email: row.email,
      name: row.name,
      note: "KVKK m.11 / GDPR m.15-20 kapsaminda makine okunur kopya.",
    },
  };

  let tableCount = 0;
  for (const value of Object.values(schema)) {
    if (!isTable(value)) continue;
    const columns = USER_COLUMNS.filter((c) => c in value);
    if (!columns.length) continue;
    const conditions = columns.map((c) => eq(value[c] as never, userId as never));
    const rows = await db
      .select()
      .from(value as never)
      .where(conditions.length === 1 ? conditions[0] : or(...conditions));
    out[getTableName(value as never)] = rows;
    tableCount++;
  }

  /* `rate_limits` kullanıcıya metin anahtarıyla bağlı, sütunla değil —
     `check:purge` de bu istisnayı adıyla taşıyor. */
  out["rate_limits"] = await db
    .select()
    .from(schema.rateLimits)
    .where(like(schema.rateLimits.key, `%:${userId}`));
  tableCount++;

  const path = outArg ?? `user-${userId}.json`;
  writeFileSync(path, JSON.stringify(out, null, 2));
  const total = Object.entries(out)
    .filter(([k]) => k !== "_meta")
    .reduce((n, [, v]) => n + (Array.isArray(v) ? v.length : 0), 0);
  console.log(`${path} yazıldı — ${tableCount} tablo, ${total} satır`);
  await pool.end();
}

void main().catch((e: unknown) => {
  const err = e as { message?: string; cause?: { message?: string } };
  console.error("HATA:", err?.message, "| sebep:", err?.cause?.message);
  process.exit(1);
});
