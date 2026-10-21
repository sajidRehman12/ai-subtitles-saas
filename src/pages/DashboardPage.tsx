import React, { useState } from 'react';
import { VideoProject, PageId } from '../types';
import { INITIAL_PROJECTS, SUPPORTED_LANGUAGES } from '../data/mockData';
import { formatPlayerTime, generateSrt, downloadFile } from '../utils/subtitles';
import { 
  Search, Filter, Plus, Play, Download, Trash2, 
  Copy, CheckCircle2, Clock, Globe, ArrowUpRight,
  Sparkles, FileText, LayoutGrid, List
} from 'lucide-react';

interface DashboardPageProps {
  onOpenProject: (project: VideoProject) => void;
  onNavigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onOpenProject, onNavigate }) => {
  const [projects, setProjects] = useState<VideoProject[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [newProjectModal, setNewProjectModal] = useState<boolean>(false);
  const [newProjectTitle, setNewProjectTitle] = useState<string>('');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchesLang = selectedLanguage === 'all' || p.language.includes(selectedLanguage);
    return matchesSearch && matchesStatus && matchesLang;
  });

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleDuplicate = (project: VideoProject) => {
    const copy: VideoProject = {
      ...project,
      id: 'proj-' + Date.now(),
      title: `${project.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects(prev => [copy, ...prev]);
  };

  const handleExportQuick = (project: VideoProject) => {
    const srt = generateSrt(project.cues);
    downloadFile(srt, `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.srt`);
  };

  const handleCreateNew = () => {
    if (!newProjectTitle.trim()) return;
    const newProj: VideoProject = {
      id: 'proj-' + Date.now(),
      title: newProjectTitle.trim(),
      videoUrl: INITIAL_PROJECTS[0].videoUrl,
      thumbnailUrl: INITIAL_PROJECTS[0].thumbnailUrl,
      duration: 60,
      language: 'English (US)',
      status: 'completed',
      wordsCount: 140,
      accuracy: 99.2,
      cues: INITIAL_PROJECTS[0].cues,
      stylePreset: 'hormozi',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects(prev => [newProj, ...prev]);
    setNewProjectTitle('');
    setNewProjectModal(false);
    onOpenProject(newProj);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Video Projects</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>Manage subtitle tracks</span>
            <span aria-hidden="true">·</span>
            <span>Synchronized video library</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300 tabular-nums">{projects.length} Total Projects</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/batch')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Batch Upload</span>
          </button>
          <button
            onClick={() => setNewProjectModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* KPI 4-Column Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-xs text-slate-400 font-medium">Total Videos Processed</div>
          <div className="text-2xl font-bold text-white mt-1 tabular-nums">48 videos</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <span>+12 videos this month</span>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-xs text-slate-400 font-medium">Total Audio Duration</div>
          <div className="text-2xl font-bold text-white mt-1 tabular-nums">642 min</div>
          <div className="text-[11px] text-slate-400 mt-1">10.7 hours synchronized</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-xs text-slate-400 font-medium">Whisper-v3 Accuracy</div>
          <div className="text-2xl font-bold text-white mt-1 tabular-nums">99.3%</div>
          <div className="text-[11px] text-emerald-400 mt-1">Industry-leading WER: 0.7%</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-xs text-slate-400 font-medium">Plan Storage Quota</div>
          <div className="text-2xl font-bold text-white mt-1 tabular-nums">14.2 / 50 hrs</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: '28.4%' }} />
          </div>
        </div>
      </div>

      {/* Search, Status and View Filters Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter buttons & View toggles */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Status buttons */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {['all', 'completed', 'processing', 'draft'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded capitalize font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-slate-400">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'hover:text-white'}`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-slate-800 text-white' : 'hover:text-white'}`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group"
            >
              {/* Thumbnail with overlay duration */}
              <div 
                onClick={() => onOpenProject(project)}
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Duration */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[11px] font-mono text-white tabular-nums">
                  {formatPlayerTime(project.duration)}
                </div>

                {/* Status indicator unboxed text */}
                <div className="absolute top-2 left-2 text-[11px] font-medium px-2 py-0.5 rounded bg-black/60 text-slate-200">
                  {project.status === 'completed' && <span className="text-emerald-400 font-semibold">Completed</span>}
                  {project.status === 'processing' && <span className="text-amber-400 font-semibold">Transcribing...</span>}
                  {project.status === 'draft' && <span className="text-slate-400">Draft</span>}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={() => onOpenProject(project)}
                    className="font-bold text-white text-sm hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1"
                  >
                    {project.title}
                  </h3>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 tabular-nums">
                    <span>{project.language}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.wordsCount} words</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400">{project.accuracy}% accuracy</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onOpenProject(project)}
                    className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Edit Subtitles</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 text-slate-400">
                    <button
                      onClick={() => handleExportQuick(project)}
                      title="Quick export .SRT"
                      className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(project)}
                      title="Duplicate project"
                      className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      title="Delete project"
                      className="p-1 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* High-Density SaaS Table View */
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Words</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProjects.map(project => (
                <tr key={project.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                    <span 
                      onClick={() => onOpenProject(project)}
                      className="cursor-pointer hover:text-indigo-400 transition-colors"
                    >
                      {project.title}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{project.language}</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-slate-400">{formatPlayerTime(project.duration)}</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-slate-400">{project.wordsCount}</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-emerald-400">{project.accuracy}%</td>
                  <td className="py-3 px-4">
                    <span className="capitalize text-slate-300">{project.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenProject(project)}
                        className="px-2.5 py-1 rounded bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => handleExportQuick(project)}
                        className="p-1 hover:text-white rounded"
                        title="Export SRT"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1 hover:text-rose-400 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Project Modal */}
      {newProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Create New Subtitle Project</h3>
            <p className="text-xs text-slate-400">
              Enter your video title to start transcribing speech and generating kinetic subtitles.
            </p>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Project Name</label>
              <input
                type="text"
                placeholder="e.g. YouTube Video - How to Build SaaS"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setNewProjectModal(false)}
                className="px-3 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNew}
                disabled={!newProjectTitle.trim()}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
