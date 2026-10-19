import React, { useState, useEffect } from 'react';
import { BatchItem, CaptionPresetId } from '../types';
import { INITIAL_BATCH_ITEMS, SUPPORTED_LANGUAGES } from '../data/mockData';
import { downloadFile } from '../utils/subtitles';
import { 
  UploadCloud, Play, Pause, CheckCircle2, Clock, 
  Trash2, Download, Sliders, FileVideo, Shield, Users, RefreshCw
} from 'lucide-react';

export const BatchPage: React.FC = () => {
  const [queue, setQueue] = useState<BatchItem[]>(INITIAL_BATCH_ITEMS);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [globalPreset, setGlobalPreset] = useState<CaptionPresetId>('hormozi');
  const [globalLanguage, setGlobalLanguage] = useState<string>('English (US)');
  const [profanityFilter, setProfanityFilter] = useState<boolean>(true);
  const [speakerDetection, setSpeakerDetection] = useState<boolean>(true);

  // Active batch queue timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isProcessing) {
      timer = setInterval(() => {
        setQueue(prevQueue => {
          let hasActive = false;
          const next = prevQueue.map(item => {
            if (item.status === 'completed') return item;
            if (item.status === 'queued') {
              hasActive = true;
              return { ...item, status: 'transcribing' as const, progress: 15, etaSeconds: 25 };
            }
            if (item.status === 'transcribing') {
              hasActive = true;
              if (item.progress >= 85) {
                return { ...item, status: 'styling' as const, progress: 90, etaSeconds: 5 };
              }
              return { ...item, progress: item.progress + 12, etaSeconds: Math.max(1, item.etaSeconds - 3) };
            }
            if (item.status === 'styling') {
              hasActive = true;
              if (item.progress >= 98) {
                return { ...item, status: 'completed' as const, progress: 100, etaSeconds: 0 };
              }
              return { ...item, progress: 100, status: 'completed' as const, etaSeconds: 0 };
            }
            return item;
          });

          if (!hasActive) {
            setIsProcessing(false);
          }
          return next;
        });
      }, 800);
    }
    return () => clearInterval(timer);
  }, [isProcessing]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newItems: BatchItem[] = Array.from(files).map((file, i) => ({
        id: 'batch-' + Date.now() + '-' + i,
        filename: file.name,
        sizeMb: parseFloat((file.size / (1024 * 1024)).toFixed(1)),
        durationSeconds: Math.floor(Math.random() * 120) + 30,
        targetLanguage: globalLanguage,
        stylePreset: globalPreset,
        status: 'queued',
        progress: 0,
        etaSeconds: 30
      }));
      setQueue(prev => [...newItems, ...prev]);
    }
  };

  const removeQueueItem = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
  };

  const exportAllZip = () => {
    const summary = queue.map((item, idx) => `File ${idx + 1}: ${item.filename} - Status: ${item.status}`).join('\n');
    downloadFile(summary, 'subflow_batch_subtitles_archive.txt');
  };

  const completedCount = queue.filter(q => q.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Batch Video Processor</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>High-throughput asynchronous subtitle pipeline</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300 tabular-nums">{completedCount} of {queue.length} completed</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsProcessing(!isProcessing)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              isProcessing
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30'
            }`}
          >
            {isProcessing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isProcessing ? 'Pause Processing' : 'Start Batch Queue'}</span>
          </button>

          <button
            onClick={exportAllZip}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export All SRTs</span>
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/60 bg-slate-900/60 rounded-xl p-8 text-center transition-all">
        <UploadCloud className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-white">Drag & drop multiple videos into batch queue</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Supports MP4, WebM, MOV, and MKV files. Batch process podcasts, course modules, or social clips in parallel.
        </p>
        <div className="mt-4">
          <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors">
            <span>Select Multiple Files</span>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Global Batch Controls */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-300 block mb-1">Batch Caption Style</label>
          <select
            value={globalPreset}
            onChange={(e) => setGlobalPreset(e.target.value as CaptionPresetId)}
            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="hormozi">Hormozi Kinetic Punch</option>
            <option value="netflix">Netflix Cinema Standard</option>
            <option value="karaoke">Karaoke Emerald Wave</option>
            <option value="cyber">Cyberpunk Monospace</option>
            <option value="minimal">Minimal Understated</option>
            <option value="bilingual">Bilingual Dual-Track</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-300 block mb-1">Target Language</label>
          <select
            value={globalLanguage}
            onChange={(e) => setGlobalLanguage(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 pt-5">
          <input
            type="checkbox"
            id="profanity"
            checked={profanityFilter}
            onChange={(e) => setProfanityFilter(e.target.checked)}
            className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
          />
          <label htmlFor="profanity" className="text-xs text-slate-300 cursor-pointer">
            Auto-Censor Profanity
          </label>
        </div>

        <div className="flex items-center gap-2 pt-5">
          <input
            type="checkbox"
            id="speakers"
            checked={speakerDetection}
            onChange={(e) => setSpeakerDetection(e.target.checked)}
            className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
          />
          <label htmlFor="speakers" className="text-xs text-slate-300 cursor-pointer">
            Detect Multi-Speakers
          </label>
        </div>
      </div>

      {/* Batch Queue Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Processing Queue</span>
            <span className="text-xs font-normal text-slate-400">({queue.length} files)</span>
          </h2>
          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-indigo-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Active queue runner processing...</span>
            </div>
          )}
        </div>

        <div className="divide-y divide-slate-800">
          {queue.map(item => (
            <div key={item.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <FileVideo className="w-8 h-8 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white line-clamp-1">{item.filename}</div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 tabular-nums">
                    <span>{item.sizeMb} MB</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.durationSeconds}s duration</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{item.targetLanguage}</span>
                  </div>
                </div>
              </div>

              {/* Progress & ETA */}
              <div className="w-full md:w-64 space-y-1.5">
                <div className="flex items-center justify-between text-xs tabular-nums">
                  <span className="capitalize font-medium text-slate-300">
                    {item.status === 'completed' && <span className="text-emerald-400 font-semibold">Ready</span>}
                    {item.status === 'transcribing' && <span className="text-indigo-400">Transcribing Speech...</span>}
                    {item.status === 'styling' && <span className="text-amber-400">Applying Animation...</span>}
                    {item.status === 'queued' && <span className="text-slate-400">Waiting in queue</span>}
                  </span>
                  <span className="text-slate-400">
                    {item.status === 'completed' ? '100%' : `${item.progress}%`}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      item.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                {item.etaSeconds > 0 && (
                  <div className="text-[10px] text-slate-500 text-right tabular-nums">
                    ETA: ~{item.etaSeconds}s remaining
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {item.status === 'completed' && (
                  <button
                    onClick={() => downloadFile(`1\n00:00:00,000 --> 00:00:03,000\n[Batch Subtitle Track for ${item.filename}]`, `${item.filename.replace(/\.[^/.]+$/, '')}.srt`)}
                    className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded transition-colors"
                    title="Download SRT"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => removeQueueItem(item.id)}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded transition-colors"
                  title="Remove from queue"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
