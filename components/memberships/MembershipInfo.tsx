import Image from 'next/image'
import React from 'react'

const MembershipInfo = () => {
    return (
        <div className="pt-25 bg-roca-500 px-5 sm:px-8 lg:px-24">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                <div className="flex flex-col gap-4 sm:gap-6">
                    <h4 className="text-[40px] text-surface-500">¿Porqué ser miembro de AYMA?</h4>
                </div>

                <div>
                    <p className="text-base leading-relaxed text-background-500 sm:text-lg">
                        Porque es un club de wellness dónde la salud se pone en primer lugar y dónde el cuidado deja de ser una intención para convertirse en un proceso que se pueda ir cumpliendo, con objetivos claros.
                        <br />
                        <br />
                        Acompañamos a cada persona en la etapa en la que esté con prácticas y staff profesional y apasionado en esta industria.
                        <br />
                        <br />
                        Con una propuesta que integra Hot Yoga, Lagree, sauna infrarrojo, sauna seco y húmedo, crioterapia, cold plunge, meditación, acupuntura, drippings, alimentación consciente, suplementación y experiencias sociales, AYMA redefine el bienestar contemporáneo.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MembershipInfo