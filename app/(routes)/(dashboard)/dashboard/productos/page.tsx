"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import { Producto } from "@/types/producto";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import AgregarProductoDialog from "./components/AgregarProductoDialog";
import EditarProductoDialog from "./components/EditarProductoDialog";

// Función para limitar la descripción a 50 caracteres
const limitarDescripcion = (descripcion: string, limiteCaracteres: number) => {
    if (descripcion.length > limiteCaracteres) {
        return descripcion.slice(0, limiteCaracteres) + "...";
    }
    return descripcion;
};

const SeccionProductos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productoActual, setProductoActual] = useState<Producto | null>(null);
    const [productoAEliminar, setProductoAEliminar] = useState<Producto | null>(null);

    // Estado para manejar el toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Función para mostrar el toast
    const mostrarToast = (mensaje: string) => {
        setToastMessage(mensaje);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setToastMessage(null);
        }, 3000); // Ocultar el toast después de 3 segundos
    };

    // Obtener productos de la API
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

    // Guardar o actualizar un producto
    const handleSaveProducto = (producto: Producto) => {
        const isEdit = productos.some((p) => p.id === producto.id);

        if (isEdit) {
            setProductos((prev) => prev.map((p) => (p.id === producto.id ? producto : p)));
            mostrarToast("El producto ha sido editado correctamente.");
        } else {
            setProductos((prev) => [...prev, producto]);
            mostrarToast("Se agregó un nuevo producto.");
        }
        setProductoActual(null);
    };

    // Eliminar un producto
    const eliminarProducto = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:4000/api/productos/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setProductos((prev) => prev.filter((producto) => producto.id !== id));
                mostrarToast("El producto ha sido eliminado.");
            } else {
                console.error("Error al eliminar el producto.");
            }
        } catch (error) {
            console.error("Error de conexión: ", error);
        }
        setProductoAEliminar(null);
    };

    // Manejar el diálogo de edición
    const handleEditProducto = (producto: Producto) => {
        setProductoActual(producto);
    };

    return (
        <div className="p-8">
            {/* Mostrar el toast */}
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
                >
                    <Button>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Agregar Producto
                    </Button>
                </AgregarProductoDialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productos.map((producto) => (
                        <TableRow key={producto.id}>
                            <TableCell>{producto.nombre}</TableCell>
                            <TableCell>{limitarDescripcion(producto.descripcion, 40)}</TableCell>
                            <TableCell>S/. {producto.precio.toFixed(2)}</TableCell>
                            <TableCell>
                                <img src={producto.imagen} alt={producto.nombre} className="w-16 h-16 object-cover" />
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <EditarProductoDialog
                                        producto={producto}
                                        onSave={handleSaveProducto}
                                    >
                                        <Button variant="outline" size="sm">
                                            <PencilIcon className="h-4 w-4 mr-2" />
                                            <span>Editar</span>
                                        </Button>
                                    </EditarProductoDialog>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">
                                                <TrashIcon className="h-4 w-4 mr-2" />
                                                <span>Eliminar</span>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    ¿Deseas eliminar este producto?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. El producto será eliminado de forma permanente.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => eliminarProducto(producto.id)}
                                                    className="bg-red-500 text-white hover:bg-red-600"
                                                >
                                                    Eliminar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SeccionProductos;
