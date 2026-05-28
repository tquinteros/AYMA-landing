"use client"
import Image from "next/image"

const HeroMemberships = () => {
  return (
    <section
      id="hero-memberships"
      className="relative h-svh overflow-hidden"
    >
      <Image
        src="/services/wellness.png"
        alt="Membership background"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="lg:text-[64px] text-5xl text-surface-500">MEMBRESÍAS</h1>
      </div>
    </section>
  )
}

export default HeroMemberships