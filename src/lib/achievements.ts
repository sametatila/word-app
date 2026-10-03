import "server-only";
import { SKILL_DONE_PCT } from "@/lib/score-bands";
import { and, count, desc, eq, gt, gte, inArray, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { translate, DEFAULT_NATIVE, type NativeLang } from "@/lib/i18n/dict";
import { PLAYABLE_GAMES, type PlayableGame } from "@/lib/types";
import { selectableCourses, supportsGame, targetLangOf, type TargetLang } from "@/lib/courses";
import { GROUP_LABEL_KEYS, GROUP_ORDER, type Group } from "@/lib/achievement-groups";
import { onAchievementsUnlocked } from "@/lib/social/hooks";
import type { IconMeaning } from "@/components/icons.remix.generated";
import {
  achievements,
  assessments,
  exams,
  questClaims,
  dailyStats,
  profiles,
  reviews,
  userConversations,
  moduleClears,
  referrals,
  userSkills,
  userWords,
  words,
} from "@/lib/db/schema";

/**
 * Rozetler.
 *
 * Uygulamada biriken tek şey XP'ydi ve XP tek bir sayı: 41.320'den 41.480'e
 * çıkmak hiçbir şey anlatmıyor. Geriye dönüp bakılacak, "şunu başardım"
 * denecek hiçbir yüzey yoktu — oysa veritabanında yüz günlük seriler, binlerce
 * doğru cevap ve bitmiş konuşmalar duruyordu. Emek vardı, hatırası yoktu.
 *
 * Üç tasarım kararı:
 *
 * 1. **İlerleme burada BİRİKTİRİLMİYOR.** Her rozet mevcut tablolardan
 *    okunuyor (`quests.ts` ile aynı ilke). Bunun bedeli birkaç ek sorgu,
 *    karşılığı ise şu: rozetler GERİYE DÖNÜK. Sistem yayına alındığı gün
 *    kimse sıfırdan başlamıyor; herkes o güne kadar gerçekten yaptığı işin
 *    rozetlerini bir anda açıyor. Yeni bir özelliğin var olan kullanıcıya
 *    verebileceği en iyi ilk izlenim bu.
 *
 * 2. **Az ve zor.** Araştırma tutarlı: her şeye rozet veren sistemler
 *    "overjustification" etkisiyle içsel motivasyonu DÜŞÜRÜYOR. Buradaki
 *    eşikler bilerek uzak — rozetlerin çoğu aylara yayılıyor, birkaçı
 *    yıllara. Beş dakikada açılan rozet, rozet değil bildirimdir.
 *
 *    "Az" olan rozet BAŞINA emek, toplam sayı değil: uygulama büyüdükçe yeni
 *    bölümler rozetsiz kaldı ve rozetsiz bölüm, ödülü olmayan bölüm değil
 *    GÖRÜNMEYEN bölüm demek — rozet duvarı uygulamanın neler yapabildiğini
 *    anlatan yüzeylerden biri. Dilbilgisi çalışması, sınavlar, yazma ve
 *    konuşma değerlendirmeleri, görevler ve yeni oyunlar bu yüzden eklendi.
 *
 * 3. **Hiçbiri satın alınamaz.** Tek yol oynamak. Uygulamada para yok ve
 *    olmayacak; rozetin değeri de tam olarak buradan geliyor.
 */

export type Tier = "bronze" | "silver" | "gold" | "legend";

export type Metric =
  | "longestStreak"
  | "mastered"
  | "correctAnswers"
  | "gameArtikel"
  | "gameListen"
  | "gameTyping"
  | "gameOrder"
  | "gamePlural"
  | "gameSpeak"
  | "conversations"
  | "skills"
  | "challengeBest"
  | "nightAnswers"
  | "earlyAnswers"
  | "bestDayReviews"
  | "activeDays"
  | "bossClears"
  | "courses"
  // Uygulama büyüdükçe rozetsiz kalan bölümler: dilbilgisi çalışması,
  // sınavlar, yazma ve konuşma değerlendirmeleri, görevler ve oyun keşfi.
  | "grammarDone"
  | "exams"
  | "bestExam"
  | "writings"
  | "bestWriting"
  | "speakings"
  | "gameTranslate"
  // KURSA GÖRE sayılanlar: yalnız kullanıcının ŞU ANKİ kursunun kelimelerine
  // verilen doğrular (bkz. collectMetrics). İngilizce kursun rozetleri
  // Almancada biriken boşluk doldurmayla açılmasın diye.
  | "gameCloze"
  | "gameScramble"
  | "gamesPlayed"
  | "fullQuestDays"
  /* Davet ettiği kaç kişi GERÇEKTEN çalışmaya başladı (üç günlük seri).
     Ölçü davet SAYISI değil: kayıt olup bir daha açmayan biri davetçiye
     rozet kazandırmamalı, yoksa rozet sahte hesapla üretilebilirdi. */
  | "invitedActive";

export type AchievementDef = {
  id: string;
  /**
   * Adın ve ipucunun SÖZLÜK ANAHTARLARI, metnin kendisi değil.
   *
   * Metin burada Türkçe sabit yazılıydı ve `/api/achievements` öyle
   * dönüyordu — yani mobil uygulama, arayüzü İngilizce ya da Almanca olsa
   * bile elli dört rozeti Türkçe gösteriyordu. Görev etiketleriyle aynı
   * desen: çeviri sunucuda, kullanıcının `native_lang`ine göre.
   */
  titleKey: string;
  /** Nasıl açılır — kilitliyken görünen tek metin (anahtar). */
  hintKey: string;
  /**
   * ESKİ ikon adı (`FlameIcon`, `BookIcon`, …) — YALNIZ yayımlanmış mobil
   * sürümler için (build ≤ 10). O sürümler bu adı kendi elle çizilmiş setinde
   * arıyor, bilmediği adda yıldıza düşüyor. Set Remix Icon'a geçti (2026-09-29)
   * ve adlar artık ANLAM adı; bu alanın değerleri o yüzden DONDURULDU: yeni
   * rozet de eski setten bir ad alır (yoksa eski sürümde yıldız çizilir).
   * Güncel istemciler `glyph`i okuyor. Eski sürümler mağazadan düşünce silinir.
   */
  icon: string;
  /**
   * Rozetin ikonu, ANLAM kimliğiyle (`data/icons/picks.json` satırı:
   * `streak`, `ach-words`, …). Web `BadgeIcon` ve mobil `AchievementIcon`
   * bunu çiziyor; tanımadığı kimlikte yıldıza düşüyor.
   */
  glyph: IconMeaning;
  tier: Tier;
  group: Group;
  metric: Metric;
  /**
   * Hedef. `gamesPlayed` için bu sayı ÜST SINIR (bütün oyunlar); asıl hedef
   * kursun oyun sayısı ve `targetFor` onu veriyor.
   */
  target: number;
  /**
   * Rozet hangi kurslarda VAR — yoksa her kursta. Yalnız sunucuda; satıra
   * (API) girmiyor.
   */
  only?: CourseScope;
};

/**
 * KURSA UYGUN BAŞARIM (Samet, 2026-09-29: "kursa uygun başarımlar olmalı").
 *
 * Katalog tek listeydi ve her kursa aynen gösteriliyordu. İngilizce öğrenen
 * üç rozeti hiç kazanamıyordu: `artikel300` ile `plural150` Almancanın
 * cinsiyetli isim sistemine dayanan iki oyunu sayıyor (İngilizcede bu oyunlar
 * yok), `allGames` ise on bir oyun istiyordu ve İngilizce kursta dokuz oyun
 * var. Tahta "2/53" diyordu ve İngilizce öğrenen %100'e hiç ulaşamazdı.
 *
 * - `game`: oyuna bağlı rozet. Oyun kursta üretilemiyorsa (`supportsGame`,
 *   kurs kayıt defterinin TEK kararı) rozet o kursun kataloğunda yok.
 *   Kurs listesi burada yazılmıyor: Fransızca eklendiğinde artikel rozetleri
 *   `hasArticles` bayrağıyla kendiliğinden gelir.
 * - `targetLang`: kursun hedef diline özgü rozet. İngilizce kurs artikel ve
 *   çoğul rozetlerinin yerine kendi iki rozetini alıyor; İngilizce öğrenen
 *   daha az rozetle kalmıyor.
 * - `insteadOf`: bu rozet hangi rozetin KARŞILIĞI. Avatar kilitleri rozet
 *   kimliğine bağlı (`lib/avatar-unlocks`); karşılık, o parçayı öteki kursta
 *   da açıyor (`unlockedAchievementIds`) — yoksa artikel rozetine bağlı
 *   şapka İngilizce öğrenene hiç açılmazdı.
 */
export type CourseScope = {
  game?: PlayableGame;
  targetLang?: TargetLang;
  insteadOf?: string;
};

/**
 * Rozet listesi.
 *
 * Sıra önemli: aynı gruptaki rozetler kolaydan zora dizili, arayüz de onları
 * bu sırayla gösteriyor. Bir gruptaki ilk kilitli rozet "sıradaki hedef"
 * olarak öne çıkarılıyor.
 */
export const ACHIEVEMENTS: AchievementDef[] = [
  // ——— Seri ———————————————————————————————————————————————————————
  { id: "streak3", titleKey: "ach.streak3.title", hintKey: "ach.streak3.hint", icon: "FlameIcon", glyph: "streak", tier: "bronze", group: "streak", metric: "longestStreak", target: 3 },
  { id: "streak7", titleKey: "ach.streak7.title", hintKey: "ach.streak7.hint", icon: "FlameIcon", glyph: "streak", tier: "bronze", group: "streak", metric: "longestStreak", target: 7 },
  { id: "streak30", titleKey: "ach.streak30.title", hintKey: "ach.streak30.hint", icon: "FlameIcon", glyph: "streak", tier: "silver", group: "streak", metric: "longestStreak", target: 30 },
  { id: "streak100", titleKey: "ach.streak100.title", hintKey: "ach.streak100.hint", icon: "FlameIcon", glyph: "streak", tier: "gold", group: "streak", metric: "longestStreak", target: 100 },
  { id: "streak365", titleKey: "ach.streak365.title", hintKey: "ach.streak365.hint", icon: "FlameIcon", glyph: "streak", tier: "legend", group: "streak", metric: "longestStreak", target: 365 },

  // ——— Kelime ————————————————————————————————————————————————————
  { id: "words50", titleKey: "ach.words50.title", hintKey: "ach.words50.hint", icon: "BookIcon", glyph: "ach-words", tier: "bronze", group: "vocab", metric: "mastered", target: 50 },
  { id: "words250", titleKey: "ach.words250.title", hintKey: "ach.words250.hint", icon: "BookIcon", glyph: "ach-words", tier: "silver", group: "vocab", metric: "mastered", target: 250 },
  { id: "words1000", titleKey: "ach.words1000.title", hintKey: "ach.words1000.hint", icon: "BookOpenIcon", glyph: "ach-words", tier: "gold", group: "vocab", metric: "mastered", target: 1000 },
  { id: "words3000", titleKey: "ach.words3000.title", hintKey: "ach.words3000.hint", icon: "BookOpenIcon", glyph: "ach-words", tier: "legend", group: "vocab", metric: "mastered", target: 3000 },

  // ——— Oyun ustalıkları ——————————————————————————————————————————
  { id: "answers500", titleKey: "ach.answers500.title", hintKey: "ach.answers500.hint", icon: "CheckIcon", glyph: "correct", tier: "bronze", group: "games", metric: "correctAnswers", target: 500 },
  { id: "answers2500", titleKey: "ach.answers2500.title", hintKey: "ach.answers2500.hint", icon: "CheckIcon", glyph: "correct", tier: "silver", group: "games", metric: "correctAnswers", target: 2500 },
  { id: "answers10000", titleKey: "ach.answers10000.title", hintKey: "ach.answers10000.hint", icon: "CheckIcon", glyph: "correct", tier: "gold", group: "games", metric: "correctAnswers", target: 10000 },
  { id: "artikel300", titleKey: "ach.artikel300.title", hintKey: "ach.artikel300.hint", icon: "TagIcon", glyph: "game-article", tier: "silver", group: "games", metric: "gameArtikel", target: 300, only: { game: "artikel" } },
  /*
    İNGİLİZCE KURSUN KARŞILIKLARI. Artikel ve çoğul Almancanın zor yanı;
    İngilizcenin zor yanı başka: kelimenin anlamı BAĞLAMDA oturuyor (edat,
    eşdizim, deyimsel fiil) ve yazımı sesinden çıkarılamıyor. Kursun ikisini
    de çalıştıran oyunları var — boşluk doldurma ve harf bulmacası — ve
    ikisinin cevabı `reviews`ta oyun adıyla duruyor, yeni bir sayaç gerekmiyor.
    Hedef ve kademe karşılık oldukları rozetle aynı.
  */
  { id: "cloze300", titleKey: "ach.cloze300.title", hintKey: "ach.cloze300.hint", icon: "WriteIcon", glyph: "game-cloze", tier: "silver", group: "games", metric: "gameCloze", target: 300, only: { targetLang: "en", insteadOf: "artikel300" } },
  { id: "listen200", titleKey: "ach.listen200.title", hintKey: "ach.listen200.hint", icon: "HeadphonesIcon", glyph: "skill-listening", tier: "silver", group: "games", metric: "gameListen", target: 200 },
  { id: "typing200", titleKey: "ach.typing200.title", hintKey: "ach.typing200.hint", icon: "KeyboardIcon", glyph: "game-typing", tier: "silver", group: "games", metric: "gameTyping", target: 200 },
  { id: "order150", titleKey: "ach.order150.title", hintKey: "ach.order150.hint", icon: "SortIcon", glyph: "game-order", tier: "silver", group: "games", metric: "gameOrder", target: 150 },
  { id: "plural150", titleKey: "ach.plural150.title", hintKey: "ach.plural150.hint", icon: "StackIcon", glyph: "game-plural", tier: "silver", group: "games", metric: "gamePlural", target: 150, only: { game: "plural" } },
  { id: "scramble150", titleKey: "ach.scramble150.title", hintKey: "ach.scramble150.hint", icon: "PuzzleIcon", glyph: "game-scramble", tier: "silver", group: "games", metric: "gameScramble", target: 150, only: { targetLang: "en", insteadOf: "plural150" } },
  { id: "speak100", titleKey: "ach.speak100.title", hintKey: "ach.speak100.hint", icon: "MicIcon", glyph: "skill-speaking", tier: "silver", group: "games", metric: "gameSpeak", target: 100 },
  { id: "speak500", titleKey: "ach.speak500.title", hintKey: "ach.speak500.hint", icon: "MicIcon", glyph: "skill-speaking", tier: "gold", group: "games", metric: "gameSpeak", target: 500 },

  { id: "translate200", titleKey: "ach.translate200.title", hintKey: "ach.translate200.hint", icon: "TranslateIcon", glyph: "game-translate", tier: "silver", group: "games", metric: "gameTranslate", target: 200 },
  /*
    Keşif rozeti: sayı değil ÇEŞİT. Oyunların bazıları yalnızca karışık
    turda ve seyrek çıkıyor; kullanıcıların çoğu "Çoğul Bilmece"nin ya da
    "Doğru mu Yanlış mı"nın varlığını bilmiyor. Hepsini bir kez oynatmak,
    listeyi göstermekten daha iyi bir tanıtım.

    "Hepsi" KURSUN oyunları: Almancada on bir, İngilizcede dokuz (`targetFor`).
    Metin bu yüzden sayı yazmıyor ("kursundaki her oyunda"); sayı ilerleme
    çubuğunda zaten görünüyor. `{n}` yer tutucusu da seçilmedi: aynı ipucu
    avatar kilidinde değişkensiz çevriliyor (`avatar-items` `unlockHint`) ve
    orada "{n}" diye çıkardı.
  */
  { id: "allGames", titleKey: "ach.allGames.title", hintKey: "ach.allGames.hint", icon: "PuzzleIcon", glyph: "all-games", tier: "silver", group: "games", metric: "gamesPlayed", target: PLAYABLE_GAMES.length },

  // ——— Dilbilgisi ————————————————————————————————————————————————
  // Dilbilgisi çalışması uygulamanın en yeni bölümü ve hiç rozeti yoktu.
  // Ölçü kelimedekiyle aynı tanım: 21 günü geçen aralık = pekişmiş.
  /*
    HEDEFLER İÇERİĞİN ÖLÇEĞİNE GÖRE. Eski 50/250/1000 madde başınaydı (her gün
    tekrar edilen tek tek çekim maddeleri); yeni ölçü ALIŞTIRMA sayıyor ve
    kütüphanede kurs başına bugün 25 dilbilgisi alıştırması var (seviye başına
    beş, beş seviye). 5/12/25: ilki ilk oturumda, sonuncusu kursun tamamını
    bitirenlerde. Kütüphane büyüdükçe hedefler yine anlamlı kalır.
  */
  { id: "grammar5", titleKey: "ach.grammar5.title", hintKey: "ach.grammar5.hint", icon: "GrammarIcon", glyph: "skill-grammar", tier: "bronze", group: "grammar", metric: "grammarDone", target: 5 },
  { id: "grammar12", titleKey: "ach.grammar12.title", hintKey: "ach.grammar12.hint", icon: "GrammarIcon", glyph: "skill-grammar", tier: "silver", group: "grammar", metric: "grammarDone", target: 12 },
  { id: "grammar25", titleKey: "ach.grammar25.title", hintKey: "ach.grammar25.hint", icon: "MountainIcon", glyph: "ach-summit", tier: "gold", group: "grammar", metric: "grammarDone", target: 25 },

  // ——— Konuşma ——————————————————————————————————————————————————————
  { id: "conversation1", titleKey: "ach.conversation1.title", hintKey: "ach.conversation1.hint", icon: "ChatIcon", glyph: "conversation", tier: "bronze", group: "conversations", metric: "conversations", target: 1 },
  { id: "conversation10", titleKey: "ach.conversation10.title", hintKey: "ach.conversation10.hint", icon: "SchoolIcon", glyph: "ach-conversation", tier: "bronze", group: "conversations", metric: "conversations", target: 10 },
  { id: "conversation50", titleKey: "ach.conversation50.title", hintKey: "ach.conversation50.hint", icon: "SchoolIcon", glyph: "ach-conversation", tier: "gold", group: "conversations", metric: "conversations", target: 50 },
  { id: "conversation100", titleKey: "ach.conversation100.title", hintKey: "ach.conversation100.hint", icon: "MountainIcon", glyph: "ach-summit", tier: "legend", group: "conversations", metric: "conversations", target: 100 },
  { id: "boss1", titleKey: "ach.boss1.title", hintKey: "ach.boss1.hint", icon: "FlagIcon", glyph: "ach-boss", tier: "silver", group: "conversations", metric: "bossClears", target: 1 },
  { id: "boss10", titleKey: "ach.boss10.title", hintKey: "ach.boss10.hint", icon: "FlagIcon", glyph: "ach-boss", tier: "gold", group: "conversations", metric: "bossClears", target: 10 },

  // ——— Sınav ——————————————————————————————————————————————————————
  // Sınavlar (haftanın kısa sınavı ve seviye sınavları) ölçümün en ağır
  // kanıtı ama hiç rozeti yoktu. Puan rozeti sayıdan ayrı: on sınava girmek
  // alışkanlık, bir sınavdan 90 almak başarı.
  { id: "exam1", titleKey: "ach.exam1.title", hintKey: "ach.exam1.hint", icon: "FlagIcon", glyph: "ach-boss", tier: "bronze", group: "exams", metric: "exams", target: 1 },
  { id: "exam10", titleKey: "ach.exam10.title", hintKey: "ach.exam10.hint", icon: "FlagIcon", glyph: "ach-boss", tier: "silver", group: "exams", metric: "exams", target: 10 },
  { id: "exam90", titleKey: "ach.exam90.title", hintKey: "ach.exam90.hint", icon: "StarIcon", glyph: "reaction-star", tier: "gold", group: "exams", metric: "bestExam", target: 90 },

  // ——— Beceri ————————————————————————————————————————————————————
  { id: "skill1", titleKey: "ach.skill1.title", hintKey: "ach.skill1.hint", icon: "CompassIcon", glyph: "ach-explore", tier: "bronze", group: "skills", metric: "skills", target: 1 },
  { id: "skill10", titleKey: "ach.skill10.title", hintKey: "ach.skill10.hint", icon: "CompassIcon", glyph: "ach-explore", tier: "silver", group: "skills", metric: "skills", target: 10 },
  { id: "skill40", titleKey: "ach.skill40.title", hintKey: "ach.skill40.hint", icon: "GlobeIcon", glyph: "ach-explore", tier: "gold", group: "skills", metric: "skills", target: 40 },

  /*
    Yazma ve konuşma buradaydı ama rozetsizdi.

    "Yazılarım" ekranı boş açılıyordu ve boş kalmasının bir sebebi de hiçbir
    şeyin oraya çağırmamasıydı. Üç rozet o ekrana bir yön veriyor: ilkini
    yaz, alışkanlık kur, bir kez de gerçekten iyi yaz.
  */
  { id: "writing1", titleKey: "ach.writing1.title", hintKey: "ach.writing1.hint", icon: "PenIcon", glyph: "skill-writing", tier: "bronze", group: "skills", metric: "writings", target: 1 },
  { id: "writing15", titleKey: "ach.writing15.title", hintKey: "ach.writing15.hint", icon: "PenIcon", glyph: "skill-writing", tier: "silver", group: "skills", metric: "writings", target: 15 },
  { id: "writing85", titleKey: "ach.writing85.title", hintKey: "ach.writing85.hint", icon: "StarIcon", glyph: "reaction-star", tier: "gold", group: "skills", metric: "bestWriting", target: 85 },
  { id: "speaking25", titleKey: "ach.speaking25.title", hintKey: "ach.speaking25.hint", icon: "MicIcon", glyph: "skill-speaking", tier: "silver", group: "skills", metric: "speakings", target: 25 },

  // ——— Hayatta kalma ————————————————————————————————————————————
  { id: "challenge500", titleKey: "ach.challenge500.title", hintKey: "ach.challenge500.hint", icon: "SparkIcon", glyph: "survival", tier: "bronze", group: "rounds", metric: "challengeBest", target: 500 },
  { id: "challenge1500", titleKey: "ach.challenge1500.title", hintKey: "ach.challenge1500.hint", icon: "SparkIcon", glyph: "survival", tier: "silver", group: "rounds", metric: "challengeBest", target: 1500 },
  { id: "challenge3000", titleKey: "ach.challenge3000.title", hintKey: "ach.challenge3000.hint", icon: "SparkIcon", glyph: "survival", tier: "gold", group: "rounds", metric: "challengeBest", target: 3000 },

  // ——— Davet ——————————————————————————————————————————————————————
  /*
    ÖLÇÜ DAVET SAYISI DEĞİL, DAVET EDİLENİN KALMASI (üç günlük seri). Rozet
    "kaç kişiye bağlantı yolladın"ı değil "kaç kişiyi gerçekten getirdin"i
    anlatıyor; sahte hesapla üretilemez olmasının sebebi de bu.
  */
  { id: "invite1", titleKey: "ach.invite1.title", hintKey: "ach.invite1.hint", icon: "UserPlusIcon", glyph: "add-friend", tier: "bronze", group: "social", metric: "invitedActive", target: 1 },
  { id: "invite3", titleKey: "ach.invite3.title", hintKey: "ach.invite3.hint", icon: "UserPlusIcon", glyph: "add-friend", tier: "silver", group: "social", metric: "invitedActive", target: 3 },
  { id: "invite10", titleKey: "ach.invite10.title", hintKey: "ach.invite10.hint", icon: "UserPlusIcon", glyph: "add-friend", tier: "gold", group: "social", metric: "invitedActive", target: 10 },

  // ——— Keşif ——————————————————————————————————————————————————————
  { id: "night50", titleKey: "ach.night50.title", hintKey: "ach.night50.hint", icon: "MoonIcon", glyph: "theme-dark", tier: "silver", group: "discovery", metric: "nightAnswers", target: 50 },
  { id: "early50", titleKey: "ach.early50.title", hintKey: "ach.early50.hint", icon: "SunIcon", glyph: "theme-light", tier: "silver", group: "discovery", metric: "earlyAnswers", target: 50 },
  { id: "marathon150", titleKey: "ach.marathon150.title", hintKey: "ach.marathon150.hint", icon: "RunIcon", glyph: "ach-marathon", tier: "gold", group: "discovery", metric: "bestDayReviews", target: 150 },
  { id: "days30", titleKey: "ach.days30.title", hintKey: "ach.days30.hint", icon: "CalendarIcon", glyph: "weekly-test", tier: "silver", group: "discovery", metric: "activeDays", target: 30 },
  { id: "days100", titleKey: "ach.days100.title", hintKey: "ach.days100.hint", icon: "CalendarIcon", glyph: "weekly-test", tier: "gold", group: "discovery", metric: "activeDays", target: 100 },
  { id: "bilingual", titleKey: "ach.bilingual.title", hintKey: "ach.bilingual.hint", icon: "MapIcon", glyph: "ach-bilingual", tier: "gold", group: "discovery", metric: "courses", target: 2 },
  /*
    Görevler her gün üç tane ve gece yarısı yenileniyor. Rozet TOPLAM ödül
    sayısını değil, üçünün de bitirildiği GÜN sayısını sayıyor: yirmi gün tek
    görev almak ile yirmi günü tam kapatmak aynı şey değil ve ikincisi
    görevlerin var oluş sebebi.
  */
  { id: "quests20", titleKey: "ach.quests20.title", hintKey: "ach.quests20.hint", icon: "TargetIcon", glyph: "quest", tier: "gold", group: "discovery", metric: "fullQuestDays", target: 20 },
];

const BY_ID = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));

