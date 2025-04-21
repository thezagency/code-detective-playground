
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, AlertTriangle, Trophy, Brain } from "lucide-react";
import QuizIntro from "@/components/QuizIntro";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the time complexity of a binary search algorithm?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Binary search has a time complexity of O(log n) because it halves the search space with each comparison."
  },
  {
    id: 2,
    question: "Which data structure operates on a LIFO principle?",
    options: ["Queue", "Stack", "Heap", "Tree"],
    correctAnswer: 1,
    explanation: "A stack uses Last In, First Out (LIFO) principle, where the last element added is the first one to be removed."
  },
  {
    id: 3,
    question: "What is the main purpose of the `useEffect` hook in React?",
    options: ["To create state variables", "To handle side effects", "To optimize rendering", "To create custom hooks"],
    correctAnswer: 1,
    explanation: "The useEffect hook in React is used to perform side effects in function components, like data fetching, subscriptions, or DOM manipulations."
  },
  {
    id: 4,
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort"],
    correctAnswer: 2,
    explanation: "Quick Sort has an average time complexity of O(n log n) and often outperforms other sorting algorithms in practice."
  },
  {
    id: 5,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Question Language", "Standard Query Logic", "System Quality Language"],
    correctAnswer: 0,
    explanation: "SQL stands for Structured Query Language, which is used to communicate with and manipulate databases."
  },
  {
    id: 6,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Integer", "Object"],
    correctAnswer: 2,
    explanation: "JavaScript doesn't have an Integer type. Instead, it has a Number type that covers all numeric values."
  },
  {
    id: 7,
    question: "What is a closure in programming?",
    options: ["A built-in function", "A way to close files", "A function with access to its outer scope variables", "A method to terminate a program"],
    correctAnswer: 2,
    explanation: "A closure is a function that has access to variables in its outer scope, even after the outer function has returned."
  },
  {
    id: 8,
    question: "Which of these is NOT a valid HTTP request method?",
    options: ["GET", "POST", "INSERT", "DELETE"],
    correctAnswer: 2,
    explanation: "INSERT is not a standard HTTP request method. The standard methods include GET, POST, PUT, DELETE, PATCH, etc."
  },
  {
    id: 9,
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    correctAnswer: 1,
    explanation: "CSS stands for Cascading Style Sheets, which is used to describe how HTML elements should be displayed."
  },
  {
    id: 10,
    question: "Which design pattern is used for creating objects without specifying the exact class to create?",
    options: ["Singleton", "Factory", "Observer", "Decorator"],
    correctAnswer: 1,
    explanation: "The Factory pattern provides an interface for creating objects without specifying their concrete classes."
  }
];

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Time formatting
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Start quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
    // Start timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1 || isPaused) {
          clearInterval(timer);
          if (prev <= 1 && !isPaused) {
            handleSubmitQuiz();
          }
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  };
  
  // Select answer
  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };
  
  // Next question
  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };
  
  // Previous question
  const handlePreviousQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };
  
  // Submit quiz
  const handleSubmitQuiz = () => {
    setIsPaused(true);
    setQuizCompleted(true);
    
    // Calculate score
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    toast({
      title: "Quiz Completed!",
      description: `Your score: ${score}/${quizQuestions.length}`,
    });
  };
  
  // Calculate progress
  const progress = (currentQuestionIndex + 1) / quizQuestions.length * 100;
  
  // Get current question
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Calculate quiz results
  const calculateResults = () => {
    const totalQuestions = quizQuestions.length;
    const correctAnswers = answers.reduce((acc, answer, index) => {
      return acc + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    const score = (correctAnswers / totalQuestions) * 100;
    
    return {
      totalQuestions,
      correctAnswers,
      score,
    };
  };
  
  // Render quiz results
  const renderQuizResults = () => {
    const { totalQuestions, correctAnswers, score } = calculateResults();
    
    return (
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Quiz Results
          </CardTitle>
          <CardDescription className="text-blue-600">
            See how well you performed
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">{Math.round(score)}%</div>
              <p className="text-blue-700">{correctAnswers} out of {totalQuestions} correct answers</p>
            </div>
            
            <Progress value={score} className="h-2 w-full" />
            
            <div className="bg-blue-50 p-4 rounded-lg">
              {score >= 80 ? (
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-green-700">Excellent!</h3>
                    <p className="text-green-600">You're well prepared for the competition!</p>
                  </div>
                </div>
              ) : score >= 50 ? (
                <div className="flex items-center gap-3">
                  <Brain className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-blue-700">Good Job!</h3>
                    <p className="text-blue-600">Keep practicing to improve your skills.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold text-yellow-700">Keep Learning</h3>
                    <p className="text-yellow-600">More practice is recommended before the competition.</p>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-800 mb-3">Review Questions:</h3>
              <div className="space-y-4">
                {quizQuestions.map((q, i) => (
                  <div key={q.id} className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Question {i + 1}</h4>
                      {answers[i] === q.correctAnswer ? (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Correct</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Incorrect</Badge>
                      )}
                    </div>
                    <p className="text-sm text-blue-700 mb-1">{q.question}</p>
                    <p className="text-xs text-blue-600">Correct answer: {q.options[q.correctAnswer]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-between pt-6 bg-blue-50/50">
          <Button 
            variant="outline" 
            className="border-blue-200 text-blue-600"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setQuizCompleted(false);
              setQuizStarted(false);
              setCurrentQuestionIndex(0);
              setAnswers(Array(quizQuestions.length).fill(null));
              setTimeLeft(600);
              setIsPaused(false);
            }}
          >
            Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <header className="bg-blue-600 py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="text-white h-6 w-6" />
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
        {!quizStarted ? (
          <QuizIntro onStartQuiz={handleStartQuiz} />
        ) : quizCompleted ? (
          renderQuizResults()
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-600 text-sm">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className={`font-mono ${timeLeft < 60 ? 'text-red-600 font-bold' : 'text-blue-600'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            
            <Progress value={progress} className="h-1 mb-6" />
            
            <Card className="mb-6 border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl text-blue-800">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAnswer === index 
                          ? 'bg-blue-50 border-blue-400' 
                          : 'bg-white border-gray-200 hover:border-blue-200'
                      }`}
                      onClick={() => handleSelectAnswer(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                          selectedAnswer === index ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-blue-900">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {showExplanation && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-700 mb-1">Explanation:</h3>
                    <p className="text-blue-600">{currentQuestion.explanation}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-6 bg-blue-50/50 flex-wrap gap-4">
                <div>
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600"
                    onClick={() => setShowExplanation(!showExplanation)}
                  >
                    {showExplanation ? "Hide Explanation" : "Show Explanation"}
                  </Button>
                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                    >
                      Next Question
                    </Button>
                  ) : (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleSubmitQuiz}
                      disabled={selectedAnswer === null}
                    >
                      Submit Quiz
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Quiz;
