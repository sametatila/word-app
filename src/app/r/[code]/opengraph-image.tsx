import { getLang } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/dict";
import { inviterCard, normalizeReferral } from "@/lib/premium/referral";
import { courseBadges, firstName } from "@/lib/og/langs";
import { AvatarVisual, avatarPng, genericCard, ogCard, OG_SIZE } from "@/lib/og/card";

/**
 * Davet kartı — `lernomi.app/r/<KOD>` paylaşıldığında.
 *
 * Davetiye sayfasının gösterdiğinden fazlası yok: davet edenin avatarı ve
 * İLK adı (sayfa tam adı gösteriyor, önizleme gruplarda dolaştığı için
 * daha az). Bu uç YALNIZ OKUR: bağ kurma sayfanın işi, görseli çeken
 * önizleme servisi kimseyi kimseye bağlamamalı. Bilinmeyen kodda genel kart.
 */
export const alt = "Lernomi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ code: string }> }) {
  const lang = await getLang();
  try {
    const { code: raw } = await params;
    let ham = raw ?? "";
    try {
      ham = decodeURIComponent(ham);
    } catch {
      /* ham hâliyle devam */
    }
    const code = normalizeReferral(ham);
    const inviter = code ? await inviterCard(code) : null;
    if (!inviter) return genericCard(lang);
    const name = firstName(inviter.name) || translate(lang, "social.unnamed");
    return ogCard({
      visual: <AvatarVisual src={await avatarPng(inviter.avatar)} name={name} size={150} />,
      title: translate(lang, "invitew.title", { name }),
      sub: translate(lang, "invitew.lead"),
      badges: courseBadges(lang),
      titleSize: 58,
    });
  } catch {
    return genericCard(lang);
  }
}
