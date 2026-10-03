# Seviye ilerlemesi — bir seviye ne zaman "bitti"?

Durum (2026-10-03): aşama 1–4 kodda (Samet: "pedagojik ve öğrenmeye dayalı olduğu sürece önerilerle devam"). Kalan: İngilizce çekirdek boşlukları (içerik + ses), build 18.
İlgili: seviye testi `docs/plan/placement-v2.md` (başlangıç seviyesi), sınav `src/lib/exam.ts`.

## Sorun

Bugün "A1 bitti, A2'ye geç" anını hiçbir şey tanımlamıyor: seviyeyi yalnız kullanıcı değiştiriyor,
seviye sınavını geçmek seviyeyi değiştirmiyor (yalnız sertifika). "Her şeyi bitir" ölçütü ise yanlış:
CEFR seviyesi bir yeterlik tanımı, içerik listesi değil; içerik büyüdükçe çıta yükselir (bugün bitiren
yarın bitirmemiş olur) ve tüketmek öğrenmek değildir.

## İlke

Seviye = o seviyenin SABİT ÇEKİRDEĞİNDE yeterlik. Kanıt tüketimden değil, kalıcılıktan (tekrar sistemi)
ve üretimden (sınavın konuşma/yazma ağırlığı) gelir. Hiçbir şey kilitlenmez, hiçbir şey %100 istemez.

## Kararlar

1. **Çekirdek = resmî listeler** (sabit; içerik eklendikçe büyümez):
   - Almanca A1, A2, B1: Goethe kelime listeleri. B2, C1: resmî liste yok → bankadaki o seviye
     kelimelerinden sıklık listesinde (`data/a2-expansion/de_50k.txt`) en sık geçen 1.000'er kelime.
   - İngilizce A1–C1: Oxford 3000/5000'ün CEFR seviyeleri.
   - Bir kelimenin çekirdek seviyesini RESMÎ liste belirler, bankadaki `niveau` etiketi değil (analiz:
     resmî A2 kelimelerinin bankada bulunan 543'ünün 243'ü başka seviye etiketli).
   - Resmî listeler depoya GİRMEZ (telif): depoda yalnız bizim kelimelerimizin kimlikleri ve çekirdek
     seviyesi (`data/core/<dil>.json`). Üretim betiği listeleri yerel yoldan okur, kaynaklar aşağıda.
2. **Hazırlık göstergesi** (seviye L için, 0–100):
   - Kelime (%50): L çekirdeğinin bankada bulunan kelimelerinde puan: pekişmiş (aralık ≥ 21 gün) = 1,
     öğreniliyor (en az bir doğru tekrar, aralık ≥ 1 gün) = 0,5, görülmemiş = 0.
   - Patika (%50): L'nin konuşmalarından tamamlananların oranı (ünitelerin çekirdeği; beceri adımları
     zenginleştirme, sayılmaz).
   - Üretim ayrıca ölçülmüyor: seviye sınavı onu ölçüyor (konuşma + yazma + cümle kurma %50).
3. **Eşik %60** (Samet; Goethe/telc/ÖSD'nin geçme eşiği): hazırlık ≥ %60 → "Seviye sınavına hazırsın".
4. **Seviye sınavı geçme notu: toplam ≥ %60, her bölüm ≥ %50** (eskiden %70). Bölüm alt sınırı kalır:
   yalnız kelimeyle, konuşamadan geçilmez.
5. **Geçiş ONAYLA** (Samet): L seviye sınavını geçen L+1'e geçmek ister mi diye sorulur; seviye yalnız
   kabulde değişir. C1'i geçen C1'de kalır (sertifika).
6. **İleri atlama**: hazırlığı beklemeden isteyen kendi seviyesinin sınavına girebilir (kartta "şimdi
   gir"); geçerse bir üst seviye önerilir. Seviye testinin yanlış yerleştirdiği ya da hızlı ilerleyen
   için doğal çıkış. Daha yüksek bir seviyenin sınavını geçen (Patika'dan) onun bir üstüne geçebilir.
7. **Süreklilik**: önceki seviyenin kelimeleri tekrar sisteminde dönmeye devam eder; alt seviye içeriği
   açık kalır. Doğrulandı (2026-10-03): tur kurulumunun tekrar tabanı (`lib/session` "zamanı gelen
   kelimeler") seviyeye göre süzmüyor; seviye değişince yalnız YENİ kelimelerin seviyesi değişir.

## Bilinen eksik: İngilizce bankası çekirdeği tam kapsamıyor

Analiz (2026-10-03): Oxford çekirdeğinin bankada olmayanları A1 137, A2 178, B1 266, B2 690, C1 851
(ör. day, afternoon, evening, colour). Hazırlık paydası "çekirdek ∩ banka" olduğu için gösterge bu
yüzden haksız düşmez; ama kurs o kelimeleri öğretmiyor. Kapatmak ayrı içerik işi: kelime + anlam
(de/tr) + örnek cümle + Defne/Aras kaydı (kelime katmanında düşüş yok → kayıt GPU makinesinde,
`docs/plan/tts-own-voices.md`). Sıra: A1 → A2 → B1. Almanca A1–B1 kapsaması ~%80–90 (gerçek eksik
çok az: Sekunde, Mittag, Wochentag, Norden; sayılar ayrı modülde).

## Kaynaklar (yerel analiz için; depoya girmez)

- goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf, …/Goethe-Zertifikat_A2_Wortliste.pdf,
  …/Goethe-Zertifikat_B1_Wortliste.pdf
- oxfordlearnersdictionaries.com/external/pdf/wordlists/oxford-3000-5000/The_Oxford_3000_by_CEFR_level.pdf
  ve The_Oxford_5000_by_CEFR_level.pdf

## Aşamalar

1. Çekirdek verisi: `scripts/core-build.mjs` (yerel listelerden) → `data/core/{de,en}.json`; kapı
   `check:core` (kimlikler bankada, seviye sayıları makul).
2. Hazırlık: `lib/level-readiness` + `GET /api/level`; sınav geçme notu %60 (web + mobil + metinler).
3. Geçiş: sınav sonucunda "L+1'e geç" (onay) → `POST /api/level {action:"advance"}`; sunucu geçilmiş
   sınavı doğrular.
4. Arayüz: Öğren ekranında hazırlık kartı (kelime/Patika kırılımı, %60'ta sınav çağrısı), ileri atlama.
5. Testler, belgeler, CI; sonra build 18.
