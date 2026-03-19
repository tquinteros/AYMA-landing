"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const Header = () => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero")

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolledPastHero(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (hero) observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  const navTextColor = scrolledPastHero ? "text-black" : "text-white"

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolledPastHero
        ? "bg-background backdrop-blur-md shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="flex h-[80px] items-center justify-between px-5 sm:px-8 lg:px-24">
        <a href="#hero" className="flex items-center gap-3">
          <Image
            src="/header-logo-image.svg"
            alt="AYMA"
            width={100}
            height={100}
            className={`w-12 h-12 transition-all duration-300 ${scrolledPastHero ? "invert" : ""
              }`}
          />
          <Image
            src="/header-logo-text.svg"
            alt="AYMAText"
            width={250}
            height={250}
            className={`w-48 sm:w-56 md:w-64 transition-all duration-300 ${scrolledPastHero ? "invert" : ""
              }`}
          />
        </a>

        <nav className={`hidden md:flex items-center gap-10 ${navTextColor}`}>
          <a href="#hero" className="text-lg hover:opacity-75 duration-300 transition-all">Home</a>
          <a href="#services" className="text-lg hover:opacity-75 duration-300 transition-all">Servicios</a>
          <a href="#memberships" className="text-lg hover:opacity-75 duration-300 transition-all">Membresías</a>
        </nav>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${navTextColor} hover:bg-white/10`}
                aria-label="Abrir menú"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background-500">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <div className="flex flex-col gap-4 p-6 mt-8">
                <a
                  href="#hero"
                  className="text-lg font-medium hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="text-lg font-medium hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Servicios
                </a>
                <a
                  href="#memberships"
                  className="text-lg font-medium hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Membresías
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header