import type { AvatarConfig } from "@/lib/avatar-config";
import { EXTRA_SLOTS } from "@/lib/avatar-config";

/**
 * KAZANILAN AKSESUARLAR — kilidin TEK tanımı (2026-09-28).
 *
 * Nomi 3B kataloğunda 147 parça var; sıradanlar (ve eski 2B parçalar) herkese
 * açık, gerisi öğrenerek kazanılıyor. Samet'in kararı: kazanım yolları
 * BAŞARIM, SERİ, LİG ve ARKADAŞ DAVETİ; Premium'a ayrılmış küçük bir set.
 * Yeni para birimi, bakiye ya da mağaza yok: her parça bir koşula bağlı ve
 * koşul sağlandığı an açık.
 *
 * TABLO YALNIZ SUNUCUDA. Eskiden aynı eşleme iki istemcide kopyaydı ve
 * `check:parity` ikisini karşılaştırıyordu; kilit sayısı 1'den 104'e çıkınca
 * kopya hem ağırlaştı hem de her ipucu metni üç dilde iki kez yazılacaktı.
 * Artık düzenleyici `/api/avatar/items`ten "bu kullanıcı için kilitli parçalar
 * ve nasıl açılacakları"nı (kullanıcının dilinde) alıyor; kapı da yine burada
 * (`api/profile` kaydederken eliyor). İstemcide duran bir kilit kilit değildir.
 *
 * KOŞUL ANAHTARLARI
 *   <rozet kimliği>   `lib/achievements` › ACHIEVEMENTS (seri ve davet de rozet)
 *   league_1..4       o lige (gümüş, altın, safir, elmas) en az bir kez çıkmış olmak
 *   league_win        kapanmış bir haftayı grubunda birinci bitirmek
 *   premium           Premium üyelik sürerken (bitince set kullanılamaz)
 *
 * NEDEN REDDETMİYOR, DÜŞÜRÜYOR. `parseAvatar` bilinmeyen parça kimliğini
 * atıyor ama kaydı reddetmiyor (gerekçe: `lib/avatar-config`): eski bir
 * cihazdan gelen kayıt yüzünden avatarın TAMAMININ kaybolması, o parçanın
 * çizilmemesinden kötü. Kilitli parça da aynı kuralla eleniyor.
 *
 * Tabloda olmayan parça açıktır. Tablodaki her anahtarın gerçek bir rozet ya
 * da yukarıdaki özel anahtarlardan biri olduğunu `check:avatar-unlocks`
 * doğruluyor; kataloğun sıradan olmayan her parçasının burada olduğunu da.
 */
export const PART_UNLOCKS: Record<string, string> = {
  // seri
  handlebar: "streak3", propeller: "streak3",
  tophat: "streak7", heart: "streak7",
  bg_sunburst: "streak30", lightning: "streak30",
  viking: "streak100", jetpack: "streak100",
  flamecrown: "streak365", dragonwings: "streak365",
  // kelime
  bookhat: "words50", halfmoon: "words50",
  grad: "words250", nerd: "words250",
  bulb: "words1000", laurel: "words1000",
  angelwings: "words3000",
  // oyunlar
  pixel: "answers500", lollipop: "answers500",
  headphones: "answers2500", boa: "answers2500",
  steampunk: "answers10000",
  deerstalker: "artikel300", glasses3d: "listen200", captain: "typing200", mushroom: "order150",
  fangs: "plural150", walrus: "speak100", starsticker: "speak500", sombrero: "translate200",
  jester: "allGames",
  // dil bilgisi
  fedora: "grammar5", bowler: "grammar12", monocle: "grammar25",
  // konuşmalar
  dali: "conversation1", cowboy: "conversation10", medal: "conversation50", bg_aurora: "conversation100",
  pirate: "boss1", eyepatch: "boss1", heromask: "boss10",
  // sınavlar
  ruff: "exam1", safari: "exam10", goldchain: "exam90",
  // beceriler
  chullo: "skill1", guitar: "skill10", fairy: "skill40",
  fumanchu: "writing1", pearls: "writing15", locket: "writing85", feather: "speaking25",
  // turlar
  ski: "challenge500", swim: "challenge1500", warpaint: "challenge3000",
  // davet (davet edilen kişi üç günlük seriye ulaşınca sayılıyor)
  party: "invite1", lei: "invite1",
  butterfly: "invite3", heartcheeks: "invite3",
  goldheart: "invite10", heartdangle: "invite10",
  // keşif
  bg_night: "night50", bg_sunrise: "early50", unicorn: "marathon150",
  bg_forest: "days30", bg_ocean: "days30", tiara: "days100",
  wizard: "bilingual", earcuff: "quests20",
  // lig
  fez: "league_1", studs: "league_1", santa: "league_1", aviator: "league_1",
  ushanka: "league_2", bg_candy: "league_2", witch: "league_2", star: "league_2",
  devil: "league_3", cape: "league_3", bunnyears: "league_3", flower: "league_3",
  emperor: "league_4", astronaut: "league_4", halo: "league_4",
  crown: "league_win",
  // kalan nadir parçalar: ilk rozetlere yayıldı (her rozet bir-üç parça)
  beard: "conversation1", ginger: "skill1", bg_confetti: "exam1",
  clownnose: "answers500", stethoscope: "exam10", pearldrop: "writing15", hibiscus: "streak7",
  boater: "streak3",
  // Premium seti (üyelik sürerken)
  galaxywizard: "premium", cybervisor: "premium", diamondshades: "premium", goldstache: "premium",
  diamondnecklace: "premium", facegems: "premium", neonlines: "premium", phoenix: "premium",
  bg_galaxy: "premium", bg_goldrays: "premium", emeralddrop: "premium", icecrown: "premium",
};

/** Özel (rozet olmayan) koşul anahtarları. */
export const SPECIAL_UNLOCK_KEYS = ["league_1", "league_2", "league_3", "league_4", "league_win", "premium"] as const;

/** Parça bu kullanıcı için açık mı: koşulu yok, koşulu sağlanmış ya da parça ona ayrıca verilmiş. */
export function partOpen(id: string, keys: ReadonlySet<string>, owned: ReadonlySet<string>): boolean {
  const k = PART_UNLOCKS[id];
  return !k || keys.has(k) || owned.has(id);
}

/**
 * Kazanılmamış parçaları bütün yuvalardan düşürür (şapka, gözlük, bıyık,
 * arka plan, boyun, yüz, küpe, sırt).
 *
 * `keys` kullanıcının sağladığı koşul anahtarları (rozetler + lig + premium),
 * `owned` ona ayrıca verilmiş parçalar (`avatar_items`: kampanya, etkinlik).
 */
export function stripLockedParts(cfg: AvatarConfig, keys: ReadonlySet<string>, owned: ReadonlySet<string> = new Set()): AvatarConfig {
  const ele = (id: string | null): string | null => (id && !partOpen(id, keys, owned) ? null : id);
  const extra: AvatarConfig["extra"] = {};
  for (const s of EXTRA_SLOTS) {
    const e = cfg.extra[s];
    if (e && partOpen(e.id, keys, owned)) extra[s] = e;
  }
  return { ...cfg, hat: ele(cfg.hat), glasses: ele(cfg.glasses), mustache: ele(cfg.mustache), bg: ele(cfg.bg), extra };
}
