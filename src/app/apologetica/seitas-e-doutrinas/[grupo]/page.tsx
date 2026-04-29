import Link from 'next/link';
import { SEITAS_E_DOUTRINAS } from '@/data/apologetica';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return SEITAS_E_DOUTRINAS.map((g) => ({
    grupo: g.id,
  }));
}

export default async function SeitaDetailPage({ params }: { params: Promise<{ grupo: string }> }) {
  const { grupo } = await params;
  const groupData = SEITAS_E_DOUTRINAS.find(g => g.id === grupo);

  if (!groupData) {
    notFound();
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <Link href="/apologetica/seitas-e-doutrinas" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          ← Voltar para a lista
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🛡️</div>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.2rem' }}>{groupData.name}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Análise Teológica e Apologética</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Section 1: Ensinamentos */}
        <section className="glass-panel section-card" style={{ borderLeft: '4px solid var(--gold-accent)' }}>
          <h2 className="text-gold" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            {groupData.sections.ensinamentos.title}
          </h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-primary)', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
            {groupData.sections.ensinamentos.content}
          </p>
        </section>

        {/* Section 2: Onde está o erro */}
        <section className="glass-panel section-card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
          <h2 className="text-accent" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            {groupData.sections.erros.title}
          </h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-primary)', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
            {groupData.sections.erros.content}
          </p>
        </section>

        {/* Section 3: Base Bíblica */}
        <section className="glass-panel section-card" style={{ 
          borderLeft: '4px solid #10b981', 
          background: 'linear-gradient(to right, rgba(16, 185, 129, 0.05), transparent)' 
        }}>
          <h2 style={{ color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            {groupData.sections.baseBiblica.title}
          </h2>
          <div style={{ lineHeight: '1.8', color: 'var(--text-primary)', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
            {groupData.sections.baseBiblica.content.split('\n').map((line, index) => {
              if (line.startsWith('•')) {
                const parts = line.split(':');
                if (parts.length > 1) {
                  return (
                    <div key={index} style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
                      <span style={{ fontWeight: 700, color: '#10b981' }}>{parts[0]}</span>:
                      {parts.slice(1).join(':')}
                    </div>
                  );
                }
              }
              return <div key={index} style={{ marginBottom: '0.5rem' }}>{line}</div>;
            })}
          </div>
        </section>

      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          "Antes, santificai a Cristo, como Senhor, em vossos corações, estando sempre preparados para responder a todo aquele que vos pedir razão da esperança que há em vós." (1 Pedro 3:15)
        </p>
      </div>
    </div>
  );
}
