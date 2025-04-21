import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Search, Star, Trophy, Lightbulb, Rocket, Bug, Code, FileText, 
  Brain, ShieldCheck, Layers, Lock } from "lucide-react";
import { Challenge, ChallengeType, DifficultyLevel, ProgrammingLanguage } from "@/types/challenge";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";
import ChallengePagination from "./ChallengePagination";

interface ChallengeSelectorProps {
  challenges: Challenge[];
  onSelectChallenge: (challenge: Challenge) => void;
}

const ITEMS_PER_PAGE = 9;

const cardColorStyles = {
  [DifficultyLevel.BEGINNER]:
    "bg-gradient-to-br from-green-800/90 to-lime-700/80 border-green-400/30 hover:shadow-lg hover:shadow-green-400/20",
  [DifficultyLevel.INTERMEDIATE]:
    "bg-gradient-to-br from-sky-800/85 to-blue-700/90 border-blue-400/30 hover:shadow-lg hover:shadow-sky-300/20",
  [DifficultyLevel.ADVANCED]:
    "bg-gradient-to-br from-orange-800/95 to-yellow-700/80 border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-300/20",
  [DifficultyLevel.MONSTER]:
    "bg-gradient-to-br from-pink-900 to-red-900 border-pink-500/40 hover:shadow-lg hover:shadow-pink-200/20",
  [DifficultyLevel.LEGENDARY]:
    "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 border-purple-500/40 hover:shadow-lg hover:shadow-purple-200/20",
};

const difficultyColor = {
  [DifficultyLevel.BEGINNER]: "bg-green-500/20 text-green-500 hover:bg-green-500/30",
  [DifficultyLevel.INTERMEDIATE]: "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
  [DifficultyLevel.ADVANCED]: "bg-red-500/20 text-red-500 hover:bg-red-500/30",
  [DifficultyLevel.MONSTER]: "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30",
  [DifficultyLevel.LEGENDARY]: "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
};

const challengeTypeIcons = {
  [ChallengeType.FIND_ERROR]: <Bug className="w-5 h-5" />,
  [ChallengeType.COMPLETE_CODE]: <Code className="w-5 h-5" />,
  [ChallengeType.GUESS_OUTPUT]: <Lightbulb className="w-5 h-5" />,
  [ChallengeType.READ_WRITE]: <FileText className="w-5 h-5" />,
  [ChallengeType.OPTIMIZE_CODE]: <Rocket className="w-5 h-5" />,
  [ChallengeType.REFACTOR_CODE]: <Trophy className="w-5 h-5" />,
  [ChallengeType.DEBUG_RECURSIVE]: <Brain className="w-5 h-5" />,
  [ChallengeType.ALGORITHM_CHALLENGE]: <Code className="w-5 h-5" />,
  [ChallengeType.SECURITY_AUDIT]: <ShieldCheck className="w-5 h-5" />,
  [ChallengeType.DESIGN_PATTERN]: <Layers className="w-5 h-5" />
};

const challengeTypeLabels = {
  [ChallengeType.FIND_ERROR]: "Find Error",
  [ChallengeType.COMPLETE_CODE]: "Complete Code",
  [ChallengeType.GUESS_OUTPUT]: "Guess Output",
  [ChallengeType.READ_WRITE]: "Read & Write",
  [ChallengeType.OPTIMIZE_CODE]: "Optimize Code",
  [ChallengeType.REFACTOR_CODE]: "Refactor Code",
  [ChallengeType.DEBUG_RECURSIVE]: "Debug Recursive",
  [ChallengeType.ALGORITHM_CHALLENGE]: "Algorithms",
  [ChallengeType.SECURITY_AUDIT]: "Security Audit",
  [ChallengeType.DESIGN_PATTERN]: "Design Patterns"
};

const languageColors: Record<string, string> = {
  "JavaScript": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "TypeScript": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Python": "bg-green-500/20 text-green-400 border-green-500/30",
  "Java": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "C": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "C++": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "PHP": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "MySQL": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "HTML": "bg-red-500/20 text-red-400 border-red-500/30",
  "CSS": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "React": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "Node.js": "bg-lime-500/20 text-lime-400 border-lime-500/30",
  "Go": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "Rust": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Ruby": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "C#": "bg-violet-500/20 text-violet-400 border-violet-500/30"
};

