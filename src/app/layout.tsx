import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import ChatBot from "@/components/chat/ChatBot";

export const metadata: Metadata = {
  title: "PAC Assist - Aide aux agriculteurs",
  description:
    "Application d'aide au remplissage des formulaires PAC pour les agriculteurs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          crossOrigin=""
        />
      </head>
      <body className="antialiased">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            {children}
          </main>
          <MobileNav />
          <ChatBot />
        </div>
      </body>
    </html>
  );
}
