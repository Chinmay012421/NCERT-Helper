import React, { useState } from 'react';
import { StudyNote, Subject } from '../types/study';
import { Sparkles, Plus, Trash2, FileText, Check, Copy, BookOpen, RotateCw } from 'lucide-react';

interface NotesBinderViewProps {
  subjects: Subject[];
  notes: StudyNote[];
  onSaveNote: (note: StudyNote) => void;
  onDeleteNote: (noteId: string) => void;
}

export const NotesBinderView: React.FC<NotesBinderViewProps> = ({
  subjects,
  notes,
  onSaveNote,
  onDeleteNote,
}) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>(notes[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'editor' | 'summary'>('editor');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || notes[0];

  const [editTitle, setEditTitle] = useState<string>(selectedNote?.title || '');
  const [editContent, setEditContent] = useState<string>(selectedNote?.content || '');
  const [editSubjectId, setEditSubjectId] = useState<string>(selectedNote?.subjectId || subjects[0]?.id || '');

  // Synchronize state when switching selected note
  const handleSelectNote = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setSelectedNoteId(id);
      setEditTitle(note.title);
      setEditContent(note.content);
      setEditSubjectId(note.subjectId);
    }
  };

  const handleCreateNewNote = () => {
    const newNote: StudyNote = {
      id: `note-${Date.now()}`,
      subjectId: subjects[0]?.id || '',
      title: 'Untitled Study Synthesis',
      content: '## Main Concepts\n- Note key definitions\n- Formulas and mechanisms\n- Questions to explore',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSaveNote(newNote);
    setSelectedNoteId(newNote.id);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    setEditSubjectId(newNote.subjectId);
  };

  const handleSaveCurrent = () => {
    if (!selectedNote) return;
    const updated: StudyNote = {
      ...selectedNote,
      title: editTitle,
      content: editContent,
      subjectId: editSubjectId,
      updatedAt: new Date().toISOString(),
    };
    onSaveNote(updated);
  };

  const handleSynthesizeWithAi = async () => {
    if (!editContent.trim()) return;

    setIsSynthesizing(true);
    const sub = subjects.find((s) => s.id === editSubjectId)?.name || 'General';

    try {
      const res = await fetch('/api/study/summarize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: editContent,
          subject: sub,
        }),
      });

      if (!res.ok) throw new Error('Failed to summarize notes.');

      const data = await res.json();
      if (data.summary && selectedNote) {
        const updated: StudyNote = {
          ...selectedNote,
          title: editTitle,
          content: editContent,
          subjectId: editSubjectId,
          updatedAt: new Date().toISOString(),
          synthesizedSummary: data.summary,
        };
        onSaveNote(updated);
        setActiveTab('summary');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleCopyMarkdown = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(`# ${editTitle}\n\n${editContent}`).catch(() => {});
      }
    } catch (e) {
      // ignore clipboard error in restricted iframe
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Notes List Sidebar */}
        <div className="md:col-span-4 bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
              <BookOpen className="w-4 h-4 text-stone-500" />
              <span>Study Binder</span>
            </div>
            <button
              onClick={handleCreateNewNote}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Note</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {notes.map((note) => {
              const isSelected = note.id === selectedNoteId;
              const sub = subjects.find((s) => s.id === note.subjectId);
              return (
                <div
                  key={note.id}
                  onClick={() => handleSelectNote(note.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50/40 text-stone-900'
                      : 'border-transparent hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span className="font-medium text-stone-600 truncate max-w-[140px]">
                      {sub?.name || 'General'}
                    </span>
                    <span className="tabular-nums">
                      {new Date(note.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-stone-900 truncate">
                    {note.title || 'Untitled Note'}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                    {note.content.replace(/^[#\s-]+/gm, '')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Editor & AI Synthesis Area */}
        <div className="md:col-span-8 bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex flex-col min-h-[640px]">
          {selectedNote ? (
            <>
              {/* Header Action Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <select
                    value={editSubjectId}
                    onChange={(e) => setEditSubjectId(e.target.value)}
                    className="text-xs border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 bg-stone-50 font-medium"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center p-0.5 bg-stone-100 rounded-md">
                    <button
                      onClick={() => setActiveTab('editor')}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                        activeTab === 'editor'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      onClick={() => setActiveTab('summary')}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1 ${
                        activeTab === 'summary'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <span>Key Takeaways</span>
                      {selectedNote.synthesizedSummary && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSynthesizeWithAi}
                    disabled={isSynthesizing}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded transition-colors cursor-pointer shadow-xs"
                  >
                    {isSynthesizing ? (
                      <>
                        <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Synthesizing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Synthesize</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCopyMarkdown}
                    className="p-1.5 text-stone-500 hover:text-stone-800 border border-stone-200 rounded cursor-pointer"
                    title="Copy Markdown"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => onDeleteNote(selectedNote.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 border border-stone-200 rounded cursor-pointer"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title input */}
              <input
                type="text"
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  handleSaveCurrent();
                }}
                placeholder="Note Title..."
                className="text-xl font-bold text-stone-900 mb-4 focus:outline-none w-full placeholder:text-stone-300"
              />

              {/* Editor Tab vs Key Takeaways Summary Tab */}
              {activeTab === 'editor' ? (
                <div className="flex-1 flex flex-col">
                  <textarea
                    value={editContent}
                    onChange={(e) => {
                      setEditContent(e.target.value);
                    }}
                    onBlur={handleSaveCurrent}
                    placeholder="Write or paste your study notes, formulas, or lecture transcripts in markdown..."
                    className="w-full flex-1 min-h-[380px] p-3 text-sm font-mono text-stone-800 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 leading-relaxed resize-none"
                  />
                  <div className="flex items-center justify-between text-xs text-stone-400 mt-2">
                    <span>Supports Markdown formatting</span>
                    <button
                      onClick={handleSaveCurrent}
                      className="text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                /* Synthesized Summary Tab */
                <div className="flex-1 overflow-y-auto space-y-6">
                  {selectedNote.synthesizedSummary ? (
                    <>
                      {/* Executive Summary */}
                      <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                        <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                          Executive Synthesis
                        </div>
                        <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                          {selectedNote.synthesizedSummary.executiveSummary}
                        </p>
                      </div>

                      {/* Key Insights */}
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                          Core Takeaways
                        </h4>
                        <ul className="text-xs text-stone-700 space-y-1.5 list-disc list-inside bg-white p-4 rounded-lg border border-stone-200">
                          {selectedNote.synthesizedSummary.keyTakeaways?.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Definitions */}
                      {selectedNote.synthesizedSummary.coreDefinitions?.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                            High-Yield Definitions
                          </h4>
                          <div className="space-y-2">
                            {selectedNote.synthesizedSummary.coreDefinitions.map((d, i) => (
                              <div key={i} className="p-3 rounded border border-stone-200 bg-white">
                                <span className="font-bold text-xs text-stone-900">{d.term}: </span>
                                <span className="text-xs text-stone-600">{d.definition}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Probable Exam Questions */}
                      {selectedNote.synthesizedSummary.probableExamQuestions?.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                            High-Probability Exam Questions
                          </h4>
                          <div className="space-y-2">
                            {selectedNote.synthesizedSummary.probableExamQuestions.map((q, i) => (
                              <div key={i} className="p-3 rounded border border-stone-200 bg-stone-50">
                                <p className="text-xs font-semibold text-stone-900 mb-1">{q.question}</p>
                                <p className="text-xs text-stone-600 italic">Key: {q.answerKey}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                      <p className="text-xs text-stone-600 mb-4 max-w-sm mx-auto">
                        No synthesized summary generated yet. Click below to have AI distill key mechanisms, definitions, and exam questions.
                      </p>
                      <button
                        onClick={handleSynthesizeWithAi}
                        disabled={isSynthesizing}
                        className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded shadow-xs cursor-pointer"
                      >
                        Generate Synthesis Now
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-stone-400 text-sm">
              Select or create a study note to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
