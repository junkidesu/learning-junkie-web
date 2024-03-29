export interface University {
  id: number;
  name: string;
  abbreviation?: string;
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
  Bachelor,
  Master,
  PhD,
}

export interface User {
  id: number;
  role: Role;
  name: string;
  email: string;
  education?: Education;
  birthday?: string;
  joined: string;
  university?: University;
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
  difficulty: Difficulty;
  instructor: User;
  university: University;
  enrollmentsCount: number;
  totalPoints: number;
}