import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.glsolucoes.app',
  appName: 'Pregador Bíblico',
  webDir: 'out',
  server: {
    // Carrega o app diretamente do Vercel para que todas as APIs funcionem
    url: 'https://pregador-biblico-app.vercel.app',
    cleartext: false,
  },
};

export default config;
