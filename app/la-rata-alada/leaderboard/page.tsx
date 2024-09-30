"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlitchText from "@/components/glitch-text";
import { Terminal, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getTeams } from "@/actions/rata";
import { Team } from "@/types";

export default function Page() {
  const [consoleText, setConsoleText] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getTeams().then((teams) => setTeams(teams));
  }, []);

  useEffect(() => {
    const text =
      "Weelcome to La Rata Alada: The Riddler's Challenge Leaderboard";
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setConsoleText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-5 pointer-events-none">
        <HelpCircle className="w-1/2 h-1/2 animate-pulse" />
      </div>
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <h1 className="text-3xl font-bold text-center flex items-center justify-center">
          <Terminal className="mr-2" />
          <GlitchText>La Rata Alada Leaderboard</GlitchText>
        </h1>

        <div className="bg-black border border-green-500 p-4 font-mono text-sm">
          <p>
            {consoleText}
            <span className="animate-blink">_</span>
          </p>
        </div>

        <Card className="border-green-500 bg-black bg-opacity-80">
          <CardHeader>
            <CardTitle>
              <GlitchText>Team Leaderboard</GlitchText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-green-500">
                  <TableHead className="text-green-500">Team Name</TableHead>
                  <TableHead className="text-green-500">Members</TableHead>
                  <TableHead className="text-green-500">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team) => (
                    <TableRow key={team.name} className="border-green-500">
                      <TableCell className="text-green-500">
                        {team.name}
                      </TableCell>
                      <TableCell className="text-green-500">
                        {team.members}
                      </TableCell>
                      <TableCell className="text-green-500">
                        {team.points}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
