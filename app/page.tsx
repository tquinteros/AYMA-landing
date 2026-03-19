import Hero from "@/components/landing/Hero"
import Memberships from "@/components/landing/Memberships"
import VerticalAccordion from "@/components/VerticalAccordion"


export default function Page() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <VerticalAccordion />
      <Memberships />
    </div>
  )
}
