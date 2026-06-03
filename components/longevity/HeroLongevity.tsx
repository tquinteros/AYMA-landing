"use client"
import Image from "next/image"

const HeroLongevity = () => {
  return (
    <section
      id="hero-longevity"
      className="relative h-svh overflow-hidden"
    >
      <Image
        src="/longevity/longevitybg.jpg"
        alt="Membership background"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="lg:text-[64px] text-5xl text-surface-500">LONGEVIDAD</h1>
      </div>
    </section>
  )
}

export default HeroLongevity