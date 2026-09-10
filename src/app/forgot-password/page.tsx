import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { titleMeta } from "@/lib/page-meta";
import { turnstileSiteKey } from "@/lib/auth/captcha";

export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("authw.reset_title");

export default function ForgotPasswordPage() {
  // Anahtar SUNUCUDA okunuyor: sunucudaki eklentiyle aynı env değişkenine
  // bağlı kalsın diye (bkz. lib/auth/captcha.ts).
  return <ForgotPasswordForm turnstileSiteKey={turnstileSiteKey} />;
}
