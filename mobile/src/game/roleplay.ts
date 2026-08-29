import { api, API_BASE } from "../api/client";

/**
 * Sohbet (roleplay) — web /api/roleplay (DEPLOY'LU). Senaryo metnini SUNUCU
 * tutuyor; mobil yalnız lessonId + mesaj geçmişini yolluyor, asistanın Almanca
 * cevabı DÜZ METİN olarak akıyor (RN akışı parça parça okuyamadığı için tam
 * metni bekliyoruz). LLM yapılandırılmamışsa configured=false döner.
 */
export type ChatMsg = { role: "user" | "assistant"; content: string };

export async function roleplayConfigured(): Promise<boolean> {
  try { const r = await api<{ configured: boolean }>("/api/roleplay"); return !!r.configured; } catch { return false; }
}

export async function sendRoleplay(lessonId: string, messages: ChatMsg[]): Promise<string> {
  const res = await fetch(`${API_BASE}/api/roleplay`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ lessonId, messages, mode: "practice" }),
  });
  if (!res.ok) throw new Error(`roleplay ${res.status}`);
  return (await res.text()).trim();
}
