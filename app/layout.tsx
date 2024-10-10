import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "David Moses - Portfolio",
  description:
    "Welcome to my developer portfolio! I'm David, I specialize in creating innovative web and software solutions using modern technologies like JavaScript, Python, and React.js. Explore my projects, skills, and experience in front-end, back-end, and full-stack development.",
  keywords:
    "David, David-Moses, David_Moses, Dave, Dave_codes, Web Developer, Software Developer, Front-end Developer, Back-end Developer, Full-stack Developer, JavaScript Developer, Python Developer, React.js Developer, HTML/CSS Expert, Freelance Developer, Portfolio Projects, Coding Portfolio, Responsive Design, App Development, UI/UX Design, Open Source Contributor",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-slate-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-full overflow-x-hidden `}
      >
        {children}
      </body>
    </html>
  );
}
