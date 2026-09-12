import Link from "next/link";
import { EmptyCard } from "@/components/empty-card";
import { XIcon } from "@/components/icons";
import { getT } from "@/lib/i18n/server";

/**
 * KÂĞIT BULUNAMADI — bu bölümün kendi 404'ü.
 *
 * `page.tsx` üç durumda `notFound()` atıyor: kâğıt kimliği tanınmıyor, beceri
 * adı listede değil, ya da kâğıdın o becerisi yok. Üçünde de uygulamanın GENEL
 * 404'ü çiziliyordu ("Sayfa bulunamadı" + Öğren'e dön), yani kullanıcı NEYİN
 * bulunamadığını ve ne yapacağını öğrenemiyordu — eski bir bağlantı mı, kaldırılmış
 * bir kâğıt mı belli değildi.
 *
 * Android aynı durumda kâğıda özel kartı çiziyor (`MockExamScreen`: `!paper ||
 * !part` dalı, `mockexam.paper_missing` + `_sub` + "listeye dön"). Metinler üç
 * dilde zaten vardı ve webde hiçbir yerden çağrılmıyordu. Kart da aynı: kırmızı
 * karo, `XIcon`, `role="alert"` (Android `live="assertive"`).
 */
export default async function MockPaperNotFound() {
  const t = await getT();
  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <EmptyCard
        role="alert"
        icon={XIcon}
        tint="var(--color-danger)"
        title={t("mockexam.paper_missing")}
        text={t("mockexam.paper_missing_sub")}
        action={
          <Link href="/mock-exams" className="btn btn-ghost px-4 py-2 text-body">
            {t("mockexam.back_to_list")}
          </Link>
        }
      />
    </div>
  );
}
