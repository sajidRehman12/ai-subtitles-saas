import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { 
  ArrowLeft, Calendar, Clock, Share2, 
  ArrowRight, Video, Sparkles, CheckCircle2, Bookmark
} from 'lucide-react';

interface ArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ slug, onNavigate }) => {
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles & Publication</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-indigo-400 font-semibold">{post.category}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">{post.readTime}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">{post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-slate-300 leading-relaxed font-normal">
          {post.subtitle}
        </p>

        {/* Author lockup */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-slate-700"
          />
          <div>
            <div className="text-xs font-bold text-white">{post.author.name}</div>
            <div className="text-[11px] text-slate-400">{post.author.role}</div>
          </div>
        </div>
      </header>

      {/* Top Leaderboard Ad */}
      <AdSenseBanner slot="4001-article-header" format="horizontal" />

      {/* Cover Image */}
      <div className="aspect-[16/9] max-h-[460px] w-full rounded-2xl overflow-hidden my-8 border border-slate-800 bg-slate-900">
        <img
          src={post.coverImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body + Sidebar Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Body (8 cols) */}
        <div className="lg:col-span-8 space-y-8 text-sm text-slate-300 leading-relaxed">
          {post.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {section.heading}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {section.body}
              </p>

              {section.keyTakeaway && (
                <div className="p-4 bg-slate-900/90 border-l-2 border-indigo-500 rounded-r-xl my-4 space-y-1">
                  <div className="text-[11px] uppercase font-mono tracking-wider text-indigo-400 font-semibold">
                    Key Engineering Insight
                  </div>
                  <p className="text-xs text-slate-200 font-medium">
                    {section.keyTakeaway}
                  </p>
                </div>
              )}

              {/* Mid-article ad after second section */}
              {idx === 1 && (
                <AdSenseBanner slot="4002-mid-content" format="in-article" />
              )}
            </section>
          ))}

          {/* Interactive CTA Card */}
          <div className="p-6 bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl my-8 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase font-mono">
              <Sparkles className="w-4 h-4" />
              <span>Try SubFlow On Your Video Now</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Experience millisecond speech synchronization live in your browser.
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Upload any MP4 or WebM video to auto-generate timestamped subtitles, apply kinetic presets, and export SRT files in seconds.
            </p>
            <button
              onClick={() => onNavigate('/studio')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Launch Subtitle Generator Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sidebar Rail: Author info, AdSense Rectangle, and Related posts (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* AdSense Sticky Rectangle */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <AdSenseBanner slot="4003-sidebar-rect" format="rectangle" />
          </div>

          {/* App Feature Highlights Card */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">SubFlow Platform Capabilities</h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Whisper-v3 acoustic forced alignment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hormozi, Karaoke & Netflix animation presets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>42+ target translation languages</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Lossless .SRT, .VTT and .TXT exports</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('/studio')}
              className="w-full mt-2 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-800/50 rounded-lg transition-colors"
            >
              Open Studio Editor
            </button>
          </div>

          {/* Related Articles */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Related Technical Articles</h4>
            <div className="space-y-3 divide-y divide-slate-800">
              {relatedPosts.map(rp => (
                <div 
                  key={rp.id}
                  onClick={() => onNavigate(`/blog/${rp.slug}`)}
                  className="pt-3 first:pt-0 cursor-pointer group"
                >
                  <div className="text-[11px] text-indigo-400 font-mono">{rp.category}</div>
                  <h5 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors mt-0.5 line-clamp-2">
                    {rp.title}
                  </h5>
                  <div className="text-[11px] text-slate-500 mt-1">{rp.readTime}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>

    </article>
  );
};
