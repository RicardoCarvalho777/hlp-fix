'use client';
import React from 'react';
import { LayoutDashboard, Package, TrendingUp, Clock, Search, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* Script do Tailwind para garantir o visual agora */}
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* Sidebar */}
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
          <div className="flex items-center gap-3 p-3 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 text-slate-500">
            <span className="text-sm font-medium">Visão Geral</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Buscar..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64" />
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp size={24} /></div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+12.4%</span>
              </div>
              <p className="text-slate-500 text-sm">Saving Real Acumulado</p>
              <h3 className="text-2xl font-bold text-slate-900">R$ 42.850,00</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg mb-4 w-fit"><Package size={24} /></div>
              <p className="text-slate-500 text-sm">Itens em Cotação</p>
              <h3 className="text-2xl font-bold text-slate-900">1.248 itens</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit"><Clock size={24} /></div>
              <p className="text-slate-500 text-sm">Tempo de Resposta</p>
              <h3 className="text-2xl font-bold text-slate-900">4.2 horas</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
