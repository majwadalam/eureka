"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Calendar, AlertTriangle } from "lucide-react"
import SpaceWarp from '@/components/space-warp';

const AmongUsEvent = () => {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [showEmergencyMeeting, setShowEmergencyMeeting] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Fix wiring", completed: false },
    { id: 2, text: "Empty garbage", completed: false },
    { id: 3, text: "Calibrate distributor", completed: false },
    { id: 4, text: "Clear asteroids", completed: false },
  ]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRegistrationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(`Welcome aboard, ${registrationData.name}! Prepare for the mission.`);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const callEmergencyMeeting = () => {
    setShowEmergencyMeeting(true);
    setTimeout(() => setShowEmergencyMeeting(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <SpaceWarp />
      <div className="absolute inset-0 p-8">
        <header className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 text-red-500">Amogus</h1>
          <p className="text-2xl text-blue-300">Join us for an epic space adventure!</p>
        </header>

        <Tabs defaultValue="info" className="max-w-4xl mx-auto relative">
          <TabsList className="flex space-x-4 bg-gray-800 rounded-lg mb-6 p-2 shadow-lg">
            <TabsTrigger value="info" className="flex-1 py-2 px-4 text-lg text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition">Event Info</TabsTrigger>
            <TabsTrigger value="register" className="flex-1 py-2 px-4 text-lg text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition">Register</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1 py-2 px-4 text-lg text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition">Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Card className="bg-gray-900 bg-opacity-80 border-blue-500">
              <CardHeader>
                <CardTitle className="text-3xl text-yellow-400">Mission Briefing</CardTitle>
                <CardDescription className="text-lg text-green-300">Prepare for your space adventure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-lg">
                <div className="flex items-center space-x-4">
                  <Calendar className="text-purple-400" size={24} />
                  <p>Stardate: October 15, 2024</p>
                </div>
                <div className="flex items-center space-x-4">
                  <User className="text-purple-400" size={24} />
                  <p>Crew Assembly: 7:00 PM - 11:00 PM</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-purple-400" size={24} />
                  <p>Location: Secret Spaceship (coordinates provided after registration)</p>
                </div>
                <p className="text-blue-200">Embark on a thrilling night of deception and detective work as we bring the popular game Among Us to life! Work with your crewmates to complete tasks and identify the impostor among you. Can you survive the mission?</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={callEmergencyMeeting} className="bg-red-600 hover:bg-red-700 text-white">
                  Emergency Meeting
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card className="bg-gray-900 bg-opacity-80 border-green-500">
              <CardHeader>
                <CardTitle className="text-3xl text-yellow-400">Join the Crew</CardTitle>
                <CardDescription className="text-lg text-green-300">Sign up to secure your spot on the spaceship!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg text-blue-300">Crewmate Name</Label>
                    <Input id="name" name="name" value={registrationData.name} onChange={handleInputChange} required className="bg-gray-800 text-white border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg text-blue-300">Space Communication ID (Email)</Label>
                    <Input id="email" name="email" type="email" value={registrationData.email} onChange={handleInputChange} required className="bg-gray-800 text-white border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-lg text-blue-300">Years in Service (Age)</Label>
                    <Input id="age" name="age" type="number" value={registrationData.age} onChange={handleInputChange} required className="bg-gray-800 text-white border-blue-500" />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-lg">
                    Launch into Adventure
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tasks">
            <Card className="bg-gray-900 bg-opacity-80 border-yellow-500">
              <CardHeader>
                <CardTitle className="text-3xl text-yellow-400">Crewmate Tasks</CardTitle>
                <CardDescription className="text-lg text-green-300">Complete your tasks to win!</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {tasks.map(task => (
                    <li key={task.id} className="flex items-center space-x-4">
                      <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => toggleTask(task.id)}
                        className="w-6 h-6"
                      />
                      <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                        {task.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showEmergencyMeeting && (
          <div className="fixed inset-0 bg-red-600 bg-opacity-80 flex items-center justify-center z-50">
            <div className="text-center">
              <AlertTriangle size={100} className="mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">EMERGENCY MEETING!</h2>
              <p className="text-xl">Who is the impostor?</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmongUsEvent;
