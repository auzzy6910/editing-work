import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { RouteProgress } from "@/components/ui/RouteProgress";

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
      <head>
        {/*
          devinapps/S3-style static hosts serve root index.html for any path
          without an exact file match. On first load of a deep link like
          /work or /work/berlin-thesis-quantum this would silently show the
          landing page. This tiny synchronous script redirects such loads to
          the corresponding generated .html file (Next.js `output: "export"`
          with trailingSlash:false produces /work.html, /about.html, etc.).
          After the initial redirect, internal navigation stays on clean URLs
          via Next's client-side router. The script returns early on files
          that already have an extension, so /work.html does not loop.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=location.pathname;if(p==="/"||/\\.[a-zA-Z0-9]+$/.test(p.replace(/\\/$/,"")))return;location.replace(p.replace(/\\/$/,"")+".html"+location.search+location.hash);})();`,
          }}
        />
      </head>
      <body className="bg-canvas text-ink font-sans antialiased">
        <ConvexClientProvider>
          <RouteProgress />
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
