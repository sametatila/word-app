import { VerifyEmailNotice } from "@/components/verify-email-notice";
import { titleMeta } from "@/lib/page-meta";

export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("verify.title");

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; status?: string }>;
}) {
  const { email, status } = await searchParams;
  return <VerifyEmailNotice email={email ?? null} reason={status === "unverified" ? "blocked" : "new"} />;
}
