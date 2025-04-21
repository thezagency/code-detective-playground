
import { Trophy } from "lucide-react";
import StatsSummary from "./StatsSummary";

interface MainHeaderProps {
  userScore: number;
  solved: number;
}
const MainHeader = ({ userScore, solved }: MainHeaderProps) => (
  <header className="bg-blue-600 py-4 px-6 shadow-md sticky top-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Trophy className="text-white h-6 w-6" />
        <h1 className="text-2xl font-bold text-white">Code Detective Championships</h1>
      </div>
      <StatsSummary userScore={userScore} solved={solved} />
    </div>
  </header>
);

export default MainHeader;
