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
        <section id="memberships" className="bg-roca-500 bg-none py-10 sm:py-12 lg:bg-[url('/membershipbg.png')] lg:bg-center lg:bg-no-repeat lg:bg-size-[110%] lg:py-20">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 sm:gap-4 sm:px-8 lg:px-24">
                <div className="flex items-center justify-center lg:justify-between">
                    <h2 className="text-center text-3xl uppercase text-background-500 sm:text-4xl lg:text-left lg:text-5xl">
                        Membresías
                    </h2>
                    <Image src="/ourspace/ourspaceicon.svg" alt="Our Space Icon" className="hidden md:block" width={52} height={52} />
                </div>
                <p className="max-w-xl text-center text-sm text-background-500 sm:text-base lg:text-left lg:text-lg">
                    Cada práctica se complementa con las demás para potenciar la experiencia y acompañar un proceso más completo y consciente.
                </p>
            </div>
            <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 px-4 sm:mt-12 sm:px-8 lg:px-0">
                <Carousel setApi={setApi} className="relative">
                    <CarouselContent className="items-stretch pt-5 sm:pt-7">
                        {memberships.map((membership) => (
                            <CarouselItem className="flex basis-full md:basis-1/2 xl:basis-1/3" key={membership.id}>
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
            <div className='mt-8 flex flex-col items-center gap-6 px-5 sm:gap-8 sm:px-8'>
                <p className="max-w-3xl text-center text-base text-background-500 sm:text-lg">
                    Si querés más información sobre las experiencias y valores, escribinos por WhatsApp. <br className="hidden sm:block" />
                    Estamos para ayudarte a encontrar tu forma de vivir AYMA.
                </p>
                <Button className='flex w-full max-w-[260px] items-center justify-center gap-2 bg-roca-900 px-8 py-6 text-base text-background-100 hover:bg-roca-900/80 sm:w-fit sm:max-w-none sm:py-7' onClick={handleWhatsApp}>
                    <Image src="/whatsappwhite.svg" alt="Whatsapp" width={20} height={20} />
                    WhatsApp
                </Button>
            </div>
        </section>
    )
}

export default Memberships