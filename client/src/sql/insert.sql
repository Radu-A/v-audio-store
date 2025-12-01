-- ==============================================================================
-- 1. LIMPIEZA INICIAL
-- ==============================================================================
TRUNCATE TABLE public.item CASCADE;
TRUNCATE TABLE public.product CASCADE;
TRUNCATE TABLE public.category_secondary CASCADE;
TRUNCATE TABLE public.category_main CASCADE;

-- ==============================================================================
-- 2. CATEGORÍAS (Estructura Base)
-- ==============================================================================

INSERT INTO public.category_main (id, name, slug, description)
OVERRIDING SYSTEM VALUE VALUES
(1, 'Auriculares', 'auriculares', 'Sonido personal.'),
(2, 'Audio Hogar', 'audio-hogar', 'Cine y música en casa.'),
(3, 'Altavoces Portátiles', 'altavoces-portatiles', 'Música en cualquier lugar.');

INSERT INTO public.category_secondary (id, main_id, name, slug, description)
OVERRIDING SYSTEM VALUE VALUES
(1, 1, 'Over-Ear (Diadema)', 'over-ear', 'Diseño envolvente.'),
(2, 1, 'In-Ear (Botón)', 'in-ear', 'Compactos y ligeros.'),
(3, 2, 'Soundbars', 'soundbars', 'Para TV y Cine.'),
(4, 2, 'Hi-Fi', 'hi-fi', 'Alta Fidelidad.'),
(5, 3, 'Bluetooth', 'bluetooth', 'Sin cables.');

-- ==============================================================================
-- 3. CATÁLOGO DE PRODUCTOS V-AUDIO
-- ==============================================================================

INSERT INTO public.product (category_id, name, slug, price, description, stock_quantity, specs)
VALUES

-- ------------------------------------------------------------------------------
-- A. AURICULARES DIADEMA (3 Modelos)
-- ------------------------------------------------------------------------------

-- 1. GAMA ENTRADA: V-Mute Core
(1, 'V-Mute Core', 'v-mute-core', 89.00, 
'Lo esencial, perfeccionado. Diseño minimalista en policarbonato mate. Ligeros y cómodos para el uso diario sin complicaciones.', 
100, 
'{
  "marketing_features": [
    {"title": "Ultraligeros", "body": "Solo 210g. Olvidarás que los llevas puestos."},
    {"title": "Batería 24h", "body": "Suficiente para una semana de trayectos."},
    {"title": "Graves Profundos", "body": "Ecualización V-Bass para música urbana."}
  ],
  "tech_specs": {
    "Driver": "Dinámico 32mm",
    "Respuesta": "20Hz - 20kHz",
    "Conectividad": "Bluetooth 5.2",
    "Batería": "30h",
    "Carga": "USB-C Estándar",
    "Micrófono": "Integrado para llamadas",
    "Codecs": "SBC, AAC"
  }
}'),

-- 2. GAMA MEDIA: V-Mute Advance
(1, 'V-Mute Advance', 'v-mute-advance', 159.00, 
'El equilibrio perfecto. Incorpora Cancelación Activa de Ruido (ANC) híbrida y acabados en piel sintética premium. Ideal para la oficina o viajes.', 
75, 
'{
  "marketing_features": [
    {"title": "ANC Híbrido", "body": "Filtra el ruido del tráfico y oficinas."},
    {"title": "Multipunto", "body": "Conectados al PC y al móvil a la vez."},
    {"title": "Smart Sensors", "body": "La música para si te los quitas."}
  ],
  "tech_specs": {
    "Driver": "Dinámico 40mm",
    "Respuesta": "20Hz - 20kHz",
    "Conectividad": "Bluetooth 5.3",
    "Batería": "35h (ANC On)",
    "Carga Rápida": "10 min = 2h",
    "Micrófonos": "4 micrófonos (2 voz + 2 ANC)",
    "Codecs": "AAC, aptX"
  }
}'),

