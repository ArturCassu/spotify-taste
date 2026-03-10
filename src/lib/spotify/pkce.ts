/**
 * Generate a cryptographically random string of given length.
 * Uses characters safe for PKCE code verifiers (A-Z, a-z, 0-9, -, _, ., ~).
 */
export function generateRandom(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values, (v) => possible[v % possible.length]).join('');
}

/**
 * Generate a PKCE verifier + challenge pair.
 * The challenge is the Base64-URL-encoded SHA-256 hash of the verifier.
 */
export async function generatePKCE(): Promise<{ verifier: string; challenge: string }> {
  const verifier = generateRandom(64);

  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);

  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return { verifier, challenge };
}
