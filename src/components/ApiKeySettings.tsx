"use client";

import { useState, useEffect } from 'react';

export default function ApiKeySettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('user_gemini_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const saveKey = () => {
    localStorage.setItem('user_gemini_key', apiKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <>
      {/* Botão de Engrenagem */}
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff',
          fontSize: '1.2rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
        title="Configurações de API"
      >
        ⚙️
      </button>

      {/* Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(5px)'
        }}>
          <div className="glass-panel" style={{
            width: '90%',
            maxWidth: '400px',
            padding: '2rem',
            position: 'relative'
          }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            <h3 style={{ color: 'var(--gold-accent)', marginBottom: '1rem' }}>Configurações de IA</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Insira sua própria chave do Gemini para ter pesquisas ilimitadas e mais rápidas.
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Chave da API (Gemini)
              </label>
              <input 
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Cole sua chave aqui..."
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff'
                }}
              />
               {/* Fix: setApiKey below */}
            </div>

            <button 
              onClick={saveKey}
              className="btn-primary"
              style={{ width: '100%', padding: '0.8rem' }}
            >
              {isSaved ? '✅ Salvo!' : 'Salvar Configurações'}
            </button>

            <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              <p>Não tem uma chave? <a href="https://aistudio.google.com/app/apikey" target="_blank" style={{ color: 'var(--gold-accent)' }}>Crie uma grátis aqui</a></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
