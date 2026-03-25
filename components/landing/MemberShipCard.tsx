import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Badge } from '../ui/badge'


interface Membership {
    id: number
    name: string
    description: string
    price: number
    features: string[]
    tag?: string
}

const MemberShipCard = ({ membership }: { membership: Membership }) => {
    return (
        <Card className="w-full relative flex flex-col rounded-3xl! bg-background-500 p-6 sm:p-8 lg:py-10 lg:px-6">
            {/* {membership.tag && (
                <Badge variant="default" className="absolute bg-primary-500 text-md px-4 h-6 -top-0 right-8">
                    {membership.tag}
                </Badge>
            )} */}
            <CardHeader className="p-0">
                <CardTitle className="text-2xl sm:text-3xl text-primary-500">{membership.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1 p-0 pt-4">
                <p className="text-primary-500 text-sm sm:text-[16px] leading-snug">{membership.description}</p>
                {/* <p>{membership.price}</p> */}
                <span className="text-primary-500 text-base sm:text-lg font-bold">INCLUYE</span>
                <ul className="flex flex-col gap-2">
                    {membership.features.map((feature: string) => (
                        <li key={feature} className="flex text-base sm:text-lg items-center text-primary-500 gap-2">
                            <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export default MemberShipCard