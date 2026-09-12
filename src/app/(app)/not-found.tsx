import Link from "next/link";
import { EmptyCard } from "@/components/empty-card";
import { CompassIcon } from "@/components/icons";
import { getT } from "@/lib/i18n/server";

/**
 * UYGULAMA İÇİ 404 — kabuk kaybolmuyor.
 *
 * `src/app/not-found.tsx` kökte duruyor ve kök düzeninde çiziliyor: tam
 * ekran, gezinme çubuğu YOK. Uygulamanın içindeki bir adres yanlış
 * yazıldığında (sınav seviyesi, ünite indeksi, modül patronu) kullanıcı hem
 * sayfayı hem de gezinmeyi kaybediyordu; çıkış yolu iki bağlantıdan ibaretti.
 *
 * Android'de böyle bir an yok — ekranlar parametreyle açılıyor, adres
 * yazılamıyor — ve olmayan içerikte ekran kendi kabuğunun İÇİNDE bir kart
 * gösteriyor (`UserScreen`, `MockExamScreen`, `LessonScreen`). Kabuğun hiç
 * kaybolmaması o davranışın webdeki karşılığı.
 *
 * Bölümüne özel 404'ü olan yerler (kâğıt, profil, konuşma) bu sınırdan ÖNCE
 * bulunuyor: Next en YAKIN `not-found`u çiziyor. Burası yalnız geri kalanlar.
 */
export default async function AppNotFound() {
  const t = await getT();
  return (
    <div className="mx-auto w-full max-w-md px-4 py-8">
      <EmptyCard
        icon={CompassIcon}
        tint="var(--color-brand)"
        title={t("notfound.title")}
        text={t("notfound.sub")}
        action={
          <Link href="/learn" className="btn btn-primary px-5 py-2.5 text-body">
            {t("common.back_to_learn")}
          </Link>
        }
      />
    </div>
  );
}