/** Kursun oynanabilir oyunları — `allGames`in hedefi bunların sayısı. */
export function courseGames(course: string | null | undefined): PlayableGame[] {
  return PLAYABLE_GAMES.filter((g) => supportsGame(course, g));
}

/** Rozet bu kursun kataloğunda mı (bkz. `CourseScope`). */
export function inCourse(def: AchievementDef, course: string | null | undefined): boolean {
  const o = def.only;
  if (!o) return true;
  if (o.game && !supportsGame(course, o.game)) return false;
  if (o.targetLang && targetLangOf(course) !== o.targetLang) return false;
  return true;
}

/** Kursun rozet kataloğu — tanım sırası korunur. */
export function catalogFor(course: string | null | undefined): AchievementDef[] {
  return ACHIEVEMENTS.filter((d) => inCourse(d, course));
}

/** Rozetin bu kurstaki hedefi: `allGames` kursun oyun sayısı, gerisi sabit. */
export function targetFor(def: AchievementDef, course: string | null | undefined): number {
  return def.metric === "gamesPlayed" ? courseGames(course).length : def.target;
}

/**
 * Bu rozetin sağladığı avatar kilidi anahtarları: kendisi + karşılık olduğu
 * rozet (`insteadOf`). `cloze300` hem kendini hem `artikel300`ü açar.
 */
