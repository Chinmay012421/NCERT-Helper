export interface NcertQuestionSolution {
  id: string;
  questionNumber: string;
  question: string;
  formulaOrConcept: string;
  steps: string[];
  finalAnswer: string;
  examTips: string;
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
  classId: 'class-6' | 'class-7' | 'class-8' | 'class-9';
  className: string;
  subjects: NcertSubjectData[];
}
