import { ResetPasswordForm } from "@/components/reset-password-form";
import { titleMeta } from "@/lib/page-meta";

export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("resetpw.title");

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <ResetPasswordForm token={token ?? null} />;
}
