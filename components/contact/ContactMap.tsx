import React from 'react'

const ContactMap = () => {
    return (
        <div className='bg-roca-500 flex flex-col gap-22 pb-25 px-5 sm:px-8 lg:px-24'>
            <p className='text-surface-500 text-2xl'>
                AYMA Wellness Club está dentro de Remeros Beach, la Ciudad de Bienestar en pleno Tigre, a 7 minutos de Panamericana y a 25 minutos de Aeroparque. Invitamos a cada miembro a vivir una vida extraordinaria; simple pero fuera de lo común, ni bien ingresa a Remeros Beach.
            </p>
            <div className='flex justify-center'>
                <iframe
                    className='rounded-xl w-full lg:w-[50%]'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1645.7564590670063!2d-58.623284933124324!3d-34.413724334785265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca50008b2e213%3A0x7264f4ec4832944!2sClub%20N%C3%A1utico%20de%20Remeros%20Beach!5e0!3m2!1ses-419!2sar!4v1779944412697!5m2!1ses-419!2sar" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='flex flex-col gap-3'>
                    <div className='w-12 h-12 bg-primary-500 rounded-[8px] flex items-center justify-center'>
                        <svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.4552 26.4085L11.4568 26.4073L11.4592 26.4055L11.4666 26.4001L11.4914 26.3817C11.5122 26.3661 11.5417 26.344 11.5792 26.3154C11.6542 26.2583 11.7615 26.1755 11.8964 26.0685C12.166 25.8546 12.5469 25.5432 13.0019 25.1459C13.9101 24.353 15.1234 23.2093 16.3404 21.8069C18.7303 19.0526 21.3333 15.0736 21.3333 10.6667C21.3333 4.77563 16.5577 0 10.6667 0C4.77563 0 0 4.77563 0 10.6667C0 15.0736 2.60301 19.0526 4.99295 21.8069C6.20993 23.2093 7.4232 24.353 8.33141 25.1459C8.78645 25.5432 9.1673 25.8546 9.43698 26.0685C9.57188 26.1755 9.67914 26.2583 9.75416 26.3154C9.79167 26.344 9.82114 26.3661 9.84198 26.3817L9.86672 26.4001L9.87411 26.4055L9.87744 26.408C10.3468 26.7522 10.9859 26.7527 11.4552 26.4085ZM10.6637 14C12.5047 14 13.9971 12.5076 13.9971 10.6667C13.9971 8.82572 12.5047 7.33333 10.6637 7.33333C8.82279 7.33333 7.3304 8.82572 7.3304 10.6667C7.3304 12.5076 8.82279 14 10.6637 14Z" fill="#CFC4BC" />
                        </svg>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-background-500 text-2xl'>Ubicación</span>
                        <span className='text-surface-500 text-[16px]'>Wellness Club</span>
                        <span className='text-background-500 text-lg'>Camino de los Remeros 1585, Tigre l Remeros Beach.</span>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='w-12 h-12 bg-primary-500 rounded-[8px] flex items-center justify-center'>
                        <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.872297 0.0818584L13.3333 10.2773L25.7944 0.0818585C25.6507 0.0289117 25.4954 0 25.3333 0H1.33333C1.17128 0 1.01597 0.0289117 0.872297 0.0818584Z" fill="#CFC4BC" />
                            <path d="M0 2.81366V20C0 20.7364 0.596954 21.3333 1.33333 21.3333H25.3333C26.0697 21.3333 26.6667 20.7364 26.6667 20V2.81366L14.1776 13.0319C13.6865 13.4338 12.9802 13.4338 12.489 13.0319L0 2.81366Z" fill="#CFC4BC" />
                        </svg>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-background-500 text-2xl'>Email</span>
                        <span className='text-surface-500 text-[16px]'>Dejanos tu consulta.</span>
                        <a
                            href="mailto:info@aymawellnessclub.com"
                            className="text-background-500 text-[18px] leading-6 underline transition-opacity duration-300 hover:opacity-75"
                        >
                            info@aymawellnessclub.com
                        </a>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='w-12 h-12 bg-primary-500 rounded-[8px] flex items-center justify-center'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.33333 0C0.596954 0 0 0.596954 0 1.33333C0 13.8518 10.1482 24 22.6667 24C23.403 24 24 23.403 24 22.6667V16.2667C24 15.6779 23.6138 15.1588 23.0498 14.9896L17.7165 13.3896C17.2466 13.2486 16.7374 13.377 16.3905 13.7239L14.8288 15.2856C12.2738 13.847 10.153 11.7262 8.7144 9.17122L10.2761 7.60948C10.623 7.26263 10.7514 6.75336 10.6104 6.28354L9.01044 0.950203C8.84124 0.386224 8.32215 0 7.73333 0H1.33333Z" fill="#CFC4BC" />
                        </svg>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-background-500 text-2xl'>Whatsapp</span>
                        <span className='text-surface-500 text-[16px]'>Contactate con nuestra host.</span>
                        <a href="https://wa.me/5491124868493" className='text-background-500 text-lg hover:opacity-75 duration-300 transition-all'>+54 9 11 2486 8493</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactMap