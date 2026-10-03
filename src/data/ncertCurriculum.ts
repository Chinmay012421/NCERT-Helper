import { NcertClassData } from './ncertTypes';
import { CLASS_9_SUBJECTS } from './chapters/class9';
import { CLASS_8_SUBJECTS } from './chapters/class8';
import { CLASS_7_SUBJECTS } from './chapters/class7';
import { CLASS_6_SUBJECTS } from './chapters/class6';

export * from './ncertTypes';

export const NCERT_CLASSES: NcertClassData[] = [
  {
    classId: 'class-9',
    className: 'Class 9',
    subjects: CLASS_9_SUBJECTS,
  },
  {
    classId: 'class-8',
    className: 'Class 8',
    subjects: CLASS_8_SUBJECTS,
  },
  {
    classId: 'class-7',
    className: 'Class 7',
    subjects: CLASS_7_SUBJECTS,
  },
  {
    classId: 'class-6',
    className: 'Class 6',
    subjects: CLASS_6_SUBJECTS,
  },
];
