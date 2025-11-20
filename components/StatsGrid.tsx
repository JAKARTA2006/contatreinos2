import React from 'react';
import { Activity, Calendar, TrendingUp } from 'lucide-react';
import { StatsRange } from '../types';

interface StatsGridProps {
  stats: StatsRange;
  onAddToday: () => void;
  onRemoveToday: () => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, onAddToday, onRemoveToday }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-4 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider">Hoje</p>
          <p className="text-3xl font-bold text-emerald-400">{stats.day}</p>
        </div>
        <div className="flex flex-col gap-1">
           <button 
             onClick={onAddToday}
             className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
             aria-label="Adicionar treino hoje"
           >
             <Activity size={18} />
           </button>
           <button 
             onClick={onRemoveToday}
             className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors"
             aria-label="Remover treino hoje"
           >
             <div className="w-[18px] h-[2px] bg-white my-[8px]"></div>
           </button>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-blue-600/20 text-blue-400 rounded-lg">
          <Calendar size={24} />
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider">Esta Semana</p>
          <p className="text-2xl font-bold text-slate-100">{stats.week}</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-purple-600/20 text-purple-400 rounded-lg">
          <TrendingUp size={24} />
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider">Este Mês</p>
          <p className="text-2xl font-bold text-slate-100">{stats.month}</p>
        </div>
      </div>
    </div>
  );
};
