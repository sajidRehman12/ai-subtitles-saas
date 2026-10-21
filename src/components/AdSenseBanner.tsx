import React, { useEffect, useRef } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdSenseBannerProps {
  slot: string;
  format?: 'horizontal' | 'rectangle' | 'vertical' | 'in-article';
  className?: string;
  publisherId?: string;
  enabled?: boolean;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slot,
  format = 'horizontal',
  className = '',
  publisherId = 'ca-pub-0000000000000000',
  enabled = true
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    // Only attempt live script call if real client ID is configured and in production window
    if (enabled && publisherId && !publisherId.includes('0000000000000000') && !isLoadedRef.current) {
      try {
        if (typeof window !== 'undefined') {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          isLoadedRef.current = true;
        }
      } catch (e) {
        // Suppress local adblocker or sandbox warnings
      }
    }
  }, [enabled, publisherId, slot]);

  // Dimension classes based on ad format
  const getContainerStyle = () => {
    switch (format) {
      case 'horizontal':
        return 'w-full min-h-[90px] max-h-[120px] max-w-4xl mx-auto';
      case 'rectangle':
        return 'w-[300px] sm:w-[336px] min-h-[250px] mx-auto';
      case 'vertical':
        return 'w-[300px] min-h-[600px]';
      case 'in-article':
        return 'w-full min-h-[120px] max-w-2xl my-6 mx-auto';
      default:
        return 'w-full min-h-[90px]';
    }
  };

  const isConfigured = publisherId && !publisherId.includes('0000000000000000');

  return (
    <div className={`my-4 ${getContainerStyle()} ${className}`}>
      {/* Google AdSense Policy requires clear unboxed advertisement labeling */}
      <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-neutral-500 mb-1 px-1">
        <span>Advertisement</span>
        <span className="text-[9px] text-neutral-600">Google AdSense Partner</span>
      </div>

      <div 
        ref={adRef}
        className="w-full h-full min-h-[90px] rounded-lg border border-neutral-850 bg-neutral-950/40 p-2 flex flex-col items-center justify-center text-center relative overflow-hidden group"
      >
        {isConfigured ? (
          /* Live Google AdSense Ins Element */
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={publisherId}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          /* Development / Preview Mode Display */
          <div className="p-4 space-y-1.5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              <span>AdSense Responsive Unit · Slot #{slot}</span>
            </div>
            <p className="text-[11px] text-neutral-500 max-w-md">
              Target Slot: <code className="text-neutral-400 font-mono">{format} ({slot})</code>. Live ads display once your Publisher ID is verified.
            </p>
            <a
              href="/adsense"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/adsense');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-[11px] text-white hover:text-neutral-300 underline underline-offset-2 flex items-center gap-1 font-medium mt-1 transition-colors"
            >
              <span>Configure AdSense ID</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
