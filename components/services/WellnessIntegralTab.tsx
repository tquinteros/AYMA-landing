import ServiceTabContent from "@/components/services/ServiceTabContent"
import {
  wellnessIntegralImages,
  wellnessIntegralServices,
} from "@/data/servicesTabs"

const WellnessIntegralTab = () => {
  return (
    <ServiceTabContent
      title="Wellness integral"
      intro="Un enfoque diseñado para acompañar bienestar, energía y salud desde una mirada preventiva e integrativa."
      introItalic="Distintas terapias y protocolos se combinan para acompañar los procesos naturales de recuperación, optimización y equilibrio del cuerpo."
      services={wellnessIntegralServices}
      images={wellnessIntegralImages}
    />
  )
}

export default WellnessIntegralTab
