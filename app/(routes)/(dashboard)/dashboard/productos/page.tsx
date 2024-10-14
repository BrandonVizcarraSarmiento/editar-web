"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AgregarProductoDialog from "./components/agregarProducto";
import TablaProductos from "./components/ProductosTable";
import { Producto } from "@/types/producto";
import { PlusIcon } from "lucide-react";

const SeccionProductos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const mostrarToast = (mensaje: string) => {
        setToastMessage(mensaje);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setToastMessage(null);
        }, 3000);
    };

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/productos");
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener productos: ", error);
            }
        };

        fetchProductos();
    }, []);

    const handleSaveProducto = (producto: Producto) => {
        const isEdit = productos.some((p) => p.id === producto.id);

        if (isEdit) {
            setProductos((prev) =>
                prev.map((p) => (p.id === producto.id ? producto : p))
            );
            mostrarToast("El producto ha sido editado correctamente.");
        } else {
            setProductos((prev) => [...prev, producto]);
            mostrarToast("Se agregó un nuevo producto.");
        }
    };

    const actualizarDestacados = (productosList: Producto[]) => {
        // Lógica para actualizar destacados, si es necesario
    };

    return (
        <div className="p-4">
            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Gestión de Productos</h1>
                <AgregarProductoDialog
                    productos={productos}
                    onSave={handleSaveProducto}
                    onUpdateDestacados={actualizarDestacados}
                >
                    <Button>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Agregar Producto
                    </Button>
                </AgregarProductoDialog>
            </div>

            <TablaProductos productos={productos} setProductos={setProductos} />
        </div>
    );
};

export default SeccionProductos;
