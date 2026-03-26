"use client"

import { Button } from "../ui/button"

const CTA = () => {
  const handleScrollToMemberships = () => {
    document.getElementById("memberships")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-roca-500 h-[80vh] min-h-[520px] sm:min-h-[560px]"
    >
      <div className="relative z-10 flex flex-col h-full px-6 sm:px-8 lg:px-24 py-10">
        <div className="flex-1 flex flex-col items-start justify-center min-h-0 w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lg:leading-20 text-left uppercase text-surface-500 max-w-5xl">
            Donde comienza la <br className="hidden sm:block" /> revolución del{" "}
            <em className="italic">bienestar</em>.
          </h2>
        </div>

        <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 pb-16 shrink-0">
          <p className="text-left text-base sm:text-lg md:text-xl text-surface-500 max-w-xl lg:max-w-3xl sm:pr-4">
            Creamos un espacio donde dejás de dividirte en partes - cuerpo, mente, alma - y empezás a habitarte por completo. <br className="hidden sm:block" />
            No es solo wellness. Es la práctica de estar presente mientras te
            transformás.
          </p>
          <Button
            className="bg-primary-500 w-full lg:w-fit shrink-0 tracking-[5px] uppercase text-base px-7 py-6 sm:py-7 hover:bg-primary-500/90 text-background-500 self-start sm:self-auto"
            onClick={handleScrollToMemberships}
          >
            Ver Membresías
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTA
