// $1, $2, $3, $4, $5, $6, $7, $8, $9

export const truncateQuery = `
  TRUNCATE TABLE public.product_variant CASCADE;
  TRUNCATE TABLE public.product CASCADE;
  TRUNCATE TABLE public.category_secondary CASCADE;
  TRUNCATE TABLE public.category_main CASCADE;
  
  ALTER SEQUENCE public.category_main_id_seq RESTART WITH 1;
  ALTER SEQUENCE public.category_secondary_id_seq RESTART WITH 1;
  ALTER SEQUENCE public.product_id_seq RESTART WITH 1;
  ALTER SEQUENCE public.product_variant_id_seq RESTART WITH 1;`;

export const mainCategoriesQuery = `
  INSERT INTO public.category_main (name, slug, description)
  VALUES ($1, $2, $3)`;

export const mainCategories = [
  {
    name: "Auriculares",
    slug: "auriculares",
    description:
      "Sonido personal sin ataduras. Diseñados para aislarte del ruido o acompañarte en movimiento.",
  },
  {
    name: "Altavoces Bluetooth",
    slug: "altavoces-bluetooth",
    description:
      "Potencia portátil. Resistentes al agua y listos para llevar la música donde tú vayas.",
  },
  {
    name: "Audio Hogar",
    slug: "audio-hogar",
    description:
      "La experiencia del cine y la alta fidelidad en la comodidad de tu salón.",
  },
];

export const secondaryCategoriesQuery = `INSERT INTO public.category_secondary
  (main_id, name, slug, description)
  VALUES ($1, $2, $3, $4)`;

export const secondaryCategories = [
  // Hijos de 'Auriculares' (ID 1)
  {
    main_id: 1,
    name: "Auriculares de Diadema",
    slug: "diadema",
    description:
      "Máximo confort y cancelación de ruido para sumergirte en tu propia burbuja.",
  },
  {
    main_id: 1,
    name: "Auriculares de Botón",
    slug: "boton",
    description:
      "Ligeros, discretos y con estuche de carga. La libertad del formato True Wireless.",
  },

  // Hijos de 'Altavoces Bluetooth' (ID 2)
  {
    main_id: 2,
    name: "Altavoces Bluetooth",
    slug: "portatiles",
    description:
      "Desde tamaños de bolsillo hasta bestias para fiestas. Batería para todo el día y resistencia total.",
  },

  // Hijos de 'Audio Hogar' (ID 3)
  {
    main_id: 3,
    name: "Barras de Sonido",
    slug: "barras-sonido",
    description:
      "Estética minimalista y sonido de cine. La mejora inmediata que tu TV necesita.",
  },
  {
    main_id: 3,
    name: "Altavoces HiFi",
    slug: "altavoces-hifi",
    description:
      "Audio de alta resolución y diseño de mobiliario. Para quienes escuchan cada detalle.",
  },
];

