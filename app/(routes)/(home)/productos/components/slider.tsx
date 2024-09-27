import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Productos from "./productos";
import { Producto } from "@/types/producto";

const Slider: React.FC<{ productos: Producto[] }> = ({ productos }) => {
  return (
    <div className="mt-10 mb-10 p-4">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent>
          {productos.map((producto) => (
            <CarouselItem key={producto.id} className="md:basis-1/2 lg:basis-1/3">
              <div>
                <Card>
                  <Productos
                    nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}
                  />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden md:block" />
      </Carousel>
    </div>
  );
}

export default Slider;
