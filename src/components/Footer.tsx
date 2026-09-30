import React from 'react';
import { FileCheck, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenInspect: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInspect }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Logo & Description */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight">ResumePulse</span>
              <p className="text-[11px] text-slate-500">
                Automated Resume Analysis & ATS Optimization powered by n8n.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
            <a href="#analyze" className="hover:text-indigo-400 transition-colors">
              Submit Resume
            </a>
            <a href="#ats-check" className="hover:text-indigo-400 transition-colors">
              ATS Simulator
            </a>
            <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">
              Pipeline
            </a>
            <a href="#sample-audit" className="hover:text-indigo-400 transition-colors">
              Sample Report
            </a>
            <button
              onClick={onOpenInspect}
              className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              Inspect Webhook
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} ResumePulse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Secure Payload Ingestion
            </span>
            <span>·</span>
            <a
              href="https://rohini117.app.n8n.cloud/form/e1b7b0de-ccfa-4683-a143-07ee8b609a80"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <span>Target Form Endpoint</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
