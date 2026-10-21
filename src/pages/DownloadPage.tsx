import React, { useState } from 'react';
import { ActiveVideoData } from '../types';
import { downloadFile, generateSrt, generateVtt, generateTxt } from '../utils/subtitles';
import { 
  Download, Film, CheckCircle2, ArrowRight, ShieldCheck, 
  Sparkles, Layers, Sliders, AlertCircle, ArrowLeft, Video
} from 'lucide-react';

interface DownloadPageProps {
  videoData: ActiveVideoData;
  onNavigate: (path: string) => void;
  onInitiateDownload: () => void;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({ 
  videoData, 
  onNavigate, 
  onInitiateDownload 
}) => {
  const [resolution, setResolution] = useState<'1080p' | '4k'>('1080p');
  const [downloadFormat, setDownloadFormat] = useState<'mp4' | 'srt' | 'vtt' | 'txt'>('mp4');
  const [frameRate, setFrameRate] = useState<'60fps' | '30fps'>('60fps');
  const [isRendering, setIsRendering] = useState<boolean>(false);

  const handleDownloadClick = () => {
    setIsRendering(true);

    // If downloading SRT, VTT, or TXT directly, deliver the text file blob
    if (downloadFormat === 'srt') {
      const srt = generateSrt(videoData.cues);
      downloadFile(srt, `${videoData.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.srt`);
    } else if (downloadFormat === 'vtt') {
      const vtt = generateVtt(videoData.cues);
      downloadFile(vtt, `${videoData.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.vtt`);
    } else if (downloadFormat === 'txt') {
      const txt = generateTxt(videoData.cues);
      downloadFile(txt, `${videoData.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`);
    }

    // Set shared state in session for Pricing page prompt
    sessionStorage.setItem('pending_video_download', JSON.stringify({
      title: videoData.title,
      resolution,
      format: downloadFormat.toUpperCase(),
      date: new Date().toISOString()
    }));

    onInitiateDownload();

    // After brief render preparation, immediately navigate user to pricing page to select plan
    setTimeout(() => {
      setIsRendering(false);
      onNavigate('/pricing?reason=download_plan');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <button 
            onClick={() => onNavigate('/ready')}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Review</span>
          </button>
          <span className="text-neutral-600">·</span>
          <span className="text-white font-semibold underline underline-offset-4">Step 3: Download Video</span>
          <span className="text-neutral-600">→</span>
          <span className="text-neutral-500">Step 4: Subscription Plan</span>
        </div>
        <span className="text-xs font-mono text-neutral-400">Master Render Ready</span>
      </div>

      {/* Page Title & Context */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Download Subtitled Video
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Configure your video export parameters below. You can download the burned-in subtitled video or export standalone subtitle tracks.
        </p>
      </div>

      {/* Video Summary Box */}
      <div className="p-5 bg-neutral-950 border border-neutral-850 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white line-clamp-1">{videoData.title}</div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono mt-0.5">
              <span>{videoData.duration}s duration</span>
              <span>·</span>
              <span>{videoData.cues.length} subtitle cues</span>
              <span>·</span>
              <span className="text-emerald-400">Acoustic Synced</span>
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded border border-neutral-800">
          Format: {downloadFormat.toUpperCase()} ({resolution})
        </div>
      </div>

      {/* Download Options & Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Export Format Selection */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-neutral-300" />
            <span>1. Select Download Format</span>
          </h2>

          <div className="space-y-2.5">
            {[
              { id: 'mp4', title: 'Subtitled Video (.MP4)', desc: 'Burned-in kinetic captions directly on video frames' },
              { id: 'srt', title: 'SubRip Subtitles (.SRT)', desc: 'Universal subtitle track for YouTube & Premiere' },
              { id: 'vtt', title: 'WebVTT File (.VTT)', desc: 'Web captions for HTML5 video players' },
              { id: 'txt', title: 'Plain Transcript (.TXT)', desc: 'Unformatted text transcript of dialogue' }
            ].map(fmt => (
              <label
                key={fmt.id}
                onClick={() => setDownloadFormat(fmt.id as any)}
                className={`p-3.5 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                  downloadFormat === fmt.id
                    ? 'border-white bg-neutral-900 text-white'
                    : 'border-neutral-850 bg-neutral-950/60 hover:bg-neutral-900/40 text-neutral-300'
                }`}
              >
                <input
                  type="radio"
                  name="format"
                  checked={downloadFormat === fmt.id}
                  onChange={() => setDownloadFormat(fmt.id as any)}
                  className="mt-1 accent-white"
                />
                <div>
                  <div className="text-xs font-bold text-white">{fmt.title}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{fmt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Right: Quality & Video Settings */}
        <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-neutral-300" />
              <span>2. Video Quality & Resolution</span>
            </h2>

            {/* Resolution Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400 font-medium block">Export Resolution</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setResolution('1080p')}
                  className={`p-3 rounded-lg border text-left font-medium transition-colors ${
                    resolution === '1080p'
                      ? 'border-white bg-neutral-900 text-white font-semibold'
                      : 'border-neutral-850 bg-neutral-900/30 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-white">1080p Full HD</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">1920x1080 · Social & Web</div>
                </button>

                <button
                  onClick={() => setResolution('4k')}
                  className={`p-3 rounded-lg border text-left font-medium transition-colors ${
                    resolution === '4k'
                      ? 'border-white bg-neutral-900 text-white font-semibold'
                      : 'border-neutral-850 bg-neutral-900/30 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-white">4K Ultra HD</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">3840x2160 · Cinema Master</div>
                </button>
              </div>
            </div>

            {/* Frame Rate */}
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400 font-medium block">Framerate</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['60fps', '30fps'] as const).map(fps => (
                  <button
                    key={fps}
                    onClick={() => setFrameRate(fps)}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors ${
                      frameRate === fps
                        ? 'border-white bg-neutral-900 text-white'
                        : 'border-neutral-850 bg-neutral-900/30 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {fps === '60fps' ? '60 fps (Smooth Motion)' : '30 fps (Standard Web)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-neutral-500 space-y-1 pt-2 border-t border-neutral-900">
              <div className="flex items-center justify-between">
                <span>Audio Codec:</span>
                <span className="text-neutral-300 font-mono">AAC 320 kbps High Fidelity</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Color Primaries:</span>
                <span className="text-neutral-300 font-mono">Rec.709 sRGB Color Match</span>
              </div>
            </div>
          </div>

          {/* Download Action Notice */}
          <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-lg text-[11px] text-neutral-400 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <span>
              Clicking download will package your video render and guide you to confirm your workspace subscription plan.
            </span>
          </div>
        </div>

      </div>

      {/* Prominent Download Button */}
      <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Proceed with Video Download</div>
          <div className="text-xs text-neutral-400 mt-0.5">
            Format: {downloadFormat === 'mp4' ? `Burned-In MP4 (${resolution})` : `.${downloadFormat.toUpperCase()}`} · Ready for production
          </div>
        </div>

        <button
          onClick={handleDownloadClick}
          disabled={isRendering}
          className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 active:scale-[0.98] rounded-lg transition-all shadow-2xl flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>{isRendering ? 'Preparing Download Package...' : 'Download Video Now'}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </button>
      </div>

    </div>
  );
};
