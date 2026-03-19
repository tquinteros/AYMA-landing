import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

const ourSpaceItemsSrcImages = [
    "/ourspace/ourspace1.png",
    "/ourspace/ourspace1.png",
    "/ourspace/ourspace1.png",
    "/ourspace/ourspace1.png",
    "/ourspace/ourspace1.png",
    "/ourspace/ourspace1.png",
    "/ourspace/ourspace1.png",
]

const OurSpace = () => {
    return (
        <section id="ourspace" className="py-12 sm:py-16 lg:py-20 bg-[#F7F0E9]">
            {/* <div className="flex flex-col gap-4 px-5 sm:px-8 lg:px-24 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center italic text-[#6C5751] lg:text-left">
                    Nuestro espacio
                </h2>
                <div className="flex flex-col gap-6">
                    <p className="max-w-2xl text-base font-bold sm:text-lg text-center lg:text-left text-[#6C5751]">
                        Más que un centro, un santuario donde la arquitectura y la naturaleza dialogan para ofrecerte un refugio del mundo exterior.
                    </p>
                    <p className="max-w-2xl text-base sm:text-lg text-center lg:text-left text-[#6C5751]">
                        En AYMA, creemos que el entorno es una parte fundamental de la experiencia de bienestar. Por eso, cada detalle de nuestro diseño
                        arquitectónico ha sido cuidadosamente seleccionado para fomentar la calma y la conexión.
                    </p>
                </div>
            </div> */}
            <div className="px-5 sm:px-8 lg:px-24">
                <div className="flex flex-col gap-4  lg:flex-row lg:items-center lg:justify-between">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center italic text-[#6C5751] lg:text-left">
                        Nuestro espacio
                    </h2>
                    <p className="max-w-2xl text-base font-bold sm:text-lg text-center lg:text-left text-[#6C5751]">
                        Más que un centro, un santuario donde la arquitectura y la naturaleza dialogan para ofrecerte un refugio del mundo exterior.
                    </p>
                </div>
                <div className="flex items-end justify-end mt-4">
                    <p className="max-w-2xl text-base sm:text-lg text-center lg:text-left text-[#6C5751]">
                        En AYMA, creemos que el entorno es una parte fundamental de la experiencia de bienestar. Por eso, cada detalle de nuestro diseño
                        arquitectónico ha sido cuidadosamente seleccionado para fomentar la calma y la conexión.
                    </p>
                </div>
            </div>
            <div className="mt-10 sm:mt-12">
                <Carousel>
                    <CarouselContent className="items-stretch gap-4">
                        {ourSpaceItemsSrcImages.map((ourSpaceItemSrcImage, index) => (
                            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/6 flex" key={index}>
                                <Image src={ourSpaceItemSrcImage} alt="Our Space" className="w-full h-full object-cover" width={264} height={264} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselNext className="hidden md:flex bg-[#A4908B] md:-right-12 lg:-right-16 hover:bg-[#A4908B] text-white w-12 h-12 hover:text-white" /> */}
                    {/* <CarouselPrevious className="hidden md:flex bg-[#A4908B] hover:bg-[#A4908B] md:-left-12 lg:-left-16 text-white w-12 h-12 hover:text-white" /> */}
                </Carousel>
            </div>
        </section>
    )
}

export default OurSpace