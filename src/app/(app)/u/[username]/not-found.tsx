import { getT } from "@/lib/i18n/server";
import { EmptyCard } from "@/components/empty-card";
import { XIcon } from "@/components/icons";

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
    <div className="mx-auto w-full max-w-md px-4 py-8">
      <EmptyCard
        icon={XIcon}
        tint="var(--color-rose)"
        title={t("user.user_not_found")}
        text={t("user.link_may_be_old_or_this_profile")}
      />
    </div>
  );
}
