
export enum Step {
  BASICS = 0,
  SCOPE = 1,
  SKILLS = 2,
  // REWARDS = 3,
  VISIBILITY = 3,
  REVIEW = 4
}

export type FormData = {
  org_id:string;
  title: string;
  type: string;
  location: {
    type: string;
    text?: string;
  };
  time_commitment: string;
  estimated_hours: number;
  summary: string;
  description: string;
  output_type: string[];
  due_date: string;
  primaryCategory: string;
  skill_level: string;
  categories: string[];
  tools: string[];
  status:'pending'
};
