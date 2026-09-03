import React from 'react';

export const metadata = {
  title: 'HLP.FIX - HolamPar',
  description: 'Inteligência em Suprimentos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: '#f8fafc', 
        fontFamily: 'sans-serif',
        overflowX: 'hidden' 
      }}>
        {children}
      </body>
    </html>
  );
}
