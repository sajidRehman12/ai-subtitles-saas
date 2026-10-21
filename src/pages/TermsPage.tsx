import React from 'react';
import { FileCheck, ShieldAlert } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">Legal Terms</div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Terms of Service</h1>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <span>Effective Date: March 2026</span>
          <span aria-hidden="true">·</span>
          <span>SubFlow AI Enterprise Agreement</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using SubFlow AI, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Video Ownership & Intellectual Property</h2>
          <p>
            You retain 100% full ownership, rights, and title to all video files, audio tracks, and transcripts you upload to SubFlow AI. We claim no intellectual property rights over the media you process.
          </p>
        </section>

        <AdSenseBanner slot="3002-terms-banner" format="horizontal" />

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Acceptable Use Policy</h2>
          <p>
            You agree not to use the Service to generate subtitles for defamatory, illegal, infringing, or malicious content. We reserve the right to suspend accounts that violate international copyright standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Subscription Billing & Cancellations</h2>
          <p>
            Paid subscriptions renew automatically at the specified monthly or annual billing cycle unless cancelled prior to the renewal date. You may cancel your subscription at any time via the Workspace Settings dashboard.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Limitation of Liability</h2>
          <p>
            SubFlow AI and its suppliers shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the automated transcription services.
          </p>
        </section>
      </div>

    </div>
  );
};
