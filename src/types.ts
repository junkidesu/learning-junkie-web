export interface University {
  id: number;
  name: string;
  abbreviation?: string;
  logo?: string;
  url: string;
  year: number;
  joined: string;
}

export enum Role {
  Student,
  Instructor,
  Admin,
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
  course: Course;
  obtainedPoints: number;
}

export interface NewUser {
  name: string;
  email: string;
  education?: Education;
  birthday?: string;
  password: string;
}

export enum Difficulty {
  Beginner,
  Intermediate,
  Advanced,
}

export interface Course {
  id: number;
  title: string;
  description: string;
  banner?: string;
  difficulty: Difficulty;
  instructor: User;
  university: University;
  enrollmentsCount: number;
  totalPoints: number;
}

export interface Lesson {
  number: number;
  title: string;
  description: string;
  content: string;
  course: Course;
}

export interface Exercise {
  id: number;
  grade: number;
  title?: string;
  course: Course;
}

export interface Question extends Exercise {
  question: string;
}

export interface Essay extends Exercise {
  task: string;
}

export interface Quiz extends Exercise {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export interface Solution {
  answer: string;
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
