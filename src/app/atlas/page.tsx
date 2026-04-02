"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface AtlasData {
  name: string;
  meaning: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  physical_geography: {
    relief: string;
    climate: string;
    waters: string;
  };
  strategic_importance: string;
  events: {
    event: string;
    reference: string;
    description: string;
  }[];
  theological_insight: string;
  image_search_term: string;
}

export default function AtlasBiblico() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<AtlasData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setData(null);
    setImageUrl(null);

    try {
      const res = await fetch('/api/atlas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: query }),
      });

      if (res.ok) {
        const atlasData: AtlasData = await res.json();
        setData(atlasData);
        fetchImage(atlasData.name);
      } else {
        alert('Erro ao buscar localização.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImage = async (name: string) => {
    try {
      // Wikimedia Commons API to find an image for the location
      const wikiRes = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${name}&origin=*`);
      const wikiData = await wikiRes.json();
      const pages = wikiData.query.pages;
      const pageId = Object.keys(pages)[0];
      if (pageId !== "-1" && pages[pageId].original) {
        setImageUrl(pages[pageId].original.source);
      } else {
        // Fallback to Unsplash if Wikipedia fails
        setImageUrl(`https://source.unsplash.com/featured/?${name},mountains`);
      }
    } catch (err) {
      console.error('Erro ao buscar imagem:', err);
    }
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
           <h1 className="text-accent">Geografia Bíblica & Atlas</h1>
           <p style={{ color: 'var(--text-secondary)' }}>Explore as terras, o clima e a história das Escrituras.</p>
        </div>
        <Link href="/">
          <button className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)' }}>Voltar para Home</button>
        </Link>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        {['Crescente Fértil', 'Egito', 'Canaã', 'Galileia', 'Judéia', 'Samaria', 'Mesopotâmia', 'Viagens de Paulo'].map((region) => (
          <button 
            key={region} 
            onClick={() => { setQuery(region); setTimeout(() => handleSearch(), 100); }}
            className="btn-secondary"
            style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {region}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Digite um lugar ou região (ex: Judéia, Rio Jordão, Monte Sinai)..." 
          className="input-field" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          style={{ flex: 1, fontSize: '1.2rem' }}
        />
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isLoading}
          style={{ padding: '0 2rem' }}
        >
          {isLoading ? 'Explorando...' : 'Pesquisar'}
        </button>
      </form>

      {data && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', animation: 'fadeIn 0.5s ease-in' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem' }}>
              <h2 className="text-gold" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{data.name}</h2>
              {data.meaning && <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Significado: {data.meaning}</p>}
              <p style={{ lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.description}</p>
            </div>

            <div className="glass-panel" style={{ background: 'rgba(37, 99, 235, 0.05)', padding: '1.5rem', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
              <h3 style={{ color: '#60a5fa', marginBottom: '1rem' }}>📍 Mapa e Localização</h3>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', height: '300px', marginBottom: '1rem' }}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  allowFullScreen 
                  srcDoc={`
                    <style>body{margin:0;overflow:hidden;}</style>
                    <iframe src="https://maps.google.com/maps?q=${data.coordinates.lat},${data.coordinates.lng}&z=10&t=k&output=embed" width="100%" height="100%" frameborder="0" style="border:0"></iframe>
                  `}
                ></iframe>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>Coordenadas: {data.coordinates.lat.toFixed(4)}, {data.coordinates.lng.toFixed(4)}</p>
            </div>

            <div className="glass-panel" style={{ background: 'rgba(52, 211, 153, 0.05)', padding: '1.5rem', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
              <h3 style={{ color: '#34d399', marginBottom: '1rem' }}>🏔️ Geografia Física</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <p><strong>Relevo:</strong> {data.physical_geography?.relief || 'Informação não disponível'}</p>
                <p><strong>Clima:</strong> {data.physical_geography?.climate || 'Informação não disponível'}</p>
                <p><strong>Águas:</strong> {data.physical_geography?.waters || 'Informação não disponível'}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ background: 'rgba(139, 92, 246, 0.05)', padding: '1.5rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <h3 style={{ color: '#a78bfa', marginBottom: '0.8rem' }}>⚔️ Importância Estratégica</h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{data.strategic_importance || 'Análise estratégica não disponível para este local.'}</p>
            </div>

            <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem' }}>
              <h3 className="text-accent" style={{ marginBottom: '1rem' }}>📜 Eventos Bíblicos</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.events.map((e, index) => (
                  <div key={index} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    <strong style={{ color: 'var(--gold-accent)' }}>{e.event}</strong> ({e.reference})
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>{e.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel" style={{ background: 'rgba(247, 129, 102, 0.05)', padding: '1.5rem', border: '1px solid rgba(247, 129, 102, 0.2)' }}>
              <h3 style={{ color: '#f78166', marginBottom: '0.8rem' }}>💡 Reflexão Teológica</h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', fontStyle: 'italic' }}>{data.theological_insight}</p>
            </div>
          </div>
        </div>
      )}

      {!data && !isLoading && (
        <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
          <p>Digite o nome de uma cidade, monte ou região bíblica para começar sua exploração.</p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
