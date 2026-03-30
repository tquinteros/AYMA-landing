import CTA from "@/components/landing/CTA";
import Hero from "@/components/landing/Hero"
import Memberships from "@/components/landing/Memberships"
import VerticalAccordion from "@/components/VerticalAccordion"
import OurSpace from "@/components/landing/OurSpace"
import Future from "@/components/landing/Future"
import { getPlans } from "@/lib/actions/plans"
import { Suspense } from "react";

export default async function Page() {
  const plans = await getPlans()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">
        <Hero />
        <CTA />
        <OurSpace />
        <VerticalAccordion />
        <Memberships plans={plans} />
        <Future />
      </div>
    </Suspense>
  )
}
