import Link from "next/link";
import { Mascot } from "@/components/mascot";
import { getT } from "@/lib/i18n/server";

/**
 * KONUŞMA BULUNAMADI — bu bölümün kendi 404'ü.
 *
 * `[id]/page.tsx` ve `[id]/exam/page.tsx` tanınmayan bir ders kimliğinde
 * `notFound()` atıyor ve ikisinde de uygulamanın GENEL 404'ü çiziliyordu:
 * "Sayfa bulunamadı" + Öğren'e dön. Bulunamayan şey bir sayfa değil bir
 * KONUŞMA ve genel sayfa uygulama kabuğunun DIŞINDA çiziliyor — kullanıcı
 * hem neyin eksik olduğunu hem de gezinmeyi aynı anda kaybediyordu.
 *
 * Android aynı yerde üzgün mirketi, dersin kendi cümlesini ve tek bir "Geri
 * dön" düğmesini gösteriyor (`LessonScreen` `!lesson` dalı; rol yapma sınavı
 * `RoleplayExamScreen` aynı anahtarı kullanıyor). Metinler tabanda zaten
 * vardı ve webde hiçbir yerden çağrılmıyordu.
 *
 * Sınırın `[id]` altında olması ikisini birlikte kapsıyor: `exam` alt yolu da
 * en yakın `not-found` olarak burayı buluyor.
 */
export default async function LessonNotFound() {
  const t = await getT();
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-5 py-10 text-center">
      <Mascot mood="sad" size={90} />
      <p className="muted text-body">{t("lesson.this_lesson_wasn_t_found")}</p>
      <Link href="/lessons" className="btn btn-ghost px-5 py-2.5 text-body">
        {t("lesson.go_back")}
      </Link>
    </div>
  );
}
