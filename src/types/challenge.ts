
export enum ChallengeType {
  FIND_ERROR = 'FIND_ERROR',
  COMPLETE_CODE = 'COMPLETE_CODE',
  GUESS_OUTPUT = 'GUESS_OUTPUT',
  READ_WRITE = 'READ_WRITE',
  OPTIMIZE_CODE = 'OPTIMIZE_CODE',
  REFACTOR_CODE = 'REFACTOR_CODE',
  DEBUG_RECURSIVE = 'DEBUG_RECURSIVE',
  ALGORITHM_CHALLENGE = 'ALGORITHM_CHALLENGE',
  SECURITY_AUDIT = 'SECURITY_AUDIT',
  DESIGN_PATTERN = 'DESIGN_PATTERN'
}

export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  MONSTER = 'Monster',
  LEGENDARY = 'Legendary'
}

export enum ProgrammingLanguage {
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript',
  PYTHON = 'Python',
  JAVA = 'Java',
  C = 'C',
  CPP = 'C++',
  PHP = 'PHP',
  MYSQL = 'MySQL',
  HTML = 'HTML',
  CSS = 'CSS',
  REACT = 'React',
  NODE = 'Node.js',
  GO = 'Go',
  RUST = 'Rust',
  RUBY = 'Ruby',
  CSHARP = 'C#'
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
  requiresPassword?: boolean;
}
