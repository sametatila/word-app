# Wortspiel — Öğrenme Odaklı Dönüşüm Yol Haritası

Kaynak: `reports/ogrenme-kesif-raporu.html` (25 Ağustos 2026 keşif raporu). Bu plan o raporun her bulgusunu kapatmak, puanları en yüksek seviyeye çıkarmak ve ürünü "kelime tanıma uygulaması"ndan "dört beceride ölçülebilir ilerleme veren öğrenme sistemi"ne taşımak için yazıldı.

Plan **iş paketlerine (WP)** bölünmüştür. Her WP başka bir ajan tarafından, bu depoyu ilk kez gören biri gibi, tek başına alınıp bitirilebilecek şekilde yazıldı: amaç, mevcut kod, tasarım, adımlar, kabul kriterleri, test, riskler. WP dosyaları:

| Dosya | Faz | İş paketleri |
|---|---|---|
| [00-temel.md](00-temel.md) | 0 — Temel altyapı | WP-00 Ölçüm çerçevesi · WP-01 Beceri ilerlemesi sunucuya · WP-02 Hata taksonomisi · WP-03 AI değerlendirme servisi · WP-04 Çevrimdışı rol yapma yedeği |
| [10-uretim-alistirmalari.md](10-uretim-alistirmalari.md) | 1 — Üretim odaklı alıştırma | WP-10 Çeviri oyunu · WP-11 Dönüştürme drilleri · WP-12 Serbest cümle · WP-13 "Neden" geri bildirimi · WP-14 Oyun merdiveni |
| [20-konusma.md](20-konusma.md) | 2 — Konuşma | WP-20 Telaffuz puanlama · WP-21 Konuşma içeriği · WP-22 Rol yapma sınavı · WP-23 Açık diyalog |
| [30-yazma.md](30-yazma.md) | 3 — Yazma | WP-30 AI yazma değerlendirmesi · WP-31 Yazma görev türleri |
| [40-olcme-sinav.md](40-olcme-sinav.md) | 4 — Ölçme ve sınav | WP-40 Yerleştirme testi · WP-41 Seviye sınavı v2 · WP-42 Haftalık kullanım sınavı · WP-43 CEFR can-do haritası |
| [50-analitik-profil.md](50-analitik-profil.md) | 5 — Analitik | WP-50 Beceri yetkinlik modeli · WP-51 Hata analitiği · WP-52 Gelişim raporu |
| [60-arayuz-kompozisyon.md](60-arayuz-kompozisyon.md) | 6 — Arayüz ve kompozisyon | WP-60 /learn yeniden kompozisyon · WP-61 Geri bildirim bileşeni · WP-62 Ders oynatıcı · WP-63 Beceri merkezi · WP-64 Profil · WP-65 Onboarding · WP-66 Erdi koç sesi |
| [70-icerik-hatti.md](70-icerik-hatti.md) | 7 — İçerik üretim hattı | WP-70 İçerik şeması ve doğrulayıcı · WP-71 Ders kapsamı (B1–C1) · WP-72 Konuşma/yazma içeriği · WP-73 Gerekçe ve kural parçacıkları |

## Hedef puanlar

Rapordaki eksenler (İçerik / Pedagoji / Geri bildirim / Ölçme / Arayüz), mevcut → hedef:

| Alan | Mevcut | Hedef | Kapatan WP'ler |
|---|---|---|---|
| Kelime turu | 9/7/6/5/9 | 9/9/9/8/9 | 13, 14, 02, 42 |
| Cümle kurma | 5/4/4/2/8 | 9/9/9/8/9 | 10, 11, 12, 13, 41 |
| Konuşma | 3/5/3/1/8 | 8/9/9/8/9 | 20, 21, 22, 23, 04, 72 |
| Yazma | 6/5/2/1/8 | 8/9/9/8/9 | 30, 31, 03, 72 |
| Okuma/Dinleme | 8/6/5/4/9 | 9/8/8/8/9 | 13, 31 (soru türleri), 41, 70 |
| Dersler + dilbilgisi | 6/5/5/3/8 | 9/9/8/8/9 | 04, 11, 62, 71, 73 |
| Sınav / ölçme | 2/3/4/2/8 | 9/9/9/9/9 | 40, 41, 42, 43 |
| İlerleme / analitik | –/4/–/3/8 | –/9/–/9/9 | 00, 01, 02, 50, 51, 52, 64 |
| Motivasyon | 8/8/–/–/9 | 9/9/–/–/9 | 42, 52, 60, 66 |

"Öğrendiğini kullanma ve sınanma" ekseni: 4/10 → 9/10.

## Sıralama ve bağımlılıklar

