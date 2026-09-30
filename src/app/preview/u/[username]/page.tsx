import type { Metadata } from "next";
import Link from "next/link";
import { getLang } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/dict";
import { clip, shareMeta } from "@/lib/og/langs";
import { publicProfileCard } from "@/lib/og/profile";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * AÇIK PROFİLİN ÖNİZLEMESİ — `/u/<ad>` bağlantısını çeken önizleme servisine.
 *
 * `/u/<ad>` (app) düzeninde ve oturum istiyor: girişsiz istek `/login`e
 * yönleniyor, yani WhatsApp/X/iMessage bağlantının yerine giriş sayfasının
 * künyesini görüyordu. `proxy.ts` YALNIZ önizleme botlarını buraya yeniden
 * yazıyor (adres çubuğu yok, yönlendirme yok); insanlar eskisi gibi
 * `/u/<ad>`e gidiyor. Buraya doğrudan gelen kişi yalnız adı ve profile giden
 * bağlantıyı görür.
 *
 * YÖNLENDİRME YAPILMAZ: bot `/u/<ad>`e geri yollanırsa proxy onu yine buraya
 * yazar ve döngü olur. Gizli ya da "arkadaşlar" profili genel künyeyle kalır.
 */
export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const robots = { index: false, follow: false };
  const { username } = await params;
  const [card, lang] = await Promise.all([publicProfileCard(username).catch(() => null), getLang()]);
  if (!card) return { robots };
  const name = clip(card.name ?? `@${card.username}`, 32);
  const title = `${name} (@${card.username}) · Lernomi`;
  return {
    title,
    robots,
    ...shareMeta(lang, title, translate(lang, "meta.profile_desc", { name }), `${SITE_URL}/u/${card.username}`),
  };
}

export default async function ProfilePreview({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const [card, lang] = await Promise.all([publicProfileCard(username).catch(() => null), getLang()]);
  const href = card ? `/u/${card.username}` : "/";
  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-12 text-center">
      {card ? <h1 className="text-h1 text-balance">{card.name ?? `@${card.username}`}</h1> : null}
      <Link href={href} className="btn btn-primary mt-7 w-full px-5 py-4">
        {translate(lang, card ? "meta.profile_open" : "common.home")}
      </Link>
    </main>
  );
}
