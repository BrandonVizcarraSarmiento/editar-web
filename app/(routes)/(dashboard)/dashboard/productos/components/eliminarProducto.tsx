import React from "react";
import { Button } from "@/components/ui/button";
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
import { TrashIcon } from "lucide-react";

interface EliminarProductoDialogProps {
    id: number;
    onDelete: (id: number) => void;
}

const EliminarProductoDialog: React.FC<EliminarProductoDialogProps> = ({ id, onDelete }) => {
    const eliminarProducto = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/productos/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                onDelete(id);
            } else {
                console.error("Error al eliminar el producto.");
            }
        } catch (error) {
            console.error("Error de conexión: ", error);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <TrashIcon className="h-4 w-4 mr-2" /> {/* Ícono de eliminar */}
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
                    <AlertDialogAction onClick={eliminarProducto}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EliminarProductoDialog;
