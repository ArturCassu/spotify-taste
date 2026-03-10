import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Spotify Taste — Analise seu gosto musical',
  description:
    'Descubra sua personalidade musical, artistas e faixas favoritas com base nos seus dados do Spotify. Totalmente no navegador, sem servidor.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#1DB954',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0A0A0A] text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
