"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Sermon {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function Sermoes() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const savedSermons = localStorage.getItem('pregador_sermoes');
    if (savedSermons) {
      setSermons(JSON.parse(savedSermons));
    }
  }, []);

  const saveToLocalStorage = (updatedSermons: Sermon[]) => {
    localStorage.setItem('pregador_sermoes', JSON.stringify(updatedSermons));
    setSermons(updatedSermons);
  };

  const handleSave = () => {
    if (!title || !content) {
      alert('Título e conteúdo são obrigatórios.');
      return;
    }

    const newSermon: Sermon = {
      id: id || Date.now(),
      title,
      content,
      created_at: new Date().toISOString(),
    };

    let updatedSermons: Sermon[];
    if (id) {
      updatedSermons = sermons.map(s => s.id === id ? newSermon : s);
    } else {
      updatedSermons = [newSermon, ...sermons];
    }

    saveToLocalStorage(updatedSermons);
    alert('Sermão guardado com sucesso!');
    if (!id) {
      setTitle('');
      setContent('');
    }
  };

  const handleDelete = (sermonId: number) => {
    if (!confirm('Tem certeza que deseja excluir este sermão?')) return;

    const updatedSermons = sermons.filter(s => s.id !== sermonId);
    saveToLocalStorage(updatedSermons);

    if (id === sermonId) {
      setId(null);
      setTitle('');
      setContent('');
    }
  };

  const handlePrint = () => {
    if (!title || !content) {
      alert('Nada para imprimir.');
      return;
    }
    window.print();
  };

  const handleGenerate = async () => {
    const topic = prompt('Sobre qual tema ou texto bíblico você deseja gerar o esboço?');
    if (!topic) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (res.ok) {
        setTitle(topic);
        setContent(data.text);
      } else {
        alert(data.error || 'Erro ao gerar sermão.');
      }
    } catch {
      alert('Erro de conexão ao gerar sermão.');
    } finally {
      setIsGenerating(false);
    }
  };

  const selectSermon = (sermon: Sermon) => {
    setId(sermon.id);
    setTitle(sermon.title);
    setContent(sermon.content);
  };

  const clearEditor = () => {
    setId(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="glass-panel" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
           <h1 className="text-accent">Editor e Gestão de Sermões</h1>
           <p style={{ color: 'var(--text-secondary)' }}>Organize suas ministrações e use IA para estudos profundos.</p>
        </div>
        <Link href="/">
          <button className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)' }}>Voltar para Home</button>
        </Link>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ background: 'rgba(20, 25, 30, 0.4)', padding: '1.5rem' }}>
              <h3 className="text-gold" style={{ marginBottom: '1rem' }}>Meus Sermões</h3>
              <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {sermons.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Nenhum sermão salvo ainda.</p>
                ) : (
                    sermons.map(s => (
                        <div 
                            key={s.id} 
                            style={{ 
                                padding: '0.8rem', 
                                borderBottom: '1px solid var(--border-color)', 
                                cursor: 'pointer',
                                background: id === s.id ? 'rgba(247, 129, 102, 0.1)' : 'transparent',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                            onClick={() => selectSermon(s)}
                        >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                                {s.title}
                            </span>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleDelete(s.id); }}
                                style={{ background: 'transparent', border: 'none', color: '#f78166', cursor: 'pointer', fontSize: '0.8rem' }}
                            >
                                🗑️
                            </button>
                        </div>
                    ))
                )}
              </div>
            </div>

            <div className="glass-panel" style={{ background: 'rgba(37, 99, 235, 0.05)', padding: '1.5rem', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
              <h4 style={{ marginBottom: '1rem', color: '#60a5fa' }}>⚡ Ferramentas de IA</h4>
              
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-primary" 
                style={{ width: '100%', background: 'linear-gradient(135deg, #2563eb, #111)', marginBottom: '1rem' }}
              >
                {isGenerating ? 'Gerando Esboço...' : 'Gerar Esboço com IA'}
              </button>

              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', fontSize: '0.85rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                  Ou use o gerador externo especializado:
                </p>
                <a href="https://chatgpt.com/g/g-QLiyi3BO4-sermao-na-mao" target="_blank" rel="noopener noreferrer">
                  <button className="btn-primary" style={{ width: '100%', fontSize: '0.85rem', background: 'transparent', border: '1px solid #2563eb', color: '#60a5fa' }}>
                    Sermão na Mão (GPT)
                  </button>
                </a>
              </div>
            </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="text-accent">{id ? 'Editar Sermão' : 'Novo Sermão'}</h3>
            {id && (
                <button 
                    onClick={clearEditor}
                    style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    + Criar Novo
                </button>
            )}
          </div>
          
          <input 
            type="text" 
            placeholder="Título do Sermão..." 
            className="input-field" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ fontSize: '1.5rem', fontWeight: 'bold' }} 
          />
          <textarea 
            className="input-field"
            placeholder="Escreva seu sermão ou gere um esboço usando as ferramentas de IA..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ flex: 1, minHeight: '450px', resize: 'none', fontFamily: 'inherit', lineHeight: '1.6' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
             <button 
                className="btn-primary" 
                style={{ background: 'transparent', border: '1px solid var(--border-color)', opacity: (title || content) ? 1 : 0.5 }} 
                onClick={clearEditor}
                disabled={!title && !content}
              >
                Limpar
              </button>
             <button 
                className="btn-primary" 
                onClick={handlePrint}
                style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid #3b82f6', color: '#60a5fa' }}
              >
                Imprimir
              </button>
             <button 
                className="btn-primary" 
                onClick={handleSave}
              >
                Guardar Sermão
              </button>
          </div>
          
          <style jsx global>{`
            @media print {
              .glass-panel, .btn-primary, .input-field, .text-accent, h1, p, Link, nav {
                display: none !important;
              }
              body {
                background: white !important;
                color: black !important;
              }
              .print-content {
                display: block !important;
                padding: 2rem;
              }
              .print-title {
                font-size: 24pt;
                font-weight: bold;
                margin-bottom: 1rem;
                border-bottom: 2px solid black;
                padding-bottom: 0.5rem;
              }
              .print-body {
                font-size: 12pt;
                line-height: 1.6;
                white-space: pre-wrap;
              }
            }
            .print-content {
              display: none;
            }
          `}</style>

          <div className="print-content">
            <h1 className="print-title">{title}</h1>
            <div className="print-body">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
