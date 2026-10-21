import React, { useState } from 'react';
import { 
  DollarSign, ShieldCheck, CheckCircle2, Copy, 
  ExternalLink, Sparkles, HelpCircle, AlertCircle, Save
} from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface AdSensePageProps {
  onNavigate: (path: string) => void;
}

export const AdSensePage: React.FC<AdSensePageProps> = ({ onNavigate }) => {
  const [publisherId, setPublisherId] = useState<string>(() => {
    return localStorage.getItem('subflow_adsense_pub_id') || 'ca-pub-0000000000000000';
  });
  const [autoAdsEnabled, setAutoAdsEnabled] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleSave = () => {
    localStorage.setItem('subflow_adsense_pub_id', publisherId.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const adSenseScriptSnippet = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}" crossorigin="anonymous"></script>`;

  const copyScript = () => {
    navigator.clipboard.writeText(adSenseScriptSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <span>Google AdSense Monetization Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure your publisher ID, verify compliance checklist, and display high-CTR responsive ads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.google.com/adsense"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            <span>Open AdSense Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Publisher ID Configuration Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white">1. Configure Your Google Publisher ID</h2>
        <p className="text-xs text-slate-400">
          Paste your 16-digit Google AdSense Publisher ID below. SubFlow AI will automatically inject it into all responsive ad units across your blog, studio, and article pages.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
          <div className="w-full">
            <label className="text-xs text-slate-300 font-medium block mb-1">AdSense Publisher ID</label>
            <input
              type="text"
              placeholder="ca-pub-1234567890123456"
              value={publisherId}
              onChange={(e) => setPublisherId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-full sm:w-auto sm:self-end">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'Saved!' : 'Save ID'}</span>
            </button>
          </div>
        </div>

        {/* Script snippet preview */}
        <div className="pt-3">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>Header Script Tag (Auto-generated):</span>
            <button
              onClick={copyScript}
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedCode ? 'Copied!' : 'Copy Snippet'}</span>
            </button>
          </div>
          <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
            {adSenseScriptSnippet}
          </pre>
        </div>
      </div>

      {/* AdSense Approval Readiness Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>2. Google AdSense Approval Compliance Checklist</span>
        </h2>
        <p className="text-xs text-slate-400">
          This application has been structured specifically to pass Google AdSense policy review:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {[
            {
              title: 'Substantial Original Editorial Content',
              status: 'Ready',
              desc: 'Rich blog frontpage and 5 deep-dive technical articles explaining video acoustic pipelines, retention data, and formats.'
            },
            {
              title: 'Clear Multi-Page Navigation with Real URLs',
              status: 'Ready',
              desc: 'HTML5 History API URL routing ensures every page has its own unique, shareable, indexable URL.'
            },
            {
              title: 'Authorized ads.txt File',
              status: 'Configured',
              desc: 'Public /ads.txt file created in root public directory, ready for Google crawler validation.'
            },
            {
              title: 'AdSense-Compliant Privacy Policy',
              status: 'Ready',
              desc: 'Includes mandatory Google DoubleClick DART cookie and third-party advertising disclosures on /privacy.'
            },
            {
              title: 'Terms of Service Page',
              status: 'Ready',
              desc: 'Clear SaaS service agreements and intellectual property terms provided on /terms.'
            },
            {
              title: 'Clean Ad Labeling (Anti-Misleading)',
              status: 'Enforced',
              desc: 'Every ad container explicitly states "Advertisement" in compliant uppercase text per Google guidelines.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{item.title}</span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.status}</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Ad Slot Preview Demo */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white">3. Live Ad Slot Preview</h2>
        <p className="text-xs text-slate-400">
          Here is how responsive leaderboard and rectangle banners render across your blog and articles:
        </p>

        <div className="pt-2 space-y-6">
          <div>
            <div className="text-xs font-semibold text-slate-300 mb-2">Horizontal Leaderboard (728x90 responsive)</div>
            <AdSenseBanner slot="1001-leaderboard" format="horizontal" publisherId={publisherId} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-2">In-Article Content Rectangle (300x250)</div>
              <AdSenseBanner slot="2002-article-rectangle" format="rectangle" publisherId={publisherId} />
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex flex-col justify-center text-xs text-slate-400 space-y-2">
              <div className="font-bold text-white">AdSense Placement Best Practices:</div>
              <p>• Place leaderboard banners below the top navigation to maintain high viewability.</p>
              <p>• Embed rectangle units mid-article between major section headings.</p>
              <p>• Avoid placing ads immediately adjacent to clickable video player buttons.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
