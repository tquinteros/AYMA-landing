import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import MovimientoEntrenamientoTab from "@/components/services/MovimientoEntrenamientoTab"
import RecuperacionContrasteTab from "@/components/services/RecuperacionContrasteTab"
import TerapiasRestaurativasTab from "@/components/services/TerapiasRestaurativasTab"
import WellnessIntegralTab from "@/components/services/WellnessIntegralTab"

const tabTriggerClassName =
  "text-surface-100 hover:text-surface-100 dark:text-surface-100 dark:hover:text-surface-100 max-lg:whitespace-normal max-lg:text-xs data-[state=active]:rounded! data-[state=active]:bg-roca-500! data-[state=active]:py-3! data-[state=active]:font-bold data-[state=active]:text-surface-100! dark:data-[state=active]:border-transparent! dark:data-[state=active]:bg-roca-500! dark:data-[state=active]:text-surface-100! dark:data-active:border-transparent! dark:data-active:bg-roca-500! dark:data-active:text-surface-100!"

const ServicesTabs = () => {
  return (
    <section className="w-full bg-roca-500">
      <div className="flex w-full items-center justify-center py-24">
        <Tabs
          defaultValue="movimiento-entrenamiento"
          className="flex w-full flex-col items-center gap-8"
        >
          <TabsList className="mb-14 w-full max-w-4xl rounded bg-roca-100 p-2 max-lg:h-auto! lg:mb-25 dark:bg-roca-100">
            <TabsTrigger
              value="movimiento-entrenamiento"
              className={tabTriggerClassName}
            >
              Movimiento y entrenamiento
            </TabsTrigger>
            <TabsTrigger
              value="recuperacion-contraste"
              className={tabTriggerClassName}
            >
              Recuperacion y contraste
            </TabsTrigger>
            <TabsTrigger
              value="terapias-restaurativas"
              className={tabTriggerClassName}
            >
              Terapias restaurativas
            </TabsTrigger>
            <TabsTrigger
              value="wellness-integral"
              className={tabTriggerClassName}
            >
              Wellness integral
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="movimiento-entrenamiento"
            className="w-full px-6 sm:px-8 lg:px-24"
          >
            <MovimientoEntrenamientoTab />
          </TabsContent>
          <TabsContent
            value="recuperacion-contraste"
            className="w-full px-6 sm:px-8 lg:px-24"
          >
            <RecuperacionContrasteTab />
          </TabsContent>
          <TabsContent
            value="terapias-restaurativas"
            className="w-full px-6 sm:px-8 lg:px-24"
          >
            <TerapiasRestaurativasTab />
          </TabsContent>
          <TabsContent
            value="wellness-integral"
            className="w-full px-6 sm:px-8 lg:px-24"
          >
            <WellnessIntegralTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default ServicesTabs
