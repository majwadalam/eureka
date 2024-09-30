"use client";
import React, { useState, useEffect } from "react";
import { AlertCircle, Terminal, HelpCircle, Trash2 } from "lucide-react"; // Imported Trash2 icon for delete
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlitchText from "@/components/glitch-text";
import { Team } from "@/types";
import { getTeams, addTeam, updatePoints, deleteTeam } from "@/actions/rata";

const AdminPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeam, setNewTeam] = useState({ name: "", members: "" });
  const [updateTeam, setUpdateTeam] = useState({ id: "", points: 0 });
  const [message, setMessage] = useState({ type: "", content: "" });
  const [consoleText, setConsoleText] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const fetchedTeams = await getTeams();
      setTeams(fetchedTeams);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", content: "Failed to fetch teams." });
    }
  };

  useEffect(() => {
    const text =
      "Welcome to La Rata Alada: The Riddler's Challenge Admin Console";
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

  const handleAddTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTeam.name && newTeam.members) {
      try {
        const res = await addTeam({
          name: newTeam.name,
          members: newTeam.members,
          points: 0,
        });

        setTeams([...teams, res]);
        setNewTeam({ name: "", members: "" });
        setMessage({ type: "success", content: "Team added successfully!" });
      } catch (error) {
        console.error(error);
        setMessage({ type: "error", content: "Failed to add team." });
      }
    } else {
      setMessage({ type: "error", content: "Please fill in all fields." });
    }
  };

  const handleUpdatePoints = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teamIndex = teams.findIndex((team) => team._id === updateTeam.id);
    if (teamIndex !== -1) {
      try {
        const res = await updatePoints(updateTeam.id, updateTeam.points);
        const updatedTeams = [...teams];
        updatedTeams[teamIndex] = res;
        setTeams(updatedTeams);
        setUpdateTeam({ id: "", points: 0 });
        setMessage({
          type: "success",
          content: "Team points updated successfully!",
        });
      } catch (error) {
        console.error(error);
        setMessage({ type: "error", content: "Failed to update points." });
      }
    } else {
      setMessage({ type: "error", content: "Team not found." });
    }
  };

  const handleDeleteTeam = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      await deleteTeam(id);
      setTeams(teams.filter((team) => team._id !== id));
      setMessage({ type: "success", content: "Team deleted successfully!" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", content: "Failed to delete team." });
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-5 pointer-events-none">
        <HelpCircle className="w-1/2 h-1/2 animate-pulse" />
      </div>
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <h1 className="text-3xl font-bold text-center flex items-center justify-center">
          <Terminal className="mr-2" />
          <GlitchText>La Rata Alada Admin</GlitchText>
        </h1>

        <div className="bg-black border border-green-500 p-4 font-mono text-sm">
          <p>
            {consoleText}
            <span className="animate-blink">_</span>
          </p>
        </div>

        {message.content && (
          <Alert
            variant={message.type === "error" ? "destructive" : "default"}
            className="border-green-500 bg-black"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {message.type === "error" ? "Error" : "Success"}
            </AlertTitle>
            <AlertDescription>{message.content}</AlertDescription>
          </Alert>
        )}

        {/* Add New Team Section */}
        <Card className="border-green-500 bg-black bg-opacity-80">
          <CardHeader>
            <CardTitle>
              <GlitchText>Add New Team</GlitchText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTeam} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-green-500">
                  Team Name
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter team name"
                  value={newTeam.name}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, name: e.target.value })
                  }
                  className="bg-black border-green-500 text-green-500 placeholder-green-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamMembers" className="text-green-500">
                  Team Members
                </Label>
                <Input
                  id="teamMembers"
                  placeholder="Enter team members (comma-separated)"
                  value={newTeam.members}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, members: e.target.value })
                  }
                  className="bg-black border-green-500 text-green-500 placeholder-green-700"
                />
              </div>
              <Button
                type="submit"
                className="bg-green-500 text-black hover:bg-green-600 w-full"
              >
                Add Team
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Update Team Points Section */}
        <Card className="border-green-500 bg-black bg-opacity-80">
          <CardHeader>
            <CardTitle>
              <GlitchText>Update Team Points</GlitchText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePoints} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="updateTeamName" className="text-green-500">
                  Team Name
                </Label>
                <Select
                  value={updateTeam.id}
                  onValueChange={(value) =>
                    setUpdateTeam({ ...updateTeam, id: value })
                  }
                >
                  <SelectTrigger className="bg-black border-green-500 text-green-500">
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-green-500 text-green-500">
                    {teams.map((team) => (
                      <SelectItem key={team._id} value={team._id || ""}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="updateTeamPoints" className="text-green-500">
                  Points
                </Label>
                <Input
                  id="updateTeamPoints"
                  type="number"
                  placeholder="Enter new points"
                  value={updateTeam.points}
                  onChange={(e) =>
                    setUpdateTeam({
                      ...updateTeam,
                      points: Number(e.target.value),
                    })
                  }
                  className="bg-black border-green-500 text-green-500 placeholder-green-700"
                />
              </div>
              <Button
                type="submit"
                className="bg-green-500 text-black hover:bg-green-600 w-full"
              >
                Update Points
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Delete Team Section */}
        <Card className="border-green-500 bg-black bg-opacity-80">
          <CardHeader>
            <CardTitle>
              <GlitchText>Delete Team</GlitchText>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {teams.length === 0 ? (
              <p className="text-green-500">No teams available to delete.</p>
            ) : (
              <div className="space-y-4">
                {teams.map((team) => (
                  <div
                    key={team._id}
                    className="flex items-center justify-between bg-black bg-opacity-70 p-3 rounded"
                  >
                    <div>
                      <p className="font-bold">{team.name}</p>
                      <p className="text-green-700">
                        Members: {team.members}
                      </p>
                      <p className="text-green-700">Points: {team.points}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTeam(team._id || "")}
                      className="flex items-center"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>       
      </div>
    </div>
  );
};

export default AdminPage;
