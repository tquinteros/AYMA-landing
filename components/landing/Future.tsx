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
            className="bg-roca-500 h-[80vh] min-h-[520px] sm:min-h-[560px]"
        >
            <div className="relative z-10 flex flex-col gap-32 justify-center h-full  py-10">
                <div className='flex items-center justify-center max-w-7xl mx-auto gap-32'>
                    {futureItems.map((item) => (
                        <div key={item.label} className="flex w-[160px] gap-6 flex-col items-center">
                            <div className="flex h-[120px] items-center justify-center">
                                <Image src={item.src} alt={item.label} width={100} height={100} />
                            </div>
                            <span className='mt-6 tracking-[4px] text-background-500 text-sm sm:text-base'>{item.label}</span>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col px-5 sm:px-8 lg:px-24 items-end gap-4'>
                    <p className='text-background-500 text-4xl'>
                        PORQUE EL FUTURO SE CONSTRUYE,
                    </p>
                    <p className='text-background-500 text-4xl'>
                        SE ENTRENA, SE PRACTICA Y SE HABITA.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Future