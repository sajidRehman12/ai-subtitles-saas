import React, { useState, useRef, useEffect } from 'react';
import { SubtitleCue, CaptionPresetId, ActiveVideoData } from '../types';
import { SAMPLE_VIDEOS, STYLE_PRESETS, SUPPORTED_LANGUAGES } from '../data/mockData';
import { formatPlayerTime, generateSrt, generateVtt, generateTxt, downloadFile } from '../utils/subtitles';
import { UploadingBarModal } from '../components/UploadingBarModal';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize2, 
  Upload, Sparkles, Download, Plus, Trash2, Split, Check, 
  Search, Sliders, Type, CheckCircle2, Copy, FileText, ArrowRight
} from 'lucide-react';

interface StudioPageProps {
  onNavigate: (path: string) => void;
  onUpdateVideoData: (data: ActiveVideoData) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onNavigate, onUpdateVideoData }) => {
  // Video and playback states
  const [selectedSampleId, setSelectedSampleId] = useState<string>('sample-tech');
  const [videoSrc, setVideoSrc] = useState<string>(SAMPLE_VIDEOS[0].videoUrl);
  const [videoTitle, setVideoTitle] = useState<string>(SAMPLE_VIDEOS[0].title);
  const [cues, setCues] = useState<SubtitleCue[]>(SAMPLE_VIDEOS[0].initialCues);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(SAMPLE_VIDEOS[0].duration);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Custom styling state
  const [selectedPreset, setSelectedPreset] = useState<CaptionPresetId>('hormozi');
  const [customFontSize, setCustomFontSize] = useState<number>(STYLE_PRESETS.hormozi.fontSize);
  const [customPosition, setCustomPosition] = useState<'bottom' | 'center' | 'top'>('bottom');
  
  // Generation & AI state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English (US)');
  
  // 2-Minute uploading bar & prompt modal
  const [isUploading2Min, setIsUploading2Min] = useState<boolean>(false);
  const [showUploadPromptModal, setShowUploadPromptModal] = useState<boolean>(false);
  
  // Editor state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCueId, setActiveCueId] = useState<string | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<'srt' | 'vtt' | 'txt'>('srt');
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      
      // Find current active cue
      const active = cues.find(c => time >= c.startTime && time <= c.endTime);
      setActiveCueId(active ? active.id : null);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 38);
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

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(seconds, duration));
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
      setSelectedSampleId('custom');
      // Trigger full 2-minute uploading pipeline with progress bar
      setIsUploading2Min(true);
    }
  };

  const selectSample = (sample: typeof SAMPLE_VIDEOS[0]) => {
    setSelectedSampleId(sample.id);
    setVideoSrc(sample.videoUrl);
    setVideoTitle(sample.title);
    setCues(sample.initialCues);
    seekTo(0);
  };

  // Called when 2-minute upload pipeline finishes
  const handle2MinuteUploadComplete = () => {
    setIsUploading2Min(false);
    setIsGenerating(false);
    setGenerationProgress(100);
    onUpdateVideoData({
      title: videoTitle,
      videoUrl: videoSrc,
      duration,
      cues,
      stylePreset: selectedPreset,
      language: selectedLanguage,
      accuracy: 99.4
    });
    setShowUploadPromptModal(true);
  };

  // Simulates high-accuracy Whisper transcription pipeline with 2-minute uploading bar
  const simulateTranscription = () => {
    setIsUploading2Min(true);
  };

  // Active cue content to overlay
  const currentActiveCue = cues.find(c => currentTime >= c.startTime && currentTime <= c.endTime);

  // Update cue text
  const updateCueText = (id: string, text: string) => {
    setCues(prev => prev.map(c => c.id === id ? { ...c, text } : c));
  };

  // Update cue timestamps
  const updateCueTime = (id: string, field: 'startTime' | 'endTime', val: number) => {
    setCues(prev => prev.map(c => c.id === id ? { ...c, [field]: Math.max(0, val) } : c));
  };

  // Delete cue
  const deleteCue = (id: string) => {
    setCues(prev => prev.filter(c => c.id !== id));
  };

  // Split cue
  const splitCue = (id: string) => {
    const cue = cues.find(c => c.id === id);
    if (!cue) return;
    const midTime = Number(((cue.startTime + cue.endTime) / 2).toFixed(2));
    const words = cue.text.split(' ');
    const midWord = Math.ceil(words.length / 2);
    const text1 = words.slice(0, midWord).join(' ');
    const text2 = words.slice(midWord).join(' ');

    const newCue1: SubtitleCue = { ...cue, endTime: midTime, text: text1 };
    const newCue2: SubtitleCue = {
      id: 'cue-' + Date.now(),
      startTime: midTime,
      endTime: cue.endTime,
      text: text2 || 'Continuing thought...',
      speaker: cue.speaker
    };

    setCues(prev => {
      const idx = prev.findIndex(c => c.id === id);
      const next = [...prev];
      next.splice(idx, 1, newCue1, newCue2);
      return next;
    });
  };

  // Add new cue
  const addNewCue = () => {
    const lastCue = cues[cues.length - 1];
    const newStart = lastCue ? Number((lastCue.endTime + 0.2).toFixed(2)) : 0;
    const newEnd = Number((newStart + 3.0).toFixed(2));
    const newCue: SubtitleCue = {
      id: 'cue-' + Date.now(),
      startTime: newStart,
      endTime: newEnd,
      text: 'Add your new spoken caption line here...',
      speaker: 'Speaker 1'
    };
    setCues(prev => [...prev, newCue]);
    seekTo(newStart);
  };

  // Calculate current active word for karaoke/bounce highlight
  const renderHighlightedText = (cue: SubtitleCue) => {
    const totalDuration = cue.endTime - cue.startTime;
    const progress = Math.max(0, Math.min(1, (currentTime - cue.startTime) / (totalDuration || 1)));
    const words = cue.text.split(' ');
    const activeWordIndex = Math.floor(progress * words.length);

    const activeStyle = STYLE_PRESETS[selectedPreset];

    return (
      <span className="inline-block">
        {words.map((word, i) => {
          const isCurrentWord = i === activeWordIndex;
          return (
            <span
              key={i}
              className={`inline-block mr-1.5 transition-transform duration-100 ${
                isCurrentWord && activeStyle.animation === 'bounce' ? 'scale-110 font-black' : ''
              }`}
              style={{
                color: isCurrentWord ? activeStyle.highlightColor : activeStyle.color,
                textShadow: isCurrentWord ? `0 0 16px ${activeStyle.highlightColor}` : activeStyle.textShadow
              }}
            >
              {word}
            </span>
          );
        })}
      </span>
    );
  };

  // Export handlers
  const getExportText = () => {
    if (exportFormat === 'srt') return generateSrt(cues);
    if (exportFormat === 'vtt') return generateVtt(cues);
    return generateTxt(cues);
  };

  const handleDownload = () => {
    const content = getExportText();
    const safeTitle = videoTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');
    downloadFile(content, `${safeTitle}.${exportFormat}`);
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(getExportText());
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const filteredCues = cues.filter(c => 
    c.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.speaker && c.speaker.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentPresetStyle = STYLE_PRESETS[selectedPreset];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Page Title & Source Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-850">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Subtitle Generator Studio</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
            <span>Synchronized speech recognition</span>
            <span aria-hidden="true">·</span>
            <span>Word-level timestamp engine</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-300">File: {videoTitle}</span>
          </div>
        </div>

        {/* Video selector and upload button */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomUpload}
            accept="video/mp4,video/webm,video/quicktime,video/mkv"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors border border-neutral-750 whitespace-nowrap"
          >
            <Upload className="w-3.5 h-3.5 text-neutral-300" />
            <span>Upload MP4/WebM</span>
          </button>

          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            {SAMPLE_VIDEOS.map(sample => (
              <button
                key={sample.id}
                onClick={() => selectSample(sample)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedSampleId === sample.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {sample.id === 'sample-tech' ? 'Demo: Keynote' : 'Demo: Podcast'}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onUpdateVideoData({
                title: videoTitle,
                videoUrl: videoSrc,
                duration,
                cues,
                stylePreset: selectedPreset,
                language: selectedLanguage,
                accuracy: 99.4
              });
              onNavigate('/ready');
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shadow-xl"
          >
            <span>Proceed to Download →</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Split: Video Player + Subtitle Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left Column: Player, Video Overlays & Style Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Video Container with Subtitle Canvas Scrim */}
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-neutral-800 shadow-2xl flex items-center justify-center group">
            <video
              ref={videoRef}
              src={videoSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
              playsInline
            />

            {/* Live Subtitle Overlay */}
            {currentActiveCue && (
              <div 
                className={`absolute left-0 right-0 px-6 pointer-events-none transition-all flex justify-center ${
                  customPosition === 'top' ? 'top-8' : customPosition === 'center' ? 'top-1/2 -translate-y-1/2' : 'bottom-10'
                }`}
              >
                <div 
                  className="max-w-xl text-center px-4 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: `rgba(15, 23, 42, ${currentPresetStyle.backgroundOpacity})`,
                    borderWidth: `${currentPresetStyle.borderWidth}px`,
                    borderColor: currentPresetStyle.borderColor,
                    textTransform: currentPresetStyle.textTransform,
                    fontFamily: currentPresetStyle.fontFamily,
                    fontSize: `${customFontSize}px`,
                    fontWeight: currentPresetStyle.fontWeight,
                    lineHeight: 1.3
                  }}
                >
                  {currentActiveCue.speaker && (
                    <div className="text-[11px] font-semibold text-neutral-300 mb-0.5 tracking-wider uppercase">
                      {currentActiveCue.speaker}
                    </div>
                  )}
                  {renderHighlightedText(currentActiveCue)}
                </div>
              </div>
            )}

            {/* Play state center overlay when paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                aria-label="Play video"
                className="absolute w-14 h-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-2xl hover:bg-white hover:scale-105 transition-all"
              >
                <Play className="w-6 h-6 fill-current ml-1 text-black" />
              </button>
            )}

            {/* Video duration pill */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/80 border border-neutral-800 text-[11px] font-mono text-neutral-300 pointer-events-none tabular-nums">
              {formatPlayerTime(currentTime)} / {formatPlayerTime(duration)}
            </div>
          </div>

          {/* Timeline Scrubber & Video Controls */}
          <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl space-y-3">
            {/* Scrubber track */}
            <div className="space-y-1.5">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.05}
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
              
              {/* Cue markers on timeline */}
              <div className="relative h-2 w-full bg-neutral-900 rounded overflow-hidden">
                {cues.map(cue => {
                  const leftPct = (cue.startTime / (duration || 1)) * 100;
                  const widthPct = Math.max(1, ((cue.endTime - cue.startTime) / (duration || 1)) * 100);
                  const isCurrent = currentTime >= cue.startTime && currentTime <= cue.endTime;
                  return (
                    <div
                      key={cue.id}
                      onClick={() => seekTo(cue.startTime)}
                      title={`${cue.startTime.toFixed(1)}s: ${cue.text}`}
                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                      className={`absolute top-0 bottom-0 cursor-pointer transition-colors ${
                        isCurrent ? 'bg-white' : 'bg-neutral-700 hover:bg-neutral-600'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between gap-4 flex-wrap text-neutral-300">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current text-black" /> : <Play className="w-4 h-4 fill-current text-black" />}
                </button>
                <button
                  onClick={() => seekTo(currentTime - 5)}
                  title="Rewind 5s"
                  className="p-2 hover:bg-neutral-850 rounded-lg text-neutral-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => seekTo(currentTime + 5)}
                  title="Forward 5s"
                  className="p-2 hover:bg-neutral-850 rounded-lg text-neutral-400 hover:text-white transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <div className="text-xs font-mono tabular-nums text-neutral-400 ml-2">
                  <span className="text-white font-medium">{formatPlayerTime(currentTime)}</span>
                  <span className="mx-1 text-neutral-600">/</span>
                  <span>{formatPlayerTime(duration)}</span>
                </div>
              </div>

              {/* Speed & Volume */}
              <div className="flex items-center gap-3">
                {/* Speed selector */}
                <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg text-xs">
                  {[0.75, 1, 1.25, 1.5].map(rate => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`px-2 py-1 rounded font-medium transition-colors ${
                        playbackRate === rate ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                {/* Volume toggle */}
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Style & Animation Presets Panel */}
          <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-neutral-300" />
                <span>Subtitle Style & Animation Preset</span>
              </span>
              <span className="text-xs text-neutral-500">Real-time overlay preview</span>
            </div>

            {/* Presets buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(STYLE_PRESETS) as CaptionPresetId[]).map((presetId) => {
                const isSelected = selectedPreset === presetId;
                const labels: Record<CaptionPresetId, { name: string; desc: string }> = {
                  hormozi: { name: 'Hormozi Kinetic', desc: 'Bold yellow pop bounce' },
                  netflix: { name: 'Netflix Cinema', desc: 'Clean translucent box' },
                  karaoke: { name: 'Karaoke Wave', desc: 'Emerald progressive fill' },
                  cyber: { name: 'Cyberpunk Neon', desc: 'Electric blue monospace' },
                  minimal: { name: 'Minimal Modern', desc: 'Unboxed understated' },
                  bilingual: { name: 'Bilingual Stack', desc: 'Two-tone contrast' }
                };
                return (
                  <button
                    key={presetId}
                    onClick={() => {
                      setSelectedPreset(presetId);
                      setCustomFontSize(STYLE_PRESETS[presetId].fontSize);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-white bg-neutral-900 text-white'
                        : 'border-neutral-850 bg-neutral-950/60 hover:bg-neutral-900/40 text-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{labels[presetId].name}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{labels[presetId].desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Fine tuning controls: font size, position */}
            <div className="pt-2 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 flex items-center gap-1">
                  <Type className="w-3.5 h-3.5" />
                  <span>Size:</span>
                </span>
                <input
                  type="range"
                  min={14}
                  max={38}
                  value={customFontSize}
                  onChange={(e) => setCustomFontSize(parseInt(e.target.value))}
                  className="w-24 h-1 bg-neutral-800 rounded accent-white"
                />
                <span className="font-mono text-neutral-400 tabular-nums">{customFontSize}px</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-neutral-400">Position:</span>
                <div className="flex items-center bg-neutral-900 border border-neutral-800 p-0.5 rounded">
                  {(['bottom', 'center', 'top'] as const).map(pos => (
                    <button
                      key={pos}
                      onClick={() => setCustomPosition(pos)}
                      className={`px-2 py-0.5 rounded capitalize ${
                        customPosition === pos ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Subtitle Cue Editor (5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-[700px] bg-neutral-950 border border-neutral-850 rounded-xl overflow-hidden">
          
          {/* Editor Header */}
          <div className="p-4 border-b border-neutral-850 bg-black/60 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Subtitle Transcript Editor</span>
                  <span className="text-xs font-normal text-neutral-400">({cues.length} segments)</span>
                </h2>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  Click any segment to jump video playhead
                </div>
              </div>

              <button
                onClick={addNewCue}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-neutral-300" />
                <span>Add Cue</span>
              </button>
            </div>

            {/* AI Auto-generate / re-transcribe trigger */}
            <div className="flex items-center gap-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-750 rounded-lg text-xs text-neutral-200 focus:outline-none focus:border-white"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>

              <button
                disabled={isGenerating}
                onClick={simulateTranscription}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 disabled:opacity-50 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
                <span>{isGenerating ? `Transcribing (${generationProgress}%)` : 'AI Speech Sync'}</span>
              </button>
            </div>

            {/* Filter / Search within transcript */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Search words in transcript..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
              />
            </div>
          </div>

          {/* Cue Items Scrollable List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredCues.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                <FileText className="w-10 h-10 text-neutral-600 mb-2" />
                <p className="text-sm font-medium text-neutral-400">No matching subtitle cues</p>
                <p className="text-xs text-neutral-500 mt-1">Try clearing your search query or add a new cue above.</p>
              </div>
            ) : (
              filteredCues.map((cue, idx) => {
                const isActive = activeCueId === cue.id;
                return (
                  <div
                    key={cue.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isActive
                        ? 'border-white/60 bg-neutral-900 ring-1 ring-white/20'
                        : 'border-neutral-850 bg-neutral-950/60 hover:border-neutral-700'
                    }`}
                  >
                    {/* Timestamp header & quick actions */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400 tabular-nums">
                        <button
                          onClick={() => seekTo(cue.startTime)}
                          className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200 hover:bg-white hover:text-black transition-colors"
                          title="Jump to cue start"
                        >
                          {cue.startTime.toFixed(2)}s
                        </button>
                        <span>→</span>
                        <button
                          onClick={() => seekTo(cue.endTime)}
                          className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition-colors"
                          title="Jump to cue end"
                        >
                          {cue.endTime.toFixed(2)}s
                        </button>
                        <span className="text-neutral-600">·</span>
                        <span className="text-neutral-500">#{(idx + 1).toString().padStart(2, '0')}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            seekTo(cue.startTime);
                            if (videoRef.current) {
                              videoRef.current.play();
                              setIsPlaying(true);
                            }
                          }}
                          title="Play this segment"
                          className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
                        >
                          <Play className="w-3 h-3 fill-current" />
                        </button>
                        <button
                          onClick={() => splitCue(cue.id)}
                          title="Split cue in half"
                          className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
                        >
                          <Split className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteCue(cue.id)}
                          title="Delete cue"
                          className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Spoken Text Edit Area */}
                    <textarea
                      rows={2}
                      value={cue.text}
                      onChange={(e) => updateCueText(cue.id, e.target.value)}
                      className="w-full bg-neutral-900/90 border border-neutral-800 rounded p-2 text-xs text-neutral-100 focus:outline-none focus:border-white resize-none font-sans"
                    />

                    {/* Speaker name label if present */}
                    {cue.speaker && (
                      <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-500">
                        <span>Speaker: <span className="text-neutral-300">{cue.speaker}</span></span>
                        {cue.confidence && (
                          <span className="font-mono tabular-nums text-emerald-400">
                            {(cue.confidence * 100).toFixed(0)}% confidence
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer stats bar */}
          <div className="p-3 border-t border-neutral-850 bg-black/80 text-xs text-neutral-400 flex items-center justify-between tabular-nums">
            <span>Total Words: {cues.reduce((acc, c) => acc + c.text.split(/\s+/).filter(Boolean).length, 0)}</span>
            <span className="text-emerald-400 font-medium">Whisper-v3 Sync Active</span>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Export Subtitle Track</h3>
              <button
                onClick={() => setExportModalOpen(false)}
                className="text-neutral-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-400">
              Download standard subtitle files compatible with YouTube, Premiere Pro, Final Cut, DaVinci Resolve, and web video players.
            </p>

            {/* Format selection */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'srt', title: 'SubRip (.SRT)', desc: 'Universal standard for editors' },
                { id: 'vtt', title: 'WebVTT (.VTT)', desc: 'HTML5 web video native' },
                { id: 'txt', title: 'Plain Text (.TXT)', desc: 'Clean unformatted transcript' }
              ].map(fmt => (
                <button
                  key={fmt.id}
                  onClick={() => setExportFormat(fmt.id as any)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    exportFormat === fmt.id
                      ? 'border-white bg-neutral-900 text-white'
                      : 'border-neutral-800 bg-neutral-950/60 hover:bg-neutral-900 text-neutral-400'
                  }`}
                >
                  <div className="text-xs font-bold">{fmt.title}</div>
                  <div className="text-[10px] text-neutral-500 mt-1">{fmt.desc}</div>
                </button>
              ))}
            </div>

            {/* Raw file preview */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                <span>File Output Preview:</span>
                <span className="font-mono text-neutral-300">{cues.length} cues</span>
              </div>
              <pre className="h-44 overflow-y-auto p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-[11px] font-mono text-neutral-300 leading-relaxed">
                {getExportText()}
              </pre>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleCopyClipboard}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors border border-neutral-750"
              >
                {copyFeedback ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copyFeedback ? 'Copied to Clipboard!' : 'Copy Code'}</span>
              </button>
              <button
                onClick={() => {
                  handleDownload();
                  setExportModalOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .{exportFormat.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2-Minute Uploading Bar Modal */}
      <UploadingBarModal
        isOpen={isUploading2Min}
        fileName={videoTitle}
        onComplete={handle2MinuteUploadComplete}
        onCancel={() => setIsUploading2Min(false)}
      />

      {/* Upload & Transcription Complete Prompt Screen Modal */}
      {showUploadPromptModal && (
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
                Your video <span className="text-white font-medium">"{videoTitle}"</span> has been transcribed with millisecond speech synchronization.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-900 border border-neutral-850 rounded-xl text-left text-xs font-mono text-neutral-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-500">Video File:</span>
                <span className="text-white truncate max-w-[180px]">{videoTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Synchronized Cues:</span>
                <span className="text-emerald-400 font-bold">{cues.length} segments</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowUploadPromptModal(false);
                  onUpdateVideoData({
                    title: videoTitle,
                    videoUrl: videoSrc,
                    duration,
                    cues,
                    stylePreset: selectedPreset,
                    language: selectedLanguage,
                    accuracy: 99.4
                  });
                  onNavigate('/ready');
                }}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-all shadow-xl flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Move to Next Screen: Review & Download</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={() => setShowUploadPromptModal(false)}
                className="w-full py-2 text-xs text-neutral-500 hover:text-white transition-colors"
              >
                Stay in Studio Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
