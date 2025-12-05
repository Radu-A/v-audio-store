// ==============================================================================
// ARCHIVO DE QUERIES (SQL Parametrizado)
// ==============================================================================

// 1. LIMPIEZA
// ------------------------------------------------------------------------------
export const CLEANUP_SQL = `
  TRUNCATE TABLE public.shipment_item CASCADE;
  TRUNCATE TABLE public.shipment CASCADE;
  TRUNCATE TABLE public.order_line CASCADE;
  TRUNCATE TABLE public.order CASCADE;
  TRUNCATE TABLE public.item CASCADE;
  TRUNCATE TABLE public.product_variant CASCADE;
  TRUNCATE TABLE public.product CASCADE;
  TRUNCATE TABLE public.category_secondary CASCADE;
  TRUNCATE TABLE public.category_main CASCADE;

  ALTER SEQUENCE public.category_main_id_seq RESTART WITH 1;
  ALTER SEQUENCE public.category_secondary_id_seq RESTART WITH 1;
  ALTER SEQUENCE public.product_id_seq RESTART WITH 1;
  ALTER SEQUENCE public.product_variant_id_seq RESTART WITH 1;
  ALTER SEQUENCE public.item_id_seq RESTART WITH 1;
`;

// 2. INSERCIONES
// ------------------------------------------------------------------------------

export const INSERT_CATEGORY_MAIN = `
  INSERT INTO public.category_main (name, slug, description)
  VALUES ($1, $2, $3)
  RETURNING id;
`;

export const INSERT_CATEGORY_SECONDARY = `
  INSERT INTO public.category_secondary (main_id, name, slug, description)
  VALUES ($1, $2, $3, $4)
  RETURNING id;
`;

export const INSERT_PRODUCT = `
  INSERT INTO public.product 
  (category_id, name, slug, price, description, feature_1, feature_2, feature_3, specs) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
  RETURNING id;
`;

export const INSERT_VARIANT = `
  INSERT INTO public.product_variant 
  (product_id, slug, color, price, photos, stock_quantity) 
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id; -- Opcional, por si necesitas el ID para algo futuro
`;

// Query para insertar items (inventario)
// Nota: 'status' lo fijamos 'AVAILABLE' directamente en el SQL por simplicidad,
// pero podrías parametrizarlo si quisieras.
export const INSERT_ITEM = `
  INSERT INTO public.item 
  (variant_id, serial, unit_cost, status) 
  VALUES ($1, $2, $3, 'AVAILABLE')
`;