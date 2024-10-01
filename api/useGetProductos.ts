import { useState, useEffect } from "react";
import { Producto } from "@/types/producto";

export function useGetProductos() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/productos`; // Utilizamos la variable de entorno
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setProductos(data);
                setLoading(false);
            } catch (err: any) {
                setError("Error al obtener los productos");
                setLoading(false);
            }
        };

        fetchProductos();
    }, [url]);

    return { productos, loading, error };
}
