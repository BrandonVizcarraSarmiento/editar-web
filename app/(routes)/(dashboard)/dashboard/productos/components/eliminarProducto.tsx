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
import { useDeleteProducto } from "@/api/productos/useDeleteProducto";

interface EliminarProductoDialogProps {
    id: number;
    onDelete: (id: number) => void;
}

const EliminarProductoDialog: React.FC<EliminarProductoDialogProps> = ({ id, onDelete }) => {
    const eliminarProducto = async () => {
        const success = await useDeleteProducto(id);

        if (success) {
            onDelete(id);
        } else {
            console.error("Error al eliminar el producto.");
        }
    };

    return (
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
                    <AlertDialogAction onClick={eliminarProducto}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EliminarProductoDialog;