import React from 'react';
import { PageId } from '../types';
import { Sparkles, Layers, Wand2, Languages, BarChart3, CreditCard, Settings, Video } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  onNewUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onSelectPage, onNewUpload }) => {
  return (
    <>
      {/* Strict Top Bar Contract: 3 zones, 1 line */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur sticky top-0 z-50">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectPage('studio')}
          className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 text-left flex items-center gap-2"
        >
          <span className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-xs font-black text-white">
            SF
          </span>
          <span>SubFlow AI</span>
        </button>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectPage('studio')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'studio' ? 'text-white font-semibold underline underline-offset-8 decoration-indigo-500 decoration-2' : 'hover:text-white'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => onSelectPage('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'dashboard' ? 'text-white font-semibold underline underline-offset-8 decoration-indigo-500 decoration-2' : 'hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => onSelectPage('batch')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'batch' ? 'text-white font-semibold underline underline-offset-8 decoration-indigo-500 decoration-2' : 'hover:text-white'
            }`}
          >
            Batch
          </button>
          <button
            onClick={() => onSelectPage('templates')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'templates' ? 'text-white font-semibold underline underline-offset-8 decoration-indigo-500 decoration-2' : 'hover:text-white'
            }`}
          >
            Styles
          </button>
          <button
            onClick={() => onSelectPage('translation')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'translation' ? 'text-white font-semibold underline underline-offset-8 decoration-indigo-500 decoration-2' : 'hover:text-white'
            }`}
          >
            Translate
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNewUpload}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm shadow-indigo-500/20"
          >
            New Subtitle
          </button>
        </div>
      </header>

      {/* Workspace Secondary Navigation Strip for all 8 SaaS modules */}
      <div className="border-b border-slate-800/60 bg-slate-900/60 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-2 hidden sm:inline">Workspace Modules:</span>
            
            <button
              onClick={() => onSelectPage('studio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPage === 'studio'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>1. Generator Studio</span>
            </button>

            <button
              onClick={() => onSelectPage('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPage === 'dashboard'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Projects</span>
            </button>

            <button
              onClick={() => onSelectPage('batch')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPage === 'batch'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3. Batch Queue</span>
            </button>

            <button
              onClick={() => onSelectPage('templates')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPage === 'templates'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>4. Styles Library</span>
            </button>

            <button
              onClick={() => onSelectPage('translation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPage === 'translation'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>5. AI Translate</span>
            </button>

            <button
              onClick={() => onSelectPage('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPage === 'analytics'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>6. Analytics</span>
            </button>

            <button
              onClick={() => onSelectPage('pricing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPage === 'pricing'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>7. Plans</span>
            </button>

            <button
              onClick={() => onSelectPage('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPage === 'settings'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>8. Settings</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 tabular-nums">
            <span>Model: Whisper-v3 DeepSync</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-emerald-400 font-medium">99.4% Accuracy</span>
          </div>
        </div>
      </div>
    </>
  );
};
