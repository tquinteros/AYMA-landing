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
import Image from "next/image"
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

    const handleWhatsApp = () => {
        window.open("https://wa.me/5491162632894", "_blank")
    }

    return (
        // <div id="memberships" className="mb-64 bg-[#FFFCF8]">
        <section id="memberships" className="py-8 sm:py-12 lg:py-21 bg-roca-500 bg-[url('/membershipbg.png')] bg-size-[105%] bg-center bg-no-repeat">
            <div className="flex flex-col gap-4 px-5 sm:px-8 lg:px-24">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl sm:text-4xl uppercase lg:text-5xl text-center text-background-500 lg:text-left">
                        Membresías
                    </h2>
                    <Image src="/ourspace/ourspaceicon.svg" alt="Our Space Icon" className="hidden md:block" width={52} height={52} />

                </div>
                <p className="max-w-xl text-base sm:text-lg text-center lg:text-left text-background-500">
                    Cada práctica se complementa con las demás para potenciar la experiencia y acompañar un proceso más completo y consciente.
                </p>
            </div>
            <div className="flex flex-col gap-4 mt-10 sm:mt-12 max-w-7xl mx-auto px-5 sm:px-8 lg:px-0">
                <Carousel setApi={setApi} className="relative">
                    <CarouselContent className="items-stretch pt-5 sm:pt-7">
                        {memberships.map((membership) => (
                            <CarouselItem className="basis-full sm:basis-1/2 xl:basis-1/3 flex" key={membership.id}>
                                <MemberShipCard membership={membership} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className="hidden xl:flex bg-primary-500! md:-right-12 lg:-right-16 hover:bg-primary-100 text-background-100 w-12 h-12 hover:text-background-100" />
                    <CarouselPrevious className="hidden xl:flex bg-primary-500! hover:bg-primary-100 md:-left-12 lg:-left-16 text-background-100 w-12 h-12 hover:text-background-100" />
                </Carousel>
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full cursor-pointer transition-all ${current === index + 1
                                ? "bg-background-500"
                                : "bg-background-500/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center gap-6 sm:gap-8 mt-8 px-5 sm:px-8'>
                <p className="text-background-500 text-center text-lg max-w-3xl">
                    Si querés más información sobre las experiencias y valores, escribinos por WhatsApp. <br className="hidden sm:block" />
                    Estamos para ayudarte a encontrar tu forma de vivir AYMA.
                </p>
                <Button className='bg-roca-900 w-fit text-base px-8 py-6 sm:py-7 flex items-center gap-2 hover:bg-roca-900/80 text-background-100' onClick={handleWhatsApp}>
                    <Image src="/whatsappwhite.svg" alt="Whatsapp" width={20} height={20} />
                    WhatsApp
                </Button>
            </div>
        </section>
    )
}

export default Memberships