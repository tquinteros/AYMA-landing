import ServiceTabContent from "@/components/services/ServiceTabContent"
import {
  terapiasRestaurativasImages,
  terapiasRestaurativasServices,
} from "@/data/servicesTabs"

const TerapiasRestaurativasTab = () => {
  return (
    <ServiceTabContent
      title="Terapias restaurativas"
      intro="Un espacio dedicado al cuidado físico especializado y a la recuperación profunda."
      introItalic="Tratamientos que alivian tensiones y acompañan los procesos de recuperación desde un abordaje integral."
      services={terapiasRestaurativasServices}
      images={terapiasRestaurativasImages}
    />
  )
}

export default TerapiasRestaurativasTab
