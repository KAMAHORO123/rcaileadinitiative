import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "RCA ilead Initiative",
  description:
    "RCA ilead Initiative - Empowering Future Leaders in Rwanda through education, mentorship, and community development programs.",
  keywords:
    "RCA ilead, Rwanda, leadership, education, mentorship, community development, youth empowerment",
  authors: [{ name: "RCA ilead Initiative" }],
  creator: "RCA ilead Initiative",
  publisher: "RCA ilead Initiative",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.rcaileadinitiative.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RCA ilead Initiative",
    description:
      "Empowering Future Leaders in Rwanda through education, mentorship, and community development programs.",
    url: "https://www.rcaileadinitiative.com",
    siteName: "RCA ilead Initiative",
    images: [
      {
        url: "/og-image.jpg", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "RCA ilead Initiative",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RCA ilead Initiative",
    description:
      "Empowering Future Leaders in Rwanda through education, mentorship, and community development programs.",
    images: ["/og-image.jpg"], // Add your Twitter card image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo2.png",
    apple: "/apple-icon.png", // Add your Apple touch icon
  },
  verification: {
    google: "your-google-site-verification", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
