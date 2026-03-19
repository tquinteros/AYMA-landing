import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'


interface Membership {
    id: number
    name: string
    description: string
    price: number
    features: string[]
}

const MemberShipCard = ({ membership }: { membership: Membership }) => {
    return (
        <Card className="w-full flex flex-col bg-[#F7F0E9] p-6 sm:p-8 lg:py-10 lg:px-6">
            <CardHeader className="p-0">
                <CardTitle className="text-2xl sm:text-3xl text-[#6C5751]">{membership.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1 p-0 pt-4">
                <p className="text-[#6C5751] text-sm sm:text-[16px] leading-snug">{membership.description}</p>
                {/* <p>{membership.price}</p> */}
                <span className="text-[#6C5751] text-base sm:text-lg font-bold">Incluye:</span>
                <ul className="flex flex-col gap-2">
                    {membership.features.map((feature: string) => (
                        <li key={feature} className="flex text-base sm:text-lg items-center text-[#6C5751] gap-3">
                            <Image className="shrink-0" src="/check.svg" alt="check" width={20} height={20} />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export default MemberShipCard