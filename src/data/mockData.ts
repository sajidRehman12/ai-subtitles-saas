import { VideoProject, BatchItem, CustomTerm, CaptionStyle, CaptionPresetId } from '../types';

export const HERO_STUDIO_IMG = '/src/assets/images/hero_caption_studio_1792429947094.jpg';
export const AVATAR_PRO_IMG = '/src/assets/images/avatar_creator_pro_1792429945816.jpg';
export const SAMPLE_TECH_IMG = '/src/assets/images/sample_video_tech_1792429946719.jpg';
export const SAMPLE_PODCAST_IMG = '/src/assets/images/sample_video_podcast_1792429947161.jpg';

// Public reliable high-efficiency MP4 video clips for instant in-browser playback
export const SAMPLE_VIDEOS = [
  {
    id: 'sample-tech',
    title: 'Future of Generative Video Keynote',
    thumbnail: SAMPLE_TECH_IMG,
    duration: 38,
    // Reliable Big Buck Bunny / Blender Open Source standard educational mp4 stream
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    language: 'English (US)',
    initialCues: [
      { id: 'c1', startTime: 0.5, endTime: 3.2, text: 'Welcome everyone to the annual tech keynote on video intelligence.', speaker: 'Speaker 1', confidence: 0.99 },
      { id: 'c2', startTime: 3.5, endTime: 6.8, text: 'Today, over 80 percent of online video is consumed with the sound muted.', speaker: 'Speaker 1', confidence: 0.98 },
      { id: 'c3', startTime: 7.0, endTime: 10.4, text: 'That means captions are no longer an afterthought — they are your primary hook.', speaker: 'Speaker 1', confidence: 0.99 },
      { id: 'c4', startTime: 10.8, endTime: 14.2, text: 'When dynamic word-level subtitles sync with acoustic rhythm, retention skyrockets.', speaker: 'Speaker 1', confidence: 0.97 },
      { id: 'c5', startTime: 14.5, endTime: 18.0, text: 'We engineered SubFlow to transcribe speech with millimeter-precise timecodes.', speaker: 'Speaker 1', confidence: 0.99 },
      { id: 'c6', startTime: 18.4, endTime: 22.1, text: 'Notice how the highlighted syllables illuminate right as the speaker articulates them.', speaker: 'Speaker 1', confidence: 0.98 },
      { id: 'c7', startTime: 22.5, endTime: 26.8, text: 'You can export production-ready SRT, VTT, or hardcode dynamic styling in seconds.', speaker: 'Speaker 1', confidence: 0.99 },
      { id: 'c8', startTime: 27.2, endTime: 31.0, text: 'Whether publishing to YouTube, LinkedIn, or viral short-form reels.', speaker: 'Speaker 1', confidence: 0.98 },
      { id: 'c9', startTime: 31.4, endTime: 36.5, text: 'SubFlow turns raw speech into an immersive cinematic reading experience.', speaker: 'Speaker 1', confidence: 0.99 }
    ]
  },
  {
    id: 'sample-podcast',
    title: 'Creator Economy & Viral Content Strategy',
    thumbnail: SAMPLE_PODCAST_IMG,
    duration: 45,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    language: 'English (UK)',
    initialCues: [
      { id: 'p1', startTime: 0.4, endTime: 3.5, text: 'So Maya, what was the exact inflection point when your channel exploded?', speaker: 'Maya Lin', confidence: 0.99 },
      { id: 'p2', startTime: 3.8, endTime: 7.9, text: 'It happened the very week we stopped posting silent clips and started using animated kinetic captions.', speaker: 'Alex Reed', confidence: 0.98 },
      { id: 'p3', startTime: 8.2, endTime: 12.4, text: 'People scrolling on transit or at work instantly understood our punchline.', speaker: 'Alex Reed', confidence: 0.97 },
      { id: 'p4', startTime: 12.8, endTime: 16.9, text: 'Our average view duration jumped from eighteen seconds all the way to fifty-two.', speaker: 'Maya Lin', confidence: 0.99 },
      { id: 'p5', startTime: 17.3, endTime: 21.6, text: 'And translating into Spanish and Portuguese opened up entire global markets.', speaker: 'Alex Reed', confidence: 0.98 },
      { id: 'p6', startTime: 22.0, endTime: 26.5, text: 'That dual-language localization generated three hundred thousand new subscribers.', speaker: 'Maya Lin', confidence: 0.99 }
    ]
  }
];

