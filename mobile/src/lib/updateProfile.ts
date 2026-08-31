import { api } from "../api/client";

/**
 * Profil ayarlarını sunucuya yazar (POST /api/profile) — web'le aynı uç.
 * Native istek Origin göndermez, sunucunun sameOrigin kontrolü buna izin verir;
 * oturum çerezi otomatik gider. Değişen alanlar gönderilir. Başarıda true.
 */
export type ProfilePatch = {
  displayName?: string;
  dailyGoal?: number;
  newPerDay?: number;
  level?: string;
  course?: string;
  goal?: string;
  voice?: string;
};

export async function updateProfile(patch: ProfilePatch): Promise<boolean> {
  try {
    await api("/api/profile", { method: "POST", body: JSON.stringify(patch) });
    return true;
  } catch {
    return false;
  }
}
