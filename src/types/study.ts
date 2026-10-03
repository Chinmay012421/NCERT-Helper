export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  image: string;
  accentColor: string;
  cardCount: number;
  topics: string[];
}

export interface Flashcard {
  id: string;
  subjectId: string;
  front: string;
  back: string;
  hint?: string;
  concept: string;
  interval: number; // in days
  repetition: number;
  easeFactor: number;
  dueDate: string; // ISO date string
  lastReviewed?: string;
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  conceptTested: string;
}

export interface StudySessionLog {
  id: string;
  timestamp: string;
  durationMinutes: number;
  mode: 'pomodoro' | 'deep-work' | 'ultradian' | 'custom';
  subjectId: string;
  taskTitle: string;
}

export interface StudyNote {
  id: string;
  subjectId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  synthesizedSummary?: {
    executiveSummary: string;
    keyTakeaways: string[];
    coreDefinitions: { term: string; definition: string }[];
    probableExamQuestions: { question: string; answerKey: string }[];
  };
}

export interface DailyStats {
  focusMinutesToday: number;
  dailyGoalMinutes: number;
  currentStreakDays: number;
  cardsReviewedToday: number;
  quizzesCompletedToday: number;
  weeklyMinutes: number[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
}

export type ActiveTab = 'home' | 'ncert' | 'ncert-diagrams' | 'ncert-pdfs' | 'dashboard' | 'timer' | 'flashcards' | 'quiz' | 'feynman' | 'notes' | 'roadmap';
