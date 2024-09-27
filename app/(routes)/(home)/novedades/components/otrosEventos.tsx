import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Novedad } from "@/types/novedad"; // Importamos la interfaz
import { formatearFecha } from "@/types/fecha";

interface OtrosEventosProps {
  eventos: Novedad[];
}

const OtrosEventos: React.FC<OtrosEventosProps> = ({ eventos }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 justify-items-center my-20">
        {eventos.map((evento) => (
          <Card
            key={evento.id}
            className="flex flex-col items-center text-center space-y-2 hover:border-primary transition-colors duration-300 overflow-hidden"
          >
            <Link href={`/novedades/${evento.id}`}>
              <img
                src={evento.imagen}
                width={300}
                height={300}
                alt="imagen del evento"
                className="h-64 w-64 object-cover"
              />
              <CardContent className="max-w-sm mx-auto mt-2">
                <div className="text-sm text-justify">
                  <CardTitle className="mb-2">{evento.titulo}</CardTitle>
                  <CardDescription className="mb-2">{formatearFecha(evento.fecha)}</CardDescription>
                  <CardDescription>{evento.info}</CardDescription>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OtrosEventos;
