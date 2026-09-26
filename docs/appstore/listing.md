# App Store — yaş derecelendirmesi ve diğer alanlar (Lernomi, iOS)

`docs/play/listing.md`'nin iOS karşılığı. Vitrin metinleri (ad, altyazı, açıklama, anahtar
kelime, tanıtım metni) ve kareler `docs/store/README.md`'de; ad ve marka sorgusu
`docs/play/listing.md` §4'te. Bölüm numaraları kod mesajlarında geçtiği için korunuyor
(`scripts/check-age-rating.ts` → §2.3).

## 2. Yaş derecelendirmesi

### 2.1 Play'de 18+ kararı ve gerekçesi

Play'de hedef kitle **yalnız 18 ve üzeri** (`docs/play/listing.md` §1). İki gerekçe:

1. **Metin böyle diyor.** Kullanım şartları §3 hesap açmayı 18 yaşla sınırlıyor, gizlilik
   politikası §12 aynı yaşı söylüyor. Kodda doğrulayan bir yaş kapısı yok (kayıtta ve misafir
   girişinde yalnız 18 yaş beyanı içeren kabul satırı), doğruyu metin taşıyor; beyanlar
   birbirini tutmalı.
2. **16–17 eklemek Aileler politikasını açardı.** Açık uçlu yapay zekâ sohbeti ve kullanıcılar
   arası sosyal katman (görünen ad, kullanıcı adı, lig) o kapsamda ek gereklilik doğuruyor.

Play'in IARC içerik derecelendirmesi ayrı bir düğme ve ankete göre hesaplanıyor; hedef kitleyle
farklı çıkması normal.

### 2.2 Apple'da tek düğme var

App Store'da ayrı bir "hedef kitle" alanı yok. Tek bir yaş derecesi var ve onu Connect'teki
ankete verilen cevaplardan **Apple hesaplıyor**. 2025'ten beri kademeler 4+ / 9+ / 13+ / 16+ /
18+ ve ankette içerik sorularının yanında **yetenek** soruları var (kullanıcı içeriği,
mesajlaşma, web erişimi, reklam, denetimler).

### 2.3 Anket cevapları — Connect'te dolduruldu (2026-09-10)

İçerik soruları **None / Infrequent / Frequent** ile soruluyor. Cevaplar içerik taranarak
verildi; `scripts/check-age-rating.ts` içeriği bu cevaplara karşı denetliyor ve cevap değişirse
bu tablo da değişir.

**Yetenekler**

| Soru | Cevap | Dayanak |
|---|---|---|
| Parental Controls / Age Assurance | Hayır | Doğrulayan yaş kapısı yok (yalnız beyan satırı); 18 sınırı sözleşme koşulu |
| Sınırsız web erişimi | **Hayır** | Uygulama içi tarayıcı yok. Hukuki sayfalar `Linking.openURL` ile sistem tarayıcısında; tek WebView `${API_BASE}/tts-bridge` ve gezinme yüzeyi değil |
| Kullanıcı üretimi içerik | **Evet** | Görünen ad ve kullanıcı adı başkalarına görünüyor (sıralama, profil). Süzgeç + bildir/engelle + insan incelemesi |
| **Social Media** | **Hayır** | Apple'ın tanımı kullanıcı içeriğinin bir akışta yayılması. `activity_events` yalnız sistem olayları taşıyor; tepkiler altı sabit türden, serbest metin yok |
| Kullanıcılar arası mesajlaşma | **Hayır** | Özel mesajlaşma yok; arkadaşlık, tepki ve dürtme sabit biçimli |
| Reklam | Hayır | Reklam SDK'sı yok |

**İçerik**

