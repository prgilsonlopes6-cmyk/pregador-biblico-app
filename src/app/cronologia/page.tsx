"use client";

import Link from 'next/link';
import { useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  verses: string;
}

interface TimelineData {
  title: string;
  summary: string;
  events: TimelineEvent[];
}

const CATEGORIES = [
  { id: 'personagem', label: '👤 Personagem', placeholder: 'Ex: Davi, Moisés, Paulo...' },
  { id: 'tema', label: '🏷️ Tema / Assunto', placeholder: 'Ex: Fé, Salvação, Alianças...' },
  { id: 'periodo', label: '📅 Período', placeholder: 'Ex: Êxodo, Reino de Israel, Babilônia...' },
];

export default function CronologiaBiblica() {
  const [activeCategory, setActiveCategory] = useState('personagem');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<TimelineData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTimeline = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setData(null);

    try {
      const res = await fetch('/api/cronologia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: searchQuery, 
          category: activeCategory 
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setData(result);
      } else {
        alert('Erro ao carregar cronologia. Verifique sua conexão ou tente outro termo.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
           <h1 className="text-gold">Linha do Tempo <span className="text-accent">Bíblica</span></h1>
           <p style={{ color: 'var(--text-secondary)' }}>Explore a história sagrada por personagens, temas ou períodos.</p>
        </div>
        <Link href="/">
          <button className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)' }}>Voltar para Home</button>
        </Link>
      </div>

      {/* Seletor de Categoria */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSearchQuery('');
              setData(null);
            }}
            className="btn-primary"
            style={{
              flex: 1,
              minWidth: '150px',
              background: activeCategory === cat.id ? 'var(--gold-accent)' : 'rgba(255,255,255,0.05)',
              color: activeCategory === cat.id ? '#111' : 'var(--text-primary)',
              border: activeCategory === cat.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
              fontSize: '0.9rem',
              padding: '0.7rem'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Barra de Busca */}
      <form onSubmit={fetchTimeline} style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
        <input 
          type="text"
          className="input-field"
          style={{ flex: 1, fontSize: '1.1rem' }}
          placeholder={CATEGORIES.find(c => c.id === activeCategory)?.placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isLoading || !searchQuery.trim()}
          style={{ padding: '0 2rem' }}
        >
          {isLoading ? '...' : 'Gerar'}
        </button>
      </form>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="loader" style={{ margin: '0 auto 1rem' }}></div>
          <p>Organizando a cronologia com a IA...</p>
        </div>
      )}

      {data && (
        <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
          <div className="glass-panel" style={{ background: 'rgba(227, 179, 65, 0.05)', border: '1px solid rgba(227, 179, 65, 0.2)', marginBottom: '3rem', textAlign: 'center' }}>
            <h2 className="text-gold" style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>{data.title}</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{data.summary}</p>
          </div>

          <div style={{ position: 'relative', paddingLeft: '2.5rem', borderLeft: '2px solid var(--gold-accent)', marginLeft: '1rem' }}>
            {data.events.map((event, index) => (
              <div key={index} style={{ marginBottom: '3rem', position: 'relative' }}>
                {/* Timeline Dot */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-3.15rem', 
                  top: '0.5rem', 
                  width: '1.3rem', 
                  height: '1.3rem', 
                  borderRadius: '50%', 
                  background: 'var(--gold-accent)',
                  boxShadow: '0 0 15px var(--gold-accent)',
                  border: '3px solid #111'
                }}></div>

                <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--gold-accent)', color: '#111', padding: '0.2rem 0.8rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {event.date}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: '600' }}>
                      📖 {event.verses}
                    </span>
                  </div>
                  
                  <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.5rem', color: '#fff' }}>{event.title}</h3>
                  <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', margin: 0 }}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!data && !isLoading && (
        <div style={{ padding: '6rem', textAlign: 'center', opacity: 0.5 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
          <p>Digite um nome, tema ou período acima para ver a linha do tempo.</p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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
