# Beceriler kütüphanesi — serbest çalışma yüzeyi (2026-09-08)

**Ne.** Patika öğrenciyi bir sıraya sokar (ünite → ders → yuva). Beceriler artık
onun yanındaki **kütüphane**: öğrenci CEFR seviyesini ve becerisini kendi seçer,
istediği kadar yalnız okuma ya da yalnız dil bilgisi çalışır, her egzersizde
geri bildirim alır, bitirince "sıradaki"yi görür. İki kurs (Almanca, İngilizce;
anadil Türkçe), beş beceri (okuma, dinleme, yazma, konuşma, dil bilgisi), beş
seviye (A1–C1). Web, Android ve iOS aynı içeriği aynı biçimde oynatır.

**Neden ayrı.** Beceriler'in eski kendi egzersizleri ünite dosyalarının sonunda
duruyordu; Patika üretici havuzu liste sırasıyla tükettiği için bunlar geç
ünitelerin boş yuvalarına akıyordu, ayrıca kalitesi yetersiz bulunup
2026-09-07'de silindi. Yeni içerik `src/lib/skills/content/library/` altında,
`unit` alanı OLMADAN yaşıyor; `immersion/build.ts` bu havuza hiç bakmıyor
(`pathMetas`), Beceriler yalnız bunları gösteriyor (`libraryMetas`; mobilde
`listOwnSkillMeta`).

## Yapı

| Katman | Nerede | Not |
|---|---|---|
| Tip | `src/lib/skills/types.ts` | `SkillId` + `"grammar"`, `GrammarExercise` (focus, explanation[], questions[]), `isLibraryExercise`, `targetLangOf` |
| İçerik | `content/library/<kurs>-<seviye>.ts` → `library/index.ts` → `bundled.ts` | Kimlik `<kurs>-<seviye>-lib-<r|l|w|s|g><n>`; `en-mobile-2026.ts` mobilden taşınan 64 İngilizce egzersiz |
| Web hub | `src/app/(app)/skills/page.tsx` | Beş bölüm, puan rozeti, sıradaki önerisi, seviye-tamam kartı |
| Web oynatıcı | `immersion/skill/[id]/page.tsx` + `components/skills/{grammar,speaking,monologue}-player.tsx` | `PlayerFrame` bağlamı: hedef dil, geri, sıradaki |
| Mobil hub | `mobile/src/screens/SkillsScreen.tsx` | Aynı beş bölüm, cihazdaki tamamlama kümesiyle işaret ve öneri |
| Mobil oynatıcı | `mobile/src/screens/ItemScreen.tsx` + `mobile/src/game/skillLibrary.tsx` | Dil bilgisi anlatımı, söyleyiş drilli (cihaz tanıyıcısı + `spokenMatches`), monolog (`listenOnce` döngüsü → `/api/assess`) |
| Doğrulama | `npm run test:content -- skills`, `npm run check:libvocab -- <kurs> <seviye>`, `npm run audit:skills` | Kütüphane kimliği/kurs/seviye/beceri tutarlılığı, dil bilgisi kuralları, havuz dışı oranı |
| Döküm | `npm run dump:skills` ve `npm run dump:skills -- en` | Mobil paketler web bundle'ından; İngilizce paket artık elle yazılmıyor |

Hedef dil bilgisi `course` alanından türer: İngilizce kursta `de` alanı İngilizce
metin taşır (tarihsel ad), oynatıcılar sesi/tanıyıcıyı/rubriği `targetLangOf`
ile seçer; `/api/assess` `lang` alanını okur (önceden tip taşıyordu, rota
düşürüyordu).

## İçerik kuralları (özet; şartname `data/content/SPEC.md` ve yazar brifi)

- **Kopya yok.** Patika dersleri, ünite egzersizleri ve deneme kâğıtlarıyla aynı
  sahne/konu/metin yok; konu yakın olabilir, metin özgün.
- **Havuza riayet.** Metin seviyenin ve alt seviyelerin havuz katmanında kalır;
  hedef A1/A2 ≤ %10, B1 ≤ %15, B2/C1 ≤ %20 dışarıda (`check:libvocab`).
- **Geri bildirim her yerde.** Her soruda `explain`; yazma ve monologda rubrik
  (`/api/assess`); söyleyiş drillinde `confusions` (Türkçe konuşanın bilinen sapması).
