import React from 'react'
import HeroMemberships from '@/components/memberships/HeroMemberships'
import MembershipsList from '@/components/memberships/MembershipsList'
import { getMemberships } from '@/lib/actions/membership';
import MembershipInfo from '@/components/memberships/MembershipInfo';
import MembershipFaqs from '@/components/memberships/MembershipFaqs';
import { getMembershipFaqs } from '@/lib/actions/membership-faq';

const MembershipsPages = async () => {

    const [memberships, membershipFaqs] = await Promise.all([
        getMemberships(),
        getMembershipFaqs(),
    ]);
    const membershipsList = memberships.map((membership) => ({
        id: membership._id,
        name: membership.name,
        description: membership.description,
        price: membership.price,
        quarterlyPrice: membership.quarterlyPrice,
        features: membership.features,
        tag: membership.tag,
        bottomText: membership.bottomText,
    }));
    const faqList = membershipFaqs.map((faq) => ({
        id: faq._id,
        question: faq.question,
        answer: faq.answer,
    }));

    return (
        <>

            <HeroMemberships />
            <MembershipInfo />
            <MembershipsList memberships={membershipsList} />
            <MembershipFaqs faqs={faqList} />
        </>
    )
}

export default MembershipsPages