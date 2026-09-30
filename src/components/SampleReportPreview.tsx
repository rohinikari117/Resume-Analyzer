import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Zap,
  Tag,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';
import { SampleReport } from '../types';

const SAMPLE_DATA: SampleReport = {
  candidateName: 'Rohini Sharma',
  role: 'Senior Full Stack & Cloud Engineer',
  overallScore: 89,
  atsScore: 94,
  impactScore: 85,
  keywordScore: 88,
  brevityScore: 90,
  summary:
    'Strong structural clarity, high density of modern cloud and frontend frameworks, and clean single-column format. The primary optimization area is elevating mid-level bullet points from task descriptions to business-quantified deliverables.',
  keyStrengths: [
    'Clean single-column ATS typography with zero unparsable layout elements.',
    'Clear progression from individual contributor to system architecture lead.',
    'Robust coverage of React, TypeScript, Node.js, and CI/CD pipelines.',
  ],
  criticalFixes: [
    'Replace passive duty phrasing ("Responsible for microservices") with measurable outcomes ("Architected 12 microservices reducing p99 latency by 32%").',
    'Include explicit cloud cost or throughput metrics to stand out for Senior/Staff roles.',
    'Align keywords with specific job posting requirements (e.g. Docker, Terraform, Kubernetes).',
  ],
  matchedKeywords: [
    'TypeScript',
    'React',
    'Node.js',
    'Express',
    'PostgreSQL',
    'REST APIs',
    'GraphQL',
    'Tailwind CSS',
    'Jest / Testing',
    'CI/CD Pipelines',
    'Git & GitHub',
    'Agile / Scrum',
  ],
  missingKeywords: [
    'Kubernetes (K8s)',
    'Terraform (IaC)',
    'Prometheus / Grafana',
    'System Architecture Design',
    'Distributed Systems',
  ],
  bulletRewrites: [
    {
      original: 'Responsible for maintaining the backend API and fixing bugs in the database.',
      improved:
        'Refactored 14 core REST endpoints and tuned PostgreSQL queries, cutting API response times by 42% for 180,000 monthly active users.',
      reason: 'Adds quantifiable impact, scale, and proactive technical leadership verbs.',
    },
    {
      original: 'Worked with team members to create new frontend features in React.',
      improved:
        'Spearheaded the redesign of the merchant checkout flow in React & TypeScript, boosting mobile conversion by 18.4% within 60 days.',
      reason: 'Replaces passive collaboration verb with measurable business growth metric.',
    },
    {
      original: 'Handled deployment of services to AWS cloud servers.',
      improved:
        'Automated CI/CD deployment pipelines using GitHub Actions & Docker, eliminating manual release errors and shortening deploy cycles from 4 hours to 12 minutes.',
      reason: 'Specifies exact toolchain and quantifies developer velocity gains.',
    },
  ],
};

