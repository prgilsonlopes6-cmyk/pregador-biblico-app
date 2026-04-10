export async function POST(req: Request) {
  const { pergunta } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em geografia bíblica.",
        },
        {
          role: "user",
          content: pergunta,
        },
      ],
    }),
  });

  const data = await response.json();

  return Response.json({
    resposta: data.choices[0].message.content,
  });
}