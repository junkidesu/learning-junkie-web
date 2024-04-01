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
  Bachelor,
  Master,
  PhD,
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

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  token: string;
}
