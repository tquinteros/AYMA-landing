import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { Button } from '../ui/button'

const ourSpaceItemsSrcImages = [
    "/ourspace/ourspace1.png",
    "/ourspace/ourspace2.png",
    "/ourspace/ourspace3.png",
    "/ourspace/ourspace4.png",
    "/ourspace/ourspace5.png",
]

const OurSpace = () => {
    return (
        <section id="ourspace" className="relative overflow-hidden py-8 sm:py-12 lg:py-21 bg-roca-500">
            {/* <Image
                src="/ourspace/shape.svg"
                alt=""
                width={2000}
                height={2000}
                className="pointer-events-none absolute 
               right-[5vw] 
               top-0
               w-screen 
               max-w-none 
               hidden
               md:block
               opacity-80"
            /> */}
            <div className="">
                <Carousel opts={{ loop: true, dragFree: true }}>
                    <CarouselContent className="items-stretch gap-4 px-5 sm:px-8 lg:px-0">
                        {ourSpaceItemsSrcImages.map((ourSpaceItemSrcImage, index) => (
                            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/5 flex" key={index}>
                                <Image src={ourSpaceItemSrcImage} alt="Our Space" className="w-full h-full aspect-3/4 object-cover rounded-lg" width={1200} height={1200} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselNext className="hidden md:flex bg-primary-100 md:-right-12 lg:-right-16 hover:bg-primary-100 text-white w-12 h-12 hover:text-white" /> */}
                    {/* <CarouselPrevious className="hidden md:flex bg-primary-100 hover:bg-primary-100 md:-left-12 lg:-left-16 text-white w-12 h-12 hover:text-white" /> */}
                </Carousel>
            </div>
            <div className="relative z-10 my-10 sm:my-32 px-5 sm:px-8 lg:px-24">
                <div className="flex flex-col gap-4  lg:flex-row lg:items-end lg:justify-between">
                    <Image src="/ourspace/ourspaceicon.svg" alt="Our Space Icon" className="hidden md:block" width={64} height={64} />
                    <div className="flex flex-col gap-5">
                        <p className="max-w-2xl text-base font-bold sm:text-lg text-left lg:text-right text-surface-500">
                            A pocos minutos de la ciudad, la arquitectura y la naturaleza conviven para crear un entorno que invita a la calma, el movimiento y la conexión.
                        </p>
                        <p className="max-w-2xl text-base sm:text-lg italic text-left lg:text-right text-surface-500">
                            Más que un lugar, somos una experiencia que te invita a respirar, moverte
                            y recuperarte de una forma integral. Un espacio para bajar el ritmo y volver a vos.
                        </p>
                    </div>
                </div>
                {/* <div className="flex items-end justify-end mt-4">
                    <p className="max-w-2xl text-base sm:text-lg text-center lg:text-left text-surface-500">
                        Más que un lugar, somos una experiencia que te invita a respirar, moverte
                        y recuperarte de una forma integral. Un espacio para bajar el ritmo y volver a vos.
                    </p>
                </div> */}
            </div>
        </section>
    )
}

export default OurSpace