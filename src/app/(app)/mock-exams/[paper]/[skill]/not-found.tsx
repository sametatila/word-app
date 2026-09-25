import { FlowColumn, FlowActions, StateBody } from "@/components/flow";
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
 * DURUM şablonu (components/flow): üzgün maskot, sebep ve tek çıkış — mobil
 * `MockExamScreen`in `!paper || !part` dalıyla aynı alanlar. `role="alert"`
 * korunuyor: sayfa bir hatayı söylüyor.
 */
export default async function MockPaperNotFound() {
  const t = await getT();
  return (
    <div className="px-4 py-6">
      <FlowColumn>
        <StateBody alert title={t("mockexam.exam_missing")} body={t("mockexam.exam_missing_sub")}>
          <FlowActions primary={{ label: t("mockexam.back_to_list"), href: "/mock-exams" }} />
        </StateBody>
      </FlowColumn>
    </div>
  );
}
