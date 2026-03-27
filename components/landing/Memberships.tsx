"use client"
import { useEffect, useState } from "react"
import { memberships } from '@/data/membership'
import MemberShipCard from './MemberShipCard'

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Button } from '../ui/button'
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
const Memberships = () => {

    const [api, setApi] = useState<CarouselApi | null>(null)
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    const canScrollPrev = current > 1
    const canScrollNext = current < count

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
        <section id="memberships" className="py-12 sm:py-16 lg:py-20 bg-roca-500 bg-[url('/membershipbg.png')] bg-size-[auto_100%] md:bg-size-[auto_150%] bg-center bg-no-repeat">
            <div className="flex flex-col gap-1 px-5 sm:px-8 lg:px-24">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl sm:text-4xl uppercase lg:text-5xl text-center text-background-500 lg:text-left">
                        Membresías
                    </h2>
                    <Image src="/ourspace/ourspaceicon.svg" alt="Our Space Icon" className="hidden md:block" width={52} height={52} />
                </div>
                <p className="max-w-xl text-base sm:text-xl lg:text-left text-background-500">
                    Cada práctica se complementa con las demás para potenciar la experiencia y acompañar un proceso más completo y consciente.
                </p>
            </div>
            <div className="relative flex flex-col gap-4 mt-10 sm:mt-6 max-w-7xl mx-auto px-5 sm:px-16 xl:px-0">
                <Carousel setApi={setApi} className="relative ">
                    <CarouselContent className="items-stretch pt-5 sm:pt-7">
                        {memberships.map((membership) => (
                            <CarouselItem className="basis-full sm:basis-1/2 xl:basis-1/3 flex" key={membership.id}>
                                <MemberShipCard membership={membership} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="hidden xl:flex pointer-events-none justify-between absolute inset-y-0 left-0 right-0 items-center">
                    <Button
                        type="button"
                        size="icon-sm"
                        className="pointer-events-auto bg-primary-500 md:-translate-x-12 border-none border-transparent lg:-translate-x-16 hover:bg-primary-100 text-background-100 w-11 h-11 hover:text-background-100 rounded-full"
                        disabled={!canScrollPrev}
                        onClick={() => api?.scrollPrev()}
                    >
                        <ChevronLeftIcon />
                        <span className="sr-only">Previous slide</span>
                    </Button>
                    <Button
                        type="button"
                        size="icon-sm"
                        className="pointer-events-auto bg-primary-500 md:translate-x-12 border-none border-transparent lg:translate-x-16 hover:bg-primary-100 text-background-100 w-11 h-11 hover:text-background-100 rounded-full"
                        disabled={!canScrollNext}
                        onClick={() => api?.scrollNext()}
                    >
                        <ChevronRightIcon />
                        <span className="sr-only">Next slide</span>
                    </Button>
                </div>
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
                <p className="text-background-500 text-left lg:text-center text-lg max-w-3xl">
                    Si querés más información sobre las experiencias y valores, escribinos por WhatsApp. <br className="hidden sm:block" />
                    Estamos para ayudarte a encontrar tu forma de vivir AYMA.
                </p>
                <Button className='bg-primary-500 w-full lg:w-fit text-base px-8 py-6 sm:py-7 flex items-center gap-2 hover:bg-primary-500/80 text-background-100' onClick={handleWhatsApp}>
                    <Image src="/whatsappwhite.svg" alt="Whatsapp" width={20} height={20} />
                    WhatsApp
                </Button>
            </div>
        </section>
    )
}

export default Memberships