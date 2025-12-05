-- ==============================================================================
-- 1. LIMPIEZA INICIAL (Reiniciar IDs para consistencia)
-- ==============================================================================
TRUNCATE TABLE public.product_variant CASCADE;
TRUNCATE TABLE public.product CASCADE;
TRUNCATE TABLE public.category_secondary CASCADE;
TRUNCATE TABLE public.category_main CASCADE;

-- Reiniciar secuencias de IDs (Importante para Postgres)
ALTER SEQUENCE public.category_main_id_seq RESTART WITH 1;
ALTER SEQUENCE public.category_secondary_id_seq RESTART WITH 1;
ALTER SEQUENCE public.product_id_seq RESTART WITH 1;
ALTER SEQUENCE public.product_variant_id_seq RESTART WITH 1;

-- ==============================================================================
-- 2. CATEGORÍAS
-- ==============================================================================

-- 1. Categorías Principales
INSERT INTO public.category_main (name, slug, description) VALUES
('Audio Personal', 'audio-personal', 'Dispositivos diseñados para una experiencia de escucha íntima y portátil.'),
('Audio Hogar', 'audio-hogar', 'Sistemas de sonido para llenar tus espacios vitales de alta fidelidad.');

-- 2. Categorías Secundarias (Asumiendo IDs 1 y 2 para las principales)
INSERT INTO public.category_secondary (main_id, name, slug, description) VALUES
(1, 'Auriculares de Diadema', 'diadema', 'Comodidad superior y aislamiento total para largas sesiones de escucha.'),
(1, 'Auriculares In-Ear', 'in-ear', 'Libertad de movimiento con tecnología True Wireless (TWS).'),
(2, 'Barras de Sonido', 'soundbars', 'Lleva la experiencia del cine a tu salón con audio envolvente.'),
(2, 'Altavoces Inteligentes', 'smart-speakers', 'Sonido de alta fidelidad con conectividad total para el hogar moderno.'),
(2, 'Altavoces Portátiles', 'portatiles', 'Resistencia y potencia para llevar tu música a cualquier parte.');

-- ==============================================================================
-- 3. PRODUCTOS
-- ==============================================================================

INSERT INTO public.product (category_id, name, slug, price, description, feature_1, feature_2, feature_3, specs) VALUES

-- 1. V-Mute Core (Cat: Diadema - ID 1)
(1, 'V-Mute Core', 'v-mute-core', 89.00, 
'Lo esencial, perfeccionado. Un diseño minimalista construido en policarbonato mate de alta resistencia. Pensados para quienes buscan un sonido honesto, ligero y cómodo para el uso diario sin complicaciones innecesarias.',
'Ultraligeros: Solo 210g. Olvidarás que los llevas puestos.',
'Batería 24h: Energía suficiente para una semana completa de trayectos.',
'Graves Profundos: Firma sonora V-Bass calibrada para música moderna.',
'{
    "Tipo": "Circumaural Cerrado",
    "Driver": "Dinámico de 32mm con imanes de Neodimio",
    "Respuesta de Frecuencia": "20Hz - 20kHz",
    "Impedancia": "32 Ohms",
    "Sensibilidad": "102 dB SPL @ 1kHz",
    "Conectividad": "Bluetooth 5.2 / Jack 3.5mm",
    "Batería": "30h reproducción continua",
    "Tiempo de Carga": "2 horas (USB-C)",
    "Micrófono": "MEMS Omnidireccional con cVc 6.0",
    "Codecs de Audio": ["SBC", "AAC"],
    "Materiales": ["Policarbonato Mate", "Cuero Vegano", "Espuma de Memoria"]
}'::jsonb),

-- 2. V-Mute Advance (Cat: Diadema - ID 1)
(1, 'V-Mute Advance', 'v-mute-advance', 159.00, 
'El equilibrio perfecto entre silencio y sonido. Incorpora nuestra tecnología de Cancelación Activa de Ruido (ANC) híbrida y acabados en piel sintética premium. La herramienta definitiva para la oficina o tus viajes de negocios.',
'ANC Híbrido: Filtra hasta 35dB de ruido de tráfico y oficinas.',
'Conexión Multipunto: Conectados al portátil y al móvil simultáneamente.',
'Smart Sensors: La música se pausa automáticamente si te los quitas.',
'{
    "Tipo": "Circumaural con ANC Híbrido",
    "Driver": "Dinámico de 40mm Titanium-Coated",
    "Respuesta de Frecuencia": "20Hz - 20kHz",
    "Cancelación de Ruido": "Híbrida (Feedforward + Feedback)",
    "Conectividad": "Bluetooth 5.3 Multipunto",
    "Batería": "35h (ANC On) / 50h (ANC Off)",
    "Carga Rápida": "10 min carga = 3h reproducción",
    "Micrófonos": "4 micrófonos (2 voz + 2 ANC)",
    "Codecs de Audio": ["AAC", "aptX", "SBC"],
    "App Soporte": "V-Audio Connect (iOS/Android)"
}'::jsonb),

