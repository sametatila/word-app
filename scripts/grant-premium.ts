/**
 * Elle premium verme / kaldırma — sunucuda çalışan işletim aracı.
 *
 *   npm run grant:premium -- <e-posta|kimlik> <gün> [--yes] [--note "..."]
 *   npm run grant:premium -- <e-posta|kimlik> revoke --yes
 *
 * NEDEN VAR. Günlük kullanım paneldedir (`/admin/premium` → "Hesap yetkisi");
 * orası tarayıcıdan, admin oturumuyla çalışıyor. Bu araç tarayıcı oturumu
 * OLMADAN, doğrudan sunucuda çalıştırmak için: mağaza inceleme hesabını
 * hazırlamak gibi kurulum işleri, ya da panelin kendisine ulaşılamadığı an.
 *
 * VARSAYILAN OLARAK YAZMAZ. `--yes` verilmedikçe yalnız hesabın şu anki
 * durumunu ve yapılacak işi basar. Üretim veritabanına yazan bir aracın
 * kazayla çalışması, yanlış hesaba premium vermek demek.
 *
 * NEDEN `tsconfig.ops.json`. Test betikleri `@/lib/db`yi sahte bir veritabanına
 * eşliyor (`tsconfig.e2e.json`) — burada GERÇEK veritabanı gerekiyor, o yüzden
 * yalnız `server-only` boş modüle eşleniyor. `DATABASE_URL` çağıranın
 * sorumluluğunda; Next.js dışında `.env` kendiliğinden okunmuyor.
 *
 * YETKİ BONUS OLARAK YAZILIR (`grantPremiumDays`). Mağaza alanlarına
 * dokunulmaz: hesap RevenueCat/Play/Apple tarafında abone GÖRÜNMEZ ve bir
 * sonraki yenileme bu süreyi silmez. Her işlem `premium_grants` defterine
 * `actor` ile birlikte düşer.
 */
import { findPremiumAccount, grantPremiumDays, revokeEntitlement, type PremiumAccount } from "../src/lib/premium";

function flag(name: string): string | null {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? (process.argv[i + 1] ?? "") : null;
}

function show(label: string, a: PremiumAccount): void {
  const until = a.until ? new Date(a.until).toISOString().slice(0, 16).replace("T", " ") : "—";
  console.log(`\n  ${label}`);
  console.log(`    ${a.displayName ?? a.name} · ${a.email}`);
  console.log(`    ${a.userId}`);
  console.log(`    ${a.premium ? `PREMIUM · ${until} · kaynak: ${a.source}` : "ücretsiz"}`);
  if (a.bonusDaysPending > 0) console.log(`    bekleyen bonus: ${a.bonusDaysPending} gün (ilk yetki okumasında başlar)`);
  if (a.store) console.log(`    mağaza: ${a.store.provider ?? "?"} · ${a.store.platform ?? "?"} · ${a.store.state ?? "?"}`);
}

async function main(): Promise<void> {
  const query = process.argv[2];
  const action = process.argv[3];
  if (!query || !action) {
    console.error("kullanım: npm run grant:premium -- <e-posta|kimlik> <gün|revoke> [--yes] [--note \"...\"] [--actor \"...\"]");
    process.exit(1);
  }

  const before = await findPremiumAccount(query);
  if (!before) {
    console.error(`hesap bulunamadı: ${query}`);
    process.exit(1);
  }
  show("ŞU AN", before);

  const revoke = action === "revoke";
  const days = revoke ? 0 : Number(action);
  if (!revoke && (!Number.isFinite(days) || days <= 0)) {
    console.error(`gün sayısı geçersiz: ${action}`);
    process.exit(1);
  }

  const note = flag("note") ?? null;
  const actor = flag("actor") || "cli";
  const plan = revoke ? "yetki KALDIRILACAK" : `${days} gün premium EKLENECEK`;
  console.log(`\n  yapılacak: ${plan} (actor: ${actor}${note ? `, not: ${note}` : ""})`);

  if (process.argv.indexOf("--yes") === -1) {
    console.log("\n  kuru çalışma — hiçbir şey yazılmadı. Uygulamak için --yes ekle.\n");
    process.exit(0);
  }

  if (revoke) await revokeEntitlement(before.userId, actor, note ?? undefined);
  else await grantPremiumDays(before.userId, days, { actor, note });

  const after = await findPremiumAccount(before.userId);
  if (after) show("SONRA", after);
  console.log();
  process.exit(0);
}

/*
  Hata ham yığın izi olarak DÜŞMESİN: bu araç sunucuda, çoğu zaman aceleyle
  çalıştırılıyor ve en sık hata tek bir eksik değişken. Yığın izi o cümleyi
  gizliyordu.
*/
void main().catch((err: unknown) => {
  console.error(`\n  hata: ${err instanceof Error ? err.message : String(err)}`);
  if (!process.env.DATABASE_URL) {
    console.error("  DATABASE_URL verilmedi. Sunucuda:");
    console.error("    export DATABASE_URL=$(grep '^DATABASE_URL=' /opt/lernomi/.env | cut -d= -f2-)");
  }
  console.error();
  process.exit(1);
});
