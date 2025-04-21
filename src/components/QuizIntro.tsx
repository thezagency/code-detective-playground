
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Quiz, CalendarClock } from "lucide-react";

interface QuizIntroProps {
  onStartQuiz: () => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ onStartQuiz }) => {
  // Calculate days until final round
  const finalRoundDate = new Date(2025, 5, 5); // June 5, 2025
  const today = new Date();
  const daysUntilFinal = Math.ceil(
    (finalRoundDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
            <Quiz className="h-6 w-6 text-blue-600" />
            Get Ready Quiz
          </CardTitle>
          <CardDescription className="text-blue-600">
            Test your knowledge before the competition
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-600" />
                Competition Countdown
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white text-3xl font-bold w-16 h-16 rounded-lg flex items-center justify-center">
                  {daysUntilFinal}
                </div>
                <div className="text-blue-700">
                  <p className="font-medium">Days until Final Round</p>
                  <p className="text-sm text-blue-600">June 5, 2025</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-blue-800 mb-3">Quiz Instructions:</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="inline-block w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-center flex-shrink-0">1</span>
                  <span>This quiz contains 10 multiple-choice questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-center flex-shrink-0">2</span>
                  <span>You have 10 minutes to complete the quiz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-center flex-shrink-0">3</span>
                  <span>Each question is worth 10 points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-center flex-shrink-0">4</span>
                  <span>Your team score will be the average of all team members</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-800 mb-3">Topics Covered:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded border border-blue-100 text-blue-700 text-sm">
                  Algorithms
                </div>
                <div className="bg-blue-50 p-2 rounded border border-blue-100 text-blue-700 text-sm">
                  Data Structures
                </div>
                <div className="bg-blue-50 p-2 rounded border border-blue-100 text-blue-700 text-sm">
                  Time Complexity
                </div>
                <div className="bg-blue-50 p-2 rounded border border-blue-100 text-blue-700 text-sm">
                  Object-Oriented Programming
                </div>
                <div className="bg-blue-50 p-2 rounded border border-blue-100 text-blue-700 text-sm">
                  Code Debugging
                </div>
                <div className="bg-blue-50 p-2 rounded border border-blue-100 text-blue-700 text-sm">
                  Functional Programming
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-between pt-6 bg-blue-50/50">
          <Link to="/">
            <Button variant="outline" className="border-blue-200 text-blue-600">
              Back to Home
            </Button>
          </Link>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onStartQuiz}
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizIntro;
