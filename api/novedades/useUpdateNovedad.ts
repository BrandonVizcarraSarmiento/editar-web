import { Novedad } from "@/types/novedad";

export async function useUpdateNovedad(novedad: Novedad): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/novedades/${novedad.id}`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novedad),
        });

        if (!response.ok) {
            console.error("Error al actualizar la novedad.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return false;
    }
}