-- 3. V-Mute Pro (Cat: Diadema - ID 1)
(1, 'V-Mute Pro Master', 'v-mute-pro', 299.00, 
'Sonido Puro. Sin Interrupciones. La joya de la corona diseñada con diafragmas de biocelulosa y algoritmos adaptativos de última generación. Para el audiófilo que busca el silencio absoluto y una fidelidad sin concesiones.',
'ANC Inteligente 2.0: Adaptación al entorno acústico en tiempo real.',
'Biocelulosa: Drivers orgánicos para una respuesta de transitorios ultrarrápida.',
'Hi-Res Wireless: Certificación de audio de alta resolución sin cables.',
'{
    "Tipo": "Circumaural Premium ANC",
    "Driver": "40mm Biocelulosa de borde libre",
    "Respuesta de Frecuencia": "10Hz - 40kHz (Hi-Res Certified)",
    "Conectividad": "Bluetooth 5.4 / USB-C Audio (DAC Integrado)",
    "Batería": "40h (ANC activado) / 60h (ANC desactivado)",
    "Carga Rápida": "10 min de carga = 5h de reproducción",
    "Peso": "250g",
    "Micrófonos": "8 micrófonos con beamforming para llamadas cristalinas",
    "Codecs de Audio": ["LDAC", "aptX Adaptive", "AAC"],
    "Procesador": "Dual Core V1 Audio Processor"
}'::jsonb),

-- 4. V-Flow Go (Cat: In-Ear - ID 2)
(2, 'V-Flow Go', 'v-flow-go', 69.00, 
'Tu música en movimiento. Diseñados para resistir, estos auriculares compactos vienen en un estuche con acabado "piedra de río" suave al tacto. El compañero ideal para el gimnasio o el metro.',
'Resistencia IPX5: Soportan lluvia, sudor y entrenamientos intensos.',
'Ajuste Secure-Twist: No se caen, te muevas como te muevas.',
'Touch Control: Controla volumen, pistas y asistente con toques intuitivos.',
'{
    "Tipo": "True Wireless In-Ear",
    "Driver": "Dinámico 8mm de grafeno",
    "Batería": "6h audífonos + 18h en estuche (24h total)",
    "Conexión": "Bluetooth 5.3",
    "Latencia": "Modo Gaming de baja latencia (60ms)",
    "Peso": "4.2g por auricular",
    "Resistencia": "IPX5 (Agua y Polvo)",
    "Codecs de Audio": ["SBC", "AAC"],
    "Contenido": ["3 pares de almohadillas (S/M/L)", "Cable USB-C"]
}'::jsonb),

-- 5. V-Flow ANC (Cat: In-Ear - ID 2)
(2, 'V-Flow ANC', 'v-flow-anc', 149.00, 
'Silencio de bolsillo. Toda la tecnología de la serie Mute condensada en un diseño ergonómico. Sumérgete en un sonido inmersivo con una cancelación de ruido líder en su clase y un perfil sonoro personalizable.',
'Inmersión Total: ANC ajustable en 10 niveles desde la app.',
'Voz Cristalina: Algoritmos de IA para limpiar tu voz en llamadas con viento.',
'Carga Inalámbrica: Estuche compatible con cargadores Qi estándar.',
'{
    "Tipo": "True Wireless ANC Premium",
    "Driver": "11mm Compuesto (Woofer + Tweeter armadura balanceada)",
    "Batería": "8h (ANC off) / 6h (ANC on) + 24h estuche",
    "Conexión": "Bluetooth 5.4 Multipunto",
    "Micrófonos": "3 por lado (6 total) con malla anti-viento",
    "Codecs de Audio": ["LDAC", "AAC", "SBC"],
    "Sensores": "Proximidad (Auto-Pause) y Hall Switch",
    "Carga": "USB-C y Wireless Qi"
}'::jsonb),

