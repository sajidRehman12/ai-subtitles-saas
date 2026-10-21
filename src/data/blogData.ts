import { BlogPost } from '../types';
import { HERO_STUDIO_IMG, SAMPLE_TECH_IMG, SAMPLE_PODCAST_IMG, AVATAR_PRO_IMG } from './mockData';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'how-subflow-ai-generates-millisecond-video-subtitles',
    title: 'How SubFlow AI Generates Millisecond-Synchronized Video Subtitles with Whisper-v3',
    subtitle: 'A technical breakdown of acoustic phoneme extraction, CTC forced alignment, and animated kinetic typography rendering.',
    summary: 'Discover how SubFlow AI processes uploaded MP4 and WebM videos to generate word-level timestamped subtitle cues with 99.4% speech recognition accuracy.',
    category: 'Engineering',
    featured: true,
    author: {
      name: 'Dr. Marcus Vance',
      role: 'Principal Audio Intelligence Engineer',
      avatar: AVATAR_PRO_IMG
    },
    readTime: '6 min read',
    date: 'March 14, 2026',
    coverImage: HERO_STUDIO_IMG,
    sections: [
      {
        heading: '1. The Problem with Legacy Video Subtitle Tools',
        body: 'For decades, video editors suffered through manual transcription software or clunky automated caption tools that provided coarse, sentence-level blocks. These blocks lacked word-level timing, leading to subtitles that lagged behind speech or drifted out of sync during fast cadence. In short-form video where viewer drop-off happens within the first 1.8 seconds, imprecise subtitles degrade viewer retention.',
        keyTakeaway: 'Millisecond word-level timestamps are required to create modern kinetic bounce and karaoke animations that hold viewer gaze.'
      },
      {
        heading: '2. The 4-Stage SubFlow Acoustic Pipeline',
        body: 'When you drop a video into SubFlow AI, the browser isolates the audio track and sends it to our high-throughput Whisper-v3 GPU pipeline. Stage 1 executes vocal frequency de-noising to isolate vocal tracks from background music. Stage 2 executes tokenization and acoustic beam search decoding. Stage 3 performs dynamic time warping (DTW) with Connectionist Temporal Classification (CTC) alignment to pin the start and end timestamp of every articulated syllable. Finally, Stage 4 packages the cues into WebVTT, SubRip (.SRT), or renders CSS-animated overlays directly on your video.',
        keyTakeaway: 'CTC forced-alignment bridges the gap between acoustic speech audio and visual video playback frames.'
      },
      {
        heading: '3. Why Word-by-Word Kinetic Pop Matters for Retention',
        body: 'Eye-tracking laboratory studies reveal that viewers do not read subtitles the way they read books. Instead, their gaze rhythmically saccades to highlighted words synchronized with acoustic inflection. SubFlow AI styles each cue with active yellow or emerald highlights precisely as the speaker stresses the syllable, quadrupling average completion rate.'
      },
      {
        heading: '4. Exporting to Premiere, DaVinci, and Social Platforms',
        body: 'SubFlow supports lossless exports. You can download universal standard .SRT tracks for YouTube Studio, .VTT for HTML5 web players, or copy clean CSS animation definitions to paste directly into your editing workflow.'
      }
    ]
  },
  {
    id: 'post-2',
    slug: 'sound-off-video-retention-guide',
    title: 'The Sound-Off Revolution: Why 85% of Social Video Is Watched on Mute',
    subtitle: 'Quantitative insights from analyzing viewer engagement across 4 million mobile feeds and how kinetic captions drive watch time.',
    summary: 'Mobile users consume video on transit, in office lobbies, and late at night with sound muted. Learn how animated captions turn silent scrollers into engaged followers.',
    category: 'Case Studies',
    featured: false,
    author: {
      name: 'Sarah Jenkins',
      role: 'Head of Creator Strategy',
      avatar: AVATAR_PRO_IMG
    },
    readTime: '5 min read',
    date: 'March 12, 2026',
    coverImage: SAMPLE_PODCAST_IMG,
    sections: [
      {
        heading: 'The Silent Majority of Video Viewers',
        body: 'Recent behavioral data across Instagram, TikTok, LinkedIn, and Facebook shows that 85% of short-form feeds are consumed with device volume muted. If your video relies on audio to deliver its hook, 8 out of 10 prospective viewers scroll past within two seconds without hearing a single word.',
        keyTakeaway: 'Captions are no longer an accessibility afterthought; they are your primary storytelling canvas.'
      },
      {
        heading: 'The Retention Jump: From 18s to 52s',
        body: 'In A/B testing conducted with over 200 media agencies, videos utilizing kinetic dynamic captions demonstrated a 41.8% lift in 30-second completion rates compared to identical videos without captions. For long-form podcast clips, average view duration jumped from 18 seconds to 52 seconds.'
      },
      {
        heading: 'Designing Captions that Command Attention Without Visual Clutter',
        body: 'Effective caption design requires discipline. Avoid oversized boxes that obscure speaker facial expressions. SubFlow presets provide calibrated font scales (20px - 28px), contrast scrims, and subtle word pop animations that enhance readability while keeping the video focus intact.'
      }
    ]
  },
  {
    id: 'post-3',
    slug: 'anatomy-of-a-speech-to-text-subtitle-pipeline',
    title: 'Anatomy of an AI Speech Subtitle Pipeline: From Waveform to Millisecond SubRip',
    subtitle: 'Deep technical exploration of speech acoustic modeling, phonetic alignment, and dictionary tokenization.',
    summary: 'A deep dive into how Whisper-v3 and acoustic post-processing eliminate hallucinations and align syllables with video framerates.',
    category: 'AI Speech',
    featured: false,
    author: {
      name: 'Elena Rostova',
      role: 'Lead ML Research Engineer',
      avatar: AVATAR_PRO_IMG
    },
    readTime: '8 min read',
    date: 'March 08, 2026',
    coverImage: SAMPLE_TECH_IMG,
    sections: [
      {
        heading: 'Audio Pre-Processing: Sample Rate Normalization & VAD',
        body: 'The pipeline begins by downsampling audio tracks to 16kHz mono PCM streams and running energy-based Voice Activity Detection (VAD). This splits silent pauses from active speech chunks, eliminating trailing ghost hallucinations that plague raw models.',
        keyTakeaway: 'Voice Activity Detection prevents subtitles from generating spurious words during ambient background music.'
      },
      {
        heading: 'Phonetic Alignment with CTC Segmentation',
        body: 'While standard Transformer decoders emit text tokens in autoregressive batches, they lack precise physical time coordinates. SubFlow implements CTC segmentation against the cross-attention matrix, measuring audio frame probabilities at 20-millisecond intervals.'
      },
      {
        heading: 'Custom Industry Vocabulary & Phonetic Injection',
        body: 'Generic speech engines stumble on brand names like "Kubernetes", "PyTorch", or creator handles. SubFlow enables custom dictionary biasing, injecting user-specified terminology into the beam search prior to final text decoding.'
      }
    ]
  },
  {
    id: 'post-4',
    slug: 'creator-multilingual-video-localization-playbook',
    title: 'From English to 42 Languages: The Multilingual Video Localization Playbook',
    subtitle: 'How creators unlock global markets by translating subtitle tracks into Spanish, Portuguese, Japanese, and German.',
    summary: 'English accounts for only 25% of internet video consumers. Learn how one-click AI subtitle translation opens up hundreds of thousands of international viewers.',
    category: 'Guides',
    featured: false,
    author: {
      name: 'Maya Lin',
      role: 'International Media Director',
      avatar: AVATAR_PRO_IMG
    },
    readTime: '4 min read',
    date: 'March 02, 2026',
    coverImage: HERO_STUDIO_IMG,
    sections: [
      {
        heading: 'The Global Reach Gap',
        body: 'Over 75% of worldwide video consumers speak languages other than English. When creators limit their subtitles to a single language, they abandon massive audience segments in Latin America, Europe, and Asia where video demand is surging.',
        keyTakeaway: 'Translating subtitles into Spanish, French, and Japanese multiplies audience discoverability with zero additional video shooting time.'
      },
      {
        heading: 'Bilingual Stacked Subtitles for Education & Business',
        body: 'SubFlow supports bilingual stacked subtitle tracks. Displaying original speech alongside target language translation allows viewers to learn technical vocabulary while staying engaged with the spoken content.'
      },
      {
        heading: 'Preserving Timecode Integrity Across Translations',
        body: 'Different languages have varying syllable lengths (e.g. German text typically expands by 20% compared to English). SubFlow intelligently splits translated clauses so subtitles remain readable within the original speech duration.'
      }
    ]
  },
  {
    id: 'post-5',
    slug: 'subtitle-formats-guide-srt-vtt-hardcoded',
    title: 'SRT vs WebVTT vs Hardcoded Burned-in Subtitles: Which Should You Use?',
    subtitle: 'The definitive comparison guide of subtitle formats for YouTube, social media, and web applications.',
    summary: 'Understand the pros, cons, and technical limits of SubRip (.SRT), WebVTT (.VTT), and open burned-in video captions.',
    category: 'Tutorials',
    featured: false,
    author: {
      name: 'David Cho',
      role: 'Senior Video Production Editor',
      avatar: AVATAR_PRO_IMG
    },
    readTime: '5 min read',
    date: 'February 24, 2026',
    coverImage: SAMPLE_TECH_IMG,
    sections: [
      {
        heading: 'SubRip (.SRT): The Universal Standard',
        body: 'SRT is the oldest and most widely supported format. It contains sequential cue numbers, millisecond timestamps separated by commas, and plain text lines. Every video platform and NLE editor accepts SRT files without conversion.',
        keyTakeaway: 'Use SRT when delivering to YouTube, Vimeo, or importing into Adobe Premiere Pro and DaVinci Resolve.'
      },
      {
        heading: 'WebVTT (.VTT): The HTML5 Native Standard',
        body: 'WebVTT adds CSS styling cues, positioning coordinates, and voice tags (`<v SpeakerName>`). It is the native standard for HTML5 `<track>` tags and modern browser video players.'
      },
      {
        heading: 'Burned-in (Open) Captions: The Social Media Weapon',
        body: 'Burned-in captions are permanently rendered onto the video pixels. This guarantees that every viewer on Instagram, TikTok, or Twitter sees your kinetic fonts and color highlights regardless of their platform subtitle settings.'
      }
    ]
  }
];
