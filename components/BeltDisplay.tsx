import React from 'react';
import { BeltRank } from '../types';

interface BeltDisplayProps {
  rank: BeltRank;
  total: number;
}

const beltStyles: Record<BeltRank, string> = {
  white: 'bg-slate-100 text-slate-900 border-slate-300',
  gray: 'bg-slate-400 text-white border-slate-500',
  blue: 'bg-blue-600 text-white border-blue-800',
  purple: 'bg-purple-700 text-white border-purple-900',
  brown: 'bg-amber-900 text-white border-amber-950',
  black: 'bg-neutral-900 text-white border-red-600',
};

const beltLabels: Record<BeltRank, string> = {
  white: 'Faixa Branca',
  gray: 'Iniciante Avançado',
  blue: 'Faixa Azul',
  purple: 'Faixa Roxa',
  brown: 'Faixa Marrom',
  black: 'Faixa Preta',
};

export const BeltDisplay: React.FC<BeltDisplayProps> = ({ rank, total }) => {
  const style = beltStyles[rank];
  const label = beltLabels[rank];

  return (
    <div className={`relative w-full h-16 rounded-lg shadow-lg flex items-center justify-between px-6 overflow-hidden border-b-4 ${style}`}>
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')]"></div>
      
      <div className="z-10 font-bold text-xl tracking-wide uppercase drop-shadow-md">
        {label}
      </div>

      {/* Red bar logic for black belt or generic rank bar */}
      <div className="z-10 flex items-center gap-2">
         <span className="text-xs font-mono opacity-80 uppercase">Total Treinos</span>
         <span className="text-2xl font-black">{total}</span>
      </div>

      {/* Belt Bar Visual Detail (The black/red bar on one end) */}
      <div className={`absolute right-0 top-0 bottom-0 w-12 ${rank === 'black' ? 'bg-red-600' : 'bg-black/20'} border-l border-black/10`}></div>
    </div>
  );
};
