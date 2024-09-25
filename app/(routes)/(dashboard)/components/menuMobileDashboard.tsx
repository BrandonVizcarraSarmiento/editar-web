import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menu } from "lucide-react";
import Link from "next/link";

const MenuMobileDashboard = () => {
    return (
        <Popover>
            <PopoverTrigger className="p-2 rounded-full hover:bg-gray-200 transition-all">
                <Menu className="h-6 w-6 text-gray-700" />
            </PopoverTrigger>
            <PopoverContent className="rounded-lg shadow-lg p-4 space-y-2">
                <Link href="/dashboard/banner" className="flex items-center p-2  hover:bg-gray-500 rounded">
                    Banner
                </Link>
                <Link href="/dashboard/redes" className="flex items-center p-2  hover:bg-gray-500 rounded">
                    Redes
                </Link>
                <Link href="/dashboard/misionvision" className="flex items-center p-2 hover:bg-gray-500 rounded">
                    Misión, Visión y Valores
                </Link>
                <Link href="/dashboard/beneficios" className="flex items-center p-2  hover:bg-gray-500 rounded">
                    Beneficios
                </Link>
                <Link href="/dashboard/testimonios" className="flex items-center p-2  hover:bg-gray-500 rounded">
                    Testimonio
                </Link>
                <Link href="/dashboard/about" className="flex items-center p-2  hover:bg-gray-500 rounded">
                    Sobre Nosotros
                </Link>
                <Link href="/dashboard/galeria" className="flex items-center p-2  hover:bg-gray-500 rounded">
                    Galeria
                </Link>
                <div className="px-4 mb-6">
                    <Button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center">
                        Cerrar Sesión
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default MenuMobileDashboard;