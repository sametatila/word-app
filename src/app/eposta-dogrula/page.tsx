import { VerifyEmailNotice } from "@/components/verify-email-notice";

export const dynamic = "force-dynamic";

export default async function EpostaDogrulaPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return <VerifyEmailNotice email={email ?? null} />;
}
