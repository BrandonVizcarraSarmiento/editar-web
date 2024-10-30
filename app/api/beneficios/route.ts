import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

// Maneja tanto GET como POST
export async function GET() { // Eliminar 'request' aquí
  const jsonPath = path.join(process.cwd(), "public", "data", "beneficios.json");

  if (!fs.existsSync(jsonPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileContents = fs.readFileSync(jsonPath, "utf-8");
  const beneficiosData = JSON.parse(fileContents);

  return NextResponse.json(beneficiosData);
}

// La función POST sigue igual
export async function POST(request: NextRequest) {
  const { beneficios } = await request.json();

  const jsonPath = path.join(process.cwd(), "public", "data", "beneficios.json");

  if (!fs.existsSync(jsonPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(beneficios, null, 2));

  return NextResponse.json({ success: true });
}