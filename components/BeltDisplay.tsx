import React from 'react';
import { BeltRank } from '../types';

interface BeltDisplayProps {
  rank: BeltRank;
  stripes: number;
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
  gray: 'Iniciante',
  blue: 'Faixa Azul',
  purple: 'Faixa Roxa',
  brown: 'Faixa Marrom',
  black: 'Faixa Preta',
};

export const BeltDisplay: React.FC<BeltDisplayProps> = ({ rank, stripes, total }) => {
  const style = beltStyles[rank];
  const label = beltLabels[rank];
  const isBlackBelt = rank === 'black';

  return (
    <div className={`relative w-full h-20 rounded-lg shadow-lg flex items-center justify-between px-4 sm:px-6 overflow-hidden border-b-4 ${style}`}>
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')]"></div>
      
      <div className="z-10 flex flex-col justify-center">
        <div className="font-bold text-xl tracking-wide uppercase drop-shadow-md leading-tight">
          {label}
        </div>
        <div className="text-xs opacity-80 font-mono">
          {stripes > 0 ? `${stripes} Grau${stripes > 1 ? 's' : ''}` : 'Sem graus'}
        </div>
      </div>

      <div className="z-10 flex flex-col items-end sm:flex-row sm:items-center gap-1 sm:gap-2 mr-14 sm:mr-16">
         <span className="text-[10px] sm:text-xs font-mono opacity-80 uppercase">Total Treinos</span>
         <span className="text-2xl font-black">{total}</span>
      </div>

      {/* Belt Bar (Tarja) */}
      <div className={`absolute right-0 top-0 bottom-0 w-12 sm:w-16 ${isBlackBelt ? 'bg-red-600' : 'bg-black'} border-l border-black/20 flex flex-col justify-center items-center gap-1.5`}>
        {/* Stripes (Graus) */}
        {Array.from({ length: 4 }).map((_, i) => {
          // Logic: render stripes from bottom up usually, but simpler here to just render based on count
          // CSS flex gap handles spacing
          if (i < stripes) {
             return <div key={i} className="w-full h-2 bg-white shadow-sm"></div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};