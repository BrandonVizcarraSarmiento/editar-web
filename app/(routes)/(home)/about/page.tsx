import Info from "./components/info";
import QuienesSomos from "./components/quienesSomos";
import Redes from "@/components/clientes/redes";

const About = () => {
    return (
        <div>
            <Redes />
            <div className="py-4">
                <QuienesSomos />
                <Info />
            </div>
        </div>
    );
}

export default About;