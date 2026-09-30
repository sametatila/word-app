import { getLang } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/dict";
import { clip, courseBadges } from "@/lib/og/langs";
import { publicProfileCard } from "@/lib/og/profile";
import { AvatarVisual, avatarPng, genericCard, ogCard, OG_SIZE } from "@/lib/og/card";

/**
 * Açık profil kartı (bkz. `page.tsx`): avatar, ad, kullanıcı adı, seviye ve
 * seri. Yalnız "herkese açık" profil; öteki her durumda genel kart.
 */
export const alt = "Lernomi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ username: string }> }) {
  const lang = await getLang();
  try {
    const { username } = await params;
    const card = await publicProfileCard(username);
    if (!card) return genericCard(lang);
    const name = clip(card.name ?? `@${card.username}`, 32);
    const sub = [`@${card.username}`, card.level];
    if (card.streak > 0) sub.push(translate(lang, "social.days_streak", { n: card.streak }));
    return ogCard({
      visual: <AvatarVisual src={await avatarPng(card.avatar)} name={name} size={170} />,
      title: name,
      sub: sub.join(" · "),
      badges: courseBadges(lang),
      titleSize: 62,
    });
  } catch {
    return genericCard(lang);
  }
}
