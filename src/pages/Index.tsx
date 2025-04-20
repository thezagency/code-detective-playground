import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import ChallengeSelector from "@/components/ChallengeSelector";
import ResultDisplay from "@/components/ResultDisplay";
import challenges from "@/data/challenges";
import { Challenge, ChallengeType, DifficultyLevel } from "@/types/challenge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Check, Bug, Code, Search, Star, Trophy, Lightbulb, Rocket, Lock,
  Brain, ShieldCheck, Layers, Award
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

  const levelColors: Record<string, string> = {
    [DifficultyLevel.BEGINNER]: "bg-green-700/60 border-green-400/40 text-green-200",
    [DifficultyLevel.INTERMEDIATE]: "bg-blue-700/60 border-blue-400/40 text-blue-200",
    [DifficultyLevel.ADVANCED]: "bg-yellow-700/60 border-yellow-400/40 text-yellow-200",
    [DifficultyLevel.MONSTER]: "bg-orange-800/70 border-orange-400/50 text-orange-200",
    [DifficultyLevel.LEGENDARY]: "bg-purple-900/70 border-purple-400/60 text-purple-200",
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
    
    if (selectedChallenge.requiresPassword) {
      setIsPasswordDialogOpen(true);
    } else {
      setShowSolution(!showSolution);
    }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="bg-gray-800/80 backdrop-blur-sm py-4 px-6 shadow-md sticky top-0 z-10 border-b border-purple-500/20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code className="text-purple-400 h-6 w-6" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Code Detective Playground
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <span className="text-lg text-yellow-400 font-bold flex items-center bg-yellow-500/10 px-4 py-1.5 rounded-full border border-yellow-500/20">
              <Star className="h-5 w-5 fill-yellow-400 mr-2" />
              {userScore} points
            </span>
            
            <span className="text-lg text-green-400 font-bold flex items-center bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/20">
              <Award className="h-5 w-5 text-green-400 mr-2" />
              {completedChallenges.size} solved
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {!selectedChallenge ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500">
                Welcome to Code Detective
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Test your coding skills with different types of challenges across multiple languages
              </p>
              
              <div className="md:hidden my-6 flex justify-center gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/30 flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400" />
                  <span className="text-yellow-400 font-bold">{userScore} points</span>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/30 flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-bold">{completedChallenges.size} solved</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-lg shadow-lg border border-purple-500/30 hover:border-purple-500/70 transition-all">
                  <div className="text-purple-400 mb-3">
                    <Bug size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Find the Error</h3>
                  <p className="text-gray-400 mb-4">
                    Debug code snippets by identifying and fixing the bugs
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-6 rounded-lg shadow-lg border border-blue-500/30 hover:border-blue-500/70 transition-all">
                  <div className="text-blue-400 mb-3">
                    <Code size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Complete the Code</h3>
                  <p className="text-gray-400 mb-4">
                    Fill in missing code sections to make programs work
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 p-6 rounded-lg shadow-lg border border-green-500/30 hover:border-green-500/70 transition-all">
                  <div className="text-green-400 mb-3">
                    <Search size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Guess the Output</h3>
                  <p className="text-gray-400 mb-4">
                    Predict what the code will output when executed
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 p-6 rounded-lg shadow-lg border border-amber-500/30 hover:border-amber-500/70 transition-all">
                  <div className="text-amber-400 mb-3">
                    <Check size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Read & Write</h3>
                  <p className="text-gray-400 mb-4">
                    Read specifications and write code that meets requirements
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 p-6 rounded-lg shadow-lg border border-red-500/30 hover:border-red-500/70 transition-all">
                  <div className="text-red-400 mb-3">
                    <Rocket size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Optimize Code</h3>
                  <p className="text-gray-400 mb-4">
                    Improve inefficient code to make it faster and better
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                <Trophy className="h-6 w-6 text-blue-400" />
                Available Challenges
              </h3>
              <ChallengeSelector 
                challenges={challenges} 
                onSelectChallenge={handleChallengeSelect} 
              />
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
                <h2 className="text-2xl font-bold">{selectedChallenge.title}</h2>
                <div className="flex items-center gap-2 text-gray-400">
                  {challengeTypeIcon(selectedChallenge.type as ChallengeType)}
                  <span>{challengeTypeLabel(selectedChallenge.type as ChallengeType)}</span>
                  <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[selectedChallenge.difficulty] || "bg-gray-800"}`}>
                    {selectedChallenge.difficulty}
                  </span>
                  {selectedChallenge.points && (
                    <div className="flex items-center gap-1 text-yellow-400 ml-4">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <span className="font-bold">{selectedChallenge.points} points</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-gray-400 ml-4">
                    <Lock className="h-4 w-4" />
                    <span>Solution protected</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={handleSolutionRequest}
                  className="flex items-center gap-2"
                >
                  {selectedChallenge.requiresPassword && <Lock className="h-4 w-4" />}
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </Button>
                <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Check Solution
                </Button>
              </div>
            </div>

            <div className="bg-gray-800/70 p-6 rounded-lg shadow-lg mb-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-2">Challenge Description</h3>
              <p className="text-gray-300 mb-4">{selectedChallenge.description}</p>
              {selectedChallenge.hints && (
                <div className="bg-gray-700/50 p-4 rounded-md mb-4 border border-purple-500/20">
                  <h4 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Hint:
                  </h4>
                  <p className="text-gray-300">{selectedChallenge.hints}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Your Solution</h3>
              <CodeEditor 
                value={userCode} 
                onChange={handleCodeChange} 
                language={selectedChallenge.language || "javascript"}
                readOnly={selectedChallenge.type === ChallengeType.GUESS_OUTPUT}
              />
            </div>

            {selectedChallenge.type === ChallengeType.GUESS_OUTPUT && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Your Answer</h3>
                <textarea
                  value={userAnswer}
                  onChange={handleAnswerChange}
                  className="w-full h-32 p-4 bg-gray-700 rounded-md border border-gray-600 text-white font-mono"
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
              <div className="mt-8 bg-gray-800/70 p-6 rounded-lg shadow-lg border border-purple-500/20">
                <h3 className="text-xl font-semibold mb-3 text-purple-400 flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
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
                    <h4 className="font-semibold text-purple-300 mb-2">Explanation:</h4>
                    <p className="text-gray-300">{selectedChallenge.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="bg-gray-800 border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Solution is Password Protected</DialogTitle>
            <DialogDescription>
              Enter the password to view the solution for this challenge.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              type="password"
              placeholder="Enter password"
              className="bg-gray-700 border-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-800 py-6 mt-12 border-t border-purple-500/20">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Code Detective Playground - Practice your debugging and coding skills</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
