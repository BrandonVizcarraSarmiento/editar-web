"use client"
import Navbar from "@/components/clientes/navbar";
import EventoPrincipal from "./components/eventoPrincipal";
import OtrosEventos from "./components/otrosEventos";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";
import { useEffect, useState } from "react";
import { Novedad } from "@/types/novedad";

const Novedades = () => {
  const [eventos, setEventos] = useState<Novedad[]>([]);

  // Llamada a la API para obtener los datos de novedades
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/novedades");
        const data: Novedad[] = await res.json();
        setEventos(data);
      } catch (error) {
        console.error("Error fetching novedades:", error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <div>
      <Navbar />
      <Redes />
      {eventos.length > 0 && <EventoPrincipal evento={eventos[0]} />}
      <OtrosEventos eventos={eventos.slice(1)} />
      <Footer />
    </div>
  );
};

export default Novedades;
