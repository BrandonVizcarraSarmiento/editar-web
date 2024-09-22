// app/api/galeria/getImages/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
    const imgDirectory = path.join(process.cwd(), "public", "img");

    if (!fs.existsSync(imgDirectory)) {
        return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(imgDirectory).filter((file) => {
        // Filtrar solo los archivos con extensiones de imágenes (puedes ajustar según tus necesidades)
        return file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg") || file.endsWith(".gif");
    });

    return NextResponse.json({ images: files });
}
