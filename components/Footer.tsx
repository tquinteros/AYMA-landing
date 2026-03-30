"use client"

import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Footer = () => {
    const pathname = usePathname()
    if (pathname.startsWith("/admin")) return null

    return (
        <footer className="bg-roca-500 border-t border-primary-500">
            <div className='flex flex-col gap-6 px-6 sm:px-8 lg:px-24 py-8 lg:flex-row lg:items-center lg:justify-between'>
                <p className='text-background-500 text-sm sm:text-base text-center lg:text-left'>
                    © AYMA Wellness Club l Camino de los Remeros 1585, Tigre l Remeros Beach
                </p>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6'>
                    <a href="mailto:aymawellness@gmail.com" className='text-background-500 hover:opacity-75 duration-300 transition-all text-sm md:text-md break-all text-center'>
                        aymawellness@gmail.com
                    </a>
                    <span className='hidden sm:block text-background-500'>|</span>
                    <div className='flex items-center gap-2'>
                        <a href="https://wa.me/5491162632894" target="_blank" rel="noreferrer">
                            <Image src="/whatsapp.svg" alt="facebook" width={28} height={28} />
                        </a>
                        <a href="https://www.instagram.com/aymawellness/" target="_blank" rel="noreferrer">
                            <Image src="/instagram.svg" alt="instagram" width={28} height={28} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer