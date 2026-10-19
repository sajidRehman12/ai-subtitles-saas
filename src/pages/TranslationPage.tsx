import React, { useState } from 'react';
import { SubtitleCue } from '../types';
import { SAMPLE_VIDEOS, SUPPORTED_LANGUAGES } from '../data/mockData';
import { generateSrt, downloadFile, formatPlayerTime } from '../utils/subtitles';
import { 
  Languages, Globe, Sparkles, Download, Check, 
  ArrowRight, Play, Pause, RefreshCw, Layers, CheckCircle2
} from 'lucide-react';

// Built-in translations dictionary for the keynote sample demo
const DEMO_TRANSLATIONS: Record<string, string[]> = {
  'Spanish (ES)': [
    'Bienvenidos todos a la conferencia anual sobre inteligencia de video.',
    'Hoy en día, más del 80 por ciento de los videos se consumen en silencio.',
    'Eso significa que los subtítulos ya no son secundarios: son su gancho principal.',
    'Cuando los subtítulos dinámicos se sincronizan con el ritmo acústico, la retención se dispara.',
    'Diseñamos SubFlow para transcribir voz con marcas de tiempo milimétricas.',
    'Observen cómo las sílabas resaltadas se iluminan justo cuando el orador las articula.',
    'Pueden exportar SRT, VTT o incrustar estilos dinámicos en segundos.',
    'Ya sea publicando en YouTube, LinkedIn o reels cortos virales.',
    'SubFlow convierte el habla cruda en una experiencia de lectura cinematográfica.'
  ],
  'French (FR)': [
    'Bienvenue à tous à la conférence annuelle sur l\'intelligence vidéo.',
    'Aujourd\'hui, plus de 80 % des vidéos en ligne sont visionnées sans le son.',
    'Cela signifie que les sous-titres ne sont plus secondaires : ils constituent votre accroche.',
    'Lorsque les sous-titres dynamiques se synchronisent avec le rythme acoustique, la rétention s\'envole.',
    'Nous avons conçu SubFlow pour transcrire la parole avec des repères temporels millimétrés.',
    'Remarquez comment les syllabes en surbrillance s\'illuminent dès que l\'orateur les prononce.',
    'Vous pouvez exporter des fichiers SRT, VTT ou incruster du style en quelques secondes.',
    'Que ce soit pour YouTube, LinkedIn ou des reels viraux courts.',
    'SubFlow transforme la parole brute en une expérience de lecture immersive et cinématographique.'
  ],
  'German (DE)': [
    'Herzlich willkommen zur jährlichen Keynote über Video-Intelligenz.',
    'Heute werden über 80 Prozent aller Online-Videos stummgeschaltet konsumiert.',
    'Untertitel sind kein Nebengedanke mehr – sie sind Ihr wichtigster Hebel.',
    'Wenn dynamische Wortuntertitel mit dem Sprechrhythmus synchron laufen, steigt die Verweildauer.',
    'Wir haben SubFlow entwickelt, um Sprache mit millimetergenauen Timecodes zu transkribieren.',
    'Achten Sie darauf, wie hervorgehobene Silben exakt beim Sprechen aufleuchten.',
    'Exportieren Sie produktionsreife SRT, VTT oder brennen Sie Stile in Sekunden ein.',
    'Egal ob für YouTube, LinkedIn oder virale Kurzformate.',
    'SubFlow verwandelt gesprochene Sprache in ein cineastisches Leseerlebnis.'
  ],
  'Japanese (JA)': [
    'ビデオインテリジェンスに関する年次基調講演へようこそ。',
    '今日、オンライン動画の80％以上がミュート状態で視聴されています。',
    'つまり字幕はもはや後付けではなく、最も重要なフックなのです。',
    '発話のリズムと同期した動的字幕により、視聴維持率が飛躍的に向上します。',
    'SubFlowはミリ秒単位のタイムコードで音声を精密に書き起こすよう設計されています。',
    '話者が発音した瞬間にハイライトされた音節が光るのをご覧ください。',
    '実用的なSRTやVTTのエクスポート、動的スタイルの焼き込みが数秒で完了します。',
    'YouTubeやLinkedIn、バイラルなショート動画に最適です。',
    'SubFlowは生の音声を没入感あるシネマティックな読書体験へと昇華させます。'
  ]
};

