import React, { useState } from 'react';
import { ActiveTab } from '../types/study';
import {
  BookOpen,
  Sparkles,
  Layers,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  Award,
  PenTool,
  RotateCw,
  Heart,
  ShieldCheck,
  GraduationCap,
  Lightbulb,
  Download,
  Flame,
  UserCheck,
} from 'lucide-react';
import heroNcertImg from '../assets/images/hero_ncert_books_1790924434975.jpg';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectClassAndSubject?: (classId: string, subjectId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
}) => {
  // Quick AI Solver on Home Page
  const [quickQuestion, setQuickQuestion] = useState<string>('');
  const [quickClass, setQuickClass] = useState<string>('Class 9');
  const [quickSubject, setQuickSubject] = useState<string>('Science');
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [homeSolution, setHomeSolution] = useState<any | null>(null);
  const [solveError, setSolveError] = useState<string | null>(null);

  const handleHomeSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;

    setIsSolving(true);
    setSolveError(null);

    try {
      const res = await fetch('/api/ncert/generate-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classGrade: quickClass,
          subject: quickSubject,
          chapter: 'General Exercise',
          question: quickQuestion,
        }),
      });

      if (!res.ok) throw new Error('Could not generate solution. Please try again.');

      const data = await res.json();
      if (data.solution) {
        setHomeSolution(data.solution);
      }
    } catch (err: any) {
      setSolveError(err.message || 'Error creating solution.');
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION WITH INSTANT AI SOLVER */}
      <section className="relative bg-stone-900 text-white overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0">
          <img
            src={heroNcertImg}
            alt="NCERT textbook study workspace"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-950/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            {/* Unboxed Header Metadata */}
            <div className="flex flex-wrap items-center gap-2 font-brand text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span>NCERT HELPER</span>
              <span aria-hidden="true">·</span>
              <span>Classes 6 to 12 Study Sanctuary</span>
              <span aria-hidden="true">·</span>
              <span>Created by Chinmay Epili</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.15] text-balance">
              Master NCERT with Step-by-Step Logic & First Principles
            </h1>

            {/* Subhead */}
            <p className="font-sans text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
              An intelligent, distraction-free educational sanctuary empowering students with verified textbook solutions, instant AI question derivations, chapter-wise exam diagrams with pencil drawing guides, and official rationalized NCERT PDFs.
            </p>

            {/* Quick Navigation Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-brand">
              <button
                onClick={() => setActiveTab('ncert')}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-sm tracking-wide"
              >
                <BookOpen className="w-4 h-4" />
                <span>Textbook Solutions & AI</span>
              </button>
              <button
                onClick={() => setActiveTab('ncert-diagrams')}
                className="flex items-center gap-2 px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs rounded-lg border border-stone-700 transition-colors cursor-pointer tracking-wide"
              >
                <PenTool className="w-4 h-4 text-amber-400" />
                <span>Important Diagrams Studio</span>
              </button>
              <button
                onClick={() => setActiveTab('ncert-pdfs')}
                className="flex items-center gap-2 px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs rounded-lg border border-stone-700 transition-colors cursor-pointer tracking-wide"
              >
                <Download className="w-4 h-4 text-stone-300" />
                <span>Official NCERT PDFs</span>
              </button>
            </div>
          </div>

          {/* Quick Problem Solver Bar */}
          <div className="mt-12 max-w-3xl bg-white text-stone-900 rounded-2xl p-6 sm:p-7 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Instant AI Problem Solver · Solve Any NCERT Question</span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium">CBSE Marking Scheme Format</span>
            </div>

            <form onSubmit={handleHomeSolve} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Class</label>
                  <select
                    value={quickClass}
                    onChange={(e) => setQuickClass(e.target.value)}
                    className="w-full text-base sm:text-xs font-semibold border border-stone-300 rounded-lg px-3 py-2.5 sm:py-2 bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="Class 12">Class 12</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 6">Class 6</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Subject</label>
                  <select
                    value={quickSubject}
                    onChange={(e) => setQuickSubject(e.target.value)}
                    className="w-full text-base sm:text-xs font-semibold border border-stone-300 rounded-lg px-3 py-2.5 sm:py-2 bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="Science">Science (PCB / General)</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Social Science">Social Science</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Sanskrit">Sanskrit (संस्कृतम्)</option>
                  </select>
                </div>
                <div className="sm:col-span-2 md:col-span-1 flex items-end">
                  <span className="text-[11px] text-stone-500 leading-tight">
                    Type or paste any exercise question, reasoning doubt, or numerical.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={quickQuestion}
                  onChange={(e) => setQuickQuestion(e.target.value)}
                  placeholder="e.g., A stone of 1 kg is thrown at 20 m/s and comes to rest after 50 m. Find force of friction."
                  className="w-full text-base sm:text-xs border border-stone-300 rounded-lg px-3.5 py-3 sm:py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  disabled={isSolving}
                  className="w-full sm:w-auto sm:shrink-0 px-5 py-3 sm:py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[44px]"
                >
                  {isSolving ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Solving...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Solve with AI</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sample Quick Prompts */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-stone-500">
                <span className="font-semibold text-stone-700">Try asking:</span>
                {[
                  'Why does our palm feel cold when acetone is applied?',
                  'Calculate pressure for 100 N on 2 m²',
                  'Rationalize the denominator of 1 / (√7 - √6)',
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuickQuestion(sample)}
                    className="text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded transition-colors text-left cursor-pointer"
                  >
                    "{sample.slice(0, 36)}..."
                  </button>
                ))}
              </div>

              {solveError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                  {solveError}
                </div>
              )}
            </form>

            {/* Quick Solution Banner */}
            {homeSolution && (
              <div className="mt-6 pt-6 border-t border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>AI Verified Solution ({homeSolution.difficulty || 'Standard'})</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('ncert')}
                    className="text-xs text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open in Full Solutions Workspace</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700">
                  <strong className="text-stone-900">Governing Concept / Formula: </strong>
                  <span className="italic">{homeSolution.formulaOrConceptUsed}</span>
                </div>

                <div className="space-y-1.5 pl-3 border-l-2 border-amber-400">
                  {homeSolution.steps?.slice(0, 4).map((st: string, idx: number) => (
                    <p key={idx} className="text-xs font-mono text-stone-800 leading-relaxed">
                      {st}
                    </p>
                  ))}
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 font-medium">
                  <strong>Final Answer: </strong>
                  <span>{homeSolution.finalAnswer}</span>
                </div>

                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span><strong>CBSE Tip: </strong>{homeSolution.examTips}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. DEDICATED ABOUT SECTION OF NCERT HELPER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 font-brand text-xs font-semibold uppercase tracking-wider text-stone-500">
            <span>ABOUT NCERT HELPER</span>
            <span aria-hidden="true">·</span>
            <span>PHILOSOPHY & VISION</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl tracking-tight text-stone-900">
            Why NCERT HELPER Was Built
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
            Bridging the gap between rigid textbook theory and deep intuitive understanding for middle and secondary school students.
          </p>
        </div>

        {/* Narrative & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Box 1: The Challenge */}
          <div className="bg-white border border-stone-200 rounded-2xl p-7 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-900">
                Beyond Rote Memorization
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                Middle and secondary school years (Classes 6 to 9) form the irreplaceable foundation for all competitive science, engineering, and analytical careers. Yet, millions of students are forced into mechanical guidebooks and rote cramming without understanding the underlying laws of physics, chemical principles, and mathematical theorems.
              </p>
              <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                NCERT HELPER replaces passive reading with active, step-by-step logical derivations, helping students learn *why* a formula works and *how* to construct solutions step-by-step.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 font-brand text-xs font-semibold text-amber-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% CBSE & State Board Syllabus Aligned (2024–2026)</span>
            </div>
          </div>

          {/* Box 2: The Four Pillars */}
          <div className="bg-white border border-stone-200 rounded-2xl p-7 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-900">
                Pillars of the Learning Suite
              </h3>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-700">01.</span>
                  <span><strong>AI Derivation Engine:</strong> Instant step-by-step solutions for any numerical or theoretical exercise with CBSE marking tips.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-700">02.</span>
                  <span><strong>Diagrams Studio:</strong> 3-mark and 5-mark board exam diagrams with pencil drawing guides and memory recall testing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-700">03.</span>
                  <span><strong>Rationalized NCERT PDFs:</strong> Direct chapter downloads and structured in-text topic breakdowns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-700">04.</span>
                  <span><strong>Focus & Cognitive Sanctuary:</strong> Pomodoro timer with 40Hz focus frequencies, spaced flashcards, and self-testing quizzes.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-stone-100 font-brand text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Distractions · Ad-Free · Pure Learning Focus</span>
            </div>
          </div>
        </div>

        {/* 3. CREATOR & DEVELOPER SIGNATURE CARD */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-5 sm:p-12 border border-stone-800 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="flex items-center gap-2 font-brand text-xs font-bold uppercase tracking-wider text-amber-400">
              <UserCheck className="w-4 h-4" />
              <span>CREATOR & LEAD DEVELOPER</span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-2xl sm:text-4xl tracking-tight text-white">
                Created & Developed by Chinmay Epili
              </h3>
              <p className="font-serif italic text-sm sm:text-base text-stone-200 leading-relaxed border-l-2 border-amber-400 pl-4 py-1">
                "I created NCERT HELPER with a single, unwavering goal: to ensure every student in Classes 6 to 12 has access to an exceptional, clean study companion. Whether you are stuck on a difficult physics numerical late at night, trying to master a complex biology diagram, or needing instant conceptual clarity without expensive coaching, NCERT HELPER is built for you."
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <span className="font-brand font-black text-white text-base tracking-wide">CHINMAY EPILI</span>
                <span aria-hidden="true">·</span>
                <span className="font-sans">Software Creator & Educational Technologist</span>
              </div>
              <div className="flex items-center gap-1.5 font-brand text-amber-400 font-semibold tracking-wide">
                <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Crafted for Indian Students & CBSE Excellence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Callout to Main Workspaces */}
        <div className="p-5 sm:p-8 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-base sm:text-lg text-stone-900">
              Ready to begin your study session?
            </h4>
            <p className="font-sans text-xs text-stone-600">
              Select any workspace from the navigation bar above to dive into verified solutions, diagrams, or PDFs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 shrink-0 font-brand w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('ncert')}
              className="w-full sm:w-auto px-5 py-3 sm:py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs tracking-wide min-h-[44px]"
            >
              Open Solutions Workspace
            </button>
            <button
              onClick={() => setActiveTab('timer')}
              className="w-full sm:w-auto px-5 py-3 sm:py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer tracking-wide min-h-[44px]"
            >
              Start Focus Timer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
