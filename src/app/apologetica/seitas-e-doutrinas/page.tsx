import Link from 'next/link';
import { SEITAS_E_DOUTRINAS } from '@/data/apologetica';

export default function SeitasEDoutrinasPage() {
  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <Link href="/apologetica" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          ← Voltar para Apologética
        </Link>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Seitas e <span className="text-gold">Doutrinas</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Organizado por grupos religiosos</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {SEITAS_E_DOUTRINAS.map((group) => (
          <Link key={group.id} href={`/apologetica/seitas-e-doutrinas/${group.id}`} style={{ textDecoration: 'none' }}>
            <div className="glass-panel seita-card" style={{ 
              height: '100%', 
              background: 'rgba(20, 25, 30, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem'
            }}>
              <h2 className="text-accent" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧱 {group.name}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {group.sections.ensinamentos.content.substring(0, 100)}...
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', color: 'var(--gold-accent)', fontWeight: 600, fontSize: '0.9rem' }}>
                Ver estudo completo →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
