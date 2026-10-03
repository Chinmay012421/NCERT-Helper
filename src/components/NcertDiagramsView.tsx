import React, { useState } from 'react';
import { NCERT_DIAGRAMS, NcertDiagramItem, DiagramLabel } from '../data/ncertDiagrams';
import { Award, BookOpen, Check, ChevronDown, Copy, Eye, EyeOff, Layers, PenTool, Sparkles } from 'lucide-react';

export const NcertDiagramsView: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState<boolean>(false);
  const [isMobileDiagramListOpen, setIsMobileDiagramListOpen] = useState<boolean>(false);
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(NCERT_DIAGRAMS[0].id);
  const [hideLabelsForPractice, setHideLabelsForPractice] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'labels' | 'drawing-guide' | 'questions'>('labels');

  const filteredDiagrams = selectedClassId === 'all'
    ? NCERT_DIAGRAMS
    : NCERT_DIAGRAMS.filter((d) => d.classId === selectedClassId);

  const currentDiagram: NcertDiagramItem = filteredDiagrams.find((d) => d.id === selectedDiagramId) || filteredDiagrams[0] || NCERT_DIAGRAMS[0];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-4 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 font-brand text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wider">
            <span>NCERT HIGH-YIELD DIAGRAMS</span>
            <span aria-hidden="true">·</span>
            <span>Classes 6 to 12</span>
            <span aria-hidden="true">·</span>
            <span>3 & 5 Mark Exam Assured</span>
          </div>
          <h1 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl tracking-tight text-white mb-2">
            Chapter-Wise Important Diagrams & Drawing Guides
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            In CBSE and State Board exams, science and biology diagrams carry up to 15 marks. Master labeled anatomical structures, optical ray diagrams, circuits, and apparatus setups with step-by-step exam sketching tips.
          </p>
        </div>
      </div>

      {/* Class Filter Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Class Dropdown Selector */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsClassDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-brand text-xs sm:text-sm font-bold rounded-lg border border-stone-800 shadow-xs transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-haspopup="listbox"
            aria-expanded={isClassDropdownOpen}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="font-extrabold text-amber-300 tracking-wide">
              {selectedClassId === 'all'
                ? 'All Classes'
                : selectedClassId === 'class-12'
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
            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${isClassDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
          </button>

          {isClassDropdownOpen && (
            <>
              {/* Click outside backdrop */}
              <div
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setIsClassDropdownOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-52 bg-stone-900 border border-stone-700/80 rounded-xl shadow-xl py-1.5 z-30 divide-y divide-stone-800">
                <div className="px-3.5 py-1.5 text-[10px] font-brand font-bold uppercase tracking-wider text-amber-400">
                  Filter by Grade (6 to 12)
                </div>
                <div className="py-1">
                  {[
                    { id: 'all', label: 'All Classes' },
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
                          setSelectedClassId(c.id);
                          const firstOfClass = c.id === 'all'
                            ? NCERT_DIAGRAMS[0]
                            : NCERT_DIAGRAMS.find((d) => d.classId === c.id) || NCERT_DIAGRAMS[0];
                          setSelectedDiagramId(firstOfClass.id);
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

        {/* Practice Mode Toggle */}
        <button
          onClick={() => setHideLabelsForPractice(!hideLabelsForPractice)}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
            hideLabelsForPractice
              ? 'bg-amber-100 border-amber-400 text-amber-900'
              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          {hideLabelsForPractice ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-amber-700" />
              <span>Practice Mode (Labels Hidden)</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-stone-500" />
              <span>Hide Labels to Test Memory</span>
            </>
          )}
        </button>
      </div>

      {/* Main Workspace: Diagram List + Detailed Canvas */}
      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Mobile Diagram Selector (Collapsible on phone) */}
        <div className="lg:hidden bg-white border border-stone-200 rounded-xl p-3.5 shadow-xs">
          <button
            type="button"
            onClick={() => setIsMobileDiagramListOpen((prev) => !prev)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                {currentDiagram.examMarks}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-stone-900 truncate">{currentDiagram.diagramTitle}</div>
                <div className="text-[10px] text-stone-500">Tap to switch diagram ({filteredDiagrams.length} available)</div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ml-2 ${isMobileDiagramListOpen ? 'rotate-180 text-amber-600' : ''}`} />
          </button>

          {isMobileDiagramListOpen && (
            <div className="mt-3 pt-3 border-t border-stone-100 max-h-72 overflow-y-auto space-y-1">
              {filteredDiagrams.map((diag) => {
                const isSelected = diag.id === currentDiagram.id;
                return (
                  <button
                    key={diag.id}
                    onClick={() => {
                      setSelectedDiagramId(diag.id);
                      setIsMobileDiagramListOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-400 bg-amber-50 text-stone-900 font-bold'
                        : 'border-stone-100 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-amber-700 text-[11px] shrink-0">{diag.className}</span>
                      <span className="truncate">{diag.diagramTitle}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop Left Diagram Selection List */}
        <div className="hidden lg:block lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredDiagrams.map((diag) => {
            const isSelected = diag.id === currentDiagram.id;
            return (
              <div
                key={diag.id}
                onClick={() => setSelectedDiagramId(diag.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-amber-400 shadow-sm ring-1 ring-amber-400'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                  <span className="font-semibold text-amber-700">{diag.className} · Ch {diag.chapterNumber}</span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded font-mono font-medium">{diag.examMarks}</span>
                </div>
                <h3 className="text-xs font-bold text-stone-900 mb-1 leading-snug">
                  {diag.diagramTitle}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {diag.chapterTitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Main Diagram Stage */}
        <div className="w-full lg:col-span-8 space-y-4 sm:space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
            {/* Diagram Title Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                  <span>{currentDiagram.className}</span>
                  <span aria-hidden="true">·</span>
                  <span>Chapter {currentDiagram.chapterNumber}: {currentDiagram.chapterTitle}</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-stone-900 mt-1">
                  {currentDiagram.diagramTitle}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                  Weightage: {currentDiagram.examMarks}
                </span>
              </div>
            </div>

            {/* Diagram Visual Presentation Canvas */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden">
              {currentDiagram.imageUrl ? (
                <div className="relative max-w-lg w-full">
                  <img
                    src={currentDiagram.imageUrl}
                    alt={currentDiagram.diagramTitle}
                    className={`w-full max-h-[380px] object-contain mx-auto rounded-lg shadow-xs transition-all duration-300 ${
                      hideLabelsForPractice ? 'filter blur-sm select-none' : ''
                    }`}
                  />
                  {hideLabelsForPractice && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-900/40 rounded-lg backdrop-blur-xs">
                      <div className="bg-white p-4 rounded-xl text-center shadow-lg max-w-xs">
                        <PenTool className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                        <h4 className="text-xs font-bold text-stone-900 mb-1">Practice Recall Active</h4>
                        <p className="text-[11px] text-stone-600 mb-3">
                          Test whether you can sketch this diagram from memory on paper and label all {currentDiagram.labels.length} parts!
                        </p>
                        <button
                          onClick={() => setHideLabelsForPractice(false)}
                          className="px-3 py-1 bg-amber-400 text-stone-900 text-xs font-semibold rounded cursor-pointer"
                        >
                          Reveal Diagram
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Interactive Vector Schematic for SVG diagrams */
                <div className="w-full max-w-md p-6 bg-white border border-stone-200 rounded-lg text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 font-bold">
                    <PenTool className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{currentDiagram.diagramTitle}</h4>
                    <p className="text-xs text-stone-500 mt-1">Official NCERT Schematic Diagram</p>
                  </div>
                  <div className="p-4 rounded bg-stone-50 border border-stone-100 text-left text-xs font-mono space-y-2 text-stone-700">
                    <div className="font-bold text-stone-900 uppercase">Key Drawing Components:</div>
                    {currentDiagram.labels.map((l, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">({i + 1})</span>
                        <span><strong className="text-stone-900">{l.name}:</strong> {hideLabelsForPractice ? '••••••••••••' : l.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sub-Tabs: Labels & Roles vs Drawing Checklist vs Exam Questions */}
            <div className="mt-8">
              <div className="flex items-center gap-3 border-b border-stone-200 pb-2 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('labels')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'labels'
                      ? 'border-b-2 border-amber-500 text-stone-900 font-bold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Essential Labels & Functions ({currentDiagram.labels.length})
                </button>
                <button
                  onClick={() => setActiveTab('drawing-guide')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'drawing-guide'
                      ? 'border-b-2 border-amber-500 text-stone-900 font-bold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Pencil Drawing Guide (3-Minute Sketch)
                </button>
                <button
                  onClick={() => setActiveTab('questions')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'questions'
                      ? 'border-b-2 border-amber-500 text-stone-900 font-bold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Frequent Board Questions
                </button>
              </div>

              {/* Tab 1: Labels & Definitions */}
              {activeTab === 'labels' && (
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentDiagram.labels.map((l, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-stone-900">{l.name}</h4>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed pl-7">
                        {hideLabelsForPractice ? '••••••••••••••••••••••••••••••••' : l.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Drawing Guide */}
              {activeTab === 'drawing-guide' && (
                <div className="pt-4 space-y-3">
                  <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-lg text-xs text-amber-950 font-medium">
                    <strong className="font-bold">CBSE Examiner Tip: </strong>
                    Draw all labels on the right-hand side using a ruler for horizontal guide lines. Examiners deduct 0.5 marks for crossing pointer lines!
                  </div>
                  <div className="space-y-2">
                    {currentDiagram.drawingGuide.map((step, sIdx) => (
                      <div key={sIdx} className="p-3 bg-white border border-stone-200 rounded-lg flex items-start gap-3">
                        <span className="w-6 h-6 rounded bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0">
                          {sIdx + 1}
                        </span>
                        <p className="text-xs text-stone-800 leading-relaxed font-mono">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Frequent Exam Questions */}
              {activeTab === 'questions' && (
                <div className="pt-4 space-y-3">
                  {currentDiagram.frequentQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="p-3.5 bg-white border border-stone-200 rounded-lg flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs font-medium text-stone-900 leading-relaxed">
                        {q}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
