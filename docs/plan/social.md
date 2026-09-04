# Sosyal yapı — tasarım ve denetim listesi

Hedef: Duolingo'nun sosyal katmanından daha iyi, **sohbetsiz**, tepki (kudos) temelli,
gizlilik-öncelikli, web + mobil birebir. Bu dosya yaşayan kontrol listesidir; her
uygulama adımından sonra buradaki maddeler tek tek yeniden denetlenir.

## İlkeler
- Sohbet yok. Etkileşim = tepki, dürtme, ortak görev, karşılaştırma.
- Gizlilik önce: profil görünürlüğü, istek izni, engelleme, öneriye çıkma izni.
- Motivasyon, gürültü değil: akışa yalnız anlamlı olaylar (kilometre taşları) düşer.
- Duolingo'dan fazlası: istek/kabul modeli (takip değil), 6 çeşit tepki, arkadaş
  görevleri (davetli), arkadaş serisi, dürtme (günde 1), arkadaş lider tablosu,
  öneriler (ortak arkadaş + seviye), bildirim merkezi, engelle/şikayet, kullanıcı adı.
- Emoji yok: tepkiler adlandırılmış türler + SVG ikon (cheer, fire, heart, strong, star, wow).

## Veri modeli (Postgres, drizzle)
- `social_profiles` (userId PK→user, username UNIQUE ci, bio, visibility public|friends|private,
  allowRequests, showInSuggestions, showActivity, usernameChangedAt, createdAt, updatedAt)
- `friendships` (id, requesterId, addresseeId, status pending|accepted|declined, createdAt,
  respondedAt) — UNIQUE(requesterId, addresseeId); ters yön eklerken iki yön de kontrol edilir.
- `user_blocks` (blockerId, blockedId, createdAt) PK(blockerId, blockedId)
- `user_reports` (id, reporterId, reportedId, reason, detail, createdAt)
- `activity_events` (id, userId, type, payload jsonb, createdAt) idx(userId, createdAt desc)
  türler: streak_milestone, level_up, weekly_rank, achievement, friend_joined, quest_completed,
  friend_streak_milestone
- `event_reactions` (eventId, fromUserId, kind, createdAt) PK(eventId, fromUserId)
- `nudges` (id, fromUserId, toUserId, kind remind|cheer, createdAt) idx(fromUserId, toUserId, createdAt)
- `friend_quests` (id, userAId, userBId, weekStart date, targetXp, status invited|active|completed|
  failed|cancelled, invitedBy, createdAt, respondedAt, completedAt) idx(userAId, weekStart), idx(userBId, weekStart)
- `social_notifications` (id, userId, type, actorId, refType, refId, read, createdAt)
  idx(userId, read, createdAt desc)
- Tüm FK'ler user silinince CASCADE.

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
- GET `/api/social/leaderboard/friends` — bu hafta XP, ben + arkadaşlar, sıra
- GET `/api/social/notifications?cursor=` · POST `/api/social/notifications/read` {ids|all}
- GET/POST/DELETE `/api/social/blocks` · POST `/api/social/reports`
- Sunucu içi: `emitActivity(userId, type, payload)` — mevcut XP/seri/seviye/rozet yollarından çağrılır;
  kilometre taşında arkadaşlara `friend_milestone` bildirimi (fan-out, tavanlı).

