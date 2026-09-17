import "server-only";
import { attachReferral, userIdByReferralCode, type AttachResult } from "@/lib/premium/referral";
import { sendRequest } from "@/lib/social/friends";

/**
 * Davet bağlantısının YAPTIĞI ŞEY — tek yerde.
 *
 * İki eylem art arda geliyor ve ikisi de gerekli:
 *   1. BAĞ: kim kimi getirdi (`referrals` satırı).
 *   2. İSTEK: davet edilenden davetçiye arkadaşlık isteği.
 *
 * İkisi neden ayrı katmanda: bağ bir OLGU (davet zinciri, ölçüm, rozet),
 * arkadaşlık ise bir İLİŞKİ ve kullanıcının onayına tabi. `premium/referral`
 * sosyal katmanı içe aktarsaydı bağın kurulması isteğin gitmesine bağımlı
 * olurdu — biri patlayınca öteki de kaybolurdu. Burada sıra açık: önce bağ,
 * sonra istek; istek patlarsa bağ yerinde kalıyor.
 *
 * İSTEĞİ DAVET EDİLEN GÖNDERİYOR, davetçi değil. Yön önemli: davetçi kendi
 * bağlantısını paylaşarak zaten niyetini belli etmiş, ama davet edilenin
 * gizlilik ayarına (`allowRequests`) karşı taraftan istek dayatılmamalı. Bu
 * yönde `sendRequest` DAVETÇİNİN ayarına bakıyor — kapalıysa istek gitmiyor ve
 * bu doğru davranış: kim istek alacağına o karar verir.
 *
 * İSTEK SESSİZCE DÜŞEBİLİR ve bu bir hata değil: davetçi istekleri kapatmış
 * olabilir, taraflar birbirini engellemiş olabilir, hız sınırı dolmuş olabilir.
 * Sonuç ayrı bir durumla (`linked`) bildiriliyor ki kullanıcıya "istek
 * gönderildi" diye yanlış bir şey söylenmesin.
 */

/**
 * `ok` — bağ kuruldu VE arkadaşlık isteği gitti (ya da karşı taraf zaten
 * isteği açıkta bırakmış olduğu için doğrudan arkadaş olundu).
 * `linked` — bağ kuruldu ama istek gönderilemedi.
 */
export type ReferralLinkResult = AttachResult | "linked";

export async function applyReferralLink(inviteeUserId: string, code: string): Promise<ReferralLinkResult> {
  const attached = await attachReferral(inviteeUserId, code);
  if (attached !== "ok") return attached;

  const inviter = await userIdByReferralCode(code);
  if (!inviter) return "linked";

  try {
    await sendRequest(inviteeUserId, inviter);
    return "ok";
  } catch {
    /* `SocialError` türleri: requests_closed, not_found (engel/misafir),
       declined_recent, rate_limited. Hiçbiri kullanıcının düzeltebileceği bir
       şey değil ve hiçbiri bağı geçersiz kılmıyor. */
    return "linked";
  }
}