export const STYLE_PRESETS: Record<CaptionPresetId, CaptionStyle> = {
  hormozi: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    highlightColor: '#FACC15', // Vibrant amber/yellow
    backgroundColor: '#0F172A',
    backgroundOpacity: 0.85,
    textShadow: '0 2px 10px rgba(0,0,0,0.9)',
    textTransform: 'uppercase',
    position: 'bottom',
    animation: 'bounce',
    borderWidth: 2,
    borderColor: '#38BDF8'
  },
  netflix: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    highlightColor: '#60A5FA',
    backgroundColor: '#000000',
    backgroundOpacity: 0.75,
    textShadow: 'none',
    textTransform: 'none',
    position: 'bottom',
    animation: 'none',
    borderWidth: 0,
    borderColor: 'transparent'
  },
  karaoke: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 24,
    fontWeight: '700',
    color: '#E2E8F0',
    highlightColor: '#10B981', // Emerald green
    backgroundColor: '#0F172A',
    backgroundOpacity: 0.9,
    textShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
    textTransform: 'none',
    position: 'bottom',
    animation: 'karaoke',
    borderWidth: 1,
    borderColor: '#334155'
  },
  cyber: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 22,
    fontWeight: '700',
    color: '#38BDF8',
    highlightColor: '#F43F5E',
    backgroundColor: '#020617',
    backgroundOpacity: 0.92,
    textShadow: '0 0 15px rgba(56, 189, 248, 0.5)',
    textTransform: 'uppercase',
    position: 'center',
    animation: 'fade',
    borderWidth: 2,
    borderColor: '#38BDF8'
  },
  minimal: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 18,
    fontWeight: '500',
    color: '#F8FAFC',
    highlightColor: '#FFFFFF',
    backgroundColor: '#0F172A',
    backgroundOpacity: 0.4,
    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
    textTransform: 'none',
    position: 'bottom',
    animation: 'none',
    borderWidth: 0,
    borderColor: 'transparent'
  },
  bilingual: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 19,
    fontWeight: '600',
    color: '#FFFFFF',
    highlightColor: '#F59E0B',
    backgroundColor: '#0F172A',
    backgroundOpacity: 0.88,
    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
    textTransform: 'none',
    position: 'bottom',
    animation: 'none',
    borderWidth: 1,
    borderColor: '#475569'
  }
};

export const INITIAL_PROJECTS: VideoProject[] = [
  {
    id: 'proj-1',
    title: 'Future of Generative Video Keynote',
    videoUrl: SAMPLE_VIDEOS[0].videoUrl,
    thumbnailUrl: SAMPLE_TECH_IMG,
    duration: 38,
    language: 'English (US)',
    status: 'completed',
    wordsCount: 142,
    accuracy: 99.4,
    cues: SAMPLE_VIDEOS[0].initialCues,
    stylePreset: 'hormozi',
    createdAt: '2026-10-18T14:20:00Z',
    updatedAt: '2026-10-19T09:15:00Z'
  },
  {
    id: 'proj-2',
    title: 'Creator Economy & Viral Content Strategy',
    videoUrl: SAMPLE_VIDEOS[1].videoUrl,
    thumbnailUrl: SAMPLE_PODCAST_IMG,
    duration: 45,
    language: 'English (UK)',
    status: 'completed',
    wordsCount: 195,
    accuracy: 98.8,
    cues: SAMPLE_VIDEOS[1].initialCues,
    stylePreset: 'karaoke',
    createdAt: '2026-10-17T11:00:00Z',
    updatedAt: '2026-10-18T16:30:00Z'
  },
  {
    id: 'proj-3',
    title: 'Quarterly Earnings Call Briefing Q3',
    videoUrl: SAMPLE_VIDEOS[0].videoUrl,
    thumbnailUrl: HERO_STUDIO_IMG,
    duration: 120,
    language: 'English (US)',
    status: 'completed',
    wordsCount: 520,
    accuracy: 99.7,
    cues: SAMPLE_VIDEOS[0].initialCues,
    stylePreset: 'netflix',
    createdAt: '2026-10-16T08:45:00Z',
    updatedAt: '2026-10-17T10:10:00Z'
  },
  {
    id: 'proj-4',
    title: 'SaaS Onboarding: Step-by-Step Tutorial',
    videoUrl: SAMPLE_VIDEOS[1].videoUrl,
    thumbnailUrl: SAMPLE_TECH_IMG,
    duration: 74,
    language: 'English (US)',
    status: 'completed',
    wordsCount: 312,
    accuracy: 99.1,
    cues: SAMPLE_VIDEOS[0].initialCues,
    stylePreset: 'minimal',
    createdAt: '2026-10-15T15:10:00Z',
    updatedAt: '2026-10-16T12:00:00Z'
  },
  {
    id: 'proj-5',
    title: 'Product Demo Reel 60s Vertical Cut',
    videoUrl: SAMPLE_VIDEOS[0].videoUrl,
    thumbnailUrl: SAMPLE_PODCAST_IMG,
    duration: 60,
    language: 'Spanish (ES)',
    status: 'processing',
    wordsCount: 240,
    accuracy: 97.9,
    cues: [],
    stylePreset: 'hormozi',
    createdAt: '2026-10-19T09:40:00Z',
    updatedAt: '2026-10-19T09:40:00Z'
  },
  {
    id: 'proj-6',
    title: 'Customer Success Story: FinTech Scaleup',
    videoUrl: SAMPLE_VIDEOS[1].videoUrl,
    thumbnailUrl: HERO_STUDIO_IMG,
    duration: 90,
    language: 'German (DE)',
    status: 'draft',
    wordsCount: 380,
    accuracy: 98.5,
    cues: [],
    stylePreset: 'netflix',
    createdAt: '2026-10-14T18:22:00Z',
    updatedAt: '2026-10-15T09:00:00Z'
  }
];

