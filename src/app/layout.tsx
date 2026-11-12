import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { profile } from "@/lib/data";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const jetbrains = localFont({
  src: "./fonts/JetBrainsMono.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.title}`,
  description: profile.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
