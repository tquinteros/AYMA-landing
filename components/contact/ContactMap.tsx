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
            <div>
                SOCIAL MEDIA TODO: ADD
            </div>
        </div>
    )
}

export default ContactMap