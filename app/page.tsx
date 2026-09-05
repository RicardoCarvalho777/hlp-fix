'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Package, TrendingUp, Clock, FileUp, 
  Mail, LogOut, ShieldCheck, AlertCircle, CheckCircle2, 
  Loader2, ChevronRight, Globe, Lock, Zap, BarChart3, X, Check
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function HolamParEnterprise() {
  // Estados de Navegação e Autenticação
  const [view, setView] = useState('login'); // login, register, dashboard
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savePassword, setSavePassword] = useState(false);
  
  // Estados de Dados
  const [uploading, setUploading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulação de Banco de Dados de Usuários (Para o MVP)
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui os dados seriam enviados ao Supabase Auth
    setShowSuccessModal(true);
  };

  const handleLogin = () => {
    if (loginInput.email === userCredentials.email && loginInput.password === userCredentials.password && loginInput.email !== '') {
      setIsLoggedIn(true);
      setView('dashboard');
    } else {
      alert("ACESSO NEGADO: Credenciais Inválidas para o Sistema HolamPar.");
    }
  };

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
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { data } = await supabase.from('quotes').insert([{ title: file.name, status: 'ANALYZING' }]).select().single();
      
      setTimeout(async () => {
        await supabase.from('quotes').update({ status: 'READY' }).eq('id', data.id);
        fetchQuotes();
        if (i === files.length - 1) setUploading(false);
      }, 2000 * (i + 1));
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchQuotes();
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-[#000000] font-sans text-[#FFFFFF] selection:bg-[#FF5A00] selection:text-black">
      <script src="https://cdn.tailwindcss.com"></script>

      {/* MODAL DE SUCESSO NO CADASTRO */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#EDEDED] p-10 rounded-[2.5rem] max-w-sm w-full text-center shadow-[0_0_50px_rgba(255,90,0,0.2)] border-2 border-[#FF5A00]">
            <div className="w-20 h-20 bg-[#FF5A00] rounded-full flex items-center justify-center mx-auto mb-6 text-black shadow-lg">
              <CheckCircle2 size={40} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black text-black mb-2 tracking-tighter uppercase">Cadastro Concluído</h3>
            <p className="text-slate-600 text-xs font-bold mb-8 leading-relaxed">Sua conta industrial HolamPar foi criada com sucesso. Use suas credenciais para acessar o sistema.</p>
            <button 
              onClick={() => { setShowSuccessModal(false); setView('login'); }}
              className="w-full bg-black text-[#FF5A00] font-black py-4 rounded-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-xs shadow-xl"
            >
              Ok, Entendido
            </button>
          </div>
        </div>
      )}

      {/* TELA DE ACESSO (LOGIN / CADASTRO) */}
      {!isLoggedIn && (
        <div className="min-h-screen flex items-center justify-center p-6 bg-black">
          <div className="bg-[#111111] p-12 rounded-[3rem] shadow-[0_0_60px_rgba(255,90,0,0.15)] w-full max-w-[480px] border border-white/5">
            <div className="flex flex-col items-center mb-12">
              <div className="w-24 h-24 bg-[#FF5A00] rounded-[2rem] flex items-center justify-center text-black shadow-[0_0_40px_rgba(255,90,0,0.3)] mb-6">
                <ShieldCheck size={50} strokeWidth={2.5} />
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter italic">HLP.FIX</h2>
              <p className="text-[#FF5A00] text-[10px] font-black uppercase tracking-[0.5em] mt-2">Industrial Intelligence</p>
            </div>

            {view === 'login' ? (
              <div className="space-y-5">
                <button className="w-full flex items-center justify-center gap-3 bg-white text-black font-black py-5 rounded-2xl hover:bg-[#EDEDED] transition-all text-xs uppercase tracking-widest">
                  <Globe size={18} /> Entrar com Google
                </button>
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-[#111111] px-4 text-slate-500 font-bold">Acesso Corporativo</span></div>
                </div>
                <input 
                  type="email" 
                  placeholder="E-MAIL" 
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-sm font-bold text-white"
                  onChange={(e) => setLoginInput({...loginInput, email: e.target.value})}
                />
                <input 
                  type="password" 
                  placeholder="SENHA" 
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-sm font-bold text-white"
                  onChange={(e) => setLoginInput({...loginInput, password: e.target.value})}
                />
                
                <div className="flex items-center justify-between px-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      onClick={() => setSavePassword(!savePassword)}
                      className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${savePassword ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 bg-white/5'}`}
                    >
                      {savePassword && <Check size={16} className="text-white" strokeWidth={4} />}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">Salvar Senha?</span>
                  </label>
                  <button className="text-[10px] font-black text-[#FF5A00] uppercase tracking-widest hover:underline">Esqueci a senha</button>
                </div>

                <button onClick={handleLogin} className="w-full bg-[#FF5A00] text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl uppercase tracking-[0.2em] text-xs">Iniciar Operação</button>
                <p className="text-center text-[10px] text-slate-500 font-black uppercase tracking-widest mt-8">Novo por aqui? <button onClick={() => setView('register')} className="text-[#FF5A00] hover:underline">Criar Conta Industrial</button></p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <input required type="text" placeholder="NOME / RAZÃO SOCIAL" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-xs font-bold text-white" />
                <input required type="text" placeholder="CPF / CNPJ" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-xs font-bold text-white" />
                <input 
                  required 
                  type="email" 
                  placeholder="E-MAIL DE CONTATO" 
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-xs font-bold text-white"
                  onChange={(e) => setUserCredentials({...userCredentials, email: e.target.value})}
                />
                <input 
                  required 
                  type="password" 
                  placeholder="DEFINIR SENHA" 
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#FF5A00] transition-all text-xs font-bold text-white"
                  onChange={(e) => setUserCredentials({...userCredentials, password: e.target.value})}
                />
                <button type="submit" className="w-full bg-[#FF5A00] text-black font-black py-5 rounded-2xl hover:bg-[#FF5A00]/90 transition-all shadow-lg uppercase tracking-widest text-xs">Finalizar Cadastro</button>
                <button onClick={() => setView('login')} className="w-full text-slate-500 font-black py-2 text-[10px] uppercase tracking-widest">Voltar ao Login</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DASHBOARD HOLAMPAR PREMIUM */}
      {isLoggedIn && (
        <div className="flex h-screen overflow-hidden bg-black">
          <aside className="w-72 bg-black border-r border-white/5 flex flex-col">
            <div className="p-10 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF5A00] rounded-2xl flex items-center justify-center text-black shadow-lg">
                  <Package size={28} strokeWidth={3} />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tighter italic">HLP.FIX</h1>
                  <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div> Secure Node
                  </span>
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
              <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-4 p-5 text-rose-500 hover:bg-rose-500/10 w-full rounded-2xl transition-all font-black text-[10px] tracking-[0.2em]">
                <LogOut size={20} /> LOGOUT
              </button>
            </div>
          </aside>

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
                  <h3 className="text-4xl font-black text-white tracking-tighter">{quotes.length} Unid.</h3>
                  <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Aguardando Aprovação</p>
                </div>
              </div>

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
                
                <div className="p-4">
                  {loading ? (
                    <div className="flex flex-col items-center py-24 gap-4 text-slate-700">
                      <Loader2 className="animate-spin" size={48} />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sincronizando...</p>
                    </div>
                  ) : quotes.length === 0 ? (
                    <div className="p-20 text-center">
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle size={40} className="text-slate-700" />
                      </div>
                      <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Aguardando entrada de dados...</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] border-b border-white/5">
                            <th className="py-8 px-10">Documento</th>
                            <th className="py-8 px-10">Status Operacional</th>
                            <th className="py-8 px-10 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {quotes.map((quote: any) => (
                            <tr key={quote.id} className="group hover:bg-white/[0.02] transition-all">
                              <td className="py-10 px-10">
                                <div className="font-black text-white text-lg tracking-tight italic">{quote.title}</div>
                                <div className="text-[10px] text-slate-500 font-black uppercase mt-2 tracking-widest">
                                  {new Date(quote.created_at).toLocaleString('pt-BR')}
                                </div>
                              </td>
                              <td className="py-10 px-10">
                                <span className={`px-5 py-2 rounded-full text-[9px] font-black border uppercase tracking-[0.2em] ${
                                  quote.status === 'READY' 
                                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                                  : 'bg-[#FF5A00]/10 text-[#FF5A00] border-[#FF5A00]/20 animate-pulse'
                                }`}`}>
                                  {quote.status}
                                </span>
                              </td>
                              <td className="py-10 px-10 text-right">
                                <button className="bg-white/5 text-white px-8 py-3 rounded-xl font-black text-[10px] hover:bg-[#FF5A00] hover:text-black transition-all uppercase tracking-widest border border-white/10">
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
      )}
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" multiple />
    </div>
  );
}