export const SampleReportPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bullets' | 'keywords' | 'ats'>('overview');

  return (
    <section id="sample-audit" className="py-16 md:py-24 bg-slate-900/40 border-t border-slate-900 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Interactive Report Sample
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            What You Receive After n8n Ingestion
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Every submission through our automated n8n workflow undergoes deep semantic analysis.
            Here is an authentic preview of the actionable intelligence generated for candidates.
          </p>
        </div>

        {/* Report Card Mockup */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{SAMPLE_DATA.candidateName}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    AUDITED
                  </span>
                </div>
                <p className="text-xs text-slate-400">{SAMPLE_DATA.role}</p>
              </div>
            </div>

            {/* Overall Score Badge */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Overall Readiness</span>
                <span className="text-xl font-extrabold text-white font-mono">
                  {SAMPLE_DATA.overallScore} <span className="text-xs text-slate-500 font-sans">/ 100</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-rose-500 p-0.5 shadow-md shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-base text-indigo-300">
                  {SAMPLE_DATA.overallScore}%
                </div>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="px-6 pt-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Executive Summary & Breakdown
            </button>
            <button
              onClick={() => setActiveTab('bullets')}
              className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'bullets'
                  ? 'border-indigo-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Bullet Point Rewriter (Before vs After)
            </button>
            <button
              onClick={() => setActiveTab('keywords')}
              className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'keywords'
                  ? 'border-indigo-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Keyword Density & Gap Analysis
            </button>
            <button
              onClick={() => setActiveTab('ats')}
              className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'ats'
                  ? 'border-indigo-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              ATS Technical Health Check
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">ATS Parser Read</span>
                    <span className="text-2xl font-bold text-white font-mono">{SAMPLE_DATA.atsScore}%</span>
                    <span className="text-[11px] text-emerald-400 block mt-1">Excellent Parsing</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Impact & Numbers</span>
                    <span className="text-2xl font-bold text-white font-mono">{SAMPLE_DATA.impactScore}%</span>
                    <span className="text-[11px] text-indigo-400 block mt-1">High Potential</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Keyword Match</span>
                    <span className="text-2xl font-bold text-white font-mono">{SAMPLE_DATA.keywordScore}%</span>
                    <span className="text-[11px] text-indigo-400 block mt-1">Strong Match</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Brevity & Layout</span>
                    <span className="text-2xl font-bold text-white font-mono">{SAMPLE_DATA.brevityScore}%</span>
                    <span className="text-[11px] text-emerald-400 block mt-1">Optimal Length</span>
                  </div>
                </div>

                {/* Summary narrative */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Automated Executive Assessment
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {SAMPLE_DATA.summary}
                  </p>
                </div>

                {/* Strengths & Fixes Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Key Identified Strengths
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {SAMPLE_DATA.keyStrengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold mt-0.5">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fixes */}
                  <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                    <h4 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Critical Recommendations
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {SAMPLE_DATA.criticalFixes.map((fix, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold mt-0.5">•</span>
                          <span>{fix}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bullets' && (
              <div className="space-y-6">
                <p className="text-xs text-slate-400">
                  The automated analyzer identifies low-impact descriptive phrases and upgrades them
                  using Google XYZ formula (<em className="text-slate-300 font-normal">Accomplished [X] as measured by [Y] by doing [Z]</em>).
                </p>

                <div className="space-y-4">
                  {SAMPLE_DATA.bulletRewrites.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      {/* Original */}
                      <div className="text-xs">
                        <div className="flex items-center gap-2 text-rose-400 font-semibold mb-1">
                          <X className="w-3.5 h-3.5" />
                          <span>Original Version (Weak Impact)</span>
                        </div>
                        <p className="text-slate-400 pl-5 line-through">{item.original}</p>
                      </div>

                      {/* Improved */}
                      <div className="text-xs pt-2 border-t border-slate-800">
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Optimized Version (High ATS & Recruiter Appeal)</span>
                        </div>
                        <p className="text-white pl-5 font-medium leading-relaxed">{item.improved}</p>
                      </div>

                      {/* Rationale */}
                      <div className="text-[11px] text-indigo-300/90 pl-5 bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20">
                        <strong>Why this works:</strong> {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'keywords' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Keywords Detected in Resume ({SAMPLE_DATA.matchedKeywords.length})
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    These skills were successfully indexed by the ATS semantic parser.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_DATA.matchedKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <h4 className="text-sm font-semibold text-rose-300 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    High-Frequency Missing Keywords ({SAMPLE_DATA.missingKeywords.length})
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Commonly required in target job descriptions for Senior / Staff positions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_DATA.missingKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium"
                      >
                        + Add {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ats' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="font-semibold text-white">Font Family Compatibility</p>
                      <p className="text-slate-400">Standard system typography detected (Safe for Workday, Taleo, Greenhouse).</p>
                    </div>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">PASS</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="font-semibold text-white">Document Structure & Tables</p>
                      <p className="text-slate-400">Zero floating textboxes, images-as-text, or multi-column barriers.</p>
                    </div>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">PASS</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="font-semibold text-white">Header & Contact Extraction</p>
                      <p className="text-slate-400">Email, phone, and LinkedIn URLs successfully extracted from document body.</p>
                    </div>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">PASS</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
