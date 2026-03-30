"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

const Header = () => {
  const pathname = usePathname()
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

  const navTextColor = scrolledPastHero ? "text-background-500" : "text-background-900"

  const logoSrc = scrolledPastHero ? "/header-new-pass.svg" : "/header-new.svg"

  if (pathname.startsWith("/admin")) return null

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolledPastHero
        ? "bg-roca-500 backdrop-blur-md shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="flex h-[64px] items-center justify-between px-5 sm:px-8 lg:px-24">
        <a href="#hero" className="flex items-center">
          <Image
            key={logoSrc}
            src={logoSrc}
            alt="AYMA"
            width={126}
            height={36}
            className="h-8 w-auto sm:h-9 md:h-9 transition-opacity duration-300"
          />
        </a>

        <nav className={`hidden md:flex items-center ${navTextColor} uppercase`}>
          <a href="#hero" className="text-[14px] hover:opacity-75 duration-300 font-thin transition-all tracking-[6px]">Home</a>
          <span className="mx-5 select-none" aria-hidden>|</span>
          <a href="#services" className="text-[14px] hover:opacity-75 duration-300 transition-all font-thin tracking-[6px]">Servicios</a>
          <span className="mx-5 select-none" aria-hidden>|</span>
          <a href="#memberships" className="text-[14px] hover:opacity-75 duration-300 transition-all font-thin tracking-[6px]">Membresías</a>
          <span className="mx-5 select-none" aria-hidden>|</span>
          <Link href="/admin" className="text-[14px] hover:opacity-75 duration-300 transition-all font-thin tracking-[6px]">Admin</Link>
          <span className="mx-5 select-none" aria-hidden>|</span>
          <a href="https://wa.me/5491162632894" target="_blank" className="text-[14px] hover:opacity-75 duration-300 font-thin tracking-[6px] transition-all">Contacto</a>
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
            <SheetContent side="right" className="bg-surface-500">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <div className="flex flex-col gap-10 py-24 px-12 mt-8">
                <a
                  href="#hero"
                  className="text-lg font-light uppercase tracking-[4px] text-roca-500 hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="text-lg font-light uppercase tracking-[4px] text-roca-500 hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Servicios
                </a>
                <a
                  href="#memberships"
                  className="text-lg font-light uppercase tracking-[4px] text-roca-500 hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Membresías
                </a>
                <a
                  href="https://wa.me/5491162632894"
                  target="_blank"
                  className="text-lg font-light uppercase tracking-[4px] text-roca-500 hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
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