-- 6. V-Roam Mini (Cat: Portátiles - ID 5)
(5, 'V-Roam Mini', 'v-roam-mini', 59.00, 
'Pequeño pero matón. Un cubo engomado listo para la aventura. Cabe en la palma de tu mano pero tiene la ingeniería acústica necesaria para llenar una habitación pequeña con sonido rico y detallado.',
'Clip Integrado: Engánchalo a tu mochila, tienda de campaña o manillar.',
'IP67: Totalmente sumergible en agua y resistente a la arena.',
'Modo Stereo Party: Empareja dos unidades para un sonido estéreo real.',
'{
    "Potencia": "5W RMS Mono",
    "Transductor": "1x 40mm Full Range + Radiador Pasivo Trasero",
    "Batería": "10 horas de reproducción (al 50% volumen)",
    "Dimensiones": "8 x 8 x 4 cm",
    "Peso": "200g",
    "Resistencia": "IP67 (1 metro profundidad por 30 min)",
    "Conectividad": "Bluetooth 5.1",
    "Material": "TPU reforzado anti-golpes"
}'::jsonb),

-- 7. V-Roam Beast (Cat: Portátiles - ID 5)
(5, 'V-Roam Beast', 'v-roam-beast', 329.00, 
'La fiesta empieza aquí. Potencia bruta para exteriores con unos graves que golpean el pecho. Diseñado para resistir los elementos y durar todo el fin de semana sin pasar por el enchufe.',
'Powerbank Integrado: Carga tu móvil usando la inmensa batería del altavoz.',
'Graves Monstruosos: Radiadores pasivos laterales visibles que vibran al ritmo.',
'Diseño Ergonómico: Asa de transporte metálica integrada en el chasis.',
'{
    "Configuración": "Estéreo de 4 vías",
    "Potencia AC": "2x 65W Woofer + 2x 40W Tweeter (210W Total)",
    "Potencia Batería": "2x 60W Woofer + 2x 40W Tweeter (200W Total)",
    "Batería": "99.02Wh Li-ion (28h reproducción)",
    "Tiempo de Carga": "3.5 horas",
    "Respuesta de Frecuencia": "37Hz - 20 kHz",
    "Resistencia": "IP67",
    "Dimensiones": "51 x 26 x 21 cm",
    "Peso": "5.89 kg",
    "Entradas": "Bluetooth 5.3, Aux In 3.5mm, USB-A (Powerbank)"
}'::jsonb),

-- 8. V-Stage Solo (Cat: Barras - ID 3)
(3, 'V-Stage Solo', 'v-stage-solo', 199.00, 
'Mejora tu TV al instante. Barra de sonido 2.1 "All-in-one" con subwoofers integrados en el chasis. Perfecta para salones minimalistas o dormitorios donde el espacio es un lujo, pero el sonido no es negociable.',
'Voces Claras: Modo "Dialogue Enhancement" para no perder detalle en las pelis.',
'Sin Subwoofer Externo: Los graves internos ahorran espacio sin sacrificar pegada.',
'HDMI ARC: Controla el volumen directamente con el mando de tu TV.',
'{
    "Canales": "2.1 Estéreo Integrado",
    "Potencia": "120W Total Peak",
    "Drivers": "2x Full Range + 2x Subwoofers Integrados",
    "Decodificación": "Dolby Digital",
    "Conexiones": "HDMI ARC, Óptico, Bluetooth 5.0, USB",
    "Dimensiones": "600 x 64 x 90 mm",
    "Montaje": "Incluye kit de soporte de pared",
    "Modos de Sonido": ["Cine", "Música", "Noticias", "Noche"]
}'::jsonb),

-- 9. V-Stage Cinema (Cat: Barras - ID 3)
(3, 'V-Stage Cinema 300', 'v-stage-cinema', 549.00, 
'Experiencia inmersiva 5.0 real. Olvídate de los cables traseros. Esta barra utiliza la tecnología MultiBeam para rebotar el sonido en las paredes y crear una burbuja de audio que te envuelve completamente.',
'Sonido Surround 5.0: Envolvente virtual calibrado por procesador DSP.',
'Streaming Hi-Fi: Compatible con AirPlay 2, Chromecast y Spotify Connect.',
'Calibración Room: El micrófono interno analiza tu sala y ajusta la acústica.',
'{
    "Sistema": "5.0 canales con MultiBeam",
    "Potencia Total": "450W (Max)",
    "Drivers": "5x Drivers tipo Pista + 4x Radiadores Pasivos",
    "Respuesta de Frecuencia": "50Hz - 20kHz",
    "Tecnología": "Virtual Dolby Atmos",
    "Entradas": "HDMI eARC, Entrada Óptica, WiFi 6, Bluetooth 5.2",
    "Dimensiones": "940 x 50,5 x 104 mm",
    "Peso": "2,9 kg",
    "Smart Home": "Funciona con Google Home y Alexa"
}'::jsonb),

