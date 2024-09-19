import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
    try {
        // Construye la ruta al archivo JSON dentro de public
        const filePath = path.join(process.cwd(), "public", "data", "redes.json");

        // Lee el archivo JSON
        const fileContents = await fs.readFile(filePath, "utf8");

        // Parsea el contenido del archivo como JSON
        const redes = JSON.parse(fileContents);

        // Retorna el JSON como respuesta
        return NextResponse.json(redes);
    } catch (error) {
        return new NextResponse("Error al leer el archivo JSON", { status: 500 });
    }
}
