import type { Metadata } from "next";
import { Heebo, Playfair_Display } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "דוד דניאל — אמן חושים | הופעות, אירועים עסקיים ופרטיים",
  description:
    "דוד דניאל — אמן חושים מוביל בישראל. הופעות קריאת מחשבות לאירועים עסקיים, אירועים פרטיים ובמות. חווייה בלתי נשכחת שתשאיר את הקהל המום.",
  keywords: [
    "אמן חושים",
    "קריאת מחשבות",
    "דוד דניאל",
    "מנטליסט",
    "הופעות לאירועים עסקיים",
    "הופעות מיוחדות",
    "ישראל",
  ],
  openGraph: {
    title: "דוד דניאל — אמן חושים",
    description:
      "חוויית קריאת מחשבות בלתי נשכחת. אמן חושים מוביל בישראל לאירועים עסקיים, פרטיים ובמות.",
    url: "https://daviddaniel.com",
    siteName: "David Daniel",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "דוד דניאל — אמן חושים",
    description: "חוויית קריאת מחשבות בלתי נשכחת לאירועים עסקיים ופרטיים.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${playfair.variable}`}>
      <body className="antialiased font-[family-name:var(--font-heebo)]">
        <script dangerouslySetInnerHTML={{ __html: `window.history.scrollRestoration='manual';window.scrollTo(0,0);` }} />
        {children}
      </body>
    </html>
  );
}
