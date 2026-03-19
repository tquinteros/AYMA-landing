"use client"
import { useEffect, useState } from "react"
import { memberships } from '@/data/membership'
import MemberShipCard from './MemberShipCard'

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '../ui/button'
const Memberships = () => {

    const [api, setApi] = useState<CarouselApi | null>(null)
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) return

        const update = () => {
            setCurrent(api.selectedScrollSnap() + 1)
            setCount(api.scrollSnapList().length)
        }

        update()

        api.on("select", update)

        return () => {
            api.off("select", update)
        }
    }, [api])

    return (
        // <div id="memberships" className="mb-64 bg-[#FFFCF8]">
        <section id="memberships" className="py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col gap-4 px-5 sm:px-8 lg:px-24 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center italic text-[#6C5751] lg:text-left">
                    Membresías
                </h2>
                <p className="max-w-2xl text-base sm:text-lg text-center lg:text-left text-[#6C5751]">
                    Acá cada práctica se potencia con las demás: no tenés que elegir una sola cosa. Todo coexiste. Todo se amplifica.
                </p>
            </div>
            <div className="flex flex-col gap-4 mt-10 sm:mt-12 max-w-7xl mx-auto px-5 sm:px-8 lg:px-0">
                <Carousel setApi={setApi}>
                    <CarouselContent className="items-stretch">
                        {memberships.map((membership) => (
                            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3 flex" key={membership.id}>
                                <MemberShipCard membership={membership} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className="hidden md:flex bg-[#A4908B] md:-right-12 lg:-right-16 hover:bg-[#A4908B] text-white w-12 h-12 hover:text-white" />
                    <CarouselPrevious className="hidden md:flex bg-[#A4908B] hover:bg-[#A4908B] md:-left-12 lg:-left-16 text-white w-12 h-12 hover:text-white" />
                </Carousel>
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full cursor-pointer transition-all ${current === index + 1
                                ? "bg-[#6C5751] w-5 sm:w-6"
                                : "bg-[#6C5751]/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center gap-6 sm:gap-8 mt-8 px-5 sm:px-8'>
                <p className="text-[#6C5751] text-center text-lg sm:text-2xl max-w-3xl">
                    Para conocer más detalles y precios, escribinos por WhatsApp y te asesoramos de forma personalizada.
                </p>
                <Button className='bg-[#6C5751] w-fit text-base px-5 py-6 sm:py-7 hover:bg-[#6C5751]/80 text-white'>
                    Consultar por whatsapp
                </Button>
            </div>
        </section>
    )
}

export default Memberships