import Link from "next/link";
import { getT } from "@/lib/i18n/server";
import { titleMeta } from "@/lib/page-meta";
import { AuthShell } from "@/components/auth-shell";

/**
 * Uygulamaya dönüş adresi — ve uygulama açılmazsa görünen sayfa.
 *
 * Bu yol Android tarafında App Link olarak İDDİA EDİLİYOR
 * (`AndroidManifest.xml` + `.well-known/assetlinks.json`), yani uygulama
 * kuruluysa tarayıcı buraya hiç gelmez: adres uygulamada açılır, tek
 * kullanımlık token oturuma çevrilir.
 *
 * BU SAYFA O ZİNCİRİN KOPTUĞU HÂL: uygulama kurulu değil, doğrulama
 * tamamlanmamış ya da bağlantı masaüstü bir tarayıcıda açılmış. Kullanıcı
 * burada çıkmaz sokakta DEĞİL — tarayıcıdaki oturum geçerli, çünkü giriş
 * zaten orada tamamlandı. O yüzden ikinci düğme "web'de devam et".
 *
 * TOKEN EKRANDA GÖSTERİLMİYOR. Adres çubuğunda duruyor (kaçınılmaz, uygulama
 * onu oradan okuyor) ama sayfaya basmanın bir faydası yok ve ekran görüntüsü
 * alan birinde gereksiz bir kopya bırakır.
 */
export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("auth.sign_in");

export default async function AuthAppReturnPage() {
  const t = await getT();
  return (
    <AuthShell title={t("authapp.signed_in")} subtitle={t("authapp.return_to_app")}>
      <Link href="/learn" className="btn btn-primary w-full px-5 py-4">
        {t("authapp.continue_on_web")}
      </Link>
    </AuthShell>
  );
}
