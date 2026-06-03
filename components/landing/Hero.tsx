import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-[calc(100svh-124px)] overflow-hidden"
    >
      <Image
        src="/hero-image.png"
        alt="AYMA wellness space"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover object-[center_70%]"
      />

      <div className="absolute inset-0 bg-black/60 lg:bg-black/40" />

      <div className="relative z-10 flex h-full items-center px-5 sm:px-8 lg:px-24">
        <div className="flex w-full flex-col gap-12 lg:gap-16">
          <h1 className="text-4xl lg:text-7xl uppercase leading-tight text-surface-500">
            DONDE COMIENZA LA
            <br />
            REVOLUCIÓN DEL <span className="font-medium italic">BIENESTAR</span>.
          </h1>

          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-lg lg:text-2xl text-surface-500">
              Dentro de una ciudad pensada para vivir mejor, nace AYMA: un espacio creado para ordenar, sostener y potenciar el bienestar de las personas de manera real y consciente.
            </p>

            <Button
              asChild
              size="lg"
              className="h-12 shrink-0 px-8 sm:h-14 font-regular sm:px-10 rounded-lg bg-primary-500 text-base uppercase tracking-[7px] text-background-500 hover:bg-primary-500/90! sm:text-[14px]"
            >
              <Link href="/memberships">Ver membresías</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
