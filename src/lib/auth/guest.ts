import "server-only";
import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/auth/server";

/**
 * MİSAFİR KİMLİĞİ — hesap isteyen özelliklerin kapısı (mağaza ön inceleme B24).
 *
 * Mobil uygulama hesapsız kullanılabiliyor: "Hesapsız devam et" sunucuda
 * e-postasız, adsız bir kullanıcı açıyor (better-auth `anonymous`, bkz.
 * lib/auth/server). Öğrenme uçları o oturumla bugünkü gibi çalışıyor. Dört alan
 * ise HESAP istiyor ve misafire `403 account_required` dönüyor:
 *
 *   SOSYAL      Arkadaşlık, lig, sıralama, profil, tepki. Misafirin görünen adı
 *               ve ulaşılabilir bir sahibi yok; başkalarının listesinde adsız
 *               oyuncu olarak görünmemeli.
 *   YAPAY ZEKÂ  Değerlendirme, konuşma, sunucuda ses tanıma, telaffuz ve rıza
 *               defteri. Misafir kimliği saniyeler içinde ve ücretsiz açılıyor;
 *               sağlayıcı maliyeti hesap açma sınırının arkasında kalmalı.
 *               Misafir kural tabanlı değerlendirme ve senaryolu konuşmayla
 *               devam ediyor.
 *   SATIN ALMA  Promosyon kodu ve davet. Premium iPhone, iPad, Android ve web'de
 *               aynı hesapla çalışan bir abonelik; hesapsız bir hak başka
 *               cihazda geri yüklenemez. Mağaza satın alması istemcide
 *               kapalı: RevenueCat misafirde hesap kimliğiyle eşlenmiyor.
 *   BİLDİRİM    Hatırlatma tercihleri ve cihaz jetonu.
 *
 * Kod `account_required` İNGİLİZCE ve makine okunur: istemci onu "hesap
 * oluştur" kartına çeviriyor (mobil `accountRequired`).
 */
export const ACCOUNT_REQUIRED = "account_required" as const;

export function accountRequired(): NextResponse {
  return NextResponse.json({ error: ACCOUNT_REQUIRED }, { status: 403 });
}

/**
 * Hesap isteyen uçların oturum kapısı: girişsiz 401 `unauthorized` (bugünkü
 * cevap), misafir 403 `account_required`, gerçek hesapta kullanıcı kimliği.
 */
export async function requireAccount(): Promise<string | NextResponse> {
  const who = await getUserInfo();
  if (!who) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (who.guest) return accountRequired();
  return who.id;
}

/* Oturum okunmayan yerler (kancalar, sıralamalar, cron) için: lib/auth/guest-user. */
