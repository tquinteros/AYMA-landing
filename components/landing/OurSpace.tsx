import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

const ourSpaceItemsSrcImages = [
    "/ourspace/ourspace1.png",
    "/ourspace/ourspace2.png",
    "/ourspace/ourspace3.png",
    "/ourspace/ourspace4.png",
    "/ourspace/ourspace5.png",
]

const OurSpace = () => {
    return (
        <section id="ourspace" className="relative overflow-hidden py-8 sm:py-12 lg:py-21 bg-background-500">
            <Image
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
            />
            <div className="relative z-10 px-5 sm:px-8 lg:px-24">
                <div className="flex flex-col gap-4  lg:flex-row lg:items-center lg:justify-between">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center italic text-primary-500 lg:text-left">
                        Nuestro espacio
                    </h2>
                    <p className="max-w-2xl text-base font-bold sm:text-lg text-center lg:text-left text-primary-500">
                        Más que un centro, un santuario donde la arquitectura y la naturaleza dialogan para ofrecerte un refugio del mundo exterior.
                    </p>
                </div>
                <div className="flex items-end justify-end mt-4">
                    <p className="max-w-2xl text-base sm:text-lg text-center lg:text-left text-primary-500">
                        En AYMA, creemos que el entorno es una parte fundamental de la experiencia de bienestar. Por eso, cada detalle de nuestro diseño
                        arquitectónico ha sido cuidadosamente seleccionado para fomentar la calma y la conexión.
                    </p>
                </div>
            </div>
            <div className="mt-10 sm:mt-12">
                <Carousel opts={{ loop: true }}>
                    <CarouselContent className="items-stretch gap-4 px-5 sm:px-8 lg:px-0">
                        {ourSpaceItemsSrcImages.map((ourSpaceItemSrcImage, index) => (
                            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/5 flex" key={index}>
                                <Image src={ourSpaceItemSrcImage} alt="Our Space" className="w-full h-full rounded-lg" width={264} height={264} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselNext className="hidden md:flex bg-primary-100 md:-right-12 lg:-right-16 hover:bg-primary-100 text-white w-12 h-12 hover:text-white" /> */}
                    {/* <CarouselPrevious className="hidden md:flex bg-primary-100 hover:bg-primary-100 md:-left-12 lg:-left-16 text-white w-12 h-12 hover:text-white" /> */}
                </Carousel>
            </div>
        </section>
    )
}

export default OurSpace