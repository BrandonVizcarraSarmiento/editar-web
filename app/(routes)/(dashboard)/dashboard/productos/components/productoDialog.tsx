import { ReactNode, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Producto } from "@/types/producto";

interface ProductoDialogProps {
    isEditing: boolean;
    producto: Producto | null;
    productos: Producto[]; // Pasamos la lista de productos para calcular el nuevo ID
    onSave: (producto: Producto) => void;
    children: ReactNode;
}

const ProductoDialog = ({ isEditing, producto, productos, onSave, children }: ProductoDialogProps) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [imagen, setImagen] = useState("");

    useEffect(() => {
        if (isEditing && producto) {
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setPrecio(producto.precio);
            setImagen(producto.imagen);
        } else {
            setNombre("");
            setDescripcion("");
            setPrecio(0);
            setImagen("");
        }
    }, [producto, isEditing]);

    // Función para obtener el siguiente ID disponible
    const getNextId = () => {
        if (productos.length === 0) return 1;
        return Math.max(...productos.map((p) => p.id)) + 1;
    };

    const handleSave = async () => {
        const nuevoProducto: Producto = {
            id: producto ? producto.id : getNextId(), // Si es nuevo, genera un ID
            nombre,
            descripcion,
            precio,
            imagen,
            createdAt: producto ? producto.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const response = isEditing
                ? await fetch(`http://localhost:4000/api/productos/${producto?.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(nuevoProducto),
                  })
                : await fetch("http://localhost:4000/api/productos", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(nuevoProducto),
                  });

            if (response.ok) {
                onSave(nuevoProducto);
            } else {
                console.error("Error al guardar el producto.");
            }
        } catch (error) {
            console.error("Error de conexión: ", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar Producto" : "Agregar Producto"}</DialogTitle>
                </DialogHeader>
                <form>
                    <div className="space-y-4">
                        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del producto" />
                        <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" />
                        <Input value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value))} placeholder="Precio" type="number" />
                        <Input value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="URL de la imagen" />
                    </div>
                </form>
                <DialogFooter>
                    <Button onClick={handleSave}>{isEditing ? "Guardar cambios" : "Agregar producto"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductoDialog;
