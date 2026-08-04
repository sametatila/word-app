import "server-only";
import { StackServerApp } from "@stackframe/stack";

export const stackEnabled = Boolean(
  process.env.NEXT_PUBLIC_STACK_PROJECT_ID &&
    process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY &&
    process.env.STACK_SECRET_SERVER_KEY,
);

/**
 * Neon Auth (Stack Auth). Anahtarlar yoksa uygulama demo modunda çalışır,
 * böylece veritabanı bağlanmadan da arayüz derlenip açılabilir.
 */
export const stackServerApp = stackEnabled
  ? new StackServerApp({
      tokenStore: "nextjs-cookie",
      urls: { signIn: "/handler/sign-in", afterSignIn: "/learn", afterSignUp: "/learn" },
    })
  : null;
