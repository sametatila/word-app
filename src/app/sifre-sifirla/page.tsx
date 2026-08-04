import { ResetPasswordForm } from "@/components/reset-password-form";

export const dynamic = "force-dynamic";

export default async function SifreSifirlaPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <ResetPasswordForm token={token ?? null} />;
}
