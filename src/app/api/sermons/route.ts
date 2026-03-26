import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await openDb();
    const sermons = await db.all('SELECT * FROM sermons ORDER BY created_at DESC');
    return NextResponse.json(sermons);
  } catch (error: any) {
    console.error('Sermons GET Error:', error);
    return NextResponse.json({ error: 'Erro ao buscar sermões.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Título e conteúdo são obrigatórios.' }, { status: 400 });
    }

    const db = await openDb();

    if (id) {
      // Update existing
      await db.run(
        'UPDATE sermons SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
      );
      return NextResponse.json({ success: true, id });
    } else {
      // Create new
      const result = await db.run(
        'INSERT INTO sermons (title, content) VALUES (?, ?)',
        [title, content]
      );
      return NextResponse.json({ success: true, id: result.lastID });
    }
  } catch (error: any) {
    console.error('Sermons POST Error:', error);
    return NextResponse.json({ error: 'Erro ao salvar sermão.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json({ error: 'ID é obrigatório para exclusão.' }, { status: 400 });
      }
  
      const db = await openDb();
      await db.run('DELETE FROM sermons WHERE id = ?', [id]);
  
      return NextResponse.json({ success: true });
    } catch (error: any) {
      console.error('Sermons DELETE Error:', error);
      return NextResponse.json({ error: 'Erro ao excluir sermão.' }, { status: 500 });
    }
}
