import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";

// Componente del Icono X (Twitter)
export const XIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const icons = [Instagram, XIcon, Facebook, Youtube];
// const icons = [<Instagram />, <XIcon />, <Facebook />, <Youtube />];

export default function Footer() {
  return (
    <footer>
      <div>
        <div className="flex flex-col">
          <h3>
            <span>V</span> Audio
          </h3>
          <p>
            Ingeniería acústica de vanguardia. Creamos herramientas para los
            puristas del sonido.
          </p>
          <div className="flex gap-3">
            {icons.map((Icon, i) => (
              <a
                href=""
                className="flex justify-center items-center size-9 rounded-full bg-gray-900"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h4>Explorar</h4>
          <Link>Auriculares Over-Ear</Link>
          <Link>Altavoces Bluetooth</Link>
          <Link>Barras de Sonido</Link>
          <Link>Altavoces HiFi</Link>
        </div>
        <div>
          <h4>Ayuda</h4>
          <Link>Estado del pedido</Link>
          <Link>Envíos y Devoluciones</Link>
          <Link>Garantía</Link>
          <Link>Contacto</Link>
        </div>
        {/* <div>
          <h4>Empresa</h4>
          <Link>Sobre Nosotros</Link>
          <Link>Sostenibilidad</Link>
          <Link>Prensa</Link>
          <Link>Carreras</Link>
        </div> */}
      </div>
      <hr className="my-3 h-1 border-gray-700" />
      <div>© 2025 V-Audio. Todos los derechos reservados.</div>
    </footer>
  );
}
