
import { Button } from "@/components/ui/button";
import { Trophy, Lightbulb, Star, Lock, Bug, Code, Search, Rocket, Brain, ShieldCheck, Layers, Check } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import ResultDisplay from "@/components/ResultDisplay";
import { ChallengeType } from "@/types/challenge";

interface ChallengeDetailsProps {
  challenge: any;
  userCode: string;
  userAnswer: string;
  result: any;
  showSolution: boolean;
  onBack: () => void;
  onCodeChange: (code: string) => void;
  onAnswerChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSolutionRequest: () => void;
  onPasswordDialogOpen: (open: boolean) => void;
  onSubmit: () => void;
}

const ChallengeDetails = ({
  challenge,
  userCode,
  userAnswer,
  result,
  showSolution,
  onBack,
  onCodeChange,
  onAnswerChange,
  onSolutionRequest,
  onSubmit
}: ChallengeDetailsProps) => {
  const levelColors: Record<string, string> = {
    Beginner: "bg-gradient-to-r from-green-500 to-teal-400 border-green-300 text-white shadow-green-500/40",
    Intermediate: "bg-gradient-to-r from-blue-600 to-blue-400 border-blue-300 text-white shadow-blue-600/40",
    Advanced: "bg-gradient-to-r from-yellow-500 to-orange-400 border-yellow-300 text-white shadow-yellow-500/40",
    Monster: "bg-gradient-to-r from-red-600 to-pink-500 border-red-300 text-white shadow-red-600/40",
    Legendary: "bg-gradient-to-r from-purple-700 to-indigo-600 border-purple-300 text-white shadow-purple-700/40",
  };

  const challengeTypeIcon = (type: string) => {
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

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Button variant="outline" className="mb-4 md:mb-0" onClick={onBack}>
            ← Back to Challenges
          </Button>
          <h2 className="text-2xl font-bold text-blue-800">{challenge.title}</h2>
          <div className="flex items-center gap-2 text-blue-600">
            {challengeTypeIcon(challenge.type)}
            <span>{challenge.type}</span>
            <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[challenge.difficulty] || "bg-gray-800"}`}>
              {challenge.difficulty}
            </span>
            {challenge.points && (
              <div className="flex items-center gap-1 text-yellow-600 ml-4">
                <Star className="h-4 w-4 fill-yellow-500" />
                <span className="font-bold">{challenge.points} points</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-blue-500 ml-4">
              <Lock className="h-4 w-4" />
              <span>Solution protected</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onSolutionRequest} className="flex items-center gap-2 border-blue-200 text-blue-600">
            <Lock className="h-4 w-4" />
            {showSolution ? "Hide Solution" : "Show Solution"}
          </Button>
          <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700">
            Check Solution
          </Button>
        </div>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6 border border-blue-200">
        <h3 className="text-xl font-semibold mb-2 text-blue-800">Challenge Description</h3>
        <p className="text-blue-700 mb-4">{challenge.description}</p>
        {challenge.hints && (
          <div className="bg-white p-4 rounded-md mb-4 border border-blue-200">
            <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              Hint:
            </h4>
            <p className="text-blue-600">{challenge.hints}</p>
          </div>
        )}
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">Your Solution</h3>
        <CodeEditor value={userCode} onChange={onCodeChange} language={challenge.language || "javascript"} readOnly={challenge.type === ChallengeType.GUESS_OUTPUT} />
      </div>
      {challenge.type === ChallengeType.GUESS_OUTPUT && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-blue-800">Your Answer</h3>
          <textarea
            value={userAnswer}
            onChange={onAnswerChange}
            className="w-full h-32 p-4 bg-white rounded-md border border-blue-200 text-blue-800 font-mono focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            placeholder="Enter the expected output here..."
          />
        </div>
      )}
      {result && <ResultDisplay result={result} />}
      {showSolution && (
        <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
          <h3 className="text-xl font-semibold mb-3 text-blue-600 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Solution
          </h3>
          <CodeEditor
            value={challenge.solutionCode || challenge.solution}
            onChange={() => { }}
            language={challenge.language || "javascript"}
            readOnly={true}
          />
          {challenge.explanation && (
            <div className="mt-4">
              <h4 className="font-semibold text-blue-700 mb-2">Explanation:</h4>
              <p className="text-blue-600">{challenge.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChallengeDetails;
