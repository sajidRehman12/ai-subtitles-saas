import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface PricingPageProps {
  onNavigate: (page: PageId) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);

  const plans = [
    {
      id: 'solo',
      name: 'Solo Creator',
      target: 'For YouTubers, TikTokers & indie podcasters',
      monthlyPrice: 19,
      annualPrice: 15,
      features: [
        '180 audio minutes per month',
        'Max video duration: 30 minutes',
        'Standard SRT, VTT & TXT downloads',
        '6 viral animation style presets',
        '1080p subtitle preview rendering',
        'Single user workspace'
      ],
      cta: 'Start with Solo',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Studio',
      target: 'For scaling agencies & high-volume media teams',
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        '900 audio minutes per month',
        'Max video duration: 180 minutes',
        '4K burned-in subtitle export',
        'Batch video queue processor (up to 25 clips)',
        'AI multi-language translation (42 languages)',
        'Custom brand fonts & color palettes',
        'Speaker diarization & auto-censoring',
        '3 team member seats'
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise & Media',
      target: 'For broadcast networks & high-volume operations',
      monthlyPrice: 199,
      annualPrice: 159,
      features: [
        'Unlimited audio processing minutes',
        'High-concurrency batch processing (100+ files)',
        'Full REST API & webhook callbacks',
        'Custom acoustic vocabulary & dictionary fine-tuning',
        'Unlimited team seats with role permissions',
        '99.9% processing SLA with dedicated GPU queue',
        'SOC2 Type II security compliance'
      ],
      cta: 'Contact Enterprise Sales',
      popular: false
    }
  ];

  const comparisonMatrix = [
    { feature: 'Monthly Spoken Minutes', solo: '180 min', pro: '900 min', enterprise: 'Unlimited' },
    { feature: 'Max Single File Duration', solo: '30 min', pro: '180 min', enterprise: 'Unlimited' },
    { feature: 'Batch Video Queue Limit', solo: '1 video at a time', pro: '25 videos simultaneous', enterprise: '100+ simultaneous' },
    { feature: 'Export Formats', solo: 'SRT, VTT, TXT', pro: 'SRT, VTT, TXT, Burned MP4', enterprise: 'All + JSON + Webhooks' },
    { feature: 'Export Resolution', solo: '1080p HD', pro: '4K Ultra HD', enterprise: 'Uncompressed 8K' },
    { feature: 'AI Languages Supported', solo: 'English only', pro: '42+ languages', enterprise: '42+ languages' },
    { feature: 'Custom Brand Typography', solo: 'Standard library', pro: 'Upload TTF/WOFF2', enterprise: 'Custom Brand Kit' },
    { feature: 'Custom Industry Vocabulary', solo: '5 terms', pro: '100 terms', enterprise: 'Unlimited terms' },
    { feature: 'REST API & Webhooks', solo: 'Not available', pro: '10,000 requests/mo', enterprise: 'Unlimited with dedicated key' },
    { feature: 'Workspace Seats', solo: '1 seat', pro: '3 seats included', enterprise: 'Unlimited seats' }
  ];

  const faqs = [
    {
      q: 'How does SubFlow synchronize word-level timestamps so accurately?',
      a: 'We run OpenAI Whisper-v3 combined with dynamic phonetic alignment (CTC segmentation). This aligns speech acoustic phonemes directly with video frames to achieve millisecond-exact word timing for kinetic bounce and karaoke effects.'
    },
    {
      q: 'Can I upload videos with heavy background music or outdoor noise?',
      a: 'Yes. SubFlow automatically runs acoustic source separation (vocal isolation) before transcribing, keeping word error rates below 1.5% even across noisy street interviews or background tracks.'
    },
    {
      q: 'Will exported SRT/VTT files work with Premiere, DaVinci, and YouTube?',
      a: 'Yes. Our SRT and VTT files strictly adhere to universal SubRip and WebVTT standards. They import directly into Premiere Pro, DaVinci Resolve, Final Cut Pro, Avid, YouTube Studio, and Vimeo.'
    },
    {
      q: 'What happens if I exceed my monthly minute quota?',
      a: 'You can top up additional minutes anytime at $0.05/min or instantly upgrade to the next tier without interrupting your processing queue.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      
      {/* Header & Cadence Toggle */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Predictable Pricing for High-Performance Captions
        </h1>
        <p className="text-sm text-slate-400">
          Turn hours of manual transcription into instant, viral-ready subtitles. No hidden fees. Cancel anytime.
        </p>

        {/* Toggle */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <span className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 bg-slate-800 rounded-full p-1 relative transition-colors focus:outline-none"
          >
            <div
              className={`w-4 h-4 bg-indigo-500 rounded-full transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
              Annual Billing
            </span>
            <span className="text-[11px] font-semibold text-emerald-400">Save 20%</span>
          </div>
        </div>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all ${
                plan.popular
                  ? 'bg-slate-900/90 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  {plan.popular && (
                    <span className="text-xs font-semibold text-indigo-300">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.target}</p>

                {/* Price Display */}
                <div className="mt-4 pb-4 border-b border-slate-800 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white tabular-nums">${price}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                  {billingCycle === 'annual' && (
                    <span className="text-[11px] text-slate-500 ml-1 tabular-nums">billed annually</span>
                  )}
                </div>

                {/* Features List */}
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedPlanModal(plan.name)}
                  className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg transition-all ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mt-12">
        <div className="p-4 border-b border-slate-800 bg-slate-950">
          <h2 className="text-sm font-bold text-white">Full Feature Limits & Technical Comparison</h2>
          <p className="text-xs text-slate-400 mt-0.5">Concrete specifications and allowances across each tier</p>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 w-1/3">Capability</th>
              <th className="py-3 px-4">Solo</th>
              <th className="py-3 px-4">Pro Studio</th>
              <th className="py-3 px-4">Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {comparisonMatrix.map((row, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-200">{row.feature}</td>
                <td className="py-3 px-4 text-slate-400 tabular-nums">{row.solo}</td>
                <td className="py-3 px-4 text-indigo-300 font-medium tabular-nums">{row.pro}</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold tabular-nums">{row.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4 pt-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-1">Everything you need to know about transcription accuracy and formats</p>
        </div>

        <div className="divide-y divide-slate-800 border-y border-slate-800 mt-6">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Plan Selection Confirmation Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-6 space-y-4 text-center">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Subscribe to {selectedPlanModal}</h3>
            <p className="text-xs text-slate-400">
              You are selecting the {selectedPlanModal} tier on {billingCycle} billing. Your trial includes 14 days of full feature access.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setSelectedPlanModal(null);
                  onNavigate('studio');
                }}
                className="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
              >
                Confirm & Launch Studio
              </button>
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="w-full py-2 text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
