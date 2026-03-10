import { NextRequest, NextResponse } from 'next/server';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_id, code, redirect_uri, code_verifier } = body;

    if (!client_id || !code || !redirect_uri || !code_verifier) {
      return NextResponse.json(
        { error: 'Missing required fields: client_id, code, redirect_uri, code_verifier' },
        { status: 400 },
      );
    }

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id,
      code,
      redirect_uri,
      code_verifier,
    });

    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Token proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error during token exchange' },
      { status: 500 },
    );
  }
}
