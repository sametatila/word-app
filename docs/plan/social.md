# Sosyal katman

Sohbetsiz, tepki temelli, gizlilik öncelikli; web ve mobil aynı API'yi kullanır. Kod
`src/lib/social/*`, rotalar `src/app/api/social/*`. Sosyal bir değişiklikten sonra aşağıdaki
kurallar listesi yeniden denetlenir.

## İlkeler
- Sohbet yok. Etkileşim = tepki, dürtme, ortak görev, karşılaştırma.
- Gizlilik önce: profil görünürlüğü, istek izni, engelleme, öneriye çıkma izni.
- Motivasyon, gürültü değil: akışa yalnız anlamlı olaylar (kilometre taşları) düşer.
- İstek/kabul modeli (takip değil), 6 tepki, ortak görev (davetli), arkadaş serisi, dürtme,
  ligler, öneriler, bildirim merkezi, engelle/şikâyet, kullanıcı adı.
- Emoji yok: tepkiler adlandırılmış türler + SVG ikon (cheer, fire, heart, strong, star, wow).

## Veri modeli (`src/lib/db/schema.ts`)

| Tablo | Not |
|---|---|
| `social_profiles` | kullanıcı adı (küçük harf, benzersiz), bio, görünürlük public/friends/private, `allowRequests`, `showInSuggestions`, `showActivity` |
| `friendships` | pending/accepted/declined; UNIQUE(requester, addressee), ters yön de denetlenir |
| `user_blocks`, `user_reports` | engel ve kullanıcı şikâyeti |
| `activity_events`, `event_reactions` | akış kilometre taşları; olay + kişi başına tek tepki |
| `nudges`, `friend_quests` | dürtme (remind/cheer); haftalık ortak görev |
| `social_notifications` | gelen kutusu, okundu bayrağı |
| `league_members` | beş basamak, en çok 30 kişilik hafta grupları; XP `daily_stats`ten canlı, `final_xp` kapanışta donar |
| `device_tokens` | mobil FCM jetonları |

Bütün FK'ler kullanıcı silinince CASCADE.

## API (hepsi oturumlu; JSON; abuse edilebilenler hız sınırlı)
- GET/PATCH `/api/social/me` — profil + ayarlar + sayaçlar (arkadaş, gelen/giden istek, okunmamış)
- GET `/api/social/users/search?q=` — kullanıcı adı prefix + ad ILIKE; engelli/gizli hariç; 30/dk
- GET `/api/social/users/[username]` — herkese açık profil (görünürlüğe göre), ilişki durumu, ortak arkadaş sayısı
- POST `/api/social/friends/request` {userId} · POST `/api/social/friends/respond` {id, action}
- DELETE `/api/social/friends/[userId]` — arkadaşlıktan çıkar / giden isteği iptal
- GET `/api/social/friends` — arkadaşlar (seri, haftalık XP, seviye, son aktif, arkadaş serisi) + istekler
- GET `/api/social/friends/suggestions` — ortak arkadaş, benzer seviye, son 7 gün aktif, opt-in
- GET `/api/social/feed?cursor=` — arkadaş olayları + tepki özetleri + benim tepkim; imleçli
- POST/DELETE `/api/social/reactions` {eventId, kind} — tek tepki/kullanıcı/olay; değiştirilebilir
- POST `/api/social/nudges` {userId, kind} — yalnız arkadaşa; 1/gün/arkadaş, 20/gün toplam
- GET/POST `/api/social/quests` · POST `/api/social/quests/[id]/respond` — davet/kabul/ret/iptal; ilerleme haftalık XP
- GET `/api/social/leaderboard` — bu hafta XP, ben + arkadaşlar, sıra
- GET/POST `/api/social/league` — bu haftanın lig grubu (canlı XP, terfi/düşme kuşakları) + gösterilmemiş geçen hafta sonucu
- POST/DELETE `/api/push/device` {token, platform} — mobil FCM jetonu kaydı/silme
- GET `/api/social/notifications?cursor=` · POST `/api/social/notifications/read` {ids|all}
- GET/POST/DELETE `/api/social/blocks` · POST `/api/social/reports`
- Sunucu içi: `emitActivity(userId, type, payload)` — mevcut XP/seri/seviye/rozet yollarından çağrılır;
  kilometre taşında arkadaşlara `friend_milestone` bildirimi (fan-out, tavanlı).

## Kurallar (denetim listesi)