-- 3. GAMA ALTA (Tus specs): V-Mute Pro Master
(1, 'V-Mute Pro Master', 'v-mute-pro-master', 299.00, 
'Sonido Puro. Sin Interrupciones. La joya de la corona con diafragma de biocelulosa y algoritmos adaptativos. Para quien busca el silencio absoluto.', 
40, 
'{
  "marketing_features": [
    {"title": "ANC Inteligente", "body": "Adaptación al entorno en tiempo real."},
    {"title": "Biocelulosa", "body": "Drivers orgánicos para un sonido más natural."},
    {"title": "Hi-Res Wireless", "body": "Máxima calidad sin cables."}
  ],
  "tech_specs": {
    "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
    "Respuesta de Frecuencia": "20Hz - 20kHz",
    "Conectividad": "Bluetooth 5.4 / USB-C Audio",
    "Batería": "40h (ANC activado) / 60h (ANC desactivado)",
    "Carga Rápida": "10 min de carga = 4h de reproducción",
    "Peso": "250g",
    "Micrófonos": "8 micrófonos con beamforming",
    "Codecs": "AAC, LDAC, aptX Adaptive"
  }
}'),

-- ------------------------------------------------------------------------------
-- B. AURICULARES IN-EAR (2 Modelos)
-- ------------------------------------------------------------------------------

-- 4. GAMA SPORT/DIARIA: V-Flow Go
(2, 'V-Flow Go', 'v-flow-go', 69.00, 
'Tu música en movimiento. Resistentes al sudor, compactos y con un estuche en acabado "piedra de río" suave al tacto.', 
150, 
'{
  "marketing_features": [
    {"title": "Resistencia IPX5", "body": "Soportan lluvia y entrenamientos intensos."},
    {"title": "Ajuste Seguro", "body": "No se caen, te muevas como te muevas."},
    {"title": "Touch Control", "body": "Controla volumen y pistas con toques."}
  ],
  "tech_specs": {
    "Driver": "Dinámico 8mm",
    "Batería": "6h + 18h en estuche",
    "Conexión": "Bluetooth 5.3",
    "Peso": "4g por auricular",
    "Codecs": "SBC, AAC"
  }
}'),

-- 5. GAMA ALTA: V-Flow ANC
(2, 'V-Flow ANC', 'v-flow-anc', 149.00, 
'Silencio de bolsillo. Toda la tecnología de la serie Mute condensada en un botón. Sonido inmersivo con cancelación de ruido líder en su clase.', 
80, 
'{
  "marketing_features": [
    {"title": "Inmersión Total", "body": "ANC ajustable desde la app."},
    {"title": "Voz Cristalina", "body": "IA para limpiar tu voz en llamadas."},
    {"title": "Carga Inalámbrica", "body": "Estuche compatible con Qi."}
  ],
  "tech_specs": {
    "Driver": "11mm Compuesto",
    "Batería": "8h (ANC off) / 6h (ANC on) + 24h estuche",
    "Conexión": "Bluetooth 5.4 Multipunto",
    "Micrófonos": "3 por lado con reducción de viento",
    "Codecs": "LDAC, AAC"
  }
}'),

-- ------------------------------------------------------------------------------
-- C. ALTAVOCES BLUETOOTH (2 Modelos)
-- ------------------------------------------------------------------------------

-- 6. PORTÁTIL: V-Roam Mini
(5, 'V-Roam Mini', 'v-roam-mini', 59.00, 
'Pequeño pero matón. Un cubo engomado listo para la aventura. Cabe en la palma de tu mano pero llena una habitación pequeña.', 
120, 
'{
  "marketing_features": [
    {"title": "Clip Integrado", "body": "Engánchalo a tu mochila o bici."},
    {"title": "IP67", "body": "Totalmente sumergible y resistente al polvo."},
    {"title": "Modo Stereo", "body": "Empareja dos para sonido estéreo."}
  ],
  "tech_specs": {
    "Potencia": "5W RMS",
    "Transductor": "1x 40mm Full Range",
    "Batería": "10 horas",
    "Dimensiones": "8 x 8 x 4 cm",
    "Peso": "200g"
  }
}'),

