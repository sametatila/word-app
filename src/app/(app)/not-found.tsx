import { FlowColumn, FlowActions, StateBody } from "@/components/flow";
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
  /* DURUM ŞABLONU (components/flow): bulunamadı = düşünen maskot, tek çıkış. */
  return (
    <div className="px-4 py-8">
      <FlowColumn>
        <StateBody
          mood="think"
          title={t("notfound.title")}
          body={t("notfound.sub")}
        >
          <FlowActions
            primary={{ label: t("common.back_to_learn"), href: "/learn" }}
          />
        </StateBody>
      </FlowColumn>
    </div>
  );
}
