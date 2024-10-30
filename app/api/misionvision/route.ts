import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { writeFile } from "fs/promises";
import path from "path";

const jsonPath = path.join(process.cwd(), "public", "data", "misionVision.json");

// Manejo de la solicitud GET
export async function GET() {
    if (!fs.existsSync(jsonPath)) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    const fileContents = fs.readFileSync(jsonPath, "utf-8");
    const misionVisionData = JSON.parse(fileContents);
    return NextResponse.json(misionVisionData);
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
        const misionVisionData = JSON.parse(fileContents);

        if (misionVisionData[section]) {
            misionVisionData[section].texto = texto;
            if (imagen) {
                misionVisionData[section].imagen = imagen;
            }
            fs.writeFileSync(jsonPath, JSON.stringify(misionVisionData, null, 2));
        }

        return NextResponse.json({ success: true });
    } else if (contentType.includes("multipart/form-data")) {
        const data = await request.formData();
        const file = data.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(process.cwd(), "public", "img", file.name);
        await writeFile(filePath, buffer);

        return NextResponse.json({ success: true, filePath: `/img/${file.name}` });
    }

    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}