-- ==============================================================================
-- 1. LIMPIEZA INICIAL
-- ==============================================================================
TRUNCATE TABLE public.shipment_item CASCADE;
TRUNCATE TABLE public.shipment CASCADE;
TRUNCATE TABLE public.order_product CASCADE;
TRUNCATE TABLE public.order CASCADE;
TRUNCATE TABLE public.item CASCADE;
TRUNCATE TABLE public.product CASCADE;
TRUNCATE TABLE public.category_secondary CASCADE;
TRUNCATE TABLE public.category_main CASCADE;

-- Reiniciar secuencias
ALTER SEQUENCE public.category_main_id_seq RESTART WITH 1;
ALTER SEQUENCE public.category_secondary_id_seq RESTART WITH 1;
ALTER SEQUENCE public.product_id_seq RESTART WITH 1;
ALTER SEQUENCE public.item_id_seq RESTART WITH 1;

-- ==============================================================================
-- 2. CATEGORÍAS
-- ==============================================================================
INSERT INTO public.category_main (name, slug, description) VALUES
('Auriculares', 'auriculares', 'Sonido personal.'),
('Audio Hogar', 'audio-hogar', 'Cine y música en casa.'),
('Altavoces Portátiles', 'altavoces-portatiles', 'Música en cualquier lugar.');

INSERT INTO public.category_secondary (main_id, name, slug, description) VALUES
(1, 'Over-Ear (Diadema)', 'over-ear', 'Diseño envolvente.'),
(1, 'In-Ear (Botón)', 'in-ear', 'Compactos y ligeros.'),
(2, 'Soundbars', 'soundbars', 'Para TV y Cine.'),
(2, 'Hi-Fi', 'hi-fi', 'Alta Fidelidad.'),
(3, 'Bluetooth', 'bluetooth', 'Sin cables.');

-- ==============================================================================
-- 3. PRODUCTOS
-- Cambios:
-- 1. Se añade la columna 'photos' en la definición implícita del insert.
-- 2. Se usan placeholders '{{...}}' que tu script de Node reemplazará.
-- ==============================================================================

-- NOTA: Asegúrate de haber ejecutado previamente el ALTER TABLE si la tabla ya existe,
-- o de que el CREATE TABLE incluya: photos jsonb DEFAULT '[]'::jsonb

INSERT INTO public.product (category_id, name, price, description, feature_1, feature_2, feature_3, specs, photos)
VALUES

-- 1. V-Mute Core -> Carpeta: Over-Ear-Basic
(1, 'V-Mute Core', 89.00, 
'Lo esencial, perfeccionado. Diseño minimalista en policarbonato mate.',
'Ultraligeros: Solo 210g.',
'Batería 24h: Semanal.',
'Graves Profundos: V-Bass.',
'{
    "Driver": "Dinámico 32mm",
    "Conectividad": "Bluetooth 5.2"
}',
'{{PHOTOS_OVER_EAR_BASIC}}'),

-- 2. V-Mute Advance -> Carpeta: Over-Ear-Pro
(1, 'V-Mute Advance', 159.00, 
'El equilibrio perfecto. Incorpora Cancelación Activa de Ruido (ANC).',
'ANC Híbrido: Filtra ruido.',
'Multipunto: PC y móvil.',
'Smart Sensors: Auto-pausa.',
'{
    "Driver": "Dinámico 40mm",
    "Conectividad": "Bluetooth 5.3"
}',
'{{PHOTOS_OVER_EAR_PRO}}'),

-- 3. V-Mute Pro Master -> Carpeta: Over-Ear-Advance
(1, 'V-Mute Pro Master', 299.00, 
'Sonido Puro. Sin Interrupciones. Diafragma de biocelulosa.',
'ANC Inteligente: Adaptativo.',
'Biocelulosa: Sonido natural.',
'Hi-Res Wireless: LDAC.',
'{
    "Driver": "Biocelulosa 40mm",
    "Conectividad": "Bluetooth 5.4"
}',
'{{PHOTOS_OVER_EAR_ADVANCE}}'),

