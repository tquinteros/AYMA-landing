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

const glacialIndifference = localFont({
  src: [
    {
      path: "../public/GlacialIndifference-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/GlacialIndifference-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/GlacialIndifference-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-glacialIndifference",
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
      className={cn("antialiased", glacialIndifference.variable, "font-sans")}
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