export function unlockKeysOf(id: string): string[] {
  const alt = BY_ID.get(id)?.only?.insteadOf;
  return alt ? [id, alt] : [id];
}

/**
 * Kilit ipucunda gösterilecek rozet: rozet kullanıcının kursunda yoksa
 * kursundaki KARŞILIĞI. İngilizce öğrenene artikel şapkasının ipucu olarak
 * "300 artikeli doğru bil" demek, açılamayacak bir yol göstermek olurdu.
 */
export function achievementForCourse(id: string, course: string | null | undefined): string {
  const def = BY_ID.get(id);
  if (!def || inCourse(def, course)) return id;
  return ACHIEVEMENTS.find((d) => d.only?.insteadOf === id && inCourse(d, course))?.id ?? id;
}

// Grup tanımı arayüzle ortak (bkz. lib/achievement-groups): sunucu tarafı
// `server-only` olduğu için arayüz onu içe aktaramıyordu ve liste elle
// kopyalanmıştı. Yeni bir grup eklenince rozetler açılıyor ama duvarda hiç
// görünmüyordu.
export { GROUP_LABEL_KEYS, GROUP_ORDER };
export type { Group };


type Metrics = Record<Metric, number>;

/**
 * Rozetlerin dayandığı bütün sayılar, tek yerde.
 *
 * Her rozetin kendi sorgusunu yapması 33 sorgu demekti. Ölçüler bir kez
 * toplanıp bütün tanımlar bu tek pakete karşı değerlendiriliyor; yeni bir
 * rozet eklemek çoğu zaman hiç yeni sorgu gerektirmiyor.
 */
