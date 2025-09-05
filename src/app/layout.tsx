import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Providers from "@/store/Providers";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "ClientTrack CRM",
  description: "A demo CRM built with Next.js and Redux Toolkit. Manage clients and products with ease.",
};


// RootLayout is a Server Component
// but we use Providers (Client Component) to inject Redux
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="flex h-full">
        {/* Redux Provider */}
        <Providers>
          <ToastProvider>
            {/* Sidebar */}
            <Sidebar />
            {/* Main content */}
            <div className="flex flex-col flex-1">
              <Header />
              <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
            </div>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
