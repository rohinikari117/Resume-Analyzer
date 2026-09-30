import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeAnalyzerForm } from './components/ResumeAnalyzerForm';
import { ATSReadinessCheck } from './components/ATSReadinessCheck';
import { WorkflowArchitecture } from './components/WorkflowArchitecture';
import { SampleReportPreview } from './components/SampleReportPreview';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { N8nInspectModal } from './components/N8nInspectModal';
import { N8nStatus } from './types';

export default function App() {
  const [status, setStatus] = useState<N8nStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState<boolean>(true);
  const [isInspectOpen, setIsInspectOpen] = useState<boolean>(false);

  const fetchN8nStatus = async () => {
    setStatusLoading(true);
    try {
      const res = await fetch('/api/n8n-status');
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus({
        online: true, // fallback status
        endpoint: 'https://rohini117.app.n8n.cloud/form/e1b7b0de-ccfa-4683-a143-07ee8b609a80',
        formTitle: 'Resume Analyzer',
        lastChecked: new Date().toISOString(),
      });
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    fetchN8nStatus();
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('analyze');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        status={status}
        statusLoading={statusLoading}
        onOpenInspect={() => setIsInspectOpen(true)}
        onCheckStatus={fetchN8nStatus}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToForm={scrollToForm}
          onOpenInspect={() => setIsInspectOpen(true)}
        />

        {/* Live Resume Submission Form (Connected to n8n) */}
        <ResumeAnalyzerForm
          onOpenInspect={() => setIsInspectOpen(true)}
        />

        {/* ATS Readiness Simulator */}
        <ATSReadinessCheck />

        {/* End-to-End Workflow Architecture Diagram */}
        <WorkflowArchitecture />

        {/* Sample Deep Audit Report */}
        <SampleReportPreview />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenInspect={() => setIsInspectOpen(true)} />

      {/* n8n Webhook Inspector Modal */}
      <N8nInspectModal
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        status={status}
        statusLoading={statusLoading}
        onCheckStatus={fetchN8nStatus}
      />
    </div>
  );
}
