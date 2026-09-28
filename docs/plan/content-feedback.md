# İçerik geri bildirimi — her ekranda "Bildir", panelde değerlendirme

Samet'in isteği (2026-09-28): günlük tur, pratikler, sınavlar ve öteki her ekranda kullanıcı içerikteki
sorunu bildirebilsin; bildirimler web panelinde toplanıp işlevsel biçimde değerlendirilsin. Yapay zekâ
çıktılarındaki mevcut "Bildir" (CNT-3, İ2) bunun bir alt kümesi olarak kalıyor.

İlke: yeni tablo değil, `content_reports` genişliyor. Kurulu uygulamaların gönderdiği eski gövde
(`{kind, ref, reason, content}`) aynen kabul edilmeye devam ediyor.

## Tel sözleşmesi — `POST /api/reports`

```jsonc
{
  "kind": "chat" | "assessment" | "content",   // chat/assessment = yapay zekâ çıktısı (eski), content = öğrenme içeriği (yeni)
  "reason": "<aşağıdaki listeden>",
  "ref": "<eski serbest ref; content için `${target.type}:${target.id}` + varsa `:${target.sub}`>",
  "content": "<ekranda görünen içeriğin anlık görüntüsü, ≤ 4000>",
  "surface": "<aşağıdaki listeden>",            // yeni, isteğe bağlı (eski istemci göndermez)
  "target": {                                   // yeni, content için zorunlu
    "type": "word" | "exercise" | "conversation" | "exam_item" | "mock_task" | "quiz_item" | "placement_item" | "assessment" | "chat_turn",
    "id": "<kalıcı kimlik>",
    "sub": "<isteğe bağlı: soru sırası, tur, oyun>",
    "game": "<GameId, yalnız tur/pratik/yürüyüş>"
  },
  "detail": "<kullanıcının isteğe bağlı açıklaması, ≤ 500>",
  "context": { "platform": "ios"|"android"|"web", "appVersion": "1.0.0 (10)", "course": "de", "nativeLang": "en", "contentVersion": 123 }
}
```

**Nedenler.** Yapay zekâ türleri (chat, assessment): `inappropriate`, `offensive`, `wrong`, `other` (değişmedi).
İçerik türü (content): `wrong_answer` (cevap anahtarı yanlış), `typo` (yazım/dil bilgisi), `translation`
(çeviri ya da anlam yanlış), `audio` (ses sorunu), `unclear` (soru anlaşılmıyor), `technical` (çalışmıyor ya
da yanlış görünüyor), `inappropriate` (uygunsuz), `other`.

**Yüzeyler (`surface`).** `round` (günlük tur), `practice`, `walk`, `path`, `skill`, `conversation`,
`scored`, `exam` (modül/seviye/patron), `mock`, `quiz` (haftalık), `placement`, `words`, `writings`.

**Hedef kimlikleri.**

