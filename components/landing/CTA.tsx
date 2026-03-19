"use client"
import Image from 'next/image'
import { Button } from '../ui/button'

const CTA = () => {


  const handleScrollToMemberships = () => {
    document.getElementById("memberships")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id='cta' className='relative overflow-hidden bg-background-500 h-[75vh] min-h-[520px] sm:min-h-[560px]'>

      <Image
        src="/ctashape.svg"
        alt=""
        width={2000}
        height={2000}
        className="
          pointer-events-none
          absolute
          left-1/2
          -translate-x-1/2
          -top-[18vh] sm:-top-[22vh]
          w-[84vw] sm:w-[84vw] lg:w-[84vw]
          max-w-none
          opacity-80
        "
        priority
        unoptimized
      />

      <div className='relative z-10 flex flex-col h-full px-6 sm:px-8 lg:px-24 py-10'>
        <div className='flex-1 flex flex-col items-center justify-center gap-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl text-center italic text-primary-500'>
            Donde comienza la revolución del bienestar.
          </h2>

          <p className='text-base sm:text-lg md:text-2xl text-center max-w-4xl mx-auto text-primary-500'>
            Más que un lugar, somos una experiencia que te invita a respirar,
            moverte y recuperarte de una forma integral.
          </p>

          <Button className='bg-primary-500 w-fit text-base px-5 py-6 sm:py-7 hover:bg-primary-500/90 text-white' onClick={handleScrollToMemberships}>
            Ver Membresías
          </Button>
        </div>

        <div className='flex items-center justify-center sm:items-end sm:justify-between gap-6 pb-16'>
          <Image
            src="/ctafloating.svg"
            alt="CTA Floating"
            width={100}
            height={100}
            className='hidden sm:block shrink-0 w-20 h-20 sm:w-24 sm:h-24'
          />
          <p className='text-base sm:text-md max-w-sm md:text-lg text-center sm:text-right text-primary-500'>
            Porque el futuro se construye, se entrena, se practica y se habita.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CTA