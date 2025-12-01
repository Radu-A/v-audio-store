import { useEffect, useState } from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
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
              V
            </div>
            <span className={isScrolled ? "text-gray-900" : "text-white"}>
              AUDIO
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
              Altavoces bluetoth
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Audio para el hogar
            </a>
          </div>

          {/* Icons */}
          <div
            className={`flex items-center space-x-5 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            <button className="hover:opacity-70 cursor-pointer">
              <Search size={20} />
            </button>
            <button className="hover:opacity-70 cursor-pointer">
              <User size={20} />
            </button>
            <button className="relative hover:opacity-70 cursor-pointer">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </button>
            <button
              className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1.5 z-50 focus:outline-none cursor-pointer hover:opacity-70"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {/* Línea Superior */}
              <span
                className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : "translate-y-0"
                }`}
              />

              {/* Línea del Medio */}
              <span
                className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen
                    ? "opacity-0 translate-x-full"
                    : "opacity-100 translate-x-0"
                }`}
              />

              {/* Línea Inferior */}
              <span
                className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-out ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : "translate-y-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full overflow-hidden bg-white shadow-xl flex flex-col space-y-5 md:hidden text-gray-900 transition-all duration-300 ${
            mobileMenuOpen ? "h-60 p-6" : "h-0 p-0"
          }`}
        >
          <a href="#" className="font-medium text-lg hover:text-orange-500">
            Auriculares
          </a>
          <a href="#" className="font-medium text-lg hover:text-orange-500">
            Altavoces
          </a>
          <a href="#" className="font-medium text-lg hover:text-orange-500">
            Cine en Casa
          </a>
          <hr />
          <a href="#" className="text-gray-500">
            Login
          </a>
        </div>
      </nav>
    </header>
  );
}
