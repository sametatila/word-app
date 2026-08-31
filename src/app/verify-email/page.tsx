import { VerifyEmailNotice } from "@/components/verify-email-notice";

export const dynamic = "force-dynamic";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; status?: string }>;
}) {
  const { email, status } = await searchParams;
  return <VerifyEmailNotice email={email ?? null} reason={status === "unverified" ? "blocked" : "new"} />;
}
