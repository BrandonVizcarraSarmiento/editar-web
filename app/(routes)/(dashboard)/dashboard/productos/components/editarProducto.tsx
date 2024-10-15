import { ReactNode, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Producto } from "@/types/producto";

interface EditarProductoDialogProps {
    producto: Producto | null;
    onSave: (producto: Producto) => void;
    onUpdateDestacados: (productos: Producto[]) => void;
    productos: Producto[];
    children: ReactNode;
}

const EditarProductoDialog = ({ producto, onSave, onUpdateDestacados, productos, children }: EditarProductoDialogProps) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [imagen, setImagen] = useState("");
    const [destacado, setDestacado] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (producto) {
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setPrecio(producto.precio);
            setImagen(producto.imagen);
            setDestacado(producto.destacado);
        }
    }, [producto]);

    const handleSave = async () => {
        if (!nombre || !descripcion || precio <= 0 || !imagen) {
            setError("Todos los campos son obligatorios y el precio debe ser mayor a 0.");
            return;
        }

        const destacadosActuales = productos.filter(p => p.destacado);
        const esDestacadoActual = producto?.destacado;

        if (destacado && !esDestacadoActual && destacadosActuales.length >= 3) {
            const productoAMover = destacadosActuales[0];
            await fetch(`http://localhost:4000/api/productos/${productoAMover.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...productoAMover, destacado: false }),
            });
        }

        const updatedProducto: Producto = {
            ...producto!,
            nombre,
            descripcion,
            precio,
            imagen,
            destacado,
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
                onUpdateDestacados([...productos.filter(p => p.id !== producto?.id), updatedProducto]);
                setIsOpen(false);
            } else {
                setError("Error al editar el producto.");
            }
        } catch {
            setError("Error de conexión.");
        }
    };

    const handleCheckboxChange = (checked: boolean) => {
        setDestacado(checked);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Producto</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <form>
                    <div className="space-y-4">
                        <Input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Nombre del producto"
                        />
                        <Input
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Descripción"
                        />
                        <Input
                            value={precio}
                            onChange={(e) => setPrecio(parseFloat(e.target.value))}
                            placeholder="Precio"
                            type="number"
                        />
                        <Input
                            value={imagen}
                            onChange={(e) => setImagen(e.target.value)}
                            placeholder="URL de la imagen"
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="destacado"
                                checked={destacado}
                                onCheckedChange={handleCheckboxChange}
                                disabled={producto?.destacado}
                            />
                            <label htmlFor="destacado" className="cursor-pointer">
                                Destacado
                            </label>
                        </div>
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