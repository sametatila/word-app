import "server-only";
import { randomInt } from "node:crypto";
import { and, desc, eq, isNull, or, sql, gt } from "drizzle-orm";
import { db } from "@/lib/db";
import { promoCodes, promoRedemptions } from "@/lib/db/schema";
import { grantBonus, daysToMinutes } from "./entitlement";

/**
 * Promo kodları — panelden üretilir, bağlantıyla dağıtılır, kullanıcı premium kazanır.
 *
 * Kod bir MAĞAZA kuponu değil, bizim kendi yetkimiz. Bu ayrım önemli: Apple ve
 * Google'ın kendi promosyon kodları da var ama onlar aboneliğe bağlı, tek
 * platformda geçerli ve panelinden yönetiliyor. Bizimki üç platformda da
 * geçerli, süresi bizim, muhasebesi bizde ve sağlayıcı değişse bile yaşıyor.
 *
 * KARIŞAN KARAKTER YOK. Kod telefonda okunuyor ve elle yazılıyor: 0/O, 1/I/L
 * alfabede hiç geçmiyor. Okurken küçük harf ve tire serbest — `normalize`
 * ikisini de yutuyor, çünkü "kodu yanlış yazdım" en pahalı destek çağrısı.
 */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** Kullanıcının yazdığını kanonik biçime çevirir: büyük harf, ayraçsız. */
export function normalizeCode(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function randomCode(length = 8): string {
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

export type NewCodeOptions = {
  /** Kaç gün premium versin. */
  days: number;
  /** Kaç kod üretilsin (tek tek dağıtılacak kodlar için). */
  count?: number;
  /** Her kod kaç kişide geçerli olsun (kampanya kodu için > 1). */
  maxUses?: number;
  /** Kodun kendi son kullanma tarihi. */
  expiresAt?: Date | null;
  campaign?: string | null;
  note?: string | null;
  createdBy?: string | null;
  /** Belirli bir kod metni istenirse (kampanya için okunur kod: "OKUL2026"). */
  code?: string | null;
};

/**
 * Kod üretir. Çakışma olasılığı düşük ama sıfır değil; benzersiz indeks
 * çarparsa yeni kod denenir — sessizce eksik kod üretmektense birkaç deneme.
 */
export async function createCodes(opts: NewCodeOptions): Promise<string[]> {
  const days = Math.max(1, Math.round(opts.days));
  const count = Math.min(500, Math.max(1, Math.round(opts.count ?? 1)));
  const maxUses = Math.max(1, Math.round(opts.maxUses ?? 1));
  const made: string[] = [];

  for (let i = 0; i < count; i++) {
    const fixed = opts.code ? normalizeCode(opts.code) : null;
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = fixed ?? randomCode();
      try {
        await db.insert(promoCodes).values({
          code,
          days,
          maxUses,
          expiresAt: opts.expiresAt ?? null,
          campaign: opts.campaign ?? null,
          note: opts.note ?? null,
          createdBy: opts.createdBy ?? null,
        });
        made.push(code);
        break;
      } catch {
        // Sabit kod istenmişse tekrar denemenin anlamı yok: aynı kod zaten var.
        if (fixed) throw new Error("code_exists");
      }
    }
  }
  return made;
}

export type RedeemResult =
  | { ok: true; days: number; code: string }
  | { ok: false; reason: "not_found" | "disabled" | "expired" | "used_up" | "already" };

/**
 * Kodu kullanıcıya uygular.
 *
 * YARIŞ KORUMASI: sayaç koşullu UPDATE ile artırılıyor (`uses < max_uses`) ve
 * satır dönmezse kod tükenmiş sayılıyor. İki kişinin son hakkı aynı anda
 * kullanması hâlinde yalnız biri kazanır. Önce okuyup sonra artırmak bu yarışı
 * kaybederdi ve kampanya kodları tam olarak aynı anda paylaşılıyor.
 *
 * (kod, kullanıcı) benzersiz indeksi de ikinci koruma: aynı kişi çok
 * kullanımlık bir kodu tekrar tekrar bozduramaz.
 */
export async function redeemCode(userId: string, input: string): Promise<RedeemResult> {
  const code = normalizeCode(input);
  if (!code) return { ok: false, reason: "not_found" };

  const [row] = await db.select().from(promoCodes).where(eq(promoCodes.code, code)).limit(1);
  if (!row) return { ok: false, reason: "not_found" };
  if (row.disabledAt) return { ok: false, reason: "disabled" };
  if (row.expiresAt && row.expiresAt.getTime() <= Date.now()) return { ok: false, reason: "expired" };

  const [already] = await db
    .select({ id: promoRedemptions.id })
    .from(promoRedemptions)
    .where(and(eq(promoRedemptions.codeId, row.id), eq(promoRedemptions.userId, userId)))
    .limit(1);
  if (already) return { ok: false, reason: "already" };

  const claimed = await db
    .update(promoCodes)
    .set({ uses: sql`${promoCodes.uses} + 1` })
    .where(and(eq(promoCodes.id, row.id), sql`${promoCodes.uses} < ${promoCodes.maxUses}`))
    .returning({ id: promoCodes.id });
  if (claimed.length === 0) return { ok: false, reason: "used_up" };

  const minutes = daysToMinutes(row.days);
  try {
    await db.insert(promoRedemptions).values({ codeId: row.id, userId, minutes });
  } catch {
    // Benzersiz indeks çarptı (aynı anda iki istek): hakkı geri ver.
    await db.update(promoCodes).set({ uses: sql`${promoCodes.uses} - 1` }).where(eq(promoCodes.id, row.id));
    return { ok: false, reason: "already" };
  }

  await grantBonus(userId, minutes, { source: "promo", ref: code, actor: "promo", note: `${row.days} gün` });
  return { ok: true, days: row.days, code };
}

export type CodeRow = {
  id: number;
  code: string;
  days: number;
  maxUses: number;
  uses: number;
  campaign: string | null;
  note: string | null;
  expiresAt: Date | null;
  disabledAt: Date | null;
  createdAt: Date;
};

export async function listCodes(limit = 200): Promise<CodeRow[]> {
  return db.select().from(promoCodes).orderBy(desc(promoCodes.createdAt)).limit(limit);
}

/** Kod SİLİNMEZ, kapatılır: kullananların geçmişi ve muhasebesi ayakta kalsın. */
export async function setCodeDisabled(id: number, disabled: boolean): Promise<void> {
  await db.update(promoCodes).set({ disabledAt: disabled ? new Date() : null }).where(eq(promoCodes.id, id));
}

/** Kullanılabilir kod sayısı — panelde "kalan" göstergesi. */
export async function activeCodeCount(): Promise<number> {
  const [row] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(promoCodes)
    .where(
      and(
        isNull(promoCodes.disabledAt),
        sql`${promoCodes.uses} < ${promoCodes.maxUses}`,
        or(isNull(promoCodes.expiresAt), gt(promoCodes.expiresAt, new Date())),
      ),
    );
  return row?.n ?? 0;
}
