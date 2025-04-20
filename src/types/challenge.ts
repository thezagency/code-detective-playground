
export enum ChallengeType {
  FIND_ERROR = 'FIND_ERROR',
  COMPLETE_CODE = 'COMPLETE_CODE',
  GUESS_OUTPUT = 'GUESS_OUTPUT',
  READ_WRITE = 'READ_WRITE',
  OPTIMIZE_CODE = 'OPTIMIZE_CODE',
  REFACTOR_CODE = 'REFACTOR_CODE',
  DEBUG_RECURSIVE = 'DEBUG_RECURSIVE'
}

export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  MONSTER = 'Monster'
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  difficulty: DifficultyLevel;
  type: ChallengeType;
  language: string;
  initialCode: string;
  solution: string;
  solutionCode?: string;
  expectedOutput?: string;
  hints?: string;
  explanation?: string;
  category?: string;
  points?: number;
}

