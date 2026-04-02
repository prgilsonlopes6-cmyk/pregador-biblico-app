import type { Metadata } from 'next';
import './globals.css';
import ApiKeySettings from '@/components/ApiKeySettings';

export const metadata: Metadata = {
  title: 'Pregador Bíblico | Pr. Gilson Lopes',
  description: 'Aplicativo de estudo profundo das Escrituras (Hebraico, Grego) e Gerador de Sermões.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
        <ApiKeySettings />
        <main className="container" style={{ flexGrow: 1, width: '100%', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <footer style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)', borderTop: 'var(--glass-border)', background: 'rgba(0,0,0,0.5)' }}>
          Pregador Bíblico © {new Date().getFullYear()} — Autor: <strong style={{ color: 'var(--gold-accent)', fontSize: '1.05rem' }}>Pr. Gilson Lopes</strong>
        </footer>
      </body>
    </html>
  );
}
