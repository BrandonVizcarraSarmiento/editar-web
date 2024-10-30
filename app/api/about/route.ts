import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

const jsonPath = path.join(process.cwd(), "public", "data", "about.json");

// Manejo de la solicitud GET
export async function GET() {
    if (!fs.existsSync(jsonPath)) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileContents = fs.readFileSync(jsonPath, "utf-8");
    const aboutData = JSON.parse(fileContents);
    return NextResponse.json(aboutData);
}

// Manejo de la solicitud POST
export async function POST(request: NextRequest) {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        const { section, texto, imagen } = await request.json();

        if (!fs.existsSync(jsonPath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const fileContents = fs.readFileSync(jsonPath, "utf-8");
        const aboutData = JSON.parse(fileContents);

        if (aboutData[section]) {
            aboutData[section].texto = texto;
            if (imagen) {
                aboutData[section].imagen = imagen;
            }
            fs.writeFileSync(jsonPath, JSON.stringify(aboutData, null, 2));
        }

        return NextResponse.json({ success: true });
    } else if (contentType.includes("multipart/form-data")) {
        const data = await request.formData();
        const file = data.get("file") as File | null;
        const type = data.get("type") as string;

        if (!file || !type) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(process.cwd(), "public", "img", file.name);
        await writeFile(filePath, buffer);

        return NextResponse.json({ success: true, filePath: `/img/${file.name}` });
    }

    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
}