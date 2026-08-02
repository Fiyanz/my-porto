import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import KittyTerminal from "@/components/KittyTerminal";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-white text-gray-900 overflow-hidden`}>
        <div id="app-shell" className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <main id="main-content" className="flex-1 bg-gray-50 p-6 overflow-y-auto">
            <Topbar />
            {children}
            <KittyTerminal />
          </main>
        </div>
      </body>
    </html>
  );
}
