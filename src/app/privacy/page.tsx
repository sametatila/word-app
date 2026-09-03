import Link from "next/link";
import { EntityBlock, LegalShell, Ph } from "@/components/legal-shell";
import { LEGAL_HOSTING, LEGAL_PATHS, PROCESSORS } from "@/lib/legal";

export const metadata = {
  title: "Gizlilik Politikası",
  description: "Nomi'nin hangi verileri, neden ve ne kadar süreyle işlediği; KVKK ve GDPR kapsamındaki haklarınız; hesap silme.",
};

/**
 * Gizlilik politikası ve KVKK aydınlatma metni. Geliştirici Türkiye'de yerleşik:
 * KVKK (6698) birincil çerçeve; AB/AEA ve Birleşik Krallık'taki kullanıcılar için GDPR
 * m.3(2) gereği GDPR/UK GDPR hükümleri; diğer ülkeler için genel haklar bölümü.
 * Kimlik alanları lib/legal.ts'te yer tutucu; veri türleri ve sağlayıcılar da oradan.
 */
export default function PrivacyPage() {
  return (
    <LegalShell
      title="Gizlilik Politikası ve Aydınlatma Metni"
      summary="Nomi bir dil öğrenme uygulamasıdır (Almanca, Zürih Almancası ve İngilizce) ve Türkiye'de yerleşik bir geliştirici tarafından sunulur. Hesabını yürütmek için e-posta ve adını, öğrenmeni takip etmek için ilerleme verini işleriz. Yürüyüş modunda mikrofon sesin, açık rızanla, konuşmanı yazıya çevirmek için sunucumuza ve konuşma tanıma sağlayıcılarına gönderilir; ses kaydı saklanmaz. Reklam, reklam kimliği ve üçüncü taraf takip yoktur. Hesabını dilediğin an uygulamadan ya da web'den silebilirsin. Avrupa'daki kullanıcılar için GDPR, Türkiye'dekiler için KVKK hakları geçerlidir."
    >
      <h2>1. Veri sorumlusu</h2>
      <p>
        Bu politika kapsamındaki kişisel verilerin sorumlusu, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel
        Veri Koruma Tüzüğü (GDPR) anlamında aşağıdaki kişidir. Politika, Nomi web uygulamasını (www.exfe.me) ve Android uygulamasını kapsar.
      </p>
      <EntityBlock withRepresentatives />
      <p>
        Sunucularımız {LEGAL_HOSTING} üzerinde çalışır; veriler orada saklanır. Veri Sorumluları Sicili (VERBİS): <Ph k="verbis" />.
      </p>
      <p>
        <strong>Toplama yöntemi ve hukuki sebep (KVKK m.10):</strong> Veriler, kayıt ve ayar formları, uygulama içi etkileşimler ve
        mikrofon aracılığıyla elektronik ortamda, otomatik ya da kısmen otomatik yollarla toplanır; her veri için hukuki sebep 3. bölümdeki
        tabloda verilmiştir.
      </p>

      <h2>2. Kimler için hangi hukuk</h2>
      <ul>
        <li><strong>Türkiye&apos;deki kullanıcılar:</strong> KVKK ve ikincil mevzuatı (Aydınlatma Yükümlülüğü Tebliği, Veri Sorumlusuna Başvuru Tebliği, yurt dışına aktarım usulleri).</li>
        <li><strong>AB/AEA&apos;daki kullanıcılar:</strong> GDPR m.3(2) gereği GDPR; Birleşik Krallık&apos;ta UK GDPR ve Data Protection Act 2018. Bu politikadaki hukuki dayanaklar GDPR m.6 ile eşlenmiştir; temsilci bilgisi 1. bölümdedir.</li>
        <li><strong>Diğer ülkeler:</strong> Yerel veri koruma hukukundan doğan haklar saklıdır (10. bölüm). Kişisel verini satmayız ve davranışsal reklam için paylaşmayız.</li>
      </ul>

      <h2>3. Hangi verileri, neden işliyoruz</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Veri</th><th>Nereden</th><th>Amaç</th><th>Hukuki dayanak (KVKK / GDPR)</th><th>Saklama</th></tr>
          </thead>
          <tbody>
            <tr><td>E-posta adresi, ad, parola özeti</td><td>Kayıt formu ya da Google hesabın</td><td>Hesap açma, giriş, parola sıfırlama, doğrulama e-postası</td><td>Sözleşmenin kurulması ve ifası (m.5/2-c / m.6(1)(b))</td><td>Hesap süresince</td></tr>
            <tr><td>Görünen ad, avatar seçimi, seviye, kurs, günlük hedef, ses tercihi</td><td>Sen</td><td>Kişiselleştirme; görünen ad haftalık sıralamada diğer kullanıcılara görünür</td><td>Sözleşmenin ifası</td><td>Hesap süresince</td></tr>
            <tr><td>Öğrenme verisi: kelime durumu, tekrar sonuçları, seri, XP, başarımlar, ders ve sınav sonuçları</td><td>Uygulamayı kullanırken</td><td>Aralıklı tekrar planı, ilerleme, sıralama</td><td>Sözleşmenin ifası</td><td>Hesap süresince</td></tr>
            <tr><td>Yazdığın ve söylediğin metinler (yazma görevleri, konuşma pratiği, sınav cevapları)</td><td>Sen</td><td>Yapay zekâ ile değerlendirme ve geri bildirim</td><td>Sözleşmenin ifası</td><td>Değerlendirmeler hesap süresince; konuşma pratiği kayıtları 30 gün</td></tr>
            <tr><td>Mikrofon ses kaydı</td><td>Yürüyüş modunda mikrofon</td><td>Söylediğin kelimeyi yazıya çevirmek</td><td>Açık rıza (m.5/1 / m.6(1)(a)); uygulama içi onay ekranı, geri alınabilir</td><td>Saklanmaz; tanıma biter bitmez silinir, yalnız tanınan metin tutulur</td></tr>
            <tr><td>Kullanım olayları: hangi ekran açıldı, tur başladı/bitti, ekran genişliği ve platform</td><td>Uygulama</td><td>Ürünü iyileştirme (birinci taraf analitik)</td><td>Meşru menfaat (m.5/2-f / m.6(1)(f)); ayarlardan kapatılabilir</td><td>Hesap süresince</td></tr>
            <tr><td>IP adresi ve tarayıcı/cihaz tanımı (oturum kaydında)</td><td>Bağlantın</td><td>Oturum güvenliği, kötüye kullanım ve hız sınırı</td><td>Meşru menfaat (güvenlik)</td><td>Oturum süresince (en çok 30 gün)</td></tr>
            <tr><td>Sosyal profil: kullanıcı adı, biyografi, görünürlük ve istek tercihleri</td><td>Sen</td><td>Arkadaşların ve (görünürlük &quot;herkese açık&quot; ise) diğer kullanıcıların seni bulması</td><td>Sözleşmenin ifası; tercihler için rıza</td><td>Hesap süresince</td></tr>
            <tr><td>Arkadaşlık istekleri, arkadaş listesi, engellemeler, kullanıcı bildirimleri</td><td>Sen ve arkadaşların</td><td>Arkadaşlık özellikleri, güvenlik ve moderasyon</td><td>Sözleşmenin ifası; meşru menfaat (güvenlik)</td><td>Hesap süresince; bildirimler inceleme kapanana kadar</td></tr>
            <tr><td>Etkinlik akışı, tepkiler, dürtmeler, ortak görevler, gelen kutusu bildirimleri</td><td>Uygulamayı kullanırken</td><td>Arkadaşlarınla ilerleme paylaşımı ve motivasyon (yalnız arkadaşlarına görünür)</td><td>Sözleşmenin ifası; &quot;etkinliğimi göster&quot; tercihiyle kapatılabilir</td><td>Hesap süresince</td></tr>
            <tr><td>Web push aboneliği (tarayıcı uç noktası ve şifreleme anahtarları)</td><td>Tarayıcın, izin verirsen</td><td>Web&apos;de hatırlatma bildirimleri</td><td>Rıza (tarayıcı izni)</td><td>İzin geri alınana ya da uç nokta geçersizleşene kadar</td></tr>
            <tr><td>Bildirim izni ve hatırlatma saati (Android)</td><td>Sen</td><td>Yerel hatırlatmalar (cihazda planlanır, sunucuya gitmez)</td><td>Rıza</td><td>Cihazda</td></tr>
            <tr><td>Satın alma ve abonelik durumu</td><td>Google Play / RevenueCat</td><td>Premium özellikleri açmak</td><td>Sözleşmenin ifası; yasal yükümlülük (muhasebe)</td><td>Hesap süresince; mali kayıtlar yasal süre boyunca</td></tr>
            <tr><td>İçerik bildirimlerin</td><td>Sen (&quot;Bildir&quot;)</td><td>Uygunsuz yapay zekâ yanıtlarını incelemek</td><td>Meşru menfaat (güvenli hizmet)</td><td>İnceleme kapanana kadar</td></tr>
            <tr><td>Bize yazdığın destek ve hak talepleri</td><td>Sen</td><td>Talebi cevaplamak, yasal kayıt</td><td>Yasal yükümlülük (KVKK m.13, GDPR m.12)</td><td>Talep kapandıktan sonra 2 yıl</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Toplamadıklarımız:</strong> konum, rehber, takvim, fotoğraf, reklam kimliği, cihaz kimliği, çökme raporu, özel nitelikli
        kişisel veri. Nomi reklam göstermez, üçüncü taraf analitik ya da takip SDK&apos;sı içermez, veri satmaz.
      </p>

      <h2>4. Mikrofon ve ses kayıtları</h2>
      <p>
        Yürüyüş modunda Türkçe ipucunu duyar, Almancasını söylersin. Ekran açıkken tanıma cihazında yapılır (Android konuşma tanıma
        servisi). Ekran kapalıyken ya da telefon cebindeyken ses, 16 kHz mono kayıt olarak sunucumuza gönderilir ve aşağıdaki konuşma
        tanıma sağlayıcılarından birine iletilir. Ses dosyası sunucuda ya da sağlayıcıda saklanmaz; yalnız tanınan metin, beklenen kelime ve
        klip süresi kullanım kaydına yazılır.
      </p>
      <ul>
        <li>Mikrofon yalnız sen yürüyüş modunu başlatınca açılır; sürekli bir bildirim görünür ve uygulamadan durdurabilirsin.</li>
        <li>Ekran kapalıyken kayıt, Android&apos;in mikrofon tipli ön plan servisiyle yapılır; sistem mikrofon göstergesi açık kalır.</li>
        <li>İlk kullanımda bu işlemi anlatan bir onay ekranı gösterilir; onaylamadan mod başlamaz. Onayı vermezsen mikrofon hiç kullanılmaz, uygulamanın geri kalanı çalışır.</li>
        <li>Tanıma sonucunda küfür maskelenir.</li>
      </ul>
      <h3>Açık rıza metni (mikrofon)</h3>
      <p>
        Uygulamada &quot;Kabul ediyorum, başla&quot;ya bastığında şu beyanı vermiş olursun: &quot;Yürüyüş modunda mikrofon kayıtlarımın, söylediğim
        kelimeyi yazıya çevirmek amacıyla Nomi sunucusuna ve bu politikanın 6. bölümünde listelenen, bir kısmı yurt dışında bulunan
        konuşma tanıma sağlayıcılarına aktarılmasına; kaydın işlem biter bitmez silinmesine açık rıza veriyorum. Bu rızayı Ayarlar › Gizlilik
        bölümünden dilediğim an geri alabileceğimi biliyorum.&quot;
      </p>

      <h2>4a. Sosyal özellikler ve görünürlük</h2>
      <ul>
        <li>Görünen adın haftalık sıralamada tüm kullanıcılara görünür; sıralamaya girmek istemiyorsan görünen adını boş bırakabilirsin (&quot;Öğrenci&quot; olarak görünürsün).</li>
        <li>Sosyal profilin (kullanıcı adı, biyografi, seviye, seri) varsayılan olarak <strong>herkese açık</strong>tır; Ayarlar › Sosyal&apos;den &quot;yalnız arkadaşlar&quot; ya da &quot;gizli&quot; yapabilir, arkadaşlık isteklerini ve önerilerde görünmeyi kapatabilirsin.</li>
        <li>Etkinlik akışı (tur tamamlama, seri kilometre taşı) yalnız arkadaşlarına görünür; &quot;etkinliğimi göster&quot; ile kapatılır.</li>
        <li>Bir kullanıcıyı engellediğinde iki taraf birbirini görmez; bildirdiğinde kayıt insan tarafından incelenir. Engelleme ve bildirim kayıtları karşı tarafa gösterilmez.</li>
        <li>Nomi&apos;de özel mesajlaşma yoktur; etkileşim yalnız tepkiler, dürtmeler ve ortak görevlerle olur.</li>
      </ul>

      <h2>4b. Otomatik karar verme ve profilleme</h2>
      <p>
        Aralıklı tekrar planı, günlük tur içeriği, seviye önerisi ve haftalık sıralama öğrenme verinden otomatik hesaplanır. Bunlar ürün
        işleyişinin parçasıdır, seni kapsamlı biçimde profillemez ve hakkında hukuki ya da benzer ölçüde önemli bir sonuç doğurmaz (GDPR
        m.22 kapsamına giren bir karar yoktur). Seviye önerisini istediğin zaman kendin değiştirebilirsin.
      </p>

      <h2>5. Yapay zekâ ile işlenen metinler</h2>
      <p>
        Konuşma pratiği (rol yapma), yazma görevleri ve sınav cevapların, geri bildirim üretmek için dil modeli sağlayıcılarına gönderilir.
        Gönderilen şey yalnız senin yazdığın/söylediğin metin ve dersin senaryosudur; ad ya da e-posta gönderilmez. Sağlayıcılar, verileri
        model eğitiminde kullanmamayı taahhüt eden API şartlarıyla ve veri işleme sözleşmeleriyle çalışır. Yapay zekâ karakterlerinin gerçek
        kişi olmadığı uygulamada açıkça belirtilir (AB Yapay Zekâ Tüzüğü m.50 şeffaflık). Yanıtlar hata içerebilir; her yanıtın altındaki
        &quot;Bildir&quot; ile bize iletebilirsin, bildirimler insan tarafından incelenir. Nomi hakkında yalnız otomatik işlemeye dayanan, hukuki
        sonuç doğuran bir karar vermez.
      </p>

      <h2>6. Verinin ulaştığı hizmet sağlayıcılar ve yurt dışına aktarım</h2>
      <p>
        Aşağıdaki sağlayıcılar yalnız belirtilen amaçla ve yalnız o iş için gereken veriyle çalışır; hiçbiri veriyi kendi amaçları için
        kullanamaz. Sunucularımız Almanya&apos;dadır. Türkiye&apos;den AB&apos;ye ve AB&apos;den ABD/Birleşik Krallık&apos;a yapılan aktarımlarda kullanılan
        güvence son sütundadır: KVKK m.9 kapsamında Kurul&apos;un ilan ettiği standart sözleşme ve GDPR Bölüm V kapsamında standart sözleşme
        hükümleri ya da yeterlilik kararı.
      </p>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Sağlayıcı</th><th>Ne için</th><th>Hangi veri</th><th>Bölge</th><th>Güvence</th><th>Ne zaman</th></tr></thead>
          <tbody>
            {PROCESSORS.map((p) => (
              <tr key={p.name}><td>{p.name}</td><td>{p.purpose}</td><td>{p.data}</td><td>{p.region}</td><td>{p.safeguard}</td><td>{p.when ?? "Her zaman"}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Verilerin kamu kurumlarına aktarımı yalnız yasal bir zorunluluk ya da yetkili makam talebi hâlinde ve talep kapsamıyla sınırlı yapılır.</p>

      <h2>7. Çerezler ve yerel depolama</h2>
      <p>
        Web&apos;de yalnız zorunlu oturum çerezi kullanılır (giriş yaptığını hatırlamak için, 30 gün); bu nedenle çerez onay bandı yoktur.
        Pazarlama ya da takip çerezi kullanmayız. Tarayıcı ve uygulama yerel depolamasında tema, ses ve bildirim tercihleri, avatar seçimi ve
        yarım kalan ders gibi bilgiler tutulur; bunlar cihazından çıkmaz.
      </p>

      <h2>8. Ürün analitiği ve kapatma</h2>
      <p>
        Nomi, hangi özelliklerin kullanıldığını anlamak için kendi sunucusuna kısa kullanım olayları yazar (ör. &quot;tur tamamlandı&quot;).
        Olaylar kapalı bir listeden gelir, serbest metin içermez ve üçüncü tarafa gitmez. Ayarlar › Gizlilik bölümünden &quot;Kullanım verisi
        gönder&quot; anahtarıyla bunu kapatabilirsin (KVKK ve GDPR m.21 itiraz hakkı); kapatınca yalnız hizmet için zorunlu kayıtlar tutulur.
      </p>

      <h2>8a. Ticari elektronik ileti</h2>
      <p>
        Sana yalnız hizmetle ilgili iletiler göndeririz: e-posta doğrulama, parola sıfırlama, hesap ve güvenlik bildirimleri, izin verdiğin
        hatırlatmalar. 6563 sayılı Kanun kapsamında ticari elektronik ileti göndermeyiz; ileride pazarlama iletisi göndermek istersek İleti
        Yönetim Sistemi (İYS) üzerinden ayrıca onayını alırız ve her iletide ret yolu bulunur.
      </p>

      <h2>9. Saklama süreleri</h2>
      <ul>
        <li>Hesap ve öğrenme verisi: hesabın açık olduğu sürece; hesap silinince tümü silinir.</li>
        <li>Konuşma pratiği kayıtları (söylediğin cümle ve model yanıtı): 30 gün, sonra kendiliğinden silinir.</li>
        <li>Ses kayıtları: saklanmaz.</li>
        <li>Oturum kayıtları (IP, cihaz tanımı): oturum süresince, en çok 30 gün.</li>
        <li>Mali kayıtlar (abonelik faturaları): Türk Ticaret Kanunu ve Vergi Usul Kanunu&apos;nun öngördüğü süre (10 yıl), yalnız Google Play&apos;in bize ilettiği kadarıyla.</li>
        <li>Hak talepleri yazışmaları: talep kapandıktan sonra 2 yıl.</li>
        <li>Sunucu yedekleri: silinen veriler yedeklerden en geç <Ph k="backupRetentionDays" /> gün içinde düşer; yedekler yalnız felaket kurtarma için kullanılır, silinen hesap yedekten geri yüklenmez.</li>
      </ul>

      <h2>10. Hakların</h2>
      <p>KVKK m.11 ve GDPR m.15-22 uyarınca şunları isteyebilirsin:</p>
      <ul>
        <li>Verilerinin işlenip işlenmediğini öğrenmek, bilgi istemek ve bir kopyasını makine tarafından okunabilir biçimde almak (erişim ve taşınabilirlik),</li>
        <li>Eksik ya da yanlış veriyi düzeltmek (ad ve tercihleri Ayarlar&apos;dan kendin değiştirebilirsin),</li>
        <li>Verilerinin silinmesini ya da yok edilmesini istemek (11. bölümdeki hesap silme yolu),</li>
        <li>İşlemenin kısıtlanmasını istemek ve meşru menfaate dayanan işlemeye itiraz etmek (analitik anahtarı),</li>
        <li>Açık rızanı geri almak (mikrofon onayı; geri alma önceki işlemenin hukukiliğini etkilemez),</li>
        <li>Verilerin üçüncü kişilere aktarılması hâlinde düzeltme ve silmenin onlara bildirilmesini istemek,</li>
        <li>Zarara uğraman hâlinde tazminat talep etmek.</li>
      </ul>
      <p>
        <strong>Başvuru:</strong> <Ph k="privacyEmail" /> adresine yaz; kimliğini doğrulamak için hesabındaki e-posta adresinden yazman
        yeterlidir. Türkiye&apos;de KVKK Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca yazılı başvuru ya da KEP
        (<Ph k="kep" />) da kullanılabilir. Talepleri en geç 30 gün içinde ücretsiz sonuçlandırırız; GDPR kapsamında bu süre gerekirse iki
        ay uzatılabilir ve sana bildirilir.
      </p>
      <p>
        <strong>Şikâyet:</strong> Türkiye&apos;de Kişisel Verileri Koruma Kurulu&apos;na (kvkk.gov.tr); AB&apos;de bulunduğun ülkenin veri koruma
        otoritesine, Birleşik Krallık&apos;ta ICO&apos;ya başvurabilirsin. Önce bize yazmanı rica ederiz; çoğu talebi doğrudan çözebiliriz.
      </p>

      <h2>11. Hesabını ve verilerini silme</h2>
      <p>
        Hesabını iki yoldan silebilirsin: uygulamada <strong>Profil › Ayarlar › Hesap › Hesabı sil</strong>, ya da web&apos;de{" "}
        <Link href={LEGAL_PATHS.deleteAccount}>www.exfe.me{LEGAL_PATHS.deleteAccount}</Link>. Silme anında hesabın, ilerlemen, yazıların,
        konuşma kayıtların, kullanım olayların ve sosyal izlerin (arkadaşlıklar, tepkiler) kalıcı olarak silinir; geri alınamaz. Yasal
        saklama yükümlülüğü olan mali kayıtlar anonimleştirilerek tutulur. Google Play aboneliğin varsa onu Play Store üzerinden ayrıca
        iptal etmen gerekir.
      </p>

      <h2>12. Çocuklar</h2>
      <p>
        Nomi 16 yaşından küçükler için tasarlanmamıştır ve onlardan bilerek veri toplamaz; AB&apos;de GDPR m.8 kapsamındaki yaş sınırları ve
        Türkiye&apos;de ergin olmayanlara ilişkin hükümler gözetilir. İçerik yetişkin öğrencilere ve Goethe/telc sınav hazırlığına yöneliktir. Bir
        çocuğun hesap açtığını fark edersek hesabı ve verileri sileriz; ebeveynler <Ph k="privacyEmail" /> adresine yazabilir.
      </p>

      <h2>13. Güvenlik</h2>
      <p>
        Tüm bağlantılar HTTPS ile şifrelenir. Parolalar geri döndürülemez özet olarak saklanır. Sunucuya erişim anahtarla sınırlıdır;
        giriş denemeleri hız sınırına tabidir. Hesap silme gibi yıkıcı işlemler parola ya da yeni bir oturum ister. Kişisel verileri etkileyen
        bir ihlalde KVKK (72 saat içinde Kurul&apos;a) ve GDPR m.33-34 uyarınca bildirim yaparız ve seni bilgilendiririz.
      </p>

      <h2>14. Değişiklikler</h2>
      <p>
        Politikayı değiştirdiğimizde bu sayfadaki yürürlük tarihi ve sürüm güncellenir; işleme amaçlarını genişleten bir değişiklikte
        uygulama içinde bilgilendirir ve gerekiyorsa yeniden onay isteriz. Sorular için: <Ph k="privacyEmail" />.
      </p>
    </LegalShell>
  );
}
