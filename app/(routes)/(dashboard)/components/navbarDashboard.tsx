import { Button } from "@/components/ui/button";
import Link from "next/link";
import MenuMobileDashboard from "./menuMobileDashboard";

const NavbarDashboard = () => {
    return (
        <div className="flex">
            <aside className="hidden lg:flex w-64 shadow-md flex-col justify-between">
                {/* Usuario en la parte superior */}
                <div className="p-6 text-center">
                    <Link href="/dashboard" className="text-xl font-semibold">FishFood</Link>
                </div>
                {/* Opciones de navegación centradas */}
                <nav className="space-y-2 px-4 flex-1 flex flex-col">
                    <Link href="/dashboard/banner" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Banner
                    </Link>
                    <Link href="/dashboard/redes" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Redes
                    </Link>
                    <Link href="/dashboard/misionvision" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Misión, Visión y Valores
                    </Link>
                    <Link href="/dashboard/beneficios" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Beneficios
                    </Link>
                    <Link href="/dashboard/testimonios" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Testimonio
                    </Link>
                    <Link href="/dashboard/about" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Sobre Nosotros
                    </Link>
                    <Link href="/dashboard/galeria" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Galeria
                    </Link>
                </nav>
                {/* Botón de cerrar sesión en la parte inferior */}
                <div className="px-4 mb-6">
                    <Button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center">
                        Cerrar Sesión
                    </Button>
                </div>
            </aside>

            {/* Contenedor para el modo móvil */}
            <div className="flex lg:hidden justify-between items-center p-4 shadow-md w-full">
                <Link href="/dashboard" className="text-xl font-semibold">FishFood</Link>
                <div className="ml-auto">
                    <MenuMobileDashboard />
                </div>
            </div>
        </div>
    );
}

export default NavbarDashboard;
