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
import MainHeader from "@/components/MainHeader";
import PracticeChallenges from "@/components/PracticeChallenges";
import ChallengeDetails from "@/components/ChallengeDetails";
import FooterLinks from "@/components/FooterLinks";

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
      <MainHeader userScore={userScore} solved={completedChallenges.size} />
      <main className="container mx-auto py-8 px-4">
        {!selectedChallenge ? (
          <PracticeChallenges 
            challenges={challenges}
            onSelectChallenge={handleChallengeSelect}
            userScore={userScore}
            solved={completedChallenges.size}
          />
        ) : (
          <ChallengeDetails
            challenge={selectedChallenge}
            userCode={userCode}
            userAnswer={userAnswer}
            result={result}
            showSolution={showSolution}
            onBack={() => setSelectedChallenge(null)}
            onCodeChange={handleCodeChange}
            onAnswerChange={handleAnswerChange}
            onSolutionRequest={handleSolutionRequest}
            onPasswordDialogOpen={setIsPasswordDialogOpen}
            onSubmit={handleSubmit}
          />
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
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
};

export default Index;
