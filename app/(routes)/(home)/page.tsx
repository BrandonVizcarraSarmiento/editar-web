import Banner from "@/components/clientes/banner";
import Beneficios from "@/components/clientes/beneficios";
import MisionVision from "@/components/clientes/misionVision";
import Navbar from "@/components/clientes/navbar";
import Redes from "@/components/clientes/redes";
import Testimonios from "@/components/clientes/testimonios";
import ToggleTheme from "@/components/clientes/toggleTheme";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <MisionVision />
      <Redes/>
      <Testimonios/>
      <Beneficios />
    </div>
  );
}
