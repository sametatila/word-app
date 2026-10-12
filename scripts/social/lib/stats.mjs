/*
  İSTATİSTİK GEÇMİŞİ (stüdyo Genel bakış, 2026-10-12). `social_posts.metrics` yalnız SON değeri tutuyor; büyüme
  (günlük kazanılan izlenme, ilk 24 saat, takipçi değişimi) için her işçi eşitlemeden sonra bunu çağırır:
    - social_post_snapshots: metriği değişen gönderinin o anki metrikleri. İlk 7 gün en çok saatte bir, sonra
      günde bir (90 günde gönderi başına ~250 satır).
    - social_account_days: platformun takipçi sayısı, Berlin günü başına bir satır (gün içinde son değer).
  Hata işçiyi düşürmez (yayın ve eşitleme asıl iş), yalnız günlüğe yazılır.
*/

/** @param {(text: string, params?: unknown[]) => Promise<{ rowCount: number }>} q */
export async function recordStats(q, platform, followers, log = console.log) {
  try {
    const r = await q(
      `insert into social_post_snapshots (post_id, platform, metrics, at)
       select p.id, p.platform, p.metrics, now() from social_posts p
        where p.platform = $1 and p.metrics is not null and p.metrics_at is not null
          and not exists (
            select 1 from social_post_snapshots s where s.post_id = p.id
               and (s.at >= p.metrics_at
                    or s.at > now() - case when coalesce(p.published_at, now()) > now() - interval '7 days' then interval '50 minutes' else interval '23 hours' end))`,
      [platform],
    );
    if (typeof followers === "number" && Number.isFinite(followers)) {
      await q(
        `insert into social_account_days (platform, day, followers, at) values ($1, (now() at time zone 'Europe/Berlin')::date, $2, now())
         on conflict (platform, day) do update set followers = excluded.followers, at = excluded.at`,
        [platform, followers],
      );
    }
    if (r.rowCount) log(`istatistik: ${r.rowCount} anlık görüntü`);
  } catch (e) {
    log("istatistik yazılamadı:", e.message);
  }
}
