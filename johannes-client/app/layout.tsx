import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section } from "@/types";
import { Lora, Inter} from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Johannes Waldorfförskolor",
  description: "Välkommen till Johannes Waldorfförskolor i Stockholm",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await fetch('http://localhost:5058/api/section', {
    cache: 'no-store'
  });
  const sections = await response.json();

  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable}  ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header sections={sections}/>
        {children}
        <ScrollToTop/>
        <Footer/>
      </body>
      
    </html>
  );
}
