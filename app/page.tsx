'use client';
import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, TrendingUp, Clock, Search, 
  FileUp, Mail, LogOut, ShieldCheck, AlertCircle, CheckCircle2 
} from 'lucide-react';

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Simulação de Login Industrial
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
          <div className="space-y-4">
            <input type="password" placeholder="Chave de Acesso" className="w-full px-4 py-3 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
            <button onClick={() => setIsLoggedIn(true)} className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-all shadow-lg">
              Entrar no Sistema
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* Sidebar Sênior */}
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
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
            <FileUp size={20} />
            <span>Importar PDFs</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
            <Mail size={20} />
            <span>Gmail Connect</span>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 p-3 text-rose-400 hover:bg-rose-500/10 w-full rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-900">Painel de Controle</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-tighter">Live Data</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {setUploading(true); setTimeout(() => setUploading(false), 2000)}}
              className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-amber-400 transition-all shadow-sm"
            >
              {uploading ? <Clock className="animate-spin" size={18} /> : <FileUp size={18} />}
              {uploading ? 'Processando...' : 'Analisar Orçamento'}
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* KPIs de Impacto Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp size={24} /></div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+12.4%</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Saving Real (Economia)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">R$ 42.850,00</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg mb-4 w-fit"><Package size={24} /></div>
              <p className="text-slate-500 text-sm font-medium">Itens Mapeados</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">1.248 itens</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit"><Clock size={24} /></div>
              <p className="text-slate-500 text-sm font-medium">Eficiência de Compra</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">4.2h / média</h3>
            </div>
          </div>

          {/* Tabela de Inteligência */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="font-bold text-slate-900">Cotações em Análise</h2>
                <p className="text-xs text-slate-500">Processamento via Gemini 3.1 Pro</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Filtrar..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-md text-xs w-48 focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                    <th className="px-6 py-4">Fornecedor / SKU</th>
                    <th className="px-6 py-4">Status IA</th>
                    <th className="px-6 py-4">Custo TCO</th>
                    <th className="px-6 py-4">Saving Est.</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">Metalúrgica Santo Antônio</div>
                      <div className="text-[10px] text-slate-400 font-mono">SKU: HLP-FIX-992</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-100 uppercase">
                        <Clock size={10} /> Extraindo
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700 text-sm">R$ 12.450,00</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold text-sm">R$ 1.200,00</td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-slate-900 text-white px-3 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Revisar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
