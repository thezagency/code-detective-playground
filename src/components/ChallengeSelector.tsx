
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
import { Search, Star } from "lucide-react";
import { Challenge, ChallengeType, DifficultyLevel } from "@/types/challenge";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChallengeSelectorProps {
  challenges: Challenge[];
  onSelectChallenge: (challenge: Challenge) => void;
}

const difficultyColor = {
  [DifficultyLevel.BEGINNER]: "bg-green-500/20 text-green-500 hover:bg-green-500/30",
  [DifficultyLevel.INTERMEDIATE]: "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
  [DifficultyLevel.ADVANCED]: "bg-red-500/20 text-red-500 hover:bg-red-500/30",
  [DifficultyLevel.MONSTER]: "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30"
};

const challengeTypeIcons = {
  [ChallengeType.FIND_ERROR]: "🔍",
  [ChallengeType.COMPLETE_CODE]: "✏️",
  [ChallengeType.GUESS_OUTPUT]: "💡",
  [ChallengeType.READ_WRITE]: "📝",
  [ChallengeType.OPTIMIZE_CODE]: "⚡",
  [ChallengeType.REFACTOR_CODE]: "🔄",
  [ChallengeType.DEBUG_RECURSIVE]: "🧩"
};

const challengeTypeLabels = {
  [ChallengeType.FIND_ERROR]: "Find Error",
  [ChallengeType.COMPLETE_CODE]: "Complete Code",
  [ChallengeType.GUESS_OUTPUT]: "Guess Output",
  [ChallengeType.READ_WRITE]: "Read & Write",
  [ChallengeType.OPTIMIZE_CODE]: "Optimize Code",
  [ChallengeType.REFACTOR_CODE]: "Refactor Code",
  [ChallengeType.DEBUG_RECURSIVE]: "Debug Recursive"
};

const ChallengeSelector = ({ challenges, onSelectChallenge }: ChallengeSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  
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
                         (activeTab === "debugRecursive" && challenge.type === ChallengeType.DEBUG_RECURSIVE);
      
      const matchesDifficulty = difficultyFilter === "all" || 
                               challenge.difficulty === difficultyFilter;
      
      return matchesSearch && matchesTab && matchesDifficulty;
    });
  }, [challenges, searchTerm, activeTab, difficultyFilter]);

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
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="findError">Find Error</TabsTrigger>
              <TabsTrigger value="completeCode">Complete</TabsTrigger>
              <TabsTrigger value="guessOutput">Guess</TabsTrigger>
              <TabsTrigger value="readWrite">Read & Write</TabsTrigger>
              <TabsTrigger value="optimizeCode">Optimize</TabsTrigger>
              <TabsTrigger value="refactorCode">Refactor</TabsTrigger>
              <TabsTrigger value="debugRecursive">Debug</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <Card 
              key={challenge.id} 
              className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition cursor-pointer"
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
                    <span className="text-2xl mr-2">{challengeTypeIcons[challenge.type]}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                      {challenge.language || "JavaScript"}
                    </Badge>
                    {challenge.points && (
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <Star className="h-3 w-3 fill-yellow-400" />
                        <span>{challenge.points}</span>
                      </div>
                    )}
                  </div>
                  <Badge className={difficultyColor[challenge.difficulty] || difficultyColor[DifficultyLevel.INTERMEDIATE]}>
                    {challenge.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center p-6 bg-gray-800 rounded-lg">
            <p className="text-lg text-gray-400">No challenges found. Try a different search term or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeSelector;
