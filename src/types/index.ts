export interface SubtitleCue {
  id: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  text: string;
  speaker?: string;
  confidence?: number;
}

export type CaptionPresetId = 'hormozi' | 'netflix' | 'karaoke' | 'cyber' | 'minimal' | 'bilingual';

export interface CaptionStyle {
  fontFamily: string;
  fontSize: number; // in px
  fontWeight: string;
  color: string;
  highlightColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  textShadow: string;
  textTransform: 'uppercase' | 'none' | 'capitalize';
  position: 'bottom' | 'center' | 'top';
  animation: 'bounce' | 'karaoke' | 'fade' | 'none';
  borderWidth: number;
  borderColor: string;
}

export interface VideoProject {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number; // in seconds
  language: string;
  status: 'completed' | 'processing' | 'draft';
  wordsCount: number;
  accuracy: number;
  cues: SubtitleCue[];
  stylePreset: CaptionPresetId;
  createdAt: string;
  updatedAt: string;
}

export interface BatchItem {
  id: string;
  filename: string;
  sizeMb: number;
  durationSeconds: number;
  targetLanguage: string;
  stylePreset: CaptionPresetId;
  status: 'queued' | 'transcribing' | 'styling' | 'completed' | 'failed';
  progress: number;
  etaSeconds: number;
}

export interface CustomTerm {
  id: string;
  term: string;
  replacement?: string;
  category: 'brand' | 'acronym' | 'person' | 'jargon';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: 'Guides' | 'Engineering' | 'Case Studies' | 'AI Speech' | 'Tutorials';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  date: string;
  coverImage: string;
  featured?: boolean;
  sections: {
    heading: string;
    body: string;
    keyTakeaway?: string;
  }[];
}

export interface AdSenseConfig {
  publisherId: string;
  enabled: boolean;
  testMode: boolean;
  autoAds: boolean;
}

export interface ActiveVideoData {
  title: string;
  videoUrl: string;
  duration: number;
  cues: SubtitleCue[];
  stylePreset: CaptionPresetId;
  language: string;
  accuracy: number;
}

export type PageId = 
  | 'home'
  | 'studio'
  | 'ready'
  | 'download'
  | 'dashboard'
  | 'batch'
  | 'templates'
  | 'translation'
  | 'analytics'
  | 'pricing'
  | 'settings'
  | 'article'
  | 'privacy'
  | 'terms'
  | 'adsense';


