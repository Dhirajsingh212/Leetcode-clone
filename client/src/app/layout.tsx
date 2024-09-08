import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "@/providers/ThemeProviders";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProviders attribute="class" defaultTheme="system">
          <Toaster
            richColors
            position="top-center"
            expand
            visibleToasts={1}
            offset="15px"
          />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
