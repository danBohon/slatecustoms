import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Danerd — Prebuilt Gaming PCs in Waukegan, IL",
    template: "%s | Danerd",
  },
  description:
    "Locally built and tested prebuilt gaming PCs serving Waukegan, Lake County, and the North Chicago suburbs.",
};

const themeInitScript = `(function(){try{var s=localStorage.getItem('danerd-theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <nav className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
          <a
            href="/"
            className="font-sans text-lg font-extrabold uppercase tracking-tight text-[var(--color-text-primary)]"
          >
            DANERD
          </a>
          <ThemeToggle />
        </nav>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
