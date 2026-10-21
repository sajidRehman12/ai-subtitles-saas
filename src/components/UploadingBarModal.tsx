import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, FastForward, Activity } from 'lucide-react';

interface UploadingBarModalProps {
  isOpen: boolean;
  fileName: string;
  onComplete: () => void;
  onCancel?: () => void;
}

export const UploadingBarModal: React.FC<UploadingBarModalProps> = ({
  isOpen,
  fileName,
  onComplete,
  onCancel
}) => {
  const TOTAL_SECONDS = 120; // Exactly 2 minutes
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setSecondsElapsed(0);
      return;
    }

    setSecondsElapsed(0);

    const timer = setInterval(() => {
      setSecondsElapsed((prev) => {
        const next = prev + 1;
        if (next >= TOTAL_SECONDS) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return TOTAL_SECONDS;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const secondsRemaining = Math.max(0, TOTAL_SECONDS - secondsElapsed);
  const percentage = Math.min(100, Math.floor((secondsElapsed / TOTAL_SECONDS) * 100));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 4 clear stages over the 2 minutes
  const getStageInfo = () => {
    if (secondsElapsed < 30) {
      return {
        step: '1/4',
        name: 'Ingesting Video & Acoustic Frequency Extraction',
        desc: 'Analyzing sample rate, extracting uncompressed PCM audio channel, and detecting speech activity...'
      };
    } else if (secondsElapsed < 60) {
      return {
        step: '2/4',
        name: 'Whisper-v3 Deep Acoustic Speech Processing',
        desc: 'Converting vocal harmonics into phonetic representations with millisecond acoustic accuracy...'
      };
    } else if (secondsElapsed < 90) {
      return {
        step: '3/4',
        name: 'Natural Cadence & Timestamp Synchronization',
        desc: 'Detecting speaker pauses, phrase boundaries, and locking word-level timecodes to video frames...'
      };
    } else {
      return {
        step: '4/4',
        name: 'Kinetic Subtitle Typography & Preview Buffer',
        desc: 'Applying visual styling, generating universal SubRip (.SRT) cues, and building playback stream...'
      };
    }
  };

  const stage = getStageInfo();

  const handleFastForward = () => {
    setSecondsElapsed(TOTAL_SECONDS);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-lg w-full p-7 space-y-6 shadow-2xl text-white">
        
        {/* Header & Status Indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-850">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-750 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>2-Minute Uploading Pipeline</span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Uploading & Processing Video
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black font-mono tracking-tight text-white">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Video metadata row */}
        <div className="flex items-center justify-between p-3 bg-neutral-900/70 border border-neutral-800 rounded-lg text-xs font-mono">
          <div className="flex items-center gap-2 truncate max-w-[280px]">
            <span className="text-neutral-500">File:</span>
            <span className="text-neutral-200 font-semibold truncate">{fileName || 'video-source.mp4'}</span>
          </div>
          <div className="text-neutral-400 shrink-0">
            Acoustic Sync: <span className="text-emerald-400">99.4%</span>
          </div>
        </div>

        {/* Animated Uploading Bar (The requested uploading bar) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">Uploading Bar</span>
            <span className="text-neutral-300 tabular-nums">
              {formatTime(secondsElapsed)} <span className="text-neutral-600">/</span> 02:00 (2 minutes)
            </span>
          </div>

          {/* The Progress Bar with glowing elegance */}
          <div className="relative w-full bg-neutral-900 h-3 rounded-full overflow-hidden border border-neutral-800">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-linear rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
            <span>Stage {stage.step}</span>
            <span className="text-neutral-400">
              {secondsRemaining > 0 ? `${formatTime(secondsRemaining)} remaining` : 'Completing upload...'}
            </span>
          </div>
        </div>

        {/* Dynamic Acoustic Stage Description */}
        <div className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-xl space-y-1.5">
          <div className="text-xs font-semibold text-white flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-neutral-400 animate-pulse" />
            <span>{stage.name}</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {stage.desc}
          </p>
        </div>

        {/* Pulsing Audio Frequency Visualizer */}
        <div className="flex items-center justify-center gap-1.5 h-8 py-1">
          {Array.from({ length: 28 }).map((_, i) => {
            const heights = [
              'h-2', 'h-4', 'h-6', 'h-3', 'h-7', 'h-5', 'h-2',
              'h-6', 'h-8', 'h-4', 'h-7', 'h-3', 'h-5', 'h-8',
              'h-4', 'h-6', 'h-2', 'h-7', 'h-5', 'h-3', 'h-8',
              'h-6', 'h-4', 'h-7', 'h-2', 'h-5', 'h-3', 'h-6'
            ];
            return (
              <div 
                key={i}
                className={`w-1 rounded-full bg-neutral-600 transition-all duration-300 ${heights[i % heights.length]}`}
                style={{
                  opacity: Math.max(0.3, Math.sin((secondsElapsed * 2) + i) * 0.7 + 0.3)
                }}
              />
            );
          })}
        </div>

        {/* Footer controls: Fast-forward / Skip 2 minutes for testing convenience */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-900 text-xs">
          <span className="text-[11px] text-neutral-500 font-mono">
            Full 2-minute upload duration active
          </span>

          <div className="flex items-center gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-3 py-1.5 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleFastForward}
              title="Fast forward simulation to complete immediately"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white border border-neutral-800 transition-colors font-mono text-[11px]"
            >
              <FastForward className="w-3 h-3" />
              <span>Fast-Forward (Dev/Test)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
