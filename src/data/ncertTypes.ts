export interface NcertQuestionSolution {
  id: string;
  questionNumber: string;
  questionCategory?: string; // e.g. 'In-Text Question' | 'Exercise Question' | 'Board Exam Question'
  questionType?: string; // e.g. 'Numerical Problem (3 Marks)' | 'Conceptual Reasoning (2 Marks)' | 'Long Answer Derivation (5 Marks)'
  question: string;
  givenData?: string[]; // e.g. ['Mass m = 2 kg', 'Velocity v = 10 m/s']
  toFindOrProve?: string; // e.g. 'Kinetic energy of the body in Joules'
  formulaOrConcept: string; // Core governing formula, reaction equation, or theorem
  steps: string[]; // Sequential, numbered CBSE marking steps
  finalAnswer: string; // Concluding statement with units in standard box format
  marksAllotment?: string; // e.g. '1 Mark (Formula) + 1 Mark (Working) + 1 Mark (Final Answer with Unit)'
  examTips: string; // CBSE examiner warning & common pitfalls
}

export interface NcertChapter {
  id: string;
  chapterNumber: number;
  title: string;
  description: string;
  keyTopics: string[];
  sampleQuestions: NcertQuestionSolution[];
}

export interface NcertSubjectData {
  id: string;
  name: string;
  color: string;
  icon: string;
  chapters: NcertChapter[];
}

export interface NcertClassData {
  classId: 'class-6' | 'class-7' | 'class-8' | 'class-9' | 'class-10' | 'class-11' | 'class-12';
  className: string;
  subjects: NcertSubjectData[];
}
