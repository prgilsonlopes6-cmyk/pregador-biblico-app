import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function openDb(): Promise<Database> {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'biblioteca.db');
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    // Inicializar tabelas base
    await db.exec(`
      CREATE TABLE IF NOT EXISTS verses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book TEXT,
        chapter INTEGER,
        verse INTEGER,
        text_pt TEXT,
        text_original TEXT,
        transliteration TEXT
      );
      CREATE TABLE IF NOT EXISTS dictionary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        strong_code TEXT,
        original_word TEXT,
        transliteration TEXT,
        definition TEXT
      );
      CREATE TABLE IF NOT EXISTS sermons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
  return db;
}
