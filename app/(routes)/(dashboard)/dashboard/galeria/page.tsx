"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Galeria = () => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Obtener las imágenes al cargar el componente
    useEffect(() => {
        const fetchImages = async () => {
            const res = await fetch("/api/galeria/get");
            const data = await res.json();
            setImages(data.images);
        };

        fetchImages();
    }, []);

    // Función para eliminar imagen
    const handleDelete = async () => {
        if (!selectedImage) return;

        const res = await fetch("/api/galeria/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageName: selectedImage }),
        });

        const result = await res.json();

        if (result.success) {
            alert("Imagen eliminada correctamente");
            setImages((prevImages) => prevImages.filter((img) => img !== selectedImage));
            setSelectedImage(null); // Limpiar la imagen seleccionada
        } else {
            alert("Error al eliminar la imagen");
        }
    };

    return (
        <div className="p-4 max-h-screen" style={{ height: "90vh" }}>
            <h2 className="text-xl font-bold mb-4">Galería de Imágenes</h2>
            <div className="overflow-y-auto scrollbar-hide max-h-full p-2 border border-gray-300 rounded-lg">
                {/* Contenedor con scroll pero sin mostrar el scrollbar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                        <div key={image} className="relative">
                            <img
                                src={`/img/${image}`}
                                alt={image}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        onClick={() => setSelectedImage(image)}
                                        className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded"
                                    >
                                        Eliminar
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Deseas eliminar esta imagen?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. La imagen será eliminada de forma permanente.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDelete}
                                            className="bg-red-500 text-white"
                                        >
                                            Eliminar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Galeria;
