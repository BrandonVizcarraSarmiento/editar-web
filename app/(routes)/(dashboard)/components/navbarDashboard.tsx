import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavbarDashboard = () => {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 shadow-md flex flex-col justify-between">
                {/* Usuario en la parte superior */}
                <div className="p-6">
                    <h2 className="text-center text-xl font-semibold">FishFood</h2>
                </div>

                {/* Opciones de navegación centradas */}
                <nav className="space-y-2 px-4 flex-1 flex flex-col text-white ">

                    <Link href="/dashboard/banner" className="flex items-center p-2  hover:bg-gray-500 rounded">
                        Banner
                    </Link>
                    <Link href="/dashboard/redes" className="flex items-center p-2  hover:bg-gray-500 rounded">
                        Redes
                    </Link>
                    <Link href="/dashboard/misionvision" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Misión, Visión y Valores
                    </Link>
                    <Link href="#" className="flex items-center p-2  hover:bg-gray-500 rounded">
                        beneficios
                    </Link>
                    <Link href="/dashboard/testimonios" className="flex items-center p-2  hover:bg-gray-500 rounded">
                        Testimonio
                    </Link>
                    <Link href="#" className="flex items-center p-2  hover:bg-gray-500 rounded">
                        Sobre Nosotros
                    </Link>
                </nav>

                {/* Botón de cerrar sesión en la parte inferior */}
                <div className="px-4 mb-6">
                    <Button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center">
                        Cerrar Sesión
                    </Button>
                </div>
            </aside>
        </div>
    );
}

export default NavbarDashboard;