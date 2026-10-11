export function getBackendUrl(path: `/api/${string}`): string {
  const origin =
    process.env.BACKEND_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    (process.env.NODE_ENV === 'production'
      ? undefined
      : 'http://localhost:3001');

  if (!origin) {
    throw new Error(
      'Backend URL is not configured. Set BACKEND_URL or enable Vercel system environment variables.',
    );
  }

  return new URL(path, `${origin.replace(/\/+$/, '')}/`).toString();
}
