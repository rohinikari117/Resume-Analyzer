import React, { useState, useRef, DragEvent } from 'react';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  Trash2,
  Send,
  Loader2,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Shield,
  Layers,
  FileCheck2,
} from 'lucide-react';
import { SubmissionResult } from '../types';

interface ResumeAnalyzerFormProps {
  onOpenInspect: () => void;
}

export const ResumeAnalyzerForm: React.FC<ResumeAnalyzerFormProps> = ({ onOpenInspect }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack / Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level (3-5 years)');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progressStage, setProgressStage] = useState<string>('');
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;
    const validFiles: File[] = [];
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      // Max 15MB
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage(`File "${file.name}" exceeds the 15MB limit.`);
        continue;
      }
      validFiles.push(file);
    }
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      setErrorMessage(null);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (files.length === 0) {
      setErrorMessage('Please upload your resume file (PDF, DOCX, or TXT).');
      return;
    }

    setSubmitting(true);
    setProgressStage('Packaging resume & applicant profile...');

    try {
      const formData = new FormData();
      formData.append('field-0', name.trim());
      formData.append('field-1', email.trim());
      formData.append('targetRole', targetRole);
      formData.append('experienceLevel', experienceLevel);

      for (const file of files) {
        formData.append('field-2', file);
      }

      // Simulate clean progress ticks for transparent UX
      setTimeout(() => {
        setProgressStage('Connecting to n8n webhook pipeline...');
      }, 600);

      setTimeout(() => {
        setProgressStage('Dispatching payload to n8n cloud form...');
      }, 1200);

      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setProgressStage('Workflow execution confirmed!');
        setResult(data);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#ec4899', '#38bdf8', '#10b981'],
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit resume. Please verify your connection.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setErrorMessage(`Error sending resume to n8n: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFiles([]);
    setErrorMessage(null);
  };

  return (
    <section id="analyze" className="py-16 md:py-24 bg-slate-900/50 relative scroll-mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Automated Audit Portal
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Upload & Analyze Your Resume
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Submit your resume to the automated n8n pipeline. In seconds, our workflow extracts
            your skills, checks ATS parsing compatibility, and maps your experience against target roles.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle accent border on top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-400" />

          {result ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Workflow Initialized
              </span>
              <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                Resume Submitted Successfully!
              </h3>
              <p className="mt-3 text-slate-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                Your resume was received by the n8n automation pipeline. The workflow has
                triggered text parsing, ATS scoring, and keyword analysis.
              </p>

              {/* Submission details card */}
              <div className="mt-8 max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-xl p-5 text-left text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Reference ID:</span>
                  <span className="font-mono text-indigo-400 font-medium">
                    {result.submissionId || 'RP-PENDING'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Candidate:</span>
                  <span className="text-white font-medium">{result.details?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Notification Email:</span>
                  <span className="text-white font-medium">{result.details?.email}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-800">
                  <span className="text-slate-400">Target Role:</span>
                  <span className="text-white font-medium">{result.details?.targetRole}</span>
                </div>
                <div className="pt-2.5">
                  <span className="text-slate-400 block mb-1">Processed Files:</span>
                  <div className="space-y-1">
                    {result.details?.filesUploaded.map((f, i) => (
                      <div key={i} className="flex items-center justify-between text-slate-300">
                        <span className="truncate max-w-[240px] flex items-center gap-1.5">
                          <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                          {f.name}
                        </span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          {(f.sizeBytes / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Analyze Another Resume</span>
                </button>
                <button
                  onClick={onOpenInspect}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>View n8n Pipeline Details</span>
                </button>
              </div>
            </div>
          ) : (
            /* Upload Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Alert message if error */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Submission Notice</p>
                    <p className="text-xs text-rose-200 mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Input grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Candidate Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohini Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm outline-none transition-colors"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Maps directly to n8n <code className="text-slate-400">field-0</code>
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rohinikari87@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm outline-none transition-colors"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Maps directly to n8n <code className="text-slate-400">field-1</code>
                  </p>
                </div>

                {/* Target Role interest */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Target Job Title / Domain
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm outline-none transition-colors"
                  >
                    <option value="Full Stack / Software Engineer">Full Stack / Software Engineer</option>
                    <option value="Frontend Engineer (React / TypeScript)">Frontend Engineer (React / TypeScript)</option>
                    <option value="Backend & Cloud Engineer (Node / Python / AWS)">Backend & Cloud Engineer (Node / Python / AWS)</option>
                    <option value="Data Scientist & AI / ML Specialist">Data Scientist & AI / ML Specialist</option>
                    <option value="DevOps & Site Reliability Engineer">DevOps & Site Reliability Engineer</option>
                    <option value="Product Manager / Technical PM">Product Manager / Technical PM</option>
                    <option value="UI/UX & Product Designer">UI/UX & Product Designer</option>
                    <option value="Executive & Engineering Leadership">Executive & Engineering Leadership</option>
                  </select>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm outline-none transition-colors"
                  >
                    <option value="Entry-Level (0-2 years)">Entry-Level (0-2 years)</option>
                    <option value="Mid-Level (3-5 years)">Mid-Level (3-5 years)</option>
                    <option value="Senior (6-10 years)">Senior (6-10 years)</option>
                    <option value="Staff / Principal / Director (10+ years)">Staff / Principal / Director (10+ years)</option>
                  </select>
                </div>
              </div>

              {/* Upload Zone (field-2) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Upload Resume Document <span className="text-rose-400">*</span>
                </label>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.docx,.doc,.txt,.rtf"
                    className="hidden"
                    onChange={(e) => handleFilesSelected(e.target.files)}
                  />

                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3 text-indigo-400">
                    <UploadCloud className="w-6 h-6" />
                  </div>

                  <p className="text-sm font-semibold text-white">
                    Drag and drop your resume file here, or{' '}
                    <span className="text-indigo-400 hover:underline">browse files</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports PDF, DOCX, DOC, TXT (Up to 15MB) · Maps to n8n <code className="text-slate-300">field-2</code>
                  </p>
                </div>

                {/* Selected Files List */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Attached Files ({files.length})</span>
                      <button
                        type="button"
                        onClick={() => setFiles([])}
                        className="text-rose-400 hover:text-rose-300 text-xs cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>

                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                      >
                        <div className="flex items-center gap-2.5 truncate max-w-sm sm:max-w-md">
                          <FileText className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                          <span className="truncate font-medium">{file.name}</span>
                          <span className="text-slate-500 font-mono text-[11px]">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Remove file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submission Action */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Files are processed securely and sent directly to your n8n workflow.</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    submitting
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25 hover:scale-[1.02] cursor-pointer'
                  }`}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                      <span>{progressStage || 'Processing...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch to n8n Workflow</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
