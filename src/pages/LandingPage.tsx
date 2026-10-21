import React, { useState, useRef } from 'react';
import { ArrowRight, Upload, CheckCircle2, Film } from 'lucide-react';
import { SAMPLE_VIDEOS } from '../data/mockData';
import { ActiveVideoData } from '../types';
import { UploadingBarModal } from '../components/UploadingBarModal';

interface LandingPageProps {
  onNavigate: (path: string) => void;
  onUpdateVideoData?: (data: ActiveVideoData) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onUpdateVideoData }) => {
  const [isUploading2Min, setIsUploading2Min] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [showPromptModal, setShowPromptModal] = useState<boolean>(false);
  const [pendingVideoData, setPendingVideoData] = useState<ActiveVideoData | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartUpload = (fileName: string, videoUrl: string) => {
    setUploadedFileName(fileName);
    const baseSample = SAMPLE_VIDEOS[0];
    const newVideoData: ActiveVideoData = {
      title: fileName.replace(/\.[^/.]+$/, ''),
      videoUrl: videoUrl || baseSample.videoUrl,
      duration: baseSample.duration,
      cues: baseSample.initialCues,
      stylePreset: 'hormozi',
      language: 'English (US)',
      accuracy: 99.4
    };

    setPendingVideoData(newVideoData);
    setIsUploading2Min(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleStartUpload(file.name, url);
    }
  };

  const handleSampleUpload = () => {
    const sample = SAMPLE_VIDEOS[0];
    handleStartUpload(sample.title + '.mp4', sample.videoUrl);
  };

  // Called when the 2-minute upload completes
  const handleUploadComplete = () => {
    setIsUploading2Min(false);
    if (pendingVideoData && onUpdateVideoData) {
      onUpdateVideoData(pendingVideoData);
    }
    setShowPromptModal(true);
  };

  return (
    <div className="bg-black text-white min-h-[calc(100vh-80px)] flex flex-col justify-between selection:bg-white selection:text-black">
      
      {/* Invisible file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="video/mp4,video/webm,video/quicktime,video/mkv"
        className="hidden"
      />

      {/* Hero Section: Pure Black Elegance Theme */}
      <section className="relative px-6 pt-16 pb-20 md:pt-28 md:pb-24 max-w-4xl mx-auto w-full text-center space-y-10">
        
        {/* Subtle Brand Kicker */}
        <div className="flex items-center justify-center gap-3 text-xs tracking-[0.28em] uppercase font-mono text-neutral-400">
          <span>Acoustic Speech Intelligence</span>
          <span className="text-neutral-600">·</span>
          <span>Cinema Subtitle Studio</span>
        </div>

        {/* Name of the App */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none">
            SubFlow AI
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-300 max-w-2xl mx-auto tracking-tight leading-snug">
            Automatic video subtitle generation with millisecond acoustic precision.
          </p>
        </div>

        {/* In-Depth Description About the App */}
        <div className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 font-normal leading-relaxed space-y-4 text-center">
          <p>
            SubFlow AI is an editorial speech intelligence platform engineered for filmmakers, creators, and modern media teams. 
            Upload any video, and SubFlow analyzes the vocal audio waveform — extracting syllables, phonemes, and natural human pauses 
            to generate flawlessly synchronized subtitles.
          </p>
          <p className="text-neutral-500 text-xs sm:text-sm">
            Over 85% of online video is consumed in silence. SubFlow transforms raw spoken dialogue into visual rhythm, 
            delivering kinetic word-level pacing, 42-language neural translation, and universal SubRip (.SRT) exports 
            ready for cinema and social screens alike.
          </p>
        </div>

        {/* Upload dropzone with 2-minute uploading pipeline */}
        <div className="max-w-xl mx-auto">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="p-8 bg-neutral-950 hover:bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-2xl transition-all cursor-pointer group shadow-2xl space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-neutral-600 flex items-center justify-center mx-auto transition-colors">
              <Upload className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white">
                Upload video or drop file here
              </div>
              <div className="text-xs text-neutral-500">
                Supports MP4, WebM, MOV, and MKV · 2-minute acoustic transcription pipeline
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 active:scale-[0.98] rounded-md transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Video</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSampleUpload();
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-md transition-colors"
              >
                Test with Demo Video
              </button>
            </div>
          </div>
        </div>

        {/* ONLY ONE OPTION TO NAVIGATE: Enter Studio */}
        <div className="pt-4 flex flex-col items-center justify-center">
          <button
            onClick={() => onNavigate('/studio')}
            className="px-10 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all rounded-md shadow-2xl flex items-center justify-center gap-3 group"
          >
            <span>Enter Studio</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-2 text-[11px] text-neutral-500 font-mono">
            Direct access to video subtitle generator & editor workspace
          </p>
        </div>

        {/* Core Pillars: Restrained Black Elegance */}
        <div className="pt-16 border-t border-neutral-900 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
          <div className="space-y-2">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">01 / Phonetic Sync</div>
            <h2 className="text-sm font-semibold text-white">Acoustic Timecode Alignment</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Whisper-v3 acoustic models map spoken frequencies directly against video frames for millisecond-exact word timing.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">02 / Moving Typography</div>
            <h2 className="text-sm font-semibold text-white">Curated Kinetic Styles</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Elevate subtitles with Hormozi kinetic punch, Netflix cinema minimalism, and smooth progressive karaoke highlights.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">03 / Universal Formats</div>
            <h2 className="text-sm font-semibold text-white">Lossless Studio Export</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Download clean SubRip (.SRT), WebVTT (.VTT), unformatted plain transcripts, or hardcoded burned-in video preview files.
            </p>
          </div>
        </div>

      </section>

      {/* 2-Minute Uploading Bar Modal */}
      <UploadingBarModal
        isOpen={isUploading2Min}
        fileName={uploadedFileName}
        onComplete={handleUploadComplete}
        onCancel={() => setIsUploading2Min(false)}
      />

      {/* Upload Complete Prompt Screen Modal with Move to Next Screen button */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-md w-full p-6 text-center space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-6 h-6 text-black" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Upload & Subtitles Ready</span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Subtitle Generation Finished!
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your video <span className="text-white font-medium">"{uploadedFileName}"</span> has finished the 2-minute acoustic pipeline. Millisecond subtitles are ready.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-900 border border-neutral-850 rounded-xl text-left text-xs font-mono text-neutral-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">File:</span>
                <span className="text-white truncate max-w-[200px]">{uploadedFileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Pipeline Duration:</span>
                <span className="text-neutral-300">2 minutes (120s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status:</span>
                <span className="text-emerald-400 font-bold">Acoustic Cues Synchronized</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              {/* Button to move to next screen */}
              <button
                onClick={() => {
                  setShowPromptModal(false);
                  if (pendingVideoData && onUpdateVideoData) {
                    onUpdateVideoData(pendingVideoData);
                  }
                  onNavigate('/ready');
                }}
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 active:scale-[0.98] rounded-lg transition-all shadow-2xl flex items-center justify-center gap-2"
              >
                <span>Move to Next Screen: Review & Download</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setShowPromptModal(false);
                  if (pendingVideoData && onUpdateVideoData) {
                    onUpdateVideoData(pendingVideoData);
                  }
                  onNavigate('/download');
                }}
                className="w-full py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Skip Direct to Download Page</span>
                <ArrowRight className="w-3 h-3 text-neutral-500" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
