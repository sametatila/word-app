import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/server";

/**
 * Tarayıcıda tamamlanan girişi UYGULAMAYA devreder.
 *
 * NEREDEN GELİYOR. Android'de Apple'ın native yolu yok; giriş sistem
 * tarayıcısında yapılıyor ve better-auth oturum çerezini oraya yazıyor.
 * Uygulamanın çerez kavanozu ayrı, dolayısıyla kullanıcı tarayıcıda girmiş
 * ama uygulamada hâlâ misafir oluyor. Bu uç aradaki köprü: tarayıcıdaki
 * oturumdan kısa ömürlü, TEK KULLANIMLIK bir token üretip uygulamanın
 * yakalayacağı adrese yönlendiriyor.
 *
 * NEDEN AYRI BİR ADIM. Sosyal girişin `callbackURL`i doğrudan uygulamanın
 * adresine gösterilseydi uygulama oraya oturumsuz düşerdi: elinde bir şey
 * olmazdı. Token ancak oturum kurulduktan SONRA üretilebiliyor.
 *
 * TOKEN ÜRETİMİ SUNUCUDAN. Eklenti `disableClientRequest: true` ile kurulu,
 * yani tarayıcıdan bir fetch ile token istenemiyor; yalnız buradaki sunucu
 * çağrısı geçiyor. Ömrü 3 dakika ve bir kez kullanılıyor.
 *
 * OTURUM YOKSA `/login`e. Buraya oturumsuz düşmenin tek yolu iptal edilmiş
 * ya da başarısız bir akış; kullanıcıya boş bir sayfa göstermek yerine
 * girişe geri alıyoruz.
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session) return NextResponse.redirect(new URL("/login", req.url));
  // Tarayıcıdaki bir misafir oturumu uygulamaya devredilmez: bu yol yalnız
  // tarayıcıda tamamlanan Apple girişini taşımak için var.
  if ((session.user as { isAnonymous?: boolean | null }).isAnonymous) return NextResponse.redirect(new URL("/login", req.url));

  let token: string;
  try {
    ({ token } = await auth.api.generateOneTimeToken({ headers: h }));
  } catch (err) {
    console.error("[auth/handoff] generateOneTimeToken", err);
    // Token üretilemese de kullanıcı TARAYICIDA giriş yapmış durumda; onu
    // uygulamaya yollayamıyoruz ama web'de devam edebilir.
    return NextResponse.redirect(new URL("/learn", req.url));
  }

  const to = new URL("/auth/app", req.url);
  to.searchParams.set("ott", token);
  /*
    Bağlama değeri (bkz. api/handoff-nonce) olduğu gibi geçiyor; uygulama
    yalnız kendi sakladığı değerle gelen devri kabul ediyor. Biçimi dar
    tutuluyor ki adrese başka bir şey taşınamasın. Eski sürümler değer
    göndermiyor, onlarda devir eskisi gibi çalışıyor.
  */
  const n = new URL(req.url).searchParams.get("n");
  if (n && /^[A-Za-z0-9_-]{16,128}$/.test(n)) to.searchParams.set("n", n);
  return NextResponse.redirect(to);
}