```
Faz 0 (temel)  ─┬─ WP-00 ölçüm çerçevesi
                ├─ WP-01 beceri ilerlemesi sunucuya ──────────────┐
                ├─ WP-02 hata taksonomisi ───┬─────────────────────┤
                ├─ WP-03 AI değerlendirme ───┼── WP-12, 30, 21, 22 │
                └─ WP-04 çevrimdışı rol yapma┘                     │
Faz 1 (üretim) ─── WP-10, 11, 13, 14 (02'ye bağlı)                 │
Faz 2 (konuşma) ── WP-20 (bağımsız), 21 (72'ye), 22 (03'e), 23 (03'e)
Faz 3 (yazma) ──── WP-30 (03'e), 31 (70'e)                         │
Faz 4 (ölçme) ──── WP-43 önce; WP-40, 41, 42 (01, 02, 10, 11, 30, 20'ye)
Faz 5 (analitik) ─ WP-50, 51, 52 (01, 02, 40–42'ye) ◄──────────────┘
Faz 6 (arayüz) ─── her fazla paralel; WP-60 erken, 61 WP-13 ile, 65 WP-40 ile
Faz 7 (içerik) ─── WP-70 en başta; 71–73 sürekli
```

Önerilen sprint akışı (2 haftalık sprintler, 2–3 paralel ajan):
1. **S1:** WP-00, WP-01, WP-02, WP-70 — ölçmeden hiçbir şey yapma; önce ölçüm ve veri.
2. **S2:** WP-03, WP-04, WP-13, WP-60
3. **S3:** WP-10, WP-11, WP-14, WP-61, WP-73
4. **S4:** WP-30, WP-12, WP-43, WP-71 (B1)
5. **S5:** WP-20, WP-21, WP-72
6. **S6:** WP-40, WP-65, WP-42
7. **S7:** WP-41, WP-22, WP-23, WP-62
8. **S8:** WP-50, WP-51, WP-52, WP-63, WP-64, WP-66, WP-31, WP-71 (B2/C1)

## Çalışma kuralları (her ajan için)

- **Önce oku:** `AGENTS.md` (bu Next sürümü bilinen sürümden farklı; `node_modules/next/dist/docs/` rehberine bak), ilgili WP dosyası, dokunacağın dosyaların başındaki uzun yorumlar. Bu depoda yorumlar **neden**i anlatır; aynı üslupla (Türkçe, gerekçeli) devam et.
- **Parça parça ilerle, her adımda dur:** WP içindeki adımlar sıralı ve tek tek doğrulanabilir. Her adım sonunda `npx tsc --noEmit` ve `npm run build` temiz olmalı; kullanıcı kontrolü için durulur (proje sahibinin tercihi).
- **Atomik commit:** her adım ayrı commit; mesaj Türkçe, ilk satır ne yapıldığı, gövde neden.
- **Veritabanı değişikliği:** Drizzle şeması `src/lib/db/schema.ts`; `npm run db:generate` ile migration üret, `drizzle/` altına ekle, `npm run db:migrate`. Neon üretim DB'si gerçek kullanıcı verisi taşır — geri alınabilir, ekleyici (additive) migrasyonlar; sütun silme/yeniden adlandırma yok.
- **AI çağrıları:** yalnızca `src/lib/chat-providers.ts` (`chatProviders`, `completeChat`, `sttProviders`) üzerinden; her çağrı `recordAiUsage` ile kaydedilir; sağlayıcı yoksa özellik **sessizce bozulmaz**, çevrimdışı yedeğe düşer ve bunu ekranda söyler.
- **İçerik:** kod içi TS içerik dosyaları (`src/lib/skills/content`, `src/lib/lessons/content`) + `data/*` paket/doğrulayıcı deseni (`data/skills/SPEC.md`, `check.mjs`). Yeni içerik türü = önce şema + doğrulayıcı, sonra içerik.
- **Türkçe arayüz metni, Almanca öğrenme içeriği.** Kullanıcıya İngilizce yalnız köprü çevirilerde.
- **Erişilebilirlik:** hareket azaltma (`useStill`), klavye, renk körlüğü (renk + simge/metin) her yeni bileşende.
- **Ölçüm:** her yeni özellik en az bir `track()` olayı ve bir kabul metriği ile gelir (bkz. WP-00).
- **Bitmiş sayılma (DoD):** kabul kriterleri karşılandı; tsc/build temiz; e2e/`test:*` betiklerinden ilgili olan geçti; ekran görüntüsüyle (mobil 390px) kanıtlandı; WP dosyasındaki "Durum" bölümü güncellendi.

## Terimler

- **Tanıma / üretim:** şık seçmek tanıma; yazmak, söylemek, kurmak üretim. Planın omurgası: her tanıma noktasına bir üretim eşi.
- **Rubrik:** görev tamamlama, dilbilgisi, kelime, yapı/tutarlılık — 0–4 ölçeği; AI değerlendirmelerinde ortak (WP-03).
- **Hata tipi:** `article | plural | case | verb_position | conjugation | spelling | meaning | word_order | pronunciation` (WP-02).
- **Can-do:** CEFR "yapabilirim" ifadesi; içerik ve sınav bunlara bağlanır (WP-43).
