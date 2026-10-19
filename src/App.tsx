import React, { useState } from 'react';
import { PageId, VideoProject } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StudioPage } from './pages/StudioPage';
import { DashboardPage } from './pages/DashboardPage';
import { BatchPage } from './pages/BatchPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { TranslationPage } from './pages/TranslationPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PricingPage } from './pages/PricingPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('studio');

  const handleOpenProject = (project: VideoProject) => {
    // Open project in Studio
    setCurrentPage('studio');
  };

  const handleNewUpload = () => {
    setCurrentPage('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation conforming to Top Bar Contract */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        onNewUpload={handleNewUpload}
      />

      {/* Main Viewport Workspace */}
      <main className="flex-1 pb-16">
        {currentPage === 'studio' && <StudioPage />}
        {currentPage === 'dashboard' && (
          <DashboardPage
            onOpenProject={handleOpenProject}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'batch' && <BatchPage />}
        {currentPage === 'templates' && (
          <TemplatesPage onNavigate={setCurrentPage} />
        )}
        {currentPage === 'translation' && <TranslationPage />}
        {currentPage === 'analytics' && <AnalyticsPage />}
        {currentPage === 'pricing' && <PricingPage onNavigate={setCurrentPage} />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>

      {/* Clean Unpretentious Footer */}
      <Footer onSelectPage={setCurrentPage} />
    </div>
  );
}
