import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How does this website connect to my n8n workflow URL?',
    answer:
      'This website communicates directly with your n8n cloud form endpoint (https://rohini117.app.n8n.cloud/form/e1b7b0de-ccfa-4683-a143-07ee8b609a80). When you upload a resume, the application bundles your name (field-0), email (field-1), and resume binary files (field-2) into standard multipart/form-data, executing your n8n workflow instantly without CORS restrictions.',
  },
  {
    question: 'What happens after I submit my resume?',
    answer:
      'The n8n workflow webhook triggers downstream nodes configured in your n8n instance: extracting textual content from your PDF or DOCX file, analyzing syntax and action verbs, benchmarking keywords against target job roles, and delivering feedback directly to your provided email address.',
  },
  {
    question: 'What document formats are accepted?',
    answer:
      'You can upload PDF (.pdf), Microsoft Word (.docx, .doc), Plain Text (.txt), and Rich Text (.rtf) files up to 15MB. For optimal ATS parsing accuracy, single-column PDF or standard DOCX is strongly recommended.',
  },
  {
    question: 'What is an ATS (Applicant Tracking System) score?',
    answer:
      'Over 90% of Fortune 500 employers and modern tech companies use ATS platforms (like Workday, Greenhouse, Lever, and Ashby) to parse and rank incoming resumes before a recruiter ever looks at them. An ATS score indicates how easily parsing algorithms can extract your work history, skills, and quantified deliverables.',
  },
  {
    question: 'Is my personal information stored or shared?',
    answer:
      'No. Your resume file and contact information are processed in memory and forwarded directly to your configured n8n automation pipeline. No personal resumes are retained or sold to third-party data brokers.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-900/30 border-t border-slate-900 scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Common Inquiries
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Everything you need to know about the Resume Analyzer and its automated n8n cloud pipeline.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-indigo-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
