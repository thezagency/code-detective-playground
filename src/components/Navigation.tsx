
import { useNavigate, useLocation } from "react-router-dom";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  userScore?: number;
  challengesSolved?: number;
}

const Navigation = ({ userScore, challengesSolved }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-blue-600 py-4 px-6 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <Trophy className="text-white h-6 w-6" />
          <h1 className="text-2xl font-bold text-white">
            Code Detective Championships
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <Button 
            variant={isActive("/") ? "secondary" : "ghost"} 
            className="text-white hover:text-blue-100 hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button 
            variant={isActive("/leaderboard") ? "secondary" : "ghost"} 
            className="text-white hover:text-blue-100 hover:bg-blue-700"
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </Button>
          <Button 
            variant={isActive("/quiz") ? "secondary" : "ghost"} 
            className="text-white hover:text-blue-100 hover:bg-blue-700"
            onClick={() => navigate("/quiz")}
          >
            Quiz
          </Button>
          <Button 
            variant={isActive("/typing") ? "secondary" : "ghost"} 
            className="text-white hover:text-blue-100 hover:bg-blue-700"
            onClick={() => navigate("/typing")}
          >
            Typing
          </Button>
          <Button 
            variant={isActive("/register") ? "secondary" : "outline"} 
            className={isActive("/register") ? "bg-white/20 text-white" : "bg-white text-blue-600 hover:bg-blue-50"}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
