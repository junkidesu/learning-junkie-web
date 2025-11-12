export interface University {
  id: number;
  name: string;
  abbreviation?: string;
  logo?: string;
  url: string;
  year: number;
  joined: string;
}

export interface NewUniversity {
  name: string;
  abbreviation?: string;
  url: string;
  year: number;
}

export enum Role {
  Student = "Student",
  Instructor = "Instructor",
  UniversityRep = "UniversityRep",
  Admin = "Admin",
}

export enum Education {
  Bachelor = "Bachelor",
  Master = "Master",
  PhD = "PhD",
}

export const educationToString = (education: Education): string => {
  switch (education) {
    case Education.Bachelor:
      return "BSc";
    case Education.Master:
      return "MSc";
    default:
      return "PhD";
  }
};

export interface User {
  id: number;
  avatar?: string;
  role: Role;
  name: string;
  email: string;
  education?: Education;
  birthday?: string;
  joined: string;
  university?: University;
}

export interface Progress {
  user: User;
  course: Course;
  completedLessonsNum: number;
  completedExercisesNum: number;
}

export interface NewUser {
  name: string;
  email: string;
  education?: Education;
  birthday?: string;
  password: string;
}

export enum Difficulty {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

export interface CompletionRequirements {
  exercisePercentage: number;
  lessonPercentage: number;
  finalProject: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  banner?: string;
  difficulty: Difficulty;
  instructor: User;
  university: University;
  totalExercisesNum: number;
  totalLessonsNum: number;
  completionRequirements: CompletionRequirements;
  enrollmentsCount: number;
}

export interface Enrollment {
  user: User;
  course: Course;
  time: string;
}

export interface NewCourse {
  title: string;
  description: string;
  difficulty: Difficulty;
  completionRequirements: CompletionRequirements;
  instructor: number;
}

export interface EditCourse {
  title?: string;
  description?: string;
  difficulty?: Difficulty;
  completionRequirements?: CompletionRequirements;
}

export interface Chapter {
  banner?: string;
  description: string;
  number: number;
  title: string;
  course: Course;
}

export interface NewChapter {
  description: string;
  number: number;
  title: string;
}

export interface EditChapter {
  description: string;
  title: string;
}

export type Component =
  | {
      tag: "Markdown";
      content: string;
    }
  | {
      tag: "Video";
      description: string;
      source: string;
      title: string;
    };

export interface Lesson {
  id: number;
  number: number;
  title: string;
  description: string;
  chapter: Chapter;
  components: Component[];
}

export interface LessonCompletion {
  user: User;
  lesson: Lesson;
  time: string;
}

export interface NewLesson {
  number: number;
  title: string;
  description: string;
  components: Component[];
}

export interface EditLesson {
  description: string;
  content: string;
}

export enum Environment {
  Node = "Node",
  Haskell = "Haskell",
  Python = "Python",
}

export type ExerciseContent =
  | {
      tag: "TypeAnswer";
      question: string;
    }
  | {
      tag: "TrueFalse";
      question: string;
    }
  | {
      tag: "Essay";
      task: string;
    }
  | {
      tag: "Quiz";
      options: {
        A: string;
        B: string;
        C: string;
        D: string;
      };
      question: string;
    }
  | {
      tag: "Coding";
      environment: Environment;
      requirements: string;
    };

export interface Exercise {
  id: number;
  maxGrade: number;
  title: string;
  description: string;
  content: ExerciseContent;
  lesson: Lesson;
}

export interface NewExercise {
  maxGrade: number;
  title: string;
  description: string;
}

export enum SubmissionState {
  Pending = "Pending",
  Failure = "Failure",
  PartialSuccess = "PartialSuccess",
  Success = "Success",
}

export type SubmissionContent =
  | {
      tag: "TypeAnswer";
      typedAnswer: string;
    }
  | {
      tag: "TrueFalse";
      trueFalseAnswer: boolean;
    }
  | {
      tag: "Essay";
      essayAnswer: string;
    }
  | {
      tag: "QuizAnswer";
      quizAnswer: string;
    }
  | {
      tag: "Coding";
      program: string;
    };
export interface Submission {
  id: number;
  user: User;
  exercise: Exercise;
  status: SubmissionState;
  submitted: string;
  grade?: number;
  comment?: string;
  content: SubmissionContent;
}

export interface NewSubmission {
  content: SubmissionContent;
}

export enum ExerciseStatus {
  ExerciseSuccess = "ExerciseSuccess",
  ExerciseFailure = "ExerciseFailure",
  ExercisePending = "ExercisePending",
}

export interface ExerciseCheckResponse {
  result: ExerciseStatus;
  grade?: number;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  token: string;
}
