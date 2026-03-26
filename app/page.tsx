import CTA from "@/components/landing/CTA";
import Hero from "@/components/landing/Hero"
import Memberships from "@/components/landing/Memberships"
import VerticalAccordion from "@/components/VerticalAccordion"
import OurSpace from "@/components/landing/OurSpace"


export default function Page() {
  return (
    <div className="">
      <Hero />
      <CTA />
      <OurSpace />
      <VerticalAccordion />
      <Memberships />
    </div>
  )
}
