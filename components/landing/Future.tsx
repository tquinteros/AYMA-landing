import React from 'react'
import Image from 'next/image'


const Future = () => {
    const futureItems = [
        { src: "/future/movement.svg", label: "MOVIMIENTO" },
        { src: "/future/balance.svg", label: "EQUILIBRIO" },
        { src: "/future/awareness.svg", label: "CONSCIENCIA" },
        { src: "/future/integration.svg", label: "INTEGRACIÓN" },
    ]

    return (
        <section
            id="future"
            className="bg-roca-500"
        >
            <div className="relative z-10 flex min-h-[520px] w-full flex-col justify-center gap-12 px-5 py-12 sm:min-h-[560px] sm:px-8 sm:py-14 lg:min-h-[80vh] lg:gap-24 lg:px-24 lg:py-16">
                <div className='grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 max-w-7xl mx-auto md:grid-cols-4 md:gap-12 lg:gap-16'>
                    {futureItems.map((item) => (
                        <div key={item.label} className="flex flex-col items-center gap-6 sm:gap-12">
                            <div className="flex h-[84px] w-full items-center justify-center sm:h-[100px] lg:h-[120px]">
                                <Image src={item.src} alt={item.label} width={100} height={100} className="h-auto w-[70px] sm:w-[85px] lg:w-[100px]" />
                            </div>
                            <span className='text-center text-[13px] tracking-[2px] text-surface-500 sm:text-sm sm:tracking-[3px] lg:text-base lg:tracking-[5px]'>{item.label}</span>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col items-center gap-1 text-center lg:items-end lg:text-right'>
                    <p className='text-surface-500 text-xl sm:text-3xl lg:text-[42px]'>
                        PORQUE EL FUTURO SE CONSTRUYE,
                    </p>
                    <p className='text-surface-500 lg:mt-3 text-xl sm:text-3xl lg:text-[42px]'>
                        SE ENTRENA, SE PRACTICA Y SE HABITA.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Future