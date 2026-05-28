"use client"
import Image from "next/image"

const HeroServices = () => {
  return (
    <section
      id="hero-services"
      className="relative h-svh overflow-hidden"
    >
      <Image
        src="/membershipbg.png"
        alt="Membership background"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="text-[64px] text-surface-500">SERVICIOS</h1>
      </div>

      {/* <div className="relative z-10 flex h-full items-center text-white">
        <div className="w-full flex flex-col gap-12 sm:gap-16 lg:gap-28 px-5 sm:px-8 lg:px-24">
          <div className="flex items-center">
            <div className="flex flex-col gap-8 sm:gap-10 w-full">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                <h2 className="text-4xl sm:text-5xl lg:text-7xl tracking-wide text-center lg:text-left leading-tight">
                  Donde comienza la revolución <br className="hidden sm:block" /> del bienestar.
                </h2>
                <div className="hidden lg:block">
                  <Image src="/herofloating.svg" alt="Hero Floating" width={64} height={64} />
                </div>
              </div>
              <Button
                className="w-fit px-8 sm:px-10 h-12 sm:h-14 bg-roca-500 text-base sm:text-lg hover:bg-roca-500/80 rounded-lg mx-auto lg:mx-0"
                size="lg"
                onClick={handleScrollToMemberships}
              >
                Ver membresías
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center flex-col lg:flex-row gap-6 lg:gap-0">
            <p className="text-base sm:text-lg max-w-md text-center lg:text-left">
              AYMA es un refugio que busca el equilibrio entre la serenidad de la naturaleza y la vanguardia en el cuidado personal.
            </p>
            <p className="text-base sm:text-lg text-center lg:text-left max-w-md">
              Somos un centro a pocos minutos de la ciudad, un espacio diseñado para que puedas pausar el ritmo acelerado y reconectar con tu esencia.
            </p>
          </div>
        </div>
      </div> */}
    </section>
  )
}

export default HeroServices