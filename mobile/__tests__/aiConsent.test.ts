import { api, fetchWithTimeout, setAiConsentHandler, ApiError, AI_CONSENT_DECLINED } from "../src/api/client";
import { assessFailure, fallbackNoteKey } from "../src/lib/assessFail";
import { registerAiConsentHost, requestAiConsent } from "../src/lib/aiConsent";

/**
 * YAPAY ZEKÂ RIZASI: YAKALAYICI.
 *
 * Sunucu izin yoksa `403 ai_consent_required` döndürüyor ve metni sağlayıcıya
 * iletmiyor. İstemcinin sözü üç parça ve üçü de sessizce bozulabilir:
 *
 *   - onay gelirse AYNI istek bir kez yeniden gider (ikinci kez sormadan),
 *   - "declined" durumunda ekran KENDİLİĞİNDEN açılmaz (her çağrıda yeniden
 *     sormak rızayı yıpratarak koparmak olurdu),
 *   - vazgeçilince çağıran `AI_CONSENT_DECLINED` görür ve yedeğine düşer;
 *     "servis kapalı" diyen arıza cümlesiyle karışmaz.
 */
type Reply = { status: number; body: unknown };

function mockFetch(replies: Reply[]) {
  const calls: { url: string; body?: unknown }[] = [];
  (globalThis as { fetch: unknown }).fetch = jest.fn(async (url: string, init?: { body?: unknown }) => {
    calls.push({ url, body: init?.body });
    const r = replies.shift() ?? { status: 500, body: { error: "unexpected" } };
    const text = JSON.stringify(r.body);
    return {
      ok: r.status >= 200 && r.status < 300,
      status: r.status,
      text: async () => text,
      json: async () => r.body,
      clone() { return { json: async () => r.body }; },
    };
  });
  return calls;
}

const required = (state: "unset" | "declined" | "outdated") => ({ status: 403, body: { error: "ai_consent_required", purpose: "ai_text", state, current: 1 } });

afterEach(() => setAiConsentHandler(null));

describe("api() rıza yakalayıcısı", () => {
  it("onay gelirse istek bir kez yeniden gider ve sonucu döner", async () => {
    const calls = mockFetch([required("unset"), { status: 200, body: { result: 42 } }]);
    const handler = jest.fn(async () => true);
    setAiConsentHandler(handler);
    const r = await api<{ result: number }>("/api/assess", { method: "POST", body: JSON.stringify({ a: 1 }) });
    expect(r.result).toBe(42);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(calls).toHaveLength(2);
    expect(calls[1].body).toBe(calls[0].body);
  });

  it("onay gelmezse AI_CONSENT_DECLINED atılır", async () => {
    mockFetch([required("unset")]);
    setAiConsentHandler(async () => false);
    await expect(api("/api/assess", { method: "POST", body: "{}" })).rejects.toMatchObject({ status: 403, message: AI_CONSENT_DECLINED });
  });

  it("'declined' durumunda ekran açılmaz", async () => {
    mockFetch([required("declined")]);
    const handler = jest.fn(async () => true);
    setAiConsentHandler(handler);
    await expect(api("/api/assess", { method: "POST", body: "{}" })).rejects.toMatchObject({ message: AI_CONSENT_DECLINED });
    expect(handler).not.toHaveBeenCalled();
  });

  it("yeniden denemede tekrar 403 gelirse döngüye girmez", async () => {
    const calls = mockFetch([required("outdated"), required("outdated")]);
    const handler = jest.fn(async () => true);
    setAiConsentHandler(handler);
    await expect(api("/api/assess", { method: "POST", body: "{}" })).rejects.toBeInstanceOf(ApiError);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(calls).toHaveLength(2);
  });

  it("rıza dışındaki 403 (premium) olduğu gibi kalır", async () => {
    mockFetch([{ status: 403, body: { error: "premium_required" } }]);
    const handler = jest.fn(async () => true);
    setAiConsentHandler(handler);
    await expect(api("/api/assess", { method: "POST", body: "{}" })).rejects.toMatchObject({ message: "premium_required" });
    expect(handler).not.toHaveBeenCalled();
  });
});

describe("fetchWithTimeout() rıza yakalayıcısı", () => {
  it("rol yapma akışı da onaydan sonra yeniden gider", async () => {
    const calls = mockFetch([required("unset"), { status: 200, body: "Hallo!" }]);
    setAiConsentHandler(async () => true);
    const res = await fetchWithTimeout("https://www.lernomi.app/api/roleplay", { method: "POST", body: "{}" });
    expect(res.status).toBe(200);
    expect(calls).toHaveLength(2);
  });
});

describe("yedek cümlesi", () => {
  it("izin reddi 'servis kapalı' demez", () => {
    const e = new ApiError(403, AI_CONSENT_DECLINED);
    expect(assessFailure(e)).toBe("consent");
    expect(fallbackNoteKey(e, "estimate", "assess.fail_offline")).toBe("assess.estimate_only");
    expect(fallbackNoteKey(new ApiError(503, "upstream"), "estimate", "assess.fail_offline")).toBe("assess.fail_offline");
  });
});

describe("izin ekranı sırası", () => {
  it("aynı amaç tek ekran görür, farklı amaç öncekinin bitmesini bekler", async () => {
    const opened: string[] = [];
    const answers: ((granted: boolean) => void)[] = [];
    registerAiConsentHost((purpose) => new Promise<boolean>((resolve) => {
      opened.push(purpose);
      answers.push(resolve);
    }));
    try {
      const a = requestAiConsent("ai_text");
      const b = requestAiConsent("ai_text");
      const c = requestAiConsent("ai_voice");
      await Promise.resolve();
      await Promise.resolve();
      expect(opened).toEqual(["ai_text"]); // ses sorusu açık olanı kapatmadı
      answers[0](true);
      expect(await a).toBe(true);
      expect(await b).toBe(true);
      await new Promise((r) => setTimeout(r, 0));
      expect(opened).toEqual(["ai_text", "ai_voice"]);
      answers[1](false);
      expect(await c).toBe(false);
    } finally {
      registerAiConsentHost(null);
    }
  });
});
