import React from 'react';
import {
  Webhook,
  Cpu,
  FileCheck,
  Mail,
  ArrowRight,
  Database,
  Code2,
  CheckCircle2,
} from 'lucide-react';

export const WorkflowArchitecture: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Portal Ingestion',
      subtitle: 'Candidate uploads resume and profile details via this frontend application.',
      icon: Webhook,
      tag: 'Frontend / Client',
    },
    {
      step: '02',
      title: 'n8n Cloud Webhook',
      subtitle: 'Dispatches payload directly to https://rohini117.app.n8n.cloud/form/...',
      icon: Code2,
      tag: 'Workflow Trigger',
    },
    {
      step: '03',
      title: 'Document Parser Node',
      subtitle: 'Extracts binary streams, decodes PDF/DOCX, and strips layout formatting.',
      icon: FileCheck,
      tag: 'Binary Extraction',
    },
    {
      step: '04',
      title: 'Semantic ATS Scoring',
      subtitle: 'LLM-powered prompt chains evaluate keyword density, action verbs, and impact metrics.',
      icon: Cpu,
      tag: 'AI Intelligence',
    },
    {
      step: '05',
      title: 'Automated Dispatch',
      subtitle: 'Dispatches final diagnostic report to the candidate email and records log.',
      icon: Mail,
      tag: 'Delivery Engine',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-950 border-t border-slate-900 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            End-to-End Automation
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How The n8n Workflow Executes
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Behind the scenes, your submission triggers a powerful asynchronous workflow hosted on
            n8n Cloud. Here is how your resume travels through the pipeline.
          </p>
        </div>

        {/* Pipeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between group hover:border-indigo-500/50 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      {item.step}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {item.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.subtitle}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Automated Step</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Webhook Architecture callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
              <Webhook className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Live n8n Cloud Webhook Connection</h4>
              <p className="text-xs text-slate-400 mt-0.5 font-mono break-all">
                https://rohini117.app.n8n.cloud/form/e1b7b0de-ccfa-4683-a143-07ee8b609a80
              </p>
            </div>
          </div>

          <a
            href="https://rohini117.app.n8n.cloud/form/e1b7b0de-ccfa-4683-a143-07ee8b609a80"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            Direct n8n Form Link ↗
          </a>
        </div>
      </div>
    </section>
  );
};
