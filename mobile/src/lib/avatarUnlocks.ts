/**
 * KAZANILAN AKSESUARLAR — sunucu ve iki istemcinin ORTAK tanımı.
 *
 * Aksesuarların tamamı bugüne kadar herkese açıktı; kilit diye bir kavram
 * yoktu. Davetin elle tutulur bir karşılığı olsun diye açıldı: rozet
 * kazanıldığında bir aksesuar da geliyor.
 *
 * KİLİDİ SUNUCU DAYATIYOR, BU DOSYA DEĞİL. Burası yalnız düzenleme ekranının
 * neyi gri çizeceğini biliyor; kaydı `api/profile` eliyor. İstemcide duran
 * bir kilit kilit değildir.
 *
 * NEDEN REDDETMİYOR, DÜŞÜRÜYOR. `parseAvatar` bilinmeyen parça kimliğini
 * atıyor ama kaydı reddetmiyor (gerekçe: `lib/avatar`): eski bir
 * cihazdan gelen bir kayıt yüzünden avatarın TAMAMININ kaybolması, o parçanın
 * çizilmemesinden kötü. Kilitli parça da aynı kuralla eleniyor — kullanıcı
 * şapkasını kaybetmiyor, yalnız hak etmediği parça düşüyor.
 *
 * Web kopyası `src/lib/avatar-unlocks.ts` ve `check:parity` ikisini
 * karşılaştırıyor: eşleme ayrışırsa bir platformda kilitli olan ötekinde açık
 * kalır.
 */

/** Parça kimliği → onu açan rozet (`lib/achievements` `ACHIEVEMENTS` id'si). */
export const PART_UNLOCKS: Record<string, string> = {
  /* Parti şapkası: davet ettiğin ilk kişi üç günlük seriye ulaşınca.
     Ödül, davet SAYISINA değil davet edilenin KALMASINA bağlı — rozetin
     kendisiyle aynı ölçü. */
  party: "invite1",
};

/** Parça kilitli mi (herkese açık olanlar için `false`). */
export function isLockedPart(id: string | null | undefined): boolean {
  return !!id && id in PART_UNLOCKS;
}

/**
 * Kullanıcının açtığı rozetlere göre kilitli parçaları düşürür.
 *
 * `unlocked` kazanılmış rozet kimlikleri. Parça kilitli değilse dokunulmuyor;
 * kilitliyse ancak açan rozet varsa kalıyor.
 */
export function stripLockedParts<T extends { hat: string | null; glasses: string | null; mustache: string | null }>(
  cfg: T,
  unlocked: ReadonlySet<string>,
): T {
  const ele = (id: string | null): string | null => {
    if (!id) return id;
    const rozet = PART_UNLOCKS[id];
    return !rozet || unlocked.has(rozet) ? id : null;
  };
  return { ...cfg, hat: ele(cfg.hat), glasses: ele(cfg.glasses), mustache: ele(cfg.mustache) };
}