-- 4. V-Flow Go -> Carpeta: In-Ear-Basic
(2, 'V-Flow Go', 69.00, 
'Tu música en movimiento. Resistentes al sudor.',
'Resistencia IPX5: Lluvia y sudor.',
'Ajuste Seguro: Ergonómicos.',
'Touch Control: Táctil.',
'{
    "Driver": "Dinámico 8mm",
    "Batería": "24h total"
}',
'{{PHOTOS_IN_EAR_BASIC}}'),

-- 5. V-Flow ANC -> Carpeta: In-Ear-Pro
(2, 'V-Flow ANC', 149.00, 
'Silencio de bolsillo. Tecnología Mute condensada.',
'Inmersión Total: ANC ajustable.',
'Voz Cristalina: IA llamadas.',
'Carga Inalámbrica: Qi.',
'{
    "Driver": "11mm Compuesto",
    "Codecs": "LDAC, AAC"
}',
'{{PHOTOS_IN_EAR_PRO}}'),

-- 6. V-Roam Mini -> Carpeta: Portable-Basic
(5, 'V-Roam Mini', 59.00, 
'Pequeño pero matón. Cubo listo para la aventura.',
'Clip Integrado: Mochila/Bici.',
'IP67: Sumergible.',
'Modo Stereo: TWS.',
'{
    "Potencia": "5W RMS",
    "Batería": "10 horas"
}',
'{{PHOTOS_PORTABLE_BASIC}}'),

-- 7. V-Roam Beast -> Carpeta: Portable-Pro
(5, 'V-Roam Beast', 329.00, 
'La fiesta empieza aquí. Potencia bruta para exteriores.',
'Powerbank: Carga tu móvil.',
'Graves Monstruosos: Radiadores pasivos.',
'Asa de Transporte: Ergonómica.',
'{
    "Potencia": "200W Peak",
    "Batería": "24 horas"
}',
'{{PHOTOS_PORTABLE_PRO}}'),

-- 8. V-Stage Solo -> Carpeta: Soundbar-Basic
(3, 'V-Stage Solo', 199.00, 
'Mejora tu TV al instante. All-in-one.',
'Voces Claras: Modo diálogo.',
'Sin Subwoofer Externo: Integrado.',
'HDMI ARC: Un solo mando.',
'{
    "Canales": "2.1",
    "Potencia": "120W"
}',
'{{PHOTOS_SOUNDBAR_BASIC}}'),

-- 9. V-Stage Cinema 300 -> Carpeta: Soundbar-Pro
(3, 'V-Stage Cinema 300', 549.00, 
'Experiencia inmersiva 5.0. MultiBeam.',
'Sonido 5.0: Envolvente.',
'AirPlay & Chromecast: Wifi.',
'Calibración Room: Auto-eq.',
'{
    "Canales": "5.0",
    "Potencia": "450W"
}',
'{{PHOTOS_SOUNDBAR_PRO}}'),

-- 10. V-Sense Monolith -> Carpeta: No definida (Usamos array vacío)
(4, 'V-Sense Monolith', 999.00, 
'Escultura sonora. Altavoz activo de suelo.',
'Diseño Atemporal: Mueble HiFi.',
'Phono Stage: Tocadiscos.',
'Multiroom: Wifi.',
'{
    "Configuración": "3 vías",
    "Potencia": "300W RMS"
}',
'{{PHOTOS_HIFI_BASIC}}'),

-- ==============================================================================
-- 4. GENERACIÓN DE INVENTARIO
-- ==============================================================================
INSERT INTO public.item (product_id, serial, unit_cost, color, status)
SELECT 
    p.id,
    UPPER(SUBSTRING(p.name FROM 1 FOR 3)) || '-' || p.id || '-SN-' || (1000 + gs.num),
    (p.price * 0.60), 
    CASE 
        WHEN gs.num % 2 = 0 THEN 'BLACK'::public.item_color 
        ELSE 'WHITE'::public.item_color 
    END,
    'AVAILABLE'::public.inventory_status
FROM public.product p
CROSS JOIN generate_series(1, 5) as gs(num);
