import React, { useState, useEffect } from 'react';
import { NCERT_CLASSES, NcertClassData, NcertSubjectData, NcertChapter } from '../data/ncertCurriculum';
import {
  Sparkles,
  BookOpen,
  ChevronDown,
  Check,
  Copy,
  Printer,
  Download,
  Search,
  Award,
  AlertTriangle,
  Lightbulb,
  FileText,
  RotateCw,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Layers
} from 'lucide-react';

interface NcertNotesViewProps {
  initialClassId?: string;
  onNavigateToSolutions?: (classId: string, subjectId: string, chapterId: string) => void;
}

interface ChapterNoteData {
  chapterTitle: string;
  executiveSummary: string;
  detailedTopics: {
    title: string;
    explanation: string;
    keyPoints: string[];
  }[];
  coreFormulasAndTheorems: {
    name: string;
    formulaOrRule: string;
    explanation: string;
  }[];
  essentialDefinitions: {
    term: string;
    definition: string;
  }[];
  examTrapsAndCommonMistakes: string[];
  probableExamQuestions: {
    question: string;
    marks: number;
    modelAnswer: string;
    keyTips: string;
  }[];
  lastMinuteRevisionRecap: string[];
}

export const NcertNotesView: React.FC<NcertNotesViewProps> = ({
  initialClassId = 'class-9',
  onNavigateToSolutions,
}) => {
  // Class selection state with dropdown
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
  const currentChapter: NcertChapter = currentSubject.chapters.find((ch) => ch.id === selectedChapterId) || currentSubject.chapters[0];

  // Search filter for chapters in sidebar
  const [chapterSearch, setChapterSearch] = useState<string>('');

  // AI Notes state
  const [isLoadingNotes, setIsLoadingNotes] = useState<boolean>(false);
  const [notesData, setNotesData] = useState<ChapterNoteData | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync state when class or subject changes
  const handleClassChange = (classId: string) => {
    setSelectedClassId(classId);
    const cls = NCERT_CLASSES.find((c) => c.classId === classId) || NCERT_CLASSES[0];
    const sub = cls.subjects[0];
    setSelectedSubjectId(sub?.id || '');
    setSelectedChapterId(sub?.chapters[0]?.id || '');
    setNotesData(null);
  };

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    const sub = currentClass.subjects.find((s) => s.id === subjectId) || currentClass.subjects[0];
    setSelectedChapterId(sub?.chapters[0]?.id || '');
    setNotesData(null);
  };

  // Generate / Fetch In-Depth Chapter Notes via AI API
  const fetchChapterNotes = async () => {
    if (!currentChapter) return;
    setIsLoadingNotes(true);
    try {
      const res = await fetch('/api/ncert/generate-chapter-notes', {
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
      if (data.notes) {
        setNotesData(data.notes);
      }
    } catch (err) {
      console.error('Failed to generate chapter notes:', err);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  // Auto-generate or set initial curated notes when chapter changes
  useEffect(() => {
    fetchChapterNotes();
  }, [selectedChapterId, selectedSubjectId, selectedClassId]);

  const handleCopyNotes = () => {
    if (!notesData) return;
    const formatted = `# ${currentClass.className} ${currentSubject.name} — Chapter ${currentChapter.chapterNumber}: ${currentChapter.title}

## Executive Summary
${notesData.executiveSummary}

## Detailed Topics
${notesData.detailedTopics.map((t) => `### ${t.title}\n${t.explanation}\n${t.keyPoints.map((p) => `- ${p}`).join('\n')}`).join('\n\n')}

## Core Formulas, Theorems & Rules
${notesData.coreFormulasAndTheorems.map((f) => `- **${f.name}**: \`${f.formulaOrRule}\`\n  ${f.explanation}`).join('\n')}

## Essential NCERT Definitions
${notesData.essentialDefinitions.map((d) => `- **${d.term}**: ${d.definition}`).join('\n')}

## Common Traps & Exam Mistakes to Avoid
${notesData.examTrapsAndCommonMistakes.map((m) => `- ${m}`).join('\n')}

## Probable Exam Questions & Marking Guide
${notesData.probableExamQuestions.map((q) => `### Q (${q.marks} Marks): ${q.question}\n**Model Answer**: ${q.modelAnswer}\n**CBSE Tip**: ${q.keyTips}`).join('\n\n')}

## 5-Minute Last-Minute Revision
${notesData.lastMinuteRevisionRecap.map((r) => `- ${r}`).join('\n')}
`;

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredChapters = currentSubject.chapters.filter((ch) =>
    ch.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
    ch.chapterNumber.toString().includes(chapterSearch)
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-4 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 font-brand text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI-POWERED NCERT COMPREHENSIVE REVISION</span>
            <span aria-hidden="true">·</span>
            <span>Classes 6 to 12</span>
          </div>
          <h1 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl tracking-tight text-white mb-2">
            Complete Chapter Notes & High-Scoring Summaries
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Every concept, law, formula, definition, and CBSE marking tip meticulously compiled for 100% chapter mastery. Engineered to cover all textbook topics with zero fluff.
          </p>
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

        {/* Subject Dropdown Selector (Styled Exactly Like Class Dropdown) */}
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

      {/* Main Notes Layout */}
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
                  value={chapterSearch}
                  onChange={(e) => setChapterSearch(e.target.value)}
                  placeholder="Search chapter title or number..."
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
              <div className="max-h-72 overflow-y-auto space-y-1">
                {filteredChapters.map((ch) => {
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
            </div>
          )}
        </div>

        {/* Desktop Sidebar: Chapter Navigator with Search */}
        <div className="hidden lg:block lg:col-span-4 bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-brand">
              {currentSubject.name} Chapters ({currentSubject.chapters.length})
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={chapterSearch}
              onChange={(e) => setChapterSearch(e.target.value)}
              placeholder="Search chapter..."
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div className="space-y-1.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredChapters.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50/60 text-stone-900 shadow-xs'
                      : 'border-transparent hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono font-bold text-amber-700">Ch {ch.chapterNumber}</span>
                    <span className="text-[10px] text-stone-400">Full Notes</span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                    {ch.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {ch.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content: Comprehensive Chapter Notes Sheet */}
        <div className="w-full lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Action Toolbar */}
          <div className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-stone-500">
                {currentClass.className} · {currentSubject.name} · Chapter {currentChapter.chapterNumber}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-display">
                {currentChapter.title}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
              <button
                onClick={fetchChapterNotes}
                disabled={isLoadingNotes}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="Regenerate notes with latest AI"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLoadingNotes ? 'animate-spin text-amber-600' : ''}`} />
                <span>{isLoadingNotes ? 'Synthesizing...' : 'Refresh AI Notes'}</span>
              </button>

              <button
                onClick={handleCopyNotes}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="Copy all notes to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Notes'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-brand font-bold transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
                title="Print or export as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoadingNotes && !notesData && (
            <div className="bg-white border border-stone-200 rounded-xl p-12 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">
                Generating Exhaustive Notes for {currentChapter.title}...
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Analyzing official NCERT curriculum, key formulas, core definitions, and CBSE exam marking schemes.
              </p>
            </div>
          )}

          {/* Render Full Notes Document */}
          {notesData && (
            <div className="space-y-6 printable-notes">
              {/* 1. Executive Summary */}
              <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 font-brand">
                  <BookOpen className="w-4 h-4" />
                  <span>1. Executive Summary & Chapter Scope</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {notesData.executiveSummary}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-stone-500">Core Syllabus Coverage:</span>
                  {currentChapter.keyTopics.map((topic, i) => (
                    <span key={i} className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Detailed In-Depth Topics */}
              <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 font-brand border-b border-stone-100 pb-3">
                  <FileText className="w-4 h-4" />
                  <span>2. Comprehensive Topic-by-Topic Breakdown</span>
                </div>

                <div className="space-y-6">
                  {notesData.detailedTopics.map((topic, idx) => (
                    <div key={idx} className="space-y-2.5">
                      <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] flex items-center justify-center font-mono shrink-0">
                          {idx + 1}
                        </span>
                        <span>{topic.title}</span>
                      </h3>
                      <p className="text-xs text-stone-700 leading-relaxed pl-7">
                        {topic.explanation}
                      </p>
                      <div className="pl-7 space-y-1.5">
                        {topic.keyPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-stone-600">
                            <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Core Formulas, Laws & Mathematical Rules */}
              {notesData.coreFormulasAndTheorems.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 font-brand">
                    <Award className="w-4 h-4" />
                    <span>3. Key Scientific Laws, Formulas & Identities</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {notesData.coreFormulasAndTheorems.map((form, fIdx) => (
                      <div key={fIdx} className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 space-y-1.5">
                        <div className="text-xs font-bold text-stone-900">{form.name}</div>
                        <div className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200 inline-block">
                          {form.formulaOrRule}
                        </div>
                        <p className="text-[11px] text-stone-600 leading-relaxed">
                          {form.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Essential NCERT Definitions */}
              {notesData.essentialDefinitions.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 font-brand">
                    <Lightbulb className="w-4 h-4" />
                    <span>4. Essential NCERT Terminology & Definitions</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {notesData.essentialDefinitions.map((def, dIdx) => (
                      <div key={dIdx} className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/50 space-y-1">
                        <span className="text-xs font-bold text-stone-900 block font-brand">{def.term}</span>
                        <p className="text-xs text-stone-600 leading-relaxed">{def.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Common Exam Pitfalls & CBSE Marking Traps */}
              {notesData.examTrapsAndCommonMistakes.length > 0 && (
                <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 font-brand">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>5. Common Student Mistakes & CBSE Exam Traps</span>
                  </div>
                  <div className="space-y-1.5">
                    {notesData.examTrapsAndCommonMistakes.map((mistake, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2 text-xs text-rose-950">
                        <span className="font-bold text-rose-600 shrink-0">⚠</span>
                        <span>{mistake}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. High-Yield Probable Exam Questions (2, 3, 5 Marks) */}
              {notesData.probableExamQuestions.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 font-brand">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>6. High-Yield Exam Questions with Verified Answer Keys</span>
                  </div>

                  <div className="space-y-4">
                    {notesData.probableExamQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="p-4 rounded-lg border border-stone-200 bg-stone-50 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                            {q.marks} Marks Question
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                          {q.question}
                        </h4>
                        <div className="pl-3 border-l-2 border-emerald-400 space-y-1">
                          <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wide block">Model Answer Key:</span>
                          <p className="text-xs text-stone-700 leading-relaxed font-sans">{q.modelAnswer}</p>
                        </div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-1.5 pt-1">
                          <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>CBSE Tip: {q.keyTips}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Quick 5-Minute Last-Minute Revision */}
              {notesData.lastMinuteRevisionRecap.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 font-brand">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>7. Last-Minute Rapid Exam Revision (5-Minute Recap)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {notesData.lastMinuteRevisionRecap.map((recap, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs text-amber-950 bg-white/70 p-2.5 rounded-lg border border-amber-200/60">
                        <span className="text-amber-600 font-bold shrink-0">✓</span>
                        <span>{recap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call-to-Action to Solutions & AI */}
              {onNavigateToSolutions && (
                <div className="bg-stone-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white font-brand">Ready to Practice Chapter Exercises?</h4>
                    <p className="text-xs text-stone-300">
                      Explore verified step-by-step solutions or ask our AI solver any in-text numerical from Chapter {currentChapter.chapterNumber}.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigateToSolutions(currentClass.classId, currentSubject.id, currentChapter.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-brand font-bold text-xs rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
                  >
                    <span>Go to Chapter Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