-- 7. POTENTE (Tus specs): V-Roam Beast
(5, 'V-Roam Beast', 'v-roam-beast', 329.00, 
'La fiesta empieza aquí. Potencia bruta para exteriores con graves que golpean el pecho. Batería para todo el fin de semana.', 
45, 
'{
  "marketing_features": [
    {"title": "Powerbank", "body": "Carga tu móvil con la batería del altavoz."},
    {"title": "Graves Monstruosos", "body": "Radiadores pasivos laterales visibles."},
    {"title": "Asa de Transporte", "body": "Diseño ergonómico para moverlo fácil."}
  ],
  "tech_specs": {
    "General": {
       "Potencia AC": "2x 65W Woofer + 2x 40W Tweeter",
       "Potencia Bat": "2x 60W Woofer + 2x 40W Tweeter",
       "Batería": "99.02Wh Li-ion (28h reproducción)",
       "Peso": "5.89 kg",
       "Dimensiones": "51 x 26 x 21 cm"
    },
    "Audio": {
       "Respuesta": "37Hz - 20 kHz",
       "SNR": "> 80 dB",
       "Drivers": "2x Woofers + 2x Tweeters"
    }
  }
}'),

-- ------------------------------------------------------------------------------
-- D. SOUNDBARS (2 Modelos)
-- ------------------------------------------------------------------------------

-- 8. COMPACTA: V-Stage Solo
(3, 'V-Stage Solo', 'v-stage-solo', 199.00, 
'Mejora tu TV al instante. Barra de sonido 2.1 "All-in-one" con subwoofers integrados. Perfecta para salones minimalistas o dormitorios.', 
60, 
'{
  "marketing_features": [
    {"title": "Voces Claras", "body": "Modo diálogo para no perder detalle."},
    {"title": "Sin Subwoofer Externo", "body": "Graves internos ahorran espacio."},
    {"title": "HDMI ARC", "body": "Controla el volumen con el mando de la TV."}
  ],
  "tech_specs": {
    "Canales": "2.1 Estéreo",
    "Potencia": "120W Total",
    "Conexiones": "HDMI ARC, Óptico, Bluetooth 5.0",
    "Dimensiones": "60cm de largo",
    "Montaje": "Incluye soporte de pared"
  }
}'),

-- 9. CINEMA (Tus specs): V-Stage Cinema 300
(3, 'V-Stage Cinema 300', 'v-stage-cinema', 549.00, 
'Experiencia inmersiva 5.0. Sin cables traseros, sonido que te envuelve mediante tecnología MultiBeam.', 
25, 
'{
  "marketing_features": [
    {"title": "Sonido 5.0", "body": "Envolvente virtual calibrado."},
    {"title": "AirPlay & Chromecast", "body": "Streaming de alta calidad por Wifi."},
    {"title": "Calibración Room", "body": "Micrófono interno ajusta el sonido a tu sala."}
  ],
  "tech_specs": {
    "General": {
      "Modelo": "BAR 300MK2",
      "Sistema": "5.0 canales",
      "Potencia Total": "450W (Max)",
      "Dimensiones": "940 x 50,5 x 104 mm",
      "Peso": "2,9 kg"
    },
    "Audio": {
      "Drivers": "5x Pista + 4x Tweeters",
      "Respuesta": "50Hz - 20kHz",
      "Entradas": "Óptica, BT, USB, Wifi"
    }
  }
}'),

-- ------------------------------------------------------------------------------
-- E. HIFI (1 Modelo)
-- ------------------------------------------------------------------------------

-- 10. FLAGSHIP: V-Sense Monolith
(4, 'V-Sense Monolith', 'v-sense-monolith', 999.00, 
'Escultura sonora. Altavoz activo de suelo con conectividad total. Madera curvada sostenible y tejido acústico Kvadrat. Para escuchar música, de verdad.', 
10, 
'{
  "marketing_features": [
    {"title": "Diseño Atemporal", "body": "Parece un mueble de diseño, suena como un concierto."},
    {"title": "Phono Stage", "body": "Conecta tu tocadiscos directamente."},
    {"title": "Multiroom", "body": "Sincroniza con otros V-Audio en la casa."}
  ],
  "tech_specs": {
    "Configuración": "3 vías Activo (Tri-amplificado)",
    "Potencia": "300W RMS Clase D",
    "Drivers": "1x Woofer 6.5p, 1x Mid 4p, 1x Tweeter Cinta",
    "Entradas": "HDMI eARC, Phono (RCA), Óptico, Line-In",
    "Streaming": "Spotify Connect, Tidal Connect, Roon Ready",
    "Dimensiones": "85 x 25 x 30 cm",
    "Peso": "15 kg"
  }
}');