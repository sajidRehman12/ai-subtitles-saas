import React, { useState, useEffect } from 'react';
import { VideoProject, ActiveVideoData } from './types';
import { SAMPLE_VIDEOS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { HomeBlogPage } from './pages/HomeBlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { StudioPage } from './pages/StudioPage';
import { ProcessingCompletePage } from './pages/ProcessingCompletePage';
import { DownloadPage } from './pages/DownloadPage';
import { DashboardPage } from './pages/DashboardPage';
import { BatchPage } from './pages/BatchPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { TranslationPage } from './pages/TranslationPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PricingPage } from './pages/PricingPage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdSensePage } from './pages/AdSensePage';

export default function App() {
  // Sync state with browser URL path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname;
    }
    return '/';
  });

  // Shared active video state across upload -> ready -> download -> pricing
  const [activeVideoData, setActiveVideoData] = useState<ActiveVideoData>({
    title: SAMPLE_VIDEOS[0].title,
    videoUrl: SAMPLE_VIDEOS[0].videoUrl,
    duration: SAMPLE_VIDEOS[0].duration,
    cues: SAMPLE_VIDEOS[0].initialCues,
    stylePreset: 'hormozi',
    language: 'English (US)',
    accuracy: 99.4
  });

  // Listen to browser Back/Forward popstate events
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic path navigator that changes the browser URL
  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenProject = (project: VideoProject) => {
    setActiveVideoData({
      title: project.title,
      videoUrl: project.videoUrl,
      duration: project.duration,
      cues: project.cues,
      stylePreset: project.stylePreset,
      language: project.language,
      accuracy: project.accuracy
    });
    navigate('/studio');
  };

  // Render appropriate view based on current URL path
  const renderCurrentView = () => {
    // 1. Blog Article Details Page: /blog/:slug
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
      return <ArticlePage slug={slug} onNavigate={navigate} />;
    }

    // 2. Pricing page (handles /pricing or /pricing?reason=...)
    if (currentPath.startsWith('/pricing')) {
      return <PricingPage onNavigate={navigate} />;
    }

    // 3. Main multi-page routes
    switch (currentPath) {
      case '/studio':
        return (
          <StudioPage
            onNavigate={navigate}
            onUpdateVideoData={setActiveVideoData}
          />
        );
      case '/ready':
      case '/processing-complete':
        return (
          <ProcessingCompletePage
            videoData={activeVideoData}
            onNavigate={navigate}
          />
        );
      case '/download':
        return (
          <DownloadPage
            videoData={activeVideoData}
            onNavigate={navigate}
            onInitiateDownload={() => {}}
          />
        );
      case '/dashboard':
        return (
          <DashboardPage
            onOpenProject={handleOpenProject}
            onNavigate={navigate}
          />
        );
      case '/batch':
        return <BatchPage />;
      case '/styles':
        return <TemplatesPage onNavigate={navigate} />;
      case '/translate':
        return <TranslationPage />;
      case '/analytics':
        return <AnalyticsPage />;
      case '/settings':
        return <SettingsPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      case '/adsense':
        return <AdSensePage onNavigate={navigate} />;
      case '/blog':
        return <HomeBlogPage onNavigate={navigate} />;
      case '/':
      default:
        return (
          <LandingPage 
            onNavigate={navigate} 
            onUpdateVideoData={setActiveVideoData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Top Navigation conforming to Top Bar Contract */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Main Viewport Workspace */}
      <main className="flex-1 pb-16">
        {renderCurrentView()}
      </main>

      {/* Clean Black Elegance Footer */}
      <Footer onNavigate={navigate} currentPath={currentPath} />
    </div>
  );
}
