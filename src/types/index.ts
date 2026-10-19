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

export type PageId = 
  | 'studio'
  | 'dashboard'
  | 'batch'
  | 'templates'
  | 'translation'
  | 'analytics'
  | 'pricing'
  | 'settings';
