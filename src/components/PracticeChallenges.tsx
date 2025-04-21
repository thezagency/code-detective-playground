import ChallengeSelector from "@/components/ChallengeSelector";
import { Trophy, UserPlus, Star, Award, Code, Zap, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { ChallengeOrigin, ChallengeType, DifficultyLevel } from "@/types/challenge";

interface PracticeChallengesProps {
  challenges: any[];
  onSelectChallenge: (c: any) => void;
  userScore: number;
  solved: number;
}

const PracticeChallenges = ({
  challenges,
  onSelectChallenge,
  userScore,
  solved,
}: PracticeChallengesProps) => {
  // Calculate stats for the challenges
  const totalChallenges = challenges.length;
  const progressPercentage = totalChallenges > 0 ? (solved / totalChallenges) * 100 : 0;
  
  // Count challenges by difficulty
  const beginnerCount = challenges.filter(c => c.difficulty === DifficultyLevel.BEGINNER).length;
  const intermediateCount = challenges.filter(c => c.difficulty === DifficultyLevel.INTERMEDIATE).length;
  const advancedCount = challenges.filter(c => c.difficulty === DifficultyLevel.ADVANCED).length;
  const monsterCount = challenges.filter(c => c.difficulty === DifficultyLevel.MONSTER).length;
  const legendaryCount = challenges.filter(c => c.difficulty === DifficultyLevel.LEGENDARY).length;
  
  // Count challenges by origin (if present)
  const leetCodeCount = challenges.filter(c => c.origin === ChallengeOrigin.LEETCODE).length;
  const googleCount = challenges.filter(c => c.origin === ChallengeOrigin.GOOGLE).length;

  return (
    <>
      <div className="md:hidden my-6 flex justify-center gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-500" />
          <span className="text-blue-700 font-bold">{userScore} points</span>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-600" />
          <span className="text-blue-700 font-bold">{solved} solved</span>
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
              <FinalCountdown />
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
        <EventSchedule />
      </div>
      
      {/* Challenge Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-blue-500" />
            <h4 className="font-bold text-blue-700">Challenge Dataset</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-600">Total Challenges</span>
                <span className="font-medium text-blue-800">{totalChallenges.toLocaleString()}</span>
              </div>
              <Progress value={100} className="h-2 bg-blue-100" />
            </div>
            {leetCodeCount > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-600">From LeetCode</span>
                  <span className="font-medium text-blue-800">{leetCodeCount.toLocaleString()}</span>
                </div>
                <Progress value={(leetCodeCount/totalChallenges)*100} className="h-2 bg-blue-100" />
              </div>
            )}
            {googleCount > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-600">From Google</span>
                  <span className="font-medium text-blue-800">{googleCount.toLocaleString()}</span>
                </div>
                <Progress value={(googleCount/totalChallenges)*100} className="h-2 bg-blue-100" />
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-yellow-500" />
            <h4 className="font-bold text-blue-700">Challenge Difficulty</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-600">Beginner</span>
                <span className="font-medium text-green-700">{beginnerCount.toLocaleString()}</span>
              </div>
              <Progress value={(beginnerCount/totalChallenges)*100} className="h-2 bg-green-100" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-600">Intermediate</span>
                <span className="font-medium text-blue-700">{intermediateCount.toLocaleString()}</span>
              </div>
              <Progress value={(intermediateCount/totalChallenges)*100} className="h-2 bg-blue-100" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-yellow-600">Advanced</span>
                <span className="font-medium text-yellow-700">{advancedCount.toLocaleString()}</span>
              </div>
              <Progress value={(advancedCount/totalChallenges)*100} className="h-2 bg-yellow-100" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-orange-600">Monster</span>
                <span className="font-medium text-orange-700">{monsterCount.toLocaleString()}</span>
              </div>
              <Progress value={(monsterCount/totalChallenges)*100} className="h-2 bg-orange-100" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-purple-600">Legendary</span>
                <span className="font-medium text-purple-700">{legendaryCount.toLocaleString()}</span>
              </div>
              <Progress value={(legendaryCount/totalChallenges)*100} className="h-2 bg-purple-100" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-blue-500" />
            <h4 className="font-bold text-blue-700">Your Progress</h4>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-600">Challenges Solved</span>
                <span className="font-medium text-blue-800">{solved} of {totalChallenges.toLocaleString()}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-blue-100" />
            </div>
            
            <div className="pt-4 border-t border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <h5 className="font-semibold text-blue-700">Total Points</h5>
              </div>
              <p className="text-3xl font-bold text-blue-800">{userScore.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-blue-50 p-8 rounded-xl shadow-md border border-blue-200">
        <h3 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-blue-600" />
          Practice Challenges
        </h3>
        <ChallengeSelector challenges={challenges} onSelectChallenge={onSelectChallenge} />
      </div>
      <div className="text-center mt-12">
        <Link to="/register" className="inline-block">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow transition-colors">
            Register Your Team
          </button>
        </Link>
      </div>
    </>
  );
};

// Import FinalCountdown and EventSchedule at the top (not repeated here for brevity)
import FinalCountdown from "./FinalCountdown";
import EventSchedule from "./EventSchedule";
export default PracticeChallenges;
