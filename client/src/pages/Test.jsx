import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, Play, ChevronRight, ChevronLeft, Star } from 'lucide-react';

// NOTA: He cambiado las imágenes del mock a unas con fondo sólido/blanco (o transparente)
// para que veas el efecto real del nuevo diseño.
const PRODUCTS = [
  {
    id: 1,
    name: "Aura Over-Ear Pro",
    category: "Headphones",
    price: 349,
    tag: "Top Ventas",
    // Usamos una imagen que simula fondo blanco/transparente
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000", 
    desc: "Cancelación de ruido activa y acabados en aluminio mate."
  },
  {
    id: 2,
    name: "Aura Flow Buds",
    category: "In-Ear",
    price: 189,
    tag: "Nuevo",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1000",
    desc: "Sonido de alta fidelidad en un diseño compacto."
  },
  {
    id: 3,
    name: "Aura Home Cinema",
    category: "Soundbars",
    price: 899,
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1000",
    desc: "Experiencia envolvente 7.1 con subwoofer inalámbrico."
  },
  {
    id: 4,
    name: "Aura Portable X",
    category: "Speakers",
    price: 129,
    tag: "",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=1000",
    desc: "Resistente al agua. 24 horas de batería."
  }
];

const HERO_SLIDES = [
  {
    title: "Redefine el Silencio",
    subtitle: "Nueva serie Matte Black con cancelación de ruido adaptativa.",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=2000",
    cta: "Ver Colección"
  },
  {
    title: "Sonido que te Sigue",
    subtitle: "Altavoces portátiles diseñados para la aventura urbana.",
    image: "https://images.unsplash.com/photo-1589440188006-1295f516d53b?auto=format&fit=crop&q=80&w=2000",
    cta: "Explorar Portátiles"
  }
];

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-orange-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6 text-white'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isScrolled ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
              A
            </div>
            <span className={isScrolled ? 'text-gray-900' : 'text-white'}>AURA</span>
          </div>

          <div className={`hidden md:flex space-x-8 text-sm font-medium ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
            <a href="#" className="hover:text-orange-500 transition-colors">Auriculares</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Altavoces</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Cine en Casa</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Accesorios</a>
          </div>

          <div className={`flex items-center space-x-5 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            <button className="hover:opacity-70"><Search size={20} /></button>
            <button className="hover:opacity-70"><User size={20} /></button>
            <button className="relative hover:opacity-70">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
            </button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col space-y-4 md:hidden animate-in fade-in text-gray-900 border-t">
            <a href="#" className="font-medium text-lg">Auriculares</a>
            <a href="#" className="font-medium text-lg">Altavoces</a>
            <a href="#" className="font-medium text-lg">Cine en Casa</a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen w-full overflow-hidden bg-gray-900">
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover object-center scale-105"
            />
            
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

        <div className="absolute bottom-10 right-10 z-30 flex gap-4">
          <button onClick={prevSlide} className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all">
            <ChevronLeft />
          </button>
          <button onClick={nextSlide} className="p-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all">
            <ChevronRight />
          </button>
        </div>
      </header>

      {/* --- WHY US --- */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4 p-6">
              <h3 className="text-xl font-bold text-gray-900">Diseño Minimalista</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Eliminamos lo superfluo. Solo formas puras y materiales mate.
              </p>
            </div>
            <div className="space-y-4 p-6 border-l border-r border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Ingeniería Acústica</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Drivers personalizados calibrados para un sonido neutro.
              </p>
            </div>
            <div className="space-y-4 p-6">
              <h3 className="text-xl font-bold text-gray-900">Garantía Vitalicia</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Construidos para durar. Si algo falla, lo reparamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BEST SELLERS (REDISEÑADO PARA FONDO BLANCO) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-orange-600 font-semibold tracking-wider uppercase text-xs">Shop Online</span>
              <h2 className="text-4xl font-bold mt-2 text-gray-900 tracking-tight">Los Favoritos</h2>
            </div>
            <a href="#" className="hidden md:flex items-center text-sm font-semibold text-gray-900 hover:text-orange-600 transition-colors border-b border-gray-200 pb-1 hover:border-orange-600">
              Ver catálogo completo <ArrowRight size={16} className="ml-2"/>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                
                {/* 1. CONTENEDOR DE IMAGEN (El truco está aquí) */}
                <div className="relative aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden mb-6 transition-all duration-500 group-hover:bg-gray-200">
                  
                  {/* Tag superpuesto */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                      {product.tag}
                    </div>
                  )}

                  {/* Botón de añadir rápido (aparece en hover) */}
                  <button className="absolute bottom-4 right-4 z-20 bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-500 shadow-lg">
                    <ShoppingBag size={18} />
                  </button>

                  {/* LA IMAGEN */}
                  {/* mix-blend-multiply: Hace que el blanco de la foto se vuelva transparente sobre el fondo gris */}
                  {/* object-contain: Asegura que la foto entera se vea sin recortar */}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* 2. INFO DEL PRODUCTO (Diseño limpio fuera de la tarjeta) */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    </div>
                    <span className="text-lg font-medium text-gray-900">{product.price}€</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <a href="#" className="inline-flex items-center text-gray-900 font-bold border-b-2 border-gray-900 pb-1">
              Ver todo el catálogo <ArrowRight size={16} className="ml-2"/>
            </a>
          </div>
        </div>
      </section>

      {/* --- TECHNOLOGY SECTION --- */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 text-orange-500 font-medium">
                <Play size={16} fill="currentColor" /> Innovación AURA
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Tecnología <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">SilentCore™</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Nuestra tecnología patentada de cancelación de ruido analiza el entorno 40,000 veces por segundo.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">-45dB</div>
                  <div className="text-sm text-gray-500">Reducción de ruido</div>
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

            <div className="lg:w-1/2 relative">
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Únete al Club AURA</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Suscríbete para recibir noticias de lanzamientos y obtén un <span className="font-bold text-orange-600">10% de descuento</span> en tu primera compra.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-gray-900 bg-white shadow-sm"
            />
            <button type="submit" className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg">
              Suscribirse
            </button>
          </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tighter">AURA</h3>
              <p className="text-gray-400 text-sm">
                Diseñando el futuro del audio desde 2025.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tienda</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Auriculares</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Altavoces</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-white/10 rounded-full hover:bg-white/30 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 bg-white/10 rounded-full hover:bg-white/30 transition-colors cursor-pointer"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-xs">
            © 2025 AURA Audio. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;