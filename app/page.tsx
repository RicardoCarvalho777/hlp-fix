import { BarChart3, Upload, Package, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-amber-500">HLP.FIX</h1>
          <p className="text-slate-400 uppercase text-xs tracking-widest">HolamPar Soluções Industriais</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-bold transition">Novo Orçamento</button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <TrendingUp className="text-green-500" />
            <span className="text-xs text-green-500 font-bold">+0%</span>
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Saving Real Acumulado</h3>
          <p className="text-2xl font-bold">R$ 0,00</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <BarChart3 className="text-amber-500 mb-4" />
          <h3 className="text-slate-400 text-sm mb-1">Orçamentos Processados</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <Package className="text-blue-500 mb-4" />
          <h3 className="text-slate-400 text-sm mb-1">Itens em Estoque</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="text-amber-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">Arraste seus PDFs aqui</h2>
          <p className="text-slate-400 text-sm mb-8">O HLP.FIX vai extrair os preços, calcular IPI, ST e Frete automaticamente para você decidir onde comprar.</p>
          <button className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-bold transition inline-block">
            Selecionar Arquivos
          </button>
        </div>
      </section>
    </main>
  );
}
