
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ClockIcon, KeyboardIcon, TrophyIcon, RefreshCw, BarChart } from "lucide-react";
import { ProgrammingLanguage } from "@/types/challenge";

interface TypingChallenge {
  id: string;
  language: ProgrammingLanguage;
  code: string;
  difficulty: string;
  timeLimit: number; // in seconds
}

const typingChallenges: TypingChallenge[] = [
  {
    id: "js-typing-1",
    language: ProgrammingLanguage.JAVASCRIPT,
    code: `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`,
    difficulty: "Intermediate",
    timeLimit: 120,
  },
  {
    id: "py-typing-1",
    language: ProgrammingLanguage.PYTHON,
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    difficulty: "Beginner",
    timeLimit: 90,
  },
  {
    id: "ts-typing-1",
    language: ProgrammingLanguage.TYPESCRIPT,
    code: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function filterActiveUsers(users: User[]): User[] {
  return users.filter(user => user.isActive);
}`,
    difficulty: "Intermediate",
    timeLimit: 100,
  }
];

const TypingChallenge = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<TypingChallenge | null>(null);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Start challenge
  const startChallenge = (challenge: TypingChallenge) => {
    setSelectedChallenge(challenge);
    setUserInput("");
    setStartTime(Date.now());
    setEndTime(null);
    setTimeLeft(challenge.timeLimit);
    setIsRunning(true);
    
    if (timerInterval) clearInterval(timerInterval);
    
    const interval = window.setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          endChallenge(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    setTimerInterval(interval);
    
    // Focus on the textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };
  
  // Calculate metrics when typing
  useEffect(() => {
    if (!selectedChallenge || !isRunning) return;
    
    // Calculate accuracy
    let correctChars = 0;
    const targetCode = selectedChallenge.code;
    
    for (let i = 0; i < userInput.length; i++) {
      if (i < targetCode.length && userInput[i] === targetCode[i]) {
        correctChars++;
      }
    }
    
    const accuracyValue = userInput.length > 0 
      ? Math.round((correctChars / userInput.length) * 100) 
      : 0;
      
    setAccuracy(accuracyValue);
    
    // Check if completed
    if (userInput === targetCode) {
      endChallenge(true);
    }
  }, [userInput, selectedChallenge, isRunning]);
  
  // End challenge
  const endChallenge = (completed: boolean) => {
    if (!selectedChallenge || !isRunning) return;
    
    setIsRunning(false);
    setEndTime(Date.now());
    
    if (timerInterval) clearInterval(timerInterval);
    
    if (completed) {
      const timeInMinutes = (Date.now() - (startTime || Date.now())) / 60000;
      const words = selectedChallenge.code.length / 5; // Approximate words
      const calculatedWpm = Math.round(words / timeInMinutes);
      
      setWpm(calculatedWpm);
      
      toast({
        title: "Challenge Completed!",
        description: `Accuracy: ${accuracy}% | Speed: ${calculatedWpm} WPM`,
      });
    } else {
      toast({
        title: "Time's Up!",
        description: "You ran out of time.",
        variant: "destructive",
      });
    }
  };
  
  // Reset challenge
  const resetChallenge = () => {
    if (selectedChallenge) {
      startChallenge(selectedChallenge);
    }
  };
  
  // Calculate progress
  const calculateProgress = () => {
    if (!selectedChallenge) return 0;
    
    const targetLength = selectedChallenge.code.length;
    const correctChars = userInput.split('').filter((char, index) => 
      index < targetLength && char === selectedChallenge.code[index]
    ).length;
    
    return Math.min(100, Math.round((correctChars / targetLength) * 100));
  };

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <header className="bg-blue-600 py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrophyIcon className="text-white h-6 w-6" />
            <h1 className="text-2xl font-bold text-white">
              Code Detective Championships
            </h1>
          </div>
          <Button asChild variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
            <div onClick={() => navigate("/")}>Home</div>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {!selectedChallenge ? (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
              Code Typing Challenges
            </h2>
            
            <p className="text-blue-600 mb-8 text-center max-w-lg mx-auto">
              Improve your coding speed with our typing challenges. Select a challenge below to begin.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {typingChallenges.map((challenge) => (
                <Card 
                  key={challenge.id}
                  className="hover:shadow-lg transition-all cursor-pointer border-2 border-blue-200"
                  onClick={() => startChallenge(challenge)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <KeyboardIcon className="h-5 w-5 text-blue-500" />
                      <span>{challenge.language} Typing</span>
                    </CardTitle>
                    <CardDescription>
                      Difficulty: {challenge.difficulty}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <code className="text-xs bg-blue-50 p-2 block rounded overflow-hidden text-ellipsis whitespace-nowrap">
                      {challenge.code.substring(0, 50)}...
                    </code>
                  </CardContent>
                  <CardFooter className="bg-blue-50/50 flex justify-between">
                    <div className="flex items-center gap-1 text-blue-600">
                      <ClockIcon className="h-4 w-4" />
                      <span>{challenge.timeLimit}s</span>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Start Challenge
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-800">
                {selectedChallenge.language} Typing Challenge
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4 text-blue-600" />
                  <span className={timeLeft < 10 ? "text-red-600 font-bold" : "text-blue-600"}>
                    {timeLeft}s
                  </span>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600"
                  onClick={() => setSelectedChallenge(null)}
                >
                  Change Challenge
                </Button>
              </div>
            </div>
            
            <div className="mb-6 flex justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <BarChart className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-600">Accuracy: {accuracy}%</span>
                </div>
                {endTime && (
                  <div className="flex items-center gap-1">
                    <KeyboardIcon className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-600">Speed: {wpm} WPM</span>
                  </div>
                )}
              </div>
              <div>
                <Progress value={calculateProgress()} className="w-32 h-2" />
              </div>
            </div>
            
            <Card className="mb-6 border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg text-blue-800">
                  Type the following code:
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-4 font-mono text-sm overflow-auto">
                  <pre>{selectedChallenge.code}</pre>
                </div>
                
                <textarea
                  ref={textareaRef}
                  className={`w-full h-48 p-4 font-mono text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    !isRunning ? 'bg-gray-100' : 'bg-white'
                  }`}
                  value={userInput}
                  onChange={(e) => isRunning && setUserInput(e.target.value)}
                  placeholder="Start typing here..."
                  disabled={!isRunning}
                />
              </CardContent>
              <CardFooter className="bg-blue-50/50 flex justify-between">
                <Button 
                  variant="outline"
                  className="border-blue-200 text-blue-600"
                  onClick={() => setSelectedChallenge(null)}
                >
                  Back to Challenges
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  onClick={resetChallenge}
                  disabled={isRunning}
                >
                  <RefreshCw className="h-4 w-4" />
                  Restart Challenge
                </Button>
              </CardFooter>
            </Card>
            
            {!isRunning && endTime && (
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg text-blue-800">
                    Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-700">{accuracy}%</div>
                      <div className="text-sm text-blue-600">Accuracy</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-700">{wpm}</div>
                      <div className="text-sm text-blue-600">Words Per Minute</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-blue-50/50">
                  <div className="w-full text-center">
                    {accuracy >= 95 && wpm >= 40 ? (
                      <p className="text-green-600">Excellent! You're ready for the competition!</p>
                    ) : accuracy >= 80 && wpm >= 30 ? (
                      <p className="text-blue-600">Good job! Keep practicing to improve your speed.</p>
                    ) : (
                      <p className="text-yellow-600">Keep practicing to improve your accuracy and speed.</p>
                    )}
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        )}
      </main>

      <footer className="bg-blue-600 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-white">
          <p>Code Detective Championships - LU CSC Team Competition Platform</p>
          <div className="mt-4 flex justify-center gap-4">
            <Button variant="link" className="text-white hover:text-blue-100 p-0" asChild>
              <div onClick={() => navigate("/")}>Home</div>
            </Button>
            <Button variant="link" className="text-white hover:text-blue-100 p-0" asChild>
              <div onClick={() => navigate("/leaderboard")}>Leaderboard</div>
            </Button>
            <Button variant="link" className="text-white hover:text-blue-100 p-0" asChild>
              <div onClick={() => navigate("/register")}>Register</div>
            </Button>
            <Button variant="link" className="text-white hover:text-blue-100 p-0" asChild>
              <div onClick={() => navigate("/quiz")}>Practice Quiz</div>
            </Button>
            <Button variant="link" className="text-white hover:text-blue-100 p-0" asChild>
              <div onClick={() => navigate("/typing")}>Typing Challenge</div>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TypingChallenge;
