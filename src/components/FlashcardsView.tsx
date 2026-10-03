import React, { useState } from 'react';
import { Flashcard, Subject } from '../types/study';
import { Sparkles, Plus, RotateCw, ChevronLeft, ChevronRight, Shuffle, HelpCircle, Check } from 'lucide-react';

interface FlashcardsViewProps {
  subjects: Subject[];
  flashcards: Flashcard[];
  onAddCards: (newCards: Flashcard[]) => void;
  onRateCard: (cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  subjects,
  flashcards,
  onAddCards,
  onRateCard,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // AI Modal state
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiTopic, setAiTopic] = useState<string>('');
  const [aiSubject, setAiSubject] = useState<string>(subjects[0]?.name || 'General');
  const [aiNotes, setAiNotes] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Manual Add Modal state
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);
  const [manualFront, setManualFront] = useState<string>('');
  const [manualBack, setManualBack] = useState<string>('');
  const [manualHint, setManualHint] = useState<string>('');
  const [manualConcept, setManualConcept] = useState<string>('');
  const [manualSubjectId, setManualSubjectId] = useState<string>(subjects[0]?.id || '');

  // Filter cards
  const filteredCards = selectedSubjectId === 'all'
    ? flashcards
    : flashcards.filter((c) => c.subjectId === selectedSubjectId);

  const safeIndex = Math.min(currentIndex, Math.max(0, filteredCards.length - 1));
  const currentCard = filteredCards[safeIndex] || null;

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, filteredCards.length));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % Math.max(1, filteredCards.length));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setShowHint(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const handleRating = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;
    onRateCard(currentCard.id, rating);
    handleNext();
  };

  // Generate with Gemini API
  const handleGenerateFlashcards = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setIsGenerating(true);
    setAiError(null);

    try {
      const res = await fetch('/api/study/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          subject: aiSubject,
          notes: aiNotes,
          count: 5,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate flashcards.');
      }

      const data = await res.json();
      if (data.cards && Array.isArray(data.cards)) {
        const targetSubject = subjects.find((s) => s.name === aiSubject) || subjects[0];
        const newFlashcards: Flashcard[] = data.cards.map((c: any, i: number) => ({
          id: `gen-${Date.now()}-${i}`,
          subjectId: targetSubject.id,
          front: c.front,
          back: c.back,
          hint: c.hint,
          concept: c.concept || aiTopic,
          interval: 1,
          repetition: 0,
          easeFactor: 2.5,
          dueDate: new Date().toISOString(),
        }));

        onAddCards(newFlashcards);
        setIsAiModalOpen(false);
        setAiTopic('');
        setAiNotes('');
        setCurrentIndex(filteredCards.length); // jump to newly added
      }
    } catch (err: any) {
      setAiError(err.message || 'Error communicating with generation endpoint.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Manual Add Card
  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualFront.trim() || !manualBack.trim()) return;

    const newCard: Flashcard = {
      id: `manual-${Date.now()}`,
      subjectId: manualSubjectId,
      front: manualFront,
      back: manualBack,
      hint: manualHint,
      concept: manualConcept || 'Core Concept',
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(),
    };

    onAddCards([newCard]);
    setIsManualModalOpen(false);
    setManualFront('');
    setManualBack('');
    setManualHint('');
    setManualConcept('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Deck Selector & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Interactive Segmented Filter */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              setSelectedSubjectId('all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedSubjectId === 'all'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Decks ({flashcards.length})
          </button>
          {subjects.map((sub) => {
            const count = flashcards.filter((c) => c.subjectId === sub.id).length;
            const isActive = selectedSubjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {sub.name.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-200 rounded hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Card</span>
          </button>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded transition-colors shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Card Generator</span>
          </button>
        </div>
      </div>

      {/* Flashcard Practice Stage */}
      {filteredCards.length === 0 || !currentCard ? (
        <div className="bg-white border border-stone-200 rounded-xl p-12 text-center">
          <p className="text-stone-500 text-sm mb-4">No flashcards in this deck yet.</p>
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Cards with AI</span>
          </button>
        </div>
      ) : (
        <div>
          {/* Card metadata counter */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-700">{currentCard.concept}</span>
              <span aria-hidden="true">·</span>
              <span>Interval: {currentCard.interval}d</span>
              <span aria-hidden="true">·</span>
              <span>Reps: {currentCard.repetition}</span>
            </div>
            <div className="font-mono tabular-nums font-medium text-stone-600">
              Card {currentIndex + 1} of {filteredCards.length}
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="perspective-1000 w-full min-h-[360px] cursor-pointer group select-none"
          >
            <div
              className={`relative w-full min-h-[360px] transition-transform duration-500 transform-style-preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Card FRONT */}
              <div className="absolute inset-0 w-full h-full bg-white border border-stone-200 rounded-xl p-8 flex flex-col justify-between shadow-xs backface-hidden">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="uppercase tracking-wider font-semibold text-stone-500">
                    Prompt / Question
                  </span>
                  <span className="text-stone-400 group-hover:text-stone-600 transition-colors flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Click to reveal answer</span>
                  </span>
                </div>

                <div className="my-auto py-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-stone-900 leading-relaxed text-balance">
                    {currentCard.front}
                  </h3>

                  {currentCard.hint && (
                    <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                      {showHint ? (
                        <div className="p-3 rounded bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
                          <span className="font-semibold">Mnemonic Hint:</span> {currentCard.hint}
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowHint(true)}
                          className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700 underline underline-offset-2 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Show recall hint</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-stone-400 border-t border-stone-100 pt-4">
                  <span>Press Space to Flip</span>
                  <span className="text-stone-500 font-medium">Active Retrieval Mode</span>
                </div>
              </div>

              {/* Card BACK */}
              <div className="absolute inset-0 w-full h-full bg-stone-900 text-stone-100 border border-stone-800 rounded-xl p-8 flex flex-col justify-between shadow-sm backface-hidden rotate-y-180">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="uppercase tracking-wider font-semibold text-amber-400">
                    Target Answer & Explanation
                  </span>
                  <span className="text-stone-400 group-hover:text-stone-200 transition-colors flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Click to return to front</span>
                  </span>
                </div>

                <div className="my-auto py-6">
                  <div className="text-base sm:text-lg text-stone-100 leading-relaxed whitespace-pre-line">
                    {currentCard.back}
                  </div>
                </div>

                {/* Spaced Repetition Grading Bar */}
                <div
                  className="border-t border-stone-800 pt-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-xs text-stone-400 mb-2 font-medium">Rate recall difficulty (Spaced Repetition interval):</p>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => handleRating('again')}
                      className="px-2 py-2 text-xs font-semibold rounded bg-stone-800 hover:bg-rose-950 text-rose-300 border border-stone-700 hover:border-rose-700 transition-colors cursor-pointer text-center"
                    >
                      <div className="font-bold">Again</div>
                      <div className="text-[10px] text-stone-400">&lt;10m</div>
                    </button>
                    <button
                      onClick={() => handleRating('hard')}
                      className="px-2 py-2 text-xs font-semibold rounded bg-stone-800 hover:bg-amber-950 text-amber-300 border border-stone-700 hover:border-amber-700 transition-colors cursor-pointer text-center"
                    >
                      <div className="font-bold">Hard</div>
                      <div className="text-[10px] text-stone-400">2 days</div>
                    </button>
                    <button
                      onClick={() => handleRating('good')}
                      className="px-2 py-2 text-xs font-semibold rounded bg-stone-800 hover:bg-sky-950 text-sky-300 border border-stone-700 hover:border-sky-700 transition-colors cursor-pointer text-center"
                    >
                      <div className="font-bold">Good</div>
                      <div className="text-[10px] text-stone-400">4 days</div>
                    </button>
                    <button
                      onClick={() => handleRating('easy')}
                      className="px-2 py-2 text-xs font-semibold rounded bg-stone-800 hover:bg-emerald-950 text-emerald-300 border border-stone-700 hover:border-emerald-700 transition-colors cursor-pointer text-center"
                    >
                      <div className="font-bold">Easy</div>
                      <div className="text-[10px] text-stone-400">7 days</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded hover:bg-stone-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle Order</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded hover:bg-stone-50 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* AI Generator Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-xl p-6 max-w-lg w-full shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-semibold text-stone-900">AI Flashcard Generator</h3>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerateFlashcards} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Subject Category
                </label>
                <select
                  value={aiSubject}
                  onChange={(e) => setAiSubject(e.target.value)}
                  className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800"
                >
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Study Topic / Chapter
                </label>
                <input
                  type="text"
                  required
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g. Enzyme kinetics & Michaelis-Menten constant"
                  className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Lecture Notes / Textbook Excerpt (Optional)
                </label>
                <textarea
                  rows={4}
                  value={aiNotes}
                  onChange={(e) => setAiNotes(e.target.value)}
                  placeholder="Paste lecture slides, key definitions, or formulas here to synthesize directly into flashcards..."
                  className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none"
                />
              </div>

              {aiError && (
                <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {aiError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded shadow-xs cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing Cards...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate 5 Flashcards</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Add Card Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-xl p-6 max-w-lg w-full shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-stone-900">Add New Flashcard</h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject</label>
                <select
                  value={manualSubjectId}
                  onChange={(e) => setManualSubjectId(e.target.value)}
                  className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800"
                >
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Concept Tag</label>
                <input
                  type="text"
                  value={manualConcept}
                  onChange={(e) => setManualConcept(e.target.value)}
                  placeholder="e.g. Memory Consolidation"
                  className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Front (Prompt)</label>
                <textarea
                  rows={2}
                  required
                  value={manualFront}
                  onChange={(e) => setManualFront(e.target.value)}
                  placeholder="The question or active retrieval challenge..."
                  className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Back (Answer)</label>
                <textarea
                  rows={3}
                  required
                  value={manualBack}
                  onChange={(e) => setManualBack(e.target.value)}
                  placeholder="The core answer and mechanism..."
                  className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Hint (Optional)</label>
                <input
                  type="text"
                  value={manualHint}
                  onChange={(e) => setManualHint(e.target.value)}
                  placeholder="A quick mnemonic clue..."
                  className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded shadow-xs cursor-pointer"
                >
                  Save Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
