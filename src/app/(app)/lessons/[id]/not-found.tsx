import { FlowColumn, FlowActions, StateBody } from "@/components/flow";
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
  /* DURUM ŞABLONU (components/flow): üzgün maskot · başlık · tek çıkış. */
  return (
    <div className="px-4 py-8">
      <FlowColumn>
        <StateBody title={t("conversation.this_conversation_wasn_t_found")}>
          <FlowActions
            primary={{ label: t("conversation.go_back"), href: "/lessons" }}
          />
        </StateBody>
      </FlowColumn>
    </div>
  );
}
