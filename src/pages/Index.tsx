import { useState } from "react";
import { Link } from "react-router-dom";
import CodeEditor from "@/components/CodeEditor";
import ChallengeSelector from "@/components/ChallengeSelector";
import ResultDisplay from "@/components/ResultDisplay";
import challenges from "@/data/challenges";
import { Challenge, ChallengeType, DifficultyLevel } from "@/types/challenge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Check, Bug, Code, Search, Star, Trophy, Lightbulb, Rocket, Lock,
  Brain, ShieldCheck, Layers, Award, CalendarClock, UserPlus
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [result, setResult] = useState<{
    correct: boolean;
    message: string;
    expectedOutput?: string;
    points?: number;
    difficulty?: string;
    requiresPassword?: boolean;
  } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const finalRoundDate = new Date(2025, 5, 5);
  const today = new Date();
  const daysUntilFinal = Math.ceil(
    (finalRoundDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const levelColors: Record<string, string> = {
    [DifficultyLevel.BEGINNER]: "bg-gradient-to-r from-green-500 to-teal-400 border-green-300 text-white shadow-green-500/40",
    [DifficultyLevel.INTERMEDIATE]: "bg-gradient-to-r from-blue-600 to-blue-400 border-blue-300 text-white shadow-blue-600/40",
    [DifficultyLevel.ADVANCED]: "bg-gradient-to-r from-yellow-500 to-orange-400 border-yellow-300 text-white shadow-yellow-500/40",
    [DifficultyLevel.MONSTER]: "bg-gradient-to-r from-red-600 to-pink-500 border-red-300 text-white shadow-red-600/40",
    [DifficultyLevel.LEGENDARY]: "bg-gradient-to-r from-purple-700 to-indigo-600 border-purple-300 text-white shadow-purple-700/40",
  };

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setUserCode(challenge.initialCode || "");
    setUserAnswer("");
    setResult(null);
    setShowSolution(false);
  };

  const handleCodeChange = (code: string) => {
    setUserCode(code);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedChallenge) return;

    let isCorrect = false;
    let message = "";
    let expectedOutput = "";

    switch (selectedChallenge.type) {
      case ChallengeType.FIND_ERROR:
      case ChallengeType.DEBUG_RECURSIVE:
        isCorrect = userCode.includes(selectedChallenge.solution);
        message = isCorrect 
          ? "Great! You found the error." 
          : "Not quite right. Try again or check the solution.";
        break;
      
      case ChallengeType.COMPLETE_CODE:
      case ChallengeType.ALGORITHM_CHALLENGE:
        isCorrect = userCode.includes(selectedChallenge.solution);
        message = isCorrect 
          ? "Perfect! Your implementation is correct." 
          : "Your code doesn't match the expected solution. Try again or check the solution.";
        expectedOutput = selectedChallenge.expectedOutput || "";
        break;
      
      case ChallengeType.GUESS_OUTPUT:
        isCorrect = userAnswer.trim() === selectedChallenge.expectedOutput;
        message = isCorrect 
          ? "Correct! You guessed the output correctly." 
          : "That's not the expected output. Try again or check the solution.";
        expectedOutput = selectedChallenge.expectedOutput || "";
        break;
      
      case ChallengeType.READ_WRITE:
      case ChallengeType.OPTIMIZE_CODE:
      case ChallengeType.REFACTOR_CODE:
      case ChallengeType.SECURITY_AUDIT:
      case ChallengeType.DESIGN_PATTERN:
        isCorrect = userCode.includes(selectedChallenge.solution);
        message = isCorrect 
          ? "Great implementation! Your code works as expected." 
          : "Your solution doesn't match what we're looking for. Try again or check the solution.";
        expectedOutput = selectedChallenge.expectedOutput || "";
        break;
    }

    const points = isCorrect ? selectedChallenge.points || 0 : 0;
    
    if (isCorrect) {
      setUserScore(prev => prev + points);
      setCompletedChallenges(prev => new Set(prev).add(selectedChallenge.id));
      
      toast({
        title: "Challenge completed!",
        description: `You earned ${points} points!`,
        variant: "default",
      });
    }

    setResult({ 
      correct: isCorrect, 
      message, 
      expectedOutput,
      points: points,
      difficulty: selectedChallenge.difficulty,
      requiresPassword: selectedChallenge.requiresPassword
    });
  };

  const handleSolutionRequest = () => {
    if (!selectedChallenge) return;
    
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordSubmit = () => {
    const correctPassword = "81428142";  // As specified by the user
    
    if (password === correctPassword) {
      setIsPasswordDialogOpen(false);
      setShowSolution(true);
      toast({
        title: "Success!",
        description: "Password accepted. Solution unlocked.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect Password",
        description: "The password you entered is incorrect.",
        variant: "destructive",
      });
    }
  };

  const challengeTypeIcon = (type: ChallengeType) => {
    switch (type) {
      case ChallengeType.FIND_ERROR: return <Bug size={18} />;
      case ChallengeType.COMPLETE_CODE: return <Code size={18} />;
      case ChallengeType.GUESS_OUTPUT: return <Search size={18} />;
      case ChallengeType.READ_WRITE: return <Check size={18} />;
      case ChallengeType.OPTIMIZE_CODE: return <Rocket size={18} />;
      case ChallengeType.REFACTOR_CODE: return <Trophy size={18} />;
      case ChallengeType.DEBUG_RECURSIVE: return <Lightbulb size={18} />;
      case ChallengeType.ALGORITHM_CHALLENGE: return <Brain size={18} />;
      case ChallengeType.SECURITY_AUDIT: return <ShieldCheck size={18} />;
      case ChallengeType.DESIGN_PATTERN: return <Layers size={18} />;
      default: return <Code size={18} />;
    }
  };

  const challengeTypeLabel = (type: ChallengeType) => {
    switch (type) {
      case ChallengeType.FIND_ERROR: return "Find the Error";
      case ChallengeType.COMPLETE_CODE: return "Complete the Code";
      case ChallengeType.GUESS_OUTPUT: return "Guess the Output";
      case ChallengeType.READ_WRITE: return "Read & Write";
      case ChallengeType.OPTIMIZE_CODE: return "Optimize Code";
      case ChallengeType.REFACTOR_CODE: return "Refactor Code";
      case ChallengeType.DEBUG_RECURSIVE: return "Debug Recursive";
      case ChallengeType.ALGORITHM_CHALLENGE: return "Algorithm Challenge";
      case ChallengeType.SECURITY_AUDIT: return "Security Audit";
      case ChallengeType.DESIGN_PATTERN: return "Design Pattern";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <header className="bg-blue-600 py-4 px-6 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="text-white h-6 w-6" />
            <h1 className="text-2xl font-bold text-white">
              Code Detective Championships
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center bg-blue-700/50 px-4 py-1.5 rounded-full border border-blue-400/30">
              <Star className="h-5 w-5 text-yellow-300 mr-2" />
              <span className="text-white font-bold">{userScore} points</span>
            </div>
            
            <div className="flex items-center bg-blue-700/50 px-4 py-1.5 rounded-full border border-blue-400/30">
              <Award className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold">{completedChallenges.size} solved</span>
            </div>
            
            <Link to="/leaderboard" className="text-white hover:text-blue-100 px-3 py-2">Leaderboard</Link>
            <Link to="/register" className="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg hover:bg-blue-50">Register Now</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {!selectedChallenge ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 text-blue-800">
                Code Detective Team Championships
              </h2>
              <p className="text-xl text-blue-600 mb-6 max-w-3xl mx-auto">
                Compete with your team in our prestigious coding competition across multiple languages and challenge types
              </p>
              
              <div className="md:hidden my-6 flex justify-center gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-500" />
                  <span className="text-blue-700 font-bold">{userScore} points</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-700 font-bold">{completedChallenges.size} solved</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-12">
                <div className="md:col-span-3 bg-blue-50 p-8 rounded-xl shadow-md border border-blue-200">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center mb-8">
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-blue-800 mb-2">Practice for the Finals</h3>
                      <p className="text-blue-600 mb-4">
                        Solve challenges to prepare your team for the championship
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="bg-blue-600 rounded-xl p-6 text-center text-white">
                        <div className="text-3xl font-bold">{daysUntilFinal}</div>
                        <div className="text-sm">Days until Finals</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link to="/leaderboard" className="bg-white hover:bg-blue-50 p-5 rounded-lg border border-blue-200 flex items-center gap-3 transition-colors">
                      <Trophy className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Leaderboard</h4>
                        <p className="text-sm text-blue-500">See top teams & rankings</p>
                      </div>
                    </Link>
                    <Link to="/register" className="bg-white hover:bg-blue-50 p-5 rounded-lg border border-blue-200 flex items-center gap-3 transition-colors">
                      <UserPlus className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Register Team</h4>
                        <p className="text-sm text-blue-500">Join the competition</p>
                      </div>
                    </Link>
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-blue-50 p-8 rounded-xl shadow-md border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <CalendarClock className="h-5 w-5 text-blue-600" />
                    Competition Schedule
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-700">Registration Deadline</h4>
                      <p className="text-sm text-blue-500">May 15, 2025</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-700">Preliminary Round</h4>
                      <p className="text-sm text-blue-500">May 20-25, 2025</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-700">Championship Finals</h4>
                      <p className="text-sm text-blue-500">June 5, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-blue-50 p-8 rounded-xl shadow-md border border-blue-200">
              <h3 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-blue-600" />
                Practice Challenges
              </h3>
              <ChallengeSelector 
                challenges={challenges} 
                onSelectChallenge={handleChallengeSelect} 
              />
            </div>
            
            <div className="text-center mt-12">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/register">
                  Register Your Team
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Button 
                  variant="outline" 
                  className="mb-4 md:mb-0"
                  onClick={() => setSelectedChallenge(null)}
                >
                  ← Back to Challenges
                </Button>
                <h2 className="text-2xl font-bold text-blue-800">{selectedChallenge.title}</h2>
                <div className="flex items-center gap-2 text-blue-600">
                  {challengeTypeIcon(selectedChallenge.type as ChallengeType)}
                  <span>{challengeTypeLabel(selectedChallenge.type as ChallengeType)}</span>
                  <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[selectedChallenge.difficulty] || "bg-gray-800"}`}>
                    {selectedChallenge.difficulty}
                  </span>
                  {selectedChallenge.points && (
                    <div className="flex items-center gap-1 text-yellow-600 ml-4">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <span className="font-bold">{selectedChallenge.points} points</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-blue-500 ml-4">
                    <Lock className="h-4 w-4" />
                    <span>Solution protected</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleSolutionRequest}
                  className="flex items-center gap-2 border-blue-200 text-blue-600"
                >
                  <Lock className="h-4 w-4" />
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </Button>
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                  Check Solution
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6 border border-blue-200">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Challenge Description</h3>
              <p className="text-blue-700 mb-4">{selectedChallenge.description}</p>
              {selectedChallenge.hints && (
                <div className="bg-white p-4 rounded-md mb-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Hint:
                  </h4>
                  <p className="text-blue-600">{selectedChallenge.hints}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Your Solution</h3>
              <CodeEditor 
                value={userCode} 
                onChange={handleCodeChange} 
                language={selectedChallenge.language || "javascript"}
                readOnly={selectedChallenge.type === ChallengeType.GUESS_OUTPUT}
              />
            </div>

            {selectedChallenge.type === ChallengeType.GUESS_OUTPUT && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Your Answer</h3>
                <textarea
                  value={userAnswer}
                  onChange={handleAnswerChange}
                  className="w-full h-32 p-4 bg-white rounded-md border border-blue-200 text-blue-800 font-mono focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  placeholder="Enter the expected output here..."
                />
              </div>
            )}

            {result && (
              <ResultDisplay 
                result={result}
              />
            )}

            {showSolution && (
              <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
                <h3 className="text-xl font-semibold mb-3 text-blue-600 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Solution
                </h3>
                <CodeEditor 
                  value={selectedChallenge.solutionCode || selectedChallenge.solution} 
                  onChange={() => {}} 
                  language={selectedChallenge.language || "javascript"}
                  readOnly={true}
                />
                {selectedChallenge.explanation && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Explanation:</h4>
                    <p className="text-blue-600">{selectedChallenge.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="bg-white border-blue-200 text-blue-800">
          <DialogHeader>
            <DialogTitle className="text-blue-700">Solution is Password Protected</DialogTitle>
            <DialogDescription className="text-blue-600">
              Enter the password to view the solution for this challenge.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              type="password"
              placeholder="Enter password"
              className="border-blue-200 focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-blue-200 text-blue-600" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handlePasswordSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="bg-blue-600 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-white">
          <p>Code Detective Championships - Team Competition Platform</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link to="/" className="text-white hover:text-blue-100">Home</Link>
            <Link to="/leaderboard" className="text-white hover:text-blue-100">Leaderboard</Link>
            <Link to="/register" className="text-white hover:text-blue-100">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
