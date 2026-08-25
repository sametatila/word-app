# Ajan devir teslim kılavuzu

Bu planı uygulayan her ajan (Claude Code oturumu ya da insan) şu sırayı izler.

## Başlarken
1. `docs/plan/README.md` → hedefler, kurallar, sıralama. `STATUS.md` → hangi WP boşta, bağımlılıkları bitmiş mi.
2. Aldığın WP'nin dosyasını **tamamen** oku; "Mevcut kod" bölümündeki dosyaları aç ve baştaki yorumları oku (bu depoda yorumlar tasarım gerekçesidir; onlarla çelişen bir şey yapıyorsan önce gerekçeyi çürüt).
3. `AGENTS.md`'yi oku; Next sürümü bilinen sürümden farklı, `node_modules/next/dist/docs/` rehberi geçerli.
4. `STATUS.md`'de satırını `sürüyor` yap, adını ve tarihi yaz.

## Çalışırken
- WP'deki adımlar sıralı; her adım kendi başına derlenir ve commit edilir. Adım bitince dur, proje sahibine göster, onay al (proje kuralı: parça parça, her adımda kontrol).
- Kapsam dışına çıkma: gördüğün başka bir eksiği **karar kaydına** (STATUS.md) not düş, düzeltme.
- Şema değişikliği: yalnız ekleyici; migrasyon üret ve `drizzle/` altına ekle; üretim DB'sinde gerçek veri var.
- AI/STT: yalnız `chat-providers.ts`; sağlayıcı yoksa dürüst yedek ve ekranda açıklama; `recordAiUsage`.
- Her yeni ekran/akış: mobil 390px ekran görüntüsü (`reports/shoot.mjs` aracı: `node reports/shoot.mjs <ad> <yol> [adımlar]`; demo sunucu için README'deki worktree yöntemi).
- Türkçe arayüz metni; Almanca içerik; yorumlar Türkçe ve gerekçeli.

## Bitirirken
1. Kabul kriterlerini tek tek işaretle (WP dosyasının altına "Durum" bölümü ekleyip yaz: tarih, ne bitti, ne kaldı, kanıt: commit + ekran görüntüsü yolu).
2. `npx tsc --noEmit`, `npm run build`, ilgili `npm run test:*`.
3. `STATUS.md` satırını `inceleme`ye çek; proje sahibi onaylayınca `bitti`.
4. Bir sonraki WP'ye geçmeden `STATUS.md`'deki bağımlılıkları kontrol et.

## Kalite çıtası
- Kullanıcıya yalnız "doğru/yanlış" söyleyen hiçbir yeni ekran kabul edilmez; en az bir "neden" satırı.
- Her üretim görevi kısmi puan verir (tam/az hata/anlam hatası).
- Sağlayıcı kapalıyken hiçbir akış kilitlenmez (ders geçme dahil).
- Hiçbir metrik yalnız istemcide yaşamaz.
