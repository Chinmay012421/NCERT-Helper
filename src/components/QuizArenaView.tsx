import React, { useState } from 'react';
import { QuizQuestion, Subject } from '../types/study';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, HelpCircle } from 'lucide-react';

interface QuizArenaViewProps {
  subjects: Subject[];
  quizzes: QuizQuestion[];
  onAddQuizzes: (newQuestions: QuizQuestion[]) => void;
  onQuizComplete: (score: number, total: number) => void;
}

export const QuizArenaView: React.FC<QuizArenaViewProps> = ({
  subjects,
  quizzes,
  onAddQuizzes,
  onQuizComplete,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // AI Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiTopic, setAiTopic] = useState<string>('');
  const [aiSubject, setAiSubject] = useState<string>(subjects[0]?.name || 'General');
  const [aiDifficulty, setAiDifficulty] = useState<'foundational' | 'intermediate' | 'advanced'>('intermediate');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const activeQuizzes = selectedSubjectId === 'all'
    ? quizzes
    : quizzes.filter((q) => q.subjectId === selectedSubjectId);

  const safeIndex = Math.min(currentQuestionIndex, Math.max(0, activeQuizzes.length - 1));
  const currentQ = activeQuizzes[safeIndex] || null;

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    if (currentQ && index === currentQ.correctIndex) {
      setScoreCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuizzes.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed the quiz
      setIsQuizFinished(true);
      const finalScore = scoreCount + (selectedOption === currentQ?.correctIndex ? 1 : 0);
      onQuizComplete(finalScore, activeQuizzes.length);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScoreCount(0);
    setIsQuizFinished(false);
  };

  const handleGenerateAiQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setIsGenerating(true);
    setAiError(null);

    try {
      const res = await fetch('/api/study/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          subject: aiSubject,
          difficulty: aiDifficulty,
          count: 4,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate quiz.');

      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        const targetSubject = subjects.find((s) => s.name === aiSubject) || subjects[0];
        const newQuestions: QuizQuestion[] = data.questions.map((q: any, i: number) => ({
          id: `gen-q-${Date.now()}-${i}`,
          subjectId: targetSubject.id,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          conceptTested: q.conceptTested || aiTopic,
        }));

        onAddQuizzes(newQuestions);
        setIsAiModalOpen(false);
        setAiTopic('');
        setSelectedSubjectId(targetSubject.id);
        restartQuiz();
      }
    } catch (err: any) {
      setAiError(err.message || 'Error creating quiz questions.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Deck & Generator trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              setSelectedSubjectId('all');
              restartQuiz();
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedSubjectId === 'all'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Questions ({quizzes.length})
          </button>
          {subjects.map((sub) => {
            const count = quizzes.filter((q) => q.subjectId === sub.id).length;
            const isActive = selectedSubjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  restartQuiz();
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

        <button
          onClick={() => setIsAiModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate AI Quiz</span>
        </button>
      </div>

      {/* Quiz Screen or Finished Screen */}
      {activeQuizzes.length === 0 || !currentQ ? (
        <div className="bg-white border border-stone-200 rounded-xl p-12 text-center shadow-xs">
          <HelpCircle className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-600 text-sm mb-4">No quiz questions found for this subject filter.</p>
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Targeted Quiz with AI</span>
          </button>
        </div>
      ) : isQuizFinished ? (
        /* Final Score Board */
        <div className="bg-white border border-stone-200 rounded-xl p-8 sm:p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-500">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-stone-900 mb-1">Knowledge Check Complete</h2>
          <p className="text-xs text-stone-500 mb-6">Active retrieval performance summary</p>

          <div className="inline-flex items-baseline gap-2 py-3 px-6 rounded-lg bg-stone-50 border border-stone-200 mb-6">
            <span className="text-4xl font-bold font-mono tabular-nums text-stone-900">
              {scoreCount}
            </span>
            <span className="text-stone-500 text-sm font-medium">/ {activeQuizzes.length} correct</span>
            <span className="text-xs text-emerald-600 font-semibold ml-2">
              ({Math.round((scoreCount / activeQuizzes.length) * 100)}%)
            </span>
          </div>

          <div className="max-w-md mx-auto text-xs text-stone-600 mb-8 leading-relaxed">
            {scoreCount === activeQuizzes.length
              ? 'Flawless recall! You demonstrated command of these principles and edge-case exceptions.'
              : 'Consistent active testing consolidates synaptic traces far more effectively than passive re-reading. Review the explanations below or retake to reinforce mastery.'}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={restartQuiz}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-4 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-700">{currentQ.conceptTested}</span>
              <span aria-hidden="true">·</span>
              <span>Single Best Choice</span>
            </div>
            <div className="font-mono tabular-nums text-stone-600 font-medium">
              Question {currentQuestionIndex + 1} of {activeQuizzes.length}
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-semibold text-stone-900 leading-snug mb-6 text-balance">
            {currentQ.question}
          </h3>

          {/* Option list */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-400 bg-rose-50/80 text-rose-950';
                } else {
                  btnStyle = 'border-stone-200 bg-stone-50/50 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-lg border text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs font-mono font-semibold mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Rationale Explanation Drawer */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 mb-6 transition-all">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 mb-1.5">
                <HelpCircle className="w-4 h-4 text-stone-500" />
                <span>Conceptual Rationale & Analysis</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button Footer */}
          {isAnswerSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <span>
                  {currentQuestionIndex + 1 === activeQuizzes.length ? 'View Final Results' : 'Next Question'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* AI Quiz Generator Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-xl p-6 max-w-lg w-full shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-semibold text-stone-900">AI Quiz Generator</h3>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerateAiQuiz} className="space-y-4">
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
                  Target Topic / Chapter
                </label>
                <input
                  type="text"
                  required
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g. Graph Traversals, Breadth-First vs Depth-First Search"
                  className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['foundational', 'intermediate', 'advanced'] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setAiDifficulty(diff)}
                      className={`py-2 text-xs font-medium rounded border capitalize transition-colors cursor-pointer ${
                        aiDifficulty === diff
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
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
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating 4 Questions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Create Quiz Questions</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
