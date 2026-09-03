import Link from "next/link";
import { EntityBlock, LegalShell, Ph } from "@/components/legal-shell";
import { FAIR_USE, LEGAL_PATHS } from "@/lib/legal";

export const metadata = {
  title: "Kullanım Şartları",
  description: "Nomi'yi kullanmanın kuralları: hesap, kabul edilebilir kullanım, kullanıcı içeriği, yapay zekâ, abonelik, tüketici hakları.",
};

/**
 * Kullanım şartları (kullanıcı sözleşmesi). Sağlayıcı Türkiye'de yerleşik: Türk hukuku
 * (6502 Tüketicinin Korunması, 6563 Elektronik Ticaret, Mesafeli Sözleşmeler Yönetmeliği)
 * esas; AB tüketicileri için zorunlu tüketici hükümleri ve DSA bildirme yolu; diğer
 * ülkelerde yerel zorunlu hükümler saklı. Play'in UGC ve üretken yapay zekâ politikaları
 * için yasaklı davranış ve bildirme maddeleri; abonelik maddesi Play Faturalandırma'ya göre.
 */
export default function TermsPage() {
  return (
    <LegalShell
      title="Kullanım Şartları"
      summary="Nomi'yi kullanarak bu sözleşmeyi kabul edersin. Hizmet Türkiye'de yerleşik bir geliştirici tarafından sunulur ve Türk hukukuna tabidir; bulunduğun ülkenin zorunlu tüketici hakları saklıdır. Hesabın sana aittir ve başkalarına saygılı kullanılır; yazdıkların senin kalır. Yapay zekâ yanıtları hata yapabilir. Premium abonelik Google Play üzerinden alınır ve oradan iptal edilir."
    >
      <h2>1. Taraflar ve kabul</h2>
      <p>
        Bu sözleşme, aşağıda kimliği verilen hizmet sağlayıcı (&quot;Nomi&quot;, &quot;biz&quot;) ile Nomi web uygulamasını (www.exfe.me) ya da Android
        uygulamasını kullanan kişi (&quot;sen&quot;) arasındadır. Hesap açarak ya da uygulamayı kullanarak bu şartları ve{" "}
        <Link href={LEGAL_PATHS.privacy}>Gizlilik Politikası</Link>&apos;nı kabul etmiş olursun; 6563 sayılı Kanun uyarınca bu metin
        sözleşme kurulmadan önce erişilebilir durumdadır ve saklanabilir. Kabul etmiyorsan uygulamayı kullanma.
      </p>
      <EntityBlock />

      <h2>2. Hizmet</h2>
      <p>
        Nomi, kelime, dinleme, konuşma ve yazma pratiği sunan bir dil öğrenme uygulamasıdır: aralıklı tekrar turları, dersler, yapay zekâ ile
        konuşma pratiği, yürüyüş modu, yazma değerlendirmesi, sınav hazırlığı, haftalık sıralama ve arkadaşlık özellikleri. Kurslar Almanca
        (Hochdeutsch), Zürih Almancası ve İngilizcedir; kurs listesi zamanla değişebilir ve her kursta her özellik aynı anda hazır olmayabilir.
        Özellikler zamanla eklenebilir, değişebilir ya da kaldırılabilir; ücretli özellikleri etkileyen değişiklikleri önceden duyururuz.
      </p>

      <h2>3. Hesap ve yaş</h2>
      <ul>
        <li>Nomi yetişkinlere yöneliktir: hesap açmak için 18 yaşını doldurmuş olman gerekir. 18 yaşından küçük olduğunu öğrendiğimiz hesapları kapatır ve verilerini sileriz.</li>
        <li>Hesap bilgilerin doğru olmalı; parolanı kimseyle paylaşma. Hesabınla yapılan işlemlerden sen sorumlusun; yetkisiz kullanımı fark edince bize bildir.</li>
        <li>Hesabını dilediğin an silebilirsin: uygulamada Profil › Ayarlar › Hesap ya da web&apos;de <Link href={LEGAL_PATHS.deleteAccount}>hesap silme sayfası</Link>. Silme geri alınamaz.</li>
      </ul>

      <h2>4. Kabul edilebilir kullanım</h2>
      <p>Şunları yapamazsın:</p>
      <ul>
        <li>Görünen adında ya da paylaştığın metinlerde hakaret, nefret söylemi, taciz, cinsel içerik, başkasının kimliğine bürünme, kişisel veri ifşası ya da reklam kullanmak,</li>
        <li>Sıralama, seri ve görevleri otomasyon, sahte hesap ya da hile ile manipüle etmek,</li>
        <li>Hizmeti tersine mühendislikle çözmek, kazımak, aşırı yüklemek ya da başkalarının erişimini engellemek,</li>
        <li>Yapay zekâ konuşma pratiğini yasa dışı, zararlı ya da başkalarını hedef alan içerik üretmek için kullanmak,</li>
        <li>Uygulanan yasaları (fikri mülkiyet, kişisel veriler, yaptırımlar dâhil) ihlal etmek.</li>
      </ul>
      <p>
        İhlalde içeriği kaldırabilir, özellikleri kısıtlayabilir ya da hesabı kapatabiliriz; kararı ve gerekçesini bildirir, itiraz için{" "}
        <Ph k="supportEmail" /> adresini kullanabilirsin. Ciddi ihlaller önceden uyarı gerektirmez.
      </p>

      <h2>5. Senin içeriğin ve bildirme</h2>
      <p>
        Yazdığın metinler, söylediklerinin dökümü ve görünen adın sana aittir. Bize yalnız hizmeti sunmak için gereken, dünya çapında,
        münhasır olmayan ve ücretsiz bir kullanım izni verirsin: değerlendirmek, geri bildirim üretmek, seçtiğin kadarını (görünen ad,
        ilerleme) diğer kullanıcılara göstermek. İçeriğini reklam ya da model eğitimi için kullanmayız; hesabını silince izin sona erer.
      </p>
      <p>
        Hukuka aykırı ya da bu şartlara aykırı bir içerik (başka bir kullanıcının adı, davranışı) gördüğünde uygulamadaki &quot;Bildir&quot;
        düğmesiyle ya da <Ph k="supportEmail" /> üzerinden bildirebilirsin; AB Dijital Hizmetler Tüzüğü (DSA) kapsamındaki bildirimler için
        de tek iletişim noktası budur. Bildirimler insan tarafından incelenir; alınan karar ve itiraz yolu bildirene ve içerik sahibine
        iletilir. Arkadaşlık özelliklerinde engelleme ve bildirme düğmeleri bulunur.
      </p>

      <h2>5a. Sosyal özellikler</h2>
      <ul>
        <li>Kullanıcı adı 3-20 karakter, harf, rakam ve alt çizgi; başkasının adını, markasını ya da yanıltıcı bir kimliği kullanamazsın. Uygunsuz adlar değiştirilebilir.</li>
        <li>Sosyal profilin varsayılan olarak herkese açıktır; görünürlüğü, arkadaşlık isteklerini ve etkinlik paylaşımını Ayarlar › Sosyal&apos;den yönetirsin.</li>
        <li>Engelleme karşılıklıdır ve bildirilmez. Bildirimler insan tarafından incelenir; asılsız ya da kötü niyetli bildirimler de kural ihlalidir.</li>
        <li>Özel mesajlaşma yoktur; tepkiler, dürtmeler ve ortak görevler arkadaşlarınla sınırlıdır.</li>
      </ul>

      <h2>6. Yapay zekâ içeriği</h2>
      <ul>
        <li>Konuşma pratiği ve değerlendirmeler dil modelleriyle üretilir; bir yapay zekâ ile etkileştiğin uygulamada açıkça belirtilir. Yanıtlar yanlış, eksik ya da tutarsız olabilir; dil bilgisi düzeltmeleri kesin doğru sayılmamalıdır.</li>
        <li>Rahatsız edici ya da hatalı bir yanıtı, yanıtın altındaki &quot;Bildir&quot; ile uygulamadan çıkmadan bildirebilirsin.</li>
        <li>Yapay zekâ karakterleri gerçek kişi değildir; tıbbi, hukuki ya da mali tavsiye vermezler.</li>
      </ul>

      <h2>7. Premium abonelik, ödeme ve cayma</h2>
      <ul>
        <li><strong>Satın alma:</strong> Premium, Android&apos;de Google Play Faturalandırma ile satın alınır; ödeme Google Play tarafından işlenir ve Google Play Hizmet Şartları da geçerlidir. Fiyat, para birimi, süre, deneme koşulları ve vergiler satın alma anında Play tarafından gösterilir; bu bilgiler 6502 sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamındaki ön bilgilendirmeyi oluşturur.</li>
        <li><strong>Yenileme ve iptal:</strong> Abonelik, dönem sonundan en az 24 saat önce iptal edilmezse aynı süreyle yenilenir. İptal ve yönetim Play Store › Ödemeler ve abonelikler bölümündedir; hesap silmek aboneliği iptal etmez. Ücretsiz deneme bitmeden iptal edersen ücret alınmaz.</li>
        <li><strong>Cayma hakkı:</strong> Dijital içerik hizmeti satın alma anında ifa edilmeye başlandığından, Mesafeli Sözleşmeler Yönetmeliği m.15/1-ğ ve AB Tüketici Hakları Direktifi m.16(m) uyarınca cayma hakkı, ifaya başlanmasına verdiğin onayla sona erer; satın alma ekranında bu onay istenir. Google Play&apos;in iade politikası ayrıca uygulanır; Play&apos;in kabul ettiği iadeleri biz de tanırız.</li>
        <li><strong>Fiyat değişikliği:</strong> Fiyat değişikliğini yürürlükten önce Play üzerinden bildiririz; kabul etmezsen aboneliği iptal edebilirsin.</li>
        <li><strong>Fatura:</strong> Türkiye&apos;deki kullanıcılar için e-fatura/e-arşiv fatura Google Play&apos;in bize ilettiği bilgilerle düzenlenir.</li>
      </ul>

      <h2>7a. Adil kullanım</h2>
      <p>
        Yapay zekâ ve konuşma tanıma sağlayıcı kotalarını herkes için korumak amacıyla hesap başına günlük sınırlar uygulanır: konuşma
        pratiği {FAIR_USE.roleplayTurnsPerDay} tur, sunucu konuşma tanıma {FAIR_USE.sttRequestsPerDay} istek, telaffuz puanı{" "}
        {FAIR_USE.pronounceRequestsPerDay} istek, içerik bildirimi {FAIR_USE.reportsPerDay}. Sınıra ulaşınca uygulama bunu gösterir ve ertesi
        gün açılır. Sınırlar dürüst ağır kullanımın çok üstündedir; yalnız otomasyon ve kötüye kullanımı engellemek içindir ve gerektiğinde
        güncellenebilir.
      </p>

      <h2>7b. Üçüncü taraf hizmetler</h2>
      <p>
        Google ile giriş (Google Hesap şartları), Google Play (Play Hizmet Şartları ve iade politikası) ve cihazının konuşma tanıma servisi
        kendi sağlayıcılarının şartlarına tabidir. Yapay zekâ ve konuşma tanıma sağlayıcıları Gizlilik Politikası&apos;nda listelenir; bunlar
        bizim alt işleyicilerimizdir ve seninle doğrudan sözleşme kurmazlar.
      </p>

      <h2>8. Fikri mülkiyet</h2>
      <p>
        Uygulama, tasarım, maskot, ses efektleri ve ders içerikleri Nomi&apos;ye aittir ve 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile
        uluslararası sözleşmelerle korunur. Kelime listelerinin A1–B1 bölümü Goethe-Institut resmî kelime listelerine dayanır; Goethe-Institut
        ve telc, kendi sahiplerinin markalarıdır ve Nomi onlarla bağlı değildir. Kişisel öğrenme amacı dışında kopyalama, dağıtma ya da türev
        ürün yapma izni yoktur.
      </p>

      <h2>9. Hizmetin sürekliliği</h2>
      <p>
        Hizmeti &quot;olduğu gibi&quot; sunarız. Bakım, sağlayıcı kesintileri ya da kotalar nedeniyle bazı özellikler (ör. sunucu konuşma tanıma,
        yapay zekâ konuşma) geçici olarak kapanabilir; uygulama bunu gösterir ve mümkünse cihaz içi yedeğe geçer. Ücretli bir özelliğin
        uzun süreli kapalı kalması hâlinde orantılı iade ya da süre uzatımı yaparız.
      </p>

      <h2>10. Sorumluluğun sınırı</h2>
      <p>
        Nomi bir öğrenme aracıdır; sınav sonucu, dil yeterliği ya da bir kararın doğruluğu için garanti vermez. Kasıt ve ağır ihmal
        dışında, hizmetten kaynaklanan dolaylı zararlardan sorumlu değiliz; toplam sorumluluğumuz son 12 ayda ödediğin abonelik bedeliyle
        sınırlıdır. Tüketici olarak Türk hukukundan ve bulunduğun ülkenin zorunlu hükümlerinden doğan hakların saklıdır; bu madde onları
        daraltmaz.
      </p>

      <h2>10a. Tazmin</h2>
      <p>
        Bu şartları ya da yürürlükteki hukuku ihlal ederek (ör. başkasının haklarını çiğneyen içerik, hizmete saldırı, hile) üçüncü kişilerin
        Nomi&apos;ye yönelttiği talep ve zararlardan, kusurun ölçüsünde sen sorumlusun. Tüketiciler için bu madde yalnız kasıt ve ağır ihmal
        hâlinde uygulanır.
      </p>

      <h2>11. Fesih</h2>
      <p>
        Hesabını istediğin zaman silebilirsin. Biz, bu şartların ihlali ya da hizmetin sona ermesi hâlinde makul bildirimle hesabı
        kapatabiliriz; hizmetin tümüyle sona ermesi durumunda en az 30 gün önce haber verir, verilerini indirme imkânı sunar ve kullanılmayan
        abonelik süresini iade ederiz.
      </p>

      <h2>12. Uygulanacak hukuk ve uyuşmazlık çözümü</h2>
      <p>
        Bu sözleşme Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda önce <Ph k="supportEmail" /> üzerinden dostane çözüm ararız.
        Türkiye&apos;deki tüketiciler, parasal sınırlar dâhilinde Tüketici Hakem Heyetlerine ve tüketici mahkemelerine başvurabilir; diğer
        uyuşmazlıklarda <Ph k="court" /> mahkemeleri ve icra daireleri yetkilidir. AB ve Birleşik Krallık&apos;ta yerleşik tüketicilerin,
        bulundukları ülkenin zorunlu tüketici hükümlerinden ve kendi ülkelerinin mahkemelerine başvurma hakkından doğan hakları etkilenmez;
        diğer ülkelerdeki kullanıcılar için yerel zorunlu hükümler saklıdır.
      </p>

      <h2>12a. Mücbir sebep</h2>
      <p>
        Doğal afet, savaş, salgın, geniş çaplı internet ya da altyapı kesintisi, sağlayıcı iflası ve idari kararlar gibi tarafların
        kontrolü dışındaki olaylar süresince yükümlülükler askıya alınır; 30 günü aşan kesintide her iki taraf sözleşmeyi feshedebilir ve
        kullanılmayan abonelik süresi iade edilir.
      </p>

      <h2>12b. Genel hükümler</h2>
      <ul>
        <li><strong>Bütünlük:</strong> Bu şartlar, Gizlilik Politikası ve satın alma ekranındaki ön bilgilendirme taraflar arasındaki sözleşmenin tamamıdır.</li>
        <li><strong>Bölünebilirlik:</strong> Bir hükmün geçersiz sayılması diğerlerini etkilemez; geçersiz hüküm amacına en yakın geçerli hükümle değiştirilmiş sayılır.</li>
        <li><strong>Devir:</strong> Hesabını ve bu sözleşmeden doğan haklarını başkasına devredemezsin. Biz, hizmetin devri ya da şirket yapısındaki değişiklik hâlinde sözleşmeyi, haklarını koruyarak ve sana bildirerek devredebiliriz.</li>
        <li><strong>Feragat:</strong> Bir hakkın kullanılmaması ondan vazgeçildiği anlamına gelmez.</li>
        <li><strong>Dil:</strong> Sözleşmenin bağlayıcı dili Türkçedir; çeviriler bilgi içindir. Yorum farkında Türkçe metin esas alınır.</li>
        <li><strong>Tebligat:</strong> Bize yapılacak bildirimler <Ph k="supportEmail" /> ya da KEP adresine; sana yapılacak bildirimler hesabındaki e-posta adresine ya da uygulama içi mesajla yapılır ve ulaştığı anda tebliğ edilmiş sayılır.</li>
        <li><strong>Saklama:</strong> Bu sözleşme elektronik ortamda saklanır; kabul ettiğin sürümü ve tarihini isteyebilirsin.</li>
      </ul>

      <h2>13. Değişiklikler ve iletişim</h2>
      <p>
        Şartları güncellediğimizde yürürlük tarihi ve sürüm değişir; senin aleyhine olan önemli değişiklikleri en az 30 gün önce uygulama
        içinde ve e-postayla duyururuz, kabul etmezsen hesabını kapatabilirsin. Sorular için: <Ph k="supportEmail" />; resmi tebligat için
        KEP: <Ph k="kep" />.
      </p>
    </LegalShell>
  );
}
