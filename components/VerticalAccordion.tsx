"use client"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useWindowsSize } from "@/lib/use-windows-size"
import { useState } from "react"
import { MoveUp } from "lucide-react"
import { services } from "@/data/services"
const VerticalAccordion = () => {
  const [open, setOpen] = useState(services[0].id);

  return (
    <section className="w-full bg-roca-500 pb-12" id="services">
      {/* <div className="flex flex-col lg:flex-row h-fit lg:h-[580px] w-full overflow-hidden rounded-3xl border border-primary/20 md:border-t-0"> */}
      <div className="flex flex-col lg:flex-row h-fit lg:h-[656px] w-full overflow-hidden rounded-3xl border-none">
        {services.map((item, index) => {
          const serviceTitle = item.title.includes(":")
            ? item.title.split(":").slice(1).join(":").trim()
            : item.title

          return (
            <Panel
              key={item.id}
              open={open}
              setOpen={setOpen}
              id={item.id}
              index={index}
              title={item.title}
              serviceTitle={serviceTitle}
              subtitle={item.subtitle}
              imgSrc={item.imgSrc}
              description={item.description}
              features={item.features}
              backgroundColorAccordion={item.backgroundColorAccordion}
              iconSrc={item.iconSrc}
            />
          )
        })}
      </div>
    </section>
  )
};

const Panel = ({
  open,
  setOpen,
  id,
  index,
  title,
  serviceTitle,
  subtitle,
  imgSrc,
  description,
  features,
  backgroundColorAccordion,
  iconSrc,
}: {
  open: number
  setOpen: (id: number) => void
  id: number
  index: number
  title: string
  serviceTitle: string
  subtitle: string
  imgSrc: string
  description: string
  features: string[]
  backgroundColorAccordion: string
  iconSrc: string
}) => {
  const { width } = useWindowsSize()
  const isOpen = open === id
  const numberLabel = String(index + 1).padStart(2, "0")
  const triggerTextClass = index >= 2 ? "text-white" : "text-primary-500"

  return (
    <>
      {!isOpen && (
        <button
          style={index === 0 ? undefined : { backgroundColor: backgroundColorAccordion }}
          className={`${triggerTextClass} ${index === 0 ? "bg-surface-100" : ""} transition-opacity cursor-pointer hover:opacity-90 p-4 border-b border-primary-500/20 lg:border-b-0 lg:border-r flex lg:flex-col items-center justify-between lg:justify-between gap-4 min-h-[64px] lg:min-h-0 lg:w-[78px]`}
          onClick={() => setOpen(id)}
        >
          <span className="text-sm font-medium tracking-wide">{numberLabel}</span>

          <span
            style={{ writingMode: "vertical-rl" }}
            className="hidden lg:flex text-sm tracking-[3px] font-bold uppercase rotate-180 text-center"
          >
            {serviceTitle}
          </span>
          <span className="flex lg:hidden text-base font-medium text-center flex-1 justify-center">
            {title}
          </span>
          <MoveUp className="h-4 w-4 lg:rotate-90" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            className="w-full h-full overflow-hidden lg:overflow-hidden relative bg-roca-500 max-lg:max-h-[75vh] max-lg:overflow-y-auto"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="h-full w-full p-5 sm:p-8 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-start gap-3 mb-6 min-w-0">
                  <span className="text-md sm:text-2xl font-bold tracking-wide text-surface-500">
                    {numberLabel}
                  </span>
                  <h3 className="text-md sm:text-lg tracking-[4px] font-bold text-surface-500 flex-1 truncate">
                    SERVICIOS
                  </h3>
                </div>
                <Image src={iconSrc} alt={title} className="hidden lg:block" width={40} height={40} />
              </div>

              <div className="flex-1 h-full w-full grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 lg:gap-10 items-start">
                <div className="relative w-full h-52 sm:h-72 lg:h-[520px] rounded-xl overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    className="object-cover aspect-1/2!"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    priority={id === services[0].id}
                  />
                </div>

                <div className="text-surface-500 flex flex-col gap-4">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm sm:text-lg leading-relaxed max-w-2xl uppercase font-bold">
                        {serviceTitle}
                      </p>
                      <p className="text-sm sm:text-lg leading-relaxed max-w-2xl">{subtitle}</p>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed italic max-w-xl">{description}</p>
                  </div>

                  <ul className="flex flex-col gap-2 text-sm mt-0 md:mt-6 sm:text-base">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-surface-500" />
                        <span className="leading-relaxed font-bold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default VerticalAccordion;

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "auto",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};

