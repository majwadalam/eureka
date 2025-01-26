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