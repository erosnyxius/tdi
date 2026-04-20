import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";
import { ScrollTracker } from "@/components/ScrollTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thedataisland.com"),
  title: {
    default: "The Data Island (TDI) | Enterprise AI & Automation",
    template: "%s | The Data Island",
  },
  description: "TDI builds exclusively for production deployment, delivering enterprise-grade AI automation, workflow orchestration, and scalable solutions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Data Island (TDI) | Enterprise AI & Automation",
    description: "TDI builds exclusively for production deployment, delivering enterprise-grade AI automation, workflow orchestration, and scalable solutions.",
    url: "https://thedataisland.com",
    siteName: "The Data Island",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TDI - Enterprise AI & Automation" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Data Island (TDI)",
    description: "TDI builds exclusively for production deployment, delivering enterprise-grade AI automation, workflow orchestration, and scalable solutions.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-textDark bg-black overflow-x-hidden">
        {/* Google Tag Manager (noscript fallback if needed) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        
        {/* Local Scroll Tracker */}
        <ScrollTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "The Data Island",
                "alternateName": "TDI",
                "url": "https://thedataisland.com",
                "logo": "https://thedataisland.com/TDI_logo_Black.svg",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "connect@thedataisland.com",
                  "telephone": "+880171100000",
                  "contactType": "sales",
                  "areaServed": ["SG", "BD"],
                  "availableLanguage": "en"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Enterprise AI Automation",
                "provider": {
                  "@type": "Organization",
                  "name": "The Data Island"
                }
              }
            ])
          }}
        />
        <Navbar />
        {children}
        <FooterWrapper />

        {/* Global Google Tag Manager Script Definition */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