const ChallengeSelector = ({ challenges, onSelectChallenge }: ChallengeSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  const languages = useMemo(() => {
    const langs = new Set<string>();
    challenges.forEach(challenge => {
      if (challenge.language) {
        langs.add(challenge.language);
      }
    });
    return Array.from(langs).sort();
  }, [challenges]);
  
  const filteredChallenges = useMemo(() => {
    return challenges.filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === "all" || 
                         (activeTab === "findError" && challenge.type === ChallengeType.FIND_ERROR) ||
                         (activeTab === "completeCode" && challenge.type === ChallengeType.COMPLETE_CODE) ||
                         (activeTab === "guessOutput" && challenge.type === ChallengeType.GUESS_OUTPUT) ||
                         (activeTab === "readWrite" && challenge.type === ChallengeType.READ_WRITE) ||
                         (activeTab === "optimizeCode" && challenge.type === ChallengeType.OPTIMIZE_CODE) ||
                         (activeTab === "refactorCode" && challenge.type === ChallengeType.REFACTOR_CODE) ||
                         (activeTab === "debugRecursive" && challenge.type === ChallengeType.DEBUG_RECURSIVE) ||
                         (activeTab === "algorithmChallenge" && challenge.type === ChallengeType.ALGORITHM_CHALLENGE) ||
                         (activeTab === "securityAudit" && challenge.type === ChallengeType.SECURITY_AUDIT) ||
                         (activeTab === "designPattern" && challenge.type === ChallengeType.DESIGN_PATTERN);
      
      const matchesDifficulty = difficultyFilter === "all" || 
                               challenge.difficulty === difficultyFilter;
      
      const matchesLanguage = languageFilter === "all" || 
                             challenge.language === languageFilter;
      
      return matchesSearch && matchesTab && matchesDifficulty && matchesLanguage;
    });
  }, [challenges, searchTerm, activeTab, difficultyFilter, languageFilter]);

  const totalPages = Math.ceil(filteredChallenges.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredChallenges.length);
  const currentChallenges = filteredChallenges.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyFilter = (filterFn: Function, value: any) => {
    filterFn(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search challenges"
              value={searchTerm}
              onChange={(e) => applyFilter(setSearchTerm, e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="w-full md:w-auto">
            <Select 
              value={languageFilter} 
              onValueChange={(value) => applyFilter(setLanguageFilter, value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-full md:w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={(value) => applyFilter(setActiveTab, value)} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 w-full overflow-x-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="findError">Find Error</TabsTrigger>
            <TabsTrigger value="completeCode">Complete</TabsTrigger>
            <TabsTrigger value="guessOutput">Guess</TabsTrigger>
            <TabsTrigger value="readWrite">Read & Write</TabsTrigger>
            <TabsTrigger value="optimizeCode">Optimize</TabsTrigger>
            <TabsTrigger value="refactorCode">Refactor</TabsTrigger>
            <TabsTrigger value="debugRecursive">Debug</TabsTrigger>
            <TabsTrigger value="algorithmChallenge">Algorithms</TabsTrigger>
            <TabsTrigger value="securityAudit">Security</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={difficultyFilter === "all" ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => applyFilter(setDifficultyFilter, "all")}
          >
            All Levels
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.BEGINNER ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.BEGINNER ? "bg-green-500" : ""}`}
            onClick={() => applyFilter(setDifficultyFilter, DifficultyLevel.BEGINNER)}
          >
            Beginner
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.INTERMEDIATE ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.INTERMEDIATE ? "bg-yellow-500" : ""}`}
            onClick={() => applyFilter(setDifficultyFilter, DifficultyLevel.INTERMEDIATE)}
          >
            Intermediate
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.ADVANCED ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.ADVANCED ? "bg-red-500" : ""}`}
            onClick={() => applyFilter(setDifficultyFilter, DifficultyLevel.ADVANCED)}
          >
            Advanced
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.MONSTER ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.MONSTER ? "bg-purple-500" : ""}`}
            onClick={() => applyFilter(setDifficultyFilter, DifficultyLevel.MONSTER)}
          >
            Monster
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.LEGENDARY ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.LEGENDARY ? "bg-blue-500" : ""}`}
            onClick={() => applyFilter(setDifficultyFilter, DifficultyLevel.LEGENDARY)}
          >
            Legendary
          </Badge>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-white">
          Showing {startIndex + 1}-{endIndex} of {filteredChallenges.length} challenges
        </div>
        <div>
          <Select
            value={String(ITEMS_PER_PAGE)}
            onValueChange={(value) => {
              // This is just UI, the actual value is constant for now
            }}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-[100px]">
              <SelectValue placeholder="Per Page" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="9">9 / page</SelectItem>
              <SelectItem value="18">18 / page</SelectItem>
              <SelectItem value="36">36 / page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentChallenges.length > 0 ? (
          currentChallenges.map((challenge) => (
            <Card 
              key={challenge.id}
              className={cn(
                "transition cursor-pointer border-2",
                cardColorStyles[challenge.difficulty as DifficultyLevel] || "bg-gray-800 border-gray-700",
                "hover:scale-105 duration-150"
              )}
              onClick={() => onSelectChallenge(challenge)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-white mb-1">
                      {challenge.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {challenge.shortDescription || challenge.description.substring(0, 80) + "..."}
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">
                      {challengeTypeIcons[challenge.type as ChallengeType]}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline" className={cn(
                      languageColors[challenge.language] || "text-blue-400 border-blue-400/30"
                    )}>
                      {challenge.language || "JavaScript"}
                    </Badge>
                    {challenge.points && (
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <Star className="h-3 w-3 fill-yellow-400" />
                        <span>{challenge.points}</span>
                      </div>
                    )}
                  </div>
                  <Badge className={difficultyColor[challenge.difficulty as DifficultyLevel] || difficultyColor[DifficultyLevel.INTERMEDIATE]}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                {(challenge.requiresPassword) && (
                  <div className="mt-3 flex items-center gap-1 text-gray-300 text-xs">
                    <Lock className="h-3 w-3" />
                    <span>Password protected</span>
                  </div>
                )}
                {challenge.origin && (
                  <div className="mt-2 flex items-center gap-1 text-gray-300 text-xs">
                    <Code className="h-3 w-3" />
                    <span>From: {challenge.origin}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center p-6 bg-gray-800 rounded-lg">
            <p className="text-lg text-gray-400">No challenges found. Try a different search term or filter.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <ChallengePagination 
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ChallengeSelector;
