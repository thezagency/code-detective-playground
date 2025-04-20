
import { AlertCircle, CheckCircle, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  result: {
    correct: boolean;
    message: string;
    expectedOutput?: string;
    points?: number;
    difficulty?: string;
  };
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
  return (
    <Alert
      className={cn(
        "border p-4 rounded-md transition-all",
        result.correct
          ? "border-green-500/40 bg-green-500/10"
          : "border-red-500/40 bg-red-500/10"
      )}
    >
      <div className="flex items-start gap-4">
        {result.correct ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-400" />
        )}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <AlertTitle className={result.correct ? "text-green-500" : "text-red-400"}>
              {result.correct ? "Success!" : "Not quite right"}
            </AlertTitle>
            {result.correct && result.points && (
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-4 w-4 fill-yellow-400" />
                <span className="font-bold">{result.points} points</span>
              </div>
            )}
          </div>
          <AlertDescription className="mt-1 text-gray-300">
            {result.message}
            
            {!result.correct && result.expectedOutput && (
              <div className="mt-2">
                <p className="font-semibold text-sm text-gray-400">Expected Output:</p>
                <pre className="mt-1 p-2 bg-gray-700/50 rounded text-sm overflow-auto">
                  {result.expectedOutput}
                </pre>
              </div>
            )}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default ResultDisplay;
