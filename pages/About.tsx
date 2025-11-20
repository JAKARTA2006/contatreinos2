import React from 'react';

export const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Sobre o JJ Tracker</h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            O <strong>JJ Tracker</strong> foi desenvolvido para praticantes de Jiu-Jitsu que desejam acompanhar 
            sua consistência no tatame de forma simples, visual e motivadora.
          </p>
          <p>
            Ao contrário de planilhas complexas, focamos no que importa: <strong>Consistência</strong>. 
            Acompanhe seus treinos diários, veja seu histórico visualmente e exporte relatórios 
            para compartilhar seu progresso.
          </p>
          
          <h3 className="text-lg font-semibold text-white mt-6">Recursos Principais</h3>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Histórico local (privacidade total).</li>
            <li>Visualização de faixas e graus.</li>
            <li>Exportação de relatórios em PDF.</li>
            <li>Backup e Restore via JSON.</li>
            <li>Funciona offline (PWA).</li>
          </ul>

          <div className="mt-8 pt-6 border-t border-slate-800 text-sm text-slate-500">
            Versão 1.2.0 — Desenvolvido com React & Tailwind.
          </div>
        </div>
      </div>
    </div>
  );
};