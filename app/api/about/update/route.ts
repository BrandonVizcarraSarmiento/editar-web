import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const { section, texto, imagen } = await request.json();
  const jsonPath = path.join(process.cwd(), "public", "data", "about.json");

  if (!fs.existsSync(jsonPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileContents = fs.readFileSync(jsonPath, "utf-8");
  const aboutData = JSON.parse(fileContents);

  // Actualizar solo la sección correspondiente
  if (aboutData[section]) {
    aboutData[section].texto = texto;
    if (imagen) {
      aboutData[section].imagen = imagen; // Actualizar imagen solo si se proporciona
    }
    fs.writeFileSync(jsonPath, JSON.stringify(aboutData, null, 2));
  }

  return NextResponse.json({ success: true });
}