async function collectMetrics(userId: string): Promise<{ metrics: Metrics; course: string }> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  const tz = profile?.timezone || "Europe/Istanbul";
  // Katalog ve kursa göre sayılan ölçüler bu kursa bakıyor (bkz. CourseScope).
  const course = profile?.course ?? "de";

  const [
    masteredRow,
    gameRows,
    conversationRow,
    skillRow,
    bossRow,
    hourRow,
    dayRow,
    courseRow,
    drillRow,
    examRow,
    assessRow,
    questRow,
    inviteRow,
  ] = await Promise.all([
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(userWords)
      .where(and(eq(userWords.userId, userId), gte(userWords.intervalDays, 21))),

    /*
      Oyun bazlı doğru sayıları tek geçişte; toplam da buradan çıkıyor.
      KURSA AYRILMIŞ: cevap kaydı kursu taşımıyor, kelime taşıyor. Kursa
      göre sayılan rozetler (`allGames`, İngilizce kursun iki rozeti) yalnız
      şu anki kursun satırlarını alıyor; genel sayılar hepsinin toplamı.
      LEFT JOIN: kelimesi bulunamayan eski bir cevap toplamdan düşmesin.
    */
    db
      .select({ game: reviews.game, course: words.course, n: sql<number>`count(*)::int` })
      .from(reviews)
      .leftJoin(words, eq(words.id, reviews.wordId))
      .where(and(eq(reviews.userId, userId), eq(reviews.correct, true)))
      .groupBy(reviews.game, words.course),

    db
      .select({ n: sql<number>`count(*)::int` })
      .from(userConversations)
      .where(and(eq(userConversations.userId, userId), eq(userConversations.chatDone, true))),

    db.select({ n: sql<number>`count(*)::int` }).from(userSkills).where(eq(userSkills.userId, userId)),

    db
      .select({ n: sql<number>`count(*)::int` })
      .from(moduleClears)
      .where(eq(moduleClears.userId, userId)),

    // Gece/sabah sayımı kullanıcının KENDİ saat diliminde: sunucunun UTC
    // saati "gece kuşu" rozetini İstanbul'daki bir kullanıcı için üç saat
    // kaydırırdı.
    db
      .select({
        night: sql<number>`count(*) filter (where extract(hour from ${reviews.createdAt} at time zone ${tz}) < 5)::int`,
        early: sql<number>`count(*) filter (where extract(hour from ${reviews.createdAt} at time zone ${tz}) between 5 and 7)::int`,
      })
      .from(reviews)
      .where(eq(reviews.userId, userId)),

    db
      .select({
        days: sql<number>`count(*) filter (where ${dailyStats.reviews} > 0 or ${dailyStats.xp} > 0)::int`,
        best: sql<number>`coalesce(max(${dailyStats.reviews}), 0)::int`,
      })
      .from(dailyStats)
      .where(eq(dailyStats.userId, userId)),

    // Kaç farklı kursta gerçekten çalışılmış: kelime kaydı kursu taşımıyor,
    // kelimenin kendisi taşıyor. `reps > 0` şartı önemli — kurs değiştirip
    // hiç oynamamak "iki kurs" saymamalı.
    db
      .select({ n: sql<number>`count(distinct ${words.course})::int` })
      .from(userWords)
      .innerJoin(words, eq(words.id, userWords.wordId))
      .where(and(eq(userWords.userId, userId), gt(userWords.reps, 0))),

    /*
      GEÇİLMİŞ DİLBİLGİSİ ALIŞTIRMASI.

      Eski ölçü 2026-08'de kaldırılan dilbilgisi çalışmasına (`cheat_progress`)
      bakıyordu ve o günden beri sabit 0 dönüyordu: üç rozet kazanılması
      imkânsız duruyordu. Yeni karşılığı Beceriler kütüphanesindeki dilbilgisi
      alıştırmaları — `user_skills` satırı `skill` alanını kendi taşıyor
      (WP-01), bu yüzden katalogla birleştirmeye gerek yok.

      Geçme eşiği Yapabildiklerim'dekiyle AYNI (lib/cando-progress.ts): son
      puan ≥ 70 ya da doğru/toplam ≥ 0.7. İki yerde iki farklı "geçti" tanımı
      olsaydı aynı alıştırma bir ekranda geçilmiş, diğerinde geçilmemiş
      görünürdü.

      Patika'nın gramer adımı bu sayıya GİRMİYOR: o adım bugün sunucuya hiçbir
      şey yazmıyor (bkz. components/immersion/quiz-player.tsx — "v1: pratik,
      ilerleme kaydı yok). Kayıt eklendiği gün buraya da eklenir.
    */
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(userSkills)
      .where(
        and(
          eq(userSkills.userId, userId),
          eq(userSkills.skill, "grammar"),
          sql`(coalesce(${userSkills.lastScore}, 0) >= ${SKILL_DONE_PCT} or (${userSkills.total} > 0 and ${userSkills.correct}::numeric / ${userSkills.total} >= ${SKILL_DONE_PCT / 100}))`,
        ),
      ),

    db
      .select({ n: sql<number>`count(*)::int`, best: sql<number>`coalesce(max(${exams.score}), 0)::int` })
      .from(exams)
      .where(eq(exams.userId, userId)),

    /*
      Yazma ve konuşma tek geçişte. Puan `result` içindeki JSON'dan
      okunuyor; değerlendirilmemiş (result null) denemeler sayılmıyor —
      gönderilmiş ama hakemden dönmemiş bir yazı henüz bir yazı değil.
    */
    db
      .select({
        writings: sql<number>`count(*) filter (where ${assessments.kind} = 'writing')::int`,
        bestWriting: sql<number>`coalesce(max((${assessments.result}->'score'->>'overall')::int) filter (where ${assessments.kind} = 'writing'), 0)::int`,
        speakings: sql<number>`count(*) filter (where ${assessments.kind} in ('speaking', 'chat'))::int`,
      })
      .from(assessments)
      .where(and(eq(assessments.userId, userId), isNotNull(assessments.result))),

    // Üç görevin de alındığı gün sayısı — tek tek ödüller değil, tam günler.
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(
        db
          .select({ day: questClaims.day })
          .from(questClaims)
          .where(eq(questClaims.userId, userId))
          .groupBy(questClaims.day)
          .having(sql`count(*) >= 3`)
          .as("full_days"),
      ),

    /*
      DAVET ETTİĞİ KAÇ KİŞİ GERÇEKTEN ÇALIŞMAYA BAŞLADI.

      Ölçü davet SAYISI değil, davet edilenin ÜÇ GÜNLÜK SERİSİ. Sayıya
      bakılsaydı rozet sahte hesapla üretilebilirdi: kod paylaş, kendi açtığın
      hesaplarla gir, rozeti al. Üç günlük seri bunu kapatıyor çünkü üç ayrı
      günde gerçekten çalışmak gerekiyor — ve zaten rozetin ANLATTIĞI şey de
      bu: "birini getirdin ve o kişi kaldı".

      `longest_streak` seçildi, `current_streak` değil: seriyi bir kez yapıp
      sonra ara veren davetli de sayılmalı, yoksa rozet geri alınırdı.
    */
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(referrals)
      .innerJoin(profiles, eq(profiles.userId, referrals.inviteeUserId))
      .where(and(eq(referrals.inviterUserId, userId), gte(profiles.longestStreak, 3))),
  ]);

  const games = new Map<string, number>();
  const here = new Map<string, number>();
  for (const r of gameRows) {
    games.set(r.game, (games.get(r.game) ?? 0) + Number(r.n));
    if (r.course === course) here.set(r.game, (here.get(r.game) ?? 0) + Number(r.n));
  }
  const correctTotal = gameRows.reduce((s, r) => s + Number(r.n), 0);
  const courses = Number(courseRow[0]?.n ?? 0);

  const metrics: Metrics = {
    longestStreak: profile?.longestStreak ?? 0,
    mastered: Number(masteredRow[0]?.n ?? 0),
    correctAnswers: correctTotal,
    gameArtikel: games.get("artikel") ?? 0,
    gameListen: games.get("listen") ?? 0,
    gameTyping: games.get("typing") ?? 0,
    gameOrder: games.get("order") ?? 0,
    gamePlural: games.get("plural") ?? 0,
    gameSpeak: games.get("speak") ?? 0,
    conversations: Number(conversationRow[0]?.n ?? 0),
    skills: Number(skillRow[0]?.n ?? 0),
    challengeBest: profile?.challengeBest ?? 0,
    nightAnswers: Number(hourRow[0]?.night ?? 0),
    earlyAnswers: Number(hourRow[0]?.early ?? 0),
    bestDayReviews: Number(dayRow[0]?.best ?? 0),
    activeDays: Number(dayRow[0]?.days ?? 0),
    bossClears: Number(bossRow[0]?.n ?? 0),
    courses,
    grammarDone: Number(drillRow[0]?.n ?? 0),
    exams: Number(examRow[0]?.n ?? 0),
    bestExam: Number(examRow[0]?.best ?? 0),
    writings: Number(assessRow[0]?.writings ?? 0),
    bestWriting: Number(assessRow[0]?.bestWriting ?? 0),
    speakings: Number(assessRow[0]?.speakings ?? 0),
    gameTranslate: games.get("translate") ?? 0,
    gameCloze: here.get("cloze") ?? 0,
    gameScramble: here.get("scramble") ?? 0,
    // Kursun oyunlarından kaç FARKLISINDA, bu kursta, en az bir doğru var.
    // Hiç doğru yapılmamış bir oyunu "oynandı" saymak, keşif rozetini
    // rastgele bir dokunuşla açardı.
    gamesPlayed: courseGames(course).filter((g) => (here.get(g) ?? 0) > 0).length,
    fullQuestDays: Number(questRow[0]?.n ?? 0),
    invitedActive: Number(inviteRow[0]?.n ?? 0),
  };
  return { metrics, course };
}