| Yüzey | `target.type` | `id` | `sub` / `game` |
|---|---|---|---|
| Günlük tur, pratik, yürüyüş, kelime listesi | `word` | `words.id` | `game` = GameId |
| Beceri alıştırması (okuma, dinleme, dil bilgisi, yazma, konuşma) | `exercise` | exercise id | `sub` = soru sırası (1'den) |
| Konuşma adımı / puanlı kısım | `conversation` | conversation id | `sub` = kullanıcı tur sayısı |
| Modül, seviye sınavı, patron | `exam_item` | madde id (`exam-types`) | `sub` = `module:<level>:<n>` ya da `level:<level>` |
| Deneme sınavı | `mock_task` | task id | `sub` = madde no |
| Haftalık quiz | `quiz_item` | QuizItem.id | — |
| Yerleştirme | `placement_item` | `v<wordId>` / `r:<exId>` / `l:<exId>` | — |
| Yapay zekâ değerlendirmesi | `assessment` | sunucu değerlendirme id ya da mevcut ref | — |
| Yapay zekâ sohbet yanıtı | `chat_turn` | conversation id | `sub` = tur |

Sunucu `pack`/`item`i (içerik hattı, `content_flags` ile eşleşme için) hedeften türetir: exercise →
`skills/<course>-<level>`, conversation → `conversations/<course>-<level>`, mock_task → `papers/<course>`
(item = paper id), quiz_item → `quiz/<course>`. Türetemezse boş bırakır.

**Sunucu kuralları.** Aynı kullanıcı + aynı hedef (+ sub) 24 saat içinde ikinci kez gelirse yeni satır
açılmaz, `{ ok: true, duplicate: true }` döner. Günlük tavan `DAILY_QUOTAS.reports`. Misafir bildirebilir.
`detail` kaba dil süzgecinden geçmez ama uzunluğu sınırlıdır; panelde düz metin gösterilir (HTML yok).

## Arayüz

- "⚑ Bildir" bağlantısı CEVAPTAN SONRA (2026-09-28, Duolingo/Babbel düzeni; a11y `report.flag_a11y`).
  Soru ekranında (başlık, ilerleme satırı, soru başlığı) bayrak yok. Yerler: tur katmanında "Devam"ın
  solunda (tur, meydan okuma, patron); alıştırma ve Patika quizinde her sorunun açıklamasının altında,
  egzersizin bütünü sonuç ekranında; sınav, deneme sınavı ve haftalık quizde yalnız döküm/sonuç listesinin
  maddelerinde (sınav sürerken yok); seviye testinde yok (cevap sonrası geri bildirim ve madde listesi yok);
  yürüyüşte hükümden sonra kelime kartında ve duraklamada; kelime listesinde açılan kartın eylem satırında;
  konuşmada yazılı ders adımının baloncuğu altında, puanlı konuşmada açılış baloncuğu altında.
  Yapay zekâ çıktılarının "Bildir"i aynı görünüş (web `ReportLink`, mobil `ReportButton`): tek biçim.
- Sayfa: başlık `reportsheet.content_title`, açıklama `reportsheet.content_lead`, neden listesi
  (radiogroup), isteğe bağlı ayrıntı alanı (`reportsheet.detail_label` / `detail_placeholder`), Gönder.
  Başarıda `reportsheet.thanks_we_ll_look_into_it`, mükerrerde `report.already`.
- Anlık görüntü: ekranda görünen soru, seçenekler, doğru cevap ve kullanıcının cevabı (kısa JSON ya da
  düz metin). Ses sorununda çalınan metin ve ses kimliği.

## Panel (`/admin/moderation` › İçerik)

- Hedefe göre gruplu liste: hedef, yüzey, en sık neden, bildirim sayısı, ilk/son tarih, kurs/dil,
  platform. Filtre: durum, yüzey, neden, kurs, anadil, platform, tarih; arama (hedef id / metin).
- Grup ayrıntısı: tek tek bildirimler (neden, ayrıntı, anlık görüntü, bağlam), hedefin kaynağı
  (`data/**` yolu ya da içerik paketi), önceki kararlar.
- Eylemler (2FA, `admin_audit`): Gereği yapıldı / Asılsız (gruptaki bütün açık bildirimler kapanır,
  her bildirene tek gelen kutusu bildirimi), not, "İçeriği kapat" (`content_flags`, türetilebilen
  hedeflerde), CSV dışa aktarma.
- Uyarı: yeni bildirim özeti 10 dakikalık uyarı motorunda Telegram'a; bir hedef 24 saatte 3+ bildirim
  alırsa ayrı uyarı. 24 saati aşan açık bildirim uyarısı duruyor.
- `suspectItems` analitiği yapısal `pack/item` ile eşleşiyor.

## Kurulan (sunucu ve panel, 2026-09-28)

**Şema.** `content_reports`e boş olabilir sütunlar: `surface`, `target_type`, `target_id`, `target_sub`,
`game`, `pack`, `item`, `detail`, `platform`, `app_version`, `course`, `native_lang`, `content_version` (int),
`group_key` (`${type}:${id}` + varsa `:${sub}`; eski satırlarda boş). İndeksler `(group_key, created_at)` ve
`(status, surface, created_at)`. Göç `drizzle/0071_content_feedback.sql` (IF NOT EXISTS), şema `schema.ts`.
Kullanıcı kimliği taşıyan yeni sütun yok: hesap silme ve misafir birleştirme değişmedi (`check:purge`,
`check:guest-merge`).

**Uç.** Doğrulama `src/lib/content-feedback.ts` (`parseReportBody`, neden/yüzey/hedef listeleri, panel
etiketleri; `server-only` değil). Geçersiz alan → 400 `{ error: "bad_request", field }`. `detail` > 500 → 400
(kesilmiyor); anlık görüntü 4000'de kesiliyor; `context.contentVersion` tamsayı. `ref` gelmezse hedeften
kuruluyor. Tekrar kilidi: aynı kullanıcı + `group_key` (eski gövdede `kind` + `ref`) 24 saat → `{ ok: true,
duplicate: true }`, satır yok, günlük tavandan düşmüyor; eşzamanlı çift istek danışma kilidiyle tek satır.
`pack/item` türetme (`derivePackItem`): exercise → `skills/<kurs>-<seviye>`, conversation →
`conversations/<kurs>-<seviye>` (kurs ve seviye kimlikten, `lib/content/read`in kapatma denetimiyle aynı kural),
mock_task `de-a1-01-l1` → `papers/de` + `de-a1-01`, quiz_item → `quiz/<kimlik öneki ya da context.course>`.
`kind: "user"` eski dalı değişmedi.

**Panel.**
- `/admin/moderation`: kullanıcı şikâyetleri ve yapay zekâ bildirimleri (tek tek, eskisi gibi; `kind = 'content'`
  burada değil). Başlıkta "İçerik geri bildirimi (N)" bağlantısı; yapay zekâ bildiriminin ref'i grubuna gidiyor.
- `/admin/moderation/content`: gruplu liste (eski satırlar `legacy:<kind>:<ref>` grubunda), sunucu tarafı süzgeç
  adres parametreleriyle (`durum`, `yuzey`, `neden`, `kurs`, `anadil`, `platform`, `bas`, `son`, `q`, `sayfa`),
  sayfa başına 50 grup.
- `/admin/moderation/content/group?g=<grup>`: özet, hedefin kaynağı, `content_flags` durumu, bildirimler
  (neden, açıklama, anlık görüntü girintili JSON ya da düz metin, bağlam, bildiren bağlantısı, önceki karar).
- `/api/admin/moderation/export?<aynı parametreler>`: CSV (süzgecin tamamı, en çok 5000 grup; formül
  enjeksiyonuna karşı `= + - @` ile başlayan hücre kesme işaretli). Yalnız admin okuma kapısı.
- Yazma `POST /api/admin/moderation` (2FA, `admin_audit`): `{ action: "close_group", group, decision:
  "resolved"|"dismissed", note }` gruptaki bütün açık bildirimleri kapatır, bildiren başına tek
  `report_closed`; `{ action: "disable_content", group, note }` `disableItem(pack, item, "reported")` +
  grubu "gereği yapıldı" diye kapatır (not: `içerik kapatıldı (<pack>:<item>)`). Geri açma `/admin/content`.

**Uyarılar** (`lib/alerts`, 10 dakikalık motor; `err` ailesi: tek seferlik, bir gün tutuluyor):
`err-reportnew:<son id>` bir önceki özetten bu yana gelen bildirim sayısı ve en çok bildirilen üç hedef;
`err-reporthot:<grup>` bir hedef 24 saatte 3+ bildirim aldı ve açık bildirimi var. 24 saati aşan açık bildirim
uyarısı (`reports`) duruyor. Panel bağlantıları `lib/admin-links`.

**Analitik.** `suspectItems` rapor sayısını açık bildirimlerin `pack|item`i ile eşliyor (deneme sınavında
kâğıt düzeyinde).

**Hukuki.** 1.8.6: gizlilik tablosundaki içerik bildirimi satırı (tr/en/de) içerik hatalarını, isteğe bağlı
açıklamayı ve teknik bağlamı sayıyor; şartlar §5 düğmenin her yerde olduğunu söylüyor. Sebep ve süre aynı.

**Kalan.** İstemciler (web `lib/report` + bayrak, mobil `ReportSheet`/`ReportFlag`) ve cihazda uçtan uca
deneme (denetim T12). Canlıda göç deploy'un `drizzle-kit push`uyla kuruluyor; elle: `npm run db:migrate --
drizzle/0071_content_feedback.sql`.
