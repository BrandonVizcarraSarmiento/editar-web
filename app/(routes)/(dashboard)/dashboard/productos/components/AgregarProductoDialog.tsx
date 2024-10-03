import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Producto } from "@/types/producto";

interface AgregarProductoDialogProps {
    productos: Producto[];
    onSave: (producto: Producto) => void;
    children: ReactNode;
}

const AgregarProductoDialog = ({ productos, onSave, children }: AgregarProductoDialogProps) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [imagen, setImagen] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const getNextId = () => {
        if (productos.length === 0) return 1;
        return Math.max(...productos.map((p) => p.id)) + 1;
    };

    const handleSave = async () => {
        if (!nombre || !descripcion || precio <= 0 || !imagen) {
            setError("Todos los campos son obligatorios y el precio debe ser mayor a 0.");
            return;
        }

        const nuevoProducto: Producto = {
            id: getNextId(),
            nombre,
            descripcion,
            precio,
            imagen,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const response = await fetch("http://localhost:4000/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto),
            });

            if (response.ok) {
                onSave(nuevoProducto);
                setIsOpen(false); // Cerrar el diálogo si se agrega correctamente
            } else {
                setError("Error al agregar el producto.");
            }
        } catch (error) {
            setError("Error de conexión.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Producto</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <form>
                    <div className="space-y-4">
                        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del producto" />
                        <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" />
                        <Input value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value))} placeholder="Precio" type="number" />
                        <Input value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="URL de la imagen" />
                    </div>
                </form>
                <DialogFooter>
                    <Button onClick={handleSave}>Agregar producto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AgregarProductoDialog;
