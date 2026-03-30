import CTA from "@/components/landing/CTA";
import Hero from "@/components/landing/Hero"
import Memberships from "@/components/landing/Memberships"
import VerticalAccordion from "@/components/VerticalAccordion"
import OurSpace from "@/components/landing/OurSpace"
import Future from "@/components/landing/Future"
import { getPlans } from "@/lib/actions/plans"
import { Suspense } from "react";
import { auth } from '@/lib/auth/server';
import SignInForm from "@/components/auth/sign-in";
import SignUpForm from "@/components/auth/sign-up";

export default async function Page() {
  const plans = await getPlans()

  const { data: session } = await auth.getSession();
  console.log(session, "session")
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">
        <Hero />
        <SignInForm />
        <SignUpForm />
        <CTA />
        <OurSpace />
        <VerticalAccordion />
        <Memberships plans={plans} />
        <Future />
      </div>
    </Suspense>
  )
}
