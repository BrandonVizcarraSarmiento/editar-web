"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PencilIcon } from "lucide-react";
import { Novedad } from "@/types/novedad";

interface TablaNovedadProps {
    novedades: Novedad[];
    setNovedades: React.Dispatch<React.SetStateAction<Novedad[]>>;
}

const limitarDescripcion = (info: string, limiteCaracteres: number) => {
    return info.length > limiteCaracteres ? info.slice(0, limiteCaracteres) + "..." : info;
};

const TablaNovedad: React.FC<TablaNovedadProps> = ({ novedades, setNovedades }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const mostrarToast = (mensaje: string) => {
        setToastMessage(mensaje);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setToastMessage(null);
        }, 3000);
    };

    const filteredNovedades = novedades.filter((novedad) =>
        novedad.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredNovedades.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const eliminarNovedad = (id: number) => {
        setNovedades((prev: Novedad[]) => prev.filter((novedad) => novedad.id !== id));
        mostrarToast("La novedad ha sido eliminada.");
    };

    return (
        <div>
            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}

            <div className="mb-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <Input
                    placeholder="Buscar novedad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-auto"
                />
                <Select onValueChange={(value) => setItemsPerPage(parseInt(value))}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <span>Filas por página</span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3">3 filas</SelectItem>
                        <SelectItem value="5">5 filas</SelectItem>
                        <SelectItem value="10">10 filas</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Info</TableHead>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((novedad) => (
                        <TableRow key={novedad.id}>
                            <TableCell>{novedad.titulo}</TableCell>
                            <TableCell>{limitarDescripcion(novedad.info, 50)}</TableCell>
                            <TableCell>
                                <img src={novedad.imagen} alt={novedad.titulo} className="w-16 h-16 object-cover" />
                            </TableCell>
                            <TableCell>{novedad.fecha}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </div>
    );
};

export default TablaNovedad;