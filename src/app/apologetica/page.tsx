import Link from 'next/link';

export default function ApologeticaPage() {
  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          ← Voltar ao Início
        </Link>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Apologética <span className="text-accent">Bíblica</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Defesa da fé e combate às heresias doutrinárias.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        <Link href="/apologetica/seitas-e-doutrinas" style={{ textDecoration: 'none' }}>
          <div className="glass-panel apologetica-card" style={{ 
            height: '100%', 
            border: '1px solid rgba(99, 102, 241, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📂</div>
            <h2 className="text-gold" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Seitas e Doutrinas</h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', lineHeight: '1.6' }}>
              Estudo organizado dos principais grupos religiosos e suas divergências bíblicas.
            </p>
          </div>
        </Link>
        
        {/* Placeholder for future sections */}
        <div className="glass-panel" style={{ 
          height: '100%', 
          opacity: 0.5,
          border: '1px dashed var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '3rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📁</div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Em breve...</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
            Novas áreas de estudo apologético serão adicionadas em breve.
          </p>
        </div>
      </div>
    </div>
  );
}
