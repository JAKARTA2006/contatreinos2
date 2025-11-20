import React from 'react';
import { formatDateBr, todayISO } from '../utils/dateUtils';
import { HistoryMap } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface HistoryTrackerProps {
  history: HistoryMap;
}

export const HistoryTracker: React.FC<HistoryTrackerProps> = ({ history }) => {
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = todayISO(-i);
    days.push({ 
      date: d, 
      label: formatDateBr(d), 
      count: history[d] || 0 
    });
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CheckCircle2 className="text-emerald-500" size={20} />
        Histórico Recente
      </h3>
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {days.map((day) => (
          <div 
            key={day.date} 
            className={`
              flex flex-col items-center justify-center p-2 rounded-lg border 
              transition-all duration-200
              ${day.count > 0 
                ? 'bg-emerald-900/40 border-emerald-700/50 text-emerald-100' 
                : 'bg-slate-900/50 border-slate-800 text-slate-500'}
            `}
          >
            <span className="text-[10px] sm:text-xs uppercase opacity-70">{day.label}</span>
            <span className={`text-lg sm:text-xl font-bold ${day.count > 0 ? 'text-emerald-400' : 'text-slate-600'}`}>
              {day.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
