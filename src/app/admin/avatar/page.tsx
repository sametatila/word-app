import type { Metadata } from "next";
import { headers } from "next/headers";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
import { activeAvatarIds, avatar3dBaseFor, AVATAR_ACTIVE_PER_SLOT, AVATAR_ALWAYS_ACTIVE, catalogParts, defaultActiveIds, unlockHint } from "@/lib/avatar-items";
import { PART_UNLOCKS } from "@/lib/avatar-unlocks";
import { AvatarAdmin, type AdminPart } from "./avatar-admin";

export const metadata: Metadata = { title: "Avatar parçaları" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/avatar — avatar envanteri.
 *
 * Katalogdaki bütün parçalar burada; kullanıcıya yuva başına en fazla
 * `AVATAR_ACTIVE_PER_SLOT` tanesi gösteriliyor. Kapalı parçalar silinmedi:
 * hepsini birden açmak sonradan eklenecek her parçayı değersizleştirirdi,
 * zamanla buradan açılıyor. Kayıt en geç yarım dakikada, istemcilerde
 * `/api/config` önbelleğiyle birkaç dakikada yürürlükte.
 */
export default async function AdminAvatarPage() {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Avatar parçaları" email={gate.email} />;
  /* İkon adresi isteğin geldiği adresten (`avatar3dBaseFor`): panel www'suz
     lernomi.app'ten açılınca ikonlar www'dan isteniyordu ve CSP (img-src
     'self') hepsini engelliyordu; küçük resimlerin hiçbiri görünmüyordu. */
  const base = avatar3dBaseFor((await headers()).get("host"));
  const cat = await catalogParts().catch(() => null);
  const parts: AdminPart[] = cat
    ? [...cat.values()].map((p) => ({
        id: p.id,
        slot: p.slot,
        rarity: p.nadir,
        name: p.adlar?.tr ?? p.ad,
        icon: base ? `${base}/${p.ikon}` : null,
        unlock: PART_UNLOCKS[p.id] ? unlockHint("tr", PART_UNLOCKS[p.id]) : null,
      }))
    : [];
  const active = await activeAvatarIds();
  const defaults = cat ? [...defaultActiveIds([...cat.values()])] : [];
  return (
    <AvatarAdmin
      parts={parts}
      active={active ? [...active] : defaults}
      defaults={defaults}
      always={AVATAR_ALWAYS_ACTIVE}
      perSlot={AVATAR_ACTIVE_PER_SLOT}
      catalogOn={!!base}
    />
  );
}
