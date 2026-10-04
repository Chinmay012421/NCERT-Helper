import React, { useState } from 'react';
import { NCERT_PDF_CATALOG, NcertPdfBook, NcertPdfChapter } from '../data/ncertPdfCatalog';
import { BookOpen, Download, ExternalLink, FileText, CheckCircle2, ChevronRight, ChevronDown, Check, Layers, Sparkles, Search } from 'lucide-react';

export const NcertPdfLibraryView: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState<string>('class-9');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState<boolean>(false);
  const [isBookDropdownOpen, setIsBookDropdownOpen] = useState<boolean>(false);
  const [isMobileChapterListOpen, setIsMobileChapterListOpen] = useState<boolean>(false);
  const [chapterSearch, setChapterSearch] = useState<string>('');

  const filteredBooks = NCERT_PDF_CATALOG.filter((b) => b.classId === selectedClassId);
  const [selectedBookId, setSelectedBookId] = useState<string>(filteredBooks[0]?.id || NCERT_PDF_CATALOG[0].id);

  const currentBook: NcertPdfBook = filteredBooks.find((b) => b.id === selectedBookId) || filteredBooks[0] || NCERT_PDF_CATALOG[0];

  const [selectedChapterId, setSelectedChapterId] = useState<string>(currentBook.chapters[0]?.id || '');
  const currentChapter: NcertPdfChapter = currentBook.chapters.find((c) => c.id === selectedChapterId) || currentBook.chapters[0];

  const handleClassChange = (classId: string) => {
    setSelectedClassId(classId);
    const newBooks = NCERT_PDF_CATALOG.filter((b) => b.classId === classId);
    if (newBooks.length > 0) {
      setSelectedBookId(newBooks[0].id);
      setSelectedChapterId(newBooks[0].chapters[0]?.id || '');
    }
  };

  const handleBookChange = (bookId: string) => {
    setSelectedBookId(bookId);
    const book = NCERT_PDF_CATALOG.find((b) => b.id === bookId);
    if (book && book.chapters.length > 0) {
      setSelectedChapterId(book.chapters[0].id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-4 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 font-brand text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wider">
            <span>OFFICIAL NCERT TEXTBOOKS</span>
            <span aria-hidden="true">·</span>
            <span>Rationalized 2024–2026 Syllabus</span>
            <span aria-hidden="true">·</span>
            <span>Class 6 to 12</span>
          </div>
          <h1 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl tracking-tight text-white mb-2">
            NCERT Textbook PDFs & Chapter In-Text Reader
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Access chapter-by-chapter official NCERT textbook PDFs, chapter summaries, in-text questions, and direct download links from the National Council of Educational Research and Training repository.
          </p>
        </div>
      </div>

      {/* Class & Book Selection Toolbar */}
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
              setIsBookDropdownOpen(false);
            }}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2.5 sm:py-2 bg-stone-900 hover:bg-stone-800 text-white font-brand text-xs sm:text-sm font-bold rounded-lg border border-stone-800 shadow-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px]"
            aria-haspopup="listbox"
            aria-expanded={isClassDropdownOpen}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-extrabold text-amber-300 tracking-wide">
                {selectedClassId === 'class-12'
                  ? 'Class 12'
                  : selectedClassId === 'class-11'
                  ? 'Class 11'
                  : selectedClassId === 'class-10'
                  ? 'Class 10'
                  : selectedClassId === 'class-9'
                  ? 'Class 9'
                  : selectedClassId === 'class-8'
                  ? 'Class 8'
                  : selectedClassId === 'class-7'
                  ? 'Class 7'
                  : 'Class 6'}
              </span>
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
              <div className="absolute left-0 mt-2 w-full sm:w-56 max-w-[calc(100vw-2rem)] bg-stone-900 border border-stone-700/80 rounded-xl shadow-xl py-1.5 z-30 divide-y divide-stone-800">
                <div className="px-3.5 py-1.5 text-[10px] font-brand font-bold uppercase tracking-wider text-amber-400">
                  Switch Class (6 to 12)
                </div>
                <div className="py-1 max-h-72 overflow-y-auto">
                  {[
                    { id: 'class-12', label: 'Class 12' },
                    { id: 'class-11', label: 'Class 11' },
                    { id: 'class-10', label: 'Class 10' },
                    { id: 'class-9', label: 'Class 9' },
                    { id: 'class-8', label: 'Class 8' },
                    { id: 'class-7', label: 'Class 7' },
                    { id: 'class-6', label: 'Class 6' },
                  ].map((c) => {
                    const isActive = selectedClassId === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          handleClassChange(c.id);
                          setIsClassDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-amber-400/20 text-amber-300 font-bold'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <span className="font-brand font-bold text-sm">{c.label}</span>
                        {isActive && <Check className="w-4 h-4 text-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Subject Book Dropdown Selector (Styled Exactly Like Class Dropdown) */}
        <div className="relative shrink-0 w-full sm:w-auto">
          <div className="text-[11px] font-semibold text-stone-500 mb-1 flex items-center gap-1.5 sm:hidden">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Select Subject Book:</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsBookDropdownOpen((prev) => !prev);
              setIsClassDropdownOpen(false);
            }}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2.5 sm:py-2 bg-stone-900 hover:bg-stone-800 text-white font-brand text-xs sm:text-sm font-bold rounded-lg border border-stone-800 shadow-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px]"
            aria-haspopup="listbox"
            aria-expanded={isBookDropdownOpen}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-extrabold text-amber-300 tracking-wide">{currentBook.subject}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${isBookDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
          </button>

          {isBookDropdownOpen && (
            <>
              {/* Click outside backdrop */}
              <div
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setIsBookDropdownOpen(false)}
              />
              <div className="absolute left-0 sm:left-auto mt-2 w-full sm:w-64 max-w-[calc(100vw-2rem)] bg-stone-900 border border-stone-700/80 rounded-xl shadow-xl py-1.5 z-30 divide-y divide-stone-800">
                <div className="px-3.5 py-1.5 text-[10px] font-brand font-bold uppercase tracking-wider text-amber-400">
                  Select {currentBook.className} Subject Book
                </div>
                <div className="py-1 max-h-72 overflow-y-auto">
                  {filteredBooks.map((b) => {
                    const isActive = b.id === currentBook.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => {
                          handleBookChange(b.id);
                          setIsBookDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-amber-400/20 text-amber-300 font-bold'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-brand font-bold text-sm">{b.subject}</span>
                          <span className="text-[10px] text-stone-400 font-normal">· {b.chapters.length} Chapters</span>
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

      {/* Main Content: Chapters List & Active Chapter Reader */}
      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Mobile Chapter Selector (Collapsible on phone) */}
        <div className="lg:hidden bg-white border border-stone-200 rounded-xl p-3.5 shadow-xs">
          <button
            type="button"
            onClick={() => setIsMobileChapterListOpen((prev) => !prev)}
            className="w-full flex items-center justify-between text-left cursor-pointer min-h-[44px]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                Ch {currentChapter?.chapterNumber || 1}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-stone-900 truncate">{currentChapter?.title}</div>
                <div className="text-[10px] text-stone-500">Tap to switch chapter ({currentBook.chapters.length} available)</div>
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
                  placeholder="Search chapter..."
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
              <div className="max-h-72 overflow-y-auto space-y-1">
                {currentBook.chapters
                  .filter((ch) =>
                    ch.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
                    ch.chapterNumber.toString().includes(chapterSearch)
                  )
                  .map((ch) => {
                    const isSelected = ch.id === currentChapter?.id;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setSelectedChapterId(ch.id);
                          setIsMobileChapterListOpen(false);
                          setChapterSearch('');
                        }}
                        className={`w-full p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer flex items-center justify-between min-h-[44px] ${
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

        {/* Desktop Left Chapters Navigation Sidebar */}
        <div className="hidden lg:block lg:col-span-4 bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
          <div className="pb-3 mb-3 border-b border-stone-100 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-brand">
              {currentBook.subject} Chapters ({currentBook.chapters.length})
            </span>
            <a
              href={currentBook.officialPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-800 font-semibold"
            >
              <span>Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {currentBook.chapters.map((ch) => {
              const isSelected = ch.id === currentChapter?.id;
              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50/50 text-stone-900 shadow-xs'
                      : 'border-transparent hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span className="font-mono font-semibold text-amber-700">Chapter {ch.chapterNumber}</span>
                    <span className="tabular-nums font-medium">{ch.pagesCount} Pages</span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 mb-1 leading-snug">
                    {ch.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">
                    {ch.inTextTopics.slice(0, 2).join(' · ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chapter Reader & PDF Access */}
        <div className="w-full lg:col-span-8 space-y-4 sm:space-y-6">
          {currentChapter ? (
            <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-8 shadow-xs space-y-4 sm:space-y-6">
              {/* Chapter Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-stone-100 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
                    <span>{currentBook.className}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentBook.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>Book Code: {currentBook.officialBookCode}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                    Chapter {currentChapter.chapterNumber}: {currentChapter.title}
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Rationalized Curriculum · {currentChapter.pagesCount} Pages in Official NCERT Edition
                  </p>
                </div>

                {/* Direct PDF Download / Open Link */}
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <a
                    href={currentChapter.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs min-h-[44px]"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download Official PDF</span>
                  </a>
                </div>
              </div>

              {/* Chapter Overview */}
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Chapter Executive Summary & Key Ideas
                </h3>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {currentChapter.chapterSummary}
                </div>
              </div>

              {/* In-Text Syllabus Topics Breakdown */}
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                  In-Text Section Breakdown (NCERT Sub-headings)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentChapter.inTextTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-stone-200 rounded-lg flex items-center gap-2.5 text-xs text-stone-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Exercises & Blue Questions preview */}
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Key Exercises & Blue Box In-Text Questions
                </h3>
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-amber-950 space-y-2">
                  {currentChapter.keyExercises.map((ex, exIdx) => (
                    <p key={exIdx} className="leading-relaxed">
                      {ex}
                    </p>
                  ))}
                </div>
              </div>

              {/* Direct NCERT Portal Notice */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-600">
                <div>
                  <span className="font-semibold text-stone-800">Need the complete book or other language editions?</span>
                  <p className="text-[11px] text-stone-500 mt-0.5">NCERT provides Hindi (Vigyan/Ganit) and Urdu editions on their national portal.</p>
                </div>
                <a
                  href="https://ncert.nic.in/textbook.php"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded text-stone-800 font-semibold hover:bg-stone-100 transition-colors"
                >
                  <span>NCERT Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-xl p-12 text-center text-xs text-stone-500">
              Select a chapter from the left to view summary and download PDF.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
