# Durum takibi

Her ajan aldığı WP'yi buraya işler: durum (`bekliyor` → `sürüyor` → `inceleme` → `bitti`), sahip, başlangıç, son commit, not. Bitmiş sayılma ölçütü README'deki DoD.

| WP | Başlık | Faz | Durum | Sahip | Başlangıç | Son commit | Not |
|---|---|---|---|---|---|---|---|
| WP-00 | Öğrenme ölçüm çerçevesi | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `kind` sütunu eklendi; `session_round` yazılmıyor (karar kaydı) |
| WP-01 | Beceri ilerlemesi sunucuya | 0 | bekliyor | | | | |
| WP-02 | Hata taksonomisi | 0 | bekliyor | | | | |
| WP-03 | AI değerlendirme servisi | 0 | bekliyor | | | | |
| WP-04 | Çevrimdışı rol yapma yedeği | 0 | bekliyor | | | | |
| WP-10 | Çeviri oyunu | 1 | bekliyor | | | | |
| WP-11 | Dönüştürme drilleri | 1 | bekliyor | | | | |
| WP-12 | Serbest cümle görevi | 1 | bekliyor | | | | |
| WP-13 | "Neden" geri bildirimi | 1 | bekliyor | | | | |
| WP-14 | Oyun merdiveni | 1 | bekliyor | | | | |
| WP-20 | Telaffuz puanlama | 2 | bekliyor | | | | sağlayıcı kararı önce |
| WP-21 | Konuşma içeriği + monolog | 2 | bekliyor | | | | |
| WP-22 | Rol yapma sınav modu | 2 | bekliyor | | | | |
| WP-23 | Açık diyalog motoru | 2 | bekliyor | | | | |
| WP-30 | AI yazma değerlendirmesi | 3 | bekliyor | | | | |
| WP-31 | Yazma / soru türleri | 3 | bekliyor | | | | |
| WP-40 | Yerleştirme testi | 4 | bekliyor | | | | |
| WP-41 | Seviye ve modül sınavı v2 | 4 | bekliyor | | | | |
| WP-42 | Haftalık kullanım sınavı | 4 | bekliyor | | | | |
| WP-43 | CEFR can-do haritası | 4 | bekliyor | | | | önce yapılır |
| WP-50 | Beceri yetkinlik modeli | 5 | bekliyor | | | | |
| WP-51 | Hata analitiği | 5 | bekliyor | | | | |
| WP-52 | Gelişim raporu | 5 | bekliyor | | | | |
| WP-60 | /learn yeniden kompozisyon | 6 | bekliyor | | | | |
| WP-61 | Geri bildirim bileşeni | 6 | bekliyor | | | | |
| WP-62 | Ders oynatıcı akışı | 6 | bekliyor | | | | |
| WP-63 | Beceri merkezi | 6 | bekliyor | | | | |
| WP-64 | Profil ve analitik | 6 | bekliyor | | | | |
| WP-65 | Onboarding + yerleştirme akışı | 6 | bekliyor | | | | |
| WP-66 | Erdi koç sesi | 6 | bekliyor | | | | |
| WP-70 | İçerik şeması ve doğrulayıcı | 7 | bekliyor | | | | en başta |
| WP-71 | Ders kapsamı B1–C1 | 7 | bekliyor | | | | sürekli |
| WP-72 | Konuşma/yazma/okuma içeriği | 7 | bekliyor | | | | sürekli |
| WP-73 | Gerekçe ve kural parçacıkları | 7 | bekliyor | | | | |

## Karar kaydı

Plan uygulanırken alınan ürün/teknik kararlar (tarih, karar, gerekçe, kim):

- 2026-08-25 — Plan yazıldı; kaynak `reports/ogrenme-kesif-raporu.html`.
- 2026-08-25 — `events` tablosuna `kind text` sütunu (kapalı sözlük etiketi, ≤32 karakter, sunucuda doğrulanır). Gerekçe: üretim türü+puan, beceri+seviye+puan gibi iki boyutlu olaylar tek tam sayıya sığmıyordu; serbest metin yasağı sürüyor. Claude.
- 2026-08-25 — `session_round` olayı yazılmıyor: `reviews` zaten oyun/doğruluk/gecikmeyi satır satır tutuyor, ikinci kopya yalnız hacim üretirdi. Ad listede duruyor, KPI'lar `reviews`'dan okuyor. Claude.
