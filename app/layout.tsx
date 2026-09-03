import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HLP.FIX | HolamPar Intelligence',
  description: 'Plataforma de Otimização de Suprimentos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-slate-950 text-slate-50`}>
        {children}
      </body>
    </html>
  );
}
