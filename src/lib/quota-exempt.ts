import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * GÜNLÜK SOHBET SINIRINDAN MUAF HESAPLAR (Samet, 2026-10-09: "muaf tutulmalı ama
 * sadece bu hesap"). QA kullanıcısı (`qa@lernomi.app`, ~/Workspace/lernomi-qa)
 * bütün konuşma adımlarını art arda tükettiği için günde 300 turluk adil kullanım
 * sınırına ulaşıyordu; o andan sonra sohbet adımları test edilemiyordu.
 *
 * Liste env'de (`CHAT_QUOTA_EXEMPT_EMAILS`, virgülle), kodda değil: CAPTCHA
 * muafiyetiyle aynı kalıp (`lib/auth/captcha`). DAR: yalnız sohbet turu sınırı;
 * konuşma tanıma, telaffuz ve Premium hakları aynen geçerli. Sayaç işlemeye devam
 * ediyor (maliyet görünür kalsın); adres yalnız sınır AŞILDIĞINDA sorgulanıyor,
 * öteki kullanıcıların isteğine ek sorgu yok.
 */
const exempt = new Set(
  (process.env.CHAT_QUOTA_EXEMPT_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
);

export async function isChatQuotaExempt(userId: string): Promise<boolean> {
  if (!exempt.size) return false;
  try {
    const res = await db.execute(sql`select email from "user" where id = ${userId} limit 1`);
    const row = (res as unknown as { rows?: { email: string | null }[] }).rows?.[0];
    return !!row?.email && exempt.has(row.email.trim().toLowerCase());
  } catch {
    return false;
  }
}
