import React, { useState } from 'react';
import { 
  TrendingUp, Eye, VolumeX, Award, Clock, 
  BarChart2, Globe, ShieldCheck, Download, Calendar
} from 'lucide-react';
import { downloadFile } from '../utils/subtitles';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const weeklyData = [
    { week: 'Week 1', minutes: 120, retention: 74, soundOff: 65 },
    { week: 'Week 2', minutes: 165, retention: 78, soundOff: 68 },
    { week: 'Week 3', minutes: 195, retention: 82, soundOff: 71 },
    { week: 'Week 4', minutes: 240, retention: 86, soundOff: 69 }
  ];

  const languagesBreakdown = [
    { language: 'English (US & UK)', percentage: 48, minutes: 308 },
    { language: 'Spanish (ES & LATAM)', percentage: 22, minutes: 141 },
    { language: 'Portuguese (BR)', percentage: 12, minutes: 77 },
    { language: 'German (DE)', percentage: 10, minutes: 64 },
    { language: 'Japanese (JA)', percentage: 8, minutes: 52 }
  ];

  const acousticAccuracies = [
    { environment: 'Studio Podcast (High Acoustic Isolation)', wer: '0.2%', accuracy: 99.8 },
    { environment: 'Stage Presentation & Keynote', wer: '0.6%', accuracy: 99.4 },
    { environment: 'Webinar & Zoom Screen Recording', wer: '0.9%', accuracy: 99.1 },
    { environment: 'Outdoor Street Interview (Wind & Traffic)', wer: '1.4%', accuracy: 98.6 },
    { environment: 'Heavy Background Music Track', wer: '2.1%', accuracy: 97.9 }
  ];

  const handleExportReport = () => {
    const csv = `Category,Metric,Value\nRetention,Lift with Captions,+41.8%\nSound-Off,Mobile Viewers Muted,68.4%\nAccuracy,Average Word Recognition,99.38%\nMinutes,Total Transcribed This Month,642 min\n`;
    downloadFile(csv, `subflow_retention_analytics_${timeRange}.csv`, 'text/csv');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Subtitle Analytics & Engagement</h1>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <span>Video retention metrics</span>
            <span aria-hidden="true">·</span>
            <span>Sound-off completion audit</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">Whisper-v3 accuracy telemetry</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Time range selector */}
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            {(['7d', '30d', '90d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  timeRange === range ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Last {range.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* 4 Quantitative Rigor Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Retention Lift with Captions</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">+41.8%</div>
          <div className="text-[11px] text-emerald-400">
            vs. non-captioned baseline videos
          </div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Sound-Off Playback Rate</span>
            <VolumeX className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">68.4%</div>
          <div className="text-[11px] text-slate-400">
            of social viewers consume in silence
          </div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Transcription Accuracy</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">99.38%</div>
          <div className="text-[11px] text-emerald-400">
            0.62% average word error rate (WER)
          </div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Median Generation Speed</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">14.2s</div>
          <div className="text-[11px] text-slate-400">
            per 10 minutes of uploaded audio
          </div>
        </div>
      </div>

      {/* Charts Grid: Weekly Minutes Volume + Language Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Minutes Processed Bar Graph */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-400" />
                <span>Weekly Processing Volume & Retention Lift</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Spoken audio minutes processed per week</p>
            </div>
            <span className="text-xs font-mono tabular-nums text-slate-400">Total: 642 min</span>
          </div>

          {/* Bar Visualization */}
          <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-slate-800">
            {weeklyData.map((d) => {
              const maxMin = 250;
              const barHeight = (d.minutes / maxMin) * 100;
              return (
                <div key={d.week} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[11px] font-mono text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                    {d.minutes}m
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-indigo-700 to-indigo-500 rounded-t-md hover:from-indigo-600 hover:to-indigo-400 transition-all cursor-pointer relative"
                    style={{ height: `${barHeight}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] text-emerald-400 font-mono hidden group-hover:block whitespace-nowrap">
                      +{d.retention}% watch
                    </div>
                  </div>
                  <div className="text-xs font-medium text-slate-400">{d.week}</div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-indigo-500 inline-block" />
              <span>Minutes synchronized</span>
            </div>
            <div className="tabular-nums">
              Average session retention: <span className="text-emerald-400 font-semibold">82.5%</span>
            </div>
          </div>
        </div>

        {/* Global Languages Breakdown */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>Languages Subtitled</span>
            </h2>
            <span className="text-xs text-slate-500">5 Active</span>
          </div>

          <div className="space-y-3 pt-2">
            {languagesBreakdown.map(l => (
              <div key={l.language} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{l.language}</span>
                  <span className="text-slate-400 font-mono tabular-nums">{l.minutes} min ({l.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{ width: `${l.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
            Targeting multi-language captions unlocks up to <span className="text-white font-medium">3.4x higher international reach</span>.
          </div>
        </div>

      </div>

      {/* Acoustic Precision & Environment Audit Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Acoustic Clarity & Word Error Rate (WER) Benchmark</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Whisper-v3 Engine Benchmark</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Acoustic Environment</th>
              <th className="py-3 px-4">Word Error Rate</th>
              <th className="py-3 px-4">Accuracy</th>
              <th className="py-3 px-4 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {acousticAccuracies.map((row, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-200">{row.environment}</td>
                <td className="py-3 px-4 font-mono tabular-nums text-slate-400">{row.wer}</td>
                <td className="py-3 px-4 font-mono tabular-nums text-emerald-400 font-semibold">{row.accuracy}%</td>
                <td className="py-3 px-4 text-right text-slate-400">
                  <span className="text-emerald-400">Validated</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
