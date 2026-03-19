import React from 'react'
import { Button } from '../ui/button'

const CTA = () => {
  return (
    <section id='cta' className='bg-[#F7F0E9] h-[75vh]'>
      <div className='flex flex-col items-center justify-center h-full gap-16'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl text-center italic text-[#6C5751]'>Donde comienza la revolución del bienestar.</h2>
        <p className='text-base sm:text-lg md:text-3xl text-center max-w-4xl mx-auto text-[#6C5751]'>
          Más que un lugar, somos una experiencia que te invita a respirar, moverte y recuperarte de una forma integral.
        </p>
        <Button asChild className='bg-[#6C5751] w-fit text-base px-5 py-6 sm:py-7 hover:bg-[#6C5751]/80 text-white'>
          <a href='#memberships'>
            Ver Membresías
          </a>
        </Button>
      </div>
    </section>
  )
}

export default CTA