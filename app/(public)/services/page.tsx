import React from 'react'
import HeroServices from '@/components/services/HeroServices'
import ServicesTabs from '@/components/services/ServicesTabs'
import ServicesCta from '@/components/services/ServicesCta'
const ServicesPage = () => {
    return (
        <>
            <HeroServices />
            <ServicesTabs />
            <ServicesCta />
        </>
    )
}

export default ServicesPage