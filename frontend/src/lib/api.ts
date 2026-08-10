export function getServerApiUrl() {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL || 'http://server:8000';
  // Jika di lokal Docker, publicUrl bernilai '/api' (relatif).
  // Next.js Server Components butuh URL absolut, jadi kita arahkan ke internal Docker.
  if (publicUrl.startsWith('/')) {
    return process.env.BACKEND_URL || 'http://server:8000';
  }
  // Di Vercel, publicUrl adalah 'https://my-porto...' (absolut), jadi langsung gunakan.
  return publicUrl;
}
