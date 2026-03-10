# 🎵 Spotify Taste

> Descubra seu perfil musical. Analise artistas, gêneros, décadas e personalidade sonora com dados do Spotify.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Spotify](https://img.shields.io/badge/Spotify_API-1DB954?logo=spotify&logoColor=white)](https://developer.spotify.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

<!-- TODO: adicionar screenshot aqui -->
<!-- ![Screenshot](./docs/screenshot.png) -->

---

## ✨ Features

- 🎤 **Top Artistas** — seus artistas mais ouvidos em 3 períodos
- 🎶 **Top Músicas** — as faixas que mais rolaram no repeat
- 🎸 **Gêneros** — mapa dos seus gêneros musicais
- 📊 **Perfil de Áudio** — energia, danceability, valência e mais
- 🕰️ **Décadas** — de que era vem seu gosto musical
- 🔮 **Personalidade Musical** — análise da sua identidade sonora
- 🎯 **Obscuridade** — quão mainstream (ou underground) você é
- 📱 **PWA** — instale como app no celular
- 🔒 **Privacidade** — seus dados nunca saem do navegador

## 🚀 Getting Started

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- Uma conta no [Spotify](https://spotify.com)
- Um app registrado no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/spotify-taste.git
cd spotify-taste
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

### 4. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🔑 Como obter o Spotify Client ID

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Faça login com sua conta Spotify
3. Clique em **"Create App"**
4. Preencha:
   - **App name:** `Spotify Taste` (ou qualquer nome)
   - **App description:** `Analisador de gosto musical`
   - **Redirect URIs:** `http://localhost:3000/callback`
   - **Which API/SDKs are you planning to use?** Marque **Web API**
5. Clique em **"Save"**
6. Na página do app, copie o **Client ID**
7. Cole o Client ID na tela de login do app

> **Nota:** O Client ID é informado diretamente na interface do app. Não precisa de Client Secret porque usamos o fluxo PKCE (sem backend de autenticação).

> **Para produção:** Adicione a URL de produção (ex: `https://seutaste.vercel.app/callback`) nas Redirect URIs do dashboard.

---

## 🏗️ Arquitetura

```
src/
├── app/                    # Páginas (App Router)
│   ├── api/token/         # Proxy para token do Spotify
│   ├── callback/          # Callback do OAuth
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Dashboard principal
├── components/
│   ├── ui/                # Componentes base (Card, ProgressBar, TabGroup...)
│   ├── sections/          # Seções do dashboard
│   └── layout/            # Header, Footer
├── lib/spotify/           # Integração com Spotify
│   ├── types.ts           # Tipos TypeScript
│   ├── config.ts          # Configurações
│   ├── pkce.ts            # Helpers PKCE
│   ├── auth.ts            # Fluxo de autenticação
│   ├── api.ts             # Client da API
│   └── analysis.ts        # Análise de dados (funções puras)
└── sw.ts                  # Service Worker (Serwist)
```

### Decisões técnicas

- **PKCE Auth** — Fluxo OAuth sem backend. Seguro e simples.
- **Feature-based** — Cada seção é um componente independente.
- **Funções puras** — Toda lógica de análise em `analysis.ts`, sem side effects.
- **Glassmorphism** — UI dark com cards translúcidos e acentos em verde Spotify.

---

## 🚢 Deploy

### Vercel (recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fseu-usuario%2Fspotify-taste&env=NEXT_PUBLIC_SPOTIFY_REDIRECT_URI&envDescription=URL%20de%20callback%20do%20OAuth%20do%20Spotify&envLink=https%3A%2F%2Fdeveloper.spotify.com%2Fdashboard)

1. Clique no botão acima ou importe o repo no [Vercel](https://vercel.com)
2. Configure a variável de ambiente:
   - `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI` = `https://seu-dominio.vercel.app/callback`
3. Deploy automático a cada push na `main`

> Lembre de adicionar a URL de produção nas **Redirect URIs** do Spotify Developer Dashboard.

---

## 📝 Licença

[MIT](LICENSE) © Artur Jalles