/**
 * Arayüze giden satır: tanım + ilerleme, ama metinler ÇÖZÜLMÜŞ halde.
 *
 * `titleKey`/`hintKey` istemciye gitmiyor, `title`/`hint` gidiyor — yani API
 * sözleşmesi DEĞİŞMİYOR ve mobilin yayınlanmış sürümleri aynı alanları
 * okumaya devam ediyor, yalnız artık kendi dillerinde.
 */
export type AchievementRow = Omit<AchievementDef, "titleKey" | "hintKey" | "only"> & {
  title: string;
  hint: string;
  done: number;
  unlocked: boolean;
  unlockedAt: string | null;
};

export type AchievementBoard = {
  /** Kursun kataloğu + başka kursta kazanılmış rozetler (bkz. achievementBoard). */
  rows: AchievementRow[];
  /** `rows` üzerinden: kursunu bitiren %100'e ulaşır. */
  unlockedCount: number;
  total: number;
  /** Henüz kutlanmamış rozetler — özet ekranı bunları patlatır ve işaretler. */
  fresh: AchievementRow[];
};

/**
 * Rozet tahtası + yeni açılanların kaydı.
 *
 * Okuma ve yazma bilerek aynı işlevde: rozetlerin "açılma anı" ancak biri
 * baktığında hesaplanabiliyor ve o an kaydedilmezse kaybolurdu. Ekleme
 * çakışmaya dayanıklı (birincil anahtar), yani aynı anda gelen iki istek
 * aynı rozeti iki kez veremez.
 */
