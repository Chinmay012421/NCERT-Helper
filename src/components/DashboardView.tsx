import React, { useState } from 'react';
import { Subject, Flashcard, DailyStats, ActiveTab } from '../types/study';
import { Play, Sparkles, Clock, Layers, Award, CheckCircle2, Circle, ArrowUpRight, Flame } from 'lucide-react';
import heroImg from '../assets/images/hero_study_ambience_1790923395157.jpg';

interface DashboardViewProps {
  subjects: Subject[];
  flashcards: Flashcard[];
  stats: DailyStats;
  setActiveTab: (tab: ActiveTab) => void;
  onLaunchSubject: (subjectId: string, tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  subjects,
  flashcards,
  stats,
  setActiveTab,
  onLaunchSubject,
}) => {
  const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean; subject: string }[]>([
    { id: 't1', text: 'Review 15 Spaced Repetition flashcards on DNA repair', done: true, subject: 'BIO-201' },
    { id: 't2', text: '50-minute Deep Work sprint on Dijkstra invariant proof', done: false, subject: 'CS-302' },
    { id: 't3', text: 'Feynman breakdown: Synaptic coincidence in NMDA receptors', done: false, subject: 'NEUR-210' },
    { id: 't4', text: 'Active Recall Quiz on Dynamic Programming memoization', done: false, subject: 'CS-302' },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const dueCardsCount = (flashcards || []).filter((c) => {
    try {
      const due = new Date(c.dueDate);
      return due <= new Date();
    } catch {
      return false;
    }
  }).length;

  const weeklyMinutesSafe = stats?.weeklyMinutes || [0, 0, 0, 0, 0, 0, 0];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxWeekly = Math.max(...weeklyMinutesSafe, 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Visual Banner with Architectural Sanctuary Image */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-sm min-h-[220px] flex items-end">
        <img
          src={heroImg}
          alt="Quiet contemplative study sanctuary"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

        <div className="relative z-10 p-6 sm:p-8 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2">
            <span>Evidence-Based Cognitive Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Spaced Retrieval & Deep Work</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-2 text-balance">
            Your Dedicated Sanctuary for Focused Intellect & Mastery
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mb-4 leading-relaxed">
            Consolidate long-term memory through interleaved active recall, synthesized Feynman explanations, and timed Pomodoro focus waves.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('timer')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Focus Sprint</span>
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Review Due Cards ({dueCardsCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quantitative Metric Grid (Tabular Numerals) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold text-stone-700">Focus Minutes Today</span>
            <Clock className="w-4 h-4 text-stone-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono tabular-nums text-stone-900">
              {stats.focusMinutesToday}
            </span>
            <span className="text-xs text-stone-500 font-medium">/ {stats.dailyGoalMinutes} min</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (stats.focusMinutesToday / stats.dailyGoalMinutes) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold text-stone-700">Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono tabular-nums text-stone-900">
              {stats.currentStreakDays}
            </span>
            <span className="text-xs text-stone-500 font-medium">consecutive days</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-3">
            Top 5% consistency this semester
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold text-stone-700">Cards Due for Recall</span>
            <Layers className="w-4 h-4 text-stone-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono tabular-nums text-stone-900">
              {dueCardsCount}
            </span>
            <span className="text-xs text-stone-500 font-medium">spaced cards</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-3">
            {dueCardsCount === 0 ? 'All decks reviewed today' : 'Recommended 10m review block'}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold text-stone-700">Active Recall Quizzes</span>
            <Award className="w-4 h-4 text-stone-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-mono tabular-nums text-stone-900">
              {stats.quizzesCompletedToday}
            </span>
            <span className="text-xs text-stone-500 font-medium">tests finished</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-3">
            Retrieval practice active
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Disciplines / Subjects */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">Active Subjects & Decks</h2>
              <p className="text-xs text-stone-500">Curated disciplines with active retrieval materials</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subjects.map((sub) => {
              const subCards = flashcards.filter((c) => c.subjectId === sub.id).length;
              return (
                <div
                  key={sub.id}
                  className="group bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:border-stone-300 transition-all flex flex-col"
                >
                  {/* Subject Image Thumbnail */}
                  <div className="relative h-32 w-full overflow-hidden bg-stone-100">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[11px] font-mono font-bold text-white bg-stone-900/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      {sub.code}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 leading-snug mb-1">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                        {sub.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-stone-500">
                        {subCards} active flashcards
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onLaunchSubject(sub.id, 'flashcards')}
                          title="Open Cards"
                          className="px-2 py-1 text-[11px] font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                        >
                          Cards
                        </button>
                        <button
                          onClick={() => onLaunchSubject(sub.id, 'quiz')}
                          title="Open Quiz"
                          className="px-2 py-1 text-[11px] font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                        >
                          Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Today's Agenda Checklist */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Today’s Study Agenda</h3>
                <p className="text-xs text-stone-500">Prioritized cognitive objectives</p>
              </div>
              <span className="text-xs text-stone-500 font-medium tabular-nums">
                {tasks.filter((t) => t.done).length} / {tasks.length} Completed
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    task.done
                      ? 'bg-stone-50/70 border-stone-200 text-stone-400 line-through'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {task.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                    )}
                    <span className="font-medium">{task.text}</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded shrink-0">
                    {task.subject}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Focus Bar Chart & Cognitive Tool shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weekly Focus Time Chart */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">Weekly Focus Hours</h3>
                <p className="text-[11px] text-stone-500">Study blocks recorded (minutes)</p>
              </div>
              <span className="text-xs font-mono font-bold tabular-nums text-stone-900">
                {stats.weeklyMinutes.reduce((a, b) => a + b, 0)} min total
              </span>
            </div>

            <div className="flex items-end justify-between gap-2 h-36 pt-4 pb-2 border-b border-stone-100">
              {weekDays.map((day, idx) => {
                const mins = stats.weeklyMinutes[idx] || 0;
                const heightPercent = maxWeekly > 0 ? (mins / maxWeekly) * 100 : 0;
                const isToday = idx === 4; // Friday
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[9px] font-mono text-stone-400 tabular-nums">
                      {mins > 0 ? mins : '-'}
                    </span>
                    <div className="w-full bg-stone-100 rounded-t h-full max-h-[90px] flex items-end">
                      <div
                        className={`w-full rounded-t transition-all duration-500 ${
                          isToday ? 'bg-amber-400' : mins > 0 ? 'bg-stone-800' : 'bg-transparent'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${isToday ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High-Impact AI Tool Launcher */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-5 border border-stone-800 shadow-xs">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Intelligent Study Copilots</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              Active Learning Accelerators
            </h4>
            <p className="text-xs text-stone-400 mb-4 leading-relaxed">
              Target conceptual confusion directly with AI-guided retrieval methods.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('feynman')}
                className="w-full text-left p-3 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700 text-xs transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-stone-200">Feynman Technique Coach</div>
                  <div className="text-[11px] text-stone-400">Expose hidden blind spots with plain language</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className="w-full text-left p-3 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700 text-xs transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-stone-200">AI Quiz Arena</div>
                  <div className="text-[11px] text-stone-400">Targeted test drills with rationale explanations</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className="w-full text-left p-3 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700 text-xs transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-stone-200">Smart Notes Synthesizer</div>
                  <div className="text-[11px] text-stone-400">Distill key mechanisms and exam questions</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
