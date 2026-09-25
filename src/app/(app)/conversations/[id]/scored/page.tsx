import { notFound, redirect } from "next/navigation";
import { getUserInfo } from "@/lib/auth/server";
import { conversationQuota } from "@/lib/premium/unlock-view";
import { findConversation } from "@/lib/conversations";
import { conversationDisabled } from "@/lib/content/read";
import { candoForConversation } from "@/lib/cando-map";
import { candoById } from "@/lib/cando";
import { ConversationScored } from "@/components/conversations/conversation-scored";
import { titleMeta } from "@/lib/page-meta";
import { ensureProfile } from "@/lib/session";
import { localiseConversation, nativeCando } from "@/lib/conversations/native-server";
import { isNativeLang } from "@/lib/i18n/dict";

export const dynamic = "force-dynamic";

/** Dersin rol yapma sahnesi sınav olarak (WP-22): /conversations/[id]/scored. */
export const generateMetadata = titleMeta("scored.title");

export default async function ConversationScoredPage({ params }: { params: Promise<{ id: string }> }) {
  const who = await getUserInfo();
  if (!who) redirect("/login");
  const userId = who.id;
  const { id } = await params;
  const source = await findConversation(id);
  /* Ders kapatıldıysa sınavı da kapalı: aynı içeriğin türevi. */
  if (source && (await conversationDisabled(id))) notFound();
  if (!source) notFound();

  // Sahne, muhatap ve amaç dersin `chat` alanından geliyor; ekranın
  // tamamı öğrencinin ana dilinde olmalı — sınav sayfası da ders sayfasıyla
  // aynı çözücüden geçiyor.
  let conversation = source;
  let cando = candoForConversation(source).map((c) => candoById(c)?.tr).filter((t): t is string => Boolean(t));
  try {
    const profile = await ensureProfile(userId);
    const lang = isNativeLang(profile?.nativeLang) ? profile.nativeLang : null;
    conversation = await localiseConversation(source, lang);
    const en = await nativeCando(candoForConversation(source), lang);
    if (en) cando = en;
  } catch (err) {
    console.error("[scored]", err);
  }
  const quota = await conversationQuota(who, source).catch(() => null);
  return <ConversationScored conversation={conversation} cando={cando} quota={quota} />;
}
