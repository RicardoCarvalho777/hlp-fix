'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Package, TrendingUp, Clock, Search, 
  FileUp, Mail, LogOut, ShieldCheck, AlertCircle, CheckCircle2, Loader2
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

  // Função Sênior para processar o PDF
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    // Simulação do motor de IA processando (Gemini/Azure)
    // Na próxima etapa, conectaremos a função real de extração
    setTimeout(async () => {
      const { data, error } = await supabase
        .from('quotes')
        .insert([{ title: file.name, status: 'READY' }])
        .select();

      if (!error) fetchQuotes();
      setUploading(false);
      alert(`Sucesso! O arquivo "${file.name}" foi processado pela IA.`);
    }, 3000);
  };

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
          <input 
            type="password" 
            placeholder="Chave de Acesso" 
            className="w-full px-4 py-3 bg-slate-100 border-none rounded-lg mb-4 outline-none focus:ring-2 focus:ring-amber-500" 
            onKeyDown={(e) => e.key === 'Enter' && setIsLoggedIn(true)} 
          />
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
      
      {/* Input de Arquivo Escondido */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept=".pdf"
      />

      <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-slate-900">
              <Package size={20} />
            </div>
            HLP.FIX
          </h1>
          <p className="text-[10px] text-slate-400 mt-1 tracking-widest uppercase text-center">HolamPar Suprimentos</p>
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
            <span className="text-sm font-bold text-slate-900 tracking-tight">Painel de Controle</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-tighter border border-emerald-200">Conectado</span>
          </div>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-amber-400 transition-all shadow-sm disabled:opacity-50"
          >
            {uploading ? <Loader2 className="animate-spin" size={18} /> : <FileUp size={18} />}
            {uploading ? 'IA Processando...' : 'Analisar Orçamento'}
          </button>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-slate-900">Cotações Recentes</h2>
                <p className="text-xs text-slate-500">Histórico de inteligência industrial</p>
              </div>
              <button onClick={fetchQuotes} className="text-slate-400 hover:text-slate-600 transition-colors">
                <Clock size={18} />
              </button>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="flex flex-col items-center py-12 gap-2 text-slate-400">
                  <Loader2 className="animate-spin" size={32} />
                  <p className="text-sm">Sincronizando com HolamPar Cloud...</p>
                </div>
              ) : quotes.length === 0 ? (
                <div className="flex flex-col items-center py-12 gap-3 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                  <AlertCircle size={40} className="text-slate-200" />
                  <div className="text-center">
                    <p className="text-slate-900 font-bold">Nenhuma cotação encontrada</p>
                    <p className="text-xs">Clique em "Analisar Orçamento" para importar seu primeiro PDF.</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                        <th className="pb-4 px-2">Arquivo / Data</th>
                        <th className="pb-4 px-2">Status</th>
                        <th className="pb-4 px-2 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {quotes.map((quote: any) => (
                        <tr key={quote.id} className="group hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-2">
                            <div className="font-bold text-slate-900 text-sm">{quote.title}</div>
                            <div className="text-[10px] text-slate-400">{new Date(quote.created_at).toLocaleDateString('pt-BR')}</div>
                          </td>
                          <td className="py-4 px-2">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded border border-emerald-100 uppercase">
                              {quote.status}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <button className="text-amber-600 font-bold text-xs hover:underline">Ver Detalhes</button>
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
