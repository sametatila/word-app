import { signUp } from "../src/lib/auth";

/**
 * MİSAFİR KAYDI YERİNDE YÜKSELTME UCUNA GİDİYOR (sunucu lib/auth/guest-upgrade).
 *
 * Kimlik aynı kalsın diye misafirin kaydı `/guest/upgrade`e gidiyor; uç henüz
 * yayında değilse (404) eski yola, yeni hesap + birleştirmeye düşülüyor.
 * Hesabı olmayan (misafir de olmayan) kullanıcı doğrudan kayıt ucuna.
 */
type Reply = { status: number; body: unknown };
function mockFetch(replies: Reply[]) {
  const urls: string[] = [];
  (globalThis as { fetch: unknown }).fetch = jest.fn(async (url: string) => {
    urls.push(url);
    const r = replies.shift() ?? { status: 500, body: {} };
    return { ok: r.status >= 200 && r.status < 300, status: r.status, text: async () => JSON.stringify(r.body) };
  });
  return urls;
}

test("misafirin kaydı yükseltme ucuna gider, yanıt kayıtla aynı okunur", async () => {
  const urls = mockFetch([{ status: 200, body: { token: null, user: { id: "g1", email: "a@b.test" } } }]);
  const r = await signUp("Ada", "a@b.test", "Uzun-Parola-123", null, true);
  expect(urls).toHaveLength(1);
  expect(urls[0]).toMatch(/\/api\/auth\/guest\/upgrade$/);
  expect(r).toMatchObject({ ok: true, session: false });
});

test("uç yoksa (404) eski kayıt yoluna düşer", async () => {
  const urls = mockFetch([{ status: 404, body: {} }, { status: 200, body: { token: "t", user: { id: "u1" } } }]);
  const r = await signUp("Ada", "a@b.test", "Uzun-Parola-123", null, true);
  expect(urls.map((u) => u.split("/api/auth/")[1])).toEqual(["guest/upgrade", "sign-up/email"]);
  expect(r).toMatchObject({ ok: true, session: true });
});

test("misafir olmayan kayıt doğrudan kayıt ucuna gider", async () => {
  const urls = mockFetch([{ status: 200, body: { token: "t", user: { id: "u1" } } }]);
  await signUp("Ada", "a@b.test", "Uzun-Parola-123", null);
  expect(urls[0]).toMatch(/\/api\/auth\/sign-up\/email$/);
});
