import Banner from "@/components/clientes/banner";
import Beneficios from "@/components/clientes/beneficios";
import MisionVision from "@/components/clientes/misionVision";
import Redes from "@/components/clientes/redes";
import Testimonios from "@/components/clientes/testimonios";

export default function Home() {
  return (
    <div>
      <Banner />
      <MisionVision />
      <Redes/>
      <Testimonios/>
      <Beneficios />
    </div>
  );
}
