import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Notes App",
  description: "App para gerar anotações de forma colaborativa",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          <Header />
          <div className="flex min-h-screen overflow-x-hidden w-full relative">
            <Sidebar />
            <main className="flex-1 p-1 bg-white rounded overflow-y-auto">
              {children}
            </main>
          </div>
          <Footer />
          <Toaster position="bottom-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
