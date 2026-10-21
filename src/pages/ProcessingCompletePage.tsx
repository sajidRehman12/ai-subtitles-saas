import React, { useRef, useState } from 'react';
import { ActiveVideoData } from '../types';
import { STYLE_PRESETS } from '../data/mockData';
import { formatPlayerTime } from '../utils/subtitles';
import { 
  CheckCircle2, ArrowRight, Play, Pause, RotateCcw, 
  FileText, Sliders, Sparkles, Volume2, VolumeX, ShieldCheck, Video 
} from 'lucide-react';

interface ProcessingCompletePageProps {
  videoData: ActiveVideoData;
  onNavigate: (path: string) => void;
}

export const ProcessingCompletePage: React.FC<ProcessingCompletePageProps> = ({ videoData, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeStyle = STYLE_PRESETS[videoData.stylePreset] || STYLE_PRESETS.hormozi;

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Find active cue
  const currentActiveCue = videoData.cues.find(c => currentTime >= c.startTime && currentTime <= c.endTime);

  const totalWords = videoData.cues.reduce((acc, c) => acc + c.text.split(/\s+/).filter(Boolean).length, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-white font-bold">Step 1: Upload Complete</span>
          <span className="text-neutral-600">→</span>
          <span className="text-white font-semibold underline underline-offset-4">Step 2: Subtitles Ready</span>
          <span className="text-neutral-600">→</span>
          <span className="text-neutral-500">Step 3: Download Video</span>
        </div>
        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Whisper-v3 Aligned</span>
        </span>
      </div>

      {/* Main Announcement Card */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
          <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
          <span>Upload & Acoustic Transcription Finished</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Subtitles Are Ready
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          SubFlow has processed <span className="text-white font-medium">"{videoData.title}"</span>. 
          All spoken words have been timestamped with millisecond phoneme synchronization. Review the preview below and continue to the download screen.
        </p>
      </div>

      {/* Video Preview Player with Subtitle Overlay */}
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-neutral-800 shadow-2xl flex items-center justify-center group">
        <video
          ref={videoRef}
          src={videoData.videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          className="w-full h-full object-contain cursor-pointer"
          playsInline
        />

        {/* Live Subtitle Overlay */}
        {currentActiveCue && (
          <div className="absolute left-0 right-0 bottom-10 px-6 pointer-events-none flex justify-center">
            <div 
              className="max-w-xl text-center px-4 py-2 rounded-lg transition-all"
              style={{
                backgroundColor: `rgba(10, 10, 10, ${activeStyle.backgroundOpacity})`,
                borderWidth: `${activeStyle.borderWidth}px`,
                borderColor: activeStyle.borderColor,
                textTransform: activeStyle.textTransform,
                fontFamily: activeStyle.fontFamily,
                fontSize: `${activeStyle.fontSize}px`,
                fontWeight: activeStyle.fontWeight,
                color: activeStyle.color,
                lineHeight: 1.3
              }}
            >
              {currentActiveCue.speaker && (
                <div className="text-[10px] font-semibold text-neutral-400 mb-0.5 tracking-wider uppercase">
                  {currentActiveCue.speaker}
                </div>
              )}
              <span>{currentActiveCue.text}</span>
            </div>
          </div>
        )}

        {/* Center play icon overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            aria-label="Play video preview"
            className="absolute w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-all"
          >
            <Play className="w-6 h-6 fill-current ml-1 text-black" />
          </button>
        )}

        {/* Duration counter pill */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/80 border border-neutral-800 text-[11px] font-mono text-neutral-300 pointer-events-none tabular-nums">
          {formatPlayerTime(currentTime)} / {formatPlayerTime(videoData.duration)}
        </div>
      </div>

      {/* Transcription Audit Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-neutral-950 border border-neutral-850 rounded-xl">
        <div className="space-y-1">
          <div className="text-[11px] text-neutral-500 font-mono uppercase">Language Detected</div>
          <div className="text-sm font-bold text-white">{videoData.language}</div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] text-neutral-500 font-mono uppercase">Synchronized Cues</div>
          <div className="text-sm font-bold text-white tabular-nums">{videoData.cues.length} segments</div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] text-neutral-500 font-mono uppercase">Spoken Words</div>
          <div className="text-sm font-bold text-white tabular-nums">{totalWords} words</div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] text-neutral-500 font-mono uppercase">Acoustic Accuracy</div>
          <div className="text-sm font-bold text-emerald-400 tabular-nums font-mono">{videoData.accuracy}%</div>
        </div>
      </div>

      {/* Primary Action Button to Move to Next Screen */}
      <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Ready to download your video?</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Proceed to the download screen to select your video resolution and download files.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('/studio')}
            className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-850 hover:bg-neutral-800 border border-neutral-750 rounded-lg transition-colors whitespace-nowrap"
          >
            Edit in Studio
          </button>
          
          <button
            onClick={() => onNavigate('/download')}
            className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 active:scale-[0.98] rounded-lg transition-all shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Move to Next Screen: Download</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
