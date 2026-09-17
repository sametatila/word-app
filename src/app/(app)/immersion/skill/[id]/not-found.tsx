import { FlowColumn, FlowActions, StateBody } from "@/components/flow";
import { getT } from "@/lib/i18n/server";

/**
 * EGZERSİZ AÇILAMADI — bu rotanın kendi 404'ü.
 *
 * Tanınmayan bir egzersiz kimliğinde (ya da oynatıcısı olmayan bir biçimde)
 * sayfa `notFound()` atıyor ve genel "Sayfa bulunamadı" çiziliyordu. Mobil
 * aynı yerde üzgün mirketi ve egzersizin kendi cümlesini gösteriyor
 * (`ItemScreen` `!exercise` dalı); metin tabanda zaten vardı.
 *
 * Çıkış Beceriler: 404 sayfası `?from=` bilgisini okuyamıyor, kütüphane de
 * iki girişin (Patika, Beceriler) geniş olanı. Mobil "geri" diyor, çünkü
 * orada yığın nereden gelindiğini biliyor.
 */
export default async function SkillNotFound() {
  const t = await getT();
  return (
    <div className="px-4 py-8">
      <FlowColumn>
        <StateBody title={t("item.this_exercise_can_t_be_opened")}>
          <FlowActions
            primary={{ label: t("item.back_to_skills"), href: "/skills" }}
          />
        </StateBody>
      </FlowColumn>
    </div>
  );
}
