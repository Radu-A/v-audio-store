import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  //   {
  //     title: "Redefine el Silencio",
  //     subtitle: "Nueva serie Matte Black con cancelación de ruido adaptativa.",
  //     image:
  //       "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=2000",
  //     cta: "Ver Colección",
  //   },
  {
    title: "Sonido gigante, un altavoz compacto",
    subtitle: "200 wattios de potencia para disfrutarlos donde quieras.",
    image:
      "https://res.cloudinary.com/ds9uwjcs7/image/upload/v1763900159/Hero-Portable_mmwxfz.png",
    cta: "Explorar Altavoces",
  },
  {
    title: "Música en estado puro",
    subtitle: "El sonido más fiel sobre el diseño más actual.",
    image:
      "https://res.cloudinary.com/ds9uwjcs7/image/upload/v1763985705/Hero-HiFi-Light-Dark_epany8.png",
    cta: "Ver Artículo",
  },
  {
    title: "Una experiencia inmersiva",
    subtitle: "Vive el cine como nunca lo habías vivido antes.",
    image:
      "https://res.cloudinary.com/ds9uwjcs7/image/upload/v1763975789/Hero-Soundbar_ohn3bx.png",
    cta: "Ver Artículo",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <section className="h-screen">
      {HERO_SLIDES.map((slide, index) => (
        // Container
        <div
          key={index}
          className={`absolute inset-0 overflow-hidden transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="min-h-full object-cover object-center z-10"
          />
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center px-6">
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
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  {slide.cta} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
          {/* Slider Controls */}
          <div className="absolute bottom-10 right-10 z-50 flex gap-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-white/30 text-white cursor-pointer hover:bg-white hover:text-gray-900 transition-all"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-white/30 text-white cursor-pointer hover:bg-white hover:text-gray-900 transition-all"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
