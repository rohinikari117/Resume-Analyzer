import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertTriangle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'Formatting' | 'Impact' | 'Keywords' | 'Structure';
  title: string;
  description: string;
  weight: number;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'standard-headers',
    category: 'Formatting',
    title: 'Standard Section Headers',
    description: 'Uses recognized titles like "Experience", "Education", and "Skills" instead of creative names like "Where I have been".',
    weight: 12,
  },
  {
    id: 'single-column',
    category: 'Formatting',
    title: 'Single-Column Clean Layout',
    description: 'Avoids complex multi-column tables, text frames, or graphics that confuse legacy ATS parsers.',
    weight: 14,
  },
  {
    id: 'metrics-numbers',
    category: 'Impact',
    title: 'Quantified Metrics & Business Results',
    description: 'Bullet points contain numbers, revenue figures, % speedups, or scale (e.g. "Reduced latency by 35% across 2M daily requests").',
    weight: 18,
  },
  {
    id: 'action-verbs',
    category: 'Impact',
    title: 'High-Impact Action Verbs',
    description: 'Bullets start with strong verbs ("Architected", "Engineered", "Spearheaded") rather than passive phrases like "Responsible for".',
    weight: 14,
  },
  {
    id: 'hard-skills',
    category: 'Keywords',
    title: 'Explicit Hard Skills Section',
    description: 'Explicitly lists technical tools, frameworks, and methodologies required in target job postings.',
    weight: 16,
  },
  {
    id: 'keyword-frequency',
    category: 'Keywords',
    title: 'Target Job Keyword Alignment',
    description: 'Key skills are integrated organically throughout the bullet points, not merely listed in a bottom skill cloud.',
    weight: 12,
  },
  {
    id: 'contact-safety',
    category: 'Structure',
    title: 'ATS-Friendly Contact Information',
    description: 'Includes clean email, LinkedIn link, phone number, and location (city/state) in the document body, not header/footer fields.',
    weight: 8,
  },
  {
    id: 'pdf-selectable',
    category: 'Structure',
    title: 'Selectable Text (Not Scanned Image)',
    description: 'PDF text can be highlighted and copied cleanly with the mouse, ensuring parsers can extract raw strings.',
    weight: 6,
  },
];

export const ATSReadinessCheck: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([
    'standard-headers',
    'single-column',
    'hard-skills',
    'contact-safety',
  ]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setCheckedIds(CHECKLIST_ITEMS.map((item) => item.id));
  };

  const resetAll = () => {
    setCheckedIds([]);
  };

  // Calculate score
  const totalWeight = CHECKLIST_ITEMS.reduce((acc, curr) => acc + curr.weight, 0);
  const currentWeight = CHECKLIST_ITEMS.filter((item) => checkedIds.includes(item.id)).reduce(
    (acc, curr) => acc + curr.weight,
    0
  );
  const score = Math.round((currentWeight / totalWeight) * 100);

  const getScoreVerdict = (s: number) => {
    if (s >= 90) return { label: 'Top Tier · High ATS Pass Rate', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    if (s >= 70) return { label: 'Competitive · Minor Gaps Detected', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' };
    if (s >= 50) return { label: 'Needs Improvement · Moderate Risk', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    return { label: 'High Rejection Risk · Critical Fixes Needed', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' };
  };

  const verdict = getScoreVerdict(score);

  const filteredItems =
    activeCategory === 'All'
      ? CHECKLIST_ITEMS
      : CHECKLIST_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="ats-check" className="py-16 md:py-24 bg-slate-950 border-t border-slate-900 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Interactive Diagnostic
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            ATS Readiness Simulator
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Evaluate your resume structure against the primary parsing criteria used by Workday,
            Greenhouse, Lever, and Taleo algorithms. Check the criteria your current resume fulfills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Checklist */}
          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium">
                {['All', 'Formatting', 'Impact', 'Keywords', 'Structure'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={selectAll}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-slate-700">|</span>
                <button
                  onClick={resetAll}
                  className="text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="divide-y divide-slate-800/80 mt-2">
              {filteredItems.map((item) => {
                const isChecked = checkedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`py-4 flex items-start gap-4 cursor-pointer transition-colors group ${
                      isChecked ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-indigo-400 group-hover:scale-110 transition-transform flex-shrink-0"
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 fill-indigo-500/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold transition-colors ${
                            isChecked ? 'text-white' : 'text-slate-300'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Dynamic Score Card */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Calculated Readiness
              </span>

              {/* Big Score Display */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
                  {score}
                </span>
                <span className="text-xl font-medium text-slate-500">/ 100</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 h-2.5 rounded-full mt-4 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${score}%` }}
                />
              </div>

              {/* Verdict badge */}
              <div
                className={`mt-5 p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${verdict.bg} ${verdict.border} ${verdict.color}`}
              >
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span>{verdict.label}</span>
              </div>

              {/* Unchecked count & insight */}
              <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400 space-y-3">
                <p>
                  You have satisfied{' '}
                  <strong className="text-white font-semibold">
                    {checkedIds.length} of {CHECKLIST_ITEMS.length}
                  </strong>{' '}
                  critical ATS factors.
                </p>

                {score < 90 && (
                  <p className="text-amber-300/90 flex items-start gap-2 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                    <span>
                      Missing quantifiable business results or specialized keywords accounts for 70% of automated candidate rejections.
                    </span>
                  </p>
                )}

                <a
                  href="#analyze"
                  className="mt-4 w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  <span>Submit Resume for Full Automated Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
