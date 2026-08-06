import { VerifyEmailNotice } from "@/components/verify-email-notice";

export const dynamic = "force-dynamic";

export default async function EpostaDogrulaPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; durum?: string }>;
}) {
  const { email, durum } = await searchParams;
  return <VerifyEmailNotice email={email ?? null} reason={durum === "dogrulanmadi" ? "blocked" : "new"} />;
}
