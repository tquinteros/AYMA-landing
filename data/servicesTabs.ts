export interface ServiceTabItem {
  number: string
  title: string
  description: string
}

export interface ServiceTabImage {
  src: string
  alt: string
}

export const movimientoEntrenamientoServices: ServiceTabItem[] = [
  {
    number: "01",
    title: "Yoga",
    description:
      "Una práctica orientada a generar conexión, movilidad, respiración y presencia. Las clases combinan movimiento consciente y regulación del sistema nervioso para acompañar tanto el cuerpo físico como el bienestar mental y emocional.",
  },
  {
    number: "02",
    title: "Hot Yoga",
    description:
      "Una experiencia inmersiva realizada en calor diseñada para profundizar movilidad, circulación y detoxificación. El calor permite trabajar flexibilidad, resistencia y enfoque mental desde una práctica intensa pero consciente.",
  },
  {
    number: "03",
    title: "Lagree",
    description:
      "Entrenamiento de alta intensidad y bajo impacto basado en tiempo bajo tensión y control muscular. Trabaja fuerza, core, estabilidad y resistencia profunda sin impacto agresivo sobre las articulaciones.",
  },
  {
    number: "04",
    title: "Mobility",
    description:
      "Clases enfocadas en mejorar movilidad funcional, postura y calidad de movimiento. Guiadas desde una mirada osteopática e integrativa para liberar tensiones, recuperar rango articular y optimizar cómo el cuerpo se mueve en la vida diaria.",
  },
  {
    number: "05",
    title: "Yin Yoga",
    description:
      "Una práctica restaurativa enfocada en permanencias largas y relajación profunda. Busca trabajar tejidos profundos, flexibilidad y regulación desde la quietud.",
  },
  {
    number: "06",
    title: "Breathwork & Meditation",
    description:
      "Una práctica restaurativa enfocada en permanencias largas y relajación profunda. Busca trabajar tejidos profundos, flexibilidad y regulación desde la quietud.",
  },
  {
    number: "07",
    title: "Danceflow",
    description:
      "Prácticas orientadas a entrenar respiración, foco y regulación emocional. Herramientas diseñadas para bajar el ritmo, mejorar claridad mental y generar mayor conexión interna.",
  },
  {
    number: "08",
    title: "Pilates Fit",
    description:
      "Una práctica que combina los principios del pilates con entrenamiento funcional y trabajo de fuerza consciente. - Slo método creado por una de nuestras profesoras.",
  },
]

export const movimientoEntrenamientoImages: ServiceTabImage[] = [
  {
    src: "/servicesTabs/servicesTabs1.png",
    alt: "Práctica de yoga",
  },
  {
    src: "/servicesTabs/servicesTabs2.png",
    alt: "Entrenamiento Lagree",
  },
  {
    src: "/servicesTabs/servicesTabs3.png",
    alt: "Meditación al aire libre",
  },
]

export const recuperacionContrasteServices: ServiceTabItem[] = [
  {
    number: "01",
    title: "Sauna seco",
    description:
      "Un calor intenso y envolvente diseñado para estimular detoxificación, relajación muscular y regulación del estrés. El sauna seco ayuda a liberar tensiones, mejorar circulación y generar un estado profundo de calma y recuperación.",
  },
  {
    number: "02",
    title: "Sauna infrarrojo",
    description:
      "Una experiencia de calor profundo que trabaja desde el interior del cuerpo a través de tecnología infrarroja. Diseñado para acompañar procesos de recuperación muscular, circulación, detoxificación y regulación del sistema nervioso de forma más suave y sostenida.",
  },
  {
    number: "03",
    title: "Sauna húmedo",
    description:
      "Vapor y calor se combinan para relajar el cuerpo, abrir vías respiratorias y disminuir tensiones acumuladas. Una práctica ideal para desacelerar, recuperar y acompañar procesos de bienestar físico y mental.",
  },
  {
    number: "04",
    title: "Duchas sensoriales",
    description:
      "A través de distintos estímulos de temperatura, presión, iluminación y sensaciones, las duchas sensoriales buscan activar circulación, revitalizar el cuerpo y generar un estado profundo de bienestar físico y mental.",
  },
  {
    number: "05",
    title: "Cold plunge",
    description:
      "Exposición al frío diseñada para activar resiliencia física y mental. El cold plunge puede colaborar en: recuperación muscular, reducción de inflamación, foco mental, energía y regulación del sistema nervioso. Una práctica que invita al cuerpo a adaptarse, recuperar y fortalecerse desde la incomodidad consciente.",
  },
]

export const recuperacionContrasteImages: ServiceTabImage[] = [
  {
    src: "/servicesTabs/servicesTabs4.png",
    alt: "Sauna y recuperación térmica",
  },
  {
    src: "/servicesTabs/servicesTabs5.png",
    alt: "Cold plunge y contrastes",
  },
]

