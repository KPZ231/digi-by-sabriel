import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from './../components/ui/Navbar';
import AnnouncementBar from '@/components/ui/AnnouncementBar';
import Footer from '@/components/ui/Footer';

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digi by Sabriel — Cyfrowe Grafiki Scrapbooking | Kartki na Każdą Okazję",
  description: "Odkryj ponad 300 wyjątkowych cyfrowych grafik do scrapbookingu. Kartki urodzinowe, ślubne, baby shower i świąteczne w jakości 300 DPI. Pobierz natychmiast po zakupie.",
  keywords: ["scrapbooking", "cyfrowe kartki", "grafiki do druku", "kartki okolicznościowe", "digital downloads", "kartki urodzinowe", "kartki ślubne", "baby shower grafiki", "Digi by Sabriel"],
  authors: [{ name: "Digi by Sabriel" }],
  creator: "Digi by Sabriel",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://digibysabriel.pl",
    siteName: "Digi by Sabriel",
    title: "Digi by Sabriel — Cyfrowe Grafiki Scrapbooking",
    description: "Ponad 300 wyjątkowych cyfrowych grafik do scrapbookingu. Pobierz natychmiast po zakupie.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digi by Sabriel — Cyfrowe Grafiki Scrapbooking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digi by Sabriel — Cyfrowe Grafiki Scrapbooking",
    description: "Ponad 300 wyjątkowych cyfrowych grafik do scrapbookingu.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${playfairDisplay.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://digibysabriel.pl/#organization",
                  "name": "Digi by Sabriel",
                  "url": "https://digibysabriel.pl",
                  "description": "Sklep z cyfrowymi grafikami do scrapbookingu",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://digibysabriel.pl/logo.png"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://digibysabriel.pl/#website",
                  "url": "https://digibysabriel.pl",
                  "name": "Digi by Sabriel",
                  "publisher": { "@id": "https://digibysabriel.pl/#organization" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://digibysabriel.pl/products?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