Sayılar `src/lib/social/ratelimit.ts` `LIMITS` ile aynı tutulur.
- Kendine istek/tepki/dürtme/engel yok (`self` hatası; engelde sessiz atlama)
- Engel simetrik gizler; arkadaşlığı, bekleyen isteği, aktif görevi siler; engellenenden gelen bildirimleri kaldırır; arama/öneri/profil "bulunamadı"
- Görünürlük: public / friends / private — `publicProfile` ve `searchUsers` uygular
- Reddedilen istek 7 gün sonra yeniden (`declined_recent` 429); karşı taraf istemişse otomatik kabul
- Hız sınırları DB'de (`rate_limits`, atomik upsert; üç instance'a dayanıklı): istek 50/gün, arama 30/dk, tepki 300/gün, dürtme 1/arkadaş/gün + 20/gün, görev 5/gün, engel 50/gün, şikayet 10/gün; süresi geçenler hafta kapanışında silinir
- Kullanıcı adı: küçük harfe normalize + düz benzersiz indeks; 3-20 [a-z0-9_]; rezerve liste; 14 günde bir (ilk otomatik ad serbest); eski hesaplara TEMBEL atama (`usernames.ts`, yarışa dayanıklı)
- Akış: ben + arkadaşlar; `showActivity=false` → olay hiç yazılmaz; imleç (createdAt,id); `friend_joined` çift başına tek
- Tepki: yalnız arkadaşın olayına; olay+kişi başına tek satır (tür değişir); sahibine bildirim yalnız ilk tepkide
- Dürtme: yalnız arkadaşa; push metni alıcının kendi sayısını taşır (seri / haftalık XP)
- Görev: ikisi arkadaş; çift başına haftada tek; kişi başına tek aktif; hedef geçen haftanın %120'si (300-5000); tamamlanma XP yazan kancada anında; süresi dolan ilk okumada kapanır (cron YOK); ödül XP değil (rozet felsefesi), olay + bildirim
- Arkadaş serisi: `daily_stats`ten türetilir (365 gün pencere), saklanmaz
- Arkadaşlıktan çıkma sessiz; aradaki görev iptal
- Bildirimler: `social_notifications` + `unread`; okundu (tek/tümü); imleçli; web push aynası yalnız doğrudan etkileşimlerde (kilometre taşı push'suz); mobilde gelen kutusu + zil rozeti (60 sn + öne gelince)
- Öneriler: ortak arkadaş (çok→az) + aynı seviye/son 7 gün aktif; kendisi/arkadaş/istekli/engelli hariç; opt-in ve gizli olmayan; 20
- Arama: 2+ karakter, 350 ms bekleme; private yalnız tam kullanıcı adıyla; ILIKE kaçışlı; 20
- Boş durumlar (akış/istek/görev/tablo/arkadaş) + "Arkadaş bul" yönlendirmesi + davet bağlantısı `/u/<username>` (paylaş/kopyala)
- Erişilebilirlik: aria-label/accessibilityLabel; SVG ikon, emoji yok
- IDOR: isteğe yalnız alıcı cevaplar; göreve yalnız davet edilen; bildirim yalnız sahibi; `sameOrigin` her yazan rotada; kapalı sözlük doğrulama
- Analitik: sosyal olaylar `EVENT_NAMES`te (bkz. `kpi.md`)
- Kişi arması: web `avatar.tsx` ile aynı hash/palet mobilde `PersonAvatar` — aynı kişi iki platformda aynı renk

## Ligler, ortak seri, uzak push
- **Ligler** genel sıralamanın yerine geçti (`getLeaderboard` ve `/api/leaderboard` kaldırıldı); hafta sonu sonuç kartı.
- **Ortak seri** yayınlanıyor (`friend_streak`, 7/30/100); listede "bugün kırılıyor" uyarısı; dürtme duruma göre `remind`/`cheer`; kırılmadan önce hatırlatma bildirimi.
- **Uzak push:** FCM HTTP v1 (SDK yok, JWT `node:crypto` ile). `sendToUser` iki kanala birden gönderir. Anahtar yoksa her katmanda sessizce kapalı.

## Bilinçli sınırlar
- Ortak göreve rastgele eşleştirme yok: görev hâlâ arkadaş gerektiriyor. Yabancılarla rekabeti ligler karşılıyor.
- Haftalık kapanış (lig sonuçları, `weekly_top`, görev kapanışı) ilk sosyal okumada tembel çalışır; hata yolunda kilit bırakılır, tekrarlanamayacak tek adımın kendi kilidi vardır. Cron kurulursa `closeWeekIfNeeded` oradan da çağrılabilir.
- Şikâyetler (`user_reports`, yapay zekâ çıktısı için `content_reports`) panelde `/admin/moderation`da insan kararıyla kapanır; otomatik yaptırım yok. Şartlar: sıfır tolerans, bildirim en geç 24 saatte incelenir. Karar verilince bildirene gelen kutusunda tek `report_closed` bildirimi gider (`lib/moderation-admin.ts`).
- Haftalık quiz skoru sosyal katmana bağlı değil.

## Arayüz
Arkadaşlar iki platformda da alt gezinmenin dördüncü sekmesi, içinde üç sekme:
Arkadaşlar (gelen istekler + bu haftanın ortak görevi + liste + arkadaş tablosu) ·
Akış · Bul (arama + öneriler + gönderilen istekler). Eski `?tab=quests|requests`
adresleri Arkadaşlar sekmesine düşer.
- Web: `/friends` (3 sekme), `/u/[username]`, bildirim zili + `/inbox`, ayarlarda
  "Sosyal ve gizlilik", öğren ekranında görev nabzı, `/leaderboard` (Lig · Arkadaşlar).
- Mobil: Friends sekmesi (aynı üç sekme), User/Inbox/SocialSettings ekranları,
  Home'da görev kartı, Leaderboard'da Lig ve Arkadaşlar, tepki seçici (6 SVG).
