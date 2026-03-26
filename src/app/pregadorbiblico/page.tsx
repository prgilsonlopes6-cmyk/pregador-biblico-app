"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from './actions';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    
    try {
      const result = await loginAction(password);
      if (result.success) {
        router.push('/');
        router.refresh();
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>
          Pregador <span className="text-accent">Bíblico</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Acesso Restrito. Por favor, insira a senha.
        </p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            placeholder="Senha de acesso..." 
            className="input-field" 
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            disabled={isLoading}
            style={{ marginBottom: '1rem', border: error ? '1px solid #f78166' : '' }}
          />
          {error && <p style={{ color: '#f78166', fontSize: '0.9rem', marginBottom: '1rem' }}>Senha incorreta.</p>}
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%' }}
            disabled={isLoading}
          >
            {isLoading ? 'Verificando...' : 'Acessar Aplicativo'}
          </button>
        </form>
        
        <div style={{ marginTop: '2.5rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Criado e Desenvolvido para<br/>
          <strong style={{ color: 'var(--gold-accent)', fontSize: '1.2rem' }}>Pr. Gilson Lopes</strong>
        </div>
      </div>
    </div>
  );
}
