import { Circle, AudioWaveform, FastForward } from "lucide-react";
const divClass = "flex flex-col items-center gap-3";
const h3Class = "text-xl font-bold text-center text-gray-800";
const pStyle = "text-lg font-regular text-center";

export default function About() {
  return (
    <section className="p-15 bg-white">
      <div className="conainer grid grid-cols-3 gap-10">
        <div className={divClass}>
          <div>
            <Circle className="text-gray-800"></Circle>
          </div>
          <h3 className={h3Class}>Diseño Minimalista</h3>
          <p className={pStyle}>
            Eliminamos lo superfluo. Solo formas puras y materiales mate que se
            sienten bien al tacto.
          </p>
        </div>
        <div className={divClass}>
          <div>
            <AudioWaveform className="text-gray-800"></AudioWaveform>
          </div>
          <h3 className={h3Class}>Ingeniería Acústica</h3>
          <p className={pStyle}>
            Drivers personalizados calibrados por expertos para un sonido neutro
            y preciso.
          </p>
        </div>
        <div className={divClass}>
          <div>
            <FastForward className="text-gray-800"></FastForward>
          </div>
          <h3 className={h3Class}>Hechos Para Durar</h3>
          <p className={pStyle}>
            Construidos para durar. Si algo falla, lo reparamos o reemplazamos.
          </p>
        </div>
      </div>
    </section>
  );
}
