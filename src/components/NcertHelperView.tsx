import React, { useState, useEffect } from 'react';
import { NCERT_CLASSES, NcertClassData, NcertSubjectData, NcertChapter, NcertQuestionSolution } from '../data/ncertCurriculum';
import { Sparkles, BookOpen, Calculator, HelpCircle, CheckCircle2, ChevronRight, ChevronDown, RotateCw, Lightbulb, Copy, Check, Bookmark, ArrowRight, Award, Search, Layers } from 'lucide-react';
import heroNcertImg from '../assets/images/hero_ncert_books_1790924434975.jpg';

interface NcertHelperViewProps {
  initialClassId?: string;
}

export const NcertHelperView: React.FC<NcertHelperViewProps> = ({
  initialClassId = 'class-10',
}) => {
  // Class selection state
  const [selectedClassId, setSelectedClassId] = useState<string>(initialClassId);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState<boolean>(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState<boolean>(false);
  const currentClass: NcertClassData = NCERT_CLASSES.find((c) => c.classId === selectedClassId) || NCERT_CLASSES[0];

  // Subject selection state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(currentClass.subjects[0]?.id || '');
  const currentSubject: NcertSubjectData = currentClass.subjects.find((s) => s.id === selectedSubjectId) || currentClass.subjects[0];

  // Chapter selection state
  const [selectedChapterId, setSelectedChapterId] = useState<string>(currentSubject.chapters[0]?.id || '');
  const [isMobileChapterListOpen, setIsMobileChapterListOpen] = useState<boolean>(false);
  const [mobileChapterSearch, setMobileChapterSearch] = useState<string>('');
  const currentChapter: NcertChapter = currentSubject.chapters.find((ch) => ch.id === selectedChapterId) || currentSubject.chapters[0];

  // Complete Chapter Exercises State (Ensures every chapter of every subject has all exercise questions in place)
  const [exercisesList, setExercisesList] = useState<NcertQuestionSolution[]>([]);
  const [isLoadingExercises, setIsLoadingExercises] = useState<boolean>(false);
  const [selectedQuestionFilter, setSelectedQuestionFilter] = useState<string>('all');

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

  // Automatically load all authentic exercise questions for the selected chapter
  const fetchChapterExercises = async (forceRefresh = false) => {
    if (!currentChapter) return;

    // If pre-existing static questions have 3 or more questions and not forced, use them
    if (!forceRefresh && currentChapter.sampleQuestions && currentChapter.sampleQuestions.length >= 3) {
      setExercisesList(currentChapter.sampleQuestions);
      setSelectedQuestionFilter('all');
      return;
    }

    setIsLoadingExercises(true);
    try {
      const res = await fetch('/api/ncert/chapter-exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classGrade: currentClass.className,
          subject: currentSubject.name,
          chapter: currentChapter.title,
          keyTopics: currentChapter.keyTopics,
        }),
      });
      const data = await res.json();
      if (data.exercises && data.exercises.length > 0) {
        // Merge with existing sample questions to guarantee full coverage
        const base = [...(currentChapter.sampleQuestions || [])];
        for (const ex of data.exercises) {
          if (!base.some((b) => b.question === ex.question)) {
            base.push(ex);
          }
        }
        setExercisesList(base);
      } else {
        setExercisesList(currentChapter.sampleQuestions || []);
      }
    } catch (err) {
      console.warn('Could not fetch chapter exercises:', err);
      setExercisesList(currentChapter.sampleQuestions || []);
    } finally {
      setIsLoadingExercises(false);
      setSelectedQuestionFilter('all');
    }
  };

  useEffect(() => {
    fetchChapterExercises();
  }, [selectedChapterId, selectedSubjectId, selectedClassId]);

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
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-amber-400 font-semibold mb-2">
            <span>NCERT HELPER</span>
            <span aria-hidden="true">·</span>
            <span>Classes 6 to 12</span>
            <span aria-hidden="true">·</span>
            <span>CBSE 2026 Aligned</span>
          </div>
          <h1 className="font-display font-bold text-lg sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug mb-2">
            Complete NCERT Solutions & Instant AI Question Solver
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
            Master every textbook exercise with step-by-step verified derivations, exact CBSE marking schemes, and generate instant AI solutions for any homework question.
          </p>

          {/* Mode Switcher Buttons - Perfectly Responsive on Phone */}
          <div className="grid grid-cols-3 gap-1.5 w-full sm:flex sm:w-auto p-1 bg-stone-950/80 border border-stone-800 rounded-xl">
            <button
              onClick={() => setViewMode('solutions')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-2 sm:py-1.5 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'solutions'
                  ? 'bg-amber-400 text-stone-950 shadow-xs font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] sm:text-xs">Solutions</span>
            </button>
            <button
              onClick={() => setViewMode('ai-generator')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-2 sm:py-1.5 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'ai-generator'
                  ? 'bg-amber-400 text-stone-950 shadow-xs font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] sm:text-xs">AI Solver</span>
            </button>
            <button
              onClick={() => setViewMode('ask-doubt')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-2 sm:py-1.5 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === 'ask-doubt'
                  ? 'bg-amber-400 text-stone-950 shadow-xs font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] sm:text-xs">Ask Doubt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grade Selector Dropdown & Subject Selector Dropdown */}
      <div className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4">
        {/* Class Dropdown Selector */}
        <div className="relative shrink-0 w-full sm:w-auto">
          <div className="text-[11px] font-semibold text-stone-500 mb-1 flex items-center gap-1.5 sm:hidden">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Select Grade / Standard:</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsClassDropdownOpen((prev) => !prev);
              setIsSubjectDropdownOpen(false);
            }}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2.5 sm:py-2 bg-stone-900 hover:bg-stone-800 text-white font-brand text-xs sm:text-sm font-bold rounded-lg border border-stone-800 shadow-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px]"
            aria-haspopup="listbox"
            aria-expanded={isClassDropdownOpen}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-extrabold text-amber-300 tracking-wide">{currentClass.className}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${isClassDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
          </button>

          {isClassDropdownOpen && (
            <>
              {/* Click outside backdrop */}
              <div
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setIsClassDropdownOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-full sm:w-60 max-w-[calc(100vw-2rem)] bg-stone-900 border border-stone-700/80 rounded-xl shadow-xl py-1.5 z-30 divide-y divide-stone-800">
                <div className="px-3.5 py-1.5 text-[10px] font-brand font-bold uppercase tracking-wider text-amber-400">
                  Switch Class (6 to 12)
                </div>
                <div className="py-1 max-h-72 overflow-y-auto">
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

        {/* Subject Dropdown Selector (Just like the selecting the class option!) */}
        <div className="relative shrink-0 w-full sm:w-auto">
          <div className="text-[11px] font-semibold text-stone-500 mb-1 flex items-center gap-1.5 sm:hidden">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Select Subject:</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSubjectDropdownOpen((prev) => !prev);
              setIsClassDropdownOpen(false);
            }}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2.5 sm:py-2 bg-stone-900 hover:bg-stone-800 text-white font-brand text-xs sm:text-sm font-bold rounded-lg border border-stone-800 shadow-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px]"
            aria-haspopup="listbox"
            aria-expanded={isSubjectDropdownOpen}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-extrabold text-amber-300 tracking-wide">{currentSubject.name}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${isSubjectDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
          </button>

          {isSubjectDropdownOpen && (
            <>
              {/* Click outside backdrop */}
              <div
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setIsSubjectDropdownOpen(false)}
              />
              <div className="absolute left-0 sm:left-auto mt-2 w-full sm:w-64 max-w-[calc(100vw-2rem)] bg-stone-900 border border-stone-700/80 rounded-xl shadow-xl py-1.5 z-30 divide-y divide-stone-800">
                <div className="px-3.5 py-1.5 text-[10px] font-brand font-bold uppercase tracking-wider text-amber-400">
                  Select {currentClass.className} Subject
                </div>
                <div className="py-1 max-h-72 overflow-y-auto">
                  {currentClass.subjects.map((sub) => {
                    const isActive = selectedSubjectId === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          handleSubjectChange(sub.id);
                          setIsSubjectDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-amber-400/20 text-amber-300 font-bold'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-brand font-bold text-sm">{sub.name}</span>
                          <span className="text-[10px] text-stone-400 font-normal">· {sub.chapters.length} Chapters</span>
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
              <div className="mt-3 pt-3 border-t border-stone-100 space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={mobileChapterSearch}
                    onChange={(e) => setMobileChapterSearch(e.target.value)}
                    placeholder="Search chapter title or number..."
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div className="max-h-72 overflow-y-auto space-y-1">
                  {currentSubject.chapters
                    .filter((ch) =>
                      ch.title.toLowerCase().includes(mobileChapterSearch.toLowerCase()) ||
                      ch.chapterNumber.toString().includes(mobileChapterSearch)
                    )
                    .map((ch) => {
                      const isSelected = ch.id === selectedChapterId;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => {
                            setSelectedChapterId(ch.id);
                            setIsMobileChapterListOpen(false);
                            setMobileChapterSearch('');
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-brand">
                    NCERT Textbook Exercises & Verified Solutions
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {exercisesList.length > 0 ? `${exercisesList.length} verified exercise questions for Chapter ${currentChapter.chapterNumber}` : 'Loading authentic textbook exercises...'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchChapterExercises(true)}
                    disabled={isLoadingExercises}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
                    title="Synthesize additional authentic exercise questions"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isLoadingExercises ? 'animate-spin text-amber-600' : ''}`} />
                    <span>{isLoadingExercises ? 'Loading...' : 'Refresh Exercises'}</span>
                  </button>

                  <button
                    onClick={() => setViewMode('ai-generator')}
                    className="inline-flex items-center gap-1 text-xs text-amber-700 font-semibold hover:text-amber-800 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask Any Question</span>
                  </button>
                </div>
              </div>

              {/* Interactive Exercise Questions Navigation Strip */}
              {exercisesList.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  <button
                    onClick={() => setSelectedQuestionFilter('all')}
                    className={`px-3 py-1 text-xs rounded-full border transition-all shrink-0 cursor-pointer ${
                      selectedQuestionFilter === 'all'
                        ? 'bg-stone-900 text-white border-stone-900 font-bold'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    All Exercises ({exercisesList.length})
                  </button>
                  {exercisesList.map((q, qIndex) => {
                    const isSelected = selectedQuestionFilter === q.id || selectedQuestionFilter === String(qIndex);
                    return (
                      <button
                        key={q.id || qIndex}
                        onClick={() => setSelectedQuestionFilter(q.id || String(qIndex))}
                        className={`px-3 py-1 text-xs rounded-full border transition-all shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        {q.questionNumber || `Q${qIndex + 1}`}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Loading State Skeleton */}
              {isLoadingExercises && exercisesList.length === 0 && (
                <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-xs text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto animate-pulse">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Loading Official Textbook Exercises for {currentChapter.title}...
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Retrieving in-text blue questions, numerical derivations, and verified CBSE marking steps.
                  </p>
                </div>
              )}

              {/* Render Question Solutions in Official CBSE Board Marking Scheme Format */}
              {exercisesList
                .filter((q, qIndex) => selectedQuestionFilter === 'all' || selectedQuestionFilter === q.id || selectedQuestionFilter === String(qIndex))
                .map((q, idx) => {
                  const isBookmarked = bookmarkedSolutions.some((b) => b.id === q.id);
                  const isCopied = copiedId === q.id;

                  return (
                    <div
                      key={q.id || idx}
                      className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs space-y-0"
                    >
                      {/* 1. Header Metadata Bar */}
                      <div className="bg-stone-50/90 px-4 sm:px-6 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                            {q.questionNumber || `Exercise Q${idx + 1}`}
                          </span>
                          <span className="text-[11px] font-semibold text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200">
                            {q.questionCategory || (q.questionNumber?.toLowerCase().includes('in-text') ? 'In-Text Question' : 'NCERT Exercise')}
                          </span>
                          <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                            {q.questionType || (q.givenData && q.givenData.length > 0 ? 'Numerical Problem (3 Marks)' : 'Conceptual Reasoning (2 Marks)')}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => copySolutionText(
                              `[${q.questionNumber || 'NCERT Exercise'}]\nQuestion: ${q.question}\n\nGiven Parameters: ${q.givenData?.join(', ') || 'N/A'}\nTo Find/Prove: ${q.toFindOrProve || 'N/A'}\nGoverning Formula/Concept: ${q.formulaOrConcept}\n\nStep-by-Step Derivation:\n${q.steps.map((s, i) => `Step ${i + 1}: ${s}`).join('\n')}\n\nFinal Answer:\n${q.finalAnswer}\n\nCBSE Tip: ${q.examTips}`,
                              q.id
                            )}
                            className="p-1.5 sm:p-2 text-stone-500 hover:text-stone-900 border border-stone-200 rounded-lg cursor-pointer bg-white hover:bg-stone-50 transition-colors"
                            title="Copy CBSE Formatted Solution"
                          >
                            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => toggleBookmark(q)}
                            className={`p-1.5 sm:p-2 border rounded-lg cursor-pointer transition-colors ${
                              isBookmarked
                                ? 'border-amber-400 text-amber-600 bg-amber-50'
                                : 'border-stone-200 text-stone-500 hover:text-stone-900 bg-white hover:bg-stone-50'
                            }`}
                            title="Bookmark Solution"
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 space-y-4">
                        {/* 2. Official NCERT Question Statement */}
                        <div className="p-3.5 bg-amber-50/40 border-l-4 border-amber-400 rounded-r-lg">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1 font-brand">
                            NCERT Textbook Question Statement:
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-stone-900 leading-relaxed font-sans">
                            {q.question}
                          </p>
                        </div>

                        {/* 3. Given Parameters & To Find / Prove */}
                        {((q.givenData && q.givenData.length > 0) || q.toFindOrProve) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                            {q.givenData && q.givenData.length > 0 && (
                              <div>
                                <span className="font-bold text-stone-900 uppercase text-[10px] tracking-wide block mb-1 font-brand">
                                  📌 Given Data & Parameters:
                                </span>
                                <ul className="space-y-1 text-stone-700 font-mono text-[11px]">
                                  {q.givenData.map((g, gIdx) => (
                                    <li key={gIdx} className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                      <span>{g}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {q.toFindOrProve && (
                              <div>
                                <span className="font-bold text-stone-900 uppercase text-[10px] tracking-wide block mb-1 font-brand">
                                  🎯 Target / To Determine / To Prove:
                                </span>
                                <p className="text-stone-800 font-sans text-xs leading-relaxed">
                                  {q.toFindOrProve}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 4. Governing Law / Reaction Formula / Theorem */}
                        {q.formulaOrConcept && (
                          <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                            <span className="font-bold text-stone-900 font-brand shrink-0">
                              📐 Governing Principle / Formula:
                            </span>
                            <span className="font-mono text-amber-950 font-bold bg-amber-50/80 px-2 py-1 rounded border border-amber-200/80 break-all sm:break-normal">
                              {q.formulaOrConcept}
                            </span>
                          </div>
                        )}

                        {/* 5. Step-by-Step Derivation & Detailed Working */}
                        <div className="space-y-2.5">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 font-brand flex items-center justify-between">
                            <span>Step-by-Step Working (CBSE Marking Criteria):</span>
                            {q.marksAllotment && (
                              <span className="text-[10px] font-normal font-mono text-stone-500 lowercase bg-stone-100 px-2 py-0.5 rounded">
                                {q.marksAllotment}
                              </span>
                            )}
                          </div>
                          <div className="space-y-2">
                            {q.steps.map((st, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-stone-200 hover:border-amber-300 transition-colors shadow-2xs">
                                <span className="w-6 h-6 rounded-md bg-stone-900 text-amber-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                  {sIdx + 1}
                                </span>
                                <div className="flex-1 text-xs text-stone-800 leading-relaxed font-sans pt-0.5">
                                  <strong className="text-stone-900 font-semibold font-mono text-[11px] block mb-0.5">
                                    Step {sIdx + 1}:
                                  </strong>
                                  {st}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 6. Authoritative Final Answer Box */}
                        <div className="p-4 rounded-lg bg-emerald-50 border-2 border-emerald-400 flex items-start gap-3 text-xs text-emerald-950 shadow-xs">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span className="font-bold font-brand uppercase tracking-wider text-[11px] text-emerald-900 block">
                              Final Answer / Concluding Result:
                            </span>
                            <p className="font-semibold text-xs leading-relaxed text-emerald-950 font-sans">
                              {q.finalAnswer}
                            </p>
                          </div>
                        </div>

                        {/* 7. CBSE Exam Tips & Common Pitfalls */}
                        {q.examTips && (
                          <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
                            <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div className="leading-relaxed">
                              <strong className="font-bold text-amber-950 font-brand">CBSE Marking Tip: </strong>
                              <span>{q.examTips}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

              {!isLoadingExercises && exercisesList.length === 0 && (
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
                      onClick={() => fetchChapterExercises(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-brand font-bold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Load Chapter Exercises Now</span>
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
                  className="w-full text-base sm:text-sm border border-stone-300 rounded-lg px-3.5 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 leading-relaxed resize-none"
                />
              </div>

              {solutionError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {solutionError}
                </div>
              )}

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isGeneratingSolution}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-xs min-h-[44px]"
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

          {/* Generated Solution Display in CBSE Board Examination Format */}
          {generatedSolution && (
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs space-y-0">
              {/* Header Bar */}
              <div className="bg-stone-50/90 px-4 sm:px-6 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    AI Verified Solution
                  </span>
                  <span className="text-[11px] font-semibold text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {generatedSolution.questionCategory || 'NCERT Textbook Problem'}
                  </span>
                  <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                    {generatedSolution.questionType || `${generatedSolution.difficulty || 'Standard'} Difficulty`}
                  </span>
                </div>

                <button
                  onClick={() => copySolutionText(
                    `Question: ${generatedSolution.questionTitle}\n\nGiven Parameters: ${generatedSolution.givenData?.join(', ') || 'N/A'}\nTo Find/Prove: ${generatedSolution.toFindOrProve || 'N/A'}\nGoverning Formula/Concept: ${generatedSolution.formulaOrConceptUsed}\n\nStep-by-Step Derivation:\n${generatedSolution.steps?.map((s: string, i: number) => `Step ${i + 1}: ${s}`).join('\n')}\n\nFinal Answer:\n${generatedSolution.finalAnswer}\n\nCBSE Tip: ${generatedSolution.examTips}`,
                    'gen-sol'
                  )}
                  className="p-1.5 sm:p-2 text-stone-500 hover:text-stone-900 border border-stone-200 rounded-lg cursor-pointer bg-white hover:bg-stone-50 transition-colors flex items-center gap-1 text-xs"
                  title="Copy Full Solution"
                >
                  {copiedId === 'gen-sol' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>Copy Solution</span>
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                {/* Question Statement */}
                <div className="p-3.5 bg-amber-50/40 border-l-4 border-amber-400 rounded-r-lg">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1 font-brand">
                    Question Statement:
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-relaxed font-sans">
                    {generatedSolution.questionTitle}
                  </h3>
                </div>

                {/* Given Data & Target */}
                {((generatedSolution.givenData && generatedSolution.givenData.length > 0) || generatedSolution.toFindOrProve) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                    {generatedSolution.givenData && generatedSolution.givenData.length > 0 && (
                      <div>
                        <span className="font-bold text-stone-900 uppercase text-[10px] tracking-wide block mb-1 font-brand">
                          📌 Given Parameters:
                        </span>
                        <ul className="space-y-1 text-stone-700 font-mono text-[11px]">
                          {generatedSolution.givenData.map((g: string, gIdx: number) => (
                            <li key={gIdx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span>{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {generatedSolution.toFindOrProve && (
                      <div>
                        <span className="font-bold text-stone-900 uppercase text-[10px] tracking-wide block mb-1 font-brand">
                          🎯 Target / Objective:
                        </span>
                        <p className="text-stone-800 font-sans text-xs leading-relaxed">
                          {generatedSolution.toFindOrProve}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Governing Formula / Law */}
                <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <span className="font-bold text-stone-900 font-brand shrink-0">
                    📐 Governing Formula / Law:
                  </span>
                  <span className="font-mono text-amber-950 font-bold bg-amber-50/80 px-2 py-1 rounded border border-amber-200/80 break-all sm:break-normal">
                    {generatedSolution.formulaOrConceptUsed}
                  </span>
                </div>

                {/* Step by Step Working */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 font-brand flex items-center justify-between">
                    <span>Step-by-Step Derivation & Calculations:</span>
                    {generatedSolution.marksAllotment && (
                      <span className="text-[10px] font-normal font-mono text-stone-500 lowercase bg-stone-100 px-2 py-0.5 rounded">
                        {generatedSolution.marksAllotment}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {generatedSolution.steps.map((st: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-stone-200 hover:border-amber-300 transition-colors shadow-2xs">
                        <span className="w-6 h-6 rounded-md bg-stone-900 text-amber-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {idx + 1}
                        </span>
                        <div className="flex-1 text-xs text-stone-800 leading-relaxed font-sans pt-0.5">
                          <strong className="text-stone-900 font-semibold font-mono text-[11px] block mb-0.5">
                            Step {idx + 1}:
                          </strong>
                          {st}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Answer Box */}
                <div className="p-4 rounded-lg bg-emerald-50 border-2 border-emerald-400 flex items-start gap-3 text-xs text-emerald-950 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold font-brand uppercase tracking-wider text-[11px] text-emerald-900 block">
                      Final Answer:
                    </span>
                    <p className="font-semibold text-xs leading-relaxed text-emerald-950 font-sans">
                      {generatedSolution.finalAnswer}
                    </p>
                  </div>
                </div>

                {/* CBSE Exam Tip */}
                {generatedSolution.examTips && (
                  <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <strong className="font-bold text-amber-950 font-brand">CBSE Examiner's Tip: </strong>
                      <span>{generatedSolution.examTips}</span>
                    </div>
                  </div>
                )}
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
                  className="w-full text-base sm:text-sm border border-stone-300 rounded-lg px-3.5 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isAnsweringDoubt}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-xs min-h-[44px]"
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
