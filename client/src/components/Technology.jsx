import { Play } from "lucide-react";

export default function Technology() {
  return (
    <section className="grid lg:grid-cols-2 py-20 px-8 lg:py-0 lg:pr-20">
      <div className="flex flex-col gap-8 lg:py-20 max-w-150">
        <div className="flex justify-start items-center gap-1 font-medium text-sm text-orange-500">
          <Play size={13} fill="currentColor" />
          <h4>Innovación V-Audio</h4>
        </div>
        <h2 className="text-4xl font-bold text-white">
          Tecnología{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-500">
            SilentCore™
          </span>
        </h2>
        <p className="text-white">
          Nuestra tecnología patentada de cancelación de ruido analiza el
          entorno 40,000 veces por segundo. No solo bloquea el ruido, lo
          invierte con una precisión milimétrica para dejar solo lo que importa:
          tu música.
        </p>
        <div className="flex">
          <div className="flex-1">
            <h2 className="m-auto text-3xl font-bold text-white">-45dB</h2>
            <span>Reducción de ruido</span>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white">48h</h2>
            <span>Batería continua</span>
          </div>
        </div>
        <button
          className="w-50 h-12 rounded-4xl border border-white text-sm text-white
	  hover:text-gray-800 hover:bg-white
	    transition-colors duration-300 ease-in-out
		cursor-pointer"
        >
          Descubre la Ingeniería
        </button>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-orange-500/30 blur-3xl"></div>
        <img
          src="images/technology.png"
          alt=""
          className="mt-15 rounded-4xl rotate-4 opacity-85 hover:rotate-0 transition-all duration-800 ease-in-out"
        />
      </div>
    </section>
  );
}
