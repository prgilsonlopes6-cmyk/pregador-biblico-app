import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const busca = searchParams.get("busca");

  try {
    const response = await fetch(`https://bible-api.com/${busca}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { erro: "Erro ao buscar dados" },
      { status: 500 }
    );
  }
}