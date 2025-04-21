
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
  DESIGN_PATTERN = 'DESIGN_PATTERN',
  DATA_STRUCTURE = 'DATA_STRUCTURE',
  DYNAMIC_PROGRAMMING = 'DYNAMIC_PROGRAMMING',
  GRAPH_THEORY = 'GRAPH_THEORY',
  BIT_MANIPULATION = 'BIT_MANIPULATION',
  SYSTEM_DESIGN = 'SYSTEM_DESIGN'
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
  CSHARP = 'C#',
  KOTLIN = 'Kotlin',
  SWIFT = 'Swift',
  SCALA = 'Scala',
  PERL = 'Perl',
  HASKELL = 'Haskell',
  SOLIDITY = 'Solidity',
  BASH = 'Bash',
  R = 'R',
  DART = 'Dart',
  ELIXIR = 'Elixir',
  LUA = 'Lua',
  CLOJURE = 'Clojure',
  FORTRAN = 'Fortran',
  ASSEMBLY = 'Assembly'
}

export enum ChallengeOrigin {
  LEETCODE = 'LeetCode',
  HACKERRANK = 'HackerRank',
  CODEFORCES = 'CodeForces',
  CODEWARS = 'CodeWars',
  PROJECTEULER = 'Project Euler',
  TOPCODER = 'TopCoder',
  GOOGLE = 'Google',
  FACEBOOK = 'Facebook',
  AMAZON = 'Amazon',
  MICROSOFT = 'Microsoft',
  APPLE = 'Apple',
  NETFLIX = 'Netflix',
  TWITTER = 'Twitter',
  UBER = 'Uber',
  AIRBNB = 'Airbnb',
  CUSTOM = 'Custom'
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
  origin?: ChallengeOrigin | string;
  timeLimit?: number;  // In seconds
  memoryLimit?: number; // In MB
  tags?: string[];
  popularity?: number; // Rating or popularity score
  successRate?: number; // Percentage of users who solved it
}
