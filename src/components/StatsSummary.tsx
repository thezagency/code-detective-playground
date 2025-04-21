
import { Star, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface StatsSummaryProps {
  userScore: number;
  solved: number;
}
const StatsSummary = ({ userScore, solved }: StatsSummaryProps) => (
  <div className="hidden md:flex items-center gap-4">
    <div className="flex items-center bg-blue-700/50 px-4 py-1.5 rounded-full border border-blue-400/30">
      <Star className="h-5 w-5 text-yellow-300 mr-2" />
      <span className="text-white font-bold">{userScore} points</span>
    </div>
    <div className="flex items-center bg-blue-700/50 px-4 py-1.5 rounded-full border border-blue-400/30">
      <Award className="h-5 w-5 text-white mr-2" />
      <span className="text-white font-bold">{solved} solved</span>
    </div>
    <Link to="/leaderboard" className="text-white hover:text-blue-100 px-3 py-2">Leaderboard</Link>
    <Link to="/register" className="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg hover:bg-blue-50">
      Register Now
    </Link>
  </div>
);

export default StatsSummary;