export const TranslationPage: React.FC = () => {
  const [sourceCues, setSourceCues] = useState<SubtitleCue[]>(SAMPLE_VIDEOS[0].initialCues);
  const [targetLanguage, setTargetLanguage] = useState<string>('Spanish (ES)');
  const [translatedTexts, setTranslatedTexts] = useState<string[]>(DEMO_TRANSLATIONS['Spanish (ES)']);
  const [toneMode, setToneMode] = useState<'conversational' | 'formal' | 'dubbing'>('conversational');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeCueIndex, setActiveCueIndex] = useState<number>(0);
  const [bilingualPreview, setBilingualPreview] = useState<boolean>(true);

  const handleTranslateAll = () => {
    setIsTranslating(true);
    setTimeout(() => {
      if (DEMO_TRANSLATIONS[targetLanguage]) {
        setTranslatedTexts(DEMO_TRANSLATIONS[targetLanguage]);
      } else {
        // Fallback realistic translation pattern
        setTranslatedTexts(sourceCues.map((c) => `[${targetLanguage}] ${c.text}`));
      }
      setIsTranslating(false);
    }, 600);
  };

  const handleTargetLanguageChange = (lang: string) => {
    setTargetLanguage(lang);
    if (DEMO_TRANSLATIONS[lang]) {
      setTranslatedTexts(DEMO_TRANSLATIONS[lang]);
    } else {
      setTranslatedTexts(sourceCues.map(c => `[${lang}] ${c.text}`));
    }
  };

  const updateTranslatedText = (index: number, text: string) => {
    setTranslatedTexts(prev => {
      const copy = [...prev];
      copy[index] = text;
      return copy;
    });
  };

  const exportTranslatedSrt = () => {
    const translatedCues: SubtitleCue[] = sourceCues.map((c, i) => ({
      ...c,
      text: translatedTexts[i] || c.text
    }));
    const srt = generateSrt(translatedCues);
    downloadFile(srt, `keynote_${targetLanguage.toLowerCase().replace(/[^a-z0-9]/g, '_')}.srt`);
  };

  const exportBilingualSrt = () => {
    const bilingualCues: SubtitleCue[] = sourceCues.map((c, i) => ({
      ...c,
      text: `${c.text}\n(${translatedTexts[i] || ''})`
    }));
    const srt = generateSrt(bilingualCues);
    downloadFile(srt, `keynote_bilingual_${targetLanguage.toLowerCase().replace(/[^a-z0-9]/g, '_')}.srt`);
  };

  const currentSourceCue = sourceCues[activeCueIndex];
  const currentTranslatedText = translatedTexts[activeCueIndex] || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">AI Multi-Language Translation</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>Preserve millisecond speech timestamps</span>
            <span aria-hidden="true">·</span>
            <span>42+ target languages</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">Dual-track bilingual subtitles</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportTranslatedSrt}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export Translated SRT</span>
          </button>
          <button
            onClick={exportBilingualSrt}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Export Bilingual SRT</span>
          </button>
        </div>
      </div>

      {/* Translation Toolbar: Source & Target Selectors */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Source badge */}
          <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <span className="text-slate-500">Source:</span>
            <span className="font-semibold text-white">English (US)</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />

          {/* Target language */}
          <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Target:</span>
            <select
              value={targetLanguage}
              onChange={(e) => handleTargetLanguageChange(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang} value={lang} className="bg-slate-900 text-white">{lang}</option>
              ))}
            </select>
          </div>

          {/* Tone Selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {[
              { id: 'conversational', label: 'Conversational' },
              { id: 'formal', label: 'Corporate' },
              { id: 'dubbing', label: 'Dubbing Sync' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setToneMode(t.id as any)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  toneMode === t.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleTranslateAll}
          disabled={isTranslating}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600/90 hover:bg-indigo-600 rounded-lg transition-colors whitespace-nowrap"
        >
          {isTranslating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
          <span>{isTranslating ? 'Localizing Transcript...' : 'Translate All Cues'}</span>
        </button>
      </div>

      {/* Interactive Bilingual Live Preview Card */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-xs text-indigo-400 font-semibold tracking-wide uppercase">
            Live Segment #{activeCueIndex + 1} ({currentSourceCue.startTime.toFixed(1)}s - {currentSourceCue.endTime.toFixed(1)}s)
          </div>
          {/* Stacked Bilingual Text Display */}
          <div className="text-base font-semibold text-white">
            {currentSourceCue.text}
          </div>
          <div className="text-sm font-medium text-amber-400">
            {currentTranslatedText}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveCueIndex(prev => Math.max(0, prev - 1))}
            disabled={activeCueIndex === 0}
            className="px-3 py-1.5 text-xs rounded bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700"
          >
            Previous
          </button>
          <span className="text-xs font-mono tabular-nums text-slate-400">
            {activeCueIndex + 1} / {sourceCues.length}
          </span>
          <button
            onClick={() => setActiveCueIndex(prev => Math.min(sourceCues.length - 1, prev + 1))}
            disabled={activeCueIndex === sourceCues.length - 1}
            className="px-3 py-1.5 text-xs rounded bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      </div>

      {/* Side-by-Side Dual Column Editor */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {/* Table Head */}
        <div className="grid grid-cols-12 bg-slate-950 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider py-3 px-4">
          <div className="col-span-2">Timecode</div>
          <div className="col-span-5">Original Speech (English US)</div>
          <div className="col-span-5 flex items-center justify-between">
            <span>Translated Subtitle ({targetLanguage})</span>
            <span className="text-[10px] text-emerald-400 font-mono normal-case">AI Verified</span>
          </div>
        </div>

        {/* Cues List */}
        <div className="divide-y divide-slate-800">
          {sourceCues.map((cue, idx) => {
            const isSelected = activeCueIndex === idx;
            return (
              <div
                key={cue.id}
                onClick={() => setActiveCueIndex(idx)}
                className={`grid grid-cols-12 p-3 text-xs gap-4 transition-colors cursor-pointer ${
                  isSelected ? 'bg-indigo-950/30 ring-1 ring-inset ring-indigo-500/50' : 'hover:bg-slate-800/30'
                }`}
              >
                {/* Timecode */}
                <div className="col-span-2 font-mono tabular-nums text-slate-400 flex flex-col justify-center">
                  <span className="text-white font-medium">{cue.startTime.toFixed(2)}s</span>
                  <span className="text-[11px] text-slate-500">to {cue.endTime.toFixed(2)}s</span>
                </div>

                {/* Original Source */}
                <div className="col-span-5 text-slate-300 flex items-center pr-2 leading-relaxed">
                  {cue.text}
                </div>

                {/* Translated Output (Editable) */}
                <div className="col-span-5">
                  <textarea
                    rows={2}
                    value={translatedTexts[idx] || ''}
                    onChange={(e) => updateTranslatedText(idx, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-200 focus:outline-none focus:border-indigo-500 resize-none font-sans"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
