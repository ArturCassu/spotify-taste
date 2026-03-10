import { SCOPES, SPOTIFY_AUTH_URL, CLIENT_ID_KEY } from './config';
import { generatePKCE } from './pkce';
import type { TokenResponse } from './types';

const TOKEN_KEY = 'spotify_access_token';
const VERIFIER_KEY = 'spotify_pkce_verifier';

// ── Client ID ──────────────────────────────────────────────

export function getClientId(): string | null {
  return localStorage.getItem(CLIENT_ID_KEY);
}

export function setClientId(id: string): void {
  localStorage.setItem(CLIENT_ID_KEY, id);
}

// ── Redirect URI ───────────────────────────────────────────

export function getRedirectUri(): string {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_REDIRECT_URI) {
    return process.env.NEXT_PUBLIC_REDIRECT_URI;
  }
  return `${window.location.origin}/callback`;
}

// ── Login / PKCE Flow ──────────────────────────────────────

export async function initiateLogin(): Promise<void> {
  const clientId = getClientId();
  if (!clientId) {
    throw new Error('Spotify Client ID not set. Call setClientId() first.');
  }

  const { verifier, challenge } = await generatePKCE();
  sessionStorage.setItem(VERIFIER_KEY, verifier);

  const params = new URLSearchParams({
    client_id: clientId,
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
      client_id: getClientId(),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  const data: TokenResponse = await response.json();

  // Clean up verifier after successful exchange
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
  localStorage.removeItem(CLIENT_ID_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
