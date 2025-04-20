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

interface ChallengeSelectorProps {
  challenges: Challenge[];
  onSelectChallenge: (challenge: Challenge) => void;
}

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search challenges"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="w-full md:w-auto">
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
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

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
            onClick={() => setDifficultyFilter("all")}
          >
            All Levels
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.BEGINNER ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.BEGINNER ? "bg-green-500" : ""}`}
            onClick={() => setDifficultyFilter(DifficultyLevel.BEGINNER)}
          >
            Beginner
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.INTERMEDIATE ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.INTERMEDIATE ? "bg-yellow-500" : ""}`}
            onClick={() => setDifficultyFilter(DifficultyLevel.INTERMEDIATE)}
          >
            Intermediate
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.ADVANCED ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.ADVANCED ? "bg-red-500" : ""}`}
            onClick={() => setDifficultyFilter(DifficultyLevel.ADVANCED)}
          >
            Advanced
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.MONSTER ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.MONSTER ? "bg-purple-500" : ""}`}
            onClick={() => setDifficultyFilter(DifficultyLevel.MONSTER)}
          >
            Monster
          </Badge>
          <Badge 
            variant={difficultyFilter === DifficultyLevel.LEGENDARY ? "default" : "outline"} 
            className={`cursor-pointer ${difficultyFilter === DifficultyLevel.LEGENDARY ? "bg-blue-500" : ""}`}
            onClick={() => setDifficultyFilter(DifficultyLevel.LEGENDARY)}
          >
            Legendary
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <Card 
              key={challenge.id} 
              className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition cursor-pointer hover:shadow-lg hover:shadow-purple-500/10"
              onClick={() => onSelectChallenge(challenge)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-white mb-1">
                      {challenge.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
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
                {challenge.requiresPassword && (
                  <div className="mt-3 flex items-center gap-1 text-gray-400 text-xs">
                    <Lock className="h-3 w-3" />
                    <span>Password protected</span>
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
    </div>
  );
};

export default ChallengeSelector;
