-- ==============================================================================
-- 1. INITIAL CLEANUP
-- ==============================================================================
DROP TABLE IF EXISTS public.shipment_item CASCADE;
DROP TABLE IF EXISTS public.shipment CASCADE;
DROP TABLE IF EXISTS public.order_line CASCADE;
DROP TABLE IF EXISTS public.order CASCADE;
DROP TABLE IF EXISTS public.item CASCADE;
DROP TABLE IF EXISTS public.product_variant CASCADE;
DROP TABLE IF EXISTS public.product CASCADE;
DROP TABLE IF EXISTS public.discount CASCADE;
DROP TABLE IF EXISTS public.tax_rate CASCADE;
DROP TABLE IF EXISTS public.category_secondary CASCADE;
DROP TABLE IF EXISTS public.category_main CASCADE;
DROP TABLE IF EXISTS public.address CASCADE;
DROP TABLE IF EXISTS public.customer CASCADE;
DROP TABLE IF EXISTS public.user CASCADE;

-- Drop Types (ENUMs)
DROP TYPE IF EXISTS public.inventory_status CASCADE;
DROP TYPE IF EXISTS public.item_color CASCADE;
DROP TYPE IF EXISTS public.order_status CASCADE;
DROP TYPE IF EXISTS public.shipment_status CASCADE;
DROP TYPE IF EXISTS public.payment_method_enum CASCADE;
DROP TYPE IF EXISTS public.discount_type CASCADE;

-- ==============================================================================
-- 2. ENUM CREATION
-- ==============================================================================

CREATE TYPE public.inventory_status AS ENUM (
    'AVAILABLE',
    'RESERVED',
    'SOLD',
    'DEFECTIVE',
    'RETURNED'
);

