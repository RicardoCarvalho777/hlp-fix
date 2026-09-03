import React from 'react';
import './globals.css'; // Não se preocupe, criaremos este depois se necessário

export const metadata = {
  title: 'HLP.FIX - Inteligência em Compras',
  description: 'Sistema de gestão de suprimentos HolamPar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-50 antialiased">{children}</body>
    </html>
  );
}
