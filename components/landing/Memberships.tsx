"use client"
import { useEffect, useState } from "react"
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
// import { memberships as localmemberships } from "@/data/membership"

interface LandingMembership {
    id: string
    name: string
    description: string
    price: number
    features: string[]
    tag?: string
    bottomText?: string
}

const Memberships = ({ memberships }: { memberships: LandingMembership[] }) => {
    // void _memberships

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
        window.open("https://wa.me/5491131003023", "_blank")
    }

    return (
        // <div id="memberships" className="mb-64 bg-[#FFFCF8]">
        <section id="memberships" className="py-12 sm:py-16 lg:py-20 bg-roca-500 bg-[url('/membershipbg.png')] bg-size-[auto_100%] md:bg-size-[auto_150%] bg-center bg-no-repeat">
            <div className="flex flex-col gap-1 px-5 sm:px-8 lg:px-24">
                <div className="flex flex-col gap-4 lg:flex-row items-start lg:justify-between">
                    <h2 className="text-4xl sm:text-4xl uppercase lg:text-5xl text-center text-background-500 lg:text-left">
                        Membresías
                    </h2>
                    {/* <Image src="/ourspace/ourspaceicon.svg" alt="Our Space Icon" className="hidden md:block" width={52} height={52} /> */}
                    <p className="max-w-xl text-base sm:text-lg lg:text-left text-background-500">
                        Cada práctica se complementa con las demás para potenciar la experiencia y acompañar un proceso más completo y consciente.
                    </p>
                </div>
            </div>
            <div className="mt-10 sm:mt-6 px-5 sm:px-8 lg:px-24">
                <div className="grid grid-cols-[22px_minmax(0,1fr)_22px] items-center gap-2 sm:grid-cols-[28px_minmax(0,1fr)_28px] sm:gap-3 lg:grid-cols-[44px_minmax(0,1fr)_44px] lg:gap-6">
                    <Button
                        type="button"
                        size="icon-sm"
                        className="inline-flex bg-primary-500 border-none border-transparent hover:bg-primary-100 text-background-100 h-[22px] w-[22px] sm:h-7 sm:w-7 lg:w-7 lg:h-7 hover:text-background-100 rounded-full shadow-sm p-0"
                        disabled={!canScrollPrev}
                        onClick={() => api?.scrollPrev()}
                    >
                        <ChevronLeftIcon className="size-2.5 sm:size-3.5 lg:size-3.5" />
                        <span className="sr-only">Previous slide</span>
                    </Button>

                    <Carousel setApi={setApi} className="relative min-w-0">
                        <CarouselContent className="items-stretch pt-5 sm:pt-7">
                            {memberships.map((membership) => (
                                <CarouselItem className="basis-full sm:basis-1/2 xl:basis-1/3 flex" key={membership.id}>
                                    <MemberShipCard membership={membership} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <Button
                        type="button"
                        size="icon-sm"
                        className="inline-flex bg-primary-500 border-none border-transparent hover:bg-primary-100 text-background-100 h-[22px] w-[22px] sm:h-7 sm:w-7 lg:w-7 lg:h-7 hover:text-background-100 rounded-full shadow-sm p-0"
                        disabled={!canScrollNext}
                        onClick={() => api?.scrollNext()}
                    >
                        <ChevronRightIcon className="size-2.5 sm:size-3.5 lg:size-3.5" />
                        <span className="sr-only">Next slide</span>
                    </Button>
                </div>
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-2 w-2 sm:h-2 sm:w-2 rounded-full cursor-pointer transition-all ${current === index + 1
                                ? "bg-background-500"
                                : "bg-background-500/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center gap-6 sm:gap-8 mt-8 px-5 sm:px-8'>
                <p className="text-background-500 text-center lg:text-center text-lg max-w-3xl">
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