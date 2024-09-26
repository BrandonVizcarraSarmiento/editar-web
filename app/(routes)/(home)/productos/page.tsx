"use client";
import { useState, useEffect } from 'react';

import Navbar from "@/components/clientes/navbar";
import Productos from "./components/productos";
import Slider from "./components/slider";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";
import { useRouter } from 'next/navigation';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

const SeccionProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/productos');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProductos();
  }, []);

  const handleProductoClick = (id: number) => {
    router.push(`/productos/${id}`); // Redirige a la página del producto
  };

  return (
    <div>
      <Navbar />
      <Redes />
      <section className="flex flex-col items-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl w-full">
          <div className="col-span-1 md:col-span-2 flex justify-center items-center">
            {productos.length > 0 && (
              <div onClick={() => handleProductoClick(productos[0].id)}>
                <Productos
                  nombre={productos[0].nombre}
                  precio={productos[0].precio}
                  imagen={productos[0].imagen}
                />
              </div>
            )}
          </div>
          <div className="col-span-1 flex flex-col justify-between space-y-4">
            {productos.slice(1, 3).map((producto) => (
              <div key={producto.id} className="flex-1 flex justify-center" onClick={() => handleProductoClick(producto.id)}>
                <Productos
                  nombre={producto.nombre}
                  precio={producto.precio}
                  imagen={producto.imagen}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        {productos.length > 0 && <Slider productos={productos} />}
      </section>
      <Footer />
    </div>
  );
}

export default SeccionProductos;
