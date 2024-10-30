import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

export async function handler(request: NextRequest) {
    const jsonPath = path.join(process.cwd(), "public", "data", "banner.json");
    const imgDirectoryPath = path.join(process.cwd(), "public", "img");

    if (request.method === "GET") {
        // Manejo de GET para obtener la información del banner
        if (!fs.existsSync(jsonPath)) {
            return NextResponse.json({ image: null });
        }

        const fileContents = fs.readFileSync(jsonPath, "utf-8");
        const bannerData = JSON.parse(fileContents);

        if (!bannerData.image || !bannerData.image.startsWith('/img/')) {
            return NextResponse.json({ image: null });
        }

        return NextResponse.json(bannerData);
    }

    else if (request.method === "POST") {
        if (request.headers.get("content-type")?.includes("application/json")) {
            // Manejo de POST para actualizar la ruta de la imagen en `banner.json`
            const { image } = await request.json();
            const bannerData = { image };

            fs.writeFileSync(jsonPath, JSON.stringify(bannerData, null, 2));

            return NextResponse.json({ success: true });
        }

        else if (request.headers.get("content-type")?.includes("multipart/form-data")) {
            // Manejo de POST para cargar un archivo de imagen en el directorio público
            const data = await request.formData();
            const file = data.get("file") as File | null;

            if (!file) {
                return NextResponse.json({ success: false }, { status: 400 });
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            if (!fs.existsSync(imgDirectoryPath)) {
                fs.mkdirSync(imgDirectoryPath, { recursive: true });
            }

            const filePath = path.join(imgDirectoryPath, file.name);
            await writeFile(filePath, buffer);

            return NextResponse.json({ success: true, filePath: `/img/${file.name}` });
        }
    }

    return NextResponse.json({ success: false, message: "Método no soportado" }, { status: 405 });
}
export { handler as GET, handler as POST };