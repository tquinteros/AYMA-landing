import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const ServicesCta = () => {
  return (
    <section className="relative min-h-[280px] h-auto sm:min-h-[320px] lg:h-[425px] overflow-hidden">
      <Image
        src="/services/servicescta.png"
        alt=""
        fill
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[425px] flex-col gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:justify-between lg:px-24 lg:py-[84px]">
        <h2 className="max-w-6xl text-left text-2xl uppercase leading-tight text-background-500 sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
          EL CAMBIO REAL NACE DE LOS HÁBITOS QUE UNA PERSONA LOGRA{" "}
          <em className="font-medium italic">SOSTENER EN EL TIEMPO</em>.
        </h2>

        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
          <Button
            asChild
            className="bg-primary-500 text-[14px] font-normal w-full shrink-0 tracking-[6px] uppercase text-base px-7 py-6 text-background-500 hover:bg-primary-500/90! sm:w-fit sm:py-7 lg:w-fit"
          >
            <Link href="/memberships">Ver Membresías</Link>
          </Button>

          <Image
            src="/future/integration.svg"
            alt="Integración"
            width={64}
            height={64}
            className="h-auto w-[52px] shrink-0 sm:w-[64px]"
          />
        </div>
      </div>
    </section>
  )
}

export default ServicesCta
