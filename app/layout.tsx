import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Header from "@/components/Header";
import localFont from "next/font/local"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "AYMA",
  description: "AYMA",
}

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", satoshi.variable, "font-sans")}
    >
      <body>
        <ThemeProvider defaultTheme="light">
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
