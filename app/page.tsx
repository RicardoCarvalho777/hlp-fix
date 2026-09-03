import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Search
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Lateral - Identidade Industrial */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-slate-900">
              <Package size={20} />
            </div>
            HLP.FIX
          </h1>
          <p className="text-[10px] text-slate-400 mt-1 tracking-[0.2em] uppercase">HolamPar Suprimentos</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <div className="flex items-center gap-3 p-3 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
            <TrendingUp size={20} />
            <span>Cotações</span>
          </div>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 text-slate-500">
            <span className="text-sm font-medium">Visão Geral</span>
            <span className="text-slate-300">/</span>
            <span className="text-sm text-slate-400">Inteligência de Compras</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar cotação..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-amber-500 w-64"
              />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Cards de KPI - Foco em ROI e Saving */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <TrendingUp size={24} />
                </div>
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  <ArrowUpRight size={12} className="mr-1" /> 12.4%
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Saving Real Acumulado</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">R$ 42.850,00</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Package size={24} />
                </div>
              </div>
              <p className="text-slate-500 text-sm font-medium">Itens em Cotação</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">1.248 itens</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Clock size={24} />
                </div>
              </div>
              <p className="text-slate-500 text-sm font-medium">Tempo Médio de Resposta</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">4.2 horas</h3>
            </div>
          </div>

          {/* Tabela de Cotações Recentes */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-900">Cotações Ativas</h2>
              <button className="text-sm font-bold text-amber-600 hover:text-amber-700">Ver todas</button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">ID / Projeto</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Melhor Oferta</th>
                  <th className="px-6 py-4">Saving Est.</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">#HLP-2024-001</div>
                    <div className="text-xs text-slate-400 font-medium">Parafusos Inox 304 - Lote A</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                      <Clock size={12} /> Processando
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">R$ 12.450,00</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold">R$ 1.200,00</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 font-bold text-xs">Detalhes</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">#HLP-2024-002</div>
                    <div className="text-xs text-slate-400 font-medium">Cabos Flexíveis 2.5mm - 500m</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle2 size={12} /> Concluído
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">R$ 8.900,00</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold">R$ 950,00</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 font-bold text-xs">Detalhes</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
