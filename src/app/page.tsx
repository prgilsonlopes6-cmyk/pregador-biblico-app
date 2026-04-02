import Link from 'next/link';

export default function Home() {
  return (
    <div className="glass-panel" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '0.2rem', fontWeight: 700 }}>
        Pregador <span className="text-accent">Bíblico</span>
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--gold-accent)', marginBottom: '1rem', fontWeight: 'bold' }}>
        Pr. Gilson Lopes
      </p>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Estudo profundo, exegese no original e plataforma de sermões estruturados.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>

        <div className="glass-panel" style={{ background: 'rgba(20, 25, 30, 0.4)' }}>
          <h2 style={{ marginBottom: '1rem' }} className="text-gold">📖 Pesquisa Bíblica Digital</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Pesquise versículos em português (ARA), acesse referências cruzadas e ferramentas de estudo integradas.
          </p>
          <Link href="/biblioteca">
            <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, var(--gold-accent), #c19324)', color: '#111', fontSize: '1.1rem' }}>
              Pesquisar na Bíblia
            </button>
          </Link>
        </div>

        <div className="glass-panel" style={{ background: 'rgba(20, 25, 30, 0.4)', textAlign: 'left' }}>
          <h2 style={{ marginBottom: '1rem' }} className="text-accent">🖋️ Gerador de Sermões</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Monte esboços contextuais usando o conhecimento extraído da biblioteca e organize suas ministrações com o assistente Inteligente oficial.
          </p>
          <Link href="/sermoes">
            <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>
              Criar e Gerenciar Sermões
            </button>
          </Link>
        </div>

        <div className="glass-panel" style={{ background: 'rgba(20, 25, 30, 0.4)', textAlign: 'left' }}>
          <h2 style={{ marginBottom: '1rem' }} className="text-accent">🗺️ Geografia Bíblica</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Estudo sistemático das terras bíblicas: relevo, clima, mapas e a importância estratégica das regiões e cidades.
          </p>
          <Link href="/atlas">
            <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', background: 'linear-gradient(135deg, #10b981, #065f46)' }}>
              Abrir Geografia Bíblica
            </button>
          </Link>
        </div>

        <div className="glass-panel" style={{ background: 'rgba(20, 25, 30, 0.4)', textAlign: 'left' }}>
          <h2 style={{ marginBottom: '1rem' }} className="text-gold">⏳ Cronologia Bíblica</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Localize-se na história com uma linha do tempo interativa, dos patriarcas ao Novo Testamento.
          </p>
          <Link href="/cronologia">
            <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', background: 'linear-gradient(135deg, var(--gold-accent), #854d0e)' }}>
              Abrir Cronologia
            </button>
          </Link>
        </div>

        <div className="glass-panel" style={{ background: 'rgba(20, 25, 30, 0.4)', textAlign: 'left' }}>
          <h2 style={{ marginBottom: '1rem' }} className="text-gold">📂 Biblioteca</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Acesse o acervo completo de materiais, estudos e recursos bíblicos salvos no Google Drive do ministério.
          </p>
          <a href="https://drive.google.com/drive/folders/1Y5Fj-6FhbAjjBqxjhzAAWKv77iiXs5nM" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #1a73e8, #0d47a1)', boxShadow: '0 4px 14px rgba(26, 115, 232, 0.3)', fontSize: '1.1rem' }}>
              Abrir no Google Drive
            </button>
          </a>
        </div>

      </div>

      {/* Seção de Apoio / Doação */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(227, 179, 65, 0.08), rgba(247, 129, 102, 0.05))',
        border: '1px solid rgba(227, 179, 65, 0.2)',
        borderRadius: '16px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🙏</div>
        <h3 style={{ color: 'var(--gold-accent)', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>
          Apoie Este Ministério
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          Esta plataforma é fruto de muito trabalho e dedicação ao Reino. Se ela tem sido uma bênção para o seu ministério, considere fazer uma doação voluntária.
        </p>
        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '1.2rem 2rem',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '12px',
          border: '1px solid rgba(227, 179, 65, 0.3)',
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Chave Pix</span>
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--gold-accent)', letterSpacing: '0.05em' }}>
            (64) 99607-2279
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Gilson Lopes de Araujo</span>
        </div>
      </div>

    </div>
  );
}
