import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Medal, Share2, Info, Mail, Home as HomeIcon } from 'lucide-react';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function Layout() {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium
      ${isActive 
        ? 'bg-slate-800 text-white' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center pb-12 bg-slate-950">
      {/* Header & Navigation */}
      <header className="w-full bg-slate-900/80 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-900/20">
                <Medal size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-100">JJ Tracker</h1>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className={getLinkClass('/')}>
              <HomeIcon size={16} /> Início
            </Link>
            <Link to="/sobre" className={getLinkClass('/sobre')}>
              <Info size={16} /> Sobre
            </Link>
            <Link to="/contato" className={getLinkClass('/contato')}>
              <Mail size={16} /> Contato
            </Link>
          </nav>

          {/* Mobile Action (only PWA hint, nav is bottom) */}
          <button 
            onClick={() => alert('Instale como PWA: No Chrome Mobile, toque em Compartilhar > Adicionar à Tela Inicial.')}
            className="md:hidden text-slate-400 hover:text-white transition-colors"
          >
            <Share2 size={20} />
          </button>
        </div>
        
        {/* Mobile Nav Tabs */}
        <div className="md:hidden flex border-t border-slate-800 bg-slate-900/50">
          <Link to="/" className={`flex-1 flex justify-center py-3 ${location.pathname === '/' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500'}`}>
            <HomeIcon size={20} />
          </Link>
          <Link to="/sobre" className={`flex-1 flex justify-center py-3 ${location.pathname === '/sobre' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500'}`}>
            <Info size={20} />
          </Link>
          <Link to="/contato" className={`flex-1 flex justify-center py-3 ${location.pathname === '/contato' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-500'}`}>
            <Mail size={20} />
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <main className="w-full flex justify-center mt-6 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>

      <footer className="mt-auto pt-12 pb-6 text-slate-600 text-xs text-center px-4">
        <p>Os dados são salvos apenas no seu dispositivo (LocalStorage).</p>
        <p className="mt-1 opacity-50">OSS 🥋</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}