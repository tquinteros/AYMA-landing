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
    price?: number
    quarterlyPrice?: number
    features: string[]
    tag?: string
    bottomText?: string
}

const COLS = { sm: 2, lg: 4 }

const MembershipsList = ({ memberships }: { memberships: MembershipsListMembership[] }) => {
    const [isQuarterly, setIsQuarterly] = useState(false)

    const handleWhatsApp = () => {
        window.open("https://wa.me/5491124868493", "_blank")
    }

    const total = memberships.length
    const remainderSm = total % COLS.sm
    const remainderLg = total % COLS.lg

    const fullRowsSm = total - (remainderSm === 0 ? COLS.sm : remainderSm)
    const fullRowsLg = total - (remainderLg === 0 ? COLS.lg : remainderLg)

    const mainItemsSm = remainderSm === 0 ? total : fullRowsSm
    const mainItemsLg = remainderLg === 0 ? total : fullRowsLg

    const splitIndex = remainderLg === 0 ? total : total - remainderLg

    const mainMemberships = memberships.slice(0, splitIndex)
    const lastRowMemberships = memberships.slice(splitIndex)

    return (
        <div className="pt-16 pb-25 bg-roca-500 px-5 sm:px-8 lg:px-24">
            <div className="mb-12 flex items-center justify-center gap-4 text-surface-500">
                <span className={isQuarterly ? "opacity-70" : "opacity-100"}>Mensual</span>
                <Switch
                    size="lg"
                    checked={isQuarterly}
                    onCheckedChange={setIsQuarterly}
                    className="bg-[#4F4F4F] data-checked:bg-[#4F4F4F] data-unchecked:bg-[#4F4F4F] dark:bg-[#4F4F4F] dark:data-checked:bg-[#4F4F4F] dark:data-unchecked:bg-[#4F4F4F] **:data-[slot=switch-thumb]:bg-white **:data-[slot=switch-thumb]:data-checked:bg-white **:data-[slot=switch-thumb]:data-unchecked:bg-white **:data-[slot=switch-thumb]:dark:bg-white **:data-[slot=switch-thumb]:dark:data-checked:bg-white **:data-[slot=switch-thumb]:dark:data-unchecked:bg-white"
                />
                <span className={isQuarterly ? "opacity-100" : "opacity-70"}>Trimestral</span>
            </div>

            <div className="flex flex-col gap-y-8 lg:gap-y-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 lg:gap-y-16">
                    {mainMemberships.map((membership) => (
                        <div key={membership.id} className="h-full">
                            <MemberShipCardList
                                membership={membership}
                                isQuarterly={isQuarterly}
                            />
                        </div>
                    ))}
                </div>

                {lastRowMemberships.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-center gap-x-3 gap-y-8 lg:gap-y-16">
                        {lastRowMemberships.map((membership) => (
                            <div key={membership.id} className="h-full w-full sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]">
                                <MemberShipCardList
                                    membership={membership}
                                    isQuarterly={isQuarterly}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-12 justify-center flex flex-col items-center gap-12">
                <p className="text-center max-w-3xl text-background-500 text-lg">
                    Si querés más información sobre las experiencias y valores, escribinos por WhatsApp.
                    Estamos para ayudarte a encontrar tu forma de vivir AYMA.
                </p>
                <Button
                    className='bg-primary-500 w-full lg:w-fit text-base px-8 py-6 sm:py-7 flex items-center gap-2 hover:bg-primary-500/80 text-background-100'
                    onClick={handleWhatsApp}
                >
                    <Image src="/whatsappwhite.svg" alt="Whatsapp" width={20} height={20} />
                    WhatsApp
                </Button>
            </div>

            <div className="mt-25 flex flex-col gap-6 lg:gap-12">
                <h5 className="text-[40px] text-surface-500">Compará nuestras membresías.</h5>
                <MembershipsTable memberships={memberships} isQuarterly={isQuarterly} />
            </div>
        </div>
    )
}

export default MembershipsList