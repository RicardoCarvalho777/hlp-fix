'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Package, TrendingUp, Clock, FileUp, 
  Mail, LogOut, ShieldCheck, AlertCircle, CheckCircle2, 
  Loader2, ChevronRight, UserPlus, Globe, Lock, Zap, BarChart3
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function HolamParEnterprise() {
  const [view, setView] = useState('login'); // login, register, dashboard
  const [uploading, setUploading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cores Oficiais HolamPar
  const colors = {
    black: '#000000',
    orange: '#FF5A00',
    white: '#FFFFFF',
    gray: '#EDEDED'
  };

  return (
    <div className="min-h-screen bg-[#000000] font-sans text-[#FFFFFF]">
      <script src="https://cdn.tailwindcss.com"></script>

      {/* TELA DE ACESSO (LOGIN / CADASTRO) */}
      {view === 'login' || view === 'register' ? (
        <div className="min-h-screen flex items-center justify-center p-6 bg-black">
          <div className="bg-[#111111] p-12 rounded-[3rem] shadow-[0_0_50px_rgba(255,90,0,0.1)] w-full max-w-[480px] border border-[#FF5A00]/20">
            <div className="flex flex-col items-center mb-12">
              <div className="w-24 h-24 bg-[#FF5A00] rounded-[2rem] flex items-center justify-center text-black shadow-[0_0_40px_rgba(255,90,0,0.3)] mb-6">
                <ShieldCheck size={50} strokeWidth={2.5} />
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter italic">HLP.FIX</h2>
              <p className="text-[#FF5A00] text-[10px] font-black uppercase tracking-[0.5em] mt-2">Industrial Intelligence</p>
            </div>

            {view === 'login' ? (
              <div className="space-y-5">
                <button onClick={() => setView('dashboard')} className="w-full flex items-center justify-center gap-3 bg-white text-black font-black py-5 rounded-2xl hover:bg-[#EDEDED] transition-all text-xs uppercase tracking-widest">
                  <Globe size={18} /> Entrar com Google
                </button>
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-[#111111] px-4 text-slate-500 font-bold">Acesso Corporativo</span></div>
                </div>
                <input type="email" placeholder="E-MAIL" className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-sm font-bold" />
                <input type="password" placeholder="SENHA" className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-sm font-bold" />
                <button onClick={() => setView('dashboard')} className="w-full bg-[#FF5A00] text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl uppercase tracking-[0.2em] text-xs">Iniciar Operação</button>
                <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-8">Novo por aqui? <button onClick={() => setView('register')} className="text-[#FF5A00] hover:underline">Criar Conta Industrial</button></p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <input type="text" placeholder="NOME / RAZÃO SOCIAL" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-xs font-bold" />
                <input type="text" placeholder="CPF / CNPJ" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-xs font-bold" />
                <input type="email" placeholder="E-MAIL DE CONTATO" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-xs font-bold" />
                <input type="password" placeholder="DEFINIR SENHA" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-xs font-bold" />
                <button onClick={() => setView('login')} className="w-full bg-[#FF5A00] text-black font-black py-5 rounded-2xl hover:bg-[#FF5A00]/90 transition-all shadow-lg uppercase tracking-widest text-xs">Finalizar Cadastro</button>
                <button onClick={() => setView('login')} className="w-full text-slate-500 font-black py-2 text-[10px] uppercase tracking-widest">Voltar ao Login</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* DASHBOARD HOLAMPAR PREMIUM */
        <div className="flex h-screen overflow-hidden bg-black">
          {/* Sidebar - Total Black */}
          <aside className="w-72 bg-black border-r border-white/5 flex flex-col">
            <div className="p-10 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF5A00] rounded-2xl flex items-center justify-center text-black shadow-lg">
                  <Package size={28} strokeWidth={3} />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tighter italic">HLP.FIX</h1>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Secure Node</span>
                  </div>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-8 space-y-3">
              <div className="flex items-center gap-4 p-5 bg-[#FF5A00] text-black rounded-2xl font-black text-[10px] tracking-[0.2em] shadow-xl cursor-pointer">
                <LayoutDashboard size={20} /> DASHBOARD
              </div>
              <div className="flex items-center gap-4 p-5 text-slate-500 hover:text-[#FF5A00] hover:bg-white/5 rounded-2xl transition-all cursor-pointer font-black text-[10px] tracking-[0.2em]">
                <BarChart3 size={20} /> SAVING ANALYTICS
              </div>
              <div className="flex items-center gap-4 p-5 text-slate-500 hover:text-[#FF5A00] hover:bg-white/5 rounded-2xl transition-all cursor-pointer font-black text-[10px] tracking-[0.2em]">
                <Mail size={20} /> GMAIL CONNECT
              </div>
            </nav>
            <div className="p-8 border-t border-white/5">
              <button onClick={() => setView('login')} className="flex items-center gap-4 p-5 text-rose-500 hover:bg-rose-500/10 w-full rounded-2xl transition-all font-black text-[10px] tracking-[0.2em]">
                <LogOut size={20} /> LOGOUT
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <header className="h-28 bg-black border-b border-white/5 flex items-center justify-between px-14">
              <div>
                <h2 className="text-[10px] font-black text-[#FF5A00] uppercase tracking-[0.4em] mb-2">HolamPar Soluções Industriais</h2>
                <p className="text-3xl font-black text-white tracking-tighter italic">Controle de Suprimentos</p>
              </div>
              <div className="flex gap-5">
                <button className="bg-white/5 text-white px-8 py-4 rounded-2xl font-black text-[10px] flex items-center gap-3 hover:bg-white/10 transition-all uppercase tracking-[0.2em] border border-white/10">
                  <Zap size={18} className="text-[#FF5A00]" /> Analisar Anexos
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="bg-[#FF5A00] text-black px-10 py-5 rounded-2xl font-black text-xs flex items-center gap-3 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,90,0,0.2)] uppercase tracking-[0.2em]">
                  <FileUp size={20} /> {uploading ? 'Processando...' : 'Novo Orçamento'}
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-14 space-y-10 custom-scrollbar">
              {/* Cards de KPI - Cinza Claro para Contraste */}
              <div className="grid grid-cols-3 gap-8">
                <div className="bg-[#EDEDED] p-10 rounded-[2.5rem] shadow-xl">
                  <p className="text-black/40 text-[10px] font-black uppercase tracking-widest mb-3">Saving Acumulado</p>
                  <h3 className="text-4xl font-black text-black tracking-tighter">R$ 12.450,00</h3>
                  <div className="mt-4 flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase">
                    <TrendingUp size={14} /> +15.4% este mês
                  </div>
                </div>
                <div className="bg-[#111111] p-10 rounded-[2.5rem] border border-white/5">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Tempo de Operação</p>
                  <h3 className="text-4xl font-black text-[#FF5A00] tracking-tighter">42 Horas</h3>
                  <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Economia em digitação</p>
                </div>
                <div className="bg-[#111111] p-10 rounded-[2.5rem] border border-white/5">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Cotações Ativas</p>
                  <h3 className="text-4xl font-black text-white tracking-tighter">08 Unid.</h3>
                  <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Aguardando Aprovação</p>
                </div>
              </div>

              {/* Tabela de Cotações */}
              <div className="bg-[#111111] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-12 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight italic">Cotações Recentes</h2>
                    <p className="text-[10px] text-[#FF5A00] font-black uppercase tracking-[0.3em] mt-2">Processamento em Tempo Real</p>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-black rounded-full border border-[#FF5A00]/30 text-[10px] font-black text-[#FF5A00] uppercase tracking-widest">
                    <Lock size={14} /> Criptografia de Ponta
                  </div>
                </div>
                <div className="p-20 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle size={40} className="text-slate-700" />
                  </div>
                  <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Aguardando entrada de dados...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
