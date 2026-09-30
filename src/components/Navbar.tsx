import React from 'react';
import { FileCheck, Sparkles, Activity, ExternalLink, ShieldCheck } from 'lucide-react';
import { N8nStatus } from '../types';

interface NavbarProps {
  status: N8nStatus | null;
  statusLoading: boolean;
  onOpenInspect: () => void;
  onCheckStatus: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  status,
  statusLoading,
  onOpenInspect,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  ResumePulse
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    AI ATS
                  </span>
                </span>
                <span className="text-xs text-slate-400 font-medium">n8n Automation Engine</span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a
              href="#analyze"
              className="hover:text-indigo-400 transition-colors py-1 hover:border-b-2 hover:border-indigo-400"
            >
              Analyze Resume
            </a>
            <a
              href="#how-it-works"
              className="hover:text-indigo-400 transition-colors py-1 hover:border-b-2 hover:border-indigo-400"
            >
              Workflow Pipeline
            </a>
            <a
              href="#ats-check"
              className="hover:text-indigo-400 transition-colors py-1 hover:border-b-2 hover:border-indigo-400"
            >
              ATS Simulator
            </a>
            <a
              href="#sample-audit"
              className="hover:text-indigo-400 transition-colors py-1 hover:border-b-2 hover:border-indigo-400"
            >
              Sample Report
            </a>
            <a
              href="#faq"
              className="hover:text-indigo-400 transition-colors py-1 hover:border-b-2 hover:border-indigo-400"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action & n8n Live Status */}
          <div className="flex items-center gap-3">
            {/* Live status badge */}
            <button
              onClick={onOpenInspect}
              title="Click to inspect connected n8n cloud webhook"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group"
            >
              <span className="relative flex h-2 w-2">
                {status?.online ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                ) : statusLoading ? (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 animate-pulse"></span>
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                )}
              </span>
              <span className="hidden sm:inline font-mono">
                {statusLoading ? 'Pinging n8n...' : status?.online ? `n8n Live (${status.latencyMs ?? 0}ms)` : 'n8n Webhook'}
              </span>
              <Activity className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </button>

            {/* Direct CTA */}
            <a
              href="#analyze"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Audit Now</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
