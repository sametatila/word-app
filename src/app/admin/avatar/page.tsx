import type { Metadata } from "next";
import { headers } from "next/headers";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
import { activeAvatarIds, avatar3dBaseFor, avatarCatalogSeed, avatarRules, avatarUnlockMap, AVATAR_ALWAYS_ACTIVE, catalogParts, defaultActiveIds, premiumSetIds } from "@/lib/avatar-items";
import { PART_UNLOCKS } from "@/lib/avatar-unlocks";
import { avatarUsage, unlockOptions } from "@/lib/avatar-admin";
import { AvatarAdmin, type AdminPart } from "./avatar-admin";

export const metadata: Metadata = { title: "Avatar parçaları" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/avatar — avatar envanteri ve kuralları.
 *
 * Katalogdaki bütün parçalar burada: kullanıcıya gösterilip gösterilmediği
 * (yuva başına sınır), açılış koşulu, kaç kişinin taktığı / açtığı / kaça
 * ayrıca verildiği, önizleme ve tek hesaba verme/geri alma. Kapalı parçalar
 * silinmedi: hepsini birden açmak sonradan eklenecek her parçayı
 * değersizleştirirdi. Kayıt en geç yarım dakikada, istemcilerde
 * `/api/config` önbelleğiyle birkaç dakikada yürürlükte.
 */
export default async function AdminAvatarPage() {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Avatar parçaları" email={gate.email} />;
  /* İkon ve önizleme adresi isteğin geldiği adresten (`avatar3dBaseFor`):
     panel www'suz lernomi.app'ten açılınca ikonlar www'dan isteniyordu ve
     CSP (img-src 'self') hepsini engelliyordu. */
  const host = (await headers()).get("host");
  const base = avatar3dBaseFor(host);
  const [cat, active, rules, usage, seed, map] = await Promise.all([
    catalogParts().catch(() => null),
    activeAvatarIds(),
    avatarRules(),
    avatarUsage(),
    avatarCatalogSeed(host).catch(() => null),
    avatarUnlockMap(),
  ]);
  const parts: AdminPart[] = cat
    ? [...cat.values()].map((p) => ({
        id: p.id,
        slot: p.slot,
        rarity: p.nadir,
        name: p.adlar?.tr ?? p.ad,
        icon: base ? `${base}/${p.ikon}` : null,
        defaultUnlock: PART_UNLOCKS[p.id] ?? "",
      }))
    : [];
  const defaults = cat ? [...defaultActiveIds([...cat.values()], { exclude: premiumSetIds(cat, map), perSlot: rules.perSlot })] : [];
  return (
    <AvatarAdmin
      parts={parts}
      active={active ? [...active] : defaults}
      defaults={defaults}
      always={AVATAR_ALWAYS_ACTIVE}
      rules={rules}
      usage={usage}
      options={unlockOptions()}
      seed={seed}
      catalogOn={!!base && !!cat}
    />
  );
}
