# Arayüz metinleri — yazım kılavuzu

Samet'in kararı (2026-09-28): arayüz metinleri profesyonel değil (coşku, dolgu, reklam dili, suçlama); hepsi
bu kılavuza göre elden geçirilecek. Web ve mobil, tr / en / de birlikte. Yeni metin de buna göre yazılır.

## Ton

- **Hitap `sen`, ama sade.** Samimiyet kelimeden değil netlikten gelir. de: `du`, en: `you`.
- **Önce ne oldu, sonra ne yapılabilir.** Bir cümle yeterliyse iki yazılmaz.
- **Kutlama kısa ve ölçülü.** Hüküm tek kelime ("Doğru"), ardından bilgi. Övgü havuzu yok.
- **Ünlem yok.** Tek istisna gerçek dönüm noktalarının BAŞLIĞI: sınavı geçme, lige yükselme, başarım kazanma.
  Gövdede, düğmede, bildirimde ünlem yok; hiçbir yerde iki ünlem yok.
- **Dolgu, deyim, özdeyiş yok:** "gün böyle başlar", "erken kalkan…", "sabah hatırlamanın sırrı",
  "hak edilmiş", "keyfine göre", "işte bu", "tuttu", "hadi".
- **Koçluk ve psikoloji yok:** "derin nefes", "bir ölçüm, bir yargı değil", "değerini değil".
- **Reklam dili yok:** "oyun gibi", "yol arkadaşın her yerde seninle", "sen de dene".
- **Suçlama ve korku yok:** "unutma", "kaybetme", "tehlikede", "unutulmak üzere", "dürttü".
  Yerine olgu: "12 günlük serin bu gece biter. Bir tur yeterli."
- **Maskot konuşmaz.** "Nomi" yalnız maskotun ve avatarın adı; metinlerin öznesi değil ("Nomi'yi giydir" değil,
  "Avatarı düzenle").
- **Emoji metnin içinde yok.** Arayüzün kendi simgeleri (alev, zil) metin değildir.

## Biçim

- **Uzunluk:** başlık ≤ 40 karakter; gövde tek cümle, en çok iki. Bildirim başlığı ≤ 40, gövdesi ≤ 90.
- **Düğme:** kısa emir kipi, 1–3 kelime ("Devam", "Kaydet", "Avatarı düzenle", "Hesap oluştur"). "Tamam" yalnız bilgiyi
  onaylarken. Düğme ile başlık aynı fiili kullanır ("Hesabı sil" → "Hesabı sil?").
- **Büyük harf:** cümle düzeni (yalnız ilk harf). en de sentence case ("Edit avatar", "Edit Avatar" değil).
- **Noktalama:** başlık ve düğmede nokta yok; gövde cümleleri noktayla biter. Uzun tire (—) yerine nokta ya da iki
  nokta. Tırnak tr/en `"…"`, de `„…“`.
- **Sayı:** rakamla. Yüzde tr `%82`, en `82%`, de `82 %`. Binlik ayırıcı tr/de `1.240`, en `1,240`.
- **Hata:** ne oldu + ne yapmalı, özgül. "Bir şeyler ters gitti" tek başına kullanılmaz; suç kullanıcıya atılmaz.
- **Boş durum:** burada ne olacağı + ilk adım (tek düğme).
- **Onay pencereleri:** sonucu söyler ("Hesabın ve bütün verilerin silinir. Geri alınamaz."), düğmesi eylemin adıdır.

## Terimler (tek kavram, tek kelime)

| Kavram | tr | en | de | Kullanılmayan |
|---|---|---|---|---|
| Günlük çalışma birimi | tur | round | Runde | ders, oturum, seans |
| Hedef dildeki birim | kelime | word | Wort | sözcük |
| Beceri çalışması (okuma, dinleme…) | alıştırma | exercise | Übung | pratik, egzersiz (ad olarak) |
| Seviye, modül, deneme, patron sınavı | sınav | exam | Prüfung | test (bu anlamda) |
| Haftalık 10 soru | haftalık test | weekly quiz | Wochenquiz | quiz (tr) |
| Aralıklı tekrar | tekrar | review | Wiederholung | |
| Arka arkaya gün | seri | streak | Serie | zincir, streak (tr/de) |
| Kazanılan ödül | başarım | achievement | Erfolg | rozet (ad olarak) |
| Haftalık sıralama | lig | league | Liga | sıralama tablosu |
| Arkadaşlar + lig + akış sekmesi | Topluluk | Community | Community | Arkadaş (sekme adı) |
| Başlıktaki zil | Bildirimler | Notifications | Mitteilungen | gelen kutusu |
| Hatırlatma ayarları | Hatırlatmalar | Reminders | Erinnerungen | Bildirimler (ayar adı) |
| Kullanıcı görünümü | avatar | avatar | Avatar | Nomi (öğe adı olarak) |
| Ücretli katman | Premium | Premium | Premium | |
| Ödeme ilişkisi | abonelik | subscription | Abo | üyelik |
| Kimlik doğrulama | giriş yap | sign in | anmelden | oturum aç, log in, einloggen |
| Kayıt | hesap oluştur | create account | Konto erstellen | kayıt ol, hesap aç |
| Yapay zekâ | yapay zekâ | AI | KI | yapay zeka |
| Deneyim puanı | XP | XP | XP | |

## Süreç

1. Kılavuz + örnek alan onayı (Samet).
2. Alan alan yeniden yazım, üç dil ve iki platform birlikte: tur geri bildirimi ve koç mesajları; bildirimler ve
   e-postalar; profil, ayarlar, topluluk; sınavlar ve alıştırmalar; satın alma; giriş ve hesap; boş durumlar ve
   hatalar; başarımlar; tanıtım sayfası. Her alanın önce/sonra listesi Samet'e artifact olarak gider.
3. Övgü ve koç havuzları küçülür (5 çeşit → 1–2); kaldırılan anahtarlar koddan da çıkar.
4. `check:i18n`, `check:parity` ve yeni bir metin kapısı: ünlem, yasak kelimeler ("hadi", "süper", "harika",
   "müthiş", "tuttu", "işte bu", "dürt", "unutma", "kaybetme") ve terim sözlüğündeki "kullanılmayan"lar.
   Hukuki metinler (`content/legal`) bu kılavuzun dışında.