export async function achievementBoard(
  userId: string,
  /** Rozet adlarının çevrileceği dil — çağıranın profilinden gelir. */
  lang: NativeLang = DEFAULT_NATIVE,
): Promise<AchievementBoard> {
  const [{ metrics, course }, owned] = await Promise.all([
    collectMetrics(userId),
    db
      .select({
        id: achievements.achievementId,
        at: achievements.unlockedAt,
        seen: achievements.seen,
      })
      .from(achievements)
      .where(eq(achievements.userId, userId)),
  ]);

  const ownedMap = new Map(owned.map((o) => [o.id, o]));

  /*
    HANGİ ROZETLER: kursun kataloğu + kazanılmış olup kursta olmayanlar.

    İki kurs çalışan biri Almancada `artikel300`ü aldı, sonra İngilizceye
    geçti. Rozet kazanılmış bir emek; silinmiyor ve duvardan da düşmüyor —
    açık haliyle kalıyor. Kazanılmamış olanlar ise yalnız kursta varsa
    görünüyor: İngilizce öğrenene kilitli bir artikel rozeti göstermek,
    ulaşamayacağı bir hedef göstermek olurdu. Kursta olmayan rozet de YENİ
    açılmıyor (ölçüsü o kursa ait); kurs değişince orada sayılıyor.

    Toplam (`total`) bu satırların sayısı: başka kursta kazanılmış rozet hem
    paya hem paydaya giriyor, yani kursunu bitiren yine %100'e ulaşıyor.
  */
  /*
    ULAŞILAMAYAN KURS ROZETİ GİZLİ (2026-09-29, Samet): `courses` ölçüsü
    (ör. "iki dil") için kullanıcının anadilinde seçilebilir en az o kadar
    kurs olmalı. Zürih Almancası duraklatılınca İngilizce ve Almanca anadilli
    kullanıcının tek kursu kaldı; rozet onlara kilitli bir hedef olarak
    görünüyordu. Kazanılmışsa yine görünür (emek silinmez).
  */
  const courseCount = selectableCourses(lang, course).length;
  const reachable = (def: AchievementDef) => def.metric !== "courses" || courseCount >= def.target;
  const rows: AchievementRow[] = ACHIEVEMENTS.filter((def) => (inCourse(def, course) && reachable(def)) || ownedMap.has(def.id)).map((def) => {
    const target = targetFor(def, course);
    const done = Math.min(target, metrics[def.metric] ?? 0);
    const earned = inCourse(def, course) && (metrics[def.metric] ?? 0) >= target;
    const rec = ownedMap.get(def.id);
    // `only` yalnız sunucunun kararı; API sözleşmesine girmiyor.
    const pub: AchievementDef = { ...def };
    delete pub.only;
    return {
      ...pub,
      target,
      title: translate(lang, def.titleKey),
      hint: translate(lang, def.hintKey),
      done,
      unlocked: earned || Boolean(rec),
      unlockedAt: rec ? new Date(rec.at).toISOString() : null,
    };
  });

  // Yeni hak edilenleri yaz. Tanımı bilinmeyen eski kayıtlar dokunulmadan
  // kalıyor: rozet listesinden bir madde çıkarılsa bile kimsenin kazandığı
  // silinmemeli.
  const missing = rows.filter((r) => r.unlocked && !ownedMap.has(r.id));
  if (missing.length) {
    const written = await db
      .insert(achievements)
      .values(missing.map((m) => ({ userId, achievementId: m.id })))
      .onConflictDoNothing({ target: [achievements.userId, achievements.achievementId] })
      .returning({ id: achievements.achievementId, at: achievements.unlockedAt });

    // Yazılan anı satırlara geri işle. Olmasaydı bir rozet, açıldığı ANDA
    // tarihsiz görünür ve ancak bir sonraki bakışta tarihi olurdu — yani
    // kutlama ekranı "Açıldı" der, ne zaman açıldığını söyleyemezdi.
    const stamps = new Map(written.map((w) => [w.id, new Date(w.at).toISOString()]));
    for (const r of rows) {
      const at = stamps.get(r.id);
      if (at) r.unlockedAt = at;
    }
    // Gerçekten bu istekte yazılanlar (yarışta kaybeden yazmadı) arkadaş akışına düşer.
    await onAchievementsUnlocked(
      userId,
      missing.filter((m) => stamps.has(m.id)).map((m) => ({ id: m.id, title: m.title, tier: m.tier })),
    );
  }

  // Kutlanmayı bekleyenler: yeni yazılanlar + daha önce yazılıp gösterilmemişler.
  const unseenIds = new Set([
    ...missing.map((m) => m.id),
    ...owned.filter((o) => !o.seen).map((o) => o.id),
  ]);
  const fresh = rows.filter((r) => unseenIds.has(r.id));

  return {
    rows,
    unlockedCount: rows.filter((r) => r.unlocked).length,
    total: rows.length,
    fresh,
  };
}

