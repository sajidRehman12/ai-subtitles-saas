import React, { useState } from 'react';
import { CustomTerm, CaptionPresetId } from '../types';
import { INITIAL_CUSTOM_TERMS, AVATAR_PRO_IMG } from '../data/mockData';
import { 
  Building2, Users, BookOpen, Key, Sliders, Plus, 
  Trash2, Copy, Check, Eye, EyeOff, Save, CheckCircle2, Shield
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'dictionary' | 'brand' | 'api'>('dictionary');
  
  // Custom Dictionary State
  const [terms, setTerms] = useState<CustomTerm[]>(INITIAL_CUSTOM_TERMS);
  const [newTerm, setNewTerm] = useState<string>('');
  const [newReplacement, setNewReplacement] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'brand' | 'acronym' | 'person' | 'jargon'>('brand');

  // Brand Kit State
  const [brandColor, setBrandColor] = useState<string>('#FACC15');
  const [defaultPreset, setDefaultPreset] = useState<CaptionPresetId>('hormozi');
  const [autoPunctuation, setAutoPunctuation] = useState<boolean>(true);
  const [censorProfanity, setCensorProfanity] = useState<boolean>(true);

  // API State
  const [apiKey, setApiKey] = useState<string>('sf_live_948f20a7b489c1938d91023e198e04b7');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [webhookUrl, setWebhookUrl] = useState<string>('https://api.acmemedia.com/webhooks/subtitles');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Team Members
  const [members, setMembers] = useState([
    { id: 'm1', name: 'Sarah Jenkins', email: 'sarah@acmemedia.com', role: 'Owner', avatar: AVATAR_PRO_IMG },
    { id: 'm2', name: 'David Cho', email: 'david@acmemedia.com', role: 'Editor', avatar: '' },
    { id: 'm3', name: 'Elena Rostova', email: 'elena@acmemedia.com', role: 'Reviewer', avatar: '' }
  ]);
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [inviteRole, setInviteRole] = useState<string>('Editor');

  const handleAddTerm = () => {
    if (!newTerm.trim()) return;
    const termItem: CustomTerm = {
      id: 'term-' + Date.now(),
      term: newTerm.trim(),
      replacement: newReplacement.trim() || newTerm.trim(),
      category: newCategory
    };
    setTerms(prev => [...prev, termItem]);
    setNewTerm('');
    setNewReplacement('');
  };

  const handleDeleteTerm = (id: string) => {
    setTerms(prev => prev.filter(t => t.id !== id));
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = 'sf_live_' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(newKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    setMembers(prev => [
      ...prev,
      {
        id: 'm-' + Date.now(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail.trim(),
        role: inviteRole,
        avatar: ''
      }
    ]);
    setInviteEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Workspace & Brand Settings</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>Manage team members</span>
            <span aria-hidden="true">·</span>
            <span>Custom phonetic dictionary</span>
            <span aria-hidden="true">·</span>
            <span>Developer API webhooks</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 tabular-nums">
          <span>Plan: <strong className="text-indigo-400 font-semibold">Pro Studio</strong></span>
          <span aria-hidden="true">·</span>
          <span>Workspace ID: <code className="text-slate-300">ws_9921</code></span>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto no-scrollbar pb-1 text-xs">
        {[
          { id: 'dictionary', label: 'Custom Dictionary & Vocabulary', icon: BookOpen },
          { id: 'brand', label: 'Brand Kit & Default Styles', icon: Sliders },
          { id: 'team', label: 'Team Members & Permissions', icon: Users },
          { id: 'api', label: 'API Keys & Webhooks', icon: Key },
          { id: 'profile', label: 'Organization Profile', icon: Building2 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg font-medium whitespace-nowrap transition-colors border-b-2 -mb-1 ${
                isActive
                  ? 'border-indigo-500 text-white bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-indigo-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Custom Dictionary & Phonetic Vocabulary */}
      {activeTab === 'dictionary' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-white">Custom Speech Vocabulary</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Add proprietary product names, technical jargon, brand handles, and acronyms. 
                SubFlow prioritizes these phonetic tokens during Whisper transcription to guarantee 100% spelling precision.
              </p>
            </div>

            {/* Add new term form */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Spoken Term / Audio Sound</label>
                <input
                  type="text"
                  placeholder="e.g. SubFlow"
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Exact Replacement Text</label>
                <input
                  type="text"
                  placeholder="e.g. SubFlow AI"
                  value={newReplacement}
                  onChange={(e) => setNewReplacement(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="brand">Brand / Product</option>
                  <option value="acronym">Acronym / Abbreviation</option>
                  <option value="jargon">Technical Jargon</option>
                  <option value="person">Person / Name</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleAddTerm}
                  disabled={!newTerm.trim()}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Term</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dictionary Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Spoken Word / Pattern</th>
                  <th className="py-3 px-4">Correct Subtitle Spelling</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {terms.map(t => (
                  <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-300">{t.term}</td>
                    <td className="py-3 px-4 font-semibold text-white">{t.replacement || t.term}</td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-indigo-400">{t.category}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteTerm(t.id)}
                        className="p-1 hover:text-rose-400 text-slate-500 rounded"
                        title="Delete term"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Brand Kit & Default Styles */}
      {activeTab === 'brand' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-white">Brand Kit & Caption Standards</h2>
            <p className="text-xs text-slate-400 mt-1">
              Configure brand typography, default caption presets, and automated punctuation rules applied to all team projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Default Preset for New Videos</label>
                <select
                  value={defaultPreset}
                  onChange={(e) => setDefaultPreset(e.target.value as CaptionPresetId)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                >
                  <option value="hormozi">Hormozi Kinetic Punch (Yellow Pop)</option>
                  <option value="netflix">Netflix Cinema Standard</option>
                  <option value="karaoke">Karaoke Emerald Wave</option>
                  <option value="cyber">Cyberpunk Neon Monospace</option>
                  <option value="minimal">Minimal Modern Sans</option>
                  <option value="bilingual">Bilingual Dual Track</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Primary Brand Highlight Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="punct"
                  checked={autoPunctuation}
                  onChange={(e) => setAutoPunctuation(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-indigo-600"
                />
                <label htmlFor="punct" className="text-xs text-slate-300 cursor-pointer">
                  Strict grammatical auto-punctuation (commas, periods, question marks)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="censor"
                  checked={censorProfanity}
                  onChange={(e) => setCensorProfanity(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-indigo-600"
                />
                <label htmlFor="censor" className="text-xs text-slate-300 cursor-pointer">
                  Auto-censor sensitive language with asterisks (f***)
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                setSavedSuccess(true);
                setTimeout(() => setSavedSuccess(false), 2000);
              }}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'Settings Saved!' : 'Save Brand Settings'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Team Members & Permissions */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-white">Invite Team Member</h2>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="colleague@acmemedia.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full sm:w-80 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Reviewer">Reviewer (Read-Only)</option>
              </select>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail.trim()}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap"
              >
                Send Invite
              </button>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {members.map(m => (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-white flex items-center gap-2.5">
                      {m.avatar ? (
                        <img src={m.avatar} alt={m.name} referrerPolicy="no-referrer" className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-indigo-400">
                          {m.name[0]}
                        </div>
                      )}
                      <span>{m.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{m.email}</td>
                    <td className="py-3 px-4">
                      <span className="text-indigo-400 font-medium">{m.role}</span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-400">
                      {m.role === 'Owner' ? 'Full Authority' : 'Edit & Export'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: API Keys & Webhooks */}
      {activeTab === 'api' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-400" />
              <span>Developer REST API Access</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Trigger asynchronous subtitle generation and fetch WebVTT/SRT files directly via HTTP curl or SDK.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Production Secret Key</label>
              <div className="flex items-center gap-2">
                <input
                  type={showKey ? 'text' : 'password'}
                  readOnly
                  value={apiKey}
                  className="w-full max-w-lg px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-indigo-300 focus:outline-none"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                  title="Toggle visibility"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleCopyKey}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleRegenerateKey}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Regenerate
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Asynchronous Completion Webhook URL</label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full max-w-lg px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                SubFlow will dispatch an HTTP POST payload with timed cue JSON when batch transcription finishes.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="text-slate-500"># Sample API cURL:</span>
              <br />
              curl -X POST https://api.subflow.ai/v1/transcribe \<br />
              &nbsp;&nbsp;-H "Authorization: Bearer {showKey ? apiKey : 'sf_live_...'}" \<br />
              &nbsp;&nbsp;-F "video=@interview.mp4" -F "preset=hormozi"
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Organization Profile */}
      {activeTab === 'profile' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-bold text-white">Organization Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Company / Studio Name</label>
              <input
                type="text"
                defaultValue="Acme Media Productions"
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Billing Email</label>
              <input
                type="email"
                defaultValue="billing@acmemedia.com"
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
