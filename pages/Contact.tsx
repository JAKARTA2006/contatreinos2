import React from 'react';
import { Mail, MessageCircle, Github } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Entre em Contato</h2>
        <p className="text-slate-400 mb-8">Tem sugestões ou encontrou um bug? Fale conosco.</p>

        <div className="grid gap-4">
          {/* Email */}
          <a href="mailto:jakarta2006@gmail.com" className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group">
            <div className="bg-indigo-500/20 text-indigo-400 p-3 rounded-full group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">Email</h3>
              <p className="text-sm text-slate-400">jakarta2006@gmail.com</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/5511941075088" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
          >
            <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">Gilmar Silva (WhatsApp)</h3>
              <p className="text-sm text-slate-400">(11) 94107-5088</p>
            </div>
          </a>

          {/* GitHub (Mantido como placeholder ou pode ser removido se não houver repo público) */}
          <a href="#" className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group">
            <div className="bg-slate-700 text-slate-400 p-3 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
              <Github size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">GitHub</h3>
              <p className="text-sm text-slate-400">Contribua com o código</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};