-- 10. V-Sense Mini (Cat: Smart - ID 4) - ADAPTADO DE MONOLITH A MINI PARA COINCIDIR CON SLUGS
(4, 'V-Sense Mini', 'v-sense-mini', 89.00, 
'Inteligencia ambiental. Un altavoz inteligente que no parece tecnología, sino decoración. Recubierto de tejido acústico Kvadrat y con una base de madera sostenible. Pequeño, discreto, pero con una presencia sonora sorprendente.',
'Sonido 360º: Un driver omnidireccional llena la habitación uniformemente.',
'Hub Domótico: Zigbee y Matter integrados para controlar tus luces.',
'Privacidad Real: Interruptor físico para desconectar los micrófonos.',
'{
    "Configuración": "Mono 360 grados",
    "Potencia": "15W RMS",
    "Drivers": "1x 40mm Full Range + 2x Radiadores Pasivos",
    "Micrófonos": "Array de 3 micrófonos de largo alcance",
    "Conectividad": "WiFi Dual Band, Bluetooth 5.4, Thread (Matter)",
    "Asistentes": "Compatible con Alexa y Google Assistant",
    "Materiales": "Tejido Kvadrat, Plástico reciclado al 70%",
    "Dimensiones": "10 x 10 x 9 cm",
    "Peso": "320g"
}'::jsonb);

-- ==============================================================================
-- 4. VARIANTES
-- ==============================================================================

-- INSERT INTO public.product_variant (product_id, slug, color, price, photos, stock_quantity) VALUES

-- -- Variantes para V-Mute Core (ID 1)
-- (1, 'v-mute-core-black', 'BLACK', 89.00, '["v-mute-core-black/1.jpg", "v-mute-core-black/2.jpg", "v-mute-core-black/3.jpg"]'::jsonb, 150),
-- (1, 'v-mute-core-red', 'RED', 89.00, '["v-mute-core-red/1.jpg", "v-mute-core-red/2.jpg", "v-mute-core-red/3.jpg"]'::jsonb, 80),
-- (1, 'v-mute-core-white', 'WHITE', 89.00, '["v-mute-core-white/1.jpg", "v-mute-core-white/2.jpg", "v-mute-core-white/3.jpg"]'::jsonb, 100),

-- -- Variantes para V-Mute Advance (ID 2)
-- (2, 'v-mute-advance-black', 'BLACK', 159.00, '["v-mute-advance-black/1.jpg", "v-mute-advance-black/2.jpg", "v-mute-advance-black/3.jpg"]'::jsonb, 120),
-- (2, 'v-mute-advance-red', 'RED', 159.00, '["v-mute-advance-red/1.jpg", "v-mute-advance-red/2.jpg", "v-mute-advance-red/3.jpg"]'::jsonb, 45),
-- (2, 'v-mute-advance-white', 'WHITE', 159.00, '["v-mute-advance-white/1.jpg", "v-mute-advance-white/2.jpg", "v-mute-advance-white/3.jpg"]'::jsonb, 60),

-- -- Variantes para V-Mute Pro (ID 3)
-- (3, 'v-mute-pro-black', 'BLACK', 299.00, '["v-mute-pro-black/1.jpg", "v-mute-pro-black/2.jpg", "v-mute-pro-black/3.jpg"]'::jsonb, 50),
-- (3, 'v-mute-pro-red', 'RED', 299.00, '["v-mute-pro-red/1.jpg", "v-mute-pro-red/2.jpg", "v-mute-pro-red/3.jpg"]'::jsonb, 20),
-- (3, 'v-mute-pro-white', 'WHITE', 299.00, '["v-mute-pro-white/1.jpg", "v-mute-pro-white/2.jpg", "v-mute-pro-white/3.jpg"]'::jsonb, 30),

