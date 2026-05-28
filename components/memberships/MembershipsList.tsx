
"use client"
import React, { useState } from 'react'
import MemberShipCardList from './MemberShipCardList'
import MembershipsTable from './MembershipsTable'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import Image from 'next/image'

interface MembershipsListMembership {
    id: string
    name: string
    description: string
    price: number
    anualPrice?: number
    features: string[]
    tag?: string
    bottomText?: string
}

const MembershipsList = ({ memberships }: { memberships: MembershipsListMembership[] }) => {
    const [isAnnual, setIsAnnual] = useState(false)

    const handleWhatsApp = () => {
        window.open("https://wa.me/5491124868493", "_blank")
    }

    return (
        <div className="pt-12 pb-25 bg-roca-500 px-5 sm:px-8 lg:px-24">
            <div className="mb-12 flex items-center justify-center gap-4 text-surface-500">
                <span className={isAnnual ? "opacity-70" : "opacity-100"}>Mensual</span>
                <Switch
                    size="lg"
                    checked={isAnnual}
                    onCheckedChange={setIsAnnual}
                    className="dark:data-unchecked:bg-input **:data-[slot=switch-thumb]:dark:bg-background **:data-[slot=switch-thumb]:dark:data-checked:bg-background **:data-[slot=switch-thumb]:dark:data-unchecked:bg-background"
                />
                <span className={isAnnual ? "opacity-100" : "opacity-70"}>Anual</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 lg:gap-y-16">
                {
                    memberships.map((membership) => (
                        <MemberShipCardList key={membership.id} membership={membership} isAnnual={isAnnual} />
                    ))
                }
            </div>
            <div className="mt-12 justify-center flex flex-col items-center gap-12">
                <p className="text-center max-w-3xl text-background-500 text-lg">
                    Si querés más información sobre las experiencias y valores, escribinos por WhatsApp.
                    Estamos para ayudarte a encontrar tu forma de vivir AYMA.
                </p>
                <Button className='bg-primary-500 w-full lg:w-fit text-base px-8 py-6 sm:py-7 flex items-center gap-2 hover:bg-primary-500/80 text-background-100' onClick={handleWhatsApp}>
                    <Image src="/whatsappwhite.svg" alt="Whatsapp" width={20} height={20} />
                    WhatsApp
                </Button>
            </div>
            <div className="mt-25 flex flex-col gap-6 lg:gap-12">
                <h5 className="text-[40px] text-surface-500">Compará nuestras membresías.</h5>
                <MembershipsTable memberships={memberships} isAnnual={isAnnual} />
            </div>
        </div >
    )
}

export default MembershipsList