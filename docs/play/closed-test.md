# Kapalı test (Play `alpha`) — süreç ve geri bildirim kaydı

Üretim erişimi başvurusundaki anket test sürecini, testçilerden gelen geri bildirimi ve
yapılan değişiklikleri soruyor. Cevaplar buradan yazılır. Testçi adı yazılmaz.

## Süreç

| Tarih | Olay |
|---|---|
| 2026-10-02 17:03 | Build 17 (1.0.0) kapalı teste gönderildi (mağaza girişi, uygulama içeriği, ön plan hizmeti videosu dahil) |
| 2026-10-02 17:34 | Onaylandı, yayında; ülkeler Almanya ve Türkiye, testçiler "Test" e-posta listesi |
| 2026-10-02 akşam | 12 testçi katıldı, 14 günlük sayaç başladı → 2026-10-16 |
| 2026-10-03 | Build 18 (1.0.0) kapalı teste gönderildi |
| 2026-10-06 / 10-07 | Build 20 ve 22 (1.0.0) kapalı teste |
| 2026-10-15 | Build 23 (1.0.1) kapalı teste gönderildi (API, `completed`; Google incelemesi) |
| 2026-10-16 ~20:00 | 14 gün doluyor |
| 2026-10-16 | Samet üretim erişimine başvurdu (anket cevapları aşağıda); Google kararı bekleniyor |

## Geri bildirim

| Tarih | Geri bildirim | Kaç testçi | Yapılan | Durum |
|---|---|---|---|---|
| 2026-10-03 | Seviye testi yanlış seviye veriyor ("B2 çıktı ama değilim", "B1 çıktı ama C1'im") | 3–4 | Sebep: onboarding testi 8 sabit soru ve doğru sayısıyla eşikti (şansla seviye atlıyor, C1 hiç çıkmıyor). Yerine uyarlanabilir test: öz değerlendirme, uydurma kelimeli kelime kartları, "Bilmiyorum"lu sorular, sonuçta "bu seviyede" listesi ve ±1 seçim, ilk hafta seviye önerisi. Benzetimde tam isabet %38 → %73, iki seviye sapma %7 → %0,4 (`docs/plan/placement-v2.md`) | Sonraki build'de; testçilerle doğrulanacak |
| 2026-10-03 | Onboarding'de kendi dilini seçince uygulama karşılama ekranına geri atıyor | 2 | Sebep: dil değişince ekran yeni dilde baştan kuruluyor ve akışın adımı sıfırlanıyordu (cihaz dilinden farklı dil seçende). Adım ve seçimler artık yeniden kurulmada korunuyor; test `mobile/__tests__/onboardingLang.test.tsx` | Düzeltildi, sonraki build'de |

## Üretim erişimi anketi (2026-10-16, gönderildi)

Samet cevapları birinci tekil kişiyle ("ben") gönderdi; metinler aşağıda o hâliyle. Her metin kutusu en çok 300 karakter.

| Soru | Cevap |
|---|---|
| Testçileri nereden buldunuz? | Arkadaşlarımdan, ailemden ve Almanca öğrenen tanıdıklarımdan rica ettim. Ücretli test hizmeti kullanmadım. Testçileri Play'deki e-posta listesine ekledim; Almanya ve Türkiye'den 12 kişi 14 gün boyunca katıldı. |
| Bulmak ne kadar kolaydı? | Kolay |
| Nasıl bir etkileşim aldınız? | Testçiler kelime tekrarı, Patika konuşmaları, seviye testi, deneme sınavları ve yürüyüş modunu (ekran kapalıyken sesli tekrar) kullandı. Kullanım beklentimle örtüştü; seviye testi beklenenden çok ilgi gördü ve en çok geri bildirim oradan geldi. |
| Geri bildirim özeti ve toplama yolu | Geri bildirimi uygulama içi Bildir düğmesi ve doğrudan mesajlarla topladım. Başlıcaları: seviye testi yanlış seviye veriyordu (uyarlanabilir teste geçtim), dil seçince karşılama ekranına dönülüyordu (düzeltildi), ses tanıma ve sohbet akışı iyileştirildi. Test boyunca 4 güncelleme yayınladım. |
| Hedef kitle | Almanca öğrenen Türkçe konuşanlar: Almanya'da okumak isteyen lisans ve yüksek lisans öğrencileri, Almanya'da iş arayanlar ve aile birleşimi ya da oturum izni için dil sınavına (A1–B1) hazırlananlar. Uygulamada İngilizce kursu da var. |
| Kullanıcıya değeri | Kelimeleri aralıklı tekrarla kalıcı öğretir, Patika'da günlük hayat konuşmalarını sesli pratik ettirir ve yapay zekâyla geri bildirim verir. Gerçek sınav biçiminde deneme sınavları, ekran kapalıyken sesli çalışılan yürüyüş modu ve uyarlanabilir seviye testi sunar. |
| İlk yıl yükleme beklentisi | 10 bin - 100 bin |
| Testten sonra yapılan değişiklikler | Seviye testini uyarlanabilir teste çevirdim. Dil seçince karşılama ekranına dönme hatasını düzelttim. Yürüyüş modunda ekran kapalıyken dinlemeyi ve ses tanımayı iyileştirdim. Her ekrana Bildir düğmesi, uygulama içi abonelik yönetimi ve tek harflik yazım hatasına tolerans ekledim. |
| Üretime hazır kararı | Testçilerin bildirdiği hataları düzelttim ve düzeltmeleri sonraki güncellemelerle testçilere gönderdim. Açık kritik hata kalmadı. Aynı uygulama App Store incelemesinden geçti ve yayında. Hata ve çökme izleme, sunucu uyarıları ve yedekleme canlıda çalışıyor. |
