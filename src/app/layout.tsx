
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import ConditionalFooter from "@/components/shared/conditional-footer";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConnectHope | Connecting People, Creating Hope",
  description:
    "Join community events, support meaningful causes, and create positive change with ConnectHope.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col">
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>

            <main className="w-full flex-1">
              {children}
            </main>

            <Suspense fallback={null}>
              <ConditionalFooter />
            </Suspense>
          </div>

          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