export const terapiasRestaurativasServices: ServiceTabItem[] = [
  {
    number: "01",
    title: "Osteopatía",
    description:
      "Un abordaje manual e integrativo que busca restaurar movilidad, equilibrio y función del cuerpo. Las sesiones trabajan sobre tensiones, compensaciones y restricciones para mejorar cómo el cuerpo se mueve, se adapta y se recupera.",
  },
  {
    number: "02",
    title: "Kinesiología",
    description:
      "Tratamientos orientados a recuperación física, rehabilitación y optimización del movimiento. Una mirada funcional del cuerpo diseñada para acompañar desde lesiones y molestias hasta procesos preventivos y de rendimiento.",
  },
  {
    number: "03",
    title: "Acupuntura",
    description:
      "Terapia basada en medicina tradicional china orientada a equilibrar el sistema nervioso y energético del cuerpo. Estrés, descanso, inflamación, energía, tensión muscular y regulación emocional.",
  },
  {
    number: "04",
    title: "Masajes",
    description:
      "Distintos abordajes terapéuticos según la necesidad del cuerpo, descontracturantes, relajantes y deportivos.",
  },
  {
    number: "05",
    title: "PMF red light therapy (en mat con gemas de cuarzo)",
    description:
      "Tecnología de estimulación electromagnética diseñada para acompañar regeneración celular, recuperación muscular y regulación del sistema. Una terapia orientada a optimizar recuperación física, descanso y adaptación del cuerpo desde una mirada innovadora y preventiva.",
  },
  {
    number: "06",
    title: "TheraFace Mask",
    description:
      "Tecnología de terapia lumínica diseñada para acompañar procesos de recuperación, regeneración y bienestar facial. A través de luz infrarroja y vibración terapéutica, TheraFace Mask busca ayudar a reducir tensión, mejorar la apariencia de la piel y generar un momento profundo de relajación y recuperación. Una experiencia que combina wellness, tecnología y cuidado personal desde una mirada regenerativa e integrativa.",
  },
  {
    number: "07",
    title: "Theragun Prime",
    description:
      "Dispositivo de percusión muscular diseñado para aliviar tensión, estimular circulación y acelerar procesos de recuperación. A través de terapia de percusión profunda, Theragun Prime ayuda a liberar rigidez muscular, reducir fatiga y acompañar la recuperación física después del entrenamiento o el estrés diario. Una herramienta diseñada para optimizar movilidad, recuperación y bienestar corporal.",
  },
  {
    number: "08",
    title: "JetBoots Prime",
    description:
      "Botas de compresión neumática diseñadas para estimular circulación y optimizar recuperación muscular. A través de compresión secuencial, JetBoots Prime ayuda a disminuir sensación de fatiga, mejorar recuperación y acompañar procesos de regeneración física después del entrenamiento, exposición al estrés o largas jornadas. Una experiencia recovery diseñada para relajar el cuerpo y acelerar la recuperación desde la tecnología y el bienestar.",
  },
]

export const terapiasRestaurativasImages: ServiceTabImage[] = [
  {
    src: "/servicesTabs/servicesTabs8.png",
    alt: "Tecnología de bienestar",
  },
  {
    src: "/servicesTabs/servicesTabs6.png",
    alt: "Terapias restaurativas",
  },
  {
    src: "/servicesTabs/servicesTabs7.jpg",
    alt: "Tratamientos de recuperación",
  },
]

export const wellnessIntegralServices: ServiceTabItem[] = [
  {
    number: "01",
    title: "Nutrición",
    description:
      "Acompañamiento personalizado enfocado en salud metabólica, energía y hábitos sostenibles. La nutrición es entendida como una herramienta fundamental para optimizar bienestar, recuperación y rendimiento desde una mirada realista e integral.",
  },
  {
    number: "02",
    title: "Dripping",
    description:
      "Protocolos de sueroterapia diseñados para acompañar hidratación, recuperación y optimización física y mental. A través de vitaminas, minerales y nutrientes, los drips buscan apoyar procesos de energía, inmunidad, recuperación y bienestar general.",
  },
  {
    number: "03",
    title: "Acompañamiento Médico",
    description:
      "Una mirada médica orientada a prevención, longevidad y optimización del bienestar. El acompañamiento médico en AYMA busca integrar salud, hábitos y estilo de vida para ayudar a las personas a entender mejor su cuerpo y sostener bienestar a largo plazo. Diseñado para acompañar procesos de: prevención, energía, recuperación, salud hormonal, longevidad y optimización física y mental.",
  },
]

export const wellnessIntegralImages: ServiceTabImage[] = [
  {
    src: "/servicesTabs/servicesTabs9.png",
    alt: "Wellness integral",
  },
]