## Kurallar (boşluk bırakmama listesi) — durum: uygulandı, denetlendi
- [x] Kendine istek/tepki/dürtme/engel yok (`self` hatası; engelde sessiz atlama)
- [x] Engel simetrik gizler; arkadaşlığı, bekleyen isteği, aktif görevi siler; engellenenden gelen bildirimleri kaldırır; arama/öneri/profil "bulunamadı"
- [x] Görünürlük: public / friends / private — `publicProfile` ve `searchUsers` uygular
- [x] Reddedilen istek 7 gün sonra yeniden (`declined_recent` 429); karşı taraf istemişse otomatik kabul
- [x] Hız sınırları DB'de (`rate_limits`, atomik upsert; üç instance'a dayanıklı): istek 50/gün, arama 30/dk, tepki 300/gün, dürtme 1/arkadaş/gün + 20/gün, görev 5/gün, engel 50/gün, şikayet 10/gün; süresi geçenler hafta kapanışında silinir
- [x] Kullanıcı adı: küçük harfe normalize + düz benzersiz indeks; 3-20 [a-z0-9_]; rezerve liste; 14 günde bir (ilk otomatik ad serbest); eski hesaplara TEMBEL atama (`usernames.ts`, yarışa dayanıklı)
- [x] Akış: ben + arkadaşlar; `showActivity=false` → olay hiç yazılmaz; imleç (createdAt,id); `friend_joined` çift başına tek
- [x] Tepki: yalnız arkadaşın olayına; olay+kişi başına tek satır (tür değişir); sahibine bildirim yalnız ilk tepkide
- [x] Dürtme: yalnız arkadaşa; push metni alıcının kendi sayısını taşır (seri / haftalık XP)
- [x] Görev: ikisi arkadaş; çift başına haftada tek; kişi başına tek aktif; hedef geçen haftanın %120'si (300-5000); tamamlanma XP yazan kancada anında; süresi dolan ilk okumada kapanır (cron YOK); ödül XP değil (rozet felsefesi), olay + bildirim
- [x] Arkadaş serisi: `daily_stats`ten türetilir (365 gün pencere), saklanmaz
- [x] Arkadaşlıktan çıkma sessiz; aradaki görev iptal
- [x] Bildirimler: `social_notifications` + `unread`; okundu (tek/tümü); imleçli; web push aynası yalnız doğrudan etkileşimlerde (kilometre taşı push'suz); mobilde gelen kutusu + zil rozeti (60 sn + öne gelince)
- [x] Öneriler: ortak arkadaş (çok→az) + aynı seviye/son 7 gün aktif; kendisi/arkadaş/istekli/engelli hariç; opt-in ve gizli olmayan; 20
- [x] Arama: 2+ karakter, 350 ms bekleme; private yalnız tam kullanıcı adıyla; ILIKE kaçışlı; 20
- [x] Boş durumlar (akış/istek/görev/tablo/arkadaş) + "Arkadaş bul" yönlendirmesi + davet bağlantısı `/u/<username>` (paylaş/kopyala)
- [x] Erişilebilirlik: aria-label/accessibilityLabel; SVG ikon, emoji yok
- [x] IDOR: isteğe yalnız alıcı cevaplar; göreve yalnız davet edilen; bildirim yalnız sahibi; `sameOrigin` her yazan rotada; kapalı sözlük doğrulama
- [x] İndeksler + `drizzle/0036_social.sql` (drizzle-kit çıktısıyla birebir karşılaştırıldı) + journal kaydı
- [x] Analitik: `EVENT_NAMES`e 9 sosyal olay
- [x] Web + mobil eşlik: aynı API; web `/friends` (5 sekme), `/u/[username]`, `/notifications`, ayarlar, öğren-nabız, zil; mobil `Friends/User/Inbox/SocialSettings` ekranları, sıralamada Arkadaşlar sekmesi, başlıkta zil, profilde satırlar
- [x] Kişi arması: web `avatar.tsx` ile aynı hash/palet mobilde `PersonAvatar` — aynı kişi iki platformda aynı renk

## Bilinçli sınırlar (v1)
- Mobilde uzak push yok (FCM kurulmadı); gelen kutusu çekmeli. Sonraki adım: `device_tokens` + FCM.
- Haftalık sıralama olayları (`weekly_top`) ve görev kapanışı ilk sosyal okumada tembel çalışır; cron kurulursa `closeWeekIfNeeded` oradan da çağrılabilir.
- Şikayetler yalnız kaydedilir; otomatik yaptırım yok.
- `WeeklyScreen`/haftalık sınav skoru sosyal katmana bağlı değil.

## Yayına alma sırası (ZORUNLU)
1. Sunucuda migration: `ssh lernomi 'cd /opt/lernomi/$(cat /opt/lernomi/active) && npx tsx scripts/apply-migration.ts drizzle/0036_social.sql'` — kod deploy'undan ÖNCE (yeni kod `profiles`ten yeni sütunları okur; sütun yoksa öğrenme yolları da 500 verir). Migration eski kod için zararsız (yalnız ekleme).
2. `git push origin main` → webhook → deploy.
3. Doğrulama: `/friends` açılır, kullanıcı adı otomatik gelir; iki hesapla istek/kabul/tepki/dürtme/görev.

## Arayüz
- Web: `/friends` (Arkadaşlar · İstekler · Öneriler · Ara · Akış), `/u/[username]`, bildirim zili +
  `/notifications`, ayarlarda "Sosyal ve gizlilik", ana sayfada arkadaş görevi kartı, lider tablosunda
  "Arkadaşlar" sekmesi.
- Mobil: FriendsScreen (aynı sekmeler), FeedScreen, PublicProfileScreen, NotificationsScreen,
  Settings > Sosyal, Home'da görev kartı, Leaderboard'da Arkadaşlar sekmesi, tepki seçici (6 SVG).

## Uygulama sırası
1. Şema + migration → 2. sunucu kütüphanesi (`src/lib/social/*`: friendship durum makinesi,
   görünürlük, hız, olay yayını) → 3. API rotaları → 4. mevcut XP/seri/seviye/rozet yollarına
   olay kancaları → 5. web UI → 6. mobil UI → 7. bildirim/push → 8. denetim turu (bu liste).