-- -- Variantes para V-Flow Go (ID 4)
-- (4, 'v-flow-go-black', 'BLACK', 69.00, '["v-flow-go-black/1.jpg", "v-flow-go-black/2.jpg"]'::jsonb, 200),
-- (4, 'v-flow-go-red', 'RED', 69.00, '["v-flow-go-red/1.jpg", "v-flow-go-red/2.jpg"]'::jsonb, 100),
-- (4, 'v-flow-go-white', 'WHITE', 69.00, '["v-flow-go-white/1.jpg", "v-flow-go-white/2.jpg"]'::jsonb, 150),

-- -- Variantes para V-Flow ANC (ID 5)
-- (5, 'v-flow-anc-black', 'BLACK', 149.00, '["v-flow-anc-black/1.jpg", "v-flow-anc-black/2.jpg"]'::jsonb, 90),
-- (5, 'v-flow-anc-red', 'RED', 149.00, '["v-flow-anc-red/1.jpg", "v-flow-anc-red/2.jpg"]'::jsonb, 40),
-- (5, 'v-flow-anc-white', 'WHITE', 149.00, '["v-flow-anc-white/1.jpg", "v-flow-anc-white/2.jpg"]'::jsonb, 60),

-- -- Variantes para V-Roam Mini (ID 6)
-- (6, 'v-roam-mini-black', 'BLACK', 59.00, '["v-roam-mini-black/1.jpg", "v-roam-mini-black/2.jpg"]'::jsonb, 300),
-- (6, 'v-roam-mini-red', 'RED', 59.00, '["v-roam-mini-red/1.jpg", "v-roam-mini-red/2.jpg"]'::jsonb, 150),
-- (6, 'v-roam-mini-white', 'WHITE', 59.00, '["v-roam-mini-white/1.jpg", "v-roam-mini-white/2.jpg"]'::jsonb, 100),

-- -- Variantes para V-Roam Beast (ID 7)
-- (7, 'v-roam-beast-black', 'BLACK', 329.00, '["v-roam-beast-black/1.jpg", "v-roam-beast-black/2.jpg", "v-roam-beast-black/3.jpg"]'::jsonb, 40),
-- (7, 'v-roam-beast-red', 'RED', 329.00, '["v-roam-beast-red/1.jpg", "v-roam-beast-red/2.jpg", "v-roam-beast-red/3.jpg"]'::jsonb, 15),
-- (7, 'v-roam-beast-white', 'WHITE', 329.00, '["v-roam-beast-white/1.jpg", "v-roam-beast-white/2.jpg", "v-roam-beast-white/3.jpg"]'::jsonb, 20),

-- -- Variantes para V-Stage Solo (ID 8)
-- (8, 'v-stage-solo-black', 'BLACK', 199.00, '["v-stage-solo-black/1.jpg", "v-stage-solo-black/2.jpg"]'::jsonb, 60),
-- (8, 'v-stage-solo-red', 'RED', 199.00, '["v-stage-solo-red/1.jpg", "v-stage-solo-red/2.jpg"]'::jsonb, 10), -- Edición especial quizás
-- (8, 'v-stage-solo-white', 'WHITE', 199.00, '["v-stage-solo-white/1.jpg", "v-stage-solo-white/2.jpg"]'::jsonb, 30),

-- -- Variantes para V-Stage Cinema (ID 9)
-- (9, 'v-stage-cinema-black', 'BLACK', 549.00, '["v-stage-cinema-black/1.jpg", "v-stage-cinema-black/2.jpg", "v-stage-cinema-black/3.jpg"]'::jsonb, 25),
-- (9, 'v-stage-cinema-red', 'RED', 549.00, '["v-stage-cinema-red/1.jpg", "v-stage-cinema-red/2.jpg", "v-stage-cinema-red/3.jpg"]'::jsonb, 5),
-- (9, 'v-stage-cinema-white', 'WHITE', 549.00, '["v-stage-cinema-white/1.jpg", "v-stage-cinema-white/2.jpg", "v-stage-cinema-white/3.jpg"]'::jsonb, 10),

-- -- Variantes para V-Sense Mini (ID 10)
-- (10, 'v-sense-mini-black', 'BLACK', 89.00, '["v-sense-mini-black/1.jpg", "v-sense-mini-black/2.jpg"]'::jsonb, 110),
-- (10, 'v-sense-mini-white', 'WHITE', 89.00, '["v-sense-mini-white/1.jpg", "v-sense-mini-white/2.jpg"]'::jsonb, 140);