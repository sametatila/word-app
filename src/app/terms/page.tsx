import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";
import { LEGAL_CONTACT_EMAIL, LEGAL_CONTROLLER, LEGAL_PATHS } from "@/lib/legal";

export const metadata = {
  title: "Kullanım Şartları",
  description: "Nomi'yi kullanmanın kuralları: hesap, kabul edilebilir kullanım, kullanıcı içeriği, yapay zekâ, abonelik.",
};

/**
 * Kullanım şartları. Play'in kullanıcı içeriği (görünen ad, yazılar) ve üretken
 * yapay zekâ politikaları "yasaklı davranış" ve "bildirme" maddelerini şart koşar;
 * abonelik maddesi Play Faturalandırma kurallarına göre yazıldı.
 */
export default function TermsPage() {
  return (
    <LegalShell
      title="Kullanım Şartları"
      summary="Nomi'yi kullanarak bu şartları kabul edersin. Hesabın sana aittir ve başkalarına saygılı kullanılır; yazdıkların senin kalır, biz yalnız hizmeti sunmak için kullanırız. Yapay zekâ yanıtları hata yapabilir; sınav ve resmi kararlar için tek kaynak sayma. Premium abonelik Google Play üzerinden alınır ve oradan iptal edilir."
    >
      <h2>1. Taraflar ve kabul</h2>
      <p>
        Bu şartlar, {LEGAL_CONTROLLER} (&quot;Nomi&quot;, &quot;biz&quot;) ile Nomi web uygulamasını ya da Android uygulamasını kullanan kişi (&quot;sen&quot;)
        arasındadır. Hesap açarak ya da uygulamayı kullanarak şartları ve <Link href={LEGAL_PATHS.privacy}>Gizlilik Politikası</Link>&apos;nı
        kabul etmiş olursun. Kabul etmiyorsan uygulamayı kullanma.
      </p>

      <h2>2. Hizmet</h2>
      <p>
        Nomi, Almanca (Hochdeutsch ve Zürih Almancası) kelime, dinleme, konuşma ve yazma pratiği sunan bir öğrenme uygulamasıdır: aralıklı
        tekrar turları, dersler, konuşma pratiği, yürüyüş modu, yazma değerlendirmesi, sınav hazırlığı, haftalık sıralama ve arkadaşlık
        özellikleri. Özellikler zamanla eklenebilir, değişebilir ya da kaldırılabilir; önemli değişiklikleri uygulama içinde duyururuz.
      </p>

      <h2>3. Hesap</h2>
      <ul>
        <li>Hesap açmak için 16 yaşını doldurmuş olman gerekir.</li>
        <li>Hesap bilgilerin doğru olmalı; parolanı kimseyle paylaşma. Hesabınla yapılan her işlemden sen sorumlusun.</li>
        <li>Hesabını dilediğin an silebilirsin: uygulamada Profil › Ayarlar › Hesap ya da web&apos;de <Link href={LEGAL_PATHS.deleteAccount}>hesap silme sayfası</Link>. Silme geri alınamaz.</li>
      </ul>

      <h2>4. Kabul edilebilir kullanım</h2>
      <p>Şunları yapamazsın:</p>
      <ul>
        <li>Görünen adında ya da paylaştığın metinlerde hakaret, nefret söylemi, taciz, cinsel içerik, başkasının kimliğine bürünme, kişisel veri ifşası ya da reklam kullanmak,</li>
        <li>Sıralama, seri ve görevleri otomasyon, sahte hesap ya da hile ile manipüle etmek,</li>
        <li>Hizmeti tersine mühendislikle çözmek, kazımak, aşırı yüklemek ya da başkalarının erişimini engellemek,</li>
        <li>Yapay zekâ konuşma pratiğini yasa dışı, zararlı ya da başkalarını hedef alan içerik üretmek için kullanmak.</li>
      </ul>
      <p>İhlalde içeriği kaldırabilir, özellikleri kısıtlayabilir ya da hesabı kapatabiliriz. Ciddi ihlaller önceden uyarı gerektirmez.</p>

      <h2>5. Senin içeriğin</h2>
      <p>
        Yazdığın metinler, söylediklerinin dökümü ve görünen adın sana aittir. Bize yalnız hizmeti sunmak için gereken sınırlı izni verirsin:
        değerlendirmek, geri bildirim üretmek, seçtiğin kadarını (görünen ad, ilerleme) diğer kullanıcılara göstermek. İçeriğini
        reklam ya da model eğitimi için kullanmayız.
      </p>
      <p>
        Başka bir kullanıcının adını ya da davranışını uygunsuz bulursan sıralama ekranından ya da {LEGAL_CONTACT_EMAIL} üzerinden
        bildirebilirsin; arkadaşlık özelliklerinde engelleme ve bildirme düğmeleri bulunur. Bildirimler insan tarafından incelenir.
      </p>

      <h2>6. Yapay zekâ içeriği</h2>
      <ul>
        <li>Konuşma pratiği ve değerlendirmeler dil modelleriyle üretilir. Yanıtlar yanlış, eksik ya da tutarsız olabilir; dil bilgisi düzeltmeleri kesin doğru sayılmamalıdır.</li>
        <li>Rahatsız edici ya da hatalı bir yanıtı, yanıtın altındaki &quot;Bildir&quot; ile uygulamadan çıkmadan bildirebilirsin.</li>
        <li>Yapay zekâ karakterleri gerçek kişi değildir; tıbbi, hukuki ya da mali tavsiye vermezler.</li>
      </ul>

      <h2>7. Premium abonelik</h2>
      <ul>
        <li>Premium, Android&apos;de Google Play Faturalandırma ile satın alınır; fiyat, süre ve deneme koşulları satın alma anında Play tarafından gösterilir.</li>
        <li>Abonelik, dönem sonundan en az 24 saat önce iptal edilmezse aynı süreyle yenilenir. İptal ve yönetim Play Store › Ödemeler ve abonelikler bölümündedir; hesap silmek aboneliği iptal etmez.</li>
        <li>Ücretsiz deneme sunulduysa deneme bitmeden iptal edersen ücret alınmaz.</li>
        <li>İadeler Google Play iade politikasına tabidir; Play&apos;in kabul ettiği iadeleri biz de tanırız.</li>
        <li>Fiyat değişikliğini yürürlükten önce Play üzerinden bildiririz; kabul etmezsen aboneliği iptal edebilirsin.</li>
      </ul>

      <h2>8. Fikri mülkiyet</h2>
      <p>
        Uygulama, tasarım, maskot, ses efektleri ve ders içerikleri Nomi&apos;ye aittir. Kelime listelerinin A1–B1 bölümü Goethe-Institut
        resmî kelime listelerine dayanır; Goethe-Institut ve telc, kendi sahiplerinin markalarıdır ve Nomi onlarla bağlı değildir. Kişisel
        öğrenme amacı dışında kopyalama, dağıtma ya da türev ürün yapma izni yoktur.
      </p>

      <h2>9. Hizmetin sürekliliği</h2>
      <p>
        Hizmeti &quot;olduğu gibi&quot; sunarız. Bakım, sağlayıcı kesintileri ya da kotalar nedeniyle bazı özellikler (ör. sunucu konuşma tanıma,
        yapay zekâ konuşma) geçici olarak kapanabilir; uygulama bunu gösterir ve mümkünse cihaz içi yedeğe geçer.
      </p>

      <h2>10. Sorumluluğun sınırı</h2>
      <p>
        Nomi bir öğrenme aracıdır; sınav sonucu, dil yeterliği ya da bir kararın doğruluğu için garanti vermez. Yasaların izin verdiği
        ölçüde, hizmetten kaynaklanan dolaylı zararlardan sorumlu değiliz; toplam sorumluluğumuz son 12 ayda ödediğin abonelik bedeliyle
        sınırlıdır. Tüketici olarak sahip olduğun zorunlu haklar saklıdır.
      </p>

      <h2>11. Fesih</h2>
      <p>
        Hesabını istediğin zaman silebilirsin. Biz, bu şartların ihlali ya da hizmetin sona ermesi hâlinde makul bildirimle hesabı
        kapatabiliriz; hizmetin tümüyle sona ermesi durumunda en az 30 gün önce haber verir ve verilerini indirme imkânı sunarız.
      </p>

      <h2>12. Uygulanacak hukuk</h2>
      <p>
        Bu şartlar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda önce {LEGAL_CONTACT_EMAIL} üzerinden çözüm ararız; tüketici hakem
        heyetlerine ve tüketici mahkemelerine başvurma hakkın saklıdır. AB&apos;de yerleşik tüketicilerin, bulundukları ülkenin zorunlu
        tüketici hükümlerinden doğan hakları etkilenmez.
      </p>

      <h2>13. Değişiklikler ve iletişim</h2>
      <p>
        Şartları güncellediğimizde yürürlük tarihi değişir; önemli değişiklikleri uygulama içinde duyururuz, kullanmaya devam etmen kabul
        sayılır. Sorular için: <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
      </p>
    </LegalShell>
  );
}