/** Kutlaması gösterilen rozetleri işaretler — ikinci kez patlamasın. */
export async function markAchievementsSeen(userId: string, ids: string[]) {
  const valid = ids.filter((id) => BY_ID.has(id));
  if (!valid.length) return;
  await db
    .update(achievements)
    .set({ seen: true })
    .where(and(eq(achievements.userId, userId), inArray(achievements.achievementId, valid)));
}

/**
 * Kazanılmış rozet kimlikleri — kazanılan aksesuarların kapısı
 * (`lib/avatar-unlocks`, `api/profile`).
 *
 * Tahtanın tamamı (`achievementBoard`) her ölçüyü yeniden hesaplıyor; burada
 * gereken tek şey "hangileri açık". Profil kaydında o hesabı yaptırmak,
 * avatar değiştirmeyi otuz sorguya bağlamak olurdu.
 *
 * Kursun KARŞILIK rozetleri de sayılıyor (`unlockKeysOf`): `cloze300`
 * kazanan, `artikel300`e bağlı parçayı da açmış olur. Kilit tablosu tek
 * anahtar taşıyor ve öyle kalıyor; "ya bu ya karşılığı" kararı burada.
 */
export async function unlockedAchievementIds(userId: string): Promise<Set<string>> {
  const rows = await db
    .select({ id: achievements.achievementId })
    .from(achievements)
    .where(eq(achievements.userId, userId));
  return new Set(rows.flatMap((r) => unlockKeysOf(r.id)));
}

/** Profil başlığındaki özet — tahtanın tamamını çekmeden. */
export async function achievementCount(userId: string): Promise<number> {
  const [row] = await db
    .select({ n: count() })
    .from(achievements)
    .where(eq(achievements.userId, userId));
  return Number(row?.n ?? 0);
}

/** En son açılan üç rozet — profil başlığında gösterilir. */
export async function recentAchievements(userId: string, limit = 3) {
  const rows = await db
    .select({ id: achievements.achievementId, at: achievements.unlockedAt })
    .from(achievements)
    .where(eq(achievements.userId, userId))
    .orderBy(desc(achievements.unlockedAt))
    .limit(limit);
  return rows.flatMap((r) => {
    const def = BY_ID.get(r.id);
    return def ? [{ ...def, unlockedAt: new Date(r.at).toISOString() }] : [];
  });
}
