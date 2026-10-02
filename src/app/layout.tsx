import type { Metadata } from "next";
import { Manrope, Noto_Nastaliq_Urdu } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import { SiteDataProvider } from "@/components/site-data-provider";
import { getPublicSiteSnapshot } from "@/lib/site-cms";
import "./globals.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VISION 2040 — Agriculture Community Survey Pakistan",
  description: "Share your experience to help shape a stronger, fairer, and more sustainable agricultural future for Pakistan.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  let initialSite = null;
  try {
    initialSite = await getPublicSiteSnapshot();
  } catch (error) {
    console.error("Public site content could not be loaded for the initial render", error);
  }

  return (
    <html lang="en" className={`${manrope.variable} ${notoNastaliqUrdu.variable} h-full antialiased`}>
      <body className="min-h-full"><SiteDataProvider initialSite={initialSite}><LanguageProvider>{children}</LanguageProvider></SiteDataProvider></body>
    </html>
  );
}
