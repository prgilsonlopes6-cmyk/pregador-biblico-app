import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Missing query parameter q' }, { status: 400 });
  }

  try {
    const db = await openDb();
    
    const results = await db.all(
      `SELECT * FROM verses WHERE text_pt LIKE ? OR book LIKE ? LIMIT 10`,
      [`%${q}%`, `%${q}%`]
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to query database. Are tables populated?' }, { status: 500 });
  }
}
