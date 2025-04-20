
import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import ChallengeSelector from "@/components/ChallengeSelector";
import ResultDisplay from "@/components/ResultDisplay";
import { challenges } from "@/data/challenges";
import { Challenge, ChallengeType, DifficultyLevel } from "@/types/challenge";
import { Button } from "@/components/ui/button";
import { Check, Bug, Code, Search, Star, Trophy, Lightbulb, Rocket } from "lucide-react";

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
  } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [userScore, setUserScore] = useState(0);

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
    }

    setResult({ 
      correct: isCorrect, 
      message, 
      expectedOutput,
      points: points,
      difficulty: selectedChallenge.difficulty
    });
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
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code className="text-purple-400 h-6 w-6" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Code Detective Playground
            </h1>
          </div>
          
          {!selectedChallenge && (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-lg text-yellow-400 font-bold flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 mr-1" />
                {userScore} points
              </span>
            </div>
          )}

          <div className="hidden md:flex gap-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <Bug size={18} />
              <span>Find Errors</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Rocket size={18} />
              <span>Challenges</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {!selectedChallenge ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Welcome to Code Detective</h2>
              <p className="text-xl text-gray-300 mb-6">
                Test your coding skills with different types of challenges
              </p>
              
              {userScore > 0 && (
                <div className="mb-8 flex justify-center">
                  <div className="bg-gradient-to-r from-yellow-600 to-amber-500 p-1 rounded-lg">
                    <div className="bg-gray-800 p-4 rounded-md flex items-center gap-3">
                      <Trophy className="h-8 w-8 text-yellow-400" />
                      <div className="text-left">
                        <p className="text-yellow-400 font-bold text-2xl">{userScore} points</p>
                        <p className="text-gray-300">Keep solving challenges to earn more!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-purple-500/30 hover:border-purple-500/70 transition-all">
                  <div className="text-purple-400 mb-3">
                    <Bug size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Find the Error</h3>
                  <p className="text-gray-400 mb-4">
                    Debug code snippets by identifying and fixing the bugs
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-500/30 hover:border-blue-500/70 transition-all">
                  <div className="text-blue-400 mb-3">
                    <Code size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Complete the Code</h3>
                  <p className="text-gray-400 mb-4">
                    Fill in missing code sections to make programs work
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500/30 hover:border-green-500/70 transition-all">
                  <div className="text-green-400 mb-3">
                    <Search size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Guess the Output</h3>
                  <p className="text-gray-400 mb-4">
                    Predict what the code will output when executed
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-amber-500/30 hover:border-amber-500/70 transition-all">
                  <div className="text-amber-400 mb-3">
                    <Check size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Read & Write</h3>
                  <p className="text-gray-400 mb-4">
                    Read specifications and write code that meets requirements
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-red-500/30 hover:border-red-500/70 transition-all">
                  <div className="text-red-400 mb-3">
                    <Rocket size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Optimize Code</h3>
                  <p className="text-gray-400 mb-4">
                    Improve inefficient code to make it faster and better
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-yellow-500/30 hover:border-yellow-500/70 transition-all">
                  <div className="text-yellow-400 mb-3">
                    <Trophy size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Refactor Code</h3>
                  <p className="text-gray-400 mb-4">
                    Restructure existing code to improve readability and maintainability
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Available Challenges</h3>
              <ChallengeSelector 
                challenges={challenges} 
                onSelectChallenge={handleChallengeSelect} 
              />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
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
                  {challengeTypeIcon(selectedChallenge.type)}
                  <span>{challengeTypeLabel(selectedChallenge.type)}</span>
                  {selectedChallenge.points && (
                    <div className="flex items-center gap-1 text-yellow-400 ml-4">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <span className="font-bold">{selectedChallenge.points} points</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowSolution(!showSolution)}
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </Button>
                <Button onClick={handleSubmit}>Check Solution</Button>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-semibold mb-2">Challenge Description</h3>
              <p className="text-gray-300 mb-4">{selectedChallenge.description}</p>
              {selectedChallenge.hints && (
                <div className="bg-gray-700 p-4 rounded-md mb-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Hint:</h4>
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
              <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Solution</h3>
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

      <footer className="bg-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Code Detective Playground - Practice your debugging and coding skills</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
