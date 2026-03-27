import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'


interface Membership {
    id: number
    name: string
    description: string
    price: number
    features: string[]
    tag?: string
    bottomText?: string
}

function MembershipCardTitle({ name }: { name: string }) {
    if (name.startsWith("AYMA")) {
        return (
            <>
                <span className="font-bold">AYMA</span>
                {name.slice(4)}
            </>
        )
    }
    return <>{name}</>
}

const MemberShipCard = ({ membership }: { membership: Membership }) => {
    return (
        <Card className={`w-full relative flex flex-col overflow-visible rounded-3xl! bg-roca-500 p-6 sm:p-8 lg:py-10 lg:px-6 ${membership.tag ? "border border-primary-500" : "border-none! border-transparent!"}`}>
            {membership.tag && (
                <Badge
                    className="pointer-events-none absolute top-0 right-6 z-20 h-auto -translate-y-1/2 rounded-full border-0 bg-primary-500 px-4 py-1.5 text-xs tracking-wide text-background-500 uppercase backdrop-blur-[2px] sm:right-8 sm:text-sm"
                >
                    {membership.tag}
                </Badge>
            )}
            <CardHeader className="p-0">
                <CardTitle className="text-2xl sm:text-3xl font-normal text-background-500">
                    <MembershipCardTitle name={membership.name} />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1 p-0 pt-4">
                <p className="text-background-500 text-sm sm:text-[16px] leading-snug">{membership.description}</p>
                {/* <p>{membership.price}</p> */}
                <span className="text-background-500 text-base sm:text-lg font-bold">INCLUYE</span>
                <ul className="flex flex-col ml-2 gap-1.5">
                    {membership.features.map((feature: string) => (
                        <li key={feature} className="flex text-base sm:text-lg items-center text-background-500 gap-2">
                            <div className="w-1 h-1 bg-background-500 rounded-full"></div>
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            {membership.bottomText && (
                <p className="text-background-500 mt-8 text-sm leading-snug">{membership.bottomText}</p>
            )}
        </Card>
    )
}

export default MemberShipCard