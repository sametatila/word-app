import { getT } from "@/lib/i18n/server";
import Link from "next/link";
import { EmptyCard } from "@/components/empty-card";
import { NoResultsIcon } from "@/components/icons";

/**
 * Olmayan ya da kapalı profil.
 *
 * Genel 404 sayfası "sayfa bulunamadı" diyordu; burada bulunamayan şey bir
 * sayfa değil bir KİŞİ ve sebebi iki türlü olabiliyor — bağlantı eski ya da
 * profil kapalı. Android aynı yerde bunu söyleyen bir boş kart gösteriyor
 * (`UserScreen`); ayrımı yapamayan bir 404 kullanıcıya yanlış şey aratıyor.
 */
export default async function UserNotFound() {
  const t = await getT();
  return (
    /* Kart Android'in `UserScreen` boş kartı (§327 renk eşi); çıkmaz değil,
       Arkadaşlar'a dönen tek çıkış taşıyor. */
    <div className="mx-auto w-full max-w-md py-8">
      <EmptyCard
        icon={NoResultsIcon}
        tint="var(--color-rose)"
        title={t("user.user_not_found")}
        text={t("user.link_may_be_old_or_this_profile")}
        action={
          <Link href="/friends" prefetch={false} className="btn btn-primary px-4 py-2 text-body">
            {t("friends.friends")}
          </Link>
        }
      />
    </div>
  );
}
