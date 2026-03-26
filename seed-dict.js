const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(process.cwd(), 'biblioteca.db');
const db = new sqlite3.Database(dbPath);

const terms = [
  {
    original_word: 'Amor',
    transliteration: 'Agapé / Phileo',
    strong_code: 'G26 / G5368',
    definition: 'No contexto bíblico, o amor ágape refere-se ao amor incondicional e sacrificial de Deus. Na visão assembleiana, é o fundamento da vida cristã e do fruto do Espírito.'
  },
  {
    original_word: 'Graça',
    transliteration: 'Charis',
    strong_code: 'G5485',
    definition: 'Favor imerecido de Deus concedido ao homem para salvação e capacitação. Elemento central da soteriologia assembleiana, enfatizando a dependência total de Deus.'
  },
  {
    original_word: 'Fé',
    transliteration: 'Pistis',
    strong_code: 'G4102',
    definition: 'Crença, confiança e fidelidade a Deus. É o meio pelo qual recebemos a salvação e operamos nos dons do Espírito Santo.'
  },
  {
    original_word: 'Espírito Santo',
    transliteration: 'Pneuma Hagion / Ruach HaKodesh',
    strong_code: 'G40 / H7307',
    definition: 'A terceira pessoa da Trindade. Nas Assembleias de Deus, enfatizamos Sua atuação constante através do batismo com o Espírito Santo (com evidência de línguas) e os dons espirituais.'
  },
  {
    original_word: 'Batismo',
    transliteration: 'Baptisma',
    strong_code: 'G908',
    definition: 'Imersão. Refere-se tanto ao batismo em águas (pública profissão de fé) quanto ao batismo no Espírito Santo (revestimento de poder).'
  },
  {
    original_word: 'Igreja',
    transliteration: 'Ekklesia',
    strong_code: 'G1577',
    definition: 'Assembléia de chamados para fora. O corpo de Cristo na terra, onde a comunidade se reúne para adoração, ensino da Palavra e exercício dos dons.'
  },
  {
    original_word: 'Santo',
    transliteration: 'Hagios / Kadosh',
    strong_code: 'G40 / H6918',
    definition: 'Separado, consagrado. Atributo de Deus e chamado para o crente viver em santificação, afastando-se do pecado e dedicando-se ao Senhor.'
  }
];

db.serialize(() => {
  // Garantir que a tabela existe
  db.run(`CREATE TABLE IF NOT EXISTS dictionary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_word TEXT,
    transliteration TEXT,
    strong_code TEXT,
    definition TEXT
  )`);

  const stmt = db.prepare("INSERT INTO dictionary (original_word, transliteration, strong_code, definition) VALUES (?, ?, ?, ?)");
  
  terms.forEach(term => {
    stmt.run(term.original_word, term.transliteration, term.strong_code, term.definition);
  });

  stmt.finalize();
  console.log("Dicionário povoado com sucesso!");
});

db.close();
