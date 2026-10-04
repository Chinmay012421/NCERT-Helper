import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Subject, Flashcard, QuizQuestion, StudyNote, DailyStats, ActiveTab } from './types/study';
import { safeStorage } from './utils/storage';
import {
  INITIAL_SUBJECTS,
  INITIAL_FLASHCARDS,
  INITIAL_QUIZZES,
  INITIAL_NOTES,
  INITIAL_DAILY_STATS,
} from './data/initialStudyData';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { PomodoroTimer } from './components/PomodoroTimer';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizArenaView } from './components/QuizArenaView';
import { FeynmanCoachView } from './components/FeynmanCoachView';
import { NotesBinderView } from './components/NotesBinderView';
import { NcertHelperView } from './components/NcertHelperView';
import { NcertNotesView } from './components/NcertNotesView';
import { NcertDiagramsView } from './components/NcertDiagramsView';
import { NcertPdfLibraryView } from './components/NcertPdfLibraryView';
import { HomeView } from './components/HomeView';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    safeStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Restoring Study Workspace</h2>
            <p className="text-xs text-stone-600 mb-6">
              A temporary display error occurred. Click below to reset your session cache and reload the workspace.
            </p>
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Reset Cache & Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedClassGrade, setSelectedClassGrade] = useState<string>('class-9');

  // Persistent state with safeStorage
  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS);

  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = safeStorage.getItem('scholarpulse_cards');
    if (!saved) return INITIAL_FLASHCARDS;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_FLASHCARDS;
    } catch {
      return INITIAL_FLASHCARDS;
    }
  });

  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(() => {
    const saved = safeStorage.getItem('scholarpulse_quizzes');
    if (!saved) return INITIAL_QUIZZES;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_QUIZZES;
    } catch {
      return INITIAL_QUIZZES;
    }
  });

  const [notes, setNotes] = useState<StudyNote[]>(() => {
    const saved = safeStorage.getItem('scholarpulse_notes');
    if (!saved) return INITIAL_NOTES;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  const [stats, setStats] = useState<DailyStats>(() => {
    const saved = safeStorage.getItem('scholarpulse_stats');
    if (!saved) return INITIAL_DAILY_STATS;
    try {
      const parsed = JSON.parse(saved);
      return parsed && typeof parsed === 'object' ? parsed : INITIAL_DAILY_STATS;
    } catch {
      return INITIAL_DAILY_STATS;
    }
  });

  // Save to safeStorage
  useEffect(() => {
    safeStorage.setItem('scholarpulse_cards', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    safeStorage.setItem('scholarpulse_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    safeStorage.setItem('scholarpulse_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    safeStorage.setItem('scholarpulse_stats', JSON.stringify(stats));
  }, [stats]);

  // Handle Pomodoro session completed
  const handleSessionComplete = (durationMinutes: number) => {
    setStats((prev) => {
      const newFocus = prev.focusMinutesToday + durationMinutes;
      const updatedWeekly = [...prev.weeklyMinutes];
      // index 4 is Friday/current day in mock week
      updatedWeekly[4] = (updatedWeekly[4] || 0) + durationMinutes;
      return {
        ...prev,
        focusMinutesToday: newFocus,
        weeklyMinutes: updatedWeekly,
      };
    });
  };

  // Handle Quiz completion
  const handleQuizComplete = () => {
    setStats((prev) => ({
      ...prev,
      quizzesCompletedToday: prev.quizzesCompletedToday + 1,
    }));
  };

  // Handle adding flashcards
  const handleAddCards = (newCards: Flashcard[]) => {
    setFlashcards((prev) => [...newCards, ...prev]);
  };

  // Handle rating a flashcard (SuperMemo SM-2 algorithm)
  const handleRateCard = (cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') => {
    setStats((prev) => ({
      ...prev,
      cardsReviewedToday: prev.cardsReviewedToday + 1,
    }));

    setFlashcards((prev) =>
      prev.map((card) => {
        if (card.id !== cardId) return card;

        let { interval, repetition, easeFactor } = card;

        if (rating === 'again') {
          repetition = 0;
          interval = 1;
        } else {
          if (repetition === 0) {
            interval = 1;
          } else if (repetition === 1) {
            interval = rating === 'easy' ? 4 : 2;
          } else {
            const factor = rating === 'easy' ? easeFactor + 0.15 : rating === 'hard' ? easeFactor - 0.15 : easeFactor;
            easeFactor = Math.max(1.3, factor);
            interval = Math.round(interval * easeFactor);
          }
          repetition += 1;
        }

        const nextDue = new Date();
        nextDue.setDate(nextDue.getDate() + interval);

        return {
          ...card,
          interval,
          repetition,
          easeFactor,
          dueDate: nextDue.toISOString(),
          lastReviewed: new Date().toISOString(),
        };
      })
    );
  };

  // Handle adding quiz questions
  const handleAddQuizzes = (newQuestions: QuizQuestion[]) => {
    setQuizzes((prev) => [...newQuestions, ...prev]);
  };

  // Handle saving notes
  const handleSaveNote = (updatedNote: StudyNote) => {
    setNotes((prev) => {
      const idx = prev.findIndex((n) => n.id === updatedNote.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updatedNote;
        return next;
      }
      return [updatedNote, ...prev];
    });
  };

  // Handle deleting notes
  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  // Launch subject into target tab
  const handleLaunchSubject = (subjectId: string, targetTab: ActiveTab) => {
    setActiveTab(targetTab);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      {/* 3-Zone Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakDays={stats.currentStreakDays}
        onQuickFocus={() => setActiveTab('timer')}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-24 md:pb-16">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onSelectClassAndSubject={(classId) => setSelectedClassGrade(classId)}
          />
        )}
        {activeTab === 'ncert' && <NcertHelperView initialClassId={selectedClassGrade} />}
        {activeTab === 'ncert-diagrams' && <NcertDiagramsView />}
        {activeTab === 'ncert-pdfs' && <NcertPdfLibraryView />}

        {activeTab === 'dashboard' && (
          <DashboardView
            subjects={subjects}
            flashcards={flashcards}
            stats={stats}
            setActiveTab={setActiveTab}
            onLaunchSubject={handleLaunchSubject}
          />
        )}

        {activeTab === 'timer' && (
          <PomodoroTimer
            subjects={subjects}
            onSessionComplete={handleSessionComplete}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            subjects={subjects}
            flashcards={flashcards}
            onAddCards={handleAddCards}
            onRateCard={handleRateCard}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizArenaView
            subjects={subjects}
            quizzes={quizzes}
            onAddQuizzes={handleAddQuizzes}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {activeTab === 'feynman' && <FeynmanCoachView />}

        {activeTab === 'notes' && (
          <NcertNotesView
            initialClassId={selectedClassGrade}
            onNavigateToSolutions={(clsId) => {
              setSelectedClassGrade(clsId);
              setActiveTab('ncert');
            }}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-stone-200 bg-white pt-6 pb-24 md:pb-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">NCERT HELPER</span>
            <span aria-hidden="true">·</span>
            <span>Created & Developed by <strong className="text-stone-900 font-bold">Chinmay Epili</strong></span>
          </div>
          <div>
            Classes 6 to 12 Verified Solutions · High-Yield Diagrams · Rationalized PDFs
          </div>
        </div>
      </footer>
    </div>
  );
}
