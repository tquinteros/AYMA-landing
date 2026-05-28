import Image from "next/image"

const LongevityContent = () => {
  return (
    <div className="flex flex-col gap-10 bg-roca-500 px-5 py-12 sm:gap-12 sm:px-8 sm:py-16 lg:gap-12 lg:px-24 lg:py-25">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-wrap items-center gap-5 sm:gap-7">
            <Image
              src="/longevity/eralongevity.svg"
              alt="ERA Longevity"
              width={127}
              height={53}
              className="h-auto w-[88px] sm:w-[110px] lg:w-[127px]"
            />
            <span className="text-2xl text-surface-500 sm:text-3xl lg:text-[39px]">
              ×
            </span>
            <Image
              src="/longevity/aymalogo.svg"
              alt="AYMA"
              width={127}
              height={53}
              className="h-auto w-[88px] sm:w-[110px] lg:w-[127px]"
            />
          </div>
          <p className="max-w-2xl text-lg text-background-500 sm:text-xl lg:text-2xl">
            Medicina preventiva, wellness y longevidad en una misma experiencia.
          </p>
        </div>

        <div>
          <p className="text-base leading-relaxed text-background-500 sm:text-lg">
            AYMA junto a ERA Longevity desarrollan un programa integral diseñado
            para acompañar energía, recuperación, rendimiento y bienestar a
            largo plazo desde una mirada médica e interdisciplinaria.
            <br />
            <br />
            A través de medicina preventiva, diagnóstico avanzado y protocolos
            personalizados, el programa busca comprender el estado biológico de
            cada persona para optimizar salud antes de la aparición de síntomas
            o enfermedad.
            <br />
            <br />
            El enfoque integra: medicina de precisión, wellness, recovery,
            nutrición, hábitos y optimización biológica.
          </p>
        </div>
      </div>

      <Image
        className="h-auto w-full"
        src="/longevity/longevityseparator1.png"
        alt="Longevity separator"
        width={2000}
        height={1000}
      />

      <div className="flex flex-col gap-4 sm:gap-6">
        <h5 className="text-xl text-background-500 sm:text-2xl">
          ¿Cómo funciona?
        </h5>
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10 xl:gap-16">
          <p className="max-w-2xl text-base leading-relaxed text-background-500 sm:text-lg">
            El proceso comienza con una consulta integral de longevidad y una
            evaluación personalizada orientada a comprender: hábitos, estilo de
            vida, energía, recuperación, objetivos y estado general de salud.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-background-500 sm:text-lg">
            A partir de estudios diagnósticos avanzados, el equipo médico
            desarrolla un roadmap personalizado que puede incluir:
            suplementación, IV Drips, protocolos recovery, optimización
            nutricional y estrategias de wellness adaptadas a cada persona.
          </p>
        </div>
      </div>

      <Image
        className="h-[220px] w-full object-cover sm:h-[360px] md:h-[500px] lg:h-[714px]"
        src="/longevity/longevityseparator2.png"
        alt="Longevity experience"
        width={2000}
        height={1000}
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="flex flex-col gap-4 sm:gap-6">
          <span className="text-2xl text-surface-500 sm:text-3xl lg:text-[39px]">
            IV DRIPS
          </span>
          <p className="max-w-2xl text-lg text-background-500 sm:text-xl lg:text-2xl">
            Protocolos de sueroterapia diseñados para acompañar: hidratación,
            energía, recuperación, Inmunidad y bienestar general.
          </p>
        </div>

        <div>
          <p className="text-base leading-relaxed text-background-500 sm:text-lg">
            Cada protocolo es supervisado por especialistas y adaptado según
            objetivos, necesidades y perfil biológico individual.
            <br />
            <br />
            Una nueva forma de entender el bienestar.
            En Ayma creemos que vivir más no es suficiente. El verdadero
            objetivo es vivir mejor.
            <br />
            <br />
            Por eso integramos movimiento, recovery, medicina y hábitos dentro
            de un mismo ecosistema diseñado para acompañar bienestar,
            longevidad y calidad de vida de forma sostenible.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LongevityContent