export const INITIAL_BATCH_ITEMS: BatchItem[] = [
  {
    id: 'batch-1',
    filename: 'podcast_ep24_clip_01.mp4',
    sizeMb: 84.2,
    durationSeconds: 154,
    targetLanguage: 'Spanish (Castilian)',
    stylePreset: 'hormozi',
    status: 'completed',
    progress: 100,
    etaSeconds: 0
  },
  {
    id: 'batch-2',
    filename: 'masterclass_module_03_lesson_a.mov',
    sizeMb: 245.8,
    durationSeconds: 420,
    targetLanguage: 'English (US)',
    stylePreset: 'netflix',
    status: 'transcribing',
    progress: 68,
    etaSeconds: 14
  },
  {
    id: 'batch-3',
    filename: 'tiktok_viral_hook_reaction_v2.mp4',
    sizeMb: 32.1,
    durationSeconds: 45,
    targetLanguage: 'French (FR)',
    stylePreset: 'karaoke',
    status: 'styling',
    progress: 92,
    etaSeconds: 4
  },
  {
    id: 'batch-4',
    filename: 'youtube_shorts_fintech_tip.mp4',
    sizeMb: 41.5,
    durationSeconds: 58,
    targetLanguage: 'Japanese (JA)',
    stylePreset: 'bilingual',
    status: 'queued',
    progress: 0,
    etaSeconds: 45
  }
];

export const INITIAL_CUSTOM_TERMS: CustomTerm[] = [
  { id: 't1', term: 'SubFlow', replacement: 'SubFlow AI', category: 'brand' },
  { id: 't2', term: 'LLM', replacement: 'LLM', category: 'acronym' },
  { id: 't3', term: 'SaaS', replacement: 'SaaS', category: 'acronym' },
  { id: 't4', term: 'PostgreSQL', replacement: 'PostgreSQL', category: 'jargon' },
  { id: 't5', term: 'Kubernetes', replacement: 'Kubernetes', category: 'jargon' },
  { id: 't6', term: 'PyTorch', replacement: 'PyTorch', category: 'brand' }
];

export const SUPPORTED_LANGUAGES = [
  'English (US)',
  'English (UK)',
  'Spanish (ES)',
  'Spanish (LATAM)',
  'French (FR)',
  'German (DE)',
  'Japanese (JA)',
  'Portuguese (BR)',
  'Italian (IT)',
  'Hindi (IN)',
  'Chinese (Mandarin)',
  'Arabic (Standard)',
  'Korean (KR)',
  'Dutch (NL)',
  'Polish (PL)',
  'Turkish (TR)',
  'Swedish (SE)',
  'Ukrainian (UA)'
];
