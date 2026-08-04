import "server-only";
import { stackServerApp, stackEnabled } from "@/stack";

/** Neon Auth kuruluysa gerçek kullanıcı, değilse tek kişilik demo kullanıcı. */
export async function getUserId(): Promise<string | null> {
  if (!stackEnabled || !stackServerApp) return "demo-user";
  const user = await stackServerApp.getUser();
  return user?.id ?? null;
}

export async function getUserInfo(): Promise<{ id: string; name: string | null } | null> {
  if (!stackEnabled || !stackServerApp) return { id: "demo-user", name: "Demo" };
  const user = await stackServerApp.getUser();
  if (!user) return null;
  return { id: user.id, name: user.displayName ?? user.primaryEmail ?? null };
}

export { stackEnabled };
