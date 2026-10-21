import React, { useState, useEffect } from 'react';
import { CaptionPresetId, CaptionStyle, PageId } from '../types';
import { STYLE_PRESETS, HERO_STUDIO_IMG } from '../data/mockData';
import { 
  Play, Pause, Sliders, Sparkles, Copy, Check, 
  RotateCcw, Download, ArrowRight, Wand2, Type, Palette
} from 'lucide-react';

interface TemplatesPageProps {
  onNavigate: (path: string) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onNavigate }) => {
  const [activePreset, setActivePreset] = useState<CaptionPresetId>('hormozi');
  const [style, setStyle] = useState<CaptionStyle>(STYLE_PRESETS.hormozi);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState<boolean>(true);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const previewWords = ['THIS', 'IS', 'HOW', 'VIRAL', 'CAPTIONS', 'DRIVE', 'RETENTION'];

  // Word-by-word animation ticker simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAnimation) {
      interval = setInterval(() => {
        setActiveWordIndex(prev => (prev + 1) % previewWords.length);
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlayingAnimation]);

  const selectPreset = (presetId: CaptionPresetId) => {
    setActivePreset(presetId);
    setStyle(STYLE_PRESETS[presetId]);
  };

  const handleCopyCss = () => {
    const cssString = `/* SubFlow Caption Preset: ${activePreset} */
.caption-overlay {
  font-family: ${style.fontFamily};
  font-size: ${style.fontSize}px;
  font-weight: ${style.fontWeight};
  color: ${style.color};
  background-color: ${style.backgroundColor};
  opacity: ${style.backgroundOpacity};
  text-transform: ${style.textTransform};
}
.caption-active-word {
  color: ${style.highlightColor};
  animation: ${style.animation};
}`;
    navigator.clipboard.writeText(cssString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSavePreset = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Caption Style Presets</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>Dynamic kinetic typography & animations</span>
            <span aria-hidden="true">·</span>
            <span>Export to Premiere, DaVinci or hardcode overlay</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCss}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'CSS Copied!' : 'Copy Preset CSS'}</span>
          </button>
          <button
            onClick={() => onNavigate('/studio')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30"
          >
            <span>Apply to Video Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Split: Live Interactive Canvas (7 cols) + Fine-Tuning Controls (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Visual Sandbox */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Visual Video Frame */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl flex items-center justify-center">
            <img
              src={HERO_STUDIO_IMG}
              alt="Video Studio Backdrop"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* Live Rendered Animated Subtitle */}
            <div 
              className={`absolute left-0 right-0 px-6 transition-all flex justify-center ${
                style.position === 'top' ? 'top-10' : style.position === 'center' ? 'top-1/2 -translate-y-1/2' : 'bottom-12'
              }`}
            >
              <div
                className="max-w-xl text-center px-5 py-3 rounded-xl transition-all"
                style={{
                  backgroundColor: `rgba(15, 23, 42, ${style.backgroundOpacity})`,
                  borderWidth: `${style.borderWidth}px`,
                  borderColor: style.borderColor,
                  fontFamily: style.fontFamily,
                  fontSize: `${style.fontSize}px`,
                  fontWeight: style.fontWeight,
                  textTransform: style.textTransform,
                  lineHeight: 1.3
                }}
              >
                {previewWords.map((word, idx) => {
                  const isActive = idx === activeWordIndex;
                  return (
                    <span
                      key={idx}
                      className={`inline-block mr-2 transition-transform duration-100 ${
                        isActive && style.animation === 'bounce' ? 'scale-115 -translate-y-1 font-black' : ''
                      }`}
                      style={{
                        color: isActive ? style.highlightColor : style.color,
                        textShadow: isActive ? `0 0 18px ${style.highlightColor}` : style.textShadow
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Animation Toggle Bar Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 px-3 py-2 bg-black/60 backdrop-blur rounded-lg border border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
                  className="p-1 rounded hover:bg-white/10 text-white"
                >
                  {isPlayingAnimation ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <span className="text-[11px] font-mono text-slate-400">
                  {isPlayingAnimation ? 'Live kinetic preview running' : 'Preview paused'}
                </span>
              </div>
              <div className="text-[11px] font-mono text-indigo-400">
                Word {activeWordIndex + 1}/{previewWords.length}
              </div>
            </div>
          </div>

          {/* Preset Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'hormozi', name: 'Hormozi Kinetic', desc: 'Vibrant yellow pop on bounce, maximum social engagement' },
              { id: 'netflix', name: 'Netflix Cinema', desc: 'Minimalist clean white with dark translucent box' },
              { id: 'karaoke', name: 'Karaoke Wave', desc: 'Emerald progressive karaoke fill for speeches' },
              { id: 'cyber', name: 'Cyberpunk Neon', desc: 'Electric blue stroke monospace terminal look' },
              { id: 'minimal', name: 'Modern Sans', desc: 'Ultra-clean unboxed subtitle with soft drop shadow' },
              { id: 'bilingual', name: 'Bilingual Stack', desc: 'Two-tone contrast for international audience' }
            ].map((p) => {
              const isSelected = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => selectPreset(p.id as CaptionPresetId)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 text-white ring-1 ring-indigo-500/50'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{p.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{p.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Style Fine-Tuning Controls */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Customize Typography & Effects</span>
            </h2>
            <button
              onClick={() => setStyle(STYLE_PRESETS[activePreset])}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Font Family */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-indigo-400" />
              <span>Font Family</span>
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { name: 'Plus Jakarta Sans', val: "'Plus Jakarta Sans', sans-serif" },
                { name: 'JetBrains Mono', val: "'JetBrains Mono', monospace" },
                { name: 'System Sans', val: "system-ui, sans-serif" },
                { name: 'Serif Classic', val: "Georgia, serif" }
              ].map(f => (
                <button
                  key={f.name}
                  onClick={() => setStyle(prev => ({ ...prev, fontFamily: f.val }))}
                  className={`p-2 rounded-lg border text-left font-medium transition-colors ${
                    style.fontFamily === f.val
                      ? 'border-indigo-500 bg-indigo-950/40 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Font Size</span>
                <span className="font-mono text-slate-400 tabular-nums">{style.fontSize}px</span>
              </div>
              <input
                type="range"
                min={16}
                max={42}
                value={style.fontSize}
                onChange={(e) => setStyle(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Font Weight</span>
                <span className="font-mono text-slate-400 tabular-nums">{style.fontWeight}</span>
              </div>
              <select
                value={style.fontWeight}
                onChange={(e) => setStyle(prev => ({ ...prev, fontWeight: e.target.value }))}
                className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              >
                <option value="500">Medium (500)</option>
                <option value="600">SemiBold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">ExtraBold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-indigo-400" />
              <span>Palette & Active Word Highlight</span>
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                <span className="text-slate-400">Text Base</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style.color}
                    onChange={(e) => setStyle(prev => ({ ...prev, color: e.target.value }))}
                    className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-[11px] text-slate-300">{style.color}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                <span className="text-slate-400">Active Pop</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style.highlightColor}
                    onChange={(e) => setStyle(prev => ({ ...prev, highlightColor: e.target.value }))}
                    className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-[11px] text-slate-300">{style.highlightColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Background Opacity & Position */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Box Opacity</span>
                <span className="font-mono text-slate-400 tabular-nums">{(style.backgroundOpacity * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={style.backgroundOpacity}
                onChange={(e) => setStyle(prev => ({ ...prev, backgroundOpacity: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Screen Position</label>
              <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
                {(['bottom', 'center', 'top'] as const).map(pos => (
                  <button
                    key={pos}
                    onClick={() => setStyle(prev => ({ ...prev, position: pos }))}
                    className={`flex-1 py-1 rounded capitalize font-medium transition-colors ${
                      style.position === pos ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Animation & Letter Case */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Animation Effect</label>
              <select
                value={style.animation}
                onChange={(e) => setStyle(prev => ({ ...prev, animation: e.target.value as any }))}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              >
                <option value="bounce">Word Bounce Pop</option>
                <option value="karaoke">Smooth Karaoke Wave</option>
                <option value="fade">Subtle Fade In</option>
                <option value="none">Static (No Animation)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Text Casing</label>
              <select
                value={style.textTransform}
                onChange={(e) => setStyle(prev => ({ ...prev, textTransform: e.target.value as any }))}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              >
                <option value="uppercase">UPPERCASE (Punchy)</option>
                <option value="none">Normal Case (Original)</option>
                <option value="capitalize">Capitalize Words</option>
              </select>
            </div>
          </div>

          {/* Save Action */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {saveToast && <span className="text-emerald-400">Preset saved to your library!</span>}
            </span>
            <button
              onClick={handleSavePreset}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30"
            >
              Save as Custom Preset
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