- **Seviyeye göre biçim.** Konuşma A1–A2 söyleyiş drilli, B1–C1 monolog. Dil
  bilgisi her seviyede bir kural: anlatım (Türkçeyle karşıtlık) + 8–10 soru.
- **Mobil sınırı.** Yazma görevleri yalnız `build` ve `free` (mobil bu ikisini
  oynatıyor); soru türleri mcq/truefalse/gapfill/short_answer/dictation/order.

## Durum

| Parti | Kapsam | Durum |
|---|---|---|
| 1 (2026-09-08/09) | Kurs × seviye × beceri başına 1 egzersiz = 50 | **yazıldı, doğrulandı**; kalite kontrol turu bekliyor |
| 2 | Seviye × beceri başına 5 (250) | parti 1 onaylanınca aynı hatla |
| 3 | Seviye × beceri başına 25 | hedef |

Parti 1 doğrulaması: `test:content -- skills` kütüphane kimlikleri için sıfır hata
ve sıfır uyarı; `audit:skills` 984 egzersizde 513 bulgu, hiçbiri kütüphaneden;
havuz dışı kelime oranı DE %1,0–2,1 · EN %1,9–3,7 (hedefler %10/15/20).

### Parti 1 içeriği

| Seviye | Almanca (okuma · dinleme · yazma · konuşma · dil bilgisi) | İngilizce |
|---|---|---|
| A1 | Kayıp kedi ilanı · postane · kartpostal · ei/ie · Akkusativ | Okul gezisi mektubu · kayıp eşya · nineye kart · „th“ · present simple |
| A2 | Tamir kafesi · dil değişimi · hobi daveti · iki „ch“ · Perfekt | Barınak günlüğü · bisiklet kulübü · alışkanlık değişimi · -ed sesleri · past simple |
| B1 | Hobi bahçesi · orman gezisi · gönüllülük başvurusu · evden çalışma monoloğu · yan cümle | Yüzme öğrenmek · ev değişimi · köpek kararı · evden ayrılma monoloğu · present perfect |
| B2 | Depozito raporu · şikâyet yönetimi · kuruma itiraz · dört günlük hafta · Passiv | Yıldızlı puanlama · terfi mi işe alım mı · şikâyet yanıtı · bahşiş · conditionals |
| C1 | İstatistik denemesi · arşiv söyleşisi · jüri gerekçesi · çeviri araçları · Nominalstil | Kamusal alan denemesi · ses tasarımı · okur mektubu · çalışan izleme · inversion |

Konu seçimi Patika derslerinin, ünite egzersizlerinin ve deneme kâğıtlarının
dışından yapıldı (`scratchpad/avoid/*` listeleriyle karşılaştırılarak).

## Açık noktalar

- **Üretim tohumu.** Web içeriği veritabanından okuyor; push sonrası sunucuda
  `npm run db:seed:skills` koşulmadan yeni egzersizler web'de görünmez (mobil
  paket derlemeye gömülü, etkilenmez). Üretim DB'sine yazma sahibin işi.
- **Uyarı bütçesi.** Mobilden taşınan 64 İngilizce egzersiz doğrulayıcının
  "çoktan seçmeli olmayan soru < 2" etiketini 42 → 48'e çıkardı; `--baseline`
  ile bilinçli kabul edildi (o içerik daha önce doğrulayıcının dışındaydı).
  O egzersizlerin her birine ikinci bir yazılı soru eklemek ayrı bir iş.
- **Ölçüm betikleri.** `check:libvocab` İngilizce için düzensiz fiil ve
  kısaltma tablosu taşıyor (yoksa "went", "didn't" seviye dışı sayılıyordu);
  `audit:skills` artık kurs önekli kimlikleri tanıyor (`de-a2-lib-g1`,
  `en-a1-r1`) — eskiden 114 egzersize yanlış "seviye uyuşmuyor" diyordu.
- **Diğer pariteler.** Almanca-İngilizce ve İngilizce-Almanca anadil çiftleri
  için `intro`/`explain` gibi Türkçe alanların çevirisi gerekecek; tip bugün
  tek anadil taşıyor.
- **Ses.** Dinleme cihaz sentezi/tarayıcı sentezi; gerçek kayıt (`segments[].audio`)
  yok. Monolog mobilde cihaz tanıyıcısıyla parça parça transkript; iOS'ta
  `listenOnce` döngüsünün davranışı cihazda doğrulanmalı.
