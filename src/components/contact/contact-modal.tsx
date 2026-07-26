"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/data/site";
import { useContact } from "@/components/contact/contact-context";
import { IconArrowRight, IconClose } from "@/components/ui/icons";
import { announceToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
type FieldName = "name" | "email" | "message";

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function ContactModal() {
  const { open, closeContact, copy } = useContact();
  const [mounted, setMounted] = React.useState(false);
  const [leaving, setLeaving] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorKey, setErrorKey] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<
    Partial<Record<FieldName, string>>
  >({});
  const firstFieldRef = React.useRef<HTMLInputElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const requestClose = React.useCallback(() => {
    if (leaving) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      closeContact();
      return;
    }
    setLeaving(true);
  }, [leaving, closeContact]);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (open) setLeaving(false);
  }, [open]);

  React.useEffect(() => {
    if (!leaving) return;
    const id = window.setTimeout(() => {
      closeContact();
      setLeaving(false);
    }, 320);
    return () => window.clearTimeout(id);
  }, [leaving, closeContact]);

  React.useLayoutEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrorKey(null);
    setFieldErrors({});

    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
      window.clearTimeout(t);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open || leaving) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, leaving, requestClose]);

  function validate(values: {
    name: string;
    email: string;
    message: string;
  }) {
    const next: Partial<Record<FieldName, string>> = {};
    if (values.name.trim().length < 2) next.name = copy.errorName;
    if (!emailOk(values.email.trim())) next.email = copy.errorEmail;
    if (values.message.trim().length < 10) next.message = copy.errorMessage;
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const localErrors = validate(payload);
    setFieldErrors(localErrors);
    if (Object.keys(localErrors).length > 0) {
      setStatus("idle");
      setErrorKey(null);
      requestAnimationFrame(() => {
        form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      });
      return;
    }

    setStatus("sending");
    setErrorKey(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setErrorKey(json.error ?? "send_failed");
        return;
      }

      setStatus("success");
      form.reset();
      setFieldErrors({});
      announceToast({
        title: copy.successTitle,
        description: copy.success,
        tone: "success",
      });
      requestClose();
    } catch {
      setStatus("error");
      setErrorKey("send_failed");
    }
  }

  if (!mounted || !open) return null;

  const errorMessage =
    errorKey === "not_configured"
      ? copy.errorNotConfigured
      : errorKey === "invalid_name"
        ? copy.errorName
        : errorKey === "invalid_email"
          ? copy.errorEmail
          : errorKey === "invalid_message"
            ? copy.errorMessage
            : copy.errorGeneric;

  return createPortal(
    <div
      className={cn("site-popup", leaving && "is-leaving")}
      role="presentation"
    >
      <button
        type="button"
        className="site-popup-backdrop"
        aria-label={copy.close}
        onClick={requestClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="site-popup-panel site-popup-panel--contact"
      >
        <div className="contact-modal-handle" aria-hidden>
          <span />
        </div>

        <div className="contact-modal-header">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-accent-text sm:text-[0.7rem]">
              {copy.eyebrow}
            </p>
            <h2
              id="contact-modal-title"
              className="mt-1.5 text-balance text-xl font-extrabold tracking-tight text-foreground sm:mt-2 sm:text-2xl sm:leading-[1.15]"
            >
              {copy.title}
            </h2>
            <p className="mt-2 text-pretty text-[0.875rem] leading-relaxed text-muted sm:mt-2.5 sm:text-[0.9375rem]">
              {copy.blurb}
            </p>
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="contact-close"
            aria-label={copy.close}
          >
            <span aria-hidden>
              <IconClose />
            </span>
          </button>
        </div>

        <div className="contact-modal-body">
          {status === "success" ? (
            <div className="space-y-5 sm:space-y-6">
              <div className="border border-border bg-background/55 px-4 py-4 sm:px-5 sm:py-5 rounded-[0.65rem]">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-accent-text">
                  {copy.eyebrow}
                </p>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground sm:mt-3 sm:text-lg">
                  {copy.success}
                </p>
              </div>
              <button
                type="button"
                className="btn-secondary w-full sm:w-auto"
                onClick={requestClose}
              >
                <span>{copy.close}</span>
              </button>
            </div>
          ) : (
            <form className="contact-modal-form" onSubmit={onSubmit} noValidate>
              <p className="text-[0.7rem] text-muted-foreground sm:text-[0.75rem]">
                {copy.requiredHint}{" "}
                <span className="text-accent-text" aria-hidden>
                  *
                </span>
              </p>

              <div
                className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
                aria-hidden
              >
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="contact-modal-fields">
                <Field
                  id="contact-name"
                  label={copy.name}
                  requiredLabel={copy.required}
                  error={fieldErrors.name}
                >
                  <input
                    ref={firstFieldRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={
                      fieldErrors.name ? "contact-name-error" : undefined
                    }
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    enterKeyHint="next"
                    placeholder={copy.namePlaceholder}
                    className={cn(
                      "contact-field",
                      fieldErrors.name && "contact-field-invalid",
                    )}
                    onChange={() =>
                      setFieldErrors((prev) => {
                        if (!prev.name) return prev;
                        const next = { ...prev };
                        delete next.name;
                        return next;
                      })
                    }
                  />
                </Field>

                <Field
                  id="contact-email"
                  label={copy.email}
                  requiredLabel={copy.required}
                  error={fieldErrors.email}
                >
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? "contact-email-error" : undefined
                    }
                    maxLength={120}
                    autoComplete="email"
                    enterKeyHint="next"
                    inputMode="email"
                    placeholder={copy.emailPlaceholder}
                    className={cn(
                      "contact-field",
                      fieldErrors.email && "contact-field-invalid",
                    )}
                    onChange={() =>
                      setFieldErrors((prev) => {
                        if (!prev.email) return prev;
                        const next = { ...prev };
                        delete next.email;
                        return next;
                      })
                    }
                  />
                </Field>
              </div>

              <Field
                id="contact-message"
                label={copy.message}
                requiredLabel={copy.required}
                error={fieldErrors.message}
              >
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={
                    fieldErrors.message ? "contact-message-error" : undefined
                  }
                  minLength={10}
                  maxLength={4000}
                  rows={4}
                  enterKeyHint="send"
                  placeholder={copy.messagePlaceholder}
                  className={cn(
                    "contact-field contact-field-message",
                    fieldErrors.message && "contact-field-invalid",
                  )}
                  onChange={() =>
                    setFieldErrors((prev) => {
                      if (!prev.message) return prev;
                      const next = { ...prev };
                      delete next.message;
                      return next;
                    })
                  }
                />
              </Field>

              {status === "error" ? (
                <p className="text-sm text-accent-rose" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <div className="contact-modal-actions">
                <button
                  type="submit"
                  className={cn(
                    "btn-primary w-full sm:w-auto",
                    status === "sending" && "opacity-70",
                  )}
                  disabled={status === "sending"}
                >
                  <span>
                    {status === "sending" ? copy.sending : copy.submit}
                  </span>
                  {status !== "sending" ? <IconArrowRight /> : null}
                </button>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="contact-modal-fallback"
                >
                  {copy.mailtoFallback}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  id,
  label,
  requiredLabel,
  error,
  children,
}: {
  id: string;
  label: string;
  requiredLabel: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label
        htmlFor={id}
        className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-[0.75rem]"
      >
        {label}
        <span className="ml-1 text-accent-text" aria-hidden>
          *
        </span>
        <span className="sr-only">({requiredLabel})</span>
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="text-[0.8125rem] text-accent-rose"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
