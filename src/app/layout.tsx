import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Robert Editing — Before I touch it, it's a draft.",
  description:
    "The quiet editor behind loud ideas. Documents edited in 47 countries. See the before/after.",
  metadataBase: new URL("https://robertediting.example"),
  openGraph: {
    title: "Robert Editing",
    description:
      "Before I touch it, it's a draft. After I touch it, it's the version people remember.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-canvas text-ink font-sans antialiased">
        <ConvexClientProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
