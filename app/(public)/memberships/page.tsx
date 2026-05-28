import React from 'react'
import HeroMemberships from '@/components/memberships/HeroMemberships'
import MembershipsList from '@/components/memberships/MembershipsList'
import { getMemberships } from '@/lib/actions/membership';
import MembershipInfo from '@/components/memberships/MembershipInfo';

const MembershipsPages = async () => {

    const memberships = await getMemberships();
    const membershipsList = memberships.map((membership) => ({
        id: membership._id,
        name: membership.name,
        description: membership.description,
        price: membership.price,
        anualPrice: membership.anualPrice,
        features: membership.features,
        tag: membership.tag,
        bottomText: membership.bottomText,
    }));

    return (
        <>

            <HeroMemberships />
            <MembershipInfo />
            <MembershipsList memberships={membershipsList} />
        </>
    )
}

export default MembershipsPages