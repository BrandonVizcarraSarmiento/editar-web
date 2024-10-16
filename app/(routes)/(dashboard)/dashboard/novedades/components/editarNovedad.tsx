import { ReactNode, useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Novedad } from "@/types/novedad"; // Tipo Novedad
import { useUpdateNovedad } from "@/api/novedades/useUpdateNovedad"; // Implementación de la API

interface EditarNovedadProps {
    novedad: Novedad; // La novedad que se va a editar
    onUpdate: (novedad: Novedad) => void;
    children: ReactNode;
}

const EditarNovedad = ({
    novedad,
    onUpdate,
    children,
}: EditarNovedadProps) => {
    const [formData, setFormData] = useState({
        titulo: "",
        info: "",
        imagen: "",
        fecha: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (novedad) {
            setFormData({
                titulo: novedad.titulo,
                info: novedad.info,
                imagen: novedad.imagen,
                fecha: novedad.fecha,
            });
        }
    }, [novedad]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        const { titulo, info, imagen, fecha } = formData;

        if (!titulo || !info || !imagen || !fecha) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const updatedNovedad: Novedad = {
            ...novedad, // Mantener los mismos valores de ID y fechas
            titulo,
            info,
            imagen,
            fecha,
            updatedAt: new Date().toISOString(),
        };

        const success = await useUpdateNovedad(updatedNovedad);

        if (success) {
            onUpdate(updatedNovedad);
            setIsOpen(false);
        } else {
            setError("Error al actualizar la novedad.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Novedad</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <form>
                    <div className="space-y-4">
                        <Input
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleInputChange}
                            placeholder="Título de la novedad"
                        />
                        <Input
                            name="info"
                            value={formData.info}
                            onChange={handleInputChange}
                            placeholder="Descripción o información"
                        />
                        <Input
                            name="imagen"
                            value={formData.imagen}
                            onChange={handleInputChange}
                            placeholder="URL de la imagen"
                        />
                        <Input
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleInputChange}
                            placeholder="Fecha"
                            type="date"
                        />
                    </div>
                </form>
                <DialogFooter>
                    <Button onClick={handleSave}>Guardar cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditarNovedad;