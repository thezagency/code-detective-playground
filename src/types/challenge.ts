
export enum ChallengeType {
  FIND_ERROR = 'FIND_ERROR',
  COMPLETE_CODE = 'COMPLETE_CODE',
  GUESS_OUTPUT = 'GUESS_OUTPUT',
  READ_WRITE = 'READ_WRITE'
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: ChallengeType;
  language: string;
  initialCode: string;
  solution: string;
  solutionCode?: string;
  expectedOutput?: string;
  hints?: string;
  explanation?: string;
}
