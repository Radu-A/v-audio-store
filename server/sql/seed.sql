-- ==============================================================================
-- 1. LIMPIEZA INICIAL (Reiniciar IDs para consistencia)
-- ==============================================================================
TRUNCATE TABLE public.shipment_item CASCADE;
TRUNCATE TABLE public.shipment CASCADE;
TRUNCATE TABLE public.order_product CASCADE;
TRUNCATE TABLE public.order CASCADE;
TRUNCATE TABLE public.item CASCADE;
TRUNCATE TABLE public.product CASCADE;
TRUNCATE TABLE public.category_secondary CASCADE;
TRUNCATE TABLE public.category_main CASCADE;

-- Reiniciar secuencias de IDs (Importante para Postgres)
ALTER SEQUENCE public.category_main_id_seq RESTART WITH 1;
ALTER SEQUENCE public.category_secondary_id_seq RESTART WITH 1;
ALTER SEQUENCE public.product_id_seq RESTART WITH 1;
ALTER SEQUENCE public.item_id_seq RESTART WITH 1;

-- ==============================================================================
-- 2. CATEGORÍAS
-- ==============================================================================

INSERT INTO public.category_main (name, slug, description)
VALUES
('Auriculares', 'auriculares', 'Sonido personal.'),
('Audio Hogar', 'audio-hogar', 'Cine y música en casa.'),
('Altavoces Portátiles', 'altavoces-portatiles', 'Música en cualquier lugar.');

INSERT INTO public.category_secondary (main_id, name, slug, description)
VALUES
(1, 'Over-Ear (Diadema)', 'over-ear', 'Diseño envolvente.'),
(1, 'In-Ear (Botón)', 'in-ear', 'Compactos y ligeros.'),
(2, 'Soundbars', 'soundbars', 'Para TV y Cine.'),
(2, 'Hi-Fi', 'hi-fi', 'Alta Fidelidad.'),
(3, 'Bluetooth', 'bluetooth', 'Sin cables.');

-- ==============================================================================
-- 3. PRODUCTOS
-- Nota: 'stock_quantity' se ignora porque el stock se calcula contando la tabla 'item'.
-- 'slug' se ha omitido ya que no estaba en el CREATE TABLE anterior, 
-- pero se puede añadir con un ALTER TABLE si lo necesitas.
-- ==============================================================================

INSERT INTO public.product (category_id, name, price, description, feature_1, feature_2, feature_3, specs)
VALUES

-- 1. V-Mute Core
(1, 'V-Mute Core', 89.00, 
'Lo esencial, perfeccionado. Diseño minimalista en policarbonato mate. Ligeros y cómodos para el uso diario sin complicaciones.',
'Ultraligeros: Solo 210g. Olvidarás que los llevas puestos.',
'Batería 24h: Suficiente para una semana de trayectos.',
'Graves Profundos: Ecualización V-Bass para música urbana.',
'{
    "Driver": "Dinámico 32mm",
    "Respuesta": "20Hz - 20kHz",
    "Conectividad": "Bluetooth 5.2",
    "Batería": "30h",
    "Carga": "USB-C Estándar",
    "Micrófono": "Integrado para llamadas",
    "Codecs": "SBC, AAC"
}'),

-- 2. V-Mute Advance
(1, 'V-Mute Advance', 159.00, 
'El equilibrio perfecto. Incorpora Cancelación Activa de Ruido (ANC) híbrida y acabados en piel sintética premium. Ideal para la oficina o viajes.',
'ANC Híbrido: Filtra el ruido del tráfico y oficinas.',
'Multipunto: Conectados al PC y al móvil a la vez.',
'Smart Sensors: La música para si te los quitas.',
'{
    "Driver": "Dinámico 40mm",
    "Respuesta": "20Hz - 20kHz",
    "Conectividad": "Bluetooth 5.3",
    "Batería": "35h (ANC On)",
    "Carga Rápida": "10 min = 2h",
    "Micrófonos": "4 micrófonos (2 voz + 2 ANC)",
    "Codecs": "AAC, aptX"
}'),

-- 3. V-Mute Pro Master
(1, 'V-Mute Pro Master', 299.00, 
'Sonido Puro. Sin Interrupciones. La joya de la corona con diafragma de biocelulosa y algoritmos adaptativos. Para quien busca el silencio absoluto.',
'ANC Inteligente: Adaptación al entorno en tiempo real.',
'Biocelulosa: Drivers orgánicos para un sonido más natural.',
'Hi-Res Wireless: Máxima calidad sin cables.',
'{
    "Tipo de Driver": "Dinámico de 40mm con diafragma de biocelulosa",
    "Respuesta de Frecuencia": "20Hz - 20kHz",
    "Conectividad": "Bluetooth 5.4 / USB-C Audio",
    "Batería": "40h (ANC activado) / 60h (ANC desactivado)",
    "Carga Rápida": "10 min de carga = 4h de reproducción",
    "Peso": "250g",
    "Micrófonos": "8 micrófonos con beamforming",
    "Codecs": "AAC, LDAC, aptX Adaptive"
}'),

