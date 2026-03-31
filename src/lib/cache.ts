// Cache persistente em memória (usando o objeto global para sobreviver ao HMR do Next.js)
const globalCache = globalThis as unknown as {
  bibleCache: Record<string, { data: unknown; timestamp: number }>;
};

if (!globalCache.bibleCache) {
  globalCache.bibleCache = {};
}

const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 horas de validade (estudos bíblicos não mudam rápido)

export function getFromCache(key: string): unknown | null {
  const item = globalCache.bibleCache[key];
  if (item && (Date.now() - item.timestamp < CACHE_TTL)) {
    console.log(`[Cache Hit] ${key}`);
    return item.data;
  }
  return null;
}

export function setInCache(key: string, data: unknown): void {
  console.log(`[Cache Set] ${key}`);
  globalCache.bibleCache[key] = {
    data,
    timestamp: Date.now()
  };
}
