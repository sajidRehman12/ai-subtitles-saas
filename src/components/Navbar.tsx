import React from 'react';
import { 
  Sparkles, Layers, Wand2, Languages, BarChart3, 
  CreditCard, Settings, Video, Home 
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  return (
    <>
      {/* Top Navigation Bar: Pure Black Elegance */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-neutral-900 bg-black/95 backdrop-blur sticky top-0 z-50">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('/')}
          className="text-base font-bold tracking-tight text-white hover:text-neutral-300 transition-colors whitespace-nowrap shrink-0 text-left flex items-center gap-2.5"
        >
          <span className="w-6 h-6 rounded bg-neutral-900 border border-neutral-750 flex items-center justify-center text-xs font-bold text-white">
            S
          </span>
          <span className="tracking-tight">SubFlow</span>
        </button>

        {/* Zone 2: Navigation links - hidden on home page per user instruction */}
        {currentPath !== '/' && (
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-400 uppercase tracking-wider">
            <button
              onClick={() => onNavigate('/')}
              className="text-neutral-400 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('/studio')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/studio'
                  ? 'text-white font-semibold underline underline-offset-8 decoration-white decoration-1'
                  : 'hover:text-white'
              }`}
            >
              Studio
            </button>
            <button
              onClick={() => onNavigate('/dashboard')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/dashboard'
                  ? 'text-white font-semibold underline underline-offset-8 decoration-white decoration-1'
                  : 'hover:text-white'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('/batch')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/batch'
                  ? 'text-white font-semibold underline underline-offset-8 decoration-white decoration-1'
                  : 'hover:text-white'
              }`}
            >
              Batch
            </button>
            <button
              onClick={() => onNavigate('/styles')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/styles'
                  ? 'text-white font-semibold underline underline-offset-8 decoration-white decoration-1'
                  : 'hover:text-white'
              }`}
            >
              Styles
            </button>
            <button
              onClick={() => onNavigate('/translate')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/translate'
                  ? 'text-white font-semibold underline underline-offset-8 decoration-white decoration-1'
                  : 'hover:text-white'
              }`}
            >
              Translate
            </button>
            <button
              onClick={() => onNavigate('/pricing')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/pricing'
                  ? 'text-white font-semibold underline underline-offset-8 decoration-white decoration-1'
                  : 'hover:text-white'
              }`}
            >
              Pricing
            </button>
          </nav>
        )}

        {/* Zone 3: Only one option to enter the studio */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/studio')}
            className="px-4 py-2 text-xs font-semibold text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 rounded-md uppercase tracking-wider shadow-lg"
          >
            Enter Studio
          </button>
        </div>
      </header>

      {/* Secondary Navigation Strip: Only rendered on interior pages, hidden on home page */}
      {currentPath !== '/' && (
        <div className="border-b border-neutral-900 bg-neutral-950/80 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => onNavigate('/')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPath === '/'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-neutral-400" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => onNavigate('/studio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPath === '/studio'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-neutral-400" />
              <span>1. Studio</span>
            </button>

            <button
              onClick={() => onNavigate('/dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPath === '/dashboard'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-neutral-400" />
              <span>2. Projects</span>
            </button>

            <button
              onClick={() => onNavigate('/batch')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPath === '/batch'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
              <span>3. Batch</span>
            </button>

            <button
              onClick={() => onNavigate('/styles')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPath === '/styles'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>4. Styles</span>
            </button>

            <button
              onClick={() => onNavigate('/translate')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPath === '/translate'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-neutral-400" />
              <span>5. Translate</span>
            </button>

            <button
              onClick={() => onNavigate('/analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPath === '/analytics'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-neutral-400" />
              <span>6. Analytics</span>
            </button>

            <button
              onClick={() => onNavigate('/pricing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPath === '/pricing'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
              <span>7. Plans</span>
            </button>

            <button
              onClick={() => onNavigate('/settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                currentPath === '/settings'
                  ? 'bg-neutral-900 text-white border border-neutral-800'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-neutral-400" />
              <span>8. Settings</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 shrink-0 tabular-nums font-mono">
            <span>Whisper-v3 Sync</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="text-neutral-300">99.4% Accuracy</span>
          </div>
        </div>
      </div>
      )}
    </>
  );
};