-- 4. V-Flow Go
(2, 'V-Flow Go', 69.00, 
'Tu música en movimiento. Resistentes al sudor, compactos y con un estuche en acabado "piedra de río" suave al tacto.',
'Resistencia IPX5: Soportan lluvia y entrenamientos intensos.',
'Ajuste Seguro: No se caen, te muevas como te muevas.',
'Touch Control: Controla volumen y pistas con toques.',
'{
    "Driver": "Dinámico 8mm",
    "Batería": "6h + 18h en estuche",
    "Conexión": "Bluetooth 5.3",
    "Peso": "4g por auricular",
    "Codecs": "SBC, AAC"
}'),

-- 5. V-Flow ANC
(2, 'V-Flow ANC', 149.00, 
'Silencio de bolsillo. Toda la tecnología de la serie Mute condensada en un botón. Sonido inmersivo con cancelación de ruido líder en su clase.',
'Inmersión Total: ANC ajustable desde la app.',
'Voz Cristalina: IA para limpiar tu voz en llamadas.',
'Carga Inalámbrica: Estuche compatible con Qi.',
'{
    "Driver": "11mm Compuesto",
    "Batería": "8h (ANC off) / 6h (ANC on) + 24h estuche",
    "Conexión": "Bluetooth 5.4 Multipunto",
    "Micrófonos": "3 por lado con reducción de viento",
    "Codecs": "LDAC, AAC"
}'),

-- 6. V-Roam Mini
(5, 'V-Roam Mini', 59.00, 
'Pequeño pero matón. Un cubo engomado listo para la aventura. Cabe en la palma de tu mano pero llena una habitación pequeña.',
'Clip Integrado: Engánchalo a tu mochila o bici.',
'IP67: Totalmente sumergible y resistente al polvo.',
'Modo Stereo: Empareja dos para sonido estéreo.',
'{
    "Potencia": "5W RMS",
    "Transductor": "1x 40mm Full Range",
    "Batería": "10 horas",
    "Dimensiones": "8 x 8 x 4 cm",
    "Peso": "200g"
}'),

-- 7. V-Roam Beast
(5, 'V-Roam Beast', 329.00, 
'La fiesta empieza aquí. Potencia bruta para exteriores con graves que golpean el pecho. Batería para todo el fin de semana.',
'Powerbank: Carga tu móvil con la batería del altavoz.',
'Graves Monstruosos: Radiadores pasivos laterales visibles.',
'Asa de Transporte: Diseño ergonómico para moverlo fácil.',
'{
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
}'),

-- 8. V-Stage Solo
(3, 'V-Stage Solo', 199.00, 
'Mejora tu TV al instante. Barra de sonido 2.1 "All-in-one" con subwoofers integrados. Perfecta para salones minimalistas o dormitorios.',
'Voces Claras: Modo diálogo para no perder detalle.',
'Sin Subwoofer Externo: Graves internos ahorran espacio.',
'HDMI ARC: Controla el volumen con el mando de la TV.',
'{
    "Canales": "2.1 Estéreo",
    "Potencia": "120W Total",
    "Conexiones": "HDMI ARC, Óptico, Bluetooth 5.0",
    "Dimensiones": "60cm de largo",
    "Montaje": "Incluye soporte de pared"
}'),

-- 9. V-Stage Cinema 300
(3, 'V-Stage Cinema 300', 549.00, 
'Experiencia inmersiva 5.0. Sin cables traseros, sonido que te envuelve mediante tecnología MultiBeam.',
'Sonido 5.0: Envolvente virtual calibrado.',
'AirPlay & Chromecast: Streaming de alta calidad por Wifi.',
'Calibración Room: Micrófono interno ajusta el sonido a tu sala.',
'{
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
}'),

-- 10. V-Sense Monolith
(4, 'V-Sense Monolith', 999.00, 
'Escultura sonora. Altavoz activo de suelo con conectividad total. Madera curvada sostenible y tejido acústico Kvadrat. Para escuchar música, de verdad.',
'Diseño Atemporal: Parece un mueble de diseño, suena como un concierto.',
'Phono Stage: Conecta tu tocadiscos directamente.',
'Multiroom: Sincroniza con otros V-Audio en la casa.',
'{
    "Configuración": "3 vías Activo (Tri-amplificado)",
    "Potencia": "300W RMS Clase D",
    "Drivers": "1x Woofer 6.5p, 1x Mid 4p, 1x Tweeter Cinta",
    "Entradas": "HDMI eARC, Phono (RCA), Óptico, Line-In",
    "Streaming": "Spotify Connect, Tidal Connect, Roon Ready",
    "Dimensiones": "85 x 25 x 30 cm",
    "Peso": "15 kg"
}');

-- ==============================================================================
-- 4. GENERACIÓN DE INVENTARIO (ITEMS)
-- Generamos 5 items disponibles para cada producto insertado automáticamente.
-- Esto asegura que haya stock sin necesidad de insertar 1000 líneas manualmente.
-- ==============================================================================

INSERT INTO public.item (product_id, serial, unit_cost, color, status)
SELECT 
    p.id as product_id,
    -- Generar serial tipo 'PROD-001-SN-1024'
    UPPER(SUBSTRING(p.name FROM 1 FOR 3)) || '-' || p.id || '-SN-' || (1000 + gs.num) as serial,
    (p.price * 0.60) as unit_cost, -- Coste estimado al 60% del PVP
    CASE WHEN gs.num % 2 = 0 THEN 'NEGRO' ELSE 'BLANCO' END as color, -- Alternar colores
    'AVAILABLE'::public.inventory_status
FROM public.product p
CROSS JOIN generate_series(1, 5) as gs(num);