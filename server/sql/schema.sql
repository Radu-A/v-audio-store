-- 1. Limpieza previa (Opcional, útil para reiniciar)
DROP TYPE IF EXISTS public.inventory_status CASCADE;
DROP TYPE IF EXISTS public.order_status CASCADE;
DROP TYPE IF EXISTS public.shipment_status CASCADE;
DROP TYPE IF EXISTS public.payment_method_enum CASCADE; -- Renombrado para evitar conflictos con palabras clave
DROP TYPE IF EXISTS public.discount_type CASCADE;

-- 2. Creación de ENUMs
CREATE TYPE public.inventory_status AS ENUM (
    'AVAILABLE',
    'RESERVED',
    'SOLD',
    'DEFECTIVE',
    'RETURNED'
);

CREATE TYPE public.order_status AS ENUM (
    'PENDING_PAYMENT',
    'PAID',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED'
);

CREATE TYPE public.shipment_status AS ENUM (
    'PENDING',
    'READY_TO_SHIP',
    'SHIPPED',
    'IN_TRANSIT',
    'DELIVERED',
    'FAILED_ATTEMPT',
    'RETURNED'
);

CREATE TYPE public.payment_method_enum AS ENUM (
    'CREDIT_CARD',
    'PAYPAL',
    'BANK_TRANSFER',
    'STRIPE',
    'CASH_ON_DELIVERY'
);

CREATE TYPE public.discount_type AS ENUM (
    'PERCENTAGE',
    'FIXED_AMOUNT'
);

-- 3. Creación de Tablas

CREATE TABLE public.user (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  surname character varying NOT NULL,
  email character varying NOT NULL UNIQUE, -- Agregado UNIQUE por seguridad
  password character varying NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE public.customer (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id bigint NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name character varying NOT NULL,
  surname character varying NOT NULL,
  email character varying NOT NULL,
  phone character varying NOT NULL,
  CONSTRAINT customer_pkey PRIMARY KEY (id),
  CONSTRAINT customer_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id) ON DELETE CASCADE
);

CREATE TABLE public.address (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id bigint NOT NULL,
  address character varying NOT NULL,
  information text NOT NULL,
  cp character varying NOT NULL,
  city character varying NOT NULL,
  telephone character varying NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT address_pkey PRIMARY KEY (id),
  CONSTRAINT address_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id) ON DELETE CASCADE
);

CREATE TABLE public.category_main (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  description text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT category_main_pkey PRIMARY KEY (id)
);

CREATE TABLE public.category_secondary (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  main_id bigint NOT NULL,
  name character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  description text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT category_secondary_pkey PRIMARY KEY (id),
  CONSTRAINT main_fkey FOREIGN KEY (main_id) REFERENCES public.category_main(id) ON DELETE CASCADE
);

CREATE TABLE public.tax_rate (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  percentage numeric NOT NULL,
  country_code character varying NOT NULL,
  start_date timestamp with time zone NOT NULL, -- Corregido: time -> timestamp
  end_date timestamp with time zone,           -- Corregido: time -> timestamp
  CONSTRAINT tax_rate_pkey PRIMARY KEY (id)
);

CREATE TABLE public.discount (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code character varying NOT NULL UNIQUE,
  description character varying,
  type public.discount_type NOT NULL, -- Uso del ENUM
  value numeric NOT NULL CHECK (value > 0::numeric),
  min_purchase_amount numeric DEFAULT 0.00,
  starts_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone,
  is_active boolean NOT NULL DEFAULT true,
  usage_limit integer,
  times_used integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT discount_pkey PRIMARY KEY (id)
);

CREATE TABLE public.product (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  price numeric NOT NULL,
  description text NOT NULL,
  feature_1 character varying NOT NULL,
  feature_2 character varying NOT NULL,
  feature_3 character varying NOT NULL,
  specs jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  category_id bigint NOT NULL, -- Renombrado para claridad
  CONSTRAINT product_pkey PRIMARY KEY (id),
  CONSTRAINT product_category_fkey FOREIGN KEY (category_id) REFERENCES public.category_secondary(id)
);

CREATE TABLE public.item (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  product_id bigint NOT NULL,
  serial character varying NOT NULL UNIQUE,
  entry_date timestamp with time zone NOT NULL DEFAULT now(),
  sale_date timestamp with time zone,
  status public.inventory_status NOT NULL DEFAULT 'AVAILABLE'::public.inventory_status, -- Uso del ENUM
  unit_cost numeric NOT NULL,
  color character varying NOT NULL,
  CONSTRAINT item_pkey PRIMARY KEY (id),
  CONSTRAINT item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id)
);

CREATE TABLE public.order (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  customer_id bigint NOT NULL,
  order_date timestamp with time zone NOT NULL DEFAULT now(),
  payment_date timestamp with time zone,
  status public.order_status DEFAULT 'PENDING_PAYMENT'::public.order_status, -- Uso del ENUM
  subtotal numeric NOT NULL DEFAULT 0.00,
  shipping_cost numeric NOT NULL DEFAULT 0.00,
  tax_id bigint,        -- Corregido: Ahora permite NULL (puede no haber impuestos aplicables)
  discount_id bigint,   -- Corregido: Ahora permite NULL (puede no haber descuento)
  total_amount numeric NOT NULL DEFAULT 0.00,
  payment_method public.payment_method_enum NOT NULL, -- Uso del ENUM
  transaction_id character varying, -- Corregido: Bigint es arriesgado para IDs de Stripe/PayPal. Varchar es mejor. Puede ser NULL al inicio.
  CONSTRAINT order_pkey PRIMARY KEY (id),
  CONSTRAINT order_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id),
  CONSTRAINT order_tax_id_fkey FOREIGN KEY (tax_id) REFERENCES public.tax_rate(id),
  CONSTRAINT order_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discount(id)
);

CREATE TABLE public.order_product (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id bigint NOT NULL,
  product_id bigint NOT NULL, -- Corregido: Reemplazado customer_id por product_id
  quantity integer NOT NULL DEFAULT 1, -- Agregado: Necesario para saber cuántos compró
  unit_price numeric NOT NULL DEFAULT 0.00, -- Precio al momento de la compra (snapshot)
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT order_product_pkey PRIMARY KEY (id),
  CONSTRAINT op_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.order(id) ON DELETE CASCADE,
  CONSTRAINT op_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id)
);

CREATE TABLE public.shipment (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id bigint NOT NULL,
  address_id bigint NOT NULL,
  tracking_number character varying, -- Corregido: Typo y tipo de dato (integer no sirve para tracking)
  tracking_url character varying,
  shipped_at timestamp with time zone,
  delivery_at timestamp with time zone,
  estimated_delivery_date timestamp with time zone,
  status public.shipment_status NOT NULL DEFAULT 'PENDING'::public.shipment_status, -- Uso del ENUM
  CONSTRAINT shipment_pkey PRIMARY KEY (id),
  CONSTRAINT shipment_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.order(id),
  CONSTRAINT shipment_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id)
);

CREATE TABLE public.shipment_item (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  shipment_id bigint NOT NULL,
  item_id bigint NOT NULL, -- Relaciona el envío físico con el item serializado específico
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT shipment_item_pkey PRIMARY KEY (id),
  CONSTRAINT si_shipment_id_fkey FOREIGN KEY (shipment_id) REFERENCES public.shipment(id) ON DELETE CASCADE,
  CONSTRAINT si_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item(id)
);