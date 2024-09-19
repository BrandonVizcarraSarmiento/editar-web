import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  const jsonPath = path.join(process.cwd(), "public", "data", "beneficios.json");

  if (!fs.existsSync(jsonPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileContents = fs.readFileSync(jsonPath, "utf-8");
  const beneficiosData = JSON.parse(fileContents);

  return NextResponse.json(beneficiosData);
}
