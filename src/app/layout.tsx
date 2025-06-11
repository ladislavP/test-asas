import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { LocationProvider } from "@/context/LocationContext";
import LocationBanner from "@/components/LocationBanner";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASAS Eshop - Sieť stavebnín",
  description: "Sieť stavebnín ASAS združuje predajcov stavebnín z celého Slovenska. Vytvárame sieť strategických partnerstiev pre váš úspech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={inter.className}>
        <LocationProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <LocationBanner />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <Toaster />
            </div>
          </CartProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
