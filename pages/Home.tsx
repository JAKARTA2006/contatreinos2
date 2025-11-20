import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  Download, 
  Upload, 
  Trash2, 
  Plus, 
  Settings, 
  Edit3,
  List
} from 'lucide-react';
import { AppState, BeltRank } from '../types';
import { todayISO, weekOf, monthOf, formatDateBr } from '../utils/dateUtils';
import { BeltDisplay } from '../components/BeltDisplay';
import { BeltSelector } from '../components/BeltSelector';
import { StatsGrid } from '../components/StatsGrid';
import { HistoryTracker } from '../components/HistoryTracker';
import { exportToPDF } from '../utils/pdfExporter';

const STORAGE_KEY = "jj_treinos_v1";

export const Home = () => {
  // --- State Management ---
  const [state, setState] = useState<AppState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Ensure backward compatibility for new 'stripes' field
        return { stripes: 0, ...parsed };
      }
    } catch (e) {
      console.warn('Erro ao ler localStorage', e);
    }
    return {
      treinosTotal: 0,
      history: {},
      goal: 20,
      belt: 'white',
      stripes: 0,
    };
  });

  const [isEditingBelt, setIsEditingBelt] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Erro ao salvar localStorage', e);
    }
  }, [state]);

  // Note: Automatic belt calculation removed to allow manual "Choose Belt" feature
  // as requested. The user now explicitly sets their belt.

  // --- Actions ---
  const addTreino = useCallback((dateISO: string = todayISO()) => {
    setState(prev => {
      const h = { ...prev.history };
      h[dateISO] = (h[dateISO] || 0) + 1;
      return {
        ...prev,
        treinosTotal: prev.treinosTotal + 1,
        history: h,
      };
    });
  }, []);

  const removeTreino = useCallback((dateISO: string = todayISO()) => {
    setState(prev => {
      const h = { ...prev.history };
      if (!h[dateISO]) return prev;
      h[dateISO] = Math.max(0, h[dateISO] - 1);
      const newTotal = Math.max(0, prev.treinosTotal - 1);
      return { ...prev, treinosTotal: newTotal, history: h };
    });
  }, []);

  const updateBeltInfo = (rank: BeltRank, stripes: number) => {
    setState(prev => ({ ...prev, belt: rank, stripes: stripes }));
    setIsEditingBelt(false);
  };

  const manualAdd = () => {
    const dateStr = prompt('Data do treino (YYYY-MM-DD):', todayISO());
    if (!dateStr) return;
    
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        alert("Formato inválido. Use YYYY-MM-DD");
        return;
    }

    const qtyStr = prompt(`Quantos treinos adicionar em ${dateStr}?`, '1');
    const qty = parseInt(qtyStr || '0', 10);
    if (!qty || qty <= 0) return;

    setState(prev => {
      const h = { ...prev.history };
      h[dateStr] = (h[dateStr] || 0) + qty;
      return { ...prev, history: h, treinosTotal: prev.treinosTotal + qty };
    });
  };

  const handleReset = () => {
    if (!window.confirm('ATENÇÃO: Isso apagará todo o seu histórico. Tem certeza?')) return;
    setState({ treinosTotal: 0, history: {}, goal: 20, belt: 'white', stripes: 0 });
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; 
    a.download = `jj_backup_${todayISO()}.json`; 
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
            const parsed = JSON.parse(result);
            if (parsed.history && typeof parsed.treinosTotal === 'number') {
                if (window.confirm('Substituir estado atual com o backup importado?')) {
                    setState({ stripes: 0, ...parsed });
                }
            } else {
                alert("Estrutura do JSON inválida.");
            }
        }
      } catch (err) { 
          alert('Arquivo inválido ou corrompido.'); 
      }
    };
    reader.readAsText(file);
  };

  // --- Derived Stats ---
  const getStats = () => {
    const today = todayISO();
    const thisWeekStart = weekOf(today);
    const thisMonth = monthOf(today);

    let day = state.history[today] || 0;
    let week = 0;
    let month = 0;

    for (const d in state.history) {
      if (d >= thisWeekStart && d <= today) week += state.history[d];
      if (d.slice(0, 7) === thisMonth) month += state.history[d];
    }
    return { day, week, month };
  };

  const stats = getStats();
  const progressPercent = Math.min(100, Math.round((state.treinosTotal / state.goal) * 100));

  return (
    <div className="w-full max-w-3xl flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Belt Display & Editor */}
      <section>
        {isEditingBelt ? (
          <BeltSelector 
            currentBelt={state.belt} 
            currentStripes={state.stripes} 
            onUpdate={updateBeltInfo}
            onCancel={() => setIsEditingBelt(false)}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="relative group cursor-pointer" onClick={() => setIsEditingBelt(true)}>
              <BeltDisplay rank={state.belt} stripes={state.stripes} total={state.treinosTotal} />
              {/* Hover hint for desktop */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg pointer-events-none">
                  <span className="bg-slate-900/80 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 backdrop-blur-sm">
                    <Edit3 size={16} /> Alterar Graduação
                  </span>
              </div>
            </div>
            
            {/* Explicit button for mobile/usability */}
            <div className="flex justify-end">
              <button 
                onClick={() => setIsEditingBelt(true)}
                className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 px-2 py-1"
              >
                <Edit3 size={12} /> Editar Faixa/Graus
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Main Dashboard Area (Ref for PDF export) */}
      <div ref={exportRef} className="flex flex-col gap-6 bg-slate-950"> 
        {/* Stats Grid */}
        <StatsGrid 
          stats={stats} 
          onAddToday={() => addTreino()} 
          onRemoveToday={() => removeTreino()} 
        />

        {/* Goal Progress */}
        <section className="bg-slate-800 p-5 rounded-xl border border-slate-700">
           <div className="flex justify-between items-end mb-2">
              <label className="text-slate-400 text-sm font-medium uppercase tracking-wider">Meta Atual</label>
              <span className="text-slate-100 font-mono text-sm">{progressPercent}%</span>
           </div>
           <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
           </div>
           <div className="mt-4 flex items-center gap-3">
              <span className="text-slate-400 text-sm">Definir Meta:</span>
              <input 
                type="number" 
                value={state.goal} 
                onChange={(e) => setState(s => ({ ...s, goal: parseInt(e.target.value) || 0 }))} 
                className="bg-slate-900 border border-slate-600 rounded px-3 py-1 text-white text-sm w-24 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
           </div>
        </section>

        {/* History Chart (Visual) */}
        <HistoryTracker history={state.history} />

        {/* NEW: Detailed History List (Textual) */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <h3 className="text-slate-300 font-semibold mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
            <List size={16} className="text-slate-400" />
            Detalhamento (Últimos 14 dias)
          </h3>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 14 }).map((_, i) => {
              const d = todayISO(-i);
              const count = state.history[d] || 0;
              if (count === 0) return null;
              
              return (
                <div key={d} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-slate-200 text-sm font-medium">{formatDateBr(d)}</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-sm bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-900/30">
                      {count} {count === 1 ? 'Treino' : 'Treinos'}
                    </span>
                </div>
              );
            })}
            
            {/* Empty State */}
            {Array.from({ length: 14 }).every((_, i) => !state.history[todayISO(-i)]) && (
                <div className="text-center py-6 text-slate-500 text-sm italic bg-slate-900/30 rounded-lg border border-slate-800/30 border-dashed">
                    Nenhuma atividade registrada neste período.
                    <br />
                    <span className="text-xs opacity-70">Bora treinar? OSS!</span>
                </div>
            )}
          </div>
        </div>

      </div>

      {/* Actions Panel */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <h4 className="text-slate-400 text-sm font-bold uppercase mb-1 flex items-center gap-2">
              <Settings size={16} /> Gestão
            </h4>
            
            <button onClick={manualAdd} className="flex items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-left text-sm">
              <div className="bg-indigo-500/20 text-indigo-400 p-1.5 rounded">
                  <Plus size={16} />
              </div>
              <span>Adicionar Data Passada</span>
            </button>

            <button onClick={handleReset} className="flex items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-red-900/20 rounded-lg transition-colors text-left text-sm group">
              <div className="bg-red-500/20 text-red-400 p-1.5 rounded group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <Trash2 size={16} />
              </div>
              <span className="text-red-400 group-hover:text-red-300">Resetar Tudo</span>
            </button>
         </div>

         <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <h4 className="text-slate-400 text-sm font-bold uppercase mb-1 flex items-center gap-2">
              <Download size={16} /> Dados
            </h4>
            
            <button onClick={() => exportToPDF(exportRef.current)} className="flex items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-left text-sm">
              <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded">
                  <Download size={16} />
              </div>
              <span>Baixar PDF (Relatório)</span>
            </button>

            <div className="flex gap-2">
                <button onClick={exportJSON} className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-xs">
                  <Download size={14} /> Backup
                </button>
                
                <label className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-xs cursor-pointer">
                  <Upload size={14} /> Restore
                  <input type="file" accept=".json" className="hidden" onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])} />
                </label>
            </div>
         </div>
      </section>
    </div>
  );
};