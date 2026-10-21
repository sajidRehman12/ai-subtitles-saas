import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentPath = '/' }) => {
  // When on home page, do not show navigation options to other pages
  if (currentPath === '/') {
    return (
      <footer className="border-t border-neutral-900 bg-black py-8 px-6 text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-neutral-900 border border-neutral-750 flex items-center justify-center text-[10px] font-bold text-white">
              S
            </span>
            <span className="font-bold text-white tracking-tight text-xs">SubFlow AI</span>
            <span className="text-neutral-700">·</span>
            <span className="text-[11px] text-neutral-500">Acoustic Speech Intelligence Studio</span>
          </div>
          <div className="text-[11px] text-neutral-600 font-mono">
            &copy; {new Date().getFullYear()} SubFlow Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="border-t border-neutral-900 bg-black py-12 px-6 text-xs text-neutral-500">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-900 border border-neutral-750 flex items-center justify-center text-[10px] font-bold text-white">
                S
              </span>
              <span className="font-bold text-white tracking-tight text-sm">SubFlow</span>
            </div>
            <p className="mt-1 text-xs text-neutral-400 max-w-sm leading-relaxed">
              Automatic video speech-to-text, kinetic subtitle typography, and multi-language timecode synchronization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/studio')}
              className="px-4 py-2 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-md transition-colors uppercase tracking-wider"
            >
              Launch Studio
            </button>
            <button
              onClick={() => onNavigate('/pricing')}
              className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-md transition-colors uppercase tracking-wider"
            >
              View Plans
            </button>
          </div>
        </div>

        {/* 4-Column Clean Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="font-semibold text-neutral-300 uppercase tracking-widest text-[10px]">Studio & Tools</div>
            <ul className="space-y-1.5 text-neutral-500">
              <li><button onClick={() => onNavigate('/studio')} className="hover:text-white transition-colors">Generator Studio</button></li>
              <li><button onClick={() => onNavigate('/dashboard')} className="hover:text-white transition-colors">Video Projects</button></li>
              <li><button onClick={() => onNavigate('/batch')} className="hover:text-white transition-colors">Batch Queue</button></li>
              <li><button onClick={() => onNavigate('/styles')} className="hover:text-white transition-colors">Style Presets</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-neutral-300 uppercase tracking-widest text-[10px]">Intelligence</div>
            <ul className="space-y-1.5 text-neutral-500">
              <li><button onClick={() => onNavigate('/translate')} className="hover:text-white transition-colors">AI Translation</button></li>
              <li><button onClick={() => onNavigate('/analytics')} className="hover:text-white transition-colors">Retention Analytics</button></li>
              <li><button onClick={() => onNavigate('/settings')} className="hover:text-white transition-colors">Custom Vocabulary</button></li>
              <li><button onClick={() => onNavigate('/settings')} className="hover:text-white transition-colors">Developer API</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-neutral-300 uppercase tracking-widest text-[10px]">Overview & Legal</div>
            <ul className="space-y-1.5 text-neutral-500">
              <li><button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">Platform Overview</button></li>
              <li><button onClick={() => onNavigate('/pricing')} className="hover:text-white transition-colors">Plans & Pricing</button></li>
              <li><button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-neutral-300 uppercase tracking-widest text-[10px]">Standards</div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              SubRip (.SRT) and WebVTT compliant timecode alignment with 99.4% speech recognition accuracy.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-600">
          <div>
            &copy; {new Date().getFullYear()} SubFlow Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-neutral-400">Privacy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-neutral-400">Terms</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
