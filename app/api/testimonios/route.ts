import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

const jsonPath = path.join(process.cwd(), "public", "data", "testimonios.json");
const uploadPath = path.join(process.cwd(), "public", "img");

const ensureUploadDirectoryExists = () => {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
};

export async function GET() {
    if (!fs.existsSync(jsonPath)) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileContents = fs.readFileSync(jsonPath, "utf-8");
    const testimonios = JSON.parse(fileContents);

    return NextResponse.json(testimonios);
}

export async function POST(request: NextRequest) {
    // Manejar el caso de la carga de imágenes
    const contentType = request.headers.get("content-type");
    if (contentType && contentType.includes("multipart/form-data")) {
        const data = await request.formData();
        const file = data.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "File not provided" }, { status: 400 });
        }

        ensureUploadDirectoryExists();
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(uploadPath, file.name);
        await writeFile(filePath, buffer);

        return NextResponse.json({ success: true, filePath: `/img/${file.name}` });
    }

    // Manejar el caso de actualización de testimonios
    const { id, nombre, testimonio, avatar } = await request.json();

    if (!fs.existsSync(jsonPath)) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileContents = fs.readFileSync(jsonPath, "utf-8");
    const testimonios = JSON.parse(fileContents);

    const index = testimonios.findIndex((item: { id: number }) => item.id === id);
    if (index !== -1) {
        testimonios[index] = { id, nombre, testimonio, avatar };
        fs.writeFileSync(jsonPath, JSON.stringify(testimonios, null, 2));
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Testimonio not found" }, { status: 404 });
}
