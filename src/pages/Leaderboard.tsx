
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Calendar, Clock } from "lucide-react";

// Mock data for the leaderboards
const schoolTeams = [
  { rank: 1, name: "Code Wizards", school: "Edison High", points: 4250, challenges: 32 },
  { rank: 2, name: "Logic Masters", school: "Washington Academy", points: 3980, challenges: 30 },
  { rank: 3, name: "Binary Brains", school: "Jefferson Middle School", points: 3720, challenges: 28 },
  { rank: 4, name: "Syntax Savants", school: "Lincoln High", points: 3450, challenges: 26 },
  { rank: 5, name: "Algorithm Aces", school: "Roosevelt Academy", points: 3210, challenges: 25 },
  { rank: 6, name: "Data Dynamos", school: "Kennedy High", points: 3050, challenges: 24 },
  { rank: 7, name: "Function Fanatics", school: "Adams Middle School", points: 2890, challenges: 22 },
  { rank: 8, name: "Bug Busters", school: "Monroe Tech", points: 2700, challenges: 21 },
];

const universityTeams = [
  { rank: 1, name: "Quantum Coders", university: "MIT", points: 5120, challenges: 40 },
  { rank: 2, name: "Neural Networkers", university: "Stanford", points: 4950, challenges: 38 },
  { rank: 3, name: "Recursive Rangers", university: "Carnegie Mellon", points: 4780, challenges: 37 },
  { rank: 4, name: "Compiler Crew", university: "UC Berkeley", points: 4550, challenges: 35 },
  { rank: 5, name: "Pointer Pioneers", university: "Georgia Tech", points: 4320, challenges: 33 },
  { rank: 6, name: "Hash Masters", university: "Caltech", points: 4150, challenges: 31 },
  { rank: 7, name: "Stack Overflow", university: "Princeton", points: 3980, challenges: 30 },
  { rank: 8, name: "Bit Manipulators", university: "University of Washington", points: 3750, challenges: 28 },
];

const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState("school");

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
            <a href="/leaderboard" className="text-white hover:text-blue-100 px-3 py-2 font-bold underline">Leaderboard</a>
            <a href="/register" className="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg hover:bg-blue-50">Register Now</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-blue-200 shadow-md">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Championship Finals
              </CardTitle>
              <CardDescription>The ultimate coding showdown</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-blue-800 text-4xl font-bold">{daysUntilFinal}</div>
                <div className="text-blue-600">Days Remaining</div>
                <div className="mt-2 text-sm text-blue-500">Final Round: June 5, 2025</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 shadow-md md:col-span-2">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Calendar className="h-5 w-5 text-blue-600" />
                Event Schedule
              </CardTitle>
              <CardDescription>Mark your calendars</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Registration Deadline</h4>
                    <p className="text-sm text-blue-600">May 15, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Preliminary Round</h4>
                    <p className="text-sm text-blue-600">May 20-25, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Semi-Finals</h4>
                    <p className="text-sm text-blue-600">June 1, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Championship Finals</h4>
                    <p className="text-sm text-blue-600">June 5, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="my-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
            <Trophy className="mr-2 h-8 w-8 text-yellow-500" />
            Team Leaderboards
          </h2>
          
          <Tabs 
            defaultValue="school" 
            className="w-full"
            onValueChange={setSelectedTab}
          >
            <TabsList className="w-full md:w-auto bg-blue-100 border border-blue-200">
              <TabsTrigger 
                value="school" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                School Teams
              </TabsTrigger>
              <TabsTrigger 
                value="university"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                University Teams
              </TabsTrigger>
            </TabsList>
            <TabsContent value="school" className="mt-6">
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-700">School Competition Leaderboard</CardTitle>
                  <CardDescription>Top performing middle and high school teams</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="w-16">Rank</TableHead>
                        <TableHead>Team Name</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead className="text-right">Challenges</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schoolTeams.map((team) => (
                        <TableRow key={team.name} className="hover:bg-blue-50/50">
                          <TableCell className="font-medium">
                            {team.rank === 1 && <Trophy className="inline h-5 w-5 text-yellow-500 mr-1" />}
                            {team.rank === 2 && <Trophy className="inline h-5 w-5 text-gray-400 mr-1" />}
                            {team.rank === 3 && <Trophy className="inline h-5 w-5 text-amber-800 mr-1" />}
                            {team.rank}
                          </TableCell>
                          <TableCell className="font-semibold text-blue-700">{team.name}</TableCell>
                          <TableCell>{team.school}</TableCell>
                          <TableCell className="text-right">{team.challenges}</TableCell>
                          <TableCell className="text-right font-bold">{team.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="university" className="mt-6">
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-700">University Competition Leaderboard</CardTitle>
                  <CardDescription>Top performing university teams</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="w-16">Rank</TableHead>
                        <TableHead>Team Name</TableHead>
                        <TableHead>University</TableHead>
                        <TableHead className="text-right">Challenges</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {universityTeams.map((team) => (
                        <TableRow key={team.name} className="hover:bg-blue-50/50">
                          <TableCell className="font-medium">
                            {team.rank === 1 && <Trophy className="inline h-5 w-5 text-yellow-500 mr-1" />}
                            {team.rank === 2 && <Trophy className="inline h-5 w-5 text-gray-400 mr-1" />}
                            {team.rank === 3 && <Trophy className="inline h-5 w-5 text-amber-800 mr-1" />}
                            {team.rank}
                          </TableCell>
                          <TableCell className="font-semibold text-blue-700">{team.name}</TableCell>
                          <TableCell>{team.university}</TableCell>
                          <TableCell className="text-right">{team.challenges}</TableCell>
                          <TableCell className="text-right font-bold">{team.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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

export default Leaderboard;
