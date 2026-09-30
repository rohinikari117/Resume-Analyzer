import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Sparkles, Cpu, Target } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
  onOpenInspect: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToForm, onOpenInspect }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-900 bg-grid-pattern">
      {/* Radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top connection kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 mb-6 backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>n8n Cloud Webhook Integrated</span>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenInspect}
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Inspect Workflow
            </button>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Turn Your Resume Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              Guaranteed Interviews
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Automate your resume review, scan against modern Applicant Tracking Systems (ATS),
            and pinpoint critical weaknesses in formatting, keyword density, and bullet impact.
            Powered directly by automated workflow pipelines on n8n.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onScrollToForm}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-base shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Submit Resume for Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#sample-audit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium text-base transition-all hover:border-slate-700 flex items-center justify-center gap-2"
            >
              <span>Explore Sample Report</span>
            </a>
          </div>

          {/* Metadata Discipline - Clean text with typographic separators */}
          <div className="mt-10 pt-8 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              99.4% Parsing Fidelity
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Automated n8n Webhook Pipeline
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Target className="w-4 h-4 text-rose-400" />
              Targeted Role Benchmarking
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Shield className="w-4 h-4 text-emerald-400" />
              100% Confidential
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
