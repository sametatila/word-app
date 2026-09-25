import "server-only";
import { aiConsentStateFor } from "@/lib/ai-consent";
import { unlockOverview, walkState, type UnlockOverview } from "./access";
import { tieredCopy, type PathQuota, type SurfaceView, type UnlockSurfaceKey } from "./unlock-copy";
import type { TieredUnlock, WalkUnlock } from "./unlock";

/**
 * KİLİT AÇMA GÖRÜNÜMÜNÜN SAYFA KESİTLERİ — web sunucu bileşenleri için.
 *
 * Karar `access.ts`te (`unlockOverview`), cümle `unlock-copy.ts`te; burası
 * yalnız bir sayfanın ihtiyacı olan parçayı kesiyor. Kapıyı tutan yine uç
 * (`/api/chat`, `/api/assess`): buradaki "kilitli" bir GÖSTERİM kararı, bir
 * yetki kararı değil — yanılırsa sunucu 403 ile düzeltir.
 *
 * KİLİT KİME ÇİZİLMİYOR (2026-09-25 kuralı): misafire ve yapay zekâ iznini
 * REDDETMİŞ kullanıcıya. İkisi Konuşma adımında maliyetsiz senaryolu sohbete
 * düşüyor; izin zorlanamaz (App Store 5.1.2(i)). Hakkı bitmiş ama izinli
 * kullanıcı senaryoluya düşmez, kilidi görür.
 */

function view(state: TieredUnlock | undefined, surface: UnlockSurfaceKey): SurfaceView | null {
  if (!state || state.premium) return null;
  return { copy: tieredCopy(state, surface), open: state.open, remaining: state.remaining };
}

async function overviewOf(userId: string): Promise<UnlockOverview | null> {
  return unlockOverview(userId).catch((err) => {
    console.error("[unlock-view]", err);
    return null;
  });
}

/** Patika ünitesinin Konuşma/Yazma kotası. Premium ve misafirde null. */
export async function pathQuota(user: { id: string; guest?: boolean }, level: string): Promise<PathQuota | null> {
  if (user.guest) return null;
  const [o, consent] = await Promise.all([overviewOf(user.id), aiConsentStateFor(user.id, "ai_text")]);
  const lv = o?.levels[level as keyof UnlockOverview["levels"]];
  if (!o || !lv || lv.conversation.premium) return null;
  const conv = consent === "declined" ? null : view(lv.conversation, "conv");
  return {
    convLockable: Boolean(conv && conv.remaining <= 0),
    ownedConversations: o.owned.conversation,
    conv,
    write: view(lv.pathWriting, "write"),
  };
}

/** Tek Konuşma adımının kilidi — ders sayfası girişte soruyor. */
export async function conversationQuota(
  user: { id: string; guest?: boolean },
  conversation: { id: string; level: string },
): Promise<{ locked: boolean; view: SurfaceView } | null> {
  const q = await pathQuota(user, conversation.level);
  if (!q?.conv) return null;
  const owned = q.ownedConversations.includes(conversation.id);
  return { locked: q.convLockable && !owned, view: q.conv };
}

/**
 * Beceriler / Patika Yazma alıştırmasının kotası (seviye ve yüzey alıştırmadan).
 * `owned`: bu alıştırmaya hak zaten düştü — kota bitse de değerlendirilir.
 */
export async function exerciseQuota(
  user: { id: string; guest?: boolean },
  ex: { id: string; level: string; unit?: number | null },
  kind: "writing" | "speaking",
): Promise<(SurfaceView & { owned: boolean }) | null> {
  if (user.guest) return null;
  const o = await overviewOf(user.id);
  const lv = o?.levels[ex.level as keyof UnlockOverview["levels"]];
  if (!o || !lv) return null;
  const path = ex.unit != null;
  if (path && kind !== "writing") return null;
  const v = path
    ? view(lv.pathWriting, "write")
    : kind === "writing" ? view(lv.skillWriting, "skill_write") : view(lv.skillSpeaking, "skill_speak");
  if (!v) return null;
  const owned = (path ? o.owned.pathWriting : o.owned.skills).includes(ex.id);
  return { ...v, owned };
}

/** Beceriler listesinin seviye kotası — yazma ve konuşma (B1+ monolog). */
export async function skillQuota(
  user: { id: string; guest?: boolean },
  level: string,
): Promise<{ writing: SurfaceView | null; speaking: SurfaceView | null } | null> {
  if (user.guest) return null;
  const o = await overviewOf(user.id);
  const lv = o?.levels[level as keyof UnlockOverview["levels"]];
  if (!lv) return null;
  return { writing: view(lv.skillWriting, "skill_write"), speaking: view(lv.skillSpeaking, "skill_speak") };
}

/** Yürüyüş modunun bugünkü tur durumu (misafir de sayılıyor). Okunamazsa null. */
export async function walkQuota(user: { id: string } | null): Promise<WalkUnlock | null> {
  if (!user) return null;
  return walkState(user.id).catch(() => null);
}
