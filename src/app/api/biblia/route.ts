import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const busca = searchParams.get("busca");

  try {
    const response = await fetch(`https://bible-api.com/${busca}?translation=almeida`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar a Bíblia." },
      { status: 500 }
    );
  }
}