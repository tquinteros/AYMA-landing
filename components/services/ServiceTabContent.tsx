import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { ServiceTabImage, ServiceTabItem } from "@/data/servicesTabs"

const formatDescriptionWithBreaks = (description: string) => {
  const sentences = description
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  return sentences.map((sentence, index) => (
    <span key={index}>
      {sentence}.
      {index < sentences.length - 1 && <br />}
    </span>
  ))
}

const formatServiceTitle = (title: string) => {
  const parenIndex = title.indexOf("(")

  if (parenIndex === -1) {
    return title
  }

  const mainTitle = title.slice(0, parenIndex).trimEnd()
  const parenthetical = title.slice(parenIndex).trim()

  return (
    <span className="inline-flex flex-wrap items-end gap-x-1">
      <span>{mainTitle}</span>
      <span className="pb-0.5 text-sm leading-none">{parenthetical}</span>
    </span>
  )
}

interface ServiceTabContentProps {
  title: string
  intro: string
  introItalic: string
  services: ServiceTabItem[]
  images: ServiceTabImage[]
  showDownloadButton?: boolean
}

const CRONOGRAMA_PDF_URL =
  "https://drive.google.com/uc?export=download&id=1zZ8_LyS0oFwh-m9JWbFyiARnAX89Gjbb"

const ServiceTabContent = ({
  title,
  intro,
  introItalic,
  services,
  images,
  showDownloadButton = false,
}: ServiceTabContentProps) => {
  return (
    <div className="w-full bg-roca-500">
      <h3 className="text-[32px] uppercase text-surface-500 sm:text-4xl lg:text-[40px]">
        {title}
      </h3>

      <div className="mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <p className="max-w-3xl text-base text-background-500 sm:text-lg">
          {intro}
          <br />
          <br />
          <i>{introItalic}</i>
        </p>
        {showDownloadButton && (
          <Button
            asChild
            className="h-auto shrink-0 rounded-[8px] bg-primary-500 px-5 py-4 text-background-500 hover:bg-primary-500/90"
          >
            <a
              href={CRONOGRAMA_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar cronograma
            </a>
          </Button>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-25 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
        <div className="flex flex-col gap-8">
          {services.map((service) => (
            <article key={service.number} className="flex flex-col gap-1">
              <span className="text-sm font-bold text-surface-500">{service.number}</span>
              <h4 className="flex items-center gap-4 text-2xl font-normal text-primary-100 sm:text-[32px] sm:leading-tight">
                {formatServiceTitle(service.title)}
                {service.title.toLowerCase() === "hot yoga" && <svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.9862 17.1673C17.7269 18.6157 17.0301 19.9498 15.9896 20.9902C14.949 22.0305 13.6147 22.7271 12.1663 22.986C12.1113 22.9949 12.0557 22.9995 12 22.9998C11.7492 22.9997 11.5075 22.9054 11.323 22.7355C11.1384 22.5656 11.0245 22.3326 11.0037 22.0826C10.9829 21.8326 11.0569 21.584 11.2108 21.3859C11.3648 21.1879 11.5876 21.055 11.835 21.0135C13.9062 20.6648 15.6637 18.9073 16.015 16.8323C16.0594 16.5707 16.2059 16.3375 16.4223 16.184C16.6387 16.0304 16.9072 15.9691 17.1688 16.0135C17.4303 16.058 17.6635 16.2045 17.8171 16.4209C17.9706 16.6372 18.0319 16.9057 17.9875 17.1673H17.9862ZM22 15.9998C22 18.9172 20.8411 21.7151 18.7782 23.778C16.7153 25.8409 13.9174 26.9998 11 26.9998C8.08262 26.9998 5.28473 25.8409 3.22183 23.778C1.15893 21.7151 0 18.9172 0 15.9998C0 12.5098 1.375 8.94105 4.0825 5.39355C4.1682 5.28122 4.27674 5.18833 4.40095 5.12099C4.52516 5.05365 4.66223 5.01341 4.80313 5.00289C4.94403 4.99238 5.08556 5.01185 5.21838 5.06001C5.35121 5.10817 5.47233 5.18393 5.57375 5.2823L8.58875 8.20855L11.3388 0.657298C11.3937 0.50669 11.484 0.371499 11.6022 0.263121C11.7203 0.154744 11.8628 0.0763568 12.0175 0.0345691C12.1723 -0.00721869 12.3349 -0.0111825 12.4915 0.023012C12.6481 0.0572064 12.7942 0.128557 12.9175 0.231048C15.6512 2.4998 22 8.56855 22 15.9998ZM20 15.9998C20 10.2385 15.5262 5.2598 12.7237 2.70855L9.94 10.3423C9.88287 10.4991 9.78741 10.6391 9.66232 10.7495C9.53723 10.86 9.38648 10.9374 9.22383 10.9747C9.06117 11.0119 8.89177 11.0079 8.73107 10.963C8.57036 10.918 8.42346 10.8336 8.30375 10.7173L5.0075 7.5198C3.01125 10.401 2 13.2498 2 15.9998C2 18.3867 2.94821 20.6759 4.63604 22.3638C6.32387 24.0516 8.61305 24.9998 11 24.9998C13.3869 24.9998 15.6761 24.0516 17.364 22.3638C19.0518 20.6759 20 18.3867 20 15.9998Z" fill="#A4908B" />
                </svg>
                }
              </h4>
              <p className="text-base font-normal leading-relaxed text-background-500">
                {formatDescriptionWithBreaks(service.description)}
              </p>
            </article>
          ))}
        </div>
        <div className="flex flex-col gap-6 sm:gap-8 lg:sticky lg:top-24 lg:self-start">
          {images.map((image) => (
            <div
              key={image.src}
              className="relative aspect-4/2 w-full overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceTabContent
