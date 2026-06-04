const CTA = () => {
  return (
    <section
      id="cta"
      className="relative flex items-center justify-center overflow-hidden bg-roca-500 h-screen min-h-[520px] sm:min-h-[560px] px-6 sm:px-8"
    >
      <div className="flex w-full md:w-3/4 lg:w-1/2 flex-col items-center justify-center gap-8 text-center">
        <p className="text-xl font-bold text-surface-500">
          AYMA es un club de wellness basado en The Ayma Method®, un método integral que combina movimiento, temperatura y recuperación.
        </p>
        <p className="text-xl text-surface-500">
          Nace con un propósito claro: que el autocuidado deje de ser un lujo y se convierta en una práctica posible y sostenida en el tiempo.
        </p>
        <p className="text-xl text-surface-500">
          A través de nuestro método integral, acompañamos a cada persona según su momento, sus objetivos y sus necesidades de salud física, mental y emocional.
        </p>
      </div>
    </section>
  )
}

export default CTA
