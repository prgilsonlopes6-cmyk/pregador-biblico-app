"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Tab = "biblia" | "dicionario" | "enciclopedia" | "exegese";

export default function BibliotecaPage() {
  const [activeTab, setActiveTab] = useState<Tab>("biblia");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title?: string; markdown: string } | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (activeTab === "biblia") {
        // A API bible-api suporta "joao 3:16?translation=almeida"
        const res = await fetch(`/api/biblia?busca=${encodeURIComponent(query)}`);
        const data = await res.json();
        
        if (data.error || data.erro) {
          setError(data.error || data.erro || "Referência não encontrada.");
        } else {
          setResult({
            title: data.reference,
            markdown: data.verses?.map((v: { verse: string; text: string }) => `**${v.verse}** ${v.text}`).join("\n\n") || data.result
          });
        }
      } else if (activeTab === "dicionario") {
        const res = await fetch("/api/dicionario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word: query }),
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setResult({ markdown: data.result });
        }
      } else if (activeTab === "enciclopedia") {
        const res = await fetch("/api/enciclopedia", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: query }),
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setResult({ markdown: data.result });
        }
      } else if (activeTab === "exegese") {
        const res = await fetch("/api/exegese", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word: query }),
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setResult({ markdown: data.result });
        }
      }
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao processar sua busca. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>
          Biblioteca <span className="text-accent">Digital</span>
        </h1>
        <Link href="/">
          <button style={{
            background: 'transparent',
            border: '1px solid var(--gold-accent)',
            color: 'var(--gold-accent)',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Voltar ao Início
          </button>
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { id: "biblia", label: "📖 Bíblia" },
          { id: "dicionario", label: "📓 Dicionário Teológico" },
          { id: "enciclopedia", label: "🏛️ Enciclopédia Bíblica" },
          { id: "exegese", label: "🔎 Exegese (Original)" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as Tab);
              setResult(null);
              setError("");
              setQuery("");
            }}
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid',
              borderColor: activeTab === tab.id ? 'var(--gold-accent)' : 'rgba(255,255,255,0.1)',
              background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(227, 179, 65, 0.2), rgba(227, 179, 65, 0.05))' : 'rgba(20, 25, 30, 0.6)',
              color: activeTab === tab.id ? 'var(--gold-accent)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? '800' : '500',
              fontSize: activeTab === tab.id ? '1.1rem' : '1rem',
              boxShadow: activeTab === tab.id ? '0 0 20px rgba(227, 179, 65, 0.3)' : 'none',
              transition: 'all 0.3s ease',
              flex: 1,
              minWidth: '200px',
              letterSpacing: '0.5px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Area */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {activeTab === "biblia" && "Pesquisar Referência Bíblica"}
          {activeTab === "dicionario" && "Buscar Significado Teológico"}
          {activeTab === "enciclopedia" && "Explorar Tópico Bíblico"}
          {activeTab === "exegese" && "Pesquisar Palavra ou Verso no Grego/Hebraico"}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          {activeTab === "biblia" && "Exemplo: João 3:16 ou Genesis 1"}
          {activeTab === "dicionario" && "Exemplo: Graça, Justificação, Escatologia"}
          {activeTab === "enciclopedia" && "Exemplo: Arca da Aliança, Império Romano, Templo de Salomão"}
          {activeTab === "exegese" && "Exemplo: João 1:1, Chesed, Ágape, Paráclito"}
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPaste={(e) => {
              const items = e.clipboardData.items;
              for (const item of items) {
                if (item.type.startsWith('image/')) {
                  e.preventDefault();
                  alert('Imagens não são suportadas. Por favor, cole apenas texto.');
                  return;
                }
              }
            }}
            placeholder="Digite aqui..."
            style={{
              flex: 1,
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(0,0,0,0.5)',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}
          />
          <button 
            type="submit" 
            disabled={loading || !query.trim()}
            className="btn-primary"
            style={{ padding: '0 2rem' }}
          >
            {loading ? "Buscando..." : "Pesquisar"}
          </button>
        </form>
      </div>

      {/* Results Area */}
      {error && (
        <div style={{ padding: '1.5rem', borderRadius: '8px', background: 'rgba(255, 50, 50, 0.1)', border: '1px solid rgba(255, 50, 50, 0.3)', color: '#ffb3b3', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      {result && (
        <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(20, 25, 30, 0.6)' }}>
          {result.title && (
            <h2 style={{ color: 'var(--gold-accent)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(227, 179, 65, 0.2)', paddingBottom: '0.5rem' }}>
              {result.title}
            </h2>
          )}
          <div style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-primary)' }} className="markdown-body">
            <ReactMarkdown>{result.markdown}</ReactMarkdown>
          </div>
        </div>
      )}

    </div>
  );
}
