'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Package, TrendingUp, Clock, Search, 
  FileUp, Mail, LogOut, ShieldCheck, AlertCircle, CheckCircle2 
} from 'lucide-react';

// Inicialização do Cliente Supabase (Usando as chaves que você mapeou na Vercel)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função Sênior para buscar dados reais do banco
  async function fetchQuotes() {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setQuotes(data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (isLoggedIn) fetchQuotes();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <script src="https://cdn.tailwindcss.com"></script>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900 shadow-lg">
              <ShieldCheck size={28} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">HLP.FIX Access</h2>
          <p className="text-slate-500 text-center text-sm mb-8">Identidade Industrial HolamPar</p>
          <input type="password" placeholder="Chave de Acesso" className="w-full px-4 py-3 bg-slate-100 border-none rounded-lg mb-4 outline-none focus:ring-2 focus:ring-amber-500" 
            onKeyDown={(e) => e.key === 'Enter' && setIsLoggedIn(true)} />
          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-all shadow-lg">
            Entrar no Sistema
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      
      <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-slate-900">
              <Package size={20} />
            </div>
            HLP.FIX
          </h1>
          <p className="text-[10px] text-slate-400 mt-1 tracking-widest uppercase">HolamPar Suprimentos</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="flex items-center gap-3 p-3 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20 cursor-pointer">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 p-3 text-rose-400 hover:bg-rose-500/10 w-full rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-900">Painel de Controle</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-tighter">Conectado ao Supabase</span>
          </div>
          <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-amber-400 transition-all shadow-sm">
            <FileUp size={18} /> Analisar Orçamento
          </button>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50">
              <h2 className="font-bold text-slate-900">Cotações Recentes</h2>
              <p className="text-xs text-slate-500">Dados sincronizados em tempo real</p>
            </div>
            <div className="p-12 text-center">
              {loading ? (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Clock className="animate-spin" size={32} />
                  <p className="text-sm">Consultando banco de dados...</p>
                </div>
              ) : quotes.length === 0 ? (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <AlertCircle size={32} />
                  <p className="text-sm">Nenhuma cotação encontrada. Importe um PDF para começar.</p>
                </div>
              ) : (
                <p className="text-slate-900 font-bold">Temos {quotes.length} cotações no banco!</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
