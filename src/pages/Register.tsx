
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Trophy, UserPlus, Award, CalendarClock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teamType, setTeamType] = useState("school");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Registration Successful!",
        description: "Your team has been registered for the competition.",
      });
      navigate("/");
    }, 1500);
  };

  // Calculate days until final round
  const finalRoundDate = new Date(2025, 5, 5); // June 5, 2025
  const today = new Date();
  const daysUntilFinal = Math.ceil(
    (finalRoundDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <header className="bg-blue-600 py-4 px-6 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="text-white h-6 w-6" />
            <h1 className="text-2xl font-bold text-white">
              Code Detective Championships
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <a href="/" className="text-white hover:text-blue-100 px-3 py-2">Home</a>
            <a href="/leaderboard" className="text-white hover:text-blue-100 px-3 py-2">Leaderboard</a>
            <a href="/register" className="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg hover:bg-blue-50">Register Now</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Register Your Team</h1>
          <p className="text-xl text-blue-600 max-w-2xl mx-auto">
            Join the most prestigious coding competition and show off your team's problem-solving skills!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 border-blue-200 shadow-md col-span-1 md:col-span-2">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Team Registration
              </CardTitle>
              <CardDescription>
                Enter your team information below
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <div className="grid w-full items-center gap-1.5 mb-4">
                    <Label htmlFor="team-type">Team Type</Label>
                    <Select 
                      value={teamType}
                      onValueChange={setTeamType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select team type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">School Team (Middle/High School)</SelectItem>
                        <SelectItem value="university">University Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                
                  <div className="grid w-full items-center gap-1.5 mb-4">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input id="team-name" placeholder="Enter your team name" required />
                  </div>

                  {teamType === "school" ? (
                    <div className="grid w-full items-center gap-1.5 mb-4">
                      <Label htmlFor="school-name">School Name</Label>
                      <Input id="school-name" placeholder="Enter your school name" required />
                    </div>
                  ) : (
                    <div className="grid w-full items-center gap-1.5 mb-4">
                      <Label htmlFor="university-name">University Name</Label>
                      <Input id="university-name" placeholder="Enter your university name" required />
                    </div>
                  )}

                  <div className="grid w-full items-center gap-1.5 mb-4">
                    <Label htmlFor="coach-name">Team Coach/Mentor</Label>
                    <Input id="coach-name" placeholder="Enter coach/mentor name" required />
                  </div>

                  <div className="grid w-full items-center gap-1.5 mb-4">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" placeholder="Enter contact email" required />
                  </div>

                  <div className="grid w-full items-center gap-1.5 mb-4">
                    <Label htmlFor="members">Team Members (3-5 members)</Label>
                    <Input id="members" placeholder="Enter comma-separated names" required />
                    <p className="text-sm text-blue-500 mt-1">Example: John Smith, Jane Doe, Alex Johnson</p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register Team"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="border-2 border-blue-200 shadow-md">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-blue-600" />
                  Event Countdown
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-center">
                <div className="text-5xl font-bold text-blue-800">{daysUntilFinal}</div>
                <div className="text-lg text-blue-600 mt-2">Days until Finals</div>
                <div className="mt-4 text-sm text-blue-500">June 5, 2025</div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-200 shadow-md">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Prizes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold">1st</span>
                    <div>
                      <p className="font-semibold text-blue-800">$5,000 + Gold Trophy</p>
                      <p className="text-sm text-blue-500">For each division</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 font-bold">2nd</span>
                    <div>
                      <p className="font-semibold text-blue-800">$2,500 + Silver Trophy</p>
                      <p className="text-sm text-blue-500">For each division</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-800 font-bold">3rd</span>
                    <div>
                      <p className="font-semibold text-blue-800">$1,000 + Bronze Trophy</p>
                      <p className="text-sm text-blue-500">For each division</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-blue-600 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-white">
          <p className="font-medium">Code Detective Championships - Team Competition Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
