import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";
import { LEGAL_CONTACT_EMAIL, LEGAL_CONTROLLER, LEGAL_HOSTING, LEGAL_PATHS, PROCESSORS } from "@/lib/legal";

export const metadata = {
  title: "Gizlilik Politikası",
  description: "Nomi'nin hangi verileri, neden ve ne kadar süreyle işlediği; haklarınız ve hesap silme.",
};

/**
 * Gizlilik politikası (KVKK aydınlatma metni + GDPR bilgilendirme + Google Play
 * gizlilik politikası şartı). Uygulama içinden, giriş ekranından, mağaza
 * listesinden ve Play Console'dan bağlanır. Veri türleri ve sağlayıcılar
 * lib/legal.ts ile aynı kaynaktan; kod değişince önce o liste güncellenir.
 */
export default function PrivacyPage() {
  return (
    <LegalShell
      title="Gizlilik Politikası"
      summary="Nomi bir Almanca öğrenme uygulamasıdır. Hesabını yürütmek için e-posta ve adını, öğrenmeni takip etmek için ilerleme verini işleriz. Yürüyüş modunda mikrofon sesin, konuşmanı yazıya çevirmek için sunucumuza ve konuşma tanıma sağlayıcılarına gönderilir; ses kaydı saklanmaz. Reklam, reklam kimliği ve üçüncü taraf analitik yoktur. Hesabını dilediğin an uygulamadan ya da web'den silebilirsin."
    >
      <h2>1. Veri sorumlusu ve iletişim</h2>
      <p>
        Bu politika kapsamındaki kişisel verilerin sorumlusu <strong>{LEGAL_CONTROLLER}</strong>&apos;dır. Gizlilikle ilgili her soru,
        talep ve itiraz için: <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>. Sunucularımız {LEGAL_HOSTING} üzerinde çalışır.
      </p>
      <p>
        Politika, Nomi web uygulamasını (www.exfe.me) ve Android uygulamasını kapsar. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
        ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) uyarınca hazırlanmıştır.
      </p>

      <h2>2. Hangi verileri, neden işliyoruz</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Veri</th><th>Nereden</th><th>Amaç</th><th>Hukuki dayanak</th><th>Saklama</th></tr>
          </thead>
          <tbody>
            <tr><td>E-posta adresi, ad, parola özeti</td><td>Kayıt formu ya da Google hesabın</td><td>Hesap açma, giriş, parola sıfırlama, doğrulama e-postası</td><td>Sözleşmenin ifası</td><td>Hesap süresince</td></tr>
            <tr><td>Görünen ad, avatar seçimi, seviye, kurs, günlük hedef, ses tercihi</td><td>Sen</td><td>Kişiselleştirme; görünen ad haftalık sıralamada diğer kullanıcılara görünür</td><td>Sözleşmenin ifası</td><td>Hesap süresince</td></tr>
            <tr><td>Öğrenme verisi: kelime durumu, tekrar sonuçları, seri, XP, başarımlar, ders ve sınav sonuçları</td><td>Uygulamayı kullanırken</td><td>Aralıklı tekrar planı, ilerleme, sıralama</td><td>Sözleşmenin ifası</td><td>Hesap süresince</td></tr>
            <tr><td>Yazdığın ve söylediğin metinler (yazma görevleri, konuşma pratiği, sınav cevapları)</td><td>Sen</td><td>Değerlendirme ve geri bildirim (yapay zekâ ile)</td><td>Sözleşmenin ifası</td><td>Değerlendirmeler hesap süresince; konuşma pratiği kayıtları 30 gün</td></tr>
            <tr><td>Mikrofon ses kaydı</td><td>Yürüyüş modunda mikrofon</td><td>Söylediğin kelimeyi yazıya çevirmek</td><td>Açık rıza (uygulama içi onay ekranı)</td><td>Saklanmaz; tanıma biter bitmez silinir, yalnız tanınan metin tutulur</td></tr>
            <tr><td>Kullanım olayları: hangi ekran açıldı, tur başladı/bitti, ekran genişliği ve platform</td><td>Uygulama</td><td>Ürünü iyileştirme (birinci taraf analitik)</td><td>Meşru menfaat; ayarlardan kapatılabilir</td><td>Hesap süresince</td></tr>
            <tr><td>IP adresi ve tarayıcı/cihaz tanımı (oturum kaydında)</td><td>Bağlantın</td><td>Oturum güvenliği, kötüye kullanım ve hız sınırı</td><td>Meşru menfaat</td><td>Oturum süresince (en çok 30 gün)</td></tr>
            <tr><td>Bildirim izni ve hatırlatma saati</td><td>Sen</td><td>Yerel hatırlatmalar (cihazda planlanır)</td><td>Rıza</td><td>Cihazda</td></tr>
            <tr><td>Satın alma ve abonelik durumu</td><td>Google Play / RevenueCat</td><td>Premium özellikleri açmak</td><td>Sözleşmenin ifası</td><td>Hesap süresince</td></tr>
            <tr><td>İçerik bildirimlerin</td><td>Sen (&quot;Bildir&quot;)</td><td>Uygunsuz yapay zekâ yanıtlarını incelemek</td><td>Meşru menfaat</td><td>İnceleme kapanana kadar</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Toplamadıklarımız:</strong> konum, rehber, takvim, fotoğraf, reklam kimliği, cihaz kimliği, çökme raporu. Nomi reklam
        göstermez ve üçüncü taraf analitik ya da takip SDK&apos;sı içermez.
      </p>

      <h2>3. Mikrofon ve ses kayıtları</h2>
      <p>
        Yürüyüş modunda Türkçe ipucunu duyar, Almancasını söylersin. Ekran açıkken tanıma cihazında yapılır (Android konuşma tanıma
        servisi). Ekran kapalıyken ya da telefon cebindeyken ses, 16 kHz mono kayıt olarak sunucumuza gönderilir ve aşağıdaki konuşma
        tanıma sağlayıcılarından birine iletilir. Ses dosyası sunucuda ya da sağlayıcıda saklanmaz; yalnız tanınan metin, beklenen kelime ve
        klip süresi kullanım kaydına yazılır.
      </p>
      <ul>
        <li>Mikrofon yalnız sen yürüyüş modunu başlatınca açılır; sürekli bir bildirim görünür ve bildirimden ya da uygulamadan durdurabilirsin.</li>
        <li>Ekran kapalıyken kayıt, Android&apos;in mikrofon tipli ön plan servisiyle yapılır; sistem mikrofon göstergesi açık kalır.</li>
        <li>İlk kullanımda bu işlemi anlatan bir onay ekranı gösterilir; onaylamadan mod başlamaz. Onayı vermezsen mikrofon hiç kullanılmaz, uygulamanın geri kalanı çalışır.</li>
        <li>Tanıma sonucunda küfür maskelenir.</li>
      </ul>

      <h2>4. Yapay zekâ ile işlenen metinler</h2>
      <p>
        Konuşma pratiği (rol yapma), yazma görevleri ve sınav cevapların, geri bildirim üretmek için dil modeli sağlayıcılarına gönderilir.
        Gönderilen şey yalnız senin yazdığın/söylediğin metin ve dersin senaryosudur; ad ya da e-posta gönderilmez. Sağlayıcılar bu
        metinleri model eğitiminde kullanmamayı taahhüt eden API şartlarıyla kullanılır. Yapay zekâ yanıtları hata içerebilir; her yanıtın
        altındaki &quot;Bildir&quot; ile bize iletebilirsin, bildirimler insan tarafından incelenir.
      </p>

      <h2>5. Verinin ulaştığı hizmet sağlayıcılar</h2>
      <p>Aşağıdaki sağlayıcılar yalnız belirtilen amaçla ve yalnız o iş için gereken veriyle çalışır. Hiçbiri veriyi kendi amaçları için kullanamaz.</p>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Sağlayıcı</th><th>Ne için</th><th>Hangi veri</th><th>Bölge</th><th>Ne zaman</th></tr></thead>
          <tbody>
            {PROCESSORS.map((p) => (
              <tr key={p.name}><td>{p.name}</td><td>{p.purpose}</td><td>{p.data}</td><td>{p.region}</td><td>{p.when ?? "Her zaman"}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>6. Yurt dışına aktarım</h2>
      <p>
        Sunucularımız Almanya&apos;dadır. Konuşma tanıma ve dil modeli sağlayıcılarının bir kısmı ABD ve Birleşik Krallık&apos;ta bulunur; bu
        aktarımlar KVKK m.9 ve GDPR Bölüm V kapsamında, sağlayıcıların standart sözleşme hükümleri ve veri işleme sözleşmeleriyle yapılır.
        Aktarılan veri, ilgili özelliğin gerektirdiğiyle sınırlıdır (ses klibi ya da metin).
      </p>

      <h2>7. Çerezler ve yerel depolama</h2>
      <p>
        Web&apos;de yalnız oturum çerezi kullanılır (giriş yaptığını hatırlamak için, 30 gün). Pazarlama ya da takip çerezi yoktur. Tarayıcı ve
        uygulama yerel depolamasında tema, ses ve bildirim tercihleri, avatar seçimi ve yarım kalan ders gibi bilgiler tutulur; bunlar
        cihazından çıkmaz.
      </p>

      <h2>8. Ürün analitiği ve kapatma</h2>
      <p>
        Nomi, hangi özelliklerin kullanıldığını anlamak için kendi sunucusuna kısa kullanım olayları yazar (ör. &quot;tur tamamlandı&quot;).
        Olaylar kapalı bir listeden gelir, serbest metin içermez ve üçüncü tarafa gitmez. Ayarlar › Gizlilik bölümünden &quot;Kullanım verisi
        gönder&quot; anahtarıyla bunu kapatabilirsin; kapatınca yalnız hizmet için zorunlu kayıtlar (ilerleme, oturum) tutulur.
      </p>

      <h2>9. Saklama süreleri</h2>
      <ul>
        <li>Hesap ve öğrenme verisi: hesabın açık olduğu sürece; hesap silinince tümü silinir.</li>
        <li>Konuşma pratiği kayıtları (söylediğin cümle ve model yanıtı): 30 gün, sonra kendiliğinden silinir.</li>
        <li>Ses kayıtları: saklanmaz.</li>
        <li>Oturum kayıtları (IP, cihaz tanımı): oturum süresince, en çok 30 gün.</li>
        <li>E-posta doğrulama ve parola sıfırlama bağlantıları: kullanılana ya da süresi dolana kadar.</li>
      </ul>

      <h2>10. Hakların</h2>
      <p>KVKK m.11 ve GDPR m.15-22 uyarınca şunları isteyebilirsin:</p>
      <ul>
        <li>Verilerinin işlenip işlenmediğini öğrenmek ve bir kopyasını almak (erişim ve taşınabilirlik),</li>
        <li>Eksik ya da yanlış veriyi düzeltmek (ad ve tercihleri Ayarlar&apos;dan kendin değiştirebilirsin),</li>
        <li>Verilerinin silinmesini istemek (aşağıdaki hesap silme yolu),</li>
        <li>Meşru menfaate dayanan işlemeye itiraz etmek (analitik anahtarı),</li>
        <li>Açık rızanı geri almak (mikrofon onayı; geri alınca yürüyüş modu kapanır, kalan her şey çalışır),</li>
        <li>Yetkili makama şikâyet etmek: Türkiye&apos;de Kişisel Verileri Koruma Kurulu, AB&apos;de bulunduğun ülkenin veri koruma otoritesi.</li>
      </ul>
      <p>
        Talepler için {LEGAL_CONTACT_EMAIL} adresine yaz; kimliğini doğrulamak için hesabındaki e-posta adresinden yazman yeterlidir.
        En geç 30 gün içinde yanıtlarız.
      </p>

      <h2>11. Hesabını ve verilerini silme</h2>
      <p>
        Hesabını iki yoldan silebilirsin: uygulamada <strong>Profil › Ayarlar › Hesap › Hesabı sil</strong>, ya da web&apos;de{" "}
        <Link href={LEGAL_PATHS.deleteAccount}>www.exfe.me{LEGAL_PATHS.deleteAccount}</Link>. Silme anında hesabın, ilerlemen, yazıların,
        konuşma kayıtların, kullanım olayların ve sosyal izlerin (arkadaşlıklar, tepkiler) kalıcı olarak silinir; geri alınamaz. Google Play
        aboneliğin varsa onu Play Store üzerinden ayrıca iptal etmen gerekir.
      </p>

      <h2>12. Çocuklar</h2>
      <p>
        Nomi 16 yaşından küçükler için tasarlanmamıştır ve onlardan bilerek veri toplamaz. İçerik yetişkin öğrencilere ve Goethe/telc
        sınav hazırlığına yöneliktir. Bir çocuğun hesap açtığını fark edersek hesabı ve verileri sileriz; ebeveynler {LEGAL_CONTACT_EMAIL}
        adresine yazabilir.
      </p>

      <h2>13. Güvenlik</h2>
      <p>
        Tüm bağlantılar HTTPS ile şifrelenir. Parolalar geri döndürülemez özet olarak saklanır. Sunucuya erişim anahtarla sınırlıdır;
        giriş denemeleri hız sınırına tabidir. Hesap silme gibi yıkıcı işlemler parola ya da yeni bir oturum ister.
      </p>

      <h2>14. Değişiklikler</h2>
      <p>
        Politikayı değiştirdiğimizde bu sayfadaki yürürlük tarihi ve sürüm güncellenir; işleme amaçlarını genişleten bir değişiklikte
        uygulama içinde bilgilendirir ve gerekiyorsa yeniden onay isteriz.
      </p>
    </LegalShell>
  );
}
