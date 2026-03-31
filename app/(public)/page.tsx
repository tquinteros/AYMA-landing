import CTA from "@/components/landing/CTA";
import Hero from "@/components/landing/Hero"
import Memberships from "@/components/landing/Memberships"
import VerticalAccordion from "@/components/VerticalAccordion"
import OurSpace from "@/components/landing/OurSpace"
import Future from "@/components/landing/Future"
// import { getMemberships } from "@/lib/actions/membership";


export default async function Page() {
  // const memberships = await getMemberships();
  // const landingMemberships = memberships.map((membership) => ({
  //   id: membership._id,
  //   name: membership.name,
  //   description: membership.description,
  //   price: membership.price,
  //   features: membership.features,
  //   tag: membership.tag,
  //   bottomText: membership.bottomText,
  // }));

  return (
    <div className="">
      <Hero />
      <CTA />
      <OurSpace />
      <VerticalAccordion />
      {/* <Memberships memberships={landingMemberships} /> */}
      <Memberships memberships={[]} />
      <Future />
    </div>
  )
}
