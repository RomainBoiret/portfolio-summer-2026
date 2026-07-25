import { describe, expect, it } from "vitest";
import { validateContactPayload } from "@/lib/contact";

describe("validateContactPayload", () => {
  const valid = {
    name: "Romain",
    email: "romain@example.com",
    message: "Hello there, I would like to chat.",
  };

  it("accepts a valid payload", () => {
    expect(validateContactPayload(valid)).toEqual({
      ok: true,
      honeypot: false,
      name: "Romain",
      email: "romain@example.com",
      message: "Hello there, I would like to chat.",
    });
  });

  it("trims whitespace", () => {
    const result = validateContactPayload({
      name: "  Ada  ",
      email: "  ada@example.com ",
      message: "  Enough characters here.  ",
    });
    expect(result).toMatchObject({
      ok: true,
      honeypot: false,
      name: "Ada",
      email: "ada@example.com",
      message: "Enough characters here.",
    });
  });

  it("flags honeypot submissions as soft success", () => {
    expect(
      validateContactPayload({
        ...valid,
        website: "https://spam.example",
      }),
    ).toEqual({ ok: true, honeypot: true });
  });

  it("treats missing fields as empty", () => {
    expect(
      validateContactPayload({
        name: undefined,
        email: undefined,
        message: undefined,
      }),
    ).toEqual({ ok: false, error: "invalid_name" });
  });

  it("rejects short names", () => {
    expect(validateContactPayload({ ...valid, name: "A" })).toEqual({
      ok: false,
      error: "invalid_name",
    });
  });

  it("rejects invalid emails", () => {
    expect(validateContactPayload({ ...valid, email: "not-an-email" })).toEqual(
      {
        ok: false,
        error: "invalid_email",
      },
    );
  });

  it("rejects short messages", () => {
    expect(validateContactPayload({ ...valid, message: "Hi" })).toEqual({
      ok: false,
      error: "invalid_message",
    });
  });

  it("rejects oversized fields", () => {
    expect(
      validateContactPayload({ ...valid, name: "x".repeat(81) }),
    ).toEqual({ ok: false, error: "invalid_name" });
    expect(
      validateContactPayload({
        ...valid,
        email: `${"a".repeat(110)}@example.com`,
      }),
    ).toEqual({ ok: false, error: "invalid_email" });
    expect(
      validateContactPayload({ ...valid, message: "x".repeat(4001) }),
    ).toEqual({ ok: false, error: "invalid_message" });
  });
});
