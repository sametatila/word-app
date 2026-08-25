# Faz 3 — Yazma

Rapor: 80 serbest görev var ama metin hiç okunmuyor; "Bitirdim" 20 kelime + öz-denetim listesine bağlı; hata bulunmuyor; metin saklanmıyor.

---

## WP-30 · Serbest yazma AI değerlendirmesi

**Amaç.** Serbest görevde metin WP-03 ile değerlendirilir: rubrik puanı, hata vurgusu, düzeltilmiş sürüm, "neden" satırları; metin ve puan saklanır; gelişim izlenir.

**Mevcut kod.** `src/components/skills/writing-player.tsx` (serbest görev: textarea, çipler, kontrol listesi, `sample`), `src/lib/skills/types.ts` (`WritingTask` free), `player-shell.tsx` (`useSkillFinish`), WP-01 `userSkills.lastScore`, WP-03 `assessments`.

**Tasarım.**
- Akış: yaz → "Değerlendir" (kontrol listesi kalır ama **bilgi amaçlı**, kilit değil) → 10 sn içinde sonuç kartı (`assessment-card.tsx`, WP-12 ile ortak): görev/dilbilgisi/kelime/yapı halkaları, metin üstünde span vurguları (dokununca `fix` + `why_tr`), "Düzeltilmiş sürüm" (fark görünümü), "Örnek cevap" (mevcut), "Bir daha dene" (aynı görev, ikinci deneme puanı ayrı kaydedilir).
- Görev tamamlama: overall ≥ 60 → tamamlandı; 40–59 → tamamlandı ama "geliştir" etiketi; < 40 → tekrar önerisi (zorlama yok).
- Kelime sınırı: `minWords` esnek (altındaysa değerlendirme yine yapılır, "görev tamamlama" düşer).
- Sağlayıcı yoksa: mevcut kontrol listesi akışı + "AI değerlendirmesi şu an kapalı; metnin kaydedildi, servis açılınca puanlanacak" — kuyruk: `assessments.result null` kayıtları cron (`/api/cron`) ile sonradan değerlendirilir ve kullanıcıya bildirim (push altyapısı var).
- Gizlilik: metin `assessments`'ta; profilden "yazılarım" listesi ve silme (WP-64).

**Adımlar.**
1. `assessment-card.tsx` (WP-12 ile ortak; önce burada).
2. `writing-player` serbest görev akışı.
3. Kayıt + `userSkills.lastScore`.
4. Çevrimdışı kuyruk + cron değerlendirme + bildirim.
5. Kalite testi: 20 örnek metin (A1–B2, kasıtlı hatalı) → `docs/plan/assess-samples.md`'ye ek.

**Kabul.** Metinde "Ich wohne in Berlin in eine kleine Wohnung" yazıldığında `eine → einer` vurgulanıyor, Dativ gerekçesi Türkçe; puan ve metin kaydediliyor; sağlayıcı kapalıyken kuyruk çalışıyor.

**Süre.** 4 gün. **Bağımlılık.** WP-03, WP-01.

---

## WP-31 · Yazma görev türleri ve okuma/dinleme soru türleri

**Amaç.** Yazma: "kur" ve "serbest" dışında görev türü yok; okuma/dinleme yalnız çoktan seçmeli. Üretim ve anlama görev çeşitliliği.

**Mevcut kod.** `src/lib/skills/types.ts` (`WritingTask`, `SkillQuestion`), `quiz.tsx`, `reading-player.tsx`, `listening-player.tsx`, WP-70 doğrulayıcı.

**Tasarım — yazma:** yeni `WritingTask` türleri: `reply` (gelen e-posta/mesaja cevap; `stimulus` var), `form` (boşluklu form doldurma: alan → kısa metin, tam eşleştirme), `sentence` (WP-12), `rewrite` (verilen cümleyi başka biçimde yaz: resmi/samimi, olumsuz, geçmiş — WP-11 drill motoruyla), `summary` (B1+: metni 2 cümleyle özetle — WP-03).
**Tasarım — okuma/dinleme:** `SkillQuestion.kind`: `mcq` (mevcut), `truefalse_why` (doğru/yanlış + gerekçe göster), `gapfill` (metinden kelimeyi yaz), `order` (olay sırası), `short_answer` (1–5 kelime, toleranslı eşleştirme), `summary` (B1+, WP-03). Her soruya `why_tr` (WP-13).
- Dinlemede ek: "dikte" (cümleyi yaz) türü ve TTS yanında gerçek ses dosyası desteği (`ListeningSegment.audio` zaten var; WP-72 gerçek kayıt).

**Adımlar.**
1. Tipler + doğrulayıcı.
2. `quiz.tsx` soru türü bileşenleri (5 tür).
3. `writing-player` görev türleri (reply/form/rewrite/summary).
4. Her seviyede mevcut 8 yazma egzersizine 1 yeni tür görevi; okuma/dinlemede her egzersize ≥ 2 çoktan seçmeli olmayan soru (WP-72).

**Kabul.** Okuma egzersizinde 5 sorudan en az 2'si üretim/gapfill; dinlemede dikte; yazmada "reply" görevi AI ile puanlanıyor.

**Süre.** 5 gün (+ içerik). **Bağımlılık.** WP-03, WP-13, WP-70.
