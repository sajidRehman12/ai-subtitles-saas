import React, { useState, useEffect } from 'react';
import { Check, Sparkles, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Film, Download, CheckCircle2 } from 'lucide-react';
import { downloadFile } from '../utils/subtitles';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

interface PendingDownload {
  title: string;
  resolution: string;
  format: string;
  date: string;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null);
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    // Check if user came from download screen
    const stored = sessionStorage.getItem('pending_video_download');
    if (stored) {
      try {
        setPendingDownload(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const plans = [
    {
      id: 'solo',
      name: 'Solo Creator',
      target: 'For YouTubers, TikTokers & indie creators',
      monthlyPrice: 19,
      annualPrice: 15,
      features: [
        '180 audio minutes per month',
        'Max video duration: 30 minutes',
        'Standard SRT, VTT & TXT downloads',
        '6 viral animation style presets',
        '1080p Full HD video exports',
        'Single user workspace'
      ],
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
        '4K Ultra HD burned-in subtitle export',
        'Batch video queue processor (up to 25 clips)',
        'AI multi-language translation (42 languages)',
        'Custom brand fonts & color palettes',
        'Speaker diarization & auto-censoring',
        '3 team member seats'
      ],
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
      popular: false
    }
  ];

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanModal(planName);
  };

  const handleConfirmPlan = () => {
    // Trigger download completion simulation
    if (pendingDownload) {
      downloadFile(
        `SubFlow Studio Render - ${pendingDownload.title}\nResolution: ${pendingDownload.resolution}\nFormat: ${pendingDownload.format}\nStatus: Master Download Unlocked with ${selectedPlanModal}\nTimestamp: ${new Date().toISOString()}`,
        `${pendingDownload.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_subflow_${pendingDownload.resolution}.txt`
      );
    }
    setDownloadSuccessModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 bg-black text-white selection:bg-white selection:text-black">
      
      {/* Pending Video Download Notice (When redirected from Download Page) */}
      {pendingDownload && (
        <div className="p-6 bg-neutral-950 border border-white/20 rounded-2xl space-y-3 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center shrink-0 mt-0.5">
                <Film className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Subtitled Video Render Ready for Download</span>
                </div>
                <h2 className="text-lg font-bold text-white">
                  "{pendingDownload.title}"
                </h2>
                <p className="text-xs text-neutral-400">
                  Format: <span className="text-white font-mono">{pendingDownload.format}</span> · Target: <span className="text-white font-mono">{pendingDownload.resolution}</span>. 
                  Select a subscription plan below to unlock your download and continue exporting unlimited videos.
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-mono">
                Action Required: Choose Plan
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header & Cadence Toggle */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          {pendingDownload ? 'Step 4 of 4: Activate Plan to Download' : 'Predictable Pricing'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          {pendingDownload ? 'Choose a Plan to Download Your Video' : 'Cinema Subtitles for Video Teams'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Unlock high-speed GPU rendering, remove watermarks, and export unlimited synchronized subtitle masters.
        </p>

        {/* Toggle */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <span className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-neutral-500'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 bg-neutral-900 border border-neutral-750 rounded-full p-1 relative transition-colors focus:outline-none"
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-neutral-500'}`}>
              Annual Billing
            </span>
            <span className="text-[11px] font-semibold text-white bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* 3 Tier Cards: Black Elegance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all ${
                plan.popular
                  ? 'bg-neutral-950 border-white text-white shadow-2xl ring-1 ring-white/30'
                  : 'bg-neutral-950/80 border-neutral-850 hover:border-neutral-700 text-neutral-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  {plan.popular && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-black bg-white px-2 py-0.5 rounded font-bold">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">{plan.target}</p>

                {/* Price Display */}
                <div className="mt-4 pb-4 border-b border-neutral-850 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white tabular-nums">${price}</span>
                  <span className="text-xs text-neutral-400">/ month</span>
                  {billingCycle === 'annual' && (
                    <span className="text-[11px] text-neutral-500 ml-1 tabular-nums">billed annually</span>
                  )}
                </div>

                {/* Features List */}
                <ul className="mt-6 space-y-2.5 text-xs text-neutral-300">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-4 border-t border-neutral-850">
                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                    plan.popular
                      ? 'bg-white hover:bg-neutral-200 text-black shadow-xl active:scale-[0.98]'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-750 active:scale-[0.98]'
                  }`}
                >
                  {pendingDownload ? `Select ${plan.name} & Download` : `Get Started with ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan Selection Modal */}
      {selectedPlanModal && !downloadSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mx-auto">
              <Download className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Confirm {selectedPlanModal} Plan</h3>
              <p className="text-xs text-neutral-400">
                {pendingDownload 
                  ? `Your video "${pendingDownload.title}" (${pendingDownload.resolution}) will begin downloading immediately upon confirmation.`
                  : 'Start your 14-day full feature trial with complete access to all studio tools.'}
              </p>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl text-left text-xs space-y-1.5 font-mono text-neutral-300">
              <div className="flex justify-between">
                <span>Selected Plan:</span>
                <span className="text-white font-bold">{selectedPlanModal}</span>
              </div>
              <div className="flex justify-between">
                <span>Billing Frequency:</span>
                <span className="text-white capitalize">{billingCycle}</span>
              </div>
              {pendingDownload && (
                <div className="flex justify-between pt-1 border-t border-neutral-800 text-emerald-400">
                  <span>Queued Download:</span>
                  <span>{pendingDownload.resolution} · {pendingDownload.format}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleConfirmPlan}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors shadow-xl"
              >
                {pendingDownload ? 'Confirm Plan & Download Video' : 'Confirm Subscription'}
              </button>
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="w-full py-2 text-xs text-neutral-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Success Confirmation Modal */}
      {downloadSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Video Download Unlocked!</h3>
              <p className="text-xs text-neutral-300">
                Your plan <span className="text-white font-semibold">{selectedPlanModal}</span> is now active. Your subtitled video download has been initialized.
              </p>
            </div>

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  sessionStorage.removeItem('pending_video_download');
                  setDownloadSuccessModal(false);
                  setSelectedPlanModal(null);
                  onNavigate('/studio');
                }}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Return to Studio & Edit More Videos
              </button>
              <button
                onClick={() => {
                  sessionStorage.removeItem('pending_video_download');
                  setDownloadSuccessModal(false);
                  setSelectedPlanModal(null);
                  onNavigate('/dashboard');
                }}
                className="w-full py-2 text-xs text-neutral-400 hover:text-white"
              >
                View Project Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
