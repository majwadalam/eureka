"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SpaceWarp from "@/components/space-warp";
import { submitApplication } from "@/actions/hackathon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HackathonApplication } from "@/types";
import Link from "next/link";

export default function Page() {
    const [formData, setFormData] = useState({
        teamName: "",
        proposalText: "",
        proposalLink: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await submitApplication(formData as unknown as HackathonApplication);
            toast.success("Application submitted successfully!");
            setFormData({
                teamName: "",
                proposalText: "",
                proposalLink: "",
            });
        } catch (error) {
            toast.error("Failed to submit application. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative">
            <SpaceWarp />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-y-auto">
                <div className="max-w-2xl w-full my-8">
                    <Card className="bg-black/50 backdrop-blur-md border-white/20">
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl text-center">
                                Activity Proposal Submission
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="teamName">Your Name</Label>
                                    <Input
                                        id="teamName"
                                        value={formData.teamName}
                                        onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                        required
                                        className="bg-black/30"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <Tabs defaultValue="text" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="text">Write Proposal</TabsTrigger>
                                        <TabsTrigger value="link">Submit Link</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="text">
                                        <div className="space-y-2">
                                            <Label htmlFor="proposalText">Your Proposal</Label>
                                            <Textarea
                                                id="proposalText"
                                                value={formData.proposalText}
                                                onChange={(e) => setFormData({ ...formData, proposalText: e.target.value })}
                                                placeholder="Describe your activity proposal, including any materials needed, space requirements, and how it promotes engagement..."
                                                className="min-h-[200px] bg-black/30"
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="link">
                                        <div className="space-y-2">
                                            <Label htmlFor="proposalLink">Proposal Link</Label>
                                            <Input
                                                id="proposalLink"
                                                type="url"
                                                value={formData.proposalLink}
                                                onChange={(e) => setFormData({ ...formData, proposalLink: e.target.value })}
                                                placeholder="https://docs.google.com/..."
                                                className="bg-black/30"
                                            />
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <Button type="submit" className="w-full">
                                    Submit Proposal
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 