import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="bg-background-500">
            <div className='flex flex-col gap-6 px-5 sm:px-8 lg:px-16 py-8 lg:flex-row lg:items-center lg:justify-between'>
                <p className='text-primary-500 text-sm sm:text-base text-center lg:text-left'>
                    © AYMA Wellness Club l Remeros Beach, Rincon de Milberg l Buenos Aires, Argentina.
                </p>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6'>
                    <a href="mailto:info@aymawellness.com.ar" className='text-primary-500 uppercase tracking-[6px] hover:opacity-75 duration-300 transition-all text-sm break-all text-center'>
                        info@aymawellness.com.ar
                    </a>
                    <span className='hidden sm:block text-primary-500'>|</span>
                    <div className='flex items-center gap-6'>
                        <a href="https://wa.me/3333333333" target="_blank" rel="noreferrer">
                            <Image src="/whatsapp.svg" alt="facebook" width={18} height={18} />
                        </a>
                        <a href="https://www.instagram.com/aymawellness/" target="_blank" rel="noreferrer">
                            <Image src="/instagram.svg" alt="instagram" width={18} height={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer