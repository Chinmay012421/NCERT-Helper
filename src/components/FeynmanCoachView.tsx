import React, { useState } from 'react';
import { Sparkles, Brain, CheckCircle, AlertTriangle, Lightbulb, RotateCw, BookOpen } from 'lucide-react';

interface FeynmanFeedback {
  score: number;
  verdict: string;
  strengths: string[];
  jargonTerms: string[];
  blindSpots: string[];
  recommendedAnalogy: string;
  refinedExplanation: string;
}

export const FeynmanCoachView: React.FC = () => {
  const [concept, setConcept] = useState<string>('Dynamic Programming & Memoization');
  const [userExplanation, setUserExplanation] = useState<string>(
    'Instead of recalculating the exact same math problem over and over, you write down the answer in a notebook the first time you solve it. Then, whenever you need it again, you just check your notebook instantly.'
  );
  const [audience, setAudience] = useState<string>('a 12-year-old student');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<FeynmanFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleConcepts = [
    { title: 'Dynamic Programming', prompt: 'Dynamic Programming & Memoization' },
    { title: 'CRISPR Cas9', prompt: 'CRISPR-Cas9 Molecular Gene Editing' },
    { title: 'Action Potential', prompt: 'Neuron Action Potential & Sodium/Potassium Pump' },
    { title: 'Opportunity Cost', prompt: 'Opportunity Cost and Comparative Advantage' },
    { title: 'Central Limit Theorem', prompt: 'Central Limit Theorem & Normal Distribution' },
  ];

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim() || !userExplanation.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/study/feynman-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept,
          userExplanation,
          targetAudience: audience,
        }),
      });

      if (!res.ok) throw new Error('Evaluation request failed.');

      const data = await res.json();
      if (data.feedback) {
        setFeedback(data.feedback);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to analyze explanation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Editorial Introduction */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 mb-1">
          <Brain className="w-4 h-4" />
          <span>The Feynman Learning Protocol</span>
        </div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-2">
          Explain It Simply. Expose the Gaps.
        </h2>
        <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
          Nobel laureate Richard Feynman realized that jargon often camouflages non-understanding.
          State a concept in basic, human terms. Our AI tutor will test your reasoning for hidden assumptions,
          highlight unresolved blind spots, and craft a physical analogy.
        </p>
      </div>

      {/* Suggested Concepts Bar */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs text-stone-500 shrink-0 font-medium">Quick Prompts:</span>
        {sampleConcepts.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => {
              setConcept(item.prompt);
              setFeedback(null);
            }}
            className={`px-3 py-1 text-xs rounded border transition-colors whitespace-nowrap cursor-pointer ${
              concept === item.prompt
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Input Stage */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
        <form onSubmit={handleEvaluate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Target Concept / Law / Mechanism
              </label>
              <input
                type="text"
                required
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g. Photosynthesis light reactions, Heap Sort, Elasticity"
                className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full text-sm border border-stone-300 rounded px-3 py-2 text-stone-800"
              >
                <option value="a 10-year-old child">10-year-old child</option>
                <option value="a high school curious student">High school curious student</option>
                <option value="an intelligent non-expert friend">Intelligent non-expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Your Plain-Language Explanation (Avoid technical jargon)
            </label>
            <textarea
              rows={5}
              required
              value={userExplanation}
              onChange={(e) => setUserExplanation(e.target.value)}
              placeholder="Explain how it works step-by-step from first principles as if speaking out loud to a beginner..."
              className="w-full text-sm border border-stone-300 rounded px-3.5 py-3 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-400 leading-relaxed resize-none"
            />
          </div>

          {error && (
            <div className="p-3 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-500">
              Tip: If you cannot explain it without using the word itself, that reveals a learning boundary.
            </span>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
            >
              {isLoading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Diagnosing Understanding...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze with Feynman Tutor</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Feynman Diagnostic Report */}
      {feedback && (
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header Score & Verdict */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-0.5">
                Conceptual Clarity Assessment
              </div>
              <h3 className="text-lg font-bold text-stone-900">{feedback.verdict}</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
                  {feedback.score}/100
                </div>
                <div className="text-[10px] text-stone-500 font-medium">Clarity Score</div>
              </div>
            </div>
          </div>

          {/* Strengths & Jargon Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>What Was Intuitive & Clear</span>
              </div>
              <ul className="text-xs text-emerald-950 space-y-1.5 list-disc list-inside">
                {feedback.strengths.map((str, i) => (
                  <li key={i}>{str}</li>
                ))}
              </ul>
            </div>

            {/* Blind Spots or Jargon */}
            <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Detected Blind Spots & Unclear Jargon</span>
              </div>
              <ul className="text-xs text-amber-950 space-y-1.5 list-disc list-inside">
                {feedback.blindSpots.map((spot, i) => (
                  <li key={i}>{spot}</li>
                ))}
              </ul>
              {feedback.jargonTerms?.length > 0 && (
                <div className="mt-2 text-[11px] text-amber-800">
                  <span className="font-semibold">Jargon flagged: </span>
                  {feedback.jargonTerms.join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Recommended Real-World Analogy */}
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800 mb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Recommended Tangible Physical Analogy</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "{feedback.recommendedAnalogy}"
            </p>
          </div>

          {/* Refined Feynman Version */}
          <div className="p-4 rounded-lg bg-stone-900 text-stone-100 border border-stone-800">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Refined Beginner-Proof Explanation</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {feedback.refinedExplanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
