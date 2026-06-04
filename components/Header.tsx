"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { getSessionAction } from "@/lib/actions/auth"

const SCROLL_THRESHOLD = 8

const Header = () => {
  const pathname = usePathname()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { data: isAuthenticated } = useQuery<boolean>({
    queryKey: ["session"],
    queryFn: getSessionAction,
  })
  const hasSession = Boolean(isAuthenticated)

  useEffect(() => {
    const updateScroll = () => {
      setHasScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    updateScroll()
    window.addEventListener("scroll", updateScroll, { passive: true })
    return () => window.removeEventListener("scroll", updateScroll)
  }, [pathname])

  const navTextColor = hasScrolled ? "text-background-500" : "text-background-900"

  const logoSrc = hasScrolled ? "/header-new-pass.svg" : "/header-new.svg"

  if (pathname.startsWith("/admin")) return null

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${hasScrolled
        ? "bg-roca-500 backdrop-blur-md shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="flex h-[64px] items-center justify-between px-5 sm:px-8 lg:px-24">
        <Link href="/" className="flex items-center">
          <Image
            key={logoSrc}
            src={logoSrc}
            alt="AYMA"
            width={126}
            height={36}
            className="h-8 w-auto sm:h-9 md:h-9 transition-opacity duration-300"
          />
        </Link>

        <nav className={`hidden md:flex items-center ${navTextColor} uppercase`}>
          {/* <a href="#hero" className="text-[14px] hover:opacity-75 duration-300 font-thin transition-all tracking-[6px]">Home</a> */}
          <Link href="/" className="text-[14px] hover:opacity-75 duration-300 font-thin transition-all tracking-[6px]">Home</Link>
          <span className="mx-5 select-none" aria-hidden>|</span>
          {/* <a href="#services" className="text-[14px] hover:opacity-75 duration-300 transition-all font-thin tracking-[6px]">Servicios</a> */}
          <Link href="/services" className="text-[14px] hover:opacity-75 duration-300 transition-all font-thin tracking-[6px]" onClick={() => setIsOpen(false)}>Servicios</Link>
          <span className="mx-5 select-none" aria-hidden>|</span>
          <Link href="/longevity" className="text-[14px] hover:opacity-75 duration-300 transition-all font-thin tracking-[6px]" onClick={() => setIsOpen(false)}>Longevidad</Link>
          <span className="mx-5 select-none" aria-hidden>|</span>
          {/* <a href="#memberships" className="text-[14px] hover:opacity-75 duration-300 transition-all font-thin tracking-[6px]">Membresías</a> */}
          <Link href="/memberships" className="text-[14px] hover:opacity-75 duration-300 transition-all font-thin tracking-[6px]" onClick={() => setIsOpen(false)}>Membresías</Link>
          <span className="mx-5 select-none" aria-hidden>|</span>
          {/* <a href="https://wa.me/5491124868493" target="_blank" className="text-[14px] hover:opacity-75 duration-300 font-thin tracking-[6px] transition-all">Contacto</a> */}
          <Link href="/contact" className="text-[14px] hover:opacity-75 duration-300 transition-all font-thin tracking-[6px]" onClick={() => setIsOpen(false)}>Contacto</Link>

          {hasSession && (
            <>
              <span className="mx-5 select-none" aria-hidden>|</span>
              <Link href="/admin/memberships" className="text-[14px] hover:opacity-75 duration-300 font-thin tracking-[6px] transition-all">
                Admin
              </Link>
            </>
          )}
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
            <SheetContent side="right" className="bg-roca-500">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <div className="flex flex-col gap-10 py-24 px-12 mt-8">
                <Link
                  href="/"
                  className="text-lg font-light uppercase tracking-[4px] text-background-500 hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link href="/services" className="text-lg font-light uppercase tracking-[4px] text-background-500 hover:opacity-75 transition-opacity" onClick={() => setIsOpen(false)}>Servicios</Link>
                <Link href="/longevity" className="text-lg font-light uppercase tracking-[4px] text-background-500 hover:opacity-75 transition-opacity" onClick={() => setIsOpen(false)}>Longevidad</Link>
                {/* <a
                  href="#services"
                  className="text-lg font-light uppercase tracking-[4px] text-background-500 hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Servicios
                </a> */}
                <Link
                  href="/memberships"
                  className="text-lg font-light uppercase tracking-[4px] text-background-500 hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Membresías
                </Link>
                {/* <a
                  href="https://wa.me/5491124868493"
                  target="_blank"
                  className="text-lg font-light uppercase tracking-[4px] text-background-500 hover:opacity-75 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
                </a> */}
                <Link href="/contact" className="text-lg font-light uppercase tracking-[4px] text-background-500 hover:opacity-75 transition-opacity" onClick={() => setIsOpen(false)}>Contacto</Link>
                {hasSession && (
                  <Link
                    href="/admin/memberships"
                    className="text-lg font-light uppercase tracking-[4px] text-background-500 hover:opacity-75 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
