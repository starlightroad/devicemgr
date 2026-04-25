import type { Metadata } from "next";

import { Geist } from "next/font/google";

import "./globals.css";

import { Toast } from "@heroui/react";

import { ThemeProvider } from "@wrksz/themes/next";

import { cn } from "@/lib/utils";

import { APP_DESC, APP_NAME } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toast.Provider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
