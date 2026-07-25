import { afterEach, describe, expect, it, vi } from "vitest";

describe("POST /api/contact", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("returns 400 for invalid json", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: "{",
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "invalid_json" });
  });

  it("returns 400 for invalid fields", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "R",
          email: "bad",
          message: "short",
        }),
      }),
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/invalid_/);
  });

  it("returns ok for honeypot bots without calling Resend", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Bot",
          email: "bot@example.com",
          message: "This is long enough.",
          website: "https://spam.test",
        }),
      }),
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 503 when Resend is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Romain",
          email: "romain@example.com",
          message: "Hello there, I would like to chat.",
        }),
      }),
    );
    expect(res.status).toBe(503);
    await expect(res.json()).resolves.toEqual({ error: "not_configured" });
  });

  it("sends mail through Resend when configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "to@example.com");
    vi.stubEnv(
      "CONTACT_FROM_EMAIL",
      "Portfolio <from@example.com>",
    );
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "",
    });
    vi.stubGlobal("fetch", fetchMock);

    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Romain",
          email: "romain@example.com",
          message: "Hello there, I would like to chat.",
        }),
      }),
    );

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({
      Authorization: "Bearer re_test",
    });
    const payload = JSON.parse(String(init.body));
    expect(payload.to).toEqual(["to@example.com"]);
    expect(payload.reply_to).toBe("romain@example.com");
  });
});
