import React from 'react';
import { BeltRank } from '../types';

interface BeltSelectorProps {
  currentBelt: BeltRank;
  currentStripes: number;
  onUpdate: (belt: BeltRank, stripes: number) => void;
  onCancel: () => void;
}

export const BeltSelector: React.FC<BeltSelectorProps> = ({ currentBelt, currentStripes, onUpdate, onCancel }) => {
  const [belt, setBelt] = React.useState<BeltRank>(currentBelt);
  const [stripes, setStripes] = React.useState<number>(currentStripes);

  const ranks: { value: BeltRank; label: string }[] = [
    { value: 'white', label: '⚪ Branca' },
    { value: 'gray', label: '🔘 Cinza (Iniciante)' },
    { value: 'blue', label: '🔵 Azul' },
    { value: 'purple', label: '🟣 Roxa' },
    { value: 'brown', label: '🟤 Marrom' },
    { value: 'black', label: '⚫ Preta' },
  ];

  const handleSave = () => {
    onUpdate(belt, stripes);
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 animate-in fade-in zoom-in duration-200 mb-6">
      <h3 className="text-slate-300 font-semibold mb-4">Editar Graduação</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-slate-500 uppercase mb-1">Faixa</label>
          <select 
            value={belt} 
            onChange={(e) => setBelt(e.target.value as BeltRank)}
            className="w-full bg-slate-900 border border-slate-700 text-white p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {ranks.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 uppercase mb-1">Graus</label>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setStripes(num)}
                className={`flex-1 py-2 rounded border text-sm font-bold transition-colors
                  ${stripes === num 
                    ? 'bg-white text-slate-900 border-white' 
                    : 'bg-slate-900 text-slate-500 border-slate-700 hover:border-slate-500'
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button 
          onClick={onCancel}
          className="px-3 py-2 text-slate-400 hover:text-white text-sm"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-sm font-medium"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};