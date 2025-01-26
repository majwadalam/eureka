export interface Team {
  _id?: string;
  name: string;
  members: string;
  points: number;
}

export interface Recruitment {
  _id?: string;
  name: string;
  email: string;
  contact: string;
  why: string;
}

export interface HackathonApplication {
  _id?: string;
  teamName: string;
  members: string[];
  activityTitle: string;
  description: string;
  materials: string;
  space: string;
  sustainability: string;
  teamDynamics: string;
  createdAt?: Date;
}