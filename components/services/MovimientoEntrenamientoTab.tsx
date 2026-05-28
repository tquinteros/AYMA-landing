import ServiceTabContent from "@/components/services/ServiceTabContent"
import {
  movimientoEntrenamientoImages,
  movimientoEntrenamientoServices,
} from "@/data/servicesTabs"

const MovimientoEntrenamientoTab = () => {
  return (
    <ServiceTabContent
      title="Movimiento y entrenamiento"
      intro="Prácticas diseñadas para integrar fuerza, movilidad, recuperación y conexión mente-cuerpo."
      introItalic="Entendemos el movimiento como una herramienta para regular el sistema, desarrollar resiliencia y mejorar la forma en la que vivimos."
      services={movimientoEntrenamientoServices}
      images={movimientoEntrenamientoImages}
      showDownloadButton
    />
  )
}

export default MovimientoEntrenamientoTab
