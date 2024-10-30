import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Función para listar las imágenes en el directorio /public/img
export async function GET() {
    const imgDirectory = path.join(process.cwd(), "public", "img");

    // Verificar si el directorio de imágenes existe
    if (!fs.existsSync(imgDirectory)) {
        return NextResponse.json({ images: [] });
    }

    // Leer archivos y filtrar solo las imágenes con extensiones específicas
    const files = fs.readdirSync(imgDirectory).filter((file) => {
        return file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg") || file.endsWith(".gif");
    });

    return NextResponse.json({ images: files });
}

// Función para eliminar una imagen especificada por el nombre
export async function POST(request: NextRequest) {
    try {
        const { imageName } = await request.json();
        const imgPath = path.join(process.cwd(), "public", "img", imageName);

        // Verificar si la imagen existe
        if (!fs.existsSync(imgPath)) {
            return NextResponse.json({ success: false, message: "Imagen no encontrada" });
        }

        // Intentar eliminar la imagen
        fs.unlinkSync(imgPath);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        return NextResponse.json({ success: false, message: "Error al eliminar la imagen" });
    }
}