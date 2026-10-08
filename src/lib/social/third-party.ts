import { inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { blockedSet } from "./blocks";
import { friendIds } from "./stats";

/**
 * OLAYDA ADI GEÇEN ÜÇÜNCÜ KİŞİ ("A, B ile arkadaş oldu"daki B; ortak görevin
 * ortağı). Olay yükü yazılırken kişinin adını taşıyor; maske OKURKEN
 * uygulanıyor ki görünürlük sonradan değişse de bugünkü tercih geçerli olsun
 * (gizlilik §4a, güvenlik denetimi O14).
 *
 * 2026-10-07 genişletmesi: maske yalnız `friendId`e bakıyor ve yalnız akışta
 * çalışıyordu. Ortak görev ortağı (`partnerId`) hiç maskelenmiyor, bildirim
 * kutusu olay yükünü ham döndürüyordu, engel de hesaba katılmıyordu.
 */
const KEYS = [
  { id: "friendId", fields: ["friendId", "friendName", "friendUsername"] },
  { id: "partnerId", fields: ["partnerId", "partnerName", "partnerUsername"] },
] as const;

function idsOf(payload: unknown): string[] {
  const p = (payload ?? {}) as Record<string, unknown>;
  return KEYS.map((k) => p[k.id]).filter((v): v is string => typeof v === "string" && v.length > 0);
}

/**
 * Bakan için gizli üçüncü kişiler: profili gizli, "yalnız arkadaşlar" olup
 * bakanın arkadaşı olmayan, ya da bakanla arasında (iki yönde de) engel olan.
 */
export async function hiddenThirdParties(me: string, payloads: unknown[], myFriends?: string[]): Promise<Set<string>> {
  const others = [...new Set(payloads.flatMap(idsOf))].filter((id) => id !== me);
  if (!others.length) return new Set();
  const [friends, blocked, rows] = await Promise.all([
    myFriends ? Promise.resolve(myFriends) : friendIds(me),
    blockedSet(me),
    db.select({ userId: profiles.userId, visibility: profiles.visibility }).from(profiles).where(inArray(profiles.userId, others)),
  ]);
  const friendSet = new Set(friends);
  const vis = new Map(rows.map((r) => [r.userId, r.visibility]));
  return new Set(
    others.filter((id) => {
      if (blocked.has(id)) return true;
      const v = vis.get(id);
      return v !== "public" && !(v === "friends" && friendSet.has(id));
    }),
  );
}

export function maskThirdParty(payload: Record<string, unknown>, hidden: Set<string>): Record<string, unknown> {
  let out = payload;
  for (const k of KEYS) {
    const id = payload[k.id];
    if (typeof id === "string" && hidden.has(id)) {
      out = { ...out };
      for (const f of k.fields) if (f in out) out[f] = null;
    }
  }
  return out;
}
