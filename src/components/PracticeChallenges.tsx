
import ChallengeSelector from "@/components/ChallengeSelector";
import { Trophy, UserPlus, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";

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
}: PracticeChallengesProps) => (
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

// Import FinalCountdown and EventSchedule at the top (not repeated here for brevity)
import FinalCountdown from "./FinalCountdown";
import EventSchedule from "./EventSchedule";
export default PracticeChallenges;
