import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { titleMeta } from "@/lib/page-meta";

export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("authw.reset_title");

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
