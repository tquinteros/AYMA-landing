import ServiceTabContent from "@/components/services/ServiceTabContent"
import {
  recuperacionContrasteImages,
  recuperacionContrasteServices,
} from "@/data/servicesTabs"

const RecuperacionContrasteTab = () => {
  return (
    <ServiceTabContent
      title="Recuperación y contraste"
      intro="Un circuito de estímulos térmicos diseñado para activar los procesos naturales de recuperación del cuerpo."
      introItalic="Calor y frío se combinan para mejorar la circulación, reducir la inflamación y llevar el cuerpo a un estado profundo de regeneración física y mental."
      services={recuperacionContrasteServices}
      images={recuperacionContrasteImages}
    />
  )
}

export default RecuperacionContrasteTab
