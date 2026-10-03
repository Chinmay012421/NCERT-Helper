import React, { useState } from 'react';
import { NCERT_CLASSES, NcertClassData, NcertSubjectData, NcertChapter, NcertQuestionSolution } from '../data/ncertCurriculum';
import { Sparkles, BookOpen, Calculator, HelpCircle, CheckCircle2, ChevronRight, ChevronDown, RotateCw, Lightbulb, Copy, Check, Bookmark, ArrowRight, Award } from 'lucide-react';
import heroNcertImg from '../assets/images/hero_ncert_books_1790924434975.jpg';

interface NcertHelperViewProps {
  initialClassId?: string;
}

export const NcertHelperView: React.FC<NcertHelperViewProps> = ({
  initialClassId = 'class-9',
}) => {
  // Class selection state (Class 6 to 9)
  const [selectedClassId, setSelectedClassId] = useState<string>(initialClassId);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState<boolean>(false);
  const currentClass: NcertClassData = NCERT_CLASSES.find((c) => c.classId === selectedClassId) || NCERT_CLASSES[0];

  // Subject selection state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(currentClass.subjects[0]?.id || '');
  const currentSubject: NcertSubjectData = currentClass.subjects.find((s) => s.id === selectedSubjectId) || currentClass.subjects[0];

  // Chapter selection state
  const [selectedChapterId, setSelectedChapterId] = useState<string>(currentSubject.chapters[0]?.id || '');
  const [isMobileChapterListOpen, setIsMobileChapterListOpen] = useState<boolean>(false);
  const currentChapter: NcertChapter = currentSubject.chapters.find((ch) => ch.id === selectedChapterId) || currentSubject.chapters[0];

  // View modes: 'solutions' | 'ai-generator' | 'ask-doubt' | 'quick-notes'
  const [viewMode, setViewMode] = useState<'solutions' | 'ai-generator' | 'ask-doubt'>('solutions');

  // AI Generator state
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [isGeneratingSolution, setIsGeneratingSolution] = useState<boolean>(false);
  const [generatedSolution, setGeneratedSolution] = useState<any | null>(null);
  const [solutionError, setSolutionError] = useState<string | null>(null);

  // Ask Doubt state
  const [doubtText, setDoubtText] = useState<string>('');
  const [isAnsweringDoubt, setIsAnsweringDoubt] = useState<boolean>(false);
  const [doubtAnswer, setDoubtAnswer] = useState<string | null>(null);

  // Bookmarks
  const [bookmarkedSolutions, setBookmarkedSolutions] = useState<NcertQuestionSolution[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleClassChange = (classId: string) => {
    setSelectedClassId(classId);
    const newClass = NCERT_CLASSES.find((c) => c.classId === classId) || NCERT_CLASSES[0];
    const newSubject = newClass.subjects[0];
    setSelectedSubjectId(newSubject.id);
    setSelectedChapterId(newSubject.chapters[0]?.id || '');
    setGeneratedSolution(null);
  };

  React.useEffect(() => {
    if (initialClassId && initialClassId !== selectedClassId) {
      handleClassChange(initialClassId);
    }
  }, [initialClassId]);

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    const newSubject = currentClass.subjects.find((s) => s.id === subjectId) || currentClass.subjects[0];
    setSelectedChapterId(newSubject.chapters[0]?.id || '');
    setGeneratedSolution(null);
  };

  const handleGenerateAiSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsGeneratingSolution(true);
    setSolutionError(null);

    try {
      const res = await fetch('/api/ncert/generate-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classGrade: currentClass.className,
          subject: currentSubject.name,
          chapter: currentChapter.title,
          question: customQuestion,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate solution.');

      const data = await res.json();
      if (data.solution) {
        setGeneratedSolution(data.solution);
      }
    } catch (err: any) {
      setSolutionError(err.message || 'Error creating solution.');
    } finally {
      setIsGeneratingSolution(false);
    }
  };

  const handleAskDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;

    setIsAnsweringDoubt(true);
    setDoubtAnswer(null);

    try {
      const res = await fetch('/api/ncert/ask-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classGrade: currentClass.className,
          subject: currentSubject.name,
          doubt: doubtText,
        }),
      });

      if (!res.ok) throw new Error('Could not get doubt explanation.');

      const data = await res.json();
      if (data.answer) {
        setDoubtAnswer(data.answer);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsAnsweringDoubt(false);
    }
  };

  const copySolutionText = (text: string, id: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch (e) {}
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBookmark = (sol: NcertQuestionSolution) => {
    if (bookmarkedSolutions.some((b) => b.id === sol.id)) {
      setBookmarkedSolutions((prev) => prev.filter((b) => b.id !== sol.id));
    } else {
      setBookmarkedSolutions((prev) => [sol, ...prev]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
      {/* Hero Visual Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-sm min-h-[180px] sm:min-h-[220px] flex items-end">
        <img
          src={heroNcertImg}
          alt="NCERT textbook study workspace"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-transparent" />

        <div className="relative z-10 p-4 sm:p-8 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2">
            <span>NCERT HELPER</span>
            <span aria-hidden="true">·</span>
            <span>Classes 6, 7, 8, & 9</span>
            <span aria-hidden="true">·</span>
            <span>CBSE Curriculum 2026 Aligned</span>
          </div>
          <h1 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug mb-2 text-balance">
            Complete NCERT Solutions & Instant AI Question Solver
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
            Master every textbook exercise with step-by-step verified derivations, exact CBSE marking schemes, and generate instant AI solutions for any homework question.
          </p>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
            <button
              onClick={() => setViewMode('solutions')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                viewMode === 'solutions'
                  ? 'bg-amber-400 text-stone-900 shadow-xs font-bold'
                  : 'bg-stone-800 text-white hover:bg-stone-700 border border-stone-700'
              }`}
            >
              Textbook Solutions
            </button>
            <button
              onClick={() => setViewMode('ai-generator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                viewMode === 'ai-generator'
                  ? 'bg-amber-400 text-stone-900 shadow-xs font-bold'
                  : 'bg-stone-800 text-white hover:bg-stone-700 border border-stone-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Question Solver</span>
            </button>
            <button
              onClick={() => setViewMode('ask-doubt')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                viewMode === 'ask-doubt'
                  ? 'bg-amber-400 text-stone-900 shadow-xs font-bold'
                  : 'bg-stone-800 text-white hover:bg-stone-700 border border-stone-700'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask Any NCERT Doubt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grade Selector Dropdown & Subject Filters */}
      <div className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        {/* Class Dropdown Selector */}
        <div className="relative shrink-0">
          <div className="text-[11px] font-semibold text-stone-500 mb-1 flex items-center gap-1.5 md:hidden">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Select Grade / Standard:</span>
          </div>
          <button
            type="button"
            onClick={() => setIsClassDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-brand text-xs sm:text-sm font-bold rounded-lg border border-stone-800 shadow-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-haspopup="listbox"
            aria-expanded={isClassDropdownOpen}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="font-extrabold text-amber-300 tracking-wide">{currentClass.className}</span>
            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${isClassDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
          </button>

          {isClassDropdownOpen && (
            <>
              {/* Click outside backdrop */}
              <div
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setIsClassDropdownOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-56 bg-stone-900 border border-stone-700/80 rounded-xl shadow-xl py-1.5 z-30 divide-y divide-stone-800">
                <div className="px-3.5 py-1.5 text-[10px] font-brand font-bold uppercase tracking-wider text-amber-400">
                  Switch Class (6 to 9)
                </div>
                <div className="py-1">
                  {NCERT_CLASSES.map((cls) => {
                    const isActive = selectedClassId === cls.classId;
                    return (
                      <button
                        key={cls.classId}
                        onClick={() => {
                          handleClassChange(cls.classId);
                          setIsClassDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-amber-400/20 text-amber-300 font-bold'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-brand font-bold text-sm">{cls.className}</span>
                          <span className="text-[10px] text-stone-400 font-normal">· {cls.subjects.length} Subjects</span>
                        </div>
                        {isActive && <Check className="w-4 h-4 text-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Subject Pill Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full md:w-auto md:flex-wrap">
          {currentClass.subjects.map((sub) => {
            const isSubActive = selectedSubjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => handleSubjectChange(sub.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSubActive
                    ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold shadow-xs'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN VIEW CONTENT ACCORDING TO VIEW MODE */}

      {/* MODE 1: Textbook Chapter Explorer & Solutions */}
      {viewMode === 'solutions' && (
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Mobile Chapter Selector (Collapsible on phone) */}
          <div className="lg:hidden bg-white border border-stone-200 rounded-xl p-3.5 shadow-xs">
            <button
              type="button"
              onClick={() => setIsMobileChapterListOpen((prev) => !prev)}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                  Ch {currentChapter.chapterNumber}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 truncate">{currentChapter.title}</div>
                  <div className="text-[10px] text-stone-500">Tap to switch chapter ({currentSubject.chapters.length} available)</div>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ml-2 ${isMobileChapterListOpen ? 'rotate-180 text-amber-600' : ''}`} />
            </button>

            {isMobileChapterListOpen && (
              <div className="mt-3 pt-3 border-t border-stone-100 max-h-72 overflow-y-auto space-y-1">
                {currentSubject.chapters.map((ch) => {
                  const isSelected = ch.id === selectedChapterId;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setSelectedChapterId(ch.id);
                        setIsMobileChapterListOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-400 bg-amber-50 text-stone-900 font-bold'
                          : 'border-stone-100 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono text-amber-700 text-[11px] shrink-0">Ch {ch.chapterNumber}</span>
                        <span className="truncate">{ch.title}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Chapter Navigation Sidebar */}
          <div className="hidden lg:block lg:col-span-4 bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
            <div className="pb-3 mb-3 border-b border-stone-100">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {currentClass.className} · {currentSubject.name} Chapters
              </span>
            </div>

            <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
              {currentSubject.chapters.map((ch) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-amber-50/50 text-stone-900'
                        : 'border-transparent hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                      <span className="font-mono font-semibold text-amber-700">Chapter {ch.chapterNumber}</span>
                      <span className="tabular-nums font-medium">{ch.sampleQuestions.length} Solutions</span>
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 mb-1 leading-snug">
                      {ch.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      {ch.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Chapter Questions & Step-by-Step Solutions */}
          <div className="w-full lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Chapter Header Card */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
                <span>{currentClass.className}</span>
                <span aria-hidden="true">·</span>
                <span>{currentSubject.name}</span>
                <span aria-hidden="true">·</span>
                <span>Chapter {currentChapter.chapterNumber}</span>
              </div>
              <h2 className="font-display font-bold text-2xl text-stone-900 mb-2">
                {currentChapter.title}
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {currentChapter.description}
              </p>

              {/* Key topics covered */}
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-stone-100">
                <span className="text-[11px] font-semibold text-stone-500 mr-1">Core Topics:</span>
                {currentChapter.keyTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Questions and Solutions List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-stone-900">
                  NCERT Textbook Exercises & Verified Solutions
                </h3>
                <button
                  onClick={() => setViewMode('ai-generator')}
                  className="inline-flex items-center gap-1 text-xs text-amber-700 font-semibold hover:text-amber-800 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Solve other question with AI</span>
                </button>
              </div>

              {currentChapter.sampleQuestions.map((q) => {
                const isBookmarked = bookmarkedSolutions.some((b) => b.id === q.id);
                const isCopied = copiedId === q.id;

                return (
                  <div
                    key={q.id}
                    className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4"
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {q.questionNumber}
                        </span>
                        <h4 className="text-sm font-bold text-stone-900 mt-2 leading-relaxed">
                          {q.question}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => copySolutionText(
                            `${q.question}\n\nConcept: ${q.formulaOrConcept}\n\nSteps:\n${q.steps.join('\n')}\n\nFinal Answer: ${q.finalAnswer}`,
                            q.id
                          )}
                          className="p-1.5 text-stone-400 hover:text-stone-700 border border-stone-200 rounded cursor-pointer"
                          title="Copy Solution"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => toggleBookmark(q)}
                          className={`p-1.5 border rounded cursor-pointer transition-colors ${
                            isBookmarked
                              ? 'border-amber-400 text-amber-600 bg-amber-50'
                              : 'border-stone-200 text-stone-400 hover:text-stone-700'
                          }`}
                          title="Bookmark Solution"
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>

                    {/* Formula / Concept Used Callout */}
                    <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700">
                      <span className="font-bold text-stone-900">Key Formula / Theorem: </span>
                      <span className="italic">{q.formulaOrConcept}</span>
                    </div>

                    {/* Step by Step Breakdown */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Step-by-Step Derivation:
                      </div>
                      <div className="space-y-1.5 pl-2 border-l-2 border-amber-300">
                        {q.steps.map((st, sIdx) => (
                          <p key={sIdx} className="text-xs text-stone-800 leading-relaxed font-mono">
                            {st}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Final Answer Banner */}
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-xs text-emerald-950">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Final Answer: </span>
                        <span>{q.finalAnswer}</span>
                      </div>
                    </div>

                    {/* CBSE Marking Tip */}
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5 pt-1">
                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{q.examTips}</span>
                    </div>
                  </div>
                );
              })}

              {currentChapter.sampleQuestions.length === 0 && (
                <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="max-w-md mx-auto">
                    <h4 className="text-base font-bold text-stone-900 mb-1">
                      Ready to Solve Exercises from Chapter {currentChapter.chapterNumber}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      All questions, numerical derivations, and in-text exercises from <span className="font-semibold text-stone-800">{currentChapter.title}</span> can be solved instantly with verified step-by-step logic.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setCustomQuestion(`Solve and explain key textbook exercise questions from ${currentClass.className} ${currentSubject.name} Chapter ${currentChapter.chapterNumber}: ${currentChapter.title} with step-by-step steps.`);
                        setViewMode('ai-generator');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-brand font-bold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Solve In-Text & Textbook Exercises with AI</span>
                    </button>
                  </div>

                  {currentChapter.keyTopics.length > 0 && (
                    <div className="pt-4 border-t border-stone-100 max-w-lg mx-auto">
                      <div className="text-[11px] font-semibold text-stone-500 mb-2">
                        Quick 1-Click Questions for this Chapter:
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        {currentChapter.keyTopics.map((topic, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={() => {
                              setCustomQuestion(`Explain "${topic}" from ${currentClass.className} ${currentSubject.name} Chapter ${currentChapter.chapterNumber}: ${currentChapter.title} with step-by-step logic and CBSE exam tips.`);
                              setViewMode('ai-generator');
                            }}
                            className="text-[11px] bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-stone-700 hover:text-amber-900 px-2.5 py-1 rounded transition-colors cursor-pointer"
                          >
                            Solve: {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: AI Solution Generator for ANY Question */}
      {viewMode === 'ai-generator' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Instant AI NCERT Solver</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 mb-2">
              Solve Any NCERT Exercise or Exam Question
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed mb-6">
              Paste or type any question from your {currentClass.className} {currentSubject.name} textbook or homework assignment. Our Gemini AI teacher will generate a verified step-by-step solution formatted for full marks.
            </p>

            <form onSubmit={handleGenerateAiSolution} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Class</label>
                  <input
                    type="text"
                    disabled
                    value={currentClass.className}
                    className="w-full text-sm bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-700 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Subject</label>
                  <input
                    type="text"
                    disabled
                    value={currentSubject.name}
                    className="w-full text-sm bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-700 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Chapter</label>
                  <select
                    value={selectedChapterId}
                    onChange={(e) => setSelectedChapterId(e.target.value)}
                    className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800"
                  >
                    {currentSubject.chapters.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        Ch {ch.chapterNumber}: {ch.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Type or Paste Your NCERT Question Here
                </label>
                <textarea
                  rows={4}
                  required
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="e.g. State Archimedes' principle. A solid of mass 500 g and volume 350 cm³ is placed in water. Will it float or sink?"
                  className="w-full text-sm border border-stone-300 rounded px-3.5 py-3 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400 leading-relaxed resize-none"
                />
              </div>

              {solutionError && (
                <div className="p-3 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {solutionError}
                </div>
              )}

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isGeneratingSolution}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {isGeneratingSolution ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Deriving NCERT Solution...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Step-by-Step Solution</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Generated Solution Display */}
          {generatedSolution && (
            <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-start justify-between pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    AI Verified Solution · {generatedSolution.difficulty || 'Standard'}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-2">
                    {generatedSolution.questionTitle}
                  </h3>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700">
                <span className="font-bold text-stone-900">Governing NCERT Concept / Formula: </span>
                <span className="italic">{generatedSolution.formulaOrConceptUsed}</span>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Complete Derivation & Calculations:
                </div>
                <div className="space-y-2 pl-3 border-l-2 border-amber-400">
                  {generatedSolution.steps.map((st: string, idx: number) => (
                    <p key={idx} className="text-xs sm:text-sm text-stone-800 leading-relaxed font-mono">
                      {st}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium">
                <span className="font-bold">Final Answer: </span>
                <span>{generatedSolution.finalAnswer}</span>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong className="font-bold">CBSE Exam Tip: </strong>{generatedSolution.examTips}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: Ask NCERT Doubts */}
      {viewMode === 'ask-doubt' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 mb-1">
              <Lightbulb className="w-4 h-4" />
              <span>NCERT AI Teacher</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 mb-2">
              Ask Any Doubt From Your NCERT Book
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed mb-6">
              Confused by a science mechanism or mathematical concept in {currentClass.className}? Ask below in simple language, and receive a crystal-clear explanation with everyday analogies.
            </p>

            {/* Quick Sample Questions */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-stone-500 block mb-2">Frequently Asked Doubts:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Why does ice float on water although it is a solid?',
                  'What is the difference between distance and displacement?',
                  'Why do plants appear green under sunlight?',
                  'How to prove the sum of angles of a triangle is 180°?',
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setDoubtText(sample)}
                    className="text-[11px] text-stone-700 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded transition-colors text-left cursor-pointer"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAskDoubt} className="space-y-4">
              <div>
                <textarea
                  rows={3}
                  required
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  placeholder="Ask your doubt here... e.g. Why is the cell wall only present in plant cells and not in animal cells?"
                  className="w-full text-sm border border-stone-300 rounded px-3.5 py-3 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isAnsweringDoubt}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {isAnsweringDoubt ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Thinking like an NCERT Teacher...</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-4 h-4" />
                      <span>Explain Concept Simply</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Doubt Answer */}
          {doubtAnswer && (
            <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100 text-xs font-bold text-amber-700 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Teacher Explanation & Concept Breakdown</span>
              </div>
              <div className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line">
                {doubtAnswer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
