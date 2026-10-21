import React from 'react';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">Legal Compliance</div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <span>Last Updated: March 2026</span>
          <span aria-hidden="true">·</span>
          <span>Google AdSense & GDPR/CCPA Compliant</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Introduction</h2>
          <p>
            Welcome to SubFlow AI ("we," "our," or "us"). We provide an automated video subtitle generation, transcription, and translation platform. We respect the privacy of our visitors and registered users and are committed to protecting it through our compliance with this policy.
          </p>
        </section>

        {/* Mandatory Google AdSense Cookie Disclosure */}
        <section className="space-y-3 p-4 bg-slate-900 border border-indigo-500/30 rounded-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>2. Google AdSense & Third-Party Advertising Disclosures</span>
          </h2>
          <p>
            We use Google AdSense to serve advertisements when you visit our website. Google, as a third-party vendor, uses cookies to serve ads on SubFlow AI.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>
              <strong>Advertising Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve advertisements to our users based on their visits to SubFlow AI and/or other websites across the Internet.
            </li>
            <li>
              <strong>DoubleClick DART Cookie:</strong> The DoubleClick cookie is used by Google in the ads served on publisher websites displaying AdSense ads. When users visit our site, a cookie may be dropped on that end user's browser.
            </li>
            <li>
              <strong>Opting Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Google Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">www.aboutads.info</a>.
            </li>
          </ul>
        </section>

        {/* Mid-content AdSense slot */}
        <AdSenseBanner slot="3001-privacy-banner" format="horizontal" />

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Information We Collect</h2>
          <p>
            When you use SubFlow AI, we may collect information about you:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Video & Audio Content:</strong> Videos uploaded to generate subtitle tracks are processed in ephemeral GPU memory and deleted after processing according to your storage retention settings.</li>
            <li><strong>Log and Usage Data:</strong> IP addresses, browser types, device identifiers, and pages visited.</li>
            <li><strong>Cookies and Web Beacons:</strong> To remember your workspace preferences, font choices, and authentication status.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. GDPR and California Privacy Rights (CCPA)</h2>
          <p>
            If you are a resident of the European Economic Area (EEA) or California, you possess specific data protection rights:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right to rectification if that information is inaccurate.</li>
            <li>The right to object to our processing of your personal data.</li>
            <li>The right to data portability.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy or our advertising practices, please contact our Data Protection Officer at: <code className="text-indigo-300">privacy@subflow.ai</code>.
          </p>
        </section>
      </div>

    </div>
  );
};
