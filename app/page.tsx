'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Package, TrendingUp, Clock, Search, 
  FileUp, Mail, LogOut, ShieldCheck, AlertCircle, CheckCircle2, Loader2, ChevronRight
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function fetchQuotes() {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setQuotes(data || []);
    setLoading(false);
  }

  // FUNÇÃO SÊNIOR: Integração Real Gemini + Supabase
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // 1. Criar registro da cotação no banco
      const { data: quoteData, error: quoteError } = await supabase
        .from('quotes')
        .insert([{ title: file.name, status: 'ANALYZING' }])
        .select()
        .single();

      if (quoteError) throw quoteError;

      // 2. Chamada para a API de Inteligência (Server Action interna)
      // Aqui o sistema usa a GEMINI_API_KEY que você salvou na Vercel
      const response = await fetch('/api/analyze-quote', {
        method: 'POST',
        body: JSON.stringify({ quoteId: quoteData.id, fileName: file.name }),
      });

      if (response.ok) {
        await supabase.from('quotes').update({ status: 'READY' }).eq('id', quoteData.id);
        fetchQuotes();
      }
    } catch (err) {
      console.error("Erro no processamento industrial:", err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchQuotes();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <script src="https://cdn.tailwindcss.com"></script>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-amber-500">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-amber-500 shadow-xl border border-slate-800">
              <ShieldCheck size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center text-slate-900 mb-1 tracking-tighter">HLP.FIX SYSTEM</h2>
          <p className="text-slate-400 text-center text-xs font-bold uppercase tracking-widest mb-8">HolamPar Industrial Security</p>
          <input 
            type="password" 
            placeholder="Chave Mestra" 
            className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl mb-4 outline-none focus:border-amber-500 transition-all font-mono text-center" 
            onKeyDown={(e) => e.key === 'Enter' && setIsLoggedIn(true)} 
          />
          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-slate-900 text-amber-500 font-black py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg uppercase tracking-widest text-sm">
            Unlock Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      <script src="https://cdn.tailwindcss.com"></script>
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />

      {/* Sidebar Industrial */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col border-r border-slate-800 shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Package size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter">HLP.FIX</h1>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">System Online</span>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-3">
          <div className="flex items-center justify-between p-4 bg-amber-500 text-slate-950 rounded-xl font-black text-sm shadow-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <LayoutDashboard size={18} />
              <span>DASHBOARD</span>
            </div>
            <ChevronRight size={14} />
          </div>
          <div className="flex items-center gap-3 p-4 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-xl transition-all cursor-pointer text-sm font-bold">
            <Mail size={18} />
            <span>GMAIL CONNECT</span>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 p-4 text-rose-500 hover:bg-rose-500/10 w-full rounded-xl transition-all font-bold text-sm">
            <LogOut size={18} />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Overview</h2>
            <p className="text-xl font-black text-slate-900 tracking-tighter">Controle de Suprimentos</p>
          </div>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-slate-900 text-amber-500 px-6 py-3 rounded-xl font-black text-xs flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50 uppercase tracking-widest border border-slate-700"
          >
            {uploading ? <Loader2 className="animate-spin" size={18} /> : <FileUp size={18} />}
            {uploading ? 'IA ANALYZING...' : 'Analisar Orçamento'}
          </button>
        </header>

        <div className="p-10 max-w-7xl mx-auto space-y-10">
          {/* Tabela de Inteligência */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-200 bg-slate-50/30 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Cotações Recentes</h2>
                <p className="text-xs text-slate-400 font-medium">Processamento via Gemini 3.1 Pro & Supabase</p>
              </div>
              <button onClick={fetchQuotes} className="p-2 text-slate-300 hover:text-amber-500 transition-colors">
                <Clock size={20} />
              </button>
            </div>
            
            <div className="p-2">
              {loading ? (
                <div className="flex flex-col items-center py-20 gap-3 text-slate-300">
                  <Loader2 className="animate-spin" size={40} />
                  <p className="text-xs font-bold uppercase tracking-widest">Sincronizando Base de Dados...</p>
                </div>
              ) : quotes.length === 0 ? (
                <div className="flex flex-col items-center py-20 gap-4 text-slate-300 border-2 border-dashed border-slate-100 rounded-2xl m-6">
                  <AlertCircle size={48} strokeWidth={1.5} />
                  <div className="text-center">
                    <p className="text-slate-900 font-black text-lg tracking-tight">Nenhum dado processado</p>
                    <p className="text-sm font-medium text-slate-400">Suba um orçamento em PDF para ativar a IA.</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.15em] border-b border-slate-100">
                        <th className="py-5 px-6">Documento / Timestamp</th>
                        <th className="py-5 px-6">Status Operacional</th>
                        <th className="py-5 px-6 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {quotes.map((quote: any) => (
                        <tr key={quote.id} className="group hover:bg-slate-50/80 transition-all">
                          <td className="py-6 px-6">
                            <div className="font-black text-slate-900 text-sm tracking-tight">{quote.title}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                              {new Date(quote.created_at).toLocaleString('pt-BR')}
                            </div>
                          </td>
                          <td className="py-6 px-6">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${
                              quote.status === 'READY' 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                              : 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'
                            }`}>
                              {quote.status}
                            </span>
                          </td>
                          <td className="py-6 px-6 text-right">
                            <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg font-black text-[10px] hover:bg-slate-900 hover:text-amber-500 transition-all uppercase tracking-widest">
                              Ver Detalhes
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
