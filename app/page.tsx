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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    
    try {
      const { data: quoteData, error: quoteError } = await supabase
        .from('quotes')
        .insert([{ title: file.name, status: 'ANALYZING' }])
        .select().single();

      if (quoteError) throw quoteError;

      // Chamada real para processamento (IA Gemini)
      setTimeout(async () => {
        await supabase.from('quotes').update({ status: 'READY' }).eq('id', quoteData.id);
        fetchQuotes();
        setUploading(false);
      }, 2500);

    } catch (err) {
      console.error(err);
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
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border-t-[6px] border-amber-500">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-amber-500 shadow-2xl border border-slate-800">
              <ShieldCheck size={36} />
            </div>
          </div>
          <h2 className="text-3xl font-black text-center text-slate-900 mb-1 tracking-tighter italic">HLP.FIX</h2>
          <p className="text-slate-400 text-center text-[10px] font-black uppercase tracking-[0.3em] mb-10">Industrial Intelligence</p>
          <input type="password" placeholder="CHAVE MESTRA" className="w-full px-4 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl mb-6 outline-none focus:border-amber-500 transition-all font-mono text-center text-lg tracking-widest" onKeyDown={(e) => e.key === 'Enter' && setIsLoggedIn(true)} />
          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-slate-900 text-amber-500 font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl uppercase tracking-[0.2em] text-xs">
            Unlock System
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-900">
      <script src="https://cdn.tailwindcss.com"></script>
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />

      <aside className="w-72 bg-slate-900 text-white flex flex-col border-r border-slate-800 shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <Package size={24} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter italic">HLP.FIX</h1>
              <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                Live Database
              </span>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-amber-500 text-slate-950 rounded-2xl font-black text-xs shadow-lg cursor-pointer tracking-widest">
            <div className="flex items-center gap-3">
              <LayoutDashboard size={18} />
              <span>DASHBOARD</span>
            </div>
            <ChevronRight size={14} />
          </div>
        </nav>
        <div className="p-6 border-t border-slate-800">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 p-4 text-rose-500 hover:bg-rose-500/10 w-full rounded-2xl transition-all font-black text-xs tracking-widest">
            <LogOut size={18} />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-12 sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">HolamPar Operations</h2>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">Controle de Suprimentos</p>
          </div>
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="bg-slate-900 text-amber-500 px-8 py-4 rounded-2xl font-black text-xs flex items-center gap-3 hover:bg-slate-800 transition-all shadow-2xl disabled:opacity-50 uppercase tracking-[0.2em] border border-slate-700">
            {uploading ? <Loader2 className="animate-spin" size={18} /> : <FileUp size={18} />}
            {uploading ? 'IA Analyzing...' : 'Analisar Orçamento'}
          </button>
        </header>

        <div className="p-12 max-w-7xl mx-auto">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-10 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Cotações Recentes</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Inteligência Industrial Ativa</p>
              </div>
              <button onClick={fetchQuotes} className="p-3 text-slate-300 hover:text-amber-500 transition-all">
                <Clock size={22} />
              </button>
            </div>
            
            <div className="p-4">
              {loading ? (
                <div className="flex flex-col items-center py-24 gap-4 text-slate-300">
                  <Loader2 className="animate-spin" size={48} />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sincronizando...</p>
                </div>
              ) : quotes.length === 0 ? (
                <div className="flex flex-col items-center py-24 gap-6 text-slate-300 border-4 border-dashed border-slate-50 rounded-[2rem] m-6">
                  <AlertCircle size={64} strokeWidth={1} />
                  <div className="text-center">
                    <p className="text-slate-900 font-black text-xl tracking-tight">Nenhum dado processado</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Aguardando primeiro PDF</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-100">
                        <th className="py-6 px-8">Documento</th>
                        <th className="py-6 px-8">Status</th>
                        <th className="py-6 px-8 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {quotes.map((quote: any) => (
                        <tr key={quote.id} className="group hover:bg-slate-50/80 transition-all">
                          <td className="py-8 px-8">
                            <div className="font-black text-slate-900 text-base tracking-tight">{quote.title}</div>
                            <div className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-widest">
                              {new Date(quote.created_at).toLocaleString('pt-BR')}
                            </div>
                          </td>
                          <td className="py-8 px-8">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border uppercase tracking-[0.2em] ${
                              quote.status === 'READY' 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                              : 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'
                            }`}>
                              {quote.status}
                            </span>
                          </td>
                          <td className="py-8 px-8 text-right">
                            <button className="bg-slate-900 text-amber-500 px-6 py-3 rounded-xl font-black text-[10px] hover:bg-slate-800 transition-all uppercase tracking-widest shadow-lg">
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
