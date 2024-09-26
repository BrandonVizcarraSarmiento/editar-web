import { getUserFromCookie } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
    const [correo, setUser] = useState<any>(null); // Estado para el usuario
    const [loading, setLoading] = useState(true); // Estado de cargando
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const correo = await getUserFromCookie();
            if (!correo) {
                // Redirige al login si no está autenticado
                router.replace('/login');
            } else {
                setUser(correo);
            }
            setLoading(false); // Cambia el estado de cargando después de la verificación
        };

        checkUser();
    }, [router]);

    return { correo, loading };
}
