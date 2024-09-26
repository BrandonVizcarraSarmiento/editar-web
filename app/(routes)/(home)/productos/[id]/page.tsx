"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from "@/components/clientes/navbar";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";
import ImgProducto from '../components/imgProducto';
import InfoProducto from '../components/infoProducto';

interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

const PageInfoProductos = () => {
    const { id } = useParams(); // Obtener el ID de la ruta
    const [producto, setProducto] = useState<Producto | null>(null);

    useEffect(() => {
        if (id) {
            const fetchProducto = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/api/productos/${id}`);
                    const data: Producto = await response.json();
                    setProducto(data);
                } catch (error) {
                    console.error("Error fetching product: ", error);
                }
            };

            fetchProducto();
        }
    }, [id]);

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <Navbar />
            <Redes />
            <div className="w-full max-w-7xl mx-auto my-20 p-4">
                <div className="grid sm:grid-cols-2 rounded-lg p-10 gap-10 sm:gap-12">
                    <div className="">
                        <ImgProducto imagen={producto.imagen} />
                    </div>
                    <div className="">
                        <InfoProducto
                            nombre={producto.nombre}
                            precio={producto.precio}
                            descripcion={producto.descripcion}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PageInfoProductos;
