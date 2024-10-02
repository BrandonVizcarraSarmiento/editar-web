import { ReactNode, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Producto } from "@/types/producto";

interface EditarProductoDialogProps {
    producto: Producto | null;
    onSave: (producto: Producto) => void;
    children: ReactNode;
}

const EditarProductoDialog = ({ producto, onSave, children }: EditarProductoDialogProps) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [imagen, setImagen] = useState("");

    useEffect(() => {
        if (producto) {
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setPrecio(producto.precio);
            setImagen(producto.imagen);
        }
    }, [producto]);

    const handleSave = async () => {
        const updatedProducto: Producto = {
            ...producto!,
            nombre,
            descripcion,
            precio,
            imagen,
            updatedAt: new Date().toISOString(),
        };

        try {
            const response = await fetch(`http://localhost:4000/api/productos/${producto?.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProducto),
            });

            if (response.ok) {
                onSave(updatedProducto);
            } else {
                console.error("Error al editar el producto.");
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
                    <DialogTitle>Editar Producto</DialogTitle>
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
                    <Button onClick={handleSave}>Guardar cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditarProductoDialog;
