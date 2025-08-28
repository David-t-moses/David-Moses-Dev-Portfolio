import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "David Moses | Full Stack Web Developer & Software Engineer",
    template: "%s | David Moses - Web Developer",
  },
  description:
    "Professional Full Stack Web Developer specializing in React, Next.js, TypeScript, and modern web technologies. Creating innovative digital solutions that drive business growth and exceptional user experiences.",
  keywords: [
    "David Moses",
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Python Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Design",
    "Responsive Web Design",
    "Web Applications",
    "Software Solutions",
    "Portfolio",
    "Freelance Developer",
  ],
  authors: [{ name: "David Moses", url: "https://david-moses.vercel.app" }],
  creator: "David Moses",
  publisher: "David Moses",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://david-moses.vercel.app"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://david-moses.vercel.app", // Replace with your actual domain
    title: "David Moses | Full Stack Web Developer & Software Engineer",
    description:
      "Professional Full Stack Web Developer creating innovative digital solutions with React, Next.js, and modern web technologies.",
    siteName: "David Moses Portfolio",
    images: [
      {
        url: "/logo-2.png", // You'll need to create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "David Moses - Full Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Moses | Full Stack Web Developer",
    description:
      "Professional Full Stack Web Developer creating innovative digital solutions with React, Next.js, and modern web technologies.",
    images: ["/logo-2.png"], // Same image as OpenGraph
    creator: "@David_t_moses", // Replace with your actual Twitter handle
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
    icon: [
      { url: "/logo-2.png", sizes: "16x16", type: "image/png" },
      { url: "/logo-2.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/logo-2.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/logo-2.png",
        color: "#3b82f6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-slate-950">
      <head>
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ✅ Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-SMFC74910G"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SMFC74910G', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-inter antialiased h-screen w-full overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