| Soru | Cevap | Dayanak |
|---|---|---|
| Müstehcen mizah / kaba dil | None | STT sonucunda küfür maskeleniyor (`src/lib/moderation.ts`) |
| Korku / gerilim | None | — |
| **Alkol, tütün, uyuşturucu** | **Infrequent** | yaklaşık 8.700 kelimenin 14'ü (`Bier`, `Wein`, `rauchen`, `Zigarette`, `Alkohol`, `betrunken`, `Kneipe`, `Prost`, `Raucher`, `Nichtraucher`, `Droge`, `Sucht`, `süchtig`, `anstoßen`). Atıf var, None yanlış olurdu; binde iki, Frequent de değil |
| Tıbbi / tedavi bilgisi | None | "Doktor randevusu" bir Konuşma adımı sahnesi; sağlık konuşmaları dil pratiği, teşhis yok. Frequent "Regulated Medical Device" beyanını açardı |
| Health or Wellness Topics | Hayır | "Check-up" konuşması `sollte` ile öneri kurmayı öğretiyor; öneri dilbilgisi hedefine ait |
| **Mature or Suggestive Themes** | **Infrequent** | 269 içerik dosyasında 107 geçiş: işsizlik 34, ölüm 25, ayrılık 13, yalnızlık 12, göç 10, kaçış 5. B1–C1 metinlerinin doğal konuları |
| Cinsel içerik / çıplaklık | None | `sex`, `sexuell`, `erotik`, `nackt`, `intim`: sıfır geçiş |
| Şiddet (silahlar dahil) | None | `Gewalt` yalnız B1 hırsızlık ünitesinde kelime maddesi; `Krieg`, `Angriff`, `Kampf` ve silah geçişleri mecaz ya da tasvirsiz; tek kesici alet çatal-bıçak |
| **Contests** | **Frequent** | Apple'ın tanımı ödül şartı koymuyor ("rankings, rewards, or personal goals"). Haftalık lig (küme sıralaması, yükselme/düşme, haftalık sıfırlama) tanıma giriyor |
| Simulated Gambling / Gambling / Loot Boxes | None / Hayır / Hayır | Şansa ya da paraya dayalı mekanik yok. Kelime turundaki "Meydan okuma" doğru cevaba bağlı XP çarpanı; `check:age-rating` arayüz sözlüklerini bahis dili için tarıyor |
| Uygulama içi satın alma | **Evet** | Connect'te ayrı alan |
| Yapay zekâ ile üretilen içerik | **Evet** | Konuşma adımındaki sohbet; "gerçek kişi değil" bildirimi kalıcı, yanıtlarda "Bildir" |

**Sonuç: hesaplanan 13+, elle 18+'a yükseltildi** (Connect'te görüldü, 2026-09-10). Alkol ve
gerçek dünya konuları dereceyi 13+'a çekti; aynı iki cevap yüzünden Apple uygulamayı
Afganistan ve Fas'ta satmıyor (otomatik, yerel mevzuat).

### 2.4 Neden 18+'a yükseltildi

Hesaplanan derece içeriğin sertliğini ölçüyor ve 13+ ona göre doğru. Ama hesap açmak şartlar §3
gereği 18+ ve Play'de hedef kitle de 18+. Doğrulayan yaş kapısı yokken 13+ diyen vitrin on dört
yaşındakini davet eder ve o kişinin sesi ve metni yapay zekâ sağlayıcılarına gider (KVKK ve
GDPR'da veli onayı gerektiren akış). Apple'ın **Override to Higher Age Rating** kutusu tam bu
durum için ("has a EULA with age requirements") ve kullanıldı. Bedeli (keşfedilirlik, ebeveyn
denetimi) bilerek ödendi; karşılığında App Store, Play ve sözleşme aynı sayıyı söylüyor.

Değişmeyen kurallar:

1. Ankete **doğru** cevap verilir; dereceyi yükseltmek için anketi eğmek metadata ihlalidir,
   yol override.
2. "Made for Kids" / Kids kategorisi seçilmez.
3. Vitrinde çocuk vurgusu olmaz ("çocuk", "kids", "eğlenceli oyun" geçmez). Maskotun vitrinde ne
   kadar yer alacağı açık karar (denetim M15).

## 5. Diğer alanlar

Birincil dil Türkçe; kategori Education, ikincil Reference; Copyright `2026 Musa Atila`
(`LEGAL_ENTITY.providerName` ile aynı; Connect'teki yasal ad AB temsilcisininki değil). Support
URL `/support` (en `/support/en`, de `/support/de`), Marketing URL `https://www.lernomi.app`,
Privacy Policy URL `/privacy`. Açıklamanın sonunda Kullanım Şartları ve Gizlilik bağlantısı var
(3.1.2). DSA tüccar beyanı Connect'te aktif (denetim LEG-4).
