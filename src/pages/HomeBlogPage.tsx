import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { SAMPLE_VIDEOS, STYLE_PRESETS } from '../data/mockData';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { CaptionPresetId } from '../types';
import { 
  ArrowRight, Video, Sparkles, Layers, Wand2, 
  Languages, BarChart3, ShieldCheck, Play, ArrowUpRight,
  BookOpen, CheckCircle2, ChevronRight, FileText
} from 'lucide-react';

interface HomeBlogPageProps {
  onNavigate: (path: string) => void;
}

export const HomeBlogPage: React.FC<HomeBlogPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [demoPreset, setDemoPreset] = useState<CaptionPresetId>('hormozi');

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter(p => p.id !== featuredPost.id);

  const categories = ['All', 'Engineering', 'Case Studies', 'AI Speech', 'Guides', 'Tutorials'];

  const filteredPosts = regularPosts.filter(p => 
    selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      
      {/* Editorial Masthead */}
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
            <span>SubFlow Publication</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Vol. 2026</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Speech AI & Video Retention</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Video Subtitle Engineering & AI Transcription Insights
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/studio')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-indigo-600/30"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Launch Subtitle Studio</span>
          </button>
        </div>
      </div>

      {/* Featured Publication Hero Article */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl group">
        {/* Cover image (7 cols) */}
        <div 
          onClick={() => onNavigate(`/blog/${featuredPost.slug}`)}
          className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden cursor-pointer"
        >
          <img
            src={featuredPost.coverImage}
            alt={featuredPost.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded">
            Featured Deep Dive
          </div>
        </div>

        {/* Lead Content (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-indigo-400 font-semibold">{featuredPost.category}</span>
              <span>·</span>
              <span>{featuredPost.readTime}</span>
              <span>·</span>
              <span>{featuredPost.date}</span>
            </div>

            <h2 
              onClick={() => onNavigate(`/blog/${featuredPost.slug}`)}
              className="text-xl sm:text-2xl font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer leading-tight"
            >
              {featuredPost.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
              {featuredPost.summary}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={featuredPost.author.avatar}
                alt={featuredPost.author.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-slate-700"
              />
              <div className="text-xs">
                <div className="font-bold text-white">{featuredPost.author.name}</div>
                <div className="text-[11px] text-slate-400">{featuredPost.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate(`/blog/${featuredPost.slug}`)}
                className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('/studio')}
                className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Try In Studio</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* High-CTR Google AdSense Header Leaderboard */}
      <AdSenseBanner slot="1001-home-leaderboard" format="horizontal" />

      {/* What is SubFlow AI? App Explanation & 4-Step Engine */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
            How The SaaS Platform Works
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Turn Any Uploaded Video into Kinetic Animated Subtitles in 4 Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            SubFlow AI is an end-to-end cloud platform built for content teams, YouTubers, podcasters, and marketing agencies. 
            Here is the automated architectural workflow that powers every video:
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 bg-slate-950 border border-slate-800/80 rounded-xl space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-sm font-bold text-white">Upload Any Video</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drag & drop MP4, WebM, MOV, or MKV files. Process single clips or drop dozens into the asynchronous batch queue.
            </p>
          </div>

          <div className="p-5 bg-slate-950 border border-slate-800/80 rounded-xl space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-sm font-bold text-white">Acoustic Speech Sync</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Whisper-v3 transcribes spoken dialogue while Connectionist Temporal Classification (CTC) aligns start and end timestamps for every word.
            </p>
          </div>

          <div className="p-5 bg-slate-950 border border-slate-800/80 rounded-xl space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-sm font-bold text-white">Kinetic Style Presets</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Apply viral presets (Hormozi yellow bounce, progressive karaoke wave, Netflix cinema standard) with custom fonts and brand colors.
            </p>
          </div>

          <div className="p-5 bg-slate-950 border border-slate-800/80 rounded-xl space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              04
            </div>
            <h3 className="text-sm font-bold text-white">Lossless Export</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download standard .SRT, .VTT, or .TXT tracks ready for Adobe Premiere, DaVinci Resolve, Final Cut Pro, or direct YouTube upload.
            </p>
          </div>
        </div>

        {/* Live Interactive Widget */}
        <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Want to see how it looks on your own video?
          </div>
          <button
            onClick={() => onNavigate('/studio')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>Upload Your Video in Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* SaaS App Modules Navigation Hub */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Explore All Platform Modules</h2>
            <p className="text-xs text-slate-400">Navigate to any section of the SubFlow AI SaaS platform</p>
          </div>
          <span className="text-xs font-mono text-indigo-400">8 Modules Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { path: '/studio', title: '1. Generator Studio', desc: 'Real-time video player & cue timeline editor', icon: Video },
            { path: '/dashboard', title: '2. Projects Library', desc: 'Manage transcribed videos & storage quota', icon: Layers },
            { path: '/batch', title: '3. Batch Processor', desc: 'Multi-video queue runner & bulk SRT export', icon: Sparkles },
            { path: '/styles', title: '4. Styles Library', desc: 'Hormozi, Karaoke & Netflix animation sandbox', icon: Wand2 },
            { path: '/translate', title: '5. AI Translate', desc: 'Bilingual subtitle editor across 42+ languages', icon: Languages },
            { path: '/analytics', title: '6. Analytics Audit', desc: 'Watch time retention & acoustic WER reports', icon: BarChart3 },
            { path: '/pricing', title: '7. Plans & Pricing', desc: 'Solo, Pro Studio & Enterprise allowances', icon: ShieldCheck },
            { path: '/settings', title: '8. Brand Settings', desc: 'Custom phonetic vocabulary & REST API keys', icon: BookOpen }
          ].map(module => {
            const Icon = module.icon;
            return (
              <div
                key={module.path}
                onClick={() => onNavigate(module.path)}
                className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-xl cursor-pointer transition-all hover:bg-slate-850 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {module.desc}
                  </p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-indigo-400">
                  {module.path}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mid-Page In-Feed AdSense Rectangle / Banner */}
      <AdSenseBanner slot="1002-mid-feed" format="horizontal" />

      {/* Blog Articles & Engineering Guides Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">Latest Engineering Articles & Guides</h2>
            <p className="text-xs text-slate-400">Research, tutorials, and benchmarks on speech acoustic alignment</p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => onNavigate(`/blog/${post.slug}`)}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="aspect-[16/9] bg-slate-950 overflow-hidden relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-neutral-300 border border-neutral-750">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                    <span>{post.readTime}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-neutral-200 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-neutral-850 mt-4 pt-3">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover border border-neutral-800"
                  />
                  <span className="text-xs text-neutral-300 font-medium">{post.author.name}</span>
                </div>

                <span className="text-xs font-semibold text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom AdSense Banner */}
      <AdSenseBanner slot="1003-bottom-anchor" format="horizontal" />

    </div>
  );
};
