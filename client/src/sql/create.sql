-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.


CREATE TABLE public.user (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  surname character varying NOT NULL,
  email character varying NOT NULL,
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
  CONSTRAINT customer_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id)
);

CREATE TABLE public.address (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id bigint NOT NULL,
  address character varying NOT NULL,
  information text NOT NULL,
  cp character varying NOT NULL,
  city character varying NOT NULL,
  telephone character varying NOT NULL,
  created_at timestamp with time zone NOT NULL,
  CONSTRAINT address_pkey PRIMARY KEY (id),
  CONSTRAINT address_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id)
);
CREATE TABLE public.category_main (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  slug character varying NOT NULL,
  description text NOT NULL,
  created_at timestamp with time zone NOT NULL,
  CONSTRAINT category_main_pkey PRIMARY KEY (id)
);
CREATE TABLE public.category_secondary (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  main_id bigint NOT NULL,
  name character varying NOT NULL,
  slug character varying NOT NULL,
  description text NOT NULL,
  created_at timestamp with time zone NOT NULL,
  CONSTRAINT category_secondary_pkey PRIMARY KEY (id),
  CONSTRAINT main_fkey FOREIGN KEY (main_id) REFERENCES public.category_main(id)
);
CREATE TABLE public.tax_rate (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  percentage numeric NOT NULL,
  country_code character varying NOT NULL,
  start_date time without time zone NOT NULL,
  end_date time without time zone,
  CONSTRAINT tax_rate_pkey PRIMARY KEY (id)
);
CREATE TABLE public.discount (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code character varying NOT NULL UNIQUE,
  description character varying,
  type USER-DEFINED NOT NULL,
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
  specs jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL,
  category bigint NOT NULL,
  CONSTRAINT product_pkey PRIMARY KEY (id),
  CONSTRAINT product_category_fkey FOREIGN KEY (category) REFERENCES public.category_secondary(id)
);
CREATE TABLE public.item (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  product_id bigint NOT NULL,
  serial character varying NOT NULL UNIQUE,
  entry_date timestamp with time zone NOT NULL DEFAULT now(),
  sale_date timestamp with time zone,
  status USER-DEFINED NOT NULL DEFAULT 'AVAILABLE'::inventory_status,
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
  status USER-DEFINED DEFAULT 'PENDING_PAYMENT'::order_status,
  subtotal numeric NOT NULL DEFAULT 0.00,
  shipping_cost numeric NOT NULL DEFAULT 0.00,
  tax_id bigint NOT NULL,
  discount_id bigint NOT NULL,
  total_amount numeric NOT NULL DEFAULT 0.00,
  payment_method USER-DEFINED NOT NULL,
  transaction_id bigint NOT NULL,
  CONSTRAINT order_pkey PRIMARY KEY (id),
  CONSTRAINT order_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id),
  CONSTRAINT order_tax_id_fkey FOREIGN KEY (tax_id) REFERENCES public.tax_rate(id),
  CONSTRAINT order_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discount(id)
);
CREATE TABLE public.order_product (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id bigint NOT NULL,
  customer_id bigint NOT NULL,
  unit_price numeric NOT NULL DEFAULT 0.00,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT order_product_pkey PRIMARY KEY (id),
  CONSTRAINT op_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.order(id),
  CONSTRAINT op_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id)
);

CREATE TABLE public.shipment (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id bigint NOT NULL,
  address_id bigint NOT NULL,
  trackig_number integer NOT NULL,
  tracking_url character varying NOT NULL,
  shipped_at timestamp with time zone NOT NULL,
  delivery_at timestamp with time zone NOT NULL,
  delivery_date timestamp with time zone NOT NULL,
  status USER-DEFINED NOT NULL DEFAULT 'PENDING_PAYMENT'::shipment_status,
  CONSTRAINT shipment_pkey PRIMARY KEY (id),
  CONSTRAINT shipment_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.order(id),
  CONSTRAINT shipment_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id)
);
CREATE TABLE public.shipment_item (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  shipment_id bigint NOT NULL,
  item_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL,
  CONSTRAINT shipment_item_pkey PRIMARY KEY (id),
  CONSTRAINT si_shipment_id_fkey FOREIGN KEY (shipment_id) REFERENCES public.shipment(id),
  CONSTRAINT si_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item(id)
);
