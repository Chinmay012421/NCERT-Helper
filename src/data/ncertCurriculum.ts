import { NcertClassData } from './ncertTypes';
import { CLASS_12_SUBJECTS } from './chapters/class12';
import { CLASS_11_SUBJECTS } from './chapters/class11';
import { CLASS_10_SUBJECTS } from './chapters/class10';
import { CLASS_9_SUBJECTS } from './chapters/class9';
import { CLASS_8_SUBJECTS } from './chapters/class8';
import { CLASS_7_SUBJECTS } from './chapters/class7';
import { CLASS_6_SUBJECTS } from './chapters/class6';

export * from './ncertTypes';

export const NCERT_CLASSES: NcertClassData[] = [
  {
    classId: 'class-12',
    className: 'Class 12',
    subjects: CLASS_12_SUBJECTS,
  },
  {
    classId: 'class-11',
    className: 'Class 11',
    subjects: CLASS_11_SUBJECTS,
  },
  {
    classId: 'class-10',
    className: 'Class 10',
    subjects: CLASS_10_SUBJECTS,
  },
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

