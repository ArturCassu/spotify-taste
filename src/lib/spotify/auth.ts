import { SCOPES, SPOTIFY_AUTH_URL, CLIENT_ID } from './config';
import { generatePKCE } from './pkce';
import type { TokenResponse } from './types';

const TOKEN_KEY = 'spotify_access_token';
const VERIFIER_KEY = 'spotify_pkce_verifier';

// ── Redirect URI ───────────────────────────────────────────

export function getRedirectUri(): string {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_REDIRECT_URI) {
    return process.env.NEXT_PUBLIC_REDIRECT_URI;
  }
  return `${window.location.origin}/callback`;
}

// ── Login / PKCE Flow ──────────────────────────────────────

export async function initiateLogin(): Promise<void> {
  if (!CLIENT_ID) {
    throw new Error('NEXT_PUBLIC_SPOTIFY_CLIENT_ID is not configured.');
  }

  const { verifier, challenge } = await generatePKCE();
  sessionStorage.setItem(VERIFIER_KEY, verifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: getRedirectUri(),
    scope: SCOPES,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  });

  window.location.href = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

// ── Token Exchange ─────────────────────────────────────────

export async function exchangeCode(code: string): Promise<TokenResponse> {
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      redirect_uri: getRedirectUri(),
      code_verifier: sessionStorage.getItem(VERIFIER_KEY),
      client_id: CLIENT_ID,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  const data: TokenResponse = await response.json();
  sessionStorage.removeItem(VERIFIER_KEY);
  return data;
}

// ── Token Management ───────────────────────────────────────

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

// ── Session ────────────────────────────────────────────────

export function logout(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
