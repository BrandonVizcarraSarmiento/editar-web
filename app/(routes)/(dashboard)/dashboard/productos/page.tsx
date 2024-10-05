"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input"; // Componente de Input para el buscador
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"; // Componente de Select para el selector de columnas
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox dentro del select
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
import { PaginationProductos } from "./components/pagination";

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
    const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para el buscador
    const [visibleColumns, setVisibleColumns] = useState({
        nombre: true,
        descripcion: true,
        precio: true,
        imagen: true,
        acciones: true,
    }); // Estado para el selector de columnas

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Número de productos por página

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

    // Filtrar productos según el término de búsqueda
    const filteredProductos = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginación - Calcular los productos que se mostrarán en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);

    // Manejar el cambio de página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Manejar la visibilidad de columnas
    const handleColumnVisibility = (column: keyof typeof visibleColumns) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
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
                <AgregarProductoDialog productos={productos} onSave={handleSaveProducto}>
                    <Button>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Agregar Producto
                    </Button>
                </AgregarProductoDialog>
            </div>

            <div className="mb-4 flex items-center space-x-4">
                <Input
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />

                {/* Selector de columnas */}
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <span>Seleccionar columnas</span>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(visibleColumns).map((col) => (
                            <div key={col} className="flex items-center px-2 py-1">
                                <Checkbox
                                    checked={visibleColumns[col as keyof typeof visibleColumns]}
                                    onCheckedChange={() => handleColumnVisibility(col as keyof typeof visibleColumns)}
                                />
                                <label className="ml-2 capitalize">{col}</label>
                            </div>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {visibleColumns.nombre && <TableHead>Nombre</TableHead>}
                        {visibleColumns.descripcion && <TableHead>Descripción</TableHead>}
                        {visibleColumns.precio && <TableHead>Precio</TableHead>}
                        {visibleColumns.imagen && <TableHead>Imagen</TableHead>}
                        {visibleColumns.acciones && <TableHead>Acciones</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((producto) => (
                        <TableRow key={producto.id}>
                            {visibleColumns.nombre && <TableCell>{producto.nombre}</TableCell>}
                            {visibleColumns.descripcion && <TableCell>{limitarDescripcion(producto.descripcion, 40)}</TableCell>}
                            {visibleColumns.precio && <TableCell>S/. {producto.precio.toFixed(2)}</TableCell>}
                            {visibleColumns.imagen && (
                                <TableCell>
                                    <img src={producto.imagen} alt={producto.nombre} className="w-16 h-16 object-cover" />
                                </TableCell>
                            )}
                            {visibleColumns.acciones && (
                                <TableCell>
                                    <div className="flex gap-2">
                                        <EditarProductoDialog producto={producto} onSave={handleSaveProducto}>
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
                                                    <AlertDialogTitle>¿Deseas eliminar este producto?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta acción no podrá deshacerse.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => eliminarProducto(producto.id)}>
                                                        Eliminar
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Paginación con el componente de Shadcn */}
            <PaginationProductos
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalItems={filteredProductos.length}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default SeccionProductos;