CREATE TYPE public.item_color AS ENUM (
    'BLACK',
    'WHITE',
    'RED'
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

-- ==============================================================================
-- 3. TABLE CREATION
-- ==============================================================================

-- 3.1 Users & Customers
-- ------------------------------------------------------------------------------

CREATE TABLE public.user (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    email character varying NOT NULL UNIQUE,
    password character varying NOT NULL,
    
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE public.customer (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    user_id bigint NOT NULL UNIQUE,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name character varying NOT NULL,
    surname character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying NOT NULL,
    
    CONSTRAINT pk_customer PRIMARY KEY (id),
    CONSTRAINT fk_customer_user 
        FOREIGN KEY (user_id) 
        REFERENCES public.user(id) 
        ON DELETE CASCADE
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
    
    CONSTRAINT pk_address PRIMARY KEY (id),
    CONSTRAINT fk_address_user 
        FOREIGN KEY (user_id) 
        REFERENCES public.user(id) 
        ON DELETE CASCADE
);

-- 3.2 Catalog & Products
-- ------------------------------------------------------------------------------

CREATE TABLE public.category_main (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL UNIQUE,
    description text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    
    CONSTRAINT pk_category_main PRIMARY KEY (id)
);

CREATE TABLE public.category_secondary (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    main_id bigint NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL UNIQUE,
    description text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    
    CONSTRAINT pk_category_secondary PRIMARY KEY (id),
    CONSTRAINT fk_category_main 
        FOREIGN KEY (main_id) 
        REFERENCES public.category_main(id) 
        ON DELETE CASCADE
);

CREATE TABLE public.tax_rate (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    name character varying NOT NULL,
    percentage numeric NOT NULL,
    country_code character varying NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    
    CONSTRAINT pk_tax_rate PRIMARY KEY (id)
);

CREATE TABLE public.discount (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    code character varying NOT NULL UNIQUE,
    description character varying,
    type public.discount_type NOT NULL,
    value numeric NOT NULL CHECK (value > 0::numeric),
    min_purchase_amount numeric DEFAULT 0.00,
    starts_at timestamp with time zone NOT NULL DEFAULT now(),
    expires_at timestamp with time zone,
    is_active boolean NOT NULL DEFAULT true,
    usage_limit integer,
    times_used integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    
    CONSTRAINT pk_discount PRIMARY KEY (id)
);

CREATE TABLE public.product (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    category_id bigint NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL UNIQUE, -- Agrupa todas las variantes
    price numeric NOT NULL, 
    description text NOT NULL,
    feature_1 character varying NOT NULL,
    feature_2 character varying NOT NULL,
    feature_3 character varying NOT NULL,
    specs jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    
    CONSTRAINT pk_product PRIMARY KEY (id),
    CONSTRAINT fk_product_category 
        FOREIGN KEY (category_id) 
        REFERENCES public.category_secondary(id) 
        ON DELETE RESTRICT
);

-- 3.3 Variants & Inventory
-- ------------------------------------------------------------------------------

CREATE TABLE public.product_variant (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    product_id bigint NOT NULL,
    slug character varying NOT NULL UNIQUE, -- SLUG AÑADIDO: Identificador único para URL y Cloudinary
    color public.item_color NOT NULL,
    price numeric NOT NULL, 
    photos jsonb NOT NULL DEFAULT '[]'::jsonb,
    stock_quantity integer NOT NULL DEFAULT 0, 
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    
    CONSTRAINT pk_product_variant PRIMARY KEY (id),
    CONSTRAINT fk_variant_product 
        FOREIGN KEY (product_id) 
        REFERENCES public.product(id) 
        ON DELETE CASCADE,
    CONSTRAINT uq_product_variant_color UNIQUE (product_id, color)
);

CREATE TABLE public.item (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    variant_id bigint NOT NULL,
    serial character varying NOT NULL UNIQUE,
    entry_date timestamp with time zone NOT NULL DEFAULT now(),
    sale_date timestamp with time zone,
    status public.inventory_status NOT NULL DEFAULT 'AVAILABLE',
    unit_cost numeric NOT NULL,
    
    CONSTRAINT pk_item PRIMARY KEY (id),
    CONSTRAINT fk_item_variant 
        FOREIGN KEY (variant_id) 
        REFERENCES public.product_variant(id) 
        ON DELETE CASCADE
);

-- 3.4 Orders & Checkout
-- ------------------------------------------------------------------------------

CREATE TABLE public.order (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    customer_id bigint NOT NULL,
    order_date timestamp with time zone NOT NULL DEFAULT now(),
    payment_date timestamp with time zone,
    status public.order_status DEFAULT 'PENDING_PAYMENT',
    subtotal numeric NOT NULL DEFAULT 0.00,
    shipping_cost numeric NOT NULL DEFAULT 0.00,
    tax_id bigint,      
    discount_id bigint, 
    total_amount numeric NOT NULL DEFAULT 0.00,
    payment_method public.payment_method_enum NOT NULL,
    transaction_id character varying,
    
    CONSTRAINT pk_order PRIMARY KEY (id),
    CONSTRAINT fk_order_customer 
        FOREIGN KEY (customer_id) 
        REFERENCES public.customer(id),
    CONSTRAINT fk_order_tax 
        FOREIGN KEY (tax_id) 
        REFERENCES public.tax_rate(id),
    CONSTRAINT fk_order_discount 
        FOREIGN KEY (discount_id) 
        REFERENCES public.discount(id)
);

CREATE TABLE public.order_line (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    order_id bigint NOT NULL,
    variant_id bigint NOT NULL,
    quantity integer NOT NULL DEFAULT 1,
    unit_price numeric NOT NULL DEFAULT 0.00, 
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    
    CONSTRAINT pk_order_line PRIMARY KEY (id),
    CONSTRAINT fk_order_line_order 
        FOREIGN KEY (order_id) 
        REFERENCES public.order(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_order_line_variant 
        FOREIGN KEY (variant_id) 
        REFERENCES public.product_variant(id)
);

-- 3.5 Logistics
-- ------------------------------------------------------------------------------

CREATE TABLE public.shipment (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    order_id bigint NOT NULL,
    address_id bigint NOT NULL,
    tracking_number character varying,
    tracking_url character varying,
    shipped_at timestamp with time zone,
    delivery_at timestamp with time zone,
    estimated_delivery_date timestamp with time zone,
    status public.shipment_status NOT NULL DEFAULT 'PENDING',
    
    CONSTRAINT pk_shipment PRIMARY KEY (id),
    CONSTRAINT fk_shipment_order 
        FOREIGN KEY (order_id) 
        REFERENCES public.order(id),
    CONSTRAINT fk_shipment_address 
        FOREIGN KEY (address_id) 
        REFERENCES public.address(id)
);

CREATE TABLE public.shipment_item (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    shipment_id bigint NOT NULL,
    item_id bigint NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    
    CONSTRAINT pk_shipment_item PRIMARY KEY (id),
    CONSTRAINT fk_shipment_item_shipment 
        FOREIGN KEY (shipment_id) 
        REFERENCES public.shipment(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_shipment_item_item 
        FOREIGN KEY (item_id) 
        REFERENCES public.item(id)
);