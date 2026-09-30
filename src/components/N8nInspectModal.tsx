import React, { useState } from 'react';
import { X, ExternalLink, Activity, RefreshCw, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { N8nStatus } from '../types';

interface N8nInspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: N8nStatus | null;
  statusLoading: boolean;
  onCheckStatus: () => void;
}

export const N8nInspectModal: React.FC<N8nInspectModalProps> = ({
  isOpen,
  onClose,
  status,
  statusLoading,
  onCheckStatus,
}) => {
  const [copied, setCopied] = useState(false);
  const endpointUrl = 'https://rohini117.app.n8n.cloud/form/e1b7b0de-ccfa-4683-a143-07ee8b609a80';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(endpointUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">n8n Pipeline Diagnostics</h3>
            <p className="text-xs text-slate-400">Workflow connectivity & schema specifications</p>
          </div>
        </div>

        {/* Live Status Row */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              {status?.online ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              )}
            </span>
            <div>
              <p className="text-xs font-semibold text-white">
                {status?.online ? 'Connected & Healthy' : 'Offline or Unreachable'}
              </p>
              <p className="text-[11px] text-slate-400">
                {status?.online
                  ? `Response latency: ${status.latencyMs ?? 0}ms · HTTP ${status.statusCode || 200}`
                  : status?.error || 'Unable to ping endpoint'}
              </p>
            </div>
          </div>

          <button
            onClick={onCheckStatus}
            disabled={statusLoading}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${statusLoading ? 'animate-spin' : ''}`} />
            <span>Test Ping</span>
          </button>
        </div>

        {/* Webhook URL Box */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="text-slate-400 font-semibold block mb-1">Target Endpoint URL</label>
            <div className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-indigo-300">
              <span className="truncate flex-1">{endpointUrl}</span>
              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Form Schema */}
          <div>
            <label className="text-slate-400 font-semibold block mb-1">Form Field Schema</label>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-indigo-400">field-0</span>
                <span>Type: text (Full Name) · Required</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-indigo-400">field-1</span>
                <span>Type: email (Contact Email) · Required</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-400">field-2</span>
                <span>Type: file (Resume document: PDF/DOCX) · Multiple</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <a
            href={endpointUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Open Raw n8n Form in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
