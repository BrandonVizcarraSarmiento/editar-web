import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const filePath = path.join(process.cwd(), "public", "data", "redes.json");

// Manejo de la solicitud GET
export async function GET() {
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const redes = JSON.parse(fileContents);
    return NextResponse.json(redes);
  } catch (error) {
    console.error("Error en la API de redes:", error);
    return NextResponse.json({ message: "Error al procesar la solicitud" }, { status: 500 });
  }
}

// Manejo de la solicitud POST
export async function POST(req: NextRequest) {
  try {
    const { platform, url } = await req.json();
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    if (data[platform]) {
      data[platform] = url;
    } else {
      return NextResponse.json({ message: "Plataforma no válida" }, { status: 400 });
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: "Enlace actualizado correctamente" });
  } catch (error) {
    console.error("Error en la API de redes:", error);
    return NextResponse.json({ message: "Error al procesar la solicitud" }, { status: 500 });
  }
}