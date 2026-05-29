import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface MembershipFaq {
  id: string
  question: string
  answer: string
}

const MembershipFaqs = ({ faqs }: { faqs: MembershipFaq[] }) => {
  if (faqs.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-roca-500 bg-[url('/memberships/Q&A.png')] bg-cover bg-center bg-no-repeat px-5 py-16 sm:px-8 sm:py-20 lg:px-24 lg:py-28">
      <div className="absolute inset-0 bg-roca-900/55" aria-hidden="true" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <h2 className="text-5xl text-background-500">Q&amp;A</h2>
        </div>

        <Accordion type="single" collapsible className="ml-auto w-full max-w-3xl gap-8">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-background-500/30 pb-4"
            >
              <AccordionTrigger className="py-0 text-left text-2xl font-normal text-background-500 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-background-500">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-4 text-base text-background-500">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default MembershipFaqs