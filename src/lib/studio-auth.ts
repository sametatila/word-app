import "server-only";
import { NextResponse } from "next/server";
import { getAdminSessionInfo, getUserEmail } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { adminPreview, logAdminAction, type AdminWriter } from "@/lib/admin";

/**
 * STÜDYO ERİŞİMİ (lernomi.app/studio — sosyal medya videoları, 2026-10-09).
 *
 * İki rol:
 *   admin    ADMIN_EMAILS — panelin tamamı + stüdyo
 *   editor   SOCIAL_EDITOR_EMAILS — YALNIZ stüdyo (Samet: "yalnız sosyal medya"). Kullanıcı listesi, gelir,
 *            şikâyetler, sunucu gibi kişisel veri içeren ekranlara erişemez: /admin kapısı (`adminGate`) bu listeye
 *            bakmaz, stüdyo ayrı bir ağaçta (`src/app/studio`), yalnız sosyal medya tablolarını okur/yazar.
 *
 * Kurallar admin kapısıyla aynı: e-posta listede ve DOĞRULANMIŞ olmalı; her yazma aynı köken + hesapta iki adımlı
 * doğrulama ister ve `admin_audit`e düşer (eylem `studio.*`, rol detayda). Liste ortamdan okunur, koda gömülü
 * adres yok (depo herkese açık).
 */
const list = (v: string | undefined) => Array.from(new Set((v ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)));
const ADMINS = list(process.env.ADMIN_EMAILS);
const EDITORS = list(process.env.SOCIAL_EDITOR_EMAILS);

export type StudioRole = "admin" | "editor";
const roleOf = (email: string | null): StudioRole | null => {
  if (!email) return null;
  const e = email.toLowerCase();
  return ADMINS.includes(e) ? "admin" : EDITORS.includes(e) ? "editor" : null;
};

/** Okuma kapısı. */
export async function studioGate(): Promise<{ ok: boolean; email: string | null; role: StudioRole | null }> {
  if (adminPreview()) return { ok: true, email: "onizleme@yerel", role: "admin" };
  const { email, verified } = await getUserEmail();
  const role = verified ? roleOf(email) : null;
  return { ok: role !== null, email, role };
}

export type StudioWriter = AdminWriter & { role: StudioRole };

/** Yazma kapısı: aynı köken + rol + doğrulanmış e-posta + iki adımlı doğrulama. */
export async function studioWriteGate(req: Request): Promise<{ ok: true; writer: StudioWriter } | { ok: false; response: NextResponse }> {
  const deny = (error: string, status = 403) => ({ ok: false as const, response: NextResponse.json({ error }, { status }) });
  if (!sameOrigin(req)) return deny("forbidden");
  const s = await getAdminSessionInfo();
  const role = s?.verified ? roleOf(s.email) : null;
  if (!s || !role) return deny("forbidden");
  if (!s.twoFactor) return deny("admin_2fa_required");
  return { ok: true, writer: { email: s.email, userId: s.userId, ip: req.headers.get("x-real-ip"), role } };
}

/** Stüdyo işlem kaydı (`admin_audit`, eylem `studio.<ad>`). */
export function logStudioAction(w: StudioWriter, action: string, target: string | null, detail?: Record<string, unknown>): Promise<void> {
  return logAdminAction(w, `studio.${action}`, target, { role: w.role, ...detail });
}
