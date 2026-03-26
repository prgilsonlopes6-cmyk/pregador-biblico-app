"use client";

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function Biblioteca() {
  const [activeTab, setActiveTab] = useState<'biblia' | 'dicionario' | 'enciclopedia'>('biblia');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      let endpoint = '/api/bible/search';
      if (activeTab === 'dicionario') endpoint = '/api/dictionary';
      if (activeTab === 'enciclopedia') endpoint = '/api/encyclopedia';

      const res = await fetch(`${endpoint}?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Erro ao realizar a busca.');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Texto copiado para a área de transferência!');
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="text-accent">Biblioteca Digital</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Ferramentas avançadas para o seu estudo bíblico.</p>
        </div>
        <Link href="/">
          <button className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)' }}>Voltar para Home</button>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <button 
          onClick={() => { setActiveTab('biblia'); setResult(null); setError(''); }}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '8px', 
            background: activeTab === 'biblia' ? 'var(--accent-color)' : 'transparent',
            color: activeTab === 'biblia' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
        >
          📖 Bíblia
        </button>
        <button 
          onClick={() => { setActiveTab('dicionario'); setResult(null); setError(''); }}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '8px', 
            background: activeTab === 'dicionario' ? 'var(--accent-color)' : 'transparent',
            color: activeTab === 'dicionario' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
        >
          📚 Dicionário
        </button>
        <button 
          onClick={() => { setActiveTab('enciclopedia'); setResult(null); setError(''); }}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '8px', 
            background: activeTab === 'enciclopedia' ? 'var(--gold-accent)' : 'transparent',
            color: activeTab === 'enciclopedia' ? 'black' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
        >
          🎓 Enciclopédia Inteligente
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
          <input 
            type="text" 
            placeholder={
              activeTab === 'biblia' ? "Ex: João 3:16 ou Salmos 23" : 
              activeTab === 'dicionario' ? "Digite uma palavra (ex: Amor, Graça, Fé)" : 
              "Sobre o que você quer saber? (ex: Melquisedeque, Contexto de Éfeso)"
            } 
            className="input-field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, fontSize: '1.2rem' }}
          />
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
            style={{ 
              padding: '0 2rem',
              background: activeTab === 'enciclopedia' ? 'var(--gold-accent)' : '',
              color: activeTab === 'enciclopedia' ? 'black' : '',
              minWidth: '200px'
            }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="loader"></span> Consultando IA...
              </span>
            ) : 'Pesquisar'}
          </button>
        </form>

        {error && (
          <div className="glass-panel" style={{ border: '1px solid #f78166', background: 'rgba(247, 129, 102, 0.1)', textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#f78166', fontSize: '1.1rem', marginBottom: '1rem' }}>{error}</p>
            {error.includes('429') && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Dica: Como estamos usando uma versão gratuita, a IA tem um limite de velocidade. 
                Aguarde 30 segundos e tente novamente! 😊
              </p>
            )}
          </div>
        )}

        {result && activeTab === 'biblia' && (
          <div className="glass-panel" style={{ background: 'rgba(20, 25, 30, 0.6)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <h2 className="text-gold" style={{ fontSize: '1.8rem' }}>{result.reference}</h2>
              <button 
                onClick={() => copyToClipboard(`${result.reference}: ${result.text}`)}
                className="btn-primary" 
                style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem', background: 'rgba(37, 99, 235, 0.2)', border: '1px solid var(--accent-color)' }}
              >
                📋 Copiar Versículo
              </button>
            </div>
            <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: 'var(--text-primary)', fontStyle: 'italic' }}>
              "{result.text.trim()}"
            </p>
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Versão: Almeida Revista e Atualizada (ARA)</span>
              {result.is_ai_suggestion && <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>✨ Sugestão da IA</span>}
            </div>
          </div>
        )}

        {result && activeTab === 'dicionario' && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {result.length === 0 ? (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Nenhum termo encontrado no dicionário local.</p>
                <button 
                  onClick={() => { setActiveTab('enciclopedia'); handleSearch(new Event('submit') as any); }}
                  className="btn-primary"
                  style={{ background: 'var(--gold-accent)', color: 'black' }}
                >
                  🔍 Perguntar à Enciclopédia Inteligente (IA)
                </button>
              </div>
            ) : (
              result.map((item: any) => (
                <div key={item.id} className="glass-panel" style={{ background: 'rgba(20, 25, 30, 0.4)' }}>
                  <h3 className="text-gold">{item.original_word} {item.transliteration && `(${item.transliteration})`}</h3>
                  {item.strong_code && <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Strong: {item.strong_code}</span>}
                  <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{item.definition}</p>
                </div>
              ))
            )}
          </div>
        )}

        {result && activeTab === 'enciclopedia' && (
          <div className="glass-panel" style={{ background: 'rgba(20, 25, 30, 0.6)', lineHeight: '1.8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="text-gold">Resultado da Enciclopédia</h2>
              <button 
                onClick={() => copyToClipboard(result.content)}
                className="btn-primary" 
                style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem', background: 'rgba(212, 175, 55, 0.2)', color: 'var(--gold-accent)', border: '1px solid var(--gold-accent)' }}
              >
                📋 Copiar Resumo
              </button>
            </div>
            <div className="markdown-content" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              <ReactMarkdown>{result.content}</ReactMarkdown>
            </div>
            <div style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
              Gerado por Enciclopédia Inteligente AI
            </div>
          </div>
        )}

        {!result && !isLoading && !error && (
          <div style={{ textAlign: 'center', marginTop: '5rem', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {activeTab === 'biblia' ? '📖' : activeTab === 'dicionario' ? '📚' : '🎓'}
            </div>
            <p>
              {activeTab === 'biblia' ? 'Busque por João 3:16, Salmos 23, etc.' : 
               activeTab === 'dicionario' ? 'Pesquise por palavras do original ou significados.' : 
               'Faça uma pergunta teológica ou histórica para a IA.'}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .loader {
          width: 14px;
          height: 14px;
          border: 2px solid currentColor;
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          animation: rotation 1s linear infinite;
        }
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
