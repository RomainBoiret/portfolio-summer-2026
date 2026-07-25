"use client";

import * as React from "react";
import type { ContactFormCopy } from "@/i18n/chrome";

type ContactContextValue = {
  open: boolean;
  openContact: () => void;
  closeContact: () => void;
  copy: ContactFormCopy;
};

const ContactContext = React.createContext<ContactContextValue | null>(null);

export function ContactProvider({
  copy,
  children,
}: {
  copy: ContactFormCopy;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const value = React.useMemo<ContactContextValue>(
    () => ({
      open,
      openContact: () => setOpen(true),
      closeContact: () => setOpen(false),
      copy,
    }),
    [open, copy],
  );

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = React.useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContact must be used within ContactProvider");
  }
  return ctx;
}
