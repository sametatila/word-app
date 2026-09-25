import { notFound, redirect } from "next/navigation";
import { getUserInfo } from "@/lib/auth/server";
import { conversationQuota } from "@/lib/premium/unlock-view";
import { findConversation, conversationIndexInLevel } from "@/lib/conversations";
import { characterFor } from "@/lib/conversations/characters";
import { ConversationPlayer, type ConversationExtras } from "@/components/conversations/conversation-player";
import { ensureProfile } from "@/lib/session";
import { nextConversation } from "@/lib/conversations/progress";
import { candoForConversation } from "@/lib/cando-map";
import { candoById } from "@/lib/cando";
import { titleMeta } from "@/lib/page-meta";
import { localiseConversation, nativeTitle, nativeCando } from "@/lib/conversations/native-server";
import { isNativeLang } from "@/lib/i18n/dict";
import { conversationDisabled } from "@/lib/content/read";

export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("unitkind.conversation");

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const who = await getUserInfo();
  if (!who) redirect("/login");
  const userId = who.id;
  const { id } = await params;
  const source = await findConversation(id);
  if (!source) notFound();
  /* KAPATILMIŞ KONUŞMA AÇILMIYOR. Panelden kapatılan madde mobilde gösterge
     üzerinden gizleniyor; web içeriği koddan okuduğu için burada AYRICA
     sorulmak zorunda, yoksa anahtar yarım işler (bkz. `lib/content/read`). */
  if (await conversationDisabled(id)) notFound();
  // Karakter sunucuda hesaplanıyor: türetmesi konuşma kataloğunu gerektiriyor ve
  // 202 konuşmanın tamamını istemci paketine sokmanın anlamı yok.
  const character = characterFor(source, await conversationIndexInLevel(source));
  // Özet köprüleri (WP-62): konuşmanın can-do ifadesi ve sıradaki konuşma sunucuda —
  // 121 can-do ve konuşma tahtası istemciye inmesin. Okunamazsa köprü yok, konuşma açılır.
  const extras: ConversationExtras = {
    cando: candoForConversation(source).map((id) => candoById(id)?.tr).filter((t): t is string => Boolean(t)),
    next: null,
  };
  let conversation = source;
  try {
    const profile = await ensureProfile(userId);
    const lang = isNativeLang(profile?.nativeLang) ? profile.nativeLang : null;
    conversation = await localiseConversation(source, lang);
    // Can-do köprüsü de ana dilde: `Cando` tipinde yalnız `tr` var, İngilizcesi
    // kendi hattında duruyor (`data/conversations/cando/`, anahtar `A1.SPK.1`).
    const cando = await nativeCando(candoForConversation(source), lang);
    if (cando) extras.cando = cando;
    const n = await nextConversation(userId, profile.course, profile.level);
    if (n && n.conversation.id !== conversation.id) {
      const titleTr = (await nativeTitle(n.conversation.id, lang)) ?? n.conversation.titleTr;
      extras.next = { id: n.conversation.id, title: n.conversation.title, titleTr };
    }
  } catch (err) {
    console.error("[conversation] sıradaki konuşma okunamadı", err);
  }
  /* Konuşma hakkı: kilitliyse oynatıcı adıma girmeden kilidi ve nasıl
     açılacağını gösteriyor. Okunamazsa kilit çizilmiyor — kapıyı yine
     `/api/chat` tutuyor. */
  const quota = await conversationQuota(who, source).catch(() => null);
  return <ConversationPlayer conversation={conversation} character={character} extras={extras} quota={quota} />;
}
