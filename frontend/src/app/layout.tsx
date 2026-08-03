import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileNav } from "@/components/organisms/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kitchen Waste Tracker",
  description: "Sistema inteligente de gestão de desperdício e custos",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased pb-20 md:pb-6 md:pt-16 transition-colors duration-300`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}