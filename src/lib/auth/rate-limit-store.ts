import "server-only";
import Redis from "ioredis";

/**
 * Hız sınırı sayacı — ÜÇ INSTANCE'TA ORTAK.
 *
 * Sorun ölçüldü: Better Auth'un varsayılan sayacı BELLEKTE ve nginx istekleri
 * üç Node instance'ına round-robin dağıtıyor. Yani `/sign-in/email` için
 * yazılan "dakikada 5" fiilen "dakikada ~15" oluyordu — sayı yapılandırmada
 * doğru görünüyor, üretimde tutmuyordu.
 *
 * NEDEN `secondaryStorage` DEĞİL. Better Auth'a genel bir ikincil depo
 * verildiğinde OTURUMLAR da oraya taşınıyor (db/internal-adapter.mjs: depo
 * varken oturum satırı veritabanına yazılmıyor). Bizim istediğimiz yalnız
 * sayacı paylaştırmak; oturumların Postgres'te kalması gerekiyor — kalıcılık,
 * `session` tablosuna bakan işletim sorguları ve parola sıfırlamada oturum
 * düşürme hep oraya bağlı. `rateLimit.customStorage` tam bu ayrımı veriyor:
 * yalnız sayaç Redis'e gidiyor, başka hiçbir şey değişmiyor.
 *
 * NEDEN `storage: "database"` DEĞİL. O da ortak sayaç verirdi ama her auth
 * isteğine bir okuma + bir yazma ekler ve her yazma WAL demek. Sayaç kısa
 * ömürlü ve saf sayısal bir şey; Redis'in `INCR`i tam bu iş için var ve
 * sunucuda Redis zaten çalışıyor.
 *
 * SAYMA BİÇİMİ: `INCR` + ilk artışta `EXPIRE` — sabit pencere. Better Auth'un
 * kendi bellek deposu kayan pencere kullanıyor, bu ondan biraz daha gevşek
 * (pencere sınırında iki katına kadar istek geçebilir). Kabul edilebilir:
 * sert sınır zaten nginx'te (limit_req + fail2ban) ve buradaki iş, sayının
 * instance sayısına bölünmesini durdurmak.
 */

/** Redis anahtarları paylaşımlı bir sunucuda: kendi ad alanımızda kalsınlar. */
const PREFIX = "lernomi:ratelimit:";

/** Bağlantı tembel kurulur; modül yüklenmesi Redis'e bağlı olmamalı. */
let client: Redis | null = null;
function redis(url: string): Redis {
  if (!client) {
    client = new Redis(url, {
      lazyConnect: true,
      // Sayaç isteği kullanıcının GİRİŞ İSTEĞİNİN önünde duruyor: Redis
      // yanıt vermiyorsa orada beklemek girişi bekletmek demek. Tek deneme,
      // kısa zaman aşımı, kuyruk yok — hata hemen dönsün ve aşağıdaki
      // "açığa düş" dalı çalışsın.
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      connectTimeout: 500,
      commandTimeout: 500,
    });
    // Bağlantı hatası bir istisna olarak yayılmasın; her komut zaten kendi
    // try/catch'inde. Dinleyici olmazsa ioredis 'error'ı fırlatır.
    client.on("error", () => { /* aşağıdaki catch'ler karşılıyor */ });
  }
  return client;
}

type Rule = { window: number; max: number };
type Decision = { allowed: boolean; retryAfter: number | null };

/**
 * `rateLimit.customStorage` için depo. `REDIS_URL` boşsa `undefined` döner ve
 * Better Auth kendi bellek deposunda kalır — geliştirmede Redis şartı yok.
 */
export function redisRateLimitStorage(): { consume: (key: string, rule: Rule) => Promise<Decision> } | undefined {
  const url = process.env.REDIS_URL;
  if (!url) return undefined;

  return {
    async consume(key: string, rule: Rule): Promise<Decision> {
      const k = PREFIX + key;
      try {
        const r = redis(url);
        const count = await r.incr(k);
        // Pencereyi YALNIZ ilk artışta kur; sonrakiler kurarsa pencere
        // her istekte ileri kayar ve sınır hiç dolmaz.
        if (count === 1) await r.expire(k, rule.window);
        if (count <= rule.max) return { allowed: true, retryAfter: null };
        const ttl = await r.ttl(k);
        return { allowed: false, retryAfter: ttl > 0 ? ttl : rule.window };
      } catch {
        /*
          REDIS ERİŞİLEMİYORSA AÇIĞA DÜŞÜLÜR (isteğe izin verilir).
          Kapalıya düşmek daha "güvenli" görünüyor ama sonucu şu: Redis'in
          kısa bir kesintisi BÜTÜN girişleri durdurur — yani bir kullanılabilirlik
          arızası, kendi kendine bir hizmet dışı bırakma saldırısına dönüşür.
          Açığa düşünce kaybedilen şey ise yalnız bu katman: nginx'in
          IP başına 10r/dk sınırı ve fail2ban yerinde duruyor.
        */
        return { allowed: true, retryAfter: null };
      }
    },
  };
}
