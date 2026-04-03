"use client";

import Link from 'next/link';
import { useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  characters: string[];
  significance: string;
}

interface TimelineData {
  era: string;
  summary: string;
  events: TimelineEvent[];
}

const ERAS = [
  "Patriarcas (Abraão a José)",
  "Êxodo e Conquista",
  "Período dos Juízes",
  "Monarquia Unida (Saul, Davi, Salomão)",
  "Reino Dividido e Exílio",
  "Vida de Jesus",
  "Igreja Primitiva e Atos"
];

export default function CronologiaBiblica() {
  const [selectedEra, setSelectedEra] = useState('');
  const [data, setData] = useState<TimelineData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTimeline = async (era: string) => {
    setSelectedEra(era);
    setIsLoading(true);
    setData(null);

    try {
      const res = await fetch('/api/cronologia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ era }),
      });

      if (res.ok) {
        const result = await res.json();
        setData(result);
      } else {
        alert('Erro ao carregar cronologia.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
           <h1 className="text-gold">Cronologia Bíblica Visual</h1>
           <p style={{ color: 'var(--text-secondary)' }}>Navegue pelos séculos e entenda o tempo de Deus na história.</p>
        </div>
        <Link href="/">
          <button className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)' }}>Voltar para Home</button>
        </Link>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '3rem', justifyContent: 'center' }}>
        {ERAS.map(era => (
          <button 
            key={era}
            onClick={() => fetchTimeline(era)}
            className="btn-primary"
            style={{ 
              background: selectedEra === era ? 'var(--gold-accent)' : 'rgba(255,255,255,0.05)', 
              color: selectedEra === era ? '#111' : 'var(--text-primary)',
              border: '1px solid var(--gold-accent)',
              fontSize: '0.9rem',
              padding: '0.6rem 1.2rem'
            }}
          >
            {era}
          </button>
        ))}
      </div>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="loader" style={{ margin: '0 auto 1rem' }}></div>
          <p>Consultando registros históricos com a IA...</p>
        </div>
      )}

      {data && (
        <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
          <div className="glass-panel" style={{ background: 'rgba(227, 179, 65, 0.05)', border: '1px solid rgba(227, 179, 65, 0.2)', marginBottom: '3rem', textAlign: 'center' }}>
            <h2 className="text-gold" style={{ marginBottom: '0.5rem' }}>{data.era}</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>{data.summary}</p>
          </div>

          <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--gold-accent)', marginLeft: '1rem' }}>
            {data.events.map((event, index) => (
              <div key={index} style={{ marginBottom: '3rem', position: 'relative' }}>
                {/* Timeline Dot */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-2.6rem', 
                  top: '0.5rem', 
                  width: '1.2rem', 
                  height: '1.2rem', 
                  borderRadius: '50%', 
                  background: 'var(--gold-accent)',
                  boxShadow: '0 0 10px var(--gold-accent)'
                }}></div>

                <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ background: 'var(--gold-accent)', color: '#111', padding: '0.2rem 0.8rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {event.date}
                    </span>
                    <h3 className="text-accent" style={{ margin: 0, fontSize: '1.4rem' }}>{event.title}</h3>
                  </div>
                  
                  <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>{event.description}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Personagens:</strong> {event.characters.join(', ')}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontStyle: 'italic', borderLeft: '2px solid rgba(247, 129, 102, 0.3)', paddingLeft: '1rem' }}>
                      <strong style={{ color: 'var(--accent-color)' }}>Significância:</strong> {event.significance}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!data && !isLoading && (
        <div style={{ padding: '6rem', textAlign: 'center', opacity: 0.5 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⌛</div>
          <p>Selecione uma era bíblica acima para visualizar os eventos cronológicos.</p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .loader {
          border: 4px solid rgba(227, 179, 65, 0.1);
          border-top: 4px solid var(--gold-accent);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
