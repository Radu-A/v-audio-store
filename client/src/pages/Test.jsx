import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  ArrowRight,
  Play,
  ChevronRight,
  ChevronLeft,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  ShieldCheck,
  CreditCard,
  ChevronDown, // Nuevo import
} from "lucide-react";

// Mock Data para simular tus productos generados por IA
const PRODUCTS = [
  {
    id: 1,
    name: "Aura Over-Ear Pro",
    category: "Headphones",
    price: 349,
    tag: "Top Ventas",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    desc: "Cancelación de ruido activa y acabados en aluminio mate.",
  },
  {
    id: 2,
    name: "Aura Flow Buds",
    category: "In-Ear",
    price: 189,
    tag: "Nuevo",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1000",
    desc: "Sonido de alta fidelidad en un diseño compacto.",
  },
  {
    id: 3,
    name: "Aura Home Cinema",
    category: "Soundbars",
    price: 899,
    tag: "Premium",
    image:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1000",
    desc: "Experiencia envolvente 7.1 con subwoofer inalámbrico.",
  },
  {
    id: 4,
    name: "Aura Portable X",
    category: "Speakers",
    price: 129,
    tag: "",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=1000",
    desc: "Resistente al agua. 24 horas de batería.",
  },
];

const HERO_SLIDES = [
  {
    title: "Redefine el Silencio",
    subtitle: "Nueva serie Matte Black con cancelación de ruido adaptativa.",
    image:
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=2000",
    cta: "Ver Colección",
  },
  {
    title: "Sonido que te Sigue",
    subtitle: "Altavoces portátiles diseñados para la aventura urbana.",
    image:
      "https://images.unsplash.com/photo-1589440188006-1295f516d53b?auto=format&fit=crop&q=80&w=2000",
    cta: "Explorar Portátiles",
  },
];

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- Lógica del Footer ---
  const [footerOpen, setFooterOpen] = useState(null); // null, 'shop', 'support', 'company'

  const toggleFooter = (section) => {
    setFooterOpen(footerOpen === section ? null : section);
  };

  const FOOTER_LINKS = {
    shop: {
      title: "Explorar",
      links: [
        "Auriculares Over-Ear",
        "In-Ear True Wireless",
        "Altavoces Bluetooth",
        "Soundbars",
        "Ver Novedades",
      ],
    },
    support: {
      title: "Ayuda",
      links: [
        "Estado del pedido",
        "Envíos y Devoluciones",
        "Aura Care+ (Garantía)",
        "Centro de Soporte",
        "Contactar",
      ],
    },
    company: {
      title: "Empresa",
      links: [
        "Sobre Nosotros",
        "Sostenibilidad",
        "Prensa",
        "Inversores",
        "Carreras",
      ],
    },
  };
  // Efecto para la navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play del slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );

  return (
    <div className="font-sans text-gray-900 bg-gray-50 selection:bg-gray-900 selection:text-white">
      {/* --- NAVBAR --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6 text-white"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isScrolled ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
            >
              A
            </div>
            <span className={isScrolled ? "text-gray-900" : "text-white"}>
              AURA
            </span>
          </div>

          {/* Desktop Nav */}
          <div
            className={`hidden md:flex space-x-8 text-sm font-medium ${
              isScrolled ? "text-gray-600" : "text-gray-200"
            }`}
          >
            <a href="#" className="hover:text-orange-500 transition-colors">
              Auriculares
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Altavoces
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Cine en Casa
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Accesorios
            </a>
          </div>

          {/* Icons */}
          <div
            className={`flex items-center space-x-5 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            <button className="hover:opacity-70">
              <Search size={20} />
            </button>
            <button className="hover:opacity-70">
              <User size={20} />
            </button>
            <button className="relative hover:opacity-70">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col space-y-4 md:hidden animate-in fade-in slide-in-from-top-5 text-gray-900">
            <a href="#" className="font-medium text-lg">
              Auriculares
            </a>
            <a href="#" className="font-medium text-lg">
              Altavoces
            </a>
            <a href="#" className="font-medium text-lg">
              Cine en Casa
            </a>
            <hr />
            <a href="#" className="text-gray-500">
              Login
            </a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen w-full overflow-hidden bg-gray-900">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105"
            />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-6">
                <div className="max-w-2xl space-y-6">
                  <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-medium tracking-wider text-white uppercase backdrop-blur-sm">
                    Nueva Colección 2025
                  </span>
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 max-w-lg font-light leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="pt-4">
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                      {slide.cta} <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-10 right-10 z-30 flex gap-4">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all"
          >
            <ChevronRight />
          </button>
        </div>
      </header>

      {/* --- WHY US / PHILOSOPHY --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-900">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Diseño Minimalista
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Eliminamos lo superfluo. Solo formas puras y materiales mate que
                se sienten bien al tacto.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-900">
                <div className="w-6 h-1 bg-gray-900 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Ingeniería Acústica
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Drivers personalizados calibrados por expertos para un sonido
                neutro y preciso.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-900">
                <div className="w-4 h-4 border-2 border-gray-900 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Garantía Vitalicia
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Construidos para durar. Si algo falla, lo reparamos o
                reemplazamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BEST SELLERS --- */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-orange-600 font-semibold tracking-wider uppercase text-sm">
                Colección
              </span>
              <h2 className="text-4xl font-bold mt-2 text-gray-900">
                Los Favoritos
              </h2>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center text-gray-600 hover:text-orange-600 font-medium transition-colors"
            >
              Ver todo el catálogo <ArrowRight size={16} className="ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.tag}
                  </div>
                )}
                {/* Image Container */}
                <div className="h-64 overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Add to cart overlay button */}
                  <button className="absolute bottom-4 right-4 bg-white text-gray-900 p-3 rounded-full shadow-lg translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-500 hover:text-white">
                    <ShoppingBag size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {product.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price}€
                    </span>
                    <button className="text-sm font-medium text-gray-600 group-hover:text-orange-600 transition-colors">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <a
              href="#"
              className="inline-flex items-center text-gray-900 font-bold border-b-2 border-gray-900 pb-1"
            >
              Ver todo el catálogo <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* --- TECHNOLOGY SECTION --- */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 text-orange-500 font-medium">
                <Play size={16} fill="currentColor" /> Innovación AURA
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Tecnología{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
                  SilentCore™
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Nuestra tecnología patentada de cancelación de ruido analiza el
                entorno 40,000 veces por segundo. No solo bloquea el ruido, lo
                invierte con una precisión milimétrica para dejar solo lo que
                importa: tu música.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">
                    -45dB
                  </div>
                  <div className="text-sm text-gray-500">
                    Reducción de ruido
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">48h</div>
                  <div className="text-sm text-gray-500">Batería continua</div>
                </div>
              </div>

              <button className="mt-4 border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
                Descubre la Ingeniería
              </button>
            </div>

            {/* Visual Content */}
            <div className="lg:w-1/2 relative">
              {/* Abstract shape background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/20 rounded-full blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000"
                alt="Tecnología interna auricular"
                className="relative z-10 rounded-3xl shadow-2xl border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="py-24 bg-orange-50">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Únete al Club AURA
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Suscríbete para recibir noticias de lanzamientos y obtén un{" "}
            <span className="font-bold text-orange-600">10% de descuento</span>{" "}
            en tu primera compra.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-gray-900 bg-white shadow-sm"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg"
            >
              Suscribirse
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            Sin spam. Date de baja cuando quieras.
          </p>
        </div>
      </section>

      {/* --- SMART FOOTER --- */}
      <footer className="bg-gray-950 text-white pt-16 pb-8 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 mb-16">
            {/* 1. Brand Identity (Siempre visible y primero) */}
            <div className="lg:w-1/3 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white text-gray-950 flex items-center justify-center font-bold">
                  A
                </div>
                <span className="text-2xl font-bold tracking-tighter">
                  AURA
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Ingeniería acústica de vanguardia. Creamos herramientas para los
                puristas del sonido.
              </p>
              <div className="flex space-x-4 pt-2">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-950 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* 2. Dynamic Links Section (Grid en Desktop / Acordeón en Mobile) */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
              {Object.entries(FOOTER_LINKS).map(([key, section]) => (
                <div
                  key={key}
                  className="border-b border-gray-800 md:border-none"
                >
                  {/* Header del Acordeón / Título Desktop */}
                  <button
                    onClick={() => window.innerWidth < 768 && toggleFooter(key)}
                    className="w-full flex justify-between items-center py-4 md:py-0 md:mb-6 group"
                  >
                    <h4 className="font-bold text-lg text-left">
                      {section.title}
                    </h4>
                    {/* Flecha solo visible en móvil */}
                    <ChevronDown
                      className={`md:hidden text-gray-500 transition-transform duration-300 ${
                        footerOpen === key ? "rotate-180" : ""
                      }`}
                      size={20}
                    />
                  </button>

                  {/* Lista de enlaces (Animación de altura en móvil) */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out md:block md:h-auto ${
                      footerOpen === key
                        ? "max-h-60 opacity-100 mb-6"
                        : "max-h-0 opacity-0 md:opacity-100 md:max-h-none"
                    }`}
                  >
                    <ul className="space-y-3 text-gray-400 text-sm">
                      {section.links.map((link, idx) => (
                        <li key={idx}>
                          <a
                            href="#"
                            className="hover:text-orange-500 transition-colors block py-1"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Trust & Badges (Reagrupado para móvil) */}
          <div className="border-t border-gray-800 py-8 mb-4 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-gray-400" />
                <span>Pagos Seguros SSL</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-gray-400" />
                <span>Envíos Internacionales</span>
              </div>
            </div>

            {/* Mockup de tarjetas */}
            <div className="flex items-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <CreditCard size={24} />
              <span className="font-serif font-bold italic">VISA</span>
              <span className="font-bold">
                Pay<span className="text-blue-400 italic">Pal</span>
              </span>
            </div>
          </div>

          {/* 4. Bottom Legal (Stack en móvil, Row en desktop) */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-center text-xs text-gray-500 gap-6 pt-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <span>© 2025 AURA Audio Inc.</span>
              <div className="flex gap-4 md:gap-6 mt-2 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">
                  Privacidad
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookies
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Términos
                </a>
              </div>
            </div>

            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors border border-gray-700 px-4 py-2 rounded-full hover:border-gray-500 bg-gray-900/50">
              <Globe size={14} />
              <span>España — EUR</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
