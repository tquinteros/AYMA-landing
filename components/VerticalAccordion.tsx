"use client"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useWindowsSize } from "@/lib/use-windows-size"
import { useState } from "react"
import { MoveUp } from "lucide-react"
const VerticalAccordion = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
    <section className="w-full px-5 sm:px-8 lg:px-24 py-8 sm:py-12 lg:py-16 bg-white" id="services">
      <div className="flex flex-col lg:flex-row h-fit lg:h-[480px] w-full overflow-hidden rounded-3xl border border-primary/20">
        {items.map((item, index) => {
          return (
            <Panel
              key={item.id}
              open={open}
              setOpen={setOpen}
              id={item.id}
              index={index}
              title={item.title}
              subtitle={item.subtitle}
              imgSrc={item.imgSrc}
              description={item.description}
              features={item.features}
              backgroundColorAccordion={item.backgroundColorAccordion}
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
  subtitle,
  imgSrc,
  description,
  features,
  backgroundColorAccordion,
}: {
  open: number
  setOpen: (id: number) => void
  id: number
  index: number
  title: string
  subtitle: string
  imgSrc: string
  description: string
  features: string[]
  backgroundColorAccordion: string
}) => {
  const { width } = useWindowsSize()
  const isOpen = open === id
  const numberLabel = String(index + 1).padStart(2, "0")
  const triggerTextClass = index >= 2 ? "text-white" : "text-primary-500"

  return (
    <>
      <button
        style={{ backgroundColor: backgroundColorAccordion }}
        className={`${triggerTextClass} transition-opacity cursor-pointer hover:opacity-90 p-4 border-b border-primary-500/20 lg:border-b-0 lg:border-r flex lg:flex-col items-center justify-between lg:justify-between gap-4 min-h-[64px] lg:min-h-0 lg:w-[78px]`}
        onClick={() => setOpen(id)}
      >
        <span className="text-sm font-medium tracking-wide">{numberLabel}</span>

        <span
          style={{ writingMode: "vertical-rl" }}
          className="hidden lg:flex text-sm font-medium rotate-180 text-center leading-none"
        >
          {title}
        </span>
        <span className="flex lg:hidden text-base font-medium text-center flex-1 justify-center">
          {title}
        </span>

        <MoveUp className="h-4 w-4 lg:rotate-90" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            className="w-full h-full overflow-hidden lg:overflow-hidden relative bg-background-100 max-lg:max-h-[75vh] max-lg:overflow-y-auto"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="h-full w-full p-5 sm:p-8 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-baseline gap-3 mb-6 min-w-0">
                  <span className="text-sm sm:text-xl font-bold tracking-wide text-primary-500">
                    {numberLabel}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-primary-500 flex-1 truncate">
                    {title}
                  </h3>
                </div>
                <Image src="/services/icon.svg" alt="ICON" className="hidden lg:block" width={24} height={24} />
              </div>

              <div className="flex-1 h-full w-full grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 lg:gap-10 items-start">
                <div className="relative w-full h-52 sm:h-72 lg:h-[360px] rounded-2xl overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    priority={id === items[0].id}
                  />
                </div>

                <div className="text-primary-500 flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm sm:text-xl leading-relaxed max-w-2xl">{subtitle}</p>
                    <p className="text-sm sm:text-base leading-relaxed max-w-2xl">{description}</p>
                  </div>

                  <ul className="flex flex-col gap-2 text-sm sm:text-base">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-500" />
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

const items = [
  {
    id: 1,
    title: "Servicios: Movimiento y entrenamiento",
    subtitle: "Prácticas que integran fuerza, movilidad y conexión mente-cuerpo. ",
    imgSrc:
      "/services/movement.png",
    backgroundColorAccordion: "#FFFFFF",
    description:
      "A través de distintas disciplinas, el movimiento se convierte en una herramienta para fortalecer el cuerpo, liberar tensiones y cultivar mayor conciencia física y mental.",
    features: [
      "Clases de Lagree - ilimitado",
      "Clases de Yoga - ilimitado",
      "Clases de Pilates - ilimitado",
      "Contraste térmico - ilimitado",
      "Recovery - ilimitado",
      "Acceso exclusivo a la playa",
    ],
  },
  {
    id: 2,
    title: "Recuperación y contraste",
    subtitle: "Un circuito de estímulos térmicos pensado para revitalizar el cuerpo y activar los procesos naturales de recuperación.",
    imgSrc:
      "/services/recovery.png",
    backgroundColorAccordion: "#F7F0E9",
    description:
      "A través de distintas disciplinas, el movimiento se convierte en una herramienta para fortalecer el cuerpo, liberar tensiones y cultivar mayor conciencia física y mental.",
    features: [
      "Clases de Lagree - ilimitado",
      "Clases de Yoga - ilimitado",
      "Clases de Pilates - ilimitado",
      "Contraste térmico - ilimitado",
      "Recovery - ilimitado",
      "Acceso exclusivo a la playa",
    ],
  },
  {
    id: 3,
    title: "Terapias restaurativas",
    subtitle: "Un espacio dedicado a la recuperación profunda y al cuidado físico especializado.",
    imgSrc:
      "/services/therapies.png",
    backgroundColorAccordion: "#6C5751",
    description:
      "A través de distintas disciplinas, el movimiento se convierte en una herramienta para fortalecer el cuerpo, liberar tensiones y cultivar mayor conciencia física y mental.",
    features: [
      "Clases de Lagree - ilimitado",
      "Clases de Yoga - ilimitado",
      "Clases de Pilates - ilimitado",
      "Contraste térmico - ilimitado",
      "Recovery - ilimitado",
      "Acceso exclusivo a la playa",
    ],
  },
  {
    id: 4,
    title: "Wellness integral",
    subtitle: "Servicios pensados para acompañar el equilibrio físico, energético y nutricional.",
    imgSrc:
      "/services/wellness.png",
    backgroundColorAccordion: "#678881",
    description:
      "A través de distintas disciplinas, el movimiento se convierte en una herramienta para fortalecer el cuerpo, liberar tensiones y cultivar mayor conciencia física y mental.",
    features: [
      "Clases de Lagree - ilimitado",
      "Clases de Yoga - ilimitado",
      "Clases de Pilates - ilimitado",
      "Contraste térmico - ilimitado",
      "Recovery - ilimitado",
      "Acceso exclusivo a la playa",
    ],
  },
];