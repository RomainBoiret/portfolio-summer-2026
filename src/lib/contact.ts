export type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

export type ContactValidationError =
  | "invalid_name"
  | "invalid_email"
  | "invalid_message";

export type ContactValidationResult =
  | { ok: true; honeypot: true }
  | {
      ok: true;
      honeypot: false;
      name: string;
      email: string;
      message: string;
    }
  | { ok: false; error: ContactValidationError };

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** Shared contact form validation used by the API route. */
export function validateContactPayload(
  body: ContactPayload,
): ContactValidationResult {
  // Bots fill hidden fields - treat as soft success upstream.
  if (body.website?.trim()) {
    return { ok: true, honeypot: true };
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (name.length < 2 || name.length > 80) {
    return { ok: false, error: "invalid_name" };
  }
  if (!emailOk(email) || email.length > 120) {
    return { ok: false, error: "invalid_email" };
  }
  if (message.length < 10 || message.length > 4000) {
    return { ok: false, error: "invalid_message" };
  }

  return { ok: true, honeypot: false, name, email, message };
}
