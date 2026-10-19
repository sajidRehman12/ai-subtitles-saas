import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onSelectPage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-6 text-sm text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-xs font-black text-white">
              SF
            </span>
            <span className="font-semibold text-white tracking-tight">SubFlow AI</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            Automatic speech transcription, word-level synchronized subtitle generation, and multilingual localization for video teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <button onClick={() => onSelectPage('studio')} className="hover:text-white transition-colors">
            Subtitle Generator
          </button>
          <button onClick={() => onSelectPage('dashboard')} className="hover:text-white transition-colors">
            Project Dashboard
          </button>
          <button onClick={() => onSelectPage('batch')} className="hover:text-white transition-colors">
            Batch Processor
          </button>
          <button onClick={() => onSelectPage('templates')} className="hover:text-white transition-colors">
            Style Library
          </button>
          <button onClick={() => onSelectPage('translation')} className="hover:text-white transition-colors">
            AI Translation
          </button>
          <button onClick={() => onSelectPage('analytics')} className="hover:text-white transition-colors">
            Retention Analytics
          </button>
          <button onClick={() => onSelectPage('pricing')} className="hover:text-white transition-colors">
            Plans & Pricing
          </button>
          <button onClick={() => onSelectPage('settings')} className="hover:text-white transition-colors">
            Brand Kit & API
          </button>
        </div>

        <div className="text-xs text-slate-500 tabular-nums">
          <span>&copy; {new Date().getFullYear()} SubFlow Technologies Inc.</span>
        </div>
      </div>
    </footer>
  );
};
