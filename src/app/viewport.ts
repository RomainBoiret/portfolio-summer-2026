import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3ebe0" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1018" },
  ],
  colorScheme: "light dark",
};