export const productsQuery = `INSERT INTO public.product
(category_id, name, slug, price, description, feature_1, feature_2, feature_3, specs)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

export const products = [
  // --- Categoría: Auriculares de Diadema (ID 1) ---
  {
    category_id: 1,
    name: "V-Mute Core",
    slug: "v-mute-core",
    price: 89.0,
    description:
      "Lo esencial, perfeccionado. Un diseño minimalista construido en policarbonato mate de alta resistencia. Pensados para quienes buscan un sonido honesto, ligero y cómodo para el uso diario sin complicaciones innecesarias.",
    feature_1: "Ultraligeros: Solo 210g. Olvidarás que los llevas puestos.",
    feature_2:
      "Batería 24h: Energía suficiente para una semana completa de trayectos.",
    feature_3:
      "Graves Profundos: Firma sonora V-Bass calibrada para música moderna.",
    specs: {
      Tipo: "Circumaural Cerrado",
      Driver: "Dinámico de 32mm con imanes de Neodimio",
      "Respuesta de Frecuencia": "20Hz - 20kHz",
      Impedancia: "32 Ohms",
      Sensibilidad: "102 dB SPL @ 1kHz",
      Conectividad: "Bluetooth 5.2 / Jack 3.5mm",
      Batería: "30h reproducción continua",
      "Tiempo de Carga": "2 horas (USB-C)",
      Micrófono: "MEMS Omnidireccional con cVc 6.0",
      "Codecs de Audio": ["SBC", "AAC"],
      Materiales: ["Policarbonato Mate", "Cuero Vegano", "Espuma de Memoria"],
    },
  },
  {
    category_id: 1,
    name: "V-Mute Advance",
    slug: "v-mute-advance",
    price: 159.0,
    description:
      "El equilibrio perfecto entre silencio y sonido. Incorpora nuestra tecnología de Cancelación Activa de Ruido (ANC) híbrida y acabados en piel sintética premium. La herramienta definitiva para la oficina o tus viajes de negocios.",
    feature_1: "ANC Híbrido: Filtra hasta 35dB de ruido de tráfico y oficinas.",
    feature_2:
      "Conexión Multipunto: Conectados al portátil y al móvil simultáneamente.",
    feature_3:
      "Smart Sensors: La música se pausa automáticamente si te los quitas.",
    specs: {
      Tipo: "Circumaural con ANC Híbrido",
      Driver: "Dinámico de 40mm Titanium-Coated",
      "Respuesta de Frecuencia": "20Hz - 20kHz",
      "Cancelación de Ruido": "Híbrida (Feedforward + Feedback)",
      Conectividad: "Bluetooth 5.3 Multipunto",
      Batería: "35h (ANC On) / 50h (ANC Off)",
      "Carga Rápida": "10 min carga = 3h reproducción",
      Micrófonos: "4 micrófonos (2 voz + 2 ANC)",
      "Codecs de Audio": ["AAC", "aptX", "SBC"],
      "App Soporte": "V-Audio Connect (iOS/Android)",
    },
  },
  {
    category_id: 1,
    name: "V-Mute Pro Master",
    slug: "v-mute-pro",
    price: 299.0,
    description:
      "Sonido Puro. Sin Interrupciones. La joya de la corona diseñada con diafragmas de biocelulosa y algoritmos adaptativos de última generación. Para el audiófilo que busca el silencio absoluto y una fidelidad sin concesiones.",
    feature_1:
      "ANC Inteligente 2.0: Adaptación al entorno acústico en tiempo real.",
    feature_2:
      "Biocelulosa: Drivers orgánicos para una respuesta de transitorios ultrarrápida.",
    feature_3:
      "Hi-Res Wireless: Certificación de audio de alta resolución sin cables.",
    specs: {
      Tipo: "Circumaural Premium ANC",
      Driver: "40mm Biocelulosa de borde libre",
      "Respuesta de Frecuencia": "10Hz - 40kHz (Hi-Res Certified)",
      Conectividad: "Bluetooth 5.4 / USB-C Audio (DAC Integrado)",
      Batería: "40h (ANC activado) / 60h (ANC desactivado)",
      "Carga Rápida": "10 min de carga = 5h de reproducción",
      Peso: "250g",
      Micrófonos: "8 micrófonos con beamforming para llamadas cristalinas",
      "Codecs de Audio": ["LDAC", "aptX Adaptive", "AAC"],
      Procesador: "Dual Core V1 Audio Processor",
    },
  },

  // --- Categoría: Auriculares de Botón (ID 2) ---
  {
    category_id: 2,
    name: "V-Flow Go",
    slug: "v-flow-go",
    price: 69.0,
    description:
      'Tu música en movimiento. Diseñados para resistir, estos auriculares compactos vienen en un estuche con acabado "piedra de río" suave al tacto. El compañero ideal para el gimnasio o el metro.',
    feature_1:
      "Resistencia IPX5: Soportan lluvia, sudor y entrenamientos intensos.",
    feature_2: "Ajuste Secure-Twist: No se caen, te muevas como te muevas.",
    feature_3:
      "Touch Control: Controla volumen, pistas y asistente con toques intuitivos.",
    specs: {
      Tipo: "True Wireless In-Ear",
      Driver: "Dinámico 8mm de grafeno",
      Batería: "6h audífonos + 18h en estuche (24h total)",
      Conexión: "Bluetooth 5.3",
      Latencia: "Modo Gaming de baja latencia (60ms)",
      Peso: "4.2g por auricular",
      Resistencia: "IPX5 (Agua y Polvo)",
      "Codecs de Audio": ["SBC", "AAC"],
      Contenido: ["3 pares de almohadillas (S/M/L)", "Cable USB-C"],
    },
  },
  {
    category_id: 2,
    name: "V-Flow ANC",
    slug: "v-flow-anc",
    price: 149.0,
    description:
      "Silencio de bolsillo. Toda la tecnología de la serie Mute condensada en un diseño ergonómico. Sumérgete en un sonido inmersivo con una cancelación de ruido líder en su clase y un perfil sonoro personalizable.",
    feature_1: "Inmersión Total: ANC ajustable en 10 niveles desde la app.",
    feature_2:
      "Voz Cristalina: Algoritmos de IA para limpiar tu voz en llamadas con viento.",
    feature_3:
      "Carga Inalámbrica: Estuche compatible con cargadores Qi estándar.",
    specs: {
      Tipo: "True Wireless ANC Premium",
      Driver: "11mm Compuesto (Woofer + Tweeter armadura balanceada)",
      Batería: "8h (ANC off) / 6h (ANC on) + 24h estuche",
      Conexión: "Bluetooth 5.4 Multipunto",
      Micrófonos: "3 por lado (6 total) con malla anti-viento",
      "Codecs de Audio": ["LDAC", "AAC", "SBC"],
      Sensores: "Proximidad (Auto-Pause) y Hall Switch",
      Carga: "USB-C y Wireless Qi",
    },
  },

  // --- Categoría: Altavoces Bluetooth (ID 3) ---
  {
    category_id: 3,
    name: "V-Roam Mini",
    slug: "v-roam-mini",
    price: 59.0,
    description:
      "Pequeño pero matón. Un cubo engomado listo para la aventura. Cabe en la palma de tu mano pero tiene la ingeniería acústica necesaria para llenar una habitación pequeña con sonido rico y detallado.",
    feature_1:
      "Clip Integrado: Engánchalo a tu mochila, tienda de campaña o manillar.",
    feature_2: "IP67: Totalmente sumergible en agua y resistente a la arena.",
    feature_3:
      "Modo Stereo Party: Empareja dos unidades para un sonido estéreo real.",
    specs: {
      Potencia: "5W RMS Mono",
      Transductor: "1x 40mm Full Range + Radiador Pasivo Trasero",
      Batería: "10 horas de reproducción (al 50% volumen)",
      Dimensiones: "8 x 8 x 4 cm",
      Peso: "200g",
      Resistencia: "IP67 (1 metro profundidad por 30 min)",
      Conectividad: "Bluetooth 5.1",
      Material: "TPU reforzado anti-golpes",
    },
  },
  {
    category_id: 3,
    name: "V-Roam Beast",
    slug: "v-roam-beast",
    price: 329.0,
    description:
      "La fiesta empieza aquí. Potencia bruta para exteriores con unos graves que golpean el pecho. Diseñado para resistir los elementos y durar todo el fin de semana sin pasar por el enchufe.",
    feature_1:
      "Powerbank Integrado: Carga tu móvil usando la inmensa batería del altavoz.",
    feature_2:
      "Graves Monstruosos: Radiadores pasivos laterales visibles que vibran al ritmo.",
    feature_3:
      "Diseño Ergonómico: Asa de transporte metálica integrada en el chasis.",
    specs: {
      Configuración: "Estéreo de 4 vías",
      "Potencia AC": "2x 65W Woofer + 2x 40W Tweeter (210W Total)",
      "Potencia Batería": "2x 60W Woofer + 2x 40W Tweeter (200W Total)",
      Batería: "99.02Wh Li-ion (28h reproducción)",
      "Tiempo de Carga": "3.5 horas",
      "Respuesta de Frecuencia": "37Hz - 20 kHz",
      Resistencia: "IP67",
      Dimensiones: "51 x 26 x 21 cm",
      Peso: "5.89 kg",
      Entradas: "Bluetooth 5.3, Aux In 3.5mm, USB-A (Powerbank)",
    },
  },

  // --- Categoría: Barras de Sonido (ID 4) ---
  {
    category_id: 4,
    name: "V-Stage Solo",
    slug: "v-stage-solo",
    price: 199.0,
    description:
      'Mejora tu TV al instante. Barra de sonido 2.1 "All-in-one" con subwoofers integrados en el chasis. Perfecta para salones minimalistas o dormitorios donde el espacio es un lujo, pero el sonido no es negociable.',
    feature_1:
      'Voces Claras: Modo "Dialogue Enhancement" para no perder detalle en las pelis.',
    feature_2:
      "Sin Subwoofer Externo: Los graves internos ahorran espacio sin sacrificar pegada.",
    feature_3:
      "HDMI ARC: Controla el volumen directamente con el mando de tu TV.",
    specs: {
      Canales: "2.1 Estéreo Integrado",
      Potencia: "120W Total Peak",
      Drivers: "2x Full Range + 2x Subwoofers Integrados",
      Decodificación: "Dolby Digital",
      Conexiones: "HDMI ARC, Óptico, Bluetooth 5.0, USB",
      Dimensiones: "600 x 64 x 90 mm",
      Montaje: "Incluye kit de soporte de pared",
      "Modos de Sonido": ["Cine", "Música", "Noticias", "Noche"],
    },
  },
  {
    category_id: 4,
    name: "V-Stage Cinema 300",
    slug: "v-stage-cinema",
    price: 549.0,
    description:
      "Experiencia inmersiva 5.0 real. Olvídate de los cables traseros. Esta barra utiliza la tecnología MultiBeam para rebotar el sonido en las paredes y crear una burbuja de audio que te envuelve completamente.",
    feature_1:
      "Sonido Surround 5.0: Envolvente virtual calibrado por procesador DSP.",
    feature_2:
      "Streaming Hi-Fi: Compatible con AirPlay 2, Chromecast y Spotify Connect.",
    feature_3:
      "Calibración Room: El micrófono interno analiza tu sala y ajusta la acústica.",
    specs: {
      Sistema: "5.0 canales con MultiBeam",
      "Potencia Total": "450W (Max)",
      Drivers: "5x Drivers tipo Pista + 4x Radiadores Pasivos",
      "Respuesta de Frecuencia": "50Hz - 20kHz",
      Tecnología: "Virtual Dolby Atmos",
      Entradas: "HDMI eARC, Entrada Óptica, WiFi 6, Bluetooth 5.2",
      Dimensiones: "940 x 50,5 x 104 mm",
      Peso: "2,9 kg",
      "Smart Home": "Funciona con Google Home y Alexa",
    },
  },

  // --- Categoría: Altavoces HiFi (ID 5) ---
  {
    category_id: 5,
    name: "V-Sense Mini",
    slug: "v-sense-mini",
    price: 89.0,
    description:
      "Inteligencia ambiental. Un altavoz inteligente que no parece tecnología, sino decoración. Recubierto de tejido acústico Kvadrat y con una base de madera sostenible. Pequeño, discreto, pero con una presencia sonora sorprendente.",
    feature_1:
      "Sonido 360º: Un driver omnidireccional llena la habitación uniformemente.",
    feature_2:
      "Hub Domótico: Zigbee y Matter integrados para controlar tus luces.",
    feature_3:
      "Privacidad Real: Interruptor físico para desconectar los micrófonos.",
    specs: {
      Configuración: "Mono 360 grados",
      Potencia: "15W RMS",
      Drivers: "1x 40mm Full Range + 2x Radiadores Pasivos",
      Micrófonos: "Array de 3 micrófonos de largo alcance",
      Conectividad: "WiFi Dual Band, Bluetooth 5.4, Thread (Matter)",
      Asistentes: "Compatible con Alexa y Google Assistant",
      Materiales: "Tejido Kvadrat, Plástico reciclado al 70%",
      Dimensiones: "10 x 10 x 9 cm",
      Peso: "320g",
    },
  },
];

export const variantsQuery = `INSERT INTO public.product_variant
  (product_id, slug, color, price, photos, stock_quantity)
  VALUES ($1, $2, $3, $4, $5, $6)`;

export const variants = [
  {
    id: 1,
    slug: "v-mute-core-black",
    color: "BLACK",
    price: 89.0,
    stock: 150,
    photos: "",
  },
  {
    id: 1,
    slug: "v-mute-core-red",
    color: "RED",
    price: 89.0,
    stock: 80,
    photos: "",
  },
  {
    id: 1,
    slug: "v-mute-core-white",
    color: "WHITE",
    price: 89.0,
    stock: 100,
    photos: "",
  },
  {
    id: 2,
    slug: "v-mute-advance-black",
    color: "BLACK",
    price: 159.0,
    stock: 120,
    photos: "",
  },
  {
    id: 2,
    slug: "v-mute-advance-red",
    color: "RED",
    price: 159.0,
    stock: 45,
    photos: "",
  },
  {
    id: 2,
    slug: "v-mute-advance-white",
    color: "WHITE",
    price: 159.0,
    stock: 60,
    photos: "",
  },

  {
    id: 3,
    slug: "v-mute-pro-black",
    color: "BLACK",
    price: 299.0,
    stock: 50,
    photos: "",
  },
  {
    id: 3,
    slug: "v-mute-pro-red",
    color: "RED",
    price: 299.0,
    stock: 20,
    photos: "",
  },
  {
    id: 3,
    slug: "v-mute-pro-white",
    color: "WHITE",
    price: 299.0,
    stock: 30,
    photos: "",
  },

  {
    id: 4,
    slug: "v-flow-go-black",
    color: "BLACK",
    price: 69.0,
    stock: 200,
    photos: "",
  },
  {
    id: 4,
    slug: "v-flow-go-red",
    color: "RED",
    price: 69.0,
    stock: 100,
    photos: "",
  },
  {
    id: 4,
    slug: "v-flow-go-white",
    color: "WHITE",
    price: 69.0,
    stock: 150,
    photos: "",
  },

  {
    id: 5,
    slug: "v-flow-anc-black",
    color: "BLACK",
    price: 149.0,
    stock: 90,
    photos: "",
  },
  {
    id: 5,
    slug: "v-flow-anc-red",
    color: "RED",
    price: 149.0,
    stock: 40,
    photos: "",
  },
  {
    id: 5,
    slug: "v-flow-anc-white",
    color: "WHITE",
    price: 149.0,
    stock: 60,
    photos: "",
  },

  {
    id: 6,
    slug: "v-roam-mini-black",
    color: "BLACK",
    price: 59.0,
    stock: 300,
    photos: "",
  },
  {
    id: 6,
    slug: "v-roam-mini-red",
    color: "RED",
    price: 59.0,
    stock: 150,
    photos: "",
  },
  {
    id: 6,
    slug: "v-roam-mini-white",
    color: "WHITE",
    price: 59.0,
    stock: 100,
    photos: "",
  },

  {
    id: 7,
    slug: "v-roam-beast-black",
    color: "BLACK",
    price: 329.0,
    stock: 40,
    photos: "",
  },
  {
    id: 7,
    slug: "v-roam-beast-red",
    color: "RED",
    price: 329.0,
    stock: 15,
    photos: "",
  },
  {
    id: 7,
    slug: "v-roam-beast-white",
    color: "WHITE",
    price: 329.0,
    stock: 20,
    photos: "",
  },

  {
    id: 8,
    slug: "v-stage-solo-black",
    color: "BLACK",
    price: 199.0,
    stock: 60,
    photos: "",
  },
  {
    id: 8,
    slug: "v-stage-solo-red",
    color: "RED",
    price: 199.0,
    stock: 10,
    photos: "",
  },
  {
    id: 8,
    slug: "v-stage-solo-white",
    color: "WHITE",
    price: 199.0,
    stock: 30,
    photos: "",
  },

  {
    id: 9,
    slug: "v-stage-cinema-black",
    color: "BLACK",
    price: 549.0,
    stock: 25,
    photos: "",
  },
  {
    id: 9,
    slug: "v-stage-cinema-red",
    color: "RED",
    price: 549.0,
    stock: 5,
    photos: "",
  },
  {
    id: 9,
    slug: "v-stage-cinema-white",
    color: "WHITE",
    price: 549.0,
    stock: 10,
    photos: "",
  },

  {
    id: 10,
    slug: "v-sense-mini-black",
    color: "BLACK",
    price: 89.0,
    stock: 110,
    photos: "",
  },
  {
    id: 10,
    slug: "v-sense-mini-white",
    color: "WHITE",
    price: 89.0,
    stock: 140,
    photos: "",
  },
];
