import type { Metadata } from "next";
import { themeInitScript } from "@/lib/theme-script";
import { consoleEggScript } from "@/lib/console-egg-script";
import { siteConfig } from "@/data/site";
import { defaultLocale } from "@/i18n/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Portfolio`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "Portfolio of Romain Boiret - software engineering student at ÉTS Montréal. Projects, games, and web apps.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    description:
      "Portfolio of Romain Boiret - software engineering student at ÉTS Montréal. Projects, games, and web apps.",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Portfolio of Romain Boiret - software engineering student at ÉTS Montréal. Projects, games, and web apps.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export { viewport } from "./viewport";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning className="h-full">
      <body
        className="flex min-h-full flex-col bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=location.pathname.match(/^\\/(en|fr)(\\/|$)/);if(m){document.documentElement.lang=m[1];try{if(document.cookie.indexOf("locale=")===-1)document.cookie="locale="+m[1]+";path=/;max-age=31536000;samesite=lax"}catch(e){}}})();${themeInitScript};${consoleEggScript}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
