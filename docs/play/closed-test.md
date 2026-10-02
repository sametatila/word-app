# Kapalı test (Play `alpha`) — süreç ve geri bildirim kaydı

Üretim erişimi başvurusundaki anket test sürecini, testçilerden gelen geri bildirimi ve
yapılan değişiklikleri soruyor. Cevaplar buradan yazılır. Testçi adı yazılmaz.

## Süreç

| Tarih | Olay |
|---|---|
| 2026-10-02 17:03 | Build 17 (1.0.0) kapalı teste gönderildi (mağaza girişi, uygulama içeriği, ön plan hizmeti videosu dahil) |
| 2026-10-02 17:34 | Onaylandı, yayında; ülkeler Almanya ve Türkiye, testçiler "Test" e-posta listesi |
| 2026-10-02 akşam | 12 testçi katıldı, 14 günlük sayaç başladı → 2026-10-16 |

## Geri bildirim

| Tarih | Geri bildirim | Kaç testçi | Yapılan | Durum |
|---|---|---|---|---|
| 2026-10-03 | Onboarding'de kendi dilini seçince uygulama karşılama ekranına geri atıyor | 2 | Sebep: dil değişince ekran yeni dilde baştan kuruluyor ve akışın adımı sıfırlanıyordu (cihaz dilinden farklı dil seçende). Adım ve seçimler artık yeniden kurulmada korunuyor; test `mobile/__tests__/onboardingLang.test.tsx` | Düzeltildi, sonraki build'de |
