import { getLang } from "@/lib/i18n/server";
import { translate } from "@/lib/i18n/dict";
import { peekStoreTrialCode } from "@/lib/premium/store-trial";
import { clip, courseBadges } from "@/lib/og/langs";
import { genericCard, ogCard, OG_SIZE } from "@/lib/og/card";

/**
 * Grup kampanyası kartı — `lernomi.app/g/<KOD>` paylaşıldığında.
 *
 * Yalnız sayfanın zaten gösterdiği şey: teklif ve grup adı (`peekStoreTrialCode`
 * iç veri vermiyor). Kampanya etiketi panelin iç adı, kartta yok. Geçersiz,
 * süresi dolmuş ya da tükenmiş kodda genel kart: ölü bir teklifi vaat eden
 * önizleme, önizlemesiz bağlantıdan kötü.
 */
export const alt = "Lernomi Premium";
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
    const peek = await peekStoreTrialCode(ham);
    if (peek.status !== "valid") return genericCard(lang);
    const t = (key: string, vars?: Record<string, string>) => translate(lang, key, vars);
    return ogCard({
      title: t("groupw.title"),
      sub: peek.group ? t("groupw.og_for", { group: clip(peek.group, 40) }) : t("groupw.og_for_any"),
      badges: courseBadges(lang),
      titleSize: 68,
    });
  } catch {
    return genericCard(lang);
  }
}
