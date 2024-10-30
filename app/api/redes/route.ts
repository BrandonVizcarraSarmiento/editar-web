import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const filePath = path.join(process.cwd(), "public", "data", "redes.json");

export async function handler(req: NextRequest) {
  try {
    // Verificar el método HTTP de la solicitud
    if (req.method === "GET") {
      // Lee el archivo JSON para el método GET
      const fileContents = await fs.readFile(filePath, "utf8");
      const redes = JSON.parse(fileContents);

      // Retorna el JSON como respuesta
      return NextResponse.json(redes);

    } else if (req.method === "POST") {
      // Procesar el contenido de la solicitud POST
      const { platform, url } = await req.json();
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);

      // Validar y actualizar el enlace
      if (data[platform]) {
        data[platform] = url;
      } else {
        return NextResponse.json({ message: "Plataforma no válida" }, { status: 400 });
      }

      // Guardar el archivo JSON actualizado
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));

      return NextResponse.json({ message: "Enlace actualizado correctamente" });
    } else {
      return NextResponse.json({ message: "Método no permitido" }, { status: 405 });
    }
  } catch (error) {
    console.error("Error en la API de redes:", error);
    return NextResponse.json({ message: "Error al procesar la solicitud" }, { status: 500 });
  }
}

export { handler as GET, handler as POST };