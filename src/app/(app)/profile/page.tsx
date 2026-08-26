import Link from "next/link";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { Avatar } from "@/components/avatar";
import { ProfileMenu } from "@/components/profile-menu";
import { ArrowLeftIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

/**
 * Profil: kimlik ve bir menü. Başka hiçbir şey.
 *
 * Buraya on üç bölüm birikmişti; ölçümler Becerilere ve Kelimelere taşındıktan
 * sonra üçe indi ama hâlâ kalabalıktı — çünkü asıl sorun sayı değil YAPIydı.
 * Katlanmış bir "Arşiv" başlığı altında rozetlerle yazıları birleştirmek,
 * ortak yanları olmayan iki şeyi kimsenin aramadığı bir kutuya koymaktı:
 * insan "arşivime bakayım" diye düşünmüyor, "rozetlerime bakayım" diye
 * düşünüyor.
 *
 * Menü bunu doğal biçimde çözüyor: her satır tek satır, her satır bir yere
 * gidiyor. Ayarlar da artık bir bölüm değil bir sayfa — sesi kapatmak isteyen
 * biri profilin tamamını geçmek zorunda değil.
 */
export default async function ProfilePage() {
  const user = await getUserInfo();
  if (!user) return null;

  try {
    const profile = await ensureProfile(user.id, user.name);
    const name = profile.displayName || user.name || "Öğrenci";

    return (
      <div className="mx-auto w-full max-w-3xl space-y-5">
        {/*
          Geri düğmesi: profil alt sekmelerden çıktı ve başlıktaki avatardan
          açılıyor. Çubukta karşılığı olmayan bir ekrana girip cihazın kendi
          geri hareketini bilmeyen kullanıcı burada sıkışırdı.
        */}
        <div className="flex items-center gap-3">
          <Link
            href="/learn"
            prefetch={false}
            aria-label="Öğren ekranına dön"
            className="chip flex h-10 w-10 shrink-0 items-center justify-center"
          >
            <ArrowLeftIcon size={18} />
          </Link>
          {/* Arma sıralamadakiyle AYNI: kullanıcı kendini tabloda tanıyabilmeli. */}
          <Avatar userId={user.id} name={name} size={52} />
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold">{name}</h1>
            <p className="muted truncate text-sm">
              {profile.totalXp.toLocaleString("tr-TR")} XP · {profile.currentStreak} günlük seri
              {profile.longestStreak > profile.currentStreak
                ? ` (en uzun ${profile.longestStreak})`
                : ""}
            </p>
          </div>
        </div>

        <ProfileMenu />
      </div>
    );
  } catch (err) {
    console.error("[profile page]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">Profil yüklenemedi</h2>
        <p className="muted mt-2 text-sm">
          Veritabanı bağlantısını kontrol et: <code>npm run db:push</code>.
        </p>
      </div>
    );
  }
}
